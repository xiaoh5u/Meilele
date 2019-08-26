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
})

$('.right-add').on('click', function () {
    $('.info-input').css('display', 'block')
})


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
    }) => {
        if (code) {
            alert(msg)
        } else {

        }



    })


})