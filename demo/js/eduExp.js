var EduexpInfo = {// 教育经历
// "eduexpId":"",//主键
// "eduexpStuId":"",//学生表主键
// "eduexpSchool":"",//学校名称
// "eduexpEduId":"",//学历表主键
// "eduexpEnrolled":"",//入学时间
// "Enrolledyear":"",//入学年份
// "Enrolledmonth":"",//入学月份
// "eduexpGraduate":"",//毕业时间
// "Graduateyear":"",//毕业年份
// "Graduatemonth":"",//毕业月份
// "eduexpCostId":"",//专业表主键
// "eduexpLocId":"",//所在地
// "eduexpEntranceExamination":"",//是否统招
// "eduexpMore":"",//教育经历描述
};
// 从后台获得教育经历的方法
function getEduExpInfo() {
	var stuId = personalBaseInfo.stuId;
	var urlHref = window.location.href;
	var guid = urlHref.split("#")[1];
	$.ajax({
		url : homeUrl + 'eduexp/getEduExpInfo',
		async : false, // 改成同步
		data : {
			"stuId" : stuId,
			"guid" : guid,
		},
		type : 'post',
		success : function(data) {
			// console.log(data);
			var jsonMap = JSON.parse(data);
			if (jsonMap.code == 301) {
				alert("您为非法用户");
				window.location.href = homeUrl + 'stu/safe';
			} else if (jsonMap.code == 302) {
				alert("您停留时间过长");
				window.location.href = homeUrl + 'stu/safe';
			} else if (jsonMap.code == 200) {
				// console.log(date);
				var list = jsonMap.data;
				// console.log(list.length);
				if (list.length > 0) {
					$("#eduPreview div:first").empty();// 每次点击，div内容清空，但是不删除当前div节点
					for (var i = 0; i < list.length; i++) {
						EduexpInfo = list[i];
						createDivEduexp(EduexpInfo);
					}
				} else {
					createEduForDelete();
				}
			}
		},
		error : function() {
			alert("访问服务器失败！");
		},
	})
}
// 对应拿到教育信息的附属方法
function createDivEduexp(eduexperienceEduexp) {
	// 时间
	var Enrolled = eduexperienceEduexp.eduexpEnrolled.split(",");
	var Enrolledyear = Enrolled[1].trim();
	eduexperienceEduexp.Enrolledyear = Enrolledyear;
	var Enrolledmonth = trueMonth(Enrolled[0].split(" ")[0]);
	eduexperienceEduexp.Enrolledmonth = Enrolledmonth;
	if (eduexperienceEduexp.eduexpGraduate == undefined) {
		Graduateyear = "--";
		Graduatemonth = "--";
	} else {
		var Graduate = eduexperienceEduexp.eduexpGraduate.split(",");
		var Graduateyear = Graduate[1];
		eduexperienceEduexp.Graduateyear = Graduateyear;
		var Graduatemonth = trueMonth(Graduate[0].split(" ")[0]);
		eduexperienceEduexp.Graduatemonth = Graduatemonth;
	}
	// 转换学历
	var edu = edu_a[eduexperienceEduexp.eduexpEduId];
	// 所在地
	var province100 = parseInt((eduexperienceEduexp.eduexpLocId + "")
			.substring(0, 3)
			+ "0000000000000");
	var eduexpLoc = ChineseDistricts[1000000000000000][province100];
	eduexperienceEduexp.province = eduexpLoc;
	var city10 = (eduexperienceEduexp.eduexpLocId + "").substring(3, 5);
	var district10 = (eduexperienceEduexp.eduexpLocId + "").substring(5, 7);
	if (city10 != "00") {
		var city10 = parseInt((eduexperienceEduexp.eduexpLocId + "").substring(
				0, 5)
				+ "00000000000");
		eduexpLoc += "-" + ChineseDistricts[province100][city10];
		eduexperienceEduexp.city = ChineseDistricts[province100][city10];
	}
	if (district10 != "00") {
		eduexpLoc += "-"
				+ ChineseDistricts[city10][eduexperienceEduexp.eduexpLocId];
		eduexperienceEduexp.district = ChineseDistricts[city10][eduexperienceEduexp.eduexpLocId];
	}
	var jsonstr = JSON.stringify(eduexperienceEduexp);
	if (eduexperienceEduexp.eduexpEntranceExamination == 0) {
		var eduexpEntranceExamination = "非";
	} else if (eduexperienceEduexp.eduexpEntranceExamination == 1) {
		var eduexpEntranceExamination = "是";
	} else {
		var eduexpEntranceExamination = "";
	}
	$("#eduPreview div:first")
			.append(
					"<div><div class='click_to_ed'><span class='edu_edi_class' data-json='"
							+ jsonstr
							+ "'>点此编辑</span><div class='editBtn'/></div><ul class='list-unstyled'>"
							+ "<li><label class='pre_label'>在校时间</label>:<span>"
							+ Enrolledyear
							+ "</span>年 <span>"
							+ Enrolledmonth
							+ "</span> 月 　　 至 　　<span>"
							+ Graduateyear
							+ "</span> 年 <span>"
							+ Graduatemonth
							+ "</span> 月</li>"
							+ "<li><label class='pre_label'>所在地</label>:<span>"
							+ eduexpLoc
							+ "</span></li>"
							+ "<li><label class='pre_label'>学校</label>:<span>"
							+ eduexperienceEduexp.eduexpSchool
							+ "</span></li>"
							+ "<li id='edu"
							+ eduexperienceEduexp.eduexpId
							+ "' style='display:none'><label class='pre_label'>是否统招</label>:<span>"
							+ eduexpEntranceExamination
							+ "</span></li>"
							+ "<li id='eduCostId_showid"
							+ eduexperienceEduexp.eduexpId
							+ "'><label class='pre_label'>专业</label>:<span>"
							+ eduexperienceEduexp.eduexpCostId
							+ "</span></li>"
							+ "<li><label class='pre_label'>学历 / 学位</label>:<span>"
							+ edu
							+ "</span></li>"
							+ "<li id='eduMore_showid"
							+ eduexperienceEduexp.eduexpId
							+ "'><label class='pre_label'>描述</label>:<span>"
							+ eduexperienceEduexp.eduexpMore
							+ "</span></li>"
							+ "</ul><div class='delete'><a class='delete_btn' title='点击删除该列' onclick='delete_edu("
							+ eduexperienceEduexp.eduexpId
							+ ");'></a><div class='clear'></div></div></div>");
	// 根据学校判断是否需要显示统招
	if (eduexperienceEduexp.eduexpSchool.indexOf("学院") > -1
			|| eduexperienceEduexp.eduexpSchool.indexOf("大学") > -1) {
		$("#edu" + eduexperienceEduexp.eduexpId + "").css("display", "block");
	}
	// 是否隐藏专业
	if (eduexperienceEduexp.eduexpCostId == 0
			|| eduexperienceEduexp.eduexpCostId == null
			|| eduexperienceEduexp.eduexpCostId == "") {
		$("#eduCostId_showid" + eduexperienceEduexp.eduexpId + "").css(
				'display', 'none');
	} else {
		$("#eduCostId_showid" + eduexperienceEduexp.eduexpId + "").css(
				'display', 'blcok');
	}
	// 是否隐藏描述
	if (eduexperienceEduexp.eduexpMore == 0
			|| eduexperienceEduexp.eduexpMore == null
			|| eduexperienceEduexp.eduexpMore == "") {
		$("#eduMore_showid" + eduexperienceEduexp.eduexpId + "").css('display',
				'none');
	} else {
		$("#eduMore_showid" + eduexperienceEduexp.eduexpId + "").css('display',
				'blcok');
	}
}
// 解决删除最后一条经历的问题
function createEduForDelete() {
	$("#eduPreview div:first").empty();// 每次点击，div内容清空，但是不删除当前div节点
	$("#eduPreview div:first")
			.append(
					"<div><div class='click_to_ed'><span onclick='add_edu();'>点此编辑</span><div class='editBtn'/></div><ul class='list-unstyled'>"
							+ "<li><label class='pre_label'>在校时间</label>:<span>某</span>年 <span>某</span>月 　　 至 　　<span>某</span> 年 <span>某</span> 月</li>"
							+ "<li><label class='pre_label'>所在地</label>:<span>未填写</span></li>"
							+ "<li><label class='pre_label'>学校</label>:<span>未填写</span></li>"
							+ "<li  style='display:none'><label class='pre_label'>是否统招</label>:<span></span></li>"
							+ "<li><label class='pre_label'>专业</label>:<span>未填写</span></li>"
							+ "<li><label class='pre_label'>学历 / 学位</label>:<span>未填写</span></li>"
							+ "<li><label class='pre_label'>描述</label>:<span>未填写</span></li>"
							+ "</ul></div></div>");
}
// 教育信息之点击编辑
// function toEdiEdu(EduexpInfos){
// }
$("body").on(
		"click",
		".edu_edi_class",
		function(e) {
			$('#eduEdit').css('display', 'block');
			$('#eduPreview').css('display', 'none');
			e.preventDefault();
			var EduexpInfos = $(this).attr("data-json");
			EduexpInfos = JSON.parse(EduexpInfos);
			// 入学时间
			// $("#eduEnrolledyear
			// option[value='"+EduexpInfos.Enrolledyear.trim()+"']").attr("selected","selected");
			$("#eduEnrolledyear").val(EduexpInfos.Enrolledyear.trim());
			$("#eduEnrolledyear").change();
			// $("#eduEnrolledmonth
			// option[value='"+EduexpInfos.Enrolledmonth.trim()+"']").attr("selected","selected");//根据值让option选中
			$("#eduEnrolledmonth").val(EduexpInfos.Enrolledmonth.trim());
			$("#eduEnrolledmonth").change();
			if (EduexpInfos.Graduateyear == "") {
				EduexpInfos.Graduateyear = 0;
			}
			$("#eduGraduateyear").val(EduexpInfos.Graduateyear.trim());
			$("#eduGraduateyear").change();

			if (EduexpInfos.Graduatemonth == "") {
				EduexpInfos.Graduatemonth = 0;
			}
			$("#eduGraduatemonth").val(EduexpInfos.Graduatemonth.trim());
			$("#eduGraduatemonth").change();

			// 所在地
			$("#province10Update option[value='" + EduexpInfos.province + "']")
					.attr("selected", "selected");// 根据值让option选中
			$("#province10Update").change();
			if (EduexpInfos.city != "") {
				$("#city10Update option[value='" + EduexpInfos.city + "']")
						.attr("selected", "selected");// 根据值让option选中
				$("#city10Update").change();
			} else {
				$("#city10Update").val('');
				$("#city10Update").change();
			}
			if (EduexpInfos.district != "") {
				$(
						"#district10Update option[value='"
								+ EduexpInfos.district + "']").attr("selected",
						"selected");// 根据值让option选中
				$("#district10Update").change();
			} else {
				$("#district10Update").change();
			}
			$("#university").val(EduexpInfos.eduexpSchool);
			$("#university").change();
			$("#costId").val(EduexpInfos.eduexpCostId);
			$("#costId").change();
			$("#eduexpMore").val(EduexpInfos.eduexpMore);
			$("#eduexpMore").change();
			edu_getoption();
			$("#diplomas option[value='" + EduexpInfos.eduexpEduId + "']")
					.attr("selected", "selected");// 根据值让option选中
			$("#eduexpId").attr("value", EduexpInfos.eduexpId);
			// 根据学校判断是否需要显示统招
			if (EduexpInfos.eduexpSchool.indexOf("学院") > -1
					|| EduexpInfos.eduexpSchool.indexOf("大学") > -1) {
				$("#eduexpEntranceExaminationDiv").css("display", "block");
				// 是否统招
				if (EduexpInfos.eduexpEntranceExamination == false) {
					EduexpInfos.eduexpEntranceExamination = 0;
				} else {
					EduexpInfos.eduexpEntranceExamination = 1;
				}
				$(
						"input[name='eduexpEntranceExamination'][value="
								+ EduexpInfos.eduexpEntranceExamination + "]")
						.attr("checked", true);
			} else {
				$("#eduexpEntranceExaminationDiv").css("display", "none");
			}
			$("#eduExpEnGrspan1").css("display", "none");
			$("#eduExpPlacespan").css("display", "none");
			$("#eduexpMorespanA").css("display", "none");
			$("#costIdspan").css("display", "none");
			$("#diplomasspan").css("display", "none");
			$("#universityspan").css("display", "none");
		});
