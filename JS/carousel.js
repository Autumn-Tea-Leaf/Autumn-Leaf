const cards = document.querySelectorAll('.ui-card');
let activeIndex = 0;
let autoRotateInterval;
let isUserInteracting = false;

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

    // Update dots
    document.querySelectorAll('.dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === activeIndex);
    });
}

function startAutoRotate() {
    if (autoRotateInterval) clearInterval(autoRotateInterval);
    autoRotateInterval = setInterval(() => {
        if (!isUserInteracting) {
            activeIndex = (activeIndex + 1) % cards.length;
            updateCarousel();
        }
    }, 3000); // Rotate every 3 seconds
}

function stopAutoRotate() {
    if (autoRotateInterval) {
        clearInterval(autoRotateInterval);
        autoRotateInterval = null;
    }
}

function resetAutoRotate() {
    stopAutoRotate();
    startAutoRotate();
}

// Prevent default behavior on all carousel links
document.querySelectorAll('.carousel-item').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
    });
});

// Handle user interactions
cards.forEach((card, index) => {
    card.addEventListener('click', () => {
        isUserInteracting = true;
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
            resetAutoRotate();
        }
        setTimeout(() => {
            isUserInteracting = false;
        }, 5000); // Resume auto-rotation after 5 seconds
    });

    // Pause rotation on hover
    card.addEventListener('mouseenter', () => {
        isUserInteracting = true;
    });

    card.addEventListener('mouseleave', () => {
        isUserInteracting = false;
        resetAutoRotate();
    });
});

// Handle keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        isUserInteracting = true;
        if (e.key === 'ArrowLeft') {
            activeIndex = (activeIndex - 1 + cards.length) % cards.length;
        } else {
            activeIndex = (activeIndex + 1) % cards.length;
        }
        updateCarousel();
        resetAutoRotate();
        setTimeout(() => {
            isUserInteracting = false;
        }, 5000); // Resume auto-rotation after 5 seconds
    }
});

// Handle dot navigation
document.querySelectorAll('.dot').forEach((dot, index) => {
    dot.addEventListener('click', () => {
        isUserInteracting = true;
        activeIndex = index;
        updateCarousel();
        resetAutoRotate();
        setTimeout(() => {
            isUserInteracting = false;
        }, 5000); // Resume auto-rotation after 5 seconds
    });

    // Pause rotation on hover
    dot.addEventListener('mouseenter', () => {
        isUserInteracting = true;
    });

    dot.addEventListener('mouseleave', () => {
        isUserInteracting = false;
        resetAutoRotate();
    });
});

// Initialize the carousel and start auto-rotation
updateCarousel();
startAutoRotate();

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
