function reg(){
	var mobile = $("#mobileAccount").val();
	if(mobile.isNotBlank()){
		if(!checkMobile(mobile)){
			alertMsg("请输入正确的手机号码",'e');
			return;
		}else{
			if(checkAccount(mobile)){
				alertMsg("该手机号码已存在",'e');
				return;
			}
		}
	}else{
		alertMsg("请输入手机号码",'e');
		return;
	}
	var regCode = $("#regVerifyCode").val();
	if(!regCode.isNotBlank()){
		alertMsg("请输入手机验证码",'e');
		return;
	}
	var pwd = $("#pwd").val();
	if(pwd.isNotBlank()){
		var pwdLength = pwd.length;
		if(pwdLength > 20 || pwdLength < 6){
			alertMsg("请输入6到20位的密码",'e');
			return;
		}
	}else{
		alertMsg("请输入密码",'e');
		return;
	}
	var pwdConfirm = $("#pwdConfirm").val();
	if(pwdConfirm.isNotBlank()){
		if(pwdConfirm != pwd){
			alertMsg("两次密码不一致",'e');
			return;
		}
	}else{
		alertMsg("请再次确认密码",'e');
		return;
	}
	var agree = $('#agreement').is(':checked');
	if(!agree){
		alertMsg("请同意并接受《米牛网注册协议》",'e');
		return;
	}
	layerHide();
	$("#regForm").submit();
}

/**
 * 检查注册的帐号是否已存在
 * @param account
 * @param type
 */
function checkAccount(account){
	var is_exist = false;
	jQuery.ajax({
		type	:	"post",
		url		:	appServer + "/check_account.htm",
		data	:	{"account" : account},
		async	:	false,
		success	: 	function(data){
			if(data == "yes"){
				is_exist = true;
			}
		},
		error : function(){
			alert("服务器异常");
		}
	});
	return is_exist;
}

/**
 * 身份证号码正则校验
 * @param number
 * @returns {Boolean}
 */
function checkIdCard(number){
	if($.trim(number)==''||!/^[0-9]{17}[0-9X]$/.test(number)){
		return false;
	}
	var weights = new Array(7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2);
	var parityBits = new Array("1", "0", "X", "9", "8", "7", "6", "5", "4","3", "2");
	var power = 0;
	for ( var i = 0; i < 17; i++) {
		power += parseInt(number.charAt(i),10)*weights[i];
	}
	return parityBits[power%11]==number.substr(17);
}

var uploadServer;
function setUploadServer(uploadServer){
	this.uploadServer = uploadServer;
}

function ajaxFileUpload(id){
	var obj_id= id+"File";
	var obj_div= id+"_div";
	var divContent = $("#" + obj_div).html();
	$("#" + obj_div).html("");
	$("#" + id).parent(".sfz").addClass("loading");
    jQuery.ajaxFileUpload({
            url:appServer+'/common/fileUpload.htm?objName='+obj_id,//用于文件上传的服务器端请求地址
            secureuri:false,//一般设置为false
            fileElementId:obj_id,//文件上传空间的id属性 
            dataType: 'json',//返回值类型 一般设置为json
            success: function (data, status){  //服务器成功响应处理函数
            	//alert(data)
            	if(typeof(data.error) !='undefined'){
            		var msg = decodeURIComponent(data.error);
            		$("#errorPlace").html(msg);
            	}else{
            		 var img ="<img src=\"" + uploadServer + "/"+data.accessUrl+"_100_100.img\"/>";
            		 $("#"+id).val(data.accessUrl);
    				 $("#"+obj_div).html(img);
    				 $("#" + id).parent(".sfz").removeClass("loading");
    				 $("#errorPlace").html("");
            	}
            },
            error: function (data, status, e){//服务器响应失败处理函数
                alert("上传证件照失败：" + e);
                $("#" + id).parent(".sfz").removeClass("loading");
                $("#" + obj_div).html(divContent);
            }
        });
   
}