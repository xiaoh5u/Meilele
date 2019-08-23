


//折叠函数
// function zhedie(n) {
//     if (n % 2 == 0) {
//         $(this).find('span').html('收起')
//         $(this).find('i').attr('class', 'iconfont icon-icon--')
//         console.log($(this))
//         $(this).parents('dd').find('.shell').css({
//             height: 'auto'
//         })
//     }
//     if (n % 2 == 1) {
//         $(this).find('span').html('更多')
//         $(this).find('i').attr('class', 'iconfont icon-icon--1')
//         $(this).find('.shell').css({
//             height: '26px'
//         })
//     }
// }




var m = 1;
$('.goods_classify .more>a').on('click', function () {
    m++
    if (m % 2 == 0) {
        $(this).find('span').html('收起')
        $(this).find('i').attr('class', 'iconfont icon-icon--')
        $(this).parents('dd').find('.shell').css({
            height: 'auto'
        })
    }
    if (m % 2 == 1) {
        $(this).find('span').html('更多')
        $(this).find('i').attr('class', 'iconfont icon-icon--1')
        $(this).parents('dd').find('.shell').css({
            height: '26px'
        })
    }
})
var n = 1;
$('.goods_style .more>a').on('click', function () {
    n++
    if (n % 2 == 0) {
        $(this).find('span').html('收起')
        $(this).find('i').attr('class', 'iconfont icon-icon--')
        $(this).parents('dd').find('.shell').css({
            height: 'auto'
        })
    }
    if (n % 2 == 1) {
        $(this).find('span').html('更多')
        $(this).find('i').attr('class', 'iconfont icon-icon--1')
        $(this).parents('dd').find('.shell').css({
            height: '26px'
        })
    }

})



$('.list_goods li').on('mouseenter', function () {
    $(this).css({
        'z-index': 2
    }).siblings().css({
        'z-index': 1
    })
})