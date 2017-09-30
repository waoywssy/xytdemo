window.onload = getenterInfoforJump;
var enterInfoId="";
function getenterInfoforJump(){
    var jsonstr=localStorage.enterInfos;
	var EnterInfo=eval('(' + jsonstr + ')');
	//获取名称
     $("#enterInfoNamePrei").html(EnterInfo.enterInfoName);
     $("#enterInfoIdPrei").html(EnterInfo.enterInfoId);
     $("#enterInfoNamePrei").attr("title",EnterInfo.enterInfoName);
     //发布的职位数
     $("#jolisCounts").html(EnterInfo.jolisCounts);
     //拼接职位和公司主页
     $("#appendcompanyandjolis").empty();
     $("#appendcompanyandjolis").append("<li class='current' id='clicktoPreiEnterInfo'>"+
				"<a>公司主页</a>"+
				"</li>"+
				"<li id='clicktoPreijolisInfos'>"+
					"<a>招聘职位("+EnterInfo.jolisCounts+")</a>"+
				"</li>");
     ab();
     cd();
    //获取公司详细地址
     if(EnterInfo.enterInfoLctId!=undefined){
    	//所在地
     	var province100=parseInt((EnterInfo.enterInfoLctId+"").substring(0,3)+"0000000000000");
     	var enterLoc=ChineseDistricts[1000000000000000][province100];
         var city10 = (EnterInfo.enterInfoLctId+"").substring(3,5);
         var district10=(EnterInfo.enterInfoLctId+"").substring(5,7);
         if(city10!="00"){
        	  var city10=parseInt((EnterInfo.enterInfoLctId+"").substring(0,5)+"00000000000");
        	  enterLoc+="-"+ChineseDistricts[province100][city10];
         }
         if(district10!="00"){
        	 enterLoc+="-"+ChineseDistricts[city10][EnterInfo.enterInfoLctId];
         }
         $("#enterinfoAdressPeri").html(enterLoc+"   "+EnterInfo.enterinfoAdress);
     }
    //获取公司性质
     $("#enterInfoCmptyIdPeri").html("["+cmptyp_a[EnterInfo.enterInfoCmptyId]+"]");
     //行业
     if(EnterInfo.enterInfoIndId1!=undefined){
    	 var enterIndIdfirst=parseInt((EnterInfo.enterInfoIndId1+"").substring(0,4)+"000000000");
         var enterIndIdfirstpreview=industry[1000000000000][enterIndIdfirst];
         var enterIndIdSecondpreview=industry[enterIndIdfirst][EnterInfo.enterInfoIndId1];
         var enterIndIdpreview=enterIndIdfirstpreview+"--"+enterIndIdSecondpreview;
    	 $("#enterInfoIndId1Peri").html(enterIndIdpreview);
    	 $("#enterInfoIndId1Peri").attr("title",enterIndIdpreview);
    	//行业2
         if(EnterInfo.enterInfoIndId2!=undefined&&EnterInfo.enterInfoIndId2!=""&&EnterInfo.enterInfoIndId2!=0){
        	 var enterIndIdfirst=parseInt((EnterInfo.enterInfoIndId2+"").substring(0,4)+"000000000");
             var enterIndIdfirstpreview=industry[1000000000000][enterIndIdfirst];
             var enterIndIdSecondpreview=industry[enterIndIdfirst][EnterInfo.enterInfoIndId2];
             var enterIndIdpreview2=enterIndIdfirstpreview+"--"+enterIndIdSecondpreview;
             $("#enterInfoIndId1Peri").html(enterIndIdpreview+"；"+enterIndIdpreview2);
             $("#enterInfoIndId1Peri").attr("title",enterIndIdpreview+"；"+enterIndIdpreview2);
           //行业3
             if(EnterInfo.enterInfoIndId3!=undefined&&EnterInfo.enterInfoIndId3!=""&&EnterInfo.enterInfoIndId3!=0){
            	 var enterIndIdfirst=parseInt((EnterInfo.enterInfoIndId3+"").substring(0,4)+"000000000");
                 var enterIndIdfirstpreview=industry[1000000000000][enterIndIdfirst];
                 var enterIndIdSecondpreview=industry[enterIndIdfirst][EnterInfo.enterInfoIndId3];
                 var enterIndIdpreview3=enterIndIdfirstpreview+"--"+enterIndIdSecondpreview;
                 $("#enterInfoIndId1Peri").html(enterIndIdpreview+"；"+enterIndIdpreview2+"；"+enterIndIdpreview3);
                 $("#enterInfoIndId1Peri").attr("title",enterIndIdpreview+"；"+enterIndIdpreview2+"；"+enterIndIdpreview3);
             }
         }
     }
   //公司规模
     if(EnterInfo.enterInfoScaleId!=undefined){
    	 $("#enterInfoScaleIdPrei").html(+EnterInfo.enterInfoScaleId+"人以上");
     }
   //联系电话
     if(EnterInfo.enterinfoPhone!=undefined){
    	 $("#enterinfoPhonePeri").html("电话 : "+EnterInfo.enterinfoPhone);
     }
   //微博
   if(EnterInfo.enterInfoMicroblog!=undefined){
	   $("#enterinfoWeiboPeri").html("微博 : "+EnterInfo.enterInfoMicroblog);
   }
   //邮箱
   if(EnterInfo.enterinfoEmail!=undefined){
	   $("#enterinfoEmailPeri").html("邮箱 : "+EnterInfo.enterinfoEmail);
   }
   //QQ
   if(EnterInfo.enterinfoQq!=undefined){
	   $("#enterinfoQqPeri").html("Q&nbsp;&nbsp;Q : "+EnterInfo.enterinfoQq);
   }
   //微信
   if(EnterInfo.enterInfoWeChatPublic!=undefined){
	   $("#enterinfoWechatPeri").html("微信 : "+EnterInfo.enterInfoWeChatPublic);
   }
   //网址
   if(EnterInfo.enterInfoWebAddress!=undefined){
	   $("#enterinfoWebAddressPeri").html("网址 : <a>"+EnterInfo.enterInfoWebAddress+"</a>");
   }
   //公司福利显示
     var enterInfoBenefits="";
     if(EnterInfo.enterInfoHousingfund){
     	// 公积金
    	 enterInfoBenefits+="公积金,";
     }
     if(EnterInfo.enterInfoInsurance){
     	// 五险
    	 enterInfoBenefits+="五险,";
     }
     if(EnterInfo.enterInfoWeekend){
     	// 双休
    	 enterInfoBenefits+="双休,";
     }
     if(EnterInfo.enterInfoVacation){
     	// 年假
    	 enterInfoBenefits+="年假,";
     }
     if(EnterInfo.enterInfoMeal){
     	// 包吃
    	 enterInfoBenefits+="包吃,";
     }
     if(EnterInfo.enterInfoAccommodation){
     	// 包住
    	 enterInfoBenefits+="包住,";
     }
   $("#enterInfoBenefitsPrei").html(enterInfoBenefits);
	               // 自定义福利
	         	    if(EnterInfo.enterInfoOtherBenefits!=undefined&&EnterInfo.enterInfoOtherBenefits!=""){
	         	    	var s=EnterInfo.enterInfoOtherBenefits.split("@#");
	         	    	for(var i=1;i<s.length;i++){
	         	    		if(s[i]!=""||s[i]!=null){
	         	    			var enterInfoOtherBenefits;
	         	    			enterInfoOtherBenefits+=s[i]+",";
	         		    	}
	         	    	}
	         	    }
	$("#enterInfoOtherBenefitsPeri").html("其他福利:"+enterInfoOtherBenefits);
	
    //简介
  var enterInfoOverview=EnterInfo.enterInfoOverview.replace("\n", "<br>");
	 $("#enterInfoOverviewPeri").html(""+JSON.stringify(enterInfoOverview));
	//社会统一代码
    	 $("#enterInfoIeepaPeri").html(EnterInfo.enterInfoIeepa);
    //注册地
      	  var province100=parseInt((EnterInfo.enterInfoRegisterLctId+"").substring(0,3)+"0000000000000");
      	  var enterLoc=ChineseDistricts[1000000000000000][province100];
          enterLoc+="-"+ChineseDistricts[province100][EnterInfo.enterInfoRegisterLctId];
     	 $("#enterInfoRegisterLctIdPeri").html(enterLoc);
    //成立时间
    	 var enterPostDate=EnterInfo.enterInfoHolddate.split(",");
     	 var enterPostDateyear=enterPostDate[1].trim();
         var enterPostDatemonth=TurnMonth(enterPostDate[0].split(" ")[0]);
         var enterPostDateday=enterPostDate[0].split(" ")[1];
         $("#enterInfoHolddatePeri").html(enterPostDateyear+" 年 "+enterPostDatemonth+" 月 "+enterPostDateday+" 日成立");
     //注册资金
    	 $("#enterInfoCapitalsPeri").html(EnterInfo.enterInfoCapitals+"万人民币");
		var cuurentPage=$(".jolispagination span.current").text();
		var pagesize=3;
		enterInfoId=EnterInfo.enterInfoId;
		showJolisInfo(cuurentPage,pagesize,enterInfoId);  	 
}
//点击显示职位
function cd(){
	$("#clicktoPreijolisInfos").click(function(e){
		$("#companyoverviewprei").css("display","none");
		$("#jolisInfoprei").css("display","block");
		$("#clicktoPreijolisInfos").addClass("current");
		$("#clicktoPreiEnterInfo").removeClass("current");
		e.preventDefault();
	})
		
}
//点击显示公司所有信息
function ab(){
	$("#clicktoPreiEnterInfo").click(function(e){
		$("#companyoverviewprei").css("display","block");
		$("#jolisInfoprei").css("display","none");
		$("#clicktoPreiEnterInfo").addClass("current");
		$("#clicktoPreijolisInfos").removeClass("current");
		e.preventDefault();
	});
}
//显示职位列表
function showJolisInfo(cuurentPage,pagesize,enterInfoId){
	$("#shoujolisInfoforHomePage").empty();
	 //显示职位信息
	$.ajax({
		url:homeUrl+'jolis/getJoblistsforHomePage',
		async:false, //改成同步
		data:{
			"enterInfoId":enterInfoId,
			"cuurentPage":cuurentPage,
		    "pagesize":pagesize,
		},
		type:'post',
		success:function(date){
			var jsonMap=JSON.parse(date);
			if(jsonMap.code==200){
				var list=jsonMap.data;
				if(list.length>0){
					for(var i=0;i<list.length;i++){
						var Joblists=list[i];
						//获取发布时间预览
                    	var jolisPostDate=Joblists.jolisPostDate.split(",");
                    	var jolisPostDateyear=jolisPostDate[1].trim();
                        var jolisPostDatemonth=TurnMonth(jolisPostDate[0].split(" ")[0]);
                        var jolisPostDateday=jolisPostDate[0].split(" ")[1];
                        var jolisPostDatePrei=jolisPostDateyear+"年 "+jolisPostDatemonth+"月"+jolisPostDateday+"日";
                       //所在地
                    	var province100=parseInt((Joblists.jolisLctId+"").substring(0,3)+"0000000000000");
                    	var city10=parseInt((Joblists.jolisLctId+"").substring(0,5)+"00000000000");
                    	var basicLoc=ChineseDistricts[1000000000000000][province100]+"-"+ChineseDistricts[province100][city10]+"-"+ChineseDistricts[city10][Joblists.jolisLctId];
                    	//薪资
	                    var jolisSalaryLow="0";
	                    if(Joblists.jolisSalaryLow!=null&&Joblists.jolisSalaryLow>0){
	                    	jolisSalaryLow=((Joblists.jolisSalaryLow)/1000)+"k";
	                	}
	                	jolisSalaryHigh=(Joblists.jolisSalaryHigh)/1000;
	                	var showjolisSalary=jolisSalaryLow+"-"+jolisSalaryHigh+"k";
	                	//学历要求
                        var jolisEduId=edu_a[Joblists.jolisEduId]+"及以上"
                        //工作类型
                        var jobType = Wrktyp_a[Joblists.jolisWrktypId];
                        //经验要求
                        var jolisExperence=Joblists.jolisExperence;
                        $("#spanjolisExperence").html(Joblists.jolisExperence+"年以下");
                        if(Joblists.jolisExperence!=null&&Joblists.jolisExperence>0){
                        	jolisExperence="经验"+Joblists.jolisExperence+"年以下";
                        }else{
                        	jolisExperence="经验不限";
                        }
						$("#shoujolisInfoforHomePage").append("<li class='con_list_item default_list'>"+
													"<div class='item_title_date'><a class='item_title position_link' onclick='togetJolisInfo("+Joblists.jolisId+");'>"+Joblists.jolisName+"-"+basicLoc+"["+ ChineseDistricts[province100][city10] +" ]</a>" +
															"<span class='item_date'>"+jolisPostDatePrei+"发布</span>"+
													"</div><p class='item_detail'>"+
														"<span class='item_salary'>"+showjolisSalary+"</span>"+
														"<span class='item_desc'>"+jolisExperence+" / "+jolisEduId+" / "+jobType+"</span>"+
													"</p><i class='left_border'></i>"+
												"</li>");
					}
				}else{
				}
				//分页代码
				var PageUtils=jsonMap.datapage;
				var pagesLi=PageUtils.currentPage;
				var currentNode=$(".jolispagination span.current");
				currentNode.html(pagesLi);
				pagesLi=pagesLi+1;
				currentNode.next("span").html(pagesLi);
				pagesLi=pagesLi+1;
				currentNode.next("span").next("span").html(pagesLi);
				pagesLi=pagesLi+1;
				currentNode.next("span").next("span").next("span").html(pagesLi);
				$("#JolistotalPage").html(PageUtils.totalPage);
			}
		},
		error:function () {
            alert("访问服务器失败！");
        },
    })
}
//跳转页面分页代码
$(".tojumpjolis").click(function (e) {
	var cuurentPage=$(this).text();//获取当前页码
	var TotalPage=$("#JolistotalPage").text();//获取总页数
	if(cuurentPage>=TotalPage){
		cuurentPage=TotalPage;
		alert("跳转到最后一页"+TotalPage);
	}
	var pagesize=3;
	showJolisInfo(cuurentPage,pagesize,enterInfoId);
	e.preventDefault();
})
//下一页分页代码
$("#jolisNextPage").click(function (e) {
	var cuurentPage=$(".jolispagination span.current").text();
	cuurentPage=cuurentPage*1+1;
	var TotalPage=$("#JolistotalPage").text();//获取总页数
	if(cuurentPage>TotalPage){
		alert("这是最后一页了");
	}else{
		var pagesize=3;
		showJolisInfo(cuurentPage,pagesize,enterInfoId);
		e.preventDefault();
	}
})
//上一页分页代码
$("#jolisLastPage").click(function (e) {
	var cuurentPage=$(".jolispagination span.current").text();
	cuurentPage=cuurentPage-1;
	if(cuurentPage<1){
		alert("已经是第一页了");
	}else{
		var pagesize=3;
		showJolisInfo(cuurentPage,pagesize,enterInfoId);
		
	}
	e.preventDefault();
})
//首页分页代码
$("#jolisfirstPage").click(function (e) {
	var cuurentPage=1;
	var pagesize=3;
	showJolisInfo(cuurentPage,pagesize,enterInfoId);
	e.preventDefault();
})
//尾页分页代码
$("#jolisfinalPage").click(function (e) {
	var TotalPage=$("#JolistotalPage").text();//获取总页数
	var cuurentPage=TotalPage;
	var pagesize=3;
	showJolisInfo(cuurentPage,pagesize,enterInfoId);
	e.preventDefault();
})