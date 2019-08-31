layui.use('layer', function () {
    var layer = layui.layer;

});


//判断用户登录状态
var user = sessionStorage.getItem('userName')
if (user) {
    $('.header-left .register').css({
        display: 'none'
    })
    $('.header-left .login').css({
        display: 'none'
    })

    $('.header-left .username').css({
        display: 'inline-block'
    })
    $('.header-left .user_out').css({
        display: 'inline-block'
    })
    $('.header-left .username').html(user)
}

$('.header-left .user_out').on('click', function () {
    sessionStorage.removeItem('userName')
    location.reload()
})


tel_scroll()
//头部电话滚动函数
function tel_scroll() {
    var num = -28;
    var sum = 0;
    setInterval(() => {
        if (sum === -84) {
            sum = 28;
        }
        sum += num;
        $('.tel-scroll').animate({
            top: sum,
        })
    }, 2500);
}


//侧边栏
$('.sidebar-container li').on('mouseenter', function () {
    $('.sidebar-container').css('overflow', 'visible')
    $(this).find('.prompt').animate({
        'opacity': '1',
        'right': '80px',
    })
})
$('.sidebar-container li').on('mouseleave', function () {
    $('.sidebar-container').css('overflow', 'hidden')
    $(this).find('.prompt').animate({
        'opacity': '0',
        'right': '100px',
    })
})
$('.sidebar-container .top').on('click', function () {
    document.documentElement.scrollTop = 0
})




$.ajax({
    url: `//${location.hostname}/php/project_php/get_car_all.php`,
    type: 'post',
    dataType: 'json',
    data: {
        'username': $('.username').html(),
    }
}).then(({
    code,
    data
}) => {
    if (code) {
        $sum = 0;
        data.forEach(item => {
            $sum += item.goodsnum * 1
        })
        $('.goods-num').html($sum)
        $('.shopping-trolley  strong').html($sum)

       
    }
})
















/***************小球运动加购效果*********** */


// $('.list_goods').on('click', '.addCar', function (e) {
//     var ev = event || e;


//     console.log()
//     $('.ball').stop(true, true).show().css({
//         "left": x + 'px',
//         "top": y + 'px',
//     })

//     $('.ball').animate({
//         left: $('.sidebar-container')[0].offsetLeft,
//         top: 320,
//     }, function () {

//         $('.ball').hide()
//     })
// })