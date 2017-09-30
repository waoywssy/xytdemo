var Joblists={};
var JoblistsInfo={};
var overjolisStatus="";//职位状态定义
var enterId=1;
window.onload = onloadgetJolisInfo();
new YMDselect('joliscloseYear','joliscloseMonth','joliscloseDay');
//点击进入职位页面的自加载方法
function onloadgetJolisInfo(){
	var guid="37g337Q99hAP0KShTqhhn9ZI11lLpONT";
	var urlHref=window.location.href;
	urlHref=urlHref.split("#")[0];   	
	urlHref=urlHref+"#"+guid
	location.href=urlHref;
	var cuurentPage=$(".jolispagination li.active a").text();
	var pagesize=5;
	var jolisStatus=overjolisStatus;
	getJolisInfo(cuurentPage,pagesize,jolisStatus);
}
//从后台获得职位信
function getJolisInfo(cuurentPage,pagesize,jolisStatus){
	var jolisEnterInfoId=1;
	var urlHref=window.location.href;
	var guid=urlHref.split("#")[1];
	$.ajax({
		url:homeUrl+'jolis/getJoblists',
		async:false, //改成同步
		data:{
		    "jolisEnterInfoId":jolisEnterInfoId,
		    "cuurentPage":cuurentPage,
		    "pagesize":pagesize,
		    "guid":guid,
		    "enterId":enterId,
		    "jolisStatus":jolisStatus,
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
            	$("#joblistultoshowlist").empty();//每次点击，div内容清空，但是不删除当前div节点
				var list=jsonMap.data;
				//给各个标签加上对应数据
				if(jolisStatus==""){
					overjolisStatu=2;
					jolisStatus=2;
					var showsumNumber=jsonMap.showsumNumber;
					$("#jolisStatusIsApplyspan").html("("+showsumNumber.apply+")");
					$("#jolisStatusIscheckedspan").html("("+showsumNumber.checked+")");
					$("#jolisStatusIsrefusedspan").html("("+showsumNumber.refused+")");
					$("#jolisStatusIsstopspan").html("("+showsumNumber.stop+")");
					$("#jolisStatusIsoverduespan").html("("+showsumNumber.overdue+")");
				}
                if(list.length>0){
					for(var i=0;i<list.length;i++){
						var statusName=JolisStatusToShow(list[i].jolisStatus);
						if(list[i].cvsNoread==null||list[i].cvsNoread=="null"){
							list[i].cvsNoread=0; 
						}
						//获取发布时间预览
                    	var jolisPostDate=list[i].jolisPostDate.split(",");
                    	var jolisPostDateyear=jolisPostDate[1].trim();
                        var jolisPostDatemonth=trueMonth(jolisPostDate[0].split(" ")[0]);
                        var jolisPostDateday=jolisPostDate[0].split(" ")[1];
                        var jolisPostDatePrei=jolisPostDateyear+"年 "+jolisPostDatemonth+"月"+jolisPostDateday+"日";
	                    //获取截止时间预览
	                    var jolisCloseDate=list[i].jolisCloseDate.split(",");
                    	var jolisCloseDateyear=jolisCloseDate[1].trim();
                        var jolisCloseDatemonth=trueMonth(jolisCloseDate[0].split(" ")[0]);
                        var jolisCloseDateday=jolisCloseDate[0].split(" ")[1];
                        var jolisCloseDatePrei=jolisCloseDateyear+"年"+jolisCloseDatemonth+"月"+jolisCloseDateday+"日";
                        if(jolisStatus==2){
                        	$("#joblistultoshowlist").append("<ul class='job_list_ul'>"+
    							    "<li class='job-manage1-t1'>"+list[i].jolisName+"</li>"+
    							    "<li class='job-manage1-t2'>"+list[i].jolisPersons+"</li>"+
    							    "<li class='job-manage1-t3'>"+jolisPostDatePrei+"</li>"+
    							    "<li class='job-manage1-t4'>"+jolisCloseDatePrei+"</li>"+
    							    "<li class='job-manage1-t6'>"+list[i].cvsNoread+"/"+list[i].cvsCounts+"</li>"+
    							    "<li class='job-manage1-t7'>"+
    				                        "<span class='job_list_ul_cancel' data-toggle='toolti' data-placement='left' title='取消发布' onclick='toCancleJolis("+list[i].jolisId+","+list[i].jolisStatus+",this);'></span>"+
    				                        "<span class='job_list_ul_modify' data-toggle='tooltip' data-placement='top' title='预览修改' onclick='tojumpDetailpage("+list[i].jolisId+","+list[i].jolisStatus+");'></span>"+
    				                "</li>"+
    							"</ul>");
    						}else{
    							$("#joblistultoshowlist").append("<ul class='job_list_ul'>"+
        							    "<li class='job-manage1-t1'>"+list[i].jolisName+"</li>"+
        							    "<li class='job-manage1-t2'>"+list[i].jolisPersons+"</li>"+
        							    "<li class='job-manage1-t3'>"+jolisPostDatePrei+"</li>"+
        							    "<li class='job-manage1-t4'>"+jolisCloseDatePrei+"</li>"+
        							    "<li class='job-manage1-t6'>"+list[i].cvsNoread+"/"+list[i].cvsCounts+"</li>"+
        							    "<li class='job-manage1-t7'>"+
        				                        "<span class='job_list_ul_modify' data-toggle='tooltip' data-placement='top' title='预览修改' onclick='tojumpDetailpage("+list[i].jolisId+","+list[i].jolisStatus+");'></span>"+
        				                "</li>"+
        							"</ul>");
    						}
                        }
				}else{
					
				}
              //分页代码
				var PageUtils=jsonMap.datapage;
				var pagesLi=PageUtils.currentPage;
				var currentNode=$(".jolispagination li.active a");
				currentNode.html(pagesLi);
				pagesLi=pagesLi+1;
				currentNode.parent().next("li").children(":first").html(pagesLi);
				pagesLi=pagesLi+1;
				currentNode.parent().next("li").next("li").children(":first").html(pagesLi);
				pagesLi=pagesLi+1;
				currentNode.parent().next("li").next("li").next("li").children(":first").html(pagesLi);
				$("#JolistotalPage").html(PageUtils.totalPage);
			}
		},
		error:function () {
            alert("访问服务器失败！");
        },
    })
}
//取消发布
function  toCancleJolis(jolisId,jolisStatus,sonde){
		 if(jolisStatus==3){
			 alert("已经取消发布了")
			 return 0;
		 }else{
			 jolisStatus=3;
		 }
	    var jolisEnterInfoId=1;
		var urlHref=window.location.href;
		var guid=urlHref.split("#")[1];
		if (confirm("是否确定取消发布")) {
			$.ajax({
				url : homeUrl + 'jolis/updateJobliststatus',
				async : false,// 改成同步
				data : {
					"jolisEnterInfoId" : jolisEnterInfoId,
					"jolisId" : jolisId,
					"jolisStatus" : jolisStatus,
					"guid" : guid,
					"enterId":enterId,
				},
				type : 'post',
				success : function(date) {
					var jsonMap = JSON.parse(date);
					if (jsonMap.code == 200) {
						alert("取消成功");
						overjolisStatus="";
						var cuurentPage=$(".jolispagination li.active a").text();
						var pagesize=5;
						var jolisStatus=overjolisStatus;
						getJolisInfo(cuurentPage,pagesize,jolisStatus);
					} else if (jsonMap.code == 301) {
						alert("您为非法用户");
						window.location.href = homeUrl + 'stu/safe';
					} else if (jsonMap.code == 302) {
						alert("您停留时间过长");
						window.location.href = homeUrl + 'stu/safe';
					} else if (jsonMap.code == 398) {
						alert("未获得值");
					} else {
						alert("操作失败");
					}
				},
				error : function() {
					alert("访问服务器失败！");
				},
			});
		}
	}
