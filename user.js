let questionid

function main(){
	ajax("GET",AJAXURL+"getresponse",function(event,data){
		if(data["success"]){
			let responserow=data["data"]
			let responselist=[]
			for(let i=0;i<responserow.length;i=i+1){
				responselist[parseInt(responserow[i][2])]=responserow[i]
			}
			ajax("GET",AJAXURL+"getquestionlist",function(event,questiondata){
				if(questiondata["success"]){
					let row=questiondata["data"]

					domgetid("maintable").innerHTML=`
						<tr>
							<th>no.</th>
							<th>結果</th>
							<th>題目</th>
							<th>敘述</th>
							<th>function</th>
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

						domgetid("maintable").innerHTML=`
							${domgetid("maintable").innerHTML}
							<tr>
								<td>${row[i][0]}</td>
								<td class="usertableresult" style="color: ${resultcolor}">${result}</td>
								<td class="textleft">${row[i][2]}</td>
								<td class="textleft">${description}</td>
								<td>
									<input type="button" class="button outline questionbutton" data-id="${row[i][0]}" value="查看">
									<input type="button" class="button light ansbutton" data-id="${row[i][0]}" value="上傳檔案">
								</td>
							</tr>
						`
						domgetall(".questionbutton").forEach(function(event){
							event.onclick=function(){
								weblsset("chrispluginquestionid",event.dataset.id)
								href("question.html")
							}
						})
						domgetall(".ansbutton").forEach(function(event){
							event.onclick=function(){
								questionid=event.dataset.id
								domgetid("file").click()
							}
						})

						onchange("#file",function(elemnet,event){
							removeclass("#process",["display-none"])

							ajax("POST",AJAXURL+"newresponse/"+questionid,function(event,data){
								if(data["success"]){
									alert("結果: "+data["data"])
									href("")
								}else{
									alert(data["data"])
								}
							},formdata([
								["file",event.target.files[0]]
							]),[
								["Authorization","Bearer "+weblsget("chrisjudgetoken")]
							])
						})
					}
				}else{
					alert(data["data"])
				}
			},null,[
				["Authorization","Bearer "+weblsget("chrisjudgetoken")]
			])
		}else{
			alert(data["data"])
		}
	},null,[
		["Authorization","Bearer "+weblsget("chrisjudgetoken")]
	])
}

domgetid("user").onclick=function(){
	href("")
}

domgetid("profile").onclick=function(){
	href("userprofile.html")
}

domgetid("score").onclick=function(){
	href("score.html")
}

main()

startmacossection()