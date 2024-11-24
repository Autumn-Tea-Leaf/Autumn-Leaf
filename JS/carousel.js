const cards = document.querySelectorAll('.ui-card');
let activeIndex = 0;

function updateCarousel() {
    cards.forEach((card, index) => {
        card.classList.remove('active', 'prev', 'next');
        
        if (index === activeIndex) {
            card.classList.add('active');
        } else if (index === (activeIndex - 1 + cards.length) % cards.length) {
            card.classList.add('prev');
        } else if (index === (activeIndex + 1) % cards.length) {
            card.classList.add('next');
        }
    });
}

// Prevent default behavior on all carousel links
document.querySelectorAll('.carousel-item').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
    });
});

cards.forEach((card, index) => {
    card.addEventListener('click', () => {
        if (index === activeIndex) {
            // If clicking the active (center) card, redirect
            const link = card.querySelector('a');
            if (link && link.href) {
                window.location.href = link.href;
            }
        } else {
            // If clicking any other card, make it the active card
            activeIndex = index;
            updateCarousel();
        }
    });
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        activeIndex = (activeIndex - 1 + cards.length) % cards.length;
        updateCarousel();
    } else if (e.key === 'ArrowRight') {
        activeIndex = (activeIndex + 1) % cards.length;
        updateCarousel();
    }
});

// Initialize the carousel
updateCarousel();

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
