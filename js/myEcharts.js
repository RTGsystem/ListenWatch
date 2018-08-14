// const ip = 'http://10.20.21.225:8080';
var arr1=[], arr2=[], arr3=[], arr4=[];
function toChinese(date){
	switch(date){
		case 'Jan' : return 1;break;
		case 'Feb' : return 2;break;
		case 'Mar' : return 3;break;
		case 'Apr' : return 4;break;
		case 'May' : return 5;break;
		case 'Jun' : return 6;break;
		case 'Jul' : return 7;break;
		case 'Aug' : return 8;break;
		case 'Sep' : return 9;break;
		case 'Oct' : return 10;break;
		case 'Nov' : return 11;break;
		case 'Dec' : return 12;break;
	}
}
function toSingle(date){
	switch(date){
		case '01' : return 1;break;
		case '02' : return 2;break;
		case '03' : return 3;break;
		case '04' : return 4;break;
		case '05' : return 5;break;
		case '06' : return 6;break;
		case '07' : return 7;break;
		case '08' : return 8;break;
		case '09' : return 9;break;
		default : return date;break;
	}
}
for(var i=7; i>0; i--) {
	arr4.push(toChinese(new Date(new Date() - 24 * 60 * 60 * 1000 * i).toString().split(' ')[1]) + '月' + toSingle(new Date(new Date() - 24 * 60 * 60 * 1000 * i).toString().split(' ')[2]) + '日');
}
var myChart1 = echarts.init(document.getElementById('echarts1'));
var myChart2 = echarts.init(document.getElementById('echarts2'));
option1 = {
	title : {
		text: '多频道点击量统计',
		textStyle: {
			fontSize: 22
		},
		top: '5%',
		bottom: '3%',
		x:'center'
	},
	color: ['#1689ccdd'],
	tooltip : {
		trigger: 'axis',
		axisPointer : {			// 坐标轴指示器，坐标轴触发有效
			type : 'shadow'		// 默认为直线，可选为：'line' | 'shadow'
		}
	},
	grid: {
		top: '18%',
		left: '3%',
		right: '3%',
		bottom: '3%',
		containLabel: true
	},
	xAxis : [{
		type : 'category',
		data : arr1,
		axisTick: {
			alignWithLabel: true
		}
	}],
	yAxis : [{
		type : 'value'
	}],
	series : [{
		name:'点击量',
		type:'bar',
		barWidth: '60%',
		data: arr2
	}]
};
option2 = {
	title : {
		text: '浙江卫视点击量走势',
		textStyle: {
			fontSize: 22
		},
		top: '5%',
		bottom: '3%',
		x:'center'
	},
	tooltip: {
		trigger: 'axis',
		axisPointer: {
			type: 'cross'
		}
	},
	xAxis: {
		type: 'category',
		data: arr4
	},
	yAxis: {
		type: 'value'
	},
	grid: {
		top: '18%',
		left: '3%',
		right: '3%',
		bottom: '3%',
		containLabel: true
	},
	series: [{
		data: arr3,
		type: 'line'
	}]
};
$('#title3-1').click(function() {
	$('#content1-0').hide();
	$('#content1-1').hide();
	$('#content1-2').hide();
	$('#content1-3').hide();
	$('#content2-1').hide();
	$('#content2-2').hide();
	$('#content2-3').hide();
	$('#content3-1').show();
	$('#content3-2').hide();
	myChart1.setOption(option1);
	$.ajax({
		url: ip + '/form/getFormByType',
		type: 'post',
		dataType: 'JSON',
		data: {
			type1: 0
		}, 
		success: function(res){
			if (res.resultCode == 100) {
				var arr = res.resultData.resultData;
				arr1 = [];
				arr2 = [];
				for(var i=0; i<arr.length; i++){
					arr1.push(arr[i].channelid);
					arr2.push(arr[i].num);
				}
				myChart1.setOption({
					xAxis : [{
						data : arr1
					}],
					series : [{
						data: arr2
					}]
				});
			}else{
				alert(res.resultMessage);
			}
		},
		error: function(err){
			console.log("网络请求失败" + err);
		}
	});
});
$('#title3-2').click(function() {
	$('#content1-0').hide();
	$('#content1-1').hide();
	$('#content1-2').hide();
	$('#content1-3').hide();
	$('#content2-1').hide();
	$('#content2-2').hide();
	$('#content2-3').hide();
	$('#content3-1').hide();
	$('#content3-2').show();
	myChart2.setOption(option2);
	$.ajax({
		url: ip + '/form/getFormByChannelId',
		type: 'post',
		dataType: 'JSON',
		data: {
			type1: 0,
			channelname: '浙江卫视'
		}, 
		success: function(res){
			if (res.resultCode == 100) {
				arr3 = res.resultData.resultData;
				myChart2.setOption({
					series: [{
						data: arr3
					}]
				});
			}else{
				alert(res.resultMessage);
			}
		},
		error: function(err){
			console.log("网络请求失败" + err);
		}
	});
});
function selectForm(){
	var value = document.getElementById('myselect1').value;
	if (value == 2) {
		alert('请先选择信息源类型！');
	}else{
		$.ajax({
			url: ip + '/form/getFormByType',
			type: 'post',
			dataType: 'JSON',
			data: {
				type1: value
			}, 
			success: function(res){
				if (res.resultCode == 100) {
					var arr = res.resultData.resultData;
					arr1 = [];
					arr2 = [];
					for(var i=0; i<arr.length; i++){
						arr1.push(arr[i].channelid);
						arr2.push(arr[i].num);
					}
					myChart1.setOption({
						xAxis : [{
							data : arr1
						}],
						series : [{
							data: arr2
						}]
					});
				}else{
					alert(res.resultMessage);
				}
			},
			error: function(err){
				console.log("网络请求失败" + err);
			}
		});
	}
}
var select1 = document.getElementById('myselect2-1');
var select2 = document.getElementById('myselect2-2');
select1.onchange = function(){
	if (select1.value == 0) {
		$(select2).empty();
		$(select2).append(`<option value="0" checked>请选择信息源</option>`);
		for(var i = 0; i < list1.length; i++){
			$(select2).append(`<option value="${list1[i]}">${list1[i]}</option>`);
		}
	}else if (select1.value == 1){
		$(select2).empty();
		$(select2).append(`<option value="0" checked>请选择信息源</option>`);
		for(var i = 0; i < list2.length; i++){
			$(select2).append(`<option value="${list2[i]}">${list2[i]}</option>`);
		}
	}else{
		$(select2).empty();
        $(select2).append(`<option value="0" checked>请选择信息源</option>`);
	}
}
function selectForm2(){
	if (select1.value == 2) {
		alert('请选择信息源类型！');
	}else if(select2.value == 0){
		alert('请选择信息源名称！');
	}else{
		var value1 = document.getElementById('myselect2-1').value;
		var value2 = document.getElementById('myselect2-2').value;
		$.ajax({
			url: ip + '/form/getFormByChannelId',
			type: 'post',
			dataType: 'JSON',
			data: {
				type1: value1,
				channelname: value2
			}, 
			success: function(res){
				if (res.resultCode == 100) {
					arr3 = res.resultData.resultData;
					myChart2.setOption({
						title : {
							text: value2 + '点击量走势'
						},
						series: [{
							data: arr3
						}]
					});
				}else{
					alert(res.resultMessage);
				}
			},
			error: function(err){
				console.log("网络请求失败" + err);
			}
		});
	}
}