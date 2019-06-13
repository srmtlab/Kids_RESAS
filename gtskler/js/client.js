var socket = null;
var height = 40;
var width = 40;

var userRoom;
var sceHeight;


//クライアントをサーバのソケットに接続
$(function () {
    //socket = io({path: '/socket.io/'});
    socket = io({path: '/gtskler/socket.io/'});
    console.log(socket);
    $("#entrance").show();
    //$("#entrance").hide();
    $("#maincontents").hide();
    //$("#maincontents").show();
    $("#scenario").hide();
    quesCoord = [];

    receiveQuestion();
    receiveGraphDist();
    receiveEnterRoom();
    receiveQuiz();


    
});



function showTeacherMode(){

    $("#scenario").show();
    sceHeight = $("#scenario").height();
    var cStart = $("#up").height()+$("#top").height();
    $("#myCanvas").css({top:cStart+sceHeight});
}

function shareQuiz(){
    var result = prompt( "クイズを入力してください" , "" );

    if(result){
	console.log(" OK が押された:" + result);
	$.ipop(result);
	quizText = result;
	socket.emit("shareQuiz",quizText);    
    }else{
	console.log(" CANCEL が押された");
    }

}

function clearCanvas(){
    console.log("clear");
    var canvas = document.getElementById("myCanvas");
    var c = canvas.getContext("2d");
    c.clearRect(0,0,$("#myCanvas").width(),$("#myCanvas").height());
    quesCoord = [];
    //以下iframe問題用
    var cStart = $("#up").height()+$("#top").height();
    sizingIframe(cStart);
}

function sizing(cStart){
    console.log("In sizing:" + cStart);
    //$("#wrapper").height(document.body.clientHeight - $("#up").height());
    //alert("sinzing");
    var wrapperHeight = 1650;
    var wrapperWidth = 1450;
    $("#wrapper").height(wrapperHeight);
    $("#wrapper").width(wrapperWidth);

    var newHeight = $("#wrapper").height();
    
    $("#myCanvas").attr({height:newHeight});
    
    $("#myCanvas").css({top:cStart});
    $("#myCanvas").attr({width:$("#wrapper").width()});
    
    $("#chart_div").height(newHeight);
    $("#chart_div").css({top:cStart});

    
    $("#chart_div").width($("#wrapper").width());
    console.log("chartW: "+$("#wrapper").width());
    
}

function sizingIframe(cStart){
    return new Promise(function(resolve){
	console.log("In sizing:" + cStart);
	var newHeight = $("#wrapper").height();
	//$("#myFrame").height(newHeight);
	$("#myFrame").height(fHeight);
	$("#myFrame").css({top:cStart});
	$("#myFrame").width(fWidth);
	//$("#myFrame").width($("#wrapper").width());
	$("#myFrame").innerWidth(fWidth);
	$("#myFrame").innerHeight(fHeight);
	console.log("fWidth: "+fWidth);
	console.log("frameWidth: "+$("#myFrame").width());
	console.log("innerHeight: "+$("#myFrame").innerWidth());
	
	console.log("fWidth: "+fWidth);
	//$("#myFrame").css({width:fWidth,height:fHeight});
	console.log("frameWidth: "+$("#myFrame").width());
	console.log("innerWidth: "+$("#myFrame").innerWidth());
	//alert("wid:"+$("#myFrame").width()+",hei"+$("#myFrame").height());
	//alert("sizingiframe:"+$("#myFrame").width());
	resolve();
    });
    
    
}

    // Canvas上の座標を計算する為の関数たち
function scrollX(){
    return document.documentElement.scrollLeft || document.body.scrollLeft;
}
function scrollY(){
    return document.documentElement.scrollTop || document.body.scrollTop;
}

function getPos (event) {
    var canvas = document.getElementById("myCanvas");
    var mouseX = event.clientX - $(canvas).position().left + scrollX();
    var mouseY = event.clientY - $(canvas).position().top + scrollY();
    return {x:mouseX, y:mouseY};
}

/*
function getPosT (canvas,event) {
    var mouseX = event.touches[0].clientX - $(canvas).position().left;
    var mouseY = event.touches[0].clientY - $(canvas).position().top;
    return {x:mouseX, y:mouseY};
}
*/

