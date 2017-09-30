var personalBaseInfo = {
	"stuId":"",//主键Integer
	"stuWeOpenid":"",//微信第三方登录唯一标识符
	"stuUstyId":"",//常量表用户类型主键（获取用户类型）Integer
	"stuNumber":"",//学生工号Integer
	"stuNickName":"",//学生昵称
	"stuName":"",//学生姓名
	"stuEnrolled":"",//入校日期
	"stuEnrollyear":"",//为了前台数据传输创建
	"stuEnrollmonth":"",//为了前台数据传输创建
	"stuEnrollday":"",//为了前台数据传输创建
	"stuEnrolled":"",//入学时间
	"stuGraduated":"",//毕业时间
	"stuEduId":"",//学历表主键（获取学历）Integer
	"stuCostId":"",//学院结构表中的costUgrpId（获取学院00/系00/专业00/班级00）Integer
	"academy":"",//所在学院编号//为了前台数据传输创建
	"department":"",//所在系编号//为了前台数据传输创建
	"major":"",//所在专业编号//为了前台数据传输创建
	"stuCostDp":"",//学院结构表中的costUgrpId（获取学院00/00系/00专业）辅修专业Integer
	"stuIdcard":"",//身份证
	"stuNowadderss":"",//现居住地址
	"stuLocId":"",//地域表中的主键（获取生源地）Integer
	"stuMobphone":"",//手机电话（可以写两个）
	"stuEmail":"",//邮箱
	"stuPhoneName":"",//图片路径
	"stuEmployment":"",//是否在职Integer 0是false  1是true
	"stuNation":"",//民族
	"stuHeight":"",//身高
	"stuInsertTime":"",//第一次创建时间
	"stuUpdateTime":"",//更新时间
	"stuIdeentify":"",//是否认证Integer 0是false  1是true
	"province":"",//所在省 //为了前台数据传输创建
	"city":"",//所在省//为了前台数据传输创建
	"district":"",//所在区//为了前台数据传输创建
	}
//点击跳转首页 自加载方法
window.onload = onloadgetBasicInfo();
//点击进入首页的自加载方法
function onloadgetBasicInfo(){
	var guid="37g337Q99hAP0KShTqhhn9ZI11lLpONT";
	var urlHref=window.location.href;
	urlHref=urlHref.split("#")[0];   	
	urlHref=urlHref+"#"+guid
	location.href=urlHref;
	getBasicInfo();
}
$('#getBasicInfo').click( function(e){
	getBasicInfo();
	e.preventDefault();
});

