// 如果用户未登录，则跳转到登录页面
if (!document.cookie.includes('userData')) {
    window.location.href = '/login';
}

function clearCookies() {
    // 获取所有的cookie并拆分成数组
    var cookies = document.cookie.split(";");

    // 遍历所有cookie并将其过期时间设置为过去
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
    window.location.reload();
}

// 从Cookie中读取JSON数据
function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}