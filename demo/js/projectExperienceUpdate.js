var pageProjectExp = {
	"proexpId" : "",// 项目经验主键
	"proexpStuId" : "",// 学生表主键
	"proexpName" : "",// 项目名称
	"proexpComname" : "",// 公司名称
	"proexpStartYear" : "",// 项目开始年
	"proexpStartMonth" : "",// 项目开始月
	"proexpEndYear" : "",// 项目结束时间
	"proexpEndMonth" : "",// 项目结束月
	"proexpDuty" : "",// 项目职责
	"proexpDescription" : "",// 项目描述
}
var projectExperience = {
	"proexpId" : "",// 项目经验主键
	"proexpStuId" : "",// 学生表主键
	"proexpName" : "",// 项目名称
	"proexpComname" : "",// 公司名称
	"proexpStratTime" : "",// 项目开始时间
	"proexpEndTime" : "",// 项目结束时间
	"proexpDuty" : "",// 项目职责
	"proexpDescription" : "",// 项目描述
}

function getProjectExperience() {
	var sstuId=personalBaseInfo.stuId;
	var urlHref = window.location.href;
	var guid = urlHref.split("#")[1];
	$.ajax({
				url : homeUrl+'StudentsProjectExperience/getproExpInfo',
				async : false,
				data : {
					"stuId" : sstuId,
					"guid" : guid,
				},
				type : 'post',
				success : function(data) {
					var json= JSON.parse(data);
					if (json.code == 200) {
						var list = json.data;
						if (list.length > 0) {
							$('#proExpPreview_id div:first').empty();
							for (var i = 0; i < list.length; i++) {
								projectExperience = list[i];
								createFirstDiv(projectExperience);
							}
						}
					}else if(json.code==301){
						alert("您为非法用户");
		        		window.location.href=homeUrl+'stu/safe'; 
					}else if(json.code==302){
		        		alert("您停留时间过长");
		        		window.location.href=homeUrl+'stu/safe'; 
		            }
					else if(json.code==404){
						$("#proExpPreview_id div:first").empty();
						createPreOEmptyDiv();
						$("#proExpPreview_id").css("display","block");
					}
				},
				error : function() {
					alert("访问服务器失败！");
				},
			})
}
// 点击获得项目经验 通过stuId学生用户主键得到的项目经验
$("#getProjectExperience").click(function () {
	getProjectExperience();
});
function createFirstDiv(projectExperience) {
	pageProjectExp = PageProjectExp(projectExperience);// 把从数据库拿到的项目经验转换成页面的项目经验
	var jsonStr = JSON.stringify(pageProjectExp);
	$('#proExpPreview_id div:first').append(
							"<div>"
							+ "<div class='click_to_ed' ><span onclick='editProjectExp("
							+ jsonStr
							+ ")' >点此编辑</span>"
							+ "<div class='editBtn'></div>"
							+ "</div>"
							+ "<ul class='list-unstyled'>"
							+ "<li id='companyName_id"+pageProjectExp.proexpId+"'><label class='pre_label'>所属公司</label>：<span>"
							+ pageProjectExp.proexpComname
							+ "</span></li>"
							+ "<li><label class='pre_label'>项目名称</label>：<span>"
							+ pageProjectExp.proexpName
							+ "</span></li>"
							+ "<li><label class='pre_label'>项目时间</label>：<span>"
							+ pageProjectExp.proexpStartYear
							+ "</span> 年 <span>"
							+ pageProjectExp.proexpStartMonth
							+ "</span> 月"
							+ "至<span>"
							+ pageProjectExp.proexpEndYear
							+ "</span> 年 <span>"
							+ pageProjectExp.proexpEndMonth
							+ "</span> 月"
							+ "<li id='expJobDutyDesc_id"+pageProjectExp.proexpId+"'><label class='pre_label'>责任描述</label>：<span>"
							+ pageProjectExp.proexpDuty
							+ "</span></li>"
							+ "<li id='expJobProjDesc_id"+pageProjectExp.proexpId+"'><label class='pre_label'>项目描述</label>：<span>"
							+ pageProjectExp.proexpDescription
							+ "</span></li>"
						 	+"<div class='clear'></div>"
							+ "</ul>"
							+ "<div class='delete'><a class='delete_btn' title='点击删除该列' onclick='delete_projectExp("+ projectExperience.proexpId+");'></a>"
							+ "<div class='clear'></div></div></div></div>");
	//是否显示公司名称
	if(pageProjectExp.proexpComname!=null&&pageProjectExp.proexpComname!=""){		
		$("#companyName_id"+pageProjectExp.proexpId+"").css('display','block');
	}else{
		$("#companyName_id"+pageProjectExp.proexpId+"").css('display','none');
	}
	//是否显示责任描述
	if(pageProjectExp.proexpDuty!=null&&pageProjectExp.proexpDuty!=""){		
		$("#expJobDutyDesc_id"+pageProjectExp.proexpId+"").css('display','block');
	}else{
		$("#expJobDutyDesc_id"+pageProjectExp.proexpId+"").css('display','none');
	}
	//是否显示项目描述
	if(pageProjectExp.proexpDescription!=null&&pageProjectExp.proexpDescription!=""){		
		$("#expJobProjDesc_id"+pageProjectExp.proexpId+"").css('display','block');
	}else{
		$("#expJobProjDesc_id"+pageProjectExp.proexpId+"").css('display','none');
	}
	
	
}
function createPreOEmptyDiv() {
	$('#proExpPreview_id div:first')
			.append("<div><div>"
					+"<div id='toEdiProExp' class='click_to_ed'><span onclick='editProjectExp()' id='editProjectExp'>点此编辑</span>"
					+ "<div class='editBtn'></div>"
					+ "</div>"
					+ "<ul class='list-unstyled'>"
					+ "<li><label class='pre_label'>所属公司</label>：<span>"
					+ "未填写"
					+ "</span></li>"
					+ "<li><label class='pre_label'>项目名称</label>：<span>"
					+ "未填写"
					+ "</span></li>"
					+ "<li><label class='pre_label'>项目时间</label>：<span>"
					+ "0"
					+ "</span> 年 <span>"
					+ "0"
					+ "</span> 月"
					+ "至<span>"
					+ "0"
					+ "</span> 年 <span>"
					+ "0"
					+ "</span> 月"
					+ "<li><label class='pre_label'>责任描述</label>：<span>"
					+ "未填写"
					+ "</span></li>"
					+ "<li><label class='pre_label'>项目描述</label>：<span>"
					+ "未填写"
					+ "</span></li>"
					+ "</li></ul>"
					+ "<div class='clear'></div></div></div>");
};
function PageProjectExp(projectExperience) {
	// 项目开始年月转换
	pageProjectExp.proexpStartYear = projectExperience.proexpStratTime
			.split(",")[1].trim();
	pageProjectExp.proexpStartMonth = TurnMonth(projectExperience.proexpStratTime
			.split(",")[0].split(" ")[0]);// 拿到"四月"
	// 项目结束年月转换
	if(projectExperience.proexpEndTime!=undefined){
		pageProjectExp.proexpEndYear = projectExperience.proexpEndTime.split(",")[1].trim();
		pageProjectExp.proexpEndMonth = TurnMonth(projectExperience.proexpEndTime
				.split(",")[0].split(" ")[0]);
	}else{
		pageProjectExp.proexpEndYear="";
		pageProjectExp.proexpEndMonth="";
	}
	
	
	// 项目经验主键
	pageProjectExp.proexpId = projectExperience.proexpId;
	// 学生表主键
	pageProjectExp.proexpStuId = projectExperience.proexpStuId;
	// 项目名称
	pageProjectExp.proexpName = projectExperience.proexpName;
	// 公司名称
	pageProjectExp.proexpComname = projectExperience.proexpComname;
	// 项目职责
	pageProjectExp.proexpDuty = projectExperience.proexpDuty;
	// 项目描述
	pageProjectExp.proexpDescription = projectExperience.proexpDescription;
	return pageProjectExp;
}