//获得基本信息
function getBasicInfo(){
	var stuWeOpenid="c";
	var urlHref=window.location.href;
	var guid=urlHref.split("#")[1];
	$.ajax({
        type:'post',
        url:homeUrl+'stu/getStuBasicInfo',
        dataType:'json',
        data:{"openid":stuWeOpenid,"guid":guid},
        success:function(date){
        	if(date.code==301){
        		alert("您为非法用户");
        		window.location.href=homeUrl+'stu/safe'; 
        	}else if(date.code==302){
        		alert("您停留时间过长");
        		window.location.href=homeUrl+'stu/safe'; 
            }else if(date.code!=200){
                alert(date.message);
            }else{
                var list = date.data;
                 personalBaseInfo=list[0];
                 //获取图片预览
                 if(personalBaseInfo.stuPhoneName!=undefined&&personalBaseInfo.stuPhoneName!=""){
                	 $("#stuShowPhone").attr("src","../uploads/"+personalBaseInfo.stuPhoneName);
                 }
                //获取学号
                $("#stuNumberpreview").html(personalBaseInfo.stuNumber);
                //获取姓名
                $("#stuNamepreview").html(personalBaseInfo.stuName);
                //获取性别
                if(personalBaseInfo.stuIdcard!=undefined&&personalBaseInfo.stuIdcard!=""){
                	var genderNumber=personalBaseInfo.stuIdcard.substring(17,18);
                	if(genderNumber%2==1){
                   	 $("#stuGenderpreview").html("男");
                   }else{
                   	 $("#stuGenderpreview").html("女");
                   }
                }else{
                	$("#stuGenderpreview").html("保密");
                }
                //获取出生时间预览
                if(personalBaseInfo.stuIdcard!=undefined&&personalBaseInfo.stuIdcard!=""){
                	var stuDobyear=personalBaseInfo.stuIdcard.substring(6,10);
                	var stuDobmonth=personalBaseInfo.stuIdcard.substring(10,12);
                	var stuDobday=personalBaseInfo.stuIdcard.substring(12,14);
                	$("#stuDobYearpreview").html(stuDobyear+"/");
                	$("#stuDobMonthpreview").html(stuDobmonth+"/");
                	$("#stuDobDaypreview").html(stuDobday);
                }else{
                }
              //获取入校时间预览
                if(personalBaseInfo.stuEnrolled!=undefined){
                	var stuEnroll=personalBaseInfo.stuEnrolled.split(",");
                	var stuEnrollyear=stuEnroll[1].trim();
                    var stuEnrollmonth=trueMonth(stuEnroll[0].split(" ")[0]);
                    var stuEnrollday=stuEnroll[0].split(" ")[1];
                    if(personalBaseInfo.stuEnrolled!=null){
                    	$("#stuenrolledYearpreview").html(stuEnrollyear+"　年　");
                    	$("#stuenrolledMonthpreview").html(stuEnrollmonth+"　月　");
                    	$("#stuenrolledDaypreview").html(stuEnrollday+" 日 ");
                    }
                    personalBaseInfo.stuEnrollyear=stuEnrollyear;
                    personalBaseInfo.stuEnrollmonth=stuEnrollmonth;
                    personalBaseInfo.stuEnrollday=stuEnrollday;
                }
              //身高
                $("#stuHeightpreview").html(personalBaseInfo.stuHeight);
              //获取所在专业
                if(personalBaseInfo.stuCostId!=undefined){
                	var academy=parseInt((personalBaseInfo.stuCostId+"").substring(0,3)+"000000");
                    var academypreview=universitygropsUgrp[100000000][academy];
                    var department=parseInt((personalBaseInfo.stuCostId+"").substring(0,5)+"0000");
                    var departmentpreview=universitygropsUgrp[academy][department];
                    var major=parseInt((personalBaseInfo.stuCostId+"").substring(0,7)+"00");
                    var majorpreview=universitygropsUgrp[department][major];
                    var gradepreview=universitygropsUgrp[major][personalBaseInfo.stuCostId];
                    personalBaseInfo.academy=academy;
                    personalBaseInfo.department=department;
                    personalBaseInfo.major=major;
                    $("#stuCollogepreview").html(academypreview+"/"+departmentpreview);
                    $("#stuMajorpreview").html(majorpreview+"/"+gradepreview);
                }
              //所在地
                if(personalBaseInfo.stuLocId!=undefined){
                	var province100=parseInt((personalBaseInfo.stuLocId+"").substring(0,3)+"0000000000000");
                	var basicLoc=ChineseDistricts[1000000000000000][province100];
                	personalBaseInfo.province=ChineseDistricts[1000000000000000][province100];
                    var city10 = (personalBaseInfo.stuLocId+"").substring(3,5);
                    var district10=(personalBaseInfo.stuLocId+"").substring(5,7);
                    if(city10!="00"){
                   	      var city10=parseInt((personalBaseInfo.stuLocId+"").substring(0,5)+"00000000000");
                   	   basicLoc+="-"+ChineseDistricts[province100][city10];
                   	   personalBaseInfo.city=ChineseDistricts[province100][city10];
                    }
                    if(district10!="00"){
                    	basicLoc+="-"+ChineseDistricts[city10][personalBaseInfo.stuLocId];
                    	 personalBaseInfo.district=ChineseDistricts[city10][personalBaseInfo.stuLocId];
                    }
                    $("#stuLocIdpreview").html(basicLoc);
                }
                //民族
                if(personalBaseInfo.stuNation!=undefined){
                	$('#stuNationLi').css('display', 'block');
                	$("#stuNationpreview").html(personalBaseInfo.stuNation);
                }else{
                	$('#stuNationLi').css('display', 'none');
                }
                //电话号码
                if(personalBaseInfo.stuMobphone!=undefined){
                	$('#stuMobphoneLi').css('display', 'block');
                	$("#stuMobphonepreview").html(personalBaseInfo.stuMobphone);
                }else{
                	$('#stuMobphoneLi').css('display', 'none');
                }
                //是否在职
                if(personalBaseInfo.stuEmployment==0){
               	 $("#stuEmploymentpreview").html("否");
                }else{
               	 $("#stuEmploymentpreview").html("是");
                }
                //现居住地址
                if(personalBaseInfo.stuNowadderss==undefined||personalBaseInfo.stuNowadderss==""||personalBaseInfo.stuNowadderss==null){
                	$('#stuNowadderssLi').css('display', 'none');
                }else{
                	$('#stuNowadderssLi').css('display', 'block');
                	$("#stuNowaddersspreview").html(personalBaseInfo.stuNowadderss);
                }
               //身份证
                if(personalBaseInfo.stuIdcard==undefined||personalBaseInfo.stuIdcard==""||personalBaseInfo.stuIdcard==null){
                }else{
                	$("#stuIdcardpreview").html(personalBaseInfo.stuIdcard);
                }
              //QQ
                if(personalBaseInfo.stuQq==undefined||personalBaseInfo.stuQq==""||personalBaseInfo.stuQq==null){
                	$('#stuQqLi').css('display', 'none');
                }else{
                	$('#stuQqLi').css('display', 'block');
                	$("#stuQqpreview").html(personalBaseInfo.stuQq);
                }
              //微信
                if(personalBaseInfo.stuWechat==undefined||personalBaseInfo.stuWechat==""||personalBaseInfo.stuWechat==null){
                	$('#stuWechatLi').css('display', 'none');
                }else{
                	$('#stuWechatLi').css('display', 'block');
                	$("#stuWechatpreview").html(personalBaseInfo.stuWechat);
                }
               //电子邮箱
                if(personalBaseInfo.stuEmail==undefined||personalBaseInfo.stuWechat==""||personalBaseInfo.stuWechat==null){
                	$('#stuEmailLi').css('display', 'none');
                }else{
                	$('#stuEmailLi').css('display', 'block');
                	$("#stuEmailpreview").html(personalBaseInfo.stuEmail);
                }
            }
            },
        error:function () {
            alert("连接服务器失败！");
        }
        })
}
//基本信息之点击编辑
$('#cliToEdi').click( function(){
	$('#basInfoPre').css('display', 'none');
    $('#basInfoEdi').css('display', 'block');
    //入校时间
    $("#stuEnrolledyearEdi option[value='"+personalBaseInfo.stuEnrollyear+"']").attr("selected","selected");//根据值让option选中 
    $("#stuEnrolledyearEdi").change();
    $("#stuEnrolledmonthEdi option[value='"+personalBaseInfo.stuEnrollmonth+"']").attr("selected","selected");//根据值让option选中 
    $("#stuEnrolledmonthEdi").change();
    $("#stuEnrolleddayEdi option[value='"+personalBaseInfo.stuEnrollday+"']").attr("selected","selected");//根据值让option选中 
    $("#stuEnrolleddayEdi").change();
    //生源地-籍贯再定
	$("#stuprovince10 option[value='"+personalBaseInfo.province+"']").attr("selected","selected");//根据值让option选中
	$("#stuprovince10").change();
    if(personalBaseInfo.city!=""){
   	     $("#stucity10 option[value='"+personalBaseInfo.city+"']").attr("selected","selected");//根据值让option选中
   	     $("#stucity10").change();
    }
    if(personalBaseInfo.district!=""){
    	$("#studistrict10 option[value='"+personalBaseInfo.district+"']").attr("selected","selected");//根据值让option选中
    	$("#studistrict10").change();
    }
    //所在院系专业
    stumajorEdi1(100000000);
    stumajorEdi2(personalBaseInfo.academy);
    stumajorEdi3(personalBaseInfo.department);
    stumajorEdi4(personalBaseInfo.major);
    $("#stumajorEdi1 option[value='"+personalBaseInfo.academy+"']").attr("selected","selected");//根据值让option选中
    $("#stumajorEdi1").change()
    $("#stumajorEdi2 option[value='"+personalBaseInfo.department+"']").attr("selected","selected");//根据值让option选中
    $("#stumajorEdi2").change()
    $("#stumajorEdi3 option[value='"+personalBaseInfo.major+"']").attr("selected","selected");//根据值让option选中
    $("#stumajorEdi3").change()
    $("#stumajorEdi4 option[value='"+personalBaseInfo.stuCostId+"']").attr("selected","selected");//根据值让option选中
    $("#stumajorEdi4").change()
    //汉族
    $("#stunationEdi").val(personalBaseInfo.stuNation);
    //联系电话
    $("#stumobilePh").val(personalBaseInfo.stuMobphone);
  	  //获取学号
      $("#stuNumEdi").html(personalBaseInfo.stuNumber);
      //获取姓名
      $("#stuNameEdi").html(personalBaseInfo.stuName);
      //身份证号
      $("#stuIdcardEdi").val(personalBaseInfo.stuIdcard);
      //qq
      $("#stuqqEdi").val(personalBaseInfo.stuQq);
      //微信
      $("#stuWechatEdi").val(personalBaseInfo.stuWechat);
      //电子邮箱
      $("#stuEmailEdi").val(personalBaseInfo.stuEmail);
      //现居住地址
      $("#stuaddressEdit").val(personalBaseInfo.stuNowadderss);
      //身高
      $("#stuHeightEdi").val(personalBaseInfo.stuHeight);
      //是否在职
      if(personalBaseInfo.stuEmployment==false){
      	personalBaseInfo.stuEmployment=0;
  	 }else{
  		personalBaseInfo.stuEmployment=1;
  	 }
  	$("input[name='stuEmployment'][value="+personalBaseInfo.stuEmployment+"]").attr("checked",true);
  	//图片上传另外赋值Id
  	$("#stuIdforupload").attr("value",personalBaseInfo.stuId);
  	if(personalBaseInfo.stuPhoneName!=undefined&&personalBaseInfo.stuPhoneName!=""){
   	  document.getElementById("stuPhoneEdi").setAttribute("src","../uploads/"+personalBaseInfo.stuPhoneName);
    }
  	//隐藏所有提示信息
  	$("#bornDatespan").css("display","none");
  	$("#stumajorEdi4span").css("display","none");
  	$("#stuoriginPlacespan").css("display","none");
  	$("#stuEnrolledspan").css("display","none");
});
//民族纯汉字输入
function checkstunationEdi(stunationEdi){
	var flag=true;
	var stunationEdi=$("#stunationEdi").val();
	var valid = +/^[\u4e00-\u9fa5]{0,}$/.test(stunationEdi);
	if(valid){
	}else{
		return false;
	}
	return flag;
}
$("#stunationEdi").bind('input propertychange',function(){
	var stunationEdi=$("#stunationEdi").val();
	var valid = +/^[\u4e00-\u9fa5]{0,}$/.test(stunationEdi);
	if(stunationEdi!=""){
		$("#stunationEdispan1").css("display","none");
	}else{
		$("#stunationEdispan1").css("display","block");
	}
	if(valid){
		$("#stunationEdispan2").css("display","none");
	}else{
		$("#stunationEdispan2").css("display","block");
	}
	});
