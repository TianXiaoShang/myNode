window.onload = function () {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open('GET', '/getData', true);
    xmlHttp.send(null);
    xmlHttp.onreadystatechange = function () {
        if(xmlHttp.readyState === 4 && xmlHttp.status === 200){
            console.log(xmlHttp.responseText);
            console.log(typeof xmlHttp.responseText);
        }
    }
}
