layui.use('layer', function(){
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


