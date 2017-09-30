/**
 * 技能特长模块
 */

function getPskiInfo(){
	var stuId=personalBaseInfo.stuId;
	var urlHref=window.location.href;
	var guid=urlHref.split("#")[1];
	$.ajax({
		url:homeUrl+'pski/getPskiInfo',
		async:false, //改成同步
		data:{
		    "stuId":stuId,
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
				$("#skiPreview div:first").empty();//每次点击，请div内容清空，但是不删除当前div节点
				if(list.length>0){
					for(var i=0;i<list.length;i++){
						proskillsPski = list[i];
						createDivPski(proskillsPski);
						} 
				}else{
					createDivfordeletePski();
				}
			}
		},
		error:function () {
            alert("访问服务器失败！");
        },
    })
}
//获得技能特长信息
$('#getPskiInfo').click( function(){
	getPskiInfo();
});
//对应拿到技能信息的附属方法
function createDivPski(proskillsPski){
	var pskiLeveltoshow=pskiLevelToShow(proskillsPski.pskiLevel);
//	var pskiName=m_a[proskillsPski.pskiName]
//	proskillsPski.pskiName=pskiName;
	var jsonstr = JSON.stringify(proskillsPski);
            $("#skiPreview div:first").append("<div id='pski"+proskillsPski.pskiId+"'><div class='click_to_ed'><span onclick='toEdipSki("+jsonstr+")'>点此编辑</span><div class='editBtn'/></div><ul class='list-unstyled'>"+
    		"<li><label class='pre_label'>技能 / 特长</label>：<span>"+proskillsPski.pskiName+"</span></li>"+
    		"<li><label class='pre_label'>掌握程度</label>：<span>"+pskiLeveltoshow+"</span></li>"+
//    		"<li style='display:none'><label class='pre_label'>技能特长主键</label>:<span>"+proskillsPski.pskiId+"</span></li>"+
			"</ul><div class='delete'><a class='delete_btn'  title='点击删除该列' onclick='delete_pski("+proskillsPski.pskiId+");'></a></div></div>");
	
}
//对应拿到技能信息的附属方法
function createDivfordeletePski(proskillsPski){
            $("#skiPreview div:first").append("<div><div class='click_to_ed'><span onclick='toEdipSki()'>点此编辑</span><div class='editBtn'/></div><ul class='list-unstyled'>"+
    		"<li><label class='pre_label'>技能 / 特长</label>：<span>未填写</span></li>"+
    		"<li><label class='pre_label'>掌握程度</label>：<span>未填写</span></li>"+
//    		"<li style='display:none'><label class='pre_label'>技能特长主键</label>:<span>"+proskillsPski.pskiId+"</span></li>"+
			"</ul></div>");
}
//对应拿到技能信息的附属方法-将integer类型的 pskiLevel改成string类型的可显示字段
function pskiLevelToShow(pskiLevel){
	switch(pskiLevel)
	   {
	   case 1:
		   pskiLevel="了解";
	     break
	   case 2:
		   pskiLevel="一般";
	     break
	   case 3:
		   pskiLevel="熟练";
		 break
	   case 4:
		   pskiLevel="精通";
	   case 5:
		   pskiLevel="专家";
		 break
		default:"未填写"
	   }
	return pskiLevel;
}
//技能信息之点击编辑
function toEdipSki(proskillsPski){
    $('#skillEdit').css('display', 'block');
    $('#skiPreview').css('display', 'none');
      $("#pskiIds").attr("value",proskillsPski.pskiId);
      $("#majorPre").val(proskillsPski.pskiName);
      $("#pskiLevel").val(proskillsPski.pskiLevel);
      $("#pskiNamespan").css("display","none");
      $("#pskiLevelspan").css("display","none");
}
//技能点击之取消编辑
function uneditPski(){
	 $('#skillEdit').css('display', 'none');
	 $('#skiPreview').css('display', 'block');
	 
}
//删除技能信息
function delete_pski(pskiId){
	var stuId=personalBaseInfo.stuId;
    var urlHref=window.location.href;
	var guid=urlHref.split("#")[1];
	if(confirm("确定要删除该列吗？")){
		$.ajax({
			url:homeUrl+'pski/deletePskiInfo',
			async:false, //改成同步
			data:{
				 "pskiId":pskiId,
				 "stuId":stuId,
				 "guid":guid,
				 },
			type:'post',
			success:function(date){
				var jsonMap=JSON.parse(date);
				if(jsonMap.code==200){
					alert("删除成功");
					getPskiInfo();
				}else if(jsonMap.code==301){
	        		alert("您为非法用户");
	        		window.location.href=homeUrl+'stu/safe'; 
	        	}else if(jsonMap.code==302){
	        		alert("您停留时间过长");
	        		window.location.href=homeUrl+'stu/safe'; 
	            }else if(jsonMap.code==398){
					alert("未获得值");
				}else{
					alert("删除失败");
				}
			},
			error:function () {
	            alert("访问服务器失败！");
	        },
	    });        
	}
}
//创建技能信息并保存
function add_pski(){
		 $('#skillEdit').css('display', 'block');
		 $('#skiPreview').css('display', 'none');
		    $("#pskiNamespan").css("display","none");
	        $("#pskiLevelspan").css("display","none");
		    $("#majorPre").val('');
		    $("#pskiIds").attr("value",0);
		    $("#pskiLevel option[value='"+0+"']").attr("selected","selected");//根据值让option选中 
}
//技能信息创建和保存
function saveorupdatePski(){
    if($('#majorPre').val().trim()==""){
		$("#pskiNamespan").css("display","block");
		//$("#eduExpEnGr").append("<span id='eduExpEnGrspan'><font color='red' size='5'>请输入完整时间</font></span>");
	}else if($("#pskiLevel option:selected").val()<=0){
		$("#pskiLevelspan").css("display","block");
		//$("#eduExpPlace").append("<span id='eduExpPlacespan'><font color='red' size='5'>请输入所在地</font></span>");
	}else{
		var pskiId=$('#pskiIds').val();
		if(pskiId!=""&&pskiId>0){
			proskillsPski.pskiId=pskiId;
			updatePskiInfo();
		}else{
			savePskiInfo();
		}
	}
}

