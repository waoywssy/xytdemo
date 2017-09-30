$("#jobType0").focus(function(){
	wrktyp_getoption();
});
$("#expJobType").focus(function(){
	wrktyp_getoption();
});
function wrktyp_getoption(){
	var output='';
	output+='<option value="'+0+'">'+"-请选择工作类型-"+'</option>';
	for(var i= 1; i< Wrktyp_a.length;i++){
		output+='<option value="'+i+'">'+ Wrktyp_a[i] +'</option>';
	}
	$("#jobType0").html(output);
	$("#expJobType").html(output);
}
/*--------------------------------------------------------------*/
$("#jolisJobType").focus(function(){
	joliswrktyp_getoption();
});
function joliswrktyp_getoption(){
	var output='';
	output+='<option value="'+0+'">'+"-请选择工作类型-"+'</option>';
	for(var i= 1; i< Wrktyp_a.length;i++){
		output+='<option value="'+i+'">'+ Wrktyp_a[i] +'</option>';
	}
	$("#jolisJobType").html(output);
}