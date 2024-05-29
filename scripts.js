document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("dark-mode-toggle");
    const navbarLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const socialToggle = document.getElementById('social-toggle');
    const socialBanner = document.querySelector('.social-banner');

    // Dark mode as default
    toggle.checked = true;
    document.body.classList.add("dark-mode");

    // Darkmode toggle
    toggle.addEventListener("change", () => {
        document.body.classList.toggle("dark-mode", toggle.checked);
        localStorage.setItem("dark-mode", toggle.checked);
    });

    // Socials toggle
    socialToggle.addEventListener('change', function () {
        if (this.checked) {
            socialBanner.style.display = 'inline';
        } else {
            socialBanner.style.display = 'none';
        }
    });

    // Check for previously saved mode in local storage
    if (localStorage.getItem("dark-mode") === "true") {
        document.body.classList.add("dark-mode");
        toggle.checked = true;
    }

    // Smooth scroll for navbar links
    document.querySelectorAll('.navbar-nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({behavior: 'smooth'});
            highlightSection(this);
        });
    });

    // Custom scroll snapping with animation
    const sections = document.querySelectorAll('.snap-section');
    let isScrolling;
    
    function scrollToSection(sectionIndex) {
        highlightSection(navbarLinks[sectionIndex]);
        sections[sectionIndex].scrollIntoView({ behavior: 'smooth' });
    }

    // Highlight the current section in the navbar
    highlightSection(navbarLinks[0]);
    function highlightSection(givenSection) {
        navbarLinks.forEach(link => link.classList.remove('active'));
        givenSection.classList.add('active');
    }

    // Custom scroll checking which section is the closest
    document.addEventListener('wheel', (event) => {
        clearTimeout(isScrolling);
    
        isScrolling = setTimeout(() => {
            const viewportHeight = window.innerHeight;
            const sectionPositions = [];
    
            sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                sectionPositions.push({
                    top: rect.top,
                    bottom: rect.bottom
                });
            });
    
            let closestSectionIndex = 0;
            let minDiff = Math.abs(sectionPositions[0].top);
    
            sectionPositions.forEach((position, index) => {
                const diff = Math.abs(position.top);
    
                if (diff < minDiff) {
                    closestSectionIndex = index;
                    minDiff = diff;
                }
            });
    
            if (event.deltaY > 0 && closestSectionIndex < sections.length - 1) {
                scrollToSection(closestSectionIndex + 1);
            } else if (event.deltaY < 0 && closestSectionIndex > 0) {
                scrollToSection(closestSectionIndex - 1);
            } else {
                scrollToSection(closestSectionIndex);
            }
        }, 100);
    });
    

    // Handle touch events for mobile
    let touchStartY = 0;

    document.addEventListener('touchstart', (event) => {
        touchStartY = event.touches[0].clientY;
    });
    
    document.addEventListener('touchend', (event) => {
        const touchEndY = event.changedTouches[0].clientY;
        const touchDiff = touchStartY - touchEndY;
        const viewportHeight = window.innerHeight;
        const sectionPositions = [];
    
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            sectionPositions.push({
                top: rect.top,
                bottom: rect.bottom
            });
        });
    
        let closestSectionIndex = 0;
        let minDiff = Math.abs(sectionPositions[0].top);
    
        sectionPositions.forEach((position, index) => {
            const diff = Math.abs(position.top);
    
            if (diff < minDiff) {
                closestSectionIndex = index;
                minDiff = diff;
            }
        });
    
        if (touchDiff > 0 && closestSectionIndex < sections.length - 1) {
            scrollToSection(closestSectionIndex + 1);
        } else if (touchDiff < 0 && closestSectionIndex > 0) {
            scrollToSection(closestSectionIndex - 1);
        } else {
            scrollToSection(closestSectionIndex);
        }
    });
});
