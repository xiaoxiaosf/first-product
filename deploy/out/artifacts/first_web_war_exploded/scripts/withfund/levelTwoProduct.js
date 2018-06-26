function checkApplyAmount(){
	var applyAmount = $("#applyAmount").val();
	if(!applyAmount.match(/^\d{1,12}(\.\d{1,2})?$/)){
		return "请正确填写申请金额";			
	}
	if(accSub(applyAmount, minAmount) < 0){
		return "申请金额不得低于最低融资金额";
	}
	if(accSub(applyAmount, maxAmount) > 0){
		return "申请金额不能超过最高融资金额";
	}
	return "";
}

function increaseApplyAmount(){
	var applyAmount = $("#applyAmount").val();
	if(checkApplyAmount() == ""){
		var addFrequency = 1;
		if(applyAmount.length > 1){
			with(Math){ 
				addFrequency = pow(10,applyAmount.length-2);
			}
		}
		var newApplyAmount = accAdd(applyAmount, addFrequency);
		if(accSub(newApplyAmount, maxAmount) <= 0){
			$("#applyAmount").val(newApplyAmount);
			showInterest();
			calcDeposit();
		}		
	}
}

function decreaseApplyAmount(){
	var applyAmount = $("#applyAmount").val();
	if(checkApplyAmount() == ""){
		var subFrequency = 1;
		if(applyAmount.length > 1){
			with(Math){ 
				subFrequency = pow(10,applyAmount.length-2);
			}
		}
		var newApplyAmount = accSub(applyAmount, subFrequency);
		if(accSub(newApplyAmount, minAmount) >= 0){
			$("#applyAmount").val(newApplyAmount);
			showInterest();
			calcDeposit();
		}		
	}
}

function checkWithCycle(){
	var withCycle = $("#withCycle").val();
	if(!withCycle.match(/^\d+$/)){
		$("#errorPlace").html("融资周期只能是正整数");
		$("#errorPlace").show();
		return false;
	}else{
		$("#errorPlace").html("");
		$("#errorPlace").hide();
	}
	if(accSub(withCycle,min) < 0 || accSub(withCycle,max) > 0){
		$("#errorPlace").html("融资周期只能是$!{withCycle.desc}");
		$("#errorPlace").show();
		return false;
	}else{
		$("#errorPlace").html("");
		$("#errorPlace").hide();			
	}
	return true;
}

function increaseWithCycle(){
	if(checkWithCycle()){
		var withCycle = $("#withCycle").val();
		var newCycle = accAdd(withCycle, 1);
		if(accSub(newCycle, max) <= 0){
			$("#withCycle").val(newCycle);
		}	
	}
}

function decreaseWithCycle(){
	if(checkWithCycle()){
		var withCycle = $("#withCycle").val();
		var newCycle = accSub(withCycle, 1);
		if(accSub(newCycle, min) >= 0){
			$("#withCycle").val(newCycle);
		}	
	}
}	

function checkWithLever(){
	var withLever = $.trim($("#withLever").val());
	if(withLever == null || withLever == ""){
		$("#errorPlace").html("请填写资金比例资金比例");
		$("#errorPlace").show();
		return false;
	}else{
		$("#errorPlace").html("");
		$("#errorPlace").hide();
	}
	if(!withLever.match(/^([1-5])$/)){
		$("#errorPlace").html("资金比例只能是1到5倍");
		$("#errorPlace").show();
		return false;
	}else{
		$("#errorPlace").html("");
		$("#errorPlace").hide();
	}	
	return true;
}

function increaseWithLever(){
	if(checkWithLever()){
		var withLever = $.trim($("#withLever").val());
		var newLever = accAdd(withLever,1);
		if(accSub(newLever,5) <= 0){
			$("#withLever").val(newLever);
			calcDeposit();
		}
	}
}

function decreaseWithLever(){
	if(checkWithLever()){
		var withLever = $.trim($("#withLever").val());
		var newLever = accSub(withLever,1);
		if(accSub(newLever,1) >= 0){
			$("#withLever").val(newLever);
			calcDeposit();
		}
	}		
}

function showInterest(){
	var applyAmount = $("#applyAmount").val();
	var interestObjArray = $(".interest");
	var interestShow = "0%";
	$.each(interestObjArray,function(){
		var min = accMul($(this).attr("minVal"), 10000);
		var max = accMul($(this).attr("maxVal"), 10000);
		if((accSub(applyAmount, min) > 0) && (accSub(applyAmount, max) <= 0)){
			interestShow = $(this).html() + "分";
			return ;
		}
	});
	$("#withInterest").html(interestShow);
}

function calcDeposit(){
	var applyAmount = $("#applyAmount").val();
	if(!isMoney(applyAmount)){
		return;
	}
	var withLever = $("#withLever").val();
	var deposit = accDiv(applyAmount, withLever);
	var leastDeposit = myRound(deposit,2);
	$("#withDeposit").html(formatYuan(leastDeposit) + "元");
}

function productApply(){
	if(checkApplyAmount() != ""){
		return;
	}
	if(!checkWithCycle()){
		return;
	}
	if(!checkWithLever()){
		return;
	}
	jQuery.ajax({
		type	:	"POST",
		url		:	appServer + "/product/apply.htm",
		data	:	$("#withApply").serializeArray(),
		success	:	function(data){
			var result = data.split("|");
			if(result[0] == "success"){
				//申请成功
				alertSuccess(350, "融资申请成功", null);
			}else if(result[0] == "needLogin"){
				window.location.href = appServer + "/member/login.htm?tg=" + appServer + "/product/" + $("#productId").val() + ".htm";
			}else if(result[0] == "needCertificate"){
				window.location.href = appServer + "/myspace/member/member_bank_init.htm";
			}else{
				$("#errorPlace").html(result[1]);
				$("#errorPlace").show();
			}
		}
	});
}
