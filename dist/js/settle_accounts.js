$.ajax({
    url: 'http://api.yytianqi.com/citylist/id/2',
    type: 'post',
    dataType: 'json',
}).then(({
    list,
}) => {
   for(var i=0;i<list.length;i++){
    var name = list[i].name
    var html =`
    <option value="">${name}</option>`
    $('#province').append(html)
   }
})