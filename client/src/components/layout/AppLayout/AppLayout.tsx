import { type FC, Suspense } from 'react';
import { Outlet } from 'react-router';

import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import styles from './AppLayout.module.scss';

const AppLayout: FC = () => {
    return (
        <div className={styles.app_container}>
            <Header />

            <main className={styles.main_container}>
                <Suspense fallback={<div>Loading...</div>}>
                    <Outlet />
                </Suspense>
            </main>

            <Footer />
        </div>
    );
};

export default AppLayout;
