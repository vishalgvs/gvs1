document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('quoteForm');
  if (!form) return;

  const successBox = document.getElementById('quoteSuccess');
  const errorBox = document.getElementById('quoteError');
  const submitBtn = document.getElementById('quoteSubmitBtn');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Basic required-field check (native "required" attrs still apply first)
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    // Phone number validation
    const phone = form.querySelector('#phone').value.trim();
    const phonePattern = /^(?:\+91[\s-]?)?[6-9]\d{9}$/;

    if (!phonePattern.test(phone.replace(/\s/g, ''))) {
      alert('Please enter a valid Indian mobile number.');
      form.querySelector('#phone').focus();
      return;
    }

    // Email validation
    const email = form.querySelector('#email').value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      alert('Please enter a valid email address.');
      form.querySelector('#email').focus();
      return;
    }
    errorBox.classList.remove('show');
    successBox.classList.remove('show');

    const originalLabel = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Sending...';

    // Collect checked "Service" checkboxes into a single readable string
    const services = Array.from(form.querySelectorAll('input[name="Service"]:checked'))
      .map(el => el.value)
      .join(', ');

    const payload = {
      Name: form.querySelector('#name').value.trim(),
      Company: form.querySelector('#company').value.trim(),
      Phone: form.querySelector('#phone').value.trim(),
      Email: form.querySelector('#email').value.trim(),
      'Service Needed': services,
      'Product / Part': form.querySelector('#product').value.trim(),
      'Requirement Type': form.querySelector('#batch').value,
      'Additional Requirements': form.querySelector('#details').value.trim(),
      _subject: 'New Gear Volt Solution Quote Request',
      _template: 'table'
    };

    // Honeypot check — if a bot filled this hidden field, silently pretend success
    const honey = form.querySelector('input[name="_honey"]').value;
    if (honey) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalLabel;
      successBox.classList.add('show');
      form.reset();
      return;
    }

    try {
      const res = await fetch('https://formsubmit.co/ajax/Gearvoltsolution@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error('Request failed');

      successBox.classList.add('show');
      form.reset();
      successBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } catch (err) {
      errorBox.classList.add('show');
      errorBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalLabel;
    }
  });
});
