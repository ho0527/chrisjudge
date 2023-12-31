let questioncount=0

if(!isset(weblsget("chrispluginquestionid"))){
    location.href="index.html"
}

docgetid("title").onclick=function(){
    location.href="user.html"
}

docgetid("profile").onclick=function(){
    location.href="userprofile.html"
}

docgetid("score").onclick=function(){
    location.href="score.html"
}

oldajax("GET","/backend/chrisjudge/getquestion/"+weblsget("chrispluginquestionid"),null,[
    ["Authorization","Bearer "+weblsget("chrisjudgetoken")]
]).onload=function(){
    let data=JSON.parse(this.responseText)
    if(data["success"]){
        let input
        let output
        docgetid("questiontitle").value=data["data"][2]
        docgetid("description").innerHTML=data["data"][3]
        docgetid("maxruntime").value=data["data"][7]
        input=data["data"][5].split("|&|")
        output=data["data"][6].split("|&|")
        for(let i=0;i<Math.min(2,input.length);i=i+1){
            let tr=doccreate("tr")
            tr.id="q"+(questioncount+1)
            tr.innerHTML=`
                <td class="questiontableno">${questioncount+1}.</td>
                <td class=""><textarea class="textarea usertextarea questioninoutputtextarea questioninputtext" disabled>${input[i]}</textarea></td>
                <td class=""><textarea class="textarea usertextarea questioninoutputtextarea questionoutputtext" disabled>${output[i]}</textarea></td>
            `

            docappendchild("inoutputtable",tr)

            questioncount=questioncount+1
        }
    }else{
        alert(data["data"])
    }
}

docgetid("cancel").onclick=function(){
    location.href="user.html"
}

docgetid("uploadfile").onclick=function(){
    docgetid("file").click()
}

docgetid("file").onchange=function(){
    oldajax("POST","/backend/chrisjudge/newresponse/"+weblsget("chrispluginquestionid"),formdata([
        ["file",this.files[0]]
    ]),[
        ["Authorization","Bearer "+weblsget("chrisjudgetoken")]
    ]).onload=function(){
        let data=JSON.parse(this.responseText)
        if(data["success"]){
            alert("結果: "+data["data"])
            location.reload()
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

startmacossection()