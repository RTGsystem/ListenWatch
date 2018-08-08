function init(){
	var dateSearch = getNowDate();
	getProgramList(0,playChannelName,dateSearch);
	getChannelURL(playType,playChannelId);
}
function selectChannel(ev){
	rmcover();
	var dateSearch = getNowDate();
	if ($(ev.target).parent().parent().attr('id')==='TVList'){
		playType = 0;
		playChannelId = $(ev.target).attr('data-id');
		playChannelName = $(ev.target).text();
		getChannelURL(playType,playChannelId);
		$('#con_list_ul').empty();
		getProgramList(playType,playChannelName,dateSearch);
		changeSource(currentType,currentMethod,'TV','live',url);
	}else if($(ev.target).parent().parent().attr('id')==='FMList'){
		playType = 1;
		playChannelId = $(ev.target).attr('data-id');
		getChannelURL(playType,playChannelId);
		$('#con_list_ul').empty();
		getProgramList(playType,playChannelName,dateSearch);
		changeSource(currentType,currentMethod,'FM','live',url);
		cover();
	}
	document.getElementById('currentPro').innerHTML = `监听监看回放系统&nbsp;&nbsp;·&nbsp;&nbsp;`+playChannelName;
}
function proListForDate(dateSearch){
	dateSearch = getTrueDate(dateSearch);
	$('#con_list_ul').empty();
	getProgramList(playType,playChannelName,dateSearch);
}
function selectPro(ev){
	rmcover();
	if($(ev.target).attr('class')==='static'){
		var dateSearch = $('#date').text();
		dateSearch = getTrueDate(dateSearch);
		playProId = $(ev.target).parent().attr('data-id');
		getProgramUrl(playType,playProId,dateSearch);
		if(playType ===0){
			changeSource(currentType,currentMethod,'TV','static',url);
		}else if(playType ===1){
			changeSource(currentType,currentMethod,'FM','static',url);
			cover();
		}
	}else if($(ev.target).attr('class')==='live'){
		getChannelURL(playType,playChannelId);
		if(playType ===0){
			changeSource(currentType,currentMethod,'TV','live',url);
		}else if(playType ===1){
			changeSource(currentType,currentMethod,'FM','live',url);
			cover();
		}
	}
	else{
		alert('该节目还未到播放时间');
	}
}
function getNowDate(){
	var now = new Date();
	var month,day;
	if((now.getMonth()+1)<10){
		month ='-'+'0'+(now.getMonth()+1).toString()+'-';
	}else{
		month ='-'+ (now.getMonth()+1).toString()+'-';
	}
	if(now.getDate()<10){
		day = '0'+now.getDate().toString();
	}else{
		day = now.getDate().toString();
	}
	return now.getFullYear().toString()+month+day;
}
function getDateBack(date){
	if(date.charAt(5)==='0'){
		 date = date.substring(0,5)+date.substring(6,10);
		 if(date.charAt(date.length-2)==='0'){
		 	date = date.substring(0,date.length-2)+date.substring(date.length-1,date.length);
		 } 
	}
	if(date.charAt(date.length-2)==='0'){
		 	date = date.substring(0,date.length-2)+date.substring(date.length-1,date.length);
		 } 
	return date;
}
function cover(){
	var $cover = $('.vjs-text-track-display');
	$cover.append('<div id="boxbox" style="margin-top: 120px;"></div>');
}
function rmcover(){
	var $cover = $('.vjs-text-track-display');
	$cover.empty();
}