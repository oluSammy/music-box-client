import React from 'react';
import styles from './Header.module.css';
interface Props {}

const Header = (props: Props) => {
  return (
    <div className={styles.Header}>
      <h1>This is a header</h1>
    </div>
  );
};

export default Header;