//身高验证
$("#stuHeightEdi").bind('input propertychange',function(){
	    if ($('#stuHeightEdi').val()> 0) {
	    } else {
	        var pcerMark1 = $('#stuHeightEdi').val();
	        pcerMark1 = pcerMark1.replace(/^\D+$/ig, "");
	        pcerMark1 = parseFloat(pcerMark1);
	        if (isNaN(pcerMark1)) {
	            $('#stuHeightEdi').val("");
	        } else {
	            $('#stuHeightEdi').val(pcerMark1);
	        }
	    }
    if($('#stuHeightEdi').val()==""){
	    $("#stuHeightEdispan2").css("display","block");
    }else{
    	$("#stuHeightEdispan1").css("display","none");
	    $("#stuHeightEdispan2").css("display","none");
    }
    if($('#stuHeightEdi').val()>250){
    	$('#stuHeightEdi').val("");
    	$("#stuHeightEdispan1").css("display","block");
    	$("#stuHeightEdispan2").css("display","none");
    }
});
//入校日期
$('#stuEnrolled').change(function(){
	if($('#stuEnrolleddayEdi').val()==0||$('#stuEnrolleddayEdi').val()==""){
		$("#stuEnrolledspan").css("display","block");
	}else{
		$("#stuEnrolledspan").css("display","none");
	}
});
//所在院系班级验证
$('#stumajorEdi4').change(function(){
	if($('#stumajorEdi4').val()==0){
		$("#stumajorEdi4span").css("display","block");
	}else{
		$("#stumajorEdi4span").css("display","none");
	}
});
//所在地校验
$('#stuoriginPlace').change(function(){
	if($('#stuoriginPlace select:eq(0)').val()==""||$('#stuoriginPlace select:eq(1)').val()==""||$('#stuoriginPlace select:eq(2)').val()==""){
		$("#stuoriginPlacespan").css("display","block");
	}else{
		$("#stuoriginPlacespan").css("display","none");
	}
});
//手机号校验
function checkphone(phone){
	var flag=true;
	//去除所有空格
	phone=phone.trim();
	phone=phone.replace(/\s/g,"");
	if(phone.length>15){
		//判断是否使用逗号隔开
		var arr=phone.split("，");
		var arr2=phone.split("；");
		var arr3=phone.split(",");
		var arr4=phone.split(";");
		if(checkarrohone(arr)){
			
		}else if(checkarrohone(arr2)){
			
		}else if(checkarrohone(arr3)){
			
		}else if(checkarrohone(arr4)){
			
		}else{
			 flag=false;
			 return flag;
		}	
	}else if((/^1[34578]\d{9}$/.test(phone))){
		
	}else{
		 flag=false;
		 return flag;
	}
	return flag;
}
//两个手机号验证的核心代码
function checkarrohone(arr){
	var flag=false;
	if(arr.length==2){
		$("#stumobilePhspan3").css("display","none");
		for(var i  in arr){
			if(arr[i].length>11){
				var str=str.substring(arr[i].length-11,arr[i].length);
				if((/^1[34578]\d{9}$/.test(str))){
				}else{
					$("#stumobilePhspan2").css("display","block");
				}
			}else{
				if((/^1[34578]\d{9}$/.test(arr[i]))){
				}else{
					$("#stumobilePhspan2").css("display","block");
				}
			}
		}
		if((/^1[34578]\d{9}$/.test(arr[0]))&&(/^1[34578]\d{9}$/.test(arr[i]))){
			$("#stumobilePhspan2").css("display","none");
		}
		flag=true;
	}
	return flag;
}
$("#stumobilePh").bind('input propertychange',function(){
	var phone=$('#stumobilePh').val();
	if(phone!=""){
		$("#stumobilePhspan1").css("display","none");
	}else{
		$("#stumobilePhspan1").css("display","block");
	}
	//去除所有空格
	phone=phone.trim();
	phone=phone.replace(/\s/g,"");
	if(phone.length>14){
		//判断是否使用逗号隔开
		var arr=phone.split("，");
		var arr2=phone.split("；");
		var arr3=phone.split(",");
		var arr4=phone.split(";");
		if(checkarrohone(arr)){
			
		}else if(checkarrohone(arr2)){
			
		}else if(checkarrohone(arr3)){
			
		}else if(checkarrohone(arr4)){
			
		}else{
			$("#stumobilePhspan2").css("display","none");
			$("#stumobilePhspan3").css("display","block");
		}	
	}else if((/^1[34578]\d{9}$/.test(phone))){
		$("#stumobilePhspan2").css("display","none");
		$("#stumobilePhspan3").css("display","none");
	}else{
		$("#stumobilePhspan3").css("display","none");
		$("#stumobilePhspan2").css("display","block");
	}
});
//身份证号验证
function checkstuIdcardEdi(stuIdcardEdi){
	var stuIdcardEdi=$("#stuIdcardEdi").val();
	var valid =+/^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/.test(stuIdcardEdi);
	if(valid){
		return true;
	}else{
		return false;
	}
}
$("#stuIdcardEdi").bind('input propertychange',function(){
	var stuIdcardEdi=$("#stuIdcardEdi").val();
	if(stuIdcardEdi==""||stuIdcardEdi==null){
		$("#stuIdcardEdispan1").css("display","block");
	}else{
		$("#stuIdcardEdispan1").css("display","none");
		var valid =+/^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/.test(stuIdcardEdi);
		if(valid){
			$("#stuIdcardEdispan2").css("display","none");
		}else{
			$("#stuIdcardEdispan2").css("display","block");
		}
	}
	
	});