//创建职位信息头
function  createJolisHeadersul(){
	$(".job_preview div:first").empty();//每次点击，div内容清空，但是不删除当前div节点
	$(".job_preview div:first").append("<ul class='job_list_ul first'>"+
		    "<li>职位名称</li>"+
		    "<li>人数</li>"+
		    "<li>发布日期</li>"+
		    "<li>截止日期</li>"+
		    "<li>简历数(未读/总)</li>"+
		    "<li>操作</li>"+
		    "</ul>");
}
//跳转页面分页代码
$(".tojumpjolis").click(function (e){
	var cuurentPage=$(this).text();//获取当前页码
	var TotalPage=$("#JolistotalPage").text();//获取总页数
	if(cuurentPage>=TotalPage){
		cuurentPage=TotalPage;
		alert("将进入尾页");
	}
	var pagesize=5;
	var jolisStatus=overjolisStatus;
	getJolisInfo(cuurentPage,pagesize,jolisStatus);
	e.preventDefault();
})
//下一页分页代码
$("#jolisNextPage").click(function (e) {
	var cuurentPage=$(".jolispagination li.active a").text();
	cuurentPage=cuurentPage*1+1;
	var TotalPage=$("#JolistotalPage").text();//获取总页数
	if(cuurentPage>TotalPage){
		alert("已经是最后一页了");
		e.preventDefault();
	}else{
		var pagesize=5;
		var jolisStatus=overjolisStatus;
		getJolisInfo(cuurentPage,pagesize,jolisStatus);
		e.preventDefault();
	}
})
//上一页分页代码
$("#jolisLastPage").click(function (e) {
	var cuurentPage=$(".jolispagination li.active a").text();
	cuurentPage=cuurentPage-1;
	if(cuurentPage<1){
		alert("已经是第一页了");
	}else{
		var pagesize=5;
		var jolisStatus=overjolisStatus;
		getJolisInfo(cuurentPage,pagesize,jolisStatus);
		
	}
	e.preventDefault();
})
//输入跳转几页 分页代码
$("#jumpbuttonjolis").click(function (e) {
	var cuurentPage=$("#jumpPageInputJolis").val();
	if(!/^[0-9]*$/.test(cuurentPage)||cuurentPage==""){
        alert("请输入数字");
    }
	var TotalPage=$("#JolistotalPage").text();//获取总页数
	if(cuurentPage<1||cuurentPage>TotalPage){
		alert("请输入1至"+TotalPage+"内的数字");
	}else{
		var pagesize=5;
		var jolisStatus=overjolisStatus;
		getJolisInfo(cuurentPage,pagesize,jolisStatus);
	}
	e.preventDefault();
})
//职位信息之点击编辑1
$("#jolisEdi1").click(function (e) {
	 $(this).parents("form").css("display","none");
	 $(this).parents("form").next().css("display","block");
	//职位名称
	$("#jolisNameEdi").val(Joblists.jolisName);
	//截止日期
	var jolisCloseDate=Joblists.jolisCloseDate.split(",");
	var jolisCloseDateyear=jolisCloseDate[1].trim();
    var jolisCloseDatemonth=trueMonth(jolisCloseDate[0].split(" ")[0]);
    var jolisCloseDateday=jolisCloseDate[0].split(" ")[1];
    $("#joliscloseYearEdi option[value='"+jolisCloseDateyear+"']").attr("selected","selected");//根据值让option选中 
    $("#joliscloseYearEdi").change();
    $("#joliscloseMonthEdi option[value='"+jolisCloseDatemonth+"']").attr("selected","selected");//根据值让option选中 
    $("#joliscloseMonthEdi").change();
    $("#joliscloseEdi option[value='"+jolisCloseDateday+"']").attr("selected","selected");//根据值让option选中 
    $("#joliscloseEdi").change();
    //薪资上限 下限
    if(Joblists.jolisSalaryLow!=null){
    	$("#jolisSalaryLowEdi").val(Joblists.jolisSalaryLow);
    }
    if(Joblists.jolisSalaryHigh!=null){
    	$("#jolisSalaryHighEdi").val(Joblists.jolisSalaryHigh);
    }
    //所属职能
    if(Joblists.jolisIndId!=null){
    	jolisIndustry1(1000000000000);
        var jolisIndIdfirst=parseInt((Joblists.jolisIndId+"").substring(0,4)+"000000000");
        $("#jolisIndustry1").val(jolisIndIdfirst);
        $("#jolisIndustry1").change();
        $("#jolisIndustry2").val(Joblists.jolisIndId);
        $("#jolisIndustry2").change();
    }
    if(Joblists.jolisWrktypId!=null){
    	// 转换工作类型
    	joliswrktyp_getoption();
        $("#jolisJobType").val(Joblists.jolisWrktypId);
    }
    //转换工作地
    if(Joblists.jolisLctId!=null){
    	var province100=parseInt((Joblists.jolisLctId+"").substring(0,3)+"0000000000000");
    	var basicLoc=ChineseDistricts[1000000000000000][province100];
    	$("#jolisprovince").val(basicLoc);
    	$("#jolisprovince").change();
        var city10 = (Joblists.jolisLctId+"").substring(3,5);
        var district10=(Joblists.jolisLctId+"").substring(5,7);
        if(city10!="00"){
       	   var city10=parseInt((Joblists.jolisLctId+"").substring(0,5)+"00000000000");
       	   $("#joliscity").val(ChineseDistricts[province100][city10]);
           $("#joliscity").change();
        }
        if(district10!="00"){
        	$("#jolisdistrict").val(ChineseDistricts[city10][Joblists.jolisLctId]);
        	$("#jolisdistrict").change();
        }
    }
    //岗位描述
    if(Joblists.jolisDescription!=null){
    	$("#jolisDescriptionEdi").val(Joblists.jolisDescription);
    }
    //自定义福利编辑
    $(".jolisOtherBenefitsDiv label:gt(1)").remove();
    if(Joblists.jolisDefinedBentifts!=undefined){
    	var s=Joblists.jolisDefinedBentifts.split("@#");
    	for(var i=1;i<s.length;i++){
    		if(s[i]!=""||s[i]!=null){
    			$(".jolisOtherBenefitsDiv").append("<label for=''><input type='checkbox' name='jolisDefinedBentift' checked value='"+s[i]+"'>"+s[i]+"</label>");
	    	}
    	}
    }
    e.preventDefault();
})
//职位信息之点击编辑2
$("#jolisEdi2").click(function (e) {
   $(this).parents("form").css("display","none");
   $(this).parents("form").next().css("display","block");
	//职位人数
	if(Joblists.jolisPersons!=null){
		$("#jolisPersonsEdi").val(Joblists.jolisPersons);
	}
	//职能要求
	if(Joblists.jolisRequirement!=null){
		$("#jolisRequirementEdi").val(Joblists.jolisRequirement);
	}
	//是否夜班
	if(Joblists.jolisNonightshift){
    	$("input[name='yeban'][value="+1+"]").attr("checked",true);
    }else{
    	$("input[name='yeban'][value="+0+"]").attr("checked",true);
    }
	//是否加班
	if(Joblists.jolisOvertime){
    	$("input[name='jiaban'][value="+1+"]").attr("checked",true);
    }else{
    	$("input[name='jiaban'][value="+0+"]").attr("checked",true);
    }
    e.preventDefault();
})
//职位信息之点击编辑3
$("#jolisEdi3").click(function (e) {
	$(this).parents("form").css("display","none");
	$(this).parents("form").next().css("display","block");
	//学历要求
	if(Joblists.jolisEduId!=null){
		jolisedu_getoption();
        $("#jolisEduIdEdi").val(Joblists.jolisEduId);
    }
	//经验要求
	if(Joblists.jolisExperence!=null){
		$("#jolisExperenceEdi").val(Joblists.jolisExperence);
	}
	//性别要求
	if(Joblists.jolisGendex){
    	$("input[name='sex_demand'][value="+1+"]").attr("checked",true);
    }else if(Joblists.jolisGendex==false){
    	$("input[name='sex_demand'][value="+0+"]").attr("checked",true);
    }else{
    	$("input[name='sex_demand'][value="+null+"]").attr("checked",true);
    }
	//身高要求
	if(Joblists.jolisHeightLow!=null){
		$("#jolisHeightLowEdi").val(Joblists.jolisHeightLow);
	}
	if(Joblists.jolisHeightHigh!=null){
		$("#jolisHeightHighEdi").val(Joblists.jolisHeightHigh);
	}
	//语言要求
	if(Joblists.jolisLanguageId!=null&&Joblists.jolisLanguageId!=""&&Joblists.jolisLanguageId!=0){
		var luageLengths=Joblists.jolisLanguageId;
		var luageLength=(luageLengths+"").length-3;
		var jolisLanguageId1="";
		if(luageLength==1){
			jolisLanguageId1=parseInt((Joblists.jolisLanguageId+"").substring(0,3)+"0")
		}else{
			jolisLanguageId1=parseInt((Joblists.jolisLanguageId+"").substring(0,3)+"00")
		}
		jolisLanguageIdfun1(10);
		$("#jolisLanguageId1").val(jolisLanguageId1)
		$("#jolisLanguageId1").change();
    	if(jolisLanguageId1!=Joblists.jolisLanguageId){
    		$("#jolisLanguageId2").val(Joblists.jolisLanguageId);
    		$("#jolisLanguageId2").change();
    	}
    }
    e.preventDefault();
})
//跳转进入详细页面
function tojumpDetailpage(jolisId,jolisStatus){
	$("#jobDeMenu01foractive").addClass("active");
	$("#jobDeMenu02foractive").removeClass("active");
	$("#jobDeMenu03foractive").removeClass("active");
	$("#jobDeMenu01").addClass("active in");
	$("#jobDeMenu02").removeClass("active in");
	$("#jobDeMenu03").removeClass("active in");
	$("#jolisPrei1").css("display","block");
	$("#jolisPrei2").css("display","block");
	$("#jolisPrei3").css("display","block");
	$("#jolisInfoEdi1").css("display","none");
	$("#jolisInfoEdi2").css("display","none");
	$("#jolisInfoEdi3").css("display","none");
	if(jolisStatus==1||jolisStatus==5){
		$("#jolisSave").css("display","block");
		$("#jolisEdi1").css("display","block");
		$("#jolisEdi2").css("display","block");
		$("#jolisEdi3").css("display","block");
	}else{
		$("#jolisSave").css("display","none");
		$("#jolisEdi1").css("display","none");
		$("#jolisEdi2").css("display","none");
		$("#jolisEdi3").css("display","none");
	}
	var jolisEnterInfoId=1;
	var urlHref=window.location.href;
	var guid=urlHref.split("#")[1];
	    $.ajax({
	        url:homeUrl+'jolis/getDetailpage',
	        async:false, //改成同步
	        data:{
	            "jolisEnterInfoId":jolisEnterInfoId,
	            "guid":guid,
	            "jolisId":jolisId,
	            "enterId":enterId,
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
	            	$(".job_preview").css("display","none");
	            	$(".job_detail").css("display","block");
	                var list=jsonMap.data;
	                if(list.length>0){
	                	Joblists=null;
	                	console.log(Joblists);
	                    Joblists = list[0];
	                    console.log(Joblists);
	                    //职位名称
	                    $("#spanjolisName").html(Joblists.jolisName);
	                    //获取发布时间预览
                    	var jolisPostDate=Joblists.jolisPostDate.split(",");
                    	var jolisPostDateyear=jolisPostDate[1].trim();
                        var jolisPostDatemonth=trueMonth(jolisPostDate[0].split(" ")[0]);
                        var jolisPostDateday=jolisPostDate[0].split(" ")[1];
	                    $("#spanjolisPostDate").html(jolisPostDateyear+" 年 "+jolisPostDatemonth+" 月 "+jolisPostDateday+" 日");
	                    //获取截止时间预览
	                    var jolisCloseDate=Joblists.jolisCloseDate.split(",");
                    	var jolisCloseDateyear=jolisCloseDate[1].trim();
                        var jolisCloseDatemonth=trueMonth(jolisCloseDate[0].split(" ")[0]);
                        var jolisCloseDateday=jolisCloseDate[0].split(" ")[1];
	                    $("#spanjolisCloseDate").html(jolisCloseDateyear+" 年 "+jolisCloseDatemonth+" 月 "+jolisCloseDateday+" 日");
	                    //薪资
	                    var jolisSalaryLow="0";
	                    if(Joblists.jolisSalaryLow!=null){
	                    	jolisSalaryLow=Joblists.jolisSalaryLow;
	                	}
	                    var jolisSalaryHigh="";
	                	if(Joblists.jolisSalaryHigh!=null){
	                		jolisSalaryHigh=Joblists.jolisSalaryHigh;
	                	}
	                    $("#spanjolisSalaryLow").html(jolisSalaryLow+"~~~"+jolisSalaryHigh);
	                    if(Joblists.jolisIndId!=null){
	                    	//行业转换显示
	                        var jolisIndIdfirst=parseInt((Joblists.jolisIndId+"").substring(0,4)+"000000000");
	                        var jolisIndIdfirstpreview=industry[1000000000000][jolisIndIdfirst];
	                        var jolisIndIdSecondpreview=industry[jolisIndIdfirst][Joblists.jolisIndId];
	                        var jolisIndIdpreview=jolisIndIdfirstpreview+"--/"+jolisIndIdSecondpreview;
	                        $("#spanjolisIndId").html(jolisIndIdpreview);
	                    }
	                    if(Joblists.jolisWrktypId!=null){
	                    	// 转换工作类型
	                    	var jobType = Wrktyp_a[Joblists.jolisWrktypId];
	                        $("#spanjolisWrktypId").html(jobType);
	                    }
	                    if(Joblists.jolisLctId!=null){
	                    	//所在地
                        	var province100=parseInt((Joblists.jolisLctId+"").substring(0,3)+"0000000000000");
                        	var basicLoc=ChineseDistricts[1000000000000000][province100];
                            var city10 = (Joblists.jolisLctId+"").substring(3,5);
                            var district10=(Joblists.jolisLctId+"").substring(5,7);
                            if(city10!="00"){
                           	      var city10=parseInt((Joblists.jolisLctId+"").substring(0,5)+"00000000000");
                           	   basicLoc+="-"+ChineseDistricts[province100][city10];
                            }
                            if(district10!="00"){
                            	basicLoc+="-"+ChineseDistricts[city10][Joblists.jolisLctId];
                            }
                            $("#spanjolisLctId").html(basicLoc);
	                    }
	                    //岗位描述
	                    if(Joblists.jolisDescription!=null){
	                    	$("#spanjolisDescription").html(Joblists.jolisDescription);
	                    	
	                    }
	                    if(Joblists.enterhousingfund){
	                    	// 公积金
	                        $("#spanHousingfund").css("display","inline-block");
	                    }
	                    if(Joblists.enterinsurance){
	                    	// 五险
	                        $("#spanInsurance").css("display","inline-block");
	                    }
	                    if(Joblists.enterweekend){
	                    	// 双休
	                        $("#spanWeekend").css("display","inline-block");
	                    }
	                    if(Joblists.entervacation){
	                    	// 年假
	                        $("#spanVacation").css("display","inline-block");
	                    }
	                    if(Joblists.entermeal){
	                    	// 包吃
	                        $("#spanMeal").css("display","inline-block");
	                    }
	                    if(Joblists.enteraccommodation){
	                    	// 包住
	                        $("#spanAccommodation").css("display","inline-block");
	                    }
	                  //自定义福利
	             	    $(".classBenefitsjolis li:gt(5)").remove();
	             	    if(Joblists.enterotherBenefits!=null&&Joblists.enterotherBenefits!=""){
	             	    	var s=Joblists.enterotherBenefits.split("@#");
	             	    	for(var i=1;i<s.length;i++){
	             	    		if(s[i]!=""||s[i]!=null){
	             	    			$(".classBenefitsjolis").append("<li class='form-control btn btn-primary' style='display: inline-block'>"+s[i]+"</li>");
	             		    	}
	             	    	}
	             	    }
	             	   if(Joblists.jolisDefinedBentifts!=null&&Joblists.jolisDefinedBentifts!=""){
	             	    	var s=Joblists.jolisDefinedBentifts.split("@#");
	             	    	for(var i=1;i<s.length;i++){
	             	    		if(s[i]!=""||s[i]!=null){
	             	    			$(".classBenefitsjolis").append("<li class='form-control btn btn-primary' style='display: inline-block'>"+s[i]+"</li>");
	             		    	}
	             	    	}
	             	    }
//	            		map.put("jolisDefinedBentifts", objs[22]);
	                    //人数
	                    $("#spanjolisPersons").html(Joblists.jolisPersons+"人以上");
	                    if(Joblists.jolisRequirement!=null){
	                    	// 要求
	                    	$("#spanjolisRequirement").html(Joblists.jolisRequirement);
	                    }
	                    //夜班
	                    if(Joblists.jolisNonightshift==1){
	                    	$("#spanNonightshift").html("有夜班");
	                    }else if(Joblists.jolisNonightshift==0){
	                    	$("#spanNonightshift").html("无夜班");
	                    }
	                    //加班
	                    if(Joblists.jolisOvertime==1){
	                    	$("#spanjolisOvertime").html("加班");
	                    }else if(Joblists.jolisOvertime==0){
	                    	$("#spanjolisOvertime").html("不加班");
	                    }
	                    if(Joblists.jolisEduId!=null){
	                    	//学历要求
	                        $("#spanjolisEduId").html(edu_a[Joblists.jolisEduId]+"以上");
	                    }
	                    if(Joblists.jolisExperence!=null){
	                    	//经验要求
	                        $("#spanjolisExperence").html(Joblists.jolisExperence+"年以下");
	                    }
	                   //性别要求
	                	if(Joblists.jolisGendex){
	                		$("#soamjolisGendex").html("男");;
	                    }else if(Joblists.jolisGendex==false){
	                    	$("#soamjolisGendex").html("女");;
	                    }else{
	                    	$("#soamjolisGendex").html("男女不限");;
	                    }
	                   //身高要求
	                	if(Joblists.jolisHeightLow!=null){
	                        $("#spanJolisHeightLow").html(Joblists.jolisHeightLow+"cm");
	                    }
	                	if(Joblists.jolisHeightHigh!=null){
	                        $("#spanJolisHeightHigh").html(Joblists.jolisHeightHigh+"cm");
	                    }
	                  //语言要求
	                	if(Joblists.jolisLanguageId!=null&&Joblists.jolisLanguageId!=""){
	                		var luageLength=(Joblists.jolisLanguageId+"").length-3;
	                		var jolisLanguageId1="";
	                		if(luageLength==1){
	                			jolisLanguageId1=parseInt((Joblists.jolisLanguageId+"").substring(0,3)+"0");
	                		}else{
	                			jolisLanguageId1=parseInt((Joblists.jolisLanguageId+"").substring(0,3)+"00");
	                		}
                        	var jolisLuag=language[10][jolisLanguageId1];
                        	if(jolisLanguageId1!=Joblists.jolisLanguageId){
                        		jolisLuag+="-"+language[jolisLanguageId1][Joblists.jolisLanguageId];
                        	}
                            $("#spanjolisLanguageId").html(jolisLuag);
	                    }
	                }
	            }
	        },
	        error:function () {
	            alert("访问服务器失败！");
	        },
	    })
}
//将月份的（四改成4） 
function trueMonth(month){
	switch(month)
	   {
	   case "一月":
		   month="1";
	     break
	   case "二月":
		   month="2";
	     break
	   case "三月":
		   month="3";
		 break
	   case "四月":
		   month="4";
		 break
	   case "五月":
		   month="5";
		 break
	   case "六月":
		   month="6";
		 break			 
	   case "七月":
		   month="7";
		 break
	   case "八月":
		   month="8";
		 break
	   case "九月":
		   month="9";
		 break	
	   case "十月":
		   month="10";
		 break
	   case "十一月":
		   month="11";
		 break
	   case "十二月":
		   month="12";
	   case "Jan":
			month = "1";
			break
		case "Feb":
			month = "2";
			break
		case "Mar":
			month = "3";
			break
		case "Apr":
			month = "4";
			break
		case "May":
			month = "5";
			break
		case "Jun":
			month = "6";
			break
		case "Jul":
			month = "7";
			break
		case "Aug":
			month = "8";
			break
		case "Sep":
			month = "9";
			break
		case "Oct":
			month = "10";
			break
		case "Nov":
			month = "11";
			break
		case "Dec":
			month = "12";
		 break	
		default:
	   }
	return month;
}
function JolisStatusToShow(jolisStatus){
	switch(jolisStatus)
	   {
	   case 1:
		   jolisStatus="审核";
	     break
	   case 2:
		   jolisStatus="发布";
	     break
	   case 3:
		   jolisStatus="停止";
		 break
		default:"未填写"
	   }
	return jolisStatus;
}

