// app/lib/authStore.js

export const users = [];

export function inscription(email, password) {
  const exists = users.find((u) => u.email === email);
  if (exists) throw new Error("Cet utilisateur existe déjà.");
  users.push({ email, password });
  return true;
}

export function connexion(email, password) {
  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) throw new Error("Email ou mot de passe incorrect.");
  return true;
}
