//----------------- 正则匹配查错 ----------------------

    //民族纯汉字输入
    $('#nation').keyup(function () {
            var valid = +/^[\u4e00-\u9fa5]{0,}$/.test(this.value);
            this.style.border = ['1px solid red', ''][valid];
            this.nextSibling.nextSibling.innerHTML = ['输入格式有误！', ''][valid];
            // var v=$('#nation').val()=='';
            // if(v || !valid ){
            //     $('#basSaveBtn').attr('disabled', true)
            // }
            // else{
            //     $('#basSaveBtn').attr('disabled', false)
            // }
            return valid;
        });
    //手机号验证
    $('#mobilePh').keyup(function () {
            var valid = +/^1[3578]\d{9}$/.test(this.value); //false
            this.style.border = ['1px solid red', ''][valid];
            this.nextSibling.nextSibling.innerHTML = ['输入格式有误！', ''][valid];
            // var v = $('#mobilePh').val() == '';
            // if(v || !valid ){
            //     $('#basSaveBtn').attr('disabled', true)
            // }else{
            //     $('#basSaveBtn').attr('disabled', false)
            // };
            return valid;
        });
    //证件号
    $('#idNum').keyup(function () {
            var valid;
            var idType = $('#idType').val();
            if (idType == '二代身份证') {
                // 15位: ^[1-9]\\d{7}((0\\d)|(1[0-2]))(([0|1|2]\\d)|3[0-1])\\d{3}$
                // 18位: ^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$
                valid = +/(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$)|(^[1-9]\\d{7}((0\\d)|(1[0-2]))(([0|1|2]\\d)|3[0-1])\\d{3}$)/.test(this.value);
            } else if (idType == '护照') {
                valid = +/^1[45][0-9]{7}|G[0-9]{8}|E[0-9]{8}|P[0-9]{7}|S[0-9]{7,8}|D[0-9]+$/.test(this.value);
                //因私普通护照号码格式有:14/15+7位数, G+8位数(我国新的电子护照是E开头的，后面8位数字)；因公普通的是:P.+7位数；
                //公务的是：S.+7位数 或者 S+8位数, 以D开头的是外交护照.D=diplomatic
            } else if (idType == '香港身份证') {
                valid = +/^((\s?[A-Za-z])|([A-Za-z]{2}))\d{6}(([0−9aA])|([0-9aA]))$/.test(this.value);
                //号码结构：XYabcdef(z)。「X」可能是「空格」或是一个英文字母，「Y」必定是英文字母。「abcdef」代表六位数字，而「z」是作为检码之用，它可能是0, 1, 2, ... , 9, A(代表10)。
            }
            ;
            this.style.border = ['1px solid red', ''][valid];
            this.nextSibling.nextSibling.innerHTML = ['输入格式有误！', ''][valid];
            return valid;
        });
    //更多联系方式
    $('#contaNum').keyup(function () {
        var valid;
        var contacts = $('#moreContacts').val();
        if (contacts == '电子邮箱') {
            valid = +/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+\.){1,63}[a-zA-Z0-9]+$/.test(this.value);
        };
        this.style.border = ['1px solid red', ''][valid];
        this.nextSibling.nextSibling.innerHTML = ['输入格式有误！', ''][valid];
    });
