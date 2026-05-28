/* ─────────────────────────────────────────────
   Shivam Tripathi Portfolio — script.js
───────────────────────────────────────────── */

// ═══════════════════════════════════════════
// 1. THEME TOGGLE
// ═══════════════════════════════════════════
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

// ═══════════════════════════════════════════
// 2. MOBILE NAV
// ═══════════════════════════════════════════
const hamburger    = document.getElementById('hamburger');
const navLinks     = document.getElementById('navLinks');
const mobileOverlay = document.getElementById('mobileOverlay');

function openNav() {
  hamburger.classList.add('open');
  navLinks.classList.add('mobile-open');
  mobileOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeNav() {
  hamburger.classList.remove('open');
  navLinks.classList.remove('mobile-open');
  mobileOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', () => {
  if (navLinks.classList.contains('mobile-open')) closeNav();
  else openNav();
});

mobileOverlay.addEventListener('click', closeNav);

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', closeNav);
});

// ═══════════════════════════════════════════
// 3. NAVBAR SCROLL EFFECT
// ═══════════════════════════════════════════
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

// ═══════════════════════════════════════════
// 4. ACTIVE NAV LINK HIGHLIGHT
// ═══════════════════════════════════════════
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link:not(.nav-link-icon)');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}, {
  rootMargin: '-40% 0px -55% 0px',
  threshold: 0
});

sections.forEach(s => sectionObserver.observe(s));

// ═══════════════════════════════════════════
// 5. SCROLL REVEAL
// ═══════════════════════════════════════════
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -60px 0px'
});

document.querySelectorAll('.reveal').forEach(el => {
  revealObserver.observe(el);
});

// ═══════════════════════════════════════════
// 6. COUNTER ANIMATION
// ═══════════════════════════════════════════
function animateCounter(el, target, duration = 1800) {
  let start = null;
  const startVal = 0;

  function step(timestamp) {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    // Ease out cubic
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(startVal + (target - startVal) * ease);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  }

  requestAnimationFrame(step);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.getAttribute('data-target'), 10);
      animateCounter(el, target);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.metric-num[data-target]').forEach(el => {
  counterObserver.observe(el);
});

// ═══════════════════════════════════════════
// 7. SMOOTH SCROLL FOR ANCHOR LINKS
// ═══════════════════════════════════════════
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();

    const navH = parseInt(getComputedStyle(document.documentElement)
      .getPropertyValue('--nav-h'), 10) || 64;

    window.scrollTo({
      top: target.offsetTop - navH,
      behavior: 'smooth'
    });
  });
});

// ═══════════════════════════════════════════
// 8. SKILL PILL HOVER RIPPLE
// ═══════════════════════════════════════════
document.querySelectorAll('.skill-pill').forEach(pill => {
  pill.addEventListener('mouseenter', function(e) {
    this.style.transition = 'background 0.22s ease, color 0.22s ease, border-color 0.22s ease, transform 0.15s ease';
    this.style.transform = 'scale(1.05)';
  });
  pill.addEventListener('mouseleave', function() {
    this.style.transform = '';
  });
});

// ═══════════════════════════════════════════
// 9. PROJECT CARD TILT EFFECT
// ═══════════════════════════════════════════
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    card.style.transform = `translateY(-4px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.22s, box-shadow 0.22s';
    setTimeout(() => { card.style.transition = ''; }, 400);
  });
});

// ═══════════════════════════════════════════
// 10. PROFILE IMAGE FALLBACK AVATAR
// ═══════════════════════════════════════════
const profileImg = document.querySelector('.profile-img img');
if (profileImg) {
  profileImg.addEventListener('error', function() {
    const initials = 'ST';
    const canvas = document.createElement('canvas');
    canvas.width = 300; canvas.height = 300;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#111c2b';
    ctx.fillRect(0, 0, 300, 300);
    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 96px DM Serif Display, serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(initials, 150, 155);
    this.src = canvas.toDataURL();
  });
}

// ═══════════════════════════════════════════
// 11. COPY EMAIL ON CLICK (footer)
// ═══════════════════════════════════════════
document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
  link.addEventListener('click', async (e) => {
    const email = link.getAttribute('href').replace('mailto:', '');
    // Only copy if it's the footer email (not the CTA button)
    if (link.classList.contains('contact-email-btn')) return;
    try {
      await navigator.clipboard.writeText(email);
      const original = link.textContent;
      link.textContent = 'Copied!';
      setTimeout(() => { link.textContent = original; }, 1800);
    } catch (_) {}
  });
});

// ═══════════════════════════════════════════
// 12. PAGE LOAD PROGRESS BAR
// ═══════════════════════════════════════════
const progressBar = document.createElement('div');
progressBar.style.cssText = `
  position: fixed;
  top: 0; left: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--accent), var(--gold));
  z-index: 9999;
  transition: width 0.15s ease;
  width: 0%;
  pointer-events: none;
`;
document.body.prepend(progressBar);

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docH = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docH > 0 ? (scrollTop / docH) * 100 : 0;
  progressBar.style.width = pct + '%';
}, { passive: true });

// ═══════════════════════════════════════════
// 13. STAGGER REVEAL FOR GRID CHILDREN
// ═══════════════════════════════════════════
function staggerReveal(containerSelector, childSelector, delayStep = 0.08) {
  const containers = document.querySelectorAll(containerSelector);
  containers.forEach(container => {
    const children = container.querySelectorAll(childSelector);
    children.forEach((child, i) => {
      child.style.transitionDelay = (i * delayStep) + 's';
    });
  });
}

staggerReveal('.skills-grid', '.skill-cat');
staggerReveal('.projects-grid', '.project-card');
staggerReveal('.contact-links-grid', '.contact-link-card');

// ═══════════════════════════════════════════
// INIT LOG
// ═══════════════════════════════════════════
console.log('%c Shivam Tripathi — Portfolio ', 
  'background:#38bdf8;color:#050e18;font-weight:bold;padding:4px 8px;border-radius:4px;');
console.log('%c Built with HTML, CSS & Vanilla JS ', 
  'color:#8fa8c0;padding:2px;');
