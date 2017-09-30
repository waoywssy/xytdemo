$("#enterpriseType0").focus(function(){
	cmptyp_getoption();
});
$("#cmptypType").focus(function(){
	cmptyp_getoption();
});
function cmptyp_getoption(){
	var output='';
	output+='<option value="'+0+'">'+"-请选择公司性质-"+'</option>';
	for(var i=1;i< cmptyp_a.length;i++){
		output+='<option value="'+i+'">'+ cmptyp_a[i] +'</option>';
	}
	$("#enterpriseType0").html(output);
	$("#cmptypType").html(output);
}
/*--------------------------------------------------------------*/
$("#enterInfoCmptyIdEdi").focus(function(){
	entercmptyp_getoption();
});
function entercmptyp_getoption(){
	var output='';
	output+='<option value="'+0+'">'+"-请选择公司性质-"+'</option>';
	for(var i=1;i< cmptyp_a.length;i++){
		output+='<option value="'+i+'">'+ cmptyp_a[i] +'</option>';
	}
	$("#enterInfoCmptyIdEdi").html(output);
}