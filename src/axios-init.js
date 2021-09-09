import axios from 'axios'
import router from '@/router'  //引入router
import cookies from 'vue-cookies'
import { Message, Notification } from 'element-ui';

let instance = axios.create(); //创建Loading 的实例
axios.defaults.baseURL = "/api/"; // 配置axios请求的地址
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
// axios.defaults.crossDomain = true;
// axios.defaults.withCredentials = true;  //设置cross跨域 并设置访问权限 允许跨域携带cookie信息
axios.defaults.headers.common['Authorization'] = ''; // 设置请求头为 Authorization

// 请求拦截器
instance.interceptors.request.use(
  config => {
    // 每次发送请求之前判断vuex中是否存在token
    const token = cookies.get('token');
    token && (config.headers.Authorization = 'Bearer '+ token);
    return config;
  },
  error => {
    return Promise.error(error); // 抛出错误
  }
);

instance.interceptors.response.use(
  response => {
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    if (response.status === 200) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  error => {
    if (error.response.status) {
      switch (error.response.status) {
        case 401:
          cookies.remove('token');
          cookies.remove('userId');
          cookies.remove('userName');
          router.push({path: '/login'});
          Notification({
            title: '登录超时',
            message: '请尝试重新登录',
            type: 'warning'
          });
          break;
        default:
          Message.error(`Error: ${error.response.status}`);   
      }
    }
  }
);

export default instance