function drawQuestion() {
    console.log("wrapper");
    var canvas = document.getElementById("myCanvas");
    var c = canvas.getContext("2d");
    console.log("click");

    var pos = getPos(event);
    var cWidth = canvas.clientWidth;
    var cHeight = canvas.clientHeight;
    console.log(cWidth + " px / " + cHeight + " px");
    //var cSize = {width:cWidth, height:cHeight};
    console.log("x=" + pos.x + ", y=" + pos.y);
    console.log(document.getElementById('question'));
    var uid = document.selbox.userid.value;
    var newQuest = document.getElementById('question');
    quesCoord.push([uid,{pos,uid}]);
    c.drawImage(newQuest, pos.x - width/2, pos.y - height/2, width, height);

    socket.emit("fileAppending","グラフクリック送信");
    socket.emit("clicked", {pos,uid});
}

//wrapper要素とその子要素(canvas,chart_div)を初期化                                                                                                                 
function canvasInitialize() {
    //続けて項目を選択した時に、前に表示している地図を削除する
    quesCoord = [];
    var node = document.getElementById('chart_div');
    
    if(node != null){
        node.parentNode.removeChild(node);
        var node = document.getElementById('wrapper');
        node.parentNode.removeChild(node);
    }
    
    
    var wrapper = document.createElement('div');
    wrapper.setAttribute("id","wrapper");

    wrapper.setAttribute("class","wrapper");
    document.body.appendChild(wrapper);

    var canvas = document.createElement('canvas');
    canvas.setAttribute("id","myCanvas");
    canvas.setAttribute("cursor","pointer");//追記
    canvas.setAttribute("onClick","drawQuestion()");
    /*
    canvas.setAttribute("z-index","10");
    canvas.setAttribute("display","block");
    canvas.setAttribute("position","absolute");
    */
    //canvas.addEventListener("mouseover","questionAlert()");
    wrapper.appendChild(canvas);
    canvas.addEventListener('mousemove',onMousemove,false);

    var chart_div = document.createElement('div');
    chart_div.setAttribute("id","chart_div");
    chart_div.setAttribute("overflow","auto");//iframe問題用
    chart_div.setAttribute("display","inline-block");//iframe問題用   
    
    wrapper.appendChild(chart_div);
    document.getElementById("chart_div").style.WebkitOverflowScrolling = 'touch';
    var container = document.getElementById("container");
    var rect = container.getBoundingClientRect();
    //var cStart = rect.top + rect.height + window.pageYOffset;
    var cStart = $("#up").height()+$("#top").height();
    console.log("canvas開始位置:" + cStart);

    
    //kidsresas setIframe追記
    var iframe = document.createElement('iframe');
    iframe.setAttribute("id", "myFrame");
    //iframe.setAttribute("width", "1px");
    //iframe.setAttribute("min-width", "100%");
    iframe.setAttribute("width", "100%");
    iframe.setAttribute("height", "100%");
    iframe.setAttribute("width", "1400");
    //iframe.setAttribute("height", "1600");
    
    iframe.setAttribute("scrolling","no");    //iframe問題用
    iframe.setAttribute("display","block");
    iframe.setAttribute("border","none");
    iframe.setAttribute("overflow","auto");
    
    iframe.setAttribute("sandbox", "allow-same-origin allow-scripts allow-top-navigation");
    iframe.setAttribute("onload","if ( /(iPad|iPhone|iPod)/g.test( navigator.userAgent ) ) {var viewer = document.getElementById( '#myFrame' ); viewer.style.width = getComputedStyle( viewer ).width; viewer.style.height = getComputedStyle( viewer ).height; viewer.setAttribute( 'scrolling', 'no' );}");

/*
    var script = document.createElement("script");
    var textNode = document.createTextNode("if ( /(iPad|iPhone|iPod)/g.test( navigator.userAgent ) ) {var viewer = document.getElementById( '#myFrame' ); viewer.style.width = getComputedStyle( viewer ).width; viewer.style.height = getComputedStyle( viewer ).height; viewer.setAttribute( 'scrolling', 'no' );}");
    script.appendChild(textNode);
    iframe.appendChild(script);
  */  
    document.getElementById("chart_div").appendChild(iframe); 

     
    //kidsresas setIframe追記
    /*
    var chart_dummy = document.createElement('div');
    chart_dummy.setAttribute("id","chart_dummy");
    chart_dummy.setAttribute("overflow","auto");//iframe問題用
    chart_dummy.setAttribute("display","inline-block");//iframe問題用

    wrapper.appendChild(chart_dummy);
    document.getElementById("chart_dummy").style.WebkitOverlowScrolling = 'touch';

    var dummyframe = document.createElement('iframe');
    dummyframe.setAttribute("id", "dummyFrame");
    //iframe.setAttribute("width", "1px");
    //iframe.setAttribute("min-width", "100%");
    dummyframe.setAttribute("width", "100%");
    dummyframe.setAttribute("height", "100%");
    dummyframe.setAttribute("width", "1400");
    dummyframe.setAttribute("height", "1600");

    dummyframe.setAttribute("scrolling","auto");    //iframe問題用
    dummyframe.setAttribute("display","block");
    dummyframe.setAttribute("border","none");
    dummyframe.setAttribute("src","");
    document.getElementById("chart_dummy").appendChild(dummyframe);
    */
    sizing(cStart);
    sizingIframe(cStart);

}

