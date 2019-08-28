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

$('.header-left .user_out').on('click',function(){
    sessionStorage.removeItem('userName')
    location.reload()
})





//滚动详情


var n = 0;
var m = 0;
$('.scroll-image-A .scroll-detail-btn>.btn').mouseenter(function () {
    var index = $(this).index();
    scroll_detail('.scroll-image-A', index)
    n = index
})

$('.scroll-image-B .scroll-detail-btn>.btn').mouseenter(function () {

    var index = $(this).index();
    scroll_detail('.scroll-image-B', index)
    m = index
})

var dingShi = setInterval(function () {
    n++;
    m++;
    if (n > 7) {
        n = 0
    }
    if (m > 7) {
        m = 0
    }
    scroll_detail('.scroll-image-A', n)
    scroll_detail('.scroll-image-B', m)
}, 2000)



$('.scroll-detail>li').mouseenter(function () {
    clearInterval(dingShi)
}).mouseleave(function () {
    dingShi = setInterval(function () {
        n++;
        m++;
        if (n > 7) {
            n = 0
        }
        if (m > 7) {
            m = 0
        }
        scroll_detail('.scroll-image-A', n)
        scroll_detail('.scroll-image-B', m)
    }, 2000)
})


//触摸滚动函数
function scroll_detail(ele, index) {
    $(`${ele} .scroll-detail-btn>.btn:eq(${index})`).addClass('current').siblings().removeClass(
        'current')

    $(`${ele} .scroll-detail>li:eq(${index})`).stop(true, true).animate({
        opacity: 1,
        'z-index': 1
    }, 'slow').siblings().stop(true, true).animate({
        opacity: 0,
        'z-index': 0
    }, 'slow')


}






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



//banner下方滑块移入事件
var index = 0;
$('.scroll-btn>li').mouseenter(function () {

    index = ($(this).index())

    scroll_banner(index)

})

//广告定时器
var timer = setInterval(function () {
    index++;
    if (index == 4) {
        index = 0
    }
    scroll_banner(index)
}, 3000)

//广告移入移出事件
$('.banner').mouseenter(function () {
    clearInterval(timer)
}).mouseleave(function () {
    timer = setInterval(function () {
        index++;
        if (index == 4) {
            index = 0
        }
        scroll_banner(index)
    }, 3000)
})

//广告图滚动函数
function scroll_banner(index) {

    $(`.scroll-btn>li:eq(${index})`).siblings().removeClass('active')
    $(`.scroll-btn>li:eq(${index})`).addClass('active')

    $(`.banner-img li:eq(${index})`).animate({
        opacity: 1,
    }, 'slow').siblings().animate({
        opacity: 0,
    }, "slow")

    $(`.banner-img li:eq(${index})`).siblings().each(function () {
        $(this).find('a').animate({
            opacity: 0,
        }, 'slow')
    })
    $(`.banner-img li:eq(${index}) a`).animate({
        opacity: 1,
    }, "slow")
}


//鼠标移入侧边栏标题 显示下级菜单
//css hover没有动画故写JS
$('.banner-nav>li').mouseenter(function () {

    $(this).find('.banner-sub-menu').css('display', 'block').animate({
        'padding-left': "10px",
    }, 'fast')
}).mouseleave(function () {
    $('.banner-sub-menu').css({
        'display': 'none',
        'padding-left': "0",
    })
})