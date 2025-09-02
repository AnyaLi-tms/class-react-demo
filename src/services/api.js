import axios from "axios";

// 创建axios实例
const api = axios.create({
  baseURL: "/api",
  timeout: 2000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    // 添加认证token
    config.headers.Authorization = "Bearer fake-token";
    // 显示加载状态
    //setLoading(true);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    // 直接返回响应数据
    return response.data;
  },
  (error) => {
    // 处理401未授权错误
    if (error.response.status === 401) {
      // 跳转到登录页
      //redirectToLogin();
    }
    return Promise.reject(error);
  }
);

export default api;