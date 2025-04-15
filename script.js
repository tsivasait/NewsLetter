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
        });
    });

    // Payment method toggle
    const paymentMethodRadios = document.querySelectorAll('input[name="payment-method"]');
    const creditCardDetails = document.querySelector('.credit-card-details');
    const upiDetails = document.querySelector('.upi-details');

    paymentMethodRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            // Hide all payment detail sections first
            creditCardDetails.style.display = 'none';
            upiDetails.style.display = 'none';
            
            // Show the appropriate section based on selection
            if (this.value === 'credit-card') {
                creditCardDetails.style.display = 'block';
            } else if (this.value === 'upi') {
                upiDetails.style.display = 'block';
            }
        });
    });

    // Form submission
    const donationForm = document.getElementById('donation-form');
    
    donationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const cause = document.getElementById('cause').value;
        const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;
        
        // Get donation amount
        let donationAmount;
        if (selectedAmount === 'custom') {
            donationAmount = document.getElementById('custom-amount').value;
        } else {
            donationAmount = selectedAmount;
        }
        
        // Simple validation
        if (!name || !email || !donationAmount) {
            alert('Please fill in all required fields');
            return;
        }
        
        // Additional validation for payment methods
        if (paymentMethod === 'credit-card') {
            const cardNumber = document.getElementById('card-number').value;
            const expiry = document.getElementById('expiry').value;
            const cvv = document.getElementById('cvv').value;
            
            if (!cardNumber || !expiry || !cvv) {
                alert('Please fill in all credit card details');
                return;
            }
        } else if (paymentMethod === 'upi') {
            const upiId = document.getElementById('upi-id').value;
            
            if (!upiId) {
                alert('Please enter your UPI ID');
                return;
            }
        }
        
        // In a real application, you would send this data to a server
        // For this example, we'll just show a success message
        alert(`Thank you, ${name}! Your donation of $${donationAmount} to ${cause} has been processed successfully via ${paymentMethod}.`);
        
        // Reset form
        donationForm.reset();
        amountButtons.forEach(btn => btn.classList.remove('active'));
        customAmountContainer.style.display = 'none';
        creditCardDetails.style.display = 'block';
        upiDetails.style.display = 'none';
    });

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