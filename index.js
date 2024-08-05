// function googlecallback(event){
//     let tokensplit=event.credential.split(".")
//     let tokenbase64=regexpreplace(regexpreplace(tokensplit[1],/-/g,"+"),/_/g,"/")
//     let token=JSON.parse(atob(tokenbase64))
//     oldajax("POST",AJAXURL+"login/thirdpartylogin/google",JSON.stringify(token),[
//         ["Content-Type","application/x-www-form-urlencoded"]
//     ]).onload=function(){
//         let data=JSON.parse(this.responseText)
//         if(data["success"]){
//             alert("登入成功")
//             weblsset(WEBLSNAME+"token",data["data"]["token"])
//             weblsset(WEBLSNAME+"permission",data["data"]["permission"])
//             if(parseInt(weblsget(WEBLSNAME+"permission"))>=4){
//                 location.href="admin.html"
//             }else{
//                 location.href="user.html"
//             }
//         }else{
//             alert(data["data"])
//         }
//     }
// }

docgetid("submit").onclick=function(){
    ajax("POST",AJAXURL+"login",function(event,data){
        if(data["success"]){
            alert("登入成功")
            weblsset(WEBLSNAME+"token",data["data"]["token"])
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