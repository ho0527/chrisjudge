let questioncount=1

docgetid("title").onclick=function(){
    location.href="admin.html"
}

docgetid("newquestion").onclick=function(){
    location.reload()
}

docgetid("userlist").onclick=function(){
    location.href="userlist.html"
}

docgetid("log").onclick=function(){
    location.href="log.html"
}

docgetid("score").onclick=function(){
    location.href="adminscore.html"
}

docgetid("newinoutput").onclick=function(){
    let tr=doccreate("tr")

    tr.classList.add("tr")
    tr.id="q"+(questioncount+1)
    tr.innerHTML=`
        <td class="td">${questioncount+1}.<input type="button" class="questioninputoutdel" data-id="${questioncount+1}" value="X"></td>
        <td class="td"><textarea class="textarea questioninoutputtextarea questioninputtext" placeholder="輸入(禁止輸入'|&|'不會報錯!自己注意)"></textarea></td>
        <td class="td"><textarea class="textarea questioninoutputtextarea questionoutputtext" placeholder="輸出(禁止輸入'|&|'不會報錯!自己注意)"></textarea></td>
    `

    docappendchild("inoutputtable",tr)

    docgetall(".questioninputoutdel").forEach(function(event){
        event.onclick=function(){
            docgetid("q"+event.dataset.id).remove()
        }
    })

    questioncount=questioncount+1
}

docgetid("cancel").onclick=function(){
    location.href="admin.html"
}

docgetid("submit").onclick=function(){
    let input=[]
    let output=[]
    docgetall(".questioninputtext").forEach(function(event){
        input.push(event.value)
    })
    docgetall(".questionoutputtext").forEach(function(event){
        output.push(event.value)
    })
    oldajax("POST",AJAXURL+"newquestion",JSON.stringify({
        "title": docgetid("questiontitle").value,
        "description": docgetid("description").value,
        "tag": "技能競賽",
        "input": input.join("|&|"),
        "output": output.join("|&|"),
        "maxruntime": docgetid("maxruntime").value
    }),[
        ["Content-Type","application/json"],
        ["Authorization","Bearer "+weblsget(WEBLSNAME+"token")]
    ]).onload=function(){
        let data=JSON.parse(this.responseText)
        if(data["success"]){
            alert("新增成功")
            location.href="admin.html"
        }else{
            alert(data["data"])
        }
    }
}

document.onkeydown=function(event){
    if(event.key=="Enter"&&!event.shiftKey){
        docgetid("submit").click()
    }
}