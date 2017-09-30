var teachId=1;
var guid="37g337Q99hAP0KShTqhhn9ZI11lLpONT";
window.onload = onloadteachstuInfos();
//点击跳转老师查看学生信息页面
function onloadteachstuInfos(){
	var stuNumber="";
	var stuName="";
	var stuIdcard="";
	var stuMobphone="";
	var cuurentPage=1;
	var pagesize=5;
	getStuInfoLists(stuNumber,stuName,stuIdcard,stuMobphone,cuurentPage,pagesize);
}
//获取学生列表的方法
function getStuInfoLists(stuNumber,stuName,stuIdcard,stuMobphone,cuurentPage,pagesize){
	$.ajax({
		url:homeUrl+'stu/getstuLists',
		async:false, //改成同步
		data:{
		    "teachId":teachId,
		    "guid":guid,
		    "stuNumber":stuNumber,
		    "stuName":stuName,
		    "stuIdcard":stuIdcard,
		    "stuMobphone":stuMobphone,
		    "cuurentPage":cuurentPage,
		    "pagesize":pagesize,
		},
		type:'post',
		success:function(data){
            var jsonMap=JSON.parse(data);
            if(jsonMap.code==301){
        		alert("您为非法用户");
        		window.location.href="getJoblists.html"; 
        	}else if(jsonMap.code==302){
        		alert("您停留时间过长");
        		window.location.href="getJoblists.html"; 
            }else if(jsonMap.code==200){
				var list=jsonMap.data;
				$("#showstuListPrei").empty();
				var currentTime=jsonMap.currentTime;
				var currentTimes=currentTime.split("-");
				 if(list.length>0){
					 for(var i=0;i<list.length;i++){
						 var stuInfo=list[i];
							//获取性别
							var gender="";
		                	var genderNumber=stuInfo.stuIdcard.substring(16,17);
		                	if(genderNumber%2==1){
		                     	gender="男";
		                   }else{
		                	    gender="女";
		                   }
			                //获取年龄
		                	var stuDobyear=stuInfo.stuIdcard.substring(6,10);
		                	var stuDobmonth=stuInfo.stuIdcard.substring(10,12);
		                	var stuDobday=stuInfo.stuIdcard.substring(12,14);
		                	var stuage=currentTimes[0]-stuDobyear;
		                	if(currentTimes[1]-stuDobday>0){
		                		stuage=stuage-1;
		                	}
			               //学院
		                	var academy=parseInt((stuInfo.stuCostId+"").substring(0,3)+"000000");
		                    var academypreview=universitygropsUgrp[100000000][academy];
		                    var department=parseInt((stuInfo.stuCostId+"").substring(0,5)+"0000");
		                    var departmentpreview=universitygropsUgrp[academy][department];
		                    var major=parseInt((stuInfo.stuCostId+"").substring(0,7)+"00");
		                    var majorpreview=universitygropsUgrp[department][major];
		                    var gradepreview=universitygropsUgrp[major][stuInfo.stuCostId];
			                //是否在职
			                /*if(stuInfo.stuEmployment==0){
			               	 $("#stuEmploymentpreview").html("否");
			                }else{
			               	 $("#stuEmploymentpreview").html("是");
			                }*/
			               
						$("#showstuListPrei").append('<li class="teach_stu_list_item default_list">'+
                               ' <div class="pli_top tea_stu_detail_info" >'+
                                    '<div class="fl pli_top_l">'+
                                        '<div class="position_name">'+
                                            '<h2 class="fl">'+
                                                '<a class="tech_stu_name fl wordCut" title="" style="text-decoration: none">'+
                                                    '<b>'+stuInfo.stuName+' </b>'+
                                                    '<div class="teach_stu_Pinfo"><span>[</span><span>'+gender+'</span><span>/</span><span>'+stuage+'</span><span>岁</span><span>]</span></div>'+
                                                    '<span>&nbsp;&nbsp;</span>'+
                                                    '<span>'+stuInfo.stuNumber+'</span>'+
                                                '</a>'+
                                            '</h2>'+
                                        '</div>'+
                                        '<div class="position_main_info wordCut">'+academypreview+"/"+departmentpreview+'</div>'+
                                    '</div>'+
                                    '<div class="teacherL pli_top_r">'+
                                        '<div class="wordCut" style="height: 34px">'+
                                            '<span>'+stuInfo.stuIdcard+'</span>'+
                                        '</div>'+
                                        '<div class="industry wordCut">'+
                                            '<span>'+stuInfo.stuMobphone+'</span>'+
                                        '</div>'+
                                    '</div>'+
                               ' </div>'+
                            '</li>');
						}
				 }
			    //分页代码
				var PageUtils=jsonMap.datapage;
				var pagesLi=PageUtils.currentPage;
				var currentNode=$(".stuinfospagination li.active a");
				currentNode.html(pagesLi);
				pagesLi=pagesLi+1;
				currentNode.parent().next("li").children(":first").html(pagesLi);
				pagesLi=pagesLi+1;
				currentNode.parent().next("li").next("li").children(":first").html(pagesLi);
				pagesLi=pagesLi+1;
				currentNode.parent().next("li").next("li").next("li").children(":first").html(pagesLi);
				$("#stuinfostotalPage").html(PageUtils.totalPage);
						
			}
		},
		error:function () {
            alert("访问服务器失败！");
        },
    })
}
////////////////////////////////////////////////////////////////////////////////
//分页需要设置的全局变量
var overRetrievalcondition=0;//全局变量检索条件
var overretrievalcontent="";//全局变量检索内容
//跳转页面分页代码
$(".tojumpstuinfos").click(function (e){
	var cuurentPage=$(this).text();//获取当前页码
	var TotalPage=$("#stuinfostotalPage").text();//获取总页数
	if(cuurentPage>=TotalPage){
		cuurentPage=TotalPage;
		alert("将进入尾页");
	}else{
		var pagesize=5;
		var stuNumber="";
		var stuName="";
		var stuIdcard="";
		var stuMobphone="";
		if(overRetrievalcondition==1){
			stuNumber=overretrievalcontent;
//			$("#Retrievalcondition").val(+overRetrievalcondition);
//			$("#retrievalcontent").val(+overretrievalcontent);
		}else if(overRetrievalcondition==2){
			stuName=overretrievalcontent;
		}else if(overRetrievalcondition==3){
			stuIdcard=overretrievalcontent;
		}else if(overRetrievalcondition==4){
			stuMobphone=overretrievalcontent;
		}
		getStuInfoLists(stuNumber,stuName,stuIdcard,stuMobphone,cuurentPage,pagesize);
	}
	e.preventDefault();
})
//下一页分页代码
$("#stuinfosNextPage").click(function (e) {
	var cuurentPage=$(".stuinfospagination li.active a").text();
	cuurentPage=cuurentPage*1+1;
	var TotalPage=$("#stuinfostotalPage").text();//获取总页数
	if(cuurentPage>TotalPage){
		alert("已经是最后一页了");
		e.preventDefault();
	}else{
		var pagesize=5;
		var pagesize=5;
		var stuNumber="";
		var stuName="";
		var stuIdcard="";
		var stuMobphone="";
		if(overRetrievalcondition==1){
			stuNumber=overretrievalcontent;
		}else if(overRetrievalcondition==2){
			stuName=overretrievalcontent;
		}else if(overRetrievalcondition==3){
			stuIdcard=overretrievalcontent;
		}else if(overRetrievalcondition==4){
			stuMobphone=overretrievalcontent;
		}
		getStuInfoLists(stuNumber,stuName,stuIdcard,stuMobphone,cuurentPage,pagesize);
	}
	e.preventDefault();
})
//上一页分页代码
$("#stuinfosLastPage").click(function (e) {
	var cuurentPage=$(".stuinfospagination li.active a").text();
	cuurentPage=cuurentPage-1;
	if(cuurentPage<1){
		alert("已经是第一页了");
	}else{
		var pagesize=5;
		var pagesize=5;
		var stuNumber="";
		var stuName="";
		var stuIdcard="";
		var stuMobphone="";
		if(overRetrievalcondition==1){
			stuNumber=overretrievalcontent;
		}else if(overRetrievalcondition==2){
			stuName=overretrievalcontent;
		}else if(overRetrievalcondition==3){
			stuIdcard=overretrievalcontent;
		}else if(overRetrievalcondition==4){
			stuMobphone=overretrievalcontent;
		}
		getStuInfoLists(stuNumber,stuName,stuIdcard,stuMobphone,cuurentPage,pagesize);
	}
	e.preventDefault();
})
//输入跳转几页 分页代码
$("#jumpbuttonstuinfos").click(function (e) {
	var cuurentPage=$("#jumpPageInputstuinfos").val();
	if(!/^[0-9]*$/.test(cuurentPage)||cuurentPage==""){
        alert("请输入数字");
    }
	var TotalPage=$("#stuinfostotalPage").text();//获取总页数
	if(cuurentPage<1||cuurentPage>TotalPage){
		alert("请输入1至"+TotalPage+"内的数字");
	}else{
		var pagesize=5;
		var pagesize=5;
		var stuNumber="";
		var stuName="";
		var stuIdcard="";
		var stuMobphone="";
		if(overRetrievalcondition==1){
			stuNumber=overretrievalcontent;
		}else if(overRetrievalcondition==2){
			stuName=overretrievalcontent;
		}else if(overRetrievalcondition==3){
			stuIdcard=overretrievalcontent;
		}else if(overRetrievalcondition==4){
			stuMobphone=overretrievalcontent;
		}
		getStuInfoLists(stuNumber,stuName,stuIdcard,stuMobphone,cuurentPage,pagesize);
	}
	e.preventDefault();
})
//
$('#Retrievalcondition').change(function(){
	var Retrievalcondition=$("#Retrievalcondition").val();
	if(Retrievalcondition==0){
		$("#retrievalcontent").css("display","none");
	}else{
		$("#retrievalcontent").css("display","inline-block");
	}
});
//使用筛选条件进行筛选
$("#startretrieval").click(function (e) {
	var cuurentPage=1;
	var pagesize=5;
	var stuNumber="";
	var stuName="";
	var stuIdcard="";
	var stuMobphone="";
	var Retrievalcondition=$("#Retrievalcondition").val();
	if(Retrievalcondition==1){
		var retrievalcontent=$("#retrievalcontent").val();
		if(retrievalcontent!=""){
			overRetrievalcondition=1;//全局变量检索条件
			overretrievalcontent=retrievalcontent;//全局变量检索内容
			stuNumber=retrievalcontent;
			getStuInfoLists(stuNumber,stuName,stuIdcard,stuMobphone,cuurentPage,pagesize);
		}else{
			$("#operalmessage").css('display','block');
		}
		e.preventDefault();
		return 0;
	}else if(Retrievalcondition==2){
		var retrievalcontent=$("#retrievalcontent").val();
		if(retrievalcontent!=""){
			overRetrievalcondition=2;//全局变量检索条件
			overretrievalcontent=retrievalcontent;//全局变量检索内容
			stuName=retrievalcontent;
			getStuInfoLists(stuNumber,stuName,stuIdcard,stuMobphone,cuurentPage,pagesize);
		}else{
			$("#operalmessage").css('display','block');
		}
		e.preventDefault();
		return 0;
	}else if(Retrievalcondition==3){
		var retrievalcontent=$("#retrievalcontent").val();
		if(retrievalcontent!=""){
			overRetrievalcondition=3;//全局变量检索条件
			overretrievalcontent=retrievalcontent;//全局变量检索内容
			stuMobphone=retrievalcontent;
			getStuInfoLists(stuNumber,stuName,stuIdcard,stuMobphone,cuurentPage,pagesize);
		}else{
			$("#operalmessage").css('display','block');
		}
		e.preventDefault();
		return 0;
	}else if(Retrievalcondition==4){
		var retrievalcontent=$("#retrievalcontent").val();
		if(retrievalcontent!=""){
			overRetrievalcondition=4;//全局变量检索条件
			overretrievalcontent=retrievalcontent;//全局变量检索内容
			stuIdcard=retrievalcontent;
			getStuInfoLists(stuNumber,stuName,stuIdcard,stuMobphone,cuurentPage,pagesize);
		}else{
			$("#operalmessage").css('display','block');
		}
		e.preventDefault();
		return 0;
	}
})

function searchFailed(){
	$("#operalmessage").css('display','none');
}
