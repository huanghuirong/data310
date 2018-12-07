import request from '@/utils/request'

import API from './api.js'
//订单列表
export function MineList(query) {
  return request({
    url: `${API}`+'/tenner/orderlist',
    method: 'post',
    data: query
  })
}
//立即支付
export function PayOrder(query) {
  return request({
    url: `${API}`+'/pay/subpay',
    method: 'post',
    data: query
  })
}
//SubOrder
export function SubOrder(query) {
  return request({
    url: `${API}`+'/tenner/receiveten',
    method: 'post',
    data: query
  })
}
