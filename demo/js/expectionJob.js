/**
 * 求职意向模块
 */
// -------------------------------------求职意向栏-------------------------------------------
/* 后台传入数据格式：
 * */
var expectionJob = {// 与数据库对应的类
	"ejobId" : "",// 项目表主键
	"ejobStuId" : "",// 学生表主键
	"ejobIndId" : "",// 行业 常量表
	"ejobIndIdfirst" : "",// 行业第一级//工作职位所用的js前台数据传输
	"ejobDuty" : "",// 期望职业
	"ejobDutyfirst" : "",// 职位第一级//工作职位所用的js前台数据传输
	"ejobDutysecond" : "",// 职位第二级//工作职位所用的js前台数据传输
	"ejobDutythrid" : "",// 职位第三级//工作职位所用的js前台数据传输
	"ejobSalary" : "",// 期望薪资
	"ejobLocId" : "",// 地域表（期望工作地）上面三个属性必须有一个不为空Integer 数据库无
	"ejobProvince" : "",// 期望工作地点省//工作职位所用的js前台数据传输
	"ejobCity" : "",// 期望工作地点市//工作职位所用的js前台数据传输
	"ejobArea" : "",// 期望工作地点区//工作职位所用的js前台数据传输
	"ejobAccommodation" : "",// 包住Integer 0是false 1是true
	"ejobMeal" : "",// 包吃 0是false 1是true
	"ejobNightShift" : "",// 不接受夜班Integer 0是false 1是true
	"ejobOvertime" : "",// 是否接受加班
	"ejobWeekend" : "",// 有双休Integer 0是false 1是true
	"ejobFInsurance" : "",// 有五险Integer 0是false 1是true
	"ejobOneFund" : "",// 有一金Integer 0是false 1是true
	"ejobOutWork" : "",// 是否出差Integer 0是false 1是true
	"ejobCotyId" : "",// 获取公司性质要求（公司性质表主键） 数据库无
	"ejobType" : "",// 全职/兼职/实习/其他（多选）Integer
	"ejobArrivalTime" : "",// 到岗时间
}
function getExpectionJob(){
	var expjob_stuId=personalBaseInfo.stuId;
	var urlHref = window.location.href;
	var guid = urlHref.split("#")[1];
	$.ajax({
		url : homeUrl+'StudentsJobIntention/getEJobInfo',
		async : false,
		type : 'post',
		data : {
			"stuId" : expjob_stuId,
			"guid" : guid,
		},
		success : function(data) {
			var json = JSON.parse(data);
			console.log(json.code);
			if(json.code==301){
            	alert("您为非法用户！");
            	window.location.href=homeUrl+"stu/safe";
            }else if(json.code==302){
            	alert("您停留时间过长！");
            	window.location.href=homeUrl+"stu/safe";
            }else if (json.code == 200) {
				var list = json.data;
				$('#eptJobPre div:first').empty();
				for (var i = 0; i < list.length; i++) {
					var expectionJob = list[i];
					firstExpJobDiv(expectionJob);
				}
			} else if (json.code == 404) {
				console.log("ajax成功后或许的code2="+ json.code);
				$("#eptJobPre div:first").empty();
				createEmptyDiv();
			}
		},
		error : function(json) {
			console.log("访问服务器失败的code为" + json.code);
			alert("访问服务器失败！");
		},
	})
}

// 点击获取到数据库的求职意向list ,通过学生id拿
$(nav_li[1]).click(function(){
	getExpectionJob();
})

