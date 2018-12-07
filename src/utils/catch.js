// 引入storage插件
import storage from 'good-storage'

//保存购物车
const GOODS_LIST = '_goodslist_'//购物车商品
//个人信息
const MINE = '_mine_'//个人信息

//添加商品
export function saveGoodsLsit(list) {
  storage.session.set(GOODS_LIST, list)
  return list
}
//获取商品
export function loadGoodsList() {
  return storage.session.get(GOODS_LIST, [])
}



function insertArray(arr, val, compare) {
  const index = arr.findIndex(compare)
  if (index >= 0) {
    arr[index].count++
  }else{
    arr.unshift(val)
  }

}
function deleteArray(arr, val, compare) {
  const index = arr.findIndex(compare)
  if (index >= 0) {
    arr[index].count--
    if(arr[index].count<1){
      arr.splice(index, 1)
    }
  }

}



//购物车添加方法
export function addGoodsList(query) {
  let arr=loadGoodsList()
  insertArray(arr, query, (item) => {
    return item.tenner_goods_id === query.tenner_goods_id
  })

  storage.session.set(GOODS_LIST, arr)
  return arr
}

//购物车删除方法
export function deleteGoodsList(query) {
  let arr=loadGoodsList()
  deleteArray(arr, query, (item) => {
    return item.tenner_goods_id === query.tenner_goods_id
  })

  storage.session.set(GOODS_LIST, arr)
  return arr
}

//购物车删除整个商品
export function deleteGoods(query) {
  let arr=loadGoodsList()
  const index = arr.findIndex((item)=>{
    return item.tenner_goods_id === query.tenner_goods_id
  })
  if (index >= 0) {
    arr.splice(index, 1)
  }

  storage.session.set(GOODS_LIST, arr)
  return arr
}

//清空购物车
export function removeGoodsList(query) {
  storage.session.remove(GOODS_LIST)
}

//商品总数量
export function goodsCount() {
  let num=0
  let arr=loadGoodsList()
  arr.forEach((item)=>{
    num+=item.count
  })
  return num
}

//存取个人信息
export function saveMine(query) {
  storage.session.set(MINE, query)
  return query
}
export function loadMine() {
  return storage.session.get(MINE, {})

}


