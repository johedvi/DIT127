let navbar = document.getElementsByClassName("navbar")[0];
let navbarContent = document.getElementById("navbarSupportedContent");

navbar.addEventListener("click", function(e){
    if (e.target.classList.contains("navbar-toggler") || e.target.classList.contains("navbar-toggler-icon")) {
        navbarContent.classList.toggle("open");
    }
    else if (!(e.target == navbarContent || e.target.tagName == "INPUT" || e.target.tagName == "UL")) {
        navbarContent.classList.remove("open");
    }
});

const listener = addEventListener('blur', function(e) {
    navbarContent.classList.remove("open");
    removeEventListener('blur', listener);
});
