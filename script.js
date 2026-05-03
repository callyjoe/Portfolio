/* ============================================================
   PORTFOLIO — script.js
   ============================================================ */

/* ---- 1. CV DOWNLOAD ---- */
const CV_FILE_PATH = 'Calvin_Akiweley_CV.pdf'; // <-- PUT YOUR CV FILE NAME HERE

document.getElementById('cvDownloadBtn').addEventListener('click', function () {
    const link = document.createElement('a');
    link.href = CV_FILE_PATH;
    link.download = CV_FILE_PATH;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});


/* ---- 2. ANIMATED COUNTER (hero stats) ---- */
function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const duration = 1500;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            el.textContent = target;
            clearInterval(timer);
        } else {
            el.textContent = Math.floor(current);
        }
    }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-num').forEach(el => counterObserver.observe(el));


/* ---- 3. SCROLL REVEAL ---- */
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            entry.target.style.transitionDelay = (i * 80) + 'ms';
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll(
    '.box, .ct, .highlight-item, .skill-pill, .abt, .skills-section, .contact-section'
).forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
});


/* ---- 4. BACK-TO-TOP VISIBILITY ---- */
const topBtn = document.querySelector('.top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        topBtn.classList.add('visible');
    } else {
        topBtn.classList.remove('visible');
    }
});


/* ---- 5. ACTIVE NAV LINK HIGHLIGHT ---- */
const sections = document.querySelectorAll('header[id], section[id], div[id]');
const navLinks = document.querySelectorAll('nav ul li a');

const activeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => link.classList.remove('active'));
            const id = entry.target.getAttribute('id');
            const activeLink = document.querySelector(`nav ul li a[href="#${id}"]`);
            if (activeLink) activeLink.classList.add('active');
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('#home, #about, #skills, #contact').forEach(s => {
    if (s) activeObserver.observe(s);
});


/* ---- 6. TYPED ROLE TEXT ---- */
const roles = ['Website Developer', 'UI/UX Enthusiast', 'Problem Solver', 'BSc. IT Student'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const roleBadge = document.querySelector('.role-badge');

function typeRole() {
    if (!roleBadge) return;
    const current = roles[roleIndex];
    if (isDeleting) {
        roleBadge.textContent = current.substring(0, charIndex--);
        if (charIndex < 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            setTimeout(typeRole, 400);
            return;
        }
    } else {
        roleBadge.textContent = current.substring(0, charIndex++);
        if (charIndex > current.length) {
            isDeleting = true;
            setTimeout(typeRole, 1800);
            return;
        }
    }
    setTimeout(typeRole, isDeleting ? 60 : 100);
}

setTimeout(typeRole, 1200);


/* ---- 7. BOX CARD TILT on mousemove ---- */
document.querySelectorAll('.box').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `translateY(-8px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});


/* ---- 9. HAMBURGER MENU ---- */
const hamburgerBtn = document.getElementById('hamburgerBtn');
const mobileMenu   = document.getElementById('mobileMenu');
const menuOverlay  = document.getElementById('menuOverlay');
const mobileClose  = document.getElementById('mobileClose');

function openMenu() {
    hamburgerBtn.classList.add('open');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    mobileMenu.classList.add('open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    menuOverlay.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeMenu() {
    hamburgerBtn.classList.remove('open');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    menuOverlay.classList.remove('show');
    document.body.style.overflow = '';
}

hamburgerBtn.addEventListener('click', () => {
    mobileMenu.classList.contains('open') ? closeMenu() : openMenu();
});

mobileClose.addEventListener('click', closeMenu);
menuOverlay.addEventListener('click', closeMenu);

// Close on any nav link click
document.querySelectorAll('[data-close]').forEach(link => {
    link.addEventListener('click', closeMenu);
});

// Close on Escape key
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMenu();
});
const style = document.createElement('style');
style.textContent = `nav ul li a.active { color: var(--green); } nav ul li a.active::after { width: 100%; }`;
document.head.appendChild(style);
