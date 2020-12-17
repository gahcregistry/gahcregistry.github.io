var xhrsb = new XMLHttpRequest()
xhrsb.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        // Typical action to be performed when the document is ready:
        document.getElementById("sessionbar").innerHTML = xhrsb.responseText;
        if (localStorage.getItem("usernamecache")) {
            //document.getElementById("reg").style.display = "none";
            document.getElementById("login").style.display = "none";
            document.getElementById("logout").style.display = "inline-block";
            document.getElementById("status").innerHTML = `Logged in as <b>${getCookie("usernamecache")}</b>`;
        }
    }
};
xhrsb.open("GET", "sessionbar.html")
xhrsb.send()
function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) c_end = document.cookie.length;
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;SameSite=None;Secure";
}
var isregxhr = new XMLHttpRequest()
isregxhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        if (isregxhr.responseText == "true") {
            document.getElementById("reg").style.display = "none";
            document.getElementById("unreg").style.display = "inline-block";
        }
    }
};
isregxhr.open("GET", apiorigin+"/api/gahcregistry/v1/auth/isregistered")
isregxhr.setRequestHeader("Authorization", getCookie("token"))
isregxhr.send()
function getHref(s, pagearray, index) {
    var result = location.origin;
    for(var i = 0; i<index+1; i++) {
        result+=pagearray[index]
    }
    return result
}
var pagination = document.createElement("ul")
pagination.setAttribute("class", "breadcrumb")
var pagelist = [{"name": "Home", "href": "/"}]
var index = 0
var pagearray = window.location.href.split('#')[0].split("/").splice(3)
pagearray.forEach(s => {
    var section = {
        "name": s,
        "href": getHref(s, pagearray, index)
    }
    pagelist.push(section)
    index++
})
pagelist.forEach(pl => {
    var e = document.createElement("li")
    var a = document.createElement("a")
    a.href = pl.href
    a.innerHTML = pl.name
    e.appendChild(a)
    pagination.appendChild(e)
})
document.body.appendChild(pagination)