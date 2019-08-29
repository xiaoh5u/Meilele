//渲染页面

function getUrlContent(name) {
  var params = location.search;
  params = params.replace('?', '')
  var arr = params.split('&')
  var list = []
  arr.forEach(item => {
    var [key, content] = item.split('=')
    list.push({
      key,
      content
    })
  })
  var result = list.filter(item => item.key === `${name}`)[0]
  return (result.content)
}


var goodsid = getUrlContent('goodsid')

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
}).then(({
  code,
  msg,
  data
}) => {
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
      /************************************TOP图片部分↓************************************** */

      var smallimgs = goods_imgs.substring(1, goods_imgs.length - 1).split(',')
      $img = `
          <div class="top">
                    <img src="${goods_imgs_big}" class="smallImg" />
                    <div class="shadow"></div>

                    <div class="bigShadow">
                        <img src="${goods_imgs_big}" class="bigImg" />
                    </div>
                </div>

                <div class="hidden">
                    <ul class="goods_album_stage clear">
                        <li class="active"><img src="${goods_imgs_big}" alt=""></li>
                        <li><img src=${smallimgs[0]} alt=""></li>
                        <li><img src=${smallimgs[1]} alt=""></li>
                        <li><img src=${smallimgs[2]} alt=""></li>
                        <li><img src=${smallimgs[3]} alt=""></li>
                        <li><img src=${smallimgs[4]} alt=""></li>

                    </ul>
                    <div class="prev"></div>
                    <div class="next"></div>
                </div> 
          `
      $('.goods_display').html($img)

      /**************************************TOP图片部分↑************************************ */
      /**************************************TOP选项部分↓************************************ */
      $attr = goods_attr.substring(1, goods_attr.length - 1).split(',')

      if (!$attr[0] || !$attr[1]) {
        $attr = ['无选项', '无选项']
      }
      $info = `
      <h3 class="title">${goods_name}</h3>
                <p class="intro">${goods_desc}</p>
               
                    <dl class="price clear">
                        <dt>本站价</dt>
                        <dd>
                            <p>￥<span class="price_num">${goods_price}</span></p>
                        </dd>
                    </dl>
                    <dl class="goods_leix clear">
                        <dt>类型</dt>
                        <dd>
                            <a href="javascript:;" style="border: 1px solid rgb(230, 35, 24);">${$attr[0]}</a>
                            <a href="javascript:;">${$attr[1]}</a>
                        </dd>
                    </dl>
                    <dl class="goods_colors clear">
                        <dt>颜色</dt>
                        <dd>
                            <a href="javascript:;" style="border: 1px solid rgb(230, 35, 24);">原木色</a>
                            <a href="javascript:;">胡桃色</a>
                        </dd>
                    </dl>
                    <dl class="goods_guige clear">
                        <dt>规格</dt>
                        <dd>
                            内径：宽1500*长2000mm；外径：长2100*宽1570*高1030mm
                        </dd>
                    </dl>
      `
      $('.good_info_panel .table').prepend($info)

      /**************************************TOP选项部分↑************************************ */


      /**************************************详情部分↓************************************ */
      $('#JS_gd_tab_body_xiangqing').html(goods_detail)
      /**************************************详情部分↑************************************ */

    })

  }
})

//渲染页面