function firstExpJobDiv(expectionJob) {
	/*var ejobSalary = salary_a[expectionJob.ejobSalary];// 期望薪资	
	}*/
	//由常量表改为手动输入  2017/5/19
	var ejobSalary=expectionJob.ejobSalary;// 期望薪资
	if(ejobSalary==undefined){
		ejobSalary="";
	}
	var ejobCotyId = cmptyp_a[expectionJob.ejobCotyId];// 转换公司性质
	if(ejobCotyId==undefined){
		ejobCotyId="";
	}
	var ejobType = Wrktyp_a[expectionJob.ejobType];// 转换工作类型
	if(ejobType==undefined){
		ejobType="";
	}
	var ejobType = Wrktyp_a[expectionJob.ejobType];// 转换工作类型
	var ejobArrivalTime = turnArrivalTime(expectionJob.ejobArrivalTime);// 到岗时间
	if(expectionJob.ejobLocId>0){
		var provinceId =parseInt((expectionJob.ejobLocId + "").substring(0, 3)+ "0000000000000") ;
		expectionJob.ejobProvince=ChineseDistricts[1000000000000000][provinceId];
		var ejobProvincepreview=expectionJob.ejobProvince;
		expectionJob.ejobCity = (expectionJob.ejobLocId + "").substring(3, 5);// 28
		var cityId= parseInt((expectionJob.ejobLocId + "").substring(0, 5)+ "00000000000");
		if (expectionJob.ejobCity !='00') {
			expectionJob.ejobCity=ChineseDistricts[provinceId][cityId];
			ejobProvincepreview +="--"+expectionJob.ejobCity;
		}
		if ((expectionJob.ejobLocId + "").substring(5, 7) != '00') {
			expectionJob.ejobArea=ChineseDistricts[cityId][expectionJob.ejobLocId];
			ejobProvincepreview +="--"+expectionJob.ejobArea;
		}
	}else{
		var ejobProvincepreview="";
	}
	
	// 行业转换显示
	if(expectionJob.ejobIndId>0){
		expectionJob.ejobIndIdfirst = parseInt((expectionJob.ejobIndId+ "").substring(0,4)+"000000000");
		var ejobIndIdfirstpreview = industry[1000000000000][expectionJob.ejobIndIdfirst];
		var ejobIndIdSecondpreview = industry[expectionJob.ejobIndIdfirst][expectionJob.ejobIndId];
		var ejobIndIdpreview = ejobIndIdfirstpreview + "--/" + ejobIndIdSecondpreview;
	}else{
		var ejobIndIdpreview="";
	}
	// 职业转换显示
	if(expectionJob.ejobDuty>0){
		expectionJob.ejobDutyfirst = parseInt((expectionJob.ejobDuty + "").substring(0, 4)+ "000000000");
		var ejobDutyfirstpreview = industry[1000000000000][expectionJob.ejobIndIdfirst];
		expectionJob.ejobDutysecond = parseInt((expectionJob.ejobDuty + "").substring(0,7)+"000000");
		var ejobDutysecondpreview = industry[expectionJob.ejobDutyfirst][expectionJob.ejobDutysecond];
		expectionJob.ejobDutythrid = parseInt((expectionJob.ejobDuty + "").substring(0,10)+ "000");
		var ejobDutythridpreview = industry[expectionJob.ejobDutysecond][expectionJob.ejobDutythrid];
		if (expectionJob.ejobDutythrid != expectionJob.ejobDuty) {
			ejobDutythridpreview+= "--/"+ industry[expectionJob.ejobDutythrid][expectionJob.ejobDuty];
		} 
	}else{
		var ejobDutythridpreview="";
	}
    //其他的转化
    if(expectionJob.ejobWeekend){
        var weekend_wk="有双休";
    }else{
        var weekend_wk="";
    }
    if(expectionJob.ejobYearVacation){
        var yearvacation_yv="年假";
    }else{
        var yearvacation_yv='';
    }
    if(expectionJob.ejobNightShift){
        var nightshift_ns="无夜班";
    }else{
        var nightshift_ns='';
    }
    if(expectionJob.ejobOvertime){
        var overtime_ot="无加班";
    }else{
        var overtime_ot='';
    }
    if(expectionJob.ejobMeal){
        var meal_m="包吃";
    }else{
        var meal_m="";
    }
    if(expectionJob.ejobAccommodation){
        var accom="包住";
    }else{
        var accom="";
    }
    if(expectionJob.ejobOutWork){
        var outwork_ow="不出差";
    }else{
        var outwork_ow="";
    }
    if(expectionJob.ejobFInsurance){
        var finsur="五险";
    }else{
        var finsur='';
    }
    if(expectionJob.ejobOneFund){
        var onefund="公积金";
    }else{
        var onefund='';
    }


	var jsonStr =JSON.stringify(expectionJob);
	

$('#eptJobPre div:first').append(
		"<div>"
		+ "<div class='click_to_ed'><span onclick='toJobInfEdi("+ jsonStr+ ")'>点此编辑</span><div class='editBtn'></div>"
		+ "</div>"
		+ "<ul class='list-unstyled'>"
		+ "<li  id='ejobSalary_showid"+expectionJob.ejobId+"'><label class='pre_label' >期望薪资</label>:<span>"
		+ ejobSalary
		+ "</span></li>"
		+ "<li id='ejobLocId_showid"+expectionJob.ejobId+"'><label class='pre_label'>工作地点</label>:<span>"
		+ ejobProvincepreview
		+ "</span></li>"
		+ "</li>"
		+ "<li id='ejobIndId_showid"+expectionJob.ejobId+"'><label class='pre_label'>行业</label>:<span>"
		+ ejobIndIdpreview
		+ "</span></li>"
		+ "<li id='ejobDuty_showid"+expectionJob.ejobId+"'><label class='pre_label'>职能</label>：<span>"
		+ ejobDutythridpreview
		+ "</span></li>"
		+ "<li  id='ejobCoty_showid"+expectionJob.ejobId+"'><label class='pre_label'>企业性质</label>：<span>"
		+ ejobCotyId
		+ "</span></li>"
		+ "<li id='ejobType_showid"+expectionJob.ejobId+"'><label class='pre_label'>工作类型</label>：<span>"
		+ ejobType
		+ "</span></li>"
		+ "<li><label class='pre_label'>到岗时间</label>：<span>"
		+ ejobArrivalTime
		+ "</span></li>"
		+ "<li id='others"+expectionJob.ejobId+"'><label class='pre_label'>其他</label>："
        +weekend_wk+"</span> "
        +yearvacation_yv+"</span> "
        +nightshift_ns+"</span> "
        +overtime_ot+"</span> "
        +meal_m+"</span> "
        +accom+"</span> "
        +outwork_ow+"</span> "
        +finsur+"</span> "
        +onefund+"</span> "
		+ '<li hidden="true" style="display: none" ><label class="pre_label">主键</label>：<span>'+expectionJob.ejobId+'</span>'
		+ "</ul>"
		+ "<div class='delete'><a class='delete_btn' id='del_job+'"
		+ expectionJob.ejobId + " title='点击删除该列'"
		+ "onclick='delete_expectionJob("+expectionJob.ejobId+")'"
		+	"></a></div></div>"
	);
	//是否隐藏期望薪资
	//console.log('ejobSalary='+expectionJob.ejobSalary);
	if(expectionJob.ejobSalary!=null&&expectionJob.ejobSalary>0){		
		$("#ejobSalary_showid"+expectionJob.ejobId+"").css('display','block');
	}else{
		$("#ejobSalary_showid"+expectionJob.ejobId+"").css('display','none');
	}
	//是否隐藏省市区
	if(expectionJob.ejobLocId>0&&expectionJob.ejobLocId!=null){
		if(parseInt((expectionJob.ejobLocId + "").substring(0, 3))!=0){
			$("#ejobLocId_showid"+expectionJob.ejobId+"").css('display','block');
		}
	}else{
		$("#ejobLocId_showid"+expectionJob.ejobId+"").css('display','none');
	}
	//是否隐藏行业
	if(expectionJob.ejobIndId>0&&expectionJob.ejobIndId!=null){
		if(parseInt((expectionJob.ejobIndId+ "").substring(0,4))!=0){
			$("#ejobIndId_showid"+expectionJob.ejobId+"").css('display','block');
		}
	}else{
		$("#ejobIndId_showid"+expectionJob.ejobId+"").css('display','none');
	}
	//是否隐藏公司性质
	if(expectionJob.ejobCotyId!=null&&expectionJob.ejobCotyId>0){
		$("#ejobCoty_showid"+expectionJob.ejobId+"").css('display','block');
	}else{
		$("#ejobCoty_showid"+expectionJob.ejobId+"").css("display","none");	
	}
	//是否隐藏工作类型
	if(expectionJob.ejobType==null||expectionJob.ejobType==0||expectionJob.ejobType==""){
		$("#ejobType_showid"+expectionJob.ejobId+"").css('display','none');
	}else{
		$("ejobType_showid"+expectionJob.ejobId+"").css("display","block");	
	}
	//是否隐藏其他
	if(weekend_wk==''&&yearvacation_yv==''&&nightshift_ns==''
		&&overtime_ot==''&&meal_m==''&&accom==''&&outwork_ow==''&&finsur==''&&onefund==''){
		$("#others"+expectionJob.ejobId+"").css('display','none');
	}else{
		$("#others"+expectionJob.ejobId+"").css('display','block');
	}
	//是否隐藏职能
	if(expectionJob.ejobDuty!=null&&expectionJob.ejobDuty>0){
		$("#ejobDuty_showid"+expectionJob.ejobId+"").css('display','block');
	}else{
		$("#ejobDuty_showid"+expectionJob.ejobId+"").css("display","none");	
	}
}

