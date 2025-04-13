// crud.js
import { database } from './firebase-config.js';
import { ref, push, set, remove, update } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";
import { fetchAndDisplayHotels } from './displayHotels.js';

export function setupCrud() {
  const form = document.getElementById('hotelForm');
  let editingKey = null;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = form.name.value;
    const location = form.location.value;
    const rating = parseFloat(form.rating.value);
    const price = parseFloat(form.price.value);
    const amenities = form.amenities.value.split(',').map(a => a.trim());
    const available = form.available.checked;

    const hotelData = { name, location, rating, price, amenities, available };

    if (editingKey) {
      await update(ref(database, `hotels/${editingKey}`), hotelData);
      editingKey = null;
    } else {
      const newRef = push(ref(database, 'hotels'));
      await set(newRef, hotelData);
    }

    form.reset();
    fetchAndDisplayHotels();
  });

  window.editHotel = (key, data) => {
    form.name.value = data.name;
    form.location.value = data.location;
    form.rating.value = data.rating;
    form.price.value = data.price;
    form.amenities.value = data.amenities.join(', ');
    form.available.checked = data.available;
    editingKey = key;
  };

  window.deleteHotel = async (key) => {
    await remove(ref(database, `hotels/${key}`));
    fetchAndDisplayHotels();
  };
}














// import { db } from "../firebase-config.js";
// import { ref, push, get, update, remove } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";

// // Create
// export async function addHotel(hotelData) {
//   try {
//     await push(ref(db, "hotels"), hotelData);
//   } catch (error) {
//     console.error("Error adding hotel:", error);
//   }
// }

// // Read
// export async function fetchHotels() {
//   try {
//     const snapshot = await get(ref(db, "hotels"));
//     if (snapshot.exists()) {
//       const data = snapshot.val();
//       return Object.keys(data).map((key) => ({
//         id: key,
//         ...data[key],
//       }));
//     } else {
//       return [];
//     }
//   } catch (error) {
//     console.error("Error fetching hotels:", error);
//     return [];
//   }
// }

// // Update
// export async function updateHotel(id, updatedData) {
//   try {
//     await update(ref(db, `hotels/${id}`), updatedData);
//   } catch (error) {
//     console.error("Error updating hotel:", error);
//   }
// }

// // Delete
// export async function deleteHotel(id) {
//   try {
//     await remove(ref(db, `hotels/${id}`));
//   } catch (error) {
//     console.error("Error deleting hotel:", error);
//   }
// }