// 点此编辑项目经验
function editProjectExp(pageProjectExp) {
	$('#proExp').css('display', 'block');
	$('#proExpPreview_id').css('display', 'none');
	$('#proCompany').val(pageProjectExp.proexpComname);
	// 项目名称
	$('#proName').val(pageProjectExp.proexpName);
	// 项目开始年/月
	$("#projStrartYear").val(pageProjectExp.proexpStartYear.trim());
	$("#projStrartYear").change();	
	$('#projStratMonth').val(pageProjectExp.proexpStartMonth);	
	$('#projStratMonth').change();
	// 项目结束年月
	if(pageProjectExp.proexpEndYear.trim()==""){
		pageProjectExp.proexpEndYear=0;
	}
	if(pageProjectExp.proexpEndMonth.trim()==""){
		pageProjectExp.proexpEndMonth=0;
	}
	$("#projEndYear").val(pageProjectExp.proexpEndYear);
	$("#projEndYear").change();	
	$("#projEndMonth").val(pageProjectExp.proexpEndMonth);
	$("#projEndMonth").change();
	
	// 项目职责描述
	$('#dutyDesc').val(pageProjectExp.proexpDuty);
	// 项目描述
	$('#projectDesc').val(pageProjectExp.proexpDescription);
	$('#projectId').val(pageProjectExp.proexpId);
	
	$("#projExp_Comp_Limit").css("display","none");
	$("#projExp_Name_Limit").css("display","none");
	$("#projExp_Time_Limit").css("display","none");
	$("#projExp_Time_Limit2").css("display","none");
	$("#projExp_Desc_Limit").css("display","none");
	$("#projExp_Duty_Limit").css("display","none");
}

