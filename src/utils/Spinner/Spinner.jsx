import styles from './Spinner.module.css';

const Spinner = () => {
  
  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.spinnerOuter}>
        <div style={{opacity:1}} className={styles.spinner}></div>
      </div>
    </div>
  );
};

export default Spinner;
