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
    }, 3000); 
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


document.querySelectorAll('.carousel-item').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
    });
});


cards.forEach((card, index) => {
    card.addEventListener('click', () => {
        isUserInteracting = true;
        if (index === activeIndex) {
            
            const link = card.querySelector('a');
            if (link && link.href) {
                window.location.href = link.href;
            }
        } else {
            
            activeIndex = index;
            updateCarousel();
            resetAutoRotate();
        }
        setTimeout(() => {
            isUserInteracting = false;
        }, 5000);
    });

   
    card.addEventListener('mouseenter', () => {
        isUserInteracting = true;
    });

    card.addEventListener('mouseleave', () => {
        isUserInteracting = false;
        resetAutoRotate();
    });
});

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
        }, 5000); 
    }
});


document.querySelectorAll('.dot').forEach((dot, index) => {
    dot.addEventListener('click', () => {
        isUserInteracting = true;
        activeIndex = index;
        updateCarousel();
        resetAutoRotate();
        setTimeout(() => {
            isUserInteracting = false;
        }, 5000);
    });

    
    dot.addEventListener('mouseenter', () => {
        isUserInteracting = true;
    });

    dot.addEventListener('mouseleave', () => {
        isUserInteracting = false;
        resetAutoRotate();
    });
});


updateCarousel();
startAutoRotate();


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
