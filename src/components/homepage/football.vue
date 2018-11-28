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
				<!--内容标题-->
				<div class="mainConTop">
					<el-tabs v-model="activeName" @tab-click="handleClick">
						<el-tab-pane v-for="" label="胜平负/让球胜平负" name="first">
							<!--选择框-->
							<div class="mainConChoose">
								<div class="mainConChooseLeft">
									<!--下拉菜单-->
									<el-dropdown trigger="click" :hide-on-click="false">
										<span class="el-dropdown-link">赛事筛选<i class="el-icon-arrow-down el-icon--right"></i></span>
										<!--日期筛选-->
										<el-dropdown-menu slot="dropdown" @click.stop>
											<el-dropdown-item>
												<div class="dropdownTitle" style="font-size:14px;font-weight:600;color:#333333;margin:15px 0px;">按时间筛选</div>
												<el-checkbox :indeterminate="isIndeterminateTime" v-model="checkAllTime" @change="handleCheckAllChangeTime">全部</el-checkbox>
												<el-checkbox-group v-model="checkedTime" @change="handleCheckedCitiesChangeTime">
													<el-checkbox v-for="time in times" :label="time" :key="time">{{time}}</el-checkbox>
												</el-checkbox-group>
											</el-dropdown-item>
											<!--赛事筛选-->
											<el-dropdown-item>
												<div class="dropdownTitle" style="font-size:14px;font-weight:600;color:#333333;margin:15px 0px;">按赛事筛选</div>
												<el-checkbox :indeterminate="isIndeterminateMatch" v-model="checkAllMatch" @change="handleCheckAllChangeMatch">全部</el-checkbox>
												<el-checkbox-group v-model="checkedMatch" @change="handleCheckedCitiesChangeMatch">
													<el-checkbox v-for="match in matches" :label="match" :key="match">{{match}}</el-checkbox>
												</el-checkbox-group>
											</el-dropdown-item>
										</el-dropdown-menu>
									</el-dropdown>
									<el-checkbox v-model="checkedPass">仅显示单关</el-checkbox>
									<div>共隐藏0场赛事 </div>
									<el-checkbox-group v-model="checkList">
										<el-checkbox label="胜平负"></el-checkbox>
										<el-checkbox label="让球胜平负"></el-checkbox>
									</el-checkbox-group>

									<el-checkbox v-model="checkedMoney">奖金区浮动显示奖金变化</el-checkbox>
								</div>
								<div class="mainConChooseRight">
									<div>[使用说明]</div>
									<div>竞彩奖金更新时间：2018-11-22 19:36:31</div>
									<div>
										<!--<img src="image/refresh.png" alt="" />-->
										<i class="el-icon-refresh"></i>
									</div>
								</div>
							</div>
							<!--表格-->
							<el-table :border="false" style="width: 100%" :span-method="objectSpanMethod">
								<el-table-column header-align="center" prop="date" label="赛事编号">
								</el-table-column>
								<el-table-column header-align="center" prop="name" label="赛事">
								</el-table-column>
								<el-table-column header-align="center" prop="address" label="开赛时间">
								</el-table-column>
								<el-table-column header-align="center" prop="date" label="即时天气">
								</el-table-column>
								<el-table-column header-align="center" prop="name" label="主队VS客队">
								</el-table-column>
								<el-table-column header-align="center" prop="address" label="让球">
								</el-table-column>
								<el-table-column header-align="center" prop="address" label="胜">
								</el-table-column>
								<el-table-column header-align="center" prop="date" label="平">
								</el-table-column>
								<el-table-column header-align="center" prop="name" label="负">
								</el-table-column>
								<el-table-column header-align="center" prop="name" label="数据">
								</el-table-column>
								<el-table-column header-align="center" prop="address" label="支持率">
									<el-table-column header-align="center" prop="address" label="胜">
									</el-table-column>
									<el-table-column header-align="center" prop="date" label="平">
									</el-table-column>
									<el-table-column header-align="center" prop="name" label="负">
									</el-table-column>
								</el-table-column>
								<el-table-column header-align="center" prop="date" label="重要提示">
								</el-table-column>
							</el-table>
						</el-tab-pane>
						<el-tab-pane label="比分" name="second">配置管理</el-tab-pane>
						<el-tab-pane label="总进球数" name="third">角色管理</el-tab-pane>
						<el-tab-pane label="半全场胜平负" name="fourth">定时任务补偿</el-tab-pane>
						<el-tab-pane label="混合过关" name="fifth">混合过关</el-tab-pane>

					</el-tabs>
					<div class="mainConNotice">
						<div>[足球受注赛程]</div>
						<div>[足球暂定赛程]</div>
						<div>[赛事公告]</div>
					</div>
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
	const timelist = ['周一', '周四'];
	const matchlist = ['上海', '北京', '广州', '深圳'];
	import foot from '../../common/templates/foot/foot'
	export default {
		data() {
			return {
				haveLoginShow: false, //是否登录
				navList: ['首页', '足球', '篮球', '比分直播', '比赛结果', '论坛', '关于我们'], //导航
				navIndex: "1",
				mainNavIndex: '0',
				activeName: 'first',

				//下拉菜单
				//				时间筛选
				checkAllTime: false,
				checkedTime: ['周一'],
				times: timelist,
				isIndeterminateTime: true,
				//				赛程筛选
				checkAllMatch: false,
				checkedMatch: ['上海', '北京'],
				matches: matchlist,
				isIndeterminateMatch: true,

				checkedPass: true, //单关选择按钮
				checkedMoney: true, //奖金选择按钮

				checkList: ['胜平负']

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
			//			页面导航点击
			handleSelect(index) {
				this.navIndex = index;
				if(index == 0) {
					this.$router.push('/homepage')
				}
			},
			//			内容导航点击
			handleClick(tab, event) {
				console.log(tab, event);
			},
			//			下拉菜单复选框（时间）
			handleCheckAllChangeTime(val) {
				this.checkedTime = val ? timelist : [];
				this.isIndeterminateTime = false;
			},
			handleCheckedCitiesChangeTime(value) {
				let checkedCount = value.length;
				this.checkAllTime = checkedCount === this.times.length;
				this.isIndeterminateTime = checkedCount > 0 && checkedCount < this.times.length;
			},

			//			下拉菜单复选框（赛程）
			handleCheckAllChangeMatch(val) {
				this.checkedMatch = val ? matchlist : [];
				this.isIndeterminateMatch = false;
			},
			handleCheckedCitiesChangeMatch(value) {
				let checkedCount = value.length;
				this.checkAllMatch = checkedCount === this.matches.length;
				this.isIndeterminateMatch = checkedCount > 0 && checkedCount < this.matches.length;
			},

			//表格
			objectSpanMethod({
				row,
				column,
				rowIndex,
				columnIndex
			}) {
				console.log(columnIndex)
				
			}

			},
			components: {"v-foot": foot
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
				.mainConTop {
					width: 100%;
					display: flex;
					/*align-items: center;*/
					justify-content: space-between;
					.el-tabs {
						flex: 1;
						/*.el-tabs__header{
							.el-tabs__nav-wrap{
								.el-tabs__nav-scroll{
									.el-tabs__nav{
										.el_tabs__active-bar{
											background-color:red;
										}
									}
								}
							}
						}*/
						.el-tabs__header {
							margin: 0px;
						}
						.el-tabs__item {
							font-size: 16px;
						}
						.el-tab-pane {
							.mainConChoose {
								display: flex;
								align-items: center;
								justify-content: space-between;
								padding: 20px 10px;
								box-sizing: border-box;
								border: 1px solid #E3E3E3;
								.mainConChooseLeft {
									display: flex;
									align-items: center;
									>* {
										margin-right: 20px;
										font-size: 14px;
									}
								}
								.mainConChooseRight {
									display: flex;
									align-items: center;
									div {
										font-size: 12px;
										color: #666666;
										.el-icon-refresh {
											font-size: 14px;
											color: #FF5A00;
											font-weight: 600;
											margin-left: 12px;
										}
									}
								}
							}
						}
					}
					.mainConNotice {
						display: flex;
						/*align-items: center;*/
						padding-bottom: 10px;
						border-bottom: 3px solid red;
						box-sizing: border-box;
						font-size: 12px;
						color: #666666;
						div {
							display: inline;
							margin-right: 5px;
						}
						div:nth-last-child(1) {
							margin-right: 0px;
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
	}
</style>