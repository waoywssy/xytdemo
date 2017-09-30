// JavaScript Document
//左侧导航切换
var nav_li = $(".left_nav .nav-pills li");
var info_preview_li = $(".main_body .info_block .info_preview");
nav_li.click(function (e) {
	e.preventDefault();
	for(var index = 0;index<nav_li.length;index++){
		if(nav_li[index]==$(this).get(0)){
			$(this).addClass("active");
			$(this).siblings().removeClass("active");
			$(info_preview_li[index]).css("display","block");
			$(info_preview_li[index]).siblings().css("display","none");
		}
	}
});
//预览——编辑切换函数
//$("body").on("click",".click_to_ed",function (e) {
//    e.preventDefault();
//    $(this).parents(".info_preview").css("display","none");
//    $(this).parents(".info_preview").prev("li").css("display","block");
//});
//“取消”按钮的点击事件（回到预览页）
$("body").on("click",".resetBtn",function (e) {
    e.preventDefault();
    $(this).parents(".info_edit").css("display","none");
    $(this).parents(".info_edit").next("li").css("display","block");
});
//基本信息 编辑 — 展开更多
$(function () { $('#collapseFour').collapse({'toggle': false})});
$(function () { $('#collapseTwo').collapse('show')});
$(function () { $('#collapseThree').collapse('toggle')});
$(function () { $('#collapseOne').collapse('hide')});
$('#accordion a:first').click( function(){
    if( $(this).innerText === '< 展开更多' ){
        $(this).html('< 收起更多');
    }else{
        $(this).html('< 展开更多');
    };
});
//----------- 教育经历 ------------------
//检查select（出生日期、籍贯）
function checkSelect(obj){
  var val = obj.val();
  if( val == '' ){
      return false
  }else{
      return true
  };
};
//检查input（民族、联系电话）
function checkInput(obj){
  var val = obj.val();
  if( val == '' ){
      return false
  }else{
      return true
  };
};
//提交校验

function BasInfoOnchange() {
  var flag;
  var bornYearSel = checkSelect($('#bornDate select:eq(0)')),
      bornMonSel = checkSelect($('#bornDate select:eq(1)')),
      bornDateSel = checkSelect($('#bornDate select:eq(2)'));
  var bornProvSel = checkSelect($('#province10')),
      bornCitySel = checkSelect($('#city10')),
      bornDistSel = checkSelect($('#district10'));
  var nationIpt = checkInput($('#nation')),
      mobiPhIpt = checkInput($('#mobilePh'));
  if (bornYearSel && bornMonSel && bornDateSel && bornProvSel && bornCitySel && bornDistSel && nationIpt && mobiPhIpt){
      flag=true;
      $('#basSaveBtn').attr('disabled', false);
  }
  return flag;
};
function doSubmit(){
  var bornYearSel = checkSelect($('#bornDate select:eq(0)')),
      bornMonSel = checkSelect($('#bornDate select:eq(1)')),
      bornDateSel = checkSelect($('#bornDate select:eq(2)'));
  var bornProvSel = checkSelect($('#province10')),
      bornCitySel = checkSelect($('#city10')),
      bornDistSel = checkSelect($('#district10'));
  var nationIpt = checkInput($('#nation')),
      mobiPhIpt = checkInput($('#mobilePh'));
  if( bornYearSel && bornMonSel && bornDateSel && bornProvSel && bornCitySel && bornDistSel && nationIpt && mobiPhIpt ){
      //保存跳转预览页
      $('#basInfoPre').css('display','block');
      $('#basInfoEdi').css('display','none');
  }else{
      //提交
      alert('请将标星信息项填写完整！');
  };
  basInfoSave();
};
// ----基本信息 年月日选择
new YMDselect('stuenrolledYear','stuenrolledMonth','stuenrolledDay');
//----教育经历 年月日选择
new YMDselect('enrollYear','enrollMonth');
new YMDselect('graduYear','graduMonth');
//工作经历年月日选择
new YMDselect('entryYear','entryMonth');
new YMDselect('quitYear','quitMonth');

new YMDselect('entrYear','entrMonth');
new YMDselect('quiYear','quiMonth');
//证书年月日选择
new YMDselect('getCerYear','getCerMonth');
/*<!--行业、职能插件js中要调用的function-->*/
    // 是否在数组内
function in_array(needle, haystack) {
	if(typeof needle == 'string' || typeof needle == 'number') {
		for(var i in haystack) {
			if(haystack[i] == needle) {
				return true;
			}
		}
	}
	return false;
}

