
fetch('../assets/header-footer/footer.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('footer').innerHTML = data;
        loadCSS('../css/general/footer.css');
    });

function loadCSS(filename) {
    var head = document.head;
    var link = document.createElement('link');

    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = filename;

    head.appendChild(link);
}
