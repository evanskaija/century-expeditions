(() => {
  const form = document.getElementById('volunteer-form');
  if (!form) return;
  const date = document.getElementById('volunteer-arrival');
  const today = new Date();
  date.min = [today.getFullYear(), String(today.getMonth()+1).padStart(2,'0'), String(today.getDate()).padStart(2,'0')].join('-');
  form.querySelectorAll('input[name="interests"]').forEach(input => input.addEventListener('change', () => {
    form.querySelector('input[name="interests"]').setCustomValidity('');
  }));
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (!form.reportValidity()) return;
    const firstInterest = form.querySelector('input[name="interests"]');
    if (!form.querySelector('input[name="interests"]:checked')) {
      firstInterest.setCustomValidity('Please select at least one program interest.');
      firstInterest.reportValidity();
      return;
    }
    firstInterest.setCustomValidity('');
    const button = form.querySelector('button[type="submit"]');
    const status = document.getElementById('volunteer-status');
    const original = button.innerHTML;
    const data = new FormData(form);
    const payload = Object.fromEntries(data.entries());
    
    payload.interests = data.getAll('interests').join(', ') || 'Not specified';
    payload.flexible_dates = data.has('flexible_dates') ? 'Yes' : 'No';
    payload.replyto = payload.email;
    payload.form_name = 'Volunteer Inquiry';
    payload.source_page = location.href;
    if (!payload.botcheck) delete payload.botcheck;
    button.disabled = true;
    button.textContent = 'Sending your request…';
    status.textContent = 'Sending your volunteer trip preferences…';
    try {
      const response = await fetch(form.action, {
        method: 'POST', headers: {'Content-Type':'application/json','Accept':'application/json'},
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error('Submission failed');
      form.reset();
      status.textContent = 'Thank you! Your volunteer program inquiry has been sent. Our team will contact you.';
    } catch {
      status.textContent = 'Your request could not be sent. Please try again or email bookings@century-adventures.com. Your details are still here.';
    } finally {
      button.disabled = false;
      button.innerHTML = original;
    }
  });
})();