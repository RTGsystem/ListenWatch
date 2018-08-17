const ip = 'http://10.20.21.225:8080';
// const ip = '';
var item = document.getElementsByClassName('nav-item');
var list1 = [];
var list2 = [];
window.onload = function(){
    // 侧边栏显示隐藏开始
    // if(getCookie('userid') == '' && getCookie('userid') == false){
    //   alert('您还未登录请先登录');
    //   window.location.href = './index.html';
    //   return false;
    // }
    $.ajax({
        url: ip+ '/user/getUserByUserId',
        type: 'post',
        dataType: 'JSON',
        data: {
            userid: getCookie('userid')
        },
        success: function(res){
            if(res.resultCode==100){
                if(res.resultData.resultData[0].identity == 0 && res.resultData.resultData[0].formpurview == 0){
                    alert('您不具有管理员功能且不能观看频道报表，无法访问本页面');
                    window.opener = null;
                    window.open('','_self');
                    window.close();
                    window.location.href = './main.html';
                }
                if(res.resultData.resultData[0].identity == 0 && res.resultData.resultData[0].formpurview == 1){
                    item[0].style.display = 'none';
                    item[1].style.display = 'none';
                }
                if(res.resultData.resultData[0].tvdownload == 0){
                    //用户具有下载tv权限
                }
                if(res.resultData.resultData[0].fmdownload == 0){
                    //用户具有下载fm权限
                }
            }
        },
        error: function(err){
            console.log('网络请求失败，无法登录');
            window.location.href = './index.html';
        }
    });
    $.ajax({
        url: ip + '/channel/getChannelList',
        type: 'post',
        dataType: 'JSON',
        data: {
            type1: 0
        }, 
        success: function(res){
            if (res.resultCode == 100) {
                var arr = res.resultData.resultData;
                for(var i=0; i<arr.length; i++){
                    list1.push(arr[i].channelname);
                }
            }else{
                alert(res.resultMessage);
            }
        },
        error: function(err){
            console.log("网络请求失败" + err);
        }
    });
    $.ajax({
        url: ip + '/channel/getChannelList',
        type: 'post',
        dataType: 'JSON',
        data: {
            type1: 1
        }, 
        success: function(res){
            if (res.resultCode == 100) {
                var arr = res.resultData.resultData;
                for(var i=0; i<arr.length; i++){
                    list2.push(arr[i].channelname);
                }
            }else{
                alert(res.resultMessage);
            }
        },
        error: function(err){
            console.log("网络请求失败" + err);
        }
    });
    select();
    $('#title1-1').click(function() {
        $.ajax({
            url: ip+ '/user/getUserByUserId',
            type: 'post',
            dataType: 'JSON',
            data: {
                userid: getCookie('userid')
            },
            success: function(res){
                if(res.resultCode==100){
                    if(res.resultData.resultData[0].identity != 1){
                        alert('您不具有管理员权限，无法使用本功能');
                        window.location.href = './main.html';
                    }
                }
            },
            error: function(err){
                console.log('网络请求失败');
            }
        });
        $('#content1-0').hide();
        $('#content1-1').show();
        $('#content1-2').hide();
        $('#content1-3').hide();
        $('#content2-1').hide();
        $('#content2-2').hide();
        $('#content2-3').hide();
        $('#content3-1').hide();
        $('#content3-2').hide();
    });
    $('#title1-2').click(function() {
        $.ajax({
            url: ip+ '/user/getUserByUserId',
            type: 'post',
            dataType: 'JSON',
            data: {
                userid: getCookie('userid')
            },
            success: function(res){
                if(res.resultCode==100){
                    if(res.resultData.resultData[0].identity != 1){
                        alert('您不具有管理员权限，无法使用本功能');
                        window.location.href = './main.html';
                    }else{
                        $('#content1_2').empty();
                        $('#select_input').val('');
                        $.ajax({
                            url: ip + '/user/getUsers',
                            type: 'post',
                            dataType: 'JSON',
                            data: {
                                pn: 1
                            },
                            success: function(res){
                                function check(boolean){
                                    return boolean == 1 ? '是' : '否';
                                }
                                if (res.resultCode == 100) {
                                    $('#content1_2').empty();
                                    $(".tcdPageCode").createPage({
                                        pageCount: res.resultData.page.pages,
                                        current: 1,
                                        backFn:function(p){
                                            if (!p) {
                                                p = 1;
                                            }
                                            $.ajax({
                                                url: ip + '/user/getUsers',
                                                type: 'post',
                                                dataType: 'JSON',
                                                data: {
                                                    pn: p
                                                },
                                                success: function(res){
                                                    function check(boolean){
                                                        return boolean == 1 ? '是' : '否';
                                                    }
                                                    if (res.resultCode == 100) {
                                                        $('#content1_2').empty();
                                                        let arr_temp = res.resultData.resultData;
                                                        for(let i=0;i<arr_temp.length;i++){
                                                            let content = `<ul class='screen-1-ul'>
                                                                <li class='screen-1-li right-border' style='width: 15%'>${arr_temp[i].userid}</li>
                                                                <li class='screen-1-li right-border' style='width: 15%'>${check(arr_temp[i].identity)}</li>
                                                                <li class='screen-1-li right-border' style='width: 15%'>${arr_temp[i].username}</li>
                                                                <li class='screen-1-li right-border' style='width: 29%'>${arr_temp[i].department}</li>
                                                                <li class='screen-1-li' style='width: 25%'>
                                                                    <button class='screen-1-revise' onclick='toggle_button_revise(event)'>修改</button> 
                                                                    <button class='screen-1-delete' style='background: #c30' onclick='delete_ul(event)'>删除</button>
                                                                </li>
                                                            </ul>`;
                                                            $('#content1_2').append(content);
                                                        }
                                                    }else{
                                                        $('#content1_2').empty();
                                                        alert(res.resultMessage);
                                                    }
                                                },
                                                error: function(err){
                                                    console.log("网络请求失败" + err);
                                                }
                                            });
                                        } 
                                    });
                                    let arr_temp = res.resultData.resultData;
                                    for(let i=0;i<arr_temp.length;i++){
                                        let content = `<ul class='screen-1-ul'>
                                            <li class='screen-1-li right-border' style='width: 15%'>${arr_temp[i].userid}</li>
                                            <li class='screen-1-li right-border' style='width: 15%'>${check(arr_temp[i].identity)}</li>
                                            <li class='screen-1-li right-border' style='width: 15%'>${arr_temp[i].username}</li>
                                            <li class='screen-1-li right-border' style='width: 29%'>${arr_temp[i].department}</li>
                                            <li class='screen-1-li' style='width: 25%'>
                                                <button class='screen-1-revise' onclick='toggle_button_revise(event)'>修改</button> 
                                                <button class='screen-1-delete' style='background: #c30' onclick='delete_ul(event)'>删除</button>
                                            </li>
                                        </ul>`;
                                        $('#content1_2').append(content);
                                    }
                                }else{
                                    $('#content1_2').empty();
                                    alert(res.resultMessage);
                                }
                            },
                            error: function(err){
                                console.log("网络请求失败" + err);
                            }
                        });
                    }
                }
            },
            error: function(err){
                console.log('网络请求失败');
            }
        });
        $('.tcdPageCode').show();
        $('#content1-0').hide();
        $('#content1-1').hide();
        $('#content1-2').show();
        $('#content1-3').hide();
        $('#content2-1').hide();
        $('#content2-2').hide();
        $('#content2-3').hide();
        $('#content3-1').hide();
        $('#content3-2').hide();
    });
    $('#title1-3').click(function() {
        $.ajax({
            url: ip+ '/user/getUserByUserId',
            type: 'post',
            dataType: 'JSON',
            data: {
                userid: getCookie('userid')
            },
            success: function(res){
                if(res.resultCode==100){
                    flag1 = 1;
                    if(res.resultData.resultData[0].identity != 1){
                        alert('您不具有管理员权限，无法使用本功能');
                        window.location.href = './main.html';
                    }else{
                        $('#select_input2').val('');
                        $('#list').empty();
                        $.ajax({
                            url: ip + '/user/getUsers',
                            type: 'post',
                            dataType: 'JSON',
                            data: {
                            },
                            success: function(res){
                                if (res.resultCode == 100) {
                                    let arr_temp = res.resultData.resultData;
                                    function check(boolean){
                                        return boolean == 1 ? "checked='checked'" : "";
                                    }
                                    for(let i=0;i<arr_temp.length;i++){
                                        let content = `<ul class='screen-1-ul'>
                                            <li class='screen-1-li right-border' style='width: 12%'>${arr_temp[i].userid}</li>
                                            <li class='screen-1-li right-border' style='width: 9%'>${arr_temp[i].username}</li>
                                            <li class='screen-1-li right-border' style='width: 13%'>${arr_temp[i].department}</li>
                                            <li class='screen-1-li right-border' style='width: 13%'>
                                                <input class='watchTV allbtn' type='checkbox' name='box-watch' ${check(arr_temp[i].tvpurview)}/>
                                            </li>
                                            <li class="screen-1-li right-border" style="width: 13%">
                                                <input class='loadTV allbtn' type='checkbox' name='box-load1' ${check(arr_temp[i].tvdownload)}/>
                                            </li>
                                            <li class="screen-1-li right-border" style="width: 13%">
                                                <input class='listenFM allbtn' type='checkbox' name='box-listen' ${check(arr_temp[i].fmpurview)}/>
                                            </li>
                                            <li class="screen-1-li right-border" style="width: 13%">
                                                <input class='loadFM allbtn' type='checkbox' name='box-load2' ${check(arr_temp[i].fmdownload)}/>
                                            </li>
                                            <li class="screen-1-li" style="width: 13%">
                                                <input class='checkdata allbtn' type='checkbox' name='box-data' ${check(arr_temp[i].formpurview)}/>
                                            </li>
                                        </ul>`;
                                        $('#list').append(content);
                                    }
                                }else{
                                    $('#list').empty();
                                    alert(res.resultMessage);
                                }
                            },
                            error: function(err){
                                console.log("网络请求失败" + err);
                            }
                        });
                    }
                }
            },
            error: function(err){
                console.log('网络请求失败');
            }
        });
        $('#content1-0').hide();
        $('#content1-1').hide();
        $('#content1-2').hide();
        $('#content1-3').show();
        $('#content2-1').hide();
        $('#content2-2').hide();
        $('#content2-3').hide();
        $('#content3-1').hide();
        $('#content3-2').hide();
    });
    $('#title2-1').click(function() {
        $.ajax({
            url: ip+ '/user/getUserByUserId',
            type: 'post',
            dataType: 'JSON',
            data: {
                userid: getCookie('userid')
            },
            success: function(res){
                if(res.resultCode==100){
                    if(res.resultData.resultData[0].identity != 1){
                        alert('您不具有管理员权限，无法使用本功能');
                        window.location.href = './main.html';
                    }
                }
            },
            error: function(err){
                console.log('网络请求失败');
            }
        });
        $('#content1-0').hide();
        $('#content1-1').hide();
        $('#content1-2').hide();
        $('#content1-3').hide();
        $('#content2-1').show();
        $('#content2-2').hide();
        $('#content2-3').hide();
        $('#content3-1').hide();
        $('#content3-2').hide();
    });
    $('#title2-2').click(function() {
        $.ajax({
            url: ip+ '/user/getUserByUserId',
            type: 'post',
            dataType: 'JSON',
            data: {
                userid: getCookie('userid')
            },
            success: function(res){
                if(res.resultCode==100){
                    if(res.resultData.resultData[0].identity != 1){
                        alert('您不具有管理员权限，无法使用本功能');
                        window.location.href = './main.html';
                    }else{
                        $('#select_input3').val('');
                        $('#content2_2').empty();
                        $.ajax({
                            url: ip + '/user/getChannelList',
                            type: 'post',
                            dataType: 'JSON',
                            data: {
                            },
                            success: function(res){
                                function check(boolean){
                                    return boolean == 0 ? "TV" : "FM";
                                }
                                if (res.resultCode == 100) {
                                    let arr_temp = res.resultData.resultData;
                                    for(let i=0;i<arr_temp.length;i++){
                                        let content = `<ul class='screen-1-ul' channelid="${arr_temp[i].channelid}">
                                            <li class='screen-1-li right-border' style='width: 20%'>${arr_temp[i].channelname}</li>
                                            <li class='screen-1-li right-border' style='width: 15%'>${check(arr_temp[i].type)}</li>
                                            <li class='screen-1-li right-border' style='width: 30%'>${arr_temp[i].url}</li>
                                            <li class='screen-1-li right-border' style='width: 15%'>${arr_temp[i].saveday}</li>
                                            <li class='screen-1-li' style='width: 19%'>
                                                <button class='screen-1-revise' onclick='toggle_button_revise_2_2(event)'>修改</button> 
                                                <button class='screen-1-delete' style='background: #c30' onclick='delete_ul_2_2(event)'>删除</button>
                                            </li>
                                        </ul>`;
                                        $('#content2_2').append(content);
                                    }
                                }else{
                                    $('#content2_2').empty();
                                    alert(res.resultMessage);
                                }
                            },
                            error: function(err){
                                console.log("网络请求失败" + err);
                            }
                        });
                    }
                }
            },
            error: function(err){
                console.log('网络请求失败');
            }
        });
        $('#content1-0').hide();
        $('#content1-1').hide();
        $('#content1-2').hide();
        $('#content1-3').hide();
        $('#content2-1').hide();
        $('#content2-2').show();
        $('#content2-3').hide();
        $('#content3-1').hide();
        $('#content3-2').hide();
    });
    $('#title2-3').click(function() {
        $('#nowdate2').text(getDateBack(getNowDate()));
        $.ajax({
            url: ip + '/program/getProgramList',
            type: 'post',
            dataType: 'JSON',
            data: {
                'type1': 0,
                'channelname': '浙江卫视',
                'prodate': getNowDate()
            },
            success: function(res){
                if(res.resultCode===100){
                    $('#content2_3').empty();
                    function check(time){
                        if(time < 10){
                            time = '0' + time;
                        }
                        return time;
                    }
                    var nowTime = check(new Date().getHours()) + '' + check(new Date().getMinutes()) + '' + check(new Date().getSeconds());
                    var arr = res.resultData.resultData;
                    for(var i=0; i<arr.length; i++){
                        if (arr[i].proname.search('广告') != -1||arr[i].proname.search('宣传片') != -1) {
                            if (arr[i].end.replace(/\:/g, "") < nowTime) {
                                var temp = `<ul class="screen-1-ul">
                                    <li class="screen-1-li right-border" style="width: 35%">${arr[i].proname}</li>
                                    <li class="screen-1-li right-border" style="width: 15%">${arr[i].prodate}</li>
                                    <li class="screen-1-li right-border" style="width: 24%">${arr[i].start}-${arr[i].end}</li>
                                    <li class="screen-1-li" style="width: 25%;color: #246ab1;">已播出</li>
                                </ul>`
                                $('#content2_3').append(temp);
                            }else if(arr[i].start.replace(/\:/g, "") > nowTime){
                                var temp = `<ul class="screen-1-ul">
                                    <li class="screen-1-li right-border" style="width: 35%">${arr[i].proname}</li>
                                    <li class="screen-1-li right-border" style="width: 15%">${arr[i].prodate}</li>
                                    <li class="screen-1-li right-border" style="width: 24%">${arr[i].start}-${arr[i].end}</li>
                                    <li class="screen-1-li" style="width: 25%">未播出</li>
                                </ul>`
                                $('#content2_3').append(temp);
                            }else{
                                var temp = `<ul class="screen-1-ul">
                                    <li class="screen-1-li right-border" style="width: 35%">${arr[i].proname}</li>
                                    <li class="screen-1-li right-border" style="width: 15%">${arr[i].prodate}</li>
                                    <li class="screen-1-li right-border" style="width: 24%">${arr[i].start}-${arr[i].end}</li>
                                    <li class="screen-1-li" style="width: 25%;color: #c55f1b;">正在播出</li>
                                </ul>`
                                $('#content2_3').append(temp);
                            }
                        }
                    }
                }else{
                    alert('未保存此频道当日节目单');
                }
            },
            error: function(err){
                console.log('网络请求失败');
            }
        });
        $('#content1-0').hide();
        $('#content1-1').hide();
        $('#content1-2').hide();
        $('#content1-3').hide();
        $('#content2-1').hide();
        $('#content2-2').hide();
        $('#content2-3').show();
        $('#content3-1').hide();
        $('#content3-2').hide();
    });
    var select3_1 = document.getElementById('myselect3-1');
    var select3_2 = document.getElementById('myselect3-2');
    select3_1.onchange = function(){
        if (select3_1.value == 0) {
            $(select3_2).empty();
            $(select3_2).append(`<option value="0" checked>请选择信息源</option>`);
            for(var i = 0; i < list1.length; i++){
                $(select3_2).append(`<option value="${list1[i]}">${list1[i]}</option>`);
            }
        }else if (select3_1.value == 1){
            $(select3_2).empty();
            $(select3_2).append(`<option value="0" checked>请选择信息源</option>`);
            for(var i = 0; i < list2.length; i++){
                $(select3_2).append(`<option value="${list2[i]}">${list2[i]}</option>`);
            }
        }else{
            $(select3_2).empty();
            $(select3_2).append(`<option value="0" checked>请选择信息源</option>`);
        }
    }
    // 侧边栏显示隐藏结束
    // 侧边栏效果开始
    // nav收缩展开
    $('.nav-item>a').on('click',function(){
        if (!$('.nav').hasClass('nav-mini')) {
            if ($(this).next().css('display') == "none") {
                //展开未展开
                $('.nav-item').children('ul').slideUp(300);
                $(this).next('ul').slideDown(300);
                $(this).parent('li').addClass('nav-show').siblings('li').removeClass('nav-show');
                
            }else{
                //收缩已展开
                $(this).next('ul').slideUp(300);
                $('.nav-item.nav-show').removeClass('nav-show');
            }
        }
    });
    //nav-mini切换
    $('#mini').on('click',function(){
        if (!$('.nav').hasClass('nav-mini')) {
            $('.nav-item.nav-show').removeClass('nav-show');
            $('.nav-item').children('ul').removeAttr('style');
            $('.nav').addClass('nav-mini');
            $('.body__screen-all').animate({left:'60px',paddingRight:'75px'},'fast');
            // $('.body__screen-all ').css('left','60px');
            // $('.body__screen-all ').css('padding-right','75px');
        }else{
            $('.nav').removeClass('nav-mini');
            // $('.body__screen-all ').css('left','200px');
            // $('.body__screen-all ').css('padding-right','215px');
            $('.body__screen-all').animate({left:'200px',paddingRight:'215px'},'fast');
        }
    });
    // 侧边栏效果结束
    $("#selectkey").on('click',function(){
        let select_val = $('#selectkey option:checked').val();
        $('#select_input').attr('placeholder','请输入'+select_val);
    });
    $("#selectkey2").on('click',function(){
        let select_val = $('#selectkey2 option:checked').val();
        $('#select_input2').attr('placeholder','请输入'+select_val);
    });
    $("#selectkey3").on('click',function(){
        let select_val = $('#selectkey3 option:checked').val();
        $('#select_input3').attr('placeholder','请输入'+select_val);
    });
    let dv = document.getElementById('set');
    let dv2 = document.getElementById('set2');
    let dv3 = document.getElementById('set3');
    let dv4 = document.getElementById('set4');
    let h = document.documentElement.clientHeight - $('.header').eq(0).height() - 50;
    dv.style.height = h +'px';
    dv2.style.height = h +'px';
    dv3.style.height = h +'px';
    dv4.style.height = h +'px';
    return false;
}
// 添加用户开始1.1
function addsuccess(){
    if($('#input1-1_1').val() == ''||$('#input2-1_1').val() == ''||$('#input3-1_1').val() == ''||$('#input4-1_1').val() == ''||$('#select1-1_1').val() == 0){
        alert('您输入的信息不完整，请继续输入');
    }else if($('#input3-1_1').val() != $('#input4-1_1').val()){
        alert('您两次输入的密码不一致');
    }else if($('#input2-1_1').val().length < 4){
        alert('您的用户名应不少于4位');
    }else if(!(/^[0-9]{1,9}$/.test($('#input2-1_1').val()))){
        alert('您输入的用户名需要是纯数字且不大于9位');
    }else{
        function check(boolean){
            return boolean == true ? 1 : 0;
        }
        $.ajax({
            url: ip + '/user/addUser',
            type: 'post',
            dataType: 'JSON',
            data: {
                username: $('#input1-1_1').val(),
                userid: $('#input2-1_1').val(),
                department: $('#select1-1_1').find("option:selected").text(),
                password: hex_md5($('#input3-1_1').val()),
                tvdownload: check($('#checkbox1').is(':checked')),
                fmdownload: check($('#checkbox2').is(':checked')),
                formpurview: check($('#checkbox3').is(':checked')),
                tvpurview: check($('#checkbox4').is(':checked')),
                fmpurview: check($('#checkbox5').is(':checked')),
                identity: check($('#Check2').is(':checked'))
            },
            success: function(res){
                if (res.resultCode == 100) {
                    alert('用户添加成功');
                    window.location.href='./admin.html';
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
// 添加用户结束1.1
// 用户列表开始1.2
function delete_ul(ev) {
    let deleteConfirm = confirm(`确定要删除该用户${ev.target.parentNode.parentNode.firstElementChild.nextElementSibling.innerHTML}吗?`);
    if(deleteConfirm == true){
        //请求数据库删除该用户
        $.ajax({
            url: ip + '/user/deleteUser',
            type: 'post',
            dataType: 'JSON',
            data: {
                userid: ev.target.parentNode.parentNode.firstElementChild.innerHTML
            },
            success: function(res){
                if (res.resultCode == 100) {
                    alert('用户删除成功');
                }else{
                    alert(res.resultMessage);
                }
            },
            error: function(err){
                console.log("网络请求失败" + err);
            }
        });
        $(ev.target).parent().parent().detach();
    }else{
        return false;
    }
}
function toggle_button_revise(ev){
    let $target = $(ev.target);
    let $targetText = $(ev.target).text();
    if($targetText == "保存"){
        //请求保存并提示保存成功与否
        $target.text('修改');
        let t1 = ev.target.parentNode.parentNode.firstElementChild.innerHTML;
        let t2 = $target.parent().prev().prev().val();
        let t3 = $target.parent().prev().val();
        $target.parent().prev().replaceWith(`<li class='screen-1-li right-border' style='width: 29%'>${t3}</li>`);
        $target.parent().prev().prev().replaceWith(`<li class='screen-1-li right-border' style='width: 15%'>${t2}</li>`);
        $target.parent().parent().css("background-color","#fff").children().css("background-color","#fff");
        $.ajax({
            url: ip + '/user/updateUser',
            type: 'post',
            dataType: 'JSON',
            data: {
                userid: t1,
                username: t2,
                department: t3
            }, 
            success: function(res){
                if (res.resultCode == 100) {
                    alert('用户信息修改成功');
                }else{
                    alert(res.resultMessage);
                }
            },
            error: function(err){
                console.log("网络请求失败" + err);
            }
        });
    }else{
        $target.text('保存');
        $target.parent().prev().replaceWith('<input type="text" class="yr_input" style="width: 29%" value='+$target.parent().prev().text()+'>');
        $target.parent().prev().prev().replaceWith('<input type = "text" style="width: 15%" class="yr_input" value='+$target.parent().prev().prev().text()+'>');
        $target.parent().parent().css("background-color","#ccc").children().css("background-color","#ccc");
    }
}
function selectUsers(){
    let val = $('#selectkey').find(':checked').val();
    let url = '';
    let key = '';
    let value = $('#select_input').val();
    if (val == ''){
        url = '/user/getUsers';
        key = '';
        $('.tcdPageCode').show();
    }else if (val == '用户名') {
        url = '/user/getUserByUserId';
        key = 'userid';
        if(!(/^[0-9]{1,9}$/.test(value))){
            $('#content1_2').empty();
            alert('没有查询到该用户');
            $('.tcdPageCode').hide();
            return false;
        }
        $('.tcdPageCode').hide();
    }else if(val == '姓名'){
        url = '/user/getUserByUsername';
        key = 'username';
        $('.tcdPageCode').hide();
    }else if(val == '所属部门'){
        url = '/user/getUserByDept';
        key = 'department';
        $('.tcdPageCode').show();
    }else{
        url = '';
        key = '';
        $('.tcdPageCode').hide();
    }
    let json = {};
    json[key] = value;
    if(val == '所属部门'){
        json['pn'] = 1;
        $.ajax({
            url: ip + url,
            type: 'post',
            dataType: 'JSON',
            data: json,
            success: function(res){
                if (res.resultCode == 100) {
                    function check(boolean){
                        return boolean == 1 ? '是' : '否';
                    }
                    $(".tcdPageCode").createPage({
                        pageCount: res.resultData.page.pages,
                        current:1,
                        backFn:function(p){
                            if (!p) {
                                p = 1;
                            }
                            json['pn'] = p;
                            $.ajax({
                                url: ip + url,
                                type: 'post',
                                dataType: 'JSON',
                                data: json,
                                success: function(res){
                                    if (res.resultCode == 100) {
                                        function check(boolean){
                                            return boolean == 1 ? '是' : '否';
                                        }
                                        $('#content1_2').empty();
                                        let arr_temp = res.resultData.resultData;
                                        for(let i=0;i<arr_temp.length;i++){
                                            let content = `<ul class='screen-1-ul'>
                                                <li class='screen-1-li right-border' style='width: 15%'>${arr_temp[i].userid}</li>
                                                <li class='screen-1-li right-border' style='width: 15%'>${check(arr_temp[i].identity)}</li>
                                                <li class='screen-1-li right-border' style='width: 15%'>${arr_temp[i].username}</li>
                                                <li class='screen-1-li right-border' style='width: 29%'>${arr_temp[i].department}</li>
                                                <li class='screen-1-li' style='width: 25%'>
                                                    <button class='screen-1-revise' onclick='toggle_button_revise(event)'>修改</button> 
                                                    <button class='screen-1-delete' style='background: #c30' onclick='delete_ul(event)'>删除</button>
                                                </li>
                                            </ul>`;
                                            $('#content1_2').append(content);
                                        }
                                    }else{
                                        $('#content1_2').empty();
                                        alert(res.resultMessage);
                                    }
                                },
                                error: function(err){
                                    console.log("网络请求失败" + err);
                                }
                            });
                        }
                    });
                    $('#content1_2').empty();
                    let arr_temp = res.resultData.resultData;
                    for(let i=0;i<arr_temp.length;i++){
                        let content = `<ul class='screen-1-ul'>
                            <li class='screen-1-li right-border' style='width: 15%'>${arr_temp[i].userid}</li>
                            <li class='screen-1-li right-border' style='width: 15%'>${check(arr_temp[i].identity)}</li>
                            <li class='screen-1-li right-border' style='width: 15%'>${arr_temp[i].username}</li>
                            <li class='screen-1-li right-border' style='width: 29%'>${arr_temp[i].department}</li>
                            <li class='screen-1-li' style='width: 25%'>
                                <button class='screen-1-revise' onclick='toggle_button_revise(event)'>修改</button> 
                                <button class='screen-1-delete' style='background: #c30' onclick='delete_ul(event)'>删除</button>
                            </li>
                        </ul>`;
                        $('#content1_2').append(content);
                    }
                }else{
                    $('#content1_2').empty();
                    alert(res.resultMessage);
                }
            },
            error: function(err){
                console.log("网络请求失败" + err);
            }
        });
    }else{
        $.ajax({
            url: ip + url,
            type: 'post',
            dataType: 'JSON',
            data: json,
            success: function(res){
                if (res.resultCode == 100) {
                    function check(boolean){
                        return boolean == 1 ? '是' : '否';
                    }
                    $('#content1_2').empty();
                    let arr_temp = res.resultData.resultData;
                    for(let i=0;i<arr_temp.length;i++){
                        let content = `<ul class='screen-1-ul'>
                            <li class='screen-1-li right-border' style='width: 15%'>${arr_temp[i].userid}</li>
                            <li class='screen-1-li right-border' style='width: 15%'>${check(arr_temp[i].identity)}</li>
                            <li class='screen-1-li right-border' style='width: 15%'>${arr_temp[i].username}</li>
                            <li class='screen-1-li right-border' style='width: 29%'>${arr_temp[i].department}</li>
                            <li class='screen-1-li' style='width: 25%'>
                                <button class='screen-1-revise' onclick='toggle_button_revise(event)'>修改</button> 
                                <button class='screen-1-delete' style='background: #c30' onclick='delete_ul(event)'>删除</button>
                            </li>
                        </ul>`;
                        $('#content1_2').append(content);
                    }
                }else{
                    $('#content1_2').empty();
                    alert(res.resultMessage);
                }
            },
            error: function(err){
                console.log("网络请求失败" + err);
            }
        });
    }
}
// 用户列表结束1.2
// 用户权限管理开始1.3
function changeState(num, isChecked){
    let arr = [];
    switch(num){
        case 0: arr = document.getElementsByClassName("watchTV");break;
        case 1: arr = document.getElementsByClassName("loadTV");break;
        case 2: arr = document.getElementsByClassName("listenFM");break;
        case 3: arr = document.getElementsByClassName("loadFM");break;
        case 4: arr = document.getElementsByClassName("checkdata");break;
    }
    for(i in arr) {
        arr[i].checked = isChecked;
    }
}
function checkCancel() {
    $('#list').empty();
    $.ajax({
        url: ip + '/user/getUsers',
        type: 'post',
        dataType: 'JSON',
        data: {
        },
        success: function(res){
            if (res.resultCode == 100) {
                let arr_temp = res.resultData.resultData;
                function check(boolean){
                    return boolean == 1 ? "checked='checked'" : "";
                }
                for(let i=0;i<arr_temp.length;i++){
                    let content = `<ul class='screen-1-ul'>
                        <li class='screen-1-li right-border' style='width: 12%'>${arr_temp[i].userid}</li>
                        <li class='screen-1-li right-border' style='width: 9%'>${arr_temp[i].username}</li>
                        <li class='screen-1-li right-border' style='width: 13%'>${arr_temp[i].department}</li>
                        <li class='screen-1-li right-border' style='width: 13%'>
                            <input class='watchTV allbtn' type='checkbox' name='box-watch' ${check(arr_temp[i].tvpurview)}/>
                        </li>
                        <li class="screen-1-li right-border" style="width: 13%">
                            <input class='loadTV allbtn' type='checkbox' name='box-load1' ${check(arr_temp[i].tvdownload)}/>
                        </li>
                        <li class="screen-1-li right-border" style="width: 13%">
                            <input class='listenFM allbtn' type='checkbox' name='box-listen' ${check(arr_temp[i].fmpurview)}/>
                        </li>
                        <li class="screen-1-li right-border" style="width: 13%">
                            <input class='loadFM allbtn' type='checkbox' name='box-load2' ${check(arr_temp[i].fmdownload)}/>
                        </li>
                        <li class="screen-1-li" style="width: 13%">
                            <input class='checkdata allbtn' type='checkbox' name='box-data' ${check(arr_temp[i].formpurview)}/>
                        </li>
                    </ul>`;
                    $('#list').append(content);
                }
            }else{
                $('#list').empty();
                alert(res.resultMessage);
            }
        },
        error: function(err){
            console.log("网络请求失败" + err);
        }
    });
}
function checkSave(){
    function parse(boolean){
        return boolean == true ? 1 : 0;
    }
    var list = document.getElementById('list');
    var arr = [];
    var ul_arr = list.children;
    for (var i = 0; i < ul_arr.length; i++){
        var json = {};
        var li = ul_arr[i].children;
        json['userid'] = li[0].innerHTML;
        json['tvpurview'] = parse(li[3].children[0].checked);
        json['tvdownload'] = parse(li[4].children[0].checked);
        json['fmpurview'] = parse(li[5].children[0].checked);
        json['fmdownload'] = parse(li[6].children[0].checked);
        json['formpurview'] = parse(li[7].children[0].checked);
        arr.push(json);
    }
        console.log(arr);
    $.ajax({
        url: ip + '/user/updatePermission',
        type: 'post',
        dataType: 'JSON',
        data: JSON.stringify(arr),
        contentType : 'application/json;charset=UTF-8',
        success: function(res){
            if (res.resultCode == 100) {
                alert('权限修改成功');
            }else{
                alert(res.resultMessage);
            }
        },
        error: function(err){
            console.log("网络请求失败" + err);
        }
    });
}
function selectUsers2(){
    let val = $('#selectkey2').find(':checked').val();
    let url = '';
    let key = '';
    let value = $('#select_input2').val();
    if (val == ''){
        url = '/user/getUsers';
        key = '';
    }else if (val == '用户名') {
        url = '/user/getUserByUserId';
        key = 'userid';
        if(!(/^[0-9]{1,9}$/.test(value))){
            $('#content1_2').empty();
            alert('没有查询到该用户');
            return false;
        }
    }else if(val == '姓名'){
        url = '/user/getUserByUsername';
        key = 'username';
    }else if(val == '所属部门'){
        url = '/user/getUserByDept';
        key = 'department';
    }else{
        url = '';
        key = '';
    }
    let json = {};
    json[key] = value;
    $.ajax({
        url: ip + url,
        type: 'post',
        dataType: 'JSON',
        data: json,
        success: function(res){
            if (res.resultCode == 100) {
                $('#list').empty();
                let arr_temp = res.resultData.resultData;
                function check(boolean){
                    return boolean == 1 ? "checked='checked'" : "";
                }
                for(let i=0;i<arr_temp.length;i++){
                    let content = `<ul class='screen-1-ul'>
                            <li class='screen-1-li right-border' style='width: 12%'>${arr_temp[i].userid}</li>
                            <li class='screen-1-li right-border' style='width: 9%'>${arr_temp[i].username}</li>
                            <li class='screen-1-li right-border' style='width: 13%'>${arr_temp[i].department}</li>
                            <li class='screen-1-li right-border' style='width: 13%'>
                                <input class='watchTV allbtn' type='checkbox' name='box-watch' ${check(arr_temp[i].tvpurview)}/>
                            </li>
                            <li class="screen-1-li right-border" style="width: 13%">
                                <input class='loadTV allbtn' type='checkbox' name='box-load1' ${check(arr_temp[i].tvdownload)}/>
                            </li>
                            <li class="screen-1-li right-border" style="width: 13%">
                                <input class='listenFM allbtn' type='checkbox' name='box-listen' ${check(arr_temp[i].fmpurview)}/>
                            </li>
                            <li class="screen-1-li right-border" style="width: 13%">
                                <input class='loadFM allbtn' type='checkbox' name='box-load2' ${check(arr_temp[i].fmdownload)}/>
                            </li>
                            <li class="screen-1-li" style="width: 13%">
                                <input class='checkdata allbtn' type='checkbox' name='box-data' ${check(arr_temp[i].formpurview)}/>
                            </li>
                        </ul>`;
                    $('#list').append(content);
                }
            }else{
                $('#list').empty();
                alert(res.resultMessage);
            }
        },
        error: function(err){
            console.log("网络请求失败" + err);
        }
    });
}
// 用户权限管理结束1.3
// 添加频道开始2.1
function yadd(){
    let file = document.getElementById('yfile1').value;
    let AllImgExt=".jpg|.jpeg|.png"; 
    let extName = file.substring(file.lastIndexOf(".")).toLowerCase();//（把路径中的所有字母全部转换为小写）
    function isValidIP(num){
        let ipRegExp= /^[0-9]+$/;
        if(ipRegExp.exec(num)){
            return false;
        }else{
            return true;
        }
    }
    if($('#yinput1').val() == ''||$('#yinput2').val() == ''||$('#yinput3').val() == ''){
        alert('您输入的信息不完整，请继续输入');
        return false;
    }else{
        if (file == null||file == ""){
            alert("请选择要上传的图片!");
            return false;
        }else if (isValidIP($('#yinput3').val())){
            alert("请输入正整数");
        }else if (file.lastIndexOf('.')==-1){   //如果不存在"."
            alert("请上传图片文件!");
            return false;
        }else if (AllImgExt.indexOf(extName)==-1){
            ErrMsg="该文件类型不允许上传。请上传 "+AllImgExt+" 类型的文件，当前文件类型为"+extName;
            alert(ErrMsg);
            return false;
        }else{
            let radio = $('#yradio1').is(':checked') ? 0 : 1;
            let fd = new FormData();
            fd.append('url', $('#yinput2').val());
            fd.append('type1', radio);
            fd.append('channelname', $('#yinput1').val());
            fd.append('iconfile', $('#yfile1')[0].files[0]);
            fd.append('saveday', $('#yinput3').val());
            $.ajax({
                url: ip + '/user/addChannel',
                type: 'post',
                dataType: 'JSON',
                data: fd,
                processData: false,
                contentType: false,
                cache: false,
                success: function(res){
                    if (res.resultCode == 100) {
                        alert('信息源添加成功');
                        window.location.href='./admin.html';
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
}
// 添加频道结束2.1
// 信息源列表开始2.2
function delete_ul_2_2(ev) {
    let deleteConfirm = confirm(`确定要删除频道${ev.target.parentNode.parentNode.firstElementChild.innerHTML}吗?`);
    if(deleteConfirm == true){
        //请求数据库删除该用户
        $.ajax({
            url: ip + '/user/delChannel',
            type: 'post',
            dataType: 'JSON',
            data: {
                channelid: $(ev.target.parentNode.parentNode).attr('channelid'),
                type1: ev.target.parentNode.parentNode.firstElementChild.nextElementSibling.innerHTML == 'TV' ? 0 : 1
            },
            success: function(res){
                if (res.resultCode == 100) {
                    alert('信息源删除成功');
                }else{
                    alert(res.resultMessage);
                }
            },
            error: function(err){
                console.log("网络请求失败" + err);
            }
        });
        $(ev.target).parent().parent().detach();
    }else{
        return false;
    }
}
function toggle_button_revise_2_2(ev){
    let $target = $(ev.target);
    let $targetText = $(ev.target).text();
    if($targetText == "保存"){
        //请求保存并提示保存成功与否
        let t1 = $target.parent().parent().attr('channelid');
        let t2 = $target.parent().prev().prev().prev().prev().val();
        let t3 = $target.parent().prev().prev().prev().val();
        if(t3=='TV'||t3=='tv'){
            t3=0;
        }else if(t3=='FM'||t3=='fm'){
            t3=1;
        }else{
            alert('修改类型应为TV或FM');
            return false;
        }
        let t4 = $target.parent().prev().prev().val();
        let t5 = $target.parent().prev().val();
        if(!(/(^[1-9]\d*$)/.test(t5))||t5.length>=10){
            alert('修改类型应为数字');
            return false;
        }
        $target.parent().prev().replaceWith('<li class="screen-1-li right-border" style="width: 15%">'+$target.parent().prev().val()+'</li>');
        $target.parent().prev().prev().replaceWith('<li class="screen-1-li right-border" style="width: 30%">'+$target.parent().prev().prev().val()+'</li>');
        $target.parent().prev().prev().prev().replaceWith('<li class="screen-1-li right-border" style="width: 15%">'+$target.parent().prev().prev().prev().val().toUpperCase()+'</li>');
        $target.parent().prev().prev().prev().prev().replaceWith('<li class="screen-1-li right-border" style="width: 20%">'+$target.parent().prev().prev().prev().prev().val()+'</li>');
        $target.parent().parent().css("background-color","#fff").children().css("background-color","#fff");
        $.ajax({
            url: ip + '/user/updateChannel',
            type: 'post',
            dataType: 'JSON',
            data: {
                channelid: t1,
                channelname: t2,
                type: t3,
                url: t4,
                saveday: t5,
                icon: 1
            }, 
            success: function(res){
                if (res.resultCode == 100) {
                    $target.text('修改');
                    alert('信息源信息修改成功');
                }else{
                    alert(res.resultMessage);
                }
            },
            error: function(err){
                console.log("网络请求失败" + err);
            }
        });
    }else{
        $target.text('保存');
        $target.parent().prev().replaceWith('<input type = "text" class="yr_input_2_2" style="width:15%;" value = '+$target.parent().prev().text()+'>');
        $target.parent().prev().prev().replaceWith('<input type = "text" class="yr_input_2_2" style="width:30%;" value='+$target.parent().prev().prev().text()+'>');
        $target.parent().prev().prev().prev().replaceWith('<input type = "text" class="yr_input_2_2" style="width:15%;" value='+$target.parent().prev().prev().prev().text()+'>');
        $target.parent().prev().prev().prev().prev().replaceWith('<input type = "text" class="yr_input_2_2" style="width:20%;" value='+$target.parent().prev().prev().prev().prev().text()+'>');
        $target.parent().parent().css("background-color","#ccc").children().css("background-color","#ccc");
    }
}
function selectUsers_2_2(){
    let val = $('#selectkey3').find(':checked').val();
    let url = '';
    let key = '';
    let value = $('#select_input3').val();
    if (val == '') {
        url = '/user/getChannelList';
        key = '';
    }else if(val == '信息源名称'){
        url = '/user/getChannelByChannelName';
        key = 'channelname';
    }else if(val == '信息源类型'){
        url = '/user/getChannelByType';
        key = 'type1';
        if(!(/^[0-9]{1,9}$/.test(value))){
            if(value=='TV'||value=='tv'){
                value=0;
            }else if(value=='FM'||value=='fm'){
                value=1;
            }else{
                $('#content1_2').empty();
                alert('没有查询到该类型');
                return false;
            }
        }
    }else{
        url = '';
        key = '';
    }
    let json = {};
    json[key] = value;
    $.ajax({
        url: ip + url,
        type: 'post',
        dataType: 'JSON',
        data: json,
        success: function(res){
            if (res.resultCode == 100) {
                function check(boolean){
                    return boolean == 0 ? "TV" : "FM";
                }
                $('#content2_2').empty();
                let arr_temp = res.resultData.resultData;
                for(let i=0;i<arr_temp.length;i++){
                    let content = `<ul class='screen-1-ul' userid="${arr_temp[i].channelid}">
                        <li class='screen-1-li right-border' style='width: 20%'>${arr_temp[i].channelname}</li>
                        <li class='screen-1-li right-border' style='width: 15%'>${check(arr_temp[i].type)}</li>
                        <li class='screen-1-li right-border' style='width: 30%'>${arr_temp[i].url}</li>
                        <li class='screen-1-li right-border' style='width: 15%'>${arr_temp[i].saveday}</li>
                        <li class='screen-1-li' style='width: 19%'>
                            <button class='screen-1-revise' onclick='toggle_button_revise_2_2(event)'>修改</button> 
                            <button class='screen-1-delete' style='background: #c30' onclick='delete_ul_2_2(event)'>删除</button>
                        </li>
                    </ul>`;
                    $('#content2_2').append(content);
                }
            }else{
                $('#content2_2').empty();
                alert(res.resultMessage);
            }
        },
        error: function(err){
            console.log("网络请求失败" + err);
        }
    });
}
// 信息源列表结束2.2
function exit(){
    $.ajax({
        url: ip+ '/user/logOff',
        type: 'post',
        dataType: 'JSON',
        data: {},
        success: function(res){
            window.location.href='./index.html';
        },
        error: function(err){}
    });
}
window.onbeforeunload = function(){
    $.ajax({
        url: ip+ '/user/logOff',
        type: 'post',
        dataType: 'JSON',
        data: {},
        success: function(res){},
        error: function(err){}
    });
}
function selectForm3(){
    var t1 = document.getElementById('myselect3-1').value;
    var t2 = document.getElementById('myselect3-2').value;
    if (t1 == 2) {
        alert('请选择信息源类型');
    }else if(t2 == 0){
        alert('请选择信息源名称')
    }else{
        $.ajax({
            url: ip + '/program/getProgramList',
            type: 'post',
            dataType: 'JSON',
            data: {
                'type1': t1,
                'channelname': t2,
                'prodate': getTrueDate(document.getElementById('nowdate2').innerHTML)
            },
            success: function(res){
                if(res.resultCode===100){
                    $('#content2_3').empty();
                    var nowTime = new Date().getHours() + '' + new Date().getMinutes() + '' + new Date().getSeconds();
                    var arr = res.resultData.resultData;
                    for(var i=0; i<arr.length; i++){
                        if (arr[i].proname.search('广告') != -1||arr[i].proname.search('宣传片') != -1) {
                            if (arr[i].prodate.replace(/\-/g, "") < getNowDate().replace(/\-/g, "")) {
                                var temp = `<ul class="screen-1-ul">
                                    <li class="screen-1-li right-border" style="width: 35%">${arr[i].proname}</li>
                                    <li class="screen-1-li right-border" style="width: 15%">${arr[i].prodate}</li>
                                    <li class="screen-1-li right-border" style="width: 24%">${arr[i].start}-${arr[i].end}</li>
                                    <li class="screen-1-li" style="width: 25%;color: #246ab1;">已播出</li>
                                </ul>`
                                $('#content2_3').append(temp);
                            }else if (arr[i].prodate.replace(/\-/g, "") == getNowDate().replace(/\-/g, "")){
                                console.log(arr[i].end.replace(/\:/g, ""),nowTime);
                                if (arr[i].end.replace(/\:/g, "") < nowTime) {
                                    var temp = `<ul class="screen-1-ul">
                                        <li class="screen-1-li right-border" style="width: 35%">${arr[i].proname}</li>
                                        <li class="screen-1-li right-border" style="width: 15%">${arr[i].prodate}</li>
                                        <li class="screen-1-li right-border" style="width: 24%">${arr[i].start}-${arr[i].end}</li>
                                        <li class="screen-1-li" style="width: 25%;color: #246ab1;">已播出</li>
                                    </ul>`
                                    $('#content2_3').append(temp);
                                }else if(arr[i].start < nowTime && nowTime < arr[i].end){
                                    var temp = `<ul class="screen-1-ul">
                                        <li class="screen-1-li right-border" style="width: 35%">${arr[i].proname}</li>
                                        <li class="screen-1-li right-border" style="width: 15%">${arr[i].prodate}</li>
                                        <li class="screen-1-li right-border" style="width: 24%">${arr[i].start}-${arr[i].end}</li>
                                        <li class="screen-1-li" style="width: 25%;color: #c55f1b;">正在播出</li>
                                    </ul>`
                                    $('#content2_3').append(temp);
                                }else{
                                    var temp = `<ul class="screen-1-ul">
                                        <li class="screen-1-li right-border" style="width: 35%">${arr[i].proname}</li>
                                        <li class="screen-1-li right-border" style="width: 15%">${arr[i].prodate}</li>
                                        <li class="screen-1-li right-border" style="width: 24%">${arr[i].start}-${arr[i].end}</li>
                                        <li class="screen-1-li" style="width: 25%">未播出</li>
                                    </ul>`
                                    $('#content2_3').append(temp);
                                }
                            }else{
                                var temp = `<ul class="screen-1-ul">
                                    <li class="screen-1-li right-border" style="width: 35%">${arr[i].proname}</li>
                                    <li class="screen-1-li right-border" style="width: 15%">${arr[i].prodate}</li>
                                    <li class="screen-1-li right-border" style="width: 24%">${arr[i].start}-${arr[i].end}</li>
                                    <li class="screen-1-li" style="width: 25%">未播出</li>
                                </ul>`
                                $('#content2_3').append(temp);
                            }
                        }
                    }
                }else{
                    alert('未保存此频道当日节目单');
                }
            },
            error: function(err){
                console.log('网络请求失败');
            }
        });
    }
}
//日历插入
function select(){
    $(window).click(function() {
        if ($(".select-date").css("display") == "block") {
            $(".select-date").css("display", "none")
        }
    });
    $("#nowdate2").on("click", function(e) {
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
        $("#yearList1").append('<option value="' + (i + "年") + '">' + i + "年" + "</option>")
    }
    for (var j = 1; j < 13; j++) {
        monthArr.push(j + "月");
        $("#monthList1").append('<option value="' + (j + "月") + '">' + j + "月" + "</option>")
    }
    var d = new Date();
    var currYear = d.getFullYear();
    var currMonth = (d.getMonth() + 1);
    var currDate = d.getDate();
    $("#nowdate2").text(currYear + "-" + currMonth + "-" + d.getDate());
    $("#yearList1").val(currYear + "年");
    $("#monthList1").val(currMonth + "月");
    $(".reback").eq(0).click(function() {
        var d = new Date();
        var currYear = d.getFullYear();
        var currMonth = (d.getMonth() + 1);
        $("#yearList1").val(currYear + "年");
        $("#monthList1").val(currMonth + "月");
        $("#nowdate2").text(currYear + "-" + currMonth + "-" + d.getDate());
        ergodicDate(currYear, currMonth);
        //proListForDate(currYear + "-" + currMonth + "-" + d.getDate())
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
                break;
            }
        }
    }
    $("#yearList1,#monthList1, .reback").on("click", function(e) {
        e.stopPropagation()
    });
    $("#yearList1,#monthList1").on("change", function(e) {
        ergodicDate($("#yearList1").val().split("年")[0], $("#monthList1").val().split("月")[0]);
        $("#nowdate2").text($("#yearList1").val().split("年")[0] + "-" + $("#monthList1").val().split("月")[0] + "-" + currDate);
        //proListForDate($("#yearList1").val().split("年")[0] + "-" + $("#monthList1").val().split("月")[0] + "-" + currDate)
    });
    $(".day-tabel").on("click", ".tabel-li", function(e) {
        e.stopPropagation();
        $(this).addClass("showClick").siblings().removeClass("showClick").parent().parent().siblings().find(".tabel-li").removeClass("showClick");
        var parentIndex = $(this).parent().parent().index();
        var thisIndex = $(this).index();
        if (parentIndex == 0 && $(this).html() > 7) {
            var selectDate;
            if (($("#monthList1").val().split("月")[0]-1) > 0) {
                selectDate = $("#yearList1").val().split("年")[0] + "-" + ($("#monthList1").val().split("月")[0]-1) + "-" + $(this).html();
                ergodicDate($("#yearList1").val().split("年")[0], ($("#monthList1").val().split("月")[0]-1));
                $("#yearList1").val($("#yearList1").val().split("年")[0] + "年");
                $("#monthList1").val(($("#monthList1").val().split("月")[0]-1) + "月")
            } else {
                selectDate = ($("#yearList1").val().split("年")[0]-1) + "-" + 12 + "-" + $(this).html();
                ergodicDate(($("#yearList1").val().split("年")[0]-1), 12);
                $("#yearList1").val(($("#yearList1").val().split("年")[0]-1) + "年");
                $("#monthList1").val(12 + "月")
            }
        } else {
            if (parentIndex == currK && $(this).html() < 7) {
                if (parseInt($("#monthList1").val().split("月")[0]) + 1 > 12) {
                    selectDate = (parseInt($("#yearList1").val().split("年")[0]) + 1) + "-" + 1 + "-" + $(this).html();
                    ergodicDate($("#yearList1").val().split("年")[0], ($("#monthList1").val().split("月")[0]-1));
                    $("#yearList1").val((parseInt($("#yearList1").val().split("年")[0]) + 1) + "年");
                    $("#monthList1").val(1 + "月")
                } else {
                    selectDate = ($("#yearList1").val().split("年")[0]) + "-" + (parseInt($("#monthList1").val().split("月")[0]) + 1) + "-" + $(this).html();
                    ergodicDate(($("#yearList1").val().split("年")[0]), (parseInt($("#monthList1").val().split("月")[0]) + 1));
                    $("#yearList1").val(($("#yearList1").val().split("年")[0]) + "年");
                    $("#monthList1").val((parseInt($("#monthList1").val().split("月")[0]) + 1) + "月")
                }
            } else {
                selectDate = $("#yearList1").val().split("年")[0] + "-" + $("#monthList1").val().split("月")[0] + "-" + $(this).html()
            }
        }
        $("#nowdate2").text(selectDate);
        if ($(".select-date").css("display") == "none") {
            $(".select-date").css("display", "block");
        } else {
            $(".select-date").css("display", "none");
        }
        var getDate = $("#yearList1").val().split("年")[0] + "-" + $("#monthList1").val().split("月")[0] + "-" + $(this).html();
    });
}