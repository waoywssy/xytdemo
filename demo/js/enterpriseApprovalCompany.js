window.onload = getJolisIDJump;
function getJolisIDJump(){
	var EnterInfo=eval('(' + localStorage.enterinfo + ')');
	// 获取名称
	                 $("#enterInfoNamePrei").html(EnterInfo.enterInfoName);
	                 $("#enterInfoIdPrei").html(EnterInfo.enterInfoId);
	                 $("#enterInfoNamePrei").attr("title",EnterInfo.enterInfoName);
	               // 获取公司详细地址
	                 if(EnterInfo.enterInfoLctId!=undefined){
	                	// 所在地
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
	                     $("#enterInfoLctIdPrei").html(enterLoc+"    ");
	                     $("#enterinfoAdressPeri").html(EnterInfo.enterinfoAdress);
	                 }
	                // 获取公司性质
	                 $("#enterInfoCmptyIdPeri").html("["+cmptyp_a[EnterInfo.enterInfoCmptyId]+"]");
	                 // 行业
	                 if(EnterInfo.enterInfoIndId1!=undefined){
	                	 var enterIndIdfirst=parseInt((EnterInfo.enterInfoIndId1+"").substring(0,4)+"000000000");
	                     var enterIndIdfirstpreview=industry[1000000000000][enterIndIdfirst];
	                     var enterIndIdSecondpreview=industry[enterIndIdfirst][EnterInfo.enterInfoIndId1];
	                     var enterIndIdpreview=enterIndIdfirstpreview+"--"+enterIndIdSecondpreview;
	                	 $("#enterInfoIndId1Peri").html(enterIndIdpreview);
	                	 $("#enterInfoIndId1Peri").attr("title",enterIndIdpreview);
	                	// 行业2
		                 if(EnterInfo.enterInfoIndId2!=undefined&&EnterInfo.enterInfoIndId2!=""&&EnterInfo.enterInfoIndId2!=0){
		                	 var enterIndIdfirst=parseInt((EnterInfo.enterInfoIndId2+"").substring(0,4)+"000000000");
		                     var enterIndIdfirstpreview=industry[1000000000000][enterIndIdfirst];
		                     var enterIndIdSecondpreview=industry[enterIndIdfirst][EnterInfo.enterInfoIndId2];
		                     var enterIndIdpreview2=enterIndIdfirstpreview+"--"+enterIndIdSecondpreview;
		                     $("#enterInfoIndId1Peri").html(enterIndIdpreview+"；"+enterIndIdpreview2);
		                     $("#enterInfoIndId1Peri").attr("title",enterIndIdpreview+"；"+enterIndIdpreview2);
		                   // 行业3
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
	               // 公司规模
	                 if(EnterInfo.enterInfoScaleId!=undefined){
	                	 $("#enterInfoScaleIdPrei").html(EnterInfo.enterInfoScaleId+"人");
	                 }
	               // 联系电话
	                 if(EnterInfo.enterinfoPhone!=undefined){
	                	 $("#enterinfoPhonePeri").html("电话："+EnterInfo.enterinfoPhone);
	                 }
	               // 公司福利显示
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
	         	    			var enterInfoOtherBenefits="";
	         	    			enterInfoOtherBenefits+=s[i]+",";
	         		    	}
	         	    	}
	         	    }
	         	  $("#enterInfoOtherBenefitsPeri").html(enterInfoOtherBenefits);
	         	    // 简介
	         	  if(EnterInfo.enterInfoOverview==null||EnterInfo.enterInfoOverview==""){
	         		 $("#enterInfoOverviewPeri").html("　　");
	         	  }else{
	         		 var enterInfoOverview=EnterInfo.enterInfoOverview.replace(/\n+/ig, "<br>");
	         		 $("#enterInfoOverviewPeri").html(JSON.stringify(enterInfoOverview));
	         	  }
                	// 社会统一代码
	                	 $("#enterInfoIeepaPeri").html(EnterInfo.enterInfoIeepa);
	                // 注册地
	                  	  var province100=parseInt((EnterInfo.enterInfoRegisterLctId+"").substring(0,3)+"0000000000000");
	                  	  var enterLoc=ChineseDistricts[1000000000000000][province100];
	                      enterLoc+="-"+ChineseDistricts[province100][EnterInfo.enterInfoRegisterLctId];
	                 	 $("#enterInfoRegisterLctIdPeri").html(enterLoc);
	                // 成立时间
	                 	 if(EnterInfo.enterInfoHolddate==""||EnterInfo.enterInfoHolddate==null){
	                 		$("#enterInfoHolddatePeri").html("");
	                 	 }else{
	                 		 var enterPostDate=EnterInfo.enterInfoHolddate.split(",");
		                 	 var enterPostDateyear=enterPostDate[1].trim();
		                     var enterPostDatemonth=TurnMonth(enterPostDate[0].split(" ")[0]);
		                     var enterPostDateday=enterPostDate[0].split(" ")[1];
			                 $("#enterInfoHolddatePeri").html(enterPostDateyear+" 年 "+enterPostDatemonth+" 月 "+enterPostDateday+" 日");
	                 	 }
	                 // 注册资金
	                	 $("#enterInfoCapitalsPeri").html(EnterInfo.enterInfoCapitals+"万人民币");
	                   // 微博
	  				   if(EnterInfo.enterInfoMicroblog!=undefined){
	  					   $("#enterinfoWeiboPeri").html("微博："+EnterInfo.enterInfoMicroblog);
	  				   }
	  				   // 邮箱
	  				   if(EnterInfo.enterinfoEmail!=undefined){
	  					   $("#enterinfoEmailPeri").html("邮箱："+EnterInfo.enterinfoEmail);
	  				   }
	  				   // QQ
	  				   if(EnterInfo.enterinfoQq!=undefined){
	  					   $("#enterinfoQqPeri").html("Q&nbsp;&nbsp;Q："+EnterInfo.enterinfoQq);
	  				   }
	  				   // 微信
	  				   if(EnterInfo.enterInfoWeChatPublic!=undefined){
	  					   $("#enterinfoWechatPeri").html("微信："+EnterInfo.enterInfoWeChatPublic);
	  				   }
	  				   // 网址
	  				   if(EnterInfo.enterInfoWebAddress!=undefined){
	  					   $("#enterinfoWebAddressPeri").html("网址：<a>"+EnterInfo.enterInfoWebAddress+"</a>");
	  				   }   
	                 enterInfoIdS=EnterInfo.enterInfoId;
}
//将月份的（四改成4） 
function TurnMonth(month){
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
//企业信息表id
var enterInfoIdS=0;

var teachId=1;
var guid="37g337Q99hAP0KShTqhhn9ZI11lLpONT";
//企业审批通过
function enterprisePassBtn(){
	$("#tochangeStatusApply").css('display','block');
}

//企业审批通过确定
function approvalOfBusinessApproval(){
	enterInfoId=enterInfoIdS;
	var enterInfoCheckStatus=1;
	$.ajax({
		url : homeUrl + 'enterinfo/updateEnterInfostatus',
		async : false,
		data : {
			"teachId" : teachId,
		    "guid" : guid,
		    "enterInfoId":enterInfoId,
		    "enterInfoCheckStatus":enterInfoCheckStatus,
		},
		type : 'post',
		success : function(data) {
			var jsonMap = JSON.parse(data);
			if (jsonMap.code == 301) {
				alert("您为非法用户");
				window.location.href = "getJoblists.html";
			} else if (jsonMap.code == 302) {
				alert("您停留时间过长");
				window.location.href = "getJoblists.html";
			} else if (jsonMap.code == 200){
				$("#tochangeStatusApply").css('display','none');
				$("#operalmessage").css('display','block');
			}
		},
		error : function() {
			alert("访问服务器失败！");
		},
			});
}

//操作成功
function successfulOperation(){
	location.href="../html/teachCompany.html";
}

//企业审批通过取消
function enterpriseApprovalIsCanceled(){
	$("#tochangeStatusApply").css('display','none');
}



//企业审批拒绝
function enterpriseFailBtn(){
	$("#torefucesStatus").css('display','block');
}

//企业审批拒绝确定
function enterpriseApprovalRefusedToDetermine(){
	enterInfoId=enterInfoIdS;
	enterInfoCheckStatus=-1;
	$.ajax({
		url : homeUrl + 'enterinfo/updateEnterInfostatus',
		async : false,
		data : {
			"teachId" : teachId,
		    "guid" : guid,
		    "enterInfoId":enterInfoId,
		    "enterInfoCheckStatus":enterInfoCheckStatus,
		},
		type : 'post',
		success : function(data) {
			var jsonMap = JSON.parse(data);
			if (jsonMap.code == 301) {
				alert("您为非法用户");
				window.location.href = "getJoblists.html";
			} else if (jsonMap.code == 302) {
				alert("您停留时间过长");
				window.location.href = "getJoblists.html";
			} else if (jsonMap.code == 200){
				$("#torefucesStatus").css('display','none');
				$("#operalmessage").css('display','block');
			}
		},
		error : function() {
			alert("访问服务器失败！");
		},
			});
}

//企业审批拒绝取消
function enterpriseApprovalRefusedToCancel(){
	$("#torefucesStatus").css('display','none');
}

//企业审批返回
function enterpriseExitBtn(){
	location.href="../html/teachCompany.html";
}