var EnterInfo={};
var Entercvs={};
//1.加载完成就显示出企业信息
var homePageJobFairPageSize = 3;
var homePageJobFairCurrentPage = 1;
var homePageJobFairPageCount=0;

var homePagePositionPageSize=2;
var homePagePositionCurrentPage=1;
var homePagePositionPageCount=0;
function FormatDateB(strTime) {
	var date = new Date(strTime);
	return date.getFullYear() + "-" + (date.getMonth() + 1) + "-"
			+ date.getDate() + " " + date.getHours() + ":" + date.getMinutes()
			+ ":" + date.getSeconds();
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
//首页直接显示的信息
$.ajax({	
	url:homeUrl+'JobFairView/getallEnterJofai',
	async : false,
	data : {
		"pageSize" : homePageJobFairPageSize,
		"currentPage" : homePageJobFairCurrentPage,
	},
		type : 'post',
		success : function(data) {
			var json = JSON.parse(data);
			var PageUtil=json.PageUtil;	
			if (json.code == 200) {
				var list = json.data;
				$("#JobfairView_id").empty();// 先清空
				if (list.length > 0) {
					for (var i = 0; i < list.length; i++) {
						var jolis = list[i];
						var j=JSON.parse(jolis)
						turnToStandard(j);
					}
				}
				homePageJobFairPageCount=json.pageCount;// 总页数
				var currentPage=PageUtil.currentPage;// 当前页，前台->后台->前台
				var pageSize=PageUtil.pageSize;
				var recordCount=PageUtil.recordCount;// 总记录数
				pagingHome(homePageJobFairPageCount);
			}
		},
		error : function() {
			alert("访问服务器失败！");
		},
	});

// JobFair:显示招聘会信息到页面
$("#JobfairFirst").click(function(){
	$("#JobfairFirstJoblistsFitsrprei").css("display","block");
	$("#positiondetailPagePrei").css("display","none");
	$("#enterdetailPagePrei").css("display","none");
	$.ajax({	
		url:homeUrl+'JobFairView/getallEnterJofai',
		async : false,
		data : {
			"pageSize" : homePageJobFairPageSize,
			"currentPage" : homePageJobFairCurrentPage,
		},
			type : 'post',
			success : function(data) {
				var json = JSON.parse(data);
				var PageUtil=json.PageUtil;	
				if (json.code == 200) {
					var list = json.data;
					$("#JobfairView_id").empty();// 先清空
					if (list.length > 0) {
						for (var i = 0; i < list.length; i++) {
							var jolis = list[i];
							var j=JSON.parse(jolis)
							turnToStandard(j);
						}
					}
					homePageJobFairPageCount=json.pageCount;// 总页数
					var currentPage=PageUtil.currentPage;// 当前页，前台->后台->前台
					var pageSize=PageUtil.pageSize;
					var recordCount=PageUtil.recordCount;// 总记录数
					pagingHome(homePageJobFairPageCount);
				}
			},
			error : function() {
				alert("访问服务器失败！");
			},
		});
});
// 显示职业信息列表
$("#JoblistsFitsr").click(function(){
	$("#JobfairFirstJoblistsFitsrprei").css("display","block");
	$("#positiondetailPagePrei").css("display","none");
	$("#enterdetailPagePrei").css("display","none");
	$.ajax({
		url:homeUrl+'JobFairView/getallEnterPosition',
		async : false,
		data : {
			"pageSize" : homePagePositionPageSize,
			"currentPage" : homePagePositionCurrentPage,
		},
		type : 'post',
		success : function(data) {
			var json = JSON.parse(data);
			var PageUtil=json.PageUtil;	
			if (json.code == 200) {
				var list = json.data;
				$("#JoblistsView_id").empty();// 先清空
				if (list.length > 0) {
					for (var i = 0; i < list.length; i++) {
						var jolis = list[i];
						var j=JSON.parse(jolis);
						createPositionDiv(j);
					}		
				}
			}else if(json.code==402){
				alert("数据库为空");
				console.log("数据库为空");
			}
			homePagePositionPageCount =json.pageCount;// 总页数
			var currentPage=PageUtil.currentPage;// 当前页
			var pageSize=PageUtil.pageSize;// pageSize
			var recordCount=PageUtil.recordCount;// 总记录数
			pagingPositionHome(homePagePositionPageCount);
		},
		error : function() {
			alert("访问服务器失败！");
		},
	});
});


// JobFair:createDiv function
function turnToStandard(j) {
	var DateMonth = TurnMonth(j.JobFairDate.split(",")[0].trim().split(" ")[0].trim());
	var DateDay = j.JobFairDate.split(",")[0].trim().split(" ")[1].trim();
	var DateYear = j.JobFairDate.split(",")[1].trim();
	var Date = DateYear + "-" + DateMonth + "-" + DateDay;
	var STime = j.JobFairSTime.split(" ")[3]+j.JobFairSTime.split(" ")[4];
	var ETime = j.JobFairETime.split(" ")[3]+j.JobFairETime.split(" ")[4];	
	// 验证企业性质是否为空
	var comTypeShow;
	if(j.enterType==9){
		comTypeShow=" ";
	}else{
		comTypeShow=cmptyp_a[j.enterType];
	}
	$("#JobfairView_id").append('<li class="position_list_item default_list"><div class="pli_top"><div class="fl pli_top_l"><div class="position_name"><h2 class="fl">'+
			'<a class="position_link fl wordCut" target="_blank" title="'+j.enterName+'" onclick="togetenterdetailInfo('+j.jofaiEnterInfoId+');">'
			+j.enterName+'</a></h2><span class="fl" id="comType_id'+j.JobFairId+'">'
			+comTypeShow+'</span></div><div class="position_main_info"><span>'
			+j.JobFairMajor+'</span></div></div><div class="fr pli_top_r"><div class="company_name wordCut" style="color: #333">'
			+j.enterAddress+'</div><div class="industry wordCut" style="color: #333;"><span>'
			+FormatDateB(j.JobFairSTime)+'</span></div></div></div></li>');
	if(j.JobFairType==false){
		$('#comType_id'+j.JobFairId+'').empty();//如果是供需会的话就隐藏
	}
}
function createPositionDiv(j) {
	// 发布日期
	var postMonth=TurnMonth(j.JobListPostTime.split(",")[0].trim().split(" ")[0].trim());
	var postDay = j.JobListPostTime.split(",")[0].trim().split(" ")[1].trim();
	var postYear = j.JobListPostTime.split(",")[1].trim();
	var postTime=postYear + "年" + postMonth + "月" + postDay+"日";
	// 截止日期
	var closeMonth=TurnMonth(j.JobListCloseTime.split(",")[0].trim().split(" ")[0].trim());
	var closeDay = j.JobListCloseTime.split(",")[0].trim().split(" ")[1].trim();
	var closeYear = j.JobListCloseTime.split(",")[1].trim();
	var closeTime=closeYear + "-" + closeMonth + "-" + closeDay;
	var a=parseInt((j.EnterInfoIndId1+"").substring(0,4)+"000000000");
	var b=parseInt((j.EnterInfoIndId2+"").substring(0,4)+"000000000");
	var c=parseInt((j.EnterInfoIndId3+"").substring(0,4)+"000000000");
	// 行业是否为空验证
	if(j.EnterInfoIndId1==undefined||j.EnterInfoIndId1==""||j.EnterInfoIndId1==null){
		a1="";
	}else{
		var a1=industry[a][j.EnterInfoIndId1];
	}
	if(j.EnterInfoIndId2==undefined||j.EnterInfoIndId2==""||j.EnterInfoIndId2==null){
		b1="";
	}else{
		var b1=industry[b][j.EnterInfoIndId2];
	}
	if(j.EnterInfoIndId3==undefined||j.EnterInfoIndId3==""||j.EnterInfoIndId3==null){
		c1="";
	}else{
		var c1=industry[c][j.EnterInfoIndId3];
	}
	// 人数为空验证
	var personCount;
	if(j.JobListPersons==-1){
		personCount="无职员";
	}else{
		personCount="共"+j.JobListPersons+"人";
	}
	// 薪资是否为空验证
	var salaryLow;
	var salaryHigh;
	if(j.JobListSalaryLow==-1){
		 salaryLow="";
	}else{
		 salaryLow=j.JobListSalaryLow
	}
	if(j.JobListSalaryHigh==-1){
		 salaryHigh="";
	}else{
		 salaryHigh=j.JobListSalaryHigh;
	}
	if(j.JobListSalaryLow==-1&&j.JobListSalaryHigh==-1){
		salary="薪资面议";
	}else{
		salary=salaryLow+"---"+salaryHigh;
	}
	// 学历转化+验证
	var eduLevel
	if(j.JobListEduId==-1){
		eduLevel="";
	}else{
		eduLevel=edu_a[j.JobListEduId];
	}
	// 学历转化+验证
	var eduLevel
	if(j.JobListEduId==-1){
		eduLevel="学历无";
	}else{
		eduLevel=edu_a[j.JobListEduId];
	}
	// 经验为空验证
	if(j.JobListExperience<0){
		var experienceCount=0;
	}else{
		var experienceCount=j.JobListExperience;
	}
	// 企业性质为空判断
	var comPTypeShow;
	if(j.EnterInfoCmpTypeId==undefined){
		comPTypeShow="";
	}else{
		comPTypeShow=cmptyp_a[j.EnterInfoCmpTypeId];
	}
	// 企业规模为空判断
	if(j.EnterInfoScaleId==undefined){
		j.EnterInfoScaleId="";
	}
	if(j.JobListLocationId!=null){
     	//所在地
     	var province100=parseInt((j.JobListLocationId+"").substring(0,3)+"0000000000000");
     	var basicLoc=ChineseDistricts[1000000000000000][province100];
         var city10 = (j.JobListLocationId+"").substring(3,5);
         var district10=(j.JobListLocationId+"").substring(5,7);
         if(city10!="00"){
        	      var city10=parseInt((j.JobListLocationId+"").substring(0,5)+"00000000000");
        	   basicLoc+="-"+ChineseDistricts[province100][city10];
         }
         if(district10!="00"){
         	basicLoc+="-"+ChineseDistricts[city10][j.JobListLocationId];
         }
     }else{
    	 basicLoc="无工作地点"
     }

	$("#JoblistsView_id").append('<li class="position_list_item default_list"><div class="pli_top"><div class="fl pli_top_l"><div class="position_name"><h2 class="fl"><a class="position_link fl wordCut" title="'+j.JobListName+"["+basicLoc+"]"+'" onclick="togetJolisInfo('+j.JobListId+');">'
			+'<b>'+j.JobListName+"&nbsp;&nbsp;"+ '</b><span>['+basicLoc+']'+'</span></a></div></h2><div class="position_main_info"><span class="salary fl">'
			+salary+'</span>&nbsp;&nbsp;<span>'+'经验'+experienceCount+'年'+'&nbsp'+'/'+eduLevel+'&nbsp'+'/'+personCount+'</span></div></div><div class="fr pli_top_r"><div class="fr pli_top_r"><div class="company_name wordCut"><a target="_blank" onclick="togetenterdetailInfo('+j.JobListEnterId+');">'
			+j.EnterInfoName+'</a></div><div class="industry wordCut"><span>'
			+a1+"-"+b1+c1+"/"+'</span><span>'+comPTypeShow+'</span></div></div></div><div class="pli_btm"><div class="pli_btm_l fl"><span>'
			+postTime+"&nbsp;&nbsp;"+"发布"+'</span></div><div class="pli_btm_r fr wordCut">'
			+'规模&nbsp;'+j.EnterInfoScaleId+'人'+'</div></div></li>');
}

//JobFair: 分页step1
function pagingHome(pageCount){
	$("#totalPage_id").html(pageCount);// 填入总页数
	$("#pageUl_id").empty();// 清空当前节点
	if(pageCount>5){	
		for(var i=0;i<5;i++){
			$("#pageUl_id").append('<li class="on"><a  class="toJump" id="'+(i+1)+'" value="'+(i+1)+'" onclick="javascript:jumpTo(this)" >'+(i+1)+'</a></li>');
		}
		
	}else{
		for(var i=0;i<pageCount;i++){
			$("#pageUl_id").append('<li class="on"><a  class="toJump" id="'+(i+1)+'" value="'+(i+1)+'" onclick="javascript:jumpTo(this)" >'+(i+1)+'</a></li>');
		}
	}
	
	
}

// JobFair：跳到第几页
function jumpTo(obj,pageCount){
	pageCount=homePageJobFairPageCount;
	homePageJobFairCurrentPage=obj.id;	
	getAllEnterJobFair(homePageJobFairCurrentPage,homePageJobFairPageSize);
	$("#pageUl_id").empty();
	if(pageCount-homePageJobFairCurrentPage>=5){
		for(var i=0;i<5;i++){
			$("#pageUl_id").append('<li class="on"><a  class="toJump" id="'+(Number(homePageJobFairCurrentPage)+i)+'"  onclick="javascript:jumpTo(this)" >'+(Number(homePageJobFairCurrentPage)+i)+'</a></li>');
		}
	}else{
		for(var i=0;i<pageCount+1-homePageJobFairCurrentPage;i++){
			$("#pageUl_id").append('<li class="on"><a  class="toJump" id="'+(Number(homePageJobFairCurrentPage)+i)+'"  onclick="javascript:jumpTo(this)" >'+(Number(homePageJobFairCurrentPage)+i)+'</a></li>');
		}
	}
}


// JobFair: step2 分页调用ajax
function getAllEnterJobFair(i,j){
	$.ajax({
		url:homeUrl+'JobFairView/getallEnterJofai',
		async : false,
		data : {
			"currentPage" : i,// 2
			"pageSize" : j,// 5
			
		},
		type : 'post',
		success : function(data) {				
			var json = JSON.parse(data);
			var PageUtil=json.PageUtil;	
			if (json.code == 200) {
				var list = json.data;
				$("#JobfairView_id").empty();// 先清空
				if (list.length > 0) {
					for (var i = 0; i < list.length; i++) {
						j = list[i];
						var j=JSON.parse(j)
						turnToStandard(j);
					}
				}
				homePageJobFairPageCount=json.pageCount;// 总页数
				var currentPage=PageUtil.currentPage;// 当前页，前台->后台->前台
				var pageSize=PageUtil.pageSize;
				var recordCount=PageUtil.recordCount;// 总记录数
				pagingHome(homePageJobFairPageCount);
			}
		},
		error : function() {
			alert("访问服务器失败！");
		},
	});
}

// JobFair: 点击"确定"按钮跳转
function JumpPage(){
	var currentPage=$("#jump_page").val();
	if(currentPage<0||currentPage>homePageJobFairPageCount){
		alert("输入页面错误啊，亲");	
	}else{
		getAllEnterJobFair(currentPage,homePageJobFairPageSize);
		pageCount=homePageJobFairPageCount;
		$("#pageUl_id").empty();
		if(pageCount-currentPage>=5){
			for(var i=0;i<5;i++){
				$("#pageUl_id").append('<li class="on"><a  class="toJump" id="'+(Number(currentPage)+i)+'"  onclick="javascript:jumpTo(this)" >'+(Number(currentPage)+i)+'</a></li>');
			}
		}else{
			for(var i=0;i<pageCount+1-currentPage;i++){
				$("#pageUl_id").append('<li class="on"><a  class="toJump" id="'+(Number(currentPage)+i)+'"  onclick="javascript:jumpTo(this)" >'+(Number(currentPage)+i)+'</a></li>');
			}
		}
	}
}

// JobFair: 上一页
$("#prePage_id").click(function(e){
	var firstPage=$("#pageUl_id li:first-of-type a").text();
	//var currentPage=$("#pageUl_id li a").text();
	//console.log(currentPage);
	if(firstPage=="1"){
		alert("亲，已经是第一页咯");
	}
	else{
		var homePageJobFairCurrentPage=firstPage-1;
		if(homePageJobFairCurrentPage<0){
			alert("请不要这样哦,亲!");
		}else{
			if(homePageJobFairCurrentPage==0){
				alert("原来是这样");
				homePageJobFairCurrentPage=1;
			}
			getAllEnterJobFair(homePageJobFairCurrentPage,homePageJobFairPageSize);
			$("#pageUl_id").empty();
			if(homePageJobFairPageCount-homePageJobFairCurrentPage>=5){
				for(var i=0;i<5;i++){
					$("#pageUl_id").append('<li class="on"><a  class="toJump" id="'+(Number(homePageJobFairCurrentPage)+i)+'" onclick="javascript:jumpTo(this)" >'+(Number(homePageJobFairCurrentPage)+i)+'</a></li>');
				}
			}else{
				for(var i=0;i<homePageJobFairPageCount+1-homePageJobFairCurrentPage;i++){
					$("#pageUl_id").append('<li class="on"><a  class="toJump" id="'+(Number(homePageJobFairCurrentPage)+i)+'" onclick="javascript:jumpTo(this)" >'+(Number(homePageJobFairCurrentPage)+i)+'</a></li>');
				}
			}
		}		
	}
})
// JobFair: 下一页
$("#nextPage_id").click(function(){
	var firstPage=$("#pageUl_id li:first-of-type a").text();
	var lastPage=$("pageUl_id li:last-of-type a").text();
	var length=$("#pageUl_id li").length;	
	var currentPage=$("#pageUl_id li a").text();
	if(length==1){
		alert("亲，已经是最后一页咯");
	}else{
		currentPage=Number(firstPage)+1;	
		getAllEnterJobFair(currentPage,homePageJobFairPageSize);
		$("#pageUl_id").empty();
		if(homePageJobFairPageCount-currentPage>=5){
			for(var i=0;i<5;i++){
				$("#pageUl_id").append('<li class="on"><a  class="toJump" id="'+(Number(currentPage)+i)+'"  onclick="javascript:jumpTo(this)" >'+(Number(currentPage)+i)+'</a></li>');
			}
		}else{
			for(var i=0;i<homePageJobFairPageCount+1-currentPage;i++){
				$("#pageUl_id").append('<li class="on"><a  class="toJump" id="'+(Number(currentPage)+i)+'"  onclick="javascript:jumpTo(this)" >'+(Number(currentPage)+i)+'</a></li>');
			}
		}
	}	
})
// position 循环添加12345
function pagingPositionHome(homePagePositionPageCount){
	var pageCount=homePagePositionPageCount;// 总页数
	$("#jobListTotalPosition_id").html(pageCount);
	$("#jobPosiUl_id").empty();
	if(pageCount>5){	
		for(var i=0;i<5;i++){
			$("#jobPosiUl_id").append('<li class="on"><a  class="toJump" id="'+(i+1)+'" value="'+(i+1)+'" onclick="javascript:posiJumpTo(this)" >'+(i+1)+'</a></li>');
		}
		
	}else{
		for(var i=0;i<pageCount;i++){
			$("#jobPosiUl_id").append('<li class="on"><a  class="toJump" id="'+(i+1)+'" value="'+(i+1)+'" onclick="javascript:posiJumpTo(this)" >'+(i+1)+'</a></li>');
		}
	}
	
	
};
// positionList 点击跳转到哪一页
function posiJumpTo(obj){
	homePagePositionCurrentPage=obj.id;
	console.log(homePagePositionCurrentPage);
	getAllJobPosition(homePagePositionCurrentPage,homePagePositionPageSize);
	$("#jobPosiUl_id").empty();// 清空
	if(homePagePositionPageCount-homePagePositionCurrentPage>=5){
		for(var i=0;i<5;i++){
			$("#jobPosiUl_id").append('<li class="on"><a  class="toJump" id="'+(Number(homePagePositionCurrentPage)+i)+'"  onclick="javascript:posiJumpTo(this)" >'+(Number(homePagePositionCurrentPage)+i)+'</a></li>');
		}
	}else{
		for(var i=0;i<homePagePositionPageCount+1-homePagePositionCurrentPage;i++){
			$("#jobPosiUl_id").append('<li class="on"><a  class="toJump" id="'+(Number(homePagePositionCurrentPage)+i)+'"  onclick="javascript:posiJumpTo(this)" >'+(Number(homePagePositionCurrentPage)+i)+'</a></li>');
		}
	}
}
// positionList
function getAllJobPosition(i,j){
	$.ajax({
		url:homeUrl+'JobFairView/getallEnterPosition',
		async : false,
		data : {
			"pageSize" : j,
			"currentPage" : i,
		},
		type : 'post',
		success : function(data) {
			var json = JSON.parse(data);
			var PageUtil=json.PageUtil;	
			if (json.code == 200) {
				var list = json.data;
				$("#JoblistsView_id").empty();// 先清空
				if (list.length > 0) {
					for (var i = 0; i < list.length; i++) {
						j = list[i];
						var j=JSON.parse(j);
						createPositionDiv(j);
					}
				}
			}else if(json.code==402){
				alert("数据库为空");
				console.log("数据库为空");
			}
			homePagePositionPageCount =json.pageCount;// 总页数
			var currentPage=PageUtil.currentPage;// 当前页
			var pageSize=PageUtil.pageSize;// pageSize
			var recordCount=PageUtil.recordCount;// 总记录数
			pagingPositionHome(homePagePositionPageCount);
		},
		error : function() {
			alert("访问服务器失败！");
		},
	});

}
   
// positionList: 上一页
$("#positionPre_id").click(function(){
	var firstPage=$("#jobPosiUl_id li:first-of-type a").text();
	var currentPage=$("#jobPosiUl_id li a").text();
	if(firstPage=="1"){
		alert("亲，已经是第一页咯");
	}
	else{	
		i=firstPage;
		var homePagePositionCurrentPage=i-1;
		if(homePagePositionCurrentPage<0){
			alert("请不要这样哦,亲!");
		}else{
			getAllJobPosition(homePagePositionCurrentPage,homePagePositionPageSize);
			$("#jobPosiUl_id").empty();
			if(homePagePositionPageCount-homePagePositionCurrentPage>=5){
				for(var i=0;i<5;i++){
					$("#jobPosiUl_id").append('<li class="on"><a  class="toJump"   onclick="javascript:posiJumpTo(this)" >'+(Number(homePagePositionCurrentPage)+i)+'</a></li>');
				}
			}else{
				for(var i=0;i<homePagePositionPageCount+1-homePagePositionCurrentPage;i++){
					$("#jobPosiUl_id").append('<li class="on"><a  class="toJump"   onclick="javascript:posiJumpTo(this)" >'+(Number(homePagePositionCurrentPage)+i)+'</a></li>');
				}
			}
		}
	
	}
	
})
// positionList:下一页
$("#positionNext_id").click(function(){
	var lastPage=$("#jobPosiUl_id li:last-of-type a").text();
	var firstPage=$("#jobPosiUl_id li:first-of-type a").text();
	var length=$("#jobPosiUl_id li a").length;
	if(length==1){
		alert("亲，已经是最后一页咯");
	}else{
		currentPage=(Number)(firstPage)+1;
		getAllJobPosition(currentPage,homePagePositionPageSize);
		$("#jobPosiUl_id").empty();
		if(homePagePositionPageCount-currentPage>=5){
			for(var i=0;i<5;i++){
				$("#jobPosiUl_id").append('<li class="on"><a  class="toJump" id="'+(Number(currentPage)+i)+'"  onclick="javascript:posiJumpTo(this)" >'+(Number(currentPage)+i)+'</a></li>');
			}
		}else{
			for(var i=0;i<homePagePositionPageCount+1-currentPage;i++){
				$("#jobPosiUl_id").append('<li class="on"><a  class="toJump" id="'+(Number(currentPage)+i)+'"  onclick="javascript:posiJumpTo(this)" >'+(Number(currentPage)+i)+'</a></li>');
			}
		}
	}
})

// positionList: "确定"按钮跳转页面
function posiJumpPage(){
	var currentPage=$("#posiJump_page").val();
	if(currentPage<=0||currentPage>homePagePositionPageCount){
		alert("输入页面错误啊，亲");
	}else{
		getAllJobPosition(currentPage,homePagePositionPageSize);
		pageCount=homePagePositionPageCount;
		$("#jobPosiUl_id").empty();
		if(pageCount-currentPage>=5){
			for(var i=0;i<5;i++){
				$("#jobPosiUl_id").append('<li class="on"><a  class="toJump" id="'+(Number(currentPage)+i)+'"  onclick="javascript:posiJumpTo(this)" >'+(Number(currentPage)+i)+'</a></li>');
			}
		}else{
			for(var i=0;i<homePagePositionPageCount+1-currentPage;i++){
				$("#jobPosiUl_id").append('<li class="on"><a  class="toJump" id="'+(Number(currentPage)+i)+'"  onclick="javascript:posiJumpTo(this)" >'+(Number(currentPage)+i)+'</a></li>');
			}
		}
	}
}
//点击显示职位
function cd(){
	$("#clicktoPreijolisInfos").click(function(e){
		$("#companyoverviewprei").css("display","none");
		$("#jolisInfoprei").css("display","block");
		$("#clicktoPreijolisInfos").addClass("current");
		$("#clicktoPreiEnterInfo").removeClass("current");
		e.preventDefault();
	})
		
}
//点击显示公司所有信息
function ab(){
	$("#clicktoPreiEnterInfo").click(function(e){
		$("#companyoverviewprei").css("display","block");
		$("#jolisInfoprei").css("display","none");
		$("#clicktoPreiEnterInfo").addClass("current");
		$("#clicktoPreijolisInfos").removeClass("current");
		e.preventDefault();
	});
} 
function togetenterdetailInfo(enterInfoId){
	$("#JobfairFirstJoblistsFitsrprei").css("display","none");
	$("#positiondetailPagePrei").css("display","none");
	$("#enterdetailPagePrei").css("display","block");
	$("#companyoverviewprei").css("display","block");
	$("#jolisInfoprei").css("display","none");
		var stuId=1;
		var urlHref=window.location.href;
		var guid=urlHref.split("#")[1];
		var stuIdentify=1;
		$.ajax({
			url:homeUrl+'JobFairView/getEnterInfoforHomepage',
			async:false, //改成同步
			data:{
			    "stuId":stuId,
			    "guid":guid,
			    "enterInfoId":enterInfoId,
			    "stuIdentify":stuIdentify,
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
					 EnterInfo=jsonMap.data;
					 var jsonstr = JSON.stringify(EnterInfo);
					 localStorage.enterInfos=jsonstr;//设置值
					 location.href="../html/index_company.html";
				}
			},
			error:function () {
	            alert("访问服务器失败！");
	        },
	    })
	    
}
//显示职位列表
function showJolisInfo(cuurentPage,pagesize){
	$("#shoujolisInfoforHomePage").empty();
	var enterInfoId=$("#enterInfoIdPrei").text();
	 //显示职位信息
	$.ajax({
		url:homeUrl+'jolis/getJoblistsforHomePage',
		async:false, //改成同步
		data:{
			"enterInfoId":enterInfoId,
			"cuurentPage":cuurentPage,
		    "pagesize":pagesize,
		},
		type:'post',
		success:function(date){
			var jsonMap=JSON.parse(date);
			if(jsonMap.code==200){
				var list=jsonMap.data;
				if(list.length>0){
					for(var i=0;i<list.length;i++){
						var Joblists=list[i];
						//获取发布时间预览
                    	var jolisPostDate=Joblists.jolisPostDate.split(",");
                    	var jolisPostDateyear=jolisPostDate[1].trim();
                        var jolisPostDatemonth=TurnMonth(jolisPostDate[0].split(" ")[0]);
                        var jolisPostDateday=jolisPostDate[0].split(" ")[1];
                        var jolisPostDatePrei=jolisPostDateyear+"年 "+jolisPostDatemonth+"月"+jolisPostDateday+"日";
                       //所在地
                    	var province100=parseInt((Joblists.jolisLctId+"").substring(0,3)+"0000000000000");
                    	var city10=parseInt((Joblists.jolisLctId+"").substring(0,5)+"00000000000");
                    	var basicLoc=ChineseDistricts[1000000000000000][province100]+"-"+ChineseDistricts[province100][city10]+"-"+ChineseDistricts[city10][Joblists.jolisLctId];
                    	//薪资
	                    var jolisSalaryLow="0";
	                    if(Joblists.jolisSalaryLow!=null&&Joblists.jolisSalaryLow>0){
	                    	jolisSalaryLow=((Joblists.jolisSalaryLow)/1000)+"k";
	                	}
	                	jolisSalaryHigh=(Joblists.jolisSalaryHigh)/1000;
	                	var showjolisSalary=jolisSalaryLow+"-"+jolisSalaryHigh+"k";
	                	//学历要求
                        var jolisEduId=edu_a[Joblists.jolisEduId]+"及以上"
                        //工作类型
                        var jobType = Wrktyp_a[Joblists.jolisWrktypId];
                        //经验要求
                        var jolisExperence=Joblists.jolisExperence;
                        $("#spanjolisExperence").html(Joblists.jolisExperence+"年以下");
                        if(Joblists.jolisExperence!=null&&Joblists.jolisExperence>0){
                        	jolisExperence="经验"+Joblists.jolisExperence+"年以下";
                        }else{
                        	jolisExperence="经验不限";
                        }
                        console.log(Joblists.jolisName)
						$("#shoujolisInfoforHomePage").append("<li class='con_list_item default_list'>"+
													"<div class='item_title_date'><a class='item_title position_link' onclick='togetJolisInfo("+Joblists.jolisId+");'>"+Joblists.jolisName+"-"+basicLoc+"["+ ChineseDistricts[province100][city10] +" ]</a>" +
															"<span class='item_date'>"+jolisPostDatePrei+"发布</span>"+
													"</div><p class='item_detail'>"+
														"<span class='item_salary'>"+showjolisSalary+"</span>"+
														"<span class='item_desc'>"+jolisExperence+" / "+jolisEduId+" / "+jobType+"</span>"+
													"</p><i class='left_border'></i>"+
												"</li>");
					}
				}else{
				}
				//分页代码
				var PageUtils=jsonMap.datapage;
				var pagesLi=PageUtils.currentPage;
				var currentNode=$(".jolispagination span.current");
				currentNode.html(pagesLi);
				pagesLi=pagesLi+1;
				currentNode.next("span").html(pagesLi);
				pagesLi=pagesLi+1;
				currentNode.next("span").next("span").html(pagesLi);
				pagesLi=pagesLi+1;
				currentNode.next("span").next("span").next("span").html(pagesLi);
				$("#JolistotalPage").html(PageUtils.totalPage);
			}
		},
		error:function () {
            alert("访问服务器失败！");
        },
    })
}
//跳转页面分页代码
$(".tojumpjolis").click(function (e) {
	var cuurentPage=$(this).text();//获取当前页码
	var TotalPage=$("#JolistotalPage").text();//获取总页数
	if(cuurentPage>=TotalPage){
		cuurentPage=TotalPage;
		alert("跳转到最后一页"+TotalPage);
	}
	var pagesize=3;
	showJolisInfo(cuurentPage,pagesize);
	e.preventDefault();
})
//下一页分页代码
$("#jolisNextPage").click(function (e) {
	var cuurentPage=$(".jolispagination span.current").text();
	cuurentPage=cuurentPage*1+1;
	var TotalPage=$("#JolistotalPage").text();//获取总页数
	if(cuurentPage>TotalPage){
		alert("这是最后一页了");
	}else{
		var pagesize=3;
		showJolisInfo(cuurentPage,pagesize);
		e.preventDefault();
	}
})
//上一页分页代码
$("#jolisLastPage").click(function (e) {
	var cuurentPage=$(".jolispagination span.current").text();
	cuurentPage=cuurentPage-1;
	if(cuurentPage<1){
		alert("已经是第一页了");
	}else{
		var pagesize=3;
		showJolisInfo(cuurentPage,pagesize);
		
	}
	e.preventDefault();
})
//首页分页代码
$("#jolisfirstPage").click(function (e) {
	cuurentPage=1;
	var pagesize=3;
	showJolisInfo(cuurentPage,pagesize);
	e.preventDefault();
})
//尾页分页代码
$("#jolisfinalPage").click(function (e) {
	var TotalPage=$("#JolistotalPage").text();//获取总页数
	var cuurentPage=TotalPage;
	var pagesize=3;
	showJolisInfo(cuurentPage,pagesize);
	e.preventDefault();
})

