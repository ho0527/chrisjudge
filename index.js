docgetid("submit").onclick=function(){
    ajax("POST","/backend/chrisjudge/login",function(event,data){
        if(data["success"]){
            alert("登入成功")
            localStorage.setItem("chrisjudgetoken",data["data"]["token"])
            location.href="user.html"
        }else{
            alert(data["data"])
        }
    },JSON.stringify({
        "username": docgetid("username").value,
        "password": docgetid("password").value
    }),[
        ["Content-Type","application/json"]
    ])
}

docgetid("signup").onclick=function(){
    location.href="signup.html"
}

document.onkeydown=function(event){
    if(event.key=="Enter"){
        docgetid("submit").click()
    }
}

passwordshowhide()

startmacossection()