function createEmptyDiv(){
	$('#eptJobPre div:first')
	.append(
			"<div> "
					+ "<div class='click_to_ed'  onclick='toJobInfEdi()'>"
					+ "<span>点此编辑</span>"
					+ "<div class='editBtn'></div>"
//					+ "<div class='clear'></div>"
					+ "</div>"
//					+"<div class='clear'></div>"
					+ "<ul class='jobIntInfo'>"
					+ "<li><label class='pre_label'>期望薪资</label>:<span>未填写</span></li>"
					+ "<li><label class='pre_label'>工作地点</label>:<span>省</span>"
					+ "<span>市</span><span>区</span></li>"
					+ "</li>"
					+ "<li><label class='pre_label'>行业</label>:<span>未填写</span></li>"
					+ "<li><label class='pre_label'>职能</label>：<span>未填写</span></li>"
					+ "<li><label class='pre_label'>企业性质</label>：<span>未填写</span></li>"
					+ "<li><label class='pre_label'>工作类型</label>：<span>未填写</span></li>"
					+ "<li><label class='pre_label'>到岗时间</label>：<span>未填写</span></li>"
					/*+ "<li><label class='pre_label'>其他</label>："
					+ ((pageExpJob.ejobWeekend)?true:"有双休","")+"</span>"
					+ ((pageExpJob.ejobYearVacation)?true:"","年假")+"</span> "
					+ ((pageExpJob.ejobNightShift)?true:"","无夜班")+"</span> "
					+ ((pageExpJob.ejobOvertime)?true:"","无加班")+"</span> "
					+ ((pageExpJob.ejobMeal)?true:"包吃","")+"</span> "
					+ ((pageExpJob.ejobAccommodation)?true:"包住","")+"</span> "
					+ ((pageExpJob.ejobOutWork)?true:"","无出差")+"</span> "
					+ ((pageExpJob.ejobFInsurance)?true:"有五险","")+"</span> "
					+ ((pageExpJob.ejobOneFund)?true:"公积金","")+"</span> "*/
					+ '<li hidden="true" style="display: none" ><label class="pre_label">主键</label>：<span></span>'
					+ "</ul><div class='clear'></div>"
					+ "<div class='add'><a class='add_btn' id='add_job+'"
					+ expectionJob.ejobId
					+ " title='点击添加更多'" +
							"onclick=add_job("+expectionJob.ejobId+")" +
							"></a></div></div>");
}

