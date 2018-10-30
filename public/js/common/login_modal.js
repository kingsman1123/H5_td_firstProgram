function LoginModal(){
	this.creatDom();
	this.addListener();
	this.genCode();
	
}
	LoginModal.ModalTemplate = `<div class="modal fade" id="loginModal" tabindex="-1">
	  <div class="modal-dialog">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
	        <h4 class="modal-title" id="loginModalLabel">用户登录</h4>
	      </div>
	      <div class="modal-body">
	      	<div class="alert alert-danger hidden login-error">用户名或密码错误</div>
	        <form class="form-login">
			  <div class="form-group">
			    <label for="loginUsername">用户名</label>
			    <input type="text" class="form-control" name="username" id="loginUsername" placeholder="请输入用户名">
			  </div>
			  <div class="form-group">
			    <label for="loginPassword">密码</label>
			    <input type="password" class="form-control" name="password" id="loginPassword" placeholder="请输入密码">
			  </div>
			  <div class="form-group">
			    <label for="loginCode">验证码</label>
			    <input type="text" class="form-control input-code" id="loginCode" placeholder="请输入验证码">
			    <div class="alert alert-danger hidden code-error">验证码错误</div>
			    <div class="code"></div>
			  </div>
			</form>
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
	        <button type="button" class="btn btn-primary btn-login">登录</button>
	      </div>
	    </div>
	  </div> 
	</div>`;
	
	$.extend(LoginModal.prototype,{
		creatDom(){
			$("body").append(LoginModal.ModalTemplate);
		},
		addListener(){
			$(".btn-login").on("click", this.loginHandler);
			$(".code").on("click", this.genCode);
			$(".input-code").on("blur", this.codeHandler);
			},
		// 登录处理
		loginHandler() {
			// 登录的用户名与密码
			const data = $(".form-login").serialize();
			// 请求API接口，实现用户名与密码验证
			const url = "/api/users/login";
			$.post(url, data, (data)=>{
				if (data.res_body.status === 1) { // 登录成功
					// 保存登录成功的用户名
					// $.cookie("username", data.res_body.data.username);
					sessionStorage.username=data.res_body.data.username;
					// 刷新页面
					location.reload();
				} else { // 登录失败
					$(".login-error").removeClass("hidden");
					alert(data.res_body.message);
				}
			}, "json")
		},
		// 生成验证码
		genCode() {
			$.getJSON("/api/captcha", (data) => {
				$(".code").html(data.res_body.data);
			})
		},
		// 校验验证码
		codeHandler(event) {
			// 输入的值
			const code = $(event.target).val();
			// ajax
			$.getJSON("/api/captcha/verify", {code}, (data)=>{
				if (data.res_body.valid) {
					$(".code-error").addClass("hidden");
				} else {
					$(".code-error").removeClass("hidden");
				}
			})
		}
	});
	
