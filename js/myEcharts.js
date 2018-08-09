// const ip = 'http://10.20.21.225:8080';
$('#title3-1').click(function() {
    $('#content1-1').hide();
    $('#content1-2').hide();
    $('#content1-3').hide();
    $('#content2-1').hide();
    $('#content2-2').hide();
    $('#content3-1').show();
    $('#content3-2').hide();
	var myChart1 = echarts.init(document.getElementById('echarts1'));
	var arr1 = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
	var arr2 = [10, 52, 200, 334, 390, 330, 220, 10, 52, 200, 334, 390, 330, 220];
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
	        		arr1.push(arr[i].channelname);
	        		arr2.push(arr[i].num);
	        	}
	        }else{
	            alert(res.resultMessage);
	        }
	    },
	    error: function(err){
	        console.log("网络请求失败" + err);
	    }
	});
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
	        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
	            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
	        }
	    },
	    grid: {
	    	top: '18%',
	        left: '3%',
	        right: '3%',
	        bottom: '3%',
	        containLabel: true
	    },
	    xAxis : [
	        {
	            type : 'category',
	            data : arr1,
	            axisTick: {
	                alignWithLabel: true
	            }
	        }
	    ],
	    yAxis : [
	        {
	            type : 'value'
	        }
	    ],
	    series : [
	        {
	            name:'点击量',
	            type:'bar',
	            barWidth: '60%',
	            data: arr2
	        }
	    ]
	};
    myChart1.clear();
	myChart1.setOption(option1);
});
$('#title3-2').click(function() {
    $('#content1-1').hide();
    $('#content1-2').hide();
    $('#content1-3').hide();
    $('#content2-1').hide();
    $('#content2-2').hide();
    $('#content3-1').hide();
    $('#content3-2').show();
	var myChart2 = echarts.init(document.getElementById('echarts2'));
	var arr1 = [820, 932, 901, 934, 1290, 1330, 1320];
	var arr2 = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
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
	        	arr1 = [];
	        	arr2 = [];
	        	for(var i=0; i<arr.length; i++){
	        		arr1.push(res.resultData.num[i]);
	        	}
	        	for(var i=0; i<arr.length; i++){
	        		arr2.push(res.resultData.date[i]);
	        	}
	        }else{
	            alert(res.resultMessage);
	        }
	    },
	    error: function(err){
	        console.log("网络请求失败" + err);
	    }
	});
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
	        data: arr2
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
	        data: arr1,
	        type: 'line'
	    }]
	};
    myChart2.clear();
	myChart2.setOption(option2);
});
function selectForm(){
	var value = document.getElementById('myselect1').value;
	var myChart1 = echarts.init(document.getElementById('echarts1'));
	var arr1 = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
	var arr2 = [10, 52, 200, 334, 390, 330, 220, 10, 52, 200, 334, 390, 330, 220];
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
	        		arr1.push(arr[i].channelname);
	        		arr2.push(arr[i].num);
	        	}
	        }else{
	            alert(res.resultMessage);
	        }
	    },
	    error: function(err){
	        console.log("网络请求失败" + err);
	    }
	});
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
	        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
	            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
	        }
	    },
	    grid: {
	    	top: '18%',
	        left: '3%',
	        right: '3%',
	        bottom: '3%',
	        containLabel: true
	    },
	    xAxis : [
	        {
	            type : 'category',
	            data : arr1,
	            axisTick: {
	                alignWithLabel: true
	            }
	        }
	    ],
	    yAxis : [
	        {
	            type : 'value'
	        }
	    ],
	    series : [
	        {
	            name:'点击量',
	            type:'bar',
	            barWidth: '60%',
	            data: arr2
	        }
	    ]
	};
	myChart1.clear();
	myChart1.setOption(option1);
}
var select1 = document.getElementById('myselect2-1');
var select2 = document.getElementById('myselect2-2');
select1.onchange = function(){
	$.ajax({
	    url: ip + '/channel/getChannelList',
	    type: 'post',
	    dataType: 'JSON',
	    data: {
	        type1: select1.value
	    }, 
	    success: function(res){
	        if (res.resultCode == 100) {
	        	$(select2).empty();
	        	$(select2).append(`<option value="00" checked>请选择信息源</option>`);
	        	var arr = res.resultData.resultData;
	        	for(var i=0; i<arr.length; i++){
	        		$(select2).append(`<option value="${arr[i].channelname}">${arr[i].channelname}</option>`);
	        	}
	        }else{
	            alert(res.resultMessage);
	        }
	    },
	    error: function(err){
	        console.log("网络请求失败" + err);
	    }
	});
}
function selectForm2(){
	var value1 = document.getElementById('myselect2-1').value;
	var value2 = document.getElementById('myselect2-2').value;
	var myChart2 = echarts.init(document.getElementById('echarts2'));
	var title = '浙江卫视点击量走势';
	var arr1 = [820, 932, 901, 934, 1290, 1330, 1320];
	var arr2 = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
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
	        	arr1 = [];
	        	arr2 = [];
	        	for(var i=0; i<res.resultData.num.length; i++){
	        		arr1.push(res.resultData.num[i]);
	        	}
	        	for(var i=0; i<res.resultData.date.length; i++){
	        		arr2.push(res.resultData.date[i]);
	        	}
	        }else{
	            alert(res.resultMessage);
	        }
	    },
	    error: function(err){
	        console.log("网络请求失败" + err);
	    }
	});
	option2 = {
		title : {
	        text: value2 + "点击量走势",
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
	        data: arr2
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
	        data: arr1,
	        type: 'line'
	    }]
	};
	myChart2.clear();
	myChart2.setOption(option2);
}