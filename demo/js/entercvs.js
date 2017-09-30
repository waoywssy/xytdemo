//////////面试进度的下拉框的弹出与隐藏，使用时请放在合适的位置
var enter_resume_jindu = $(".enter_resume_jindu");
var enter_resume_jindu_select = $(".enter_resume_jindu_select");
enter_resume_jindu.bind("click",function () {
	$(this).css("display","none");
	$(this).parents(".enter_resume_t6").find(".enter_resume_jindu_select").css("display","block");
});
enter_resume_jindu_select.each(function (index,element) {
	var counter = 0;
	$(enter_resume_jindu_select[index]).click(function () {
		counter++;
		if(counter % 2==0){
			$(this).css("display","none");
			$(this).parent().find(".enter_resume_jindu").css("display","block");
		}
	})
});
//简历主键id
var cvsId=0;

var dangqian = 1;
// 进度
var entercvsCvsProgress="";
// 职位名
var cvsJolisId = 0;
//用户ID
var enterId=1;
// 时间
var entercvsInterviewtime;
window.onload = onloadgetentercvs();
//点击进入职位页面的自加载方法
function onloadgetentercvs(){
	var guid="37g337Q99hAP0KShTqhhn9ZI11lLpONT";
	var urlHref=window.location.href;
	urlHref=urlHref.split("#")[0];   	
	urlHref=urlHref+"#"+guid
	location.href=urlHref;
	var cuurentPage=$(".enterCvspagination li.active a").text();
	var pagesize=5;
	var cvsProgress=entercvsCvsProgress;
	firstStart(cuurentPage,pagesize,cvsProgress);
}
/////////
function FormatDateA(strTime) {
	var date = new Date(strTime);
	//月的转换
	if(date.getMonth()+ 1<10){
		getMonth = "0"+date.getMonth();
	}else{
		getMonth = date.getMonth();
	}
	//日的转换
	if(date.getDate()<10){
		getDate = "0"+date.getDate();
	}else{
		getDate = date.getDate();
	}
	return date.getFullYear() + "-" + getMonth + "-"
			+ getDate();
}
function FormatDateB(strTime) {
	var date = new Date(strTime);
	//月的转换
	if(date.getMonth()+ 1<10){
		getMonth = "0"+date.getMonth();
	}else{
		getMonth = date.getMonth();
	}
	//日的转换
	if(date.getDate()<10){
		getDate = "0"+date.getDate();
	}else{
		getDate = date.getDate();
	}
	//时的转换
	if(date.getHours()<10){
		getHours = "0"+date.getHours();
	}else{
		getHours = date.getHours();
	}
	//分的转换
	if(date.getMinutes()<10){
		getMinutes = "0"+date.getMinutes();
	}else{
		getMinutes = date.getMinutes();
	}
	//秒的转换
	if(date.getSeconds()<10){
		getSeconds = "0"+date.getSeconds();
	}else{
		getSeconds = date.getSeconds();
	}
	
	return date.getFullYear() + "-" + getMonth + "-"
			+ getDate + " " + getHours + ":" + getMinutes
			+ ":" + getSeconds;
}
/**
 * 获取后台数据并渲染到页面 @ parm enterCvs 是从后台得到的data List
 */
