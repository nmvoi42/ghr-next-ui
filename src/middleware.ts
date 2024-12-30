import { createCsrfMiddleware } from '@edge-csrf/nextjs';

// This CSRF protection scheme follows the Signed Double-Submit Cookie pattern
// Ref: https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html#signed-double-submit-cookie-recommended
const csrfMiddleware = createCsrfMiddleware({
  cookie: {
    secure: true,
  },
});

export const middleware = csrfMiddleware;