import axios from 'axios'

const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 5000 // request timeout
})

service.interceptors.request.use(function(config){

	console.log("加载中")

  return config
})

// 拦截相应

service.interceptors.response.use(function(config){

	console.log("加载完毕")
  return config
})

export default service
