function Header(){
	this.init();
}
	Header.NavTemplate = `<nav class="navbar navbar-inverse">
	    <div class="navbar-header">
	      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-navbar">
	        <span class="icon-bar"></span>
	        <span class="icon-bar"></span>
	        <span class="icon-bar"></span>
	      </button>
	      <a class="navbar-brand" href="#">职位管理系统</a>
	    </div>

	    <div class="collapse navbar-collapse" id="bs-navbar">
	      <ul class="nav navbar-nav">
	        <li class="active"><a href="/">首页</a></li>
	        <li><a href="/html/position.html">职位管理</a></li>
	      </ul>
	      
	      <ul class="nav navbar-nav navbar-right">
	        <li data-toggle="modal" data-target="#loginModal"><a href="#">登录</a></li>
	        <li data-toggle="modal" data-target="#regModal"><a href="#">注册</a></li>
	      </ul>
	      <ul class="nav navbar-nav navbar-right hidden login-success">
	        <li><a href="#">欢迎：</a></li>
	        <li><a href="javascript:void(0);" class="link-logout">注销</a></li>
	      </ul>
	    </div>
	  </nav>`;

	$.extend(Header.prototype,{
		init(){
			this.creatDom();
			this.loadUser();
			this.addListener();
		},
		creatDom(){
			$("header").html(Header.NavTemplate);
		},
		//加载登录成功的用户信息
		loadUser(){
			const user = sessionStorage.username;
			if(user){
				$(".login-success").removeClass("hidden").prev("ul").remove();
				$(".login-success a:first").html("欢迎："+user);
			}else{
				this.creatModal();
			}
		},
		creatModal(){
			new LoginModal();
			new RegisterModal();
		},
		addListener(){
			$(".link-logout").on("click",this.logoutHandler);
		},
		//注销处理
		logoutHandler(){
			sessionStorage.removeItem("username");//移除 
			$.getJSON("http://rap2api.taobao.org/app/mock/86513/api/users/logout",(data)=>{
				if(data.res_body.status === 1){
					location.reload();
				}
			});
		}
	});
	
new Header();
