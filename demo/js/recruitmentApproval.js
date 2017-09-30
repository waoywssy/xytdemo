var teachId=1;
var guid="37g337Q99hAP0KShTqhhn9ZI11lLpONT";
window.onload = onloadtoshow();
//自加载方法  需要传参数
function onloadtoshow(){
	jofaiStatus = 0;
	var cuurentPage=1;//获取当前页码
	var pagesize=5;
	recruitmentApproval(cuurentPage,pagesize,jofaiStatus);
}

// 审核进度
var jofaiStatus = 0;

//地点
var jofaiLocation;

//招聘会主键
 var jofaiId;
// 用插件显示年月日
function FormatDateA(strTime) {
	var date = new Date(strTime);
	return date.getFullYear() + "年" + (date.getMonth() + 1) + "月"
			+ date.getDate() + "日";
}

// 用插件显示时分
function FormatDateB(strTime) {
	var date = new Date(strTime);
	if (date.getHours() < 10) {
		var hours = "0" + date.getHours();
	} else {
		var hours = date.getHours();
	}
	if (date.getMinutes() < 10) {
		var minutes = "0" + date.getMinutes();
	} else {
		var minutes = date.getMinutes();
	}
	return hours + " : " + minutes;
}

// 导航“企业审批”选项点击事件
function recruitmentApproval(cuurentPage, pagesize, jofaiStatus) {
	// 信息的数量
	if (jofaiStatus == 0) {
		$.ajax({
			url : homeUrl + 'jofai/getjofaiLists',
			async : false,
			data : {
				"jofaiStatus" : jofaiStatus,
				"teachId" : teachId,
				"cuurentPage" : cuurentPage,
				"pagesize" : pagesize,
				"guid" : guid,
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
					$("#teach_JodFair").html('');
					var list = jsonMap.data;
					if (list.length > 0) {
						for (var i = 0; i < list.length; i++) {
							var recruitment = list[i];
							createRecruitmentDiv(recruitment);
						}
					} else {

					}
					// 分页代码
					var PageUtils = jsonMap.datapage;
					var pagesLi = PageUtils.currentPage;
					var currentNode = $(".recruitmentpagination li.active a");
					currentNode.html(pagesLi);
					pagesLi = pagesLi + 1;
					currentNode.parent().next("li").children(":first").html(
							pagesLi);
					pagesLi = pagesLi + 1;
					currentNode.parent().next("li").next("li").children(
							":first").html(pagesLi);
					pagesLi = pagesLi + 1;
					currentNode.parent().next("li").next("li").next("li")
							.children(":first").html(pagesLi);
					$("#recruitmenttotalPage").html(PageUtils.totalPage);
				}
			},
			error : function() {
				alert("访问服务器失败！");
			},
		})
	} else if (jofaiStatus == 1) {
		$
				.ajax({
					url : homeUrl + 'jofai/getjofaiLists',
					async : false,
					data : {
						"jofaiStatus" : jofaiStatus,
						"teachId" : teachId,
						"cuurentPage" : cuurentPage,
						"pagesize" : pagesize,
						"guid" : guid,
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
							$("#teach_JodFair_Pass").html('');
							var list = jsonMap.data;
							if (list.length > 0) {
								for (var i = 0; i < list.length; i++) {
									var recruitment = list[i];
									createRecruitmentDiv(recruitment);
								}
							} else {

							}
							// 分页代码
							var PageUtils = jsonMap.datapage;
							var pagesLi = PageUtils.currentPage;
							var currentNode = $(".recruitmentPasspagination li.active a");
							currentNode.html(pagesLi);
							pagesLi = pagesLi + 1;
							currentNode.parent().next("li").children(":first")
									.html(pagesLi);
							pagesLi = pagesLi + 1;
							currentNode.parent().next("li").next("li")
									.children(":first").html(pagesLi);
							pagesLi = pagesLi + 1;
							currentNode.parent().next("li").next("li").next(
									"li").children(":first").html(pagesLi);
							$("#recruitmentPasstotalPage").html(
									PageUtils.totalPage);
						}
					},
					error : function() {
						alert("访问服务器失败！");
					},
				})
	}
}

/**
 * 获取后台数据并渲染到页面
 */
