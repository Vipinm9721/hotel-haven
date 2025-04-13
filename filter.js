// filter.js
import { fetchAndDisplayHotels } from './displayHotels.js';

export function setupFilters() {
  document.getElementById('ratingFilter').addEventListener('change', fetchAndDisplayHotels);
  document.getElementById('availabilityFilter').addEventListener('change', fetchAndDisplayHotels);
}




// export function filterHotels(hotels, rating, availability) {
//     return hotels.filter(h => {
//       return (!rating || h.rating >= rating) &&
//              (!availability || h.available);
//     });
//   }
  