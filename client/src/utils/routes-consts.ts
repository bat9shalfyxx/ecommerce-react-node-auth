const ADMIN_ROUTE = '/admin';
const LOGIN_ROUTE = '/login';
const REGISTRATION_ROUTE = '/registration';
const GALLERY_ROUTE = '/gallery';
const GAME_ROUTE = '/game/:id';
const CART_ROUTE = '/cart';
const PROFILE_ROUTE = '/profile';

export const ADMIN_ROUTES = {
    admin: ADMIN_ROUTE,
} as const;

export const AUTH_ROUTES = {
    cart: CART_ROUTE,
    profile: PROFILE_ROUTE,
} as const;

export const PUBLIC_ROUTES = {
    gallery: GALLERY_ROUTE,
    game: GAME_ROUTE,
    login: LOGIN_ROUTE,
    registration: REGISTRATION_ROUTE,
} as const;