function createRecruitmentDiv(recruitment) {
	var jofaiPersons;
	if (recruitment.jofaiPersons == 0 || recruitment.jofaiPersons == ""
			|| recruitment.jofaiPersons == null) {
		jofaiPersons = "--该企业暂时不招人！";
	} else {
		jofaiPersons = "--" + recruitment.jofaiPersons + "人";
	}
	if (recruitment.jofaiType == 0) {
		jofaiType = "供需会";
	} else {
		jofaiType = "宣讲会";
	}
	if (recruitment.jofaiMajors == 0 || recruitment.jofaiMajors == null
			|| recruitment.jofaiMajors == "") {
		jofaiMajors = "不包含任何专业";
	} else {
		jofaiMajors = recruitment.jofaiMajors;
	}
	if (recruitment.jofaiLocation == 0 || recruitment.jofaiLocation == null
			|| recruitment.jofaiLocation == "") {
		jofaiLocation = "地点暂时未确定";
	} else {
		jofaiLocation = recruitment.jofaiLocation;
	}
	jofaiId = recruitment.jofaiId;
	console.log(typeof(jofaiLocation),jofaiLocation);
	if (recruitment.jofaiStatus == 0) {
		$("#teach_JodFair")
				.append(
						"<li class='position_list_item default_list teaJobFair'><div class='pli_top teaCom'><div class='fl pli_top_l'><div class='position_name'><h2 class='fl'><a class='position_link fl wordCut' title='"+recruitment.enterInfoName+"' target='_blank' onclick='togetrecruitmentInfo("
								+ recruitment.jofaiEnterInfoId
								+ ");'><b>"
								+ recruitment.enterInfoName
								+ "</b></a></h2><span>"
								+ jofaiPersons
								+ "</span></div><div class='position_main_info wordCut'><span>"
								+ FormatDateA(recruitment.jofaiStartime)
								+ "</span><span>"
								+ FormatDateB(recruitment.jofaiStartime)
								+ " -- "
								+ FormatDateB(recruitment.jofaiEndtime)
								+ "</span></div></div><div class='fr pli_top_r'><div class='wordCut' style='height: 34px'>"
								+ jofaiType
								+ "</div></div><div class='clear'></div><div class='p_btm'>"
								+ jofaiMajors
								+ "</div><div class='Tea_JobFair'><button class='btn btn-primary' type='button' onclick='recruitmentPassBtn("
								+ recruitment.jofaiId
								+ ")'>"
								+ "通过"
								+ "</button><button class='btn btn-primary Tea_btn' type='button' onclick='recruitmentFailBtn("
								+ recruitment.jofaiId
								+ ")'>"
								+ "拒绝"
								+ "</button></div></div></li>");
	} else if (recruitment.jofaiStatus == 1) {
		$("#teach_JodFair_Pass")
				.append(
						"<li class='position_list_item default_list teaJobFair'><div class='pli_top teaCom'><div class='fl pli_top_l'><div class='position_name'><h2 class='fl'><b title='"+recruitment.enterInfoName+"'>"
								+ "<a>"+recruitment.enterInfoName
								+ "</a></b></h2><span>"
								+ jofaiPersons
								+ "</span></div><div class='position_main_info wordCut'><span>"
								+ FormatDateA(recruitment.jofaiStartime)
								+ "</span><span>"
								+ FormatDateB(recruitment.jofaiStartime)
								+ " -- "
								+ FormatDateB(recruitment.jofaiEndtime)
								+ "</span></div></div><div class='fr pli_top_r'><div class='wordCut' style='height: 34px'>"
								+ jofaiType
								+ "</div><div class='industry wordCut'><span>"
								+ jofaiLocation
								+ "</sapn></div></div><div class='clear'></div><div class='p_btm'>"
								+ jofaiMajors
								+ "<div><div class='teaJF'><button class='btn btn-primary' type='button' onclick='recruitmentLocation("+ recruitment.jofaiId+","+JSON.stringify(recruitment.jofaiLocation)+")'>"
								+ "地点修改"
								+ "</button></div></div></li>");
	}
}

// 进入招聘会审批的渲染
$("#recruitmentNotApproval").click(function(e) {
	var cuurentPage = 1;
	var pagesize = 5;
	jofaiStatus = 0;
	recruitmentApproval(cuurentPage, pagesize, jofaiStatus);
	e.preventDefault();
});

// 招聘会审核上一页分页代码
$("#recruitmentLastPage").click(function(e) {
	var cuurentPage = $(".recruitmentpagination li.active a").text();
	cuurentPage = cuurentPage - 1;
	if (cuurentPage < 1) {
		alert("已经是第一页了");
	} else {
		var pagesize = 5;
		jofaiStatus = 0;
		recruitmentApproval(cuurentPage, pagesize, jofaiStatus);
	}
	e.preventDefault();
})