// 删除
function delete_expectionJob(ejobId) {
	console.log("删除的依据ejobId="+ejobId);
	var expjob_stuId=personalBaseInfo.stuId;
	var urlHref = window.location.href;
	var guid = urlHref.split("#")[1];
	if (confirm("确定要删除吗？")) {
		$.ajax({
			type:'post',
			url : homeUrl+'StudentsJobIntention/deleteEJobInfo',
			async:false,
			data : {
				"ejobId" : ejobId,
				"stuId" : expjob_stuId,
				"guid" : guid,
			},
			success:function(data){
				if(data.code==301){
	            	alert("您为非法用户！");
	            	window.location.href=homeUrl+"stu/safe";
	            }else if(data.code==302){
	            	alert("您停留时间过长！");
	            	window.location.href=homeUrl+"stu/safe";
	            }else if(data.code=200){
					console.log("ajax删除成功" );
					alert("删除成功");
					getExpectionJob();
				}else  {
					alert(data.code);
				}
				getExpectionJob();
				//删完继续留在预览页
				$('#eptJobEdi').css('display','none');
				$('#eptJobPre').css('display','block');
				
			},
			error : function(json) {
				console.log("访问服务器失败的code为" + json.code);
				alert("访问服务器失败！");
			},
			
		})
	}
}




