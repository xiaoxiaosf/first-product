

//右边栏导航
$(function() {
	$(".top-menu .btn").click(function () {$(".right-menu").animate({width: "50%"},500);});
	$(".right-menu").click(function (e) {$(this).animate({width: "0px"},200);});
	$(".right-menu a").click(function (e) {e.stopPropagation();});	//阻止事件冒泡
}); 

//弹出提示框
function alertMsg(msg,type){
	if(type == 'e'){var m = $('<div class="alert-e">' + msg + "</div>");
	}else if(type == 's'){
		var h6 = msg.substring(0, msg.indexOf('&'));
		var p = msg.substring( msg.indexOf('&')+1,msg.length);
		var m = $('<div class="alert-r"><h6>' + h6 + '</h6><p>' + p + '</p><span></span></div>'
	);}else if(type == 'er'){
		var h6 = msg.substring(0, msg.indexOf('&'));
		var p = msg.substring( msg.indexOf('&')+1,msg.length);
		var m = $('<div class="alert-er"><h6>' + h6 + '</h6><p>' + p + '</p><span></span></div>'
	);}else{var m = $('<div class="alert-s">' + msg + "</div>");}
    $("body").append(m);
	if(type == 's'){layerShow();$(".alert-r").bind("click", function(){$(this).hide();layerHide()});}
	if(type == 'er'){layerShow();$(".alert-er").bind("click", function(){$(this).hide();layerHide()});}
    window.body = setTimeout(function() {$(".alert-e").remove();$(".alert-s").remove()},2000);
}

//弹出遮罩层
function layerShow(){
	var m = $('<div class="layer"></div>');
    $("body").append(m);
}

//隐藏遮罩层
function layerHide(){$(".layer").remove();}




//确认提示框confirm
function confirmPop(t, f1, f2){
	layerShow();
	var m = $('<div class="confirm"><h4>请确认信息</h4><p>' + t + "</p></div>");
	$('<button type="button" class="y" >确定</button>').appendTo(m).bind('click', function(event) {
    	$(".confirm").remove();$(".layer").remove();if(f1)f1();
    });
	$('<button type="button" class="n" >取消</button>').appendTo(m).bind('click', function(event) {
    	$(".confirm").remove();$(".layer").remove();if(f2)f2();
    });
	$("body").append(m);	
}





function hideAddressBar_ios(){
	if(document.documentElement.scrollHeight <= document.documentElement.clientHeight) {
		bodyTag = document.getElementsByTagName('body')[0];
		bodyTag.style.height = document.documentElement.clientWidth / screen.width * screen.height + 'px';
	}
	setTimeout(function(){
		window.scrollTo(0, 1); 
	}, 100);
};
function hideAddressBar_android(){
	var n = navigator.userAgent;
	if(n.match(/UCBrowser/i)){
		//uc浏览器
		hideAddressBar_ios();
		return false;
	}
	var self = document.getElementsByTagName('body')[0];
	if (self.requestFullscreen) {
		self.requestFullscreen();
	} else if (self.mozRequestFullScreen) {
		self.mozRequestFullScreen();
	} else if (self.webkitRequestFullScreen) {
		self.webkitRequestFullScreen();
	}
};
//window.addEventListener("load",function(){
	//navigator.userAgent.match(/Android/i) ? hideAddressBar_android() : hideAddressBar_ios();
//});

$(window).resize(function(){
	$(".footer").css({ "width": "100%", "bottom": "0", "left": "0", "right": "0" });
	$(".header").css({ "width": "100%", "top": "0", "left": "0", "right": "0" });
});

$(window).scroll(function(){
	$(".footer").css({ "width": "100%", "bottom": "0", "left": "0", "right": "0" });
	$(".header").css({ "width": "100%", "top": "0", "left": "0", "right": "0" });
});

//$(function() {$(".footer").fadeIn("slow");});
//$(function() {$(".footer").animate({bottom:'0px'})});
