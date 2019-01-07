var file = document.getElementById('file');
var result = document.getElementById('result');


//CSVの形式は
//23,23210,1-1
//都道府県コード,市町村コード,項目番号

var loadArray;
var arrayNum;
/*
// File APIに対応しているか確認
if(window.File && window.FileReader && window.FileList && window.Blob) {
    function loadLocalCsv(e) {
	// ファイル情報を取得
	var fileData = e.target.files[0];
	console.log(fileData); // 取得した内容の確認用

	// CSVファイル以外は処理を止める
	if(!fileData.name.match('.csv$')) {
	    alert('CSVファイルを選択してください');
	    return;
	}

	// FileReaderオブジェクトを使ってファイル読み込み
	var reader = new FileReader();
	// ファイル読み込みに成功したときの処理
	reader.onload = function() {
	    //console.log(fileData);
	    var cols = reader.result.split('\n');
	    var data = [];
	    for (var i = 0; i < cols.length; i++) {
		data[i] = cols[i].split(',');
		//numToGraph(data[i][0],data[i][1],data[i][2]);
	    }
	    loadArray = data;
	    arrayNum = 0;

	    console.log(data[0]);
	    //numToGraph(data[0]);
	    //var insert = createTable(data);
	    //result.appendChild(insert);
	}
	// ファイル読み込みを実行
	reader.readAsText(fileData);
    }
    file.addEventListener('change', loadLocalCsv, false);

} else {
    file.style.display = 'none';
    result.innerHTML = 'File APIに対応したブラウザでご確認ください';
}

function createTable(data) {
    var table = document.createElement('table');
    for (var i = 0; i < data.length; i++) {
	var tr = document.createElement('tr');
	for (var j = 0; j < data[i].length; j++) {
	    var td = document.createElement('td');
	    td.innerText = data[i][j];
	    tr.appendChild(td);
	}
	table.appendChild(tr);
    }
    return table;
}
*/
function nextArray() {
    if(loadArray[arrayNum]==null){
	alert('シナリオは終了です。');
	
    }else{
	if(loadArray[arrayNum].length<2){
	    alert('シナリオは終了です。');
	}else{
	    console.log(arrayNum);
	    //arrayNum[0]:都道府県コード
	    //arrayNum[1]:市町村コード
	    //arrayNum[2]:関数番号

	    var pcode = loadArray[arrayNum][0];
	    $("#pref").val(pcode);
	    var ccode = loadArray[arrayNum][1];
	    console.log("prefC:"+pcode);
	    var promise = citySet(ccode);/*.then(function(){
		console.log("graphDistCitycode:"+data.codeNum.city.citycode);
		console.log(value);
		console.log($("#city").val());

	    });*/

	    promise.done(function(){
		numToGraph(loadArray[arrayNum]);
		//graphDistribution();
		console.log($("#city").val());
		console.log("現在の市町村:"+loadArray[arrayNum]);
		arrayNum++;
		$('#scenarioRow').val(arrayNum);
		console.log("次の市町村:"+loadArray[arrayNum]);
	    });

	}
    }

}

function scenarioLoad(){
    var fileName = "csv/trial.csv";
    httpObj = new XMLHttpRequest();
    httpObj.open('GET',fileName,true);

    httpObj.send(null);
    httpObj.onreadystatechange = function(){
	if ( (httpObj.readyState == 4) && (httpObj.status == 200) ){
	    console.log(httpObj.responseText);
            var cols = httpObj.responseText.split('\n');
	    var data = [];
	    for (var i = 0; i < cols.length; i++) {
		data[i] = cols[i].split(',');
		//numToGraph(data[i][0],data[i][1],data[i][2]);
	    }
	    loadArray = data;
	    arrayNum = 0;
	    
	    console.log(data);
	    //document.getElementById("text1").value=httpObj.responseText;
	}
    }
}
