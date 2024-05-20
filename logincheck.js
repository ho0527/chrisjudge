oldajax("GET",AJAXURL+"logincheck",null,[
    ["Authorization","Bearer "+weblsget("chrisjudgetoken")]
]).onload=function(){
    let data=JSON.parse(this.responseText)
    if(data["success"]){
        let file=location.href.split("chrisjudge/")[1]
        if(data["data"]==""){
            if(file!="index.html"&&file!="signup.html"){
                location.href="index.html"
            }
        }else{
            if(parseInt(data["data"]["permission"])>=4){
                if(file=="user.html"||file=="userprofile.html"||file=="index.html"||file==""||file=="signup.html"){
                    location.href="admin.html"
                }
            }else{
                if(file!="user.html"&&file!="userprofile.html"&&file!="score.html"&&file!="question.html"){
                    location.href="user.html"
                }
            }
        }
    }else{
        alert(data["data"])
    }
}