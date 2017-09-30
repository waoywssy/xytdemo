$("#jolisLanguageId1").focus(function(){
	if($("#jolisLanguageId1").val()==""||$("#jolisLanguageId1").val()==null){
		var i=10;
		jolisLanguageIdfun1(i);
	}
});
$("#jolisLanguageId1").change(function(){
	var i=$("#jolisLanguageId1").val();
	if(i=="12000"||i=="13000"||i=="1000"){
		$("#jolisLanguageId2").css("display","inline-block");
		$("#jolisLanguageId2").val(0);
		$("#jolisLanguageId2").change();
			if(i==0){
				jolisLanguageIdfun2(0);
			}else{
				jolisLanguageIdfun2(i);
			}
	}else{
		$("#jolisLanguageId2").css("display","none");
	}
	
});
function jolisLanguageIdfun1(i){
	var s1=language[i];
	var output='';
	output+='<option value="'+0+'">'+"-请选择语言-"+'</option>';
	for(var i in s1){
		output+='<option value="'+i+'">'+ s1[i] +'</option>';
	}
	$("#jolisLanguageId1").html(output);
}
function jolisLanguageIdfun2(i){
	var s1=language[i];
	var output='';
	output+='<option value="'+0+'">'+"-请选择语言-"+'</option>';
	for(var i in s1){
		output+='<option value="'+i+'">'+ s1[i] +'</option>';
	}
	$("#jolisLanguageId2").html(output);
}