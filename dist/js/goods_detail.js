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
      url: 'http://localhost/php/project_php/get_goods_detail.php',
      type: 'post',
      dataType: 'json',
      data:{
       goodsid
      },
      beforeSend: (function () {
        layui.use('layer', function () {
          var layer = layui.layer;
          layer.msg('拼命加载中..')
        });
      }),
    }).then(({code,msg,data})=>{
      if(code){
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
        })=>{

          console.log(goods_imgs_big)
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
                        <li><img src="${goods_imgs_big}" alt=""></li>
                        <li><img src="${goods_imgs_big}" alt=""></li>
                        <li><img src="${goods_imgs_big}" alt=""></li>
                        <li><img src="${goods_imgs_big}" alt=""></li>
                        <li><img src="${goods_imgs_big}" alt=""></li>
                        <li><img src="${goods_imgs_big}" alt=""></li>
                        <li><img src="${goods_imgs_big}" alt=""></li>
                        <li><img src="${goods_imgs_big}" alt=""></li>

                    </ul>
                    <div class="prev"></div>
                    <div class="next"></div>
                </div> 

          `

        $('.goods_display').html($img)



        })
      }
    })
  
        //渲染页面

        // ****************************放大镜
        $('.goods_display').on('mousemove',' .top',function (e) {
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
        $('.goods_display').on('mouseleave','.top',function () {
          $('.shadow').css('display', 'none')
          $('.bigShadow').css('display', 'none')
        })






        /*******************************商品展示区小图左右滑动事件********************************/
        $left = 0
        $sum = 0;
        $('.goods_display').on("click",'.next',function () {
          console.log(123)
          $left = -94
          $sum += $left
          if ($sum < (-94 * ($('.goods_album_stage li').length - 5))) {
            $sum = 0
          }
          $('.goods_album_stage').animate({
            left: $sum + 'px'
          })
          
        })


        $('.goods_display').on("click",'.prev',function () {
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

        $('.click').on('click','.add', function () {
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



        $('.click').on('change',' .num', function () {
          $num = $('.click .num').val() * 1
          if ($num > 999) {
            $num = 999
            layer.msg('咋滴？要上天呐', function () {})
          }
          if ($num < 1) {
            $num = 1
            layer.msg('数量不能为0', function () {})
          }
          $('.click .num').val($num)
        })

        //商品选择点击事件
        $('.goods_leix').on('click','a',function () {
          $(this).css({
            border: '1px solid #e62318'
          }).siblings().css({
            border: '1px solid #ddd'
          })
        })


        $('.goods_colors').on('click','a', function () {
          $(this).css({
            border: '1px solid #e62318'
          }).siblings().css({
            border: '1px solid #ddd'
          })
        })