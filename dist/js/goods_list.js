'use strict';

//判断用户登录状态
var user = sessionStorage.getItem('userName');
if (user) {
    $('.header-left .register').css({
        display: 'none'
    });
    $('.header-left .login').css({
        display: 'none'
    });

    $('.header-left .username').css({
        display: 'inline-block'
    });
    $('.header-left .user_out').css({
        display: 'inline-block'
    });
    $('.header-left .username').html(user);
}

$('.header-left .user_out').on('click', function () {
    sessionStorage.removeItem('userName');
    location.reload();
});

tel_scroll();
//头部电话滚动函数
function tel_scroll() {
    var num = -28;
    var sum = 0;
    setInterval(function () {
        if (sum === -84) {
            sum = 28;
        }
        sum += num;
        $('.tel-scroll').animate({
            top: sum
        });
    }, 2500);
}

var n = 1;
$('.classify .more>a').on('click', function () {
    n++;

    if (n % 2 == 0) {
        $(this).find('span').html('收起');
        $(this).find('i').attr('class', 'iconfont icon-icon--');
        $('.shell').animate({
            height: '50px'
        }, 'fast');
    }
    if (n % 2 == 1) {
        $(this).find('span').html('更多');
        $(this).find('i').attr('class', 'iconfont icon-icon--1');
        $('.shell').animate({
            height: '26px'
        }, 'fast');
    }
});