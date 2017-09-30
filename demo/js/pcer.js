/**
 * 证书模块
 */
var procertificatePcer  = {//证书
    "pcerId":"",//主键Integer
    "pcerStuId":"",//学生表主键Integer
    "pcerName":"",//名称
    "pcerMark":"",//分数（可以没有）Integer
    "pcerGetTime":"",//获得时间
    "pcerDefined":""//自定义证书名
};
function getPcerInfo(){
    var stuId=personalBaseInfo.stuId;
    var urlHref=window.location.href;
    var guid=urlHref.split("#")[1];
    $.ajax({
        url:homeUrl+'pcer/getPcerInfo',
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
                $("#certPrev div:first").empty();//每次点击，请div内容清空，但是不删除当前div节点
                if(list.length>0){
                    for(var i=0;i<list.length;i++){
                        var procertificatePcer = list[i];
                        createDivPcer(procertificatePcer);
                    }
                }else{
                    createDivfordeletePcer();
                }
            }
        },
        error:function () {
            alert("访问服务器失败！");
        },
    })
}
//获得证书信息
$('#getPcerInfo').click( function(){
    getPcerInfo();
});
//对应拿到证书信息的附属方法
function createDivPcer(procertificatePcer){
	//时间
    var pcerGetTime=procertificatePcer.pcerGetTime.split(",");
    var getCerYear=pcerGetTime[1];
    var getCerMonth=trueMonth(pcerGetTime[0].split(" ")[0]);
    //证书名称
   /* if(procertificatePcer.pcerName==100){
        var pcerName=procertificatePcer.pcerDefined;
    }else{
        pcerName=ce_a[procertificatePcer.pcerName];
       
    }*/
    //分数
    if(procertificatePcer.pcerMark==""||procertificatePcer.pcerMark==null){
        var pcermark="";
    }else{
        var pcermark=procertificatePcer.pcerMark;
    }
   // console.log("procertificatePcer.pcerDefined="+procertificatePcer.pcerDefined);
    var jsonstr = JSON.stringify(procertificatePcer);
    $("#certPrev div:first").append("<div id='pcer"+procertificatePcer.pcerId+"'><div class='click_to_ed'><span onclick='toEdipcer("+jsonstr+")'>点此编辑</span><div class='editBtn'/></div><ul class='list-unstyled'>"+
        "<li><label class='pre_label' id='certificate_id"+procertificatePcer.pcerId+"'>获得证书</label>：<span>"+procertificatePcer.pcerDefined+"</span></li>"+
        
        "<li id='pcermarklipre"+procertificatePcer.pcerId+"'><label class='pre_label'>分数</label>：<span>"+pcermark+"</span></li>"+ 
        
        "<li><label class='pre_label'>获得时间</label>： <span>"+getCerYear+"</span> 年 <span>"+getCerMonth+"</span>月</li>"+
        "</ul><div class='delete'><a class='delete_btn' title='点击删除该列' onclick='delete_pcer("+procertificatePcer.pcerId+");'></a></div></div>");
    if(procertificatePcer.pcerMark==null||procertificatePcer.pcerMark==""){
	   $("#pcermarklipre"+procertificatePcer.pcerId+"").css('display', 'none');
   }else{	   
	   $("#pcermarklipre"+procertificatePcer.pcerId+"").css('display', 'block');
   }
}