// 到岗时间转化方法
function turnArrivalTime(ArrivalTime){
		switch(ArrivalTime){
			case "1":
			ArrivalTime="随时";
			break;
			case "2":
				ArrivalTime="一周内";
				break;
			case "3":
				ArrivalTime="两周内";
				break;
			case "4":
				ArrivalTime="一个月内";
				break;
		}
		return ArrivalTime;
};




//点此编辑按钮
function toJobInfEdi(expectionJob){
	$('#eptJobPre').css('display','none');
	$('#eptJobEdi').css('display','block');
	//项目经验Id
	$('#expectionJobId').val(expectionJob.ejobId);
	//期望薪资
	
	$('#eptPay_id').val(expectionJob.ejobSalary);//2000-2499 拿到
	
	//工作类型
	wrktyp_getoption();
	$("#jobType0 option[value='"+expectionJob.ejobType+"']").attr("selected",
			"selected");
	$("#jobType0").change();
	//企业性质
	cmptyp_getoption();
	$("#enterpriseType0 option[value='"+expectionJob.ejobCotyId+"']").attr("selected",
			"selected");
	$("#enterpriseType0").change();
    //其他
    document.getElementById("weekend").checked = expectionJob.ejobWeekend;//双休
    document.getElementById("yearVacation").checked = expectionJob.ejobYearVacation;//年假
    document.getElementById("nightShift").checked = expectionJob.ejobNightShift;//夜班
    document.getElementById("overtime").checked = expectionJob.ejobOvertime;//加班
    document.getElementById("outWork").checked = expectionJob.ejobOutWork;//出差
    document.getElementById("fInsurance").checked = expectionJob.ejobFInsurance;//五险
    document.getElementById("oneFund").checked = expectionJob.ejobOneFund;//公积金
    document.getElementById("accommodation").checked = expectionJob.ejobAccommodation;//包住
    document.getElementById("meal").checked = expectionJob.ejobMeal;//包吃
	
	//省
//	"ejobProvince" : "",// 期望工作地点省//工作职位所用的js前台数据传输
//	"ejobCity" : "",// 期望工作地点市//工作职位所用的js前台数据传输
//	"ejobArea" : "",// 期望工作地点区//工作职位所用的js前台数据传输
	$('#jobProvince').val(expectionJob.ejobProvince);
	$('#jobProvince').change();
	if (expectionJob.ejobCity != "") {
		$("#jobCity").val(expectionJob.ejobCity);
		$("#jobCity").change();
	}
	if (expectionJob.ejobArea != "") {
		$("#jobDistrict").val(expectionJob.ejobArea);
	}
	


//行业
	eptJobIndustry1(1000000000000);
	$("#eptJobIndustry1").val(expectionJob.ejobIndIdfirst);
	eptJobIndustry2(expectionJob.ejobIndIdfirst);
	$("#eptJobIndustry2").val(expectionJob.ejobIndId);
	// 所在职业
	eptJobfunction1(1000000000000);
	$("#eptJobfunction1").val(expectionJob.ejobDutyfirst);
	eptJobfunction2(expectionJob.ejobDutyfirst);
	$("#eptJobfunction2").val(expectionJob.ejobDutysecond);
	eptJobfunction3(expectionJob.ejobDutysecond);
	$("#eptJobfunction3").val(expectionJob.ejobDutythrid);
	if (expectionJob.ejobDutythrid != expectionJob.ejobDuty) {
		eptJobfunction4(expectionJob.ejobDutythrid);
		$("#eptJobfunction4").val(expectionJob.ejobDuty);
	}
	
	$("#jobType0_limit").css("display","none");
	$("#eptJobfunction4span").css("display","none");
}

