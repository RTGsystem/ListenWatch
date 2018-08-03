const ip = 'http://192.168.124.220:8080';
var playType= 0;
var playChannelId = 1;
var playChannelName = '浙江卫视';
var playProId='';
var currentType = 'TV';
var currentMethod = 'live';
var url = '';
window.onresize =  window.onload = function (){
	var content = document.getElementById('content');
	var header = document.getElementById('header');
	var leader = document.getElementsByClassName('leader');
	var view = document.getElementsByClassName('view');
	var viewer = document.getElementsByClassName('viewer');
	var mod = document.getElementById('mod');
	var detail = document.getElementsByClassName('detail');
	var background = document.getElementById('background');
	var conList = document.getElementById('con_list');
	var date = document.getElementById('date');
	var tc = document.getElementById('tc');
	var chpass = document.getElementById('chpass');
	var close = document.getElementById('close');
	var back = document.getElementById('ch-tc-background');
	var confirm = document.getElementById('confirm');
	// 悬停方式弹出信息源列表
	mod.onmouseover = function(){
		clearInterval(leader[0].time);
		move(leader[0], 0, 10);
		background.style.display = 'block';
		startMove(40);
	}
	background.onmouseover = function(){
		clearInterval(leader[0].time);
		move(leader[0], -300, 10);
		startMove(0);
		background.style.display = 'none';
	}
	// 修改密码部分开始
	chpass.onclick = function(){
		back.style.display = 'block';
		tc.style.marginTop = (document.documentElement.clientHeight - tc.offsetHeight)/2 +'px';
	}
	close.onclick = function(){
		back.style.display = 'none';
	}
	// 修改密码部分结束
	// 页面布局设置
	var contentHeight = document.documentElement.clientHeight-header.offsetHeight;
	content.style.height = contentHeight + 'px';
	leader[0].style.height = contentHeight + 'px';
	view[0].style.height = contentHeight + 'px';
	viewer[0].style.height = contentHeight - 70 + 'px';
	detail[0].style.height = viewer[0].offsetHeight + 'px';
	conList.style.height = viewer[0].offsetHeight - 145 + 'px';
	viewer[0].style.width = document.documentElement.clientWidth - 425 + 'px';
	var fmlist = document.getElementById('FMList');
	var tvlist = document.getElementById('TVList');
	fmlist.style.height = tvlist.offsetHeight > fmlist.offsetHeight ? tvlist.offsetHeight : fmlist.offsetHeight + 'px';
	// 函数调用
	select();
	//getTime();
};
init();//初始化
// 移动封装
var timer = null;//时间对象 
var alpha = 0;//透明度初始值
function startMove(iTarget) { 
	var background = document.getElementById('background'); 
	clearInterval(timer);//清空时间对象 
	timer = setInterval(function(){
		var speed = 0;
		if(alpha < iTarget) {
			speed = 5;
		}
		else {
			speed = -5;
		}
		if(alpha == iTarget) { 
			clearInterval(timer); 
		}
		else { 
			alpha += speed; //透明度值增加效果 
			//oDiv.style.filter = 'alpha(opacity:'+alpha+')'; //设置IE透明度 
			background.style.opacity = alpha / 100; //设置其他浏览器 
		}
	},30);
}
//日历插入
function select(){
	$(window).click(function() {
		if ($(".select-date").css("display") == "block") {
			$(".select-date").css("display", "none")
		}
	});
	$("#date").on("click", function(e) {
		e.stopPropagation();
		if ($(".select-date").css("display") == "none") {
			$(".select-date").css("display", "block")
		} else {
			$(".select-date").css("display", "none")
		}
	});
	var yearArr = [];
	var monthArr = [];
	for (var i = 1990; i < 2099; i++) {
		yearArr.push(i + "年");
		$("#yearList").append('<option value="' + (i + "年") + '">' + i + "年" + "</option>")
	}
	for (var j = 1; j < 13; j++) {
		monthArr.push(j + "月");
		$("#monthList").append('<option value="' + (j + "月") + '">' + j + "月" + "</option>")
	}
	var d = new Date();
	var currYear = d.getFullYear();
	var currMonth = (d.getMonth() + 1);
	var currDate = d.getDate();
	$("#date").text(currYear + "-" + currMonth + "-" + d.getDate());
	$("#yearList").val(currYear + "年");
	$("#monthList").val(currMonth + "月");
	$(".reback").eq(0).click(function() {
		var d = new Date();
		var currYear = d.getFullYear();
		var currMonth = (d.getMonth() + 1);
		$("#yearList").val(currYear + "年");
		$("#monthList").val(currMonth + "月");
		$("#date").text(currYear + "-" + currMonth + "-" + d.getDate());
		ergodicDate(currYear, currMonth);
		getSelectDate(currYear + "-" + currMonth + "-" + d.getDate())
	});
	var currN = 0;
	var currK = 0;
	ergodicDate(currYear, currMonth);
	function ergodicDate(year, month) {
		var preMonth = month-1;
		var preYear = year;
		if (preMonth < 1) {
			preMonth = 12;
			preYear-1
		}
		var preMonthLength = getMonthLength(preYear, preMonth);
		$(".day-tabel").eq(0).empty();
		var date1 = new Date(year + "/" + month + "/" + 1).getDay();
		function getMonthLength(year, month) {
			function isLeapYear(year) {
				return (year % 4 == 0) && (year % 100 != 0 || year % 400 == 0)
			}
			if (month == 4 || month == 6 || month == 9 || month == 11) {
				month = 30;
				return month
			} else {
				if (month == 2) {
					if (isLeapYear == true) {
						month = 29;
						return month
					} else {
						month = 28;
						return month
					}
				} else {
					month = 31;
					return month
				}
			}
		}
		var dayLength = getMonthLength(year, month);
		var dayArr = [];
		for (var m = 1; m < dayLength + 1; m++) {
			dayArr.push(m)
		}
		var flag = false;
		for (var k = 0; k < 6; k++) {
			var li1 = $('<li class="tabel-line"></li>');
			var ul2 = $('<ul class="tabel-ul"></ul>');
			for (var n = 0; n < 7; n++) {
				if (k == 0 && n < date1) {
					if (currDate < 7 && (preMonthLength-date1 + n + 1) == currDate) {
						if (n == 6) {
							ul2.append('<li class="tabel-li preDays active weekColor">' + (preMonthLength-date1 + n + 1) + "</li>")
						} else {
							ul2.append('<li class="tabel-li preDays active">' + (preMonthLength-date1 + n + 1) + "</li>")
						}
					} else {
						if (n == 6) {
							ul2.append('<li class="tabel-li preDays weekColor">' + (preMonthLength-date1 + n + 1) + "</li>")
						} else {
							ul2.append('<li class="tabel-li preDays">' + (preMonthLength-date1 + n + 1) + "</li>")
						}
					}
				} else {
					if (k == 0) {
						if (currDate < 7 && (dayArr[n-date1]) == currDate) {
							if (n == 6) {
								ul2.append('<li class="tabel-li active weekColor">' + dayArr[n-date1] + "</li>")
							} else {
								ul2.append('<li class="tabel-li active">' + dayArr[n-date1] + "</li>")
							}
						} else {
							if (n == 6) {
								ul2.append('<li class="tabel-li weekColor">' + dayArr[n-date1] + "</li>")
							} else {
								ul2.append('<li class="tabel-li">' + dayArr[n-date1] + "</li>")
							}
						}
					} else {
						if ((k * 7-date1 + n + 1) > dayArr.length) {
							break
						} else {
							if (currDate >= 2 && (k * 7-date1 + n + 1) == currDate) {
								if (n == 0 || n == 6) {
									ul2.append('<li class="tabel-li active weekColor">' + (k * 7-date1 + n + 1) + "</li>")
								} else {
									ul2.append('<li class="tabel-li active">' + (k * 7-date1 + n + 1) + "</li>")
								}
							} else {
								if (n == 0 || n == 6) {
									ul2.append('<li class="tabel-li weekColor">' + (k * 7-date1 + n + 1) + "</li>")
								} else {
									ul2.append('<li class="tabel-li">' + (k * 7-date1 + n + 1) + "</li>")
								}
							}
							if ((k * 7-date1 + n + 1) == dayArr.length) {
								flag = true;
								currN = n;
								currK = k
							}
						}
					}
				}
			}
			li1.append(ul2);
			$(".day-tabel").eq(0).append(li1);
			if (flag == true) {
				for (var q = 0; q < 6-currN; q++) {
					$(".tabel-line").eq(currK).children().append('<li class="tabel-li nextDay">' + (q + 1) + "</li>")
				}
				break
			}
		}
	}
	$("#yearList,#monthList, .reback").on("click", function(e) {
		e.stopPropagation()
	});
	$("#yearList,#monthList").on("change", function(e) {
		ergodicDate($("#yearList").val().split("年")[0], $("#monthList").val().split("月")[0]);
		$("#date").text($("#yearList").val().split("年")[0] + "-" + $("#monthList").val().split("月")[0] + "-" + currDate);
		getSelectDate($("#yearList").val().split("年")[0] + "-" + $("#monthList").val().split("月")[0] + "-" + currDate)
	});
	$(".day-tabel").on("click", ".tabel-li", function(e) {
		e.stopPropagation();
		$(this).addClass("showClick").siblings().removeClass("showClick").parent().parent().siblings().find(".tabel-li").removeClass("showClick");
		var parentIndex = $(this).parent().parent().index();
		var thisIndex = $(this).index();
		if (parentIndex == 0 && $(this).html() > 7) {
			var selectDate;
			if (($("#monthList").val().split("月")[0]-1) > 0) {
				selectDate = $("#yearList").val().split("年")[0] + "-" + ($("#monthList").val().split("月")[0]-1) + "-" + $(this).html();
				ergodicDate($("#yearList").val().split("年")[0], ($("#monthList").val().split("月")[0]-1));
				$("#yearList").val($("#yearList").val().split("年")[0] + "年");
				$("#monthList").val(($("#monthList").val().split("月")[0]-1) + "月")
			} else {
				selectDate = ($("#yearList").val().split("年")[0]-1) + "-" + 12 + "-" + $(this).html();
				ergodicDate(($("#yearList").val().split("年")[0]-1), 12);
				$("#yearList").val(($("#yearList").val().split("年")[0]-1) + "年");
				$("#monthList").val(12 + "月")
			}
		} else {
			if (parentIndex == currK && $(this).html() < 7) {
				if (parseInt($("#monthList").val().split("月")[0]) + 1 > 12) {
					selectDate = (parseInt($("#yearList").val().split("年")[0]) + 1) + "-" + 1 + "-" + $(this).html();
					ergodicDate($("#yearList").val().split("年")[0], ($("#monthList").val().split("月")[0]-1));
					$("#yearList").val((parseInt($("#yearList").val().split("年")[0]) + 1) + "年");
					$("#monthList").val(1 + "月")
				} else {
					selectDate = ($("#yearList").val().split("年")[0]) + "-" + (parseInt($("#monthList").val().split("月")[0]) + 1) + "-" + $(this).html();
					ergodicDate(($("#yearList").val().split("年")[0]), (parseInt($("#monthList").val().split("月")[0]) + 1));
					$("#yearList").val(($("#yearList").val().split("年")[0]) + "年");
					$("#monthList").val((parseInt($("#monthList").val().split("月")[0]) + 1) + "月")
				}
			} else {
				selectDate = $("#yearList").val().split("年")[0] + "-" + $("#monthList").val().split("月")[0] + "-" + $(this).html()
			}
		}
		$("#date").text(selectDate);
		if ($(".select-date").css("display") == "none") {
			$(".select-date").css("display", "block");
		} else {
			$(".select-date").css("display", "none");
		}
		var getDate = $("#yearList").val().split("年")[0] + "-" + $("#monthList").val().split("月")[0] + "-" + $(this).html();
		getSelectDate(getDate);
	});
}
function getSelectDate(result){
	var dateSearch = getTrueDate(result);
	proListForDate(dateSearch);
}
///////////////////////////////////未完待续
function getTrueDate(result){
	if(result.length === 8){
		return dateSearch = result.substring(0,5)+'0'+result.charAt(5)+result.charAt(6)+'0'+result.charAt(7);
	}else if(result.length === 9){
		return false;
	}
}
// 获取当前时间
var beforeDate = false;
var nowDate,nowTime;
function getTime(){
	var myDate = new Date();
	var myYear = myDate.getFullYear();
	var myMonth = myDate.getMonth()+1;
	var myDay = myDate.getDate();
	var myHour = myDate.getHours();
	var myMinute = myDate.getMinutes();
	nowDate = myYear+'-'+myMonth+'-'+myDay;
	nowDate = nowDate.replace(/\-/g, "");
	nowTime = myHour+'-'+myMinute;
	nowTime = nowTime.replace(/\-/g, "");
	var dateSearch=$('#date').text();
	dateSearch=dateSearch.replace(/\-/g, "");
	if(dateSearch<nowDate){
		beforeDate=true;
	}
}

