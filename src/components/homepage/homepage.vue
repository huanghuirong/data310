<template>
	<div id="homepage">
		<!--头部-->
		<v-head @clickLogin="clickLogin()"></v-head>
		<!--导航-->
		<div class="nav">
			<div class="navLists">
				<div class="navItems" v-for="(item,index) in navList " @click="handleSelect(index)">
					<div class="navItem" @mouseover="selectShow(index)" :class="{'activeNav':navIndex == index}">{{item}}</div>
					<div class="liveScore" v-if="index==3 && liveScoreShow">
						<div>足球比分直播</div>
						<div>篮球比分直播</div>
					</div>
					<div class="matchResult" v-if="index==4 && matchresultShow">
						<div>足球比赛结果</div>
						<div>篮球比赛结果</div>
					</div>
				</div>
			</div>
		</div>

		<!--内容-->
		<div class="main">
			<div class="mainCon">
				<!--轮播-->
				<div class="mainScroll">
					<!--<template>-->
					<el-carousel height="400px">
						<el-carousel-item v-for="item in carouselImg" :key="item">
							<img :src="item" alt="" />
						</el-carousel-item>
					</el-carousel>
					<!--</template>-->
				</div>
				<!--资讯-->
				<div class="mainNews">
					<div class="mainNewsLists" v-for="item in 4" :key="item">
						<!--分类-->
						<div class="mainNewsListsTitle">
							<div class="mainNewsListsTitleLeft">
								<span></span> 奖报
							</div>
							<div class="mainNewsListsTitleRight">MORE</div>
						</div>
						<!--内容-->
						<ul class="mainNewsListsContent">
							<li><span></span>足球世界变化快，妖人小将大步迈，今天要说的是来自于克罗地亚的95</li>
							<li><span></span>印度羽球赛李雪芮28分钟速胜东道主选手 晋级十六强</li>
							<li><span></span>高尔夫世界杯周四开赛 李昊桐吴阿顺出战欲创佳绩</li>
							<li><span></span>C罗晒图疑似回应金球奖评选 尤文官方力挺：你是史诗</li>
							<li><span></span>黄紫昌拄拐亮相中超颁奖典礼 一年打遍各级国字号</li>
						</ul>
					</div>
				</div>

			</div>
		</div>
		<!--底部-->
		<div id="footer">
			<v-foot></v-foot>
		</div>
		<!--广告-->
		<div class="adLeft">
			<div class="adPosition">
				<div>广告</div>
				<img src="../../../build/logo.png" />
			</div>

		</div>
		<div class="adRight">
			<div class="adPosition">
				<div>广告</div>
				<img src="../../../build/logo.png" />
			</div>

		</div>
		<v-login v-show="loginShow" @clickLoginClose="clickLoginClose()" @clickGoRegister="clickGoRegister()" @clickForget="clickForget()" ></v-login>
		<v-register v-show="registerShow" @clickRegisterClose="clickRegisterClose()"></v-register>
		<v-resting v-show="restingShow" @clickRestingClose="clickRestingClose()"></v-resting>

	</div>
