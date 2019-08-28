function queryString(name) {
  var search = location.search;   // ?id=7&sdas=2121
  search = search.replace('?', ''); // id=7&sdas=2121
  var arr = search.split('&'); // ['id=7', 'sdas=2121']

  var list = [];

  arr.forEach(item => {
    var [key, value] = item.split('=');
    list.push(
      {
        key,
        value
      }
    );
  });

  // console.log(list);

  var obj = list.filter(item => item.key === name)[0];

  // console.log(obj.value);

  return obj.value;
}