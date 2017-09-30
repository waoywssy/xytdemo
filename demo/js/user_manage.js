/**
 * Created by Administrator on 2017/6/19 0019.
 */
   // 需要的信息有
    // 姓名：enterName
   // 职位：enterPosition
   // 性别：enterGenger
   // 用户类型：enterType 1：成员 2：管理员 3：未审核 4：审核未通过 5：已删除
    var enter_user_manage = $(".enter-user-manage");
    for(var index = 0;index <enter_user_manage.length;index++){
    $(enter_user_manage[index]).click(function () {
            getEnterUser();
        }
    );
}
//第一步，拿到三个列表的盒子
    //未审批用户
    var un_exam_user_child = $("#un_exam_user_child");
    //审批未通过用户
    var examing_user_child = $("#examing_user_child");
    //企业用户（已通过审批）
    var enter_user_child = $("#enter_user_child");
    var enter_user = [];
    //给用户分组用的数组
    var un_exam_user = [];
    var examing_user = [];
    var examed = [];

    //假数据
    var b = 1;
    var a;
    //用户ID
    var enterId=1;
    window.onload = onloadgetEnterUser();
    //点击进入职位页面的自加载方法
    function onloadgetEnterUser(){
    	var guid="37g337Q99hAP0KShTqhhn9ZI11lLpONT";
    	var urlHref=window.location.href;
    	urlHref=urlHref.split("#")[0];   	
    	urlHref=urlHref+"#"+guid
    	location.href=urlHref;
		getEnterUser();
    }
