// ===================================
// Navigation & Scroll Effects
// ===================================

const navbar = document.getElementById('navbar');
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const backToTopBtn = document.getElementById('backToTop');

// Navbar scroll effect
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add shadow on scroll
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Show/hide back to top button
    if (currentScroll > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }

    // Update active nav link based on scroll position
    updateActiveNavLink();

    lastScroll = currentScroll;
});

// Back to top button
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===================================
// Mobile Menu Toggle
// ===================================

mobileMenuToggle.addEventListener('click', () => {
    mobileMenuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');

    // Update ARIA attribute
    const isExpanded = navMenu.classList.contains('active');
    mobileMenuToggle.setAttribute('aria-expanded', isExpanded);

    // Prevent body scroll when menu is open
    document.body.style.overflow = isExpanded ? 'hidden' : '';
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active') &&
        !navMenu.contains(e.target) &&
        !mobileMenuToggle.contains(e.target)) {
        mobileMenuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }
});

// ===================================
// Smooth Scrolling for Navigation Links
// ===================================

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const navHeight = navbar.offsetHeight;
            const targetPosition = targetSection.offsetTop - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// Update Active Navigation Link
// ===================================

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.pageYOffset + navbar.offsetHeight + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (correspondingLink) {
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                correspondingLink.classList.add('active');
            }
        }
    });
}

// ===================================
// Form Validation & Submission
// ===================================

const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

// Form field validation rules
const validationRules = {
    name: {
        required: true,
        minLength: 2,
        pattern: /^[a-zA-Z\s'-]+$/,
        errorMessages: {
            required: 'Please enter your name',
            minLength: 'Name must be at least 2 characters',
            pattern: 'Please enter a valid name'
        }
    },
    email: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        errorMessages: {
            required: 'Please enter your email address',
            pattern: 'Please enter a valid email address'
        }
    },
    phone: {
        required: true,
        pattern: /^[\d\s\-\+\(\)]+$/,
        minLength: 10,
        errorMessages: {
            required: 'Please enter your phone number',
            pattern: 'Please enter a valid phone number',
            minLength: 'Phone number must be at least 10 digits'
        }
    },
    service: {
        required: true,
        errorMessages: {
            required: 'Please select a service'
        }
    },
    message: {
        required: true,
        minLength: 10,
        errorMessages: {
            required: 'Please enter a message',
            minLength: 'Message must be at least 10 characters'
        }
    }
};

// Real-time validation on blur
Object.keys(validationRules).forEach(fieldName => {
    const field = document.getElementById(fieldName);
    if (field) {
        field.addEventListener('blur', () => {
            validateField(fieldName);
        });

        // Clear error on input
        field.addEventListener('input', () => {
            const formGroup = field.closest('.form-group');
            formGroup.classList.remove('error');
            const errorElement = document.getElementById(`${fieldName}Error`);
            if (errorElement) {
                errorElement.textContent = '';
            }
        });
    }
});

// Validate individual field
function validateField(fieldName) {
    const field = document.getElementById(fieldName);
    const rules = validationRules[fieldName];
    const formGroup = field.closest('.form-group');
    const errorElement = document.getElementById(`${fieldName}Error`);

    let isValid = true;
    let errorMessage = '';

    // Required validation
    if (rules.required && !field.value.trim()) {
        isValid = false;
        errorMessage = rules.errorMessages.required;
    }

    // Pattern validation
    if (isValid && rules.pattern && !rules.pattern.test(field.value)) {
        isValid = false;
        errorMessage = rules.errorMessages.pattern;
    }

    // Min length validation
    if (isValid && rules.minLength && field.value.length < rules.minLength) {
        isValid = false;
        errorMessage = rules.errorMessages.minLength;
    }

    // Update UI
    if (!isValid) {
        formGroup.classList.add('error');
        if (errorElement) {
            errorElement.textContent = errorMessage;
        }
    } else {
        formGroup.classList.remove('error');
        if (errorElement) {
            errorElement.textContent = '';
        }
    }

    return isValid;
}

// Validate all fields
function validateForm() {
    let isFormValid = true;

    Object.keys(validationRules).forEach(fieldName => {
        const isFieldValid = validateField(fieldName);
        if (!isFieldValid) {
            isFormValid = false;
        }
    });

    return isFormValid;
}

// Form submission - validates then lets Netlify handle the submission
contactForm.addEventListener('submit', (e) => {
    // Validate form before submission
    if (!validateForm()) {
        e.preventDefault();
        showFormMessage('Please correct the errors above', 'error');
        return;
    }

    // Show loading state while Netlify processes the form
    const submitBtn = contactForm.querySelector('.btn-submit');
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    // Let the form submit naturally to Netlify
    // Netlify will redirect to /success.html as specified in the form action
});

// Show form message
function showFormMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;

    // Scroll to message
    formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    // Auto-hide success messages after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            formMessage.className = 'form-message';
            formMessage.textContent = '';
        }, 5000);
    }
}

// ===================================
// Intersection Observer for Animations
// ===================================

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.service-card, .why-card, .info-card, .sidebar-card');

    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// ===================================
// Keyboard Navigation Support
// ===================================

// Allow keyboard navigation for interactive elements
document.addEventListener('keydown', (e) => {
    // Close mobile menu with Escape key
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        mobileMenuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }
});

// ===================================
// Prevent Flash of Unstyled Content
// ===================================

window.addEventListener('load', () => {
    document.body.style.visibility = 'visible';
});

// ===================================
// Performance: Throttle Scroll Events
// ===================================

function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll-heavy operations
const throttledScroll = throttle(() => {
    updateActiveNavLink();
}, 100);

window.addEventListener('scroll', throttledScroll);

// ===================================
// Analytics & Tracking (Optional)
// ===================================

// Track button clicks
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const btnText = btn.textContent.trim();
        console.log(`Button clicked: ${btnText}`);
        // Add your analytics tracking here (Google Analytics, etc.)
    });
});

// Track form field interactions
Object.keys(validationRules).forEach(fieldName => {
    const field = document.getElementById(fieldName);
    if (field) {
        field.addEventListener('focus', () => {
            console.log(`Field focused: ${fieldName}`);
            // Add your analytics tracking here
        });
    }
});

// ===================================
// Console Message (Optional)
// ===================================

console.log('%c HD Pallets Website ', 'background: #14b8a6; color: white; font-size: 16px; padding: 10px;');
console.log('%c Built with ❤️ for modern browsers ', 'color: #1a365d; font-size: 12px;');
