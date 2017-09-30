//点击跳转首页 自加载方法
window.onload = onloadgetstuHomePageInfo();
//点击进入首页的自加载方法
function onloadgetstuHomePageInfo(){
	var guid="37g337Q99hAP0KShTqhhn9ZI11lLpONT";
	var urlHref=window.location.href;
	urlHref=urlHref.split("#")[0];   	
	urlHref=urlHref+"#"+guid
	location.href=urlHref;
	getstuHomePageInfo();
}
// window.onload = getstuHomePageInfo;
//获取首页信息
function getstuHomePageInfo() {
	var stuId =1;
	var urlHref = window.location.href;
	var guid = urlHref.split("#")[1];
	$.ajax({
		url : homeUrl + 'cvs/getstuHomePage',
		data : {
			"stuId" : stuId,
			"guid" : guid,
		},
		type : 'post',
		async: false, 
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
				console.log(list);
//						map.put("cvsSum", objcvs[0]);
//						map.put("cvsHireSum", objcvs[1]);
//						map.put("cvsAdoptSum", objcvs[2]);
//						map.put("cvsRefuseSum", objcvs[3]);
//						map.put("cvsInterviewed", objcvs[4]);
//						map.put("cvsIntervieToday", objcvs[5]);
//						map.put("cvsUninterviewed", objcvs[6]);
//					map.put("adfoenPostTime", arrAdfoen.get(0).getAdfoenPostTime());
//					map.put("adfoenInfo", arrAdfoen.get(0).getAdfoenInfo());
				$("#stupreicvsSum1").html(list.cvsSum);
				$("#stupreicvsSum2").html(list.cvsSum);
				$("#stucvsHireSum").html(list.cvsHireSum);
				$("#stucvsAdoptSum").html(list.cvsAdoptSum);
				$("#stucvsRefuseSum").html(list.cvsRefuseSum);
				$("#stucvsUninterviewed").html(list.cvsUninterviewed);
				$("#stucvsInterviewed").html(list.cvsInterviewed);
				$("#stucvsIntervieToday").html((list.cvsIntervieToday-list.cvsUninterviewed));
//				$("#").html(toShowDateTime(list.adfoenPostTime));
//				$("#").html(list.adfoenInfo);
			}	
		},
		error : function() {
			alert("访问服务器失败！");
		},
	})
}