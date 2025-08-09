// Lightbox functionality
document.addEventListener('DOMContentLoaded', function() {
    // Generate floating background elements
    createFloatingElements();
    
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');
    const memoryImages = document.querySelectorAll('.memory-image');
    
    // Open lightbox when clicking on memory images
    memoryImages.forEach(img => {
        img.addEventListener('click', function() {
            lightbox.classList.add('active');
            lightboxImg.src = this.src;
            lightboxImg.alt = this.alt;
            document.body.style.overflow = 'hidden'; // Prevent scrolling when lightbox is open
        });
    });
    
    // Close lightbox when clicking the X
    lightboxClose.addEventListener('click', closeLightbox);
    
    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Close lightbox with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
    
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Re-enable scrolling
    }
    
    // Smooth scroll for any internal links (if you add any)
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Disabled parallax effect to prevent content obstruction
    // The parallax was causing the hero section to overlap with content below
    
    /* 
    // Original parallax code - kept for reference but disabled
    const hero = document.querySelector('.hero');
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const speed = 0.5;
        
        if (hero) {
            hero.style.transform = `translateY(${scrolled * speed}px)`;
        }
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    // Only add parallax on desktop (not mobile for performance)
    if (window.innerWidth > 768) {
        window.addEventListener('scroll', requestTick);
    }
    */
    
    // Intersection Observer for fade-in animations on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Once visible, stop observing to prevent it from disappearing
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Special observer for message texts that retriggers animation
    const messageObserverOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const messageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove and re-add animation classes to restart animation
                entry.target.classList.remove('animate-message');
                void entry.target.offsetWidth; // Force reflow
                entry.target.classList.add('animate-message');
            } else {
                // Remove animation when out of view
                entry.target.classList.remove('animate-message');
            }
        });
    }, messageObserverOptions);
    
    // Apply the repeating observer to message texts
    const messageTexts = document.querySelectorAll('.message-text');
    messageTexts.forEach(text => {
        messageObserver.observe(text);
    });
    
    // Typewriter observer for hero subtitle
    const typewriterObserverOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const typewriterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove and re-add animation class to restart typewriter
                entry.target.classList.remove('animate-typewriter');
                void entry.target.offsetWidth; // Force reflow
                entry.target.classList.add('animate-typewriter');
            } else {
                // Remove animation when out of view
                entry.target.classList.remove('animate-typewriter');
            }
        });
    }, typewriterObserverOptions);
    
    // Apply the typewriter observer to hero subtitle
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        typewriterObserver.observe(heroSubtitle);
    }
    
    // Observe memory cards for animation
    const cards = document.querySelectorAll('.memory-card');
    cards.forEach(card => {
        card.classList.add('fade-in-scroll');
        observer.observe(card);
    });
    
    // Add subtle animation to streaming section
    const streamingContent = document.querySelector('.streaming-content');
    if (streamingContent) {
        streamingContent.classList.add('fade-in-scroll');
        observer.observe(streamingContent);
    }
    
    // Preload images for better performance
    const imageUrls = [];
    memoryImages.forEach(img => {
        if (img.src && !img.src.includes('placeholder')) {
            imageUrls.push(img.src);
        }
    });
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
    
    // Add touch swipe support for lightbox on mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    lightbox.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    lightbox.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            // Swipe detected - close lightbox
            if (lightbox.classList.contains('active')) {
                closeLightbox();
            }
        }
    }
    
    // Console message for your girlfriend
    console.log('%c💛 Happy Birthday, My Love! 💛', 
                'font-size: 24px; font-weight: bold; color: #FFE1A8; text-shadow: 2px 2px 4px rgba(0,0,0,0.2);');
    console.log('%cThis website was made with all my love, just for you ❤️', 
                'font-size: 14px; color: #FADADD;');
    
    // Add confetti burst on page load
    setTimeout(() => {
        createConfettiBurst();
    }, 2000);
    
    // Add sparkle trail effect on mouse move (desktop only)
    if (window.innerWidth > 768) {
        let mouseTimer;
        document.addEventListener('mousemove', (e) => {
            clearTimeout(mouseTimer);
            mouseTimer = setTimeout(() => {
                createSparkle(e.pageX, e.pageY);
            }, 50);
        });
    }
    
    // Animate section titles when they come into view
    const titles = document.querySelectorAll('.section-title');
    titles.forEach(title => {
        observer.observe(title);
    });
    
    // Add ripple effect to streaming button
    const streamingBtn = document.querySelector('.streaming-button');
    if (streamingBtn) {
        streamingBtn.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
                createConfettiBurst();
                // You can add actual streaming link logic here
            }
        });
    }
});