// 第二步：接收后台数据并展示
    function getEnterUser() {
    	var urlHref = window.location.href;
    	var guid = urlHref.split("#")[1];
        $("#enter_user_head").empty();
        un_exam_user_child.empty();
        examing_user_child.empty();
        enter_user_child.empty();
        $.ajax(  {
        type:"post",
        dataType:"JSON",
        url:homeUrl + "enteruser/getEnteruserEnter",
        async:false,
        data:{"enterEnterInfoId":1,"enterType":1,"guid":guid,"enterId":b},
        success:function (data) {
            if(data.code!=200){
                console.log(data.code+"页面错误");
            }
            else{
                enter_user = data.data;
                console.log(enter_user);
            }
        },
        error:function () {
            alert("连接服务器失败！");
        }
    });

//第三步：  enter_user已经接收到所有的企业用户数据,是一个对象数组，首先要根据用户类型enterType对这个数组进行分类，然后再分块显示到列表当中去
        un_exam_user = [];
        examing_user = [];
        examed = [];
        for(var i = 0;i < enter_user.length;i++){
            //用户类型：enterType 1：成员 2：管理员 3：未审核 4：审核未通过
            // console.log(enter_user[i]);
            // enter_user[i].enterType = 3;
            if(enter_user[i].enterType == 1|| enter_user[i].enterType ==2){
                examed.push(enter_user[i]);
            }else if(enter_user[i].enterType == 3){
                un_exam_user.push(enter_user[i]);
            }else if(enter_user[i].enterType == 4){
                examing_user.push(enter_user[i]);
            }
        }
    //第四步，数据展示
    //数据展示的时候，因为根据操作用户的不同，要展示不同的用户操作。操作用户的类型和openid本来是要在做了登录之后才能进行判断的。所以这里给一个
    // 假参数，假数据，登录功能做好之后，请修改这段代码
        // 展示未审批用户
        for(var u = 0; u < un_exam_user.length;u++){
            //处理性别
            var u_sex= un_exam_user[u].enterGender;
            if(u_sex){
                u_sex = "男"
            }else if(!u_sex){
                u_sex = "女";
            }else{
                u_sex = "保密";
            }
            un_exam_user_child.append(
                "<ul class='un_exam_user_ul'>"+
                "<li  class='enterprise_user_t1'>"+un_exam_user[u].enterName+"</li>"+
                "<li  class='enterprise_user_t2'>"+u_sex+"</li>"+
                "<li  class='enterprise_user_t3'>"+un_exam_user[u].enterPosition+"</li>"+
                "<li  class='enterprise_user_t4'>"+
                "<button class='btn-sm btn-primary' id = 'ue_to_en"+u+"' onclick='ueToEn(this,"+u+")'>通过</button>" +
                "<button class='btn-sm btn-default' id = 'ue_to_ei" + u + "' onclick='ue_to_ei(this,"+u+")'>拒绝</button>" +
                "</li>" +
                "</ul>"
            );
            // console.log(u);
        }

        //展示审批未通过用户
        for(var ei = 0;ei<examing_user.length;ei++){
            //处理性别
            var ei_sex= examing_user[ei].enterGender;
            if(ei_sex){
                ei_sex = "男"
            }else if(!ei_sex){
                ei_sex = "女";
            }else{
                ei_sex = "保密";
            }
            examing_user_child.append(
                "<ul class='examing_user_ul'>"+
                "<li class='enterprise_user_t1'>"+examing_user[ei].enterName+"</li>"+
                "<li class='enterprise_user_t2'>"+ei_sex+"</li>"+
                "<li class='enterprise_user_t3'>"+examing_user[ei].enterPosition+"</li>"+
                "<li class='enterprise_user_t4'>"+
                "<button class='btn-sm btn-primary' id='ei_to_ue+"+ei+"' onclick='ei_to_un(this,"+ei+")'>还原</button>"+
                "<button class='btn-sm btn-default' id='ei_delete"+ei+"' onclick='ei_to_de(this,"+ei+")'>删除</button>"+
                "</li>"+
                "</ul>"
            )
        }

        //展示企业用户
        //假数据的作用域从这里开始
        //假数据的作用从这里开始
        for(var z=0;z<enter_user.length;z++ ){
            // console.log(enter_user[z]);
            if(b == enter_user[z].enterId){
                a = enter_user[z].enterType;
            }
        }
        if(a == 2){
            $("#enter_user_head").append(
                "<ul class='enter_user_ul'>"+
                "<li class='enterprise_user_t1'>姓名</li>"+
                "<li class='enterprise_user_t2'>性别</li>"+
                "<li class='enterprise_user_t3'>职位</li>"+
                "<li class='enterprise_user_t4'>操作</li>"+
                "</ul>"
            );
            for(var e = 0; e < examed.length;e++){
                //处理性别
                var e_sex= examed[e].enterGender;
                if(e_sex){
                    e_sex = "男"
                }else if(!e_sex){
                    e_sex = "女";
                }else{
                    e_sex = "保密";
                }

                if(examed[e].enterId == b){
                    enter_user_child.append(
                        "<ul class='enter_user_ul'>"+
                        "<li class='enterprise_user_t1'>"+examed[e].enterName+"</li>"+
                        "<li class='enterprise_user_t2'>"+e_sex+"</li>"+
                        "<li class='enterprise_user_t3'>"+examed[e].enterPosition+"</li>"+
                        "<li class='enterprise_user_t4'>"+
                        "<button style='visibility: hidden' class='btn-sm btn-primary' id='change_manager"+e+"' onclick='change_manager(this,"+e+")'>转让管理员</button>"+
                        "<button style='visibility: hidden' class='btn-sm btn-default' id='enter_user_delete"+e+"' onclick='enterUserDelete(this,"+e+")'>删除</button>"+
                        "</li>"+
                        "</ul>"
                    )
                }else{
                    enter_user_child.append(
                        "<ul class='enter_user_ul'>"+
                        "<li class='enterprise_user_t1'>"+examed[e].enterName+"</li>"+
                        "<li class='enterprise_user_t2'>"+e_sex+"</li>"+
                        "<li class='enterprise_user_t3'>"+examed[e].enterPosition+"</li>"+
                        "<li class='enterprise_user_t4'>"+
                        "<button class='btn-sm btn-primary' id='change_manager"+e+"' onclick='change_manager(this,"+e+")'>转让管理员</button>"+
                        "<button class='btn-sm btn-default' id='enter_user_delete"+e+"' onclick='enterUserDelete(this,"+e+")'>删除</button>"+
                        "</li>"+
                        "</ul>"
                    )
                }
            }
        }
        else{
            $("#enter_user_head").append(
                "<ul class='enter_user_ul_sm title'>"+
                "<li class='enterprise_user_sm_t1'>姓名</li>"+
                "<li class='enterprise_user_sm_t2'>性别</li>"+
                "<li class='enterprise_user_sm_t3'>职位</li>"+
                "</ul>"
            );
            for(var e = 0; e < examed.length;e++){
                //处理性别
                var e_sex= examed[e].enterGender;
                if(e_sex){
                    e_sex = "男"
                }else if(!e_sex){
                    e_sex = "女";
                }else{
                    e_sex = "保密";
                }
                enter_user_child.append(
                    "<ul class='enter_user_ul_sm'>"+
                    "<li class='enterprise_user_sm_t1'>"+examed[e].enterName+"</li>"+
                    "<li class='enterprise_user_sm_t2'>"+e_sex+"</li>"+
                    "<li class='enterprise_user_sm_t3'>"+examed[e].enterPosition+"</li>"+
                    "</ul>"
                )
            }
        }
        // 假数据a的作用域到这里结束
}
// 第五步，处理各个表单的操作
    //未审批用户审核通过后,该用户转到企业用户成员项
    //这里要写方法，绑定到每一个按钮上去

    /**
     * 审核通过使用的方法
     */
    function ueToEn (e,_id) {
        var _this = e;
        var _id = _id;
        var urlHref = window.location.href;
    	var guid = urlHref.split("#")[1];
        $(_this).parent().parent("ul.un_exam_user_ul").remove();
        un_exam_user[_id].enterType = 1;
        $.ajax({
            type:'post',
            dataType:"JSON",
            url:homeUrl + "enteruser/updateEnteruserType",
            data:{
                "enterUserId":un_exam_user[_id].enterId,
                "enterType":un_exam_user[_id].enterType,
                "guid":guid,
                "enterId":enterId
            },
            success:function (data) {
            },
            error:function () {
                alert("连接服务器失败！");
            }
        })
    }

    /**
     *审核未通过使用的方法
     */
    function ue_to_ei(e,_id) {
        var _this = e;
        var _id = _id;
        var urlHref = window.location.href;
    	var guid = urlHref.split("#")[1];
        un_exam_user[_id].enterType = 4;
        $(_this).parent().parent("ul.un_exam_user_ul").remove();
        $.ajax({
            type:'post',
            dataType:"JSON",
            url:homeUrl + "enteruser/updateEnteruserType",
            data:{
                "enterUserId":un_exam_user[_id].enterId,
                "enterType":un_exam_user[_id].enterType,
                "enterId":enterId,
                "guid":guid
            },
            success:function (data) {
            },
            error:function () {
                alert("连接服务器失败！");
            }
        })
    }

    /**
     * 还原操作
     */
    function ei_to_un(e,_id) {
            var _this = e;
            var _id = _id;
            var urlHref = window.location.href;
        	var guid = urlHref.split("#")[1];
            examing_user[_id].enterType = 3;
            $(_this).parent().parent("ul.examing_user_ul").remove();
            $.ajax({
                type:'post',
                dataType:"JSON",
                url:homeUrl + "enteruser/updateEnteruserType",
                data:{
                    "enterUserId":examing_user[_id].enterId,
                    "enterType":examing_user[_id].enterType,
                    "enterId":enterId,
                    "guid":guid
                },
                success:function (data) {

                },
                error:function () {
                    alert("连接服务器失败！");
                }
            })
        }

    /**
     * 审核未通过的人员的删除操作
     */

    function ei_to_de(e,_id) {
        var _this = e;
        var _id = _id;
        var urlHref = window.location.href;
    	var guid = urlHref.split("#")[1];
        examing_user[_id].enterType = 5;
        $(_this).parent().parent("ul.examing_user_ul").remove();
        $.ajax({
            type:'post',
            dataType:"JSON",
            url:homeUrl + "enteruser/updateEnteruserType",
            data:{
                "enterUserId":examing_user[_id].enterId,
                "enterType":examing_user[_id].enterType,
                "enterId":enterId,
                "guid":guid
            },
            success:function (data) {
            },
            error:function () {
                alert("连接服务器失败！");
            }
        })
    }

    /**
 * 企业成员删除操作
     */
    function enterUserDelete(e,_id) {
        var _this = e;
        var _id = _id;
        examed[_id].enterType = 5;
        $(_this).parent().parent("ul.enter_user_ul").remove();
        $.ajax({
            type:'post',
            dataType:"JSON",
            url:homeUrl + "enteruser/updateEnteruserType",
            data:{
                "enterUserId":examed[_id].enterId,
                "enterType":examed[_id].enterType,
                "enterId":enterId,
                "guid":guid
            },
            success:function (data) {
            },
            error:function () {
                alert("连接服务器失败！");
            }
        })
    }

    /**
     * 转让管理员操作
     */
    function change_manager (e,_id){
        // var _this = e;
        var _zz = _id;
        var urlHref = window.location.href;
    	var guid = urlHref.split("#")[1];
        console.log(_id);
        examed[_zz].enterType = 2;
        for(var z=0;z<enter_user.length;z++ ){
            if(b == enter_user[z].enterId){
                enter_user[z].enterType = 1;
                break;
            }
        }
        $.ajax({
            type:'post',
            dataType:"JSON",
            url:homeUrl + "enteruser/updateEnteruserType",
            data:{
                "enterUserId":examed[_zz].enterId,
                "enterType":examed[_zz].enterType,
                "enterId":enterId,
                "guid":guid
            },
            success:function (data) {
                getEnterUser();
            },
            error:function () {
                alert("连接服务器失败！");
            }
        });
        $.ajax({
            type:'post',
            dataType:"JSON",
            url:homeUrl + "enteruser/updateEnteruserType",
            data:{
                "enterUserId":enter_user[z].enterId,
                "enterType":enter_user[z].enterType,
                "enterId":enterId,
                "guid":guid
            },
            success:function (data) {

            },
            error:function () {
                alert("连接服务器失败！");
            }
        });
        getEnterUser();
    }

