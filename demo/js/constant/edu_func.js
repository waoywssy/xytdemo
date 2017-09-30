$("#diplomas").focus(function(){
	edu_getoption();
});
function edu_getoption(){
	var output='';
	output+='<option value="'+0+'">'+"-请选择学历-"+'</option>';
	for(var i= 1; i< edu_a.length;i++){
		output+='<option value="'+i+'">'+ edu_a[i] +'</option>';
	}
	$("#diplomas").html(output);
}
/*--------------------------------------------------------------*/
$("#jolisEduIdEdi").focus(function(){
	jolisedu_getoption();
});
function jolisedu_getoption(){
	var output='';
	output+='<option value="'+0+'">'+"-请选择学历-"+'</option>';
	for(var i= 1; i< edu_a.length;i++){
		output+='<option value="'+i+'">'+ edu_a[i] +'</option>';
	}
	console.log(edu_a);
	$("#jolisEduIdEdi").html(output);
}