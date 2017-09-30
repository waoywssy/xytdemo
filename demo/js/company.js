window.onload = onloadgetEnterHomePageInfo();
//点击进入职位页面的自加载方法
function  onloadgetEnterHomePageInfo(){
	var guid="37g337Q99hAP0KShTqhhn9ZI11lLpONT";
	var urlHref=window.location.href;
	urlHref=urlHref.split("#")[0];   	
	urlHref=urlHref+"#"+guid
	location.href=urlHref;
	getEnterHomePageInfo();
}
//从后台获取首页信息
function getEnterHomePageInfo() {
    var enterEnterInfoId=1;
    var enterId=1;
    var urlHref = window.location.href;
    var guid = urlHref.split("#")[1];
    $.ajax({
        url : homeUrl + 'enterinfo/getEnterHomePageInfo',
        async : false, // 改成同步
        data : {
            "enterEnterInfoId" : enterEnterInfoId,
            "enterId" : enterId,
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
                var homePageInfo = jsonMap.data;
                console.log(homePageInfo);
                console.log(homePageInfo.adfoenInfo);
                $("#jolisIssuehomePage").html(homePageInfo.jolisIssue);
                $("#jolisCheckhomePage").html(homePageInfo.jolisCheck);
                $("#cvsUnreadhomePage").html(homePageInfo.cvsUnread);
                $("#cvsSumhomePage").html(homePageInfo.cvsSum);
                $("#cvsHireSumhomePage").html(homePageInfo.cvsHireSum);
                $("#cvsAdoptSumhomePage").html(homePageInfo.cvsAdoptSum);
                $("#cvsRefuseSumhomePage").html(homePageInfo.cvsRefuseSum);
                $("#cvsIntervieTodayhomePage").html(homePageInfo.cvsIntervieToday-homePageInfo.cvsUninterviewed);
                $("#cvsUninterviewedhomePage").html(homePageInfo.cvsUninterviewed);
                $("#jofaiHoldedhomePage").html(homePageInfo.jofaiSupplyHolded+homePageInfo.jofaiTeachInHolded);
                $("#jofaiHoldhomePage").html(homePageInfo.jofaiSupplyHold+homePageInfo.jofaiTeachInHold);
                $("#jofaiTeachInHoldhomePage").html(homePageInfo.jofaiTeachInHold);
                $("#jofaiTeachInHoldedhomePage").html(homePageInfo.jofaiTeachInHolded);
                $("#jofaiCheckhomePage").html(homePageInfo.jofaiCheck);
                $("#jofaiIssuehomePage").html(homePageInfo.jofaiIssue);
                $("#scrollareo").empty();
                $("#scrollareo").append("<li style='display: block'>"+
                    "<a style='color: #999'>"+homePageInfo.adfoenInfo+"</a>"+
                    "<span>"+toShowDateTime(homePageInfo.adfoenPostTime)+"</span>"+
                    "</li>");
            }
        },
        error : function() {
            alert("访问服务器失败！");
        },
    })
}
