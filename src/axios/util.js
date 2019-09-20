import {codeTab} from "@/crypto/crypto"
//获取cookie、
export function getCookie(name, strict=false) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)){
        if(strict){
            return codeTab.jiemi(arr[2]);
        }
        return (arr[2]);
    }else{
        return null;
    }
        
}

//设置cookie,增加到vue实例方便全局调用
export function setCookie (c_name, value, date , strict=false) {
    var exdate = new Date(date);
    exdate.setDate(exdate.getDate());
    if(strict){
        let jimivalue = codeTab.jiami(value);
        document.cookie = c_name + "=" + escape(jimivalue) + ((date == null) ? "" : ";expires=" + exdate.toGMTString());
        return true;
    }
    document.cookie = c_name + "=" + escape(value) + ((date == null) ? "" : ";expires=" + exdate.toGMTString());
};

//删除cookie
export function delCookie (name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
};