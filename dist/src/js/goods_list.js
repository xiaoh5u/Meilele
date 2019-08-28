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
var str = ''
//类型分类
$('.goods_classify a').on('click', function () {
    $title = $(this).html()
    str += $title
    getAll(str);
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
    $title = $(this).html()

    str += $title
    getAll(str);
})

//风格选择

//清空选择
$('.selected .clearAll').on('click', function () {
    getAll('');
    str = ''

    $('.screen_left a:eq(0)').css({
        'background-color': '#e62318',
        'color': 'white'
    }).siblings().css({
        'background-color': '#e6e6e6',
        'color': '#666'
    })
})
//清空选择

/*******************************************商品分类*****************************************/



/******************************获取数据库商品&&模糊查询&&分页******************************* */

//默认搜索为空
getAll('')

var timer;

$('.search-input').on('input', function () {
    clearTimeout(timer);

    timer = setTimeout(() => {

        var key = $(this).val()
        getAll(key);
    }, 1000)

})

$('.search-button').on('click', function () {
    var key = $(this).val()
    getAll(key);
})

////获取商品总条数
function getAll(key) {

    $.ajax({
        url: 'http://localhost/php/project_php/get_goods_num.php',
        type: 'post',
        dataType: 'json',
        data: {
            key
        }
    }).then(({
        data
    }) => {
        $('.goods_num').html(data)
        getLayui(key, data)

    })

}
//调用Layui分页功能
function getLayui(key, data) {
    //调用layui分页

    layui.use('laypage', function () {
        var laypage = layui.laypage;

        //执行一个laypage实例
        laypage.render({
            elem: 'list',
            count: data, //数据总数
            theme: '#e62318',

            jump: function (obj) {

                //模糊查询
                renderList(key, obj)
            }
        });
    });
}

 

//模糊查询 及 获取商品列表
function renderList(key, obj) {
    $.ajax({
        url: 'http://localhost/php/project_php/get_goodsList.php',
        type: 'post',
        dataType: 'json',
        beforeSend: (function () {
            layui.use('layer', function () {
                var layer = layui.layer;
                layer.msg('拼命加载中..')
            });
        }),
        data: {
             key,
            'start': obj.curr,
            'pageSize': 20,
        }
    }).then(({
        code,
        msg,
        data
    }) => {
        if (code) {
            $('#list>li').remove()

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
                html = `
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
                $('#list').prepend(html)
            })

            /****************************以上为基础代码***************************** */



            /**排序**/
            var oder = 'normal'
            var num = 0;
            var attr = 'id'

            $('.screen_left a:eq(0)').on('click', function () {
                num++;
                attr = 'id'
                orderA(num, attr)
            })
            $('.sales-order ').on('click', function () {
                num++;
                attr = 'goods_sales'
                orderA(num, attr)
            })
            $('.price-order ').on('click', function () {
                num++;
                attr = 'goods_price'
                orderA(num, attr)
            })

            function orderA(num, attr) {
                if (num % 3 === 1) {
                    order = 'asc'

                } else if (num % 3 === 2) {
                    order = 'desc'
                } else {
                    order = 'normal'
                }
                ajax({
                    url: 'http://localhost/php/project_php/goods_order.php',
                    data: {
                        order,
                        attr,
                    }
                })
            }
            /**排序**/

        }
    })




}
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
        url: 'http://localhost/php/project_php/get_car_num.php',
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
        var num =  $goodsnum += count*1
        if (count > 0) {
            $.ajax({
                url: 'http://localhost/php/project_php/addCar.php',
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
                    $n =  $('.goods-num').html()*1
                    $('.goods-num').html($n+1)
                    $('.shopping-trolley strong').html($n+1)
                }
            })

        } else {
            $.ajax({
                url: 'http://localhost/php/project_php/addCar.php',
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
                        time: 2000
                    }, function () {});
                   $n =  $('.goods-num').html()*1
                    $('.goods-num').html($n+1)
                    $('.shopping-trolley strong').html($n+1)
                
            })

        }
    })


})



/****************************************加入购物车***************************************** */


//价格排序函数
function priceClassfy(start, end) {
    ajax({
        url: 'http://localhost/php/project_php/goods_price_classfy.php',
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




$('#list').on('click','img',function(){
    $id = $(this).parents('.box').find('a:eq(0)').attr('goods_id')
    location.href=  `../html/goods_detail.html?goodsid=${$id}`
})