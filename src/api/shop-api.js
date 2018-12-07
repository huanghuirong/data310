import request from '@/utils/request'

import API from './api.js'
//收货地址列表
export function AddressList(query) {
return request({
    url: `${API}`+'/users/addresslist',
    method: 'post',
    data: query
})
}
//添加收货地址
export function AddaddressList(query) {
  return request({
    url: `${API}`+'/address/add',
    method: 'post',
    data: query
  })
}
//编辑收货地址
export function WriteaddressList(query) {
  return request({
    url: `${API}`+'/address/update',
    method: 'post',
    data: query
  })
}
//删除地址
export function Deleteaddress(query) {
return request({
    url: `${API}`+'/address/del',
    method: 'post',
    data: query
})
}

//运费
export function Extra(query) {
  return request({
    url: `${API}`+'/get/expressfee',
    method: 'post',
    data: query
  })
}
//创建订单 结算
export function Balance(query) {
  return request({
    url: `${API}`+'/tenner/addorder',
    method: 'post',
    data: query
  })
}

//选择支付方式
export function PayType(query) {
  return request({
    url: `${API}`+'/tenner/addorder',
    method: 'post',
    data: query
  })
}
