$(function(){
	$('*').on('click',function(){
		this.blur();
	});
})
/*-----------点播实例函数-------------*/
function player_mp4(){
	$('#myvideo').width('100%');
 	$('#myvideo').height('100%');
	videojs.options.flash.swf = "js/video/VideoJs.swf";
	var play = new videojs('myvideo',{
		"controls":"true",
		"autoplay":"false"
	},function(){
		var isPause = true;
		this.pause();
		this.on('keydown',function(event){
			event.preventDefault();
			if(event.keyCode === 32) {
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
/*------------直播实例函数--------------*/
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
/*-------- 变更播放方式和url---------*/
var currentType = 'live';
function change_TV(currentType,goal_type,url){
	if(currentType === 'live'){
		if(goal_type === 'live'){
			$('#view').empty().append('<video id="myvideo" class="video-js vjs-default-skin vjs-big-play-centered vjs-mycss"><source src="'+url+'" type="rtmp/flv"></video>');
			Destroy.destroy();
			player_live();
			currentType = 'live';
		}else if (goal_type === 'mp4') {
			$('#view').empty().append('<video id="myvideo" class="video-js vjs-default-skin vjs-big-play-centered vjs-mycss"><source src="'+url+'" type="video/mp4"></video>');
			Destroy.destroy();
			player_mp4();
			currentType = 'mp4';
		}
	}else if(currentType === 'mp4'){
		if(goal_type === 'live'){
			$('#view').empty().append('<video id="myvideo" class="video-js vjs-default-skin vjs-big-play-centered vjs-mycss"><source src="'+url+'" type="rtmp/flv"></video>');
			Destroy.destroy();
			player_live();
			currentType = 'live';
		}else if (goal_type === 'mp4') {
			$('#myvideo_html5_api').attr('src',url);
			currentType = 'mp4';
		}
	}
}