gsap.registerPlugin(ScrollTrigger);

// --- Custom Cursor Logic ---
const cursor = document.querySelector('.cursor');
const hoverElements = document.querySelectorAll('.service-card, .action-button');

document.addEventListener('mousemove', (e) => {
    // Smooth follow effect using GSAP
    gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out"
    });
});

hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
});

// Hide cursor when it leaves the window
document.addEventListener('mouseleave', () => {
    gsap.to(cursor, { opacity: 0, duration: 0.2 });
});
document.addEventListener('mouseenter', () => {
    gsap.to(cursor, { opacity: 1, duration: 0.2 });
});


// --- GSAP Animations ---

// 1. Initial Hero Intro
const heroTimeline = gsap.timeline();

// Reveal the text lines with a 3D flip-up motion
heroTimeline.fromTo('.hero-title .line', 
    { 
        y: 100, 
        opacity: 0, 
        rotationX: -45 
    },
    { 
        y: 0, 
        opacity: 1, 
        rotationX: 0,
        duration: 1.5, 
        stagger: 0.3, 
        ease: "power3.out",
        delay: 0.2
    }
);

// Fade in HUD
heroTimeline.fromTo('.hud-nav, .scroll-indicator',
    { opacity: 0 },
    { opacity: 1, duration: 1, ease: "power2.out" },
    "-=0.5"
);

// 2. Continuous Background Parallax
gsap.to('.bg-glow', {
    yPercent: 30,
    ease: "none",
    scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: true
    }
});
gsap.to('.stars', {
    backgroundPosition: "0px -600px, 0px -1000px, 0px -1500px",
    ease: "none",
    scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1
    }
});

// Planet Parallax
gsap.to('.planet-1', {
    y: 400,
    rotate: 15, // Subtle celestial rotation
    ease: "none",
    scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5
    }
});

gsap.to('.planet-2', {
    y: -300,
    x: 100,
    rotate: -20,
    ease: "none",
    scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 2
    }
});

gsap.to('.nebula-cloud', {
    y: 200,
    scale: 1.2,
    ease: "none",
    scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 2.5
    }
});

// 3. Statement Scene Details
gsap.fromTo('.statement-text',
    { opacity: 0, y: 50 },
    {
        opacity: 1, 
        y: 0,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
            trigger: '.statement-scene',
            start: "top 70%",
            end: "bottom top",
            toggleActions: "play reverse play reverse"
        }
    }
);

// 4. Services Scene (Glassmorphism Cards)
const cards = gsap.utils.toArray('.service-card');

cards.forEach((card, i) => {
    // Determine the parallax speed from data attributes (fallback to 1)
    const speed = parseFloat(card.getAttribute('data-speed')) || 1;
    
    // Animate them coming up with different y-offsets based on speed
    gsap.fromTo(card,
        { opacity: 0, y: 150 },
        {
            opacity: 1, 
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            delay: i * 0.15, // Stagger effect inherently
            scrollTrigger: {
                trigger: '.services-scene',
                start: "top 70%",
            }
        }
    );

    // Subtle continuous parallax while scrolling through the section
    gsap.to(card, {
        y: () => -50 * speed, // move up slightly
        ease: "none",
        scrollTrigger: {
            trigger: '.services-scene',
            start: "top bottom",
            end: "bottom top",
            scrub: 1 // smooth scrubbing
        }
    });

    // Hover glow follow logic
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const glow = card.querySelector('.card-glow');
        
        gsap.to(glow, {
            x: x - 50, // center the 100px glow
            y: y - 50,
            duration: 0.4,
            ease: "power2.out"
        });
    });
});

// 5. Action Scene Footer
gsap.fromTo('.action-title',
    { opacity: 0, scale: 0.9 },
    {
        opacity: 1,
        scale: 1,
        duration: 2,
        ease: "expo.out",
        scrollTrigger: {
            trigger: '.action-scene',
            start: "top 75%"
        }
    }
);

gsap.fromTo('.action-button',
    { opacity: 0, y: 30 },
    {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        delay: 0.3,
        scrollTrigger: {
            trigger: '.action-scene',
            start: "top 75%"
        }
    }
);
