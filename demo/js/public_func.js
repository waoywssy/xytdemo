/**
 * Created by Administrator on 2017/6/17 0017.
 */
/**
 * 当列表中的内容长度超出li的宽度时，使用此方法让内容滚动显示，注意li内要使用p，且p的display为inline-block
 * @param p 包裹文字内容的标签，是一个$对象
 * @param wapper_li 包裹p的li，也是一个$对象。
 */
function scroll_p (p,wapper_li) {
    var a = 0;
    var b;
    if(p[0].offsetWidth > wapper_li[0].offsetWidth){
        setTimeout(f,1000);
    }
    function f() {
        a--;
        b = a+"px";
        p.css("left", b);
        setTimeout(f, 60);
        if (p.css("right") == p.width() + "px") {
            a = 0;
        }
    }
}
/**
 * 将取到的日期转换成 00-00-00样式的字符串;将取到的日期转换成[]形式的数组；
 * @param t
 */
function changeData(t) {
    var a = t.split(",")[0];
    var a_1 = a.split(" ")[0].trim();
    var _a_1 = a_1;
    var a_2 = a.split(" ")[1].trim();
    var _a_2 = a_2;
    var b = t.split(",")[1].trim();
    switch (a_1){
        case "一月":a_1="1";_a_1="01";break;
        case "二月":a_1="2";_a_1="02";break;
        case "三月":a_1="3";_a_1="03";break;
        case "四月":a_1="4";_a_1="04";break;
        case "五月":a_1="5";_a_1="05";break;
        case "六月":a_1="6";_a_1="06";break;
        case "七月":a_1="7";_a_1="07";break;
        case "八月":a_1="8";_a_1="08";break;
        case "九月":a_1="9";_a_1="09";break;
        case "十月":a_1="10";_a_1="10";break;
        case "十一月":a_1="11";_a_1="11";break;
        case "十二月":a_1="12";_a_1="12";break;
		case "Jan":a_1="1";_a_1="01";break;
        case "Feb":a_1="2";_a_1="02";break;
        case "Mar":a_1="3";_a_1="03";break;
        case "Apr":a_1="4";_a_1="04";break;
        case "May":a_1="5";_a_1="05";break;
        case "Jun":a_1="6";_a_1="06";break;
        case "Jul":a_1="7";_a_1="07";break;
        case "Aug":a_1="8";_a_1="08";break;
        case "Sep":a_1="9";_a_1="09";break;
        case "Oct":a_1="10";_a_1="10";break;
        case "Nov":a_1="11";_a_1="11";break;
        case "Dec":a_1="12";_a_1="12";break;
    }
    _a_2 = a_2>10?a_2:"0"+a_2;
    var _t = [];
    var _s = b+"-"+_a_1+"-"+_a_2;
    b = parseInt(b);
    a_1 = parseInt(a_1);
    a_2 = parseInt(a_2);
    _t.push(b,a_1,a_2);
    return {"1":_t,"2":_s};
}
/**
 * 将“四月”改成“4”
 * @param month
 * @returns {*}
 */
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
/**
 * 返回月份（谢银萍的那份）
 * @param month
 * @returns {*}
 */
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
/**
 * 日期转换（自强写的那份）
 * @param strTimestamp
 * @returns {string}
 */
function toShowDateTime(strTimestamp){
    var strTimestamps1 = strTimestamp.split(",");
    var month=trueMonth(strTimestamps1[0].split(" ")[0]);
    var day=strTimestamps1[0].split(" ")[1];
    var strTimestamps2 = strTimestamps1[1].split(" ");
    var year=strTimestamps2[1];
    var hourminute=strTimestamps2[2];
    var amPm=strTimestamps2[3];
    var str=year+"/"+month+"/"+day+" "+hourminute+"|"+amPm;
    return str;
}