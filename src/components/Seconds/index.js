import React from 'react';
import CountDown from './CountDown';
import {filter} from '@/assets/js/utils';
import styles from './index.scss';

class Seconds extends React.PureComponent {
  render() {
    const { dataSource = [] } = this.props;
    return (
      <div className={styles.seconds}>
        <div className={styles['seconds-wrap']}>
          <p className={styles['seconds-wrap-title']}>京东秒杀</p>
          <CountDown endHours={19} />
        </div>
        <div className={styles['seconds-content']}>
          {
            dataSource.map((item)=>{
              return (
                <div className={styles['seconds-content-item']} key={item.id}>
                  <img className={styles['seconds-content-item-icon']} src={item.icon} alt=""/>
                  <p className={styles['seconds-content-item-price']}>￥{filter(item.price)}</p>
                  <p className={styles['seconds-content-item-old-price']}>￥{filter(item.oldPrice)}</p>
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }
}

export default Seconds;
