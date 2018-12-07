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
							<el-table :data="tableData6" :default-sort="{prop:'matchnum'}" :border="false" style="width: 100%" :span-method="objectSpanMethod">
								<el-table-column sortable align="center" width="100" prop="matchnum" label="赛事编号">
								</el-table-column>
								<el-table-column align="center" prop="match" label="赛事">
								</el-table-column>
								<el-table-column align="center" prop="matchtime" label="开赛时间">
								</el-table-column>
								<el-table-column align="center" prop="weather" label="即时天气">
								</el-table-column>
								<el-table-column align="center" prop="matchteam" label="主队VS客队">
								</el-table-column>
								<el-table-column sortable align="center" prop="giveball" label="让球">
								</el-table-column>
								<el-table-column sortable align="center" prop="win" label="胜">
								</el-table-column>
								<el-table-column sortable align="center" prop="drawn" label="平">
								</el-table-column>
								<el-table-column sortable align="center" prop="lost" label="负">
								</el-table-column>
								<el-table-column align="center" prop="date" label="数据">
								</el-table-column>
								<el-table-column sortable align="center" prop="support" label="支持率">
									<el-table-column align="center" prop="supportwin" label="胜">
									</el-table-column>
									<el-table-column align="center" prop="supportdrawn" label="平">
									</el-table-column>
									<el-table-column align="center" prop="supportlost" label="负">
									</el-table-column>
								</el-table-column>
								<el-table-column align="center" prop="important" label="重要提示">
								</el-table-column>
							</el-table>
						</el-tab-pane>
						<el-tab-pane label="比分" name="second">配置管理</el-tab-pane>
						<el-tab-pane label="总进球数" name="third">角色管理</el-tab-pane>
						<el-tab-pane label="半全场胜平负" name="fourth">定时任务补偿</el-tab-pane>
						<el-tab-pane label="混合过关" name="fifth">混合过关</el-tab-pane>

					</el-tabs>

					<div class="mainConNotice">
						<a>[足球受注赛程]</a>
						<a>[足球暂定赛程]</a>
						<a>[赛事公告]</a>
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
	import head from '../../common/templates/head/head'
	import foot from '../../common/templates/foot/foot'
	import login from '../../common/templates/login/login'
	import resting from '../../common/templates/resting/resting'
	import register from '../../common/templates/register/register'
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

				checkList: ['胜平负'],
				liveScoreShow: false, //比分直播
				matchresultShow: false, //比赛结果

				tableData6: [{
						matchnum: '',
						match: '',
						matchtime: '',
						weather: '',
						matchteam: '',
						giveball: '',
						win: '',
						drawn: '',
						lost: '',
						date: '',
						supportwin: '',
						supportdrawn: '',
						supportlost: '',
						important: ''
					}, {
						matchnum: '12987122',
						match: '王小虎',
						matchtime: '234',
						weather: '3.2',
						matchteam: 10,
						giveball: 12,
						win: '12987123',
						drawn: '王小虎',
						lost: '165',
						date: '4.43',
						supportwin: '12',
						supportdrawn: '12',
						supportlost: '12',
						important: '1'
					},
					{
						matchnum: '12987122',
						match: '王小虎',
						matchtime: '234',
						weather: '3.2',
						matchteam: 10,
						giveball: 12,
						win: '12987123',
						drawn: '王小虎',
						lost: '165',
						date: '4.43',
						supportwin: '12',
						supportdrawn: '12',
						supportlost: '12',
						important: '1'
					},
					{
						matchnum: '12987122',
						match: '王小虎',
						matchtime: '234',
						weather: '3.2',
						matchteam: 10,
						giveball: 12,
						win: '12987123',
						drawn: '王小虎',
						lost: '165',
						date: '4.43',
						supportwin: '12',
						supportdrawn: '12',
						supportlost: '12',
						important: '1'
					},
					{
						matchnum: '12987122',
						match: '王小虎',
						matchtime: '234',
						weather: '3.2',
						matchteam: 10,
						giveball: 12,
						win: '12987123',
						drawn: '王小虎',
						lost: '165',
						date: '4.43',
						supportwin: '12',
						supportdrawn: '12',
						supportlost: '12',
						important: '1'
					}
				]
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
			//			头部点击登录
			clickLogin() {
				console.log("red")
				this.loginShow = true;
			},
			//			页面导航点击
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
				console.log(rowIndex)
				if(columnIndex === 0) {
					console.log("河滨")
//					console.log(this.spanArr[rowIndex])
//					const _row = this.spanArr[rowIndex];
//					const _col = _row > 0 ? 1 : 0;
//					return {
//						rowspan: _row,
//						colspan: _col
//					}
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
				.mainConTop {
					width: 100%;
					position: relative;
					.el-tabs {
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
						height: 40px;
						line-height: 40px;
						position: absolute;
						right: 13px;
						top: 0px;
						display: flex;
						font-size: 12px;
						color: #666666;
						a {
							text-decoration: none;
							display: inline;
							margin-right: 5px;
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