import styles from './index.scss';

function BasicLayout(props) {
  return (
    <div className={styles.main}>
      {props.children}
    </div>
  );
}

export default BasicLayout;
