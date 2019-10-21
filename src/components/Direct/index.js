import React from 'react';
import styles from './index.scss';

class Direct extends React.PureComponent {
  render() {
    return (
      <span className={styles['goods-item-name-driect']}>
        直营
      </span>
    );
  }
}

export default Direct;