function createEntercvsDiv(enterCvs,currentTime) {
	var stuGender="";
	// 转换性别
	if (enterCvs.stuGender%2==1) {
		stuGender = "男";
	} else if (enterCvs.stuGender%2==0) {
		stuGender = "女";
	}
	var currentTimes=currentTime.split("-");
	//获取年龄
	var stuDobYear=enterCvs.stuDob.substring(0,4);
	var stuDobMonth=enterCvs.stuDob.substring(4,6);
	var age=currentTimes[0]-stuDobYear;
	if(currentTimes[1]-stuDobMonth>0){
	}else{
		age=age-1;
	}
	// 转换简历进度
	var Progress = turncvsProgress(enterCvs.cvsProgress);
	if (enterCvs.cvsInterviewtime == null || enterCvs.cvsInterviewtime == ""
			|| enterCvs.cvsInterviewtime == 0) {
		var Interviewtime = "";
	} else {
		var Interviewtime = FormatDateB(enterCvs.cvsInterviewtime);
	}
      
	if(enterCvs.cvsProgress==1||enterCvs.cvsProgress==2||enterCvs.cvsProgress==3){
		$("#enter_resume_daiding ul.r_explain li.enter_resume_t6").css("display","block");
		$(".EntercvsView").append(
				"<ul class='el r_explain title'><li class='enter_resume_t1'><p>"
						+ FormatDateB(enterCvs.cvsApplyDate) + "</p></li>"
						+ "<li class='enter_resume_t2'><p>" + enterCvs.jolisName + "</p></li>"
						+ "<li class='enter_resume_t3'><a onclick='entercvsOnclick("+enterCvs.cvsStuId+","+enterCvs.cvsId+");'><p>" + enterCvs.stuName
						+ "</p></a></li><li class='enter_resume_t4'><p>" + stuGender
						+ "</p></li><li class='enter_resume_t5'><p>" + age + "</p></li>"
						+ "<li class='enter_resume_t6'><a class='enter_resume_jindu' onclick='function1(" + enterCvs.cvsId
						+ "," + enterCvs.cvsProgress + "," +JSON.stringify(Interviewtime) + ",this);'><p>" + Progress
						+ "</p></a><select name='' id='entercvsCvsProgress"+enterCvs.cvsId+"' class='enter_resume_jindu_select' style='display:none'></select></li><li class='enter_resume_t7'><p>" + Interviewtime
						+ "</p><input style='display:none' id='entercvsInterviewtime"+enterCvs.cvsId+"' placeholder='格式：1993-11-18 13:24:32'></input></li></ul>");
	}else{
		$("#enter_resume_daiding ul.r_explain li.enter_resume_t6").css("display","none");
		$(".EntercvsView").append(
				"<ul class='el r_explain title'><li class='enter_resume_t1'><p>"
						+ FormatDateB(enterCvs.cvsApplyDate) + "</p></li>"
						+ "<li class='enter_resume_t2'><p>" + enterCvs.jolisName + "</p></li>"
						+ "<li class='enter_resume_t3'><a onclick='entercvsOnclick("+enterCvs.cvsStuId+","+enterCvs.cvsId+");'><p>" + enterCvs.stuName
						+ "</p></a></li><li class='enter_resume_t4'><p>" + stuGender
						+ "</p></li><li class='enter_resume_t5'><p>" + age + "</p></li>"
						+ "<li class='enter_resume_t7'><p id='entercvsInterviewtime"+enterCvs.cvsId+"'>" + Interviewtime
						+ "</p></li></ul>");
	}
	
}

