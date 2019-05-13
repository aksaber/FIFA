const INITALLOGO = 'home/INITALLOGO';
const CHANGEHISTORY = 'home/CHANGEHISTORY';
const CURRENTROUTE = 'home';
const DETAILDATA = 'home/DETAILDATA';
const SAVETOKEN = 'login/SAVETOKEN';
const GETTOKEN = 'home/TOKEN';
const SETFIXED = 'homeFIXED';
const GETUSERINFO = 'userInfo';
const INFOCLASSIFY = 'infoclassify';
const MATCHCLASSIFY = 'matchclassify';

const initialState = {
  movelogo: false,
  currentRoute: window.location.hash,
  detailData: {},
  token: '',
  isFixed: '',
  isLogin: false,
  userInfo: {},
  infoClassify: [],
  matchClassify: []
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
    case GETTOKEN:
      return {
        ...state,
        token: action.text
      };
    case SETFIXED:
      return {
        ...state,
        isFixed: action.text
      };
    case GETUSERINFO:
      return {
        ...state,
        userInfo: action.text
      };
    case INFOCLASSIFY:
      return {
        ...state,
        infoClassify: action.text
      };
    case MATCHCLASSIFY:
      return {
        ...state,
        matchClassify: action.text
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

//获取token
export function getToken() {
  const cookieArr = document.cookie.split(';');
  let cookie = '';
  for (let i = 0; i < cookieArr.length; i++) {
    if (cookieArr[i].split('=')[0].trim() === 'fifaToken') {
      [, cookie] = cookieArr[i].split('=');
    }
  }
  return {
    type: GETTOKEN,
    text: cookie
  };
}

//是否固定banner
export function isFixFun(data) {
  return {
    type: SETFIXED,
    text: data
  };
}

//获取用户个人信息
export function getUserInfo(data) {
  return {
    type: GETUSERINFO,
    text: data
  };
}

//存放fifa资讯或赛事分类
export function saveClassify(index, data) {
  return {
    type: index === 0 ? INFOCLASSIFY : MATCHCLASSIFY,
    text: data.slice(0, 4)
  };
}
