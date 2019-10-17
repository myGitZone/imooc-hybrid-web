import React from 'react';
import { connect } from 'dva';
import { Swiper, Slide } from '@/components/Swiper';
import styles from './index.less';

// const swiperData = [1, 2, 3, 4, 5, 6, 7, 8].map((i) => {
//   return {
//     id: i,
//     icon: require(`@/assets/images/swiper-${i}.jpg`)
//   }
// });

const swiperHeight = '184px';

@connect(({ home }) => ({
  swiperData: home.swiperData,
}))
class Home extends React.PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'home/initSwiperDate',
    });
  }

  render() {
    const { swiperData } = this.props;
    console.log(swiperData);
    debugger
    return (
      <div className={styles.wrapper}>
        <div className="swiper-content">
          {
            Array.isArray(swiperData) && swiperData.length > 0 ? (
              <Swiper showPagination>
                {
                  swiperData.map((item) => {
                    return (
                      <Slide key={item.id}>
                        <img src={item.icon} alt="" height={swiperHeight}/>
                      </Slide>
                    );
                  })
                }
              </Swiper>
            ) : null
          }
        </div>
      </div>
    );
  }
}

export default Home;
