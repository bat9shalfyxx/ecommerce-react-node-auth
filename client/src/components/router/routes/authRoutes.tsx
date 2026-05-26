import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';
import { AUTH_ROUTES } from '@/utils/routes-consts';

const CartPage = lazy(() => import('@/components/pages/CartPage/CartPage'));
const ProfilePage = lazy(() => import('@/components/pages/ProfilePage/ProfilePage'));

export const authRoutes: RouteObject[] = [
    {
        path: AUTH_ROUTES.cart,
        element: <CartPage />,
    },
    {
        path: AUTH_ROUTES.profile,
        element: <ProfilePage />,
    },
];
