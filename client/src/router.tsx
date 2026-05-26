import { lazy } from 'react';
import type { RouteObject } from 'react-router';
import { ADMIN_ROUTES, AUTH_ROUTES, PUBLIC_ROUTES } from './utils/routes-consts';

const AdminPage = lazy(() => import('./components/pages/AdminPage/AdminPage'));
const ProfilePage = lazy(() => import('./components/pages/ProfilePage/ProfilePage'));
const AuthPage = lazy(() => import('./components/pages/AuthPage/AuthPage'));
const GamePage = lazy(() => import('./components/pages/GamePage/GamePage'));
const GalleryPage = lazy(() => import('./components/pages/GalleryPage/GalleryPage'));
const CartPage = lazy(() => import('./components/pages/CartPage/CartPage'));

export const adminRoutes: RouteObject[] = [
    {
        children: [
            {
                path: ADMIN_ROUTES.admin,
                element: <AdminPage />,
            },
        ],
    },
];

export const authRoutes: RouteObject[] = [
    {
        children: [
            {
                path: AUTH_ROUTES.cart,
                element: <CartPage />,
            },
            {
                path: AUTH_ROUTES.profile,
                element: <ProfilePage />,
            },
        ],
    },
];

export const publicRoutes: RouteObject[] = [
    {
        children: [
            {
                path: PUBLIC_ROUTES.login,
                element: <AuthPage />,
            },
            {
                path: PUBLIC_ROUTES.registration,
                element: <AuthPage />,
            },
            {
                path: PUBLIC_ROUTES.gallery,
                element: <GalleryPage />,
            },
            {
                path: PUBLIC_ROUTES.game,
                element: <GamePage />,
            },
        ],
    },
];
