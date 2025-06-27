// Navigation functionality
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Menu filtering functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const menuItems = document.querySelectorAll('.menu-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        menuItems.forEach(item => {
            if (filterValue === 'all') {
                item.classList.remove('hidden');
                setTimeout(() => {
                    item.style.display = 'block';
                }, 10);
            } else if (item.getAttribute('data-category') === filterValue) {
                item.classList.remove('hidden');
                setTimeout(() => {
                    item.style.display = 'block';
                }, 10);
            } else {
                item.classList.add('hidden');
                setTimeout(() => {
                    if (item.classList.contains('hidden')) {
                        item.style.display = 'none';
                    }
                }, 300);
            }
        });
    });
});

// Reservation form functionality
const reservationForm = document.getElementById('reservation-form');

reservationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(reservationForm);
    const reservationData = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        date: formData.get('date'),
        time: formData.get('time'),
        guests: formData.get('guests'),
        occasion: formData.get('occasion'),
        requests: formData.get('requests')
    };
    
    // Validate required fields
    if (!reservationData.name || !reservationData.email || !reservationData.phone || 
        !reservationData.date || !reservationData.time || !reservationData.guests) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(reservationData.email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Validate date (must be in the future)
    const selectedDate = new Date(reservationData.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
        alert('Please select a future date.');
        return;
    }
    
    // Simulate form submission
    alert(`Thank you, ${reservationData.name}! Your reservation request has been submitted. We will contact you shortly to confirm your booking for ${reservationData.guests} guests on ${reservationData.date} at ${reservationData.time}.`);
    
    // Reset form
    reservationForm.reset();
});

// Contact form functionality
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const contactData = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message')
    };
    
    // Validate required fields
    if (!contactData.name || !contactData.email || !contactData.subject || !contactData.message) {
        alert('Please fill in all fields.');
        return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactData.email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Simulate form submission
    alert(`Thank you, ${contactData.name}! Your message has been sent. We will get back to you soon.`);
    
    // Reset form
    contactForm.reset();
});

// Event reservation functionality
const eventButtons = document.querySelectorAll('.event-card .btn');

eventButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const eventCard = button.closest('.event-card');
        const eventTitle = eventCard.querySelector('h3').textContent;
        const eventDate = eventCard.querySelector('.event-date').textContent.trim();
        const eventPrice = eventCard.querySelector('.price').textContent;
        
        const confirmed = confirm(`Would you like to reserve a spot for "${eventTitle}" on ${eventDate}? Price: ${eventPrice}`);
        
        if (confirmed) {
            alert(`Thank you for your interest in "${eventTitle}"! Please call us at (555) 123-4568 to complete your reservation.`);
        }
    });
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe sections for animation
const sections = document.querySelectorAll('section');
sections.forEach(section => {
    observer.observe(section);
});

// Set minimum date for reservation form
const dateInput = document.getElementById('date');
const today = new Date().toISOString().split('T')[0];
dateInput.setAttribute('min', today);

// Add loading states to forms
function addLoadingState(button) {
    const originalText = button.textContent;
    button.textContent = 'Loading...';
    button.disabled = true;
    
    setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
    }, 2000);
}

// Enhanced form submissions with loading states
reservationForm.addEventListener('submit', (e) => {
    const submitButton = reservationForm.querySelector('button[type="submit"]');
    addLoadingState(submitButton);
});

contactForm.addEventListener('submit', (e) => {
    const submitButton = contactForm.querySelector('button[type="submit"]');
    addLoadingState(submitButton);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const rate = scrolled * -0.5;
    
    if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add smooth hover effects to cards
const cards = document.querySelectorAll('.menu-item, .event-card, .info-card');
cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add initial animations
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.classList.add('fade-in-up');
    }
    
    // Preload images for better performance
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        const imageUrl = img.src;
        const imagePreload = new Image();
        imagePreload.src = imageUrl;
    });
    
    console.log('Bella Vista Restaurant website loaded successfully!');
});