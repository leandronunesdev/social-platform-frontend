const TOKEN_KEY = "auth_token";

export function saveToken(token: string): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(TOKEN_KEY, token);
  }
}

export function getToken(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem(TOKEN_KEY);
  }
  return null;
}

export function removeToken(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(TOKEN_KEY);
  }
}

export function hasToken(): boolean {
  return getToken() !== null;
}

/**
 * Decodes JWT token and checks if it's expired
 * Returns true if token is valid and not expired
 */
export function isTokenValid(): boolean {
  const token = getToken();
  if (!token) return false;

  try {
    // JWT structure: header.payload.signature
    const payload = token.split(".")[1];
    if (!payload) return false;

    // Decode base64 payload
    const decoded = JSON.parse(atob(payload));

    // Check expiration (exp is in seconds, Date.now() is in milliseconds)
    if (decoded.exp && decoded.exp * 1000 < Date.now()) {
      removeToken(); // Remove expired token
      return false;
    }

    return true;
  } catch (error) {
    // Invalid token format
    removeToken();
    return false;
  }
}
