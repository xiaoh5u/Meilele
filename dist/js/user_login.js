$('#btn').on('click', function () {
    $.ajax({
        url: 'http://localhost/php/project_php/user_login.php',
        type: 'post',
        dataType: 'json',
        data: {
            username: $('#username').val(),
            password: $('#password').val()
        },
        beforeSend: (function () {
            layui.use('layer', function(){
                var layer = layui.layer;
                var index = layer.load(1);
              });    
        })
    }).then(({
        code,
        msg,
        data
    }) => {
        layer.close(layer.index);
        if (code) {
            sessionStorage.setItem(`userName`,`${$('#username').val()}`)
            layer.msg(msg, {
                icon: 1,
                time: 2000
              }, function(){
                location.href ='/dist/index.html'
              });  
        } else {
            layer.msg(msg, {icon: 2});
        }

    })
})