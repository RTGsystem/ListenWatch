// 变速运动 
// 使用方法
// move(移动对象，目的位置，移动速度);
function move(object, dtarget, v) {
	object.time = setInterval(function() {
		var speed = (dtarget - object.offsetLeft) / 10;
		speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
		object.style.left = object.offsetLeft + speed + 'px';
		if (object.style.left == dtarget + 'px') {
			clearInterval(object.time);
		}
	}, v);
}
/////////////////////////////////////////////////////////////////////////////////
// 图片延迟加载
// 使用方法
// <img class="lazy" src="images/blank.gif" data-echo="images/big-1.jpg">
// lazyLoad(离可视区域多少像素的图片可以被加载, 图片延时多少毫秒加载);
window.Echo = (function(window, document, undefined) {
	'use strict';
	var store = [],
		offset, throttle, poll;
	var _inView = function(el) {
		var coords = el.getBoundingClientRect();
		return ((coords.top >= 0 && coords.left >= 0 && coords.top) <= (window.innerHeight || document.documentElement.clientHeight) + parseInt(offset));
	};
	var _pollImages = function() {
		for (var i = store.length; i--;) {
			var self = store[i];
			if (_inView(self)) {
				self.src = self.getAttribute('data-echo');
				store.splice(i, 1);
			}
		}
	};
	var _throttle = function() {
		clearTimeout(poll);
		poll = setTimeout(_pollImages, throttle);
	};
	var init = function(obj) {
		var nodes = document.querySelectorAll('[data-echo]');
		var opts = obj || {};
		offset = opts.offset || 0;
		throttle = opts.throttle || 250;
		for (var i = 0; i < nodes.length; i++) {
			store.push(nodes[i]);
		}
		_throttle();
		if (document.addEventListener) {
			window.addEventListener('scroll', _throttle, false);
		} else {
			window.attachEvent('onscroll', _throttle);
		}
	};
	return {
		init: init,
		render: _throttle
	};
})(window, document);
function lazyLoad(top, second) {
	Echo.init({
	    offset: top,//离可视区域多少像素的图片可以被加载
	　　 throttle: second //图片延时多少毫秒加载
	});
};
/////////////////////////////////////////////////////////////////////////////////
// cookie的增删改查
function setCookie(key, value, iDay) {
    var oDate = new Date();
    oDate.setDate(oDate.getDate() + iDay);
    document.cookie = key + '=' + value + ';expires=' + oDate;
}
function removeCookie(key) {
    setCookie(key, '', -1);//这里只需要把Cookie保质期退回一天便可以删除
}
function getCookie(key) {
    var cookieArr = document.cookie.split('; ');
    for(var i = 0; i < cookieArr.length; i++) {
        var arr = cookieArr[i].split('=');
        if(arr[0] === key) {
            return arr[1];
        }
    }
    return false;
}