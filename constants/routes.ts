/**
 * An array of all the routes that are public.
 * These routes do not require authentication.
 * @type {string[]}
 */
export const PUBLIC_ROUTES: string[] = [];

/**
 * An array of all the routes that are related to authentication. These routes will redirect to the login page or the dashboard depending on the user's login status.
 * @type {string[]}
 */
export const AUTH_ROUTES = ['/auth/login', '/auth/register'];

/**
 * The prefix for all the API routes that are related to authentication.
 * @type {string}
 */
export const API_AUTH_PREFIX = '/api/auth';

/**
 * If the user is logged in, they will be redirected to '/dashboard'.
 * @type {string}
 */
export const DEFAULT_LOGGED_IN_REDIRECT = '/dashboard';

/**
 * If the user is logged out, they will be redirected to '/auth/login'.
 * @type {string}
 */
export const DEFAULT_LOGGED_OUT_REDIRECT = '/auth/login';
