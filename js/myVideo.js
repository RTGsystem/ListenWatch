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
	videojs.options.flash.swf = "js/video/VideoJS.swf";
	var play = new videojs('myvideo',{
		"controls":"true"
	},function(){
		$('.vjs-mycss .vjs-remaining-time').css('display','none');
		$('.vjs-mycss .vjs-live-control').attr('id','liveControl');
		$('.vjs-mycss .vjs-live-control').css('cssText','display:inline-block!important');
		$('.vjs-mycss .vjs-live-control').text('当前正在直播·'+playChannelName);
		$('.vjs-mycss .vjs-live-control').css('text-align','left');
		$('.vjs-mycss .vjs-live-control').css('color','#fff');
		$('.vjs-mycss .vjs-progress-control').css('display','none');
		this.play();
		this.volume(0.5);
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
		});
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
	videojs.options.flash.swf = "js/video/VideoJS.swf";
	var play = new videojs('myvideo',{
		"controls":"true"
	},function(){
		this.volume(0.5);
		$('.vjs-mycss .vjs-current-time').css('display','inline-block');
		$('.vjs-mycss .vjs-current-time').css('padding','0');
		$('.vjs-mycss .vjs-duration').css('display','inline-block');
		$('.vjs-mycss .vjs-duration').css('margin-left','0');
		$('.vjs-mycss .vjs-duration').css('padding-left','0');
		$('.vjs-mycss .vjs-remaining-time').css('display','none');
		$('.vjs-mycss .vjs-time-divider').css('display','inline-block');
		$('.vjs-mycss .vjs-time-divider').css('margin-top','-1px');
		$('.vjs-mycss .vjs-time-divider').text('|');
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
/**---Function for Change TYPE&&URL----**/
/*流程为
	1.销毁先前实例
	2.清空view并添加新内容
	3.创建新实例
	4.重置current
*/
function changeSource(currentType,currentMethod,goalType,goalMethod,url){
	Destroy.destroy();
	if(goalMethod==='static'){
		if(goalType==='FM'){
			$('#view').empty().append('<video id="myvideo" class="video-js vjs-default-skin vjs-big-play-centered vjs-mycss"><source src="'+url+'" type="audio/mp3"></video>');
			player_static(url);
		}else if(goalType==='TV'){
			$('#view').empty().append('<video id="myvideo" class="video-js vjs-default-skin vjs-big-play-centered vjs-mycss"><source src="'+url+'" type="video/mp4"></video>');
			player_static(url);
		}
	}else if(goalMethod==='live'){
		$('#view').empty().append('<video id="myvideo" class="video-js vjs-default-skin vjs-big-play-centered vjs-mycss"><source src="'+url+'" type="rtmp/flv"></video>');
		player_live();
	}
	currentTypeNow=goalType;
	currentMethodNow=goalMethod;
}