// 点击添加按钮绑定函数
function add_ProjectExp(e) {
	 $('#proExp').css('display', 'block');
	 $('#proExpPreview_id').css('display', 'none');
	 $("#projectId").val("");
	 $('#proCompany').val("");
	// alert("$('#proCompany').val()="+$('#proCompany').val());
	 $('#proName').val("");
	 $('#projStrartYear').val("0");
	 $('#projStratMonth').val("0");
	 $('#projEndYear').val("0");
	 $('#projEndMonth').val("0");
	 $('#dutyDesc').val("");
	 $('#projectDesc').val("");
	 $("#projExp_Comp_Limit").css("display","none");
	 $("#projExp_Name_Limit").css("display","none");
	 $("#projExp_Time_Limit").css("display","none");
	 $("#projExp_Time_Limit2").css("display","none");
	 $("#projExp_Desc_Limit").css("display","none");
	 $("#projExp_Duty_Limit").css("display","none");
}
// 点击删除按钮
function delete_projectExp(proExpId) {
	var urlHref = window.location.href;
	var guid = urlHref.split("#")[1];
	if (confirm("删除？")) {
		$.ajax({
					type : "post",
					url : homeUrl+'StudentsProjectExperience/deleteproExpInfo',
					dataType : "json",
					data : {
						'proExpId' : proExpId,
						'stuId':personalBaseInfo.stuId,
						'guid':guid,
					},
					success : function(data) {
						if (data.code == 200) {
							console.log("删除成功！");
							alert("删除成功");
							getProjectExperience();
							$('#proExp').css('display', 'none');
							$('#proExpPreview_id').css('display', 'block');
						} else if (data.code != 200) {
							alert(data.code);
						}else if(json.code==301){
							alert("您为非法用户");
			        		window.location.href=homeUrl+'stu/safe'; 
						}else if(json.code==302){
			        		alert("您停留时间过长");
			        		window.location.href=homeUrl+'stu/safe'; 
			            }
					},
					error : function() {
						alert("访问服务器失败！");
					}
				})
	}
}

// 点击“取消” 回到预览页
$('#projectExpCancleBtn').click(function(e) {
		e.preventDefault();
		$('#proExp').css('display', 'none');
		$('#proExpPreview_id').css('display', 'block');
});