//导航nav-bar的“应聘简历”选项点击事件，筛选所有的东西（不加条件进行筛选）
function firstStart(cuurentPage,pagesize,cvsProgress){
	//信息的数量
	var cvsEnterInfoId = 1;
	var urlHref = window.location.href;
	var guid = urlHref.split("#")[1];
	$.ajax({
				url : homeUrl + 'cvs/getEntercvs',
				async : false,
				data : {
					"cvsEnterInfoId" : cvsEnterInfoId,
					"cvsProgress" : cvsProgress,
					"cvsJolisId" : cvsJolisId,
					"cuurentPage":cuurentPage,
				    "pagesize":pagesize,
				    "guid" : guid,
				    "enterId":enterId,
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
					} else if (jsonMap.code == 200) {
						$(".EntercvsView").html('');
						var list = jsonMap.data;
						var currentTime=jsonMap.currentTime;
						if(entercvsCvsProgress==""){
							var enterCvsNumber=jsonMap.enterCvsNumber;
							if(enterCvsNumber.enterCvsOne==undefined&&enterCvsNumber.enterCvsTwo==undefined&&enterCvsNumber.enterCvsThree==undefined&&enterCvsNumber.enterCvsFour==undefined&&enterCvsNumber.enterCvsFive==undefined&&enterCvsNumber.enterCvsSix==undefined&&enterCvsNumber.enterCvsSeven==undefined){
								$("#countEntercvsOne").html("("+0+")");
								$("#countEntercvsTwo").html("("+0+")");
								$("#countEntercvsThree").html("("+0+")");
								$("#countEntercvsFour").html("("+0+")");
								$("#countEntercvsFive").html("("+0+")");
								$("#countEntercvsSix").html("("+0+")");
								$("#countEntercvsSeven").html("("+0+")");
								return false;
							}else{
								$("#countEntercvsOne").html("("+enterCvsNumber.enterCvsOne+")");
								$("#countEntercvsTwo").html("("+enterCvsNumber.enterCvsTwo+")");
								$("#countEntercvsThree").html("("+enterCvsNumber.enterCvsThree+")");
								$("#countEntercvsFour").html("("+enterCvsNumber.enterCvsFour+")");
								$("#countEntercvsFive").html("("+enterCvsNumber.enterCvsFive+")");
								$("#countEntercvsSix").html("("+enterCvsNumber.enterCvsSix+")");
								$("#countEntercvsSeven").html("("+enterCvsNumber.enterCvsSeven+")");
							}
						}else{
							var enterCvsNumberA=jsonMap.enterCvsNumberA;
							if(enterCvsNumberA.enterCvsOne==undefined&&enterCvsNumberA.enterCvsTwo==undefined&&enterCvsNumberA.enterCvsThree==undefined&&enterCvsNumberA.enterCvsFour==undefined&&enterCvsNumberA.enterCvsFive==undefined&&enterCvsNumberA.enterCvsSix==undefined&&enterCvsNumberA.enterCvsSeven==undefined){
								$("#countEntercvsOne").html("("+0+")");
								$("#countEntercvsTwo").html("("+0+")");
								$("#countEntercvsThree").html("("+0+")");
								$("#countEntercvsFour").html("("+0+")");
								$("#countEntercvsFive").html("("+0+")");
								$("#countEntercvsSix").html("("+0+")");
								$("#countEntercvsSeven").html("("+0+")");
								return false;
							}else{
								$("#countEntercvsOne").html("("+enterCvsNumberA.enterCvsOne+")");
								$("#countEntercvsTwo").html("("+enterCvsNumberA.enterCvsTwo+")");
								$("#countEntercvsThree").html("("+enterCvsNumberA.enterCvsThree+")");
								$("#countEntercvsFour").html("("+enterCvsNumberA.enterCvsFour+")");
								$("#countEntercvsFive").html("("+enterCvsNumberA.enterCvsFive+")");
								$("#countEntercvsSix").html("("+enterCvsNumberA.enterCvsSix+")");
								$("#countEntercvsSeven").html("("+enterCvsNumberA.enterCvsSeven+")");
							}
						}
						if (list.length > 0) {
								for (var i = 0; i < list.length; i++) {
									var enter_Cvs = list[i];
									enterCvs=JSON.parse(enter_Cvs);
									var cvsProgress=enterCvs.cvsProgress;
									createEntercvsDiv(enterCvs,currentTime);
								}
							}else{
								
							}
						//分页代码
						var PageUtils=jsonMap.datapage;
						var pagesLi=PageUtils.currentPage;
						var currentNode=$(".enterCvspagination li.active a");
						currentNode.html(pagesLi);
						pagesLi=pagesLi+1;
						currentNode.parent().next("li").children(":first").html(pagesLi);
						pagesLi=pagesLi+1;
						currentNode.parent().next("li").next("li").children(":first").html(pagesLi);
						pagesLi=pagesLi+1;
						currentNode.parent().next("li").next("li").next("li").children(":first").html(pagesLi);
						$("#enterCvstotalPage").html(PageUtils.totalPage);
					}
				},
				error : function() {
					alert("访问服务器失败！");
				},
			})
}

// 进行职位名筛选（第一个筛选框）（选中options后渲染到页面上去的环节）
$(".pull-right select:first")
		.change(
				function() {
					$(".EntercvsView").html('');
					var cvsProgress=entercvsCvsProgress;
					var cuurentPage=$(".enterCvspagination li.active a").text();
					var pagesize=5;
					cvsJolisId = $(this).val();
					firstStart(cuurentPage,pagesize,cvsProgress);
				});

//筛选进度为待定简历的渲染
$("#entercvsTwo").click(function(e) {
	var cuurentPage=1;
	var pagesize=5;
	entercvsCvsProgress=1;
	var cvsProgress=1;
	firstStart(cuurentPage,pagesize,cvsProgress);
	e.preventDefault();
});

