let questioncount=0

if(!isset(weblsget(WEBLSNAME+"questionid"))){
    location.href="index.html"
}

docgetid("newquestion").onclick=function(){
    location.href="newquestion.html"
}

oldajax("GET",AJAXURL+"getquestion/"+weblsget(WEBLSNAME+"questionid"),null,[
    ["Authorization","Bearer "+weblsget(WEBLSNAME+"token")]
]).onload=function(){
    let data=JSON.parse(this.responseText)
    if(data["success"]){
        let input
        let output
        docgetid("questiontitle").value=data["data"][2]
        docgetid("description").value=data["data"][3]
        docgetid("maxruntime").value=data["data"][7]
        input=data["data"][5].split("|&|")
        output=data["data"][6].split("|&|")
        for(let i=0;i<input.length;i=i+1){
            let tr=doccreate("tr")

            tr.classList.add("tr")
            tr.id="q"+(questioncount+1)
            tr.innerHTML=`
                <td class="td">${questioncount+1}.<input type="button" class="questioninputoutdel" data-id="${questioncount+1}" value="X"></td>
                <td class="td"><textarea class="textarea questioninoutputtextarea questioninputtext" placeholder="輸入(禁止輸入'|&|'不會報錯!自己注意)">${input[i]}</textarea></td>
                <td class="td"><textarea class="textarea questioninoutputtextarea questionoutputtext" placeholder="輸出(禁止輸入'|&|'不會報錯!自己注意)">${output[i]}</textarea></td>
            `

            docappendchild("inoutputtable",tr)

            questioncount=questioncount+1
        }
        docgetall(".questioninputoutdel").forEach(function(event){
            event.onclick=function(){
                docgetid("q"+event.dataset.id).remove()
            }
        })
    }else{
        alert(data["data"])
    }
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
    oldajax("PUT",AJAXURL+"editquestion/"+weblsget(WEBLSNAME+"questionid"),JSON.stringify({
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
            alert("修改成功")
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