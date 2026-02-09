# Backend CORS requirements for this frontend

When the app runs in the browser (e.g. `http://localhost:3000` or your production URL), the browser sends an `Origin` header. The backend **must** allow that origin via CORS; otherwise the browser blocks the response and you may see **401 Unauthorized** (even though the same request works in Postman, which does not send `Origin`).

## Required CORS configuration on the backend

- **Allowed origins** (at least):
  - `http://localhost:3000` (local development)
  - Your production frontend URL when deployed (e.g. `https://app.socialmediaplatform.online` or Amplify URL)
- **Allowed methods**: `GET`, `POST`, `PUT`, `DELETE`, `PATCH`, `OPTIONS`
- **Allowed headers**: `Content-Type`, `Authorization`
- **Credentials**: Only if your API uses cookies; this app uses `Authorization: Bearer <token>`.

The backend must also respond correctly to **OPTIONS** (preflight) requests for the above endpoints (e.g. return 200 with the CORS headers, not 401).

## Quick check in the browser

1. Open DevTools → **Network**.
2. Try to log in.
3. Check the request to `https://api.socialmediaplatform.online/auth/login`:
   - If you see an **OPTIONS** request first, then the **POST**: CORS is in play; the backend must allow `Origin: http://localhost:3000` and handle OPTIONS.
   - If the **POST** returns 401 and the response has no `Access-Control-Allow-Origin` header (or it doesn’t match your origin), the fix is to add/update CORS on the backend as above.
