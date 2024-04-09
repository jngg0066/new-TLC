var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
        var isActive = this.classList.toggle("active");
        var content = this.nextElementSibling;
        
        for (var j = 0; j < coll.length; j++) {
            if (coll[j] !== this) {
                coll[j].classList.remove("active");
                coll[j].nextElementSibling.style.display = "none";
            }
        }
        
        content.style.display = isActive ? "block" : "none";
    });
}