//筛选进度为滤过简历的渲染
$("#entercvsThree").click(function(e) {
	var cuurentPage=1;
	var pagesize=5;
	entercvsCvsProgress=2;
	var cvsProgress=2;
	firstStart(cuurentPage,pagesize,cvsProgress);
	e.preventDefault();
});

//筛选进度为面试简历的渲染
$("#entercvsFour").click(function(e) {
	var cuurentPage=1;
	var pagesize=5;
	entercvsCvsProgress=3;
	var cvsProgress=3;
	firstStart(cuurentPage,pagesize,cvsProgress);
	e.preventDefault();
});

//筛选进度为录用简历的渲染
$("#entercvsFive").click(function(e) {
	var cuurentPage=1;
	var pagesize=5;
	entercvsCvsProgress=4;
	var cvsProgress=4;
	firstStart(cuurentPage,pagesize,cvsProgress);
	e.preventDefault();
});

//筛选进度为失败简历的渲染
$("#entercvsSix").click(function(e) {
	var cuurentPage=1;
	var pagesize=5;
	entercvsCvsProgress=5;
	var cvsProgress=5;
	firstStart(cuurentPage,pagesize,cvsProgress);
	e.preventDefault();
});

//筛选进度为已接受简历的渲染
$("#entercvsSeven").click(function(e) {
	var cuurentPage=1;
	var pagesize=5;
	entercvsCvsProgress=6;
	var cvsProgress=6;
	firstStart(cuurentPage,pagesize,cvsProgress);
	e.preventDefault();
});

//筛选进度为已拒绝简历的渲染
$("#entercvsEight").click(function(e) {
	var cuurentPage=1;
	var pagesize=5;
	entercvsCvsProgress=7;
	var cvsProgress=7;
	firstStart(cuurentPage,pagesize,cvsProgress);
	e.preventDefault();
});

//上一页分页代码
$("#enterCvsLastPage").click(function (e) {
	var cuurentPage=$(".enterCvspagination li.active a").text();
	cuurentPage=cuurentPage-1;
	if(cuurentPage<1){
		alert("已经是第一页了");
	}else{
		var pagesize=5;
		var cvsProgress=entercvsCvsProgress;
		firstStart(cuurentPage,pagesize,cvsProgress);
		
	}
	e.preventDefault();
})

//下一页分页代码
$("#enterCvsNextPage").click(function (e) {
	var cuurentPage=$(".enterCvspagination li.active a").text();
	cuurentPage=cuurentPage*1+1;
	var TotalPage=$("#enterCvstotalPage").text();//获取总页数
	if(cuurentPage>TotalPage){
		alert("已经是最后一页了");
		e.preventDefault();
	}else{
		var pagesize=5;
		var cvsProgress=entercvsCvsProgress;
		firstStart(cuurentPage,pagesize,cvsProgress);
		e.preventDefault();
	}
})

//跳转页面分页代码
$(".tojumpEnterCvs").click(function (e){
	var cuurentPage=$(this).text();//获取当前页码
	var TotalPage=$("#enterCvstotalPage").text();//获取总页数
	if(cuurentPage>=TotalPage){
		cuurentPage=TotalPage;
		alert("将进入尾页");
	}
	var pagesize=5;
	var cvsProgress=entercvsCvsProgress;
	firstStart(cuurentPage,pagesize,cvsProgress);
	e.preventDefault();
})

//输入跳转几页 分页代码
$("#jumpbuttonEnterCvs").click(function (e) {
	var cuurentPage=$("#jumpPageInputEnterCvs").val();
	if(!/^[0-9]*$/.test(cuurentPage)||cuurentPage==""){
        alert("请输入数字");
    }
	var TotalPage=$("#enterCvstotalPage").text();//获取总页数
	if(cuurentPage<1||cuurentPage>TotalPage){
		alert("请输入1至"+TotalPage+"内的数字");
	}else{
		var pagesize=5;
		var cvsProgress=entercvsCvsProgress;
		firstStart(cuurentPage,pagesize,cvsProgress);
	}
	e.preventDefault();
})

