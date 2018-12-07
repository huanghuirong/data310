import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)
//首页
const Homepage = (resolve) => {
	import('../components/Homepage/homepage.vue').then((module) => {
		resolve(module)
	})
}
//足球比赛
const Football = (resolve) => {
	import('../components/Homepage/football.vue').then((module) => {
		resolve(module)
	})
}
//足球比赛详情
const Footballmatch = (resolve) => {
	import('../components/Homepage/footballmatch.vue').then((module) => {
		resolve(module)
	})
}
//篮球比赛
const Basketball = (resolve) => {
	import('../components/Homepage/basketball.vue').then((module) => {
		resolve(module)
	})
}
//篮球比赛详情
const Basketballmatch = (resolve) => {
	import('../components/Homepage/basketballmatch.vue').then((module) => {
		resolve(module)
	})
}
//关于我们
const Aboutus = (resolve) => {
	import('../components/Homepage/aboutus.vue').then((module) => {
		resolve(module)
	})
}
//测试
const Test = (resolve) => {
	import('../components/Homepage/test.vue').then((module) => {
		resolve(module)
	})
}
export default new Router({
	// mode: 'history',
	routes: [{
			path: '/',
			name: 'homepage',
			component: Homepage,
			redirect: '/homepage'
		},
		{
			path: '/homepage',
			component: Homepage
		},
		{
			path: '/football',
			component: Football
		},
		{
			path: '/footballmatch',
			component: Footballmatch
		},

		{
			path: '/basketball',
			component: Basketball
		},
		{
			path: '/basketballmatch',
			component: Basketballmatch
		},
		{
			path: '/aboutus',
			component: Aboutus
		},
		{
			path: '/test',
			component: Test
		},
		//		{
		//			path: '/shopcar',
		//			component: Shopcar,
		//			children: [{
		//				path: '/shopcar/shoporder',
		//				component: Shoporder,
		//				children: [{
		//					path: '/shopcar/shoporder/addresslist',
		//					component: AddressList,
		//					children: [{
		//						path: '/shopcar/shoporder/addresslist/writeaddress',
		//						component: WriteAddress
		//					}, ]
		//				}, ]
		//			}]
		//		},
	]
})