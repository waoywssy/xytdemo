var EnterInfo = {}
var enterUserInfo={
		"enterId":1,
		"enterOpenid":"",
		"enterName":"",
		"enterType":"",
		"enterEnterInfoId":"",
		"enterGender":"",
		"enterPosition":"",
		"enterDate":"",
}
new YMDselect('enterHoldYear','enterHoldMonth','enterHoldDay');
window.onload = onloadgetEnterInfo();
//点击进入职位页面的自加载方法
function onloadgetEnterInfo(){
	var guid="37g337Q99hAP0KShTqhhn9ZI11lLpONT";
	var urlHref=window.location.href;
	urlHref=urlHref.split("#")[0];   	
	urlHref=urlHref+"#"+guid
	location.href=urlHref;
	getEnterInfo();
}
$('#cliToPreiEnterInfo').click( function(){
	getEnterInfo();
});
//获得企业基本信息
function getEnterInfo(){
	var stuWeOpenid="swa";
	var urlHref=window.location.href;
	var guid=urlHref.split("#")[1];
	$.ajax({
        type:'post',
        url:homeUrl+'JobFairView/getEnterInfo',
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
            	 EnterInfo = date.data;
                //获取名称
                 $("#enterInfoNamePrei").html(EnterInfo.enterInfoName);
                 //获取公司性质
                 if(EnterInfo.enterInfoCmptyId!=undefined){
                	 $("#enterInfoCmptyIdPeri").html(cmptyp_a[EnterInfo.enterInfoCmptyId]);
                 }
                 //规模
                 if(EnterInfo.enterInfoScaleId!=undefined){
                	 $("#enterInfoScaleIdPrei").html(EnterInfo.enterInfoScaleId+"人以上");
                 }
                 //行业1
                 if(EnterInfo.enterInfoIndId1!=undefined){
                	 var enterIndIdfirst=parseInt((EnterInfo.enterInfoIndId1+"").substring(0,4)+"000000000");
                     var enterIndIdfirstpreview=industry[1000000000000][enterIndIdfirst];
                     var enterIndIdSecondpreview=industry[enterIndIdfirst][EnterInfo.enterInfoIndId1];
                     var enterIndIdpreview=enterIndIdfirstpreview+"--/"+enterIndIdSecondpreview;
                	 $("#enterInfoIndId1Peri").html(enterIndIdpreview);
                 }
                 //行业2
                 if(EnterInfo.enterInfoIndId2!=undefined&&EnterInfo.enterInfoIndId2!=""&&EnterInfo.enterInfoIndId2!=0){
                	 $("#enterInfoIndId2LI").css("display","block");
                	 var enterIndIdfirst=parseInt((EnterInfo.enterInfoIndId2+"").substring(0,4)+"000000000");
                     var enterIndIdfirstpreview=industry[1000000000000][enterIndIdfirst];
                     var enterIndIdSecondpreview=industry[enterIndIdfirst][EnterInfo.enterInfoIndId2];
                     var enterIndIdpreview=enterIndIdfirstpreview+"--/"+enterIndIdSecondpreview;
                	 $("#enterInfoIndId2Peri").html(enterIndIdpreview);
                 }else{
                	 $("#enterInfoIndId2LI").css("display","none");
                 }
                 //行业3
                 if(EnterInfo.enterInfoIndId3!=undefined&&EnterInfo.enterInfoIndId3!=""&&EnterInfo.enterInfoIndId3!=0){
                	 $("#enterInfoIndId3LI").css("display","block");
                	 var enterIndIdfirst=parseInt((EnterInfo.enterInfoIndId3+"").substring(0,4)+"000000000");
                     var enterIndIdfirstpreview=industry[1000000000000][enterIndIdfirst];
                     var enterIndIdSecondpreview=industry[enterIndIdfirst][EnterInfo.enterInfoIndId3];
                     var enterIndIdpreview=enterIndIdfirstpreview+"--/"+enterIndIdSecondpreview;
                	 $("#enterInfoIndId3Peri").html(enterIndIdpreview);
                 }else{
                	 $("#enterInfoIndId3LI").css("display","none");
                 }
               //网址
                 if(EnterInfo.enterInfoWebAddress!=undefined){
                	 $("#enterInfoWebAddressPrei").html(EnterInfo.enterInfoWebAddress);
                 }
               //地域
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
                	 $("#enterInfoLctIdPrei").html(enterLoc);
                 }
                 //企业邮箱
                 if(EnterInfo.enterinfoEmail!=undefined){
                	 $("#enterinfoEmailPeri").html(EnterInfo.enterinfoEmail);
                 }
               //详细地址
                 if(EnterInfo.enterinfoAdress!=undefined){
                	 $("#enterinfoAdressPeri").html(EnterInfo.enterinfoAdress);
                 }
               //联系电话
                 if(EnterInfo.enterinfoPhone!=undefined){
                	 $("#enterinfoPhonePeri").html(EnterInfo.enterinfoPhone);
                 }
               //qq
                 if(EnterInfo.enterinfoQq!=undefined){
                	 $("#enterinfoQqPeri").html(EnterInfo.enterinfoQq);
                 }
                 if(EnterInfo.enterInfoHousingfund){
                 	// 公积金
                     $("#enterHousingfundli").css("display","inline-block");
                 }
                 if(EnterInfo.enterInfoInsurance){
                 	// 五险
                     $("#enterInsuranceli").css("display","inline-block");
                 }
                 if(EnterInfo.enterInfoWeekend){
                 	// 双休
                     $("#enterWeekendli").css("display","inline-block");
                 }
                 if(EnterInfo.enterInfoVacation){
                 	// 年假
                     $("#enterVacationli").css("display","inline-block");
                 }
                 if(EnterInfo.enterInfoMeal){
                 	// 包吃
                     $("#enterMealli").css("display","inline-block");
                 }
                 if(EnterInfo.enterInfoAccommodation){
                 	// 包住
                     $("#enterAccommodationli").css("display","inline-block");
                 }
               //自定义福利
         	    $(".self_welfare_pre_box").empty();
         	    if(EnterInfo.enterInfoOtherBenefits!=undefined&&EnterInfo.enterInfoOtherBenefits!=""){
         	    	var s=EnterInfo.enterInfoOtherBenefits.split("@#");
         	    	for(var i=1;i<s.length;i++){
         	    		if(s[i]!=""||s[i]!=null){
         	    			$(".self_welfare_pre_box").append(
         	    				" <p class='self_welfare_pre'>"+s[i]+"</p>"
							);
         		    	}
         	    	}
         	    }
                //企业福利
//                 if(EnterInfo.enterinfoQq!=undefined){
//                	 $("#enterBenefitsPeri").html(EnterInfo.enterinfoQq);
//                 }
                //微信公众号
                 if(EnterInfo.enterInfoWeChatPublic!=undefined){
                	 $("#enterInfoWeChatPublicPeri").html(EnterInfo.enterInfoWeChatPublic);
                 }
                //简介
                 if(EnterInfo.enterInfoOverview!=undefined){
                	 $("#enterInfoOverviewPeri").html(EnterInfo.enterInfoOverview);
                 }
                //社会统一代码
                 if(EnterInfo.enterInfoIeepa!=undefined){
                	 $("#enterInfoIeepaPeri").html(EnterInfo.enterInfoIeepa);
                 }
                //注册地
                 if(EnterInfo.enterInfoRegisterLctId!=undefined){
                  	  var province100=parseInt((EnterInfo.enterInfoRegisterLctId+"").substring(0,3)+"0000000000000");
                  	  var enterLoc=ChineseDistricts[1000000000000000][province100];
                      enterLoc+="-"+ChineseDistricts[province100][EnterInfo.enterInfoRegisterLctId];
                 	 $("#enterInfoRegisterLctIdPeri").html(enterLoc);
                 }
                //成立时间
                 if(EnterInfo.enterInfoHolddate!=undefined){
                	 var enterPostDate=EnterInfo.enterInfoHolddate.split(",");
                 	 var enterPostDateyear=enterPostDate[1].trim();
                     var enterPostDatemonth=trueMonth(enterPostDate[0].split(" ")[0]);
                     var enterPostDateday=enterPostDate[0].split(" ")[1];
	                 $("#enterInfoHolddatePeri").html(enterPostDateyear+" 年 "+enterPostDatemonth+" 月 "+enterPostDateday+" 日");
                 }
                 //注册资金
                 if(EnterInfo.enterInfoCapitals!=undefined){
                	 $("#enterInfoCapitalsPeri").html(EnterInfo.enterInfoCapitals+"万人民币");
                 }
                 //微博
                 if(EnterInfo.enterInfoMicroblog!=undefined){
                	 $("#enterInfoMicroblogPeri").html(EnterInfo.enterInfoMicroblog);
                 }
                if(EnterInfo.enterInfoCheckStatus==1){
                	 $("#enterInfoCheckStatusPeri").html("是");
                }else if(EnterInfo.stuGender==0){
                	 $("#enterInfoCheckStatusPeri").html("否");
                }else{
                	 $("#enterInfoCheckStatusPeri").html("审核中");
                }
            }
            },
        error:function () {
            alert("连接服务器失败！");
        }
        })
}
//基本信息之点击编辑
$('#cliToEdiEnterInfo').click( function(){
	    //名称
	    $("#enterInfoNamespan").html(EnterInfo.enterInfoName);
	    //公司性质
	    if(EnterInfo.enterInfoCmptyId!=undefined){
	    	entercmptyp_getoption();
		    $("#enterInfoCmptyIdEdi").val(EnterInfo.enterInfoCmptyId);
	    }
	    //行业1
	    if(EnterInfo.enterInfoIndId1!=undefined){
	    	enterIndustry1(1000000000000);
	        var enterIndIdfirst=parseInt((EnterInfo.enterInfoIndId1+"").substring(0,4)+"000000000");
	        $("#enterInfoIndId11").val(enterIndIdfirst);
	        $("#enterInfoIndId11").change();
	        $("#enterInfoIndId12").val(EnterInfo.enterInfoIndId1);
	        $("#enterInfoIndId12").change();
	    }
	  //行业2
	    if(EnterInfo.enterInfoIndId2!=undefined&&EnterInfo.enterInfoIndId2!=""&&EnterInfo.enterInfoIndId2!=0){
	    	$("#enterInfoIndId2Edi").css("display","block");
	    	enterIndustry3(1000000000000);
	        var enterIndIdfirst=parseInt((EnterInfo.enterInfoIndId2+"").substring(0,4)+"000000000");
	        $("#enterInfoIndId21").val(enterIndIdfirst);
	        $("#enterInfoIndId21").change();
	        $("#enterInfoIndId22").val(EnterInfo.enterInfoIndId2);
	        $("#enterInfoIndId22").change();
	    }else{
	    	$("#enterInfoIndId2Edi").css("display","none");
	    }
	  //行业3
	    if(EnterInfo.enterInfoIndId3!=undefined&&EnterInfo.enterInfoIndId3!=""&&EnterInfo.enterInfoIndId3!=0){
	    	$("#enterInfoIndId3Edi").css("display","block");
	    	enterIndustry5(1000000000000);
	        var enterIndIdfirst=parseInt((EnterInfo.enterInfoIndId3+"").substring(0,4)+"000000000");
	        $("#enterInfoIndId31").val(enterIndIdfirst);
	        $("#enterInfoIndId31").change();
	        $("#enterInfoIndId32").val(EnterInfo.enterInfoIndId3);
	        $("#enterInfoIndId32").change();
	    }else{
	    	$("#enterInfoIndId3Edi").css("display","none");
	    }
	  //规模
	    if(EnterInfo.enterInfoScaleId!=undefined){
	        $("#enterInfoScaleIdEdi").val(EnterInfo.enterInfoScaleId);
	    }
	  //网址
	    if(EnterInfo.enterInfoWebAddress!=undefined){
	        $("#enterInfoWebAddressEdi").val(EnterInfo.enterInfoWebAddress);
	    }
	  //详细地址
	    if(EnterInfo.enterinfoAdress!=undefined){
	        $("#enterinfoAdressEdi").val(EnterInfo.enterinfoAdress);
	    }
	  //地址
	    if(EnterInfo.enterInfoLctId!=undefined){
	    	var province100=parseInt((EnterInfo.enterInfoLctId+"").substring(0,3)+"0000000000000");
	    	  $("#enterLctIdprovince").val(ChineseDistricts[1000000000000000][province100]);
	    	  $("#enterLctIdprovince").change();
	        var city10 = (EnterInfo.enterInfoLctId+"").substring(3,5);
	        var district10=(EnterInfo.enterInfoLctId+"").substring(5,7);
	        if(city10!="00"){
	       	   var city10=parseInt((EnterInfo.enterInfoLctId+"").substring(0,5)+"00000000000");
	       	   $("#enterLctIdcity").val(ChineseDistricts[province100][city10]);
	       	   $("#enterLctIdcity").change();
	        }
	        if(district10!="00"){
	          $("#enterLctIddistrict").val(ChineseDistricts[city10][EnterInfo.enterInfoLctId]);
	          $("#enterLctIddistrict").change();
	        }
	    }
	    //电话
	    if(EnterInfo.enterinfoPhone!=undefined){
	        $("#enterinfoPhoneEdi").val(EnterInfo.enterinfoPhone);
	    }
	   //qq
	    if(EnterInfo.enterinfoQq!=undefined){
	        $("#enterinfoQqEdi").val(EnterInfo.enterinfoQq);
	    }
	    //邮箱
	    if(EnterInfo.enterinfoEmail!=undefined){
	        $("#enterinfoEmailEdi").val(EnterInfo.enterinfoEmail);
	    }
	    //微博
	    if(EnterInfo.enterInfoMicroblog!=undefined){
	        $("#enterInfoMicroblogEdi").val(EnterInfo.enterInfoMicroblog);
	    }
	    //福利
	    if(EnterInfo.enterInfoHousingfund){
	    	$("#enterInfoHousingfundEdi").attr("checked",true);
	    }
	    if(EnterInfo.enterInfoInsurance){
	    	$("#enterInfoInsuranceEdi").attr("checked",true);
	    }
	    if(EnterInfo.enterInfoWeekend){
	    	$("#enterInfoWeekendEdi").attr("checked",true);
	    }
	    if(EnterInfo.enterInfoVacation){
	    	$("#enterInfoVacationEdi").attr("checked",true);
	    }
	    if(EnterInfo.enterInfoMeal){
	    	$("#enterInfoMealEdi").attr("checked",true);
	    }
	    if(EnterInfo.enterInfoAccommodation){
	    	$("#enterInfoAccommodationEdi").attr("checked",true);
	    }
	    //自定义福利
    	$(".self_welfare_box .self_welfare_box_first_div").empty();
	    if(EnterInfo.enterInfoOtherBenefits!=undefined){
	    	var s=EnterInfo.enterInfoOtherBenefits.split("@#");
	    	for(var i=1;i<s.length;i++){
	    		if(s[i]!=""||s[i]!=null){
                    $(".self_welfare_box .self_welfare_box_first_div").append(
                        "<div class='self_warefare_mengban_boxs'>"+
                        "<p>"+s[i]+"</p>"+
                        "<div class='self_warefare_mengban' style='display: none;'>"+
                        "<span class='sel_welfare_delete'>删除</span>"+
                        "<span class='sel_welfare_modify'>修改</span>"+
                        "<span class='sel_welfare_modify_quxiao'>取消</span>"+
                        "<span class='sel_welfare_save'>保存</span>"+
                        "<div class='div_moni_textarea' contenteditable='true'></div>"+
                        "</div>"+
                        "</div>"
                    );
		    	}
	    	}
	    }
	    selfWelfareModify();
	    //微信公众号
	    if(EnterInfo.enterInfoWeChatPublic!=undefined){
	        $("#enterInfoWeChatPublicEdi").val(EnterInfo.enterInfoWeChatPublic);
	    }
	    //社会统一代码
	    if(EnterInfo.enterInfoIeepa!=undefined){
	        $("#enterInfoIeepaEdi").val(EnterInfo.enterInfoIeepa);
	    }
	   //注册地
	    if(EnterInfo.enterInfoRegisterLctId!=undefined){
	    	var province100=parseInt((EnterInfo.enterInfoRegisterLctId+"").substring(0,3)+"0000000000000");
	    	$("#enterRegisterLctprovince").val(ChineseDistricts[1000000000000000][province100]);
	    	$("#enterRegisterLctprovince").change();
	       	$("#enterRegisterLctcity").val(ChineseDistricts[province100][EnterInfo.enterInfoRegisterLctId]);
	       	$("#enterRegisterLctcity").change();
	    }
	    //成立时间
	    if(EnterInfo.enterInfoHolddate!=undefined){
	    	var enterHoldDate=EnterInfo.enterInfoHolddate.split(",");
			var enterHoldDateyear=enterHoldDate[1].trim();
		    var enterHoldDatemonth=trueMonth(enterHoldDate[0].split(" ")[0]);
		    var enterHoldDateday=enterHoldDate[0].split(" ")[1];
		    $("#enterHoldYearEdi option[value='"+enterHoldDateyear+"']").attr("selected","selected");//根据值让option选中 
		    $("#enterHoldYearEdi").change();
		    $("#enterHoldMonthEdi option[value='"+enterHoldDatemonth+"']").attr("selected","selected");//根据值让option选中 
		    $("#enterHoldMonthEdi").change();
		    $("#enterHoldDayEdi option[value='"+enterHoldDateday+"']").attr("selected","selected");//根据值让option选中 
		    $("#enterHoldDayEdi").change();
	    }
	    //注册资金
	    if(EnterInfo.enterInfoCapitals!=undefined){
	        $("#enterInfoCapitalsEdi").val(EnterInfo.enterInfoCapitals);
	    }
	   //注册资金
	    if(EnterInfo.enterInfoOverview!=undefined){
	        $("#enterInfoOverviewEdi").val(EnterInfo.enterInfoOverview);
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
//添加自定义福利
function addenterInfoBenefits(){
	var enterInfoOtherBenefitsEdi=$("#enterInfoOtherBenefitsEdi").val();
	if(enterInfoOtherBenefitsEdi==""||enterInfoOtherBenefitsEdi==null){
		alert("请输入您要定义的企业福利");
		return 0;
	}else{
		// $(".self_welfare_box").append("<label for=''><input type='checkbox' name='enterOtherBenefits' checked value='"+enterInfoOtherBenefitsEdi+"'>"+enterInfoOtherBenefitsEdi+"</label>");
        $(".self_welfare_box .self_welfare_box_first_div").append(
        	"<div class='self_warefare_mengban_boxs'>"+
        	"<p>"+enterInfoOtherBenefitsEdi+"</p>"+
			"<div class='self_warefare_mengban' style='display: none;'>"+
            "<span class='sel_welfare_delete'>删除</span>"+
            "<span class='sel_welfare_modify'>修改</span>"+
            "<span class='sel_welfare_modify_quxiao'>取消</span>"+
            "<span class='sel_welfare_save'>保存</span>"+
            "<div class='div_moni_textarea' contenteditable='true'></div>"+
            "</div>"+
            "</div>"
		);
        selfWelfareModify();
	}
	$("#enterInfoOtherBenefitsEdi").val('');
}

//请公司性质不能为空验证
$('#enterInfoCmptyIdEdi').change(function(){
	if($('#enterInfoCmptyIdEdi').val()>0){
		$("#enterInfoCmptyIdEdiwarn").css("display","none");
	}else{
		$("#enterInfoCmptyIdEdiwarn").css("display","block");
	}
});
//规模
$("#enterInfoScaleIdEdi").bind('input propertychange',function(){
		if($("#enterInfoScaleIdEdi").val()*1>0){
			$("#enterInfoScaleIdEdiwarn").css("display","none");
		}else{
			$("#enterInfoScaleIdEdiwarn").css("display","block");
		}
});
//行业
$('#enterInfoIndId12').change(function(){
	if($('#enterInfoIndId12').val()>0){
		$("#enterInfoIndId12warn").css("display","none");
	}else{
		$("#enterInfoIndId12warn").css("display","block");
	}
});
//企业所在地址
$('#enterLctIdEdi').change(function(){
	var enterLctIddistrict=$("#enterLctIddistrict").find("option:selected").attr("data-code");
	if(enterLctIddistrict*1==0||enterLctIddistrict==""){
		$("#enterLctIdwarn").css("display","block");
	}else{
		$("#enterLctIdwarn").css("display","none");
	}
});
//企业详细地址
$("#enterinfoAdressEdi").bind('input propertychange',function(){
	var enterinfoAdressEdi=$("#enterinfoAdressEdi").val();
		if(enterinfoAdressEdi==""||enterinfoAdressEdi==null){
			$("#enterinfoAdressEdiwarn").css("display","block");
		}else{
			$("#enterinfoAdressEdiwarn").css("display","none");
		}
});
//社会统一代码
$("#enterInfoIeepaEdi").bind('input propertychange',function(){
	var enterInfoIeepaEdi=$("#enterInfoIeepaEdi").val();
		if(enterInfoIeepaEdi==""||enterInfoIeepaEdi==null){
			$("#enterInfoIeepaEdiwarn").css("display","block");
		}else{
			$("#enterInfoIeepaEdiwarn").css("display","none");
		}
});
//注册地
$('#enterRegisterLctEdi').change(function(){
	var enterRegisterLctcity=$("#enterRegisterLctcity").find("option:selected").attr("data-code");
	if(enterRegisterLctcity*1==0||enterRegisterLctcity==""){
		$("#enterRegisterLctwarn").css("display","block");
	}else{
		$("#enterRegisterLctwarn").css("display","none");
	}
});
//注册日期判断
$('#enterHoldDate').change(function(){
	if($('#enterHoldMonthEdi').val()*1>0){
		$("#enterHoldDatewarn").css("display","none");
	}else{
		$("#enterHoldDatewarn").css("display","block");
	}
});
//注册资金
$("#enterInfoCapitalsEdi").bind('input propertychange',function(){
	if($('#enterInfoCapitalsEdi').val()*1>0){
		$("#enterInfoCapitalsEdiwarn").css("display","none");
	}else{
		$("#enterInfoCapitalsEdiwarn").css("display","block");
	}
});
//企业简介
$("#enterInfoOverviewEdi").bind('input propertychange',function(){
	var enterInfoOverviewEdi=$("#enterInfoOverviewEdi").val();
		if(enterInfoOverviewEdi==""||enterInfoOverviewEdi==null){
			$("#enterInfoOverviewEdiwarn").css("display","block");
		}else{
			$("#enterInfoOverviewEdiwarn").css("display","none");
		}
});
//电子邮箱校验
function checkenterEmailEdi(){
	var flag=true;
	var stuEmailEdi=$("#enterinfoEmailEdi").val();
	var valid = +/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+\.){1,63}[a-zA-Z0-9]+$/.test(stuEmailEdi);
	if(valid){
	}else{
		return false;
	}
	return flag;
}
$("#enterinfoEmailEdi").bind('input propertychange',function(){
	    var stuEmailEdi=$("#enterinfoEmailEdi").val();
		if(stuEmailEdi==""||stuEmailEdi==null){
			$("#enterinfoEmailEdiwarn").css("display","none");
		}else{
			var valid = +/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+\.){1,63}[a-zA-Z0-9]+$/.test(stuEmailEdi);
			if(valid){
				$("#enterinfoEmailEdiwarn").css("display","none");
			}else{
				$("#enterinfoEmailEdiwarn").css("display","block");
			}
		}
	});
//统一信用代码
$("#enterInfoIeepaEdi").bind('input propertychange',function(){
    var enterInfoIeepaEdi=$("#enterInfoIeepaEdi").val();
    CheckSocialCreditCode(enterInfoIeepaEdi);
});
//统一信用代码
function CheckSocialCreditCode(Code) { 
	 var flag=true;
     var patrn = /^[0-9A-Z]+$/;
     //18位校验及大写校验
     if ((Code.length != 18) || (patrn.test(Code) == false)){ 
    	 $("#enterInfoIeepaEdiwarn").css("display","block");
         flag=false;
         return flag;
     }else{ 
      var Ancode;//统一社会信用代码的每一个值
      var Ancodevalue;//统一社会信用代码每一个值的权重 
      var total = 0; 
      var weightedfactors = [1, 3, 9, 27, 19, 26, 16, 17, 20, 29, 25, 13, 8, 24, 10, 30, 28];//加权因子 
      var str = '0123456789ABCDEFGHJKLMNPQRTUWXY';
     //不用I、O、S、V、Z 
     for (var i = 0; i < Code.length - 1; i++){
      Ancode = Code.substring(i, i + 1); 
      Ancodevalue = str.indexOf(Ancode); 
      total = total + Ancodevalue * weightedfactors[i];
      //权重与加权因子相乘之和 
      }
      var logiccheckcode = 31 - total % 31;
      if (logiccheckcode == 31){
         logiccheckcode = 0;
      }
      var Str = "0,1,2,3,4,5,6,7,8,9,A,B,C,D,E,F,G,H,J,K,L,M,N,P,Q,R,T,U,W,X,Y";
      var Array_Str = Str.split(',');
       logiccheckcode = Array_Str[logiccheckcode];
       var checkcode = Code.substring(17, 18);
      if (logiccheckcode != checkcode){ 
          alert("不是有效的统一社会信用编码！");
          $("#enterInfoIeepaEdiwarn").css("display","block");
          return flag;
       }
    } 
     $("#enterInfoIeepaEdiwarn").css("display","none");
     return flag;
  }
//修改基本信息
function updateEnterInfo(){
	    if(!$('#enterInfoCmptyIdEdi').val()>0){//公司性质不能为空
		    $("#enterInfoCmptyIdEdiwarn").css("display","block");
	    }else if(!$('#enterInfoScaleIdEdi').val()*1>0){//规模
			$("#enterInfoScaleIdEdiwarn").css("display","block");
		}else if($('#enterInfoIndId12').val()==null||$('#enterInfoIndId12').val()==""||$('#enterInfoIndId12').val()==0){//第一行业
			$("#enterInfoIndId12warn").css("display","block");
		}else if(!$("#enterLctIddistrict").find("option:selected").attr("data-code")*1>0){//企业所在地址
			$("#enterLctIdwarn").css("display","block");
		}else if($('#enterinfoAdressEdi').val()==""){
			$("#enterinfoAdressEdiwarn").css("display","block");//企业详细地址
		}else if($$('#enterinfoPhoneEdi').val()==""&&checkphone(phone)){
			$("#enterinfoPhoneEdiwarn").css("display","block");//电话信息
		}else if($("#enterinfoEmailEdi").val()!=""&&!checkenterEmailEdi()){
			$("#enterinfoEmailEdiwarn").css("display","block");
			//电子邮箱格式判断
		}else if(!CheckSocialCreditCode($('#enterInfoIeepaEdi').val())){//社会统一代码
			$("#enterInfoIeepaEdiwarn").css("display","block");
		}else if(!$("#enterRegisterLctcity").find("option:selected").attr("data-code")*1>0){//注册地
			$("#enterRegisterLctwarn").css("display","block");
		}else if(!$('#enterHoldMonthEdi').val()*1>0){//注册日期判断
			$("#enterHoldDatewarn").css("display","block");
		}else if(!$('#enterInfoCapitalsEdi').val()*1>0){//注册资金
			$("#enterInfoCapitalsEdiwarn").css("display","block");
		}else if($("#enterInfoOverviewEdi").val()==""){
			//企业简介
			$("#enterInfoOverviewEdiwarn").css("display","block");
		}else{
			//名称
//		    $("#enterInfoNamespan").val(EnterInfo.enterInfoName);
		    //公司性质
        EnterInfo.enterInfoCmptyIdEdi=$("#enterInfoCmptyIdEdi").val();
	    //行业1
        EnterInfo.enterInfoIndId1=$("#enterInfoIndId12").val();
	    //行业2
        EnterInfo.enterInfoIndId2=$("#enterInfoIndId22").val();
	    //行业3
        EnterInfo.enterInfoIndId3=$("#enterInfoIndId32").val();
	    //网址
        EnterInfo.enterInfoWebAddress=$("#enterInfoWebAddressEdi").val();
	    //详细地址
	    EnterInfo.enterinfoAdress=$("#enterinfoAdressEdi").val();
	    //规模
	    EnterInfo.enterInfoScaleId=$("#enterInfoScaleIdEdi").val();
	    //地址
	    EnterInfo.enterInfoLctId = $("#enterLctIddistrict").find("option:selected").attr("data-code");
	    //电话
	    EnterInfo.enterinfoPhone=$("#enterinfoPhoneEdi").val();
	   //qq
	    EnterInfo.enterinfoQq=$("#enterinfoQqEdi").val();
	    //邮箱
	    EnterInfo.enterinfoEmail=$("#enterinfoEmailEdi").val();
	    //微博
	    EnterInfo.enterInfoMicroblog=$("#enterInfoMicroblogEdi").val();
	    //福利
	    //五险
	    if($("#enterInfoHousingfundEdi").is(':checked')){
	    	EnterInfo.enterInfoHousingfund=1;
	    }else{
	    	EnterInfo.enterInfoHousingfund=0;
	    }
	    //公积金
	    if($("#enterInfoInsuranceEdi").is(':checked')){
	    	EnterInfo.enterInfoInsurance=1;
	    }else{
	    	EnterInfo.enterInfoInsurance=0;
	    }
	    //双休
	    if($("#enterInfoWeekendEdi").is(':checked')){
	    	EnterInfo.enterInfoWeekend=1;
	    }else{
	    	EnterInfo.enterInfoWeekend=0;
	    }
	    //年假
	    if($("#enterInfoVacationEdi").is(':checked')){
	    	EnterInfo.enterInfoVacation=1;
	    }else{
	    	EnterInfo.enterInfoVacation=0;
	    }
	    //包吃
	    if($("#enterInfoMealEdi").is(':checked')){
	    	EnterInfo.enterInfoMeal=1;
	    }else{
	    	EnterInfo.enterInfoMeal=0;
	    }
	    //包住
	    if($("#enterInfoAccommodationEdi").is(':checked')){
	    	EnterInfo.enterInfoAccommodation=1;
	    }else{
	    	EnterInfo.enterInfoAccommodation=0;
	    }
	    //自定义福利
	    var OtherBenefitsArr= [];
            for(var e = 0;e<$(".self_warefare_mengban_boxs").length;e++){
                OtherBenefitsArr.push($($(".self_warefare_mengban_boxs")[e]).find("p").html());
			}

            EnterInfo.enterInfoOtherBenefits="";
	    for(var i=0;i<OtherBenefitsArr.length;i++){
	    		EnterInfo.enterInfoOtherBenefits+="@#"+OtherBenefitsArr[i];
	    }
		//微信公众号
	    EnterInfo.enterInfoWeChatPublic=$("#enterInfoWeChatPublicEdi").val();
	    //社会统一代码
	    EnterInfo.enterInfoIeepa=$("#enterInfoIeepaEdi").val();
	   //注册地
	    EnterInfo.enterInfoRegisterLctId =$("#enterRegisterLctcity").find("option:selected").attr("data-code")
	    //成立时间
	    var enterHoldDateyear=$('#enterHoldYearEdi').val();
		var enterHoldDatemonth=$('#enterHoldMonthEdi').val();
		var enterHoldDateday=$('#enterHoldDayEdi').val();
		EnterInfo.enterInfoHolddate=enterHoldDateyear+"/"+enterHoldDatemonth+"/"+enterHoldDateday;
	    //注册资金
	    EnterInfo.enterInfoCapitals=$("#enterInfoCapitalsEdi").val();
	    //注册资金
	    EnterInfo.enterInfoOverview=$("#enterInfoOverviewEdi").val();
	    var urlHref=window.location.href;
		var guid=urlHref.split("#")[1];
		$.ajax({
			url:homeUrl+'JobFairView/updateEnterInfo?guid='+guid+"&enterId="+enterUserInfo.enterId,
			async:false, //改成同步
			data:EnterInfo,
			type:'post',
			success:function(date){
				var jsonMap=JSON.parse(date);
				if(jsonMap.code==200){
					alert("修改成功");
					getEnterInfo();
					$("#EnterInfoPrei").addClass("in active");
					$("#EnterInfoEdi").removeClass("in active");
					$("#cliToPreiEnterInfo").addClass("active");
					$("#cliToEdiEnterInfo").removeClass("active");
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
/**
 * 自定义福利的修改、删除等事件
 */
function selfWelfareModify() {
    //自定义福利部分鼠标划入弹出蒙版
    var self_warefare_mengban_boxs = $(".self_warefare_mengban_boxs");
    self_warefare_mengban_boxs.bind("mouseover",function () {
        $(this).find(".self_warefare_mengban").stop().fadeIn();
    });
    self_warefare_mengban_boxs.bind("mouseleave",function () {
        $(this).find(".self_warefare_mengban").stop().fadeOut();
    });
//自定义福利的删除事件
    var sel_welfare_delete = $(".sel_welfare_delete");
    sel_welfare_delete.bind("click",function () {
        if(confirm("是否要删除此条自定义福利？")){
            $(this).parents(".self_warefare_mengban_boxs").remove();
        }
    });
//自定义福利的修改事件
    var self_welfare_big_mengban = $(".self_welfare_big_mengban");
    var sel_welfare_modify = $(".sel_welfare_modify");
    sel_welfare_modify.bind("click",function () {
        var div_moni_textarea = $(this).parent().find(".div_moni_textarea");
        div_moni_textarea.css("display","block");
        div_moni_textarea.html(div_moni_textarea.parents(".self_warefare_mengban_boxs").find("p").text());
        $(this).parent().find(".sel_welfare_save").css("display","inline-block");
        $(this).parent().find(".sel_welfare_modify_quxiao").css("display","inline-block");
        $(this).parent().find(".sel_welfare_delete").css("display","none");
        $(this).css("display","none");
        //取消小蒙版的外边框
        $(this).parent().css("border","none");
        //显示蒙版，使其他控件不可编辑
        self_welfare_big_mengban.css("display","block");
        //使蒙版高度等于文档高度
        self_welfare_big_mengban.height($(document).height());
        //移除小蒙版的mouseleave事件，这是使修改中的自定义福利框不消失的核心代码
        $(this).parents(".self_warefare_mengban_boxs").unbind("mouseleave");
    });
//自定福利修改后的保存事件
    var sel_welfare_save = $(".sel_welfare_save");
    sel_welfare_save.bind("click",function () {
        // 大蒙版隐藏
        self_welfare_big_mengban.css("display","none");
        //修改后的数据转移
        $(this).parents(".self_warefare_mengban_boxs").find("p").html($(this).parent().find(".div_moni_textarea").html());
        //模拟div隐藏
        $(this).parent().find(".div_moni_textarea").css("display","none");
        //按钮切换显示
        $(this).parent().find(".sel_welfare_modify").css("display","inline-block");
        $(this).parent().find(".sel_welfare_delete").css("display","inline-block");
        $(this).parent().find(".sel_welfare_modify_quxiao").css("display","none");
        $(this).css("display","none");
        //恢复小蒙版的外边框
        $(this).parent().css({
            "border-style":"solid",
            "border-color":"#0780d3",
            "border-width":"1px"
        });
        //重新绑定小蒙版的mouseleave事件
        $(this).parents(".self_warefare_mengban_boxs").bind("mouseleave",function () {
            $(this).find(".self_warefare_mengban").stop().fadeOut();
        });
    });
//自定义福利的取消事件
    var sel_welfare_modify_quxiao = $(".sel_welfare_modify_quxiao");
    sel_welfare_modify_quxiao.bind("click",function () {
        // 大蒙版隐藏
        self_welfare_big_mengban.css("display","none");
        //模拟div隐藏
        $(this).parent().find(".div_moni_textarea").css("display","none");
        //按钮切换显示
        $(this).parent().find(".sel_welfare_modify").css("display","inline-block");
        $(this).parent().find(".sel_welfare_delete").css("display","inline-block");
        $(this).parent().find(".sel_welfare_save").css("display","none");
        $(this).css("display","none");
        //恢复小蒙版的外边框
        $(this).parent().css({
            "border-style":"solid",
            "border-color":"#0780d3",
            "border-width":"1px"
        });
        //重新绑定小蒙版的mouseleave事件
        $(this).parents(".self_warefare_mengban_boxs").bind("mouseleave",function () {
            $(this).find(".self_warefare_mengban").stop().fadeOut();
        });
    });
}
