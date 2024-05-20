docgetid("title").onclick=function(){
    location.href="admin.html"
}

docgetid("newquestion").onclick=function(){
    location.href="newquestion.html"
}

docgetid("userlist").onclick=function(){
    location.reload()
}

docgetid("score").onclick=function(){
    location.href="adminscore.html"
}

docgetid("log").onclick=function(){
    location.href="log.html"
}

oldajax("GET",AJAXURL+"getuserlist",null,[
    ["Authorization","Bearer "+weblsget("chrisjudgetoken")]
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
                    <td class="td smalltd">${row[i][0]}</td>
                    <td class="td">${row[i][1]}</td>
                    <td class="td">${row[i][3]}</td>
                    <td class="td">
                        <input type="button" class="button warn userkickbutton" data-id="${row[i][0]}" value="剔除使用者"><br>
                        <input type="button" class="button warn userbanbutton" data-id="${row[i][0]}" value="封禁使用者"><br>
                        <input type="button" class="button warn userdelbutton" data-id="${row[i][0]}" value="刪除使用者"><br>
                    </td>
                </tr>
            `
            docgetall(".userkickbutton").forEach(function(event){
                event.onclick=function(){
                    if(confirm("確認是否刪除?")){
                        // oldajax("DELETE",AJAXURL+"delquestion/"+event.dataset.id,null,[
                        //     ["Authorization","Bearer "+weblsget("chrisjudgetoken")]
                        // ]).onload=function(){
                        //     let data=JSON.parse(this.responseText)
                        //     if(data["success"]){
                        //         alert("刪除成功")
                        //         location.reload()
                        //     }else{
                        //         alert(data["data"])
                        //     }
                        // }
                    }
                }
            })
            docgetall(".userbanbutton").forEach(function(event){
                event.onclick=function(){
                    if(confirm("確認是否刪除?")){
                        // oldajax("DELETE",AJAXURL+"delquestion/"+event.dataset.id,null,[
                        //     ["Authorization","Bearer "+weblsget("chrisjudgetoken")]
                        // ]).onload=function(){
                        //     let data=JSON.parse(this.responseText)
                        //     if(data["success"]){
                        //         alert("刪除成功")
                        //         location.reload()
                        //     }else{
                        //         alert(data["data"])
                        //     }
                        // }
                    }
                }
            })
            docgetall(".userdelbutton").forEach(function(event){
                event.onclick=function(){
                    if(confirm("確認是否刪除?")){
                        // oldajax("DELETE",AJAXURL+"delquestion/"+event.dataset.id,null,[
                        //     ["Authorization","Bearer "+weblsget("chrisjudgetoken")]
                        // ]).onload=function(){
                        //     let data=JSON.parse(this.responseText)
                        //     if(data["success"]){
                        //         alert("刪除成功")
                        //         location.reload()
                        //     }else{
                        //         alert(data["data"])
                        //     }
                        // }
                    }
                }
            })
        }
    }else{
        alert(data["data"])
    }
}

startmacossection()