//获取直播地址
function getChannelURL(playType,playChannelId){
	$.ajax({
		url: ip+ '/channel/getChannelUrl',
		type: 'post',
		dataType: 'JSON',
		async:false,
		data: {
			'type1': playType,
			'channelid': playChannelId
		},
		success: function(res){
			if(res.resultCode === 100) {
				url = res.resultData.resultData;
			}
		},
		error: function(err){
			console.log(err);
		}
	})
}
//获取节目单数据
function getProgramList(playType,playChannelName,dateSearch){
	$.ajax({
		url: ip + '/program/getProgramList',
		type: 'post',
		dataType: 'JSON',
		async:false,
		data: {
			'type1': playType,
			'channelname': playChannelName,
			'prodate': dateSearch
		},
		success: function(res){
			if(res.resultCode===100){
				var proid,prourl,proname,prostart,proend;
				var proList = res.resultData.resultData;
				for(var i=0;i<proList.length;i++){
					proid = proList[i].proid;
					prourl = proList[i].defaulturl;
					proname = proList[i].proname;
					prostart = proList[i].start.substring(0,5);
					proend = proList[i].end.substring(0,5);
					if(beforeDate===true){//小于当天，则节目单每行都加上回看按钮
						var proNews='<li data-id="'+proid+'" class="proli"><span class="proname">'+proname+'</span><span  class="protime">'+prostart+'-'+proend+'</span><div class="static">回放</div></li>';
						$('#con_list_ul').append(proNews);
					}else{
						if(nowTime>prostart&&nowTime<proend){//当前直播
							var proNews='<li data-id="'+proid+'" class="proli"><span class="proname">'+proname+'</span><span  class="protime">'+prostart+'-'+proend+'</span><div class="live">直播</div></li>';
							$('#con_list_ul').append(proNews);
						}else if(nowTime<prostart){//今日已播
							var proNews='<li data-id="'+proid+'" class="proli"><span class="proname">'+proname+'</span><span  class="protime">'+prostart+'-'+proend+'</span><div class="static">回放</div></li>';
							$('#con_list_ul').append(proNews);
						}else{
							var proNews='<li data-id="'+proid+'" class="proli"><span class="proname">'+proname+'</span><span  class="protime">'+prostart+'-'+proend+'</span><div class="unplay">未播</div></li>';
							$('#con_list_ul').append(proNews);
						}
					}
				}	
			}
			$('#con_list_ul li div').on('click',function(){
				selectPro(event);
			})
		},
		error: function(err){
			console.log('网络请求失败');
		}
	});
}
//获取左侧频道导航列表
function getChannelList(type){
	$.ajax({
		url: ip + '/channel/getChannelList',
		type: 'post',
		dataType: 'JSON',
		data: {
			'type1': type
		},
		success: function(res){
			if(res.resultCode===100){
				var channelList=res.resultData.resultData;
				var channelListLen=channelList.length;
				for(var j=0;j<channelListLen;j++){//按左右添加TV列表和FM列表
					var channelId=channelList[j].channelid,
							channelName=channelList[j].channelname;
							channelIcon=channelList[j].icon;
					if(type===0){
						var TVNews=`<li data-id="`+channelId+`">
							<div data-id="`+channelId+`" class="tv_logo" style="background-img:url(`+channelIcon+`)"></div>
							<span data-id="`+channelId+`">`+channelName+`</span>
						</li>`;
						$('#TVList').append(TVNews);
					}
					else if(type===1){
						var FMNews=`<li data-id="`+channelId+`">
							<div data-id="`+channelId+`" class="fm_logo" style="background-img:url(`+channelIcon+`)"></div>
							<span data-id="`+channelId+`">`+channelName+`</span>
						</li>`;
						$('#FMList').append(FMNews);
					}
				}
			}	
			$('.leader ul li').on('click',function(event){
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
function getProgramUrl(playType,playProId,dateSearch){
	$.ajax({
		url: ip+ '/program/getProgramUrl',
		type: 'post',
		dataType: 'JSON',
		data: {
			'type1': playType,
			'proId': playProId,
			'data': dateSearch
		},
		success: function(res){
			if(res.resultCode===100){
				url = res.resultData.url;
			}
		},
		error: function(err){
			console.log('网络请求失败');
		}
	})
}