//技能名称校验.
//$("#majorPre").keydown(function(){
//	if($('#majorPre').val().trim()!=""){
//		$("#pskiNamespan").css("display","none");
//	}
//});
$("#majorPre").bind('input propertychange',function(){
	if($('#majorPre').val().trim()!=""){
		$("#pskiNamespan").css("display","none");
	}else{
		$("#pskiNamespan").css("display","block");
	}
	if ($("#majorPre").val().trim().length > 32) {
		$("#pskiNamespanA").css("display", "block");
	} else {
		$("#pskiNamespanA").css("display", "none");
	}
	});
//掌握程度校验
$("#pskiLevel").change(function(){
	if($("#pskiLevel option:selected").val()>0){
		$("#pskiLevelspan").css("display","none");
	}else{
		$("#pskiLevelspan").css("display","block");
	}
});
//跳转到创建技能表
function savePskiInfo(){
	//获得等级
	var proskillsPski={};
	proskillsPski.pskiLevel=$("#pskiLevel option:selected").val();
	//获得技能名称
    proskillsPski.pskiName=$("#majorPre").val().trim();
	proskillsPski.pskiStuId=personalBaseInfo.stuId;
	var urlHref=window.location.href;
	var guid=urlHref.split("#")[1];
    //所在地
	$.ajax({
		url:homeUrl+'pski/savePskiInfo?guid='+guid,
		async:false, //改成同步
		data:proskillsPski,
		type:'post',
		success:function(date){
			var jsonMap=JSON.parse(date);
			if(jsonMap.code==200){
				alert("保存成功");
				getPskiInfo();
				 $('#skillEdit').css('display', 'none');
				 $('#skiPreview').css('display', 'block');
			}else if(jsonMap.code==301){
        		alert("您为非法用户");
        		window.location.href=homeUrl+'stu/safe'; 
        	}else if(jsonMap.code==302){
        		alert("您停留时间过长");
        		window.location.href=homeUrl+'stu/safe'; 
            }else{
            	alert("保存失败");
            }
		},
		error:function () {
            alert("访问服务器失败！");
        },
    })
}
//修改技能经历信息
function updatePskiInfo(){
	//获得等级
	proskillsPski.pskiLevel=$("#pskiLevel option:selected").val();
	//获得技能名称
    proskillsPski.pskiName=$("#majorPre").val().trim();
	proskillsPski.pskiStuId=personalBaseInfo.stuId;
	var urlHref=window.location.href;
	var guid=urlHref.split("#")[1];
    //根据编码得到技能名称
	$.ajax({
		url:homeUrl+'pski/updatePskiInfo?guid='+guid,
		async:false, //改成同步
		data:proskillsPski,
		type:'post',
		success:function(date){
			var jsonMap=JSON.parse(date);
			if(jsonMap.code==200){
				alert("修改成功");
				getPskiInfo();
				 $('#skillEdit').css('display', 'none');
				 $('#skiPreview').css('display', 'block');
			}else if(jsonMap.code==301){
        		alert("您为非法用户");
        		window.location.href=homeUrl+'stu/safe'; 
        	}else if(jsonMap.code==302){
        		alert("您停留时间过长");
        		window.location.href=homeUrl+'stu/safe'; 
            }else{
            	alert("修改失败");
            }
		},
		error:function () {
            alert("访问服务器失败！");
        },
    })
}
