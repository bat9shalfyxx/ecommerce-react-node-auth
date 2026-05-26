import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';
import { ADMIN_ROUTES } from '@/utils/routes-consts';

const AdminPage = lazy(() => import('@/components/pages/AdminPage/AdminPage'));

export const adminRoutes: RouteObject[] = [
    {
        path: ADMIN_ROUTES.admin,
        element: <AdminPage />,
    },
];
