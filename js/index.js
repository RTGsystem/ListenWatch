var sign = 2;

function showPic(index) {
	var focusImg = document.getElementById("focusImg");
	var imgSrc = "img/pic";
	imgSrc = imgSrc + index + ".jpg";
	focusImg.src = imgSrc;
	var lis = document.getElementsByClassName("focusBox")[0].getElementsByTagName("li");
	for(var i = 0; i < lis.length; i++) {
		lis[i].className = "";
	}
	lis[index - 1].className = "cur";
}

function setCurrentPic() {
	showPic(sign);
	sign++;
	if(sign == 5) {
		sign = 1;
	}
}

window.onload = function() {
	showPic(1);
	var submitButton = document.getElementById('SubmitButton');
	submitButton.onclick = function (){
		console.log(1);
		window.location.href = './main.html';
	}
}

window.setInterval("setCurrentPic()", 2200);