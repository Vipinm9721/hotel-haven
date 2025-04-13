
import { updateHotel, deleteHotel } from "./crud.js";

export function displayHotels(hotels, container) {
  container.innerHTML = ""; // Clear old data

  hotels.forEach((hotel) => {
    const card = document.createElement("div");
    card.className = "bg-white rounded-xl shadow p-4 mb-4";

    card.innerHTML = `
      <h3 class="text-xl font-semibold">${hotel.name}</h3>
      <p><strong>Location:</strong> ${hotel.location}</p>
      <p><strong>Rating:</strong> ${hotel.rating}</p>
      <p><strong>Price:</strong> ₹${hotel.price}</p>
      <p><strong>Amenities:</strong> ${hotel.amenities}</p>
      <p><strong>Available:</strong> ${hotel.available ? "Yes" : "No"}</p>
    `;

    const btnContainer = document.createElement("div");
    btnContainer.className = "mt-2 flex gap-2";

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.className = "bg-yellow-500 text-white px-3 py-1 rounded";
    editBtn.onclick = () => {
      const newName = prompt("New Hotel Name:", hotel.name);
      const newLocation = prompt("New Location:", hotel.location);
      const newRating = prompt("New Rating (1-5):", hotel.rating);
      const newPrice = prompt("New Price:", hotel.price);
      const newAmenities = prompt("New Amenities:", hotel.amenities);
      const isAvailable = confirm("Is it available? OK = Yes, Cancel = No");

      updateHotel(hotel.id, {
        name: newName,
        location: newLocation,
        rating: Number(newRating),
        price: Number(newPrice),
        amenities: newAmenities,
        available: isAvailable,
      });
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "bg-red-600 text-white px-3 py-1 rounded";
    deleteBtn.onclick = () => {
      if (confirm("Are you sure to delete this hotel?")) {
        deleteHotel(hotel.id);
      }
    };

    btnContainer.appendChild(editBtn);
    btnContainer.appendChild(deleteBtn);
    card.appendChild(btnContainer);

    container.appendChild(card);
  });
}