import { createHashRouter, Navigate, type RouteObject } from 'react-router';
import { PUBLIC_ROUTES } from '@/utils/routes-consts';

import AppLayout from '../layout/AppLayout/AppLayout';
import AdminGuard from './guard/AdminGuard';
import AuthGuard from './guard/AuthGuard';

import { adminRoutes } from './routes/adminRoutes';
import { authRoutes } from './routes/authRoutes';
import { publicRoutes } from './routes/publicRoutes';

export const createAppRouter = (isAuth: boolean, isAdmin: boolean) => {
    const routes: RouteObject[] = [
        {
            path: '/',
            element: <AppLayout />,
            children: [
                { index: true, element: <Navigate to={PUBLIC_ROUTES.gallery} replace /> },

                ...publicRoutes,

                {
                    element: <AuthGuard isAuth={isAuth} />,
                    children: [...authRoutes],
                },

                {
                    element: <AdminGuard isAuth={isAuth} isAdmin={isAdmin} />,
                    children: [...adminRoutes],
                },

                {
                    path: '*',
                    element: <div className="not-found">404 | Page not found</div>,
                },
            ],
        },
    ];

    return createHashRouter(routes);
};
