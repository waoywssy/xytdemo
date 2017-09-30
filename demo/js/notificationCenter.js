var teachId=1;
var guid="37g337Q99hAP0KShTqhhn9ZI11lLpONT";
window.onload = onloadtoshow();
//自加载方法  需要传参数
function onloadtoshow(){
	var cuurentPage=1;//获取当前页码
	var pagesize=5;
	notificationCenter(cuurentPage,pagesize);
}

//通知id
var adfoenId;

//通知信息
var adfoenInfo;

// 导航“通知中心”选项点击事件
function notificationCenter(cuurentPage,pagesize){
	// 信息的数量
	$
			.ajax({
				url : homeUrl + 'adfoen/getAdfoenforTeach',
				async : false,
				data : {
					"teachId" : teachId,
					"cuurentPage":cuurentPage,
				    "pagesize":pagesize,
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
						$("#notificationCenter").html('');
						var list = jsonMap.data;
						if (list.length > 0) {
							for (var i = 0; i < list.length; i++) {
								var notification=list[i];
								creatEnotificationDiv(notification);
							}
						}else{
							
						}
						// 分页代码
						var PageUtils=jsonMap.datapage;
						var pagesLi=PageUtils.currentPage;
						var currentNode=$(".notificationpagination li.active a");
						currentNode.html(pagesLi);
						pagesLi=pagesLi+1;
						currentNode.parent().next("li").children(":first").html(pagesLi);
						pagesLi=pagesLi+1;
						currentNode.parent().next("li").next("li").children(":first").html(pagesLi);
						pagesLi=pagesLi+1;
						currentNode.parent().next("li").next("li").next("li").children(":first").html(pagesLi);
						$("#notificationtotalPage").html(PageUtils.totalPage);
					}
				},
				error : function() {
					alert("访问服务器失败！");
				},
			})
}

/**
 * 获取后台数据并渲染到页面
 */
function creatEnotificationDiv(notification) {
	adfoenId = notification.adfoenId;
	adfoenInfo = notification.adfoenInfo;
	$("#notificationCenter")
			.append(
					"<li class='position_list_item default_list tea_notice'><div class='pli_top teaCom'><div class='fl teach_noticeL'><div class='position_main_info'>"
									+notification.adfoenInfo
									+"</div></div><div class='teach_noticeR'><div class='wordCut' style='height: 54px;line-height: 44px;'>" 
								    +toShowDateTime(notification.adfoenPostTime)
									+"</div></div></div><button class='btn btn-primary T_notice oneN' onclick='togetnotificationInfo("+notification.adfoenId+","+JSON.stringify(notification.adfoenInfo)+");'>"
									+"删除通知"
									+"</button></li>");
}

// 上一页分页代码
$("#notificationLastPage").click(function (e) {
	var cuurentPage=$(".notificationpagination li.active a").text();
	cuurentPage=cuurentPage-1;
	if(cuurentPage<1){
		alert("已经是第一页了");
	}else{
		var pagesize=5;
		notificationCenter(cuurentPage,pagesize);
	}
	e.preventDefault();
})

// 下一页分页代码
$("#notificationNextPage").click(function (e) {
	var cuurentPage=$(".notificationpagination li.active a").text();
	cuurentPage=cuurentPage*1+1;
	var TotalPage=$("#notificationtotalPage").text();// 获取总页数
	if(cuurentPage>TotalPage){
		alert("已经是最后一页了");
		e.preventDefault();
	}else{
		var pagesize=5;
		notificationCenter(cuurentPage,pagesize);
		e.preventDefault();
	}
})

// 跳转页面分页代码
$(".tojumpnotification").click(function (e){
	var cuurentPage=$(this).text();// 获取当前页码
	var TotalPage=$("#notificationtotalPage").text();// 获取总页数
	if(cuurentPage>=TotalPage){
		cuurentPage=TotalPage;
		alert("将进入尾页");
	}
	var pagesize=5;
	notificationCenter(cuurentPage,pagesize);
	e.preventDefault();
})

