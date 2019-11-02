import React from 'react';
import backImg from '@/assets/images/back.svg';
import styles from './index.scss';
import style from '../../assets/css/style.scss';

/**
 * 能力：
 * 1、默认的展示效果 -> 左边为后退按钮图标 ——> 中间为页面名称 ——> 右边为空白内容
 * 2、可通过插槽配置展示样式  左中右，父组件通过插槽定制
 * 3、可以接收一个样式
 */
class NavigationBar extends React.PureComponent {
  render() {
    const {
      pageName, isShowBack = true, navLeft, navCenter, navRight, navBarStyle = {backgroundColor: 'white'}, onBack
    } = this.props;
    return (
      <div className={`${styles['nav-bar']} ${style['z-index-max']} ${pageName ? styles['bottom-line'] : ''}`} style={navBarStyle}>
        {/*左*/}
        <div className={styles.left} onClick={onBack}>
          {
            isShowBack ? <img src={backImg} alt=""/> : null
          }
          <React.Fragment>
            {navLeft}
          </React.Fragment>
        </div>
        {/*中*/}
        <div className={styles.center}>
          {
            pageName ? <span className={styles['page-title']}>{pageName}</span> : null
          }
          <React.Fragment>
            {navCenter}
          </React.Fragment>
        </div>
        {/*右*/}
        <div className={styles.right}>
          <React.Fragment>
            {navRight}
          </React.Fragment>
        </div>
      </div>
    );
  }
}

export default NavigationBar;
