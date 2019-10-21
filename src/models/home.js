import {
  initSwiperData,
  activitys,
  seconds,
  goods
} from '@/server/api';
import {SUCCESS} from '@/assets/js/utils';


export default {
  namespace: 'home',
  state: {
    swiperData: [],
    activityData: [],
    secondsData: [],
    goodsData: []
  },
  effects: {
    * goods({payload}, {call, put}) {
      const res = yield call(goods, payload);
      if(res?.state.toString() === SUCCESS){
        yield put({
          type: 'saveGoodsData',
          payload: res.data.list
        })
      }
    },
    * seconds({payload}, {call, put}) {
      const res = yield call(seconds, payload);
      if(res?.state.toString() === SUCCESS){
        yield put({
          type: 'saveSeconsData',
          payload: res.data.list
        })
      }
    },
    * activitys(payload, {call, put}) {
      const res = yield call(activitys, payload);
      if(res?.state.toString() === SUCCESS){
        yield put({
          type: 'saveActivityData',
          payload: res.data.list
        })
      }
    },
    * initSwiperDate(payload, {call, put}) {
      const res = yield call(initSwiperData, payload);
      if(res?.state.toString() === SUCCESS){
        yield put({
          type: 'saveSwiperData',
          payload: res.data.list
        })
      }
    }
  },
  reducers: {
    saveGoodsData(state, action) {
      return {
        ...state,
        goodsData: action.payload
      }
    },
    saveSeconsData(state, action) {
      return {
        ...state,
        secondsData: action.payload
      }
    },
    saveActivityData(state, action) {
      return {
        ...state,
        activityData: action.payload
      }
    },
    saveSwiperData(state, action) {
      return {
        ...state,
        swiperData: action.payload
      }
    }
  }
}