// 输入跳转几页 分页代码
$("#jumpbuttonnotification").click(function (e) {
	var cuurentPage=$("#jumpPageInputnotification").val();
	if(!/^[0-9]*$/.test(cuurentPage)||cuurentPage==""){
        alert("请输入数字");
    }
	var TotalPage=$("#notificationtotalPage").text();// 获取总页数
	if(cuurentPage<1||cuurentPage>TotalPage){
		alert("请输入1至"+TotalPage+"内的数字");
	}else{
		var pagesize=5;
		notificationCenter(cuurentPage,pagesize);
	}
	e.preventDefault();
})

//删除该通知按钮
function togetnotificationInfo(newadfoenId,newadfoenInfo){
	adfoenId = newadfoenId;
	adfoenInfo = newadfoenInfo;
	$("#adfoenInfoEmerge").html(adfoenInfo);
	$("#deletenotificationCenter").css('display','block');
}

//删除该通知成功
function todeletenotificationInfo(){
	adfoenId;
	$.ajax({
		url : homeUrl + 'adfoen/deleteAdfoenInfo',
		async : false,
		data : {
			"teachId" : teachId,
		    "guid" : guid,
		    "adfoenId":adfoenId,
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
			} else if (jsonMap.code == 200){
				$("#deleteSuccess").css('display','block');
			    $("#deletenotificationCenter").css('display','none');
			}
		},
		error : function() {
			alert("访问服务器失败！");
		},
			});
}

//删除成功操作
function deleteSuccess(){
	$("#deleteSuccess").css('display','none');
	var cuurentPage=$(".notificationpagination li.active a").text();
    var pagesize=5;
	notificationCenter(cuurentPage,pagesize);
}

//取消该删除
function todeleteExitnotificationInfo(){
	$("#exitDeleteSuccess").css('display','block');
	$("#deletenotificationCenter").css('display','none');
}

//取消删除操作成功
function exitDeleteSuccess(){
	$("#exitDeleteSuccess").css('display','none');
}

//点击创建通知按钮
function savenotification(){
	$("#savenotificationCenter").css('display','block');
	$("#notificationInfo").val('');
}

//创建通知成功
function savePassnotificationCenter(){
	adfoenInfo = $("#notificationInfo").val().trim();
	$.ajax({
		url : homeUrl + 'adfoen/saveAdfoenInfo',
		async : false,
		data : {
			"teachId" : teachId,
		    "guid" : guid,
		    "adfoenInfo":adfoenInfo,
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
			} else if (jsonMap.code == 200){
				$("#savePassnotification").css('display','block');
				$("#savenotificationCenter").css('display','none');
			}
		},
		error : function() {
			alert("访问服务器失败！");
		},
			});
}

//创建成功操作
function savePassnotification(){
	$("#savePassnotification").css('display','none');
	var cuurentPage=$(".notificationpagination li.active a").text();
	var pagesize=5;
	notificationCenter(cuurentPage,pagesize);
}

//取消创建通知
function saveExitnotificationCenter(){
	$("#exitSavePassnotification").css('display','block');
	$("#savenotificationCenter").css('display','none');
}

//取消创建通知成功
function exitSavePassnotification(){
	$("#exitSavePassnotification").css('display','none');
}


//转换时间（区分am，pm）
function toShowDateTime(strTimestamp){
	var strTimestamps1 = strTimestamp.split(",");
	var month=trueMonth(strTimestamps1[0].split(" ")[0]);
	var day=strTimestamps1[0].split(" ")[1];
	var strTimestamps2 = strTimestamps1[1].split(" ");
	var year=strTimestamps2[1];
	var hourminute=strTimestamps2[2];
	var amPm=strTimestamps2[3];
	var str=year+"年"+month+"月"+day+"日 "+hourminute+"|"+amPm;
	return str
}

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