//点击发布
$("#jolisStatusIsApply").click( function(e){
	var cuurentPage=1;
	var pagesize=5;
	overjolisStatus=2;
	var jolisStatus=2;
	getJolisInfo(cuurentPage,pagesize,jolisStatus);
	e.preventDefault();
});
//点击审核
$("#jolisStatusIschecked").click( function(e){
	var cuurentPage=1;
	var pagesize=5;
	overjolisStatus=1;
	var jolisStatus=1;
	getJolisInfo(cuurentPage,pagesize,jolisStatus);
	e.preventDefault();
});
//点击未通过审核
$("#jolisStatusIsrefused").click( function(e){
	var cuurentPage=1;
	var pagesize=5;
	overjolisStatus=5;
	var jolisStatus=5;
	getJolisInfo(cuurentPage,pagesize,jolisStatus);
	e.preventDefault();
});
//点击停止
$("#jolisStatusIsstop").click( function(e){
	var cuurentPage=1;
	var pagesize=5;
	overjolisStatus=3;
	var jolisStatus=3;
	getJolisInfo(cuurentPage,pagesize,jolisStatus);
	e.preventDefault();
});
//点击过期
$("#jolisStatusIsoverdue").click( function(e){
	var cuurentPage=1;
	var pagesize=5;
	overjolisStatus=4;
	var jolisStatus=4;
	getJolisInfo(cuurentPage,pagesize,jolisStatus);
	e.preventDefault();
});
//取消后返回职位详细页面
$(".jolisCancle").click( function(e){
	$(this).parents("form").prev("form").css("display", "block");
	$(this).parents("form").css("display", "none");
	 e.preventDefault();
});
//取消后返回职位列表
$("#jolisSaveCancle").click( function(e){
	$(".job_preview").css("display","block");
	$(".job_detail").css("display","none");
	var cuurentPage=$(".jolispagination li.active a").text();
	var pagesize=5;
	var jolisStatus=overjolisStatus;
	getJolisInfo(cuurentPage,pagesize,jolisStatus);
	 e.preventDefault();
});
//新建职位
$(".new_job_list").click( function(e){
	$("#jobDeMenu01foractive").addClass("active");
	$("#jobDeMenu02foractive").removeClass("active");
	$("#jobDeMenu03foractive").removeClass("active");
	$("#jobDeMenu01").addClass("active in");
	$("#jobDeMenu02").removeClass("active in");
	$("#jobDeMenu03").removeClass("active in");
	$("#jolisPrei1").css("display","none");
	$("#jolisPrei2").css("display","none");
	$("#jolisPrei3").css("display","none");
	$("#jolisInfoEdi1").css("display","block");
	$("#jolisInfoEdi2").css("display","block");
	$("#jolisInfoEdi3").css("display","block");
	$("#jolisSave").css("display","block");
	$("#jolisEdi1").css("display","block");
	$("#jolisEdi2").css("display","block");
	$("#jolisEdi3").css("display","block");
	//职位名称
    $("#spanjolisName").html("这里填写职位名称");
    //获取发布时间预览
    $("#spanjolisPostDate").html("发布日期");
    //获取截止时间预览
    $("#spanjolisCloseDate").html("截止日期");
    //薪资
    $("#spanjolisSalaryLow").html("薪资下限~~~薪资上限");
	//行业转换显示
    $("#spanjolisIndId").html("所属职能");
	// 转换工作类型
    $("#spanjolisWrktypId").html("工作类型");
	//所在地
    $("#spanjolisLctId").html("");
     //岗位描述
	$("#spanjolisDescription").html("");
    //人数
    $("#spanjolisPersons").html("多少人以上");
    $("#spanjolisRequirement").html("");
    //夜班
    $("#spanNonightshift").html("");
    //加班
	$("#spanjolisOvertime").html("");
	//学历要求
    $("#spanjolisEduId").html("需要学历及其以上");
	//经验要求
    $("#spanjolisExperence").html("几年以下");
   //性别要求
	$("#spanjolisExperence").html("");;
   //身高要求
    $("#spanJolisHeightLow").html("");
    $("#spanJolisHeightHigh").html("");
   //语言要求
    $("#jolisLanguageId").html("一门语言需求");
	$(".job_preview").css("display","none");
	$(".job_detail").css("display","block");
	//将点此编辑中的值清空
	//职位名称
	$("#jolisNameEdi").val("");
	//截止日期
    $("#joliscloseYearEdi option[value='"+0+"']").attr("selected","selected");//根据值让option选中 
    $("#joliscloseYearEdi").change();
    $("#joliscloseMonthEdi option[value='"+0+"']").attr("selected","selected");//根据值让option选中 
    $("#joliscloseMonthEdi").change();
    $("#joliscloseEdi option[value='"+0+"']").attr("selected","selected");//根据值让option选中 
    $("#joliscloseEdi").change();
    //薪资上限 下限
	$("#jolisSalaryLowEdi").val('');
	$("#jolisSalaryHighEdi").val('');
    //所属职能
    $("#jolisIndustry1").val('');
    $("#jolisIndustry1").change();
    $("#jolisIndustry2").val('');
    $("#jolisIndustry2").change();
    $("#jolisJobType").val('');
    //转换工作地
	$("#jolisprovince").val('');
	$("#jolisprovince").change();
    $("#joliscity").val('');
    $("#joliscity").change();
	$("#jolisdistrict").val('');
	$("#jolisdistrict").change();
    //岗位描述
    $("#jolisDescriptionEdi").val('');
    //自定义福利编辑
    $(".jolisOtherBenefitsDiv label:gt(1)").remove();
    $(".jolisOtherBenefitsDiv").append("''");
	//职位人数
	$("#jolisPersonsEdi").val('');
	//职能要求
	$("#jolisRequirementEdi").val('');
	//是否夜班
    $("input[name='yeban'][value="+0+"]").attr("checked",true);
	//是否加班
    $("input[name='jiaban'][value="+0+"]").attr("checked",true);
	//学历要求
    $("#jolisEduIdEdi").val('');
	//经验要求
	$("#jolisExperenceEdi").val('');
	//性别要求
    $("input[name='sex_demand'][value="+null+"]").attr("checked",true);
	//身高要求
	$("#jolisHeightLowEdi").val('');
	$("#jolisHeightHighEdi").val('');
	//语言要求
	$("#jolisLanguageId1").val('')
	$("#jolisLanguageId1").change();
	$("#jolisLanguageId2").val('');
	$("#jolisLanguageId2").change();
	$("#jolisdistrictwarn").css("display","none");
	$("#jolisIndustry2warn").css("display","none");
	
	 e.preventDefault();
});
//保存后跳转进入职位列表
$("#jolisSave").click( function(e){
	if(Joblists.jolisId>0){
		updatejolisInfo();
		var cuurentPage=$(".jolispagination li.active a").text();
		var pagesize=5;
		var jolisStatus=overjolisStatus;
		getJolisInfo(cuurentPage,pagesize,jolisStatus);
	}else{
		savejolisInfo();
		var cuurentPage=1;
		var pagesize=5;
		var jolisStatus=overjolisStatus;
		getJolisInfo(cuurentPage,pagesize,jolisStatus);
	}
	$(".job_preview").css("display","block");
	$(".job_detail").css("display","none");
	e.preventDefault();
});
//保存后跳转到预览页面
 $(".updatejolisInfo").click( function(e){
		var _this = $(this);
		var flag=false;
		if(Joblists.jolisId>0){
			flag=updatejolisInfo();
		}else{
			flag=savejolisInfo();
		}
		if(flag){
			tojumpDetailpage(Joblists.jolisId,Joblists.jolisStatus);
			$(".job_preview").css("display","none");
	    	$(".job_detail").css("display","block");
			_this.parents("form").prev("form").css("display", "block");
			_this.parents("form").css("display", "none");
		}
		e.preventDefault();
		
});
//保存信息
function savejolisInfo(){
	var flag=false;
 	//保存基本信息
 	    JoblistsInfo.jolisEnterInfoId=1;
 	    //保存状态为1
 	    JoblistsInfo.jolisStatus=1;
 		//职位名称
 	    JoblistsInfo.jolisName=$("#jolisNameEdi").val();
    	//截止日期
	    var jolisCloseDateyear=$('#joliscloseYearEdi').val();
		var jolisCloseDatemonth=$('#joliscloseMonthEdi').val();
		var jolisCloseDateday=$('#joliscloseEdi').val();
		JoblistsInfo.jolisCloseDate=jolisCloseDateyear+"/"+jolisCloseDatemonth+"/"+jolisCloseDateday;
		JoblistsInfo.jolisPostDate="2017/01/04";
	    //薪资上限 下限
		JoblistsInfo.jolisSalaryLow=$("#jolisSalaryLowEdi").val();
		
		JoblistsInfo.jolisSalaryHigh=$("#jolisSalaryHighEdi").val();
	    //所属职能
		JoblistsInfo.jolisIndId=$("#jolisIndustry2").val();
		JoblistsInfo.jolisWrktypId=$("#jolisJobType").val();
	    //转换工作地
		JoblistsInfo.jolisLctId =$("#jolisdistrict").find("option:selected").attr("data-code");
 		//岗位描述
 		    JoblistsInfo.jolisDescription=$("#jolisDescriptionEdi").val();
 		//职位人数
 	    JoblistsInfo.jolisPersons=$("#jolisPersonsEdi").val();
    	//职能要求
	    JoblistsInfo.jolisRequirement=$("#jolisRequirementEdi").val();
		//是否夜班
	    var yeban= document.getElementsByName("yeban");
		for(var k in yeban){
			if(yeban[k].checked){
				JoblistsInfo.jolisNonightshift=yeban[k].value;
				break;
			}
		}
		//是否加班
		var jiaban= document.getElementsByName("jiaban");
		for(var k in jiaban){
			if(jiaban[k].checked){
				JoblistsInfo.jolisOvertime=jiaban[k].value;
				break;
			}
		}
 	  //性别要求
 		var jolissex= document.getElementsByName("sex_demand");
 		for(var k in jolissex){
 			if(jolissex[k].checked){
 				JoblistsInfo.jolisGendex=jolissex[k].value;
 				if(JoblistsInfo.jolisGendex=="null"){
 					JoblistsInfo.jolisGendex=null;
 				}
 				break;
 			}
 		}
		//学历要求
		JoblistsInfo.jolisEduId=$("#jolisEduIdEdi").val();
		//经验要求
			JoblistsInfo.jolisExperence=$("#jolisExperenceEdi").val();
			if(JoblistsInfo.jolisExperence==""||JoblistsInfo.jolisExperence==null){
				JoblistsInfo.jolisExperence=0;
			}
		//身高要求
		JoblistsInfo.jolisHeightLow=$("#jolisHeightLowEdi").val();
		JoblistsInfo.jolisHeightHigh=$("#jolisHeightHighEdi").val();
		//语言要求
		JoblistsInfo.jolisLanguageId=$("#jolisLanguageId2").val();
		if(JoblistsInfo.jolisLanguageId>0){
		}else{
			JoblistsInfo.jolisLanguageId=$("#jolisLanguageId1").val();
		}
 		var urlHref=window.location.href;
 		var guid=urlHref.split("#")[1];
 		if(JoblistsInfo.jolisName==""||JoblistsInfo.jolisName==null){//企业名称不能为空
 		    $("#jolisNameEdiwarn").css("display","block");
 	    }else if(jolisCloseDateday==0||jolisCloseDateday==""){//时间
 			$("#jolisCloseDatewarn").css("display","block");
 		}else if(!(JoblistsInfo.jolisSalaryHigh)>0){//薪资上限
 			$("#jolisSalaryHighEdiwarn").css("display","block");
 		}else if(JoblistsInfo.jolisIndId==0||JoblistsInfo.jolisIndId==""||JoblistsInfo.jolisIndId==null){//所属职能
 			$("#jolisIndustry2warn").css("display","block");
 		}else if(JoblistsInfo.jolisWrktypId==0||JoblistsInfo.jolisWrktypId==""||JoblistsInfo.jolisWrktypId==null){//工作类型
 			$("#jolisJobTypewarn").css("display","block");
 		}else if(!(JoblistsInfo.jolisLctId)*1>0){//职位所在地
 			$("#jolisdistrictwarn").css("display","block");
 		}else if(JoblistsInfo.jolisDescription==""){
 			$("#jolisDescriptionEdiwarn").css("display","block");//岗位描述
 		}else if(!(JoblistsInfo.jolisPersons)*1>0){//职位需求人数
 			$("#jolisPersonsEdiwarn").css("display","block");
 		}else if(JoblistsInfo.jolisRequirement==""){//职能要求
 			$("#jolisRequirementEdiwarn").css("display","block");
 		}else if(!(JoblistsInfo.jolisEduId)>0){//学历要求
 			$("#jolisEduIdEdiwarn").css("display","block");
 		}else if(!(JoblistsInfo.jolisExperence>=0)){//经验要求
 			$("#jolisExperenceEdiwarn").css("display","block");
 		}else if(JoblistsInfo.jolisHeightLow!=""&&!JoblistsInfo.jolisHeightLow>0){//身高要求
 			$("#jolisHeightLowEdiwarn").css("display","block");
 		}else{
	 		$.ajax({
	 			url : homeUrl + 'jolis/saveJoblists?guid='+guid+"&enterId="+enterId,
	 			async : false, // 改成同步
	 			data : JoblistsInfo,
	 			type : 'post',
	 			success : function(date) {
	 				var jsonMap = JSON.parse(date);
	 				if (jsonMap.code == 200) {
	 					alert("保存成功");
	 					flag=true;
	 				} else if (jsonMap.code == 301) {
	 					alert("您为非法用户");
	 					window.location.href = homeUrl + 'stu/safe';
	 				} else if (jsonMap.code == 302) {
	 					alert("您停留时间过长");
	 					window.location.href = homeUrl + 'stu/safe';
	 				} else {
	 					alert("保存失败");
	 				}
	 			},
	 			error : function() {
	 				alert("访问服务器失败！");
	 			},
	 		})
 		}
 		return flag;
  }
