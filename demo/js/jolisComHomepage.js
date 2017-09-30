window.onload = getJolisIDJump;
function getJolisIDJump(){
	var jolis=eval('(' + localStorage.indexjolisinfos + ')');
	// 薪资是否为空验证
	var salaryLow;
	var salaryHigh;
	if(jolis.jolisSalaryLow==null||jolis.jolisSalaryLow==""){
		 salaryLow="~";
	}else{
		 salaryLow=jolis.jolisSalaryLow+"k";
	}
	if(jolis.jolisSalaryHigh==null||jolis.jolisSalaryLow==""){
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
    var jolisPostDate= jolisPostDateyear+" 年 "+jolisPostDatemonth+" 月 "+jolisPostDateday+" 日";
    //获取截止时间预览
    var jolisCloseDate=jolis.jolisCloseDate.split(",");
	var jolisCloseDateyear=jolisCloseDate[1].trim();
    var jolisCloseDatemonth=TurnMonth(jolisCloseDate[0].split(" ")[0]);
    var jolisCloseDateday=jolisCloseDate[0].split(" ")[1];
    var jolisCloseDate=jolisCloseDateyear+" 年 "+jolisCloseDatemonth+" 月 "+jolisCloseDateday+" 日";
 
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
			+jolisPostDate+'&nbsp'+'发布 /'+jolisCloseDate+'&nbsp'+'截止'+'</p></ul></dd><div class="position-content-r clearfix"><div class="position-deal clearfix"><div class="resume-deliver"><a rel="nofollow" href="javascript:;" class="passport_login_pop btn fr btn_apply" style="display: block" id="resumeDelivery" onclick="toResumeDelivery('+jolis.jolisId+","+jolis.jolisEnterInfoId+');">'
			+'投个简历'+'</a><a rel="nofollow" href="javascript:;" class="btn fr btn_sended" style="display: none" id="hasBeenDelivered">'
			+'已投递'+'</a></div></div><ul class="resume-select clearfix"><li class="resume no-resume-attachment" style="display: none"><span><a class="passport_login_pop" rel="nofollow" href="javascript:;"><i class="icon-glyph-attachment"></i>'
			+'上传简历附件'+'</a></span></li><li class="resume no-resume-online" style="display: none"><span><a href="https://www.lagou.com/resume/basic.html" target="_blank" title="完善在线简历" rel="nofollow"><i class="icon-glyph-online-resume"></i>'
			+'完善在线简历'+'</a></span></li></ul></div></div></div><div class="content clearfix"><div class="content_l fl"><dl class="job_detail" id="job_detail"><dt class="clearfix join_tc_icon"></dt><dd class="job-advantage"><span class="advantage">'
			+'职位诱惑:'+'</span><p>'
			+enterhousingfund+enterinsurance+enterweekend+entervacation+entermeal+enteraccommodation+'</p></dd><dd class="job_bt"><h3 class="description">'
			+'职位描述：'+'</h3><div><p>'
			+'岗位职责：'+'<br/>'
			+jolisDescription+'</p><p>'
			+'任职资格：'+'<br/>'
			+jolisRequirement+'<br/>'
			+jolisNonightshift+jolisOvertime+jolisEduId+JolisExperences+jolisGendex+jolisHeightLow+jolisHeightHigh+jolisLuag+'&nbsp'+'...'+'</p></div></dd></dl></div></div>');
}