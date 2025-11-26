/ src/auth/http.js
import { getToken } from './token';

export async function authFetch(url, options = {}) {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };
  if (token) {
    headers['Authorization'] = Bearer ${token};
  }
  const res = await fetch(url, { ...options, headers });
  // manejo básico de 401
  if (res.status === 401) {
    // aquí podés forzar logout o manejar refresh
    throw new Error('Unauthorized');
  }
  return res;
}
