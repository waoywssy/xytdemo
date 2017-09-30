/**
 * 工作经历模块
 */
// -------------------------------------工作经历栏-------------------------------------------
var ExpInfo = {
/*
 * "expId":"",//主键integer "expStuId":"",//学生表主键integer "expCompany":"",//公司名称
 * "expEntried":"",//入职时间 "expQuited":"",//离职时间
 * "expType":"",//工作类型，全职/兼职/实习/其他（多选）Integer "department":"",//部门
 * "expPosition":"",//职位名 "expIndId":"",//Integer所在行业 "expDescription":"",//工作描述
 * 2000字以内 "expDuty":"",//职位 "expLocId":"",//工作地点主键（获取工作地点）Integer
 */};
// 工作经历查询事件
function getExpInfo() {
	var expStuId = personalBaseInfo.stuId;
	var urlHref = window.location.href;
	var guid = urlHref.split("#")[1];
	$.ajax({
		url : homeUrl + 'exp/getExpInfo',
		async : false,
		data : {
			"expStuId":expStuId,
			"guid" : guid,
		},
		type : 'post',
		success : function(data) {
			var josnMap = JSON.parse(data);
			if (josnMap.code == 301) {
				alert("您为非法用户！");
				window.location.href = homeUrl + "stu/safe";
			} else if (josnMap.code == 302) {
				alert("您停留时间过长！");
				window.location.href = homeUrl + "stu/safe";
			} else if (josnMap.code == 200) {
				var list = josnMap.data;
				if (list.length > 0) {
					$("#jobExpPreview div:first").empty();
					for (var i = 0; i < list.length; i++) {
						var experienceExp = list[i];
						createJobExpDiv(experienceExp);
					}
				}
			} else if (josnMap.code == 400) {
				createJodForDelete();
			}
		},
		error : function() {
			alert(111111);
			alert("访问服务器失败！");
		},
	});
}
// 左侧导航点击
$('#getExpInfo').click(getExpInfo);

