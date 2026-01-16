import { NextResponse } from "next/server";

const script = `
(function(){
  if (window.__leadflowEmbedLoaded) return;
  window.__leadflowEmbedLoaded = true;

  function getOrigin() {
    var currentScript = document.currentScript;
    if (!currentScript) {
      var scripts = document.querySelectorAll('script[src*="/api/embed"]');
      currentScript = scripts[scripts.length - 1];
    }
    try {
      return new URL(currentScript.src).origin;
    } catch (error) {
      return window.location.origin;
    }
  }

  var origin = getOrigin();

  function createForm() {
    var form = document.createElement('form');
    form.className = 'leadflow-form';
    form.innerHTML = '<style>\
      .leadflow-form{font-family:Arial,sans-serif;border:1px solid #e2e8f0;border-radius:12px;padding:20px;background:#ffffff;max-width:420px;box-shadow:0 15px 35px rgba(15,23,42,0.08);}\
      .leadflow-form h3{margin:0 0 12px;font-size:20px;color:#0f172a;}\
      .leadflow-field{margin-bottom:12px;display:flex;flex-direction:column;}\
      .leadflow-field label{font-size:13px;color:#475569;font-weight:600;margin-bottom:4px;}\
      .leadflow-field input,.leadflow-field textarea{border-radius:8px;border:1px solid #cbd5f5;padding:10px;font-size:14px;}\
      .leadflow-button{background:#2563eb;color:white;border:none;padding:12px 16px;border-radius:8px;font-weight:600;font-size:15px;cursor:pointer;}\
      .leadflow-button:hover{background:#1d4ed8;}\
      .leadflow-success{margin-top:10px;font-size:14px;color:#059669;}\
      .leadflow-error{margin-top:10px;font-size:14px;color:#dc2626;}\
    </style>\
    <h3>Book a discovery call</h3>\
    <div class="leadflow-field">\
      <label>Name</label>\
      <input name="name" required placeholder="Jane Doe"/>\
    </div>\
    <div class="leadflow-field">\
      <label>Email</label>\
      <input name="email" type="email" required placeholder="jane@company.com"/>\
    </div>\
    <div class="leadflow-field">\
      <label>Company</label>\
      <input name="company" placeholder="Acme Inc."/>\
    </div>\
    <div class="leadflow-field">\
      <label>Message</label>\
      <textarea name="message" rows="3" placeholder="Tell us about your project"></textarea>\
    </div>\
    <button class="leadflow-button" type="submit">Send message</button>\
    <div class="leadflow-status" aria-live="polite"></div>';

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var status = form.querySelector('.leadflow-status');
      status.className = 'leadflow-status';
      status.textContent = 'Sending...';
      var payload = {};
      Array.from(form.elements).forEach(function(element){
        if (!element.name) return;
      payload[element.name] = element.value;
    });
    fetch(origin + '/api/leads', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(payload)
      }).then(function(res){
        if (!res.ok) throw new Error('Request failed');
        form.reset();
        status.classList.add('leadflow-success');
        status.textContent = 'Thanks! We will get back to you shortly.';
      }).catch(function(){
        status.classList.add('leadflow-error');
        status.textContent = 'There was an error, please try again.';
      });
    });

    return form;
  }

  function inject(target) {
    var form = createForm();
    target.appendChild(form);
  }

  document.querySelectorAll('[data-leadflow]').forEach(function(node){
    inject(node);
  });
})();`.trim();

export async function GET() {
  return new NextResponse(script, {
    headers: {
      "Content-Type": "application/javascript; charset=utf-8",
      "Cache-Control": "public, max-age=3600"
    }
  });
}
