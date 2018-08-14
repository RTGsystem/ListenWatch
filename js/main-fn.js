function init(){
	var dateSearch = getNowDate();
	getProgramList(0,playChannelName,dateSearch);
	getChannelURL(playType,playChannelId);
}
function selectChannel(ev){
	rmcover();
	var dateSearch = getNowDate();
	var dateBack = getDateBack(dateSearch);
	currentProListDate = dateSearch;
	$('#date').text(dateBack);
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
		playChannelName = $(ev.target).text();
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
	var dateNow = getNowDate();
	if(dateNow<dateSearch){
		alert('还未到该日期！');
		var dateBack = getDateBack(currentProListDate);
		$('#date').text(dateBack);
	}else{
		$('#con_list_ul').empty();
		getProgramList(playType,playChannelName,dateSearch);
	}
}
function selectPro(ev){
	rmcover();
	if($(ev.target).attr('class')==='static'){
		var dateSearch = $('#date').text();
		dateSearch = getTrueDate(dateSearch);
		playProId = $(ev.target).parent().attr('data-id');
		var channelname = $('#currentPro').text().split('·')[1].slice(2);
		getProgramUrl(playType,playProId,channelname,dateSearch);
		if(playType ===0){
			changeSource(currentType,currentMethod,'TV','static',url);
		}else if(playType ===1){
			changeSource(currentType,currentMethod,'FM','static',url);
			//cover();
		}
	}else if($(ev.target).attr('class')==='live'){
		getChannelURL(playType,playChannelId);
		if(playType ===0){
			changeSource(currentType,currentMethod,'TV','live',url);
		}else if(playType ===1){
			changeSource(currentType,currentMethod,'FM','live',url);
			//cover();
		}
	}
	else{
		alert('该节目还未到播放时间');
	}
}
function cover(){
	var $cover = $('.vjs-text-track-display');
	$cover.append('<div id="boxbox"></div>');
}
function rmcover(){
	var $cover = $('.vjs-text-track-display');
	$cover.empty();
}