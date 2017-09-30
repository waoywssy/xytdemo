var TeacherTeach={
		"teachId":"",
		"teachName":"",
		"teachGender":"",
		"teachPosition":"",
		"teachUserName":"",
		"teachPassword":"",
		"teachEmail":"",
		"teachPhone":"",
		"teachQq":"",
		"teachWeChat":"",
		"teachMobilePhone":""
}
var teachId=1;
var guid="37g337Q99hAP0KShTqhhn9ZI11lLpONT";
window.onload = onloadtoshowteachInfoManger();
//点击跳转老师信息管理页面  自加载方法  需要传参数
function onloadtoshowteachInfoManger(){
	$("#toTeachInfo").addClass("active");
	$("#teacherInfo").css("display","block");
	$("#teacherInfoMod").css("display","none");
	$("#teachModPw").css("display","none");
	getTeachInfo();
}
//点击跳转基本信息
$('#toTeachInfo').click( function(e){
	$(this).addClass("active");
	$("#toTeachMod").removeClass("active");
	$("#toTeachPw").removeClass("active");
	$("#teacherInfo").css("display","block");
//	$("#stuAccount").css("display","none");
	$("#teacherInfoMod").css("display","none");
	$("#teachModPw").css("display","none");
	getTeachInfo();
	e.preventDefault();
});
//点击跳转进入信息修改
$('#toTeachMod').click( function(e){
	$(this).addClass("active");
	$("#toTeachInfo").removeClass("active");
	$("#toTeachPw").removeClass("active");
	$("#teacherInfoMod").css("display","block");
	$("#teacherInfo").css("display","none");
//	$("#stuAccount").css("display","none");
	$("#teachModPw").css("display","none");
	toTeachInfoEdi();
	e.preventDefault();
});
//点击跳转进入修改密码
$('#toTeachPw').click( function(e){
	$(this).addClass("active");
	$("#toTeachInfo").removeClass("active");
	$("#toTeachMod").removeClass("active");
	$("#teachModPw").css("display","block");
	$("#teacherInfoMod").css("display","none");
	$("#teacherInfo").css("display","none");
	$("#newPassword").val('');
	$("#againnewPassword").val('');
	$("#oldPassword").val('');
	e.preventDefault();
});

//点击获取老师自身信息
function getTeachInfo(){
	$.ajax({
		url:homeUrl+'teach/afterLogintojump',
		async:false, //改成同步
		data:{
		    "teachId":teachId,
		    "guid":guid,
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
				TeacherTeach=jsonMap.data;
				//姓名
				$("#teachNameprei").html(TeacherTeach.teachName);
				//性别
				if(TeacherTeach.teachGender){
					$("#teachGenderprei").html("男");
				}else if(!TeacherTeach.teachGender){
					$("#teachGenderprei").html("女");
				}else{
					$("#teachGenderprei").html("保密");
				}
				//职位
				$("#teachPositionprei").html(TeacherTeach.teachPosition);
				//手机
				$("#teachMobilePhoneprei").html(TeacherTeach.teachMobilePhone);
				//电话
				$("#teachPhoneprei").html(TeacherTeach.teachPhone);
				//邮箱
				$("#teachEmailprei").html(TeacherTeach.teachEmail);
				//微信
				$("#teachWeChatprei").html(TeacherTeach.teachWeChat);
				//QQ
				$("#teachQqprei").html(TeacherTeach.teachQq);
				
			}
		},
		error:function () {
            alert("访问服务器失败！");
        },
    })
}
//进入编辑基本信息
function toTeachInfoEdi(){
		//姓名
		$("#teachNameEdi").val(TeacherTeach.teachName);
		//判断男女//性别
	    if(TeacherTeach.teachGender){
	    	$("input[name='teachsex'][value="+1+"]").attr("checked",true);
	    }else if(TeacherTeach.teachGender==false){
	    	$("input[name='teachsex'][value="+0+"]").attr("checked",true);
	    }else{
	    	$("input[name='teachsex'][value="+null+"]").attr("checked",true);
	    }
		//职位
		$("#teachPositionEdi").val(TeacherTeach.teachPosition);
		//手机
		$("#teachMobilePhoneEdi").val(TeacherTeach.teachMobilePhone);
		//电话
		$("#teachPhoneEdi").val(TeacherTeach.teachPhone);
		//邮箱
		$("#teachEmailEdi").val(TeacherTeach.teachEmail);
		//微信
		$("#teachWeChatEdi").val(TeacherTeach.teachWeChat);
		//QQ
		$("#teachQqEdi").val(TeacherTeach.teachQq);
}
//修改信息
function updateteachInfo(){
	//姓名
	TeacherTeach.teachName=$("#teachNameEdi").val();
	//判断男女//性别
	TeacherTeach.teachGender=$("input[name='teachsex']:checked").val();
	//职位
    TeacherTeach.teachPosition=$("#teachPositionEdi").val();
	//手机
    TeacherTeach.teachMobilePhone=$("#teachMobilePhoneEdi").val();
	//电话
    TeacherTeach.teachPhone=$("#teachPhoneEdi").val();
	//邮箱
    TeacherTeach.teachEmail=$("#teachEmailEdi").val();
	//微信
    TeacherTeach.teachWeChat=$("#teachWeChatEdi").val();
	//QQ
    TeacherTeach.teachQq=$("#teachQqEdi").val();
	$.ajax({
		url:homeUrl+'teach/updateteachInfo?guid='+guid,
		async:false, //改成同步
		data:TeacherTeach,
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
				$("#operalmessage").css("display","block");
			}
		},
		error:function () {
            alert("访问服务器失败！");
        },
    })
}