function createJobExpDiv(experienceExp) {
	var Entried = experienceExp.expEntried.split(",");
	var EntriedYear = Entried[1];
	experienceExp.EntriedYear = EntriedYear;
	var EntriedMonth = Month(Entried[0].split(" ")[0]);
	experienceExp.EntriedMonth = EntriedMonth;
	var Quited = experienceExp.expQuited.split(",");
	var QuitedYear = Quited[1];
	experienceExp.QuitedYear = QuitedYear;
	var QuitedMonth = Month(Quited[0].split(" ")[0]);
	experienceExp.QuitedMonth = QuitedMonth;
	// 工作地点
	if (experienceExp.expLocId == 0||experienceExp.expLocId == null||experienceExp.expLocId == ""){
		
	}else{
		var province10 = parseInt((experienceExp.expLocId + "").substring(0, 3)
				+ "0000000000000");
		var expLoc = ChineseDistricts[1000000000000000][province10];
		experienceExp.province = ChineseDistricts[1000000000000000][province10];
		var city10 = (experienceExp.expLocId + "").substring(3, 5);
		var district10 = (experienceExp.expLocId + "").substring(5, 7);
		if (city10 != "00") {
			var city10 = parseInt((experienceExp.expLocId + "").substring(0, 5)
					+ "00000000000");
			expLoc += "-" + ChineseDistricts[province10][city10];
			experienceExp.city = ChineseDistricts[province10][city10];
		}
		if (district10 != "00") {
			expLoc += "-" + ChineseDistricts[city10][experienceExp.expLocId];
			experienceExp.district = ChineseDistricts[city10][experienceExp.expLocId];
		}
	}
	// 转换工作类型
	var jobType = Wrktyp_a[experienceExp.expType];
	// 行业转换显示
	if (experienceExp.expIndId == 0||experienceExp.expIndId == null||experienceExp.expIndId == "") {
	} else {
		experienceExp.expIndIdfirst = parseInt((experienceExp.expIndId + "")
				.substring(0, 4)
				+ "000000000");
		var expIndIdfirstpreview = industry[1000000000000][experienceExp.expIndIdfirst];
		var expIndIdSecondpreview = industry[experienceExp.expIndIdfirst][experienceExp.expIndId];
		var expIndIdpreview = expIndIdfirstpreview + "--/"
				+ expIndIdSecondpreview;
	}
	// 职业转换显示
	if (experienceExp.expDuty == 0||experienceExp.expDuty == null||experienceExp.expDuty == ""){
	}else{
		experienceExp.expDutyfirst = parseInt((experienceExp.expDuty + "")
				.substring(0, 4)
				+ "000000000");
		var expDutyfirstpreview = industry[1000000000000][experienceExp.expDutyfirst];
		experienceExp.expDutysecond = parseInt((experienceExp.expDuty + "")
				.substring(0, 7)
				+ "000000");
		var expDutysecondpreview = industry[experienceExp.expDutyfirst][experienceExp.expDutysecond];
		experienceExp.expDutythrid = parseInt((experienceExp.expDuty + "")
				.substring(0, 10)
				+ "000");
		var expDutythridpreview = industry[experienceExp.expDutysecond][experienceExp.expDutythrid];
		if (experienceExp.expDutythrid != experienceExp.expDuty) {
			expDutythridpreview += "--/"
					+ industry[experienceExp.expDutythrid][experienceExp.expDuty];
		}
	}
	// expDutythridpreview+="--/"+industry[experienceExp.expDutythrid][experienceExp.expDuty];
	// console.log(industry[experienceExp.expDutythrid][experienceExp.expDuty]);
	// 转换json数组
	var jsonString = JSON.stringify(experienceExp);
	$("#jobExpPreview div:first")
			.append(
					"<div id='exp"
							+ experienceExp.expId
							+ "'><div class = 'click_to_ed'><span onclick='toEdiJobExp("
							+ jsonString
							+ ")'>点此编辑</span><div class='editBtn'/></div><ul class='list-unstyled'>"
							+ "<li><label class='pre_label'>工作时间</label>:<span>"
							+ EntriedYear
							+ "</sapn>年<span>"
							+ EntriedMonth
							+ "</sapn>月   至  <span>"
							+ QuitedYear
							+ "</sapn>年<span>"
							+ QuitedMonth
							+ "</sapn>月</li>"
							+ "<li id='expLocId_showid"
							+ experienceExp.expId
							+ "'><label class='pre_label'>工作地点</label>:<span>"
							+ expLoc
							+ "</sapn></li>"
							+ "<li><label class='pre_label'>公司</label>:<span>"
							+ experienceExp.expCompany
							+ "</sapn></li>"
							+ "<li id='pre_label"
							+ experienceExp.expId
							+ "'><label class='pre_label'>部门</label>:<span>"
							+ experienceExp.department
							+ "</sapn></li>"
							+ "<li id='jobType_showid"
							+ experienceExp.expId
							+ "'><label class='pre_label'>工作类型</label>:<span>"
							+ jobType
							+ "</sapn></li>"
							+ "<li><label class='pre_label'>职位名</label>:<span>"
							+ experienceExp.expPosition
							+ "</sapn></li>"
							+ "<li id='expIndId_showid"
							+ experienceExp.expId
							+ "'><label class='pre_label'>工作行业</label>:<span>"
							+ expIndIdpreview
							+ "</sapn></li>"
							+ "<li id='expDuty_showid"
							+ experienceExp.expId
							+ "'><label class='pre_label'>工作职业</label>:<span>"
							+ expDutythridpreview
							+ "</sapn></li>"
							+ "<li id='expDescription_showid"
							+ experienceExp.expId
							+ "'><label class='pre_label'>工作内容</label>:<span>"
							+ experienceExp.expDescription
							+ "</sapn></li></ul>"
							+ " <div class='delete'>"
							+ " <a class='delete_btn' title='点击删除该列' onclick='delete_jobExp("
							+ experienceExp.expId + ");'></a>"
							+ "<div class='clear'></div>" + "</div>" + "</div>");
	// 是否隐藏部门
	if (experienceExp.department == null || experienceExp.department == "") {
		$("#pre_label" + experienceExp.expId + "").css("display", "none");
	}
	// 是否隐藏内容
	if (experienceExp.expDescription == null
			|| experienceExp.expDescription == "") {
		$("#expDescription_showid" + experienceExp.expId + "").css("display",
				"none");
	}
	// 是否隐藏工作类型
	if (experienceExp.expIndId == 0||experienceExp.expIndId == null||experienceExp.expIndId == "") {
		$("#jobType_showid" + experienceExp.expId + "").css("display", "none");
	}
	// 是否隐藏行业
	if (experienceExp.expIndId == 0||experienceExp.expIndId == null||experienceExp.expIndId == "") {
		$("#expIndId_showid" + experienceExp.expId + "").css("display", "none");
	}
	// 是否隐藏行业
	if (experienceExp.expDuty == 0||experienceExp.expDuty == null||experienceExp.expDuty == "") {
		$("#expDuty_showid" + experienceExp.expId + "").css("display", "none");
	}
	// 是否隐藏地域
	if (experienceExp.expLocId == 0||experienceExp.expLocId == null||experienceExp.expLocId == "") {
		$("#expLocId_showid" + experienceExp.expId + "").css("display", "none");
	}
}
// 解决删除最后一条经历的方法
function createJodForDelete() {
	$("#jobExpPreview div:first").empty();
	$("#jobExpPreview div:first")
			.append(
					"<div id='exp"
							+ "'><div class = 'click_to_ed'><span onclick='add_jobExp("
							+ ")'>点此编辑</span><div class='editBtn'/></div><ul class='list-unstyled'>"
							+ "<li><label class='pre_label'>工作时间</label>:<span>"
							+ "某"
							+ "</sapn>年<span>"
							+ "某"
							+ "</sapn>月   至  <span>"
							+ "某"
							+ "</sapn>年<span>"
							+ "某"
							+ "</sapn>月</li>"
							+ "<li><label class='pre_label'>工作地点</label>:<span>"
							+ "未填写"
							+ "</sapn></li>"
							+ "<li><label class='pre_label'>公司</label>:<span>"
							+ "未填写"
							+ "</sapn></li>"
							+ "<li><label class='pre_label'>部门</label>:<span>"
							+ "未填写"
							+ "</sapn></li>"
							+ "<li><label class='pre_label'>工作类型</label>:<span>"
							+ "未填写"
							+ "</sapn></li>"
							+ "<li><label class='pre_label'>职位名</label>:<span>"
							+ "未填写"
							+ "</sapn></li>"
							+ "<li><label class='pre_label'>工作行业</label>:<span>"
							+ "未填写"
							+ "</sapn></li>"
							+ "<li><label class='pre_label'>工作职业</label>:<span>"
							+ "未填写"
							+ "</sapn></li>"
							+ "<li><label class='pre_label'>工作内容</label>:<span>"
							+ "未填写" + "</sapn></li></ul>"
							+ "<div class='clear'></div>" + "</div>" + "</div>");
}
// 工作经历点击编辑按钮事件
function toEdiJobExp(ExpInfo) {
	$('#jobExpEdit').css('display', 'block');
	$('#jobExpPreview').css('display', 'none');
	// preToEdit();
	// console.log(ExpInfo.EntriedYear);
	// 根据值让option选中,得到对应的年月
	$("#expEntriedYear").val(ExpInfo.EntriedYear.trim());
	$("#expEntriedYear").change();
	$("#expEntriedMonth").val(Month(ExpInfo.EntriedMonth));
	$("#expEntriedMonth").change();
	$("#expQuitedYear").val(ExpInfo.QuitedYear.trim());
	$("#expQuitedYear").change();
	$("#expQuitedMonth").val(Month(ExpInfo.QuitedMonth));
	$("#expQuitedMonth").change();
	// 所在地
	$("#expProvince10").val(ExpInfo.province);
	$("#expProvince10").change();
	if (ExpInfo.city != "") {
		$("#expCity10").val(ExpInfo.city);
		$("#expCity10").change();
	}
	if (ExpInfo.district != "") {
		$("#expDistrict10").val(ExpInfo.district);
		$("#expDdistrict10").change();
	}
	// 行业
	// "expDuty" : "",// 工作职位
	// "expDutyfirst":"",//职位第一级//工作职位所用的js前台数据传输
	// "expDutysecond":"",//职位第二级//工作职位所用的js前台数据传输
	// "expDutythrid":"",//职位第三级//工作职位所用的js前台数据传输
	// "expIndId" : "",// 工作行业主键（获取工作行业）Integer
	// "expIndIdfirst":"",//行业第一级//工作职位所用的js前台数据传输
	expIndustry1(1000000000000);
	$("#expIndustry1").val(ExpInfo.expIndIdfirst);
	expIndustry2(ExpInfo.expIndIdfirst);
	$("#expIndustry2").val(ExpInfo.expIndId);
	$("#expIndustry2").change();
	// 所在职业
	expfunction1(1000000000000);
	$("#expfunction1").val(ExpInfo.expDutyfirst);
	expfunction2(ExpInfo.expDutyfirst);
	$("#expfunction2").val(ExpInfo.expDutysecond);
	expfunction3(ExpInfo.expDutysecond);
	$("#expfunction3").val(ExpInfo.expDutythrid);
	$("#expfunction3").change();
	if (ExpInfo.expDutythrid == ExpInfo.expDuty) {
	} else {
		expfunction4(ExpInfo.expDutythrid);
		$("#expfunction4").val(ExpInfo.expDuty);
	}
	$("#expCompany").val(ExpInfo.expCompany);
	$("#department").val(ExpInfo.department);
	$("#expTitle").val(ExpInfo.expPosition);
	wrktyp_getoption();
	$("#expJobType option[value='" + ExpInfo.expType + "']").attr("selected",
			"selected");
	$("#expJobType").change();
	$("#expDescription").val(ExpInfo.expDescription);
	$("#expId").attr("value", ExpInfo.expId);
	$("#descriptionSystemA").css("display", "none");
	$("#companySystem").css("display", "none");
	$("#expTitleSystem").css("display", "none");
	$("#expTitleSystemB").css("display", "none");
}
// 添加工作经历
function add_jobExp() {
	$('#jobExpEdit').css('display', 'block');
	$('#jobExpPreview').css('display', 'none');

	$("#expEntriedYear").val(0);
	$("#expEntriedYear").change();
	$("#expQuitedYear").val(0);
	$("#expQuitedYear").change();
	$("#expProvince10").val('');
	$("#expProvince10").change();
	$("#expCity10").val('');
	$("#expCity10").change();
	$("#expDistrict10").val('');
	$("#expDistrict10").change();
	$("#expCompany").val('');
	$("#expCompany").change();
	$("#department").val('');
	$("#expJobType").val(0);
	$("#expJobType").change();
	$("#expTitle").val('');
	$("#expTitle").change();
	$("#expIndustry1").val('');
	$("#expIndustry1").change();
	$("#expIndustry2").val('');
	$("#expIndustry2").change();
	$("#expfunction1").val('');
	$("#expfunction1").change();
	$("#expfunction2").val('');
	$("#expfunction2").change();
	$("#expfunction3").val('');
	$("#expfunction3").change();
	$("#expfunction4").val('');
	$("#expfunction4").change();
	$("#expDescription").val('');
	$("#expDescription").change();
	$("#expId").attr("value", 0);
	$("#expTimeSystemA").css("display", "none");
	$("#jobExpPlaceSystem").css("display", "none");
	$("#expIndustry2span").css("display", "none");
	$("#expfunction4span").css("display", "none");
	$("#expJobTypeSystem").css("display", "none");
	$("#descriptionSystemA").css("display", "none");
	$("#companySystem").css("display", "none");
	$("#expTitleSystem").css("display", "none");
	$("#expTitleSystemB").css("display", "none");
}
// 工作经历信息创建和修改编辑后的保存
function expSaveBtn() {
	if ($('#expTime select:eq(0)').val() == 0
			|| $('#expTime select:eq(1)').val() == 0
			|| $('#expTime select:eq(2)').val() == 0
			|| $('#expTime select:eq(3)').val() == 0) {
		$("#expTimeSystemA").css("display", "block");
	} else if ($('#expTime select:eq(0)').val() != 0
			&& $('#expTime select:eq(2)').val() != 0
			&& $('#expTime select:eq(0)').val() > $('#expTime select:eq(2)')
					.val()) {
		$("#expTimeSystemB").css("display", "block");
	} else if ($('#expTime select:eq(0)').val() != 0
			&& $('#expTime select:eq(1)').val() != 0
			&& $('#expTime select:eq(2)').val() != 0
			&& $('#expTime select:eq(3)').val() != 0
			&& $('#expTime select:eq(0)').val() == $('#expTime select:eq(2)')
					.val()
			&& parseInt($('#expTime select:eq(1)').val()) > parseInt($(
					'#expTime select:eq(3)').val())) {
		$("#expTimeSystemB").css("display", "block");
	} /*else if ($("#jobExpPlace select:eq(0)").val() == "") {
		$("#jobExpPlaceSystem").css("display", "block");
	} */else if ($("#expCompany").val().trim() == null
			|| $("#expCompany").val().trim() == "") {
		$("#companySystem").css("display", "block");
	} /*
		 * else if ($("#expJobType").val() == 0 || $("#expJobType").val() == "" ||
		 * $("#expJobType").val() == null) {
		 * $("#expJobTypeSystem").css("display", "block"); }
		 */else if ($("#expTitle").val().trim() == null
			|| $("#expTitle").val().trim() == "") {
		$("#expTitleSystem").css("display", "block");
	} /*
		 * else if ($("#expIndustry2").val() == "" || $("#expIndustry2").val() ==
		 * 0 || $("#expIndustry2").val() == null) {
		 * $("#expIndustry2span").css("display", "block");// 验证行业 } else if
		 * ($("#expfunction3").val() == "" || $("#expfunction3").val() == 0 ||
		 * $("#expfunction3").val() == null) {
		 * $("#expfunction4span").css("display", "block");// 验证职业 } else if
		 * ($("#expDescription").val().trim() == "" ||
		 * $("#expDescription").val().trim() == null) {
		 * $("#descriptionSystemA").css("display", "block"); }
		 */else if ($("#expDescription").val().trim().length > 2000) {
		$("#descriptionSystemB").css("display", "block");
	} else if (!checkexpTitle($('#expTitle').val())) {// 职位名格式

	} else {
		var expId = $("#expId").val();
		if (expId != "" && expId > 0) {
			ExpInfo.expId = expId;
			updateExpInfo();
		} else {
			saveExpInfo();
		}
	}
}
// 创建工作经历
function saveExpInfo() {
	// 获得公司名称
	ExpInfo.expCompany = $("#expCompany").val().trim();
	// 获得部门
	ExpInfo.department = $("#department").val().trim();
	// 获得职位名
	ExpInfo.expPosition = $("#expTitle").val().trim();
	// 获得工作内容
	ExpInfo.expDescription = $("#expDescription").val().trim();
	// 获得工作类型
	ExpInfo.expType = $("#expJobType option:selected").val();
	// 获得行业
	ExpInfo.expIndId = $("#expIndustry2").val();
	// 获得职业
	if ($("#expfunction4").val() == 0 || $("#expfunction4").val() == ""
			|| $("#expfunction4").val() == null) {
		ExpInfo.expDuty = $("#expfunction3").val();
	} else {
		ExpInfo.expDuty = $("#expfunction4").val();
	}
	/*
	 * 获得入职时间年月 离职时间年月
	 */
	var expEntriedYear = $('#expTime select:eq(0)').val();
	var expEntriedMonth = $('#expTime select:eq(1)').val();
	var expQuitedYear = $('#expTime select:eq(2)').val();
	var expQuitedMonth = $('#expTime select:eq(3)').val();
	ExpInfo.expStuId = personalBaseInfo.stuId;
	// 获得工作地点
	var province = $('#jobExpPlace select:eq(0)').val();
	var city = $('#jobExpPlace select:eq(1)').val();
	var district = $('#jobExpPlace select:eq(2)').val();
	if (city == "") {
		district = province;
	} else if (district == "") {
		district = city;
	}
	for ( var i in ChineseDistricts) {
		if (ChineseDistricts[i]) {
			for ( var j in ChineseDistricts[i]) {
				if (ChineseDistricts[i][j] == district) {
					j = parseInt(j);
					ExpInfo.expLocId = j;
					break;
				}
			}
		} else {
			ExpInfo.expLocId = i;
		}
	}
	ExpInfo.expEntried = ("" + expEntriedYear + "/" + expEntriedMonth + "/01")
			.trim();
	ExpInfo.expQuited = ("" + expQuitedYear + "/" + expQuitedMonth + "/01")
			.trim();
	var urlHref = window.location.href;
	var guid = urlHref.split("#")[1];
	$.ajax({
		url : homeUrl + 'exp/saveExpInfo?guid=' + guid,
		async : false, // 改成同步
		data : ExpInfo,
		type : 'post',
		success : function(data) {
			var jsonMap = JSON.parse(data);
			if (jsonMap.code == 200) {
				alert("保存成功");
				getExpInfo();
				$('#jobExpEdit').css('display', 'none');
				$('#jobExpPreview').css('display', 'block');
			} else if (jsonMap.code == 301) {
				alert("您为非法用户！");
				window.location.href = homeUrl + "stu/safe";
			} else if (jsonMap.code == 302) {
				alert("您停留时间过长！");
				window.location.href = homeUrl + "stu/safe";
			}
		},
		error : function() {
			alert("访问服务器失败！");
		},
	});
}
// 删除工作经历
function delete_jobExp(expId) {
	var expStuId = personalBaseInfo.stuId;
	var urlHref = window.location.href;
	var guid = urlHref.split("#")[1];
	if (confirm("确定要删除吗？")) {
		$.ajax({
			url : homeUrl + 'exp/deleteExpInfo',
			async : false,
			data : {
				"expId" : expId,
				"expStuId" : expStuId,
				"guid" : guid,
			},
			type : 'post',
			success : function(data) {
				var jsonMap = JSON.parse(data);
				if (jsonMap.code == 301) {
					alert("您为非法用户！");
					window.location.href = homeUrl + "stu/safe";
				} else if (jsonMap.code == 302) {
					alert("您停留时间过长！");
					window.location.href = homeUrl + "stu/safe";
				} else if (jsonMap.code == 200) {
					alert("删除成功");
					getExpInfo();
				} else if (jsonMap.code == 398) {
					alert("传值错误");
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
// 将月份的（中文改成数字）
function Month(month) {
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
		break
	}
	return month;
}
// 修改工作经历
function updateExpInfo() {
	// 获得公司名称
	ExpInfo.expCompany = $("#expCompany").val().trim();
	// 获得部门
	ExpInfo.department = $("#department").val().trim();
	// 获得职位名
	ExpInfo.expPosition = $("#expTitle").val().trim();
	// 获得公司内容
	ExpInfo.expDescription = $("#expDescription").val().trim();
	// 获得工作类型
	ExpInfo.expType = $("#expJobType option:selected").val();
	// 获得行业
	ExpInfo.expIndId = $("#expIndustry2").val();
	// 获得职业
	if ($("#expfunction4").val() == 0 || $("#expfunction4").val() == ""
			|| $("#expfunction4").val() == null) {
		ExpInfo.expDuty = $("#expfunction3").val();
	} else {
		ExpInfo.expDuty = $("#expfunction4").val();
	}
	/*
	 * 获得入职时间年月 离职时间年月
	 */
	ExpInfo.expEntriedYear = $('#expTime select:eq(0)').val();
	ExpInfo.expEntriedMonth = $('#expTime select:eq(1)').val();
	ExpInfo.expQuitedYear = $('#expTime select:eq(2)').val();
	ExpInfo.expQuitedMonth = $('#expTime select:eq(3)').val();
	ExpInfo.expStuId = personalBaseInfo.stuId;
	// 获得工作地点
	var province = $('#jobExpPlace select:eq(0)').val();
	var city = $('#jobExpPlace select:eq(1)').val();
	var district = $('#jobExpPlace select:eq(2)').val();
	if (city == "") {
		district = province;
	} else if (district == "") {
		district = city;
	}
	for ( var i in ChineseDistricts) {
		if (ChineseDistricts[i]) {
			for ( var j in ChineseDistricts[i]) {
				if (ChineseDistricts[i][j] == district) {
					j = parseInt(j);
					ExpInfo.expLocId = j;
					break;
				}
			}
		} else {
			ExpInfo.expLocId = i;
		}
	}
	ExpInfo.expEntried = ("" + ExpInfo.expEntriedYear + "/"
			+ ExpInfo.expEntriedMonth + "/01").trim();
	ExpInfo.expQuited = ("" + ExpInfo.expQuitedYear + "/"
			+ ExpInfo.expQuitedMonth + "/01").trim();
	var urlHref = window.location.href;
	var guid = urlHref.split("#")[1];
	$.ajax({
		url : homeUrl + 'exp/updateExpInfo?guid=' + guid,
		async : false, // 改成同步
		data : ExpInfo,
		type : 'post',
		success : function(data) {
			var jsonMap = JSON.parse(data);
			if (jsonMap.code == 200) {
				alert("修改成功");
				getExpInfo();
				$('#jobExpEdit').css('display', 'none');
				$('#jobExpPreview').css('display', 'block');
			} else if (jsonMap.code == 301) {
				alert("您为非法用户！");
				window.location.href = homeUrl + "stu/safe";
			} else if (jsonMap.code == 302) {
				alert("您停留时间过长！");
				window.location.href = homeUrl + "stu/safe";
			}
		},
		error : function() {
			alert("访问服务器失败！");
		},
	})
}
$('#expTime').change(
		function() {
			if ($('#expTime select:eq(0)').val() != 0
					|| $('#expTime select:eq(1)').val() != 0
					|| $('#expTime select:eq(2)').val() != 0
					|| $('#expTime select:eq(3)').val() != 0) {
				$("#expTimeSystemA").css("display", "none");
			}

			if ($('#expTime select:eq(0)').val() < $('#expTime select:eq(2)')
					.val()) {
				$("#expTimeSystemB").css("display", "none");
			} else if ($('#expTime select:eq(0)').val() == $(
					'#expTime select:eq(2)').val()
					&& $('#expTime select:eq(1)').val() < $(
							'#expTime select:eq(3)').val()) {
				$("#expTimeSystemB").css("display", "none");
			}
		});
// 工作时间验证
$('#expTime').change(
		function() {
			if ($('#expTime select:eq(0)').val() == 0
					|| $('#expTime select:eq(1)').val() == 0
					|| $('#expTime select:eq(2)').val() == 0
					|| $('#expTime select:eq(3)').val() == 0) {
				$("#expTimeSystemA").css("display", "block");
			} else {
				$("#expTimeSystemA").css("display", "none");
			}
			if ($('#expTime select:eq(0)').val() != 0
					&& $('#expTime select:eq(2)').val() != 0
					&& $('#expTime select:eq(0)').val() > $(
							'#expTime select:eq(2)').val()) {
				$("#expTimeSystemB").css("display", "block");
			} else if ($('#expTime select:eq(0)').val() != 0
					&& $('#expTime select:eq(1)').val() != 0
					&& $('#expTime select:eq(2)').val() != 0
					&& $('#expTime select:eq(3)').val() != 0
					&& $('#expTime select:eq(0)').val() == $(
							'#expTime select:eq(2)').val()
					&& parseInt($('#expTime select:eq(1)').val()) > parseInt($(
							'#expTime select:eq(3)').val())) {
				$("#expTimeSystemB").css("display", "block");
			} else {
				$("#expTimeSystemB").css("display", "none");
			}
		});
/*// 工作地点验证
$("#jobExpPlace").change(function() {
	if ($("#jobExpPlace select:eq(0)").val() != "") {
		$("#jobExpPlaceSystem").css("display", "none");
	} else {
		$("#jobExpPlaceSystem").css("display", "block");
	}
});*/
/*
 * // 行业验证 $("#expIndustry2").change( function() { if ($("#expIndustry2").val() == "" ||
 * $("#expIndustry2").val() == 0 || $("#expIndustry2").val() == null) {
 * $("#expIndustry2span").css("display", "block"); } else {
 * $("#expIndustry2span").css("display", "none"); } });
 */

/*
 * // 职业验证 $("#expfunction3").change( function() { if ($("#expfunction3").val() == "" ||
 * $("#expfunction3").val() == 0 || $("#expfunction3").val() == null) {
 * $("#expfunction4span").css("display", "block"); } else {
 * $("#expfunction4span").css("display", "none"); } });
 */
/*
 * // 工作类型验证 $("#expJobType").change( function() { if ($("#expJobType").val() ==
 * 0 || $("#expJobType").val() == "" || $("#expJobType").val() == null) {
 * $("#expJobTypeSystem").css("display", "block"); } else {
 * $("#expJobTypeSystem").css("display", "none"); } });
 */
// 公司验证
$("#expCompany").bind(
		' input propertychange ',
		function() {
			if ($("#expCompany").val().trim() == ""
					|| $("#expCompany").val().trim() == null) {
				$("#companySystem").css("display", "block");
			} else {
				$("#companySystem").css("display", "none");
			}
		});

// 纯汉字输入
function checkexpTitle(expTitle) {
	var flag = true;
	var expTitle = $("#expTitle").val();
	var valid = +/^[\u4e00-\u9fa5a-zA-Z]{2,20}$/.test(expTitle);
	if (valid) {
	} else {
		return false;
	}
	return flag;
}
// 职位名验证
$("#expTitle").bind(
		' input propertychange ',
		function() {
			var expTitle = $("#expTitle").val();
			var valid = +/^[\u4e00-\u9fa5a-zA-Z]{2,20}$/.test(expTitle);
			if ($("#expTitle").val().trim() == ""
					|| $("#expTitle").val().trim() == null) {
				$("#expTitleSystem").css("display", "block");
			} else {
				$("#expTitleSystem").css("display", "none");
			}
			if (valid) {
				$("#expTitleSystemB").css("display", "none");
			} else {
				$("#expTitleSystemB").css("display", "block");
			}
		});

// 工作内容验证
$("#expDescription").bind(' input propertychange ', function() {
	/*
	 * if ($("#expDescription").val().trim() == "" ||
	 * $("#expDescription").val().trim() == null) {
	 * $("#descriptionSystemA").css("display", "block"); } else {
	 * $("#descriptionSystemA").css("display", "none"); }
	 */
	if ($("#expDescription").val().trim().length > 2000) {
		$("#descriptionSystemB").css("display", "block");
	} else {
		$("#descriptionSystemB").css("display", "none");
	}
});
