
// src/auth/token.js
const KEY = 'ftx_token';

export function saveToken(token) {
  if (!token) return;
  sessionStorage.setItem(KEY, token);
}

export function getToken() {
  return sessionStorage.getItem(KEY); // string | null
}


export function clearToken() {
  sessionStorage.removeItem(KEY);
}