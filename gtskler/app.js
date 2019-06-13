//node app.jsで実行
// 必要なモジュールを読み込みます。

/****************************
注意：
socket.ioのバージョンが新しいと
日本語のデータを通信すると文字化けするため、下手にアップデートするのは危険
現状のバージョン1.7.4では文字化けはしない
****************************/

var http = require("http");
//http.globalAgent.maxSockets = 100;  
var socketIO = require("socket.io");
var PORT = "2222";//add

var fs = require("fs");
var url = require("url");
var path = require("path");
var mime = require("mime");

var userIP = null;

// node.jsでWebServerを作ります。                                                                                     
// アクセスされたら、クライアントに表示するindex.htmlを返します。                                                
var server = http.createServer(function (req, res) {

    if (req.headers["x-forwarded-for"]) {
	console.log("A:"+req.headers["x-forwarded-for"]);
	userIP = req.headers["x-forwarded-for"];
    }

    var path;
    if(req.url == "/") {
	path = "./index.html";
    } else {
	path = "." + req.url;
    }
  // Read File and Write
  fs.readFile(path, function (err, data) {
    if(err) {
      res.writeHead(404, {"Content-Type": "text/plain"});
      return res.end(req.url + ' not found.');
    }
    var type = mime.lookup(path);
    res.writeHead(200, {"Content-Type": type});
      res.write(data);
      console.log(res);
    res.end();
  });    

});
server.listen(PORT);

// socket.IOを用いたリアルタイムWebを実装します。                                                                     
var io = socketIO.listen(server);
//io.path('/gtskler');

//クライアントからサーバへのソケット接続処理
io.sockets.on("connection", function (socket) {

    var roomName = "";

    console.log("connected");

    
    var socketRooms = {}; //ルーム機能で作成された部屋名保存用配列
    var adapterRoom = io.sockets.adapter.rooms;
    console.log("adapterrooms:"+JSON.stringify(adapterRoom));
    for(key in adapterRoom){
	if ( key.match(/room/)) {

	    console.log( key  + ":" + JSON.stringify(adapterRoom[key]) + "\n");
	    socketRooms[key] = adapterRoom[key]["length"];
	}

    }

    console.log("socket.id:"+socket.id);

    /*
    socket.on("init", function(data) {
	roomName = data.value;
	console.log(roomName);

	socket.join(roomName);

    });
    */
    console.log('コネクション数',socket.client.conn.server.clientsCount);

    //ルーム入室機能
    //入力された部屋番号に入室させる
    socket.on("enter", function (data) {
	console.log(data);
	roomName = data.value;
	socket.join(roomName);
	var adapterRoom = io.sockets.adapter.rooms;//現在のルーム情報を取得
        console.log("adapterrooms:"+JSON.stringify(adapterRoom));
	io.to(socket.id).emit("enter",{"value":roomName});
    });

    //マーク共有機能
    //同じ部屋番号のユーザにマークを共有
    socket.on("clicked", function (data) {
        console.log(data);
        socket.broadcast.to(roomName).emit("clicked", data);
    });

    //グラフ共有機能
    socket.on("graphDistribution", function (data) {
        console.log(data);
	/*
	
	socket.get('room', function(err, _room) {
            room = _room;
        });
	*/
	console.log("送信:"+roomName);
        socket.broadcast.to(roomName).emit("graphDistribution", data);
    });

    //クイズ出題機能
    socket.on("shareQuiz", function (data) {
	console.log(data);
	socket.broadcast.to(roomName).emit("shareQuiz", data);
    });

/*
    //機能の接続による遅延確認のための機能
    socket.on("fileAppending", function (data) {
	console.log(data);
	var DD = new Date();
	var Hours = DD.getHours();
	var Minutes = DD.getMinutes();
	var Seconds = DD.getSeconds();
	var MilliSec = DD.getMilliseconds();
	//document.write(Hours,"時",Minutes,"分",Seconds,"秒");                                                                                                                                                                    
	console.log("check");
	console.log(data+","+Hours+"時"+Minutes+"分"+Seconds+"秒");
	var time = data+","+Hours+":"+Minutes+":"+Seconds+":"+MilliSec+"\n";
	fs.appendFile('out.txt',time, function (err) {
	    console.log(err);
	});
    });
*/
    //ソケット通信が切断されたユーザのidを表示
    socket.on("disconnect", function() {	
	console.log("disconnected:"+socket.id);

    });
    
});
