var overcvsProgress=0;
//点击跳转应聘管理
window.onload = onloadgetstucvsInfo();
//点击进入职位页面的自加载方法
function onloadgetstucvsInfo(){
	var guid="37g337Q99hAP0KShTqhhn9ZI11lLpONT";
	var urlHref=window.location.href;
	urlHref=urlHref.split("#")[0];   	
	urlHref=urlHref+"#"+guid
	location.href=urlHref;
	var cuurentPage=$(".stucvspagination li.active a").text();
	var pagesize=5;
	var cvsProgress=overcvsProgress;
	if(cvsProgress==""){
		cvsProgress=0;
	}
	getstucvsInfo(cuurentPage,pagesize,cvsProgress);
}
//点击跳转面试
$('#cvsProgressinterview').click( function(e){
	var cuurentPage=1;
	var pagesize=5;
	overcvsProgress=3;
	var cvsProgress=overcvsProgress;
	getstucvsInfo(cuurentPage,pagesize,cvsProgress);
	e.preventDefault();
});
//点击跳转录用
$('#cvsProgresshire').click( function(e){
	var cuurentPage=1;
	var pagesize=5;
	overcvsProgress=4;
	var cvsProgress=overcvsProgress;
	getstucvsInfo(cuurentPage,pagesize,cvsProgress);
	e.preventDefault();
});
//点击跳转待定
$('#cvsProgresswait').click( function(e){
	var cuurentPage=1;
	var pagesize=5;
	overcvsProgress=2;
	var cvsProgress=overcvsProgress;
	getstucvsInfo(cuurentPage,pagesize,cvsProgress);
	e.preventDefault();
});
//点击跳转已接受
$('#cvsProgressaccept').click( function(e){
	var cuurentPage=1;
	var pagesize=5;
	overcvsProgress=6;
	var cvsProgress=overcvsProgress;
	getstucvsInfo(cuurentPage,pagesize,cvsProgress);
	e.preventDefault();
});
//点击跳转待定
$('#cvsProgressrefused').click( function(e){
	var cuurentPage=1;
	var pagesize=5;
	overcvsProgress=7;
	var cvsProgress=overcvsProgress;
	getstucvsInfo(cuurentPage,pagesize,cvsProgress);
	e.preventDefault();
});
//点击跳转滤过
$('#cvsProgresspass').click( function(e){
	var cuurentPage=1;
	var pagesize=5;
	overcvsProgress=1;
	var cvsProgress=overcvsProgress;
	getstucvsInfo(cuurentPage,pagesize,cvsProgress);
	e.preventDefault();
});
//点击跳转失败
$('#cvsProgressdefeat').click( function(e){
	var cuurentPage=1;
	var pagesize=5;
	overcvsProgress=5;
	var cvsProgress=overcvsProgress;
	getstucvsInfo(cuurentPage,pagesize,cvsProgress);
	e.preventDefault();
});
//从后台获取简历信息学生进行简历管理
function getstucvsInfo(cuurentPage,pagesize,cvsProgress) {
	var stuId =1;
	var urlHref = window.location.href;
	var guid = urlHref.split("#")[1];
	$.ajax({
		url : homeUrl + 'cvs/getstucvs',
		async : false, // 改成同步
		data : {
			"stuId" : stuId,
			"guid" : guid,
			"cuurentPage" : cuurentPage,
			"pagesize" : pagesize,
			"cvsProgress" : cvsProgress,
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
				var list = jsonMap.data;
				createstucvsHeadersul();
				if(cvsProgress==0){
					overcvsProgress=3;
					var showsumNumber=jsonMap.showsumNumber;
					$("#cvsProgresspassspan").html("("+showsumNumber.pass+")");
					$("#cvsProgresswaitspan").html("("+showsumNumber.wait+")");
					$("#cvsProgressinterviewspan").html("("+showsumNumber.interview+")");
					$("#cvsProgresshirespan").html("("+showsumNumber.hire+")");
					$("#cvsProgressdefeatspan").html("("+showsumNumber.defeat+")");
					$("#cvsProgressacceptspan").html("("+showsumNumber.accept+")");
					$("#cvsProgressrefusedspan").html("("+showsumNumber.refused+")");
				}else if(cvsProgress==100||cvsProgress==101){
					var showsumNumber=jsonMap.showsumNumber;
					$("#cvsProgresspassspan").html("("+showsumNumber.pass+")");
					$("#cvsProgresswaitspan").html("("+showsumNumber.wait+")");
					$("#cvsProgressinterviewspan").html("("+showsumNumber.interview+")");
					$("#cvsProgresshirespan").html("("+showsumNumber.hire+")");
					$("#cvsProgressdefeatspan").html("("+showsumNumber.defeat+")");
					$("#cvsProgressacceptspan").html("("+showsumNumber.accept+")");
					$("#cvsProgressrefusedspan").html("("+showsumNumber.refused+")");
				}
				if(list.length>0){
						for(var i=0;i<list.length;i++){
							var cvsInterviewtime="---";
							if(list[i].cvsProgress>=3){
								cvsInterviewtime=toShowDateTime(list[i].cvsInterviewtime);
							}
							if(overcvsProgress==1||overcvsProgress==2){
								$("#stucvs_preview").append("<ul class='job_list_ul menu'>"+
				                        "<li class='stucvs_preview1_t1'>"+toShowDateTime(list[i].cvsApplyDate)+"</li>"+
				                        "<li class='stucvs_preview1_t2'>"+list[i].jolisName+"</li>"+
				                        "<li class='stucvs_preview1_t3 heighLight'>"+list[i].enterInfoName+"</li>"+
				                    "</ul>");
							}else if(overcvsProgress==4){
								$("#stucvs_preview").append("<ul class='job_list_ul menu'>"+
				                        "<li class='stucvs_preview2_t1'>"+toShowDateTime(list[i].cvsApplyDate)+"</li>"+
				                        "<li class='stucvs_preview2_t2'>"+list[i].jolisName+"</li>"+
				                        "<li class='stucvs_preview2_t3 heighLight'>"+list[i].enterInfoName+"</li>"+
				                        "<li class='stucvs_preview2_t4'>"+cvsInterviewtime+"</li>"+
				                        "<li class='ctrl contrl stucvs_preview2_t6'>"+
				                        	"<i class='stucvs_preview_chidren_accept' title='接受' disabled='disabled' onclick='toAdoptEnter("+list[i].cvsId+");' id='toAdoptEnter"+list[i].cvsId+"'></i>"+
				                        	"<i class='stucvs_preview_chidren_refuse' title='拒绝' disabled='disabled' onclick='toRefuseEnter("+list[i].cvsId+");' id='toRefuseEnter"+list[i].cvsId+"'></i>"+
				                        "</li>"+
				                    "</ul>");
					       }else{
					    	   $("#stucvs_preview").append("<ul class='job_list_ul menu'>"+
				                        "<li class='stucvs_preview3_t1'>"+toShowDateTime(list[i].cvsApplyDate)+"</li>"+
				                        "<li class='stucvs_preview3_t2'>"+list[i].jolisName+"</li>"+
				                        "<li class='stucvs_preview3_t3 heighLight'>"+list[i].enterInfoName+"</li>"+
				                        "<li class='stucvs_preview3_t4'>"+cvsInterviewtime+"</li>"+
				                    "</ul>");
					       }
						}
				}else{
					
				}
				 //分页代码
				var PageUtils=jsonMap.datapage;
				var pagesLi=PageUtils.currentPage;
				var currentNode=$(".stucvspagination li.active a");
				currentNode.html(pagesLi);
				pagesLi=pagesLi+1;
				currentNode.parent().next("li").children(":first").html(pagesLi);
				pagesLi=pagesLi+1;
				currentNode.parent().next("li").next("li").children(":first").html(pagesLi);
				pagesLi=pagesLi+1;
				currentNode.parent().next("li").next("li").next("li").children(":first").html(pagesLi);
				$("#stucvstotalPage").html(PageUtils.totalPage);
			}
		},
		error : function() {
			alert("访问服务器失败！");
		},
	})
}
//创建应聘简历头信息
function  createstucvsHeadersul(){
	$("#cvsHeadersInfo").empty();//每次点击，div内容清空，但是不删除当前div节点
	$("#stucvs_preview").empty();//每次点击，div内容清空，但是不删除当前div节点
	if(overcvsProgress==1||overcvsProgress==2){
		$("#cvsHeadersInfo").append('<li class="stucvs_preview1_t1">申请时间</li>'+
									'<li class="stucvs_preview1_t2">职位名称</li>'+
									'<li class="stucvs_preview1_t3">单位名</li>');
		return 0;
	}
	if(overcvsProgress==4){
		$("#cvsHeadersInfo").append('<li class="stucvs_preview2_t1">申请时间</li>'+
						'<li class="stucvs_preview2_t2">职位名称</li>'+
						'<li class="stucvs_preview2_t3">单位名</li>'+
						'<li class="stucvs_preview2_t4">面试日期</li>'+
						'<li class="ctrl stucvs_preview2_t6">操作</li>');
		return 0;
	}
	$("#cvsHeadersInfo").append('<li class="stucvs_preview3_t1">申请时间</li>'+
			'<li class="stucvs_preview3_t2">职位名称</li>'+
			'<li class="stucvs_preview3_t3">单位名</li>'+
			'<li class="stucvs_preview3_t4">面试日期</li>');
}
//跳转页面分页代码
$(".tojumpstucvs").click(function (e) {
	var cuurentPage=$(this).text();//获取当前页码
	var TotalPage=$("#stucvstotalPage").text();//获取总页数
	if(cuurentPage>=TotalPage){
		cuurentPage=TotalPage;
		alert("将进入尾页");
	}
	var pagesize=5;
	var cvsProgress=overcvsProgress;
	if(cvsProgress==""){
		cvsProgress=0;
	}
	getstucvsInfo(cuurentPage,pagesize,cvsProgress);
	e.preventDefault();
})
//下一页分页代码
$("#stucvsNextPage").click(function (e) {
	var cuurentPage=$(".stucvspagination li.active a").text();
	cuurentPage=cuurentPage*1+1;
	var TotalPage=$("#stucvstotalPage").text();//获取总页数
	if(cuurentPage>TotalPage){
		alert("已经是最后一页了");
		e.preventDefault();
	}else{
		var pagesize=5;
		var cvsProgress=overcvsProgress;
		if(cvsProgress==""){
			cvsProgress=0;
		}
		getstucvsInfo(cuurentPage,pagesize,cvsProgress);
		e.preventDefault();
	}
})
//上一页分页代码
$("#stucvsLastPage").click(function (e) {
	var cuurentPage=$(".stucvspagination li.active a").text();
	cuurentPage=cuurentPage-1;
	if(cuurentPage<1){
		alert("已经是第一页了");
	}else{
		var pagesize=5;
		var cvsProgress=overcvsProgress;
		if(cvsProgress==""){
			cvsProgress=0;
		}
		getstucvsInfo(cuurentPage,pagesize,cvsProgress);
		
	}
	e.preventDefault();
})
//输入跳转几页 分页代码
$("#jumpbuttonstucvs").click(function (e) {
	var cuurentPage=$("#jumpPageInputstucvs").val();
	if(!/^[0-9]*$/.test(cuurentPage)||cuurentPage==""){
        alert("请输入数字");
    }
	var TotalPage=$("#stucvstotalPage").text();//获取总页数
	if(cuurentPage<1||cuurentPage>TotalPage){
		alert("请输入1至"+TotalPage+"内的数字");
	}else{
		var pagesize=5;
		var cvsProgress=overcvsProgress;
		if(cvsProgress==""){
			cvsProgress=0;
		}
		getstucvsInfo(cuurentPage,pagesize,cvsProgress);
	}
	e.preventDefault();
})
function toShowDateTime(strTimestamp){
	if(strTimestamp==undefined||strTimestamp==""){
		return "";
	}
	var strTimestamps1 = strTimestamp.split(",");
	var month=trueMonth(strTimestamps1[0].split(" ")[0]);
	var day=strTimestamps1[0].split(" ")[1];
	var strTimestamps2 = strTimestamps1[1].split(" ");
	var year=strTimestamps2[1];
	var hourminute=strTimestamps2[2];
	var amPm=strTimestamps2[3];
	var str=year+"/"+month+"/"+day+" "+hourminute+"|"+amPm;
	return str
}
function toRefuseEnter(cvsId){
	if (confirm("确定要进行此操作？")) {
		var stuId =1;
		var urlHref = window.location.href;
		var guid = urlHref.split("#")[1];
		$.ajax({
			url : homeUrl + 'cvs/updatestuCvsProgress',
			async : false, // 改成同步
			data : {
				"stuId" : stuId,
				"guid" : guid,
				"cvsProgress" : 7,
				"cvsId" : cvsId,
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
					var cuurentPage=$(".stucvspagination li.active a").text();
					var pagesize=5;
					var cvsProgress=100;//拒绝成功的修改标识，需要即时刷新页面
					getstucvsInfo(cuurentPage,pagesize,cvsProgress);
					alert("拒绝成功");
				}
			},
			error : function() {
				alert("访问服务器失败！");
			},
		})
	}
}
function toAdoptEnter(cvsId,cnode){
	if (confirm("确定要进行此操作？")) {
		var stuId =1;
		var urlHref = window.location.href;
		var guid = urlHref.split("#")[1];
		$.ajax({
			url : homeUrl + 'cvs/updatestuCvsProgress',
			async : false, // 改成同步
			data : {
				"stuId" : stuId,
				"guid" : guid,
				"cvsProgress" : 6,
				"cvsId" : cvsId,
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
					var cuurentPage=$(".stucvspagination li.active a").text();
					var pagesize=5;
					var cvsProgress=101;//接受成功的修改标识，需要即时刷新页面
					getstucvsInfo(cuurentPage,pagesize,cvsProgress);
					alert("接受成功");
				}
			},
			error : function() {
				alert("访问服务器失败！");
			},
		})
	}
}
