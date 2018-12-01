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
				<!--内容导航-->
				<div class="maiConTitle">
					<div class="mainConTitleLeft">
						<el-breadcrumb separator-class="el-icon-arrow-right">
							<el-breadcrumb-item :to="{ path: '/' }">一级菜单</el-breadcrumb-item>
							<el-breadcrumb-item>二级菜单</el-breadcrumb-item>
							<el-breadcrumb-item>三级菜单</el-breadcrumb-item>
						</el-breadcrumb>
					</div>
					<div class="mainConTitleRight">
						<el-form ref="form" :model="form" label-width="80px">
							<el-form-item label="">
								<el-select v-model="form.region" placeholder="周一005 英格兰超级联赛英超 伯恩利 VS 纽卡斯尔联">
									<el-option label="区域一" value="shanghai"></el-option>
									<el-option label="区域二" value="beijing"></el-option>
								</el-select>
							</el-form-item>
						</el-form>
					</div>
				</div>
				<!--比赛双方信息-->
				<div class="teamALL">
					<!--<div class="teamList">-->
					<div class="teamLeft">
						<div class="teamLeftImg">
							<img src="../../assets/logo.png" alt="" />
						</div>
						<div class="teamLeftScore">
							<div>总成绩 5胜 2平 6负 积17分</div>
							<div>主场成绩 4胜 1平 2负 积13分</div>
						</div>
					</div>
					<div class="teamMiddle">
						<div class="teamMiddleLeft">
							<div class="teamMiddleCountry">德乙 [12] </div>
							<div>达姆施塔特</div>
						</div>
						<div class="teamMiddleSign">VS</div>
						<div class="teamMiddleRight">
							<div class="teamMiddleCountry">德乙 [12] </div>
							<div>达姆施塔特</div>
						</div>
					</div>
					<div class="teamRight">
						<div class="teamRightScore">
							<div>总成绩 5胜 2平 6负 积17分</div>
							<div>主场成绩 4胜 1平 2负 积13分</div>
						</div>
						<div class="teamRightImg">
							<img src="../../assets/logo.png" alt="" />
						</div>
					</div>
					<!--</div>-->

				</div>
				<!--比赛时间-->
				<div class="mainMatchTime">
					周六016 德国乙级联赛 2018/2019 德乙常规赛 第14轮 2018-11-24 20:00:00 实时天气：2° 薄雾
				</div>
				<div class="mainMatchState">
					<el-tabs v-model="activeName" @tab-click="handleClick">
						<el-tab-pane v-for="" label="奖金对比" name="first">
							<div>
								<el-table :data="tableData3" :header-cell-style="tableHeaderColor" :span-method="getSpanArr" style="width: 100%">
									<el-table-column header-align="center" label="竞彩胜平负">
										<el-table-column align="center" prop="name" label="胜">
										</el-table-column>
										<el-table-column align="center" prop="province" label="平">
										</el-table-column>
										<el-table-column align="center" prop="city" label="负">
										</el-table-column>
										<el-table-column align="center" prop="address" label="胜率">
										</el-table-column>
										<el-table-column align="center" prop="zip" label="平率">
										</el-table-column>
										<el-table-column align="center" prop="province" label="负率">
										</el-table-column>
										<el-table-column align="center" prop="city" label="时间">
										</el-table-column>
										<el-table-column align="center" prop="address" label="支持率">
										</el-table-column>
										<el-table-column align="center" prop="zip" label="统计">
										</el-table-column>
									</el-table-column>
								</el-table>
							</div>
							<div style="margin-top:20px;">
								<el-table :data="tableData3" :header-cell-style="tableHeaderColor" :span-method="getSpanArr" style="width: 100%">
									<el-table-column header-align="center" label="竞彩让球胜平负(+1)">
										<el-table-column align="center" prop="name" label="胜">
										</el-table-column>
										<el-table-column align="center" prop="province" label="平">
										</el-table-column>
										<el-table-column align="center" prop="city" label="负">
										</el-table-column>
										<el-table-column align="center" prop="address" label="胜率">
										</el-table-column>
										<el-table-column align="center" prop="zip" label="平率">
										</el-table-column>
										<el-table-column align="center" prop="province" label="负率">
										</el-table-column>
										<el-table-column align="center" prop="city" label="时间">
										</el-table-column>
										<el-table-column align="center" prop="address" label="支持率">
										</el-table-column>
										<el-table-column align="center" prop="zip" label="统计">
										</el-table-column>
									</el-table-column>
								</el-table>
							</div>

						</el-tab-pane>
						<el-tab-pane label="亚盘数据" name="second">亚盘数据</el-tab-pane>
						<el-tab-pane label="对阵数据" name="third">对阵数据</el-tab-pane>
						<el-tab-pane label="比赛信息" name="fourth">比赛信息</el-tab-pane>
						<el-tab-pane label="固定奖金" name="fifth">固定奖金</el-tab-pane>
						<el-tab-pane label="赛事直播" name="sixth">
							<!--预告-->
							<div class="sportsAnnouncement" v-if="!liveShow">
								<div class="sportsAnnouncementMoney">
									<div class="sportsAnnouncementMoneyLeft">
										<div class="sportsAnnouncementMoneyTitle">胜平负奖金</div>
										<div class="sportsAnnouncementMoneyNum">
											<span>5.75</span>
											<span>2.67</span>
											<span>1.23</span>
										</div>
									</div>
									<div class="sportsAnnouncementMoneyRight">
										<div class="sportsAnnouncementMoneyTitle">让球胜平负奖金</div>
										<div class="sportsAnnouncementMoneyNum">
											<span>5.75</span>
											<span>2.67</span>
											<span>1.23</span>
										</div>
									</div>
								</div>
								<div class="sportsAnnouncementTime">直播预告：本场比赛将在2018-11-25 22:30:00进行直播</div>
							</div>
							<!--赛事直播-->
							<div class="sportsLive" v-else>
								<div class="sportsLiveMoney">
									<div class="sportsLiveMoneyLists sportsLiveMoneyListsborder">
										<div class="sportsLiveMoneyListTitle">让球即时奖金</div>
										<div class="sportsLiveMoneyListNum">5.75</div>
									</div>
									<div class="sportsLiveMoneyLists sportsLiveMoneyListsborder">
										<div class="sportsLiveMoneyListTitle">总进球即时奖金</div>
										<div class="sportsLiveMoneyListNum">9.67</div>
									</div>
									<div class="sportsLiveMoneyLists sportsLiveMoneyListsborder">
										<div class="sportsLiveMoneyListTitle">半全场即时奖金</div>
										<div class="sportsLiveMoneyListNum">6.78</div>
									</div>
									<div class="sportsLiveMoneyLists">
										<div class="sportsLiveMoneyListTitle">比分即时奖金</div>
										<div class="sportsLiveMoneyListNum">11.45</div>
									</div>
								</div>
								<div class="sportsLiveData">
									<!--直播赛事表头-->
									<div class="sportsLiveDataHeadAll">
										<div class="sportsLiveDataHead" v-for="(item,index) in sportsLiveDataHeadLists" :class="{activeSportsLive:sportsLiveHeadIndex==index}" @click="changeLiveHead(index)">
											<div>{{item}}</div>
										</div>
									</div>
									<!--直播赛事内容-->
									<div class="sportsLiveDataMain">
										<!--实时赛况-->
										<div class="sametime" v-if="sportsLiveHeadIndex==0">
											<!--实时赛况双方队名字-->
											<div class="sametimeName">
												<div>里昂</div>
												<div>0:0</div>
												<div>圣埃蒂安</div>
											</div>
											<!--赛况轨迹图-->
											<div>
												<div id="steps14"></div>
											</div>
										</div>
										<!--首发阵容-->
										<div class="firstteam" v-else-if="sportsLiveHeadIndex ==1">
											<!--首发阵容双方队名字-->
											<div class="firstteamName">
												<div>里昂</div>
												<div class="firstteamFlex"></div>
												<div>圣埃蒂安</div>
											</div>
											<!--首发阵容双方队员-->
											<div class="firstteamMain" v-for="(val,index) in firstteamList">
												<div class="firstteamerLeft">
													1-洛佩斯 门将
												</div>
												<div class="firstteamFlex">
													进球
												</div>
												<div class="firstteamerRight">
													1-洛佩斯 门将
												</div>
											</div>
										</div>
										<!--技术分析-->
										<div class="technical" v-else>
											<!--比赛双方队名字-->
											<div class="technicalName">
												<div>里昂</div>
												<div class="technicalFlex"></div>
												<div>圣埃蒂安</div>
											</div>
											<!--比赛双方技术分析-->
											<div class="technicalMain" v-for="(val,index) in technicalList">
												<div class="technicalMainMes">
													<div class="technicalMainProgress">
														<el-progress :stroke-width="16" :show-text="false" :percentage="80" color="#8e71c7"></el-progress>
													</div>
													<div class="technicalMainNumLeft">1</div>
												</div>
												<div class="technicalFlex">
													进球
												</div>
												<div class="technicalMainMes">
													<div class="technicalMainNumRight">1</div>
													<div class="technicalMainProgress">
														<el-progress :stroke-width="16" :show-text="false" :percentage="80" color="#8e71c7"></el-progress>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</el-tab-pane>
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
	import head from '../../common/templates/head/head'
	import foot from '../../common/templates/foot/foot'
	import login from '../../common/templates/login/login'
	import resting from '../../common/templates/resting/resting'
	import register from '../../common/templates/register/register'
	import '../../common/js/steps.min.js'
	import '../../common/css/steps.min.css'

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
				}, //搜索框
				activeName: 'first',

				tableData3: [{
					date: '2016-05-03',
					name: '王小虎',
					province: '上海',
					city: '普陀区',
					address: '上海市普陀区金沙江路 1518 弄',
					zip: 200333
				}, {
					date: '2016-05-02',
					name: '王小虎',
					province: '上海',
					city: '普陀区',
					address: '上海市普陀区金沙江路 1518 弄',
					zip: 200333
				}, {
					date: '2016-05-04',
					name: '王小虎',
					province: '上海',
					city: '普陀区',
					address: '上海市普陀区金沙江路 1518 弄',
					zip: 200333
				}, {
					date: '2016-05-01',
					name: '王小虎',
					province: '上海',
					city: '普陀区',
					address: '上海市普陀区金沙江路 1518 弄',
					zip: 200333
				}],
				liveShow: true,
				sportsLiveDataHeadLists: ['实时赛况', '首发阵容', '技术分析'], //直播导航头
				sportsLiveHeadIndex: 0, //直播导航头index
				firstteamList: [1, 2, 3], //首发阵容
				technicalList: [1, 2, 3], //技术分析数据
				liveScoreShow: false,//比分直播
				matchresultShow: false,//比赛结果
			}
		},
		props: {

		},
		created() {
			//			this.$nextTick(() => {
			//								this.step();
			//			})
		},
		watch: {

		},
		methods: {
			//			头部点击登录
			clickLogin() {
				console.log("red")
				this.loginShow = true;
			},
			handleSelect(index) {
				this.navIndex = index;
				if(index == 0) {
					this.$router.push('/homepage')
				} else if(index == 1) {
					this.$router.push('/football')
				}else if(index == 2) {
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
			},
			handleClick(tab, event) {
				console.log(tab, event);
			},
			tableHeaderColor({
				row,
				column,
				rowIndex,
				columnIndex
			}) {
				if(rowIndex === 0) {
					return 'background-color: #13C2C2;color:#ffffff;font-weight: 500;font-size:20px;'
				}
			},
			getSpanArr(data) {
				//				console.log(data) //从后台获取的数据
				this.spanArr = []
				for(var i = 0; i < data.length; i++) {
					if(i === 0) {
						// 如果是第一条记录（即索引是0的时候），向数组中加入１
						this.spanArr.push(1)
						this.pos = 0
					} else {
						if(data[i].sellerName === data[i - 1].sellerName) {
							// 如果useName相等就累加，并且push 0
							this.spanArr[this.pos] += 1
							this.spanArr.push(0)
						} else {
							// 不相等push 1
							this.spanArr.push(1)
							this.pos = i
						}
					}
				}
				//				console.log(this.spanArr)
			},
			//			步骤条
			step() {
				var steps14 = steps({
					el: "#steps14",
					data: [{
							title: "步骤1",
							description: "111",
							status: 1
						},
						{
							title: "步骤2",
							description: "222",
							side: "two-sides"
						},
						{
							title: "步骤3",
							description: "333",
							status: 1
						}
					],
					direction: "vertical",
					center: true,
					active: 1,
					iconType: "bullets",
					sides: "two-sides"
				});

			},
			//			直播赛事导航头切换
			changeLiveHead(index) {
				this.sportsLiveHeadIndex = index;
				if(index == 0) {
					this.step();
				}
			},

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
				.maiConTitle {
					display: flex;
					align-items: center;
					justify-content: space-between;
					.maiConTitleLeft,
					.maiConTitleRight {
						display: flex;
						align-items: center;
					}
				}
				.teamALL {
					display: flex;
					margin: 45px 0px 20px 0px;
					.teamLeft {
						display: flex;
						align-items: center;
						font-size: 14px;
						color: #666666;
						.teamLeftImg {
							img {
								width: 68px;
								height: 65px;
							}
						}
						.teamLeftScore {
							text-align: left;
						}
					}
					.teamMiddle {
						flex: 1;
						align-items: center;
						display: flex;
						justify-content: center;
						margin-top: -65px;
						font-size: 24px;
						color: #333333;
						.teamMiddleLeft {
							text-align: right;
						}
						.teamMiddleCountry {
							font-size: 12px;
							color: #666666;
						}
						.teamMiddleSign {
							font-size: 50px;
							margin: 0px 30px;
						}
						.teamMiddleRight {
							text-align: left;
						}
					}
					.teamRight {
						display: flex;
						align-items: center;
						font-size: 14px;
						color: #666666;
						.teamRightImg {
							img {
								width: 68px;
								height: 65px;
							}
						}
						.teamRightScore {
							text-align: right;
						}
					}
				}
				.mainMatchTime {
					padding: 7px 0px;
					box-sizing: border-box;
					border-top: 1px solid #E3E3E3;
					border-bottom: 1px solid #E3E3E3;
					text-align: center;
					font-size: 14px;
					color: #333333;
				}
				.mainMatchState {
					padding: 20px 0px;
					box-sizing: border-box;
					margin: 0 auto;
					.sportsAnnouncement {
						.sportsAnnouncementMoney {
							margin: 0 auto;
							width: 600px;
							display: flex;
							align-items: center;
							justify-content: space-between;
							padding: 20px 42px;
							box-sizing: border-box;
							border-radius: 15px;
							background: #F6F6F6;
							margin-bottom: 30px;
							.sportsAnnouncementMoneyLeft {
								width: 49%;
								text-align: left;
								border-right: 2px solid #D9D9D9;
							}
							.sportsAnnouncementMoneyRight {
								text-align: right;
							}
							.sportsAnnouncementMoneyTitle {
								font-size: 14px;
								color: #333333;
								margin-bottom: 8px;
							}
							.sportsAnnouncementMoneyNum {
								font-size: 24px;
								span:nth-child(1) {
									color: #597EF7;
									margin-right: 20px;
								}
								span:nth-child(2) {
									color: #FA8C16;
									margin-right: 20px;
								}
								span:nth-child(3) {
									color: #FF4D4F;
								}
							}
						}
						.sportsAnnouncementTime {
							font-size: 20px;
							color: #333333;
						}
					}
					.sportsLive {
						.sportsLiveMoney {
							margin: 0 auto;
							width: 600px;
							display: flex;
							align-items: center;
							justify-content: space-between;
							padding: 20px 0px;
							box-sizing: border-box;
							border-radius: 15px;
							background: #F6F6F6;
							margin-bottom: 30px;
							.sportsLiveMoneyListsborder {
								border-right: 2px solid #D9D9D9;
							}
							.sportsLiveMoneyLists {
								text-align: center;
								width: 25%;
								.sportsLiveMoneyListTitle {
									font-size: 14px;
									color: #333333;
								}
								.sportsLiveMoneyListNum {
									font-size: 24px;
									color: #FF5A00;
									margin-top: 8px;
								}
							}
						}
						.el-tabs--border-card>.el-tabs__header {
							background-color: red;
						}
						.sportsLiveData {
							width: 1160px;
							.sportsLiveDataHeadAll {
								height: 51px;
								display: flex;
								align-items: center;
								font-size: 20px;
								color: #333333;
								.sportsLiveDataHead {
									width: 33.33%;
									height: 49px;
									line-height: 49px;
									background: #FFFFFF;
									border: 1px solid #13C2C2;
								}
								.sportsLiveDataHead:nth-child(2) {
									border-left: none;
									border-right: none;
								}
								.activeSportsLive {
									background: #13C2C2;
									color: #FFFFFF;
								}
							}
							.sportsLiveDataMain {
								/*实时战况*/
								.sametime {
									display: flex;
									align-items: center;
									justify-content: center;
									flex-direction: column;
									.sametimeName {
										width: 100%;
										display: flex;
										align-items: center;
										justify-content: center;
										font-weight: 600;
										padding: 36px 0px 30px 0px;
										box-sizing: border-box;
										div:nth-child(2) {
											margin: 0px 50px;
											font-size: 50px;
											color: #333333;
										}
									}
								}
								/*首发阵容*/
								.firstteam {
									display: flex;
									align-items: center;
									justify-content: center;
									flex-direction: column;
									font-size: 20px;
									color: #333333;
									.firstteamName {
										width: 100%;
										display: flex;
										justify-content: center;
										/*margin: 0px 0px 44px 0px;*/
										font-weight: 600;
										padding: 36px 0px 30px 0px;
										box-sizing: border-box;
										border-bottom: 1px solid #E8E8E8;
										div:nth-child(1) {
											text-align: right;
										}
										div:nth-child(3) {
											text-align: left;
										}
										.firstteamFlex {
											width: 320px;
										}
									}
									.firstteamMain {
										width: 100%;
										display: flex;
										justify-content: center;
										margin-bottom: 38px;
										padding: 16px 0px;
										box-sizing: border-box;
										border-bottom: 1px solid #E8E8E8;
										div:nth-child(1) {
											text-align: right;
										}
										div:nth-child(3) {
											text-align: left;
										}
										.firstteamFlex {
											width: 290px;
										}
									}
								}
								/*技术分析*/
								.technical {
									display: flex;
									align-items: center;
									justify-content: center;
									flex-direction: column;
									font-size: 20px;
									color: #333333;
									.technicalName {
										display: flex;
										margin: 36px 0px 44px 0px;
										font-weight: 600;
										div:nth-child(1) {
											text-align: right;
										}
										div:nth-child(3) {
											text-align: left;
										}
										.technicalFlex {
											width: 320px;
										}
									}
									.technicalMain {
										display: flex;
										margin-bottom: 38px;
										div:nth-child(1) {
											text-align: right;
										}
										div:nth-child(3) {
											text-align: left;
										}
										.technicalFlex {
											width: 290px;
										}
										.technicalMainMes {
											display: flex;
											align-items: center;
											.technicalMainProgress {
												width: 260px;
											}
											.technicalMainNumLeft {
												margin-left: 20px;
											}
											.technicalMainNumRight {
												margin-right: 20px;
											}
										}
									}
								}
							}
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