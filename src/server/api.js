import axios from '@/assets/js/axios.config';


// 获取轮播图
export function initSwiperData() {
  return axios.get('/swiper');
}
