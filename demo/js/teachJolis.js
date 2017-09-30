var TeachJoblistInfo={};
var teachId=1;
var guid="37g337Q99hAP0KShTqhhn9ZI11lLpONT";
window.onload = onloadtoshow();
//自加载方法  需要传参数
function onloadtoshow(){
	var cuurentPage=1;//获取当前页码
	var pagesize=5;
	getjolisListsForTeach(cuurentPage,pagesize);
}
//点击进行职位审批管理
function getjolisListsForTeach(cuurentPage,pagesize){
	$.ajax({
		url:homeUrl+'jolis/getJoblistsforTeach',
		async:false, //改成同步
		data:{
		    "teachId":teachId,
		    "guid":guid,
		    "cuurentPage":cuurentPage,
		    "pagesize":pagesize,
		},
		type:'post',
		success:function(data){
            var jsonMap=JSON.parse(data);
            if(jsonMap.code==301){
        		alert("您为非法用户");
        		window.location.href="getTeachJoblistInfo.html"; 
        	}else if(jsonMap.code==302){
        		alert("您停留时间过长");
        		window.location.href="getTeachJoblistInfo.html"; 
            }else if(jsonMap.code==200){
            	$("#jolisListForTeach").empty();
            	list=jsonMap.data;
            	if(list.length>0){
            		for(var i=0;i<list.length;i++){
            			TeachJoblistInfo=list[i];
            			//获取发布时间预览
                    	var jolisPostDate=TeachJoblistInfo.jolisPostDate.split(",");
                    	var jolisPostDateyear=jolisPostDate[1].trim();
                        var jolisPostDatemonth=trueMonth(jolisPostDate[0].split(" ")[0]);
                        var jolisPostDateday=jolisPostDate[0].split(" ")[1];
                        var jolisPostDatePrei=jolisPostDateyear+"/ "+jolisPostDatemonth+"/"+jolisPostDateday;
	                    //获取截止时间预览
	                    var jolisCloseDate=TeachJoblistInfo.jolisCloseDate.split(",");
                    	var jolisCloseDateyear=jolisCloseDate[1].trim();
                        var jolisCloseDatemonth=trueMonth(jolisCloseDate[0].split(" ")[0]);
                        var jolisCloseDateday=jolisCloseDate[0].split(" ")[1];
                        var jolisCloseDatePrei=jolisCloseDateyear+"/"+jolisCloseDatemonth+"/"+jolisCloseDateday;
                       //所在地
                    	var province100=parseInt((TeachJoblistInfo.jolisLctId+"").substring(0,3)+"0000000000000");
                    	var city10=parseInt((TeachJoblistInfo.jolisLctId+"").substring(0,5)+"00000000000");
                    	var basicLoc=ChineseDistricts[province100][city10];
                    	//薪资
	                    var jolisSalaryLow="0";
	                    if(TeachJoblistInfo.jolisSalaryLow!=null&&TeachJoblistInfo.jolisSalaryLow>0){
	                    	jolisSalaryLow=((TeachJoblistInfo.jolisSalaryLow)/1000)+"k";
	                	}
	                	jolisSalaryHigh=(TeachJoblistInfo.jolisSalaryHigh)/1000;
	                	var showjolisSalary=jolisSalaryLow+"-"+jolisSalaryHigh+"k";
	                	//学历要求
                        var jolisEduId=edu_a[TeachJoblistInfo.jolisEduId]+"及以上"
                        //工作类型
                        var jobType = Wrktyp_a[TeachJoblistInfo.jolisWrktypId];
                        //经验要求
                        var jolisExperence=TeachJoblistInfo.jolisExperence;
                        if(TeachJoblistInfo.jolisExperence!=null&&TeachJoblistInfo.jolisExperence>0){
                        	jolisExperence="经验"+TeachJoblistInfo.jolisExperence+"年以下";
                        }else{
                        	jolisExperence="经验不限";
                        }
                        //性别要求
                        var gender="男女不限";
                        if(TeachJoblistInfo.jolisGendex){
                        	gender="男士";
                        }else if(!TeachJoblistInfo.jolisGendex){
                        	gender="女士";
                        }
                        $("#jolisListForTeach").append("<li class='position_list_item default_list'>"+
			            "<div class='pli_top'><div class='fl pli_top_l'><div class='position_name'>"+
			                        "<h2 class='fl'><a target='_blank' class='position_link fl wordCut' onclick='jumpTeachPositionInfo("+TeachJoblistInfo.jolisId+");'>"+TeachJoblistInfo.jolisName+"<span>["+basicLoc+"]</span></a></h2>"+
			         			"</div><div class='position_main_info'>"+
			                        "<span class='salary fl'>"+showjolisSalary+"</span>"+
			                        "<span>"+jolisExperence+"</span> / <span>"+jolisEduId+"</span> / <span class='num_of_people'>"+TeachJoblistInfo.jolisPersons+"人</span>"+
			                    "</div></div>"+
			                "<div class='fr pli_top_r'>"+
			                    "<div class='company_name wordCut' style='color: #333'>"+TeachJoblistInfo.enterInfoName+"</div>"+
			                    "<div class='industry wordCut'>"+
			                        "<span>性别要求--"+gender+"</span>"+
			                    "</div></div></div>"+
			            "<div class='pli_btm'>"+
			                "<div class='pli_btm_l fl'>"+
			                    "<span class='wordCut'>"+jolisPostDatePrei+"发布 - "+jolisCloseDatePrei+" 截止</span>"+
			                "</div>"+
			            	"<div class='pli_btm_r fr wordCut'>"+TeachJoblistInfo.enterInfoScaleId+"人以上</div>"+
			            "</div>"+
			        "</li>");
            		}
            	}
            	//分页代码
				var PageUtils=jsonMap.datapage;
				var pagesLi=PageUtils.currentPage;
				var currentNode=$(".jolispagination li.active a");
				currentNode.html(pagesLi);
				pagesLi=pagesLi+1;
				currentNode.parent().next("li").children(":first").html(pagesLi);
				pagesLi=pagesLi+1;
				currentNode.parent().next("li").next("li").children(":first").html(pagesLi);
				pagesLi=pagesLi+1;
				currentNode.parent().next("li").next("li").next("li").children(":first").html(pagesLi);
				$("#jolistotalPageTeach").html(PageUtils.totalPage);
			}
		},
		error:function () {
            alert("访问服务器失败！");
        },
    })
}
//跳转页面分页代码
$(".tojumpjolis").click(function (e){
	var cuurentPage=$(this).text();//获取当前页码
	var TotalPage=$("#jolistotalPageTeach").text();//获取总页数
	if(cuurentPage>=TotalPage){
		cuurentPage=TotalPage;
		alert("将进入尾页");
	}
	var pagesize=5;
	var jolisStatus=overjolisStatus;
	getjolisListsForTeach(cuurentPage,pagesize);
	e.preventDefault();
})
//下一页分页代码
$("#jolisNextPage").click(function (e) {
	var cuurentPage=$(".jolispagination li.active a").text();
	cuurentPage=cuurentPage*1+1;
	var TotalPage=$("#jolistotalPageTeach").text();//获取总页数
	if(cuurentPage>TotalPage){
		alert("已经是最后一页了");
		e.preventDefault();
	}else{
		var pagesize=5;
		getjolisListsForTeach(cuurentPage,pagesize);
		e.preventDefault();
	}
})
//上一页分页代码
$("#jolisLastPage").click(function (e) {
	var cuurentPage=$(".jolispagination li.active a").text();
	cuurentPage=cuurentPage-1;
	if(cuurentPage<1){
		alert("已经是第一页了");
	}else{
		var pagesize=5;
		getjolisListsForTeach(cuurentPage,pagesize);
		
	}
	e.preventDefault();
})
//输入跳转几页 分页代码
$("#jumpbuttonjolis").click(function (e) {
	var cuurentPage=$("#jumpPageInputJolis").val();
	if(!/^[0-9]*$/.test(cuurentPage)||cuurentPage==""){
        alert("请输入数字");
    }
	var TotalPage=$("#jolistotalPageTeach").text();//获取总页数
	if(cuurentPage<1||cuurentPage>TotalPage){
		alert("请输入1至"+TotalPage+"内的数字");
	}else{
		var pagesize=5;
		getjolisListsForTeach(cuurentPage,pagesize);
	}
	e.preventDefault();
})
//点击跳转职位审批页面
//$("#jolisApprovalManger").click( function(e){
//	$(this).addClass("active");
//	var cuurentPage=1;//获取当前页码
//	var pagesize=5;
//	getjolisListsForTeach(cuurentPage,pagesize);
//	
//	e.preventDefault();
//})
//将月份的（四改成4） 
function trueMonth(month){
	switch(month)
	   {
	   case "一月":
		   month="1";
	     break
	   case "二月":
		   month="2";
	     break
	   case "三月":
		   month="3";
		 break
	   case "四月":
		   month="4";
		 break
	   case "五月":
		   month="5";
		 break
	   case "六月":
		   month="6";
		 break			 
	   case "七月":
		   month="7";
		 break
	   case "八月":
		   month="8";
		 break
	   case "九月":
		   month="9";
		 break	
	   case "十月":
		   month="10";
		 break
	   case "十一月":
		   month="11";
		 break
	   case "十二月":
		   month="12";
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
function jumpTeachPositionInfo(jolisId){
		$.ajax({
			url:homeUrl+'jolis/getDetailpageforteach',
			async:false,//改为同步
			data:{  
				"teachId":teachId,
			    "guid":guid,
		        "jolisId":jolisId,
		        },
		        type:'post',
			success:function(data){
				var jsonMap=JSON.parse(data);
	            if(jsonMap.code==301){
	        		alert("您为非法用户");
	        		window.location.href="getJoblists.html"; 
	        	}else if(jsonMap.code==302){
	        		alert("您停留时间过长");
	        		window.location.href="getJoblists.html"; 
	            }else if(jsonMap.code==200){
	            	var list=jsonMap.data
	            	var jsonstr=JSON.stringify(list[0]);//将对象封装成json字符串
					localStorage.jolisinfo=jsonstr;//设置值
					console.log(localStorage.jolisinfo);//获取值
					location.href="../html/teachPositionInfo.html";
				}
			},
			error:function(){
				alert("访问服务器失败！");
			},
		})
}