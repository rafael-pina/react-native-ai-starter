export const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN || "";
export const AUTH0_CLIENT_ID = process.env.AUTH0_CLIENT_ID || "";
export const AUTH0_DEFAULT_SCOPE =
  "openid profile email read:current_user update:current_user_metadata";
export const AUTH0_API_BASE = `https://${AUTH0_DOMAIN}`;
export const AUTH0_MANAGEMENT_AUDIENCE = `https://${AUTH0_DOMAIN}/api/v2/`;
