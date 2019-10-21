import axios from '@/assets/js/axios.config';


// 获取轮播图
export function initSwiperData() {
  return axios.get('/swiper');
}

//获取活动数据
export function activitys() {
  return axios.get('/activitys');
}

// 获取秒杀数据
export function seconds() {
  return axios.get('/seconds');
}

// 获取商品
export function goods() {
  return axios.get('/goods');
}
