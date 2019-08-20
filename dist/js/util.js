'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function queryString(name) {
  var search = location.search; // ?id=7&sdas=2121
  search = search.replace('?', ''); // id=7&sdas=2121
  var arr = search.split('&'); // ['id=7', 'sdas=2121']

  var list = [];

  arr.forEach(function (item) {
    var _item$split = item.split('='),
        _item$split2 = _slicedToArray(_item$split, 2),
        key = _item$split2[0],
        value = _item$split2[1];

    list.push({
      key: key,
      value: value
    });
  });

  // console.log(list);

  var obj = list.filter(function (item) {
    return item.key === name;
  })[0];

  // console.log(obj.value);

  return obj.value;
}