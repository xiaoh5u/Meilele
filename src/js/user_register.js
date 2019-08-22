$('.registerBox').on('input', function (e) {
    var ev = event || e;
    var target = ev.target || ev.srcElement

    if (target.id === 'username') {
        check(/^[a-zA-Z_\u4e00-\u9fa5][\w\u4e00-\u9fa5]{3,19}$/, $(target).val(), '.userName i',
            '.username_p', target)
    }
    if (target.id === 'password') {
        check(/(?![A-Z]+$)(?![a-z]+$)(?!\d+$)\S{6,19}$/, $(target).val(), '.userPwd i', '.password_p',
            target)

        //******************************
        // 重新输入密码时重置confirm状态
        $('#confirm').val('').removeClass('error')
        $('.pwdConfirm i').css('display', 'none')
        $('.confirm_p').hide().removeClass('error')
        //******************************
    }
    if (target.id === 'confirm') {

        //密码框内有内容时进行以下验证
        if ($('#password').val()) {
            check(new RegExp('^' + $('#password').val() + '$'), $(target).val(), '.pwdConfirm i',
                '.confirm_p',
                target)
        }

    }

    if (target.id === 'telephone') {
        check(/^[1]\d{10}$/, $(target).val(), '.telePhone i', '.telephone_p', target)

    }
    if (target.id === 'input_code') {
        var str = ''
        for (var i = 0; i < 4; i++) {
            str += $(`#code_num>span:eq(${i})`).html()
        }
        check(new RegExp('^' + str.toUpperCase() + '$'), $(target).val().toUpperCase(),
            '.code i',
            '.code em',
            target)
    }

})


//正则判断
function check(reg, value, ele, error, target) {
    var res = reg.test(value);
    if (res) {
        //正确
        $(ele).css('display', 'inline-block')
        $(error).hide().removeClass('error')
        $(target).removeClass('error')
        $(target).attr('check_num', '1')
    } else {
        //错误
        $(ele).hide()
        $(error).css('display', 'inline-block').addClass('error')
        $(target).addClass('error')
        $(target).attr('check_num', '0')
        //字体图标不需要error
        $('.code em').removeClass('error')
    }
}



layui.use('layer', function () {
    var layer = layui.layer;
});



$('#button').on('click', function () {
    var oInputs = document.querySelectorAll('.registerBox input')
    var sum = 0;
    //**********************************************
    //在以上代码判断时 添加一个check_num,
    //正确为1，错误为0，点击注册时相加，不为5时弹提示框
    //**********************************************
    for (var i = 0; i < oInputs.length - 1; i++) {
        sum += oInputs[i].getAttribute('check_num') * 1
    }
    if (sum === 5) {
        //验证通过
        $.ajax({
            url: 'http://localhost/php/project_php/user_register.php',
            type: 'post',
            dataType: 'json',
            data: {
                username: $('#username').val(),
                password: $('#password').val(),
                telephone: $('#telephone').val()
            },
            beforeSend: (function () {
                    var index = layer.load();
            })

        }).then(({
            code,
            msg,
            data
        }) => {
            layer.close(layer.index);
            if (code) {
                layer.msg(msg, {
                    icon: 1,
                    time: 2000
                }, function () {
                    location.href = '/dist/html/user_login.html'
                });
            } else {
                layer.msg(msg, {
                    icon: 2
                });
            }
        })


    } else {
            layer.msg('输入有误', function () {});
    }
})


// **********************************************************
//虚拟验证码
$('#code_num').on('click', function () {
    codeN(4)
})
codeN(4)

function codeN(n) {
    var code = '';
    var sourceArr = [];

    for (var i = 48; i <= 57; i++) {
        sourceArr.push(String.fromCharCode(i))
    }
    for (var i = 97; i <= 122; i++) {
        sourceArr.push(String.fromCharCode(i))
    }
    for (var i = 65; i <= 90; i++) {
        sourceArr.push(String.fromCharCode(i))
    }

    for (var i = 0; i < n; i++) {
        var randomNum = sourceArr[Math.floor(Math.random() * sourceArr.length)]
        $(`#code_num>span:eq(${i})`).html(randomNum).css('color', randomColor())
    }
    return code;

}

function randomColor() {
    var r = Math.round(Math.random() * 255)
    var g = Math.round(Math.random() * 255)
    var b = Math.round(Math.random() * 255)
    var rgb = 'rgb' + '(' + r + ',' + g + ',' + b + ')'
    return rgb
}