//微信验证
function checkstuWechatEdi(stuWechatEdi){
	var flag=true;
	var stuWechatEdi=$("#stuWechatEdi").val();
	var valid =+/^[a-zA-Z]{1}[-_a-zA-Z0-9]{5,19}$/.test(stuWechatEdi);
	if(valid){
	}else{
		return false;
	}
	return flag;
}
$("#stuWechatEdi").bind('input propertychange',function(){
	var stuWechatEdi=$("#stuWechatEdi").val();
	if(stuWechatEdi==""||stuWechatEdi==null){
		$("#stuWechatEdispan").css("display","none");
	}else{
		var valid =+/^[a-zA-Z]{1}[-_a-zA-Z0-9]{5,19}$/.test(stuWechatEdi);
		if(valid){
			$("#stuWechatEdispan").css("display","none");
		}else{
			$("#stuWechatEdispan").css("display","block");
		}
	}
	
	});
//电子邮箱校验
function checkstuEmailEdi(stuEmailEdi){
	var flag=true;
	var stuEmailEdi=$("#stuEmailEdi").val();
	var valid = +/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+\.){1,63}[a-zA-Z0-9]+$/.test(stuEmailEdi);
	if(valid){
	}else{
		return false;
	}
	return flag;
}
$("#stuEmailEdi").bind('input propertychange',function(){
	var stuEmailEdi=$("#stuEmailEdi").val();
		if(stuEmailEdi==""||stuEmailEdi==null){
			$("#stuEmailEdispan").css("display","none");
		}else{
			var valid = +/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+\.){1,63}[a-zA-Z0-9]+$/.test(stuEmailEdi);
			if(valid){
				$("#stuEmailEdispan").css("display","none");
			}else{
				$("#stuEmailEdispan").css("display","block");
			}
		}
	});
