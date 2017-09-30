var teachId=1;
var guid="37g337Q99hAP0KShTqhhn9ZI11lLpONT";
window.onload = onloadtoshow();
//自加载方法  需要传参数
function onloadtoshow(){
	var cuurentPage=1;//获取当前页码
	var pagesize=5;
	enterpriseApproval(cuurentPage,pagesize);
}

// 导航“企业审批”选项点击事件
function enterpriseApproval(cuurentPage,pagesize){
	// 信息的数量
	$
			.ajax({
				url : homeUrl + 'enterinfo/getEnterInfoLists',
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
						$("#enterpriseApproval").html('');
						var list = jsonMap.data;
						if (list.length > 0) {
							for (var i = 0; i < list.length; i++) {
								var enterprise=list[i];
								createEnterpriseDiv(enterprise);
							}
						}else{
							
						}
						// 分页代码
						var PageUtils=jsonMap.datapage;
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
function createEnterpriseDiv(enterprise) {
	// 公司名字
	if(enterprise[2]==null||enterprise[2]==""){
		var enterInfoName="公司无名字";
	}else{
		var enterInfoName=enterprise[2];
	}
	
	// 公司性质
	var comTypeShow;
	if(enterprise[1]==0){
		comTypeShow="企业无性质";
	}else{
		comTypeShow=cmptyp_a[enterprise[1]];
	}
	
	 // 行业
	 var enterIndIdpreviewSum;
    if(enterprise[7]!=undefined){
   	 var enterIndIdfirst=parseInt((enterprise[7]+"").substring(0,4)+"000000000");
        var enterIndIdfirstpreview=industry[1000000000000][enterIndIdfirst];
        var enterIndIdSecondpreview=industry[enterIndIdfirst][enterprise[7]];
        var enterIndIdpreview=enterIndIdfirstpreview+"--"+enterIndIdSecondpreview;
        enterIndIdpreviewSum=enterIndIdpreview;
   	// 行业2
        if(enterprise[8]!=undefined&&enterprise[8]!=""&&enterprise[8]!=0){
       	 var enterIndIdfirst=parseInt((enterprise[8]+"").substring(0,4)+"000000000");
            var enterIndIdfirstpreview=industry[1000000000000][enterIndIdfirst];
            var enterIndIdSecondpreview=industry[enterIndIdfirst][enterprise[8]];
            var enterIndIdpreview2=enterIndIdfirstpreview+"--"+enterIndIdSecondpreview;
            enterIndIdpreviewSum=enterIndIdpreview+enterIndIdpreview2;
          // 行业3
            if(enterprise[9]!=undefined&&enterprise[9]!=""&&enterprise[9]!=0){
           	 var enterIndIdfirst=parseInt((enterprise[9]+"").substring(0,4)+"000000000");
                var enterIndIdfirstpreview=industry[1000000000000][enterIndIdfirst];
                var enterIndIdSecondpreview=industry[enterIndIdfirst][enterprise[9]];
                var enterIndIdpreview3=enterIndIdfirstpreview+"--"+enterIndIdSecondpreview;
                enterIndIdpreviewSum=enterIndIdpreview+enterIndIdpreview2+enterIndIdpreview3;
            }
        }
    }
    
    // 公司社会统一代码
    var ieepa;
	if(enterprise[4]==""||enterprise[4]==0||enterprise[4]==null){
		ieepa="企业无社会统一代码";
	}else{
		ieepa=enterprise[4];
	}
	
	// 公司电话
	var phone;
	if(enterprise[10]==""||enterprise[10]==0||enterprise[10]==null){
		phone="企业无电话";
	}else{
		phone=enterprise[10];
	}
	
	// 公司详细地址
	var adress;
	if(enterprise[6]==""||enterprise[6]==0||enterprise[6]==null){
		adress="企业无详细地址";
	}else{
		adress=enterprise[6];
	}
	
	// 公司规模
	var scale;
	if(enterprise[3]==""||enterprise[3]==0||enterprise[3]==null){
		scale="企业暂时无人";
	}else{
		scale=enterprise[3]+"人";
	}
	$("#enterpriseApproval")
			.append(
					"<li class='position_list_item default_list'><div class='pli_top teaCom'><div class='fl pli_top_l'><div class='position_name'><h2 class='fl'><a class='position_link fl wordCut' onclick='togetenterdetailInfo("+enterprise[0]+");'><b title='"+enterInfoName+"'>"
							+ enterInfoName
							+ "</b><span>"
							+ "["+comTypeShow+"]"
							+ "</span></a></h2></div>"
							+ "<div class='position_main_info wordCut'>"
							+enterIndIdpreviewSum
							+ "</div></div>"
							+ "<div class='teacherL pli_top_r'><div class='wordCut' style='height: 34px'>"
							+ ieepa
							+ "</div>"
							+ "<div class='industry wordCut'><span>"
							+ phone
							+ "</span></div></div>"
							+ "<div class='pli_btm'><div class='pli_btm_l fl wordCut teaAdd'>"
							+ adress
							+ "</div>"
							+ "<div class='pli_btm_r fr wordCut type'>"
							+ scale
							+ "</div></div></div></li>");
}

// 上一页分页代码
$("#jofaiLastPage").click(function (e) {
	var cuurentPage=$(".jofaipagination li.active a").text();
	cuurentPage=cuurentPage-1;
	if(cuurentPage<1){
		alert("已经是第一页了");
	}else{
		var pagesize=5;
		enterpriseApproval(cuurentPage,pagesize);
	}
	e.preventDefault();
})

// 下一页分页代码
$("#jofaiNextPage").click(function (e) {
	var cuurentPage=$(".jofaipagination li.active a").text();
	cuurentPage=cuurentPage*1+1;
	var TotalPage=$("#JofaitotalPage").text();// 获取总页数
	if(cuurentPage>TotalPage){
		alert("已经是最后一页了");
		e.preventDefault();
	}else{
		var pagesize=5;
		enterpriseApproval(cuurentPage,pagesize);
		e.preventDefault();
	}
})

// 跳转页面分页代码
$(".tojumpjofai").click(function (e){
	var cuurentPage=$(this).text();// 获取当前页码
	var TotalPage=$("#JofaitotalPage").text();// 获取总页数
	if(cuurentPage>=TotalPage){
		cuurentPage=TotalPage;
		alert("将进入尾页");
	}
	var pagesize=5;
	enterpriseApproval(cuurentPage,pagesize);
	e.preventDefault();
})

// 输入跳转几页 分页代码
$("#jumpbuttonjofai").click(function (e) {
	var cuurentPage=$("#jumpPageInputJofai").val();
	if(!/^[0-9]*$/.test(cuurentPage)||cuurentPage==""){
        alert("请输入数字");
    }
	var TotalPage=$("#JofaitotalPage").text();// 获取总页数
	if(cuurentPage<1||cuurentPage>TotalPage){
		alert("请输入1至"+TotalPage+"内的数字");
	}else{
		var pagesize=5;
		enterpriseApproval(cuurentPage,pagesize);
	}
	e.preventDefault();
})

//显示企业详情页面
function togetenterdetailInfo(enterInfoId){
		$.ajax({
			url:homeUrl+'JobFairView/getEnterInfoforteach',
			async:false, // 改成同步
			data:{
			    "teachId":teachId,
			    "guid":guid,
			    "enterInfoId":enterInfoId,
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
	            	$("#enterpriseApproval").empty();
					var list=jsonMap.data;
	            	var jsonstr=JSON.stringify(list);//将对象封装成json字符串
					localStorage.enterinfo=jsonstr;//设置值
					console.log(localStorage.enterinfo);//获取值
					location.href="../html/teacher_ComInfo.html";
				}
			},
			error:function () {
	            alert("访问服务器失败！");
	        },
	    })
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