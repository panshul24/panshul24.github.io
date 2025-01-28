document.addEventListener('DOMContentLoaded', function() {
    // Hamburger menu functionality
    const hamburgerButton = document.getElementById('hamburger-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (hamburgerButton && mobileMenu) {
        hamburgerButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            mobileMenu.classList.toggle('hidden');
        });

        // Close mobile menu when clicking a link
        document.querySelectorAll('#mobile-menu a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!hamburgerButton.contains(event.target) && !mobileMenu.contains(event.target)) {
                mobileMenu.classList.add('hidden');
            }
        });
    }

    // Particle configuration
    const particleConfig = {
        particles: {
            number: {
                value: 30,
                density: {
                    enable: true,
                    value_area: 1000
                }
            },
            color: {
                value: '#333333'
            },
            shape: {
                type: "circle"
            },
            opacity: {
                value: 0.3,
                random: false
            },
            size: {
                value: 2,
                random: true
            },
            line_linked: {
                enable: true,
                distance: 200,
                color: "#4a90e2",
                opacity: 0.2,
                width: 1
            },
            move: {
                enable: true,
                speed: 1.5,
                direction: "none",
                random: false,
                straight: false,
                out_mode: "out",
                bounce: false
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: {
                    enable: true,
                    mode: "grab"
                },
                onclick: {
                    enable: true,
                    mode: "push"
                },
                resize: true
            }
        },
        retina_detect: true
    };

    // Initialize particles for all sections
    const particleIds = [
        'particles',
        'particles-home',
        'particles-summary',
        'particles-education',
        'particles-skills',
        'particles-experience',
        'particles-projects',
        'particles-leadership',
        'particles-contact'
    ];

    particleIds.forEach(id => {
        if (document.getElementById(id)) {
            particlesJS(id, particleConfig);
        }
    });

    // Initialize Scrollify with optimized settings
    $.scrollify({
        section: ".section",
        scrollSpeed: 400,
        offset: 0,
        scrollbars: false,
        standardScrollElements: "#experience .container, #projects .container",
        setHeights: false,
        overflowScroll: true,
        updateHash: true,
        touchScroll: true,
        easing: "easeOutExpo",
        before: function(i, sections) {
            document.body.classList.add('is-scrolling');
        },
        after: function(i, sections) {
            const links = document.querySelectorAll('nav a');
            links.forEach(link => link.classList.remove('text-blue-500'));
            const activeSection = sections[i];
            const activeLink = document.querySelector(`nav a[href="#${activeSection.id}"]`);
            if (activeLink) {
                activeLink.classList.add('text-blue-500');
            }
            document.body.classList.remove('is-scrolling');
        }
    });

    // Optimize scroll performance
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (!scrollTimeout) {
            requestAnimationFrame(function() {
                scrollTimeout = null;
            });
        }
        scrollTimeout = setTimeout(function() {}, 66);
    }, false);

    // Add pagination dots
    const sections = document.querySelectorAll('.section');
    const pagination = document.createElement('div');
    pagination.className = 'fixed right-4 top-1/2 transform -translate-y-1/2 z-50';
    
    sections.forEach((section, index) => {
        const dot = document.createElement('div');
        dot.className = 'w-3 h-3 bg-gray-400 rounded-full mb-4 cursor-pointer hover:bg-blue-500 transition-colors';
        dot.addEventListener('click', () => {
            $.scrollify.move(index);
        });
        pagination.appendChild(dot);
    });
    
    document.body.appendChild(pagination);

    // External links handler
    document.querySelectorAll('a[href^="https://"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            window.open(this.href, '_blank');
        });
    });

    // Timeline animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.timeline-content').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'all 0.5s ease-out';
        observer.observe(item);
    });

    // Add this to handle form submissions
    document.querySelector('form').addEventListener('submit', function(e) {
        e.preventDefault();
        const form = e.target;
        const data = new FormData(form);
        
        fetch(form.action, {
            method: 'POST',
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                // Clear form
                form.reset();
                // Show success message
                alert('Message sent successfully!');
            } else {
                throw new Error('Error sending message');
            }
        })
        .catch(error => {
            alert('Error sending message. Please try again.');
            console.error(error);
        });
    });
});
