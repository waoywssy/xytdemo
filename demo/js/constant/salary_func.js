$("#eptPay").focus(function(){
	salary_getoption();
});
function salary_getoption(){
	var output='';
	output+='<option value="'+0+'">'+"-请选择薪资范围-"+'</option>';
	for(var i=1;i<salary_a.length;i++){
		output+='<option value="'+i+'">'+ salary_a[i] +'</option>';
	}
	$("#eptPay").html(output);
}