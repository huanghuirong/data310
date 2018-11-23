<template>
	<div id="homepage">
		<!--头部-->
		<div class="header">
			<div class="headAll">
				<div class="headAllLeft">
					<img src="./image/logo.png" alt="" />
				</div>
				<div class="headAllRight">
					<div class="headCustom">
						<img src="./image/custom.png" alt="" />
						<span>客服电话：400-860-93932</span>
					</div>
					<div class="headLogin">

						<div class="headHaveLogin" v-if="haveLoginShow">
							<img src="./image/headportrait.png" alt="" />
							<span>用户名</span>
						</div>
						<div class="headNoLogin" v-else>登录，体验智能推荐</div>
					</div>
				</div>
			</div>
		</div>
		<!--导航-->
		<div class="nav">
			<div class="navLists">
				<div class="navItems" v-for="(item,index) in navList " @click="handleSelect(index)">
					<div :class="{'activeNav':navIndex == index}">{{item}}</div>
				</div>
			</div>
		</div>
		<!--内容-->
		<div class="main">
			<!--广告-->
			<!--<div></div>
			<div></div>-->
			<div class="mainCon">
				<!--轮播-->
				<div class="mainScroll">
					<template>
						<div class="block">
							<span class="demonstration">默认 Hover 指示器触发</span>
							<el-carousel height="150px">
								<el-carousel-item v-for="item in 4" :key="item">
									<h3>{{ item }}</h3>
								</el-carousel-item>
							</el-carousel>
						</div>
					</template>
				</div>
				<div></div>
			</div>
		</div>
		<!--底部-->
		<div id="footer">
			<v-foot></v-foot>
		</div>
	</div>
</template>
<script>
	import foot from '../../common/templates/foot/foot'
	export default {
		data() {
			return {
				haveLoginShow: false, //是否登录
				navList: ['首页', '足球', '篮球', '比分直播', '比赛结果', '论坛', '关于我们'], //导航
				navIndex: "0",
			}
		},
		props: {

		},
		created() {

		},
		watch: {

		},
		methods: {
			handleSelect(index) {
				this.navIndex = index;
			}
		},
		components: {
			"v-foot": foot
		},
		computed: {

		}
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	* {
		margin: 0px;
		padding: 0px;
		list-style: none;
		text-decoration: none;
	}
	
	#homepage {
		width: 100%;
		height: 100%;
		body>.el-container {
			margin-bottom: 40px;
			padding: 0px;
			margin: 0px;
		}
		/*头部*/
		.header {
			color: #333;
			text-align: center;
			height: 100px;
			box-shadow: 0px 0px 5px -2px #001529;
			.headAll {
				width: 1160px;
				margin: 0 auto;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.headAllLeft,
				.headAllRight {
					height: 100px;
				}
				.headAllLeft {
					display: flex;
					align-items: center;
					justify-content: center;
					img {
						width: auto;
						height: 30px;
					}
				}
				.headAllRight {
					display: flex;
					flex-direction: column;
					align-items: flex-end;
					justify-content: center;
					.headCustom {
						font-size: 12px;
						color: #383838;
						display: flex;
						align-items: center;
						img {
							width: 16px;
							height: auto;
							margin-right: 3px;
						}
					}
					.headLogin {
						.headNoLogin {
							width: 175px;
							height: 40px;
							margin-top: 12px;
							background: #FF5A00;
							border-radius: 4px;
							padding: 8px 9px;
							box-sizing: border-box;
							color: #FFFFFF;
							font-size: 16px;
						}
						.headHaveLogin {
							display: flex;
							align-items: center;
							justify-content: center;
							margin-top: 20px;
							font-size: 13px;
							color: #000000;
							img {
								width: 24px;
								height: 24px;
								margin-right: 8px;
							}
						}
					}
				}
			}
		}
		/*导航*/
		.nav {
			width: 100%;
			text-align: center;
			margin-top: 4px;
			border-bottom: 4px solid #FF5A00;
			.navLists {
				width: 1160px;
				height: 63px;
				margin: 0 auto;
				display: flex;
				align-items: center;
				justify-content: center;
				.navItems {
					font-size: 16px;
					div {
						margin: 0px 20px;
						padding: 20px 16px 23px 16px;
						box-sizing: border-box;
					}
					.activeNav {
						background: #FF5A00;
						color: #FFFFFF;
					}
				}
			}
		}
		/*内容*/
		.main {
			width: 100%;
			text-align: center;
			.mainCon {
				width: 1160px;
				margin: 0 auto;
				.mainScroll {
					.el-carousel__item h3 {
						color: #475669;
						font-size: 18px;
						opacity: 0.75;
						line-height: 300px;
						margin: 0;
					}
					.el-carousel__item:nth-child(2n) {
						background-color: #99a9bf;
					}
					.el-carousel__item:nth-child(2n+1) {
						background-color: #d3dce6;
					}
				}
			}
		}
		#footer {
			position: fixed;
			bottom: 0px;
			left: 0px;
			right: 0px;
		}
	}
</style>