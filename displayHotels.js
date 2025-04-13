// displayHotels.js
import { database } from './firebase-config.js';
import { ref, get } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";

let currentPage = 1;
const hotelsPerPage = 5;

export async function fetchAndDisplayHotels() {
  const res = await get(ref(database, 'hotels'));
  const data = res.val() || {};
  const hotels = Object.entries(data).map(([key, value]) => ({ id: key, ...value }));

  const start = (currentPage - 1) * hotelsPerPage;
  const paginated = hotels.slice(start, start + hotelsPerPage);

  const container = document.getElementById('hotelList');
  container.innerHTML = '';

  paginated.forEach(hotel => {
    const div = document.createElement('div');
    div.className = 'p-4 border rounded shadow';
    div.innerHTML = `
      <h2 class="text-xl font-bold">${hotel.name}</h2>
      <p>${hotel.location} | Rating: ${hotel.rating} | $${hotel.price}</p>
      <p>Amenities: ${hotel.amenities.join(', ')}</p>
      <p>${hotel.available ? 'Available' : 'Not Available'}</p>
      <button onclick="editHotel('${hotel.id}', ${JSON.stringify(hotel).replace(/"/g, '&quot;')})" class="bg-yellow-400 px-3 py-1 rounded mr-2">Edit</button>
      <button onclick="deleteHotel('${hotel.id}')" class="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
    `;
    container.appendChild(div);
  });
}

export function setCurrentPage(page) {
  currentPage = page;
  fetchAndDisplayHotels();
}

export function getCurrentPage() {
  return currentPage;
}

export function getHotelsPerPage() {
  return hotelsPerPage;
}



















// import { updateHotel, deleteHotel } from "./crud.js";

// export function displayHotels(hotels, container) {
//   container.innerHTML = ""; // Clear old data

//   hotels.forEach((hotel) => {
//     const card = document.createElement("div");
//     card.className = "bg-white rounded-xl shadow p-4 mb-4";

//     card.innerHTML = `
//       <h3 class="text-xl font-semibold">${hotel.name}</h3>
//       <p><strong>Location:</strong> ${hotel.location}</p>
//       <p><strong>Rating:</strong> ${hotel.rating}</p>
//       <p><strong>Price:</strong> ₹${hotel.price}</p>
//       <p><strong>Amenities:</strong> ${hotel.amenities}</p>
//       <p><strong>Available:</strong> ${hotel.available ? "Yes" : "No"}</p>
//     `;

//     const btnContainer = document.createElement("div");
//     btnContainer.className = "mt-2 flex gap-2";

//     const editBtn = document.createElement("button");
//     editBtn.textContent = "Edit";
//     editBtn.className = "bg-yellow-500 text-white px-3 py-1 rounded";
//     editBtn.onclick = () => {
//       const newName = prompt("New Hotel Name:", hotel.name);
//       const newLocation = prompt("New Location:", hotel.location);
//       const newRating = prompt("New Rating (1-5):", hotel.rating);
//       const newPrice = prompt("New Price:", hotel.price);
//       const newAmenities = prompt("New Amenities:", hotel.amenities);
//       const isAvailable = confirm("Is it available? OK = Yes, Cancel = No");

//       updateHotel(hotel.id, {
//         name: newName,
//         location: newLocation,
//         rating: Number(newRating),
//         price: Number(newPrice),
//         amenities: newAmenities,
//         available: isAvailable,
//       });
//     };

//     const deleteBtn = document.createElement("button");
//     deleteBtn.textContent = "Delete";
//     deleteBtn.className = "bg-red-600 text-white px-3 py-1 rounded";
//     deleteBtn.onclick = () => {
//       if (confirm("Are you sure to delete this hotel?")) {
//         deleteHotel(hotel.id);
//       }
//     };

//     btnContainer.appendChild(editBtn);
//     btnContainer.appendChild(deleteBtn);
//     card.appendChild(btnContainer);

//     container.appendChild(card);
//   });
// }
