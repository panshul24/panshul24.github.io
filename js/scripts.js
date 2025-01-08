document.addEventListener('DOMContentLoaded', function() {
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
                value: "#4a90e2"
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

    // Initialize Scrollify
    $.scrollify({
        section: ".section",
        scrollSpeed: 1100,
        offset: 0,
        scrollbars: true,
        standardScrollElements: "#experience .container, #projects .container",
        setHeights: true,
        overflowScroll: true,
        updateHash: true,
        touchScroll: true,
        before: function() {
            // You can add animations before section change
        },
        after: function(i, sections) {
            // Update navigation active state
            const links = document.querySelectorAll('nav a');
            links.forEach(link => link.classList.remove('text-blue-500'));
            const activeSection = sections[i];
            const activeLink = document.querySelector(`nav a[href="#${activeSection.id}"]`);
            if (activeLink) {
                activeLink.classList.add('text-blue-500');
            }
        }
    });

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
});