function receiveQuestion() {
    socket.on("clicked", function (data) {

	socket.emit("fileAppending","グラフクリック受信");
	var canvas = document.getElementById("myCanvas");
	var c = canvas.getContext("2d");
	
	var cWidth = canvas.clientWidth;
	var cHeight = canvas.clientHeight;
        console.log("on click, pos: " + JSON.stringify(data.pos));
        //画面サイズによってdrawAgrichartなどで描画するグラフの縮小率が変化してしまうためグラフを分解してdrawImageの位置を変える必要があるが
        //同じサイズのタブレットを使っているとして割愛
	var newQuest = document.getElementById('question');
	//posの値と個人IDをグローバル変数として保持,posから範囲内のマウスオーバーでIDをアラートする方向で	
        c.drawImage(newQuest, data.pos.x - width/2, data.pos.y - height/2 , width, height);
	quesCoord.push([data.uid,data]);
        
    });
}

function receiveGraphDist(){
    socket.on("graphDistribution", function(data) {
	socket.emit("fileAppending","グラフ共有受信");
	console.log(data);
	console.log(data.funcName);
	console.log(data.codeNum);
	var prefcode = data.codeNum.pref;
	$("#pref").val(prefcode);
	//document.selbox.pref.selectedIndex = data.codeNum.pref;


	/*
	var parent = document.getElementById("city");
	
	while (parent.firstChild) parent.removeChild(parent.firstChild);//市町村のセレクトボックス初期化
	//セレクトボックスにソケットで送られた市町村を追加
	var selCity = document.createElement("option");
        selCity.value = "-";
        selCity.text = "市町村を選ぶ";
        document.getElementById("city").appendChild(selCity);
	var op = document.createElement("option");
	op.value = data.codeNum.city.citycode;
	op.text = data.codeNum.city.cityname;
	document.getElementById("city").appendChild(op);
	document.selbox.city.selectedIndex = 1;//セレクトボックスには「市町村を選ぶ」とソケットで受け取った市町村しかないので選択される

	window[data.funcName]();
	citySet(data.codeNum.city.citycode).then(function(value){
	    //$("#city").val(value);
	    console.log("graphDistCitycode:"+data.codeNum.city.citycode);
	    console.log(value);
	    console.log($("#city").val());

	}).catch(function (error) {
	    // 非同期処理失敗。呼ばれない
	    console.log(error);
	});
	*/

	var citycode = data.codeNum.city.citycode;
	var promise = citySet(citycode);
	promise.done(function(){
	    window[data.funcName](); 
	});
	
	//citySet(data.codeNum.city.citycode);
	//console.log("graphDistCitycode:"+data.codeNum.city.citycode);
	//console.log($("#city").val());
	//window[data.funcName](1,[data.codeNum.pref,data.codeNum.city.citycode]);
    });
}

function receiveEnterRoom(){
    socket.on("enter", function(data){
	console.log("enter");
	var roomName = data.value;
	console.log(roomName);
	$("#usersRoomId").val(roomName);
	
    });

}

