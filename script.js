// Intersection Observer for section animations
const sections = document.querySelectorAll('section');
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px'
};

const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

sections.forEach(section => {
    sectionObserver.observe(section);
});

// Image loading animation
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.classList.add('loaded');
        });
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// Form validation
const signupForm = document.getElementById('signupForm');

if (signupForm) {
    const formMessage = document.getElementById('formMessage');
    
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;
        
        // Reset previous error messages
        formMessage.className = 'form-message';
        formMessage.style.display = 'none';
        document.querySelectorAll('.error-message').forEach(error => error.classList.remove('show'));
        document.querySelectorAll('input').forEach(input => {
            input.classList.remove('invalid');
            input.classList.remove('valid');
        });

        // Validate full name
        const fullName = document.getElementById('fullName');
        if (!fullName.value.match(/^[a-zA-Z ]{2,50}$/)) {
            showError('fullNameError', 'Please enter a valid name (2-50 characters, letters only)');
            fullName.classList.add('invalid');
            isValid = false;
        } else {
            fullName.classList.add('valid');
        }

        // Validate email
        const email = document.getElementById('email');
        if (!email.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            showError('emailError', 'Please enter a valid email address');
            email.classList.add('invalid');
            isValid = false;
        } else {
            email.classList.add('valid');
        }

        // Validate password
        const password = document.getElementById('password');
        if (password.value.length < 8) {
            showError('passwordError', 'Password must be at least 8 characters long');
            password.classList.add('invalid');
            isValid = false;
        } else {
            password.classList.add('valid');
        }

        // Validate confirm password
        const confirmPassword = document.getElementById('confirmPassword');
        if (password.value !== confirmPassword.value) {
            showError('confirmPasswordError', 'Passwords do not match');
            confirmPassword.classList.add('invalid');
            isValid = false;
        } else if (confirmPassword.value) {
            confirmPassword.classList.add('valid');
        }

        // Validate terms
        const terms = document.getElementById('terms');
        if (!terms.checked) {
            showError('termsError', 'You must accept the terms and conditions');
            isValid = false;
        }

        if (isValid) {
            // Show success message
            formMessage.textContent = 'Thank you for signing up! We will contact you shortly.';
            formMessage.className = 'form-message success';
            formMessage.style.display = 'block';
            
            // Clear form
            signupForm.reset();
            
            // Remove valid classes
            document.querySelectorAll('input').forEach(input => {
                input.classList.remove('valid');
            });

            // Here you would typically send the form data to your server
            console.log('Form submitted successfully');
        } else {
            formMessage.textContent = 'Please correct the errors below.';
            formMessage.className = 'form-message error';
            formMessage.style.display = 'block';
        }
    });

    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
}

// Email collection form
const joinForm = document.getElementById('joinForm');
if (joinForm) {
    joinForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('userEmail').value;
        const joinMessage = document.getElementById('joinMessage');
        
        if (email) {
            // Here you would typically send the email to your server
            console.log('Email collected:', email);
            
            // Show success message
            joinMessage.textContent = 'Thank you for showing interest in our company! We will be in touch soon.';
            joinMessage.className = 'join-message success';
            
            // Clear the form
            joinForm.reset();
            
            // Hide message after 5 seconds
            setTimeout(() => {
                joinMessage.style.display = 'none';
            }, 5000);
        }
    });
} 