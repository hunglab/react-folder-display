import styles from './NavBar.module.css';

export const NavBar = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.nav}>
          <h3 className={styles.header}>Directory Tree</h3>
        </div>
      </div>
    </>
  );
};