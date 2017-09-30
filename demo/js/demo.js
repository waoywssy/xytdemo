//demo code for radial progress
$(function () {

    //radial progress 4
    var radialObj4 = $('#indicatorContainer4').radialIndicator({
        barColor: {
            0: '#FF0000',
            33: '#efe108',
            66: '#00a8ff',
            100: '#33CC33'
        },
        percentage: true
    }).data('radialIndicator');

    //Using Instance 环形进度条的完整度数字显示
    radialObj4.animate(25); //


    //add textbox and buttons for all radial button
    $('.prg-cont').each(function () {
        var elm = $.single(this),
            wrap = elm.wrap('<div class="prg-cont-wrap"></div>').closest('.prg-cont-wrap'),
            radObj = wrap.find('.rad-prg').data('radialIndicator');

        wrap.append('<div class="prg-input-wrap"><input type="text" class="prg-input" value="' + radObj.value() + '"/><button class="prg-change">Change</button></div>');

        wrap.find('.prg-change').on('click', function (e) {
            var val = wrap.find('.prg-input').val();

            radObj.animate(val);
        });
    });

    function handleFileUpload(files) {
        msgHolder.hide();
        container6Prog.option('displayNumber', true);
        var file = files[0],
            fd = new FormData();

        fd.append('file', file);

        $.ajax({
            url: 'service/upload.php',
            type: 'POST',
            data: fd,
            processData: false,
            contentType: false,
            success: function () {
                container6Prog.option('displayNumber', false);
                msgHolder.show().html('File upload done.');
            },
            xhr: function () {
                var xhr = new window.XMLHttpRequest();
                //Upload progress
                xhr.upload.addEventListener("progress", function (e) {
                    if (e.lengthComputable) {
                        var percentComplete = (e.loaded || e.position) * 100 / e.total;
                        //Do something with upload progress
                        console.log(percentComplete);
                        container6Prog.animate(percentComplete);
                    }
                }, false);
                return xhr;
            }
        });
    }
});;