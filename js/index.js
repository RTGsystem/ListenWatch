const ip = 'http://192.168.124.220:8080';
window.onresize = window.onload = function() {
	var submitButton = document.getElementById('SubmitButton');
	var username = document.getElementById('username');
	var password = document.getElementById('pwd');
	var check = document.getElementById('RememberCheck1');
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
			alert('您的输入不完整！');
		}else{
			var isadmin = check.checked == true ? 0 : 1;
			$.ajax({
				url: ip + '/user/userLogin',
				type: 'post',
				dataType: 'JSON',
				data: {
					userid: username.value,
					password: password.value,
					identity: isadmin
				},
				success: function(res){
					if (res.resultCode == 100) {
						window.location.href = './main.html';
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
function forget(){
	alert('请联系后台！');
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