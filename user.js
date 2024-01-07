let questionid

function main(){
    ajax("GET","/backend/chrisjudge/getresponse",function(event){
        let responsedata=JSON.parse(event.responseText)
        if(responsedata["success"]){
            let responserow=responsedata["data"]
            let responselist=[]
            for(let i=0;i<responserow.length;i=i+1){
                responselist[parseInt(responserow[i][2])]=responserow[i]
            }
            oldajax("GET","/backend/chrisjudge/getquestionlist",null,[
                ["Authorization","Bearer "+weblsget("chrisjudgetoken")]
            ]).onload=function(){
                let questiondata=JSON.parse(this.responseText)
                if(questiondata["success"]){
                    let row=questiondata["data"]

                    docgetid("maintable").innerHTML=`
                        <tr>
                            <td class="td admintableno">no.</td>
                            <td class="td usertableresult">結果</td>
                            <td class="td">題目</td>
                            <td class="td">敘述</td>
                            <td class="td">function</td>
                        </tr>
                    ` // 表格初始化

                    for(let i=0;i<row.length;i=i+1){
                        let description=row[i][3]
                        let result=responselist[row[i][0]]
                        let resultcolor=""

                        if(description.length>50){
                            description=description.slice(0,50)+"..."
                        }

                        if(isset(result)){
                            result=responselist[row[i][0]][6]
                        }else{
                            result=""
                        }

                        if(result=="SU"){
                            resultcolor="green"
                        }else if(result=="MF"){
                            resultcolor="red"
                        }else if(result=="RF"){
                            resultcolor="red"
                        }else if(result=="OT"){
                            resultcolor="red"
                        }

                        docgetid("maintable").innerHTML=`
                            ${docgetid("maintable").innerHTML}
                            <tr>
                                <td class="td admintableno">${row[i][0]}</td>
                                <td class="td" usertableresult style="color: ${resultcolor}">${result}</td>
                                <td class="td">${row[i][2]}</td>
                                <td class="td admindescription">${description}</td>
                                <td class="td">
                                    <input type="button" class="stbutton outline questionbutton" data-id="${row[i][0]}" value="查看">
                                    <input type="button" class="stbutton outline ansbutton" data-id="${row[i][0]}" value="上傳檔案">
                                </td>
                            </tr>
                        `
                        docgetall(".questionbutton").forEach(function(event){
                            event.onclick=function(){
                                weblsset("chrispluginquestionid",event.dataset.id)
                                location.href="question.html"
                            }
                        })
                        docgetall(".ansbutton").forEach(function(event){
                            event.onclick=function(){
                                questionid=event.dataset.id
                                docgetid("file").click()
                            }
                        })
                        docgetid("file").onchange=function(){
                            oldajax("POST","/backend/chrisjudge/newresponse/"+questionid,formdata([
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
                    }
                }else{
                    alert(data["data"])
                }
            }
        }else{
            alert(responsedata["data"])
        }
    },null,[
        ["Authorization","Bearer "+weblsget("chrisjudgetoken")]
    ])
}

docgetid("user").onclick=function(){
    location.reload()
}

docgetid("profile").onclick=function(){
    location.href="userprofile.html"
}

docgetid("score").onclick=function(){
    location.href="score.html"
}

main()

startmacossection()