// 招聘会审核下一页分页代码
$("#recruitmentNextPage").click(function(e) {
	var cuurentPage = $(".recruitmentpagination li.active a").text();
	cuurentPage = cuurentPage * 1 + 1;
	var TotalPage = $("#recruitmenttotalPage").text();// 获取总页数
	if (cuurentPage > TotalPage) {
		alert("已经是最后一页了");
		e.preventDefault();
	} else {
		var pagesize = 5;
		jofaiStatus = 0;
		recruitmentApproval(cuurentPage, pagesize, jofaiStatus);
		e.preventDefault();
	}
})

// 招聘会审核跳转页面分页代码
$(".tojumprecruitment").click(function(e) {
	var cuurentPage = $(this).text();// 获取当前页码
	var TotalPage = $("#recruitmenttotalPage").text();// 获取总页数
	if (cuurentPage >= TotalPage) {
		cuurentPage = TotalPage;
		alert("将进入尾页");
	}
	var pagesize = 5;
	jofaiStatus = 0;
	recruitmentApproval(cuurentPage, pagesize, jofaiStatus);
	e.preventDefault();
})

// 招聘会审核输入跳转几页 分页代码
$("#jumpbuttonrecruitment").click(function(e) {
	var cuurentPage = $("#jumpPageInputrecruitment").val();
	if (!/^[0-9]*$/.test(cuurentPage) || cuurentPage == "") {
		alert("请输入数字");
	}
	var TotalPage = $("#recruitmenttotalPage").text();// 获取总页数
	if (cuurentPage < 1 || cuurentPage > TotalPage) {
		alert("请输入1至" + TotalPage + "内的数字");
	} else {
		var pagesize = 5;
		jofaiStatus = 0;
		recruitmentApproval(cuurentPage, pagesize, jofaiStatus);
	}
	e.preventDefault();
})

// 进入招聘会管理的渲染
$("#recruitmentPassApproval").click(function(e) {
	var cuurentPage = 1;
	var pagesize = 5;
	jofaiStatus = 1;
	recruitmentApproval(cuurentPage, pagesize, jofaiStatus);
	e.preventDefault();
});

// 招聘会管理上一页分页代码
$("#recruitmentPassLastPage").click(function(e) {
	var cuurentPage = $(".recruitmentPasspagination li.active a").text();
	cuurentPage = cuurentPage - 1;
	if (cuurentPage < 1) {
		alert("已经是第一页了");
	} else {
		var pagesize = 5;
		jofaiStatus = 1;
		recruitmentApproval(cuurentPage, pagesize, jofaiStatus);
	}
	e.preventDefault();
})

// 招聘会管理下一页分页代码
$("#recruitmentPassNextPage").click(function(e) {
	var cuurentPage = $(".recruitmentPasspagination li.active a").text();
	cuurentPage = cuurentPage * 1 + 1;
	var TotalPage = $("#recruitmentPasstotalPage").text();// 获取总页数
	if (cuurentPage > TotalPage) {
		alert("已经是最后一页了");
		e.preventDefault();
	} else {
		var pagesize = 5;
		jofaiStatus = 1;
		recruitmentApproval(cuurentPage, pagesize, jofaiStatus);
		e.preventDefault();
	}
})

// 招聘会管理跳转页面分页代码
$(".tojumprecruitmentPass").click(function(e) {
	var cuurentPage = $(this).text();// 获取当前页码
	var TotalPage = $("#recruitmentPasstotalPage").text();// 获取总页数
	if (cuurentPage >= TotalPage) {
		cuurentPage = TotalPage;
		alert("将进入尾页");
	}
	var pagesize = 5;
	jofaiStatus = 1;
	recruitmentApproval(cuurentPage, pagesize, jofaiStatus);
	e.preventDefault();
})

// 招聘会管理输入跳转几页 分页代码
$("#jumpbuttonrecruitmentPass").click(function(e) {
	var cuurentPage = $("#jumpPageInputrecruitmentPass").val();
	if (!/^[0-9]*$/.test(cuurentPage) || cuurentPage == "") {
		alert("请输入数字");
	}
	var TotalPage = $("#recruitmentPasstotalPage").text();// 获取总页数
	if (cuurentPage < 1 || cuurentPage > TotalPage) {
		alert("请输入1至" + TotalPage + "内的数字");
	} else {
		var pagesize = 5;
		jofaiStatus = 1;
		recruitmentApproval(cuurentPage, pagesize, jofaiStatus);
	}
	e.preventDefault();
})

