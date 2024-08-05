docgetid("submit").onclick=function(){
    oldajax("POST",AJAXURL+"signup",JSON.stringify({
        "username": docgetid("username").value,
        "password": docgetid("password").value,
        "nickname": docgetid("nickname").value
    }),[
        ["Content-Type","application/json"]
    ]).onload=function(){
        let data=JSON.parse(this.responseText)
        if(data["success"]){
            alert("新增成功")
            weblsset(WEBLSNAME+"token",data["data"]["token"])
            location.href="user.html"
        }else{
            alert(data["data"])
        }
    }
}

docgetid("login").onclick=function(){
    location.href="index.html"
}

document.onkeydown=function(event){
    if(event.key=="Enter"){
        docgetid("submit").click()
    }
}

passwordshowhide()

startmacossection()