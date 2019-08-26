if (!user) {
    location.href = '/dist/html/user_login.html'
}

//进入页面加载用户收货地址
$.ajax({
    url: 'http://localhost/php/project_php/get_address.php',
    type: 'post',
    dataType: 'json',
    data: {
        'username': $('.username').html()
    }
}).then(({
    msg,
    code,
    data
}) => {
    data.forEach(({
        name,
        telephone,
        address,
        addressID,
    }) => {
        $('.addAddress').css('display', 'none')
        $html =
            ` <div class="address-li clear" addressID='${addressID}'>
                <div class="left-icon">
                </div>
                <div class="address-detail">
                    <input type="radio"  name='check'>
                    <span class='name'>${name}</span>
                    <p class="city-name">${address}</p>
                    <span class="tel">${telephone}</span>
                </div>
                <div class="control">
                    <a href="javascript:;" class="update">[编辑]</a>
                    <a href="javascript:;" class="delete">[删除]</a>
                </div>
            </div>`

        $('.address-list').append($html)
    })

})







//收货地址三级联动
$.ajax({
    url: 'http://api.yytianqi.com/citylist/id/2',
    type: 'post',
    dataType: 'json',
}).then(({
    list,
}) => {
    list.forEach(({
        name,
        city_id
    }) => {
        $html = `
        <option value="${city_id}">${name}</option>`
        $('#province').append($html)
    })

    $('.value').on('change', '#province', function () {
        $('#city').css('display', 'inline-block')
        $('#city').html(' <option value="">请选择城市</option>')
        $('#area').html(' <option value="">请选择地区</option>')
        $('.city').html('')
        $('.area').html('')
        $prov = $(this).val();
        $obj = list.filter(item => item.city_id === $prov)[0]
        $('.province').html($obj.name)
        $obj.list.forEach(({
            name,
            city_id
        }) => {
            $html = `
        <option value="${city_id}">${name}</option>`
            $('#city').append($html)

        })
        // 二级城市对象
        $second_city = $obj.list
    })
    //城市发生改变
    $('.value').on('change', '#city', function () {
        $('#area').css('display', 'inline-block')
        $('#area').html(' <option value="">请选择地区</option>')
        $('.area').html('')
        $prov = $(this).val();
        $obj = $second_city.filter(item => item.city_id === $prov)[0]
        $('.city').html($obj.name)
        if ($obj.list) {
            $obj.list.forEach(({
                name,
                city_id
            }) => {
                $html = `
            <option value="${city_id}">${name}</option>`
                $('#area').append($html)
            })
        } else {
            $('#area').css('display', 'none')
        }
        $area = $obj.list

    })
    $('.value').on('change', '#area', function () {
        $prov = $(this).val();
        $obj = $area.filter(item => item.city_id === $prov)[0]
        $('.area').html($obj.name)

    })
})


//地址栏
$('.close').on('click', function () {
    $('.info-input').css('display', 'none')
})

$('.addAddress').on('click', function () {
    $('.info-input').css('display', 'block')
    $('.updateAddress').css('display', 'none')
    $('.addressSubmit').css('display', 'block')
})

$('.right-add').on('click', function () {
    $('.info-input').css('display', 'block')
    $('.updateAddress').css('display', 'none')
    $('.addressSubmit').css('display', 'block')
})


//点击单选框添加寄送至何处
$('.address-list').on('click', ' input', function () {
    if ($(this).prop('checked')) {
        $html = `<i></i>寄送至`
        $(this).parents('.address-li').siblings().find('.left-icon').html(' ')
        $(this).parents('.address-li').find('.left-icon').html($html)

        $name = $(this).parents('.address-li').find('.name').html()
        $address = $(this).parents('.address-li').find('.city-name').html()
        $tel = $(this).parents('.address-li').find('.tel').html()
        $('.post_address>span').html($address)
        $('.consignee .name').html($name)
        $('.consignee .number').html($tel)
    }
})



//新增地址
$('#addressSubmit').on('click', function () {
    $name = $('#name').val()
    if ($('.area').html()) {
        $address = $('.province').html() + $('.city').html() + $('.area').html() + $('#detail').val();
    } else {
        $address = $('.province').html() + $('.city').html() + $('#detail').val();
    }
    $tel = $('#tel').val()
    $username = $('.username').html()
    if (!$name || !$address || !$tel) {
        return
    }
    $.ajax({
        url: 'http://localhost/php/project_php/user_address.php',
        type: 'post',
        dataType: 'json',
        data: {
            'username': $username,
            'name': $name,
            'address': $address,
            'tel': $tel
        }
    }).then(({
        msg,
        code,
        data,
        addressID
    }) => {
        if (code) {
            layer.msg('添加成功', {
                icon: 1,
                time: 1000
            }, function () {
                $('.addAddress').css('display', 'none')
                $('.info-input').css('display', 'none')
                $html =
                    ` <div class="address-li clear" addressID='${addressID}'>
                <div class="left-icon">
                    <i></i>寄送至
                </div>
                <div class="address-detail">
                    <input type="radio"  name='check' checked>
                    <span class='name'>${$name}</span>
                    <p class="city-name">${$address}</p>
                    <span class="tel">${$tel}</span>
                </div>
                <div class="control">
                    <a href="javascript:;" class="updata">[编辑]</a>
                    <a href="javascript:;" class="delete">[删除]</a>
                </div>
             </div>`

                $('.address-list').append($html)


                //
                $('.post_address>span').html($address)
                $('.consignee .name').html($name)
                $('.consignee .number').html($tel)
            });

        } else {
            layer.msg(msg)
        }



    })


})


//删除地址
$('.address-list').on('click', '.delete', function () {

    $id = $(this).parents('.address-li').attr('addressID')
    layer.confirm('is not?', {
        icon: 3,
        title: '提示'
    }, function (index) {
        $.ajax({
            url: 'http://localhost/php/project_php/remove_address.php',
            type: 'post',
            dataType: 'json',
            data: {
                'addressID': $id,
            },
        }).then(({
            code,
            msg
        }) => {
            if (code) {
                layer.msg('删除成功',{time:1000})
            }
        })

        layer.close(index);
    });

})



//地址信息更新
$('.address-list').on('click', '.update', function () {
    $('.info-input').css('display', 'block')
    $('.addressSubmit').css('display', 'none')
    $('.updateAddress').css('display', 'block')
    $id = $(this).parents('.address-li').attr('addressID')







    
    $('#updateAddress').on('click', function () {
        $name = $('#name').val()
        if ($('.area').html()) {
            $address = $('.province').html() + $('.city').html() + $('.area').html() + $('#detail').val();
        } else {
            $address = $('.province').html() + $('.city').html() + $('#detail').val();
        }
        $tel = $('#tel').val()
        if (!$name || !$address || !$tel) {
            return
        }



        $.ajax({
            url: 'http://localhost/php/project_php/update_address.php',
            type: 'post',
            dataType: 'json',
            data: {
                'addressID': $id,
                'name': $name,
                'address': $address,
                'tel': $tel
            },
        }).then(({
            msg,
            code,
            data
        }) => {
            if (code) {
                layer.msg('修改成功',{time:1000})
                $('.info-input').css('display','none')
            } else {
                layer.msg('修改失败',{time:1000})
                $('.info-input').css('display','none')
            }

        })

    })
})