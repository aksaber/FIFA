const INITALLOGO = 'home/INITALLOGO';
const CHANGEHISTORY = 'home/CHANGEHISTORY';
const CURRENTROUTE = 'home';
const DETAILDATA = 'home/DETAILDATA';
const SAVETOKEN = 'login/SAVETOKEN';

const initialState = {
  movelogo: false,
  currentRoute: window.location.pathname,
  detailData: {},
  token: '',
  isLogin: false
};

/*触发action: store.dispatch({ type: '请求增援', gun: '100' })*/
/*创建store之前需要创建reducer，以获得state*/
/*...state遍历state，防止覆盖其他reducers函数返回的state*/
//这是reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case INITALLOGO:
      return {
        ...state,
        movelogo: false,
      };
    case CHANGEHISTORY:
      return {
        ...state,
        movelogo: true,
        currentRoute: action.text
      };
    case CURRENTROUTE:
      return {
        ...state,
        currentRoute: action.text
      };
    case DETAILDATA:
      return {
        ...state,
        detailData: action.text
      };
    case SAVETOKEN:
      return {
        ...state,
        token: action.text,
        isLogin: true
      };
    default:
      return state;
  }
}

//这是action
export function initalLogo() {
  return {
    type: INITALLOGO
  };
}

export function changeRoute(route) {
  return {
    type: CHANGEHISTORY,
    text: route
  };
}

//存储token
export function saveToken(data) {
  return {
    type: SAVETOKEN,
    text: data
  };
}

//获取详情的数据
export function getDetailData(data) {
  return {
    type: DETAILDATA,
    text: data
  };
}