// 这个是点击“职位”筛选框时获取options的操作
$("#zhiwei").focus(
		function(e) {
			var jolisEnterInfoId = 1;
			var _this = $(this);
			var urlHref = window.location.href;
			var guid = urlHref.split("#")[1];
			$.ajax({
				url : homeUrl + 'jolis/getjoblistsforcvs',
				async : false,
				data : {
					"jolisEnterInfoId" : jolisEnterInfoId,
				    "guid" : guid,
				    "enterId":enterId,
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
					} else if (jsonMap.code == 200) {
						var list = jsonMap.data;
						_this.empty();
						_this.append("<option value='" + 0
								+ "'>请进行职位筛选</option>")
						for (var i = 0; i < list.length; i++) {
							_this.append("<option value='" + list[i][0] + "'>"
									+ list[i][1] + "</option>")
						}
					}
				},
				error : function() {
					alert("访问服务器失败！");
				},
			})
		});

//点击进度后显示操作框
function function1(currentcvsId, cvsProgress,Interviewtime,obj) {
	entercvsInterviewtime = Interviewtime;
	if (cvsProgress == 4 || cvsProgress == 5||cvsProgress == 6||cvsProgress == 7) {
		alert("你无法修改此简历进度!");
		return 0;
	}
	var arraycvsProgress = [ "待定", "滤过", "面试", "录用", "失败" ];
	var i = cvsProgress - 1;
	$(".enter_resume_jindu_select").empty();
	for (i; i < arraycvsProgress.length; i++) {
		$(".enter_resume_jindu_select").append(
				"<option value=" + (i + 1) + ">" + arraycvsProgress[i]
						+ "</option>");
	}
	cvsId = currentcvsId;
	if (cvsProgress == 1|| cvsProgress == 2||cvsProgress == 3) {
		$(".enter_resume_jindu_select#entercvsCvsProgress"+cvsId+"").css('display','block');
	}
	
	/*$(".enter_resume_jindu_select#entercvsCvsProgress"+cvsId+"").blur(function(){
		$(".enter_resume_jindu_select#entercvsCvsProgress"+cvsId+"").css('display','none');
		savaentercvs();
	})*/
	$(".enter_resume_jindu_select#entercvsCvsProgress"+cvsId+"").each(function (index,element) {
	var counter = 0;
	$($(".enter_resume_jindu_select#entercvsCvsProgress"+cvsId+"")[index]).click(function () {
		counter++;
		if(counter % 2==0){
			$(".enter_resume_jindu_select#entercvsCvsProgress"+cvsId+"").css('display','none');
			savaentercvs();
		}
	})
});
	
	onCvsProgress = cvsProgress;
}

//点击预览简历
function entercvsOnclick(enterCvsStuId,enterCvsId){
	cvsStuId = enterCvsStuId;
	cvsId=enterCvsId;
	createEntercvDivMorePreview();
	$('#studentEnterCvs').css('display', 'block');
	$('.body_container').css('display', 'none');
	$('#stuResumePreview').empty();
}

//简历预览的返回事件
function exit_entercvs(){
	var cuurentPage=1;
	var pagesize=5;
	var cvsProgress=entercvsCvsProgress;
	firstStart(cuurentPage,pagesize,cvsProgress);
	$("#studentEnterCvs").css('display','none');
	$('.body_container').css('display', 'block');
}

