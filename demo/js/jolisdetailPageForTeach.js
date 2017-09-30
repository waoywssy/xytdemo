window.onload = getJolisIDJump;
function getJolisIDJump(){
	var jolis=eval('(' + localStorage.jolisinfo + ')');
	//获取发布时间预览
	var jolisPostDate=jolis.jolisPostDate.split(",");
	var jolisPostDateyear=jolisPostDate[1].trim();
	var jolisPostDatemonth=trueMonth(jolisPostDate[0].split(" ")[0]);
	var jolisPostDateday=jolisPostDate[0].split(" ")[1];
	var jolisPostDatePrei=jolisPostDateyear+"/ "+jolisPostDatemonth+"/"+jolisPostDateday;
	//获取截止时间预览
	var jolisCloseDate=jolis.jolisCloseDate.split(",");
	var jolisCloseDateyear=jolisCloseDate[1].trim();
	var jolisCloseDatemonth=trueMonth(jolisCloseDate[0].split(" ")[0]);
	var jolisCloseDateday=jolisCloseDate[0].split(" ")[1];
	var jolisCloseDatePrei=jolisCloseDateyear+"/"+jolisCloseDatemonth+"/"+jolisCloseDateday;
   //所在地
	var province100=parseInt((jolis.jolisLctId+"").substring(0,3)+"0000000000000");
	var city10=parseInt((jolis.jolisLctId+"").substring(0,5)+"00000000000");
	var basicLoc=ChineseDistricts[1000000000000000][province100]+"-"+ChineseDistricts[province100][city10];
	//薪资
	var jolisSalaryLow="0";
	if(jolis.jolisSalaryLow!=null&&jolis.jolisSalaryLow>0){
		jolisSalaryLow=((jolis.jolisSalaryLow)/1000)+"k";
	}
	jolisSalaryHigh=(jolis.jolisSalaryHigh)/1000;
	var showjolisSalary=jolisSalaryLow+"-"+jolisSalaryHigh+"k";
	//福利
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
	//学历要求
	var jolisEduId=edu_a[jolis.jolisEduId]+"及以上"
	//工作类型
	var jobType = Wrktyp_a[jolis.jolisWrktypId];
	//经验要求
	var jolisExperence=jolis.jolisExperence;
	if(jolis.jolisExperence!=null&&jolis.jolisExperence>0){
		jolisExperence="经验"+jolis.jolisExperence+"年以下";
	}else{
		jolisExperence="经验不限";
	}
	//性别要求
	var gender="男女不限";
	if(jolis.jolisGendex){
		gender="男士";
	}else if(!jolis.jolisGendex){
		gender="女士";
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
	//行业转换显示
    var jolisIndIdfirst=parseInt((jolis.jolisIndId+"").substring(0,4)+"000000000");
    var jolisIndIdfirstpreview=industry[1000000000000][jolisIndIdfirst];
    var jolisIndIdSecondpreview=industry[jolisIndIdfirst][jolis.jolisIndId];
    var jolisIndIdpreview=jolisIndIdfirstpreview+"--/"+jolisIndIdSecondpreview;
    var jolisDescription=(jolis.jolisDescription).replace(/\n+/ig, "<br/>").replace(/\s/g,"&nbsp;");
    var jolisRequirement=(jolis.jolisRequirement).replace(/\n+/ig, "<br/>").replace(/\s/g,"&nbsp;");
    $("#positiondetailPagePrei").empty();
	$("#positiondetailPagePrei").append('<div class="position-head">'+
			'<div class="position-content ">'+
			'<div class="lutton">'+
               ' <button class="btn btn-primary"  onclick="tochangeStatusApply('+jolis.jolisId+');">通过</button>'+
                '<button class="btn btn-primary btn_refuse"  onclick="torefucesStatus('+jolis.jolisId+');">拒绝</button>'+
                '<button class="btn btn-primary btn_return" id="toJumpteacherInfo" onclick="toJumpteacherInfo();">返回</button>'+
           ' </div>'+
			'<div class="position-content-l">'+
				'<div class="job-name" title="'+jolis.entername+'">'+
					'<div class="company">'+jolis.entername+'</div>'+
					'<span class="name">'+jolis.jolisName+'</span>'+
				'</div><dd class="job_request">'+
					'<p>'+
						'<span class="salary">'+showjolisSalary+' </span>'+
						'<span>/'+basicLoc+'/</span>'+
						'<span>'+jolisExperence+' /</span>'+
						'<span>'+jolisEduId+' /</span>'+
						'<span>'+jobType+'</span>'+
					'</p>职位标签<ul class="position-label clearfix">'+
						'<li class="labels">'+jolisIndIdpreview+'</li>'+
						'<p class="publish_time">'+jolisPostDatePrei+'发布 - '+jolisCloseDatePrei+'截止</p>'+
					'</ul>'+
				'</dd></div></div></div>'+
	'<div class="content clearfix">'+
		'<div class="content_l">'+
			'<dl class="job_detail" id="job_detail">'+
				'<dt class="clearfix join_tc_icon">'+
				'</dt>'+
				'<dd class="job-advantage">'+
					'<span class="advantage">职位诱惑：</span>'+
					'<p>'+enterhousingfund+enterinsurance+enterweekend+entervacation+entermeal+enteraccommodation+'</p>'+
				'</dd>'+
				'<dd class="job_bt"><h3 class="description">职位描述：</h3>'+
				'<div><p>岗位职责:<br>'+jolisDescription+
				'</p><p>任职资格:<br>'+jolisRequirement+
					'</p></div>'+
				'</dd></dl></div></div>');
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
var overjolisIdforTeachcheck=0;
//通过
function tochangeStatusApply(jolisId){
	overjolisIdforTeachcheck=jolisId;
	$("#tochangeStatusApply").css("display","block");
}
//拒绝
function torefucesStatus(jolisId){
	overjolisIdforTeachcheck=jolisId;
	$("#torefucesStatus").css("display","block");
}
//确认
function toconfirm(conde){
	if(conde==1){
		$("#tochangeStatusApply").css("display","none");
		var jolisStatus=2;
		var jolisId=overjolisIdforTeachcheck;
		updatejolisStatusTeach(jolisId,jolisStatus)
	}else if(conde==2){
		$("#torefucesStatus").css("display","none");
		var jolisStatus=5;
		var jolisId=overjolisIdforTeachcheck;
		updatejolisStatusTeach(jolisId,jolisStatus)
	}else if(conde==3){
		location.href="../html/teachPosition.html";
	}
}
//取消
function tocancle(conde){
	if(conde==1){
		$("#tochangeStatusApply").css("display","none");
	}else if(conde==2){
		$("#torefucesStatus").css("display","none");
	}else if(conde==3){
		location.href="../html/teachPosition.html";

	}
}
//返回
function toJumpteacherInfo(){
	location.href="../html/teachPosition.html";
}
var teachId=1;
var guid="37g337Q99hAP0KShTqhhn9ZI11lLpONT";
//该方法用于改变职位状态
function updatejolisStatusTeach(jolisId,jolisStatus){
	$.ajax({
		url:homeUrl+'jolis/updatejolisStatusTeach',
		async:false, //改成同步
		data:{
		    "teachId":teachId,
		    "guid":guid,
		    "jolisId":jolisId,
		    "jolisStatus":jolisStatus
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
				$(operalmessage).css("display","block");                  	
			}
		},
		error:function () {
            alert("访问服务器失败！");
        },
    })
}