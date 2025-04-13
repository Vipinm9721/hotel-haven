

import { db } from "../firebase-config.js";
import { ref, push, get, update, remove } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";

// Create
export async function addHotel(hotelData) {
  try {
    await push(ref(db, "hotels"), hotelData);
  } catch (error) {
    console.error("Error adding hotel:", error);
  }
}

// Read
export async function fetchHotels() {
  try {
    const snapshot = await get(ref(db, "hotels"));
    if (snapshot.exists()) {
      const data = snapshot.val();
      return Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching hotels:", error);
    return [];
  }
}

// Update
export async function updateHotel(id, updatedData) {
  try {
    await update(ref(db, `hotels/${id}`), updatedData);
  } catch (error) {
    console.error("Error updating hotel:", error);
  }
}

// Delete
export async function deleteHotel(id) {
  try {
    await remove(ref(db, `hotels/${id}`));
  } catch (error) {
    console.error("Error deleting hotel:", error);
  }
}