// $(".click_to_ed").click(function(){
//	
// });

// 删除教育信息
function delete_edu(eduexpId) {
	var stuId = personalBaseInfo.stuId;
	var urlHref = window.location.href;
	var guid = urlHref.split("#")[1];
	if (confirm("确定要删除该列吗？")) {
		$.ajax({
			url : homeUrl + 'eduexp/deleteEduExpInfo',
			async : false,// 改成同步
			data : {
				"eduExpId" : eduexpId,
				"stuId" : stuId,
				"guid" : guid,
			},
			type : 'post',
			success : function(date) {
				var jsonMap = JSON.parse(date);
				if (jsonMap.code == 200) {
					alert("删除成功");
					getEduExpInfo();
				} else if (jsonMap.code == 301) {
					alert("您为非法用户");
					window.location.href = homeUrl + 'stu/safe';
				} else if (jsonMap.code == 302) {
					alert("您停留时间过长");
					window.location.href = homeUrl + 'stu/safe';
				} else if (jsonMap.code == 398) {
					alert("未获得值");
				} else {
					alert("删除失败");
				}
			},
			error : function() {
				alert("访问服务器失败！");
			},
		});
	}
}
// 创建教育信息并保存
function add_edu() {
	$('#eduEdit').css('display', 'block');
	$('#eduPreview').css('display', 'none');
	$("#province10Update").val('');
	$("#city10Update").val('');
	$("#district10Update").val('');
	$("#costId").val('');
	$("#costId").change();
	$("#eduexpMore").val('');
	$("#eduexpMore").change();
	$("#university").val('');
	$("#diplomas").val(0);
	$("#diplomas").change();
	$("#eduEnrolledyear").val(0);
	$("#eduEnrolledyear").change();
	$("#eduGraduateyear").val(0);
	$("#eduGraduateyear").change();
	$("#eduexpId").attr("value", 0);
	$("#eduExpEnGrspan1").css("display", "none");
	$("#eduExpPlacespan").css("display", "none");
	$("#eduexpMorespanA").css("display", "none");
	$("#costIdspan").css("display", "none");
	$("#diplomasspan").css("display", "none");
	$("#universityspan").css("display", "none");
	$("#eduexpEntranceExaminationDiv").css("display", "none");
}
// 将月份的（四改成4）
function trueMonth(month) {
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
// 教育经历信息创建和保存
function saveorupdateEduexp() {
	//是否统招
			var eduexpEntranceExamination = document
			.getElementsByName("eduexpEntranceExamination");
		for ( var k in eduexpEntranceExamination) {
		if (eduexpEntranceExamination[k].checked) {
			EduexpInfo.eduexpEntranceExamination = eduexpEntranceExamination[k].value;
		}
    }
		EduexpInfo.eduexpSchool = $("#university").val().trim();
		if (EduexpInfo.eduexpSchool.indexOf("学院") > -1
				|| EduexpInfo.eduexpSchool.indexOf("大学") > -1){
			
		}else{
			EduexpInfo.eduexpEntranceExamination=0;
		}
	if ($('#eduExpEnGr select:eq(0)').val() == 0
			|| $('#eduExpEnGr select:eq(1)').val() == 0) {
		$("#eduExpEnGrspan1").css("display", "block");
		// $("#eduExpEnGr").append("<span id='eduExpEnGrspan'><font color='red'
		// size='5'>请输入完整时间</font></span>");
	} else if ($('#eduExpPlace select:eq(0)').val() == "") {
		$("#eduExpPlacespan").css("display", "block");
		// $("#eduExpPlace").append("<span id='eduExpPlacespan'><font
		// color='red' size='5'>请输入所在地</font></span>");
	} else if ($("#university").val().trim() == "") {
		$("#universityspan").css("display", "block");
		// $("#universityschool").append("<span id='universityspan'><font
		// color='red' size='5'>请输入输入学校</font></span>");
	} else if (EduexpInfo.eduexpEntranceExamination<0){
		$("#eduexpEntranceExaminationspan").css("display", "block");
	}/*
		 * else if ($("#costId").val().trim() == ""||$("#costId").val().trim() ==
		 * null) { $("#costIdspan").css("display", "block"); }
		 */else if ($("#diplomas").val() == 0 || $("#diplomas").val() == null
			|| $("#diplomas").val() == "") {
		$("#diplomasspan").css("display", "block");
		// $("#eduExpPlace").append("<span id='eduExpPlacespan'><font
		// color='red' size='5'>请输入所在地</font></span>");
	}/*
		 * else if ($("#eduexpMore").val().trim() ==
		 * ""||$("#eduexpMore").val().trim() == null) {
		 * $("#eduexpMorespanA").css("display", "block"); }
		 */else if ($('#eduExpEnGr select:eq(0)').val() != 0
			&& $('#eduExpEnGr select:eq(2)').val() != 0
			&& $('#eduExpEnGr select:eq(0)').val()*1 > $(
					'#eduExpEnGr select:eq(2)').val()*1) {
		$("#eduExpEnGrspan2").css("display", "block");
	} else if ($('#eduExpEnGr select:eq(0)').val() != 0
			&& $('#eduExpEnGr select:eq(1)').val() != 0
			&& $('#eduExpEnGr select:eq(2)').val() != 0
			&& $('#eduExpEnGr select:eq(3)').val() != 0
			&& $('#eduExpEnGr select:eq(0)').val() == $(
					'#eduExpEnGr select:eq(2)').val()
			&& $('#eduExpEnGr select:eq(1)').val()*1 > $(
					'#eduExpEnGr select:eq(3)').val()*1) {
		$("#eduExpEnGrspan2").css("display", "block");
	}else {
		var eduexpId = $('#eduexpId').val();
		if (eduexpId != "" && eduexpId > 0) {
			EduexpInfo.eduexpId = eduexpId;
			updateEduExpInfo();
		} else {
			saveEduExpInfo();
		}
	}
}
$("#university").bind(
		'input propertychange',
		function() {
			var universityName = $("#university").val();
			if ($("#university").val().trim() != "") {
				$("#universityspan").css("display", "none");
			}
			// 根据学校判断是否需要显示统招
			if (universityName.indexOf("学院") > -1
					|| universityName.indexOf("大学") > -1) {
				$("#eduexpEntranceExaminationDiv").css("display", "block");
			} else {
				$("#eduexpEntranceExaminationDiv").css("display", "none");
			}
		});
// 所在地校验
$('#eduExpPlace').change(function() {
	if ($('#eduExpPlace select:eq(0)').val() != "") {
		$("#eduExpPlacespan").css("display", "none");
	}
});
/*
 * //专业验证 $("#costId").bind(' input propertychange ', function() { if
 * ($("#costId").val().trim() == ""||$("#costId").val().trim() == null) {
 * $("#costIdspan").css("display", "block"); }else{
 * $("#costIdspan").css("display", "none"); } });
 */
// 描述验证
$("#eduexpMore").bind(' input propertychange ', function() {
	/*
	 * if ($("#eduexpMore").val().trim() == ""||$("#eduexpMore").val().trim() ==
	 * null) { $("#eduexpMorespanA").css("display", "block"); }else{
	 * $("#eduexpMorespanA").css("display", "none"); }
	 */
	if ($("#eduexpMore").val().trim().length > 2000) {
		$("#eduexpMorespanB").css("display", "block");
	} else {
		$("#eduexpMorespanB").css("display", "none");
	}
});
//
$(".eduexpEntranceExamination").bind(' input propertychange ', function() {
	/*
	 * if ($("#eduexpMore").val().trim() == ""||$("#eduexpMore").val().trim() ==
	 * null) { $("#eduexpMorespanA").css("display", "block"); }else{
	 * $("#eduexpMorespanA").css("display", "none"); }
	 */
	$("#eduexpEntranceExaminationspan").css("display", "none");
});
// 学历校验
$("#diplomas").change(function() {
	if ($("#diplomas option:selected").val() > 0) {
		$("#diplomasspan").css("display", "none");
	}
});
// 在校时间校验
$('#eduExpEnGr').change(
		function() {
			if ($('#eduExpEnGr select:eq(0)').val() == 0
					|| $('#eduExpEnGr select:eq(1)').val() == 0) {
				$("#eduExpEnGrspan1").css("display", "block");
			} else {
				$("#eduExpEnGrspan1").css("display", "none");
			}

			if ($('#eduExpEnGr select:eq(0)').val() != 0
					&& $('#eduExpEnGr select:eq(2)').val() != 0
					&& $('#eduExpEnGr select:eq(0)').val()*1 > $(
							'#eduExpEnGr select:eq(2)').val()*1) {
				$("#eduExpEnGrspan2").css("display", "block");
			} else if ($('#eduExpEnGr select:eq(0)').val() != 0
					&& $('#eduExpEnGr select:eq(1)').val() != 0
					&& $('#eduExpEnGr select:eq(2)').val() != 0
					&& $('#eduExpEnGr select:eq(3)').val() != 0
					&& $('#eduExpEnGr select:eq(0)').val() == $(
							'#eduExpEnGr select:eq(2)').val()
					&& $('#eduExpEnGr select:eq(1)').val()*1 > $(
							'#eduExpEnGr select:eq(3)').val()*1) {
				$("#eduExpEnGrspan2").css("display", "block");
			} else {
				$("#eduExpEnGrspan2").css("display", "none");
			}
		});
// 跳转到创建教育表,获取信息保存
function saveEduExpInfo() {
	EduexpInfo.eduexpCostId = $("#costId").val().trim();
	EduexpInfo.eduexpMore = $("#eduexpMore").val().trim();
	// 获得入学时间年月 毕业时间年月
	EduexpInfo.eduEnrolledyear = $('#eduExpEnGr select:eq(0)').val();
	EduexpInfo.eduEnrolledmonth = $('#eduExpEnGr select:eq(1)').val();
	EduexpInfo.eduGraduateyear = $('#eduExpEnGr select:eq(2)').val();
	EduexpInfo.eduGraduatemonth = $('#eduExpEnGr select:eq(3)').val();
	EduexpInfo.eduexpEduId = $("#diplomas option:selected").val();
	EduexpInfo.eduexpStuId = personalBaseInfo.stuId;
	var urlHref = window.location.href;
	var guid = urlHref.split("#")[1];
	// 所在地
	var province = $('#eduExpPlace select:eq(0)').val();
	var city = $('#eduExpPlace select:eq(1)').val();
	var district = $('#eduExpPlace select:eq(2)').val();
	if (city == "") {
		district = province;
	} else if (district == "") {
		district = city;
	}
	for ( var i in ChineseDistricts) {
		for ( var j in ChineseDistricts[i]) {
			if (ChineseDistricts[i][j] == district) {
				j = parseInt(j);
				EduexpInfo.eduexpLocId = j;
				break;
			}
		}
	}
	EduexpInfo.eduexpEnrolled = ("" + EduexpInfo.eduEnrolledyear + "/"
			+ EduexpInfo.eduEnrolledmonth + "/01").trim();
	if ($('#eduExpEnGr select:eq(2)').val() == 0) {
		EduexpInfo.eduexpGraduate = undefined;
	} else {
		EduexpInfo.eduexpGraduate = ("" + EduexpInfo.eduGraduateyear + "/"
				+ EduexpInfo.eduGraduatemonth + "/01").trim();
	}
	$.ajax({
		url : homeUrl + 'eduexp/saveEduExpInfo?guid=' + guid,
		async : false, // 改成同步
		data : EduexpInfo,
		type : 'post',
		success : function(date) {
			var jsonMap = JSON.parse(date);
			if (jsonMap.code == 200) {
				alert("保存成功");
				getEduExpInfo();
				$('#eduEdit').css('display', 'none');
				$('#eduPreview').css('display', 'block');
			} else if (jsonMap.code == 301) {
				alert("您为非法用户");
				window.location.href = homeUrl + 'stu/safe';
			} else if (jsonMap.code == 302) {
				alert("您停留时间过长");
				window.location.href = homeUrl + 'stu/safe';
			} else {
				alert("保存失败");
			}
		},
		error : function() {
			alert("访问服务器失败！");
		},
	})
}
// 修改教育经历信息
function updateEduExpInfo() {
	EduexpInfo.eduexpEduId = $("#diplomas option:selected").val();
	EduexpInfo.eduexpCostId = $("#costId").val().trim();
	EduexpInfo.eduexpMore = $("#eduexpMore").val().trim();
	// parseInt()
	// EduexpInfo.eduEnrolledyear=$("#eduEnrolledyear option:selected").val();
	// EduexpInfo.eduEnrolledmonth=$("#eduEnrolledmonth option:selected").val();
	// EduexpInfo.eduGraduateyear=$("#eduGraduateyear option:selected").val();
	// EduexpInfo.eduGraduatemonth=$("#eduGraduatemonth option:selected").val();
	// 获得入学时间年月 毕业时间年月
	EduexpInfo.eduEnrolledyear = $('#eduExpEnGr select:eq(0)').val();
	EduexpInfo.eduEnrolledmonth = $('#eduExpEnGr select:eq(1)').val();
	EduexpInfo.eduGraduateyear = $('#eduExpEnGr select:eq(2)').val();
	EduexpInfo.eduGraduatemonth = $('#eduExpEnGr select:eq(3)').val();
	// 所在地
	var province = $('#eduExpPlace select:eq(0)').val();
	var city = $('#eduExpPlace select:eq(1)').val();
	var district = $('#eduExpPlace select:eq(2)').val();
	if (city == "") {
		district = province;
	} else if (district == "") {
		district = city;
	}
	for ( var i in ChineseDistricts) {
		for ( var j in ChineseDistricts[i]) {
			if (ChineseDistricts[i][j] == district) {
				j = parseInt(j);
				EduexpInfo.eduexpLocId = j;
				break;
			}
		}
	}
	EduexpInfo.eduexpStuId = personalBaseInfo.stuId;
	var urlHref = window.location.href;
	var guid = urlHref.split("#")[1];
	EduexpInfo.eduexpEnrolled = ("" + EduexpInfo.eduEnrolledyear + "/"
			+ EduexpInfo.eduEnrolledmonth + "/01").trim();
	if ($('#eduExpEnGr select:eq(2)').val() == 0) {
		EduexpInfo.eduexpGraduate = undefined;
	} else {
		EduexpInfo.eduexpGraduate = ("" + EduexpInfo.eduGraduateyear + "/"
				+ EduexpInfo.eduGraduatemonth + "/01").trim();
	}
	$.ajax({
		url : homeUrl + 'eduexp/updateEduExpInfo?guid=' + guid,
		async : false, // 改成同步
		data : EduexpInfo,
		type : 'post',
		success : function(date) {
			var jsonMap = JSON.parse(date);
			if (jsonMap.code == 200) {
				alert("修改成功");
				getEduExpInfo();
				$('#eduEdit').css('display', 'none');
				$('#eduPreview').css('display', 'block');
			} else if (jsonMap.code == 301) {
				alert("您为非法用户");
				window.location.href = homeUrl + 'stu/safe';
			} else if (jsonMap.code == 302) {
				alert("您停留时间过长");
				window.location.href = homeUrl + 'stu/safe';
			} else {
				alert("修改失败");
			}
		},
		error : function() {
			alert("访问服务器失败！");
		},
	})
}
// 左侧导航点击获得教育经历信息
$(nav_li[2]).click(function() {
	getEduExpInfo();
});