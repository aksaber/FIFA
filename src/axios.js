
import axios from 'axios';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-urlencoded';
axios.defaults.baseURL = 'http://119.23.201.55:8083';
axios.defaults.timeout = 60000;

//添加请求拦截器(請求回來前)
// axios.interceptors.request.use(config => {
//   // let token = cookie.getCookie('token');
//   // cookie.setCookie('token',token,3600);//有操作重新设置token小时

//   //在发送请求之前做某事，比如说 设置loading动画显示
//   //判断是否存在token，如存在将每个页面header请求头都需加上token
//   if (store.state.token) {
//     config.headers.common.token = store.state.token;
//   }
//   return config;
// }, error =>
//   //请求错误时做些事
//    Promise.reject(error)
// );

// axios response 拦截器 (请求回来后)
// axios.interceptors.response.use(response => {
//   //store.commit('showLoding',false);
//   var params = response.config||{};
//   let edit = router.history.current.query.edit;//edit等于1为管理员编辑不需要登录授权
//   if (params.cacheKey) {
//     //只缓存处理成功的数据
//     if (response.data.code == 0) {
//       localStorage.setItem(params.cacheKey, JSON.stringify(response.data))
//     }
//   }
//
//   if (response.data.code == "429"&&edit != 1) {//token失效 edit等于1为不需要授权登录（管理员编辑）
//     router.push( { path: '/login' } );
//     return {
//       data: {
//         msg:'登录已过期，请先登录'
//       }
//     }
//   }
//
//   return response;
//   // console.log(response.data)
// });

export default axios;
