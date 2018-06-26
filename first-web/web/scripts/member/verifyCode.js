function VerifyCode(sendBtn, errPlaceId, verifyType, mobileId, memberId){
	var _this = this;
	this.wait = 60
	this._sendBtn = "#" + sendBtn;
	this._errPlaceId = "#" + errPlaceId;
	this._verifyType = verifyType;
	if(mobileId == null || mobileId == "" || typeof(mobileId) == "undefined"){
		this._mobileId = "";
	}else{
		this._mobileId = "#" + mobileId;
	}
	this._memberId = memberId;
	
	this.getVerifyCodeLogined = function(btn){
		var errPlaceObject = $(_this._errPlaceId);
		jQuery.ajax({
			type	:	"GET",
			url		:	appServer + "/common/send_verify_code_logined.htm",
			data	:	{"verifyType" : _this._verifyType},
			success	: 	function(data){
				var result = {};
				result = data.split("|");
				if(result[0] == "N"){
					alertMsg("发送失败："+result[1],'e');
				}else{
					_this.time(btn);
					//$(btn).attr("class","btn-yzm2");
					alertMsg("验证码发送成功，请注意查收！");
				}
			}
		});	
	}
	
	this.getVerifyCode = function(btn){
		var mobile = $(_this._mobileId).val();
		var errPlaceObject = $(_this._errPlaceId);
		if(mobile == null || mobile == ""){
			alertMsg("请输入您的手机号码",'e');
			return;
		}
		if(!checkMobile(mobile)){
			alertMsg("请输入正确的手机号码",'e');
			return ;
		}
	        
		jQuery.ajax({
			type	:	"POST",
			url		:	appServer + "/common/send_verify_code.htm",
			data	:	{"mobile" : mobile, "verifyType" : _this._verifyType, "memberId" : _this._memberId},
			success	: 	function(data){
				var result = {};
				result = data.split("|");
				if(result[0] == "N"){
					alertMsg("发送失败："+result[1],'e');
				}else{
					_this.time(btn);
					//$(btn).attr("class","btn-yzm2");
					alertMsg("验证码发送成功，请注意查收！",'e');
				}
			}
		});
	}
	
	this.time = function(o){
	    if (_this.wait == 0) {
	        o.removeAttribute("disabled");            
	        o.value="重新发送";
	        //$(o).attr("class","btn2");
	        _this.wait = 60;
	    } else {
	        o.setAttribute("disabled", true);
	        o.value="重新发送(" + _this.wait + ")";
	        _this.wait--;
	        setTimeout(function() {
	        	_this.time(o)
	        },
	        1000)
	    }
	}
	
	$(function(){
		if(_this._mobileId != "" && _this._mobileId != null){
			$(_this._sendBtn).click(function(){
				_this.getVerifyCode(this);
			});
		}else{
			$(_this._sendBtn).click(function(){
				_this.getVerifyCodeLogined(this);
			});
		}
	})
}