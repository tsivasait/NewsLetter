document.addEventListener('DOMContentLoaded', function() {
    // Amount buttons functionality
    const amountButtons = document.querySelectorAll('.amount-btn');
    const customAmountContainer = document.querySelector('.custom-amount-container');
    let selectedAmount = null;

    amountButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            amountButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const amount = this.getAttribute('data-amount');
            selectedAmount = amount;
            
            // Show/hide custom amount input
            if (amount === 'custom') {
                customAmountContainer.style.display = 'block';
            } else {
                customAmountContainer.style.display = 'none';
            }
            
            // If you want to pass the amount to PayPal, you could modify the PayPal link here
            // For example:
            const paypalButton = document.querySelector('.paypal-button');
            if (paypalButton && amount !== 'custom') {
                const baseUrl = 'https://paypal.me/Thiruvalluru/';
                paypalButton.href = baseUrl + amount;
            } else if (paypalButton) {
                paypalButton.href = 'https://paypal.me/Thiruvalluru';
            }
        });
    });

    // Custom amount input handling
    const customAmountInput = document.getElementById('custom-amount');
    if (customAmountInput) {
        customAmountInput.addEventListener('input', function() {
            const paypalButton = document.querySelector('.paypal-button');
            if (paypalButton && this.value) {
                const baseUrl = 'https://paypal.me/Thiruvalluru/';
                paypalButton.href = baseUrl + this.value;
            } else if (paypalButton) {
                paypalButton.href = 'https://paypal.me/Thiruvalluru';
            }
        });
    }

    // Simple testimonial slider functionality
    const testimonialSlider = document.querySelector('.testimonial-slider');
    const testimonials = document.querySelectorAll('.testimonial');
    
    if (testimonialSlider && testimonials.length > 0) {
        let currentIndex = 0;
        
        // Auto-scroll testimonials every 5 seconds
        setInterval(() => {
            currentIndex = (currentIndex + 1) % testimonials.length;
            const scrollPosition = testimonials[currentIndex].offsetLeft;
            testimonialSlider.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });
        }, 5000);
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});