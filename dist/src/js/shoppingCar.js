//渲染页面

$.ajax({
    url: `//${location.hostname}/php/project_php/getCar.php`,
    type: 'post',
    dataType: 'json',
    data: {
        username: $('.username').html()
    }
}).then(({
    code,
    msg,
    data
}) => {

    if (code) {
        data.forEach(({
            goodsid,
            goodsnum
        }) => {
            //默认可减
            //如果商品小于2 就不让你减 :)
            var state = true
            if (goodsnum < 2) {
                state = false
            }

            $.ajax({
                url: `//${location.hostname}/php/project_php/get_goods_detail.php`,
                type: 'post',
                dataType: 'json',
                data: {
                    goodsid
                },
                beforeSend: (function () {
                    layui.use('layer', function () {
                        var layer = layui.layer;
                        layer.msg('拼命加载中..')
                    });
                }),

            }).then(data => {
                $data = data.data[0]
                $('.goods-normal').show()
                $('.no-goods').hide()
                $list = `
            
            <li class="info clear" goodsid='${goodsid}'>
            <div class="input-checked">
                <input type="checkbox" id="checkone${goodsid}" class="checkone">
                <label for="checkone${goodsid}"></label>
            </div>

            <div class="smallImg">
                <img src=${$data.goods_imgs_big}
                    alt="">
            </div>

            <div class="goods-name">
                <a href="javascript:;">${$data.goods_name}</a>
            </div>

            <div class="goods-model">
                <p>类型：原装进口1.8米标准款</p>
            </div>

            <div class="price">
                ￥<span>${$data.goods_price}</span>
            </div>

            <div class="num clear">
                <a href="javascript:;" class="reduce" click='${state}'></a>
                <input type="text" class="count" value='${goodsnum}'>
                <a href="javascript:;" class="add"></a>
            </div>
            <div class="subtotal">
                ￥<span>${$data.goods_price*goodsnum}</span>
            </div>

            <div class="delete">
                <a href="javascript:;">删除</a>
            </div>
   
        </li>
            `
                $('.goods_list').append($list)



            })



        })
    }
})


//渲染页面



$('.goods-normal').on('click', '.checkone', function () {

    if ($(this).prop('checked')) {
        $(this).parent().find('label').addClass('label-active')
    } else {
        $(this).parent().find('label').removeClass('label-active')
    }
})

$('.goods-normal').on('click', '.checkAll', function () {

    if ($(this).prop('checked')) {
        $(this).parent().find('label').addClass('label-active')
    } else {
        $(this).parent().find('label').removeClass('label-active')
    }
})

//删除选中
$('.goods-normal').on('click', '.deleteAll', function () {
    if ($('.checkone:checked').length == 0) {
        layer.msg('未选中任何商品', {
            icon: 2,
            title: '提示',
            time: 1000
        }, function () {})
        return
    }

    layer.confirm('确认删除?', {
        icon: 3,
        title: '提示'
    }, function (index) {
        for (var i = 0; i < $('.checkone').length; i++) {

            if ($(`.checkone:eq(${i})`).prop('checked')) {
                $goodsids = $(`.checkone:eq(${i})`).parents('.info').attr('goodsid')


                $.ajax({
                    url: `//${location.hostname}/php/project_php/goods_delete.php`,
                    type: 'post',
                    dataType: 'json',
                    data: {
                        'goodsid': $goodsids,
                        'username': $('.username').html(),
                    }
                }).then((code) => {
                    location.reload()
                })
            }
        }
        layer.close(index);

    });


    getTotal()
})

//删除行
$('.goods-normal').on('click', '.delete', function () {
    $this = $(this).parents('.info')
    $id = $(this).parents('li').attr('goodsid')
    layer.confirm('确认删除?', {
        icon: 3,
        title: '提示'
    }, function (index) {
        $.ajax({
            url: `//${location.hostname}/php/project_php/goods_delete.php`,
            type: 'post',
            dataType: 'json',
            data: {
                'goodsid': $id,
                'username': $('.username').html(),
            }
        }).then(code => {
            if (code) {
                $this.remove()
                if ($('.info').length == 0) {
                    $('.goods-normal').hide()
                    $('.no-goods').show()
                    $('.goods-num').html(0)
                    $('.shopping-trolley strong').html(0)
                }
            }
        })

        layer.close(index);
    });

    getTotal()
})



