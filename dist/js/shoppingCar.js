

$('.checkone').on('click', function () {

    if ($(this).prop('checked')) {
        $(this).parent().find('label').addClass('label-active')
    } else {
        $(this).parent().find('label').removeClass('label-active')
    }
})

$('.checkAll').on('click', function () {

    if ($(this).prop('checked')) {
        $(this).parent().find('label').addClass('label-active')
    } else {
        $(this).parent().find('label').removeClass('label-active')
    }
})

 //删除多个
 $('.deleteAll').click(function () {

    $('.checkone:checked').parents('.info').remove()

    getTotal()

})

//删除行
$('.delete').click(function () {
   $(this).parents('.info').remove()

    getTotal()
})



//全选
$('.checkAll').on('click',function () {
    if ($(this).prop("checked")) {
        $(".checkone").prop("checked", true).parent().find('label').addClass('label-active');
        $(".checkAll").prop("checked", true).parent().find('label').addClass('label-active');
    } else {
        $(".checkAll").prop("checked", false).parent().find('label').removeClass('label-active');
        $(".checkone").prop("checked", false).parent().find('label').removeClass('label-active');
    }
    checkAll()
    getTotal()
})


//数量加
$('.add').click(function () {
    $oInfo = $(this).parents('.info')
    all($oInfo, 1)
    if ($count > 1) {
        $($oInfo).find('.reduce').attr('click', ' true')
    }
    
})

//减
$('.reduce').click(function () {
    $oInfo = $(this).parents('.info')
    if ($(this).attr('click') === 'false') {
        return
    }

    $count = all($oInfo, -1)
    if ($count < 2) {
        $(this).attr('click', 'false')
    }

})
//输入框失焦
$('.count').on('change', function () {
    if ($(this).val() < 1) {
        $(this).val('1')
    }
})

//单选
$('.checkone').click(function () {
    checkAll()
})

//单选函数
function checkAll() {
    if ($('.checkone:checked').length === $('.goods_list>li').length) {
        $('.checkAll').prop("checked", true).parent().find('label').addClass('label-active');
    } else {
        $('.checkAll').prop("checked", false).parent().find('label').removeClass('label-active');
    }
    getTotal()
}

//加减函数
function all(oInfo, tag) {

    $count = $(oInfo).find('.count').val() * 1 //取数量框里的值，赋给count
    $count += tag
    $(oInfo).find('.count').val($count) //把计算后的结果给回去;
    $price = $(oInfo).find('.price>span').html() * 1 //取得单价
    $(oInfo).find('.subtotal>span').html(($price * $count).toFixed(2)) //把计算后的结果赋给小计
    getTotal()
    return $count
}

function getTotal() {
   $total = 0
   $money = 0;
    for (var i = 0; i < $('.checkone').length; i++) {
        if ($(`.checkone:eq(${i})`).prop('checked')) {
           $info = $(`.checkone:eq(${i})`).parents('.info')
           $count = $($info).find('.count').val() * 1
           $subMoney = $($info).find('.subtotal>span').html() * 1
            $total += $count;
            $money += $subMoney
        }
    }
    $('#selectedTotal').html($total)
    $('#priceTotal').html($money.toFixed(2))
}