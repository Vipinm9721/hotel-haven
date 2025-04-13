// pagination.js
import { getCurrentPage, setCurrentPage, fetchAndDisplayHotels } from './displayHotels.js';

export function setupPagination() {
  document.getElementById('prevPage').addEventListener('click', () => {
    const newPage = Math.max(1, getCurrentPage() - 1);
    setCurrentPage(newPage);
  });

  document.getElementById('nextPage').addEventListener('click', () => {
    setCurrentPage(getCurrentPage() + 1);
  });
}






// export function paginate(hotels, currentPage, perPage = 5) {
//     const start = (currentPage - 1) * perPage;
//     const end = start + perPage;
//     return hotels.slice(start, end);
//   }