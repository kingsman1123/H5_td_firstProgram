function Header(){
	this.creatDom();
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
		creatDom(){
			$("header").html(Header.NavTemplate);
		}
	});
	
		new Header();
