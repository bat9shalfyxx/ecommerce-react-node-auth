import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';
import { PUBLIC_ROUTES } from '@/utils/routes-consts';

const AuthPage = lazy(() => import('@/components/pages/AuthPage/AuthPage'));
const GamePage = lazy(() => import('@/components/pages/GamePage/GamePage'));
const GalleryPage = lazy(() => import('@/components/pages/GalleryPage/GalleryPage'));

export const publicRoutes: RouteObject[] = [
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
];
