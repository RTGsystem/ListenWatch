const ip = 'http://10.20.21.225:8080';
// const ip = '';
window.onresize = window.onload = function() {
	var submitButton = document.getElementById('SubmitButton');
	var username = document.getElementById('username');
	var password = document.getElementById('pwd');
	//var check = document.getElementById('RememberCheck1');
	$("#a0").css("width", $(window).width());
	$("#a0").css("height", $(window).height());
	$("#a1").css("width", $(window).width());
	$("#a1").css("height", $(window).height());
	$("#a2").css("width", $(window).width());
	$("#a2").css("height", $(window).height());
	$("#a3").css("width", $(window).width());
	$("#a3").css("height", $(window).height());
	submitButton.onclick = function() {
		if(username.value == ''||password.value == ''){
			alert('您的输入不完整');
		}else{
			//var isadmin = check.checked == true ? 0 : 1;
			$.ajax({
				url: ip + '/user/userLogin',
				type: 'post',
				dataType: 'JSON',
				data: {
					userid: username.value,
					password: hex_md5(password.value),
					identity: 0
				},
				success: function(res){
					if (res.resultCode == 100) {
						window.location.href = './main.html';
						setCookie('userid', username.value, 1);
					}else{
						alert("您输入的账号密码有误");
					}
				},
				error: function(err){
					console.log("网络请求失败" + err);
				}
			});
		}
	}
	
}
function keyLogin(){
	if (event.keyCode==13) {
		document.getElementById("SubmitButton").click(); //调用登录按钮的登录事件
	}
}
function forget(){
	alert('请联系后台');
}
// var i = 0;
// var c;

// function a() {

// 	c = i % 4;
// 	var d = (c + 1) % 4;
// 	var e = document.getElementById("a" + c).opacity
// 	//var d = (i + 1) % 5;

// 	$("#a" + d).animate({
// 		opacity: "1"
// 	}, 2000)

// 	console.log(i);
// 	i++;
// }

// function b() {
// 	$("#a" + c).animate({
// 		opacity: "0"
// 	}, 2000)
// }
// var r = self.setInterval("a()", 4000);
// var rr = self.setInterval("b()", 4000);