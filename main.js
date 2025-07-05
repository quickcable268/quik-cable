// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Hero slider with controls
class HeroSlider {
    constructor() {
        this.slides = document.querySelectorAll('.hero-slide');
        this.indicators = document.querySelectorAll('.indicator');
        this.prevBtn = document.getElementById('hero-prev');
        this.nextBtn = document.getElementById('hero-next');
        this.currentSlide = 0;
        this.slideInterval = null;
        
        this.init();
    }
    
    init() {
        // Set up indicator click handlers
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                this.goToSlide(index);
            });
        });
        
        // Set up control button handlers
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => {
                this.previousSlide();
            });
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => {
                this.nextSlide();
            });
        }
        
        // Start auto-slide
        this.startAutoSlide();
        
        // Pause on hover
        const heroSection = document.querySelector('.hero');
        heroSection.addEventListener('mouseenter', () => this.pauseAutoSlide());
        heroSection.addEventListener('mouseleave', () => this.startAutoSlide());
    }
    
    goToSlide(slideIndex) {
        // Remove active class from current slide and indicator
        this.slides[this.currentSlide].classList.remove('active');
        this.indicators[this.currentSlide].classList.remove('active');
        
        // Set new current slide
        this.currentSlide = slideIndex;
        
        // Add active class to new slide and indicator
        this.slides[this.currentSlide].classList.add('active');
        this.indicators[this.currentSlide].classList.add('active');
    }
    
    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(nextIndex);
    }
    
    previousSlide() {
        const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(prevIndex);
    }
    
    startAutoSlide() {
        this.slideInterval = setInterval(() => {
            this.nextSlide();
        }, 6000); // Change slide every 6 seconds
    }
    
    pauseAutoSlide() {
        if (this.slideInterval) {
            clearInterval(this.slideInterval);
            this.slideInterval = null;
        }
    }
}

// Coverage Map Interactivity
class CoverageMap {
    constructor() {
        this.coverageAreas = document.querySelectorAll('.coverage-area');
        this.tooltip = document.getElementById('coverage-tooltip');
        this.init();
    }
    
    init() {
        this.coverageAreas.forEach(area => {
            area.addEventListener('mouseenter', (e) => {
                const city = e.target.getAttribute('data-city');
                this.showTooltip(e, city);
            });
            
            area.addEventListener('mouseleave', () => {
                this.hideTooltip();
            });
            
            area.addEventListener('mousemove', (e) => {
                this.updateTooltipPosition(e);
            });
        });
    }
    
    showTooltip(e, city) {
        this.tooltip.textContent = `${city} - Service Available`;
        this.tooltip.style.opacity = '1';
        this.updateTooltipPosition(e);
    }
    
    hideTooltip() {
        this.tooltip.style.opacity = '0';
    }
    
    updateTooltipPosition(e) {
        const rect = e.target.closest('.map-container').getBoundingClientRect();
        this.tooltip.style.left = (e.clientX - rect.left + 10) + 'px';
        this.tooltip.style.top = (e.clientY - rect.top - 30) + 'px';
    }
}

// Plan Comparison Toggle
class PlanComparison {
    constructor() {
        this.toggleBtns = document.querySelectorAll('.toggle-btn');
        this.planCards = document.querySelectorAll('.plan-card');
        this.init();
    }
    
    init() {
        this.toggleBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const planType = btn.getAttribute('data-plan');
                this.switchPlan(planType);
                
                // Update active button
                this.toggleBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
    }
    
    switchPlan(planType) {
        // This would typically fetch different plan data
        // For now, we'll just add a visual effect
        this.planCards.forEach(card => {
            card.style.transform = 'scale(0.95)';
            setTimeout(() => {
                card.style.transform = '';
            }, 200);
        });
    }
}

// Speed Test Simulation
class SpeedTest {
    constructor() {
        this.startBtn = document.getElementById('start-speed-test');
        this.speedValue = document.getElementById('speed-value');
        this.speedArc = document.getElementById('speed-arc');
        this.resultsDiv = document.getElementById('speed-results');
        this.downloadSpeed = document.getElementById('download-speed');
        this.uploadSpeed = document.getElementById('upload-speed');
        this.pingValue = document.getElementById('ping-value');
        this.isRunning = false;
        
        this.init();
    }
    
    init() {
        if (this.startBtn) {
            this.startBtn.addEventListener('click', () => {
                if (!this.isRunning) {
                    this.runSpeedTest();
                }
            });
        }
    }
    
    runSpeedTest() {
        this.isRunning = true;
        this.startBtn.textContent = 'Testing...';
        this.startBtn.disabled = true;
        this.resultsDiv.style.display = 'none';
        
        // Simulate speed test animation
        let currentSpeed = 0;
        const targetSpeed = Math.floor(Math.random() * 800) + 200; // Random speed between 200-1000 Mbps
        
        const interval = setInterval(() => {
            currentSpeed += Math.floor(Math.random() * 50) + 10;
            if (currentSpeed >= targetSpeed) {
                currentSpeed = targetSpeed;
                clearInterval(interval);
                this.completeTest(targetSpeed);
            }
            
            this.updateSpeedDisplay(currentSpeed);
        }, 100);
    }
    
