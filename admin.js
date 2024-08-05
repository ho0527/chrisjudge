docgetid("title").onclick=function(){
    location.reload()
}

docgetid("newquestion").onclick=function(){
    location.href="newquestion.html"
}

docgetid("userlist").onclick=function(){
    location.href="userlist.html"
}

docgetid("score").onclick=function(){
    location.href="adminscore.html"
}

docgetid("log").onclick=function(){
    location.href="log.html"
}

oldajax("GET",AJAXURL+"getquestionlist",null,[
    ["Authorization","Bearer "+weblsget(WEBLSNAME+"token")]
]).onload=function(){
    let data=JSON.parse(this.responseText)
    if(data["success"]){
        row=data["data"]
        for(let i=0;i<row.length;i=i+1){
            let description=row[i][3]
            if(description.length>50){
                description=description.slice(0,50)+"..."
            }
            docgetid("maintable").innerHTML=`
                ${docgetid("maintable").innerHTML}
                <tr>
                    <td class="textleft">${row[i][2]}</td>
                    <td class="textleft">${description}</td>
                    <td>
                        <input type="button" class="button outline questionbutton" data-id="${row[i][0]}" value="查看">
                        <input type="button" class="button error questiondelbutton" data-id="${row[i][0]}" value="刪除">
                    </td>
                </tr>
            `
            docgetall(".questionbutton").forEach(function(event){
                event.onclick=function(){
                    weblsset("chrispluginquestionid",event.dataset.id)
                    location.href="editquestion.html"
                }
            })
            docgetall(".questiondelbutton").forEach(function(event){
                event.onclick=function(){
                    if(confirm("確認是否刪除?")){
                        oldajax("DELETE",AJAXURL+"delquestion/"+event.dataset.id,null,[
                            ["Authorization","Bearer "+weblsget(WEBLSNAME+"token")]
                        ]).onload=function(){
                            let data=JSON.parse(this.responseText)
                            if(data["success"]){
                                alert("刪除成功")
                                location.reload()
                            }else{
                                alert(data["data"])
                            }
                        }
                    }
                }
            })
        }
        console.log(data["data"])
    }else{
        alert(data["data"])
    }
}

onclick("#clearall",function(element,event){
    if(confirm("確認是否清除所有資料?(此動作將不可撤銷)")){
        ajax("POST",AJAXURL+"refdb",function(event,data){
            if(data["success"]){
                alert("清除成功")
                weblsset(WEBLSNAME+"token",null)
                href("index.html")
            }else{
                alert(data["data"])
            }
        },null,[
            ["Authorization","Bearer "+weblsget(WEBLSNAME+"token")]
        ])
    }
})

startmacossection()