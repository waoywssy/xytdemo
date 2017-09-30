var jobFairData={};
	OverjobfaiStatus="";
	var jofaiEnterInfoId=1,
	cuurentPage=1,
	pagesize=5,
	enterId=1;
	new YMDselect('first','second','third');
	new YMDselect('first','second','third',2017,2,4);
	new YMDselect('year1','month1','day1');
	new YMDselect('year1','month1','day1',2017,2,10);
window.onload = onloadgetJofaiInfo();
//点击进入职位页面的自加载方法
function onloadgetJofaiInfo(){
	var guid="37g337Q99hAP0KShTqhhn9ZI11lLpONT";
	var urlHref=window.location.href;
	urlHref=urlHref.split("#")[0];   	
	urlHref=urlHref+"#"+guid
	location.href=urlHref;
	var cuurentPage=$(".jofaipagination li.active a").text();
	var pagesize=5;
	var jofaiStatus=OverjobfaiStatus;
	getJofaiInfo(cuurentPage,pagesize,jofaiStatus);
}
$("#jobFair").click(function(e){
    var cuurentPage=1;//获取当前页码
	var pagesize=5;
	var jofaiStatus=OverjobfaiStatus;
	getJofaiInfo(cuurentPage,pagesize,jofaiStatus);
	e.preventDefault();
})
function turnMoth(month){
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
function turnStart(statu){
	switch (statu) {
		case 0:
			statu = "申请";
			break
		case 1:
			statu = "通过";
			break
		case 2:
			statu = "停止";
			break
		case 3:
			statu = "过期";
			break
		default:
		}
	return statu;
}
function show(num){
	var $qyid=num.jofaiEnterInfoId;$id=num.jofaiId,$date=num.jofaiDate,$start=num.jofaiStartime,$end=num.jofaiEndtime,$type=num.jofaiType,$statu=num.jofaiStatus,$major=num.jofaiMajors,$person=num.jofaiPersons,$location=num.jofaiLocation;
	$location="undefined" ? " " : $location;
	var a=$date.split(",")[0].trim().split(" ")[0].trim(),
		b=$date.split(",")[0].trim().split(" ")[1].trim(),
		c=$date.split(",")[1].trim(),
		eh=$start.split(" ")[3].trim().split(":")[0].trim(),
		em=$start.split(" ")[3].trim().split(":")[1].trim(),
		et=$start.split(" ")[3].trim(),
		fh=$end.split(" ")[3].trim().split(":")[0].trim(),
		fm=$end.split(" ")[3].trim().split(":")[1].trim(),
		ft=$end.split(" ")[3].trim(),
		d=c+"/"+this.turnMoth(a)+"/"+b,
		e=eh+":"+em,
		f=fh+":"+fm;
	var type = $type ? "宣讲会" : "供需会",
		statu = turnStart($statu);
	var $el=$(".re_list .addList");
		$el.append("<li class=\"position_list_item default_list\">"
		            		+"<div class=\"pli_top\">"
				                +"<div class=\"fl pli_top_l\">"
				                    +"<div class=\"position_name\">"
				                        +"<h2 class=\"fl\"><a href=\"javascript:;\"  class=\"position_link fl wordCut\" id=\"position_link\"><b>"+type+"</b><span>"+[d]+"</span></a></h2>"
				                        +"<span class=\"fl peo\">"+$person+"</span><em>人</em>"
				         			+"</div>"
				                    +"<div class=\"position_main_info\">"
				                        /*+"<span  class=\"salary fl\">"+statu+"</span>"*/
				                        +"<span class=\"startTime\">"+e+"</span> - <span class=\"endTime\">"+f+"</span>"
				                    +"</div>"
				            	+"</div>"
				                +"<div class=\"school pli_top_r\">"
				                    +"<div class=\"company_name wordCut\">"
				                        +"<a href=\"javascript:;\" >"+$location+"</a>"
				                    +"</div>"
				                    +"<div class=\"industry wordCut\">"
				                        +"<span>"+$major+"</span>"
				                    +"</div>"
				                +"</div>"
				                +"<span class=\"mod_jobFair forModefirystatus"+$statu+"\" +>修改</span>"
				                +"<span class=\"dele_jobFair forCanclestatus"+$statu+"\"   onclick=\"toJofaiDeletestatus("+$id+","+$statu+",this)\" >取消</span>"
				                +"<input value="+$id+" style=\"display:none\">"
				            +"</div>"
				        +"</li>");
}
// 初始数据
function getJofaiInfo(cuurentPage,pagesize,jofaiStatus){
	var urlHref=window.location.href;
	var guid=urlHref.split("#")[1];	
$.ajax({
		url : homeUrl+'jofai/getJobfair',
		async : false,
		data : {
			"jofaiEnterInfoId":jofaiEnterInfoId,
		    "cuurentPage":cuurentPage,
		    "pagesize":pagesize,
		    "guid":guid,
		    "enterId":enterId,
		    "jofaiStatus":jofaiStatus
		},
		type : 'post',
		success : function(data) {
			var json= JSON.parse(data);
			if (json.code == 200) {
				var list = json.data;
				$(".re_list .addList").empty();
				//给各个标签加上对应数据
				if(jofaiStatus==""){
					OverjobfaiStatus="0";
					var showsumNumber=json.showsumNumber;
					$("#jofaiStatusapplyspan").html("("+showsumNumber.apply+")");
					$("#jofaiStatuscheckedspan").html("("+showsumNumber.checked+")");
					$("#jofaiStatusstopspan").html("("+showsumNumber.stop+")");
				}else if(jofaiStatus==100){//该状态标志是修改以后需要重新获取下面的值
					var showsumNumber=json.showsumNumber;
					$("#jofaiStatusapplyspan").html("("+showsumNumber.apply+")");
					$("#jofaiStatuscheckedspan").html("("+showsumNumber.checked+")");
					$("#jofaiStatusstopspan").html("("+showsumNumber.stop+")");
				}
				if (list.length > 0) {
					for (var i = 0; i < list.length; i++) {
						jobFairData = list[i];
						show(jobFairData);
						mod();
						$(".forModefirystatus0").css("display","block");
						$(".forCanclestatus0").css("display","none");
						$(".forModefirystatus1").css("display","none");
						$(".forCanclestatus1").css("display","block");
					    $(".forModefirystatus2").css("display","none");
						$(".forCanclestatus2").css("display","none");
						$(".forModefirystatus3").css("display","none");
						$(".forCanclestatus3").css("display","none");
					}
				}
				//分页代码
				var PageUtils=json.datapage;
				var pagesLi=PageUtils.currentPage;
				var currentNode=$(".jofaipagination li.active a");
				currentNode.html(pagesLi);
				pagesLi=pagesLi+1;
				currentNode.parent().next("li").children(":first").html(pagesLi);
				pagesLi=pagesLi+1;
				currentNode.parent().next("li").next("li").children(":first").html(pagesLi);
				pagesLi=pagesLi+1;
				currentNode.parent().next("li").next("li").next("li").children(":first").html(pagesLi);
				$("#JofaitotalPage").html(PageUtils.totalPage);
			}else if(json.code==404){
				
			}
		},
		error : function() {
			alert("访问服务器失败！");
		},
	})
}
function toJofaiDeletestatus(jofaiId,jofaiStatus,_this){
	var urlHref=window.location.href;
	var guid=urlHref.split("#")[1];	
	console.log($(".dele_jobFair").parent().children(":first").children().eq(1).children(":first").text());
	if(jofaiStatus==2||jofaiStatus==3){
		alert("已经取消发布了");
		return 0;
	}else{
		jofaiStatus=2;
  		
	}
	$.ajax({
			url:homeUrl+"jofai/updatejofaiStatus?",
			async : false,
			data : {
			"jofaiEnterInfoId":jofaiEnterInfoId,
		    "jofaiStatus":jofaiStatus,
		    "jofaiId":jofaiId,
		    "guid":guid,
		    "enterId":enterId
		},
			type:'post',
			success: function(data){
				var jsonMap = JSON.parse(data);
					if (jsonMap.code == 200) {
						alert("取消成功");
						var cuurentPage=$(".jofaipagination li.active a").text();
						var pagesize=5;
						var jofaiStatus=100;//该状态为了告诉后台我这是修改操作，修改后需要重新获取需要的值
						getJofaiInfo(cuurentPage,pagesize,jofaiStatus);
						//$(".dele_jobFair").parent().children(":first").children().eq(1).children(":first").text("停止");
						// $(".dele_jobFair").text(" ");
					}

			},
			error : function(){
				alert("访问服务器失败！");
			}
		})
}
//跳转页面分页代码
$(".tojumpjofai").click(function (e) {
	var cuurentPage=$(this).text();//获取当前页码
	var TotalPage=$("#JofaitotalPage").text();//获取总页数
	if(cuurentPage>=TotalPage){
		cuurentPage=TotalPage;
		alert("将进入尾页");
	}
	var pagesize=5;
	var jofaiStatus=OverjobfaiStatus;
	getJofaiInfo(cuurentPage,pagesize,jofaiStatus);
	// mod();
	e.preventDefault();
})
//下一页分页代码
$("#jofaiNextPage").click(function (e) {
	var cuurentPage=$(".jofaipagination li.active a").text();
	cuurentPage=cuurentPage*1+1;
	var TotalPage=$("#JofaitotalPage").text();//获取总页数
	if(cuurentPage>TotalPage){
		alert("已经是最后一页了");
		e.preventDefault();
	}else{
		var pagesize=5;
		var jofaiStatus=OverjobfaiStatus;
		getJofaiInfo(cuurentPage,pagesize,jofaiStatus);
		e.preventDefault();
	}
})
//上一页分页代码
$("#jofaiLastPage").click(function (e) {
	var cuurentPage=$(".jofaipagination li.active a").text();
	cuurentPage=cuurentPage-1;
	if(cuurentPage<1){
		alert("已经是第一页了");
	}else{
		var pagesize=5;
		var jofaiStatus=OverjobfaiStatus;
		getJofaiInfo(cuurentPage,pagesize,jofaiStatus);
	}
	e.preventDefault();
})
//输入跳转几页 分页代码
$("#jumpbuttonjofai").click(function (e) {
	var cuurentPage=$("#jumpPageInputJofai").val();
	if(!/^[0-9]*$/.test(cuurentPage)||cuurentPage==""){
        alert("请输入数字");
    }
	var TotalPage=$("#JofaitotalPage").text();//获取总页数
	if(cuurentPage<1||cuurentPage>TotalPage){
		alert("请输入1至"+TotalPage+"内的数字");
	}else{
		var pagesize=5;
		var jofaiStatus=OverjobfaiStatus;
		getJofaiInfo(cuurentPage,pagesize,jofaiStatus);
	}
	e.preventDefault();
})
//点击发布
$("#jofaiStatusapply").click( function(e){
	var cuurentPage=1;//获取当前页码
	var pagesize=5;
	OverjobfaiStatus=1;
	var jofaiStatus=OverjobfaiStatus;
	getJofaiInfo(cuurentPage,pagesize,jofaiStatus);
	e.preventDefault();
});
//点击审核
$("#jofaiStatuschecked").click( function(e){
	var cuurentPage=1;//获取当前页码
	var pagesize=5;
	OverjobfaiStatus="0";
	var jofaiStatus=OverjobfaiStatus;
	getJofaiInfo(cuurentPage,pagesize,jofaiStatus);
	e.preventDefault();
});
//点击停止
$("#jofaiStatusstop").click( function(e){
	var cuurentPage=1;//获取当前页码
	var pagesize=5;
	OverjobfaiStatus=2;
	var jofaiStatus=OverjobfaiStatus;
	getJofaiInfo(cuurentPage,pagesize,jofaiStatus);
	e.preventDefault();
});
function mod(){
	// showTimer('timer1');
	// showTimer('timer2');
	//点击修改操作
	var $cl=$(".mod_jobFair"),
		$fair=$(".jobfair");	
		for(var i=0;i<$cl.length;i++){
			$cl[i].index=i;
			$cl[i].onclick=function(){
			$(".jobfair_mod").css("display","block");
			$(".job_fair .re_list").hide();
			var y=this.index,
				// $first=$(".jobfair_mod .first input"),
				$second=$(".jobfair_mod .second input"),
				$third=$(".jobfair_mod .third input"),
				$fourth=$(".jobfair_mod .fourth select option:selected"),
				$fifth=$(".jobfair_mod .fifth input"),
				$sixth=$(".jobfair_mod .sixth input");
				console.log($fourth.text());
			var inne1=$('.position_link span')[y].innerText,
				inne2=$('.position_main_info .startTime')[y].innerText,
				inne3=$('.position_main_info .endTime')[y].innerText,
				inne4=$('.position_link b')[y].innerText,
				inne6=$('.school .industry')[y].innerText,
				inne7=$('.position_name .peo')[y].innerText;
				console.log(inne1);
				console.log($(".jobfair_mod .first .year option:selected").val())
			$(".jobfair_mod .first .year option:selected").html(inne1.split("/")[0]+"年");
			$(".jobfair_mod .first .month option:selected").html(inne1.split("/")[1]+"月");
			$(".jobfair_mod .first .day option:selected").html(inne1.split("/")[2]+"日");
			$second.attr("value",inne2);
			$third.attr("value",inne3);
			$fourth.html(inne4);
			$fifth.attr("value",inne6);
			$sixth.attr("value",inne7);
		}
	}
}
//修改值传递(保存键)
$(".job_fair .jofaiSaveButton").click(function(e){
		// location.reload(0);//刷新当前页
		$(".job_fair .re_list").show();
		
		var startTime=$(".job_fair .second input").val(),
			endTime=$(".job_fair .third input").val();
		jobFairData.jofaiEnterInfoId=1;
		jobFairData.jofaiId=$(".job_fair .pli_top input").val();
		var year=$(".jobfair_mod .first .year option:selected").val(),
			month=$(".jobfair_mod .first .month option:selected").val(),
			day=$(".jobfair_mod .first .day option:selected").val();
		jobFairData.jofaiDate=year+"/"+month+"/"+day;
		//都改成年月日
		jobFairData.jofaiStartMin=$(".job_fair .second input").val();
		jobFairData.jofaiEndHour=$(".job_fair .third input").val();
		jobFairData.jofaiStartime="2017/4/4";
		jobFairData.jofaiEndtime="2017/4/4";
		jobFairData.jofaiMajors=$(".job_fair .fifth input").val();
		jobFairData.jofaiPersons=$(".job_fair .sixth input").val();
		jobFairData.jofaiType=$(".job_fair .fourth .xuan").val()=="宣讲会" ? 1 :0;
		var urlHref=window.location.href;
		var guid=urlHref.split("#")[1];
		$.ajax({
			url:homeUrl+"jofai/updateJobfair?guid="+guid+"&enterId="+enterId+"&startTime="+startTime+"&endTime="+endTime,
			async : false,
			data:jobFairData,
			type:'post',
			success: function(data){
				var jsonMap = JSON.parse(data);
					if (jsonMap.code == 200) {
						alert("修改成功");
						// getJofaiInfo(cuurentPage,pagesize);
						// show();
						$(".jobfair_mod").css("display","none")
					}

			},
			error : function(){
				alert("访问服务器失败！");
			}
		})
  e.preventDefault();
})
//创建招聘会信息
$("#jobFairAdd").click(function(){
	$("#jobfair_add").show();
	$(".job_fair .re_list").hide();
})
$("#currentAdd").click(function(){
	$("#jobfair_add").css("display","none");
	$(".job_fair .re_list").show();

})
$("#currentMod").click(function(){
	$("#jobfair_mod").css("display","none");
	$(".job_fair .re_list").show();
})
var addJobFair={},
	$two=$(".jobfair_add .two input"),
	$three=$(".jobfair_add .three input"),
	$four=$(".jobfair_add .four input"),
	$five=$(".jobfair_add .five input"),
	$six=$(".jobfair_add .six .xuan");

$(".jobfair_add .add").click(function(){
	$(".job_fair .re_list").show();
	var startTime=$(".jobfair_add .two input").val(),
		endTime=$(".jobfair_add .three input").val(),
		$a=$(".jobfair_add .one .year option:selected").val(),
		$b=$(".jobfair_add .one .month option:selected").val(),
		$c=$(".jobfair_add .one .day option:selected").val();
	addJobFair.jofaiEnterInfoId=1;
	addJobFair.jofaiDate=$a+"/"+$b+"/"+$c;
	addJobFair.jofaiStartime="2017/4/4";
	addJobFair.jofaiEndtime="2017/4/4";
	addJobFair.jofaiMajors=$four.val();
	addJobFair.jofaiPersons=$five.val();
	addJobFair.jofaiType=$six.val()=="宣讲会" ? 1 :0;
	console.log(addJobFair.jofaiDate,addJobFair.jofaiMajors)
    var urlHref=window.location.href;
	var guid=urlHref.split("#")[1];
$.ajax({
	url:homeUrl+"jofai/savejofai?guid="+guid+"&enterId="+enterId+"&startTime="+startTime+"&endTime="+endTime,
	type:"post",
	// dataType:"JSON",
	data:addJobFair,
	success: function(data){
				var jsonMap = JSON.parse(data);
					if (jsonMap.code == 200) {
					$("#jobfair_add").hide();
					alert("成功");
			}
	},
	error : function(){
		alert("访问服务器失败！");
	}
})
})

