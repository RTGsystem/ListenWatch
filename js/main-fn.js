function init(){
	getChannelList(0);
	getChannelList(1);
	var dateSearch = getNowDate();
	getProgramList(0,playChannelName,'2018-08-02');
	getChannelURL(playType,playChannelId);
	$('#view video source').attr('src',url);
	player_live();
}
function selectChannel(ev){
	var result = $('#date').text();
	var dateSearch = getTrueDate(result);
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
	}
}
function proListForDate(dateSearch){
	$('#con_list_ul').empty();
	getProgramList(playType,playChannelName,dateSearch);
}
function selectPro(ev){
	console.log('获取节目URL开始...');
	if($(ev.target).attr('class')==='static'){
		var dateSearch = $('#date').text();
		playProId = $(ev.target).parent().attr('data-id');
		getProgramUrl(playType,playProId,dateSearch);
		if(playType ==='1'){
			changeSource(currentType,currentMethod,'TV','static',url);
		}else if(playType === '2'){
			changeSource(currentType,currentMethod,'FM','static',url);
		}
	}else if($(ev.target).attr('class')==='live'){
		getChannelURL(playType,playChannelId);
		if(playType ==='1'){
			changeSource(currentType,currentMethod,'TV','static',url);
		}else if(playType === '2'){
			changeSource(currentType,currentMethod,'FM','static',url);
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
