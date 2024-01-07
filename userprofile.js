docgetid("title").onclick=function(){
    location.href="user.html"
}

docgetid("user").onclick=function(){
    location.href="user.html"
}

docgetid("profile").onclick=function(){
    location.reload()
}

docgetid("score").onclick=function(){
    location.href="score.html"
}

oldajax("GET","/backend/chrisjudge/getuser/"+weblsget("chrisjudgetoken")).onload=function(){
    let data=JSON.parse(this.responseText)
    if(data["success"]){
        docgetid("username").value=data["data"][1]
        docgetid("nickname").value=data["data"][3]
    }else{
        alert(data["data"])
    }
}

docgetid("goback").onclick=function(){
    location.href="index.html"
}

docgetid("editpassword").onclick=function(){
    location.href="editpassword.html"
}

docgetid("submit").onclick=function(){
    oldajax("PUT","/backend/chrisjudge/edituser",JSON.stringify({
        "username": docgetid("username").value,
        "nickname": docgetid("nickname").value
    }),[
        ["Content-Type","application/json"],
        ["Authorization","Bearer "+weblsget("chrisjudgetoken")]
    ]).onload=function(){
        let data=JSON.parse(this.responseText)
        if(data["success"]){
            alert("修改成功")
            location.href="index.html"
        }else{
            alert(data["data"])
        }
    }
}

document.onkeydown=function(event){
    if(event.key=="Enter"){
        docgetid("submit").click()
    }
}