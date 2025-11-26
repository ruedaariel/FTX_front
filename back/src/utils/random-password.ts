export function generateRandomPassword(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const length = 8;
  let password = '';
  // Aseguramos al menos un número, una mayúscula y una minúscula
  password += chars.charAt(Math.floor(Math.random() * 10) + 52); // Número
  password += chars.charAt(Math.floor(Math.random() * 26)); // Minúscula
  password += chars.charAt(Math.floor(Math.random() * 26) + 26); // Mayúscula
  // Rellenamos el resto de la contraseña
  for (let i = 3; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}