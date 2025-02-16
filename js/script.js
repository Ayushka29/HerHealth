// Select the menu toggle button and the navigation container
const menuToggle = document.getElementById('menu-toggle');
const navRight = document.getElementById('nav-right');

// Add a click event listener to the hamburger menu
menuToggle.addEventListener('click', function () {
    navRight.classList.toggle('show'); // Add or remove the 'show' class
});

$(document).ready(function(){
        $('.owl-carousel').owlCarousel({
    loop:true,
    margin:10,
    nav:false,
    autoplay:false,
    autoplayTimeout:3000,
    responsive:{
    0:{
        items:1
    },
    600:{
        items:1
    },
    1800:{
        items:1
    }
    }
    })
});