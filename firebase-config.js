
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDmbGOP-dLRbpurEhUiN4L2D0uMaE3Zs1o",
  authDomain: "hotel-haven-c3a97.firebaseapp.com",
  projectId: "hotel-haven-c3a97",
  storageBucket: "hotel-haven-c3a97.appspot.com",
  messagingSenderId: "483073490772",
  appId: "1:483073490772:web:91af6bdbaba70bb55492c1"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);