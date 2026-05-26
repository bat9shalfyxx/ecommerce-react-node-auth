import type { FC } from 'react';
import { Navigate, Outlet } from 'react-router';
import { PUBLIC_ROUTES } from '@/utils/routes-consts';

interface AuthGuardProps {
    isAuth: boolean;
}

const AuthGuard: FC<AuthGuardProps> = ({ isAuth }) => {
    if (!isAuth) {
        return <Navigate to={PUBLIC_ROUTES.login} replace />;
    }

    return <Outlet />;
};

export default AuthGuard;
