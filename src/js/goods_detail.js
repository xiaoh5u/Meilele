layui.use('element', function () {
  var element = layui.element;
});


$('.goods_display .top').on('mousemove', function (e) {
  var ev = event || e;
  $('.shadow').css('display', 'block')
  $('.bigShadow').css('display', 'block')


  maxLeft = $('.smallImg')[0].clientWidth - $('.shadow')[0].offsetWidth;
  maxTop = $('.smallImg')[0].clientHeight - $('.shadow')[0].offsetHeight;


  var oLeft = ev.pageX - $('.shadow')[0].offsetWidth / 2;
  var oTop = ev.pageY - $('.shadow')[0].offsetHeight / 2;
  console.log( oLeft,oTop)

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
  var bigShadowWidth = parseInt($('.bigshadow').css('width'))
  var shadowWidth = parseInt($('.shadow').css('width'))
  var smallImgWidth = $('.smallImg')[0].offsetWidth;

  var scale = (bigImgWidth - bigShadowWidth) / (smallImgWidth - shadowWidth)

  $('.shadow').css({
    'left': `${oLeft}px`,
    'top': `${oTop}px`
  })

  $('.bigImg').css({
    'left': -oLeft * scale + 'px',
    ' top': -oTop * scale + "px"
  })

}) // oTop.onmouseout = function() {
//   oShadow.style.display = "none";
//   oBigShadow.style.display = "none";
// };