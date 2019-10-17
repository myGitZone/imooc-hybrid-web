import {
  initSwiperData
} from '@/server/api';
import {SUCCESS} from '@/assets/js/utils';


export default {
  namespace: 'home',
  state: {
    swiperData: []
  },
  effects: {
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
    saveSwiperData(state, action) {
      return {
        ...state,
        swiperData: action.payload
      }
    }
  }
}
