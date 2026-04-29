// ===== script.js =====
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link:not(.dropdown-toggle)');
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    if (navLinks && navbarToggler) {
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }
            });
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== "#") {
                e.preventDefault();
                document.querySelector(href)?.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    const yearSpan = document.querySelector('.current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});

// Form submission handling

  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const successAlert = document.getElementById('form-success');
  const errorAlert = document.getElementById('form-error');

  function showAlert(el, durationMs = 5000) {
    el.style.setProperty('display', 'flex', 'important');
    setTimeout(() => {
      el.style.setProperty('display', 'none', 'important');
    }, durationMs);
  }

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    const data = new FormData(form);

    try {
      const response = await fetch('https://formspree.io/f/xwvaajrn', {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        form.reset();
        showAlert(successAlert, 6000); // disappears after 6 seconds
      } else {
        showAlert(errorAlert, 6000);
      }
    } catch (err) {
      showAlert(errorAlert, 6000);
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Request';
    }
  });

  