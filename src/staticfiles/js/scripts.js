// Function to handle scroll events
window.onscroll = function() {
    scrollFunction();
};

function scrollFunction() {
    var navbar = document.querySelector(".main-nav");
    var menuItems = document.querySelectorAll(".main-nav__menu-item-link");

    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        navbar.classList.add("shrink");
        menuItems.forEach(function(item) {
            item.setAttribute("tabindex", "-1"); // Disable tab focus
            item.style.pointerEvents = "none"; // Disable click events
            item.style.opacity = "0"; // Hide the links visually
            item.style.transition = "opacity 0.5s"; // Optional: add transition effect
        });
    } else {
        navbar.classList.remove("shrink");
        menuItems.forEach(function(item) {
            item.setAttribute("tabindex", "0"); // Enable tab focus
            item.style.pointerEvents = "auto"; // Enable click events
            item.style.opacity = "1"; // Show the links
        });
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const nav = document.querySelector(".main-nav");
    const hamburgerMenu = document.getElementById("hamburger-menu");
    const sideDrawer = document.getElementById("side-drawer");
    const sideDrawerClose = document.getElementById("side-drawer-close");

    // Shrink nav on scroll and show hamburger menu
    window.addEventListener("scroll", function() {
        if (window.scrollY > 50) {
            nav.classList.add("shrink");
        } else {
            nav.classList.remove("shrink");
        }
    });

    // Open side drawer on hamburger menu click
    hamburgerMenu.addEventListener("click", function() {
        sideDrawer.classList.add("open");
    });

    // Close side drawer on close button click
    sideDrawerClose.addEventListener("click", function() {
        sideDrawer.classList.remove("open");
    });

    // Close side drawer when clicking outside of it
    sideDrawer.addEventListener("click", function(event) {
        if (!event.target.closest(".side-drawer__menu")) {
            sideDrawer.classList.remove("open");
        }
    });
});

document.addEventListener("DOMContentLoaded", function() {
    var videoContainer = document.querySelector('.video-container');
    var mainContent = document.getElementById('main-content');

    // Scroll to main content on scroll down arrow click
    videoContainer.addEventListener('click', function(e) {
        e.preventDefault();
        mainContent.scrollIntoView({
            behavior: 'smooth'
        });
    });

    videoContainer.addEventListener('wheel', function(e) {
        e.preventDefault();
    });
});

document.addEventListener('DOMContentLoaded', () => {
    let initialScrollPosition = 0;
    let scrolled = false;

    window.addEventListener('scroll', function() {
        let currentScrollPosition = window.scrollY;

        if (currentScrollPosition > initialScrollPosition && !scrolled) {
            scrolled = true;
            document.querySelector('#main-content').scrollIntoView({
                behavior: 'smooth'
            });
        }
    });

    // Scroll to section on scroll down arrow click
    document.querySelector('.home__scroll-down-arrow a').addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.main-nav');
    
    // Shrink navbar if not on the home page
    if (!document.body.classList.contains('home-page')) {
        navbar.classList.add('shrink');
    } else {
        navbar.classList.remove('shrink');
    }
    
    // Reset navbar and reload page when clicking on the logo on the home page
    document.querySelector('.main-nav__logo').addEventListener('click', function() {
        if (document.body.classList.contains('home-page')) {
            navbar.classList.remove('shrink');
            location.reload(); // Reload the page
        }
    });
});
