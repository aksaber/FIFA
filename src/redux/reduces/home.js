const INITALLOGO = 'home/INITALLOGO';
const CHANGEHISTORY = 'home/CHANGEHISTORY';

const initialState = {
  movelogo: false
};

/*触发action: store.dispatch({ type: '请求增援', gun: '100' })*/
/*创建store之前需要创建reducer，以获得state*/
/*...state遍历state，防止覆盖其他reducers函数返回的state*/
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
        text: action.text
      };
    default:
      return state;
  }
}

export function initalLogo() {
  return {
    type: INITALLOGO
  };
}

export function changeRoute() {
  return {
    type: CHANGEHISTORY,
    text: 'showDocs'
  };
}