function updatejolisInfo(){
	    var flag=false;
		//修改基本信息
 	    JoblistsInfo.jolisId=Joblists.jolisId;
 	    JoblistsInfo.jolisEnterInfoId=Joblists.jolisEnterInfoId;
 	    JoblistsInfo.jolisStatus=Joblists.jolisStatus;
 	    if(JoblistsInfo.jolisStatus==2){
 	    	alert("发布时不能够进行修改职位信息");
 	    	return flag;
 	    }
 		//职位名称
 	    JoblistsInfo.jolisName=$("#jolisNameEdi").val();
 	    if(JoblistsInfo.jolisName==""||JoblistsInfo.jolisName==null){
 	    	JoblistsInfo.jolisName=Joblists.jolisName;
 	    	var jolisCloseDate=Joblists.jolisCloseDate.split(",");
      	  var jolisCloseDateyear=jolisCloseDate[1].trim();
          var jolisCloseDatemonth=trueMonth(jolisCloseDate[0].split(" ")[0]);
          var jolisCloseDateday=jolisCloseDate[0].split(" ")[1];
 	    	JoblistsInfo.jolisCloseDate=jolisCloseDateyear+"/ "+jolisCloseDatemonth+"/ "+jolisCloseDateday+"/";
 	    	JoblistsInfo.jolisPostDate="2017/01/04";
 	    	JoblistsInfo.jolisSalaryLow=Joblists.jolisSalaryLow;
 	    	JoblistsInfo.jolisSalaryHigh=Joblists.jolisSalaryHigh;
 	    	JoblistsInfo.jolisIndId=Joblists.jolisIndId;
 			JoblistsInfo.jolisWrktypId=Joblists.jolisWrktypId;
 			JoblistsInfo.jolisLctId =Joblists.jolisLctId;
 			JoblistsInfo.jolisDescription=Joblists.jolisDescription;
 	    }else{
 	    	//截止日期
 		    var jolisCloseDateyear=$('#joliscloseYearEdi').val();
 			var jolisCloseDatemonth=$('#joliscloseMonthEdi').val();
 			var jolisCloseDateday=$('#joliscloseEdi').val();
 			JoblistsInfo.jolisCloseDate=jolisCloseDateyear+"/"+jolisCloseDatemonth+"/"+jolisCloseDateday;
 			JoblistsInfo.jolisPostDate="2017/01/04";
 		    //薪资上限 下限
 			JoblistsInfo.jolisSalaryLow=$("#jolisSalaryLowEdi").val();
 			JoblistsInfo.jolisSalaryHigh=$("#jolisSalaryHighEdi").val();
 		    //所属职能
 			JoblistsInfo.jolisIndId=$("#jolisIndustry2").val();
 			JoblistsInfo.jolisWrktypId=$("#jolisJobType").val();
 		    //转换工作地
 		    JoblistsInfo.jolisLctId =$("#jolisdistrict").find("option:selected").attr("data-code");
 		    //岗位描述
 		    JoblistsInfo.jolisDescription=$("#jolisDescriptionEdi").val();
 		    //自定义福利
		    var OtherBenefitsArr=$("input[name='jolisDefinedBentift']");
		    JoblistsInfo.jolisDefinedBentifts="";
		    for(var i=0;i<OtherBenefitsArr.length;i++){
		    	if($(OtherBenefitsArr[i]).is(':checked')){
		    		JoblistsInfo.jolisDefinedBentifts+="@#"+$(OtherBenefitsArr[i]).val();
		    	}
		    }
 		    
 	    }
 		//职位人数
 	    JoblistsInfo.jolisPersons=$("#jolisPersonsEdi").val();
 	    if(JoblistsInfo.jolisPersons==""||JoblistsInfo.jolisPersons==null){
 	    	JoblistsInfo.jolisPersons=Joblists.jolisPersons;
 	    	JoblistsInfo.jolisRequirement=Joblists.jolisRequirement;
 	    	JoblistsInfo.jolisNonightshift=Joblists.jolisNonightshift;
 	    	JoblistsInfo.jolisOvertime=Joblists.jolisOvertime;
 	    }else{
 	    	//职能要求
 		    JoblistsInfo.jolisRequirement=$("#jolisRequirementEdi").val();
 			//是否夜班
 		    var yeban= document.getElementsByName("yeban");
 			for(var k in yeban){
 				if(yeban[k].checked){
 					JoblistsInfo.jolisNonightshift=yeban[k].value;
 					break;
 				}
 			}
 			//是否加班
 			var jiaban= document.getElementsByName("jiaban");
 			for(var k in jiaban){
 				if(jiaban[k].checked){
 					JoblistsInfo.jolisOvertime=jiaban[k].value;
 					break;
 				}
 			}
 	    }
 		//学历要求
		JoblistsInfo.jolisEduId=$("#jolisEduIdEdi").val();
 		if(JoblistsInfo.jolisEduId==""||JoblistsInfo.jolisEduId==null){
 			JoblistsInfo.jolisGendex=Joblists.jolisGendex;
 			JoblistsInfo.jolisEduId=Joblists.jolisEduId;
 			JoblistsInfo.jolisExperence=Joblists.jolisExperence;
 			JoblistsInfo.jolisHeightLow=Joblists.jolisHeightLow;
 			JoblistsInfo.jolisHeightHigh=Joblists.jolisHeightHigh;
 			JoblistsInfo.jolisLanguageId=Joblists.jolisLanguageId;
 		}else{
 			//经验要求
 			JoblistsInfo.jolisExperence=$("#jolisExperenceEdi").val();
 			if(JoblistsInfo.jolisExperence==""||JoblistsInfo.jolisExperence==null){
 				JoblistsInfo.jolisExperence=0;
 			}
 			//性别要求
 	 		var jolissex= document.getElementsByName("sex_demand");
 	 		for(var k in jolissex){
 	 			if(jolissex[k].checked){
 	 				JoblistsInfo.jolisGendex=jolissex[k].value;
 	 				if(JoblistsInfo.jolisGendex=="null"){
 	 					JoblistsInfo.jolisGendex=null;
 	 				}
 	 				break;
 	 			}
 	 		}
 			//身高要求
 			JoblistsInfo.jolisHeightLow=$("#jolisHeightLowEdi").val();
 			JoblistsInfo.jolisHeightHigh=$("#jolisHeightHighEdi").val();
 			//语言要求
 			JoblistsInfo.jolisLanguageId=$("#jolisLanguageId2").val();
 			if(JoblistsInfo.jolisLanguageId>0){
 			}else{
 				JoblistsInfo.jolisLanguageId=$("#jolisLanguageId1").val();
 			}
 		}
 		if(JoblistsInfo.jolisName==""||JoblistsInfo.jolisName==null){//企业名称不能为空
 		    $("#jolisNameEdiwarn").css("display","block");
 	    }else if(jolisCloseDateday==0||jolisCloseDateday==""){//时间
 			$("#jolisCloseDatewarn").css("display","block");
 		}else if(!(JoblistsInfo.jolisSalaryHigh)>0){//薪资上限
 			$("#jolisSalaryHighEdiwarn").css("display","block");
 		}else if(JoblistsInfo.jolisIndId==0||JoblistsInfo.jolisIndId==""||JoblistsInfo.jolisIndId==null){//所属职能
 			$("#jolisIndustry2warn").css("display","block");
 		}else if(JoblistsInfo.jolisWrktypId==0||JoblistsInfo.jolisWrktypId==""||JoblistsInfo.jolisWrktypId==null){//工作类型
 			$("#jolisJobTypewarn").css("display","block");
 		}else if(!(JoblistsInfo.jolisLctId)*1>0){//职位所在地
 			$("#jolisdistrictwarn").css("display","block");
 		}else if(JoblistsInfo.jolisDescription==""){
 			$("#jolisDescriptionEdiwarn").css("display","block");//岗位描述
 		}else if(!(JoblistsInfo.jolisPersons)*1>0){//职位需求人数
 			$("#jolisPersonsEdiwarn").css("display","block");
 		}else if(JoblistsInfo.jolisRequirement==""){//职能要求
 			$("#jolisRequirementEdiwarn").css("display","block");
 		}else if(!(JoblistsInfo.jolisEduId)>0){//学历要求
 			$("#jolisEduIdEdiwarn").css("display","block");
 		}else if(!(JoblistsInfo.jolisExperence>=0)){//经验要求
 			$("#jolisExperenceEdiwarn").css("display","block");
 		}else if(JoblistsInfo.jolisHeightLow!=""&&!JoblistsInfo.jolisHeightLow>0){//身高要求
 			$("#jolisHeightLowEdiwarn").css("display","block");
 		}else{
 		var urlHref=window.location.href;
 		var guid=urlHref.split("#")[1];
 		$.ajax({
 			url : homeUrl + 'jolis/updateJoblists?guid='+guid+"&enterId="+enterId,
 			async : false, // 改成同步
 			data : JoblistsInfo,
 			type : 'post',
 			success : function(date) {
 				var jsonMap = JSON.parse(date);
 				if (jsonMap.code == 200) {
 					alert("修改成功");
 					flag=true;
 				} else if (jsonMap.code == 301) {
 					alert("您为非法用户");
 					window.location.href = homeUrl + 'stu/safe';
 				} else if (jsonMap.code == 302) {
 					alert("您停留时间过长");
 					window.location.href = homeUrl + 'stu/safe';
 				} else {
 					alert("修改失败");
 				}
 			},
 			error : function() {
 				alert("访问服务器失败！");
 				
 			},
 		})
	}
    return flag;
}
function addjolisDefinedBentifts(){
	var jolisDefinedBentifts=$("#jolisDefinedBentifts").val();
	if(jolisDefinedBentifts==""||jolisDefinedBentifts==null){
		alert("请输入您要定义的职位福利");
		return 0;
	}else{
		$(".jolisOtherBenefitsDiv").append("<label for=''><input type='checkbox' name='jolisDefinedBentift' checked value='"+jolisDefinedBentifts+"'>"+jolisDefinedBentifts+"</label>");
	}
	$("#jolisDefinedBentifts").val('');
} $("#jolisNameEdi").bind('input propertychange',function(){//职位名称
	var jolisName=$("#jolisNameEdi").val();
	 if(jolisName==""||jolisName==null){//职位名称不能为空
		    $("#jolisNameEdiwarn").css("display","block");
	  }else{
		  $("#jolisNameEdiwarn").css("display","none");
	  }
});
$('#jolisCloseDateEdi').change(function(){
		if($('#jolisCloseDateday').val()==0||$('#jolisCloseDateday').val()==""){
			$("#jolisCloseDatewarn").css("display","block");
		}else{
			$("#jolisCloseDatewarn").css("display","none");
		}
	});