// 保存或者修改
// 根据什么来保存修改了？根据这个项目的主键
function saveOrUpdateProjectExp() {
	var proexpId = $("#projectId").val();
	//年月不为空限定
	if ($('#projStrartYear').val() == 0 || $('#projStratMonth').val() == 0
			||$('#projStrartYear').val() == null 
			|| $('#projStratMonth').val() == null
			/*|| $('#projEndYear').val() == 0 || $('#projEndMonth').val() == 0*/
			|| $('#projStrartYear').val() == ""
			|| $('#projStratMonth').val() == ""
			/*|| $('#projEndYear').val() == "" || $('#projEndMonth').val() == ""*/) {
		$("#projExp_Time_Limit").css("display", "block");		
	}
	// 开始时间不能大于结束时间
	else if($('#projStrartYear').val() != 0
			&&$('#projStrartYear').val() != null
			&&$('#projStrartMonth').val() != 0
			&&$('#projStrartMonth').val() != null
	        && $('#projEndYear').val() != 0
	        && $('#projEndYear').val() != null
	        && $('#projEndMonth').val() != 0
	        && $('#projEndMonth').val() != null
	        
	        &&parseInt($('#projEndYear').val())!=0
			&&parseInt($('#projStrartYear').val())==parseInt($('#projEndYear').val())
			&&parseInt($('#projStratMonth').val())>parseInt($('#projEndMonth').val())){
			$("#projExp_Time_Limit2").css("display", "block");		
	}
	else if($('#projStrartYear').val() != 0
			&&$('#projStrartMonth').val() != 0
	        && $('#projEndYear').val() != 0
	        && $('#projEndMonth').val() != 0			
			&&parseInt($('#projStrartYear').val())>parseInt($('#projEndYear').val())){
		$("#projExp_Time_Limit2").css("display", "block");
	}
	//公司名称不为空
	/*else if($("#proCompany").val()==""){
			$("#projExp_Comp_Limit").css("display", "block");			
	}*/
	else if($("#proName").val()==""){//项目名称
			$("#projExp_Name_Limit").css("display", "block");		
	}
	/*else if($("#dutyDesc").val()==""){
			$("#projExp_Duty_Limit").css("display", "block");		
	}
	else if($("#projectDesc").val()==""){
			$("#projExp_Desc_Limit").css("display", "block");
	}*/

	else if (proexpId != '' && proexpId > 0) {
			updateProjectExp();
	} else {
			saveProjectExp();
	}


}

// 保存
var proExpPreview = $("#proExpPreview .list-unstyled li");
function saveProjectExp(e) {
	var urlHref = window.location.href;
	var guid = urlHref.split("#")[1];
	// 修改项目主键和学生表主键都不能
	projectExperience.proexpId = $('#projectId').val();
	// 学生表主键
	projectExperience.proexpStuId = personalBaseInfo.stuId;
	// 公司名称
	projectExperience.proexpComname = $("#proCompany").val();
	// 项目名称
	projectExperience.proexpName = $("#proName").val();
	// 项目开始年
	var proStartYear = $('#projectStartTime .info_year').val();
	// 项目开始月
	var proStratMonth = $("#projectStartTime .info_date").val();
	
	// 项目结束年
	var proEndYear = $('#projectEndTime .info_year').val();
	// 项目结束月
	var proEndMonth = $('#projectEndTime .info_date').val();
	
	
	// 项目开始结束时间字符拼接
	projectExperience.proexpStratTime = ("" + proStartYear + "/"
			+ proStratMonth + "/01").trim();
	if(proEndYear!=0&&proEndMonth!=0){
		projectExperience.proexpEndTime = ("" + proEndYear + "/" + proEndMonth + "/01")
		.trim();
	}else{
		projectExperience.proexpEndTime=null;
	}
	
	// 责任描述
	projectExperience.proexpDuty = $('#dutyDesc').val();
	// 项目描述
	
	projectExperience.proexpDescription = $('#projectDesc').val();
	$.ajax({
				url : homeUrl+'StudentsProjectExperience/saveproExpInfo?guid='+guid,
				async : false, // 改成同步
				data : projectExperience,
				type : 'post',
				success : function(data) {
					var jsonMap = JSON.parse(data);
					if (jsonMap.code == 200) {
						alert("保存成功");
						getProjectExperience();						
						//e.preventDefault();
						$('#proExp').css('display', 'none');
						$('#proExpPreview_id').css('display', 'block');			
					}else if(json.code==301){
						alert("您为非法用户");
		        		window.location.href=homeUrl+'stu/safe'; 
					}else if(json.code==302){
		        		alert("您停留时间过长");
		        		window.location.href=homeUrl+'stu/safe'; 
		            }
				},
				error : function() {
					alert("访问服务器失败！");
					$('#proExp').css('display', 'none');
					$('#proExpPreview_id').css('display', 'block');
				},
			})
}

