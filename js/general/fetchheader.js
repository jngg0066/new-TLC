
fetch('../assets/header-footer/header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('header').innerHTML = data;
        loadCSS('../css/general/header.css');
    });


function loadCSS(filename) {
    var head = document.head;
    var link = document.createElement('link');

    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = filename;

    head.appendChild(link);
}
