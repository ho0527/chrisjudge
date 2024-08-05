docgetid("logout").onclick=function(){
    oldajax("POST",AJAXURL+"logout/"+weblsget(WEBLSNAME+"token")).onload=function(){
        let data=JSON.parse(this.responseText)
        if(data["success"]){
            alert("登出成功")
            weblsset(WEBLSNAME+"token",null)
            location.href="index.html"
        }else{
            alert(data["data"])
        }
    }
}