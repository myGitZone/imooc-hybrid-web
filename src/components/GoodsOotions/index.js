import React from 'react';
import style from '@/assets/css/style.scss';
import { CSSTransition } from 'react-transition-group';
import styles from './index.scss';

const options = [
  {
    id: '1',
    name: '默认',
    subs: [
      {
        id: '1',
        name: '默认',
      },
      {
        id: '1-2',
        name: '价格由高到低',
      },
      {
        id: '1-3',
        name: '销量由高到低',
      },
    ],
  },
  {
    id: '2',
    name: '有货优先',
    subs: [],
  },
  {
    id: '3',
    name: '销量优先',
    subs: [],
  },
];

class GoodsOotions extends React.PureComponent {
  state = {
    selectOption: options[0],
    // 标记子选项是否处于选中状态
    isShowSubContent: false,
  };
  /**
   * 1.如果子选项是展开，则关闭
   * 2、如果选中的包含子选项。并且item处于选中，展示子选项
   */
  handleOptionItemClick = (item, index) => {
    const { isShowSubContent, selectOption } = this.state;
    // 如果当前展开，则关闭
    if (isShowSubContent) {
      this.setState({
        isShowSubContent: false,
      });
      return;
    }
    // 如果筛选项处于选中状态，并且当前点击的是该选中项，并且包含子选项
    if (item.subs.length > 0 && selectOption.id === item.id) {
      this.setState({
        isShowSubContent: true,
      });
    }
    this.setState({
      selectOption: item,
    });
  };

  handleOptionSubItemClick = (item, index) => {
    options.forEach((option) => {
      option.subs.forEach((subOption) => {
        if (subOption.id === item.id) {
          option.id = subOption.id;
          option.name = subOption.name;
        }
      });
    });
    this.setState({
      selectOption: item,
      isShowSubContent: false,
    });
  };

  handleCover = () => {
    this.setState({
      isShowSubContent: false,
    });
  };

  render() {
    const { selectOption, isShowSubContent } = this.state;
    return (
      <div className={`${styles['goods-options']} ${style['z-index-2']}`}>
        <ul className={styles['goods-options-list']}>
          {
            options.map((item, index) => {
              return (
                <li className={styles['goods-options-list-item']} key={item.id}>
                  <span className={styles['goods-options-list-item-content']} href=""
                        onClick={() => this.handleOptionItemClick(item, index)}>
                    <span
                      className={`${styles['goods-options-list-item-content-name']} ${item.id === selectOption.id ? styles['goods-options-list-item-content-name-active'] : ''}`}>{item.name}</span>
                    {
                      item.subs.length > 0 ?
                        <span
                          className={`${styles['goods-options-list-item-content-caret']} ${style.caret} ${isShowSubContent && selectOption.id === item.id ? styles['goods-options-list-item-content-caret-open'] : styles['goods-options-list-item-content-caret-close']}`}/> : null
                    }
                  </span>
                </li>
              );
            })
          }
        </ul>
        <CSSTransition
          in={isShowSubContent}
          timeout={300}
          unmountOnExit
          classNames='fold-height'
        >
          <div className={`${styles['options-sub-content']} ${style['z-index-2']}`}>
            <ul className={styles['options-sub-content-list']}>
              {
                'subs' in selectOption && selectOption.subs.map((item, index) => {
                  return (
                    <li className={styles['options-sub-content-list-item']} key={item.id}>
                    <span href="" className={styles['options-sub-content-list-item-content']}
                          onClick={() => this.handleOptionSubItemClick(item, index)}>
                      <span
                        className={`${styles['options-sub-content-list-item-content-name']} ${selectOption.id === item.id ? styles['options-sub-content-list-item-content-name-active'] : ''}`}>{item.name}</span>
                      {
                        selectOption.id === item.id ? <img src={require('@/assets/images/options-select.svg')} alt=""
                                                           className={styles['options-sub-content-list-item-content-select']}/> : null
                      }
                    </span>
                    </li>
                  );
                })
              }
            </ul>
          </div>
        </CSSTransition>
        <div className={styles.cover} style={{ display: isShowSubContent ? 'block' : 'none' }}
             onClick={this.handleCover}/>
      </div>
    );
  }
}

export default GoodsOotions;