    updateSpeedDisplay(speed) {
        this.speedValue.textContent = speed;
        
        // Update arc (simplified calculation)
        const percentage = Math.min(speed / 1000, 1);
        const angle = percentage * 160; // 160 degrees max
        const radians = (angle - 80) * (Math.PI / 180); // Start from -80 degrees
        const x = 100 + 80 * Math.cos(radians);
        const y = 100 + 80 * Math.sin(radians);
        
        this.speedArc.setAttribute('d', `M 20 100 A 80 80 0 0 1 ${x} ${y}`);
    }
    
    completeTest(finalSpeed) {
        // Show results
        this.downloadSpeed.textContent = `${finalSpeed} Mbps`;
        this.uploadSpeed.textContent = `${Math.floor(finalSpeed * 0.8)} Mbps`;
        this.pingValue.textContent = `${Math.floor(Math.random() * 20) + 5} ms`;
        
        this.resultsDiv.style.display = 'grid';
        this.startBtn.textContent = 'Test Again';
        this.startBtn.disabled = false;
        this.isRunning = false;
    }
}

// Testimonials Carousel
class TestimonialsCarousel {
    constructor() {
        this.testimonials = document.querySelectorAll('.testimonial-card');
        this.currentTestimonial = 0;
        this.init();
    }
    
    init() {
        if (this.testimonials.length > 0) {
            this.startAutoRotate();
        }
    }
    
    showTestimonial(index) {
        this.testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
        });
        
        this.testimonials[index].classList.add('active');
    }
    
    nextTestimonial() {
        this.currentTestimonial = (this.currentTestimonial + 1) % this.testimonials.length;
        this.showTestimonial(this.currentTestimonial);
    }
    
    startAutoRotate() {
        setInterval(() => {
            this.nextTestimonial();
        }, 5000); // Change every 5 seconds
    }
}

// FAQ Accordion
class FAQAccordion {
    constructor() {
        this.faqItems = document.querySelectorAll('.faq-item');
        this.init();
    }
    
    init() {
        this.faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            
            question.addEventListener('click', () => {
                const isActive = answer.classList.contains('active');
                
                // Close all other FAQ items
                this.faqItems.forEach(otherItem => {
                    const otherQuestion = otherItem.querySelector('.faq-question');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    
                    otherAnswer.classList.remove('active');
                    otherQuestion.setAttribute('aria-expanded', 'false');
                });
                
                // Toggle current item
                if (!isActive) {
                    answer.classList.add('active');
                    question.setAttribute('aria-expanded', 'true');
                }
            });
        });
    }
}

// Form Validation
class FormValidator {
    constructor() {
        this.forms = {
            availability: document.getElementById('availability-form'),
            contact: document.getElementById('contact-form')
        };
        
        this.init();
    }
    