//全选
$('.goods-normal').on('click', '.checkAll', function () {
    if ($(this).prop("checked")) {
        $(".checkone").prop("checked", true).parent().find('label').addClass('label-active');
        $(".checkAll").prop("checked", true).parent().find('label').addClass('label-active');
    } else {
        $(".checkAll").prop("checked", false).parent().find('label').removeClass('label-active');
        $(".checkone").prop("checked", false).parent().find('label').removeClass('label-active');
    }


    if ($(".checkone").prop("checked")) {
        $(".checkone:checked").parents('.info').css({
            'background-color': '#fefaf1'
        })
    } else {
        $(".checkone").parents('.info').css({
            'background-color': '#ffffff'
        })
    }


    checkAll()
    getTotal()
})


//数量加
$('.goods-normal').on('click', '.add', function () {
    $oInfo = $(this).parents('.info')
    if ($count > 1) {
        $oInfo.find('.reduce').attr('click', ' true')
    }
    if ($count > 999) {
        $oInfo.find('.count').val(999)
        layer.msg('超过最大购买数量')
        return
    }
    $count = all($oInfo, 1)
    $id = $(this).parents('li').attr('goodsid')
    $addnum = $(this).parents('.num').find('.count').val()
    update($id, $addnum)
    $n = $('.goods-num').html() * 1
    $('.goods-num').html($n + 1)
    $('.shopping-trolley strong').html($n + 1)



})

//减
$('.goods-normal').on('click', '.reduce', function () {

    $oInfo = $(this).parents('.info')
    if ($(this).attr('click') === 'false') {
        return
    }
    if ($count < 2) {
        $(this).attr('click', 'false')
    }
    $count = all($oInfo, -1)
    $id = $(this).parents('li').attr('goodsid')
    $addnum = $(this).parents('.num').find('.count').val()
    update($id, $addnum)
    $n = $('.goods-num').html() * 1
    $('.goods-num').html($n - 1)
    $('.shopping-trolley strong').html($n - 1)

})


//输入框聚焦
$('.goods-normal').on('focus', '.count', function () {
    $startnum = $(this).val() //拿初始数
    // console.log('聚焦')
})
//输入框失焦
$('.goods-normal').on('change', '.count', function () {
    // console.log('失焦')
    if ($(this).val() < 1) {
        $(this).val('1')
    }
    if ($(this).val() > 999) {
        layer.msg('超过最大购买数量')
        $(this).val('999')
    }
    $id = $(this).parents('li').attr('goodsid')
    $addnum = $(this).val() //更改后的数目
    $subtotal = $(this).parents('.info').find('.price span').html() * $addnum
    
    $(this).parents('.info').find('.subtotal span').html($subtotal)
    update($id, $addnum)
    getTotal()
    $changenum = $addnum - $startnum //更改后的数目-初始数=  添加 || 减少了多少商品

    $n = $('.goods-num').html() * 1
    $('.goods-num').html($n + $changenum)
    $('.shopping-trolley strong').html($n + $changenum)
    // if( $('.goods-num').html()>99){
    //     $('.goods-num').html('99+')
    //     $('.shopping-trolley strong').html('99+')
    // }

})


//单选
$('.goods-normal').on('click', '.checkone', function () {
    checkAll()
    if ($(this).prop('checked')) {
        $(this).parents('.info').css({
            'background-color': '#fefaf1'
        })
    } else {
        $(this).parents('.info').css({
            'background-color': 'white'
        })
    }
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



function update(id, addnum) {
    $.ajax({
        url: `//${location.hostname}/php/project_php/addCar.php`,
        type: 'post',
        dataType: 'json',
        data: {
            'update': 1,
            'goodsid': $id,
            'username': $('.username').html(),
            'goodsnum': addnum,
        }
    }).then(({
        code,
    }) => {
        if (code) {

        }
    })
}


//结算
$('.submit').click(function () {
    var goodsid = [];
    var goodsnum = [];
    for (var i = 0; i < $('.checkone').length; i++) {
        if ($(`.checkone:eq(${i})`).prop('checked')) {
            $goodsid = $(`.checkone:eq(${i})`).parents('.info').attr('goodsid')
            $goodsnum = $(`.checkone:eq(${i})`).parents('.info').find('.count').val()

            goodsid.push($goodsid)
            goodsnum.push($goodsnum)
        }
    }

    localStorage.removeItem('goodsid', 'goodsnum')
    if ($('.checkone:checked').length >= 1) {
        localStorage.setItem('goodsid', goodsid)
        localStorage.setItem('goodsnum', goodsnum)
        location.href = '../html/settle_accounts.html'
    } else {
        layer.msg('还未选中任何商品', function () {
            //关闭后的操作
        });
    }

})