//点击添加更多
function add_job() {
	$('#eptJobEdi').css('display', 'block');
	$('#eptJobPre').css('display', 'none');
	$('#expectionJobId').val('');
	/*$("#eptPay option[value='" + 0 + "']").attr("selected", "selected");// 根据值让option选中
*/	$("#eptPay_id").val('');
	
	$("#jobProvince").val('');
	$("#jobProvince").change();
	//console.log($("#jobProvince").val());
	
	$("#jobCity").val('');
	$("#jobCity").change();
	//console.log($("#jobCity").val());
	
	
	$("#jobDistrict").val('');
	$("#jobDistrict").change();
	//console.log($("#jobDistrict").val());
	
	$("#eptJobIndustry1").val('');
	$("#eptJobIndustry2").val('');
	$("#eptJobfunction1").val('');
	$("#eptJobfunction2").val('');
	$("#eptJobfunction3").val('');
	$("#eptJobfunction4").val('');
	$("#enterpriseType0 option[value='"+0+"']").attr("selected","selected");//根据值让option选中 
	$("#jobType0 option[value='"+0+"']").attr("selected","selected");//根据值让option选中 
	$("#enterTime0 option[value='"+0+"']").attr("selected","selected");//根据值让option选中 
	$("#ejobId").attr("value",0);

	//其他
	$("#weekend").attr("checked",false);// 双休
	$("#yearVacation").attr("checked",false);// 年假
	$("#nightShift").attr("checked",false);// 夜班
	$("#overtime").attr("checked",false);// 加班
	$("#outWork").attr("checked",false);// 出差
	$("#fInsurance").attr("checked",false);// 五险
	$("#oneFund").attr("checked",false);// 公积金
	$("#accommodation").attr("checked",false);// 包住
	$("#meal").attr("checked",false);// 包吃

	$("#jobType0_limit").css("display","none");
	$("#eptJobfunction4span").css("display","none");

}

