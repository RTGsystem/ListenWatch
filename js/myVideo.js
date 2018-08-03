//点击事件后脱离焦点
$(function(){
	$('*').on('keydown',function(event){
		if(event.r)
		event.preventDefault;
	})
})
var currentMethod='live';
var currentType='TV';
/**---Create UI for live player-----**/
function player_live(){
	$('#myvideo').width('100%');
 	$('#myvideo').height('100%');
	videojs.options.flash.swf = "js/video/VideoJs.swf";
	var play = new videojs('myvideo',{
		"controls":"true",
		"width":"800px",
		"height":"600px",
		"autoplay":"false"
	},function(){
		this.play();
		this.on('keydown',function(){
			event.preventDefault();
			if(event.keyCode === 38) {
				var vol = play.volume();
				play.volume(vol+0.1);
			}
			if(event.keyCode === 40) {
				var vol = play.volume();
				play.volume(vol-0.1);
			}
		})
		return Destroy = {
			destroy: function(){
				play.dispose();
			}
		}
	});
}
/**---Create UI for static player---**/
function player_static(){
	$('#myvideo').width('100%');
 	$('#myvideo').height('100%');
	videojs.options.flash.swf = "js/video/VideoJs.swf";
	var play = new videojs('myvideo',{
		"controls":"true",
		"autoplay":"false"
	},function(){
		console.log(11111)
		var isPause = true;
		this.pause();
		this.on('keydown',function(event){
			event.preventDefault();
			if(event.keyCode === 32) {
				console.log(111);
				isPause == false ? this.pause() : this.play();
				isPause = !isPause;
			}
			if(event.keyCode === 37) {
				var myTime = play.currentTime();
				play.currentTime(myTime-5);
			}
			if(event.keyCode === 38) {
				var vol = play.volume();
				play.volume(vol+0.1);
			}
			if(event.keyCode === 39) {
				var myTime = play.currentTime();
				play.currentTime(myTime+5);
			}
			if(event.keyCode === 40) {
				var vol = play.volume();
				play.volume(vol-0.1);
			}
		});
		this.on('click',function(){
			isPause = !isPause;
		})
		return Destroy = {
			destroy: function(){
				play.dispose();
			},
			player: play
		}
	});
	play.downloadButton();
}
/**---Function for Change TYPE&&URL----**/
/*流程为
	1.销毁先前实例
	2.清空view并添加新内容
	3.创建新实例
	4.重置current
*/
function changeSource(currentType,currentMethod,goalType,goalMethod,url){
	if(goalType==='FM'&&goalMethod==='static'){
		if(Destroy){
			Destroy.destroy();
		}
		// player_mp3()内部已经清空并添加新内容
		$('#view').empty().append('<video id="myvideo" class="video-js vjs-default-skin vjs-big-play-centered vjs-mycss"><source src="'+url+'" type="audio/mp3"></video>');
		player_static(url);
		currentType=goalType;
		currentMethod=goalMethod;
	}else if(goalType==='TV'&&goalMethod==='static'){
		if(currentType==='TV'&&currentMethod==='static'){
			$('#myvideo_html5_api').attr('src',url);
		}else{
			if(Destroy){
				Destroy.destroy();
			}
			$('#view').empty().append('<video id="myvideo" class="video-js vjs-default-skin vjs-big-play-centered vjs-mycss"><source src="'+url+'" type="video/mp4"></video>');
			player_static();
		}
		currentType=goalType;
		currentMethod=goalMethod;
	}else {
		$('#view').empty().append('<video id="myvideo" class="video-js vjs-default-skin vjs-big-play-centered vjs-mycss"><source src="'+url+'" type="rtmp/flv"></video>');
		if(Destroy){
			Destroy.destroy();
		}
		player_live();
		// if (goalType==='FM'&&goalMethod==='live') {
		// 	player_cover();
		// }
	}
}