//投递简历并保存数据到entercvs中
function toResumeDelivery(cvsJolisId,cvsEnterInfoId) {
	    Entercvs.cvsStuId = 1;
	    Entercvs.cvsJolisId = cvsJolisId;
	    Entercvs.cvsEnterInfoId = cvsEnterInfoId;
	    Entercvs.cvsStatus=1;
	    Entercvs.cvsProgress=1;
	    Entercvs.cvsApplyDate = new Date();
		var guid="37g337Q99hAP0KShTqhhn9ZI11lLpONT";
		$.ajax({
			url : homeUrl + 'cvs/saveApplyedcvs?guid='+ guid,
			async : false, // 改成同步
			data:Entercvs,
			type : 'post',
			success : function(data) {
				var jsonMap = JSON.parse(data);
				if (jsonMap.code == 200) {
					var list = jsonMap.data;
					alert("已成功投递简历！！");
					$('#hasBeenDelivered').css('display', 'block');
					$('#resumeDelivery').css('display', 'none');
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

//点击职位名显示职位详细
var stuIdentify=true;
var jolis;
function togetJolisInfo(jolisId){
		$.ajax({
			url:homeUrl+'jolis/getDetailpagestu',
			async:false,//改为同步
			data:{
		            "jolisId":jolisId,
		        },
		        type:'post',
			success:function(data){
				var jsonMap = JSON.parse(data);
				if(jsonMap.code==200){
					creatStu();
					var list = jsonMap.data;
					var jsonstr = JSON.stringify(jolis);
					if (list.length > 0) {
						for (var i = 0; i < list.length; i++) {
							var jolis = list[i];
						}
					}
					var jsonstr = JSON.stringify(jolis);
					localStorage.indexjolisinfos=jsonstr;//设置值
					location.href="../html/index_position.html";
				}
			},
			error:function(){
				alert("访问服务器失败！");
			},
		})
}

function creatStu(){
	if(stuIdentify){
		$("#resumeDelivery").css("display","block");
	}else{
		$("#resumeDelivery").css("display","none");
	}
}