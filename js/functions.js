// Book Now button: Pass car name to booking.html
document.querySelectorAll('.book-now-btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    e.preventDefault();
    // Find the car name from the card title (remove icon if present)
    const card = btn.closest('.card');
    let carTitle = card.querySelector('.card-title').textContent.trim();
    // Remove icon text if present
    carTitle = carTitle.replace(/^[^\w]*\s*/, '');
    // Redirect with car name as URL param
    window.location.href = `booking.html?car=${encodeURIComponent(carTitle)}`;
  });
});

// Expand car image on click
document.querySelectorAll('.card-img-top').forEach(img => {
  img.style.cursor = 'pointer';
  img.addEventListener('click', function() {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.background = 'rgba(0,0,0,0.8)';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.zIndex = 9999;

    // Large image
    const largeImg = document.createElement('img');
    largeImg.src = img.src;
    largeImg.alt = img.alt;
    largeImg.style.maxWidth = '90vw';
    largeImg.style.maxHeight = '80vh';
    largeImg.style.borderRadius = '10px';
    largeImg.style.boxShadow = '0 0 20px #000';

    // Close button
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '&times;';
    closeBtn.style.position = 'absolute';
    closeBtn.style.top = '30px';
    closeBtn.style.right = '40px';
    closeBtn.style.fontSize = '2.5rem';
    closeBtn.style.color = '#fff';
    closeBtn.style.background = 'transparent';
    closeBtn.style.border = 'none';
    closeBtn.style.cursor = 'pointer';
    closeBtn.style.zIndex = 10000;

    closeBtn.onclick = () => document.body.removeChild(overlay);
    overlay.onclick = (e) => { if (e.target === overlay) document.body.removeChild(overlay); };

    overlay.appendChild(largeImg);
    overlay.appendChild(closeBtn);
    document.body.appendChild(overlay);
  });
});

// Autofill car name from URL param
window.addEventListener('DOMContentLoaded', function() {
  const params = new URLSearchParams(window.location.search);
  const car = params.get('car');
  if (car) {
    const carSelect = document.getElementById('carName');
    for (let option of carSelect.options) {
      if (option.value === car) {
        option.selected = true;
        break;
      }
    }
  }
});