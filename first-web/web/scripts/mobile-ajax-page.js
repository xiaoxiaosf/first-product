

/*
 * 分页相关的jQuery脚本。 author: xiejh date: 2014-9-29
 */

function pager(form, containId, action) {
	this._form = form;
	this._containId = containId;
	this._action = action;
	var _this = this;
	
	this.paginate = function(p) {
		var totalPage = $("#_total_page").val();
		var currPage = parseInt(p);
		if(parseInt(totalPage) <= currPage){
			$("#showMoreBtn").hide();
		}
		if(parseInt(totalPage) < currPage){
			return;
		}
		$("#next_page").next().val(currPage + 1);
		if (_this._form != "") {
			
			if (_this._action == "") {
				_this._action = $("#" + _this._form).attr("action");
			}
			if(_this._action == ""){
				return;
			}
			$("#" + _this._form + " input[type=hidden][name=currentPage]")
					.remove();
			$("#" + _this._form)
					.append("<input type='hidden' name='currentPage' value='"
							+ p + "' />");
			jQuery.ajax({
				type	:	'POST',
				url		:	_this._action,
				data	:	$("#" + _this._form).serializeArray(),
				success	:	function(data){
					$("#"+_this._containId).append(data);
				}
			});
		}else{
			if(_this._action == null){
				return;
			}
			jQuery.ajax({
				type	:	'POST',
				url		:	_this._action,
				data	:	{"currentPage" : p},
				success	:	function(data){
					$("#"+_this._containId).append(data);
				}
			});
		}
	}

	$("#next_page").bind("click", function() {
				_this.paginate($.trim($(this).next().val()));
			});
}

$(function() {
	try {
		new pager(_form, _containId, _action);
	} catch (e) {
	}
});
