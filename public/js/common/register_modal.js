function RegisterModal() {
	this.createDom();
	this.addListener();
}

RegisterModal.ModalTemplate = `<div class="modal fade" id="regModal" tabindex="-1">
	  <div class="modal-dialog">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
	        <h4 class="modal-title" id="myModalLabel">用户注册</h4>
	      </div>
	      <div class="modal-body">
	      	<div class="alert alert-danger hidden register-error">用户注册失败，请稍后重试</div>
	        <form class="form-register">
			  <div class="form-group">
			    <label for="regUsername">用户名</label>
			    <input type="text" class="form-control" name="username" id="regUsername" placeholder="请输入用户名">
			  </div>
			  <div class="form-group">
			    <label for="regPassword">密码</label>
			    <input type="password" class="form-control" name="password" id="regPassword" placeholder="请输入密码">
			  </div>
			  <div class="form-group">
			    <label for="regConfPassword">确认密码</label>
			    <input type="password" class="form-control" id="regConfPassword" placeholder="请输入确认密码">
			  </div>
			  <div class="form-group">
			    <label for="regEmail">Email</label>
			    <input type="email" class="form-control" name="email" id="regEmail" placeholder="请输入Email">
			  </div>
			</form>
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
	        <button type="button" class="btn btn-primary btn-register">注册</button>
	      </div>
	    </div>
	  </div>
	</div>`;

$.extend(RegisterModal.prototype, {
	createDom() {
		$("body").append(RegisterModal.ModalTemplate);
	},
	addListener() {
		$(".btn-register").on("click", this.registerHandler);
	},
	registerHandler() {
		// 获取注册表单中的数据
		const data = $(".form-register").serialize();
		// 请求API接口，实现用户注册
		const url = "http://rap2api.taobao.org/app/mock/86513/api/users/register";
		$.post(url, data, (data)=>{
			if (data.res_body.status === 1) { // 注册成功 即 用户登录成功
				// 保存登录成功的用户名
				sessionStorage.username = data.res_body.data.username;
				// 刷新页面
				location.reload();
			} else { // 注册失败
				$(".register-error").removeClass("hidden");
			}
		}, "json")
	}
});

	new RegisterModal();