function receiveQuiz(){
    socket.on("shareQuiz", function(data){
	console.log("receiveQuiz");
	console.log(data);
	$.ipop(data);
    });


}

function throttle(targetFunc, time) {
    var _time = time || 100;
    clearTimeout(this.timer);
    this.timer = setTimeout(function () {
        targetFunc();
    }, _time);
}
function objCheck(event){
    throttle(function() {
	
	var pos = getPos(event);
	console.log("クリック"+JSON.stringify(pos));
	for(i = 0;i < quesCoord.length; i++){
            console.log(quesCoord[i][1].pos.x+" " +pos.x);
            if(((quesCoord[i][1].pos.x - 10) <= pos.x && (quesCoord[i][1].pos.x + 10) >= pos.x) && ((quesCoord[i][1].pos.y - 10) <= pos.y && (quesCoord[i][1].pos.y + 10) >= pos.y)){
		alert("ID:"+quesCoord[i][0]);	
            }
	}		
        // 描画処理
    }, 100);
    
}

function onMousemove(event){
    objCheck(event);
}

function graphDistribution(){
    var funcName = document.getElementById("funcname").value;
    //window[funcName]();
    var prefnum = document.selbox.pref.selectedIndex;
    var prefcode = document.selbox.pref.options[prefnum].value;
    var prefname = document.selbox.pref.options[prefnum].innerText;
    var citynum = document.selbox.city.selectedIndex;
    var citycode = document.selbox.city.options[citynum].value;
    var cityname;
    console.log(citycode);
    if(citycode == "-"){
        cityname = "全体";
    }else{
        cityname = document.selbox.city.options[citynum].innerText;
    }
    var codeNum = {pref:prefcode,city:{citycode,cityname}};

    socket.emit("graphDistribution",{funcName,codeNum});
    socket.emit("fileAppending","グラフ共有送信");

}
function roomEnter(){
    var roomName = document.forms.room.roomid.value;
    console.log(roomName);
    socket.emit("enter", {value:roomName});
    userRoom = roomName;
    $("#entrance").hide();
    $("#maincontents").show();
    
}

function socketRoom(){
    socket.on("init", function(data){
	console.log("入室完了");
    });    
}
function getRandomNumber() {
   var randnum = Math.floor( Math.random() * 1000 );
   document.getElementById("randomNum").innerHTML = randnum;
}

function numToGraph(array) {

    console.log(array);
    var itemNum = array[2];

    switch( itemNum ){
    case '1-1':
	linkToPopComp();
	console.log("1-1");
	break;
    case '1-2':
	linkToPyramid();
	console.log("1-2");
	break;
    case '1-3':
	linkToPopSum();
	break;
    case '1-4':
	linkToPopFur();
	break;
    case '2-1':
	linkToTourToVisitor();
	break;
    case '2-2':
	linkToTourFromVisitor();
	break;
    case '2-3':
	linkToTourDest();
	break;
    case '2-4':
	linkToGuestCount();
	break;
    case '2-5':
	linkToPopCircle();
	break;
    case '3-1-1':
	linkToMuniComp();
	break;
    case '3-1-2':
	linkToMuniVal();
	break;
    case '3-1-3':
	linkToMuniProd();
	break;
    case '3-2-1':
	drawAgriChart();
	break;
    case '3-2-2':
	linkToAgriLand();
	break;
    case '3-2-3':
	linkToAgriSales();
	break;
    case '3-2-4':
	linkToAgriAge();
	break;
    case '3-3-1':
	linkToForestIncome();
	break;
    case '3-3-2':
	linkToForestLand();
	break;
    case '3-4-1':
	linkToFishery('1');
	break;
    case '3-4-2':
	linkToFishery('3');
	break;
    case '3-4-3':
	linkToFisheryBoat();
	break;
//3-5-1
	
    case '3-5-2':
	linkToIndusTrans('3');
	break;
    case '3-5-3':
	linkToIndusTrans('1');
	break;
//3-6-1
    case '3-6-2-1':
	linkToConsComm('1');
	break;
    case '3-6-2-2':
	linkToConsComm('2');
	break;

    case '4-1':
	linkToRegProd();
	break;
//4-2,4-3
    case '4-2':
	linkToMuniWages();
	break;
    case '4-3':
	linkToMuniTaxes();
	break;
    }
	
}
