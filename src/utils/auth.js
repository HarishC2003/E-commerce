import { DEALERS } from '../data/dealerSeed.js';

export const AUTH_STORAGE_KEY = 'grove_current_user';

/**
 * Retrieves the currently logged-in user from localStorage.
 * Ensures dealerId is always resolved and present for dealer roles.
 * Returns null if not authenticated or if JSON is invalid.
 */
export function getStoredUser() {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;
    const user = JSON.parse(raw);
    if (user && typeof user === 'object') {
      if (user.role === 'dealer' && !user.dealerId) {
        const lowerEmail = (user.email || '').toLowerCase();
        const matched = DEALERS.find(
          (d) => d.email.toLowerCase() === lowerEmail || (d.aliasEmail && d.aliasEmail.toLowerCase() === lowerEmail)
        );
        user.dealerId = matched?.id || (
          (lowerEmail.includes('hub') || lowerEmail.includes('kisan'))
            ? 'DEALER_002'
            : 'DEALER_001'
        );
        try {
          localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
        } catch {}
      }
      return user;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Saves basic user information and dynamic role to localStorage.
 * Preserves dealerId for dealer accounts.
 * Explicitly excludes password to ensure sensitive credentials are never stored.
 */
export function setStoredUser(user) {
  try {
    if (!user) return;
    const { id, name, email, role, dealerId } = user;
    
    // Automatically resolve dealerId if user is a dealer and dealerId is missing
    let resolvedDealerId = dealerId;
    if (!resolvedDealerId && role === 'dealer') {
      const lowerEmail = (email || '').toLowerCase();
      const matched = DEALERS.find(
        (d) => d.email.toLowerCase() === lowerEmail || (d.aliasEmail && d.aliasEmail.toLowerCase() === lowerEmail)
      );
      if (matched?.id) {
        resolvedDealerId = matched.id;
      } else if (lowerEmail.includes('hub') || lowerEmail.includes('kisan')) {
        resolvedDealerId = 'DEALER_002';
      } else {
        resolvedDealerId = 'DEALER_001';
      }
    }

    const sanitizedUser = { id, name, email, role, dealerId: resolvedDealerId };
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(sanitizedUser));
  } catch {
    // Gracefully handle storage quota or privacy mode errors
  }
}

/**
 * Clears the logged-in user session from localStorage.
 */
export function clearStoredUser() {
  try {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  } catch {
    // Ignore storage errors
  }
}

/**
 * Helper to check if a valid user session is active.
 */
export function isAuthenticated() {
  const user = getStoredUser();
  return Boolean(user && user.role);
}

/**
 * Returns the current user's role, or null if unauthenticated.
 */
export function getUserRole() {
  const user = getStoredUser();
  return user?.role || null;
}

/**
 * Returns the currently active dealer ID ('DEALER_001', 'DEALER_002', etc.)
 * Defaults to 'DEALER_001' if unauthenticated or missing.
 */
export function getActiveDealerId() {
  const user = getStoredUser();
  if (user?.dealerId) return user.dealerId;
  if (user?.email) {
    const lowerEmail = user.email.toLowerCase();
    const matched = DEALERS.find(
      (d) => d.email.toLowerCase() === lowerEmail || (d.aliasEmail && d.aliasEmail.toLowerCase() === lowerEmail)
    );
    if (matched?.id) return matched.id;
  }
  if (user?.role === 'dealer') {
    const lowerEmail = (user.email || '').toLowerCase();
    if (lowerEmail.includes('hub') || lowerEmail.includes('kisan')) {
      return 'DEALER_002';
    }
    return 'DEALER_001';
  }
  return 'DEALER_001';
}