// 修改 根据项目的主键修改
function updateProjectExp() {
	var urlHref = window.location.href;
	var guid = urlHref.split("#")[1];
	// 修改项目主键和学生表主键都不能
	projectExperience.proexpId = $('#projectId').val();
	// 学生表主键
	projectExperience.proexpStuId = personalBaseInfo.stuId;
	// 公司名称
	projectExperience.proexpComname = $("#proCompany").val();
	// 项目名称	
	projectExperience.proexpName = $("#proName").val();
	// 项目开始年
	var proStartYear = $('#projectStartTime .info_year').val();
	// 项目开始月	
	var proStratMonth = $("#projectStartTime .info_date").val();
	
	// 项目结束年
	var proEndYear = $('#projectEndTime .info_year').val();
	// 项目结束月
	var proEndMonth = $('#projectEndTime .info_date').val();
	
	// 项目开始 结束时间字符拼接  "yyyy-MM-dd"
	
	projectExperience.proexpStratTime = ("" + proStartYear + "/"
			+ proStratMonth + "/01").trim();		
	
	if(proEndYear!=0&&proEndMonth!=0){
		projectExperience.proexpEndTime = ("" + proEndYear + "/" + proEndMonth + "/01")
		.trim();
	}else{
		projectExperience.proexpEndTime=null;
	}
	// 责任描述
	projectExperience.proexpDuty = $('#dutyDesc').val();
	// 项目描述
	projectExperience.proexpDescription = $('#projectDesc').val();
	$.ajax({
				url : homeUrl+'StudentsProjectExperience/updateproExpInfo?guid='+guid,
				async : false,
				data : projectExperience,
				type : 'post',
				success : function(data) {
					var jsonMap = JSON.parse(data);
					if (jsonMap.code == 200) {
						alert("修改成功");
						getProjectExperience();
						$('#proExp').css('display', 'none');
						$('#proExpPreview_id').css('display', 'block');	
					}
					else if(json.code==301){
						alert("您为非法用户");
		        		window.location.href=homeUrl+'stu/safe'; 
					}else if(json.code==302){
		        		alert("您停留时间过长");
		        		window.location.href=homeUrl+'stu/safe'; 
		            }
				},
				error : function() {
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

//单个数据校验
//公司名称
	/*$("#proCompany").change(function(){
		if($('#proCompany').val()==0||$('#proCompany').val().trim()==""){
			$("#projExp_Comp_Limit").css("display","block");	
		}else{
			$("#projExp_Comp_Limit").css("display","none");
		}
		
	})*/
//项目名称
	$("#proName").change(function(){
		if($('#proName').val()==0||$('#proName').val().trim()==""){
			$("#projExp_Name_Limit").css("display","block");
		}else{
			$("#projExp_Name_Limit").css("display","none");
		}
	})

//责任描述
	/*$("#dutyDesc").change(function(){
		if($('#dutyDesc').val()==0||$('#dutyDesc').val().trim()==""){
			$("#projExp_Duty_Limit").css("display","block");
		}else {
			$("#projExp_Duty_Limit").css("display","none");
		}
		
	})*/
//项目描述
	/*$("#projectDesc").change(function(){
		if($('#projectDesc').val()==0||$('#projectDesc').val().trim()==""){
			$("#projExp_Desc_Limit").css("display","block");
		}else {
			$("#projExp_Desc_Limit").css("display","none");
		}
		
	})*/
	
//时间
$('#projectExpTime_id').change(function() {
    if ($('#projStrartYear').val() == 0
        || $('#projStratMonth').val() == 0
        /*|| $('#projEndYear').val() == 0
        || $('#projEndMonth').val() == 0*/) {
        $("#projExp_Time_Limit").css("display", "block");
    } else {
        $("#projExp_Time_Limit").css("display", "none");
    }

    if ($('#projStrartYear').val() != 0
        && $('#projEndYear').val() != 0
        && $('#projEndYear').val() != null
        && $('#projStrartYear').val() > $('#projEndYear').val()) {
        $("#projExp_Time_Limit2").css("display", "block");
    }
    else if ($('#projStrartYear').val() != 0
    		&&$('#projStrartYear').val() != null
        && $('#projStratMonth').val() != 0
        && $('#projStratMonth').val() != null
        && $('#projEndYear').val() != 0
        && $('#projEndYear').val() != null
        && $('#projEndMonth').val() != 0
        && $('#projEndMonth').val() != null     
        && parseInt($('#projStrartYear').val()) == parseInt($('#projEndYear').val())
        && parseInt($('#projStratMonth').val()) >parseInt($('#projEndMonth').val()) ) {
        $("#projExp_Time_Limit2").css("display", "block");
    } else {
        $("#projExp_Time_Limit2").css("display", "none");
    }
});	
	

	