//判断修改or保存
function saveOrUpdateExpectionJob(){
	//'eptPay_id'--期望薪资id   jobProvince--省             eptJobfunction3--3级职能
    if(
    	($("#eptPay_id").val()==0||$("#eptPay_id").val()==""||$("#eptPay_id").val()==null)
    	&&($("#jobProvince").val() == 0||$("#jobProvince").val() == ""||$("#jobProvince").val() == null)
    	&&($("#eptJobfunction3").val() == "" || $("#eptJobfunction3").val() == 0|| $("#eptJobfunction3").val() == null)){
		$("#eptJobfunction4span").css("display", "block");
	}/*else if ($("#eptJobIndustry2").val() == "" || $("#eptJobIndustry2").val() == 0
			|| $("#eptJobIndustry2").val() == null) {
		$("#eptJobIndustry2span").css("display", "block");// 验证行业
	}*/else if($("#jobType0").val()==0||$("#jobType0").val()==""||$("#jobType0").val()==null){
		$("#jobType0_limit").css("display","block");
	}
	
	else{
		var expectionJobId = $("#expectionJobId").val();
		console.log('修改或保存依据：expectionJobId='+expectionJobId);
		if(expectionJobId != "" && expectionJobId > 0){
			updateExpJob();
		}else{
			saveExpJob();
		}
	}
}
//修改
function updateExpJob(){
	//console.log("进入修改方法");
	//console.log($('#expectionJobId').val());//11
	expectionJob.ejobId=$('#expectionJobId').val();
	expectionJob.ejobStuId = personalBaseInfo.stuId;
	expectionJob.ejobSalary=$("#eptPay_id").val();//获得期望薪资	
	expectionJob.ejobCotyId=$("#enterpriseType0 option:selected").val();//获得企业性质	
	expectionJob.ejobType = $("#jobType0 option:selected").val();// 获得工作类型
	expectionJob.ejobArrivalTime=$("#enterTime0 option:selected").val();//获得到岗时间	
	if ($('#jobCity').val() == "") {
		var district = $('#jobProvince').val();
	} else if (district == "") {
		district = $('#jobCity').val();
	}else {
		district = $('#jobDistrict').val();
	}
	for ( var i in ChineseDistricts) {
		for ( var j in ChineseDistricts[i]) {
			if (ChineseDistricts[i][j] == district) {
				j = parseInt(j);
	expectionJob.ejobLocId = j;//获得地区id
				break;
			}
		}
	}
	//console.log(expectionJob.ejobLocId);
	//其他
	expectionJob.ejobWeekend=document.getElementById("weekend").checked;//双休
	expectionJob.ejobYearVacation=document.getElementById("yearVacation").checked;//年假
	expectionJob.ejobNightShift=document.getElementById("nightShift").checked;//夜班
	expectionJob.ejobOvertime=document.getElementById("overtime").checked;//加班
	expectionJob.ejobOutWork=document.getElementById("outWork").checked;//出差
	expectionJob.ejobFInsurance=document.getElementById("fInsurance").checked;//五险
	expectionJob.ejobOneFund=document.getElementById("oneFund").checked;//一金
	expectionJob.ejobAccommodation=document.getElementById("accommodation").checked;//包住
	expectionJob.ejobMeal=document.getElementById("meal").checked;//包吃
    // 获得行业
	expectionJob.ejobIndId = $("#eptJobIndustry2").val();
	// 获得职业
	if ($("#eptJobfunction4").val() == 0 || $("#eptJobfunction4").val() == ""
			|| $("#eptJobfunction4").val() == null) {
		expectionJob.ejobDuty = $("#eptJobfunction3").val();
	} else {
		expectionJob.ejobDuty = $("#eptJobfunction4").val();
	}
	var urlHref=window.location.href;
	var guid=urlHref.split("#")[1];
	$.ajax({
		url : homeUrl+'StudentsJobIntention/updateEJobInfo?guid='+guid,
		async : false, // 改成同步
		data : expectionJob,
		type : 'post',
		success : function(data) {
			var jsonMap = JSON.parse(data);
			if (jsonMap.code == 200) {
				alert("修改成功");
				console.log("修改成功");
				getExpectionJob();
				$('#eptJobEdi').css('display', 'none');
				$('#eptJobPre').css('display', 'block');
			}else if(jsonMap.code==301){
            	alert("您为非法用户！");
            	window.location.href=homeUrl+"stu/safe";
            }else if(jsonMap.code==302){
            	alert("您停留时间过长！");
            	window.location.href=homeUrl+"stu/safe";
            }
		},
		error : function() {
			alert("访问服务器失败！");
		},
	})
	
	
	
	
}
//保存
function saveExpJob(){
	console.log("进入保存方法");
	expectionJob.ejobStuId = personalBaseInfo.stuId;
	expectionJob.ejobId=$('#expectionJobId').val();
	expectionJob.ejobSalary=$("#eptPay_id").val();//获得期望薪资
	expectionJob.ejobCotyId=$("#enterpriseType0 option:selected").val();//获得企业性质	
	expectionJob.ejobType = $("#jobType0 option:selected").val();// 获得工作类型
	expectionJob.ejobArrivalTime=$("#enterTime0 option:selected").val();//获得到岗时间	
	
	//获得期望工作地点
	console.log($('#jobCity').val());
	
	
	if ($('#jobCity').val() == ""||$('#jobCity').val() ==null) {
		//console.log("jobCity是null/“”");
		var district = $('#jobProvince').val();
		//console.log(district);//null
		
		expectionJob.ejobLocId=0;
		
	} else if (district == ""||district==null) {
		district = $('#jobCity').val();
		console.log(district);
	}else {
		district = $('#jobDistrict').val();
		console.log(district);
	}
	
	
	for ( var i in ChineseDistricts) {
		for ( var j in ChineseDistricts[i]) {
			if (ChineseDistricts[i][j] == district) {
				j = parseInt(j);
	expectionJob.ejobLocId = j;//获得地区id
				break;
			}
		}
	}
	//其他
	expectionJob.ejobWeekend=document.getElementById("weekend").checked;//双休
	expectionJob.ejobYearVacation=document.getElementById("yearVacation").checked;//年假
	expectionJob.ejobNightShift=document.getElementById("nightShift").checked;//夜班
	expectionJob.ejobOvertime=document.getElementById("overtime").checked;//加班
	expectionJob.ejobOutWork=document.getElementById("outWork").checked;//出差
	expectionJob.ejobFInsurance=document.getElementById("fInsurance").checked;//五险
	expectionJob.ejobOneFund=document.getElementById("oneFund").checked;//一金
	expectionJob.ejobAccommodation=document.getElementById("accommodation").checked;//包住
	expectionJob.ejobMeal=document.getElementById("meal").checked;//包吃
	 // 获得行业
	expectionJob.ejobIndId = $("#eptJobIndustry2").val();
	// 获得职业
	if ($("#eptJobfunction4").val() == 0 || $("#eptJobfunction4").val() == ""
			|| $("#eptJobfunction4").val() == null) {
		expectionJob.ejobDuty = $("#eptJobfunction3").val();
	} else {
		expectionJob.ejobDuty = $("#eptJobfunction4").val();
	}
	var urlHref=window.location.href;
	var guid=urlHref.split("#")[1];
	$.ajax({
		url : homeUrl+'StudentsJobIntention/saveEJobInfo?guid='+guid,
		async : false, 
		data : expectionJob,
		type : 'post',
		success : function(data) {
			var jsonMap = JSON.parse(data);
			console.log(jsonMap.code);
			if (jsonMap.code == 200) {
				alert("保存成功");
				console.log("保存成功");
				getExpectionJob();
				$('#eptJobEdi').css('display', 'none');
				$('#eptJobPre').css('display', 'block');
			}else if(jsonMap.code==301){
            	alert("您为非法用户！");
            	window.location.href=homeUrl+"stu/safe";
            }else if(jsonMap.code==302){
            	alert("您停留时间过长！");
            	window.location.href=homeUrl+"stu/safe";
            }
		},
		error : function() {
			alert("访问服务器失败！");
		},
	})
}

