import React from 'react';
import styles from './index.scss';

const DATASOURCE = [
  {
    id: 1,
    icon: require('@/assets/images/jingDongChaoShi.png'),
    title: '京东超市'
  },{
    id: 2,
    icon: require('@/assets/images/jingDongFuShi.png'),
    title: '京东服饰'
  },{
    id: 3,
    icon: require('@/assets/images/jingDongChaoShi.png'),
    title: '京东超市'
  },{
    id: 4,
    icon: require('@/assets/images/jingDongShengXian.png'),
    title: '京东生鲜'
  },{
    id: 5,
    icon: require('@/assets/images/jingDongDaoJia.png'),
    title: '京东到家'
  },{
    id: 6,
    icon: require('@/assets/images/chongZhiJiaoFei.png'),
    title: '充值缴费'
  },{
    id: 7,
    icon: require('@/assets/images/jingDongPinGou.png'),
    title: '9.9元拼'
  },{
    id: 8,
    icon: require('@/assets/images/lingJuan.png'),
    title: '领券'
  },{
    id: 9,
    icon: require('@/assets/images/zhuanQian.png'),
    title: '赚钱'
  },{
    id: 10,
    icon: require('@/assets/images/quanBu.png'),
    title: '全部'
  }
]

class ModeOptions extends React.PureComponent {
  render() {
    return (
      <div className={styles['mode-options']}>

          {
            DATASOURCE.map((item)=>{
             return (
               <div className={styles['mode-options-item']} key={item.id}>
                 <img className={styles['mode-options-item-icon']} src={item.icon} alt=""/>
                 <p className={styles['mode-options-item-title']}>{item.title}</p>
               </div>
             )
            })
          }

      </div>
    );
  }
}

export default ModeOptions;
