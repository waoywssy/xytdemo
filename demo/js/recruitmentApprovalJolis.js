window.onload = getJolisIDJump;
var teachId=1;
var guid="37g337Q99hAP0KShTqhhn9ZI11lLpONT";
function getJolisIDJump(){
	$("#positiondetailPagePrei").html('');
	var jolis=eval('(' + localStorage.jolisinfo + ')');
	// 薪资是否为空验证
	var salaryLow;
	var salaryHigh;
	if(jolis.jolisSalaryLow==null){
		 salaryLow="~";
	}else{
		 salaryLow=jolis.jolisSalaryLow+"k";
	}
	if(jolis.jolisSalaryHigh==null){
		 salaryHigh="~";
	}else{
		 salaryHigh=jolis.jolisSalaryHigh+"k";
	}
	if(jolis.jolisSalaryLow==null&&jolis.jolisSalaryHigh==null){
		salary="薪资面议";
	}else{
		salary = salaryLow+"---"+salaryHigh;
	}
	 if(jolis.jolisLctId!=null){
     	//所在地
     	var province100=parseInt((jolis.jolisLctId+"").substring(0,3)+"0000000000000");
     	var basicLoc=ChineseDistricts[1000000000000000][province100];
         var city10 = (jolis.jolisLctId+"").substring(3,5);
         var district10=(jolis.jolisLctId+"").substring(5,7);
         if(city10!="00"){
        	      var city10=parseInt((jolis.jolisLctId+"").substring(0,5)+"00000000000");
        	   basicLoc+="-"+ChineseDistricts[province100][city10];
         }
         if(district10!="00"){
         	basicLoc+="-"+ChineseDistricts[city10][jolis.jolisLctId];
         }
     }else{
    	 basicLoc="无工作地点"
     }
	// 学历转化+验证
		var eduLevel;
		if(jolis.jolisEduId==null){
			eduLevel="学历无";
		}else{
			eduLevel=edu_a[jolis.jolisEduId];
		}
	if(jolis.jolisWrktypId != null){
        	// 转换工作类型
        	var jobType = Wrktyp_a[jolis.jolisWrktypId];
       }else{
    	   var jobType ="任意工作类型";
       }
	if(jolis.enterhousingfund==false){
		enterhousingfund="";
	}else{
		enterhousingfund="公积金 "
	}
	if(jolis.enterinsurance==false){
		enterinsurance="";
	}else{
		enterinsurance="五险 "
	}
	if(jolis.enterweekend==false){
		enterweekend="";
	}else{
		enterweekend="双休 "
	}
	if(jolis.entervacation==false){
		entervacation="";
	}else{
		entervacation="年假 "
	}
	if(jolis.entermeal==false){
		entermeal="";
	}else{
		entermeal="包吃 "
	}
	if(jolis.enteraccommodation==false){
		enteraccommodation="";
	}else{
		enteraccommodation="包住 "
	}
	
    // 自定义福利
	if(jolis.enterotherBenefits!=undefined&&jolis.enterotherBenefits!=""){
	    var s=jolis.enterotherBenefits.split("@#");
	    for(var i=1;i<s.length;i++){
	        if(s[i]!=""||s[i]!=null){
	         	var enterInfoOtherBenefits;
	         	    enterInfoOtherBenefits+=s[i]+",";
	        }
	    }
	}
	  //夜班
    if(jolis.jolisNonightshift==1){
    	var jolisNonightshift="有夜班 ";
    }else if(jolis.jolisNonightshift==0){
    	var jolisNonightshift="无夜班 ";
    }
    //加班
    if(jolis.jolisOvertime==1){
    	var jolisOvertime="有加班 ";
    }else if(jolis.jolisOvertime==0){
    	var jolisOvertime="无加班 ";
    }
    if(jolis.jolisEduId!=null){
    	//学历要求
    	var jolisEduId=edu_a[jolis.jolisEduId]+"以上 ";
    }else{
    	var jolisEduId="";
    };
    if(jolis.jolisExperence!=null){
    	//经验要求
    	var jolisExperence='工作经验'+jolis.jolisExperence+'年';
    }else{
    	var jolisExperence ='经验0年';
    }
    if(jolis.jolisExperence!=null){
    	//经验要求
    	var JolisExperences='工作经验'+jolis.jolisExperence+'年 ';
    }else{
    	var JolisExperences ="";
    }
   //性别要求
	if(jolis.jolisGendex==true){
		var jolisGendex="男 ";
    }else if(jolis.jolisGendex==false){
    	var jolisGendex="女 ";
    }else{
    	var jolisGendex="男女不限 ";
    }
   //身高要求
	if(jolis.jolisHeightLow!=null){
        var jolisHeightLow="最低"+jolis.jolisHeightLow+"cm ";
    }else{
    	var jolisHeightLow="";
    }
	if(jolis.jolisHeightHigh!=null){
		var jolisHeightHigh="最高"+jolis.jolisHeightHigh+"cm ";
    }else{
    	var jolisHeightHigh="";
    }
  //语言要求
	if(jolis.jolisLanguageId!=null&&jolis.jolisLanguageId!=""){
		var luageLength=(jolis.jolisLanguageId+"").length-3;
		var jolisLanguageId1="";
		if(luageLength==1){
			jolisLanguageId1=parseInt((jolis.jolisLanguageId+"").substring(0,3)+"0");
		}else{
			jolisLanguageId1=parseInt((jolis.jolisLanguageId+"").substring(0,3)+"00");
		}
    	var jolisLuag=language[10][jolisLanguageId1];
    	if(jolisLanguageId1!=jolis.jolisLanguageId){
    		jolisLuag+="-"+language[jolisLanguageId1][jolis.jolisLanguageId];
    	}
    }else{
    	jolisLuag="";
    }
	
	 //获取发布时间预览
	var jolisPostDate=jolis.jolisPostDate.split(",");
	var jolisPostDateyear=jolisPostDate[1].trim();
    var jolisPostDatemonth=TurnMonth(jolisPostDate[0].split(" ")[0]);
    var jolisPostDateday=jolisPostDate[0].split(" ")[1];
    var jolisPostDate= jolisPostDateyear+"."+jolisPostDatemonth+"."+jolisPostDateday;
    //获取截止时间预览
    var jolisCloseDate=jolis.jolisCloseDate.split(",");
	var jolisCloseDateyear=jolisCloseDate[1].trim();
    var jolisCloseDatemonth=TurnMonth(jolisCloseDate[0].split(" ")[0]);
    var jolisCloseDateday=jolisCloseDate[0].split(" ")[1];
    var jolisCloseDate=jolisCloseDateyear+"."+jolisCloseDatemonth+"."+jolisCloseDateday;
 
    if(jolis.jolisIndId!=null){
    	//行业转换显示
        var jolisIndIdfirst=parseInt((jolis.jolisIndId+"").substring(0,4)+"000000000");
        var jolisIndIdfirstpreview=industry[1000000000000][jolisIndIdfirst];
        var jolisIndIdSecondpreview=industry[jolisIndIdfirst][jolis.jolisIndId];
        var jolisIndIdpreview=jolisIndIdfirstpreview+"--/"+jolisIndIdSecondpreview;
    }
    var jolisDescription=(jolis.jolisDescription).replace(/\n+/ig, "<br/>").replace(/\s/g,"&nbsp;");
    var jolisRequirement=(jolis.jolisRequirement).replace(/\n+/ig, "<br/>").replace(/\s/g,"&nbsp;");
	$("#positiondetailPagePrei").append('<div class="position-head" data-companyid=""><div class="position-content "><div class="position-content-l"><div class="job-name"><div class="company"><a onclick="togetenterdetailInfo('+jolis.jolisEnterInfoId+');" title="'+jolis.entername+'">'
			+jolis.entername+'</a></div><span class="name">'
			+jolis.jolisName+'</span></div><dd class="job_request"><p><span class="salary">'
			+salary+'&nbsp'+'</span><span>'
			+'/'+basicLoc+'&nbsp'+'</sapn><span>'
			+'/'+jolisExperence+'&nbsp'+'</sapn><span>'
			+'/'+eduLevel+'&nbsp'+'</sapn><span>'
			+'/'+jobType+'</span></p><ul class="position-label clearfix"><li class="labels">'
			+jolisIndIdpreview+'</li><p class="publish_time">'
			+jolisPostDate+'&nbsp'+'发布 /'+jolisCloseDate+'&nbsp'+'截止'+'</p></ul></dd></div></div></div><div class="content clearfix"><div class="content_l fl"><dl class="job_detail" id="job_detail"><dt class="clearfix join_tc_icon"></dt><dd class="job-advantage"><span class="advantage">'
			+'职位诱惑:'+'</span><p>'
			+enterhousingfund+enterinsurance+enterweekend+entervacation+entermeal+enteraccommodation+'</p><p>'
			+'其他福利：'+enterInfoOtherBenefits
			+'</p></dd><dd class="job_bt"><h3 class="description">'
			+'职位描述：'+'</h3><div><p>'
			+'岗位职责：'+'<br/>'
			+jolisDescription+'</p><p>'
			+'任职资格：'+'<br/>'
			+jolisRequirement+'<br/>'
			+jolisNonightshift+jolisOvertime+jolisEduId+JolisExperences+jolisGendex+jolisHeightLow+jolisHeightHigh+jolisLuag+'&nbsp'+'...'+'</p></div></dd></dl></div></div>');
}

function togetenterdetailInfo(enterInfoId){
	$.ajax({
		url:homeUrl+'JobFairView/getEnterInfoforteach',
		async:false, //改成同步
		data:{
			"teachId":teachId,
		    "guid":guid,
		    "enterInfoId":enterInfoId,
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
				 var jsonstr = JSON.stringify(list);
				 localStorage.jofaiinfo = jsonstr; 
				 console.log(localStorage.jofaiinfo);//获取值
				 location.href=encodeURI("../html/teachJobFairCom.html");
			}
		},
		error:function () {
            alert("访问服务器失败！");
        },
    })
}

function TurnMonth(month) {
	switch (month) {
	case "一月":
		month = "1";
		break
	case "二月":
		month = "2";
		break
	case "三月":
		month = "3";
		break
	case "四月":
		month = "4";
		break
	case "五月":
		month = "5";
		break
	case "六月":
		month = "6";
		break
	case "七月":
		month = "7";
		break
	case "八月":
		month = "8";
		break
	case "九月":
		month = "9";
		break
	case "十月":
		month = "10";
		break
	case "十一月":
		month = "11";
		break
	case "十二月":
		month = "12";
		break
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
	case "June":
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