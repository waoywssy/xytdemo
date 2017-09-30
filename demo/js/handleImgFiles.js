//蒙版层显示
function shadedLayerIn(){
    var sl = document.createElement('div');//弹窗蒙版-半透明遮盖层
    sl.className = 'shadedLayer';
    document.body.getElementsByClassName('profile_pic_settings')[0].appendChild(sl);
};
//蒙版层消失
function shadedLayerRemove(){
    $('.shadedLayer').css('display','none');//蒙版移除
    $('#basInfoEdi .picUpload').css('display','none');//弹窗移除
};
$('#basInfoEdi .profile_pic_change').click(function(){
    $('#basInfoEdi .picUpload').css('display','block');
    shadedLayerIn();
});
$('#basInfoEdi .th a').click(function(){
    shadedLayerRemove();
});
$('#basInfoEdi .submitBox input:eq(1)').click(function(){
    shadedLayerRemove();
});
$('#basInfoEdi .submitBox input:eq(0)').click(function(){
    shadedLayerRemove();
});

//图片上传预览  IE是用了滤镜。
function previewImage(file)
{
    var MAXWIDTH  = 190;
    var MAXHEIGHT = 228;
    var div = document.getElementById('filePic');
    if (file.files && file.files[0])
    {
        div.innerHTML ='<img id=imghead>';
        var img = document.getElementById('imghead');
        img.onload = function(){
            var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
            img.width  =  rect.width;
            img.height =  rect.height;
//                 img.style.marginLeft = rect.left+'px';
            img.style.marginTop = rect.top+'px';
        }
        var reader = new FileReader();
        reader.onload = function(evt){img.src = evt.target.result;}
        reader.readAsDataURL(file.files[0]);
    }
    else //兼容IE
    {
        var sFilter='filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src="';
        file.select();
        var src = document.selection.createRange().text;
        div.innerHTML = '<img id=imghead>';
        var img = document.getElementById('imghead');
        img.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = src;
        var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
        status =('rect:'+rect.top+','+rect.left+','+rect.width+','+rect.height);
        div.innerHTML = "<div id=divhead style='width:"+rect.width+"px;height:"+rect.height+"px;margin-top:"+rect.top+"px;"+sFilter+src+"\"'></div>";
    }
};
function clacImgZoomParam( maxWidth, maxHeight, width, height ){
    var param = {top:0, left:0, width:width, height:height};
    if( width>maxWidth || height>maxHeight )
    {
        rateWidth = width / maxWidth;
        rateHeight = height / maxHeight;

        if( rateWidth > rateHeight )
        {
            param.width =  maxWidth;
            param.height = Math.round(height / rateWidth);
        }else
        {
            param.width = Math.round(width / rateHeight);
            param.height = maxHeight;
        }
    }

    param.left = Math.round((maxWidth - param.width) / 2);
    param.top = Math.round((maxHeight - param.height) / 2);
    return param;
};
$(".submitBox:eq(0) input:eq(0)").click(function(){
    var setImg = document.getElementById("basInfoEdi").getElementsByTagName("img")[0];
    var uploadImg = document.getElementById("imghead");
    var preImg = document.getElementById("basInfoPre").getElementsByClassName("profile_pic_settings")[0].getElementsByTagName("img")[0];
    setImg.src = uploadImg.src;
    preImg.src = setImg.src;
    setImg.style.width = "91px";
    setImg.style.height = "114px";
    preImg.style.width = "91px";
    preImg.style.height = "114px";
});

$("#onsubmitPhoto").click(function(){
	  var strFilters=[".jpeg",".jpg",".png",".bmp",".pic"];
	  var suffixName=$("#stufileElem").val();
	  var flag=false;
	  for(var str in strFilters){
		  if(suffixName.indexOf(str)>-1){
			  flag=true;
			  break;
		  }
	  }
	  var stuId = personalBaseInfo.stuId;
	  var urlHref = window.location.href;
	  var guid = urlHref.split("#")[1];
	  var stuPhoneName =personalBaseInfo.stuPhoneName;
	  if(flag){
		    var formData = new FormData($("#stuformforUpload")[0]);  
	        //还可以手动添加自定义字段，如下：  
	        formData.append("stuId", stuId);
	        formData.append("guid", guid);
	        formData.append("stuPhoneName", stuPhoneName);
	        $.ajax({  
	        	url : homeUrl + 'image/doUpload', 
	            type : 'POST',  
	            data : formData,  
	            async : false,  
	            cache : false,  
	            contentType : false,// 告诉jQuery不要去设置Content-Type请求头  
	            processData : false,// 告诉jQuery不要去处理发送的数据  
	            success : function(data) {  
	            	var jsonMap = JSON.parse(data);
	    			if (jsonMap.code == 301) {
	    				alert("您为非法用户");
	    				window.location.href = homeUrl + 'stu/safe';
	    			} else if (jsonMap.code == 302) {
	    				alert("您停留时间过长");
	    				window.location.href = homeUrl + 'stu/safe';
	    			} else if (jsonMap.code == 200) {
	    				alert("上传成功");
	    				getBasicInfo();
	    				$('#basInfoPre').css('display', 'block');
	    			    $('#basInfoEdi').css('display', 'none');
	    			}
	            },  
	            error : function(data) {  
	                alert(data);  
	                //...  
	            }  
	        });  
	  }else{
		  alert("请选择一寸照片");
	  }
});