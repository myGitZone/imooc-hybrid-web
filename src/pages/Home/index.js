import React from 'react';
import { connect } from 'dva';
import { Swiper, Slide } from '@/components/Swiper';
import Activity from '@/components/Activity';
import Seconds from '@/components/Seconds';
import ModeOptions from '@/components/ModeOptions';
import Goods from '@/components/Goods';
import pingoujie from '@/assets/images/haoHuoQiang.gif';
import styles from './index.scss';

// const swiperData = [1, 2, 3, 4, 5, 6, 7, 8].map((i) => {
//   return {
//     id: i,
//     icon: require(`@/assets/images/swiper-${i}.jpg`)
//   }
// });

const swiperHeight = '184px';

@connect(({ home }) => ({
  swiperData: home.swiperData,
  activityData: home.activityData,
  secondsData: home.secondsData,
  goodsData: home.goodsData
}))
class Home extends React.PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'home/initSwiperDate',
    });
    dispatch({
      type: 'home/activitys',
    });
    dispatch({
      type: 'home/seconds',
    });
    dispatch({
      type: 'home/goods',
    });
  }

  render() {
    const {
      swiperData, activityData, secondsData, goodsData
    } = this.props;
    return (
      <div className={styles.home}>
        <div className={styles['home-content']}>
          <div className="swiper-content">
            {
              Array.isArray(swiperData) && swiperData.length > 0 ? (
                <Swiper showPagination>
                  {
                    swiperData.map((item) => {
                      return (
                        <Slide key={item.id}>
                          <img className={styles['slider-img']} src={item.icon} alt="" height={swiperHeight}/>
                        </Slide>
                      );
                    })
                  }
                </Swiper>
              ) : null
            }
          </div>
          <Activity>
            <div className={styles['activity-520']}>
              {
                activityData.map((item) => {
                  return <img src={item.icon} key={item.id} alt=""/>
                })
              }
            </div>
          </Activity>
          <ModeOptions />
          <Seconds dataSource={secondsData} />
          <Activity>
            <div className={styles['activity-pin-gou-jie']}>
              <img src={pingoujie} alt=""/>
            </div>
          </Activity>
          <Goods dataSource={goodsData} />
        </div>
      </div>
    );
  }
}

export default Home;