    init() {
        // Availability form
        if (this.forms.availability) {
            this.forms.availability.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleAvailabilitySubmit();
            });
        }
        
        // Contact form
        if (this.forms.contact) {
            this.forms.contact.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleContactSubmit();
            });
        }
        
        // Live chat button
        const liveChatBtn = document.getElementById('live-chat-btn');
        if (liveChatBtn) {
            liveChatBtn.addEventListener('click', () => {
                this.showMessage('Live chat feature coming soon!', 'info');
            });
        }
    }
    
    handleAvailabilitySubmit() {
        const zipCode = document.getElementById('zip-code').value.trim();
        
        if (!zipCode) {
            this.showMessage('Please enter your zip code.', 'error');
            return;
        }
        
        if (!this.validateZipCode(zipCode)) {
            this.showMessage('Please enter a valid zip code.', 'error');
            return;
        }
        
        // Simulate API call
        this.showMessage('Checking availability in your area...', 'loading');
        
        setTimeout(() => {
            this.showMessage('Great news! Service is available in your area. Our team will contact you soon!', 'success');
        }, 2000);
    }
    
    handleContactSubmit() {
        const formData = new FormData(this.forms.contact);
        const data = Object.fromEntries(formData.entries());
        
        // Basic validation
        if (!data['first-name'] || !data['last-name'] || !data['email'] || !data['zip']) {
            this.showMessage('Please fill in all required fields.', 'error');
            return;
        }
        
        if (!this.validateEmail(data['email'])) {
            this.showMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        if (!this.validateZipCode(data['zip'])) {
            this.showMessage('Please enter a valid zip code.', 'error');
            return;
        }
        
        // Simulate form submission
        this.showMessage('Sending your message...', 'loading');
        
        setTimeout(() => {
            this.showMessage('Thank you for your message! We\'ll get back to you within 24 hours.', 'success');
            this.forms.contact.reset();
        }, 2000);
    }
    
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    validateZipCode(zipCode) {
        const zipRegex = /^\d{5}(-\d{4})?$/;
        return zipRegex.test(zipCode);
    }
    
    showMessage(message, type) {
        // Remove existing messages
        const existingMessages = document.querySelectorAll('.form-message');
        existingMessages.forEach(msg => msg.remove());
        
        // Create new message
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type}`;
        messageDiv.textContent = message;
        
        // Style the message
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            font-weight: 600;
            z-index: 9999;
            max-width: 400px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
            transform: translateX(400px);
            transition: transform 0.3s ease;
        `;
        
        // Set colors based on type
        if (type === 'success') {
            messageDiv.style.backgroundColor = '#8BC53F';
            messageDiv.style.color = '#FFFFFF';
        } else if (type === 'error') {
            messageDiv.style.backgroundColor = '#EF4444';
            messageDiv.style.color = '#FFFFFF';
        } else if (type === 'loading') {
            messageDiv.style.backgroundColor = '#8BC53F';
            messageDiv.style.color = '#FFFFFF';
        } else if (type === 'info') {
            messageDiv.style.backgroundColor = '#3B82F6';
            messageDiv.style.color = '#FFFFFF';
        }
        
        // Add to page
        document.body.appendChild(messageDiv);
        
        // Animate in
        setTimeout(() => {
            messageDiv.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 5 seconds
        setTimeout(() => {
            messageDiv.style.transform = 'translateX(400px)';
            setTimeout(() => {
                messageDiv.remove();
            }, 300);
        }, 5000);
    }
}

// Smooth scrolling for navigation links
class SmoothScroll {
    constructor() {
        this.init();
    }
    
    init() {
        // Add click handlers to all navigation links
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 100; // Account for fixed header
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Mobile Menu Handler
class MobileMenu {
    constructor() {
        this.toggle = document.getElementById('mobile-menu-toggle');
        this.nav = document.querySelector('.nav');
        this.isOpen = false;
        
        this.init();
    }
    
    init() {
        if (this.toggle) {
            this.toggle.addEventListener('click', () => {
                this.toggleMenu();
            });
        }
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isOpen && !this.toggle.contains(e.target) && !this.nav.contains(e.target)) {
                this.closeMenu();
            }
        });
        
        // Close menu when window is resized to desktop size
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && this.isOpen) {
                this.closeMenu();
            }
        });
    }
    
    toggleMenu() {
        if (this.isOpen) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }
    
    openMenu() {
        this.nav.style.display = 'flex';
        this.nav.style.position = 'fixed';
        this.nav.style.top = '100%';
        this.nav.style.left = '0';
        this.nav.style.right = '0';
        this.nav.style.backgroundColor = '#1A1A1A';
        this.nav.style.flexDirection = 'column';
        this.nav.style.padding = '2rem';
        this.nav.style.gap = '1.5rem';
        this.nav.style.zIndex = '999';
        this.nav.style.borderTop = '1px solid #333';
        this.nav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        
        this.isOpen = true;
        this.toggle.setAttribute('aria-expanded', 'true');
    }
    
    closeMenu() {
        this.nav.style.display = '';
        this.nav.style.position = '';
        this.nav.style.top = '';
        this.nav.style.left = '';
        this.nav.style.right = '';
        this.nav.style.backgroundColor = '';
        this.nav.style.flexDirection = '';
        this.nav.style.padding = '';
        this.nav.style.gap = '';
        this.nav.style.zIndex = '';
        this.nav.style.borderTop = '';
        this.nav.style.boxShadow = '';
        
        this.isOpen = false;
        this.toggle.setAttribute('aria-expanded', 'false');
    }
}

// Scroll animations
class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        this.init();
    }
    
    init() {
        // Create intersection observer
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, this.observerOptions);
        
        // Observe elements
        const animateElements = document.querySelectorAll('.service-card, .deal-card, .benefit-panel, .faq-item, .blog-card');
        animateElements.forEach(el => {
            this.observer.observe(el);
        });
    }
}

// Lazy loading for images
class LazyLoader {
    constructor() {
        this.imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        this.imageObserver.unobserve(img);
                    }
                }
            });
        });
        
        this.init();
    }
    
    init() {
        // Observe all images with data-src attribute
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => {
            this.imageObserver.observe(img);
        });
    }
}

// Initialize all modules when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    new HeroSlider();
    new CoverageMap();
    new PlanComparison();
    new SpeedTest();
    new TestimonialsCarousel();
    new FAQAccordion();
    new FormValidator();
    new SmoothScroll();
    new MobileMenu();
    new ScrollAnimations();
    new LazyLoader();
    
    // Add loading animation to page
    document.body.classList.add('loaded');
});

// Add some CSS for loading animations
const style = document.createElement('style');
style.textContent = `
    .service-card,
    .deal-card,
    .benefit-panel,
    .faq-item,
    .blog-card {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .service-card.animate-in,
    .deal-card.animate-in,
    .benefit-panel.animate-in,
    .faq-item.animate-in,
    .blog-card.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .lazy {
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .lazy:not(.lazy) {
        opacity: 1;
    }
    
    body {
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(style);