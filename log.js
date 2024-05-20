if(!isset(weblsget("chrisjudgetoken"))){
    location.href="/chrisjudge/"
}

docgetid("title").onclick=function(){
    location.href="admin.html"
}

docgetid("newquestion").onclick=function(){
    location.href="newquestion.html"
}

docgetid("userlist").onclick=function(){
    location.href="userlist.html"
}

docgetid("log").onclick=function(){
    location.reload()
}

docgetid("score").onclick=function(){
    location.href="adminscore.html"
}

oldajax("GET",AJAXURL+"getlog",null,[
    ["Authorization","Bearer "+weblsget("chrisjudgetoken")]
]).onload=function(){
    let data=JSON.parse(this.responseText)
    if(data["success"]){
        row=data["data"].reverse()
        for(let i=0;i<Math.min(300,row.length);i=i+1){
            let description=row[i][3]
            if(description.length>50){
                description=description.slice(0,50)+"..."
            }
            docgetid("maintable").innerHTML=`
                ${docgetid("maintable").innerHTML}
                <tr class="tr">
                    <td class="td smalltd">${row[i][0]}</td>
                    <td class="td smalltd">${row[i][1]}</td>
                    <td class="td">${row[i][2]}</td>
                    <td class="td">${row[i][3]}</td>
                </tr>
            `
        }
    }else{
        alert(data["data"])
    }
}

startmacossection()