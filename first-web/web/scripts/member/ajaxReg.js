function checkPicCode(){
	var picCode = $("#picCode").val();
	var result = true;
	if(picCode == null || picCode == ""){
		$("#picCodeErr").html("请输入图片数字");
		$("#picCodeErr").show();
		result = false;
	}else{
		jQuery.ajax({
			url		:	appServer + "/check_code_validate.htm",
			type	:	"POST",
			async	:	false,
			data	:	{code : picCode},
			success	:	function(data){
				var msg = data.split("|");
				if(msg[0] == "N"){
					result = false;
					newCheckCode();
					$("#picCodeErr").html(msg[1]);
					$("#picCodeErr").show();
				}else{
					$('.dialog-yz').hide();
					layerHide();
					$("#picCodeErr").html("");
					$("#picCodeErr").hide();
				}
			}
		});
	}
	return result;
}

var wait = 60;
function time(o){
    if (wait == 0) {
        o.removeAttribute("disabled");            
        o.value="重新发送";
        $(o).attr("class","btn-c");
        wait = 60;
    } else {
        o.setAttribute("disabled", true);
        o.value="重新发送(" + wait + ")";
        wait--;
        setTimeout(function() {
        	time(o)
        },
        1000)
    }
}

function getVerifyCode(){
	var mobile = $("#mobileAccount").val();
	if(mobile == null || mobile == ""){
		alertMsg("请输入您的手机号码", 'e');
		return;
	}
	if(!checkMobile(mobile)){
		alertMsg("请输入正确的手机号码", 'e');
		return ;
	}
    if(checkPicCode()){
    	var code = $("#picCode").val();
    	var btn = document.getElementById("sendBtn") ;
		jQuery.ajax({
			type	:	"POST",
			url		:	appServer + "/common/send_verify_code.htm",
			async	:	false,
			data	:	{"mobile" : mobile, "verifyType" : "001", "memberId" : -1, "verCode" : code},
			success	: 	function(data){
				var result = {};
				result = data.split("|");
				if(result[0] == "N"){
					alertMsg("发送失败："+result[1], 'e');
				}else{
					time(btn);
					$(btn).attr("class","btn-d");
					alertMsg("验证码发送成功，请注意查收！");
				}
				newCheckCode();
			}
		});
    }
}