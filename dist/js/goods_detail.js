$('.goods_display .top').on('mousemove', function (e) {
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

  var bigImgWidth = parseInt($('.bigImg').css('width'))
  var bigShadowWidth = parseInt($('.bigShadow').css('width'))
  var shadowWidth = parseInt($('.shadow').css('width'))
  var smallImgWidth = $('.smallImg')[0].offsetWidth;

  var scale = (bigImgWidth - bigShadowWidth) / (smallImgWidth - shadowWidth)
  $('.shadow').css({
    'left': `${oLeft}px`,
    'top': `${oTop}px`
  })

  $('.bigImg').css({
    'top': -oTop * scale + "px",
    'left': -oLeft * scale + 'px',

  })

})
$('.goods_display .top').mouseleave(function () {
  $('.shadow').css('display', 'none')
  $('.bigShadow').css('display', 'none')
})





//放大镜部分未完成
$('.goods_album_stage li').on('mouseenter', function () {
  $(this).addClass('active').siblings().removeClass('active')
})





/*******************************商品展示区小图左右滑动事件********************************/
$left = 0
$sum = 0;
$('.hidden .next').click(function () {
  $left = -94
  $sum += $left
  if ($sum < (-94 * ($('.goods_album_stage li').length - 5))) {
    $sum = 0
  }
  $('.goods_album_stage').animate({
    left: $sum + 'px'
  })
})


$('.hidden .prev').click(function () {
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

$('.click .add').on('click', function () {
  $num = $('.click .num').val() * 1
  $res = $num + 1
  if ($res > 999) {
    $res = 999
    layer.msg('超过购买上限', function () {})
  }
  $('.click .num').val($res)
})

$('.click .reduce').on('click', function () {
  $num = $('.click .num').val() * 1
  $res = $num - 1
  if ($res < 1) {
    $res = 1
    layer.msg('数量不能为0', function () {})
  }

  $('.click .num').val($res)
})



$('.click .num').on('change',function(){
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
$('.goods_leix a').on('click', function () {
  $(this).css({
    border: '1px solid #e62318'
  }).siblings().css({
    border: '1px solid #ddd'
  })
})


$('.goods_colors a').on('click', function () {
  $(this).css({
    border: '1px solid #e62318'
  }).siblings().css({
    border: '1px solid #ddd'
  })
})