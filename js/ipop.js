var quizText;
(function($) {
    $.ipop = function(text) {
	var wx, wy;    // ウインドウの左上座標
	console.log("ipopに渡されたテキスト:"+text);

	console.log(text.length);
	var quotient = 7;
	var row = (text.length)/quotient;
	var rowLen = 85;
	var maxRowLen = Math.ceil(row)*rowLen;
	$("#ipop").height(maxRowLen);
	var target = document.getElementById("quizText");
	var popHeight = $('#ipop').height();
	var popWidth = $('#ipop').width();
	
	console.log("ipopHeight:"+popHeight);
	console.log("ipopWidh:"+popWidth);
	target.innerHTML = text;
	// ウインドウの座標を画面中央にする。
	wx = $(document).scrollLeft() + ($(window).width() - $('#ipop').outerWidth()) / 2;
	if (wx < 0) wx = 0;
	wy = $(document).scrollTop() + ($(window).height() - $('#ipop').outerHeight()) / 2;
	if (wy < 0) wy = 0;

	// ポップアップウインドウを表示する。
	$('#ipop').css({top: wy, left: wx}).fadeIn(100);

	// 閉じるボタンを押したとき
	$('#ipop_close').click(function() {$('#ipop').fadeOut(100);});

	// タイトルバーをドラッグしたとき
	$('#ipop_title').mousedown(function(e) {
	    var mx = e.pageX;
	    var my = e.pageY;
	    $(document).on('mousemove.ipop', function(e) {
		wx += e.pageX - mx;
		wy += e.pageY - my;
		$('#ipop').css({top: wy, left: wx});
		mx = e.pageX;
		my = e.pageY;
		return false;
	    }).one('mouseup', function(e) {
		$(document).off('mousemove.ipop');
	    });
	    return false;
	});
    }
})(jQuery);
