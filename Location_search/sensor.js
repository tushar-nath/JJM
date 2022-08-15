var container = document.getElementById('container');
var links = container.getElementsByTagName('a');
for (var i = 0; i < links.length; i++) {
    links[i].addEventListener('click', function (e) {
        e.preventDefault();
        var value = this.getAttribute('value');
        var id = this.getAttribute('id');
        console.log(value);
        sessionStorage.sensorId = value;
        window.location.href = '../starting-page/starting-page.html';
    });
}