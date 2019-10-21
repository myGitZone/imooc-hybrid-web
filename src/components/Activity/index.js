import React from 'react';
import styles from './index.scss';

class Activity extends React.PureComponent {
  render() {
    const { children } = this.props;
    return (
      <div className={styles.activity}>
        {
          children
        }
      </div>
    );
  }
}

export default Activity;
