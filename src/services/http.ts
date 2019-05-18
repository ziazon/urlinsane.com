import axios from 'axios';

const http = axios.create({
  baseURL: '/api',
});

// http.interceptors.request.use(request => request, (error) => {
//   console.log(error.message);
//   return Promise.reject(error);
// });

// http.interceptors.response.use(response => response, (error) => {
//   if ((error.response && error.response.status >= 500) || error.code === 'ECONNABORTED') {
//     console.log(error.message);
//   }

//   return Promise.reject(error);
// });

export default http;
