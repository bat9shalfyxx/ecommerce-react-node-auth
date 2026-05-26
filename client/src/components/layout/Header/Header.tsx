import type { FC } from 'react';

import styles from './Header.module.scss';

const Header: FC = () => {
    return (
        <header className={styles.header}>
            <h3>header</h3>
        </header>
    );
};

export default Header;
