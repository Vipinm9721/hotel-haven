import { db } from './firebase-config.js';
import { ref, push, onValue, update, remove } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";
import { fetchHotels } from './crud.js';
import { displayHotels } from './displayHotels.js';

let allHotels = [];
let currentPage = 0;
const pageSize = 5;

const hotelList = document.getElementById("hotelList");
const form = document.getElementById("addHotelForm");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const searchInput = document.getElementById("searchInput");
const ratingFilter = document.getElementById("ratingFilter");
const availabilityFilter = document.getElementById("availabilityFilter");

function renderHotels(hotels) {
  const start = currentPage * pageSize;
  const paginated = hotels.slice(start, start + pageSize);
  hotelList.innerHTML = "";
  paginated.forEach(([id, hotel]) => {
    const div = document.createElement("div");
    div.className = "border p-3 mb-2 bg-white";
    div.innerHTML = `
      <h3 class="text-lg font-bold">${hotel.name}</h3>
      <p>${hotel.location} | Rating: ${hotel.rating} | $${hotel.price}</p>
      <p>Amenities: ${hotel.amenities.join(", ")}</p>
      <p>${hotel.available ? 'Available' : 'Not Available'}</p>
      <button onclick="deleteHotel('${id}')" class="text-red-500">Delete</button>
    `;
    hotelList.appendChild(div);
  });
}

function filterHotels() {
  const query = searchInput.value.toLowerCase();
  const rating = parseFloat(ratingFilter.value);
  const availableOnly = availabilityFilter.checked;
  
  return allHotels.filter(([_, hotel]) => {
    const matchesSearch = hotel.name.toLowerCase().includes(query) || hotel.location.toLowerCase().includes(query);
    const matchesRating = !rating || hotel.rating >= rating;
    const matchesAvailability = !availableOnly || hotel.available;
    return matchesSearch && matchesRating && matchesAvailability;
  });
}

function refreshDisplay() {
  const filtered = filterHotels();
  renderHotels(filtered);
}

window.deleteHotel = (id) => {
  remove(ref(db, `hotels/${id}`));
};

form.addEventListener("submit", e => {
  e.preventDefault();
  const hotel = {
    name: form.name.value,
    location: form.location.value,
    rating: parseFloat(form.rating.value),
    price: parseFloat(form.price.value),
    amenities: form.amenities.value.split(',').map(a => a.trim()),
    available: form.available.checked
  };
  push(ref(db, "hotels"), hotel);
  form.reset();
});

searchInput.addEventListener("input", refreshDisplay);
ratingFilter.addEventListener("change", refreshDisplay);
availabilityFilter.addEventListener("change", refreshDisplay);

prevBtn.onclick = () => {
  if (currentPage > 0) currentPage--;
  refreshDisplay();
};

nextBtn.onclick = () => {
  const maxPage = Math.ceil(filterHotels().length / pageSize) - 1;
  if (currentPage < maxPage) currentPage++;
  refreshDisplay();
};

onValue(ref(db, "hotels"), snapshot => {
  const data = snapshot.val();
  allHotels = Object.entries(data || {});
  refreshDisplay();
});
