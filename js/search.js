// Car data (all cars searchable)
const cars = [
  {
    name: "Toyota Prado",
    model: "2025",
    type: "SUV",
    brand: "Toyota",
    image: "https://nextgen-images.cdn.dealersolutions.com.au/modular.multisite.dealer.solutions/wp-content/uploads/sites/1576/2020/03/06092755/Prado_Horizon_Special-3-1200x675.jpg?format=webp&width=1200",
    description: "A luxury SUV perfect for off-road adventures and executive travel, offering comfort and power.",
    features: [
      "Mileage: 10 km/l",
      "Horsepower: 271 HP",
      "Fuel: Petrol/Diesel",
      "Transmission: Automatic",
      "Seating: 7",
      "Features: 4x4, Leather Seats, Sunroof"
    ]
  },
  {
    name: "Toyota Hilux Vigo Dala",
    model: "2024",
    type: "Pickup",
    brand: "Toyota",
    image: "https://rentacarinlahore.pk/wp-content/uploads/2018/07/Toyota-HiLux-Rogue-2020-5.jpg",
    description: "A robust double cabin pickup, ideal for utility, business, and group travel with off-road capability.",
    features: [
      "Mileage: 11 km/l",
      "Horsepower: 201 HP",
      "Fuel: Diesel",
      "Transmission: Manual/Automatic",
      "Seating: 5",
      "Features: 4x4, Large Cargo Bed"
    ]
  },
  {
    name: "Toyota Fortuner",
    model: "2023",
    type: "SUV",
    brand: "Toyota",
    image: "https://img-ik.cars.co.za/news-site-za/images/2023/03/PC3A9737.jpg",
    description: "A premium SUV with advanced safety features and a comfortable ride for families and executives.",
    features: [
      "Mileage: 9 km/l",
      "Horsepower: 201 HP",
      "Fuel: Petrol/Diesel",
      "Transmission: Automatic",
      "Seating: 7",
      "Features: 4x4, Touchscreen, Leather Seats"
    ]
  },
  {
    name: "KIA Sportage",
    model: "2024",
    type: "SUV",
    brand: "KIA",
    image: "https://pkrevenue.com/wp-content/uploads/2023/11/Sportage-White-Limited-Edition.webp",
    description: "A stylish and modern SUV with advanced technology and great fuel efficiency.",
    features: [
      "Mileage: 12 km/l",
      "Horsepower: 155 HP",
      "Fuel: Petrol",
      "Transmission: Automatic",
      "Seating: 5",
      "Features: Panoramic Sunroof, Smart Infotainment"
    ]
  },
  {
    name: "Honda BR-V",
    model: "2023",
    type: "Crossover",
    brand: "Honda",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/2022_Honda_BR-V_Prestige_with_Honda_Sensing_1.5_DG3_%2820220429%29.jpg/960px-2022_Honda_BR-V_Prestige_with_Honda_Sensing_1.5_DG3_%2820220429%29.jpg",
    description: "A versatile crossover with spacious seating and excellent fuel economy.",
    features: [
      "Mileage: 15 km/l",
      "Horsepower: 119 HP",
      "Fuel: Petrol",
      "Transmission: CVT",
      "Seating: 7",
      "Features: Flexible Seating, Rear AC"
    ]
  },
  {
    name: "Toyota Corolla",
    model: "2022",
    type: "Sedan",
    brand: "Toyota",
    image: "https://www.toyota-central.com/Assets/images/Vehicle/CorollaX/Exterior4.jpg",
    description: "A reliable sedan known for its comfort, efficiency, and smooth drive.",
    features: [
      "Mileage: 14 km/l",
      "Horsepower: 132 HP",
      "Fuel: Petrol",
      "Transmission: Manual/Automatic",
      "Seating: 5",
      "Features: ABS, Airbags, Touchscreen"
    ]
  },
  {
    name: "Honda Civic",
    model: "2022",
    type: "Sedan",
    brand: "Honda",
    image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/27074/civic-exterior-left-rear-three-quarter.jpeg?q=80",
    description: "A sporty sedan with a premium interior and advanced safety features.",
    features: [
      "Mileage: 13 km/l",
      "Horsepower: 173 HP",
      "Fuel: Petrol",
      "Transmission: CVT",
      "Seating: 5",
      "Features: Turbo Engine, Sunroof"
    ]
  },
  {
    name: "Suzuki Alto",
    model: "2022",
    type: "Hatchback",
    brand: "Suzuki",
    image: "https://i.brecorder.com/primary/2025/02/24175255a66bd9c.jpg",
    description: "A compact and economical hatchback, perfect for city driving and easy parking.",
    features: [
      "Mileage: 20 km/l",
      "Horsepower: 39 HP",
      "Fuel: Petrol",
      "Transmission: Manual/Automatic",
      "Seating: 4",
      "Features: Air Conditioning, Power Steering"
    ]
  }
];

