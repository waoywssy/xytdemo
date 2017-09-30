var attachMessage = {//附加信息
	    "ameId":"",//主键Integer
	    "ameStuId":"",//学生表主键Integer
	    "ameAttachmessage":""//附加信息（400字）
};
function getAmeInfo(){
	var stuId=personalBaseInfo.stuId;
	var urlHref=window.location.href;
	var guid=urlHref.split("#")[1];
	$.ajax({
		url:homeUrl+'ame/getAmeInfo',
		async:false, //改成同步
		data:{
		    "ameStuId":stuId,
		    "guid":guid,
		},
		type:'post',
		success:function(date){
			var jsonMap=JSON.parse(date);
			if(jsonMap.code==301){
        		alert("您为非法用户");
        		window.location.href=homeUrl+'stu/safe'; 
        	}else if(jsonMap.code==302){
        		alert("您停留时间过长");
        		window.location.href=homeUrl+'stu/safe'; 
            }else if(jsonMap.code==200){
				var list=jsonMap.data;
				if(list.length>0){
				attachMessage=list[0];
				$("#addInfoPreview").empty();//每次点击，请div内容清空，但是不删除当前div节点
//				var ameDescribe=attachMessage.ameDescribe.split("；");
				var ame=$("#addInfoPreview").append("<div class='click_to_ed' id='toEdiAddInfo'><span onclick='toEdiAme()'>点此编辑</span><div class='editBtn'></div>"+
						"<div class='clear'></div></div><ul class='list-unstyled'>"+
					    "<li><label class='pre_label'>其它  :</label><pre id='amepre'></pre></li>" +
					    "</ul><div class='clear'></div>");
//				for(var i=0;i<ameDescribe.length-1;i++){
//					var ameAttachmessage = ameDescribe[i];
//					$("#amepre").append("<font color='black' size='4'>"+ameAttachmessage+"；</font></br>");
//					} 
				if(attachMessage.ameDescribe==""||attachMessage.ameDescribe==null){
					var str="编辑请按以下格式\n自我评价：\n      xxxxxxx;\n      xxxxxxx;\n      xxxxxxx。\n校内荣誉：\n      xxxxxxx;\n      xxxxxxx;\n      xxxxxxx。";
					$("#amepre").html(str);
				}else{
					$("#amepre").html(attachMessage.ameDescribe);
				}
				}else{
					var str="编辑请按以下格式\n自我评价：\n      xxxxxxx;\n      xxxxxxx;\n      xxxxxxx。\n校内荣誉：\n      xxxxxxx;\n      xxxxxxx;\n      xxxxxxx。";
					$("#amepre").html(str);
				}
			}
		},
		error:function () {
            alert("访问服务器失败！");
        },
    })
}
//获得附加信息
$('#getAmeInfo').click( function(){
	getAmeInfo();
});

$('#toEdiAddInfo').click( function(){
	$('#addInfo').css('display', 'block');
    $('#addInfoPreview').css('display', 'none');
});

//附加信息之点击编辑
function toEdiAme(){
    $('#addInfo').css('display', 'block');
    $('#addInfoPreview').css('display', 'none');
//    var ameDescribe=str.split("；");
//    document.getElementById('ametextarea').value = ameDescribe[0]+";";
//    for(var i=1;i<ameDescribe.length-1;i++){
//		var ameAttachmessage = ameDescribe[i];
//		document.getElementById('ametextarea').value +="\r\n"+ameAttachmessage+";";
////		$("#ametextarea").append(+ameAttachmessage+"；</br>");
//		} 
    document.getElementById('ametextarea').value="";
	document.getElementById('ametextarea').value+=attachMessage.ameDescribe;
}   
//附加信息之点击修改或者保存
function updateorsave_edu(){
	attachMessage.ameDescribe=$("#ametextarea").val();
	if(attachMessage.ameDescribe.length>800){
		$('#ametextareaspan').css('display', 'block');
	}else {
		if(attachMessage.ameId>0){
		update_edu()
	}else{
		save_edu();
	}
		}
}
$("#ametextarea").bind('input propertychange',function(){
	var ameDescribe=$("#ametextarea").val();
	if(ameDescribe.length>800){
		$('#ametextareaspan').css('display', 'block');
	}else{
		$('#ametextareaspan').css('display', 'none');
	}
	});
function update_edu(){
	attachMessage.ameStuId=personalBaseInfo.stuId;
	var urlHref=window.location.href;
	var guid=urlHref.split("#")[1];
	$.ajax({
		url:homeUrl+'ame/updateAmeInfo?guid='+guid,
		async:false, //改成同步
		data:attachMessage,
		type:'post',
		success:function(date){
			var jsonMap=JSON.parse(date);
			if(jsonMap.code==200){
				alert("保存成功");
				getAmeInfo();
				$('#addInfo').css('display', 'none');
			    $('#addInfoPreview').css('display', 'block');
			}
		},
		error:function () {
            alert("访问服务器失败！");
        },
    })
}
function save_edu(){
	attachMessage.ameStuId=personalBaseInfo.stuId;
	var urlHref=window.location.href;
	var guid=urlHref.split("#")[1];
	$.ajax({
		url:homeUrl+'ame/saveAmeInfo?guid='+guid,
		async:false, //改成同步
		data:attachMessage,
		type:'post',
		success:function(date){
			var jsonMap=JSON.parse(date);
			if(jsonMap.code==200){
				alert("保存成功");
				getAmeInfo();
				$('#addInfo').css('display', 'none');
			    $('#addInfoPreview').css('display', 'block');
			}
		},
		error:function () {
            alert("访问服务器失败！");
        },
    })
}






