'use strict';

function ajax(_ref) {
    var _ref$type = _ref.type,
        type = _ref$type === undefined ? 'GET' : _ref$type,
        path = _ref.path,
        _ref$dataType = _ref.dataType,
        dataType = _ref$dataType === undefined ? 'json' : _ref$dataType,
        data = _ref.data,
        beforeCB = _ref.beforeCB,
        successCB = _ref.successCB;

    var xhr = new XMLHttpRequest();
    var params = '';
    for (var key in data) {
        params += key + '=' + data[key] + '&';
    }
    params = params.substring(0, params.length - 1);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var obj = xhr.responseText;
            if (dataType.toUpperCase() === 'JSON') {
                obj = JSON.parse(obj);
            }
            successCB && successCB(obj);
        } else {
            beforeCB && beforeCB();
        }
    };

    if (type.toUpperCase() === 'GET') {
        xhr.open(type, path + '?' + params, true);
        xhr.send();
    } else {
        xhr.open(type, path, true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.send(params);
    }
}