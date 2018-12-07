import request from '@/utils/request'
import API from './api.js'


export function HomeList(query) {
  return request({
    url: `${API}`+'/tenner/goodslist',
    method: 'post',
    data: query
  })
}
