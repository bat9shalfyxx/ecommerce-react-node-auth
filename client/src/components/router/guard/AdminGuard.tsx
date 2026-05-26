import type { FC } from 'react';
import { Navigate, Outlet } from 'react-router';
import { PUBLIC_ROUTES } from '@/utils/routes-consts';

interface AdminGuardProps {
    isAuth: boolean;
    isAdmin: boolean;
}

const AdminGuard: FC<AdminGuardProps> = ({ isAuth, isAdmin }) => {
    if (!isAuth) {
        return <Navigate to={PUBLIC_ROUTES.login} replace />;
    }

    if (!isAdmin) {
        return <Navigate to={PUBLIC_ROUTES.gallery} replace />;
    }

    return <Outlet />;
};

export default AdminGuard;
