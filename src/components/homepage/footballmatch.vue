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
			<div class="mainCon">
				<!--内容导航-->
				<div class="maiConTitle">
					<div class="mainConTitleLeft">
						<el-breadcrumb separator-class="el-icon-arrow-right">
							<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
							<el-breadcrumb-item>活动管理</el-breadcrumb-item>
							<el-breadcrumb-item>活动列表</el-breadcrumb-item>
							<el-breadcrumb-item>活动详情</el-breadcrumb-item>
						</el-breadcrumb>
					</div>
					<div class="mainConTitleRight">
						<el-form ref="form" :model="form" label-width="80px">
							<el-form-item label="活动区域">
								<el-select v-model="form.region" placeholder="请选择活动区域">
									<el-option label="区域一" value="shanghai"></el-option>
									<el-option label="区域二" value="beijing"></el-option>
								</el-select>
							</el-form-item>
						</el-form>
					</div>
				</div>
				<!--比赛双方信息-->
				<div></div>
				<!--比赛时间-->
				<div class="mainMatchTime">
					周六016 德国乙级联赛 2018/2019 德乙常规赛 第14轮 2018-11-24 20:00:00 实时天气：2° 薄雾 
				</div>
				<div class="mainMatchState">
					<el-tabs v-model="activeName" @tab-click="handleClick">
						<el-tab-pane v-for="" label="胜平负/让球胜平负" name="first">胜平负/让球胜平负
						</el-tab-pane>
						<el-tab-pane label="比分" name="second">配置管理</el-tab-pane>
						<el-tab-pane label="总进球数" name="third">角色管理</el-tab-pane>
						<el-tab-pane label="半全场胜平负" name="fourth">定时任务补偿</el-tab-pane>
						<el-tab-pane label="混合过关" name="fifth">混合过关</el-tab-pane>

					</el-tabs>
				</div>
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
				navIndex: "1",
				form: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				} ,//搜索框
				activeName: 'first',
			}
		},
		props: {

		},
		created() {
			console.log(document.body.clientWidth)
		},
		watch: {

		},
		methods: {
			handleSelect(index) {
				this.navIndex = index;
				if(index == 1) {
					this.$router.push('/football')
				}
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
			margin-bottom: 260px;
			text-align: center;
			.mainCon {
				width: 1160px;
				margin: 0 auto;
				.maiConTitle{
					display: flex;
					align-items: center;
					justify-content: space-between;
					.maiConTitleLeft,.maiConTitleRight{
						display: flex;
						align-items: center;
					}
				}
				.mainMatchTime{
					padding:7px 0px;
					box-sizing: border-box;
					border-top:1px solid #E3E3E3;
					border-bottom: 1px solid #E3E3E3;
					text-align: center;
					font-size:14px;
					color:#333333;
				}
				.mainMatchState{
					padding:20px 0px;
					box-sizing: border-box;
					text-align: center;
					margin:0 auto;
					.el-tabs{
						width:600px;
						margin:0 auto;
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
		
	}
</style>