// DOM elements
const searchInput = document.getElementById('searchInput');
const suggestionsDiv = document.getElementById('suggestions');
const resultsDiv = document.getElementById('search-results');

// Helper: filter cars by query
function filterCars(query) {
  query = query.trim().toLowerCase();
  if (!query) return cars;
  return cars.filter(car =>
    car.name.toLowerCase().includes(query) ||
    car.model.toLowerCase().includes(query) ||
    car.type.toLowerCase().includes(query) ||
    car.brand.toLowerCase().includes(query) ||
    car.features.some(f => f.toLowerCase().includes(query))
  );
}

// Helper: get suggestions (top 5)
function getSuggestions(query) {
  query = query.trim().toLowerCase();
  if (!query) return [];
  return cars
    .filter(car =>
      car.name.toLowerCase().includes(query) ||
      car.model.toLowerCase().includes(query) ||
      car.type.toLowerCase().includes(query) ||
      car.brand.toLowerCase().includes(query)
    )
    .slice(0, 5);
}

// Render suggestions
function renderSuggestions(suggestions) {
  suggestionsDiv.innerHTML = '';
  if (suggestions.length === 0) {
    suggestionsDiv.style.display = 'none';
    return;
  }
  suggestions.forEach(car => {
    const item = document.createElement('button');
    item.type = 'button';
    item.className = 'list-group-item list-group-item-action';
    item.textContent = car.name;
    item.onclick = () => {
      searchInput.value = car.name;
      suggestionsDiv.innerHTML = '';
      suggestionsDiv.style.display = 'none';
      renderResults(filterCars(car.name));
    };
    suggestionsDiv.appendChild(item);
  });
  suggestionsDiv.style.display = 'block';
}

// Render search results
function renderResults(results) {
  resultsDiv.innerHTML = '';
  if (results.length === 0) {
    resultsDiv.innerHTML = '<div class="col-12"><div class="alert alert-warning">No vehicles found matching your search.</div></div>';
    return;
  }
  results.forEach(car => {
    const card = document.createElement('div');
    card.className = 'col-12 col-sm-6 col-lg-4';
    card.innerHTML = `
      <div class="card h-100 shadow">
        <img src="${car.image}" class="card-img-top" alt="${car.name}" style="height:250px;object-fit:cover;">
        <div class="card-body">
          <h5 class="card-title">${car.name}</h5>
          <p class="card-text">${car.description}</p>
          <a href="booking.html?car=${encodeURIComponent(car.name)}" class="btn btn-primary btn-shiny mb-2"><i class="bi bi-calendar-check"></i> Book Now</a>
          <div class="mt-2 p-2 bg-light border rounded">
            <strong>Details:</strong>
            <ul class="list-unstyled mb-0">
              ${car.features.map(f => `<li>• ${f}</li>`).join('')}
            </ul>
          </div>
        </div>
      </div>
    `;
    resultsDiv.appendChild(card);
  });
}


// Event listeners
searchInput.addEventListener('input', function() {
  const query = searchInput.value;
  renderSuggestions(getSuggestions(query));
  renderResults(filterCars(query));
});

// Hide suggestions on blur (with delay for click)
searchInput.addEventListener('blur', () => setTimeout(() => suggestionsDiv.style.display = 'none', 200));

// Initial render (show all cars)
renderResults(cars);