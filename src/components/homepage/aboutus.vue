<template>
	<div id="aboutus">
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
		<div class="aboutusBg">
			<img src="./image/aboutusbg.png" alt="" />
			<div class="aboutusWord">
				<div class="aboutUsTitle">
					我们的团队
					
				</div>
				<div class="aboutUsLine"></div>
				<div class="aboutUsText">
					我们（蚂蚁金服体验技术部）是一支兼具设计视角和工程视角的团队，服务蚂蚁金服上百个中后台系统，主打产品 Ant Design 服务全球 100 万设计师和工程师，是西湖区学院路西侧最具影响力的设计语言。欢迎来这里和我们一起打造优雅高效的人机设计/研发体系。
				</div>
			</div>
		</div>
		<!--底部-->
		<div id="footer">
			<v-foot></v-foot>
		</div>

		<!--<v-login v-show="loginShow" @clickLoginClose="clickLoginClose()" @clickGoRegister="clickGoRegister()" @clickForget="clickForget()" ></v-login>
		<v-register v-show="registerShow" @clickRegisterClose="clickRegisterClose()"></v-register>
		<v-resting v-show="restingShow" @clickRestingClose="clickRestingClose()"></v-resting>-->

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
				liveScoreShow: false, //比分直播
				matchresultShow: false, //比赛结果
			}
		},
		props: {

		},
		created() {},
		watch: {

		},
		methods: {
			//			导航切换
			handleSelect(index) {
				this.navIndex = index;
				if(index == 0) {
					this.$router.push('/homepage')
				} else if(index == 1) {
					this.$router.push('/football')
				} else if(index == 2) {
					this.$router.push('/basketball')
				} else if(index == 6) {
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
	
	#aboutus {
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
			/*margin-bottom: 20px;*/
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
		.aboutusBg {
			width: 100%;
			height: auto;
			margin-bottom: 116px;
			position: relative;
			img {
				width: 100%;
				height: auto;
			}
			.aboutusWord {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				background: #FFFFFF;
				border-radius: 10px;
				padding: 32px 67px;
				box-sizing: border-box;
				div {
					text-align: center;
				}
				.aboutUsTitle {
					font-size: 20px;
					color: #333333;
					margin-bottom:5px;
				}
				.aboutUsLine {
					width: 30px;
					height: 2px;
					background: #000000;
					margin: 0 auto;
				}
				.aboutUsText {
					font-size: 14px;
					color: #666666;
					line-height: 30px;
					margin-top: 35px;
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
	}
</style>