// ****************************放大镜
$('.goods_display').on('mousemove', ' .top', function (e) {
  var ev = event || e;
  $('.shadow').css('display', 'block')
  $('.bigShadow').css('display', 'block')


  maxLeft = $('.smallImg')[0].clientWidth - $('.shadow')[0].offsetWidth;
  maxTop = $('.smallImg')[0].clientHeight - $('.shadow')[0].offsetHeight;

  var oLeft = ev.pageX - $('.goods_display')[0].offsetLeft - $('.shadow')[0].offsetWidth / 2;
  var oTop = ev.pageY - $('.goods_display')[0].offsetTop - $('.shadow')[0].offsetHeight / 2;



  if (oLeft < 0) {
    oLeft = 0;
  }
  if (oLeft > maxLeft) {
    oLeft = maxLeft;
  }

  if (oTop < 0) {
    oTop = 0;
  }
  if (oTop > maxTop) {
    oTop = maxTop;
  }

  $bigImgWidth = parseInt($('.bigImg').css('width'))
  $bigShadowWidth = parseInt($('.bigShadow').css('width'))
  $shadowWidth = parseInt($('.shadow').css('width'))
  $smallImgWidth = $('.smallImg')[0].offsetWidth;

  $scale = ($bigImgWidth - $bigShadowWidth) / ($smallImgWidth - $shadowWidth)
  $('.shadow').css({
    'left': `${oLeft}px`,
    'top': `${oTop}px`
  })

  $('.bigImg').css({
    'top': -oTop * $scale + "px",
    'left': -oLeft * $scale + 'px',

  })

})
$('.goods_display').on('mouseleave', '.top', function () {
  $('.shadow').css('display', 'none')
  $('.bigShadow').css('display', 'none')
})



$('.goods_display').on('mouseenter', 'li', function () {
  $(this).addClass('active').siblings().removeClass('active')
  $path = $(this).find('img').attr('src')
  $('.smallImg').attr('src', $path)
  $('.bigImg').attr('src', $path)
})


/*******************************商品展示区小图左右滑动事件********************************/
$left = 0
$sum = 0;
$('.goods_display').on("click", '.next', function () {
  $left = -94
  $sum += $left
  if ($sum < (-94 * ($('.goods_album_stage li').length - 5))) {
    $sum = 0
  }
  $('.goods_album_stage').animate({
    left: $sum + 'px'
  })

})


$('.goods_display').on("click", '.prev', function () {
  $left = 94

  if ($sum > -94) {
    $sum = -94
  }
  $sum += $left
  $('.goods_album_stage').animate({
    left: $sum + 'px'
  })
})
/*******************************商品展示区小图左右滑动事件********************************/




//商品数量加减

$('.click').on('click', '.add', function () {
  $num = $('.click .num').val() * 1
  $res = $num + 1
  if ($res > 999) {
    $res = 999
    layer.msg('超过购买上限', function () {})
  }
  $('.click .num').val($res)
})

$('.click').on('click', '.reduce', function () {
  $num = $('.click .num').val() * 1
  $res = $num - 1
  if ($res < 1) {
    $res = 1
    layer.msg('数量不能为0', function () {})
  }

  $('.click .num').val($res)
})



$('.click').on('change', ' .num', function () {
  $num = $('.click .num').val() * 1
  if ($num > 999) {
    $num = 999
    layer.msg('咋滴？要上天呐', function () {})
  }
  if ($num < 1) {
    $num = 1
    layer.msg('数量不能为0', function () {})
  }
  
  
})

//商品选择点击事件
$('.good_info_panel').on('click', 'a', function () {
  $(this).css({
    border: '1px solid #e62318'
  }).siblings().css({
    border: '1px solid #ddd'
  })
})


$('.good_info_panel').on('click', '.goods_colors a', function () {
  $(this).css({
    border: '1px solid #e62318'
  }).siblings().css({
    border: '1px solid #ddd'
  })
})




$('.goods_info').on('click', '.addSpc', function () {

  if (!user) {
    layui.use('layer', function () {
      var layer = layui.layer;

      layer.msg('还没登录哦');
      return
    });
  }


  $username = $('.username').html()
  $goodsnum = $('.goods_add .num').val()*1
  
  $.ajax({
    url: `//${location.hostname}/php/project_php/get_car_num.php`,
    type: 'post',
    dataType: 'json',
    data: {
      'goodsid': goodsid,
      'username': $username
    }
  }).then(({
    code,
    count
  }) => {
    var num = ($goodsnum +Number(count))*1
    if (count > 0) {
      $.ajax({
        url: `//${location.hostname}/php/project_php/addCar.php`,
        type: 'post',
        dataType: 'json',
        data: {
          'update': 1,
          'goodsid': goodsid,
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
          'goodsid': goodsid,
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
        $n = $('.goods-num').html() * 1
        $('.goods-num').html($n + 1)
        $('.shopping-trolley strong').html($n + 1)


  
      })

    }
  })


})