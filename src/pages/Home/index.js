import React from 'react';
import { connect } from 'dva';
import { Swiper, Slide } from '@/components/Swiper';
import Search from '@/components/Search';
import NavigationBar from '@/components/NavigationBar';
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
// 锚点值
const ANCHOR_SCROLL_TOP = 160;
// navBarde 样式，包含页面未开始滑动的样式，和页面滑动到锚点之后的样式
const navBarSoltStyle = {
  // 默认样式
  normal: {
    leftIcon: require('@/assets/images/more-white.svg'),
    search: {
      bgColor: '#fff',
      hintColor: '#999',
      icon: require('@/assets/images/search.svg'),
    },
    rightIcon: require('@/assets/images/message-white.svg'),
  },
  // 高亮样式
  hightlight: {
    leftIcon: require('@/assets/images/more.svg'),
    search: {
      bgColor: '#d7d7d7',
      hintColor: '#fff',
      icon: require('@/assets/images/search-white.svg'),
    },
    rightIcon: require('@/assets/images/message.svg'),
  },
};

@connect(({ home }) => ({
  swiperData: home.swiperData,
  activityData: home.activityData,
  secondsData: home.secondsData,
  goodsData: home.goodsData,
}))
class Home extends React.PureComponent {
  state = {
    // navBar当前使用的样式
    navBarCurrentSoltStyle: navBarSoltStyle.normal,
    // nav的定制样式
    naBarStyle: {
      position: 'fixed',
      backgroundColor: '',
    },
    // 记录页面滚动值
    scrollTopValue: -1,
  };

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

  /**
   * 监听页面滚动
   * 1、获取滚动距离
   * 2、计算navbar背景颜色（背景透明度）  滚动距离 / 锚点值 = 透明度
   * 3、当透明度大于1，则为1
   */
  handleScrollChange = (e) => {
    const scrollTopValue = e.target.scrollTop;
    const opacity = Math.min(scrollTopValue / ANCHOR_SCROLL_TOP, 1);
    this.setState((preSate)=>{
      return {
        naBarStyle: {
          ...preSate.naBarStyle,
          backgroundColor: `rgba(255, 255, 255, ${opacity})`,
        },
        scrollTopValue: scrollTopValue,
        navBarCurrentSoltStyle: opacity >= 0.7 ? navBarSoltStyle.hightlight : navBarSoltStyle.normal
      }
    })
  }

  render() {
    const {
      swiperData, activityData, secondsData, goodsData,
    } = this.props;
    const {navBarCurrentSoltStyle, naBarStyle} = this.state;
    return (
      <div className={styles.home} onScroll={this.handleScrollChange}>
        <NavigationBar
          navBarStyle={naBarStyle}
          isShowBack={false}
          navLeft={<img src={navBarCurrentSoltStyle.leftIcon} alt=""/>}
          navCenter={<Search {...navBarCurrentSoltStyle.search}/>}
          navRight={<img src={navBarCurrentSoltStyle.rightIcon} alt=""/>}
        />
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
                  return <img src={item.icon} key={item.id} alt=""/>;
                })
              }
            </div>
          </Activity>
          <ModeOptions/>
          <Seconds dataSource={secondsData}/>
          <Activity>
            <div className={styles['activity-pin-gou-jie']}>
              <img src={pingoujie} alt=""/>
            </div>
          </Activity>
          <Goods dataSource={goodsData}/>
        </div>
      </div>
    );
  }
}

export default Home;
