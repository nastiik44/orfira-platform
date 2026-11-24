export const isRole = value => value === 'student' || value === 'teacher';
export const sessionKey = 'orfira.demo.role';
export function readRole(storage) {
  try { const role = storage.getItem(sessionKey); return isRole(role) ? role : null; } catch { return null; }
}
export function resolveRoute(hash, role) {
  const requested = hash.replace(/^#/, '');
  if (isRole(role)) return role;
  return requested === 'login' || isRole(requested) ? 'login' : 'landing';
}