//不为空验证
$("#jobProvince").change(function(){//省
	if($("#jobProvince").val()==0){
	}else{
		$("#eptJobfunction4span").css("display","none");	
	}
})
$("#eptPay_id").change(function(){//省
	if($("#eptPay_id").val()==0||$("#eptPay_id").val()==""||$("#eptPay_id").val()==null){
	}else{
		$("#eptJobfunction4span").css("display","none");	
	}
})
$("#eptJobfunction3").change(function(){//省
	if($("#eptJobfunction3").val() == "" || $("#eptJobfunction3").val() == 0
			|| $("#eptJobfunction3").val() == null){
	}else{
		$("#eptJobfunction4span").css("display","none");	
	}
})

$("#jobType0").change(function(){//工作类型
	if($("#jobType0").val()==0||$("#jobType0").val()==""||$("#jobType0").val()==null){
		$("#jobType0_limit").css("display","block");	
	}else{
		$("#jobType0_limit").css("display","none");	
	}
})

/*// 行业验证
$("#eptJobIndustry2").change(
		function() {
			if ($("#eptJobIndustry2").val() == "" || $("#eptJobIndustry2").val() == 0
					|| $("#eptJobIndustry2").val() == null) {
				$("#eptJobIndustry2span").css("display", "block");
			} else {
				$("#eptJobIndustry2span").css("display", "none");
			}
		});*/

//职业验证
$("#eptJobfunction3").change(
		function() {
			if ($("#eptJobfunction3").val() == "" || $("#eptJobfunction3").val() == 0
					|| $("#eptJobfunction3").val() == null) {
				$("#eptJobfunction4span").css("display", "block");
			} else {
				$("#eptJobfunction4span").css("display", "none");
			}
		});




