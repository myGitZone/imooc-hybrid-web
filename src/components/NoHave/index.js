import React from 'react';
import styles from './index.scss';

class NoHave extends React.PureComponent {
  render() {
    return (
      <span className={styles['goods-item-name-driect']}>
        缺货
      </span>
    );
  }
}

export default NoHave;
