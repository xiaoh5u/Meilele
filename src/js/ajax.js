function ajax({
    type ='GET',
    path,
    dataType='json',
    data,
    beforeCB,
    successCB
}) {
    var xhr = new XMLHttpRequest();
    var params = '';
    for (var key in data) {
        params += `${key}=${data[key]}&`
    }
    params = params.substring(0, params.length - 1)
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var obj = xhr.responseText
            if (dataType.toUpperCase() === 'JSON') {
                obj = JSON.parse(obj)
            }
            successCB && successCB(obj)
        } else {
            beforeCB && beforeCB();
        }

    }


    if (type.toUpperCase() === 'GET') {
        xhr.open(type, `${path}?${params}`, true)
        xhr.send()
    } else {
        xhr.open(type, path, true)
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
        xhr.send(params)
    }
    

}
