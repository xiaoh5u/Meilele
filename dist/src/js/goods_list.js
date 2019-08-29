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
        if ($(this).find('dt').html() == $head) {
            $(this).css({
                display: 'block'
            })
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



$('#list').on('mouseenter', 'li', function () {
    $(this).css({
        'z-index': 2
    }).siblings().css({
        'z-index': 1
    })
})



$('.screen_left a').on('click', function () {
    $(this).css({
        'background-color': '#e62318',
        'color': 'white'
    }).siblings().css({
        'background-color': '#e6e6e6',
        'color': '#666'
    })
})


/*******************************************商品分类*****************************************/


/*******************************************商品分类*****************************************/



/******************************获取数据库商品&&模糊查询&&分页******************************* */



layui.use('laypage', function () {
    var laypage = layui.laypage;

    // 全局分类
    var label = '';
    var order = 'goods_id';
    var sort = 'ASC';
    var num = 0
    renderList(1, true);
    var timer;
    $('.search-input').on('input', function () {
        clearTimeout(timer);
        timer = setTimeout(() => {

            label = $(this).val()
            renderList(1, true);
        }, 500)

    })


    $('.search-button').on('click', function () {
        label = $(this).val()
        renderList(1, true);
    })

    $('.screen_left a:eq(0)').on('click', function () {
        num++;
        if (num % 2 === 0) {
            sort = 'ASC'
        } else if (num % 2 === 1) {
            sort = 'DESC';
        }
        order = 'goods_id';
        renderList(1, false);
    })
    $('.sales-order ').on('click', function () {
        num++;
        if (num % 2 === 0) {
            sort = 'ASC'
        } else if (num % 2 === 1) {
            sort = 'DESC';
        }
        order = 'goods_xl';
        renderList(1, false);
    })
    $('.price-order ').on('click', function () {
        num++;
        if (num % 2 === 0) {
            sort = 'ASC'
        } else if (num % 2 === 1) {
            sort = 'DESC';
        }
        order = 'goods_price';
        renderList(1, false);
    })

    var str = ''
    //类型分类
    $('.goods_classify a').on('click', function () {
        label = $(this).html()
        str += label
        renderList(1, true);
    })
    //价格分类
    $('.goods_price a').on('click', function () {
        $arr = $(this).html().split('-')
        $start = $arr[0];
        $end = $arr[1];
        priceClassfy($start, $end)
    })

    //风格选择
    $('.goods_style a').on('click', function () {
        label = $(this).html()
        str += label
        renderList(1, true);
    })
    //风格选择

    //清空选择
    $('.selected .clearAll').on('click', function () {
        label = '';
        sort = ''
        str = ''
        renderList(1, true);
        $('.screen_left a:eq(0)').css({
            'background-color': '#e62318',
            'color': 'white'
        }).siblings().css({
            'background-color': '#e6e6e6',
            'color': '#666'
        })
    })
    //清空选择

    function renderList(page = 1, tag) {
        $.ajax({
            url: `//${location.hostname}/php/project_php/get_goodsList.php`,
            type: 'get',
            dataType: 'json',
            beforeSend: (function () {
                layui.use('layer', function () {
                    var layer = layui.layer;
                    layer.msg('拼命加载中..')
                });
            }),
            data: {
                page,
                size: 20,
                label,
                order,
                sort
            },
        }).then(({
            code,
            data,
            total,
        }) => {
            var total = total
            $('.goods_total .goods_num').html(total)
            var html = '';
            if (code) {
                data.forEach(({
                    goods_id,
                    goods_name,
                    goods_desc,
                    goods_price,
                    goods_attr,
                    goods_imgs_big,
                    goods_imgs,
                    goods_detail,
                    goods_xl
                }) => {
                    html += `
                <li>
                <div class="box">
                    <a href="javascript:;" goods_id='${goods_id}'>
                        <div class="small_img">
                            <img src="${goods_imgs_big}"
                                alt="">

                        </div>
                        <p class="price">¥<span>${goods_price}</span></p>
                    <div class='name'>${goods_name}</div>
                    </a>
                    <div class="sale">
                        <p>已售<span style="color: #38b;">${goods_xl}</span></p>
                    </div>
                    <div class="option">
                        <a href="javascript:;" class="comparison">
                            <i></i>
                            <span>对比</span>
                        </a>
                        <a href="javascript:;" class="like">
                            <i></i>
                            <span>收藏</span>
                        </a>
                        <a href="javascript:;" class="addCar">
                            <i></i>
                            <span>加入购物车</span>

                        </a>

                    </div>
                </div>
                </li>

                `               
                });
                $('#list').html(html)
              
                if (tag) {
                    laypage.render({
                        elem: 'paga', //注意，这里的 test1 是 ID，不用加 # 号
                        limit: 20,
                        theme: '#e62318',
                        count: total * 1, //数据总数，从服务端得到
                        jump: function (obj, first) {
                            //obj包含了当前分页的所有参数，比如：
                            // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                            // console.log(obj.limit); //得到每页显示的条数

                            //首次不执行
                            if (!first) {
                                //do something
                                renderList(obj.curr, false);
                            }
                        }
                    });
                }



            }
        })




    }
});




/******************************获取数据库商品&&模糊查询&&分页******************************* */



/****************************************加入购物车***************************************** */

$('#list').on('click', '.addCar', function () {
    if (!user) {
        layer.msg('请登录', function () {

        });
        return
    }

    $goodsid = $(this).parents('.box').find('a:eq(0)').attr('goods_id')
    $username = $('.username').html()
    $goodsnum = 1;

    $.ajax({
        url: `//${location.hostname}/php/project_php/get_car_num.php`,
        type: 'post',
        dataType: 'json',
        data: {
            'goodsid': $goodsid,
            'username': $username
        }
    }).then(({
        code,
        count
    }) => {
        var num = $goodsnum += count * 1
        if (count > 0) {
            $.ajax({
                url: `//${location.hostname}/php/project_php/addCar.php`,
                type: 'post',
                dataType: 'json',
                data: {
                    'update': 1,
                    'goodsid': $goodsid,
                    'username': $username,
                    'goodsnum': num,
                }
            }).then(({
                code,
            }) => {
                if (code) {
                    layer.msg('加购成功', {
                        icon: 1,
                        time: 2000
                    }, function () {});
                    $n = $('.goods-num').html() * 1
                    $('.goods-num').html($n + 1)
                    $('.shopping-trolley strong').html($n + 1)
                }
            })

        } else {
            $.ajax({
                url: `//${location.hostname}/php/project_php/addCar.php`,
                type: 'post',
                dataType: 'json',
                data: {
                    'update': 0,
                    'goodsid': $goodsid,
                    'username': $username,
                    'goodsnum': $goodsnum
                }
            }).then(({
                code,
            }) => {
                layer.msg('添加成功', {
                    icon: 1,
                    time: 1000
                }, function () {});
                $n = $('.goods-num').html() * 1
                $('.goods-num').html($n + 1)
                $('.shopping-trolley strong').html($n + 1)

            })

        }
    })


})



/****************************************加入购物车***************************************** */


//价格排序函数
function priceClassfy(start, end) {
    ajax({
        url: `//${location.hostname}/php/project_php/goods_price_classfy.php`,
        data: {
            'start': start,
            'end': end
        }
    })
}



// 常用AJAX函数
function ajax({
    url,
    data
}) {

    $.ajax({
        url: url,
        type: 'post',
        dataType: 'json',
        data: data,
        beforeSend: (function () {
            layui.use('layer', function () {
                var layer = layui.layer;
                layer.msg('拼命加载中..')
            });
        }),

    }).then(({
        code,
        msg,
        data,

    }) => {
        if (code) {
            $('#list>li').remove()

            data.forEach(({
                goods_id,
                goods_name,
                goods_price,
                goods_imgs_big,
                goods_xl
            }) => {
                html = `
                    <li>
                    <div class="box">
                        <a href="../html/goods_detail.html" target="_blank" goods_id='${goods_id}'>
                            <div class="small_img">
                                <img src="${goods_imgs_big}"
                                    alt="">
        
                            </div>
                            <p class="price">¥<span>${goods_price}</span></p>
                        <div class='name'>${goods_name}</div>
                        </a>
                        <div class="sale">
                            <p>已售<span style="color: #38b;">${goods_xl}</span></p>
                        </div>
                        <div class="option">
                            <a href="javascript:;" class="comparison">
                                <i></i>
                                <span>对比</span>
                            </a>
                            <a href="javascript:;" class="like">
                                <i></i>
                                <span>收藏</span>
                            </a>
                            <a href="javascript:;" class="addCar">
                                <i></i>
                                <span>加入购物车</span>
        
                            </a>
        
                        </div>
                    </div>
                    </li>
        
                    `
                $('#list').prepend(html)
            })
        }
    })
}




$('#list').on('click', 'img', function () {
    $id = $(this).parents('.box').find('a:eq(0)').attr('goods_id')
    location.href = `../html/goods_detail.html?goodsid=${$id}`
})