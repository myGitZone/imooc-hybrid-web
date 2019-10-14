import React from 'react';
import {Swiper, Slide} from '@/components/Swiper'
import styles from './index.less';

class Home extends React.PureComponent {
  render() {
    return (
      <div className={styles.wrapper}>
        <Swiper />
      </div>
    );
  }
}

export default Home;
