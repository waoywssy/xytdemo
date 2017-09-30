var AdviseforenterAdfoen = {//通知信息
		"adfoenId":"",
		"adfoenInfo":"",
		"adfoenPostTime":"",
};
window.onload = onloadgetAdfoenInfo();
//点击进入通知信息页面的自加载方法
function onloadgetAdfoenInfo(){
	var guid="37g337Q99hAP0KShTqhhn9ZI11lLpONT";
	var urlHref=window.location.href;
	urlHref=urlHref.split("#")[0];   	
	urlHref=urlHref+"#"+guid
	location.href=urlHref;
	var cuurentPage=$(".Adfoenpagination li.active a").text();
	var pagesize=5;
	getAdfoenInfo(cuurentPage,pagesize);
}
function getAdfoenInfo(cuurentPage,pagesize){
	$.ajax({
		url:homeUrl+'adfoen/getAdfoen',
		async:false, //改成同步
		data:{
		    "cuurentPage":cuurentPage,
		    "pagesize":pagesize,
		},
		type:'post',
		success:function(date){
			var jsonMap=JSON.parse(date);
            console.log(jsonMap);
            if(jsonMap.code==301){
        		alert("您为非法用户");
        		window.location.href=homeUrl+'stu/safe'; 
        	}else if(jsonMap.code==302){
        		alert("您停留时间过长");
        		window.location.href=homeUrl+'stu/safe'; 
            }else if(jsonMap.code==200){
            	var list=jsonMap.data;
                // console.log(list.length);
                if(list.length>0){
                	$(".notice_list_container div:first").empty();
					for(var i=0;i<list.length;i++){
						AdviseforenterAdfoen=list[i];
						$(".notice_list_container div:first").append("<ul class='notice_list_ul menu chlidren'>"+
								"<li class='this_li'>"+toShowDateTime(AdviseforenterAdfoen.adfoenPostTime)+"</li>"+
								"<li class='news'><a title='"+AdviseforenterAdfoen.adfoenInfo+"'>"+AdviseforenterAdfoen.adfoenInfo+"</a></li>"+
							"</ul>");
						}
				}else{
					
				}
              //分页代码
				var PageUtils=jsonMap.datapage;
				var pagesLi=PageUtils.currentPage;
				var currentNode=$(".Adfoenpagination li.active a");
				currentNode.html(pagesLi);
				pagesLi=pagesLi+1;
				currentNode.parent().next("li").children(":first").html(pagesLi);
				pagesLi=pagesLi+1;
				currentNode.parent().next("li").next("li").children(":first").html(pagesLi);
				pagesLi=pagesLi+1;
				currentNode.parent().next("li").next("li").next("li").children(":first").html(pagesLi);
				$("#AdfoentotalPage").html(PageUtils.totalPage);
				//点击弹窗事件
				var news_a = $(".news a");
				var menban = $(".notice_list_child_container_menban");
                news_a.click(function () {
					menban.css("display","block");
					menban.height($("html,body").height());
					//使通知显示盒始终在中间的位置，不管分辨率的大小
					var notice_show_box_width = $("#notice_show_box").width();
					var left = $("html,body").width()*0.5-notice_show_box_width*0.5+"px";
                    $("#notice_show_box").css("margin-left",left);
                    $(window).resize(function () {
                        menban.height($("html,body").height());
                        left = $("html,body").width()*0.5-notice_show_box_width*0.5+"px";
                        $("#notice_show_box").css("margin-left",left);
                    });
                    $("#notice_show_box div:first").html($(this).html());
                    $(".notice_show_off").click(function () {
						menban.css("display","none");
                    })
                })
            }
			},
		error:function () {
            alert("访问服务器失败！");
        },
    })
}
//跳转页面分页代码
$(".tojumpAdfoen").click(function (e) {
	var cuurentPage=$(this).text();//获取当前页码
	var TotalPage=$("#AdfoentotalPage").text();//获取总页数
	if(cuurentPage>=TotalPage){
		cuurentPage=TotalPage;
		alert("将进入尾页");
	}
	var pagesize=5;
	getAdfoenInfo(cuurentPage,pagesize);
	e.preventDefault();
})
//下一页分页代码
$("#AdfoenNextPage").click(function (e) {
	var cuurentPage=$(".Adfoenpagination li.active a").text();
	cuurentPage=cuurentPage*1+1;
	var TotalPage=$("#AdfoentotalPage").text();//获取总页数
	if(cuurentPage>TotalPage){
		alert("已经是最后一页了");
		e.preventDefault();
	}else{
		var pagesize=5;
		getAdfoenInfo(cuurentPage,pagesize);
		e.preventDefault();
	}
})
//上一页分页代码
$("#AdfoenLastPage").click(function (e) {
	var cuurentPage=$(".Adfoenpagination li.active a").text();
	cuurentPage=cuurentPage-1;
	if(cuurentPage<1){
		alert("已经是第一页了");
	}else{
		var pagesize=5;
		getAdfoenInfo(cuurentPage,pagesize);
		
	}
	e.preventDefault();
})
//输入跳转几页 分页代码
$("#jumpbuttonAdfoen").click(function (e) {
	var cuurentPage=$("#jumpPageInputAdfoen").val();
	if(!/^[0-9]*$/.test(cuurentPage)||cuurentPage==""){
        alert("请输入数字");
    }
	var TotalPage=$("#AdfoentotalPage").text();//获取总页数
	if(cuurentPage<1||(cuurentPage-1)>TotalPage){
		alert("请输入1至"+TotalPage+"内的数字");
	}else{
		var pagesize=5;
		getAdfoenInfo(cuurentPage,pagesize);
	}
	e.preventDefault();
})
function toShowDateTime(strTimestamp){
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