$("#jolisSalaryHighEdi").bind('input propertychange',function(){
	var jolisSalaryHigh=$("#jolisSalaryHighEdi").val();
	 if(jolisSalaryHigh>0){
		 $("#jolisSalaryHighEdiwarn").css("display","none");
	  }else{
		  $("#jolisSalaryHighEdiwarn").css("display","block");
	  }
});
$('#jolisIndustry2').change(function(){
		if($('#jolisIndustry2').val()==null||$('#jolisIndustry2').val()==0||$('#jolisIndustry2').val()==""){
			$("#jolisIndustry2warn").css("display","block");
		}else{
			$("#jolisIndustry2warn").css("display","none");
		}
	});
$('#jolisJobType').change(function(){
	if($('#jolisJobType').val()==null||$('#jolisJobType').val()==0||$('#jolisJobType').val()=="" ){
		$("#jolisJobTypewarn").css("display","block");
	}else{
		$("#jolisJobTypewarn").css("display","none");
	}
});
$('#jolisLctEdi').change(function(){
	var jolisdistrict=$("#jolisdistrict").find("option:selected").attr("data-code");
	if(jolisdistrict*1==0||jolisdistrict==""){
		$("#jolisdistrictwarn").css("display","block");
	}else{
		$("#jolisdistrictwarn").css("display","none");
	}
});
$("#jolisDescriptionEdi").bind('input propertychange',function(){
	 if($("#jolisDescriptionEdi").val()==""||$("#jolisDescriptionEdi").val()==null){
		    $("#jolisDescriptionEdiwarn").css("display","block");
	  }else{
		  $("#jolisDescriptionEdiwarn").css("display","none");
	  }
});
$("#jolisPersonsEdi").bind('input propertychange',function(){
	 if($("#jolisPersonsEdi").val()>0){
		 $("#jolisPersonsEdiwarn").css("display","none");
	  }else{
		  $("#jolisPersonsEdiwarn").css("display","block");
		  
	  }
});
$("#jolisRequirementEdi").bind('input propertychange',function(){
	 if($("#jolisRequirementEdi").val()==""||$("#jolisRequirementEdi").val()==null){
		    $("#jolisRequirementEdiwarn").css("display","block");
	  }else{
		  $("#jolisRequirementEdiwarn").css("display","none");
	  }
});
$('#jolisEduIdEdi').change(function(){
	if($('#jolisEduIdEdi').val()==0||$('#jolisEduIdEdi').val()==""){
		$("#jolisEduIdEdiwarn").css("display","block");
	}else{
		$("#jolisEduIdEdiwarn").css("display","none");
	}
});
$("#jolisExperenceEdi").bind('input propertychange',function(){
	 if($("#jolisExperenceEdi").val()==""||$("#jolisExperenceEdi").val()==null){
		 $("#jolisExperenceEdiwarn").css("display","none");
	  }else{
		  if($("#jolisExperenceEdi").val()*1>0){
			    $("#jolisExperenceEdiwarn").css("display","none");
		  }else{
			  $("#jolisExperenceEdiwarn").css("display","block");
		  }
	  }
});
$("#jolisHeightLowEdi").bind('input propertychange',function(){
	 if($("#jolisHeightLowEdi").val()!=""&&!$("#jolisHeightLowEdi").val()*1>0){
		   $("#jolisHeightLowEdiwarn").css("display","block");
	  }else{
		  $("#jolisHeightLowEdiwarn").css("display","none");
	  }
});