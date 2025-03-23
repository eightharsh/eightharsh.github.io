


(function () {
  // Update copyright year
  const copyEl = document.getElementById('copyright-year');
  if (copyEl) {
    copyEl.textContent = new Date().getFullYear();
  }

  // Update last modified timestamp on Now page
  const lastUpdatedEl = document.getElementById('last-updated');
  if (lastUpdatedEl) {
    const lastModified = new Date(document.lastModified);
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    };
    const formattedDate = lastModified.toLocaleDateString('en-US', options);
    lastUpdatedEl.textContent = formattedDate;
  }

  // Handle Contact Form Submission to Google Sheets
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    const feedbackEl = document.getElementById('form-feedback');
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault(); // Prevent default form submission

      const formData = new FormData(contactForm);
      const submitButton = contactForm.querySelector('.form-submit');
      submitButton.disabled = true; // Disable the button to prevent multiple submissions

      // Google Form's formResponse URL
      const googleFormUrl = 'https://docs.google.com/forms/d/e/1FAIpQLScWqGuYlsxtNqcmMgp7KlBGX59gpAWviEHkNa-T9wvnY2oA6w/formResponse';

      fetch(googleFormUrl, {
        method: 'POST',
        body: formData,
        mode: 'no-cors' // Required for Google Forms submission
      })
        .then(() => {
          // Success: Show a success message and reset the form
          feedbackEl.style.display = 'block';
          feedbackEl.style.color = 'green';
          feedbackEl.textContent = 'Thank you! Your message has been submitted successfully.';
          contactForm.reset();
          submitButton.disabled = false;
        })
        .catch((error) => {
          // Error: Show an error message
          feedbackEl.style.display = 'block';
          feedbackEl.style.color = 'red';
          feedbackEl.textContent = 'There was an error submitting your message. Please try again later.';
          console.error('Error:', error);
          submitButton.disabled = false;
        });
    });
  }

  // Table of Contents (TOC) Scroll Highlighting
  const tocLinks = document.querySelectorAll('.toc-link');
  const sections = document.querySelectorAll('.article-section, .talk-section');

  if (tocLinks.length && sections.length) {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute('id');
          tocLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
              link.classList.add('active');
            }
          });
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(section => observer.observe(section));
  }
})();
