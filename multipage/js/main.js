/* ============================================
   MAIN JS - GSAP + Locomotive Scroll + Animations
   ============================================ */

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// ============================================
// PRELOADER
// ============================================
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('loaded');
            initAnimations();
        }, 800);
    } else {
        initAnimations();
    }
});

// ============================================
// NAVBAR
// ============================================
const navbar = document.querySelector('.navbar');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
    if (!navbar) return;
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('open');
    });
}

// Close mobile menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navToggle?.classList.remove('active');
        navLinks?.classList.remove('open');
    });
});

// Active nav link
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        link.classList.add('active');
    }
});

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ============================================
// INIT ALL ANIMATIONS
// ============================================
function initAnimations() {
    animateHero();
    animateReveals();
    animateServiceCards();
    animatePartnerLogos();
    animateStats();
    animateContactCards();
    animateFooter();
    initMagneticButtons();
    initParallaxShapes();
    initTextSplit();
}

// ============================================
// HERO ANIMATIONS
// ============================================
function animateHero() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.from('.hero-badge', { duration: 0.8, y: 30, opacity: 0 })
      .from('.hero h1', { duration: 1.2, y: 60, opacity: 0 }, '-=0.4')
      .from('.hero p', { duration: 1, y: 40, opacity: 0 }, '-=0.6')
      .from('.hero-buttons .btn', { duration: 0.8, y: 30, opacity: 0, stagger: 0.15 }, '-=0.5')
      .from('.hero-stat', { duration: 0.8, y: 30, opacity: 0, stagger: 0.1 }, '-=0.4')
      .from('.hero-visual', { duration: 1.2, x: 60, opacity: 0 }, '-=1');

    // Floating shapes
    gsap.to('.hero-shape-1', {
        y: -30, x: 20, duration: 6, repeat: -1, yoyo: true, ease: 'sine.inOut'
    });
    gsap.to('.hero-shape-2', {
        y: 20, x: -15, duration: 5, repeat: -1, yoyo: true, ease: 'sine.inOut'
    });
    gsap.to('.hero-shape-3', {
        y: -15, x: 10, duration: 7, repeat: -1, yoyo: true, ease: 'sine.inOut'
    });
}

// ============================================
// PAGE HEADER ANIMATIONS (inner pages)
// ============================================
function animatePageHeader() {
    const pageHeader = document.querySelector('.page-header');
    if (!pageHeader) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.from('.breadcrumb', { duration: 0.6, y: 20, opacity: 0 })
      .from('.page-header h1', { duration: 1, y: 40, opacity: 0 }, '-=0.3')
      .from('.page-header p', { duration: 0.8, y: 30, opacity: 0 }, '-=0.4');
}

// ============================================
// REVEAL ANIMATIONS
// ============================================
function animateReveals() {
    // Set initial states
    gsap.utils.toArray('.reveal').forEach(el => {
        gsap.set(el, { y: 30, opacity: 0 });
    });

    gsap.utils.toArray('.reveal-left').forEach(el => {
        gsap.set(el, { x: -40, opacity: 0 });
    });

    gsap.utils.toArray('.reveal-right').forEach(el => {
        gsap.set(el, { x: 40, opacity: 0 });
    });

    // Animate with proper toggle actions for scroll up/down
    gsap.utils.toArray('.reveal').forEach(el => {
        gsap.to(el, {
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play reverse play reverse',
                onEnter: () => gsap.to(el, { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }),
                onLeaveBack: () => gsap.to(el, { y: 30, opacity: 0, duration: 0.6, ease: 'power3.in' }),
                onEnterBack: () => gsap.to(el, { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }),
                onLeave: () => gsap.to(el, { y: 30, opacity: 0, duration: 0.6, ease: 'power3.in' })
            }
        });
    });

    gsap.utils.toArray('.reveal-left').forEach(el => {
        gsap.to(el, {
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play reverse play reverse',
                onEnter: () => gsap.to(el, { x: 0, opacity: 1, duration: 1, ease: 'power3.out' }),
                onLeaveBack: () => gsap.to(el, { x: -40, opacity: 0, duration: 0.6, ease: 'power3.in' }),
                onEnterBack: () => gsap.to(el, { x: 0, opacity: 1, duration: 1, ease: 'power3.out' }),
                onLeave: () => gsap.to(el, { x: -40, opacity: 0, duration: 0.6, ease: 'power3.in' })
            }
        });
    });

    gsap.utils.toArray('.reveal-right').forEach(el => {
        gsap.to(el, {
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play reverse play reverse',
                onEnter: () => gsap.to(el, { x: 0, opacity: 1, duration: 1, ease: 'power3.out' }),
                onLeaveBack: () => gsap.to(el, { x: 40, opacity: 0, duration: 0.6, ease: 'power3.in' }),
                onEnterBack: () => gsap.to(el, { x: 0, opacity: 1, duration: 1, ease: 'power3.out' }),
                onLeave: () => gsap.to(el, { x: 40, opacity: 0, duration: 0.6, ease: 'power3.in' })
            }
        });
    });

    // Scale reveals
    gsap.utils.toArray('.reveal-scale').forEach(el => {
        gsap.set(el, { scale: 0.8, opacity: 0 });
        gsap.to(el, {
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play reverse play reverse',
                onEnter: () => gsap.to(el, { scale: 1, opacity: 1, duration: 1, ease: 'back.out(1.7)' }),
                onLeaveBack: () => gsap.to(el, { scale: 0.8, opacity: 0, duration: 0.6, ease: 'power3.in' }),
                onEnterBack: () => gsap.to(el, { scale: 1, opacity: 1, duration: 1, ease: 'back.out(1.7)' }),
                onLeave: () => gsap.to(el, { scale: 0.8, opacity: 0, duration: 0.6, ease: 'power3.in' })
            }
        });
    });
}

