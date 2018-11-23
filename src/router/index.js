import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

const Homepage = (resolve) => {
	import('../components/Homepage/Homepage.vue').then((module) => {
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