//修改基本信息
function updatebaseInfo(){
	    if($('#stuHeightEdi').val()==""){//身高为空判断
		    $("#stuHeightEdispan2").css("display","block");
	    }else if($('#stumajorEdi4').val()==0||$('#stumajorEdi4').val()==null||$('#stumajorEdi4').val()==""){//所在院系判断
			$("#stumajorEdi4span").css("display","block");
		}else if($('#stuEnrolleddayEdi').val()==0||$('#stuEnrolleddayEdi').val()==""){//在校日期
			$("#stuEnrolledspan").css("display","block");
		}else if($('#stuoriginPlace select:eq(0)').val()==""||$('#stuoriginPlace select:eq(1)').val()==""||$('#stuoriginPlace select:eq(2)').val()==""){
			$("#stuoriginPlacespan").css("display","block");//所在地判断
		}else if($('#stunationEdi').val()==""){//民族为空判断
			$("#stunationEdispan1").css("display","block");
		}else if(!checkstunationEdi($("#stunationEdi").val())){//民族纯汉子判断
			$("#stunationEdispan2").css("display","block");
		}else if($('#stumobilePh').val()==""){//手机号码为空判断
			$("#stumobilePhspan1").css("display","block");
		}else if(!checkphone($('#stumobilePh').val())){//手机号码格式判断
		}else if($("#stuIdcardEdi").val()==""){
			$("#stuIdcardEdispan1").css("display","block");
			//身份证为空判断
		}else if($("#stuIdcardEdi").val()!=""&&!checkstuIdcardEdi($("#stuIdcardEdi").val())){
			$("#stuIdcardEdispan2").css("display","block");
			//身份证格式判断
		}else if($("#stuEmailEdi").val()!=""&&!checkstuEmailEdi($("#stuEmailEdi").val())){
			//电子邮箱格式判断
		}else if($("#stuWechatEdi").val()!=""&&!checkstuWechatEdi($("#stuWechatEdi").val())){
			//微信格式判断
		}else{
			//身高
			personalBaseInfo.stuHeight=$("#stuHeightEdi").val();
			//获取所在专业
			personalBaseInfo.stuCostId=$('#stumajorEdi4').val();
			//获取入校日期
			var stuenrolledYear=$('#stuEnrolledyearEdi').val();
			var stuenrolledMonth=$('#stuEnrolledmonthEdi').val();
			var stuenrolledDay=$('#stuEnrolleddayEdi').val();
			personalBaseInfo.stuEnrolled=stuenrolledYear+"/"+stuenrolledMonth+"/"+stuenrolledDay;
			//所在地
			var province= $('#stuoriginPlace select:eq(0)').val();
		    var city = $('#stuoriginPlace select:eq(1)').val();
		    var district= $('#stuoriginPlace select:eq(2)').val();
		    if(city==""){
		    	district=province;
		    }else if(district==""){
		    	district=city;
		    }
		    for(var i in ChineseDistricts){
		        for(var j in ChineseDistricts[i]){
		            if(ChineseDistricts[i][j]==district){
		              j = parseInt(j);
		              personalBaseInfo.stuLocId = j;
		              break;
		            }
		        }
		    }
		    //民族
		    personalBaseInfo.stuNation=$("#stunationEdi").val();
		    //联系电话
		    personalBaseInfo.stuMobphone=$("#stumobilePh").val();
			//是否在职
			var stuEmployment= document.getElementsByName("stuEmployment");
			for(var k in stuEmployment){
				if(stuEmployment[k].checked){
					personalBaseInfo.stuEmployment=stuEmployment[k].value;
				}
			}
		    //获取身份证号码
			personalBaseInfo.stuIdcard=$("#stuIdcardEdi").val();
			//获取QQ
			personalBaseInfo.stuQq=$("#stuqqEdi").val();
			//获取微信
			personalBaseInfo.stuWechat=$("#stuWechatEdi").val();
			//获得电子邮箱
			personalBaseInfo.stuEmail=$("#stuEmailEdi").val();
			//现居住地址
		    personalBaseInfo.stuNowadderss=$("#stuaddressEdit").val();
		    var urlHref=window.location.href;
			var guid=urlHref.split("#")[1];
			$.ajax({
				url:homeUrl+'stu/updateStuBasicInfo?guid='+guid,
				async:false, //改成同步
				data:personalBaseInfo,
				type:'post',
				success:function(date){
					var jsonMap=JSON.parse(date);
					if(jsonMap.code==200){
						alert("修改成功");
						getBasicInfo();
						$('#basInfoPre').css('display', 'block');
					    $('#basInfoEdi').css('display', 'none');
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
}
//简历预览的跳转事件
var cvsId = 0;
//简历预览的跳转事件
$("#stuResumePreBtn").click(function(){
	stuId=personalBaseInfo.stuId;
	createEntercvDivMorePreview();
	$("#stuResumePreview").css('display','block');
	$("#stuResumePreview").siblings().css('display','none');
})
//简历预览的返回事件
function exit_entercvs(){
	getBasicInfo();
	$(".left_nav").css('display','block');
	$("#stuAccount").css('display','block');
	$(".info_block").css('display','block');
	$("#stuResumePreview").css('display','none');
}