//解决删除最后一个问题
function createDivfordeletePcer(){
    $("#certPrev div:first").append("<div><div class='click_to_ed'><span onclick='toEdipcer()'>点此编辑</span><div class='editBtn'/></div><ul class='list-unstyled'>"+
        "<li><label class='pre_label'>获得证书</label>：<span>未填写</span></li>"+
        "<li><label class='pre_label'>分数</label>：<span>未填写</span></li>"+
        "<li><label class='pre_label'>获得时间</label>： <span>某</span> 年 <span>某</span>月</li>"+
        "</ul></div></div>");
}
//证书信息之点击编辑
function toEdipcer(procertificatePcer){
    $('#cerEdit').css('display', 'block');
    $('#certPrev').css('display', 'none');
    //获取对应的分数
    if(/*procertificatePcer.pcerMark==0||*/procertificatePcer.pcerMark==null){
    	console.log("procertificatePcer.pcerMark="+procertificatePcer.pcerMark);
        var pcermark="";
    }else{
        var pcermark=procertificatePcer.pcerMark;
    }
    $("#pcerMark").val(pcermark);
    //获取对应的主键Id
    $("#pcerId").attr("value",procertificatePcer.pcerId);
    //获取对应的证书名称
    $("#certificate_id").val(procertificatePcer.pcerDefined);
    //获取对应的时间（证书获取时间）
    //入学时间
    var pcerGetTime=procertificatePcer.pcerGetTime.split(",");
    var getCerYear=pcerGetTime[1].trim();
    var getCerMonth=trueMonth(pcerGetTime[0].split(" ")[0]);
    $("#getCerYear option[value='"+getCerYear+"']").attr("selected","selected");//根据值让option选中
    $("#getCerYear").change();
    $("#getCerMonth option[value='"+getCerMonth+"']").attr("selected","selected");//根据值让option选中
    $("#getCerMonth").change();
}
//删除证书信息
function delete_pcer(pcerId){
	var stuId=personalBaseInfo.stuId;
    var urlHref=window.location.href;
	var guid=urlHref.split("#")[1];
    if(confirm("确定要删除该列吗？")){
        $.ajax({
            url:homeUrl+'pcer/deletePcerInfo',
            async:false, //改成同步
            data:{
                "pcerId":pcerId,
                "stuId":stuId,
                "guid":guid,
            },
            type:'post',
            success:function(date){
                var jsonMap=JSON.parse(date);
                if(jsonMap.code==200){
                	alert("删除成功");
                    getPcerInfo();
                }else if(jsonMap.code==398){
                    alert("未获得值");
                }else if(jsonMap.code==301){
            		alert("您为非法用户");
            		window.location.href=homeUrl+'stu/safe'; 
            	}else if(jsonMap.code==302){
            		alert("您停留时间过长");
            		window.location.href=homeUrl+'stu/safe'; 
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
//创建证书信息并保存
function add_pcer(){
    $('#cerEdit').css('display', 'block');
    $('#certPrev').css('display', 'none');
    $("#pcerMark").val('');
    /*$("#certificate").val('');
    $("#certificate_2").val('');
    $("#certificate_3").val('');*/
    $("#certificate_id").val('');
    $("#pcerId").attr("value",0);
    $("#getCerYear").val(0);//根据值让option选中
    $("#getCerMonth").val(0);
}
//证书信息创建和保存
function saveorupdatePcer(){
    if ($('#certificate_id').val()==null||$('#certificate_id').val()==""){
        $("#certificatespan2").css("display","block");
    }else if($('#PcerEnGr select:eq(0)').val() ==0 || $('#PcerEnGr select:eq(1)').val() ==0 ||$('#PcerEnGr select:eq(0)').val()==""){
        $("#PcerEnGrspan").css("display","block");
    }/*else if($("#pcerMark").val()==""||$("#pcerMark").val()==0){
    	console.log("$('#pcerMark').val()="+$("#pcerMark").val()+"------------------");
    	 $("#pcerMark").css("display","none");
    }*/else{
        var pcerId =$('#pcerId').val();//$('#pcerId').val();
        alert(pcerId);
        if(pcerId!=""&&pcerId>0){
            procertificatePcer.pcerId=pcerId;
            updatePcerInfo();
        }else{
            savePcerInfo();
        }
   }
}
//获得时间校验
$("#PcerEnGr").change(function(){
    if($('#PcerEnGr select:eq(0)').val() ==0 || $('#PcerEnGr select:eq(1)').val() ==0 ||$('#PcerEnGr select:eq(0)').val()==""){
        $("#PcerEnGrspan").css("display","block");
    }else{
        $("#PcerEnGrspan").css("display","none");
    }
});


//证书名称校验
$("#certificate_id").bind(' input propertychange ', function(){
    if($('#certificate_id').val()!=null){
        $("#certificatespan2").css("display","none");
    }else{
        $("#certificatespan2").css("display","block");
    }
    
    
});
//自定义证书校验
$("#certificate").change(function(){
    if($('#certificate option:selected').val()!="00"||$("#certificate_3").val().trim()!=""){
        $("#certificatespan2").css("display","none");
    }else{
        $("#certificatespan2").css("display","block");
    }
});
$("#certificate_3").bind(' input propertychange ', function(){
    if($('#certificate_3').val()==null||$('#certificate_3').val()==""){
		 $("#certificatespan2").css("display","block");
	}else{
		$("#certificatespan2").css("display","none");
	}
});
//分数校验
$("#pcerMark").bind('input propertychange',function(){
    if($('#pcerMark').val()>0){
    }else{
        var pcerMark1=$('#pcerMark').val();
        pcerMark1 = pcerMark1.replace(/\D+/,"");
        $('#pcerMark').val(pcerMark1);
    }
});

//证书长度校验

/*if ($("#majorPre").val().trim().length > 32) {
	$("#pskiNamespanA").css("display", "block");
} else {
	$("#pskiNamespanA").css("display", "none");
}*/
$("#certificate_id").bind('input propertychange',function(){
	//alert();
	if($("#certificate_id").val().trim().length>32){
		$("#").css("display", "block");
	}else{
		$("#").css("display", "none");
	}
})



//$("#pcerMark").keydown(function(){
//	if($('#pcerMark').val()!=null){
//		alert($('#pcerMark').val());
//		
//	}
//});
//else if($("#pcerMark").val().trim()<0||$("#pcerMark").val().trim()==""){
//	$("#pcerMarkspan").css("display","block");
//}
//$("#certificate").change(function(){
//	if($('#certificate option:selected').val()!="00"||$("#certificate_3").val().trim()!=""){
//		$("#certificatespan2").css("display","none");
//	}
//});
//跳转到创建证书表
function savePcerInfo(){
	
    //获得技能名称
   /* var pcerName1=$('#certificate option:selected').val();
    if(pcerName1=="00"){
        procertificatePcer.pcerDefined=$("#certificate_3").val().trim();
        procertificatePcer.pcerName=100;
    }else{
        procertificatePcer.pcerName=$('#certificate_2 option:selected').val();
    }*/
	 //获得技能名称
	procertificatePcer.pcerDefined=$("#certificate_id").val();
    var getCerYear=$('#PcerEnGr select:eq(0)').val();
    var getCerMonth=$('#PcerEnGr select:eq(1)').val();
    procertificatePcer.pcerGetTime=(""+getCerYear+"/"+getCerMonth+"/01").trim();
    procertificatePcer.pcerMark=$("#pcerMark").val().trim();
    procertificatePcer.pcerStuId=personalBaseInfo.stuId;
    //所在地
//	var province= $('#eduExpPlace select:eq(0)').val();
//    var city = $('#eduExpPlace select:eq(1)').val();
//    var district= $('#eduExpPlace select:eq(2)').val();
//    if(city==""){
//    	district=province;
//    }else if(district==""){
//    	district=city;
//    }
    var urlHref=window.location.href;
	var guid=urlHref.split("#")[1];
    $.ajax({
        url:homeUrl+'pcer/savePcerInfo?guid='+guid,
        async:false, //改成同步
        data:procertificatePcer,
        type:'post',
        success:function(date){
            var jsonMap=JSON.parse(date);
            if(jsonMap.code==200){
            	alert("保存成功");
                getPcerInfo();
                $('#cerEdit').css('display', 'none');
                $('#certPrev').css('display', 'block');
            }else if(jsonMap.code==301){
        		alert("您为非法用户");
        		window.location.href=homeUrl+'stu/safe'; 
        	}else if(jsonMap.code==302){
        		alert("您停留时间过长");
        		window.location.href=homeUrl+'stu/safe'; 
            }else{
				alert("保存失败");
				console.log(jsonMap.code);
			}
        },
        error:function () {
            alert("访问服务器失败！");
        },
    })
}
//修改证书信息
function updatePcerInfo(){
    //获得技能名称
	procertificatePcer.pcerDefined=$("#certificate_id").val();
    //时间
    var getCerYear=$('#PcerEnGr select:eq(0)').val();
    var getCerMonth=$('#PcerEnGr select:eq(1)').val();
    procertificatePcer.pcerGetTime=(""+getCerYear+"/"+getCerMonth+"/01").trim();
    //分数
    procertificatePcer.pcerMark=$("#pcerMark").val().trim();
    console.log("procertificatePcer.pcerMark="+procertificatePcer.pcerMark);
    //stuId
    procertificatePcer.pcerStuId=personalBaseInfo.stuId;
    var urlHref=window.location.href;
	var guid=urlHref.split("#")[1];
    $.ajax({
        url:homeUrl+'pcer/updatePcerInfo?guid='+guid,
        async:false, //改成同步
        data:procertificatePcer,
        type:'post',
        success:function(date){
            var jsonMap=JSON.parse(date);
            if(jsonMap.code==200){
                alert("修改成功");
                getPcerInfo();
                $('#cerEdit').css('display', 'none');
                $('#certPrev').css('display', 'block');
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
