/**
 * Created by Administrator on 2017/6/14 0014.
 */
// $(document).ready(function ()
// 这里是写简历预览获取数据的js
// 分模块来写

var currentTimes;
function createEntercvDivMorePreview() {
	// 定义变量以存储我们拿到的所有的数据
	var stu;
	var pski;
	var proexp;
	var pcer;
	var exp;
	var ejob;
	var eduexp;
	var ame;
	var a;
	if (cvsId == "" || cvsId == null || cvsId == 0) {
		$.ajax({
			type : "post",
			dataType : "JSON",
			async : false,
			url : homeUrl + 'cvs/getCvsbystuStuID',
			data : {
				"stuId" : stuId
			},
			success : function(data) {
				console.log(data);
				if (data.code != 200) {
					// alert("页面出错！")
				} else {
					var currentTime=data.currentTime;
	                currentTimes=currentTime.split("-");
					stu = data.data.stu;
					pski = data.data.pski;
					proexp = data.data.proexp;
					pcer = data.data.pcer;
					exp = data.data.exp;
					ejob = data.data.ejob;
					eduexp = data.data.eduexp;
					ame = data.data.ame;
				}
			},
			error : function() {
				alert("连接服务器失败");
			}
		});
	} else {
		$.ajax({
			type : "post",
			dataType : "JSON",
			async : false,
			url : homeUrl + 'cvs/getCvsbystuID',
			data : {
				"cvsStuId" : cvsStuId,
				"cvsId" : cvsId
			},
			success : function(data) {
				if (data.code != 200) {
					// alert("页面出错！")
				} else {
					var currentTime=data.currentTime;
	                currentTimes=currentTime.split("-");  
					stu = data.data.stu;
					pski = data.data.pski;
					proexp = data.data.proexp;
					pcer = data.data.pcer;
					exp = data.data.exp;
					ejob = data.data.ejob;
					eduexp = data.data.eduexp;
					ame = data.data.ame;
				}
			},
			error : function() {
				alert("连接服务器失败");
			}
		});
	}

	// 接下来开始渲染数据到页面，第一部分：基本信息部分（简历头）
	if (stu.length > 0) {
		stu = stu[0];
		var stuName = $("#resume-preview-basinfo-stu-name");
		var stuEmployment = $("#resume-preview-basinfo-stu-state");
		var stuMobphone = $("#resume-preview-basinfo-stu-phone");
		var stuEmail = $("#resume-preview-basinfo-stu-email");
		var stuGender = $("#resume-preview-basinfo-stu-sex");
		var bornTime = stu.stuDob;
		var age = $("#resume-preview-basinfo-stu-age");
		var born = $("#resume-preview-basinfo-stu-born");
		var nowAddress = $("#resume-preview-basinfo-stu-stuNowadderss");
		var workAge = $("#resume-preview-basinfo-stu-workAge");
		// 姓名
		stuName.html(stu.stuName);
		// 是否在职
		if (stu.stuEmployment) {
			stuEmployment.text("在职");
		} else if(!stu.stuEmployment){
			stuEmployment.text("正在找工作");
		}else{
			stuEmployment.text("无信息");
		}
		// 电话号码
		stuMobphone.text(stu.stuMobphone);
		// 电子邮箱
		if (stu.stuEmail == null || stu.stuEmail == "" || stu.stuEmail == 0) {
			stuEmail.text("无");
		} else {
			stuEmail.text(stu.stuEmail);
		}		
		
		//获取性别
							var gender="";
		                	var genderNumber=stu.stuIdcard.substring(16,17);
		                	if(genderNumber%2==1){
		                     	stuGender.text("男");
		                   }else{
		                	    stuGender.text("女");
		                   }
			                //获取年龄
		                	var stuDobyear=stu.stuIdcard.substring(6,10);
		                	var stuDobmonth=stu.stuIdcard.substring(10,12);
		                	var stuDobday=stu.stuIdcard.substring(12,14);
		                	var stuage=currentTimes[0]-stuDobyear;
		                	if(currentTimes[1]-stuDobmonth>0){
		                		stuage=stuage-1;
		                	}
							age.text(stuage);
							born.text("("+stuDobyear+"/"+stuDobmonth+"/"+stuDobday+")");
		// 居住地（城市）
		if(stu.stuNowadderss==null||stu.stuNowadderss==""||stu.stuNowadderss==0){
			nowAddress.text("居住地不定");
		}else{
			nowAddress.text(stu.stuNowadderss);
		}
		// 工龄
		getWorkYears(exp);
	} else {
		$(".resume-preview-basinfo").css('display', 'none');
	}

	// 第二个是求职意向
	// 求职意向的对象数组是ejob
	// 这里要动态添加
	if (ejob.length > 0) {
		var job_entention_box = $(".resume-preview-job-intention-content");
		var ejob_salary;
		var ejob_duty;
		var ejob_loc;
		var ejob_arrive_time;
		var ejob_work_type;
		job_entention_box.empty();
		for (var i = 0; i < ejob.length; i++) {
			// 处理薪资
			if (!ejob[i].ejobSalary) {
				ejob_salary = "面议";
			} else {
				ejob_salary = ejob[i].ejobSalary;
			}
			// 处理职能
			if (ejob[i].ejobDuty == 0 || ejob[i].ejobDuty == null
					|| ejob[i].ejobDuty == "") {
				ejob_duty = "";
			} else {
				var expectionJob_code = ejob[i].ejobDuty;
				ejob_duty = changeZn(expectionJob_code);
			}
			// 处理地点
			var ejob_loc_id = ejob[i].ejobLocId;
			ejob_loc_id = ejob_loc_id + "";
			// 1000000000000000地域id一共是16位
			// 1130207000000000
			var procince_id, ejob_province;
			var distract_id, ejob_distract;
			var area_id, ejob_area;
			/*
			 * procince_id = ejob_loc_id.substring(0,3)+"0000000000000";
			 * distract_id = ejob_loc_id.substring(0,5)+"00000000000"; area_id =
			 * ejob_loc_id.substring(0,7)+"000000000"; ejob_province =
			 * ChineseDistricts[1000000000000000][procince_id]; if(typeof
			 * ChineseDistricts[procince_id] == "object"){ ejob_distract =
			 * ChineseDistricts[procince_id][distract_id]; if(typeof
			 * ChineseDistricts[distract_id] == "object"){ ejob_area =
			 * ChineseDistricts[distract_id][area_id]; ejob_loc =
			 * ejob_province+"-"+ejob_distract+"-"+ejob_area; }else{ ejob_loc =
			 * ejob_province+"-"+ejob_distract; } }else{ ejob_loc =
			 * ejob_province; }
			 */
			if (ejob_loc_id == 0 || ejob_loc_id == null || ejob_loc_id == "") {
				ejob_loc = "任何地点";
			} else {
				var procince_id = parseInt((ejob_loc_id + "").substring(0, 3)
						+ "0000000000000");
				var ejob_loc = ChineseDistricts[1000000000000000][procince_id];
				ejob_province = ChineseDistricts[1000000000000000][procince_id];
				var distract_id = (ejob_loc_id + "").substring(3, 5);
				var area_id = (ejob_loc_id + "").substring(5, 7);
				if (distract_id != "00") {
					var distract_id = parseInt((ejob_loc_id + "").substring(0,
							5)
							+ "00000000000");
					ejob_loc += "-"
							+ ChineseDistricts[procince_id][distract_id];
					ejob_distract = ChineseDistricts[procince_id][distract_id];
				}
				if (area_id != "00") {
					ejob_loc += "-"
							+ ChineseDistricts[distract_id][ejob_loc_id];
					ejob_area = ChineseDistricts[distract_id][ejob_loc_id];
				}
			}
			// 处理到岗时间
			// 到岗时间分 1：随时，2：一周内，3：两周内，4：一个月内
			var ejob_ArrivalTime = ejob[i].ejobArrivalTime;
			switch (ejob_ArrivalTime) {
			case "1":
				ejob_arrive_time = "随时";
				break;
			case "2":
				ejob_arrive_time = "一周内";
				break;
			case "3":
				ejob_arrive_time = "两周内";
				break;
			case "4":
				ejob_arrive_time = "一个月内";
				break;
			}
			// 处理工作类型
			if (ejob[i].ejobType == 0 || ejob[i].ejobType == null
					|| ejob[i].ejobType == "") {
				ejob_work_type = "自适应";
			} else {
				var ejob_type_code = ejob[i].ejobType;
				ejob_work_type = Wrktyp_a[ejob_type_code];
			}
			job_entention_box
					.append("<div class='resume-preview-jobentention-body row'>"
							+ "<ul class='col-sm-6'>"
							+ "<li><span class='label-title'>期望薪资</span><span>:</span><span id='resume-preview-jobentention-salary_"
							+ i
							+ "'>"
							+ ejob_salary
							+ "</span></li>"
							+ "<li><span class='label-title'>职能</span><span>:</span><span id='resume-preview-jobentention-zn"
							+ i
							+ "'>"
							+ ejob_duty
							+ "</span></li>"
							+ "<li><span class='label-title'>到岗时间</span><span>:</span><span id='resume-preview-jobentention-arrtime_"
							+ i
							+ "'>"
							+ ejob_arrive_time
							+ "</span></li>"
							+ "</ul>"
							+ "<ul class='col-sm-6'>"
							+ "<li><span class='label-title'>地点</span><span>:</span><span id='resume-preview-jobentention-address_"
							+ i
							+ "'>"
							+ ejob_loc
							+ "</span></li>"
							+ "<li><span class='label-title'>工作类型</span><span>:</span><span id='resume-preview-jobentention-jobtype_"
							+ i
							+ "'>"
							+ ejob_work_type
							+ "</span></li>"
							+ "</ul>" + "</div>");
		}
	} else {
		$('.resume-preview-job-intention').css('display', 'none');
	}

	// 第三个工作经验
	// 工作经验的对象数组是exp
	// 这里同样需要使用动态添加
	if (exp.length > 0) {
		var work_time_area;
		var work_name;
		var work_department;
		var work_exp_company;
		var work_time_long;
		var work_industry;
		var work_statement;
		var resume_preview_jobExp_content = $(".resume-preview-jobExp-content");
		resume_preview_jobExp_content.empty();
		for (var j = 0; j < exp.length; j++) {
			// 处理工作时间区间
			var enter_time = exp[j].expEntried;
			var quit_time = exp[j].expQuited;
			enter_time = changeData(enter_time)[2];
			quit_time = changeData(quit_time)[2];
			work_time_area = enter_time + "/" + quit_time;

			// 处理职位名
			// var work_exp_duty_code = exp[j].expDuty;
			// work_name = changeZn(work_exp_duty_code);
			work_name = exp[j].expPosition;

			// 处理所在部门
			if (exp[j].department == 0 || exp[j].department == null
					|| exp[j].department == "") {
				work_department = "保密";
			} else {
				work_department = exp[j].department;
			}

			// 处理公司名称
			work_exp_company = exp[j].expCompany;

			// 处理在该公司工作时长
			work_time_long = getAge(new Date(quit_time), exp[j].expEntried);

			// 处理公司所在行业
			if (exp[j].expIndId == 0 || exp[j].expIndId == null
					|| exp[j].expIndId == "") {
				work_industry = "保密";
			} else {
				var exp_ind_id_code = exp[j].expIndId;
				work_industry = changeIndustry(exp_ind_id_code);
			}

			// 处理工作描述
			if (exp[j].expDescription == 0 || exp[j].expDescription == null
					|| exp[j].expDescription == "") {
				work_statement = "无";
			} else {
				work_statement = exp[j].expDescription;
			}
			resume_preview_jobExp_content
					.append("<div class='resume-preview-jobExp-box'>"
							+ "<ul class='resume-preview-jobExp-ul-first'>"
							+ "<li class='workExp-time-area'>"
							+ work_time_area
							+ "</li>"
							+ "<li><span class='work-name'>"
							+ work_name
							+ "</span><span class='department'>"
							+ work_department
							+ "</span></li>"
							+ "</ul>"
							+ "<div class='clear'></div>"
							+ "<ul class='resume-preview-jobExp-ul-second'>"
							+ "<li><span class='work-exp-company'>"
							+ work_exp_company
							+ "</span>[<span class='work-time-long'>"
							+ work_time_long
							+ "</span>年]</li>"
							+ "</ul>"
							+ "<div class='clear'></div>"
							+ "<ul class='resume-preview-jobExp-ul-third'>"
							+ "<li class='industry'>"
							+ work_industry
							+ "</li>"
							+ "</ul>"
							+ "<div class='clear'></div>"
							+ "<ul class='resume-preview-jobExp-ul-forth'>"
							+ "<li>"
							+ "<span class='label-title'>工作描述</span>"
							+ "<span>:</span>"
							+ "<div class='work-exp-state'>"
							+ work_statement
							+ "</div>"
							+ "</li>"
							+ "</ul>"
							+ "<div class='clear'></div>" + "</div>")
		}
	} else {
		$('.resume-preview-jobExp').css('display', 'none');
	}

	// 第四个项目经验
	// 项目经验的对象数组是proexp
	// 这里也需要动态添加
	if (proexp.length > 0) {
		var resume_preview_proExp_box = $(".resume-preview-proExp-box");
		resume_preview_proExp_box.empty();
		for (var k = 0; k < proexp.length; k++) {
			var pro_exp_time_area;
			var pro_exp_name;
			var campany_name;
			var pro_exp_statement;
			var pro_duty_statement;
			// 处理项目时间区间
			var pro_start_time = proexp[k].proexpStratTime;
			var pro_end_time = proexp[k].proexpEndTime;
			pro_start_time = changeData(pro_start_time)[2];
			if (pro_end_time == 0 || pro_end_time == null || pro_end_time == "") {
				pro_end_time = " 至今";
			} else {
				pro_end_time = changeData(pro_end_time)[2];
			}

			pro_exp_time_area = pro_start_time + "/" + pro_end_time;

			// 处理项目名称
			pro_exp_name = proexp[k].proexpName;

			// 处理所属公司
			if (proexp[k].proexpComname == 0 || proexp[k].proexpComname == null
					|| proexp[k].proexpComname == "") {
				campany_name = "保密";
			} else {
				campany_name = proexp[k].proexpComname;
			}

			// 处理项目描述
			if (proexp[k].proexpDescription == 0
					|| proexp[k].proexpDescription == null
					|| proexp[k].proexpDescription == "") {
				pro_exp_statement = "无";
			} else {
				pro_exp_statement = proexp[k].proexpDescription;
			}

			// 处理责任描述
			if (proexp[k].proexpDuty == 0 || proexp[k].proexpDuty == null
					|| proexp[k].proexpDuty == "") {
				pro_duty_statement = "无";
			} else {
				pro_duty_statement = proexp[k].proexpDuty;
			}
			resume_preview_proExp_box
					.append("<ul>" + "<li>"
							+ "<span class='pro-exp-time-area'>"
							+ pro_exp_time_area
							+ "</span><span class='pro-exp-name'>"
							+ pro_exp_name
							+ "</span>"
							+ "</li>"
							+ "<li><span class='label-title'>所属公司</span><span>: </span><span class='pro-exp-company-name'>"
							+ campany_name
							+ "</span></li>"
							+ "<li>"
							+ "<span class='label-title'>项目描述</span>"
							+ "<span>: </span>"
							+ "<div class='pro-exp-statement'>"
							+ pro_exp_statement
							+ "</div>"
							+ "</li>"
							+ "<li>"
							+ "<span class='label-title'>责任描述</span>"
							+ "<span>: </span>"
							+ "<div class='pro-exp-duty-state'>"
							+ pro_duty_statement + "</div>" + "</li>" + "</ul>");
		}
	} else {
		$('.resume-preview-proExp').css('display', 'none');
	}

	// 教育经历
	// 教育经历的对象数组是eduexp
	// 这里同样需要使用动态添加
	if (eduexp.length > 0) {
		var edu_exp_area;
		var edu_exp_school;
		var edu_exp_XL;
		var edu_exp_marjor;
		var resume_preview_eduExp_content = $(".resume-preview-eduExp-content");
		resume_preview_eduExp_content.empty();
		for (var l = 0; l < eduexp.length; l++) {
			// console.log(eduexp[l]);
			// 处理教育经历起止时间
			var edu_start_time = eduexp[l].eduexpEnrolled;
			var edu_end_time = eduexp[l].eduexpGraduate;
			edu_start_time = changeData(edu_start_time)[2];
			if (edu_end_time == 0 || edu_end_time == null || edu_end_time == "") {
				edu_end_time = " 至今";
			} else {
				edu_end_time = changeData(edu_end_time)[2];
			}

			// 处理学校名称
			edu_exp_school = eduexp[l].eduexpSchool;

			// 处理专业
			if (eduexp[l].eduexpCostId == 0 || eduexp[l].eduexpCostId == null
					|| eduexp[l].eduexpCostId == "") {
				edu_exp_marjor = "保密";
			} else {
				edu_exp_marjor = eduexp[l].eduexpCostId;
			}
			// 处理学历
			var edu_exp_code = eduexp[l].eduexpEduId;
			edu_exp_XL = edu_a[edu_exp_code];
			edu_exp_area = edu_start_time + "/" + edu_end_time;
			resume_preview_eduExp_content.append("<ul>"
					+ "<li><span class='edu-exp-area'>" + edu_exp_area
					+ "</span><span class='edu-exp-school'>" + edu_exp_school
					+ "</span></li>" + "<li><span class='edu-exp-XL'>"
					+ edu_exp_XL + "</span><span class='edu-exp-marjor'>"
					+ edu_exp_marjor + "</span></li>" + "</ul>")
		}
	} else {
		$('.resume-preview-eduExp').css('display', 'none');
	}

	// 技能特长
	// 技能特长的对象数组是 pski；
	// 这里同样需要动态添加
	if (pski.length > 0) {
		var resume_preview_skill_content = $(".resume-preview-skill-content");
		var skill_name;
		var skill_level = 0;
		var skill_level_char;
		// skill_level 分四个等级 1：了解 2：一般 3：熟练 4：精通
		var idNa = 0;
		resume_preview_skill_content.empty();
		for (var q = 1; q <= pski.length; q++) {
			// 处理技能名称
			skill_name = pski[q - 1].pskiName;

			// 处理技能等级
			skill_level = 25 * pski[q - 1].pskiLevel;

			// 处理进度条显示字样
			switch (pski[q - 1].pskiLevel) {
			case 1:
				skill_level_char = "了解";
				break;
			case 2:
				skill_level_char = "一般";
				break;
			case 3:
				skill_level_char = "熟练";
				break;
			case 4:
				skill_level_char = "精通";
				break;
			}
			if (q % 2 !== 0) {
				idNa++;
				resume_preview_skill_content.append("<div class='row' aaa='"
						+ idNa + "'></div>");
				$("[aaa=" + idNa + "]")
						.append(
								"<div class='col-sm-6'>"
										+ "<label class='resume-preview-skill-label'>"
										+ skill_name
										+ "</label>"
										+ "<div class='progress resume-preview-skill-progress'>"
										+ "<div class='progress-bar progress-bar-striped active' style='width: "
										+ skill_level + "%'>"
										+ skill_level_char + "</div>"
										+ "</div>"
										+ "<div class='clear'></div>"
										+ "</div>");
			}
			if (q % 2 == 0) {
				$("[aaa=" + idNa + "]")
						.append(
								"<div class='col-sm-6'>"
										+ "<label class='resume-preview-skill-label'>"
										+ skill_name
										+ "</label>"
										+ "<div class='progress resume-preview-skill-progress'>"
										+ "<div class='progress-bar progress-bar-striped active' style='width: "
										+ skill_level + "%'>"
										+ skill_level_char + "</div>"
										+ "</div>"
										+ "<div class='clear'></div>"
										+ "</div>");
			}
		}
	} else {
		$('.resume-preview-skill').css('display', 'none');
	}

	// 证书
	// 证书的对象数组是 pcer
	// 这里也需要动态添加
	if (pcer.length > 0) {
		var resume_preview_cert_content = $(".resume-preview-cert-content");
		var cert_name;
		var score_level;
		var cert_get_time;
		 resume_preview_cert_content.empty();
		for (var w = 0; w < pcer.length; w++) {
			// 处理证书名称
			cert_name = pcer[w].pcerDefined;

			// 处理等级、分数
			if (pcer[w].pcerMark) {
				score_level = pcer[w].pcerMark;
			} else {
				score_level = "无";
			}

			// 处理获得时间
			cert_get_time = pcer[w].pcerGetTime;
			cert_get_time = changeData(cert_get_time)[2];
			resume_preview_cert_content
					.append(" <ul>"
							+ "<li><span class='label-title'>证书名称</span><span>:</span><span>"
							+ cert_name
							+ "</span></li>"
							+ "<li><span class='label-title'>分数/等级</span><span>:</span><span>"
							+ score_level
							+ "</span></li>"
							+ "<li><span class='label-title'>获得时间</span><span>:</span><span>"
							+ cert_get_time + "</span></li>" + "</ul>")
		}
	} else {
		$('.resume-preview-cert').css('display', 'none');
	}

	// 附加信息
	// 附加信息的对象数组是 ame
	// 这个是固定的
	if (ame.length > 0) {
		var info_addition = $(".info-addition");
		var ame_describe = ame[0].ameDescribe;
		info_addition.html(ame_describe);
	} else {
		$('.resume-preview-addition').css('display', 'none');
	}

	/**
	 * 获取年龄的函数
	 * 
	 * @param startTime
	 *            传入起始日期,参数类型是从后台直接到的数据格式；
	 * @param currentTime
	 *            Data类型的参数，这个是被减数
	 */
	function getAge(currentTime, startTime) {
		var currentYear = currentTime.getFullYear();
		var currentMonth = currentTime.getMonth() + 1;
		var currentDay = currentTime.getDate();
		var startDate = changeData(startTime)[1];
		var _age;
		if (currentYear > startDate[0] && currentMonth > startDate[1]) {
			_age = currentYear - startDate[0];
		} else if (currentYear > startDate[0] && currentMonth == startDate[1]
				&& currentDay > startDate[2]) {
			_age = currentYear - startDate[0];
		} else if (currentYear > startDate[0] && currentMonth < startDate[1]) {
			_age = currentYear - startDate[0] + 1;
		} else if (currentYear > startDate[0] && currentMonth == startDate[1]
				&& currentDay <= startDate[2]) {
			_age = currentYear - startDate[0] + 1;
		}
		return _age;
	}

	/**
	 * 计算工龄的函数
	 * 
	 * @param exp
	 *            后台拿到的工作经历对象数组
	 */
	function getWorkYears(exp) {
		if (exp.length > 0) {
			var ss_min = (new Date(changeData(exp[0].expEntried)[2])).getTime();
			var mm_max = (new Date(changeData(exp[0].expQuited)[2])).getTime();
			for (var i = 1; i < exp.length; i++) {
				// 入职时间转换
				// 最早入职时间
				var s = changeData(exp[i].expEntried)[2];
				s = new Date(s);
				var s_getTime = s.getTime();
				ss_min = Math.min(ss_min, s_getTime);
				// 最晚离职时间
				var m = changeData(exp[i].expQuited)[2];
				m = new Date(m);
				var m_getTime = m.getTime();
				mm_max = Math.max(mm_max, m_getTime);
			}
			var minEnter = [];
			minEnter.push(new Date(ss_min).getFullYear());
			minEnter.push(new Date(ss_min).getMonth() + 1);
			minEnter.push(new Date(ss_min).getDate());
			var maxQuit = [];
			maxQuit.push(new Date(mm_max).getFullYear());
			maxQuit.push(new Date(mm_max).getMonth() + 1);
			maxQuit.push(new Date(mm_max).getDate());
			// 计算工作了几年几个月
			var workYears = maxQuit[0] - minEnter[0];
			var workMonths = maxQuit[1] - minEnter[1];
			var workDays = maxQuit[2] - minEnter[2];
			if (workYears == 0) {
				workAge.text(workMonths + "个月");
			} else if (workYears > 0 && workMonths > 0 && workDays >= 0) {
				workAge.text(workYears + "年" + workMonths + "个月");
			} else if (workYears > 0 && workMonths < 0) {
				if (workYears - 1 == 0) {
					workMonths = workMonths + 12;
					workAge.text(workMonths + "个月");
				} else {
					workMonths = workMonths + 12;
					workYears = workYears - 1;
					workAge.text(workYears + "年" + workMonths + "个月");
				}
			} else if (workYears > 0 && workMonths > 0 && workDays < 0) {
				if (workMonths - 1 == 0) {
					workAge.text(workYears + "年");
				} else {
					workMonths = workMonths - 1;
					workAge.text(workYears + "年" + workMonths + "个月");
				}
			} else if (workYears > 0 && workMonths == 0 && workDays > 0) {
				workAge.text(workYears + "年");
			} else if (workYears > 0 && workMonths == 0 && workDays < 0) {
				if (workYears - 1 > 0) {
					workYears = workYears - 1;
					workMonths = 11;
					workAge.text(workYears + "年" + workMonths);
				} else if (workYears - 1 == 0) {
					workMonths = 11;
					workAge.text(workMonths + "个月");
				}
			} else if (workYears == 0 && workMonths == 0) {
				workAge.text(workDays + "天");
			}
		}else{
			workAge.text("无");
		}
	}

	/**
	 * 转换职能编码为汉字的函数
	 * 
	 * @param expectionJob_code
	 *            职能编码
	 */
	function changeZn(expectionJob_code) {
		if (expectionJob_code) {
			var result;
			var first_code, first_zn;
			var second_code, second_zn;
			var third_code, third_zn;
			var forth_code, forth_zn;
			expectionJob_code = expectionJob_code + "";
			first_code = expectionJob_code.substring(0, 4) + "000000000";
			second_code = expectionJob_code.substring(0, 7) + "000000";
			third_code = expectionJob_code.substring(0, 10) + "000";
			forth_code = expectionJob_code + "";
			first_zn = industry[1000000000000][first_code];
			second_zn = industry[first_code][second_code];
			third_zn = industry[second_code][third_code];
			if (forth_code.substring(10) == "000") {
				result = third_zn;
			} else {
				forth_zn = industry[third_code][forth_code];
				result = forth_zn;
			}
		}
		return result;
	}

	/**
	 * 
	 * @param industry_code
	 *            转换行业编码为汉字的函数
	 * @returns {*}
	 */
	function changeIndustry(industry_code) {
		if (industry_code) {
			var result;
			var first_code, first_zn;
			var second_code, second_zn;
			var third_code, third_zn;
			industry_code = industry_code + "";
			first_code = industry_code.substring(0, 4) + "000000000";
			second_code = industry_code.substring(0, 7) + "000000";
			first_zn = industry[1000000000000][first_code];
			second_zn = industry[first_code][second_code];
			result = first_zn + "/" + second_zn;
		}
		return result;
	}
};
