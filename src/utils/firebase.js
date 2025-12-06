// src/utils/firebase.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Konfigurasi Firebase kamu
const firebaseConfig = {
  apiKey: "AIzaSyBeFkS5DXFOWDOqiZW_azgsU3aXHTsJg84",
  authDomain: "cineverse-42d53.firebaseapp.com",
  projectId: "cineverse-42d53",
  storageBucket: "cineverse-42d53.firebasestorage.app",
  messagingSenderId: "1071097994514",
  appId: "1:1071097994514:web:e5268a09426eadae09e7cb",
  measurementId: "G-8FXPSP1RF9"
};

// Logika Inisialisasi:
// Cek dulu apakah aplikasi sudah pernah dibuat (getApps).
// Jika sudah ada, pakai yang ada (getApp).
// Jika belum, baru buat baru (initializeApp).
// Ini penting supaya Next.js tidak error saat refresh.

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Kita export 'auth' supaya bisa dipakai di AuthContext
export const auth = getAuth(app);