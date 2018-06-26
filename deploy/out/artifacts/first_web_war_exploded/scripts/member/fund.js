function ajaxGetFund(callBack){
	jQuery.ajax({
		url		:	appServer + "/member/getFundAccount.htm",
		type	:	"GET",
		success	:	function(data){
			callBack(data);
		}
	});
}

function calcChargeCommission(inMoney){
	return accDiv(Math.ceil(accMul($("#inMoney").val(),400)/1000),100);
}

function calcFee(){
	var inMoney = $("#inMoney").val();
	if(!inMoney.match(/^\d{1,7}(\.\d{1,2})?$/)){
		inMoney = 1000;
		$("#inMoney").val(inMoney);
	}else if(accSub(inMoney,1) < 0){
		inMoney = 1;
		$("#inMoney").val(inMoney);
	}else if(accSub(inMoney, 1000000) > 0){
		inMoney = 1000000;
		$("#inMoney").val(inMoney);
	}
	var commissionFee = calcChargeCommission(inMoney);
	//var totalPay = accAdd(commissionFee, inMoney);
	var totalPay = inMoney;//目前暂时不收手续费
	$("#commissionFee").html('<del>'+formatMoney(commissionFee)+'</del>');
	$("#totalPay").html(formatMoney(totalPay));
	var show = convertCurrency(inMoney);
	$("#inMoneyErr").html(show);
}