// Prevent right-click on images (optional - to make it feel more special)
document.addEventListener('contextmenu', function(e) {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
        return false;
    }
});

// Create floating background elements
function createFloatingElements() {
    const container = document.getElementById('floating-container');
    if (!container) return;
    
    const elements = [
        { type: 'heart', symbol: '❤️', count: 8 },
        { type: 'heart', symbol: '💕', count: 6 },
        { type: 'heart', symbol: '💖', count: 5 },
        { type: 'star', symbol: '✨', count: 10 },
        { type: 'star', symbol: '⭐', count: 8 },
        { type: 'sparkle', symbol: '✦', count: 12 },
        { type: 'circle', symbol: '', count: 15 }
    ];
    
    elements.forEach(item => {
        for (let i = 0; i < item.count; i++) {
            const element = document.createElement('div');
            element.className = `floating-element ${item.type}`;
            
            if (item.type === 'circle') {
                // Circles are pure CSS, no text content
                element.style.left = Math.random() * 100 + '%';
            } else {
                element.textContent = item.symbol;
                element.style.left = Math.random() * 100 + '%';
            }
            
            // Randomize animation delay and duration
            const delay = Math.random() * 15;
            const duration = 15 + Math.random() * 20;
            
            element.style.animationDelay = `${delay}s`;
            element.style.animationDuration = `${duration}s`;
            
            // Randomize starting position
            element.style.transform = `translateX(${Math.random() * 100 - 50}px)`;
            
            container.appendChild(element);
        }
    });
    
    // Add some floating elements specifically to the hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        const heroContainer = document.createElement('div');
        heroContainer.className = 'floating-hero-elements';
        
        const heroElements = ['💛', '✨', '💫', '🌟', '💕'];
        heroElements.forEach((symbol, index) => {
            const element = document.createElement('div');
            element.className = 'floating-hero-element';
            element.textContent = symbol;
            element.style.left = (20 + index * 15) + '%';
            element.style.top = (10 + Math.random() * 80) + '%';
            element.style.animationDelay = (index * 0.5) + 's';
            element.style.fontSize = (16 + Math.random() * 10) + 'px';
            heroContainer.appendChild(element);
        });
        
        hero.appendChild(heroContainer);
    }
}

// Regenerate some floating elements periodically for continuous effect
setInterval(() => {
    const container = document.getElementById('floating-container');
    if (!container) return;
    
    // Remove some old elements if there are too many
    const existingElements = container.querySelectorAll('.floating-element');
    if (existingElements.length > 60) {
        for (let i = 0; i < 10; i++) {
            if (existingElements[i]) {
                existingElements[i].remove();
            }
        }
    }
    
    // Add a few new ones
    const symbols = ['❤️', '💕', '✨', '⭐', '💖'];
    for (let i = 0; i < 3; i++) {
        const element = document.createElement('div');
        const isHeart = Math.random() > 0.5;
        element.className = `floating-element ${isHeart ? 'heart' : 'star'}`;
        element.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        element.style.left = Math.random() * 100 + '%';
        element.style.animationDelay = '0s';
        element.style.animationDuration = (15 + Math.random() * 20) + 's';
        container.appendChild(element);
    }
}, 30000); // Every 30 seconds

// Create confetti burst effect
function createConfettiBurst() {
    const colors = ['#FFE1A8', '#FADADD', '#FFB6C1', '#FFD700', '#FFA500'];
    const confettiCount = 50;
    const container = document.body;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 0.5 + 's';
        confetti.style.animationDuration = (Math.random() * 2 + 1) + 's';
        container.appendChild(confetti);
        
        // Remove confetti after animation
        setTimeout(() => {
            confetti.remove();
        }, 3000);
    }
}

// Create sparkle effect at cursor position
function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.className = 'cursor-sparkle';
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    document.body.appendChild(sparkle);
    
    // Remove sparkle after animation
    setTimeout(() => {
        sparkle.remove();
    }, 1000);
}

// Add parallax effect to memory cards on scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const cards = document.querySelectorAll('.memory-card');
    
    cards.forEach((card, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed / 10);
        
        if (card.getBoundingClientRect().top < window.innerHeight && 
            card.getBoundingClientRect().bottom > 0) {
            card.style.transform = `translateY(${yPos}px)`;
        }
    });
});
