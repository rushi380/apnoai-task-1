/* ============================================================
   DevLaunch — script.js
   Vanilla JavaScript only. No libraries, no build step.

   1. Dark / light theme (saved in localStorage)
   2. Mobile navigation
   3. Header shadow, active nav link, back-to-top
   4. Scroll reveal animations
   5. Contact form validation (demo mailto submission)
   6. Footer year
   ============================================================ */

(function () {
  'use strict';

  /* ---------- Shared references ---------- */
  const root = document.documentElement;
  const header = document.getElementById('site-header');
  const nav = document.getElementById('primary-nav');
  const menuToggle = document.getElementById('menu-toggle');
  const themeToggle = document.getElementById('theme-toggle');
  const themeColorMeta = document.querySelector('meta[name="theme-color"]');
  const navLinks = Array.from(document.querySelectorAll('.nav-link'));
  const sections = Array.from(document.querySelectorAll('main section[id]'));
  const backToTop = document.getElementById('back-to-top');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ---------- 1. Theme ---------- */
  const THEME_KEY = 'devlaunch-theme';
  const THEME_COLORS = { dark: '#070b1a', light: '#f5f7fd' };

  /**
   * Applies a theme to <html> and keeps the button + browser bar in sync.
   * @param {"dark"|"light"} theme
   * @param {boolean} save - write the choice to localStorage
   */
  function applyTheme(theme, save) {
    root.setAttribute('data-theme', theme);

    const nextLabel = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
    themeToggle.setAttribute('aria-label', nextLabel);
    themeToggle.setAttribute('title', nextLabel);

    if (themeColorMeta) {
      themeColorMeta.setAttribute('content', THEME_COLORS[theme]);
    }

    if (save) {
      try {
        localStorage.setItem(THEME_KEY, theme);
      } catch (error) {
        /* Storage can be unavailable (private mode). Theme still works for this visit. */
      }
    }
  }

  // The small script in <head> already applied the saved theme before paint.
  // Here we only sync the toggle's accessible label and icons.
  applyTheme(root.getAttribute('data-theme') === 'light' ? 'light' : 'dark', false);

  themeToggle.addEventListener('click', function () {
    const current = root.getAttribute('data-theme');
    applyTheme(current === 'dark' ? 'light' : 'dark', true);
  });

  /* ---------- 2. Mobile navigation ---------- */
  function setMenu(open) {
    nav.classList.toggle('is-open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.body.classList.toggle('nav-open', open);
  }

  menuToggle.addEventListener('click', function () {
    setMenu(!nav.classList.contains('is-open'));
  });

  // Close the panel after choosing any link inside it.
  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      setMenu(false);
    });
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && nav.classList.contains('is-open')) {
      setMenu(false);
      menuToggle.focus();
    }
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth > 900 && nav.classList.contains('is-open')) {
      setMenu(false);
    }
  });

  /* ---------- 3. Header, active link, back-to-top ---------- */
  let scrollQueued = false;

  function onScroll() {
    const y = window.scrollY;
    const headerHeight = header.offsetHeight;

    header.classList.toggle('is-scrolled', y > 8);
    backToTop.classList.toggle('is-visible', y > 600);

    // The "current" section is the last one whose top has passed the header.
    const line = headerHeight + 120;
    let currentId = sections.length ? sections[0].id : '';

    sections.forEach(function (section) {
      if (section.getBoundingClientRect().top <= line) {
        currentId = section.id;
      }
    });

    // At the very bottom of the page, force the last section to be active.
    const atBottom =
      window.innerHeight + y >= document.documentElement.scrollHeight - 4;
    if (atBottom && sections.length) {
      currentId = sections[sections.length - 1].id;
    }

    navLinks.forEach(function (link) {
      const isActive = link.getAttribute('href') === '#' + currentId;
      link.classList.toggle('is-active', isActive);
      if (isActive) {
        link.setAttribute('aria-current', 'location');
      } else {
        link.removeAttribute('aria-current');
      }
    });

    scrollQueued = false;
  }

  function requestScrollUpdate() {
    if (!scrollQueued) {
      scrollQueued = true;
      window.requestAnimationFrame(onScroll);
    }
  }

  window.addEventListener('scroll', requestScrollUpdate, { passive: true });
  window.addEventListener('resize', requestScrollUpdate);
  onScroll();

  backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: reduceMotion.matches ? 'auto' : 'smooth' });
  });

  /* ---------- 4. Scroll reveal ---------- */
  const revealItems = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && !reduceMotion.matches) {
    const revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    revealItems.forEach(function (item) {
      revealObserver.observe(item);
    });
  } else {
    // No observer support (or reduced motion): show everything immediately.
    revealItems.forEach(function (item) {
      item.classList.add('is-visible');
    });
  }

  /* ---------- 5. Contact form ---------- */
  const form = document.getElementById('contact-form');
  const successBox = document.getElementById('form-success');
  const successText = successBox ? successBox.querySelector('[data-success-text]') : null;

  const rules = {
    name: function (value) {
      return value.trim().length >= 2 || 'Please enter your name (at least 2 characters).';
    },
    email: function (value) {
      const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
      return pattern.test(value.trim()) || 'Please enter a valid email, like you@example.com.';
    },
    message: function (value) {
      return value.trim().length >= 10 || 'Please write a message of at least 10 characters.';
    }
  };

  /**
   * Validates one input, toggles its error message and returns true/false.
   */
  function validateField(field) {
    const rule = rules[field.name];
    if (!rule) {
      return true;
    }

    const result = rule(field.value);
    const isValid = result === true;
    const wrapper = field.closest('.field');
    const errorBox = wrapper.querySelector('.field-error');

    wrapper.classList.toggle('invalid', !isValid);
    field.setAttribute('aria-invalid', String(!isValid));
    if (errorBox) {
      errorBox.textContent = isValid ? '' : result;
    }

    return isValid;
  }

  if (form) {
    const fields = Array.from(form.querySelectorAll('input, textarea'));

    fields.forEach(function (field) {
      // Validate when the user leaves a field…
      field.addEventListener('blur', function () {
        validateField(field);
      });

      // …and clear the error as soon as they fix it.
      field.addEventListener('input', function () {
        if (field.closest('.field').classList.contains('invalid')) {
          validateField(field);
        }
      });
    });

    form.addEventListener('submit', function (event) {
      event.preventDefault();

      const invalidFields = fields.filter(function (field) {
        return !validateField(field);
      });

      if (invalidFields.length > 0) {
        successBox.classList.remove('is-visible');
        invalidFields[0].focus();
        return;
      }

      const name = form.querySelector('#name').value.trim();
      const email = form.querySelector('#email').value.trim();
      const message = form.querySelector('#message').value.trim();
      const clubEmail = form.dataset.email || 'hello@devlaunch.dev';

      // No backend: hand the message to the user's email app.
      const subject = encodeURIComponent('DevLaunch enquiry from ' + name);
      const body = encodeURIComponent(
        'Name: ' + name + '\nEmail: ' + email + '\n\n' + message
      );

      if (successText) {
        successText.textContent =
          'Thanks, ' + name + '! Your email app should open with your message ready to send. ' +
          'If nothing opens, email ' + clubEmail + ' directly.';
      }
      successBox.classList.add('is-visible');

      window.location.href = 'mailto:' + clubEmail + '?subject=' + subject + '&body=' + body;

      form.reset();
      fields.forEach(function (field) {
        field.closest('.field').classList.remove('invalid');
        field.removeAttribute('aria-invalid');
      });
    });
  }

  /* ---------- 6. Footer year ---------- */
  const year = document.getElementById('year');
  if (year) {
    year.textContent = String(new Date().getFullYear());
  }
})();