//取消修改信息
function canleteachInfo(){
	$("#toTeachInfo").addClass("active");
	$("#toTeachMod").removeClass("active");
	$("#toTeachPw").removeClass("active");
	$("#teacherInfo").css("display","block");
//	$("#stuAccount").css("display","none");
	$("#teacherInfoMod").css("display","none");
	$("#teachModPw").css("display","none");
}

//操作成功
function successfulOperation(){
	$("#toTeachInfo").addClass("active");
	$("#toTeachMod").removeClass("active");
	$("#toTeachPw").removeClass("active");
	$("#operalmessage").css("display","none");
	$("#teacherInfo").css("display","block");
//	$("#stuAccount").css("display","none");
	$("#teacherInfoMod").css("display","none");
	$("#teachModPw").css("display","none");
	getTeachInfo();
}

//失焦事件触发判断旧密码是否正确
$("#oldPassword").blur(function(){
	doesTeachPasswordExit();
});
//判断旧密码是否正确的方法
function doesTeachPasswordExit(){
	var teachPassword=$("#oldPassword").val();
	$.ajax({
		url:homeUrl+'teach/doesTeachPasswordExit',
		async:false, //改成同步
		data:{
		    "teachId":teachId,
		    "guid":guid,
		    "teachUserName":TeacherTeach.teachUserName,
		    "teachPassword":teachPassword,
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
            	$("#oldPasswordEdiwarn").css("display","none");
            	return false;
			}else{
				$("#oldPasswordEdiwarn").css("display","block");
				return true;
			}
		},
		error:function () {
            alert("访问服务器失败！");
        },
    })
}

//失焦事件触发判断两次的新密码是否相同
$("#againnewPassword").blur(function(){
	var newPassword=$("#newPassword").val().trim();
	var againnewPassword=$("#againnewPassword").val().trim();
	if(newPassword==againnewPassword){
		$("#againnewPasswordEdiwarn").css("display","none");
	}else{
		$("#againnewPasswordEdiwarn").css("display","block");
	}
});
//进行新密码修改最后程序
function updateteachpw(){
	var newPassword=$("#newPassword").val().trim();
	var againnewPassword=$("#againnewPassword").val().trim();
	if(doesTeachPasswordExit()){
		$("#oldPasswordEdiwarn").css("display","block");
	}else if(!newPassword == againnewPassword){
		$("#againnewPasswordEdiwarn").css("display","block");
	}else{
		$.ajax({
			url:homeUrl+'teach/updateteachpassword',
			async:false, //改成同步
			data:{
			    "teachId":teachId,
			    "guid":guid,
			    "teachUserName":TeacherTeach.teachUserName,
			    "teachPassword":newPassword,
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
	            	$("#operalmessage").css("display","block");
				}
			},
			error:function () {
	            alert("访问服务器失败！");
	        },
	    })
	}
}

//取消修改密码操作
function canleteachpw(){
	$("#toTeachInfo").addClass("active");
	$("#toTeachMod").removeClass("active");
	$("#toTeachPw").removeClass("active");
	$("#teacherInfo").css("display","block");
//	$("#stuAccount").css("display","none");
	$("#teacherInfoMod").css("display","none");
	$("#teachModPw").css("display","none");
}

