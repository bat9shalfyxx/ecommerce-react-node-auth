import { type FC, memo } from 'react';

import styles from './Footer.module.scss';

const Footer: FC = () => {
    return (
        <footer className={styles.footer}>
            <h3>footer</h3>
        </footer>
    );
};

export default memo(Footer);
