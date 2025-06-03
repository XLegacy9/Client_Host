window.addEventListener('DOMContentLoaded', function() {
  const params = new URLSearchParams(window.location.search);
  const carFromUrl = params.get('car');
  const carSelect = document.getElementById('carName');
  if (carFromUrl && carSelect) {
    // Try to match ignoring case and spaces
    for (let option of carSelect.options) {
      if (option.value.toLowerCase() === carFromUrl.toLowerCase()) {
        option.selected = true;
        break;
      }
    }
  }
});

const exampleEmail = "raheemsonu9@gmail.com";


// Utility to show/hide error icon
function setInputError(inputId, show) {
  const input = document.getElementById(inputId);
  if (!input) return;
  const wrapper = input.closest('.input-wrapper');
  if (!wrapper) return;

  // Remove existing icon if any
  const oldIcon = wrapper.querySelector('.input-error-icon');
  if (oldIcon) oldIcon.remove();

  if (show) {
    input.classList.add('input-error');
    // Add SVG icon
    const icon = document.createElement('span');
    icon.className = 'input-error-icon';
    icon.innerHTML = `
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="12" fill="#e74c3c"/>
        <rect x="11" y="6" width="2" height="8" rx="1" fill="#fff"/>
        <rect x="11" y="16" width="2" height="2" rx="1" fill="#fff"/>
      </svg>
    `;
    wrapper.appendChild(icon);
  } else {
    input.classList.remove('input-error');
  }
}

// --- CONTACT FORM ---
document.getElementById('contactForm')?.addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('contact-name').value.trim();
  const email = document.getElementById('contact-email').value.trim();
  const message = document.getElementById('contact-message').value.trim();
  const errorDiv = document.getElementById('form-error');
  errorDiv.textContent = "";

  // Reset all errors
  setInputError('contact-name', false);
  setInputError('contact-email', false);
  setInputError('contact-message', false);

  // Validation
  if (!/^[a-zA-Z\s]{2,}$/.test(name)) {
    errorDiv.textContent = "Please enter a valid name (letters and spaces only, at least 2 characters).";
    setInputError('contact-name', true);
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errorDiv.textContent = "Please enter a valid email address.";
    setInputError('contact-email', true);
    return;
  }
  if (message.length < 5) {
    errorDiv.textContent = "Message must contain at least 5 characters.";
    setInputError('contact-message', true);
    return;
  }

  alert("Thank you! Your message has been sent via email.");
  window.location.href = `mailto:${exampleEmail}?subject=${encodeURIComponent("Contact Request")}&body=${encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
  )}`;
});

// --- BOOKING FORM ---
document.getElementById('bookingForm')?.addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('bookingName').value.trim();
  const email = document.getElementById('bookingEmail').value.trim();
  const car = document.getElementById('carName').value.trim();
  const model = document.getElementById('carModel').value.trim();
  const pickup = document.getElementById('pickupDate').value.trim();
  const dropoff = document.getElementById('dropoffDate').value.trim();
  const msg = document.getElementById('bookingMessage').value.trim();
  const errorDiv = document.getElementById('booking-form-error');
  errorDiv.textContent = "";

  // Reset all errors
  setInputError('bookingName', false);
  setInputError('bookingEmail', false);
  setInputError('carName', false);
  setInputError('carModel', false);
  setInputError('pickupDate', false);
  setInputError('dropoffDate', false);
  setInputError('bookingMessage', false);

  // Validation
  if (!/^[a-zA-Z\s]{2,}$/.test(name)) {
    errorDiv.textContent = "Please enter a valid name (letters and spaces only, at least 2 characters).";
    setInputError('bookingName', true);
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errorDiv.textContent = "Please enter a valid email address.";
    setInputError('bookingEmail', true);
    return;
  }
  if (!car) {
    errorDiv.textContent = "Please select a car.";
    setInputError('carName', true);
    return;
  }
  if (!model) {
    errorDiv.textContent = "Please enter the car model.";
    setInputError('carModel', true);
    return;
  }
  if (!pickup) {
    errorDiv.textContent = "Please select a pickup date.";
    setInputError('pickupDate', true);
    return;
  }
  if (!dropoff) {
    errorDiv.textContent = "Please select a drop off date.";
    setInputError('dropoffDate', true);
    return;
  }
  if (pickup > dropoff) {
    errorDiv.textContent = "Drop off date must be after pickup date.";
    setInputError('dropoffDate', true);
    return;
  }
  if (msg.length > 0 && msg.length < 5) {
    errorDiv.textContent = "If you enter a message, it must be at least 5 characters.";
    setInputError('bookingMessage', true);
    return;
  }

  alert("Thank you! Your booking request has been sent via email.");
  window.location.href = `mailto:${exampleEmail}?subject=${encodeURIComponent("Car Booking Request")}&body=${encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\nCar: ${car}\nModel: ${model}\nPickup Date: ${pickup}\nDrop Off Date: ${dropoff}\nMessage: ${msg}`
  )}`;
});

// --- WHATSAPP BUTTON (Contact) ---
document.getElementById('whatsappBtn')?.addEventListener('click', function() {
  const name = document.getElementById('contact-name')?.value.trim() || "";
  const email = document.getElementById('contact-email')?.value.trim() || "";
  const message = document.getElementById('contact-message')?.value.trim() || "";

  const waMessage =
    `Contact Request\n` +
    `Name: ${name}\n` +
    `Email: ${email}\n` +
    `Message: ${message}`;

  const whatsappNumber = '923045278179';
  window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(waMessage)}`, '_blank');
});

// --- WHATSAPP BUTTON (Booking) ---
document.getElementById('whatsappBookingBtn')?.addEventListener('click', function() {
  const name = document.getElementById('bookingName')?.value.trim() || "";
  const email = document.getElementById('bookingEmail')?.value.trim() || "";
  const car = document.getElementById('carName')?.value.trim() || "";
  const model = document.getElementById('carModel')?.value.trim() || "";
  const pickup = document.getElementById('pickupDate')?.value.trim() || "";
  const dropoff = document.getElementById('dropoffDate')?.value.trim() || "";
  const msg = document.getElementById('bookingMessage')?.value.trim() || "";

  const waMessage =
    `Car Booking Request\n` +
    `Name: ${name}\n` +
    `Email: ${email}\n` +
    `Car: ${car}\n` +
    `Model: ${model}\n` +
    `Pickup Date: ${pickup}\n` +
    `Drop Off Date: ${dropoff}\n` +
    `Message: ${msg}`;

  const whatsappNumber = '923045278179';
  window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(waMessage)}`, '_blank');
});

// --- AUTO-FILL CAR NAME FROM URL ---
window.addEventListener('DOMContentLoaded', function() {
  const params = new URLSearchParams(window.location.search);
  const carFromUrl = params.get('car');
  if (carFromUrl && document.getElementById('carName')) {
    document.getElementById('carName').value = carFromUrl;
  }
});