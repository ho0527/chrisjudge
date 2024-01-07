let questionid

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

docgetid("score").onclick=function(){
    location.reload()
}

docgetid("log").onclick=function(){
    location.href="log.html"
}

ajax("GET","/backend/chrisjudge/getscorelist",function(event){
    let data=JSON.parse(event.responseText)
    if(data["success"]){
        let scorelist=data["data"]
        let questionidlist=data["questionidlist"]
        let maintableheadinnerhtml=`
            <tr>
                <td class="td">題目 userid</td>
        `

        for(let i=0;i<questionidlist.length;i=i+1){
            maintableheadinnerhtml=`
                ${maintableheadinnerhtml}
                <td class="td">${questionidlist[i]}</td>
            `
        }

        docgetid("maintable").innerHTML=`
                ${maintableheadinnerhtml}
            </tr>
        `

        for(let i=0;i<scorelist.length;i=i+1){
            if(scorelist[i]["responselist"]){
                let maintableuserscoreinnerhtml=`
                    <tr>
                        <td class="td">${scorelist[i]["userid"]}</td>
                `

                for(let j=0;j<scorelist[i]["responselist"].length;j=j+1){
                    let result=scorelist[i]["responselist"][j]["result"]
                    let resultcolor=""

                    if(result=="SU"){
                        resultcolor="green"
                    }else if(result=="MF"){
                        resultcolor="red"
                    }else if(result=="RF"){
                        resultcolor="red"
                    }else if(result=="OT"){
                        resultcolor="red"
                    }

                    maintableuserscoreinnerhtml=`
                        ${maintableuserscoreinnerhtml}
                        <td class="td" style="background: ${resultcolor}">${result}</td>
                    `
                }

                docgetid("maintable").innerHTML=`
                        ${docgetid("maintable").innerHTML}
                        ${maintableuserscoreinnerhtml}
                    </tr>
                `
            }
        }
    }else{
        alert(userdata["data"])
    }
},null,[
    ["Authorization","Bearer "+weblsget("chrisjudgetoken")]
])

startmacossection()