const ip = 'http://192.168.124.220:8080';
$(function(){
    // 侧边栏显示隐藏开始
    $('#title1-1').click(function() {
        $('#content1-1').show();
        $('#content1-2').hide();
        $('#content1-3').hide();
        $('#content2-1').hide();
        $('#content2-2').hide();
        $('#content3-1').hide();
        $('#content3-2').hide();
    });
    $('#title1-2').click(function() {
        $('#content1_2').empty();
        $('#select_input').val('');
        $.ajax({
            url: ip + '/user/getUsers',
            type: 'post',
            dataType: 'JSON',
            data: {
            },
            success: function(res){
                if (res.resultCode == 100) {
                    let arr_temp = res.resultData.resultData;
                    for(let i=0;i<arr_temp.length;i++){
                        let content = `<ul class='screen-1-ul'>
                            <li class='screen-1-li right-border' style='width: 20%'>${arr_temp[i].userid}</li>
                            <li class='screen-1-li right-border' style='width: 20%'>${arr_temp[i].username}</li>
                            <li class='screen-1-li right-border' style='width: 20%'>${arr_temp[i].department}</li>
                            <li class='screen-1-li' style='width: 39%'>
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
        $('#content1-1').hide();
        $('#content1-2').show();
        $('#content1-3').hide();
        $('#content2-1').hide();
        $('#content2-2').hide();
        $('#content3-1').hide();
        $('#content3-2').hide();
    });
    $('#title1-3').click(function() {
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
                            <li class='screen-1-li right-border' style='width: 12%'>${arr_temp[i].username}</li>
                            <li class='screen-1-li right-border' style='width: 15%'>${arr_temp[i].department}</li>
                            <li class='screen-1-li right-border' style='width: 12%'>
                                <input class='watchTV allbtn' type='checkbox' name='box-watch' ${check(arr_temp[i].tvpurview)}/>
                            </li>
                            <li class="screen-1-li right-border" style="width: 12%">
                                <input class='loadTV allbtn' type='checkbox' name='box-load1' ${check(arr_temp[i].tvdownload)}/>
                            </li>
                            <li class="screen-1-li right-border" style="width: 12%">
                                <input class='listenFM allbtn' type='checkbox' name='box-listen' ${check(arr_temp[i].fmpurview)}/>
                            </li>
                            <li class="screen-1-li right-border" style="width: 12%">
                                <input class='loadFM allbtn' type='checkbox' name='box-load2' ${check(arr_temp[i].fmdownload)}/>
                            </li>
                            <li class="screen-1-li" style="width: 12%">
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
        $('#content1-1').hide();
        $('#content1-2').hide();
        $('#content1-3').show();
        $('#content2-1').hide();
        $('#content2-2').hide();
        $('#content3-1').hide();
        $('#content3-2').hide();
    });
    $('#title2-1').click(function() {
        $('#content1-1').hide();
        $('#content1-2').hide();
        $('#content1-3').hide();
        $('#content2-1').show();
        $('#content2-2').hide();
        $('#content3-1').hide();
        $('#content3-2').hide();
    });
    $('#title2-2').click(function() {
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
        $('#content1-1').hide();
        $('#content1-2').hide();
        $('#content1-3').hide();
        $('#content2-1').hide();
        $('#content2-2').show();
        $('#content3-1').hide();
        $('#content3-2').hide();
    });
    $('#title3-1').click(function() {
        $('#content1-1').hide();
        $('#content1-2').hide();
        $('#content1-3').hide();
        $('#content2-1').hide();
        $('#content2-2').hide();
        $('#content3-1').show();
        $('#content3-2').hide();
    });
    $('#title3-2').click(function() {
        $('#content1-1').hide();
        $('#content1-2').hide();
        $('#content1-3').hide();
        $('#content2-1').hide();
        $('#content2-2').hide();
        $('#content3-1').hide();
        $('#content3-2').show();
    });
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
    let h = document.documentElement.clientHeight - $('.header').eq(0).height() - 50;
    dv.style.height = h +'px';
    dv2.style.height = h +'px';
    return false;
});

// function createUlinScreen1_2(username,personname,department){
//     $('#content1_2').append('<ul class="screen-1-ul"><li class="screen-1-li right-border" style="width: 20%">'+username+'</li><li class="screen-1-li right-border" style="width: 20%">'+personname+'</li><li class="screen-1-li right-border" style="width: 20%">'+department+'</li><li class="screen-1-li" style="width: 39%;"><button class="screen-1-revise"  onclick="toggle_button_revise(event)">修改</button><button class="screen-1-delete" style="background-color: #c30;" onclick="delete_ul(event)">删除</button></li></ul>');
// }
// function createUlinScreen2_2(username,personname,department){
//     $('#content2_2').append('<ul class="screen-1-ul"><li class="screen-1-li right-border" style="width: 20%">aaa</li><li class="screen-1-li right-border" style="width: 15%">sss</li><li class="screen-1-li right-border" style="width: 30%">ddd</li><li class="screen-1-li right-border" style="width: 15%">ddd</li><li class="screen-1-li" style="width: 19%;"><button class="screen-1-revise" onclick="toggle_button_revise_2_2(event)">修改</button><button class="screen-1-delete" style="background-color: #c30;" onclick="delete_ul(event)">删除</button></li></ul>');
// }

// 添加用户开始1.1
function addsuccess(){
    if($('#input1-1_1').val() == ''||$('#input2-1_1').val() == ''||$('#input3-1_1').val() == ''||$('#input4-1_1').val() == ''||$('#select1-1_1').val() == 0){
        alert('您输入的信息不完整，请继续输入！');
    }else if($('#input3-1_1').val() != $('#input4-1_1').val()){
        alert('您两次输入的密码不一致');
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
                password: $('#input3-1_1').val(),
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
    if(deleteConfirm === true){
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
    if($targetText === "保存"){
        //请求保存并提示保存成功与否
        $target.text('修改');
        let t1 = ev.target.parentNode.parentNode.firstElementChild.innerHTML;
        let t2 = $target.parent().prev().prev().val();
        let t3 = $target.parent().prev().val();
        $target.parent().prev().replaceWith(`<li class='screen-1-li right-border' style='width: 20%'>${t3}</li>`);
        $target.parent().prev().prev().replaceWith(`<li class='screen-1-li right-border' style='width: 20%'>${t2}</li>`);
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
        $target.parent().prev().replaceWith('<input type="text" class="yr_input" value='+$target.parent().prev().text()+'>');
        $target.parent().prev().prev().replaceWith('<input type = "text" class="yr_input" value='+$target.parent().prev().prev().text()+'>');
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
    }else if (val == '用户名') {
        url = '/user/getUserByUserId';
        key = 'userid';
        if(!(/(^[1-9]\d*$)/.test(key))||key.length>=10){
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
                $('#content1_2').empty();
                let arr_temp = res.resultData.resultData;
                for(let i=0;i<arr_temp.length;i++){
                    let content = `<ul class='screen-1-ul'>
                        <li class='screen-1-li right-border' style='width: 20%'>${arr_temp[i].userid}</li>
                        <li class='screen-1-li right-border' style='width: 20%'>${arr_temp[i].username}</li>
                        <li class='screen-1-li right-border' style='width: 20%'>${arr_temp[i].department}</li>
                        <li class='screen-1-li' style='width: 39%'>
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
                            <li class='screen-1-li right-border' style='width: 12%'>${arr_temp[i].username}</li>
                            <li class='screen-1-li right-border' style='width: 15%'>${arr_temp[i].department}</li>
                            <li class='screen-1-li right-border' style='width: 12%'>
                                <input class='watchTV allbtn' type='checkbox' name='box-watch' ${check(arr_temp[i].tvpurview)}/>
                            </li>
                            <li class="screen-1-li right-border" style="width: 12%">
                                <input class='loadTV allbtn' type='checkbox' name='box-load1' ${check(arr_temp[i].tvdownload)}/>
                            </li>
                            <li class="screen-1-li right-border" style="width: 12%">
                                <input class='listenFM allbtn' type='checkbox' name='box-listen' ${check(arr_temp[i].fmpurview)}/>
                            </li>
                            <li class="screen-1-li right-border" style="width: 12%">
                                <input class='loadFM allbtn' type='checkbox' name='box-load2' ${check(arr_temp[i].fmdownload)}/>
                            </li>
                            <li class="screen-1-li" style="width: 12%">
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
    $.ajax({
        url: ip + '/user/updatePermission',
        type: 'post',
        dataType: 'JSON',
        data: JSON.stringify(arr),
        contentType : 'application/json;charset=UTF-8',
        success: function(res){
            if (res.resultCode == 100) {
                alert('权限修改成功！');
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
        if(!(/(^[1-9]\d*$)/.test(key))||key.length>=10){
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
                        <li class='screen-1-li right-border' style='width: 12%'>${arr_temp[i].username}</li>
                        <li class='screen-1-li right-border' style='width: 15%'>${arr_temp[i].department}</li>
                        <li class='screen-1-li right-border' style='width: 12%'>
                            <input class='watchTV allbtn' type='checkbox' name='box-watch' ${check(arr_temp[i].tvpurview)}/>
                        </li>
                        <li class="screen-1-li right-border" style="width: 12%">
                            <input class='loadTV allbtn' type='checkbox' name='box-load1' ${check(arr_temp[i].tvdownload)}/>
                        </li>
                        <li class="screen-1-li right-border" style="width: 12%">
                            <input class='listenFM allbtn' type='checkbox' name='box-listen' ${check(arr_temp[i].fmpurview)}/>
                        </li>
                        <li class="screen-1-li right-border" style="width: 12%">
                            <input class='loadFM allbtn' type='checkbox' name='box-load2' ${check(arr_temp[i].fmdownload)}/>
                        </li>
                        <li class="screen-1-li" style="width: 12%">
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
        alert('您输入的信息不完整，请继续输入！');
        return false;
    }else{
        if (file == null||file == ""){
            alert("请选择要上传的图片!");
            return false;
        }else if (isValidIP($('#yinput3').val())){
            alert("请输入正整数！");
        }else if (file.lastIndexOf('.')==-1){    //如果不存在"."
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
    if(deleteConfirm === true){
        //请求数据库删除该用户
        $.ajax({
            url: ip + '/user/delChannel',
            type: 'post',
            dataType: 'JSON',
            data: {
                channelid: $(ev.target.parentNode.parentNode).attr('channelid'),
                type: ev.target.parentNode.parentNode.firstElementChild.nextElementSibling.innerHTML == 'TV' ? 0 : 1
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
    if($targetText === "保存"){
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
        if(!(/(^[1-9]\d*$)/.test(key))||key.length>=10){
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