// search.js
import { fetchAndDisplayHotels } from './displayHotels.js';

export function setupSearch() {
  const searchInput = document.getElementById('searchInput');

  let debounceTimer;
  searchInput.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      fetchAndDisplayHotels();
    }, 400);
  });
}

  