var onCvsProgress;
// 在reModifyA当中修改进度，并保存
function savaentercvs() {
	onCvsProgress;
	var cvsProgressforcvs = $(".enter_resume_jindu_select#entercvsCvsProgress"+cvsId+"").val();
	if (cvsProgressforcvs * 1 == 3) {
		entercvsInterviewtime;
		$("#entercvsInterviewtime"+cvsId+"").val(entercvsInterviewtime);
		$("#entercvsInterviewtime"+cvsId+"").css('display','block');
		var cvsInterviewtime = $("#entercvsInterviewtime"+cvsId+"").val();
		// 面试进行其他操作
		if (cvsInterviewtime != "" && cvsInterviewtime != null) {
		} else {
			alert("请输入面试时间");
			$("#entercvsInterviewtime"+cvsId+"").blur(function(){
				var cvsInterviewtime = $("#entercvsInterviewtime"+cvsId+"").val();
				$("#entercvsInterviewtime"+cvsId+"").css('display','none');
				var cvsInterviewtimes = cvsInterviewtime.split("-");
			    cvsInterviewtime = cvsInterviewtimes[0] + "/"
			    + cvsInterviewtimes[1] + "/" + cvsInterviewtimes[2];
			    var cvsEnterInfoId = 1;
			    var urlHref = window.location.href;
			    var guid = urlHref.split("#")[1];
			$
					.ajax({
						url : homeUrl + 'cvs/updateCvsInterviewtime',
						async : false,
						data : {
							"cvsEnterInfoId" : cvsEnterInfoId,
							"cvsId" : cvsId,
							"cvsInterviewtime" : cvsInterviewtime,
						    "guid" : guid,
						    "enterId":enterId,
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
							} else if (jsonMap.code == 200) {
								alert('修改成功');
								if(onCvsProgress==1){
							var cuurentPage = $(".enterCvspagination li.active a").text();
	                        var pagesize=5;
	                        entercvsCvsProgress=1;
	                        var cvsProgress=1;
	                        firstStart(cuurentPage,pagesize,cvsProgress);
	 					}else if(onCvsProgress==2){
							var cuurentPage = $(".enterCvspagination li.active a").text();
	                        var pagesize=5;
	                        entercvsCvsProgress=2;
	                        var cvsProgress=2;
	                        firstStart(cuurentPage,pagesize,cvsProgress);
						}else if(onCvsProgress==3){
							var cuurentPage = $(".enterCvspagination li.active a").text();
	                        var pagesize=5;
	                        entercvsCvsProgress=3;
	                        var cvsProgress=3;
	                        firstStart(cuurentPage,pagesize,cvsProgress);
						}		
							} else {
								alert("修改失败")
							}
						},
						error : function() {
							alert("访问服务器失败！");
						},
					})
			})
		}
		return 0;
	}
    var cvsEnterInfoId = 1;
	var urlHref = window.location.href;
	var guid = urlHref.split("#")[1];

	$
			.ajax({
				url : homeUrl + 'cvs/updateCvsProgress',
				async : false,
				data : {
					"cvsEnterInfoId" : cvsEnterInfoId,
					"cvsProgress" : cvsProgressforcvs,
					"cvsId" : cvsId,
				    "guid" : guid,
				    "enterId":enterId,
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
					} else if (jsonMap.code == 200) {
						alert('修改成功');
						if(onCvsProgress==1){
							var cuurentPage = $(".enterCvspagination li.active a").text();
	                        var pagesize=5;
	                        entercvsCvsProgress=1;
	                        var cvsProgress=1;
	                        firstStart(cuurentPage,pagesize,cvsProgress);
	 					}else if(onCvsProgress==2){
							var cuurentPage = $(".enterCvspagination li.active a").text();
	                        var pagesize=5;
	                        entercvsCvsProgress=2;
	                        var cvsProgress=2;
	                        firstStart(cuurentPage,pagesize,cvsProgress);
						}else if(onCvsProgress==3){
							var cuurentPage = $(".enterCvspagination li.active a").text();
	                        var pagesize=5;
	                        entercvsCvsProgress=3;
	                        var cvsProgress=3;
	                        firstStart(cuurentPage,pagesize,cvsProgress);
						}							
					} else {
						alert("修改失败")
					}
				},
				error : function() {
					alert("访问服务器失败！");
				},
			})
}

/*  // 点击进度后显示操作框 
function function2(cvsProgress,obj) { 
	if (cvsProgress != 3) {
		alert("不好意思，你无法修改面试时间！"); 
		} else { 
			$('#reModifyB').css('display', 'block'); 
			} 
	}*/

// 到岗时间转化方法
function turncvsProgress(cvsProgress) {
	switch (cvsProgress) {
	case 1:
		cvsProgress = "待定";
		break;
	case 2:
		cvsProgress = "滤过";
		break;
	case 3:
		cvsProgress = "面试";
		break;
	case 4:
		cvsProgress = "录用";
		break;
	case 5:
		cvsProgress = "失败";
		break;
	case 6:
		cvsProgress = "已接受";
		break;
	case 7:
		cvsProgress = "已拒绝";
		break;
	}
	return cvsProgress;
};

// 修改时，当进度改为面试时显示下发的时间输入框，否则则隐藏
$('#processentercvs').change(function() {
	if ($("#processentercvs").val() == 3) {
		$('#entercvsintertimediv').css('display', 'block');
	} else {
		$('#entercvsintertimediv').css('display', 'none');
	}
});

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