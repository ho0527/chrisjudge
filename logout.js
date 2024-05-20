docgetid("logout").onclick=function(){
    oldajax("POST",AJAXURL+"logout/"+weblsget("chrisjudgetoken")).onload=function(){
        let data=JSON.parse(this.responseText)
        if(data["success"]){
            alert("登出成功")
            weblsset("chrisjudgetoken",null)
            location.href="index.html"
        }else{
            alert(data["data"])
        }
    }
}