//从这里往下是展示和修改个人信息的代码
    var toSelfInfoBtn = $("#toSelfInfoBtn");
    var enterprise_user = $(".enterprise_user");
    var enter_user_self_info_box = $(".enter-user-self-info-box");
    var enter_user_self_info_edit_btn = $(".enter-user-self-info-edit-btn");
    var enter_user_self_info_pre = $(".enter-user-self-info-pre");
    var enter_user_self_info_edit = $(".enter-user-self-info-edit");
    var enterUserSelfInfoSave = $("#enterUserSelfInfoSave");
    var enterUserSelfInfoReset = $("#enterUserSelfInfoReset");
    var enterUser_pre_fanhui = $("#enterUser_pre_fanhui");
    //点击“查看个人信息”按钮跳转到个人信息展示页面的事件
    toSelfInfoBtn.click(function () {
        enterprise_user.css("display","none");
        enter_user_self_info_box.css("display","block");
        for(var x = 0; x < enter_user.length; x++){
            if(enter_user[x].enterId == b){
                break;
            }
        }
        console.log(enter_user[x]);
        //数据展示
        //姓名
        $("#enterUserSelfInfoPreNname").text(enter_user[x].enterName);
        //处理性别
        console.log(enter_user[x].enterGender);
        if(enter_user[x].enterGender){
            $($("#enterUserSelfInfoPreSex li")[0]).removeClass("btn-default");
            $($("#enterUserSelfInfoPreSex li")[0]).addClass("btn-primary");
            $($("#enterUserSelfInfoPreSex li")[0]).siblings().removeClass("btn-primary");
            $($("#enterUserSelfInfoPreSex li")[0]).siblings().addClass("btn-default");
        }else if(!enter_user[x].enterGender){
            $($("#enterUserSelfInfoPreSex li")[1]).removeClass("btn-default");
            $($("#enterUserSelfInfoPreSex li")[1]).addClass("btn-primary");
            $($("#enterUserSelfInfoPreSex li")[1]).siblings().removeClass("btn-primary");
            $($("#enterUserSelfInfoPreSex li")[1]).siblings().addClass("btn-default");
        }else if(enter_user[x].enterGender == undefined){
            $($("#enterUserSelfInfoPreSex li")[2]).removeClass("btn-default");
            $($("#enterUserSelfInfoPreSex li")[2]).addClass("btn-primary");
            $($("#enterUserSelfInfoPreSex li")[2]).siblings().removeClass("btn-primary");
            $($("#enterUserSelfInfoPreSex li")[2]).siblings().addClass("btn-default");
        }
        //职位
        $("#enterUserSelfInfoPrePosition").text(enter_user[x].enterPosition);
        //用户类型
        switch (enter_user[x].enterType){
            case 1: $("#enterUserSelfInfoPreType").text("企业成员");break;
            case 2:$("#enterUserSelfInfoPreType").text("企业管理员");break;
        }
        //处理时间
        $("#enterUserSelfInfoPreApplyDate").text(changeData(enter_user[x].enterDate)[2]);
    });
    //点击“点此编辑”按钮跳转到编辑个人信息页面事件
    enter_user_self_info_edit_btn.click(function () {
        enter_user_self_info_pre.css("display","none");
        enter_user_self_info_edit.css("display","block");
        //姓名
        $("#enterUserSelfInfoEdiName").val($("#enterUserSelfInfoPreNname").text());
        //性别
        for(var i = 0;i<$("#enterUserSelfInfoPreSex li").length;i++){
            if($($("#enterUserSelfInfoPreSex li")[i]).hasClass("btn-primary")){
                $($("#enterUserSelfInfoEdiSex li")[i]).removeClass("btn-default");
                $($("#enterUserSelfInfoEdiSex li")[i]).addClass("btn-primary");
                $($("#enterUserSelfInfoEdiSex li")[i]).siblings().removeClass("btn-primary");
                $($("#enterUserSelfInfoEdiSex li")[i]).siblings().addClass("btn-default");
            }
            $($("#enterUserSelfInfoEdiSex li")[i]).click(
                function () {
                    console.log("111");
                    $(this).removeClass("btn-default");
                    $(this).addClass("btn-primary");
                    $(this).siblings().removeClass("btn-primary");
                    $(this).siblings().addClass("btn-default");
                }
            )
        }
        //职位
            $("#enterUserSelfInfoEdiPosition").val($("#enterUserSelfInfoPrePosition").html());
    });
    //预览页面下的返回按钮
    enterUser_pre_fanhui.click(function () {
        enterprise_user.css("display","block");
        enter_user_self_info_box.css("display","none");
    })
    //保存修改后个人信息事件
    enterUserSelfInfoSave.click(function () {
    	var urlHref = window.location.href;
    	var guid = urlHref.split("#")[1];
        for(var y = 0; y < enter_user.length; y++){
            if(enter_user[y].enterId == b){
                break;
            }
        }
        console.log(enter_user[y]);
        //姓名
        enter_user[y].enterName = $("#enterUserSelfInfoEdiName").val();
       // 性别
       for(var i = 0;i<$("#enterUserSelfInfoEdiSex li").length;i++){
           if($($("#enterUserSelfInfoEdiSex li")[i]).hasClass("btn-primary")){
               break;
           }
       }
       switch (i){
           case 0 :enter_user[y].enterGender = 1;break;
           case 1:enter_user[y].enterGender = 0; break;
           case 2:enter_user[y].enterGender = "";break;
       }
       //职位
        enter_user[y].enterPosition =  $("#enterUserSelfInfoEdiPosition").val();
       // 转化日期
        enter_user[y].enterDate = changeData(enter_user[y].enterDate)[2];
        var dateStr = enter_user[y].enterDate.split("-");
        enter_user[y].enterDate = dateStr[0]+"/"+dateStr[1]+"/"+dateStr[2];
        console.log(enter_user[y].enterDate);
        $.ajax({
           type:"post",
           dataType:"JSON",
           url:homeUrl + "enteruser/updateEnteruserEnter?guid="+guid+"&enterId="+enterId,
           data:enter_user[y],
           success:function (data) {
               // console.log(enter_user[y]);
               if(data.code == 200){
                   if(confirm("确认修改？")){
                       getEnterUser();
                       enterprise_user.css("display","block");
                       enter_user_self_info_box.css("display","none");
                       enter_user_self_info_pre.css("display","block");
                       enter_user_self_info_edit.css("display","none");
                   }else{
                       return false;
                   }
               }
                else{
                   alert("数据出错！");
               }
           },
           error:function () {
               alert("连接数据库失败！");
           }
       })
        getEnterUser();
    });
    //个人信息保存之前的取消按钮点击
    enterUserSelfInfoReset.click(function () {
        if (confirm("还未保存，确认返回？")){
            enterprise_user.css("display","block");
            enter_user_self_info_box.css("display","none");
            enter_user_self_info_pre.css("display","block");
            enter_user_self_info_edit.css("display","none");
        }else{
            return false;
        }
    });
    $("#EnterUserManagement").click(function () {
            getEnterUser();
        }
    )