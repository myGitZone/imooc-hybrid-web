import React, {useState} from 'react';
import ToolBar from '@/components/ToolBar';
import Home from './Home';
import Shopping from './Shopping';
import My from './My';
import homeN from '@/assets/images/home-n.svg';
import homeH from '@/assets/images/home-h.svg';
import shoppingN from '@/assets/images/shopping-n.svg';
import shoppingH from '@/assets/images/shopping-h.svg';
import myN from '@/assets/images/my-n.svg';
import myH from '@/assets/images/my-h.svg';

const toolBarData = [{
  // 默认状态下图片
  nIcon: homeN,
  // 选中状态下的图片
  hIcon: homeH,
  name: '首页',
  component: <Home /> ,
}, {
  // 默认状态下图片
  nIcon: shoppingN,
  // 选中状态下的图片
  hIcon: shoppingH,
  name: '购物车',
  component: <Shopping />,
}, {
  // 默认状态下图片
  nIcon: myN,
  // 选中状态下的图片
  hIcon: myH,
  name: '我的',
  component: <My />,
}];


export default function() {
  const [currentCom, setCom] = useState(<Home /> );
  return (
    <>
      {
        currentCom
      }
      <ToolBar toolBarData={toolBarData} onTabChange={setCom} />
    </>
  );
}