//审核通过
function recruitmentPassBtn(jofaiId){
	jofaiLocation = "";
	var jofaiStatus = 1;
	$.ajax({
		url : homeUrl + 'jofai/updatejofaiStatusForTeach',
		async : false,
		data : {
			"jofaiStatus":jofaiStatus,
			"teachId" : teachId,
			"guid" : guid,
			"jofaiId" : jofaiId,
			"jofaiLocation" : jofaiLocation,
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
				$("#tochangeStatusApply").css('display','block');
			}
		},
		error : function() {
			alert("访问服务器失败！");
		},
	});
}

//审核通过确定
function recruitmentPassBtnSuccess(){
	$("#tochangeStatusApply").css('display','none');
	$("#operalmessage").css('display','block');
}

//审核通过确定成功
function operalmessage(){
	$("#operalmessage").css('display','none');
	var cuurentPage = $(".recruitmentpagination li.active a").text();
	var pagesize = 5;
	jofaiStatus = 0;
	recruitmentApproval(cuurentPage, pagesize, jofaiStatus);
}

//审核通过取消
function recruitmentPassBtnExit(){
	$("#tochangeStatusApply").css('display','none');
}


//审核未通过
function recruitmentFailBtn(jofaiId){
	jofaiLocation = "";
	var jofaiStatus = 2;
	$.ajax({
		url : homeUrl + 'jofai/updatejofaiStatusForTeach',
		async : false,
		data : {
			"jofaiStatus":jofaiStatus,
			"teachId" : teachId,
			"guid" : guid,
			"jofaiId" : jofaiId,
			"jofaiLocation" : jofaiLocation,
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
				$("#torefucesStatus").css('display','block');
			}
		},
		error : function() {
			alert("访问服务器失败！");
		},
	});
}

//审核未通过确定
function recruitmentFailBtnSuccess(){
	$("#torefucesStatus").css('display','none');
	$("#operalmessage").css('display','block');
}

//审核未通过取消
function recruitmentFailBtnExit(){
	$("#torefucesStatus").css('display','none');
}

//跳转到修改地址
function recruitmentLocation(newJofaiId,newjofaiLocation){
	jofaiId = newJofaiId;
	
	jofaiLocation = newjofaiLocation;
	$("#oldJofaiLocation").val(jofaiLocation);
	$("#newJofaiLocation").val('');
	$("#recruitmentLoc").css('display','block');
}

//修改地址成功
function recruitmentLocUpdate(){
	jofaiLocation = $("#newJofaiLocation").val().trim();
	jofaiId;
	var jofaiStatus = 1;
	$.ajax({
		url : homeUrl + 'jofai/updatejofaiStatusForTeach',
		async : false,
		data : {
			"jofaiStatus":jofaiStatus,
			"teachId" : teachId,
			"guid" : guid,
			"jofaiId" : jofaiId,
			"jofaiLocation" : jofaiLocation,
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
				$("#recruitmentLocUpdateSuccess").css('display','block');
				$("#recruitmentLoc").css('display','none');
			}
		},
		error : function() {
			alert("访问服务器失败！");
		},
	});
}

//招聘会地点修改成功
function recruitmentLocUpdateSuccess(){
	$("#recruitmentLocUpdateSuccess").css('display','none');
	var cuurentPage = $(".recruitmentPasspagination li.active a").text();
	var pagesize = 5;
	jofaiStatus = 1;
	recruitmentApproval(cuurentPage, pagesize, jofaiStatus);
}

//取消修改地址
function recruitmentLocExit(){
	$("#recruitmentLocUpdateExit").css('display','block');
	$("#recruitmentLoc").css('display','none');
}

//确认取消修改地址
function recruitmentLocUpdateExitSure(){
	$("#recruitmentLocUpdateExit").css('display','none');
}

//取消取消修改地址
function recruitmentLocUpdateExitNot(){
	$("#recruitmentLocUpdateExit").css('display','none');
	$("#recruitmentLoc").css('display','block');
}

//点击带参进入招聘会企业详细信息
function togetrecruitmentInfo(enterInfoId){
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
				 //location.href=encodeURI("../html/teachJobFairCom.html");
				 window.open("../html/teachJobFairCom.html");
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