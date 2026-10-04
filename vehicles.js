(() => {
  const form = document.getElementById('vehicles-form');
  if (!form) return;
  const date = document.getElementById('vehicles-arrival');
  const today = new Date();
  date.min = [today.getFullYear(), String(today.getMonth()+1).padStart(2,'0'), String(today.getDate()).padStart(2,'0')].join('-');
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (!form.reportValidity()) return;
    const button = form.querySelector('button[type="submit"]');
    const status = document.getElementById('vehicles-status');
    const original = button.innerHTML;
    const data = new FormData(form);
    const payload = Object.fromEntries(data.entries());
    
    
    
    payload.replyto = payload.email;
    payload.form_name = 'Safari Vehicle Inquiry';
    payload.source_page = location.href;
    if (!payload.botcheck) delete payload.botcheck;
    button.disabled = true;
    button.textContent = 'Sending your request…';
    status.textContent = 'Sending your vehicles trip preferences…';
    try {
      const response = await fetch(form.action, {
        method: 'POST', headers: {'Content-Type':'application/json','Accept':'application/json'},
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error('Submission failed');
      form.reset();
      status.textContent = 'Thank you! Your vehicle quotation request has been sent. Our team will contact you.';
    } catch {
      status.textContent = 'Your request could not be sent. Please try again or email bookings@century-adventures.com. Your details are still here.';
    } finally {
      button.disabled = false;
      button.innerHTML = original;
    }
  });
})();