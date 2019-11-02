import React from 'react';
import NavigationBar from '@/components/NavigationBar';
import GoodsOotions from '@/components/GoodsOotions';
import Goods from '@/components/Goods';
import styles from './index.scss';
import { connect } from 'react-redux';

const layoutTypeDatas = [
  {
    // 垂直列表
    type: '1',
    icon: require('@/assets/images/list-type.svg'),
  },
  {
    // 网格布局
    type: '2',
    icon: require('@/assets/images/grid-type.svg'),
  },
  {
    // 瀑布流
    type: '3',
    icon: require('@/assets/images/waterfall-type.svg'),
  },
];

@connect(({ home }) => ({
  goodsData: home.orgGoodsData,
}))
class GoodsList extends React.PureComponent {
  state = {
    layoutType: layoutTypeDatas[0],
  };
  handleBack = () => {
    const { history } = this.props;
    history.goBack();
  };


  handleTypeChange = () => {
    this.setState(preState => {
      let layoutType = layoutTypeDatas[0];
      switch (preState.layoutType.type) {
        case '1':
          layoutType = layoutTypeDatas[1];
          break;
        case '2':
          layoutType = layoutTypeDatas[2];
          break;
        case '3':
          layoutType = layoutTypeDatas[0];
          break;
        default:
          layoutType = layoutTypeDatas[0];
      }
      return {
        layoutType,
      };
    });
  };

  handleSortChange = () => {
    const {dispatch} = this.props;
    dispatch({
      type: 'home/sortGoodsData',
      payload: '2'
    })
  }

  render() {
    const { layoutType } = this.state;
    const { goodsData } = this.props;
    return (
      <div className={styles['goods-list-page']}>
        <NavigationBar onBack={this.handleBack} pageName="商品列表"
                       navRight={<img src={layoutType.icon} alt="" onClick={this.handleTypeChange}/>}/>
        <div className={styles['goods-list-page-content']}>
          <GoodsOotions/>
          {
            goodsData.length > 0 ? <Goods layoutType={layoutType.type} dataSource={goodsData}/> : null
          }
        </div>
      </div>
    );
  }
}

export default GoodsList;
