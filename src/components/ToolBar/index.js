/**
 * toolbar功能
 * 1、永远在页面底部
 * 2、点击toolbar按钮的时候，页面发生对应的切换
 * 3、按钮分为默认和选中两个状态
 *
 *
 * ===============================
 *
 * 能力和约束
 *1、不具备的能力（约束）
 *2、通过一个回调，告诉父组件，按钮的点击事件
 *3、当按钮被选中的时候，应该切换按钮的状态
 *
 */

import React, { useState } from 'react';
import styles from './index.scss';

function getClassName(selected) {
  return selected ? `${styles['tool-bar-item-name']} ${styles['tool-bar-item-name-h']}` : styles['tool-bar-item-name']
}

function ToolBar(props) {
  // 选中的tab按钮
  const [selectItemIndex, setItemIndex] = useState(0);
  const { toolBarData, onTabChange } = props;
  function handleTabChange( item, index) {
    setItemIndex(index);
    onTabChange(item.component)
  }

  return (
    <div className={styles['tool-bar']}>
      {
        toolBarData.map((item, index) => {
          return (
            <div key={item.name} className={styles['tool-bar-item']} onClick={() => handleTabChange(item, index)}>
              <img src={selectItemIndex === index ? item.hIcon : item.nIcon} alt="" className={styles['tool-bar-item-img']}/>
              <p className={getClassName(selectItemIndex === index)}>{item.name}</p>
            </div>
          );
        })
      }
    </div>
  );
}

// class ToolBar extends React.PureComponent {
//   render() {
//     return (
//       <div>ToolBar</div>
//     );
//   }
// }

export default ToolBar;
