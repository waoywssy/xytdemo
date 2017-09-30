function buildSelect(target, arr, defaultText) {
	var output ='<option value="' + 0 + '" selected>-请选择' + defaultText +'-</option>';
	for(var i in arr) {
		output += '<option value="' + i + '">' + arr[i] + '</option>';
	}
	$("#" + target).html(output);
}

$(document).ready(function () {

	var ug = universitygropsUgrp;
	
	$("#stumajorEdi1").focus(function() {
		if($(this).val()==""||$("this").val()==null){
			buildSelect("stumajorEdi1", ug[100000000], "所在学院");
		}
	});

	var p2 = $("#stumajorEdi2").parent(), p3 = $("#stumajorEdi3").parent(), p4 = $("#stumajorEdi4").parent();

	p2.hide();
	p3.hide();
	p4.hide();

	$("#stumajorEdi1").change(function(){
		var id = $("#stumajorEdi1").val();
		buildSelect("stumajorEdi2", ug[id], "所在系");

		$("#stumajorEdi2").change();
		p2.show();
		p3.hide();
		p4.hide();
	});

	$("#stumajorEdi2").change(function(){
		
		var id = $("#stumajorEdi2").val();
		buildSelect("stumajorEdi3", ug[id], "所在专业");

		$("#stumajorEdi3").change();
		p3.show();
		p4.hide();
	});

	$("#stumajorEdi3").change(function(){

		var id = $("#stumajorEdi3").val();
		buildSelect("stumajorEdi4", ug[id], "所属班级");

		$("#stumajorEdi4").change();
		p4.show();
	});
});