window.onload = function () {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open('GET', '/getData', true);
    xmlHttp.send(null);
    xmlHttp.onreadystatechange = function () {
        if(xmlHttp.readyState === 4 && xmlHttp.status === 200){
            console.log(xmlHttp.responseText, 7);
            console.log(typeof xmlHttp.responseText);
        }
    }
}

// get请求  -->  改post请求
// function login () {
//     console.log(document.getElementById('stuNum'));
//     var stuNum = document.getElementById('stuNum').value;
//     var password = document.getElementById('password').value;
    
//     var params = 'stuNum=' + stuNum + '&password=' + password;
    
//     var xmlHttp = new XMLHttpRequest();
//     xmlHttp.open('GET', '/login?' + params, true);
//     xmlHttp.send(null);
//     xmlHttp.onreadystatechange = function () {
//         if(xmlHttp.readyState === 4 && xmlHttp.status === 200){
//             if(xmlHttp.responseText === 'OK'){
//                 alert('成功！')
//             }else{
//                 alert('失败！')
//             }
//         }
//     }
// }


function login () {
    var stuNum = document.getElementById('stuNum').value;
    var password = document.getElementById('password').value;
    var params = 'stuNum=' + stuNum + '&password=' + password;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open('POST', '/login', true);
    xmlHttp.send(params);
    xmlHttp.onreadystatechange = function () {
        if(xmlHttp.readyState === 4 && xmlHttp.status === 200){
            if(xmlHttp.responseText === 'OK'){
                alert('成功！')
                location.href = '/main.html'
            }else{
                alert('失败！')
            }
        }
    }
}
