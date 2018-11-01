function Position(){
	this.addListener();
	this.loadData();
}
		//模板渲染
	Position.PositionRowTemplate = `
			<tr>
				<td><%= _id %></td>
				<td><img style="width:80px;"src="<%= logo %>" alt=""/></td>
				<td><%= company %></td>
				<td><%= name %></td>
				<td><%= salary %></td>
				<td><a href="#">修改</a> <a href="#">删除</a></td>
			</tr>
			`;
$.extend(Position.prototype,{
	//注册事件监听
	addListener(){
		$(".post-submit").on("click",this.addPosHandler);
		$(".pagination").on("click","a",$.proxy(this.loadDataHandler,this));
	},
	//点击翻页操作(事件函数)
	loadDataHandler(event){
		const page = Number($(event.target).text());
		this.loadData(page);
		//标签类名
		$(event.target).parent("li").addClass("active").siblings("li").removeClass("active");
	},
	//初始加载数据
	loadData(page){
		page =page;
		const url = "/api/positions/find_by_page?page="+page;
		//get请求
		$.getJSON(url,(data)=>{
			if(data.res_code === 1){
				let html = "";
				data.res_body.list.forEach((curr)=>{
					html +=ejs.render(Position.PositionRowTemplate,curr);
				});
				$(".table-post tbody").html(html);
			}
		});
	},
	//添加职位的处理
	addPosHandler(){		
		//请求借口
		const url = "/api/positions/add";
		//向服务器发送数据
		const data = new FormData($(".form-add-post").get(0));
		//ajax请求
		$.ajax({
			type: "post",
			url: url,
			data: data,
			dataType: "json",
			processData: false, // 不将 data 数据转换为查询字符串
			contentType: false, // 不使用默认的 "application/x-www-form-urlencoded"
			success: function(data) {
				if (data.res_body.status === 1) { // 添加成功，使用 ejs 浏览器端模板渲染
					// data.res_body.data
					// 使用 ejs 模板渲染
					const html = ejs.render(Position.PositionRowTemplate, data.res_body.data)
					// 显示
					$(".table-post tbody").append(html);
					// 关闭模态框
					$("#postModal").modal("hide");
				} else { // 添加失败
					$(".add-post-error").removeClass("hidden");
				}
			}
		});
		//获取表单数据
//		const data = $(".form-add-post").serialize();
//		$.post(url,data,(data)=>{
//			if(data.res_body.status === 1){// 添加成功，使用 ejs 浏览器端模板渲染
//				//使用ejs模板渲染
//				const html = ejs.render(Position.PositionRowTemplate,data.res_body.data);
//				$(".table-post tbody").append(html);
//				// 关闭模态框
//				$("#postModal").modal("hide");
//			}else{//添加失败
//				$(".add-post-error").removeClass("hidden");
//			}
//		})
	}
});

new Position();
