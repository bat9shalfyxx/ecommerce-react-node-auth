import { createElement, lazy } from 'react';
import { createHashRouter, type RouteObject } from 'react-router';
import App from './App';
import { ADMIN_ROUTE, GAME_ROUTE } from './utils/consts';

const AdminPage = lazy(() => import('./components/pages/AdminPage/AdminPage'));
const GamePage = lazy(() => import('./components/pages/GamePage/GamePage'));

const authRoutes: RouteObject[] = [
    {
        element: createElement(App),
        children: [
            {
                path: ADMIN_ROUTE,
                element: createElement(AdminPage),
            },
        ],
    },
];

const publicRoutes: RouteObject[] = [
    {
        element: createElement(App),
        children: [
            {
                path: GAME_ROUTE,
                element: createElement(GamePage),
            },
        ],
    },
];

createHashRouter([...publicRoutes, ...authRoutes]);
