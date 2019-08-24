//选择商品样式
$('tr .list>a').on('click', function () {
    $('.selected').css('display', 'block')
    $name = $(this).html()
    $title = $(this).parents('dl').find('dt').html()

    $html = ` <div class="current">
             <span>
                 <span class='head'>${$title}</span> : 
                 <span>${$name}</span>
                 <a href="javascript:;" class='clearN'></a>
            </span>
        </div>

        `

    $('.append').append($html)

    $(this).parents('dl').css({
        display: 'none'

    })
})



//清除选择条件
$('.append').on('click', '.clearN', function () {

    $head = $(this).parent().find('.head').html()
    $(this).parents('.current').remove()

    $('.classify dl').each(function () {
        if($(this).find('dt').html()==$head){
            $(this).css({display:'block'})
        }
    })
    if ($('.current').length < 1) {
        $('.selected').css('display', 'none')
    }

})

//清除全部选择条件
$('.clearAll').on('click', function () {
    $('.selected').css({
        display: 'none'
    }).siblings().css({
        display: 'block'
    })
    $('.selected').find('.current').remove()

})




//选项卡折叠
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