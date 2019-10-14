import styles from './index.less';

function BasicLayout(props) {
  return (
    <div className={styles.main}>
      {props.children}
    </div>
  );
}

export default BasicLayout;