// ============================================
// SERVICE CARDS
// ============================================
function animateServiceCards() {
    gsap.utils.toArray('.service-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%'
            },
            y: 60,
            opacity: 0,
            duration: 0.8,
            delay: i * 0.1,
            ease: 'power3.out'
        });
    });
}

// ============================================
// PARTNER LOGOS
// ============================================
function animatePartnerLogos() {
    gsap.utils.toArray('.partner-logo-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 90%'
            },
            scale: 0.8,
            opacity: 0,
            duration: 0.5,
            delay: i * 0.03,
            ease: 'back.out(1.7)'
        });
    });
}

// ============================================
// STATS COUNTER
// ============================================
function animateStats() {
    gsap.utils.toArray('.stat-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%'
            },
            y: 40,
            opacity: 0,
            duration: 0.8,
            delay: i * 0.15,
            ease: 'back.out(1.7)'
        });
    });

    // Counter animation
    gsap.utils.toArray('.stat-number').forEach(el => {
        const target = el.getAttribute('data-count');
        if (!target) return;

        ScrollTrigger.create({
            trigger: el,
            start: 'top 85%',
            onEnter: () => {
                gsap.to(el, {
                    innerText: target,
                    duration: 2,
                    snap: { innerText: 1 },
                    ease: 'power2.out'
                });
            },
            once: true
        });
    });
}

// ============================================
// CONTACT CARDS
// ============================================
function animateContactCards() {
    gsap.utils.toArray('.contact-info-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%'
            },
            x: -40,
            opacity: 0,
            duration: 0.6,
            delay: i * 0.1,
            ease: 'power3.out'
        });
    });
}

// ============================================
// FOOTER
// ============================================
function animateFooter() {
    const footer = document.querySelector('.footer');
    if (!footer) return;

    gsap.from('.footer-grid > *', {
        scrollTrigger: {
            trigger: footer,
            start: 'top 85%'
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out'
    });
}

// ============================================
// MAGNETIC BUTTONS
// ============================================
function initMagneticButtons() {
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            gsap.to(btn, { x: x * 0.15, y: y * 0.15, duration: 0.3, ease: 'power2.out' });
        });

        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
        });
    });
}

// ============================================
// PARALLAX SHAPES
// ============================================
function initParallaxShapes() {
    gsap.utils.toArray('.hero-shape').forEach(shape => {
        gsap.to(shape, {
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: 1
            },
            y: -100,
            ease: 'none'
        });
    });
}

// ============================================
// TEXT SPLIT ANIMATION
// ============================================
function initTextSplit() {
    gsap.utils.toArray('.text-split').forEach(el => {
        const text = el.textContent;
        el.innerHTML = '';
        text.split('').forEach(char => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.display = 'inline-block';
            el.appendChild(span);
        });

        gsap.from(el.children, {
            scrollTrigger: {
                trigger: el,
                start: 'top 85%'
            },
            y: 40,
            opacity: 0,
            duration: 0.6,
            stagger: 0.02,
            ease: 'back.out(1.7)'
        });
    });
}

// ============================================
// MARQUEE / INFINITE SCROLL LOGOS
// ============================================
function initMarquee() {
    const marquees = document.querySelectorAll('.marquee-track');
    marquees.forEach(track => {
        const items = track.innerHTML;
        track.innerHTML = items + items;
        const totalWidth = track.scrollWidth / 2;

        gsap.to(track, {
            x: -totalWidth,
            duration: 40,
            ease: 'none',
            repeat: -1
        });
    });
}

// Call marquee if elements exist
if (document.querySelector('.marquee-track')) {
    window.addEventListener('load', initMarquee);
}

// ============================================
// FAQ ACCORDION
// ============================================
function toggleFaqGroup(btn) {
    const group = btn.closest('.faq-group');
    const isOpen = group.classList.contains('open');
    document.querySelectorAll('.faq-group.open').forEach(g => g.classList.remove('open'));
    if (!isOpen) group.classList.add('open');
}

function toggleFaq(btn) {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    item.closest('.faq-group-body').querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
}

// ============================================
// FOOTER ACCORDION (mobile only)
// ============================================
document.querySelectorAll('.footer-col h4').forEach(h4 => {
    h4.addEventListener('click', () => {
        if (window.innerWidth > 640) return;
        const col = h4.closest('.footer-col');
        col.classList.toggle('open');
    });
});

// ============================================
// FORM HANDLING
// ============================================
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('.btn');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';

        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
            contactForm.reset();
        }, 3000);
    });
}
