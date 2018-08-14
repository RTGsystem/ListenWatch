var beforeDate = false;
var nowDate,nowTime;
function getTime(){
	var myDate = new Date();
	var myYear = myDate.getFullYear();
	var myMonth = myDate.getMonth()+1;
	var myDay = myDate.getDate();
	var myHour = myDate.getHours();
	var mySecond = myDate.getSeconds();
	if(myHour<10){
		myHour = '0'+myHour;
	}
	var myMinute = myDate.getMinutes();
	if(myMinute<10){
		myMinute = '0'+myMinute;
	}
	if(mySecond<10){
		mySecond = '0'+mySecond;
	}
	nowDate = myYear+'-'+myMonth+'-'+myDay;
	nowDate = nowDate.replace(/\-/g, "");
	nowTime = myHour+'-'+myMinute+'-'+mySecond;
	nowTime = nowTime.replace(/\-/g, "");
}
//获取直播地址
function getChannelURL(playType,playChannelId){
	$.ajax({
		url: ip+ '/channel/getChannelUrl',
		type: 'post',
		dataType: 'JSON',
		async: false,
		data: {
			'type1': playType,
			'channelid': playChannelId
		},
		success: function(res){
			if(res.resultCode === 100) {
				url = res.resultData.resultData;
				$('#view video source').attr('src',url);
				player_live();
			}
		},
		error: function(err){
			console.log('网络请求失败');
		}
	})
}
//获取节目单数据
function getProgramList(playType,playChannelName,dateSearch){
	$.ajax({
		url: ip + '/program/getProgramList',
		type: 'post',
		dataType: 'JSON',
		data: {
			'type1': playType,
			'channelname': playChannelName,
			'prodate': dateSearch
		},
		success: function(res){
			if(res.resultCode===100){
				getTime();
				currentProListDate = dateSearch;
				var dateback = getDateBack(currentProListDate);
				$('#date').text(dateback);
				dateSearch = getDateBack(dateSearch).replace(/\-/g, "");
				if(dateSearch<nowDate){
					beforeDate = true;
				}else{
					beforeDate = false;
				}
				var proid,prourl,proname,prostart,proend;
				var proList = res.resultData.resultData;
				for(var i=0;i<proList.length;i++){
					proid = proList[i].proid;
					prourl = proList[i].defaulturl;
					proname = proList[i].proname;
					prostart = proList[i].start;
					comparetStart = prostart.replace(/\:/g, "");
					proend = proList[i].end;
					comparetEnd = proend.replace(/\:/g, "");
					if(beforeDate == true){//小于当天，则节目单每行都加上回看按钮
						var proNews='<li data-id="'+proid+'" class="proli"><span class="proname">'+proname+'</span><span  class="protime">'+prostart+'-'+proend+'</span><div class="static">回放</div></li>';
						$('#con_list_ul').append(proNews);
					}else if(beforeDate == false){
						if(nowTime>=comparetStart&&nowTime<comparetEnd){//当前直播
							var proNews='<li data-id="'+proid+'" class="proli"><span class="proname">'+proname+'</span><span  class="protime">'+prostart+'-'+proend+'</span><div class="live">直播</div></li>';
							$('#con_list_ul').append(proNews);
						}else if(nowTime>=comparetEnd){//今日已播
							var proNews='<li data-id="'+proid+'" class="proli"><span class="proname">'+proname+'</span><span  class="protime">'+prostart+'-'+proend+'</span><div class="static">回放</div></li>';
							$('#con_list_ul').append(proNews);
						}else if(nowTime<comparetStart){
							var proNews='<li data-id="'+proid+'" class="proli"><span class="proname">'+proname+'</span><span  class="protime">'+prostart+'-'+proend+'</span><div class="unplay">未播</div></li>';
							$('#con_list_ul').append(proNews);
						}
					}
				}
				var arrLi = document.getElementsByClassName('static');
				var isLive = document.getElementsByClassName('live');
				var currentTop = 0;
				if(isLive){
					currentTop = 73 * (arrLi.length - 2);
				}else{
					currentTop = 0;
				}
				document.getElementById('con_list').scrollTop = currentTop;
				$('#con_list_ul li div').on('click',function(){
					selectPro(event);
				});
			}
			else{
				alert('未保存此频道当日节目单');
				// proListForDate(currentProListDate);
			}
		},
		error: function(err){
			console.log('网络请求失败');
		}
	});
}
//获取左侧频道导航列表
function getChannelList(type){
	$.ajax({
		url: ip + '/user/getChannelList',
		type: 'post',
		dataType: 'JSON',
		data: {},
		success: function(res){
			if(res.resultCode===100){
				var arr = res.resultData.resultData;
				for(var i = 0; i < arr.length; i++){
					if(arr[i].type == 0){
						var TVNews = `<li data-id="${arr[i].channelid}">
								<div data-id="${arr[i].channelid}" class="tv_logo" style="background:url(${arr[i].icon})"></div>
								<span data-id="${arr[i].channelid}">${arr[i].channelname}</span>
							</li>`;
						$('#TVList').append(TVNews);
					}
					if(arr[i].type == 1){
						var FMNews = `<li data-id="${arr[i].channelid}">
								<div data-id="${arr[i].channelid}" class="fm_logo" style="background:url(${arr[i].icon})"></div>
								<span data-id="${arr[i].channelid}">${arr[i].channelname}</span>
							</li>`;
						$('#FMList').append(FMNews);
					}
				}
			}	
			$('.leader ul li div').on('click',function(event){
				event.stopPropagation();
				selectChannel(event);
			});
			$('.leader ul li span').on('click',function(event){
				event.stopPropagation();
				selectChannel(event);
			});
		},
		error: function(err){
			console.log('网络请求失败');
		}
	});
}
//获取点播节目URL
function getProgramUrl(playType,playProId,channelname,dateSearch){
	$.ajax({
		url: ip+ '/program/getProgramUrl',
		type: 'post',
		dataType: 'JSON',
		async: false,
		data: {
			'type1': playType,
			'proid': playProId,
			'channelname': channelname,
			'prodate': dateSearch
		},
		success: function(res){
			if(res.resultCode===100){
				url = res.resultData.resultData.defaulturl;
			}
		},
		error: function(err){
			console.log('网络请求失败');
		}
	});
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
function getTrueDate(result){
	if(result.length === 8){
		return dateSearch = result.substring(0,5)+'0'+result.charAt(5)+result.charAt(6)+'0'+result.charAt(7);
	}else if(result.length === 9){
		if(result.charAt(7)==='-'){
			return dateSearch = result.substring(0,8)+'0'+result.charAt(8);
		}else if(result.charAt(6)==='-'){
			return dateSearch = result.substring(0,5)+'0'+result.substring(5,9);
		}
	}
	return result;
}
// 分页插件
(function($){ 
 var ms = { 
  init:function(obj,args){ 
   return (function(){ 
    ms.fillHtml(obj,args); 
    ms.bindEvent(obj,args); 
   })(); 
  }, 
  //填充html 
  fillHtml:function(obj,args){ 
   return (function(){ 
    obj.empty(); 
    //上一页 
    if(args.current > 1){ 
     obj.append('<a href="javascript:;" class="prevPage">上一页</a>'); 
    }else{ 
     obj.remove('.prevPage'); 
     obj.append('<span class="disabled">上一页</span>'); 
    } 
    //中间页码 
    if(args.current != 1 && args.current >= 4 && args.pageCount != 4){ 
     obj.append('<a href="javascript:;" class="tcdNumber">'+1+'</a>'); 
    } 
    if(args.current-2 > 2 && args.current <= args.pageCount && args.pageCount > 5){ 
     obj.append('<span>...</span>'); 
    } 
    var start = args.current -2,end = args.current+2; 
    if((start > 1 && args.current < 4)||args.current == 1){ 
     end++; 
    } 
    if(args.current > args.pageCount-4 && args.current >= args.pageCount){ 
     start--; 
    } 
    for (;start <= end; start++) { 
     if(start <= args.pageCount && start >= 1){ 
      if(start != args.current){ 
       obj.append('<a href="javascript:;" class="tcdNumber">'+ start +'</a>'); 
      }else{ 
       obj.append('<span class="current">'+ start +'</span>'); 
      } 
     } 
    } 
    if(args.current + 2 < args.pageCount - 1 && args.current >= 1 && args.pageCount > 5){ 
     obj.append('<span>...</span>'); 
    } 
    if(args.current != args.pageCount && args.current < args.pageCount -2 && args.pageCount != 4){ 
     obj.append('<a href="javascript:;" class="tcdNumber">'+args.pageCount+'</a>'); 
    } 
    //下一页 
    if(args.current < args.pageCount){ 
     obj.append('<a href="javascript:;" class="nextPage">下一页</a>'); 
    }else{ 
     obj.remove('.nextPage'); 
     obj.append('<span class="disabled">下一页</span>'); 
    } 
   })(); 
  }, 
  //绑定事件 
  bindEvent:function(obj,args){ 
   return (function(){ 
    obj.on("click","a.tcdNumber",function(){ 
     var current = parseInt($(this).text()); 
     ms.fillHtml(obj,{"current":current,"pageCount":args.pageCount}); 
     if(typeof(args.backFn)=="function"){ 
      args.backFn(current); 
     } 
    }); 
    //上一页 
    obj.on("click","a.prevPage",function(){ 
     var current = parseInt(obj.children("span.current").text()); 
     ms.fillHtml(obj,{"current":current-1,"pageCount":args.pageCount}); 
     if(typeof(args.backFn)=="function"){ 
      args.backFn(current-1); 
     } 
    }); 
    //下一页 
    obj.on("click","a.nextPage",function(){ 
     var current = parseInt(obj.children("span.current").text()); 
     ms.fillHtml(obj,{"current":current+1,"pageCount":args.pageCount}); 
     if(typeof(args.backFn)=="function"){ 
      args.backFn(current+1); 
     } 
    }); 
   })(); 
  } 
 } 
 $.fn.createPage = function(options){ 
  var args = $.extend({ 
   pageCount : 10, 
   current : 1, 
   backFn : function(){} 
  },options); 
  ms.init(this,args); 
 } 
})(jQuery);