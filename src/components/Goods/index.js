import React from 'react';
import { filter } from '@/assets/js/utils';
import Direct from '@/components/Direct';
import NoHave from '@/components/NoHave';
import style from '@/assets/css/style.scss';
import styles from './index.scss';

const MAX_HEIGHT = 230;

const MIN_HEIGHT = 180;

const ITEM_MARGIN = 8;

/**
 * 返回随机的图片高度
 */
function getImgHeight() {
  const result = ~~(Math.random() * (MAX_HEIGHT - MIN_HEIGHT) + MIN_HEIGHT);
  return result;
}

/**
 * 根据随机高度，生产图片数据
 * @returns {*}
 */
function initImgStyles(dataSource) {
  return dataSource.map((item) => {
    const imgHeight = getImgHeight() + 'px';
    return { height: imgHeight };
  });
}

/**
 * 1、创建商品列表的基本html 和 css
 * 2、生成不同高度的图片。长期不同的高度
 * 3、计算item的位置，来达到从上到下
 *
 */
class Goods extends React.PureComponent {
  state = {
    // 图片样式集合
    imgStyles: [],
    // item样式集合
    goodsItemStyles: [],
    // goods组件高度
    goodsViewHeight: '100%',
    // 不同形式下的类名
    layoutClass: styles['goods-list'],
    // 商品类名
    layoutItemClass: styles['goods-list-item'],
  };

  els = [];

  componentDidMount() {
    this.initLayout();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { layoutType, dataSource } = this.props;
    if (layoutType !== prevProps.layoutType || dataSource !== prevProps.dataSource) {
      this.initLayout();
    }
  }

  initLayout() {
    const { layoutType, dataSource } = this.props;
    // 初始化影响布局的数据
    switch (layoutType) {
      case '1':
        this.setState({
          // 图片样式集合
          imgStyles: [],
          // item样式集合
          goodsItemStyles: [],
          // goods组件高度
          goodsViewHeight: '100%',
          // 不同形式下的类名
          layoutClass: styles['goods-list'],
          // 商品类名
          layoutItemClass: styles['goods-list-item'],
        });
        break;
      case '2':
        this.setState({
          // 图片样式集合
          imgStyles: [],
          // item样式集合
          goodsItemStyles: [],
          // goods组件高度
          goodsViewHeight: '100%',
          // 不同形式下的类名
          layoutClass: styles['goods-grid'],
          // 商品类名
          layoutItemClass: styles['goods-grid-item'],
        });
        break;
      case '3':
        this.setState({
          // 图片样式集合
          imgStyles: initImgStyles(dataSource),
          // item样式集合
          goodsItemStyles: [],
          // goods组件高度
          goodsViewHeight: '0',
          // 不同形式下的类名
          layoutClass: styles['goods-waterfall'],
          // 商品类名
          layoutItemClass: styles['goods-waterfall-item'],
        }, () => {
          this.initWaterfall();
        });

        break;
      default:
        this.setState({
          // 图片样式集合
          imgStyles: [],
          // item样式集合
          goodsItemStyles: [],
          // goods组件高度
          goodsViewHeight: '100%',
          // 不同形式下的类名
          layoutClass: styles['goods-list'],
          // 商品类名
          layoutItemClass: styles['goods-list-item'],
        });
        break;
    }


  }

  /**
   * 瀑布流布局
   * 1、获取所有的item元素
   * 2、遍历item元素，得到没个item的高度，加上一个margin的高度
   * 3、创建两个变量 leftHeightTotal，rightHeightTotal分别表示两侧距离顶部的距离，通过距离来确定item的位置
   * 如果左侧小于右侧高度的话，item放到左侧
   * 4、计算出来item的所有样式，配置到item上
   * 5、对比最大高度，赋值给goods上，撑起
   */

  initWaterfall = () => {
    if (!this.els) {
      return;
    }
    let leftHeightTotal = 0;
    let rightHeightTotal = 0;
    const goodsItemStyles = [];
    this.els.forEach((el, index) => {
      let goodsItemStyle = {};
      let elHeight = el.clientHeight + ITEM_MARGIN;
      if (leftHeightTotal <= rightHeightTotal) {
        goodsItemStyle = {
          left: '0px',
          top: leftHeightTotal + 'px',
        };
        leftHeightTotal += elHeight;
      } else {
        goodsItemStyle = {
          right: '0px',
          top: rightHeightTotal + 'px',
        };
        rightHeightTotal += elHeight;
      }
      goodsItemStyles.push(goodsItemStyle);
    });
    // isScroll true 单独滚动
    const {isScroll=true} = this.props;

    this.setState({
      goodsItemStyles,
      goodsViewHeight: isScroll ? '100%' : (leftHeightTotal > rightHeightTotal ? leftHeightTotal : rightHeightTotal) + 'px'
    });
  };

  initEls = (el, index) => {
    this.els[index] = el;
  };

  render() {
    const { dataSource } = this.props;
    // layoutType 1、垂直布局  2、网格布局   3、瀑布流布局
    const { imgStyles, goodsViewHeight, goodsItemStyles, layoutClass, layoutItemClass } = this.state;
    return (
      <div className={`${styles.goods} ${layoutClass}`} style={{ height: goodsViewHeight }}>
        {
          dataSource.map((item, index) => {
            return (
              <div className={`${styles['goods-item']} ${layoutItemClass}`} key={item.img}
                   ref={(el) => this.initEls(el, index)} style={goodsItemStyles[index]}>
                <img className={styles['goods-item-img']} src={item.img} alt="" style={imgStyles[index]}/>
                <div className={styles['goods-item-desc']}>
                  <p
                    className={`${styles['goods-item-desc-name']} ${style['text-line-2']} ${item.isHave ? styles['goods-item-desc-name-hint'] : ''}`}>
                    {
                      item.isDirect ? <Direct/> : null
                    }
                    {
                      item.isHave ? <NoHave/> : null
                    }
                    {item.name}
                  </p>
                  <div className={styles['goods-item-desc-data']}>
                    <p className={styles['goods-item-desc-data-price']}>
                      ￥{filter(item.price)}
                    </p>
                    <p className={styles['goods-item-desc-data-volume']}>
                      销量：{item.volume}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        }

      </div>
    );
  }
}

export default Goods;