</template>
<script>
	import head from '../../common/templates/head/head'
	import foot from '../../common/templates/foot/foot'
	import login from '../../common/templates/login/login'
	import resting from '../../common/templates/resting/resting'
	import register from '../../common/templates/register/register'
	export default {
		data() {
			return {
				activeIndex: '1',
				haveLoginShow: false, //是否登录
				navList: ['首页', '足球', '篮球', '比分直播', '比赛结果', '论坛', '关于我们'], //导航
				navIndex: "0",
				carouselImg: [
					"https://lggst1.lagougongshe.com/281107702913037598.png",
					"https://lggst1.lagougongshe.com/242733150717600971.jpg",
				], //轮播图片
				liveScoreShow: false, //比分直播
				matchresultShow: false, //比赛结果
				loginShow: '', //登录显示
				registerShow: '', //立即注册显示
				restingShow: '', //重置密码显示
				//				phoneNum:'123',//登录手机号和
			}
		},
		props: {

		},
		created() {
		},
		watch: {

		},
		methods: {
			//			头部点击登录
			clickLogin() {
				console.log("red")
				this.loginShow = true;
			},
			//			点击关闭登录窗口
			clickLoginClose() {
				this.loginShow = false;
			},
			//			点击登录页面的立即注册
			clickGoRegister() {
				this.loginShow = false;
				this.registerShow = true;
			},
			//			点击关闭注册窗口
			clickRegisterClose() {
				this.registerShow = false;
			},

			//			忘记密码点击跳转重置密码
			clickForget() {
				this.loginShow = false;
				this.restingShow = true;
			},
			//			关闭重置按钮窗口
			clickRestingClose() {
				this.restingShow = false;
			},

			handleSelect(index) {
				this.navIndex = index;
				if(index == 0) {
					this.$router.push('/homepage')
				} else if(index == 1) {
					this.$router.push('/football')
				} else if(index == 2) {
					this.$router.push('/basketball')
				}else if(index == 6) {
					this.$router.push('/aboutus')
				}
			},
			//		导航下拉框显示
			selectShow(index) {
				if(index == 3) {
					this.liveScoreShow = !this.liveScoreShow
				} else if(index == 4) {
					console.log(index)
					this.matchresultShow = !this.matchresultShow
				}
			}
		},
		components: {
			"v-head": head,
			"v-foot": foot,
			"v-login": login,
			"v-resting": resting,
			"v-register": register
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
		/*导航*/
		.nav {
			width: 100%;
			text-align: center;
			margin-top: 4px;
			margin-bottom: 20px;
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
					.navItem {
						margin: 0px 20px;
						padding: 20px 16px 23px 16px;
						box-sizing: border-box;
					}
					.navItem:hover {
						color: #FF5A00;
					}
					div:nth-child(4) {
						/*position: relative;*/
					}
					.activeNav {
						background: #FF5A00;
						color: #FFFFFF;
					}
					.liveScore {
						position: absolute;
						top: 160px;
						z-index: 10;
						font-size: 14px;
						color: #606266;
						background: #FFFFFF;
						padding: 9px 1px;
						box-sizing: border-box;
						margin-left: 24px;
						border: 1px solid #E4E7ED;
						div {
							height: 34px;
							line-height: 34px;
						}
						div:hover {
							background: #FF5A00;
							color: #FFFFFF;
						}
					}
					.matchResult {
						position: absolute;
						top: 160px;
						z-index: 10;
						font-size: 14px;
						color: #606266;
						background: #FFFFFF;
						padding: 9px 1px;
						box-sizing: border-box;
						margin-left: 24px;
						border: 1px solid #E4E7ED;
						div {
							height: 34px;
							line-height: 34px;
						}
						div:hover {
							background: #FF5A00;
							color: #FFFFFF;
						}
					}
				}
			}
		}
		/*内容*/
		.main {
			width: 100%;
			margin-bottom: 260px;
			text-align: center;
			.mainCon {
				width: 1160px;
				margin: 0 auto;
				.mainScroll {
					margin-bottom: 20px;
					.el-carousel__item img {
						width: 100%;
						height: 100%;
					}
				}
				.mainNews {
					display: flex;
					align-items: center;
					justify-content: space-between;
					flex-wrap: wrap;
					.mainNewsLists {
						width: 49%;
						border: 1px solid #E5E5E5;
						margin-bottom: 20px;
						padding: 30px 30px 20px 20px;
						box-sizing: border-box;
						.mainNewsListsTitle {
							display: flex;
							align-items: center;
							justify-content: space-between;
							font-size: 18px;
							color: #333333;
							font-weight: 600;
							margin-bottom: 15px;
							.mainNewsListsTitleLeft {
								display: flex;
								align-items: center;
								span {
									display: block;
									width: 4px;
									height: 16px;
									background: #FF5A00;
									margin-right: 5px;
								}
							}
							.mainNewsListsTitleRight {
								width: 48px;
								height: 22px;
								line-height: 22px;
								text-align: center;
								border: 1px solid #C4C4C4;
								box-sizing: border-box;
								font-size: 12px;
								color: #666666;
							}
							.mainNewsListsTitleRight:hover {
								color: #FFFFFF;
								background: #FF5A00;
								border: 1px solid #FF5A00;
							}
						}
						.mainNewsListsContent {
							text-align: left;
							li {
								display: flex;
								align-items: center;
								margin-bottom: 10px;
								font-size: 16px;
								span {
									display: inline-block;
									width: 6px;
									height: 6px;
									border-radius: 50%;
									background: #C4C4C4;
									margin-right: 5px;
								}
							}
							li:nth-last-child(1) {
								margin-bottom: 0px;
							}
							li:hover {
								color: #FF5A00;
								span {
									background: #FF5A00;
								}
							}
						}
					}
					mainNewsLists:nth-child(2n+1) {
						margin-right: 20px;
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
		}
		/*底部*/
		#footer {
			position: fixed;
			bottom: 0px;
			left: 0px;
			right: 0px;
			z-index: 10;
		}
		/*广告*/
		.adLeft {
			position: fixed;
			top: 230px;
			left: 10px;
			.adPosition {
				position: relative;
				div {
					position: absolute;
					top: 0px;
					left: 0px;
					z-index: 10;
				}
				img {
					display: block;
					width: 166px;
					height: 416px;
				}
			}
		}
		.adRight {
			position: fixed;
			top: 230px;
			right: 10px;
			.adPosition {
				position: relative;
				div {
					position: absolute;
					top: 0px;
					left: 0px;
					z-index: 10;
				}
				img {
					display: block;
					width: 166px;
					height: 416px;
				}
			}
		}
	}
</style>