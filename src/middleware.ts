import { createCsrfMiddleware } from '@edge-csrf/nextjs';

import type { NextRequest } from "next/server";

// This CSRF protection scheme follows the Signed Double-Submit Cookie pattern
// Ref: https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html#signed-double-submit-cookie-recommended
const csrfMiddleware = createCsrfMiddleware({
  cookie: {
    secure: true,
  },
});

export function middleware(request: NextRequest) {
  // Enforce CSRF requirements for production environment.
  if ( process.env.NODE_ENV !== 'development' && process.env.NODE_ENV !== 'test' ) {
    return csrfMiddleware(request);
  }
}