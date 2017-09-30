/**
 * Created by fugh on 2017/7/25 0017.
 */
// var login_request = new WxLogin({
//     id:"login_container",
//     appid: "wx92bb1ca8c73650f8",
//     scope: "snsapi_login",
//     redirect_uri: "http://www.boryi.com/login.php",
//     state: "wechat_redirect",
//     style: "",
//     href: ""
// });
// 第一步获取code，（通过code获取acess_token）
// $("#_stu_login_button").click(function () {
    var login_request = new WxLogin({
        id:"login_container",
        appid: "wx53e4562246c0d0e3",
        scope: "snsapi_login",
        redirect_uri: "http://xyt.hasit.ac.cn/html/login.html",
        state: "wechat_redirect",
        style: "",
        href: ""
    });
// http://xyt.hasit.ac.cn/html/login.html?code=021iLWfy1fZMxf0B6mhy1oq9gy1iLWfy&state=wechat_redirect
var href = location.href;
var char = href.split("=");
console.log(char);
var code = char[1];
var state = char[2];
console.log(code,state);
if (code){
    // $.get("https://api.weixin.qq.com/sns/oauth2/access_token?appid=wx53e4562246c0d0e3&secret=7ebae9605465059932c439cd98a8a0e7&code="+code+"&grant_type=authorization_code");
    // location.href="https://api.weixin.qq.com/sns/oauth2/access_token?appid=wx53e4562246c0d0e3&secret=7ebae9605465059932c439cd98a8a0e7&code="+code+"&grant_type=authorization_code";
    // var tokenUrl="https://api.weixin.qq.com/sns/oauth2/access_token?appid=wx53e4562246c0d0e3&secret=7ebae9605465059932c439cd98a8a0e7&code="+code+"&grant_type=authorization_code";
    // $.ajax({
    //     url:tokenUrl,
    //     type:"get",
    //     dataType:"jsonp",
    //     success:function (data) {
    //         console.log(data);
    //     },
    //     error:function () {
    //         console.log("error");
    //     }
    // })
    $.get("https://api.weixin.qq.com/sns/oauth2/access_token?appid=wx53e4562246c0d0e3&secret=7ebae9605465059932c439cd98a8a0e7&code="+code+"&grant_type=authorization_code",function (data) {
        console.log(data);
    })
}
//     var code="071Sbpji2o251F0Erdii2uloji2Sbpjy";
//     var state="STATE";
//     location.href = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=wx92bb1ca8c73650f8&secret=e9f5e70970477cda205a2acfb537b5f8&code=071Sbpji2o251F0Erdii2uloji2Sbpjy&grant_type=authorization_code";
// });
    // $.ajax({
    //     type:'post',
    //     data:login_request,
    //     dataType:'json',
    //     url:""
    //     success:function (data) {
    //         console.log(data);
    //     },
    //     error:function () {
    //         alert("出错")
    //     }
//     });
//     // location.href = "https://open.weixin.qq.com/connect/qrconnect?appid=wx92bb1ca8c73650f8&redirect_uri=http://www.boryi.com/login.php&response_type=code&scope=snsapi_login&state=STATE#wechat_redirect"
// });

// <html>
// <head>
// </head>
// <body>
// <a href="https://open.weixin.qq.com/connect/qrconnect?appid=wx92bb1ca8c73650f8&redirect_uri=http://www.boryi.com/login.php&response_type=code&scope=snsapi_login&state=STATE#wechat_redirect" >
//     <img src="./xyt/icon32_wx_button.png" />
// </a>
// </body>
// </html>

// <?php
//     $code = $_REQUEST["code"];
// //拼接URL
// $token_url = "https://api.weixin.qq.com/sns/oauth2/access_token?grant_type=authorization_code&"
//     . "appid=wx92bb1ca8c73650f8&secret=e9f5e70970477cda205a2acfb537b5f8&code=$code&grant_type=authorization_code";
//
// if (!empty($code)) {
//     $result=get_contents($token_url);
//     $access_token = json_decode(trim($result));
//     if (isset($access_token->errcode)) {
//         //$this->error($access_token->errcode, $access_token->errmsg);
//     } else {
//         //var_dump($access_token);
//     }
//
//     get_user_info($access_token, "zh_CN");
// }
//
//
// function get_user_info($access_token, $language="zh_CN") {
//     $url = "https://api.weixin.qq.com/sns/userinfo?access_token=".$access_token->access_token."&openid=".$access_token->openid;
//     $user_info = json_decode(get_contents($url));
//     if (isset($user_info->errcode)) {
//         //$this->error($user_info->errcode,$user_info->errmsg);
//     }else{
// //	            var_dump($user_info);
//     }
//     echo 'Welcom, ' . $user_info->nickname;
// }
//
// function get_contents($url){
//     $ch = curl_init();
//     curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
//     curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
//     curl_setopt($ch, CURLOPT_URL, $url);
//     $response =  curl_exec($ch);
//     curl_close($ch);
//
//     //-------请求为空
//     if(empty($response)){
//         exit("50001");
//     }
//
//     return $response;
// }
