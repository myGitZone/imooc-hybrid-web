import {
  initSwiperData,
  activitys,
  seconds,
  goods,
} from '@/server/api';
import { SUCCESS } from '@/assets/js/utils';


export default {
  namespace: 'home',
  state: {
    swiperData: [],
    activityData: [],
    secondsData: [],
    goodsData: [],
    orgGoodsData: []
  },
  effects: {
    * goods({ payload }, { call, put }) {
      const res = yield call(goods, payload);
      if (res?.state.toString() === SUCCESS) {
        yield put({
          type: 'saveGoodsData',
          payload: res.data.list,
        });
      }
    },
    * seconds({ payload }, { call, put }) {
      const res = yield call(seconds, payload);
      if (res?.state.toString() === SUCCESS) {
        yield put({
          type: 'saveSeconsData',
          payload: res.data.list,
        });
      }
    },
    * activitys(payload, { call, put }) {
      const res = yield call(activitys, payload);
      if (res?.state.toString() === SUCCESS) {
        yield put({
          type: 'saveActivityData',
          payload: res.data.list,
        });
      }
    },
    * initSwiperDate(payload, { call, put }) {
      const res = yield call(initSwiperData, payload);
      if (res?.state.toString() === SUCCESS) {
        yield put({
          type: 'saveSwiperData',
          payload: res.data.list,
        });
      }
    },
  },
  reducers: {
    sortGoodsData(state, action) {
      return {
        ...state,
        orgGoodsData: SortGoodsData(action.payload, [...state.goodsData]),
      };
    },
    saveGoodsData(state, action) {
      return {
        ...state,
        goodsData: action.payload,
        orgGoodsData: action.payload,
      };
    },
    saveSeconsData(state, action) {
      return {
        ...state,
        secondsData: action.payload,
      };
    },
    saveActivityData(state, action) {
      return {
        ...state,
        activityData: action.payload,
      };
    },
    saveSwiperData(state, action) {
      return {
        ...state,
        swiperData: action.payload,
      };
    },
  },
};

function SortGoodsData(sortType, data) {
  switch (sortType) {
    // 默认
    case '1':
      return data;
      break;
    // 价格
    case '1-2':
      return getSortDataByKey('price', data);
      break;
    // 销量
    case '1-3':
      return getSortDataByKey('volume', data);
      break;
    // 有货优先
    case '2':
      return getSortDataByKey('isHave', data);
      break;
    // 直营优先
    case '3':
      return getSortDataByKey('isDirect', data);
      break;
  }
}

function getSortDataByKey(key, data) {
  /**
   *  返回 负数 ， 表示 goods1 在 goods2 之前，
   *  返回正数， 表示 goods1 在 goods2 之后，
   *  返回 0， 顺序不变
   */
  return data.sort((goods1, goods2) => {
    let v1 = goods1[key],
      v2 = goods2[key];

    // boolean 类型值的处理
    if (typeof v1 === 'boolean') {
      if (v1) {
        return -1;
      }

      if (v2) {
        return 1;
      }

      return 0;

    }

    // float 类型值的处理
    if (parseFloat(v1) >= parseFloat(v2)) {
      return -1;
    }
    return 1;
  });
}
