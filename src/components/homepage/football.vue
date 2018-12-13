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
							<!--<table id="headerTr" cellpadding="0" cellspacing="0" style="position: relative; top: 0.0112102px;font-size:14px;color:#333333;height:64px;">
								<tbody>
									<tr>
										<td style="width: 96px;">

											<span id="codeHeader" class="headerList" original-title="点击排序">赛事编号</span>
											<i class="el-icon-caret-bottom"></i>
											<v-hovertoptip v-show="click"></v-hovertoptip>
										</td>
										<td style="width: 76px;"><span>赛事</span></td>
										<td style="width: 76px;"><span>开赛时间</span></td>
										<td style="width: 76px;"><span>即时天气</span></td>
										<td style="width: 280px;">主队 VS 客队</td>
										<td style="width: 64px;">让球<i class="el-icon-caret-bottom"></i><br>
											<select id="rqList">
												<option>全部</option>
												<option>-1</option>
												<option>+1</option>
												<option>-3</option>
												<option>-2</option>
												<option>+2</option>
											</select>
										</td>
										<td style="width:208px;display: flex;justify-content: space-around;align-items: center;height:64px;">
											<span id="hHeader" class="oddsHeader" original-title="">胜<i class="el-icon-caret-bottom"></i></span>
											<span id="dHeader" class="oddsHeader" original-title="">平<i class="el-icon-caret-bottom"></i></span>
											<span id="aHeader" class="oddsHeader" original-title="">负<i class="el-icon-caret-bottom"></i></span>
										</td>
										<td style="width: 68px;">数据</td>
										<td style="width: 166px; ">
											<span style="width:100%;cursor: default;" id="uOddsListbox">支持率<i class="el-icon-caret-bottom"></i></span>
											<br>
											<span style="width:100%;display: flex;align-items: center;justify-content: space-around;border-top:1px solid #E3E3E3;margin-top:5px;padding-top:5px;box-sizing: border-box;">
												<span class="uoOption tLine rLine">胜</span>
											<span class="uoOption tLine rLine">平</span>
											<span class="uoOption tLine">负</span>
											</span>

										</td>
										<td style="width: 78px;">重要提示</td>
									</tr>
								</tbody>
							</table>-->

							<!--<table id="mainTbl" cellspacing="0" cellpadding="0" width="100%">
								<tbody>
									<tr>
										<td class="bDateTd" colspan="10" bindex="1" style="text-align: left;">周五 2018-12-07&nbsp;&nbsp;&nbsp;共<label>21</label>场比赛&nbsp;&nbsp;&nbsp;
											<a href="javascript:void(0);" class="bDateHide">[隐藏]</a>
										</td>
									</tr>
									<tr id="list_114501" singleindex="0" dataindex="0_0" class="listTr" lindex="1" bindex="1" line="-1" style="display: table-row;">
										<td style="width:48px;">周五<br>001</td>
										<td title="澳大利亚超级联赛" class="lname" style="background-color: rgb(255, 112, 0); width: 73px;">澳超</td>
										<td style="width: 49px;">12-07<br>16:50</td>
										<td style="width: 49px;"><img title="天晴" src="http://static.sporttery.cn/www/images/weather_logo/sunny.png"><br>&nbsp;26°</td>
										<td title="点击VS进入对阵数据页,点击球队名称进入球队介绍页" onclick="toArrData(114501)" class="vsTd" style="width: 301px;"><label>[澳超8]</label>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=21585">西悉尼</a>
											<a onclick="stopEvent(event)" class="vsA" target="_blank" href="http://info.sporttery.cn/football/info/fb_match_info.php?m=114501">VS</a>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=4317">中央海岸</a><label>[澳超10]</label></td>
										<td class="goalLineTd" style="width: 61px;">
											<div title="胜平负" class="hadGL">0</div>
											<div title="让球胜平负" class="hhadGL"><label style="font-weight:normal;"></label>-1</div>
										</td>
										<td style="width: 301px;" class="">
											<div class="hadOdds bLine"><span class="oddsItem rLine oddsItemKeep">1.50</span><span class="oddsItem rLine oddsItemKeep">3.95</span><span class="oddsItem oddsItemKeep">4.76</span></div>
											<div class="hhadOdds"><span class="oddsItem rLine oddsItemKeep">2.48</span><span class="oddsItem rLine oddsItemKeep">3.65</span><span class="oddsItem oddsItemKeep">2.21</span></div>
										</td>
										<td class="linkTd" style="width: 73px;">
											<a href="http://info.sporttery.cn/football/info/fb_match_news.php?m=114501" target="_blank">讯</a>
											<a href="http://info.sporttery.cn/football/search_odds.php?mid=114501" target="_blank">同</a>
										</td>
										<td class="uOddsTd" style="width: 136px;">
											<div class="hadU bLine"><span class="rLine" title="4246">58%</span><span class="rLine" title="1992">27%</span><span title="1106">15%</span></div>
											<div class="hhadU"><span class="rLine" title="1522">28%</span><span class="rLine" title="2185">41%</span><span title="1684">31%</span></div>
										</td>
										<td class="matchInfoTd" style="width: 81px;">&nbsp;</td>
									</tr>
									<tr id="list_114502" singleindex="0" dataindex="0_1" class="listTr" lindex="2" bindex="1" line="-1" style="display: table-row;">
										<td style="width:48px;">周五<br>002</td>
										<td title="德国乙级联赛" class="lname" style="background-color:#DB31EE">德乙</td>
										<td>12-08<br>01:30</td>
										<td style="width:50px;"><img title="多云" src="http://static.sporttery.cn/www/images/weather_logo/cloudy.png"><br>&nbsp;11°</td>
										<td title="点击VS进入对阵数据页,点击球队名称进入球队介绍页" onclick="toArrData(114502)" class="vsTd" style="width:300px;"><label>[德乙1]</label>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=967">汉堡</a>
											<a onclick="stopEvent(event)" class="vsA" target="_blank" href="http://info.sporttery.cn/football/info/fb_match_info.php?m=114502">VS</a>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=1013">帕德博恩</a><label>[德乙9]</label></td>
										<td class="goalLineTd">
											<div title="胜平负" class="hadGL">0</div>
											<div title="让球胜平负" class="hhadGL"><label style="font-weight:normal;"></label>-1</div>
										</td>
										<td style="width:300px;" class="">
											<div class="hadOdds bLine"><span class="oddsItem rLine oddsItemKeep">1.72</span><span class="oddsItem rLine oddsItemKeep">3.70</span><span class="oddsItem oddsItemKeep">3.60</span></div>
											<div class="hhadOdds"><span class="oddsItem rLine oddsItemKeep">3.05</span><span class="oddsItem rLine oddsItemKeep">3.65</span><span class="oddsItem oddsItemKeep">1.90</span></div>
										</td>
										<td class="linkTd" style="width:74px;">
											<a href="http://info.sporttery.cn/football/info/fb_match_news.php?m=114502" target="_blank">讯</a>
											<a href="http://info.sporttery.cn/football/search_odds.php?mid=114502" target="_blank">同</a>
										</td>
										<td class="uOddsTd">
											<div class="hadU bLine"><span class="rLine" title="9033">72%</span><span class="rLine" title="2476">20%</span><span title="1007">8%</span></div>
											<div class="hhadU"><span class="rLine" title="2229">40%</span><span class="rLine" title="2263">40%</span><span title="1143">20%</span></div>
										</td>
										<td class="matchInfoTd">&nbsp;</td>
									</tr>
									<tr id="list_114503" singleindex="0" dataindex="0_2" class="listTr" lindex="2" bindex="1" line="1" style="display: table-row;">
										<td style="width:48px;">周五<br>003</td>
										<td title="德国乙级联赛" class="lname" style="background-color:#DB31EE">德乙</td>
										<td>12-08<br>01:30</td>
										<td style="width:50px;"><img title="多云" src="http://static.sporttery.cn/www/images/weather_logo/cloudy.png"><br>&nbsp;5°</td>
										<td title="点击VS进入对阵数据页,点击球队名称进入球队介绍页" onclick="toArrData(114503)" class="vsTd" style="width:300px;"><label>[德乙10]</label>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=998">雷根斯堡</a>
											<a onclick="stopEvent(event)" class="vsA" target="_blank" href="http://info.sporttery.cn/football/info/fb_match_info.php?m=114503">VS</a>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=980">科隆</a><label>[德乙2]</label></td>
										<td class="goalLineTd">
											<div title="胜平负" class="hadGL">0</div>
											<div title="让球胜平负" class="hhadGL"><label style="font-weight:normal;"></label>+1</div>
										</td>
										<td style="width:300px;" class="">
											<div class="hadOdds bLine"><span class="oddsItem rLine oddsItemKeep">3.35</span><span class="oddsItem rLine oddsItemKeep">3.78</span><span class="oddsItem oddsItemKeep">1.77</span></div>
											<div class="hhadOdds"><span class="oddsItem rLine oddsItemKeep">1.81</span><span class="oddsItem rLine oddsItemKeep">3.75</span><span class="oddsItem oddsItemKeep">3.22</span></div>
										</td>
										<td class="linkTd" style="width:74px;">
											<a href="http://info.sporttery.cn/football/info/fb_match_news.php?m=114503" target="_blank">讯</a>
											<a href="http://info.sporttery.cn/football/search_odds.php?mid=114503" target="_blank">同</a>
										</td>
										<td class="uOddsTd">
											<div class="hadU bLine"><span class="rLine" title="1033">10%</span><span class="rLine" title="2373">23%</span><span title="6953">67%</span></div>
											<div class="hhadU"><span class="rLine" title="1122">22%</span><span class="rLine" title="2107">41%</span><span title="1936">37%</span></div>
										</td>
										<td class="matchInfoTd">&nbsp;</td>
									</tr>
									<tr id="list_114504" singleindex="0" dataindex="0_3" class="listTr" lindex="3" bindex="1" line="1" style="display: table-row;">
										<td style="width:48px;">周五<br>004</td>
										<td title="荷兰甲级联赛" class="lname" style="background-color:#FF6699">荷甲</td>
										<td>12-08<br>01:30</td>
										<td style="width:50px;"><img title="微雨" src="http://static.sporttery.cn/www/images/weather_logo/sprinkle.png"><br>&nbsp;11°</td>
										<td title="点击VS进入对阵数据页,点击球队名称进入球队介绍页" onclick="toArrData(114504)" class="vsTd" style="width:300px;"><label>[荷甲10]</label>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=1551">福图纳</a>
											<a onclick="stopEvent(event)" class="vsA" target="_blank" href="http://info.sporttery.cn/football/info/fb_match_info.php?m=114504">VS</a>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=1516">阿尔克马</a><label>[荷甲7]</label></td>
										<td class="goalLineTd">
											<div title="胜平负" class="hadGL">0</div>
											<div title="让球胜平负" class="hhadGL"><label style="font-weight:normal;"></label>+1</div>
										</td>
										<td style="width:300px;" class="">
											<div class="hadOdds bLine"><span class="oddsItem rLine oddsItemKeep">3.30</span><span class="oddsItem rLine oddsItemKeep">3.80</span><span class="oddsItem oddsItemKeep">1.78</span></div>
											<div class="hhadOdds"><span class="oddsItem rLine oddsItemKeep">1.82</span><span class="oddsItem rLine oddsItemKeep">3.90</span><span class="oddsItem oddsItemKeep">3.10</span></div>
										</td>
										<td class="linkTd" style="width:74px;">
											<a href="http://info.sporttery.cn/football/info/fb_match_news.php?m=114504" target="_blank">讯</a>
											<a href="http://info.sporttery.cn/football/search_odds.php?mid=114504" target="_blank">同</a>
										</td>
										<td class="uOddsTd">
											<div class="hadU bLine"><span class="rLine" title="1463">34%</span><span class="rLine" title="975">22%</span><span title="1907">44%</span></div>
											<div class="hhadU"><span class="rLine" title="1254">47%</span><span class="rLine" title="783">29%</span><span title="657">24%</span></div>
										</td>
										<td class="matchInfoTd">&nbsp;</td>
									</tr>
									<tr id="list_114505" singleindex="0" dataindex="0_4" class="listTr" lindex="4" bindex="1" line="-1" style="display: table-row;">
										<td style="width:48px;">周五<br>005</td>
										<td title="荷兰乙级联赛" class="lname" style="background-color:#BE2B8F">荷乙</td>
										<td>12-08<br>03:00</td>
										<td style="width:50px;"><img title="雨" src="http://static.sporttery.cn/www/images/weather_logo/rain.png"><br>&nbsp;11°</td>
										<td title="点击VS进入对阵数据页,点击球队名称进入球队介绍页" onclick="toArrData(114505)" class="vsTd" style="width:300px;"><label>[荷乙1]</label>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=1533">登博思</a>
											<a onclick="stopEvent(event)" class="vsA" target="_blank" href="http://info.sporttery.cn/football/info/fb_match_info.php?m=114505">VS</a>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=1528">奈梅亨</a><label>[荷乙9]</label></td>
										<td class="goalLineTd">
											<div title="胜平负" class="hadGL">0</div>
											<div title="让球胜平负" class="hhadGL"><label style="font-weight:normal;"></label>-1</div>
										</td>
										<td style="width:300px;" class="">
											<div class="hadOdds bLine"><span class="oddsItem rLine oddsItemKeep">2.13</span><span class="oddsItem rLine oddsItemKeep">3.65</span><span class="oddsItem oddsItemKeep">2.60</span></div>
											<div class="hhadOdds"><span class="oddsItem rLine oddsItemKeep">4.10</span><span class="oddsItem rLine oddsItemKeep">4.10</span><span class="oddsItem oddsItemKeep">1.56</span></div>
										</td>
										<td class="linkTd" style="width:74px;">
											<a href="http://info.sporttery.cn/football/info/fb_match_news.php?m=114505" target="_blank">讯</a>
											<a href="http://info.sporttery.cn/football/search_odds.php?mid=114505" target="_blank">同</a>
										</td>
										<td class="uOddsTd">
											<div class="hadU bLine"><span class="rLine" title="5086">65%</span><span class="rLine" title="1638">21%</span><span title="1113">14%</span></div>
											<div class="hhadU"><span class="rLine" title="1191">42%</span><span class="rLine" title="1004">35%</span><span title="654">23%</span></div>
										</td>
										<td class="matchInfoTd">&nbsp;</td>
									</tr>
									<tr id="list_114506" singleindex="0" dataindex="0_5" class="listTr" lindex="4" bindex="1" line="-1" style="display: table-row;">
										<td style="width:48px;">周五<br>006</td>
										<td title="荷兰乙级联赛" class="lname" style="background-color:#BE2B8F">荷乙</td>
										<td>12-08<br>03:00</td>
										<td style="width:50px;"><img title="微雨" src="http://static.sporttery.cn/www/images/weather_logo/sprinkle.png"><br>&nbsp;11°</td>
										<td title="点击VS进入对阵数据页,点击球队名称进入球队介绍页" onclick="toArrData(114506)" class="vsTd" style="width:300px;"><label>[荷乙15]</label>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=1549">埃因FC</a>
											<a onclick="stopEvent(event)" class="vsA" target="_blank" href="http://info.sporttery.cn/football/info/fb_match_info.php?m=114506">VS</a>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=22879">乌德青年</a><label>[荷乙19]</label></td>
										<td class="goalLineTd">
											<div title="胜平负" class="hadGL">0</div>
											<div title="让球胜平负" class="hhadGL"><label style="font-weight:normal;"></label>-1</div>
										</td>
										<td style="width:300px;">
											<div class="hadOdds bLine"><span class="oddsItem rLine oddsItemKeep">1.29</span><span class="oddsItem rLine oddsItemKeep">4.85</span><span class="oddsItem oddsItemKeep">6.75</span></div>
											<div class="hhadOdds"><span class="oddsItem rLine oddsItemKeep">1.88</span><span class="oddsItem rLine oddsItemKeep">3.80</span><span class="oddsItem oddsItemKeep">3.00</span></div>
										</td>
										<td class="linkTd" style="width:74px;">
											<a href="http://info.sporttery.cn/football/info/fb_match_news.php?m=114506" target="_blank">讯</a>
											<a href="http://info.sporttery.cn/football/search_odds.php?mid=114506" target="_blank">同</a>
										</td>
										<td class="uOddsTd">
											<div class="hadU bLine"><span class="rLine" title="3136">74%</span><span class="rLine" title="598">14%</span><span title="527">12%</span></div>
											<div class="hhadU"><span class="rLine" title="1878">60%</span><span class="rLine" title="913">29%</span><span title="339">11%</span></div>
										</td>
										<td class="matchInfoTd">&nbsp;</td>
									</tr>
									<tr id="list_114507" singleindex="0" dataindex="0_6" class="listTr" lindex="4" bindex="1" line="1" style="display: table-row;">
										<td style="width:48px;">周五<br>007</td>
										<td title="荷兰乙级联赛" class="lname" style="background-color:#BE2B8F">荷乙</td>
										<td>12-08<br>03:00</td>
										<td style="width:50px;"><img title="微雨" src="http://static.sporttery.cn/www/images/weather_logo/sprinkle.png"><br>&nbsp;11°</td>
										<td title="点击VS进入对阵数据页,点击球队名称进入球队介绍页" onclick="toArrData(114507)" class="vsTd" style="width:300px;"><label>[荷乙13]</label>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=1531">福伦丹</a>
											<a onclick="stopEvent(event)" class="vsA" target="_blank" href="http://info.sporttery.cn/football/info/fb_match_info.php?m=114507">VS</a>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=1522">特温特</a><label>[荷乙5]</label></td>
										<td class="goalLineTd">
											<div title="胜平负" class="hadGL">0</div>
											<div title="让球胜平负" class="hhadGL"><label style="font-weight:normal;"></label>+1</div>
										</td>
										<td style="width:300px;" class="">
											<div class="hadOdds bLine"><span class="oddsItem rLine oddsItemKeep">2.75</span><span class="oddsItem rLine oddsItemKeep">3.65</span><span class="oddsItem oddsItemKeep">2.04</span></div>
											<div class="hhadOdds"><span class="oddsItem rLine oddsItemKeep">1.62</span><span class="oddsItem rLine oddsItemKeep">4.00</span><span class="oddsItem oddsItemKeep">3.85</span></div>
										</td>
										<td class="linkTd" style="width:74px;">
											<a href="http://info.sporttery.cn/football/info/fb_match_news.php?m=114507" target="_blank">讯</a>
											<a href="http://info.sporttery.cn/football/search_odds.php?mid=114507" target="_blank">同</a>
										</td>
										<td class="uOddsTd">
											<div class="hadU bLine"><span class="rLine" title="1028">23%</span><span class="rLine" title="1150">25%</span><span title="2379">52%</span></div>
											<div class="hhadU"><span class="rLine" title="749">40%</span><span class="rLine" title="677">36%</span><span title="436">23%</span></div>
										</td>
										<td class="matchInfoTd">&nbsp;</td>
									</tr>
									<tr id="list_114508" singleindex="0" dataindex="0_7" class="listTr" lindex="4" bindex="1" line="-1" style="display: table-row;">
										<td style="width:48px;">周五<br>008</td>
										<td title="荷兰乙级联赛" class="lname" style="background-color:#BE2B8F">荷乙</td>
										<td>12-08<br>03:00</td>
										<td style="width:50px;">未知<br>&nbsp;11°</td>
										<td title="点击VS进入对阵数据页,点击球队名称进入球队介绍页" onclick="toArrData(114508)" class="vsTd" style="width:300px;"><label>[荷乙2]</label>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=1540">前进之鹰</a>
											<a onclick="stopEvent(event)" class="vsA" target="_blank" href="http://info.sporttery.cn/football/info/fb_match_info.php?m=114508">VS</a>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=1534">海尔蒙特</a><label>[荷乙20]</label></td>
										<td class="goalLineTd">
											<div title="胜平负" class="hadGL">0</div>
											<div title="让球胜平负" class="hhadGL"><label style="font-weight:normal;"></label>-1</div>
										</td>
										<td style="width:300px;" class="">
											<div class="hadOdds bLine"><span class="oddsItem rLine oddsItemKeep">1.27</span><span class="oddsItem rLine oddsItemKeep">4.90</span><span class="oddsItem oddsItemKeep">7.25</span></div>
											<div class="hhadOdds"><span class="oddsItem rLine oddsItemKeep">1.88</span><span class="oddsItem rLine oddsItemKeep">3.65</span><span class="oddsItem oddsItemKeep">3.10</span></div>
										</td>
										<td class="linkTd" style="width:74px;">
											<a href="http://info.sporttery.cn/football/info/fb_match_news.php?m=114508" target="_blank">讯</a>
											<a href="http://info.sporttery.cn/football/search_odds.php?mid=114508" target="_blank">同</a>
										</td>
										<td class="uOddsTd">
											<div class="hadU bLine"><span class="rLine" title="4698">82%</span><span class="rLine" title="572">10%</span><span title="446">8%</span></div>
											<div class="hhadU"><span class="rLine" title="3754">71%</span><span class="rLine" title="1209">23%</span><span title="332">6%</span></div>
										</td>
										<td class="matchInfoTd">&nbsp;</td>
									</tr>
									<tr id="list_114509" singleindex="0" dataindex="0_8" class="listTr" lindex="4" bindex="1" line="-1" style="display: table-row;">
										<td style="width:48px;">周五<br>009</td>
										<td title="荷兰乙级联赛" class="lname" style="background-color:#BE2B8F">荷乙</td>
										<td>12-08<br>03:00</td>
										<td style="width:50px;"><img title="大致多云" src="http://static.sporttery.cn/www/images/weather_logo/cloudy.png"><br>&nbsp;12°</td>
										<td title="点击VS进入对阵数据页,点击球队名称进入球队介绍页" onclick="toArrData(114509)" class="vsTd" style="width:300px;"><label>[荷乙11]</label>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=4781">阿贾青年</a>
											<a onclick="stopEvent(event)" class="vsA" target="_blank" href="http://info.sporttery.cn/football/info/fb_match_info.php?m=114509">VS</a>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=1542">奥斯</a><label>[荷乙4]</label></td>
										<td class="goalLineTd">
											<div title="胜平负" class="hadGL">0</div>
											<div title="让球胜平负" class="hhadGL"><label style="font-weight:normal;"></label>-1</div>
										</td>
										<td style="width:300px;">
											<div class="hadOdds bLine"><span class="oddsItem rLine oddsItemKeep">1.46</span><span class="oddsItem rLine oddsItemKeep">4.20</span><span class="oddsItem oddsItemKeep">4.85</span></div>
											<div class="hhadOdds"><span class="oddsItem rLine oddsItemKeep">2.28</span><span class="oddsItem rLine oddsItemKeep">3.75</span><span class="oddsItem oddsItemKeep">2.36</span></div>
										</td>
										<td class="linkTd" style="width:74px;">
											<a href="http://info.sporttery.cn/football/info/fb_match_news.php?m=114509" target="_blank">讯</a>
											<a href="http://info.sporttery.cn/football/search_odds.php?mid=114509" target="_blank">同</a>
										</td>
										<td class="uOddsTd">
											<div class="hadU bLine"><span class="rLine" title="1947">46%</span><span class="rLine" title="830">19%</span><span title="1500">35%</span></div>
											<div class="hhadU"><span class="rLine" title="916">35%</span><span class="rLine" title="730">28%</span><span title="1003">38%</span></div>
										</td>
										<td class="matchInfoTd">&nbsp;</td>
									</tr>
									<tr id="list_114510" singleindex="0" dataindex="0_9" class="listTr" lindex="4" bindex="1" line="-1" style="display: table-row;">
										<td style="width:48px;">周五<br>010</td>
										<td title="荷兰乙级联赛" class="lname" style="background-color:#BE2B8F">荷乙</td>
										<td>12-08<br>03:00</td>
										<td style="width:50px;"><img title="雨" src="http://static.sporttery.cn/www/images/weather_logo/rain.png"><br>&nbsp;11°</td>
										<td title="点击VS进入对阵数据页,点击球队名称进入球队介绍页" onclick="toArrData(114510)" class="vsTd" style="width:300px;"><label>[荷乙16]</label>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=1526">瓦尔韦克</a>
											<a onclick="stopEvent(event)" class="vsA" target="_blank" href="http://info.sporttery.cn/football/info/fb_match_info.php?m=114510">VS</a>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=1550">马斯特里</a><label>[荷乙10]</label></td>
										<td class="goalLineTd">
											<div title="胜平负" class="hadGL">0</div>
											<div title="让球胜平负" class="hhadGL"><label style="font-weight:normal;"></label>-1</div>
										</td>
										<td style="width:300px;">
											<div class="hadOdds bLine"><span class="oddsItem rLine oddsItemKeep">2.00</span><span class="oddsItem rLine oddsItemKeep">3.40</span><span class="oddsItem oddsItemKeep">3.00</span></div>
											<div class="hhadOdds"><span class="oddsItem rLine oddsItemKeep">3.90</span><span class="oddsItem rLine oddsItemKeep">3.80</span><span class="oddsItem oddsItemKeep">1.64</span></div>
										</td>
										<td class="linkTd" style="width:74px;">
											<a href="http://info.sporttery.cn/football/info/fb_match_news.php?m=114510" target="_blank">讯</a>
											<a href="http://info.sporttery.cn/football/search_odds.php?mid=114510" target="_blank">同</a>
										</td>
										<td class="uOddsTd">
											<div class="hadU bLine"><span class="rLine" title="845">29%</span><span class="rLine" title="1143">39%</span><span title="911">31%</span></div>
											<div class="hhadU"><span class="rLine" title="201">14%</span><span class="rLine" title="337">23%</span><span title="899">63%</span></div>
										</td>
										<td class="matchInfoTd">&nbsp;</td>
									</tr>
									<tr id="list_114511" singleindex="0" dataindex="0_10" class="listTr" lindex="4" bindex="1" line="-1" style="display: table-row;">
										<td style="width:48px;">周五<br>011</td>
										<td title="荷兰乙级联赛" class="lname" style="background-color:#BE2B8F">荷乙</td>
										<td>12-08<br>03:00</td>
										<td style="width:50px;"><img title="微雨" src="http://static.sporttery.cn/www/images/weather_logo/sprinkle.png"><br>&nbsp;11°</td>
										<td title="点击VS进入对阵数据页,点击球队名称进入球队介绍页" onclick="toArrData(114511)" class="vsTd" style="width:300px;"><label>[荷乙7]</label>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=1520">罗达JC</a>
											<a onclick="stopEvent(event)" class="vsA" target="_blank" href="http://info.sporttery.cn/football/info/fb_match_info.php?m=114511">VS</a>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=1548">多德勒支</a><label>[荷乙18]</label></td>
										<td class="goalLineTd">
											<div title="胜平负" class="hadGL">0</div>
											<div title="让球胜平负" class="hhadGL"><label style="font-weight:normal;"></label>-1</div>
										</td>
										<td style="width:300px;">
											<div class="hadOdds bLine"><span class="oddsItem rLine oddsItemKeep">1.54</span><span class="oddsItem rLine oddsItemKeep">3.85</span><span class="oddsItem oddsItemKeep">4.55</span></div>
											<div class="hhadOdds"><span class="oddsItem rLine oddsItemKeep">2.54</span><span class="oddsItem rLine oddsItemKeep">3.65</span><span class="oddsItem oddsItemKeep">2.17</span></div>
										</td>
										<td class="linkTd" style="width:74px;">
											<a href="http://info.sporttery.cn/football/info/fb_match_news.php?m=114511" target="_blank">讯</a>
											<a href="http://info.sporttery.cn/football/search_odds.php?mid=114511" target="_blank">同</a>
										</td>
										<td class="uOddsTd">
											<div class="hadU bLine"><span class="rLine" title="5614">85%</span><span class="rLine" title="660">10%</span><span title="358">5%</span></div>
											<div class="hhadU"><span class="rLine" title="2027">61%</span><span class="rLine" title="976">29%</span><span title="307">9%</span></div>
										</td>
										<td class="matchInfoTd">&nbsp;</td>
									</tr>
									<tr id="list_114512" singleindex="0" dataindex="0_11" class="listTr" lindex="4" bindex="1" line="-1" style="display: table-row;">
										<td style="width:48px;">周五<br>012</td>
										<td title="荷兰乙级联赛" class="lname" style="background-color:#BE2B8F">荷乙</td>
										<td>12-08<br>03:00</td>
										<td style="width:50px;"><img title="多云" src="http://static.sporttery.cn/www/images/weather_logo/cloudy.png"><br>&nbsp;12°</td>
										<td title="点击VS进入对阵数据页,点击球队名称进入球队介绍页" onclick="toArrData(114512)" class="vsTd" style="width:300px;"><label>[荷乙3]</label>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=1535">鹿斯巴达</a>
											<a onclick="stopEvent(event)" class="vsA" target="_blank" href="http://info.sporttery.cn/football/info/fb_match_info.php?m=114512">VS</a>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=4529">阿尔梅勒</a><label>[荷乙6]</label></td>
										<td class="goalLineTd">
											<div title="胜平负" class="hadGL">0</div>
											<div title="让球胜平负" class="hhadGL"><label style="font-weight:normal;"></label>-1</div>
										</td>
										<td style="width:300px;">
											<div class="hadOdds bLine"><span class="oddsItem rLine oddsItemKeep">1.46</span><span class="oddsItem rLine oddsItemKeep">4.10</span><span class="oddsItem oddsItemKeep">5.00</span></div>
											<div class="hhadOdds"><span class="oddsItem rLine oddsItemKeep">2.31</span><span class="oddsItem rLine oddsItemKeep">3.65</span><span class="oddsItem oddsItemKeep">2.37</span></div>
										</td>
										<td class="linkTd" style="width:74px;">
											<a href="http://info.sporttery.cn/football/info/fb_match_news.php?m=114512" target="_blank">讯</a>
											<a href="http://info.sporttery.cn/football/search_odds.php?mid=114512" target="_blank">同</a>
										</td>
										<td class="uOddsTd">
											<div class="hadU bLine"><span class="rLine" title="2782">63%</span><span class="rLine" title="941">21%</span><span title="675">15%</span></div>
											<div class="hhadU"><span class="rLine" title="825">34%</span><span class="rLine" title="1098">45%</span><span title="494">20%</span></div>
										</td>
										<td class="matchInfoTd">&nbsp;</td>
									</tr>
									<tr id="list_114513" singleindex="0" dataindex="0_12" class="listTr" lindex="5" bindex="1" line="-1" style="display: table-row;">
										<td style="width:48px;">周五<br>013</td>
										<td title="德国甲级联赛" class="lname" style="background-color:#990099">德甲</td>
										<td>12-08<br>03:30</td>
										<td style="width:50px;"><img title="微雨" src="http://static.sporttery.cn/www/images/weather_logo/sprinkle.png"><br>&nbsp;11°</td>
										<td title="点击VS进入对阵数据页,点击球队名称进入球队介绍页" onclick="toArrData(114513)" class="vsTd" style="width:300px;"><label>[德甲9]</label>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=960">不来梅</a>
											<a onclick="stopEvent(event)" class="vsA" target="_blank" href="http://info.sporttery.cn/football/info/fb_match_info.php?m=114513">VS</a>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=1029">杜塞多夫</a><label>[德甲18]</label></td>
										<td class="goalLineTd">
											<div title="胜平负" class="hadGL">0</div>
											<div title="让球胜平负" class="hhadGL"><label style="font-weight:normal;"></label>-1</div>
										</td>
										<td style="width:300px;">
											<div class="hadOdds bLine"><span class="oddsItem rLine oddsItemKeep">1.55</span><span class="oddsItem rLine oddsItemKeep">3.95</span><span class="oddsItem oddsItemKeep">4.35</span></div>
											<div class="hhadOdds"><span class="oddsItem rLine oddsItemKeep">2.56</span><span class="oddsItem rLine oddsItemKeep">3.65</span><span class="oddsItem oddsItemKeep">2.15</span></div>
										</td>
										<td class="linkTd" style="width:74px;">
											<a href="http://info.sporttery.cn/football/info/fb_match_news.php?m=114513" target="_blank">讯</a>
											<a href="http://info.sporttery.cn/football/search_odds.php?mid=114513" target="_blank">同</a>
										</td>
										<td class="uOddsTd">
											<div class="hadU bLine"><span class="rLine" title="4956">72%</span><span class="rLine" title="1295">19%</span><span title="627">9%</span></div>
											<div class="hhadU"><span class="rLine" title="1415">39%</span><span class="rLine" title="1437">40%</span><span title="761">21%</span></div>
										</td>
										<td class="matchInfoTd">&nbsp;</td>
									</tr>
									<tr id="list_114514" singleindex="1" dataindex="0_13" class="listTr" lindex="6" bindex="1" line="-1" style="display: table-row;">
										<td style="width:48px;">周五<br>014</td>
										<td title="意大利甲级联赛" class="lname" style="background-color:#0066FF">意甲</td>
										<td>12-08<br>03:30</td>
										<td style="width:50px;"><img title="天晴" src="http://static.sporttery.cn/www/images/weather_logo/sunny.png"><br>&nbsp;2°</td>
										<td title="点击VS进入对阵数据页,点击球队名称进入球队介绍页" onclick="toArrData(114514)" class="vsTd" style="width:300px;"><label>[意甲1]</label>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=1242">尤文图斯</a>
											<a onclick="stopEvent(event)" class="vsA" target="_blank" href="http://info.sporttery.cn/football/info/fb_match_info.php?m=114514">VS</a>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=1244">国际米兰</a><label>[意甲3]</label></td>
										<td class="goalLineTd">
											<div title="胜平负" class="hadGL" style="background-image:url(./images/single.gif);background-repeat:no-repeat;background-position:left top;">0</div>
											<div title="让球胜平负" class="hhadGL"><label style="font-weight:normal;"></label>-1</div>
										</td>
										<td style="width:300px;">
											<div class="hadOdds bLine"><span class="oddsItem rLine oddsItemKeep">1.42</span><span class="oddsItem rLine oddsItemKeep">3.85</span><span class="oddsItem oddsItemKeep">6.05</span></div>
											<div class="hhadOdds"><span class="oddsItem rLine oddsItemKeep">2.37</span><span class="oddsItem rLine oddsItemKeep">3.35</span><span class="oddsItem oddsItemKeep">2.45</span></div>
										</td>
										<td class="linkTd" style="width:74px;">
											<a href="http://info.sporttery.cn/football/info/fb_match_news.php?m=114514" target="_blank">讯</a>
											<a href="http://info.sporttery.cn/football/search_odds.php?mid=114514" target="_blank">同</a>
										</td>
										<td class="uOddsTd">
											<div class="hadU bLine"><span class="rLine" title="7385">67%</span><span class="rLine" title="2561">23%</span><span title="1153">10%</span></div>
											<div class="hhadU"><span class="rLine" title="2449">36%</span><span class="rLine" title="3231">47%</span><span title="1181">17%</span></div>
										</td>
										<td class="matchInfoTd">&nbsp;</td>
									</tr>
									<tr id="list_114515" singleindex="0" dataindex="0_14" class="listTr" lindex="7" bindex="1" line="1" style="display: table-row;">
										<td style="width:48px;">周五<br>015</td>
										<td title="比利时甲级联赛" class="lname" style="background-color:#ff9900">比甲</td>
										<td>12-08<br>03:30</td>
										<td style="width:50px;"><img title="毛毛雨" src="http://static.sporttery.cn/www/images/weather_logo/sprinkle.png"><br>&nbsp;11°</td>
										<td title="点击VS进入对阵数据页,点击球队名称进入球队介绍页" onclick="toArrData(114515)" class="vsTd" style="width:300px;"><label>[比甲16]</label>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=250">贝弗伦</a>
											<a onclick="stopEvent(event)" class="vsA" target="_blank" href="http://info.sporttery.cn/football/info/fb_match_info.php?m=114515">VS</a>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=219">布鲁日</a><label>[比甲2]</label></td>
										<td class="goalLineTd">
											<div title="胜平负" class="hadGL">0</div>
											<div title="让球胜平负" class="hhadGL"><label style="font-weight:normal;"></label>+1</div>
										</td>
										<td style="width:300px;">
											<div class="hadOdds bLine"><span class="oddsItem rLine oddsItemKeep">8.00</span><span class="oddsItem rLine oddsItemKeep">4.75</span><span class="oddsItem oddsItemKeep">1.26</span></div>
											<div class="hhadOdds"><span class="oddsItem rLine oddsItemKeep">3.10</span><span class="oddsItem rLine oddsItemKeep">3.75</span><span class="oddsItem oddsItemKeep">1.85</span></div>
										</td>
										<td class="linkTd" style="width:74px;">
											<a href="http://info.sporttery.cn/football/info/fb_match_news.php?m=114515" target="_blank">讯</a>
											<a href="http://info.sporttery.cn/football/search_odds.php?mid=114515" target="_blank">同</a>
										</td>
										<td class="uOddsTd">
											<div class="hadU bLine"><span class="rLine" title="488">13%</span><span class="rLine" title="552">15%</span><span title="2725">72%</span></div>
											<div class="hhadU"><span class="rLine" title="398">11%</span><span class="rLine" title="1087">31%</span><span title="2076">58%</span></div>
										</td>
										<td class="matchInfoTd">&nbsp;</td>
									</tr>
									<tr id="list_114516" singleindex="0" dataindex="0_15" class="listTr" lindex="8" bindex="1" line="-1" style="display: table-row;">
										<td style="width:48px;">周五<br>016</td>
										<td title="法国甲级联赛" class="lname" style="background-color:#6B2B2B">法甲</td>
										<td>12-08<br>03:45</td>
										<td style="width:50px;"><img title="天晴" src="http://static.sporttery.cn/www/images/weather_logo/sunny.png"><br>&nbsp;10°</td>
										<td title="点击VS进入对阵数据页,点击球队名称进入球队介绍页" onclick="toArrData(114516)" class="vsTd" style="width:300px;"><label>[法甲18]</label>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=885">摩纳哥</a>
											<a onclick="stopEvent(event)" class="vsA" target="_blank" href="http://info.sporttery.cn/football/info/fb_match_info.php?m=114516">VS</a>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=894">尼斯</a><label>[法甲7]</label></td>
										<td class="goalLineTd">
											<div title="胜平负" class="hadGL">0</div>
											<div title="让球胜平负" class="hhadGL"><label style="font-weight:normal;"></label>-1</div>
										</td>
										<td style="width:300px;">
											<div class="hadOdds bLine"><span class="oddsItem rLine oddsItemKeep oddsDis">2.22</span><span class="oddsItem rLine oddsItemKeep oddsDis">3.00</span><span class="oddsItem oddsItemKeep oddsDis">2.90</span></div>
											<div class="hhadOdds"><span class="oddsItem rLine oddsItemKeep oddsDis">4.80</span><span class="oddsItem rLine oddsItemKeep oddsDis">3.80</span><span class="oddsItem oddsItemKeep oddsDis">1.52</span></div>
										</td>
										<td class="linkTd" style="width:74px;">
											<a href="http://info.sporttery.cn/football/info/fb_match_news.php?m=114516" target="_blank">讯</a>
											<a href="http://info.sporttery.cn/football/search_odds.php?mid=114516" target="_blank">同</a>
										</td>
										<td class="uOddsTd">
											<div class="hadU bLine"><span class="rLine" title="466">39%</span><span class="rLine" title="366">31%</span><span title="361">30%</span></div>
											<div class="hhadU"><span class="rLine" title="142">23%</span><span class="rLine" title="155">25%</span><span title="330">53%</span></div>
										</td>
										<td class="matchInfoTd">&nbsp;</td>
									</tr>
									<tr id="list_114517" singleindex="0" dataindex="0_16" class="listTr" lindex="3" bindex="1" line="-3" style="display: table-row;">
										<td style="width:48px;">周五<br>017</td>
										<td title="荷兰甲级联赛" class="lname" style="background-color:#FF6699">荷甲</td>
										<td>12-08<br>03:45</td>
										<td style="width:50px;"><img title="微雨" src="http://static.sporttery.cn/www/images/weather_logo/sprinkle.png"><br>&nbsp;11°</td>
										<td title="点击VS进入对阵数据页,点击球队名称进入球队介绍页" onclick="toArrData(114517)" class="vsTd" style="width:300px;"><label>[荷甲1]</label>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=1517">埃因霍温</a>
											<a onclick="stopEvent(event)" class="vsA" target="_blank" href="http://info.sporttery.cn/football/info/fb_match_info.php?m=114517">VS</a>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=1532">SBV精英</a><label>[荷甲12]</label></td>
										<td class="goalLineTd">
											<div title="胜平负" class="hadGL">未开售</div>
											<div title="让球胜平负" class="hhadGL"><label style="font-weight:normal;"></label>-3</div>
										</td>
										<td style="width:300px;">
											<div class="hadOdds bLine"><span class="oddsItem rLine ">--</span><span class="oddsItem rLine ">--</span><span class="oddsItem ">--</span></div>
											<div class="hhadOdds"><span class="oddsItem rLine oddsItemKeep">2.50</span><span class="oddsItem rLine oddsItemKeep">4.50</span><span class="oddsItem oddsItemKeep">1.97</span></div>
										</td>
										<td class="linkTd" style="width:74px;">
											<a href="http://info.sporttery.cn/football/info/fb_match_news.php?m=114517" target="_blank">讯</a>
											<a href="http://info.sporttery.cn/football/search_odds.php?mid=114517" target="_blank">同</a>
										</td>
										<td class="uOddsTd">
											<div class="hadU bLine"><span class="rLine">--</span><span class="rLine">--</span><span>--</span></div>
											<div class="hhadU"><span class="rLine" title="1615">25%</span><span class="rLine" title="2077">33%</span><span title="2642">42%</span></div>
										</td>
										<td class="matchInfoTd">&nbsp;</td>
									</tr>
									<tr id="list_114518" singleindex="0" dataindex="0_17" class="listTr" lindex="9" bindex="1" line="-1" style="display: table-row;">
										<td style="width:48px;">周五<br>018</td>
										<td title="英格兰冠军联赛" class="lname" style="background-color:#CC3300">英冠</td>
										<td>12-08<br>04:00</td>
										<td style="width:50px;"><img title="毛毛雨" src="http://static.sporttery.cn/www/images/weather_logo/sprinkle.png"><br>&nbsp;12°</td>
										<td title="点击VS进入对阵数据页,点击球队名称进入球队介绍页" onclick="toArrData(114518)" class="vsTd" style="width:300px;"><label>[英冠3]</label>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=678">西布罗姆</a>
											<a onclick="stopEvent(event)" class="vsA" target="_blank" href="http://info.sporttery.cn/football/info/fb_match_info.php?m=114518">VS</a>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=665">维拉</a><label>[英冠8]</label></td>
										<td class="goalLineTd">
											<div title="胜平负" class="hadGL">0</div>
											<div title="让球胜平负" class="hhadGL"><label style="font-weight:normal;"></label>-1</div>
										</td>
										<td style="width:300px;">
											<div class="hadOdds bLine"><span class="oddsItem rLine oddsItemKeep">2.12</span><span class="oddsItem rLine oddsItemKeep">3.45</span><span class="oddsItem oddsItemKeep">2.72</span></div>
											<div class="hhadOdds"><span class="oddsItem rLine oddsItemKeep">4.30</span><span class="oddsItem rLine oddsItemKeep">4.00</span><span class="oddsItem oddsItemKeep">1.55</span></div>
										</td>
										<td class="linkTd" style="width:74px;">
											<a href="http://info.sporttery.cn/football/info/fb_match_news.php?m=114518" target="_blank">讯</a>
											<a href="http://info.sporttery.cn/football/search_odds.php?mid=114518" target="_blank">同</a>
										</td>
										<td class="uOddsTd">
											<div class="hadU bLine"><span class="rLine" title="2592">50%</span><span class="rLine" title="1691">33%</span><span title="867">17%</span></div>
											<div class="hhadU"><span class="rLine" title="509">24%</span><span class="rLine" title="824">39%</span><span title="765">36%</span></div>
										</td>
										<td class="matchInfoTd">&nbsp;</td>
									</tr>
									<tr id="list_114519" singleindex="0" dataindex="0_18" class="listTr" lindex="10" bindex="1" line="-1" style="display: table-row;">
										<td style="width:48px;">周五<br>019</td>
										<td title="西班牙甲级联赛" class="lname" style="background-color:#006633">西甲</td>
										<td>12-08<br>04:00</td>
										<td style="width:50px;"><img title="天晴" src="http://static.sporttery.cn/www/images/weather_logo/sunny.png"><br>&nbsp;2°</td>
										<td title="点击VS进入对阵数据页,点击球队名称进入球队介绍页" onclick="toArrData(114519)" class="vsTd" style="width:300px;"><label>[西甲16]</label>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=2053">莱加内斯</a>
											<a onclick="stopEvent(event)" class="vsA" target="_blank" href="http://info.sporttery.cn/football/info/fb_match_info.php?m=114519">VS</a>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=2039">赫塔费</a><label>[西甲9]</label></td>
										<td class="goalLineTd">
											<div title="胜平负" class="hadGL">0</div>
											<div title="让球胜平负" class="hhadGL"><label style="font-weight:normal;"></label>-1</div>
										</td>
										<td style="width:300px;">
											<div class="hadOdds bLine"><span class="oddsItem rLine oddsItemKeep">2.62</span><span class="oddsItem rLine oddsItemKeep">2.70</span><span class="oddsItem oddsItemKeep">2.65</span></div>
											<div class="hhadOdds"><span class="oddsItem rLine oddsItemKeep">7.25</span><span class="oddsItem rLine oddsItemKeep">3.90</span><span class="oddsItem oddsItemKeep">1.36</span></div>
										</td>
										<td class="linkTd" style="width:74px;">
											<a href="http://info.sporttery.cn/football/info/fb_match_news.php?m=114519" target="_blank">讯</a>
											<a href="http://info.sporttery.cn/football/search_odds.php?mid=114519" target="_blank">同</a>
										</td>
										<td class="uOddsTd">
											<div class="hadU bLine"><span class="rLine" title="1045">21%</span><span class="rLine" title="2327">47%</span><span title="1585">32%</span></div>
											<div class="hhadU"><span class="rLine" title="598">24%</span><span class="rLine" title="598">24%</span><span title="1254">51%</span></div>
										</td>
										<td class="matchInfoTd">&nbsp;</td>
									</tr>
									<tr id="list_114520" singleindex="0" dataindex="0_19" class="listTr" lindex="11" bindex="1" line="-2" style="display: table-row;">
										<td style="width:48px;">周五<br>020</td>
										<td title="葡萄牙超级联赛" class="lname" style="background-color:#008888">葡超</td>
										<td>12-08<br>04:30</td>
										<td style="width:50px;"><img title="大致多云" src="http://static.sporttery.cn/www/images/weather_logo/cloudy.png"><br>&nbsp;12°</td>
										<td title="点击VS进入对阵数据页,点击球队名称进入球队介绍页" onclick="toArrData(114520)" class="vsTd" style="width:300px;"><label>[葡超1]</label>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=1678">波尔图</a>
											<a onclick="stopEvent(event)" class="vsA" target="_blank" href="http://info.sporttery.cn/football/info/fb_match_info.php?m=114520">VS</a>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=1710">波尔蒂芒</a><label>[葡超11]</label></td>
										<td class="goalLineTd">
											<div title="胜平负" class="hadGL">未开售</div>
											<div title="让球胜平负" class="hhadGL"><label style="font-weight:normal;"></label>-2</div>
										</td>
										<td style="width:300px;" class="">
											<div class="hadOdds bLine"><span class="oddsItem rLine ">--</span><span class="oddsItem rLine ">--</span><span class="oddsItem ">--</span></div>
											<div class="hhadOdds"><span class="oddsItem rLine oddsItemKeep">2.12</span><span class="oddsItem rLine oddsItemKeep">4.00</span><span class="oddsItem oddsItemKeep">2.45</span></div>
										</td>
										<td class="linkTd" style="width:74px;">
											<a href="http://info.sporttery.cn/football/info/fb_match_news.php?m=114520" target="_blank">讯</a>
											<a href="http://info.sporttery.cn/football/search_odds.php?mid=114520" target="_blank">同</a>
										</td>
										<td class="uOddsTd">
											<div class="hadU bLine"><span class="rLine">--</span><span class="rLine">--</span><span>--</span></div>
											<div class="hhadU"><span class="rLine" title="2927">45%</span><span class="rLine" title="2786">43%</span><span title="765">12%</span></div>
										</td>
										<td class="matchInfoTd">&nbsp;</td>
									</tr>
									<tr id="list_114521" singleindex="0" dataindex="0_20" class="listTr" lindex="12" bindex="1" line="-1" style="display: table-row;">
										<td style="width:48px;">周五<br>021</td>
										<td title="阿根廷甲级联赛" class="lname" style="background-color:#0CB9E4">阿甲</td>
										<td>12-08<br>08:00</td>
										<td style="width:50px;"><img title="多云" src="http://static.sporttery.cn/www/images/weather_logo/cloudy.png"><br>&nbsp;0°</td>
										<td title="点击VS进入对阵数据页,点击球队名称进入球队介绍页" onclick="toArrData(114521)" class="vsTd" style="width:300px;"><label>[阿甲17]</label>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=6961">图圣马丁</a>
											<a onclick="stopEvent(event)" class="vsA" target="_blank" href="http://info.sporttery.cn/football/info/fb_match_info.php?m=114521">VS</a>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=102">老男孩</a><label>[阿甲18]</label></td>
										<td class="goalLineTd">
											<div title="胜平负" class="hadGL">0</div>
											<div title="让球胜平负" class="hhadGL"><label style="font-weight:normal;"></label>-1</div>
										</td>
										<td style="width:300px;">
											<div class="hadOdds bLine"><span class="oddsItem rLine oddsItemKeep">2.47</span><span class="oddsItem rLine oddsItemKeep">2.84</span><span class="oddsItem oddsItemKeep">2.69</span></div>
											<div class="hhadOdds"><span class="oddsItem rLine oddsItemKeep">5.95</span><span class="oddsItem rLine oddsItemKeep">3.90</span><span class="oddsItem oddsItemKeep">1.42</span></div>
										</td>
										<td class="linkTd" style="width:74px;">
											<a href="http://info.sporttery.cn/football/info/fb_match_news.php?m=114521" target="_blank">讯</a>
											<a href="http://info.sporttery.cn/football/search_odds.php?mid=114521" target="_blank">同</a>
										</td>
										<td class="uOddsTd">
											<div class="hadU bLine"><span class="rLine" title="1320">49%</span><span class="rLine" title="1075">40%</span><span title="321">12%</span></div>
											<div class="hhadU"><span class="rLine" title="533">42%</span><span class="rLine" title="485">38%</span><span title="257">20%</span></div>
										</td>
										<td class="matchInfoTd">&nbsp;</td>
									</tr>
									<tr>
										<td class="bDateTd" colspan="10" bindex="2">周六 2018-12-08&nbsp;&nbsp;&nbsp;共<label>51</label>场比赛&nbsp;&nbsp;&nbsp;
											<a href="javascript:void(0);" class="bDateHide">[显示]</a>
										</td>
									</tr>
									<tr id="list_114532" singleindex="0" dataindex="1_0" class="listTr" lindex="13" bindex="2" line="1" style="display: none;">
										<td style="width: 48px;">周六<br>001</td>
										<td title="韩国足总杯" class="lname" style="background-color: rgb(0, 153, 255); width: 73px;">韩足总杯</td>
										<td style="width: 49px;">12-08<br>12:30</td>
										<td style="width: 49px;"><img title="大致多云" src="http://static.sporttery.cn/www/images/weather_logo/cloudy.png"><br>&nbsp;-2°</td>
										<td title="点击VS进入对阵数据页,点击球队名称进入球队介绍页" onclick="toArrData(114532)" class="vsTd" style="width: 301px;"><label></label>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=1373">大邱FC</a>
											<a onclick="stopEvent(event)" class="vsA" target="_blank" href="http://info.sporttery.cn/football/info/fb_match_info.php?m=114532">VS</a>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=1374">蔚山现代</a><label></label></td>
										<td class="goalLineTd" style="width: 61px;">
											<div title="胜平负" class="hadGL">0</div>
											<div title="让球胜平负" class="hhadGL"><label style="font-weight:normal;"></label>+1</div>
										</td>
										<td style="width: 301px;">
											<div class="hadOdds bLine"><span class="oddsItem rLine oddsItemKeep">3.00</span><span class="oddsItem rLine oddsItemKeep">3.25</span><span class="oddsItem oddsItemKeep">2.05</span></div>
											<div class="hhadOdds"><span class="oddsItem rLine oddsItemKeep">1.61</span><span class="oddsItem rLine oddsItemKeep">3.80</span><span class="oddsItem oddsItemKeep">4.10</span></div>
										</td>
										<td class="linkTd" style="width: 73px;">
											<a href="http://info.sporttery.cn/football/info/fb_match_news.php?m=114532" target="_blank">讯</a>
											<a href="http://info.sporttery.cn/football/search_odds.php?mid=114532" target="_blank">同</a>
										</td>
										<td class="uOddsTd" style="width: 136px;">
											<div class="hadU bLine"><span class="rLine" title="134">24%</span><span class="rLine" title="128">23%</span><span title="305">54%</span></div>
											<div class="hhadU"><span class="rLine" title="134">44%</span><span class="rLine" title="74">24%</span><span title="100">32%</span></div>
										</td>
										<td class="matchInfoTd" style="width: 81px;">&nbsp;</td>
									</tr>
									<tr id="list_114533" singleindex="0" dataindex="1_1" class="listTr" lindex="14" bindex="2" line="-1" style="display: none;">
										<td>周六<br>002</td>
										<td title="日本职业联赛" class="lname" style="background-color:#009900">日职</td>
										<td>12-08<br>13:00</td>
										<td><img title="大致多云" src="http://static.sporttery.cn/www/images/weather_logo/cloudy.png"><br>&nbsp;17°</td>
										<td title="点击VS进入对阵数据页,点击球队名称进入球队介绍页" onclick="toArrData(114533)" class="vsTd"><label></label>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=1320">磐田喜悦</a>
											<a onclick="stopEvent(event)" class="vsA" target="_blank" href="http://info.sporttery.cn/football/info/fb_match_info.php?m=114533">VS</a>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=1332">东京绿茵</a><label></label></td>
										<td class="goalLineTd">
											<div title="胜平负" class="hadGL">0</div>
											<div title="让球胜平负" class="hhadGL"><label style="font-weight:normal;"></label>-1</div>
										</td>
										<td>
											<div class="hadOdds bLine"><span class="oddsItem rLine oddsItemKeep">2.00</span><span class="oddsItem rLine oddsItemKeep">3.00</span><span class="oddsItem oddsItemKeep">3.40</span></div>
											<div class="hhadOdds"><span class="oddsItem rLine oddsItemKeep">4.30</span><span class="oddsItem rLine oddsItemKeep">3.50</span><span class="oddsItem oddsItemKeep">1.64</span></div>
										</td>
										<td class="linkTd">
											<a href="http://info.sporttery.cn/football/info/fb_match_news.php?m=114533" target="_blank">讯</a>
											<a href="http://info.sporttery.cn/football/search_odds.php?mid=114533" target="_blank">同</a>
										</td>
										<td class="uOddsTd">
											<div class="hadU bLine"><span class="rLine" title="347">68%</span><span class="rLine" title="108">21%</span><span title="57">11%</span></div>
											<div class="hhadU"><span class="rLine" title="93">47%</span><span class="rLine" title="51">26%</span><span title="54">27%</span></div>
										</td>
										<td class="matchInfoTd">&nbsp;</td>
									</tr>
									<tr id="list_114534" singleindex="0" dataindex="1_2" class="listTr" lindex="1" bindex="2" line="-1" style="display: none;">
										<td>周六<br>003</td>
										<td title="澳大利亚超级联赛" class="lname" style="background-color:#FF7000">澳超</td>
										<td>12-08<br>14:35</td>
										<td><img title="天晴" src="http://static.sporttery.cn/www/images/weather_logo/sunny.png"><br>&nbsp;26°</td>
										<td title="点击VS进入对阵数据页,点击球队名称进入球队介绍页" onclick="toArrData(114534)" class="vsTd"><label>[澳超3]</label>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=4295">悉尼FC</a>
											<a onclick="stopEvent(event)" class="vsA" target="_blank" href="http://info.sporttery.cn/football/info/fb_match_info.php?m=114534">VS</a>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=8542">惠灵顿</a><label>[澳超9]</label></td>
										<td class="goalLineTd">
											<div title="胜平负" class="hadGL">0</div>
											<div title="让球胜平负" class="hhadGL"><label style="font-weight:normal;"></label>-1</div>
										</td>
										<td>
											<div class="hadOdds bLine"><span class="oddsItem rLine oddsItemKeep">1.26</span><span class="oddsItem rLine oddsItemKeep">4.75</span><span class="oddsItem oddsItemKeep">8.00</span></div>
											<div class="hhadOdds"><span class="oddsItem rLine oddsItemKeep">1.85</span><span class="oddsItem rLine oddsItemKeep">3.70</span><span class="oddsItem oddsItemKeep">3.15</span></div>
										</td>
										<td class="linkTd">
											<a href="http://info.sporttery.cn/football/info/fb_match_news.php?m=114534" target="_blank">讯</a>
											<a href="http://info.sporttery.cn/football/search_odds.php?mid=114534" target="_blank">同</a>
										</td>
										<td class="uOddsTd">
											<div class="hadU bLine"><span class="rLine" title="456">89%</span><span class="rLine" title="26">5%</span><span title="31">6%</span></div>
											<div class="hhadU"><span class="rLine" title="348">80%</span><span class="rLine" title="65">15%</span><span title="21">5%</span></div>
										</td>
										<td class="matchInfoTd">&nbsp;</td>
									</tr>
									<tr id="list_114535" singleindex="0" dataindex="1_3" class="listTr" lindex="1" bindex="2" line="-1" style="display: none;">
										<td>周六<br>004</td>
										<td title="澳大利亚超级联赛" class="lname" style="background-color:#FF7000">澳超</td>
										<td>12-08<br>16:50</td>
										<td><img title="天晴" src="http://static.sporttery.cn/www/images/weather_logo/sunny.png"><br>&nbsp;37°</td>
										<td title="点击VS进入对阵数据页,点击球队名称进入球队介绍页" onclick="toArrData(114535)" class="vsTd"><label>[澳超2]</label>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=4318">墨胜利</a>
											<a onclick="stopEvent(event)" class="vsA" target="_blank" href="http://info.sporttery.cn/football/info/fb_match_info.php?m=114535">VS</a>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=143">阿德莱德</a><label>[澳超4]</label></td>
										<td class="goalLineTd">
											<div title="胜平负" class="hadGL">0</div>
											<div title="让球胜平负" class="hhadGL"><label style="font-weight:normal;"></label>-1</div>
										</td>
										<td>
											<div class="hadOdds bLine"><span class="oddsItem rLine oddsItemKeep">1.73</span><span class="oddsItem rLine oddsItemKeep">3.60</span><span class="oddsItem oddsItemKeep">3.65</span></div>
											<div class="hhadOdds"><span class="oddsItem rLine oddsItemKeep">3.20</span><span class="oddsItem rLine oddsItemKeep">3.55</span><span class="oddsItem oddsItemKeep">1.88</span></div>
										</td>
										<td class="linkTd">
											<a href="http://info.sporttery.cn/football/info/fb_match_news.php?m=114535" target="_blank">讯</a>
											<a href="http://info.sporttery.cn/football/search_odds.php?mid=114535" target="_blank">同</a>
										</td>
										<td class="uOddsTd">
											<div class="hadU bLine"><span class="rLine" title="275">74%</span><span class="rLine" title="60">16%</span><span title="37">10%</span></div>
											<div class="hhadU"><span class="rLine" title="55">38%</span><span class="rLine" title="53">37%</span><span title="35">24%</span></div>
										</td>
										<td class="matchInfoTd">&nbsp;</td>
									</tr>
									<tr id="list_114537" singleindex="0" dataindex="1_4" class="listTr" lindex="1" bindex="2" line="-1" style="display: none;">
										<td>周六<br>006</td>
										<td title="澳大利亚超级联赛" class="lname" style="background-color:#FF7000">澳超</td>
										<td>12-08<br>19:00</td>
										<td><img title="大致多云" src="http://static.sporttery.cn/www/images/weather_logo/cloudy.png"><br>&nbsp;22°</td>
										<td title="点击VS进入对阵数据页,点击球队名称进入球队介绍页" onclick="toArrData(114537)" class="vsTd"><label>[澳超1]</label>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=152">珀斯</a>
											<a onclick="stopEvent(event)" class="vsA" target="_blank" href="http://info.sporttery.cn/football/info/fb_match_info.php?m=114537">VS</a>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=15320">墨尔本城</a><label>[澳超5]</label></td>
										<td class="goalLineTd">
											<div title="胜平负" class="hadGL">0</div>
											<div title="让球胜平负" class="hhadGL"><label style="font-weight:normal;"></label>-1</div>
										</td>
										<td>
											<div class="hadOdds bLine"><span class="oddsItem rLine oddsItemKeep">1.96</span><span class="oddsItem rLine oddsItemKeep">3.30</span><span class="oddsItem oddsItemKeep">3.16</span></div>
											<div class="hhadOdds"><span class="oddsItem rLine oddsItemKeep">3.90</span><span class="oddsItem rLine oddsItemKeep">3.70</span><span class="oddsItem oddsItemKeep">1.66</span></div>
										</td>
										<td class="linkTd">
											<a href="http://info.sporttery.cn/football/info/fb_match_news.php?m=114537" target="_blank">讯</a>
											<a href="http://info.sporttery.cn/football/search_odds.php?mid=114537" target="_blank">同</a>
										</td>
										<td class="uOddsTd">
											<div class="hadU bLine"><span class="rLine" title="262">71%</span><span class="rLine" title="61">16%</span><span title="48">13%</span></div>
											<div class="hhadU"><span class="rLine" title="33">28%</span><span class="rLine" title="46">39%</span><span title="39">33%</span></div>
										</td>
										<td class="matchInfoTd">&nbsp;</td>
									</tr>
									<tr id="list_114538" singleindex="0" dataindex="1_5" class="listTr" lindex="2" bindex="2" line="-1" style="display: none;">
										<td>周六<br>007</td>
										<td title="德国乙级联赛" class="lname" style="background-color:#DB31EE">德乙</td>
										<td>12-08<br>20:00</td>
										<td>未知<br>&nbsp;</td>
										<td title="点击VS进入对阵数据页,点击球队名称进入球队介绍页" onclick="toArrData(114538)" class="vsTd"><label>[德乙8]</label>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=986">菲尔特</a>
											<a onclick="stopEvent(event)" class="vsA" target="_blank" href="http://info.sporttery.cn/football/info/fb_match_info.php?m=114538">VS</a>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=985">奥厄</a><label>[德乙13]</label></td>
										<td class="goalLineTd">
											<div title="胜平负" class="hadGL">0</div>
											<div title="让球胜平负" class="hhadGL"><label style="font-weight:normal;"></label>-1</div>
										</td>
										<td>
											<div class="hadOdds bLine"><span class="oddsItem rLine oddsItemKeep">1.95</span><span class="oddsItem rLine oddsItemKeep">3.25</span><span class="oddsItem oddsItemKeep">3.25</span></div>
											<div class="hhadOdds"><span class="oddsItem rLine oddsItemKeep">4.05</span><span class="oddsItem rLine oddsItemKeep">3.55</span><span class="oddsItem oddsItemKeep">1.67</span></div>
										</td>
										<td class="linkTd">
											<a href="http://info.sporttery.cn/football/info/fb_match_news.php?m=114538" target="_blank">讯</a>
											<a href="http://info.sporttery.cn/football/search_odds.php?mid=114538" target="_blank">同</a>
										</td>
										<td class="uOddsTd">
											<div class="hadU bLine"><span class="rLine" title="213">71%</span><span class="rLine" title="67">22%</span><span title="19">6%</span></div>
											<div class="hhadU"><span class="rLine" title="27">34%</span><span class="rLine" title="37">47%</span><span title="15">19%</span></div>
										</td>
										<td class="matchInfoTd">&nbsp;</td>
									</tr>
									<tr id="list_114539" singleindex="0" dataindex="1_6" class="listTr" lindex="2" bindex="2" line="-1" style="display: none;">
										<td>周六<br>008</td>
										<td title="德国乙级联赛" class="lname" style="background-color:#DB31EE">德乙</td>
										<td>12-08<br>20:00</td>
										<td><img title="大致多云" src="http://static.sporttery.cn/www/images/weather_logo/cloudy.png"><br>&nbsp;12°</td>
										<td title="点击VS进入对阵数据页,点击球队名称进入球队介绍页" onclick="toArrData(114539)" class="vsTd"><label>[德乙12]</label>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=2549">达姆施塔</a>
											<a onclick="stopEvent(event)" class="vsA" target="_blank" href="http://info.sporttery.cn/football/info/fb_match_info.php?m=114539">VS</a>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=5476">因戈施塔</a><label>[德乙18]</label></td>
										<td class="goalLineTd">
											<div title="胜平负" class="hadGL">0</div>
											<div title="让球胜平负" class="hhadGL"><label style="font-weight:normal;"></label>-1</div>
										</td>
										<td>
											<div class="hadOdds bLine"><span class="oddsItem rLine oddsItemKeep">2.20</span><span class="oddsItem rLine oddsItemKeep">3.15</span><span class="oddsItem oddsItemKeep">2.80</span></div>
											<div class="hhadOdds"><span class="oddsItem rLine oddsItemKeep">4.80</span><span class="oddsItem rLine oddsItemKeep">3.80</span><span class="oddsItem oddsItemKeep">1.52</span></div>
										</td>
										<td class="linkTd">
											<a href="http://info.sporttery.cn/football/info/fb_match_news.php?m=114539" target="_blank">讯</a>
											<a href="http://info.sporttery.cn/football/search_odds.php?mid=114539" target="_blank">同</a>
										</td>
										<td class="uOddsTd">
											<div class="hadU bLine"><span class="rLine" title="112">51%</span><span class="rLine" title="73">33%</span><span title="34">16%</span></div>
											<div class="hhadU"><span class="rLine" title="36">49%</span><span class="rLine" title="21">28%</span><span title="17">23%</span></div>
										</td>
										<td class="matchInfoTd">&nbsp;</td>
									</tr>
									<tr id="list_114540" singleindex="0" dataindex="1_7" class="listTr" lindex="2" bindex="2" line="-1" style="display: none;">
										<td>周六<br>009</td>
										<td title="德国乙级联赛" class="lname" style="background-color:#DB31EE">德乙</td>
										<td>12-08<br>20:00</td>
										<td><img title="微雨" src="http://static.sporttery.cn/www/images/weather_logo/sprinkle.png"><br>&nbsp;8°</td>
										<td title="点击VS进入对阵数据页,点击球队名称进入球队介绍页" onclick="toArrData(114540)" class="vsTd"><label>[德乙7]</label>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=5862">海登海姆</a>
											<a onclick="stopEvent(event)" class="vsA" target="_blank" href="http://info.sporttery.cn/football/info/fb_match_info.php?m=114540">VS</a>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=984">杜伊斯堡</a><label>[德乙15]</label></td>
										<td class="goalLineTd">
											<div title="胜平负" class="hadGL">0</div>
											<div title="让球胜平负" class="hhadGL"><label style="font-weight:normal;"></label>-1</div>
										</td>
										<td>
											<div class="hadOdds bLine"><span class="oddsItem rLine oddsItemKeep">2.00</span><span class="oddsItem rLine oddsItemKeep">3.25</span><span class="oddsItem oddsItemKeep">3.12</span></div>
											<div class="hhadOdds"><span class="oddsItem rLine oddsItemKeep">4.10</span><span class="oddsItem rLine oddsItemKeep">3.70</span><span class="oddsItem oddsItemKeep">1.63</span></div>
										</td>
										<td class="linkTd">
											<a href="http://info.sporttery.cn/football/info/fb_match_news.php?m=114540" target="_blank">讯</a>
											<a href="http://info.sporttery.cn/football/search_odds.php?mid=114540" target="_blank">同</a>
										</td>
										<td class="uOddsTd">
											<div class="hadU bLine"><span class="rLine" title="137">64%</span><span class="rLine" title="50">23%</span><span title="28">13%</span></div>
											<div class="hhadU"><span class="rLine" title="44">51%</span><span class="rLine" title="18">21%</span><span title="25">29%</span></div>
										</td>
										<td class="matchInfoTd">&nbsp;</td>
									</tr>
									<tr id="list_114541" singleindex="0" dataindex="1_8" class="listTr" lindex="10" bindex="2" line="-1" style="display: none;">
										<td>周六<br>010</td>
										<td title="西班牙甲级联赛" class="lname" style="background-color:#006633">西甲</td>
										<td>12-08<br>20:00</td>
										<td><img title="天晴" src="http://static.sporttery.cn/www/images/weather_logo/sunny.png"><br>&nbsp;2°</td>
										<td title="点击VS进入对阵数据页,点击球队名称进入球队介绍页" onclick="toArrData(114541)" class="vsTd"><label>[西甲3]</label>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=2020">马竞</a>
											<a onclick="stopEvent(event)" class="vsA" target="_blank" href="http://info.sporttery.cn/football/info/fb_match_info.php?m=114541">VS</a>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=2037">阿拉维斯</a><label>[西甲4]</label></td>
										<td class="goalLineTd">
											<div title="胜平负" class="hadGL">0</div>
											<div title="让球胜平负" class="hhadGL"><label style="font-weight:normal;"></label>-1</div>
										</td>
										<td>
											<div class="hadOdds bLine"><span class="oddsItem rLine oddsItemKeep">1.30</span><span class="oddsItem rLine oddsItemKeep">3.95</span><span class="oddsItem oddsItemKeep">9.30</span></div>
											<div class="hhadOdds"><span class="oddsItem rLine oddsItemKeep">2.12</span><span class="oddsItem rLine oddsItemKeep">3.25</span><span class="oddsItem oddsItemKeep">2.86</span></div>
										</td>
										<td class="linkTd">
											<a href="http://info.sporttery.cn/football/info/fb_match_news.php?m=114541" target="_blank">讯</a>
											<a href="http://info.sporttery.cn/football/search_odds.php?mid=114541" target="_blank">同</a>
										</td>
										<td class="uOddsTd">
											<div class="hadU bLine"><span class="rLine" title="620">81%</span><span class="rLine" title="80">10%</span><span title="65">8%</span></div>
											<div class="hhadU"><span class="rLine" title="243">44%</span><span class="rLine" title="246">45%</span><span title="63">11%</span></div>
										</td>
										<td class="matchInfoTd">&nbsp;</td>
									</tr>
									<tr id="list_114543" singleindex="0" dataindex="1_9" class="listTr" lindex="15" bindex="2" line="1" style="display: none;">
										<td>周六<br>012</td>
										<td title="英格兰超级联赛" class="lname" style="background-color:#FF3333">英超</td>
										<td>12-08<br>20:30</td>
										<td>未知<br>&nbsp;12°</td>
										<td title="点击VS进入对阵数据页,点击球队名称进入球队介绍页" onclick="toArrData(114543)" class="vsTd"><label>[英超7]</label>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=711">伯恩茅斯</a>
											<a onclick="stopEvent(event)" class="vsA" target="_blank" href="http://info.sporttery.cn/football/info/fb_match_info.php?m=114543">VS</a>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=663">利物浦</a><label>[英超2]</label></td>
										<td class="goalLineTd">
											<div title="胜平负" class="hadGL">0</div>
											<div title="让球胜平负" class="hhadGL"><label style="font-weight:normal;"></label>+1</div>
										</td>
										<td>
											<div class="hadOdds bLine"><span class="oddsItem rLine oddsItemKeep">4.80</span><span class="oddsItem rLine oddsItemKeep">3.95</span><span class="oddsItem oddsItemKeep">1.50</span></div>
											<div class="hhadOdds"><span class="oddsItem rLine oddsItemKeep">2.27</span><span class="oddsItem rLine oddsItemKeep">3.55</span><span class="oddsItem oddsItemKeep">2.46</span></div>
										</td>
										<td class="linkTd">
											<a href="http://info.sporttery.cn/football/info/fb_match_news.php?m=114543" target="_blank">讯</a>
											<a href="http://info.sporttery.cn/football/search_odds.php?mid=114543" target="_blank">同</a>
										</td>
										<td class="uOddsTd">
											<div class="hadU bLine"><span class="rLine" title="126">13%</span><span class="rLine" title="126">13%</span><span title="695">73%</span></div>
											<div class="hhadU"><span class="rLine" title="157">25%</span><span class="rLine" title="229">37%</span><span title="239">38%</span></div>
										</td>
										<td class="matchInfoTd">&nbsp;</td>
									</tr>
									<tr id="list_114544" singleindex="0" dataindex="1_10" class="listTr" lindex="6" bindex="2" line="-2" style="display: none;">
										<td>周六<br>013</td>
										<td title="意大利甲级联赛" class="lname" style="background-color:#0066FF">意甲</td>
										<td>12-08<br>22:00</td>
										<td><img title="天晴" src="http://static.sporttery.cn/www/images/weather_logo/sunny.png"><br>&nbsp;10°</td>
										<td title="点击VS进入对阵数据页,点击球队名称进入球队介绍页" onclick="toArrData(114544)" class="vsTd"><label>[意甲2]</label>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=1270">那不勒斯</a>
											<a onclick="stopEvent(event)" class="vsA" target="_blank" href="http://info.sporttery.cn/football/info/fb_match_info.php?m=114544">VS</a>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=2981">弗洛西诺</a><label>[意甲19]</label></td>
										<td class="goalLineTd">
											<div title="胜平负" class="hadGL">未开售</div>
											<div title="让球胜平负" class="hhadGL"><label style="font-weight:normal;"></label>-2</div>
										</td>
										<td>
											<div class="hadOdds bLine"><span class="oddsItem rLine ">--</span><span class="oddsItem rLine ">--</span><span class="oddsItem ">--</span></div>
											<div class="hhadOdds"><span class="oddsItem rLine oddsItemKeep">2.06</span><span class="oddsItem rLine oddsItemKeep">4.00</span><span class="oddsItem oddsItemKeep">2.55</span></div>
										</td>
										<td class="linkTd">
											<a href="http://info.sporttery.cn/football/info/fb_match_news.php?m=114544" target="_blank">讯</a>
											<a href="http://info.sporttery.cn/football/search_odds.php?mid=114544" target="_blank">同</a>
										</td>
										<td class="uOddsTd">
											<div class="hadU bLine"><span class="rLine">--</span><span class="rLine">--</span><span>--</span></div>
											<div class="hhadU"><span class="rLine" title="362">48%</span><span class="rLine" title="263">35%</span><span title="131">17%</span></div>
										</td>
										<td class="matchInfoTd">&nbsp;</td>
									</tr>
									<tr id="list_114545" singleindex="0" dataindex="1_11" class="listTr" lindex="5" bindex="2" line="-1" style="display: none;">
										<td>周六<br>014</td>
										<td title="德国甲级联赛" class="lname" style="background-color:#990099">德甲</td>
										<td>12-08<br>22:30</td>
										<td><img title="毛毛雨" src="http://static.sporttery.cn/www/images/weather_logo/sprinkle.png"><br>&nbsp;12°</td>
										<td title="点击VS进入对阵数据页,点击球队名称进入球队介绍页" onclick="toArrData(114545)" class="vsTd"><label>[德甲11]</label>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=963">勒沃库森</a>
											<a onclick="stopEvent(event)" class="vsA" target="_blank" href="http://info.sporttery.cn/football/info/fb_match_info.php?m=114545">VS</a>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=1000">奥格斯堡</a><label>[德甲14]</label></td>
										<td class="goalLineTd">
											<div title="胜平负" class="hadGL">0</div>
											<div title="让球胜平负" class="hhadGL"><label style="font-weight:normal;"></label>-1</div>
										</td>
										<td>
											<div class="hadOdds bLine"><span class="oddsItem rLine oddsItemKeep">1.55</span><span class="oddsItem rLine oddsItemKeep">4.00</span><span class="oddsItem oddsItemKeep">4.30</span></div>
											<div class="hhadOdds"><span class="oddsItem rLine oddsItemKeep">2.57</span><span class="oddsItem rLine oddsItemKeep">3.60</span><span class="oddsItem oddsItemKeep">2.16</span></div>
										</td>
										<td class="linkTd">
											<a href="http://info.sporttery.cn/football/info/fb_match_news.php?m=114545" target="_blank">讯</a>
											<a href="http://info.sporttery.cn/football/search_odds.php?mid=114545" target="_blank">同</a>
										</td>
										<td class="uOddsTd">
											<div class="hadU bLine"><span class="rLine" title="228">63%</span><span class="rLine" title="99">27%</span><span title="34">9%</span></div>
											<div class="hhadU"><span class="rLine" title="52">46%</span><span class="rLine" title="28">25%</span><span title="34">30%</span></div>
										</td>
										<td class="matchInfoTd">&nbsp;</td>
									</tr>
									<tr id="list_114546" singleindex="0" dataindex="1_12" class="listTr" lindex="5" bindex="2" line="-3" style="display: none;">
										<td>周六<br>015</td>
										<td title="德国甲级联赛" class="lname" style="background-color:#990099">德甲</td>
										<td>12-08<br>22:30</td>
										<td><img title="大致多云" src="http://static.sporttery.cn/www/images/weather_logo/cloudy.png"><br>&nbsp;10°</td>
										<td title="点击VS进入对阵数据页,点击球队名称进入球队介绍页" onclick="toArrData(114546)" class="vsTd"><label>[德甲4]</label>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=961">拜仁</a>
											<a onclick="stopEvent(event)" class="vsA" target="_blank" href="http://info.sporttery.cn/football/info/fb_match_info.php?m=114546">VS</a>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=975">纽伦堡</a><label>[德甲15]</label></td>
										<td class="goalLineTd">
											<div title="胜平负" class="hadGL">未开售</div>
											<div title="让球胜平负" class="hhadGL"><label style="font-weight:normal;"></label>-3</div>
										</td>
										<td>
											<div class="hadOdds bLine"><span class="oddsItem rLine ">--</span><span class="oddsItem rLine ">--</span><span class="oddsItem ">--</span></div>
											<div class="hhadOdds"><span class="oddsItem rLine oddsItemKeep">2.47</span><span class="oddsItem rLine oddsItemKeep">4.35</span><span class="oddsItem oddsItemKeep">2.03</span></div>
										</td>
										<td class="linkTd">
											<a href="http://info.sporttery.cn/football/info/fb_match_news.php?m=114546" target="_blank">讯</a>
											<a href="http://info.sporttery.cn/football/search_odds.php?mid=114546" target="_blank">同</a>
										</td>
										<td class="uOddsTd">
											<div class="hadU bLine"><span class="rLine">--</span><span class="rLine">--</span><span>--</span></div>
											<div class="hhadU"><span class="rLine" title="160">22%</span><span class="rLine" title="191">26%</span><span title="385">52%</span></div>
										</td>
										<td class="matchInfoTd">&nbsp;</td>
									</tr>
									<tr id="list_114547" singleindex="1" dataindex="1_13" class="listTr" lindex="5" bindex="2" line="1" style="display: none;">
										<td>周六<br>016</td>
										<td title="德国甲级联赛" class="lname" style="background-color:#990099">德甲</td>
										<td>12-08<br>22:30</td>
										<td><img title="小雨" src="http://static.sporttery.cn/www/images/weather_logo/sprinkle.png"><br>&nbsp;10°</td>
										<td title="点击VS进入对阵数据页,点击球队名称进入球队介绍页" onclick="toArrData(114547)" class="vsTd"><label>[德甲12]</label>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=966">沙尔克04</a>
											<a onclick="stopEvent(event)" class="vsA" target="_blank" href="http://info.sporttery.cn/football/info/fb_match_info.php?m=114547">VS</a>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=964">多特蒙德</a><label>[德甲1]</label></td>
										<td class="goalLineTd">
											<div title="胜平负" class="hadGL" style="background-image:url(./images/single.gif);background-repeat:no-repeat;background-position:left top;">0</div>
											<div title="让球胜平负" class="hhadGL"><label style="font-weight:normal;"></label>+1</div>
										</td>
										<td>
											<div class="hadOdds bLine"><span class="oddsItem rLine oddsItemKeep">3.10</span><span class="oddsItem rLine oddsItemKeep">3.40</span><span class="oddsItem oddsItemKeep">1.95</span></div>
											<div class="hhadOdds"><span class="oddsItem rLine oddsItemKeep">1.68</span><span class="oddsItem rLine oddsItemKeep">3.70</span><span class="oddsItem oddsItemKeep">3.80</span></div>
										</td>
										<td class="linkTd">
											<a href="http://info.sporttery.cn/football/info/fb_match_news.php?m=114547" target="_blank">讯</a>
											<a href="http://info.sporttery.cn/football/search_odds.php?mid=114547" target="_blank">同</a>
										</td>
										<td class="uOddsTd">
											<div class="hadU bLine"><span class="rLine" title="161">14%</span><span class="rLine" title="299">25%</span><span title="722">61%</span></div>
											<div class="hhadU"><span class="rLine" title="123">32%</span><span class="rLine" title="110">28%</span><span title="156">40%</span></div>
										</td>
										<td class="matchInfoTd">&nbsp;</td>
									</tr>
									<tr id="list_114548" singleindex="0" dataindex="1_14" class="listTr" lindex="5" bindex="2" line="1" style="display: none;">
										<td>周六<br>017</td>
										<td title="德国甲级联赛" class="lname" style="background-color:#990099">德甲</td>
										<td>12-08<br>22:30</td>
										<td><img title="多云" src="http://static.sporttery.cn/www/images/weather_logo/cloudy.png"><br>&nbsp;9°</td>
										<td title="点击VS进入对阵数据页,点击球队名称进入球队介绍页" onclick="toArrData(114548)" class="vsTd"><label>[德甲13]</label>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=970">弗赖堡</a>
											<a onclick="stopEvent(event)" class="vsA" target="_blank" href="http://info.sporttery.cn/football/info/fb_match_info.php?m=114548">VS</a>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=13410">莱红牛</a><label>[德甲3]</label></td>
										<td class="goalLineTd">
											<div title="胜平负" class="hadGL">0</div>
											<div title="让球胜平负" class="hhadGL"><label style="font-weight:normal;"></label>+1</div>
										</td>
										<td>
											<div class="hadOdds bLine"><span class="oddsItem rLine oddsItemKeep">4.02</span><span class="oddsItem rLine oddsItemKeep">3.65</span><span class="oddsItem oddsItemKeep">1.65</span></div>
											<div class="hhadOdds"><span class="oddsItem rLine oddsItemKeep">1.98</span><span class="oddsItem rLine oddsItemKeep">3.50</span><span class="oddsItem oddsItemKeep">2.95</span></div>
										</td>
										<td class="linkTd">
											<a href="http://info.sporttery.cn/football/info/fb_match_news.php?m=114548" target="_blank">讯</a>
											<a href="http://info.sporttery.cn/football/search_odds.php?mid=114548" target="_blank">同</a>
										</td>
										<td class="uOddsTd">
											<div class="hadU bLine"><span class="rLine" title="44">13%</span><span class="rLine" title="67">20%</span><span title="228">67%</span></div>
											<div class="hhadU"><span class="rLine" title="48">34%</span><span class="rLine" title="45">32%</span><span title="49">35%</span></div>
										</td>
										<td class="matchInfoTd">&nbsp;</td>
									</tr>
									<tr id="list_114549" singleindex="0" dataindex="1_15" class="listTr" lindex="5" bindex="2" line="1" style="display: none;">
										<td>周六<br>018</td>
										<td title="德国甲级联赛" class="lname" style="background-color:#990099">德甲</td>
										<td>12-08<br>22:30</td>
										<td><img title="毛毛雨" src="http://static.sporttery.cn/www/images/weather_logo/sprinkle.png"><br>&nbsp;10°</td>
										<td title="点击VS进入对阵数据页,点击球队名称进入球队介绍页" onclick="toArrData(114549)" class="vsTd"><label>[德甲8]</label>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=968">沃夫斯堡</a>
											<a onclick="stopEvent(event)" class="vsA" target="_blank" href="http://info.sporttery.cn/football/info/fb_match_info.php?m=114549">VS</a>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=1001">霍芬海姆</a><label>[德甲6]</label></td>
										<td class="goalLineTd">
											<div title="胜平负" class="hadGL">0</div>
											<div title="让球胜平负" class="hhadGL"><label style="font-weight:normal;"></label>+1</div>
										</td>
										<td>
											<div class="hadOdds bLine"><span class="oddsItem rLine oddsItemKeep">2.65</span><span class="oddsItem rLine oddsItemKeep">3.50</span><span class="oddsItem oddsItemKeep">2.15</span></div>
											<div class="hhadOdds"><span class="oddsItem rLine oddsItemKeep">1.54</span><span class="oddsItem rLine oddsItemKeep">4.05</span><span class="oddsItem oddsItemKeep">4.30</span></div>
										</td>
										<td class="linkTd">
											<a href="http://info.sporttery.cn/football/info/fb_match_news.php?m=114549" target="_blank">讯</a>
											<a href="http://info.sporttery.cn/football/search_odds.php?mid=114549" target="_blank">同</a>
										</td>
										<td class="uOddsTd">
											<div class="hadU bLine"><span class="rLine" title="121">41%</span><span class="rLine" title="77">26%</span><span title="94">32%</span></div>
											<div class="hhadU"><span class="rLine" title="96">67%</span><span class="rLine" title="20">14%</span><span title="27">19%</span></div>
										</td>
										<td class="matchInfoTd">&nbsp;</td>
									</tr>
									<tr id="list_114551" singleindex="0" dataindex="1_16" class="listTr" lindex="15" bindex="2" line="-2" style="display: none;">
										<td>周六<br>020</td>
										<td title="英格兰超级联赛" class="lname" style="background-color:#FF3333">英超</td>
										<td>12-08<br>23:00</td>
										<td><img title="毛毛雨" src="http://static.sporttery.cn/www/images/weather_logo/sprinkle.png"><br>&nbsp;13°</td>
										<td title="点击VS进入对阵数据页,点击球队名称进入球队介绍页" onclick="toArrData(114551)" class="vsTd"><label>[英超5]</label>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=660">阿森纳</a>
											<a onclick="stopEvent(event)" class="vsA" target="_blank" href="http://info.sporttery.cn/football/info/fb_match_info.php?m=114551">VS</a>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=726">哈德斯</a><label>[英超17]</label></td>
										<td class="goalLineTd">
											<div title="胜平负" class="hadGL">0</div>
											<div title="让球胜平负" class="hhadGL"><label style="font-weight:normal;"></label>-2</div>
										</td>
										<td>
											<div class="hadOdds bLine"><span class="oddsItem rLine oddsItemKeep">1.21</span><span class="oddsItem rLine oddsItemKeep">5.25</span><span class="oddsItem oddsItemKeep">8.85</span></div>
											<div class="hhadOdds"><span class="oddsItem rLine oddsItemKeep">2.92</span><span class="oddsItem rLine oddsItemKeep">3.85</span><span class="oddsItem oddsItemKeep">1.90</span></div>
										</td>
										<td class="linkTd">
											<a href="http://info.sporttery.cn/football/info/fb_match_news.php?m=114551" target="_blank">讯</a>
											<a href="http://info.sporttery.cn/football/search_odds.php?mid=114551" target="_blank">同</a>
										</td>
										<td class="uOddsTd">
											<div class="hadU bLine"><span class="rLine" title="1237">94%</span><span class="rLine" title="36">3%</span><span title="44">3%</span></div>
											<div class="hhadU"><span class="rLine" title="282">46%</span><span class="rLine" title="251">41%</span><span title="75">12%</span></div>
										</td>
										<td class="matchInfoTd">&nbsp;</td>
									</tr>
									<tr id="list_114552" singleindex="0" dataindex="1_17" class="listTr" lindex="15" bindex="2" line="1" style="display: none;">
										<td>周六<br>021</td>
										<td title="英格兰超级联赛" class="lname" style="background-color:#FF3333">英超</td>
										<td>12-08<br>23:00</td>
										<td><img title="雨" src="http://static.sporttery.cn/www/images/weather_logo/rain.png"><br>&nbsp;11°</td>
										<td title="点击VS进入对阵数据页,点击球队名称进入球队介绍页" onclick="toArrData(114552)" class="vsTd"><label>[英超19]</label>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=698">伯恩利</a>
											<a onclick="stopEvent(event)" class="vsA" target="_blank" href="http://info.sporttery.cn/football/info/fb_match_info.php?m=114552">VS</a>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=703">布赖顿</a><label>[英超10]</label></td>
										<td class="goalLineTd">
											<div title="胜平负" class="hadGL">0</div>
											<div title="让球胜平负" class="hhadGL"><label style="font-weight:normal;"></label>+1</div>
										</td>
										<td>
											<div class="hadOdds bLine"><span class="oddsItem rLine oddsItemKeep">2.65</span><span class="oddsItem rLine oddsItemKeep">2.93</span><span class="oddsItem oddsItemKeep">2.44</span></div>
											<div class="hhadOdds"><span class="oddsItem rLine oddsItemKeep">1.43</span><span class="oddsItem rLine oddsItemKeep">3.90</span><span class="oddsItem oddsItemKeep">5.80</span></div>
										</td>
										<td class="linkTd">
											<a href="http://info.sporttery.cn/football/info/fb_match_news.php?m=114552" target="_blank">讯</a>
											<a href="http://info.sporttery.cn/football/search_odds.php?mid=114552" target="_blank">同</a>
										</td>
										<td class="uOddsTd">
											<div class="hadU bLine"><span class="rLine" title="109">29%</span><span class="rLine" title="157">41%</span><span title="116">30%</span></div>
											<div class="hhadU"><span class="rLine" title="56">43%</span><span class="rLine" title="38">29%</span><span title="36">28%</span></div>
										</td>
										<td class="matchInfoTd">&nbsp;</td>
									</tr>
									<tr id="list_114553" singleindex="0" dataindex="1_18" class="listTr" lindex="15" bindex="2" line="1" style="display: none;">
										<td>周六<br>022</td>
										<td title="英格兰超级联赛" class="lname" style="background-color:#FF3333">英超</td>
										<td>12-08<br>23:00</td>
										<td>未知<br>&nbsp;10°</td>
										<td title="点击VS进入对阵数据页,点击球队名称进入球队介绍页" onclick="toArrData(114553)" class="vsTd"><label>[英超16]</label>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=691">加的夫城</a>
											<a onclick="stopEvent(event)" class="vsA" target="_blank" href="http://info.sporttery.cn/football/info/fb_match_info.php?m=114553">VS</a>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=670">南安普敦</a><label>[英超18]</label></td>
										<td class="goalLineTd">
											<div title="胜平负" class="hadGL">0</div>
											<div title="让球胜平负" class="hhadGL"><label style="font-weight:normal;"></label>+1</div>
										</td>
										<td>
											<div class="hadOdds bLine"><span class="oddsItem rLine oddsItemKeep">2.63</span><span class="oddsItem rLine oddsItemKeep">3.10</span><span class="oddsItem oddsItemKeep">2.35</span></div>
											<div class="hhadOdds"><span class="oddsItem rLine oddsItemKeep">1.46</span><span class="oddsItem rLine oddsItemKeep">3.90</span><span class="oddsItem oddsItemKeep">5.35</span></div>
										</td>
										<td class="linkTd">
											<a href="http://info.sporttery.cn/football/info/fb_match_news.php?m=114553" target="_blank">讯</a>
											<a href="http://info.sporttery.cn/football/search_odds.php?mid=114553" target="_blank">同</a>
										</td>
										<td class="uOddsTd">
											<div class="hadU bLine"><span class="rLine" title="114">38%</span><span class="rLine" title="85">29%</span><span title="99">33%</span></div>
											<div class="hhadU"><span class="rLine" title="99">69%</span><span class="rLine" title="25">17%</span><span title="20">14%</span></div>
										</td>
										<td class="matchInfoTd">&nbsp;</td>
									</tr>
									<tr id="list_114554" singleindex="0" dataindex="1_19" class="listTr" lindex="15" bindex="2" line="-1" style="display: none;">
										<td>周六<br>023</td>
										<td title="英格兰超级联赛" class="lname" style="background-color:#FF3333">英超</td>
										<td>12-08<br>23:00</td>
										<td><img title="毛毛雨" src="http://static.sporttery.cn/www/images/weather_logo/sprinkle.png"><br>&nbsp;12°</td>
										<td title="点击VS进入对阵数据页,点击球队名称进入球队介绍页" onclick="toArrData(114554)" class="vsTd"><label>[英超8]</label>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=662">曼联</a>
											<a onclick="stopEvent(event)" class="vsA" target="_blank" href="http://info.sporttery.cn/football/info/fb_match_info.php?m=114554">VS</a>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=667">富勒姆</a><label>[英超20]</label></td>
										<td class="goalLineTd">
											<div title="胜平负" class="hadGL">0</div>
											<div title="让球胜平负" class="hhadGL"><label style="font-weight:normal;"></label>-1</div>
										</td>
										<td>
											<div class="hadOdds bLine"><span class="oddsItem rLine oddsItemKeep">1.28</span><span class="oddsItem rLine oddsItemKeep">4.70</span><span class="oddsItem oddsItemKeep">7.50</span></div>
											<div class="hhadOdds"><span class="oddsItem rLine oddsItemKeep">1.87</span><span class="oddsItem rLine oddsItemKeep">3.70</span><span class="oddsItem oddsItemKeep">3.08</span></div>
										</td>
										<td class="linkTd">
											<a href="http://info.sporttery.cn/football/info/fb_match_news.php?m=114554" target="_blank">讯</a>
											<a href="http://info.sporttery.cn/football/search_odds.php?mid=114554" target="_blank">同</a>
										</td>
										<td class="uOddsTd">
											<div class="hadU bLine"><span class="rLine" title="867">89%</span><span class="rLine" title="61">6%</span><span title="41">4%</span></div>
											<div class="hhadU"><span class="rLine" title="377">70%</span><span class="rLine" title="119">22%</span><span title="45">8%</span></div>
										</td>
										<td class="matchInfoTd">&nbsp;</td>
									</tr>
									<tr id="list_114555" singleindex="0" dataindex="1_20" class="listTr" lindex="15" bindex="2" line="-1" style="display: none;">
										<td>周六<br>024</td>
										<td title="英格兰超级联赛" class="lname" style="background-color:#FF3333">英超</td>
										<td>12-08<br>23:00</td>
										<td><img title="毛毛雨" src="http://static.sporttery.cn/www/images/weather_logo/sprinkle.png"><br>&nbsp;13°</td>
										<td title="点击VS进入对阵数据页,点击球队名称进入球队介绍页" onclick="toArrData(114555)" class="vsTd"><label>[英超13]</label>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=684">西汉姆联</a>
											<a onclick="stopEvent(event)" class="vsA" target="_blank" href="http://info.sporttery.cn/football/info/fb_match_info.php?m=114555">VS</a>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=679">水晶宫</a><label>[英超15]</label></td>
										<td class="goalLineTd">
											<div title="胜平负" class="hadGL">0</div>
											<div title="让球胜平负" class="hhadGL"><label style="font-weight:normal;"></label>-1</div>
										</td>
										<td>
											<div class="hadOdds bLine"><span class="oddsItem rLine oddsItemKeep">2.10</span><span class="oddsItem rLine oddsItemKeep">3.25</span><span class="oddsItem oddsItemKeep">2.90</span></div>
											<div class="hhadOdds"><span class="oddsItem rLine oddsItemKeep">4.30</span><span class="oddsItem rLine oddsItemKeep">3.75</span><span class="oddsItem oddsItemKeep">1.59</span></div>
										</td>
										<td class="linkTd">
											<a href="http://info.sporttery.cn/football/info/fb_match_news.php?m=114555" target="_blank">讯</a>
											<a href="http://info.sporttery.cn/football/search_odds.php?mid=114555" target="_blank">同</a>
										</td>
										<td class="uOddsTd">
											<div class="hadU bLine"><span class="rLine" title="279">65%</span><span class="rLine" title="97">23%</span><span title="53">12%</span></div>
											<div class="hhadU"><span class="rLine" title="46">48%</span><span class="rLine" title="22">23%</span><span title="27">28%</span></div>
										</td>
										<td class="matchInfoTd">&nbsp;</td>
									</tr>
									<tr id="list_114556" singleindex="0" dataindex="1_21" class="listTr" lindex="9" bindex="2" line="-1" style="display: none;">
										<td>周六<br>025</td>
										<td title="英格兰冠军联赛" class="lname" style="background-color:#CC3300">英冠</td>
										<td>12-08<br>23:00</td>
										<td><img title="毛毛雨" src="http://static.sporttery.cn/www/images/weather_logo/sprinkle.png"><br>&nbsp;12°</td>
										<td title="点击VS进入对阵数据页,点击球队名称进入球队介绍页" onclick="toArrData(114556)" class="vsTd"><label>[英冠9]</label>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=669">伯明翰</a>
											<a onclick="stopEvent(event)" class="vsA" target="_blank" href="http://info.sporttery.cn/football/info/fb_match_info.php?m=114556">VS</a>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=707">布城</a><label>[英冠14]</label></td>
										<td class="goalLineTd">
											<div title="胜平负" class="hadGL">0</div>
											<div title="让球胜平负" class="hhadGL"><label style="font-weight:normal;"></label>-1</div>
										</td>
										<td>
											<div class="hadOdds bLine"><span class="oddsItem rLine oddsItemKeep">2.20</span><span class="oddsItem rLine oddsItemKeep">3.10</span><span class="oddsItem oddsItemKeep">2.84</span></div>
											<div class="hhadOdds"><span class="oddsItem rLine oddsItemKeep">5.00</span><span class="oddsItem rLine oddsItemKeep">3.70</span><span class="oddsItem oddsItemKeep">1.52</span></div>
										</td>
										<td class="linkTd">
											<a href="http://info.sporttery.cn/football/info/fb_match_news.php?m=114556" target="_blank">讯</a>
											<a href="http://info.sporttery.cn/football/search_odds.php?mid=114556" target="_blank">同</a>
										</td>
										<td class="uOddsTd">
											<div class="hadU bLine"><span class="rLine" title="184">75%</span><span class="rLine" title="46">19%</span><span title="14">6%</span></div>
											<div class="hhadU"><span class="rLine" title="47">55%</span><span class="rLine" title="23">27%</span><span title="15">18%</span></div>
										</td>
										<td class="matchInfoTd">&nbsp;</td>
									</tr>
									<tr id="list_114557" singleindex="0" dataindex="1_22" class="listTr" lindex="9" bindex="2" line="-1" style="display: none;">
										<td>周六<br>026</td>
										<td title="英格兰冠军联赛" class="lname" style="background-color:#CC3300">英冠</td>
										<td>12-08<br>23:00</td>
										<td><img title="毛毛雨" src="http://static.sporttery.cn/www/images/weather_logo/sprinkle.png"><br>&nbsp;12°</td>
										<td title="点击VS进入对阵数据页,点击球队名称进入球队介绍页" onclick="toArrData(114557)" class="vsTd"><label>[英冠17]</label>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=722">布伦特</a>
											<a onclick="stopEvent(event)" class="vsA" target="_blank" href="http://info.sporttery.cn/football/info/fb_match_info.php?m=114557">VS</a>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=738">斯旺西</a><label>[英冠13]</label></td>
										<td class="goalLineTd">
											<div title="胜平负" class="hadGL">0</div>
											<div title="让球胜平负" class="hhadGL"><label style="font-weight:normal;"></label>-1</div>
										</td>
										<td>
											<div class="hadOdds bLine"><span class="oddsItem rLine oddsItemKeep">1.84</span><span class="oddsItem rLine oddsItemKeep">3.45</span><span class="oddsItem oddsItemKeep">3.40</span></div>
											<div class="hhadOdds"><span class="oddsItem rLine oddsItemKeep">3.55</span><span class="oddsItem rLine oddsItemKeep">3.65</span><span class="oddsItem oddsItemKeep">1.75</span></div>
										</td>
										<td class="linkTd">
											<a href="http://info.sporttery.cn/football/info/fb_match_news.php?m=114557" target="_blank">讯</a>
											<a href="http://info.sporttery.cn/football/search_odds.php?mid=114557" target="_blank">同</a>
										</td>
										<td class="uOddsTd">
											<div class="hadU bLine"><span class="rLine" title="30">32%</span><span class="rLine" title="14">15%</span><span title="50">53%</span></div>
											<div class="hhadU"><span class="rLine" title="6">13%</span><span class="rLine" title="8">17%</span><span title="32">70%</span></div>
										</td>
										<td class="matchInfoTd">&nbsp;</td>
									</tr>
									<tr id="list_114558" singleindex="0" dataindex="1_23" class="listTr" lindex="9" bindex="2" line="-1" style="display: none;">
										<td>周六<br>027</td>
										<td title="英格兰冠军联赛" class="lname" style="background-color:#CC3300">英冠</td>
										<td>12-08<br>23:00</td>
										<td><img title="毛毛雨" src="http://static.sporttery.cn/www/images/weather_logo/sprinkle.png"><br>&nbsp;11°</td>
										<td title="点击VS进入对阵数据页,点击球队名称进入球队介绍页" onclick="toArrData(114558)" class="vsTd"><label>[英冠2]</label>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=681">利兹联</a>
											<a onclick="stopEvent(event)" class="vsA" target="_blank" href="http://info.sporttery.cn/football/info/fb_match_info.php?m=114558">VS</a>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=702">女王巡游</a><label>[英冠11]</label></td>
										<td class="goalLineTd">
											<div title="胜平负" class="hadGL">0</div>
											<div title="让球胜平负" class="hhadGL"><label style="font-weight:normal;"></label>-1</div>
										</td>
										<td>
											<div class="hadOdds bLine"><span class="oddsItem rLine oddsItemKeep">1.56</span><span class="oddsItem rLine oddsItemKeep">3.60</span><span class="oddsItem oddsItemKeep">4.75</span></div>
											<div class="hhadOdds"><span class="oddsItem rLine oddsItemKeep">2.80</span><span class="oddsItem rLine oddsItemKeep">3.35</span><span class="oddsItem oddsItemKeep">2.11</span></div>
										</td>
										<td class="linkTd">
											<a href="http://info.sporttery.cn/football/info/fb_match_news.php?m=114558" target="_blank">讯</a>
											<a href="http://info.sporttery.cn/football/search_odds.php?mid=114558" target="_blank">同</a>
										</td>
										<td class="uOddsTd">
											<div class="hadU bLine"><span class="rLine" title="278">89%</span><span class="rLine" title="28">9%</span><span title="7">2%</span></div>
											<div class="hhadU"><span class="rLine" title="38">46%</span><span class="rLine" title="32">39%</span><span title="12">15%</span></div>
										</td>
										<td class="matchInfoTd">&nbsp;</td>
									</tr>
									<tr id="list_114559" singleindex="0" dataindex="1_24" class="listTr" lindex="9" bindex="2" line="-1" style="display: none;">
										<td>周六<br>028</td>
										<td title="英格兰冠军联赛" class="lname" style="background-color:#CC3300">英冠</td>
										<td>12-08<br>23:00</td>
										<td>未知<br>&nbsp;10°</td>
										<td title="点击VS进入对阵数据页,点击球队名称进入球队介绍页" onclick="toArrData(114559)" class="vsTd"><label>[英冠4]</label>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=671">米堡</a>
											<a onclick="stopEvent(event)" class="vsA" target="_blank" href="http://info.sporttery.cn/football/info/fb_match_info.php?m=114559">VS</a>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=672">布莱克本</a><label>[英冠10]</label></td>
										<td class="goalLineTd">
											<div title="胜平负" class="hadGL">0</div>
											<div title="让球胜平负" class="hhadGL"><label style="font-weight:normal;"></label>-1</div>
										</td>
										<td>
											<div class="hadOdds bLine"><span class="oddsItem rLine oddsItemKeep">1.57</span><span class="oddsItem rLine oddsItemKeep">3.40</span><span class="oddsItem oddsItemKeep">5.05</span></div>
											<div class="hhadOdds"><span class="oddsItem rLine oddsItemKeep">2.95</span><span class="oddsItem rLine oddsItemKeep">3.20</span><span class="oddsItem oddsItemKeep">2.10</span></div>
										</td>
										<td class="linkTd">
											<a href="http://info.sporttery.cn/football/info/fb_match_news.php?m=114559" target="_blank">讯</a>
											<a href="http://info.sporttery.cn/football/search_odds.php?mid=114559" target="_blank">同</a>
										</td>
										<td class="uOddsTd">
											<div class="hadU bLine"><span class="rLine" title="127">70%</span><span class="rLine" title="43">24%</span><span title="12">7%</span></div>
											<div class="hhadU"><span class="rLine" title="25">51%</span><span class="rLine" title="18">37%</span><span title="6">12%</span></div>
										</td>
										<td class="matchInfoTd">&nbsp;</td>
									</tr>
									<tr id="list_114560" singleindex="0" dataindex="1_25" class="listTr" lindex="9" bindex="2" line="-1" style="display: none;">
										<td>周六<br>029</td>
										<td title="英格兰冠军联赛" class="lname" style="background-color:#CC3300">英冠</td>
										<td>12-08<br>23:00</td>
										<td><img title="毛毛雨" src="http://static.sporttery.cn/www/images/weather_logo/sprinkle.png"><br>&nbsp;13°</td>
										<td title="点击VS进入对阵数据页,点击球队名称进入球队介绍页" onclick="toArrData(114560)" class="vsTd"><label>[英冠22]</label>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=689">米尔沃尔</a>
											<a onclick="stopEvent(event)" class="vsA" target="_blank" href="http://info.sporttery.cn/football/info/fb_match_info.php?m=114560">VS</a>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=725">赫尔城</a><label>[英冠19]</label></td>
										<td class="goalLineTd">
											<div title="胜平负" class="hadGL">0</div>
											<div title="让球胜平负" class="hhadGL"><label style="font-weight:normal;"></label>-1</div>
										</td>
										<td>
											<div class="hadOdds bLine"><span class="oddsItem rLine oddsItemKeep">1.97</span><span class="oddsItem rLine oddsItemKeep">3.15</span><span class="oddsItem oddsItemKeep">3.30</span></div>
											<div class="hhadOdds"><span class="oddsItem rLine oddsItemKeep">4.10</span><span class="oddsItem rLine oddsItemKeep">3.60</span><span class="oddsItem oddsItemKeep">1.65</span></div>
										</td>
										<td class="linkTd">
											<a href="http://info.sporttery.cn/football/info/fb_match_news.php?m=114560" target="_blank">讯</a>
											<a href="http://info.sporttery.cn/football/search_odds.php?mid=114560" target="_blank">同</a>
										</td>
										<td class="uOddsTd">
											<div class="hadU bLine"><span class="rLine" title="25">37%</span><span class="rLine" title="18">27%</span><span title="24">36%</span></div>
											<div class="hhadU"><span class="rLine" title="11">25%</span><span class="rLine" title="11">25%</span><span title="22">50%</span></div>
										</td>
										<td class="matchInfoTd">&nbsp;</td>
									</tr>
									<tr id="list_114561" singleindex="0" dataindex="1_26" class="listTr" lindex="9" bindex="2" line="-1" style="display: none;">
										<td>周六<br>030</td>
										<td title="英格兰冠军联赛" class="lname" style="background-color:#CC3300">英冠</td>
										<td>12-08<br>23:00</td>
										<td><img title="雨" src="http://static.sporttery.cn/www/images/weather_logo/rain.png"><br>&nbsp;12°</td>
										<td title="点击VS进入对阵数据页,点击球队名称进入球队介绍页" onclick="toArrData(114561)" class="vsTd"><label>[英冠1]</label>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=677">诺维奇</a>
											<a onclick="stopEvent(event)" class="vsA" target="_blank" href="http://info.sporttery.cn/football/info/fb_match_info.php?m=114561">VS</a>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=666">博尔顿</a><label>[英冠23]</label></td>
										<td class="goalLineTd">
											<div title="胜平负" class="hadGL">0</div>
											<div title="让球胜平负" class="hhadGL"><label style="font-weight:normal;"></label>-1</div>
										</td>
										<td>
											<div class="hadOdds bLine"><span class="oddsItem rLine oddsItemKeep">1.29</span><span class="oddsItem rLine oddsItemKeep">4.35</span><span class="oddsItem oddsItemKeep">8.05</span></div>
											<div class="hhadOdds"><span class="oddsItem rLine oddsItemKeep">2.00</span><span class="oddsItem rLine oddsItemKeep">3.40</span><span class="oddsItem oddsItemKeep">3.00</span></div>
										</td>
										<td class="linkTd">
											<a href="http://info.sporttery.cn/football/info/fb_match_news.php?m=114561" target="_blank">讯</a>
											<a href="http://info.sporttery.cn/football/search_odds.php?mid=114561" target="_blank">同</a>
										</td>
										<td class="uOddsTd">
											<div class="hadU bLine"><span class="rLine" title="414">92%</span><span class="rLine" title="20">4%</span><span title="17">4%</span></div>
											<div class="hhadU"><span class="rLine" title="262">80%</span><span class="rLine" title="57">17%</span><span title="10">3%</span></div>
										</td>
										<td class="matchInfoTd">&nbsp;</td>
									</tr>
									<tr id="list_114562" singleindex="0" dataindex="1_27" class="listTr" lindex="9" bindex="2" line="-1" style="display: none;">
										<td>周六<br>031</td>
										<td title="英格兰冠军联赛" class="lname" style="background-color:#CC3300">英冠</td>
										<td>12-08<br>23:00</td>
										<td><img title="雨" src="http://static.sporttery.cn/www/images/weather_logo/rain.png"><br>&nbsp;12°</td>
										<td title="点击VS进入对阵数据页,点击球队名称进入球队介绍页" onclick="toArrData(114562)" class="vsTd"><label>[英冠5]</label>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=694">诺丁汉</a>
											<a onclick="stopEvent(event)" class="vsA" target="_blank" href="http://info.sporttery.cn/football/info/fb_match_info.php?m=114562">VS</a>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=693">普雷斯顿</a><label>[英冠18]</label></td>
										<td class="goalLineTd">
											<div title="胜平负" class="hadGL">0</div>
											<div title="让球胜平负" class="hhadGL"><label style="font-weight:normal;"></label>-1</div>
										</td>
										<td>
											<div class="hadOdds bLine"><span class="oddsItem rLine oddsItemKeep">1.92</span><span class="oddsItem rLine oddsItemKeep">3.20</span><span class="oddsItem oddsItemKeep">3.40</span></div>
											<div class="hhadOdds"><span class="oddsItem rLine oddsItemKeep">4.05</span><span class="oddsItem rLine oddsItemKeep">3.55</span><span class="oddsItem oddsItemKeep">1.67</span></div>
										</td>
										<td class="linkTd">
											<a href="http://info.sporttery.cn/football/info/fb_match_news.php?m=114562" target="_blank">讯</a>
											<a href="http://info.sporttery.cn/football/search_odds.php?mid=114562" target="_blank">同</a>
										</td>
										<td class="uOddsTd">
											<div class="hadU bLine"><span class="rLine" title="156">80%</span><span class="rLine" title="35">18%</span><span title="4">2%</span></div>
											<div class="hhadU"><span class="rLine" title="47">72%</span><span class="rLine" title="11">17%</span><span title="7">11%</span></div>
										</td>
										<td class="matchInfoTd">&nbsp;</td>
									</tr>
									<tr id="list_114563" singleindex="0" dataindex="1_28" class="listTr" lindex="9" bindex="2" line="-1" style="display: none;">
										<td>周六<br>032</td>
										<td title="英格兰冠军联赛" class="lname" style="background-color:#CC3300">英冠</td>
										<td>12-08<br>23:00</td>
										<td>未知<br>&nbsp;10°</td>
										<td title="点击VS进入对阵数据页,点击球队名称进入球队介绍页" onclick="toArrData(114563)" class="vsTd"><label>[英冠16]</label>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=719">谢周三</a>
											<a onclick="stopEvent(event)" class="vsA" target="_blank" href="http://info.sporttery.cn/football/info/fb_match_info.php?m=114563">VS</a>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=695">罗瑟汉姆</a><label>[英冠20]</label></td>
										<td class="goalLineTd">
											<div title="胜平负" class="hadGL">0</div>
											<div title="让球胜平负" class="hhadGL"><label style="font-weight:normal;"></label>-1</div>
										</td>
										<td>
											<div class="hadOdds bLine"><span class="oddsItem rLine oddsItemKeep">1.95</span><span class="oddsItem rLine oddsItemKeep">3.25</span><span class="oddsItem oddsItemKeep">3.25</span></div>
											<div class="hhadOdds"><span class="oddsItem rLine oddsItemKeep">4.05</span><span class="oddsItem rLine oddsItemKeep">3.65</span><span class="oddsItem oddsItemKeep">1.65</span></div>
										</td>
										<td class="linkTd">
											<a href="http://info.sporttery.cn/football/info/fb_match_news.php?m=114563" target="_blank">讯</a>
											<a href="http://info.sporttery.cn/football/search_odds.php?mid=114563" target="_blank">同</a>
										</td>
										<td class="uOddsTd">
											<div class="hadU bLine"><span class="rLine" title="58">67%</span><span class="rLine" title="16">19%</span><span title="12">14%</span></div>
											<div class="hhadU"><span class="rLine" title="18">58%</span><span class="rLine" title="8">26%</span><span title="5">16%</span></div>
										</td>
										<td class="matchInfoTd">&nbsp;</td>
									</tr>
									<tr id="list_114564" singleindex="0" dataindex="1_29" class="listTr" lindex="9" bindex="2" line="-1" style="display: none;">
										<td>周六<br>033</td>
										<td title="英格兰冠军联赛" class="lname" style="background-color:#CC3300">英冠</td>
										<td>12-08<br>23:00</td>
										<td>未知<br>&nbsp;</td>
										<td title="点击VS进入对阵数据页,点击球队名称进入球队介绍页" onclick="toArrData(114564)" class="vsTd"><label>[英冠12]</label>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=690">斯托克城</a>
											<a onclick="stopEvent(event)" class="vsA" target="_blank" href="http://info.sporttery.cn/football/info/fb_match_info.php?m=114564">VS</a>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=685">伊普斯</a><label>[英冠24]</label></td>
										<td class="goalLineTd">
											<div title="胜平负" class="hadGL">0</div>
											<div title="让球胜平负" class="hhadGL"><label style="font-weight:normal;"></label>-1</div>
										</td>
										<td>
											<div class="hadOdds bLine"><span class="oddsItem rLine oddsItemKeep">1.37</span><span class="oddsItem rLine oddsItemKeep">3.95</span><span class="oddsItem oddsItemKeep">6.85</span></div>
											<div class="hhadOdds"><span class="oddsItem rLine oddsItemKeep">2.25</span><span class="oddsItem rLine oddsItemKeep">3.25</span><span class="oddsItem oddsItemKeep">2.65</span></div>
										</td>
										<td class="linkTd">
											<a href="http://info.sporttery.cn/football/info/fb_match_news.php?m=114564" target="_blank">讯</a>
											<a href="http://info.sporttery.cn/football/search_odds.php?mid=114564" target="_blank">同</a>
										</td>
										<td class="uOddsTd">
											<div class="hadU bLine"><span class="rLine" title="138">85%</span><span class="rLine" title="11">7%</span><span title="13">8%</span></div>
											<div class="hhadU"><span class="rLine" title="49">64%</span><span class="rLine" title="20">26%</span><span title="8">10%</span></div>
										</td>
										<td class="matchInfoTd">&nbsp;</td>
									</tr>
									<tr id="list_114565" singleindex="0" dataindex="1_30" class="listTr" lindex="9" bindex="2" line="1" style="display: none;">
										<td>周六<br>034</td>
										<td title="英格兰冠军联赛" class="lname" style="background-color:#CC3300">英冠</td>
										<td>12-08<br>23:00</td>
										<td><img title="阵雨" src="http://static.sporttery.cn/www/images/weather_logo/rain.png"><br>&nbsp;11°</td>
										<td title="点击VS进入对阵数据页,点击球队名称进入球队介绍页" onclick="toArrData(114565)" class="vsTd"><label>[英冠15]</label>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=686">维冈</a>
											<a onclick="stopEvent(event)" class="vsA" target="_blank" href="http://info.sporttery.cn/football/info/fb_match_info.php?m=114565">VS</a>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=699">德比郡</a><label>[英冠7]</label></td>
										<td class="goalLineTd">
											<div title="胜平负" class="hadGL">0</div>
											<div title="让球胜平负" class="hhadGL"><label style="font-weight:normal;"></label>+1</div>
										</td>
										<td>
											<div class="hadOdds bLine"><span class="oddsItem rLine oddsItemKeep">2.80</span><span class="oddsItem rLine oddsItemKeep">3.25</span><span class="oddsItem oddsItemKeep">2.16</span></div>
											<div class="hhadOdds"><span class="oddsItem rLine oddsItemKeep">1.55</span><span class="oddsItem rLine oddsItemKeep">3.75</span><span class="oddsItem oddsItemKeep">4.60</span></div>
										</td>
										<td class="linkTd">
											<a href="http://info.sporttery.cn/football/info/fb_match_news.php?m=114565" target="_blank">讯</a>
											<a href="http://info.sporttery.cn/football/search_odds.php?mid=114565" target="_blank">同</a>
										</td>
										<td class="uOddsTd">
											<div class="hadU bLine"><span class="rLine" title="11">12%</span><span class="rLine" title="19">20%</span><span title="65">68%</span></div>
											<div class="hhadU"><span class="rLine" title="14">40%</span><span class="rLine" title="4">11%</span><span title="17">49%</span></div>
										</td>
										<td class="matchInfoTd">&nbsp;</td>
									</tr>
									<tr id="list_114583" singleindex="0" dataindex="1_31" class="listTr" lindex="10" bindex="2" line="-1" style="display: none;">
										<td>周六<br>052</td>
										<td title="西班牙甲级联赛" class="lname" style="background-color:#006633">西甲</td>
										<td>12-08<br>23:15</td>
										<td><img title="天晴" src="http://static.sporttery.cn/www/images/weather_logo/sunny.png"><br>&nbsp;7°</td>
										<td title="点击VS进入对阵数据页,点击球队名称进入球队介绍页" onclick="toArrData(114583)" class="vsTd"><label>[西甲14]</label>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=2015">巴伦西亚</a>
											<a onclick="stopEvent(event)" class="vsA" target="_blank" href="http://info.sporttery.cn/football/info/fb_match_info.php?m=114583">VS</a>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=2021">塞维利亚</a><label>[西甲2]</label></td>
										<td class="goalLineTd">
											<div title="胜平负" class="hadGL">0</div>
											<div title="让球胜平负" class="hhadGL"><label style="font-weight:normal;"></label>-1</div>
										</td>
										<td>
											<div class="hadOdds bLine"><span class="oddsItem rLine oddsItemKeep">2.05</span><span class="oddsItem rLine oddsItemKeep">3.25</span><span class="oddsItem oddsItemKeep">3.00</span></div>
											<div class="hhadOdds"><span class="oddsItem rLine oddsItemKeep">4.30</span><span class="oddsItem rLine oddsItemKeep">3.75</span><span class="oddsItem oddsItemKeep">1.59</span></div>
										</td>
										<td class="linkTd">
											<a href="http://info.sporttery.cn/football/info/fb_match_news.php?m=114583" target="_blank">讯</a>
											<a href="http://info.sporttery.cn/football/search_odds.php?mid=114583" target="_blank">同</a>
										</td>
										<td class="uOddsTd">
											<div class="hadU bLine"><span class="rLine" title="93">27%</span><span class="rLine" title="100">29%</span><span title="147">43%</span></div>
											<div class="hhadU"><span class="rLine" title="10">6%</span><span class="rLine" title="31">19%</span><span title="118">74%</span></div>
										</td>
										<td class="matchInfoTd">&nbsp;</td>
									</tr>
									<tr id="list_114584" singleindex="0" dataindex="1_32" class="listTr" lindex="11" bindex="2" line="-1" style="display: none;">
										<td>周六<br>053</td>
										<td title="葡萄牙超级联赛" class="lname" style="background-color:#008888">葡超</td>
										<td>12-08<br>23:30</td>
										<td>未知<br>&nbsp;11°</td>
										<td title="点击VS进入对阵数据页,点击球队名称进入球队介绍页" onclick="toArrData(114584)" class="vsTd"><label>[葡超9]</label>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=1692">比兰尼</a>
											<a onclick="stopEvent(event)" class="vsA" target="_blank" href="http://info.sporttery.cn/football/info/fb_match_info.php?m=114584">VS</a>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=1704">沙维什</a><label>[葡超18]</label></td>
										<td class="goalLineTd">
											<div title="胜平负" class="hadGL">0</div>
											<div title="让球胜平负" class="hhadGL"><label style="font-weight:normal;"></label>-1</div>
										</td>
										<td>
											<div class="hadOdds bLine"><span class="oddsItem rLine oddsItemKeep">2.06</span><span class="oddsItem rLine oddsItemKeep">3.05</span><span class="oddsItem oddsItemKeep">3.18</span></div>
											<div class="hhadOdds"><span class="oddsItem rLine oddsItemKeep">4.50</span><span class="oddsItem rLine oddsItemKeep">3.55</span><span class="oddsItem oddsItemKeep">1.60</span></div>
										</td>
										<td class="linkTd">
											<a href="http://info.sporttery.cn/football/info/fb_match_news.php?m=114584" target="_blank">讯</a>
											<a href="http://info.sporttery.cn/football/search_odds.php?mid=114584" target="_blank">同</a>
										</td>
										<td class="uOddsTd">
											<div class="hadU bLine"><span class="rLine" title="46">55%</span><span class="rLine" title="17">20%</span><span title="21">25%</span></div>
											<div class="hhadU"><span class="rLine" title="12">31%</span><span class="rLine" title="9">23%</span><span title="18">46%</span></div>
										</td>
										<td class="matchInfoTd">&nbsp;</td>
									</tr>
									<tr id="list_114585" singleindex="0" dataindex="1_33" class="listTr" lindex="6" bindex="2" line="1" style="display: none;">
										<td>周六<br>054</td>
										<td title="意大利甲级联赛" class="lname" style="background-color:#0066FF">意甲</td>
										<td>12-09<br>01:00</td>
										<td><img title="天晴" src="http://static.sporttery.cn/www/images/weather_logo/sunny.png"><br>&nbsp;10°</td>
										<td title="点击VS进入对阵数据页,点击球队名称进入球队介绍页" onclick="toArrData(114585)" class="vsTd"><label>[意甲13]</label>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=1256">卡利亚里</a>
											<a onclick="stopEvent(event)" class="vsA" target="_blank" href="http://info.sporttery.cn/football/info/fb_match_info.php?m=114585">VS</a>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=1241">罗马</a><label>[意甲7]</label></td>
										<td class="goalLineTd">
											<div title="胜平负" class="hadGL">0</div>
											<div title="让球胜平负" class="hhadGL"><label style="font-weight:normal;"></label>+1</div>
										</td>
										<td>
											<div class="hadOdds bLine"><span class="oddsItem rLine oddsItemKeep">3.75</span><span class="oddsItem rLine oddsItemKeep">3.50</span><span class="oddsItem oddsItemKeep">1.74</span></div>
											<div class="hhadOdds"><span class="oddsItem rLine oddsItemKeep">1.87</span><span class="oddsItem rLine oddsItemKeep">3.45</span><span class="oddsItem oddsItemKeep">3.30</span></div>
										</td>
										<td class="linkTd">
											<a href="http://info.sporttery.cn/football/info/fb_match_news.php?m=114585" target="_blank">讯</a>
											<a href="http://info.sporttery.cn/football/search_odds.php?mid=114585" target="_blank">同</a>
										</td>
										<td class="uOddsTd">
											<div class="hadU bLine"><span class="rLine" title="15">4%</span><span class="rLine" title="62">17%</span><span title="285">79%</span></div>
											<div class="hhadU"><span class="rLine" title="30">22%</span><span class="rLine" title="39">28%</span><span title="70">50%</span></div>
										</td>
										<td class="matchInfoTd">&nbsp;</td>
									</tr>
									<tr id="list_114589" singleindex="1" dataindex="1_34" class="listTr" lindex="15" bindex="2" line="1" style="display: none;">
										<td>周六<br>058</td>
										<td title="英格兰超级联赛" class="lname" style="background-color:#FF3333">英超</td>
										<td>12-09<br>01:30</td>
										<td><img title="毛毛雨" src="http://static.sporttery.cn/www/images/weather_logo/sprinkle.png"><br>&nbsp;13°</td>
										<td title="点击VS进入对阵数据页,点击球队名称进入球队介绍页" onclick="toArrData(114589)" class="vsTd"><label>[英超4]</label>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=661">切尔西</a>
											<a onclick="stopEvent(event)" class="vsA" target="_blank" href="http://info.sporttery.cn/football/info/fb_match_info.php?m=114589">VS</a>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=676">曼城</a><label>[英超1]</label></td>
										<td class="goalLineTd">
											<div title="胜平负" class="hadGL" style="background-image:url(./images/single.gif);background-repeat:no-repeat;background-position:left top;">0</div>
											<div title="让球胜平负" class="hhadGL"><label style="font-weight:normal;"></label>+1</div>
										</td>
										<td>
											<div class="hadOdds bLine"><span class="oddsItem rLine oddsItemKeep">3.60</span><span class="oddsItem rLine oddsItemKeep">3.45</span><span class="oddsItem oddsItemKeep">1.78</span></div>
											<div class="hhadOdds"><span class="oddsItem rLine oddsItemKeep">1.81</span><span class="oddsItem rLine oddsItemKeep">3.60</span><span class="oddsItem oddsItemKeep">3.35</span></div>
										</td>
										<td class="linkTd">
											<a href="http://info.sporttery.cn/football/info/fb_match_news.php?m=114589" target="_blank">讯</a>
											<a href="http://info.sporttery.cn/football/search_odds.php?mid=114589" target="_blank">同</a>
										</td>
										<td class="uOddsTd">
											<div class="hadU bLine"><span class="rLine" title="160">18%</span><span class="rLine" title="276">30%</span><span title="472">52%</span></div>
											<div class="hhadU"><span class="rLine" title="159">45%</span><span class="rLine" title="113">32%</span><span title="79">23%</span></div>
										</td>
										<td class="matchInfoTd">&nbsp;</td>
									</tr>
									<tr id="list_114590" singleindex="0" dataindex="1_35" class="listTr" lindex="9" bindex="2" line="1" style="display: none;">
										<td>周六<br>059</td>
										<td title="英格兰冠军联赛" class="lname" style="background-color:#CC3300">英冠</td>
										<td>12-09<br>01:30</td>
										<td>未知<br>&nbsp;10°</td>
										<td title="点击VS进入对阵数据页,点击球队名称进入球队介绍页" onclick="toArrData(114590)" class="vsTd"><label>[英冠21]</label>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=688">雷丁</a>
											<a onclick="stopEvent(event)" class="vsA" target="_blank" href="http://info.sporttery.cn/football/info/fb_match_info.php?m=114590">VS</a>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=687">谢菲联</a><label>[英冠6]</label></td>
										<td class="goalLineTd">
											<div title="胜平负" class="hadGL">0</div>
											<div title="让球胜平负" class="hhadGL"><label style="font-weight:normal;"></label>+1</div>
										</td>
										<td>
											<div class="hadOdds bLine"><span class="oddsItem rLine oddsItemKeep">4.45</span><span class="oddsItem rLine oddsItemKeep">3.65</span><span class="oddsItem oddsItemKeep">1.59</span></div>
											<div class="hhadOdds"><span class="oddsItem rLine oddsItemKeep">2.04</span><span class="oddsItem rLine oddsItemKeep">3.45</span><span class="oddsItem oddsItemKeep">2.86</span></div>
										</td>
										<td class="linkTd">
											<a href="http://info.sporttery.cn/football/info/fb_match_news.php?m=114590" target="_blank">讯</a>
											<a href="http://info.sporttery.cn/football/search_odds.php?mid=114590" target="_blank">同</a>
										</td>
										<td class="uOddsTd">
											<div class="hadU bLine"><span class="rLine" title="24">27%</span><span class="rLine" title="14">16%</span><span title="50">57%</span></div>
											<div class="hhadU"><span class="rLine" title="12">29%</span><span class="rLine" title="19">46%</span><span title="10">24%</span></div>
										</td>
										<td class="matchInfoTd">&nbsp;</td>
									</tr>
									<tr id="list_114591" singleindex="0" dataindex="1_36" class="listTr" lindex="5" bindex="2" line="1" style="display: none;">
										<td>周六<br>060</td>
										<td title="德国甲级联赛" class="lname" style="background-color:#990099">德甲</td>
										<td>12-09<br>01:30</td>
										<td><img title="毛毛雨" src="http://static.sporttery.cn/www/images/weather_logo/sprinkle.png"><br>&nbsp;10°</td>
										<td title="点击VS进入对阵数据页,点击球队名称进入球队介绍页" onclick="toArrData(114591)" class="vsTd"><label>[德甲7]</label>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=974">柏林赫塔</a>
											<a onclick="stopEvent(event)" class="vsA" target="_blank" href="http://info.sporttery.cn/football/info/fb_match_info.php?m=114591">VS</a>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=979">法兰克福</a><label>[德甲5]</label></td>
										<td class="goalLineTd">
											<div title="胜平负" class="hadGL">0</div>
											<div title="让球胜平负" class="hhadGL"><label style="font-weight:normal;"></label>+1</div>
										</td>
										<td>
											<div class="hadOdds bLine"><span class="oddsItem rLine oddsItemKeep">2.52</span><span class="oddsItem rLine oddsItemKeep">3.45</span><span class="oddsItem oddsItemKeep">2.27</span></div>
											<div class="hhadOdds"><span class="oddsItem rLine oddsItemKeep">1.49</span><span class="oddsItem rLine oddsItemKeep">4.10</span><span class="oddsItem oddsItemKeep">4.67</span></div>
										</td>
										<td class="linkTd">
											<a href="http://info.sporttery.cn/football/info/fb_match_news.php?m=114591" target="_blank">讯</a>
											<a href="http://info.sporttery.cn/football/search_odds.php?mid=114591" target="_blank">同</a>
										</td>
										<td class="uOddsTd">
											<div class="hadU bLine"><span class="rLine" title="64">23%</span><span class="rLine" title="77">28%</span><span title="134">49%</span></div>
											<div class="hhadU"><span class="rLine" title="46">48%</span><span class="rLine" title="15">16%</span><span title="34">36%</span></div>
										</td>
										<td class="matchInfoTd">&nbsp;</td>
									</tr>
									<tr id="list_114592" singleindex="0" dataindex="1_37" class="listTr" lindex="10" bindex="2" line="-1" style="display: none;">
										<td>周六<br>061</td>
										<td title="西班牙甲级联赛" class="lname" style="background-color:#006633">西甲</td>
										<td>12-09<br>01:30</td>
										<td>未知<br>&nbsp;10°</td>
										<td title="点击VS进入对阵数据页,点击球队名称进入球队介绍页" onclick="toArrData(114592)" class="vsTd"><label>[西甲17]</label>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=2023">比利亚雷</a>
											<a onclick="stopEvent(event)" class="vsA" target="_blank" href="http://info.sporttery.cn/football/info/fb_match_info.php?m=114592">VS</a>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=2033">塞尔塔</a><label>[西甲13]</label></td>
										<td class="goalLineTd">
											<div title="胜平负" class="hadGL">0</div>
											<div title="让球胜平负" class="hhadGL"><label style="font-weight:normal;"></label>-1</div>
										</td>
										<td>
											<div class="hadOdds bLine"><span class="oddsItem rLine oddsItemKeep">1.68</span><span class="oddsItem rLine oddsItemKeep">3.60</span><span class="oddsItem oddsItemKeep">3.90</span></div>
											<div class="hhadOdds"><span class="oddsItem rLine oddsItemKeep">3.12</span><span class="oddsItem rLine oddsItemKeep">3.50</span><span class="oddsItem oddsItemKeep">1.91</span></div>
										</td>
										<td class="linkTd">
											<a href="http://info.sporttery.cn/football/info/fb_match_news.php?m=114592" target="_blank">讯</a>
											<a href="http://info.sporttery.cn/football/search_odds.php?mid=114592" target="_blank">同</a>
										</td>
										<td class="uOddsTd">
											<div class="hadU bLine"><span class="rLine" title="83">62%</span><span class="rLine" title="33">25%</span><span title="17">13%</span></div>
											<div class="hhadU"><span class="rLine" title="26">46%</span><span class="rLine" title="19">33%</span><span title="12">21%</span></div>
										</td>
										<td class="matchInfoTd">&nbsp;</td>
									</tr>
									<tr id="list_114593" singleindex="0" dataindex="1_38" class="listTr" lindex="3" bindex="2" line="-1" style="display: none;">
										<td>周六<br>062</td>
										<td title="荷兰甲级联赛" class="lname" style="background-color:#FF6699">荷甲</td>
										<td>12-09<br>01:30</td>
										<td><img title="雨" src="http://static.sporttery.cn/www/images/weather_logo/rain.png"><br>&nbsp;11°</td>
										<td title="点击VS进入对阵数据页,点击球队名称进入球队介绍页" onclick="toArrData(114593)" class="vsTd"><label>[荷甲11]</label>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=1521">威廉二世</a>
											<a onclick="stopEvent(event)" class="vsA" target="_blank" href="http://info.sporttery.cn/football/info/fb_match_info.php?m=114593">VS</a>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=1519">海伦芬</a><label>[荷甲9]</label></td>
										<td class="goalLineTd">
											<div title="胜平负" class="hadGL">0</div>
											<div title="让球胜平负" class="hhadGL"><label style="font-weight:normal;"></label>-1</div>
										</td>
										<td>
											<div class="hadOdds bLine"><span class="oddsItem rLine oddsItemKeep">2.00</span><span class="oddsItem rLine oddsItemKeep">3.45</span><span class="oddsItem oddsItemKeep">2.95</span></div>
											<div class="hhadOdds"><span class="oddsItem rLine oddsItemKeep">4.05</span><span class="oddsItem rLine oddsItemKeep">3.80</span><span class="oddsItem oddsItemKeep">1.62</span></div>
										</td>
										<td class="linkTd">
											<a href="http://info.sporttery.cn/football/info/fb_match_news.php?m=114593" target="_blank">讯</a>
											<a href="http://info.sporttery.cn/football/search_odds.php?mid=114593" target="_blank">同</a>
										</td>
										<td class="uOddsTd">
											<div class="hadU bLine"><span class="rLine" title="18">44%</span><span class="rLine" title="11">27%</span><span title="12">29%</span></div>
											<div class="hhadU"><span class="rLine" title="9">25%</span><span class="rLine" title="11">31%</span><span title="16">44%</span></div>
										</td>
										<td class="matchInfoTd">&nbsp;</td>
									</tr>
									<tr id="list_114594" singleindex="0" dataindex="1_39" class="listTr" lindex="11" bindex="2" line="1" style="display: none;">
										<td>周六<br>063</td>
										<td title="葡萄牙超级联赛" class="lname" style="background-color:#008888">葡超</td>
										<td>12-09<br>02:00</td>
										<td>未知<br>&nbsp;8°</td>
										<td title="点击VS进入对阵数据页,点击球队名称进入球队介绍页" onclick="toArrData(114594)" class="vsTd"><label>[葡超15]</label>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=11833">通德拉</a>
											<a onclick="stopEvent(event)" class="vsA" target="_blank" href="http://info.sporttery.cn/football/info/fb_match_info.php?m=114594">VS</a>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=1682">布拉加</a><label>[葡超3]</label></td>
										<td class="goalLineTd">
											<div title="胜平负" class="hadGL">0</div>
											<div title="让球胜平负" class="hhadGL"><label style="font-weight:normal;"></label>+1</div>
										</td>
										<td>
											<div class="hadOdds bLine"><span class="oddsItem rLine oddsItemKeep">4.90</span><span class="oddsItem rLine oddsItemKeep">3.65</span><span class="oddsItem oddsItemKeep">1.54</span></div>
											<div class="hhadOdds"><span class="oddsItem rLine oddsItemKeep">2.18</span><span class="oddsItem rLine oddsItemKeep">3.45</span><span class="oddsItem oddsItemKeep">2.63</span></div>
										</td>
										<td class="linkTd">
											<a href="http://info.sporttery.cn/football/info/fb_match_news.php?m=114594" target="_blank">讯</a>
											<a href="http://info.sporttery.cn/football/search_odds.php?mid=114594" target="_blank">同</a>
										</td>
										<td class="uOddsTd">
											<div class="hadU bLine"><span class="rLine" title="9">4%</span><span class="rLine" title="14">6%</span><span title="210">90%</span></div>
											<div class="hhadU"><span class="rLine" title="15">9%</span><span class="rLine" title="78">47%</span><span title="74">44%</span></div>
										</td>
										<td class="matchInfoTd">&nbsp;</td>
									</tr>
									<tr id="list_114595" singleindex="0" dataindex="1_40" class="listTr" lindex="3" bindex="2" line="2" style="display: none;">
										<td>周六<br>064</td>
										<td title="荷兰甲级联赛" class="lname" style="background-color:#FF6699">荷甲</td>
										<td>12-09<br>02:45</td>
										<td>未知<br>&nbsp;11°</td>
										<td title="点击VS进入对阵数据页,点击球队名称进入球队介绍页" onclick="toArrData(114595)" class="vsTd"><label>[荷甲14]</label>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=1529">兹沃勒</a>
											<a onclick="stopEvent(event)" class="vsA" target="_blank" href="http://info.sporttery.cn/football/info/fb_match_info.php?m=114595">VS</a>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=1515">阿贾克斯</a><label>[荷甲2]</label></td>
										<td class="goalLineTd">
											<div title="胜平负" class="hadGL">0</div>
											<div title="让球胜平负" class="hhadGL"><label style="font-weight:normal;"></label>+2</div>
										</td>
										<td>
											<div class="hadOdds bLine"><span class="oddsItem rLine oddsItemKeep">13.00</span><span class="oddsItem rLine oddsItemKeep">7.05</span><span class="oddsItem oddsItemKeep">1.10</span></div>
											<div class="hhadOdds"><span class="oddsItem rLine oddsItemKeep">2.40</span><span class="oddsItem rLine oddsItemKeep">4.15</span><span class="oddsItem oddsItemKeep">2.12</span></div>
										</td>
										<td class="linkTd">
											<a href="http://info.sporttery.cn/football/info/fb_match_news.php?m=114595" target="_blank">讯</a>
											<a href="http://info.sporttery.cn/football/search_odds.php?mid=114595" target="_blank">同</a>
										</td>
										<td class="uOddsTd">
											<div class="hadU bLine"><span class="rLine" title="17">6%</span><span class="rLine" title="27">10%</span><span title="221">83%</span></div>
											<div class="hhadU"><span class="rLine" title="57">18%</span><span class="rLine" title="104">33%</span><span title="154">49%</span></div>
										</td>
										<td class="matchInfoTd">&nbsp;</td>
									</tr>
									<tr id="list_114596" singleindex="0" dataindex="1_41" class="listTr" lindex="8" bindex="2" line="-1" style="display: none;">
										<td>周六<br>065</td>
										<td title="法国甲级联赛" class="lname" style="background-color:#6B2B2B">法甲</td>
										<td>12-09<br>03:00</td>
										<td>未知<br>&nbsp;11°</td>
										<td title="点击VS进入对阵数据页,点击球队名称进入球队介绍页" onclick="toArrData(114596)" class="vsTd"><label>[法甲14]</label>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=918">昂热</a>
											<a onclick="stopEvent(event)" class="vsA" target="_blank" href="http://info.sporttery.cn/football/info/fb_match_info.php?m=114596">VS</a>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=891">波尔多</a><label>[法甲10]</label></td>
										<td class="goalLineTd">
											<div title="胜平负" class="hadGL">0</div>
											<div title="让球胜平负" class="hhadGL"><label style="font-weight:normal;"></label>-1</div>
										</td>
										<td>
											<div class="hadOdds bLine"><span class="oddsItem rLine oddsItemKeep oddsDis">2.25</span><span class="oddsItem rLine oddsItemKeep oddsDis">2.90</span><span class="oddsItem oddsItemKeep oddsDis">2.95</span></div>
											<div class="hhadOdds"><span class="oddsItem rLine oddsItemKeep oddsDis">5.20</span><span class="oddsItem rLine oddsItemKeep oddsDis">3.70</span><span class="oddsItem oddsItemKeep oddsDis">1.50</span></div>
										</td>
										<td class="linkTd">
											<a href="http://info.sporttery.cn/football/info/fb_match_news.php?m=114596" target="_blank">讯</a>
											<a href="http://info.sporttery.cn/football/search_odds.php?mid=114596" target="_blank">同</a>
										</td>
										<td class="uOddsTd">
											<div class="hadU bLine"><span class="rLine" title="5">19%</span><span class="rLine" title="11">42%</span><span title="10">38%</span></div>
											<div class="hhadU"><span class="rLine" title="5">33%</span><span class="rLine" title="3">20%</span><span title="7">47%</span></div>
										</td>
										<td class="matchInfoTd">&nbsp;</td>
									</tr>
									<tr id="list_114597" singleindex="0" dataindex="1_42" class="listTr" lindex="8" bindex="2" line="-1" style="display: none;">
										<td>周六<br>066</td>
										<td title="法国甲级联赛" class="lname" style="background-color:#6B2B2B">法甲</td>
										<td>12-09<br>03:00</td>
										<td><img title="微雨" src="http://static.sporttery.cn/www/images/weather_logo/sprinkle.png"><br>&nbsp;12°</td>
										<td title="点击VS进入对阵数据页,点击球队名称进入球队介绍页" onclick="toArrData(114597)" class="vsTd"><label>[法甲20]</label>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=904">甘冈</a>
											<a onclick="stopEvent(event)" class="vsA" target="_blank" href="http://info.sporttery.cn/football/info/fb_match_info.php?m=114597">VS</a>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=908">亚眠</a><label>[法甲19]</label></td>
										<td class="goalLineTd">
											<div title="胜平负" class="hadGL">0</div>
											<div title="让球胜平负" class="hhadGL"><label style="font-weight:normal;"></label>-1</div>
										</td>
										<td>
											<div class="hadOdds bLine"><span class="oddsItem rLine oddsItemKeep">1.95</span><span class="oddsItem rLine oddsItemKeep">3.00</span><span class="oddsItem oddsItemKeep">3.53</span></div>
											<div class="hhadOdds"><span class="oddsItem rLine oddsItemKeep">4.15</span><span class="oddsItem rLine oddsItemKeep">3.55</span><span class="oddsItem oddsItemKeep">1.65</span></div>
										</td>
										<td class="linkTd">
											<a href="http://info.sporttery.cn/football/info/fb_match_news.php?m=114597" target="_blank">讯</a>
											<a href="http://info.sporttery.cn/football/search_odds.php?mid=114597" target="_blank">同</a>
										</td>
										<td class="uOddsTd">
											<div class="hadU bLine"><span class="rLine" title="47">43%</span><span class="rLine" title="44">40%</span><span title="19">17%</span></div>
											<div class="hhadU"><span class="rLine" title="11">26%</span><span class="rLine" title="11">26%</span><span title="21">49%</span></div>
										</td>
										<td class="matchInfoTd">&nbsp;</td>
									</tr>
									<tr id="list_114598" singleindex="0" dataindex="1_43" class="listTr" lindex="8" bindex="2" line="-1" style="display: none;">
										<td>周六<br>067</td>
										<td title="法国甲级联赛" class="lname" style="background-color:#6B2B2B">法甲</td>
										<td>12-09<br>03:00</td>
										<td><img title="多云" src="http://static.sporttery.cn/www/images/weather_logo/cloudy.png"><br>&nbsp;12°</td>
										<td title="点击VS进入对阵数据页,点击球队名称进入球队介绍页" onclick="toArrData(114598)" class="vsTd"><label>[法甲13]</label>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=893">雷恩</a>
											<a onclick="stopEvent(event)" class="vsA" target="_blank" href="http://info.sporttery.cn/football/info/fb_match_info.php?m=114598">VS</a>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=923">第戎</a><label>[法甲16]</label></td>
										<td class="goalLineTd">
											<div title="胜平负" class="hadGL">0</div>
											<div title="让球胜平负" class="hhadGL"><label style="font-weight:normal;"></label>-1</div>
										</td>
										<td>
											<div class="hadOdds bLine"><span class="oddsItem rLine oddsItemKeep">1.48</span><span class="oddsItem rLine oddsItemKeep">3.75</span><span class="oddsItem oddsItemKeep">5.40</span></div>
											<div class="hhadOdds"><span class="oddsItem rLine oddsItemKeep">2.55</span><span class="oddsItem rLine oddsItemKeep">3.30</span><span class="oddsItem oddsItemKeep">2.31</span></div>
										</td>
										<td class="linkTd">
											<a href="http://info.sporttery.cn/football/info/fb_match_news.php?m=114598" target="_blank">讯</a>
											<a href="http://info.sporttery.cn/football/search_odds.php?mid=114598" target="_blank">同</a>
										</td>
										<td class="uOddsTd">
											<div class="hadU bLine"><span class="rLine" title="55">65%</span><span class="rLine" title="20">24%</span><span title="10">12%</span></div>
											<div class="hhadU"><span class="rLine" title="17">38%</span><span class="rLine" title="16">36%</span><span title="12">27%</span></div>
										</td>
										<td class="matchInfoTd">&nbsp;</td>
									</tr>
									<tr id="list_114599" singleindex="0" dataindex="1_44" class="listTr" lindex="8" bindex="2" line="-1" style="display: none;">
										<td>周六<br>068</td>
										<td title="法国甲级联赛" class="lname" style="background-color:#6B2B2B">法甲</td>
										<td>12-09<br>03:00</td>
										<td>未知<br>&nbsp;8°</td>
										<td title="点击VS进入对阵数据页,点击球队名称进入球队介绍页" onclick="toArrData(114599)" class="vsTd"><label>[法甲8]</label>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=932">尼姆</a>
											<a onclick="stopEvent(event)" class="vsA" target="_blank" href="http://info.sporttery.cn/football/info/fb_match_info.php?m=114599">VS</a>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=889">南特</a><label>[法甲12]</label></td>
										<td class="goalLineTd">
											<div title="胜平负" class="hadGL">0</div>
											<div title="让球胜平负" class="hhadGL"><label style="font-weight:normal;"></label>-1</div>
										</td>
										<td>
											<div class="hadOdds bLine"><span class="oddsItem rLine oddsItemKeep oddsDis">2.15</span><span class="oddsItem rLine oddsItemKeep oddsDis">3.00</span><span class="oddsItem oddsItemKeep oddsDis">3.03</span></div>
											<div class="hhadOdds"><span class="oddsItem rLine oddsItemKeep oddsDis">4.60</span><span class="oddsItem rLine oddsItemKeep oddsDis">3.75</span><span class="oddsItem oddsItemKeep oddsDis">1.55</span></div>
										</td>
										<td class="linkTd">
											<a href="http://info.sporttery.cn/football/info/fb_match_news.php?m=114599" target="_blank">讯</a>
											<a href="http://info.sporttery.cn/football/search_odds.php?mid=114599" target="_blank">同</a>
										</td>
										<td class="uOddsTd">
											<div class="hadU bLine"><span class="rLine" title="10">37%</span><span class="rLine" title="13">48%</span><span title="4">15%</span></div>
											<div class="hhadU"><span class="rLine" title="7">58%</span><span class="rLine" title="1">8%</span><span title="4">33%</span></div>
										</td>
										<td class="matchInfoTd">&nbsp;</td>
									</tr>
									<tr id="list_114602" singleindex="0" dataindex="1_45" class="listTr" lindex="6" bindex="2" line="-1" style="display: none;">
										<td>周六<br>071</td>
										<td title="意大利甲级联赛" class="lname" style="background-color:#0066FF">意甲</td>
										<td>12-09<br>03:30</td>
										<td><img title="天晴" src="http://static.sporttery.cn/www/images/weather_logo/sunny.png"><br>&nbsp;7°</td>
										<td title="点击VS进入对阵数据页,点击球队名称进入球队介绍页" onclick="toArrData(114602)" class="vsTd"><label>[意甲5]</label>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=1245">拉齐奥</a>
											<a onclick="stopEvent(event)" class="vsA" target="_blank" href="http://info.sporttery.cn/football/info/fb_match_info.php?m=114602">VS</a>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=1247">桑普</a><label>[意甲10]</label></td>
										<td class="goalLineTd">
											<div title="胜平负" class="hadGL">0</div>
											<div title="让球胜平负" class="hhadGL"><label style="font-weight:normal;"></label>-1</div>
										</td>
										<td>
											<div class="hadOdds bLine"><span class="oddsItem rLine oddsItemKeep">1.31</span><span class="oddsItem rLine oddsItemKeep">4.50</span><span class="oddsItem oddsItemKeep">7.00</span></div>
											<div class="hhadOdds"><span class="oddsItem rLine oddsItemKeep">2.02</span><span class="oddsItem rLine oddsItemKeep">3.55</span><span class="oddsItem oddsItemKeep">2.85</span></div>
										</td>
										<td class="linkTd">
											<a href="http://info.sporttery.cn/football/info/fb_match_news.php?m=114602" target="_blank">讯</a>
											<a href="http://info.sporttery.cn/football/search_odds.php?mid=114602" target="_blank">同</a>
										</td>
										<td class="uOddsTd">
											<div class="hadU bLine"><span class="rLine" title="249">78%</span><span class="rLine" title="29">9%</span><span title="42">13%</span></div>
											<div class="hhadU"><span class="rLine" title="88">65%</span><span class="rLine" title="32">24%</span><span title="15">11%</span></div>
										</td>
										<td class="matchInfoTd">&nbsp;</td>
									</tr>
									<tr id="list_114604" singleindex="0" dataindex="1_46" class="listTr" lindex="15" bindex="2" line="1" style="display: none;">
										<td>周六<br>073</td>
										<td title="英格兰超级联赛" class="lname" style="background-color:#FF3333">英超</td>
										<td>12-09<br>03:45</td>
										<td><img title="雨" src="http://static.sporttery.cn/www/images/weather_logo/rain.png"><br>&nbsp;12°</td>
										<td title="点击VS进入对阵数据页,点击球队名称进入球队介绍页" onclick="toArrData(114604)" class="vsTd"><label>[英超9]</label>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=682">莱切斯特</a>
											<a onclick="stopEvent(event)" class="vsA" target="_blank" href="http://info.sporttery.cn/football/info/fb_match_info.php?m=114604">VS</a>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=675">热刺</a><label>[英超3]</label></td>
										<td class="goalLineTd">
											<div title="胜平负" class="hadGL">0</div>
											<div title="让球胜平负" class="hhadGL"><label style="font-weight:normal;"></label>+1</div>
										</td>
										<td>
											<div class="hadOdds bLine"><span class="oddsItem rLine oddsItemKeep">3.55</span><span class="oddsItem rLine oddsItemKeep">3.45</span><span class="oddsItem oddsItemKeep">1.80</span></div>
											<div class="hhadOdds"><span class="oddsItem rLine oddsItemKeep">1.81</span><span class="oddsItem rLine oddsItemKeep">3.55</span><span class="oddsItem oddsItemKeep">3.40</span></div>
										</td>
										<td class="linkTd">
											<a href="http://info.sporttery.cn/football/info/fb_match_news.php?m=114604" target="_blank">讯</a>
											<a href="http://info.sporttery.cn/football/search_odds.php?mid=114604" target="_blank">同</a>
										</td>
										<td class="uOddsTd">
											<div class="hadU bLine"><span class="rLine" title="76">14%</span><span class="rLine" title="92">17%</span><span title="371">69%</span></div>
											<div class="hhadU"><span class="rLine" title="80">34%</span><span class="rLine" title="98">41%</span><span title="60">25%</span></div>
										</td>
										<td class="matchInfoTd">&nbsp;</td>
									</tr>
									<tr id="list_114605" singleindex="0" dataindex="1_47" class="listTr" lindex="10" bindex="2" line="1" style="display: none;">
										<td>周六<br>074</td>
										<td title="西班牙甲级联赛" class="lname" style="background-color:#006633">西甲</td>
										<td>12-09<br>03:45</td>
										<td><img title="天晴" src="http://static.sporttery.cn/www/images/weather_logo/sunny.png"><br>&nbsp;8°</td>
										<td title="点击VS进入对阵数据页,点击球队名称进入球队介绍页" onclick="toArrData(114605)" class="vsTd"><label>[西甲7]</label>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=2032">西班牙人</a>
											<a onclick="stopEvent(event)" class="vsA" target="_blank" href="http://info.sporttery.cn/football/info/fb_match_info.php?m=114605">VS</a>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=2017">巴萨</a><label>[西甲1]</label></td>
										<td class="goalLineTd">
											<div title="胜平负" class="hadGL">0</div>
											<div title="让球胜平负" class="hhadGL"><label style="font-weight:normal;"></label>+1</div>
										</td>
										<td>
											<div class="hadOdds bLine"><span class="oddsItem rLine oddsItemKeep">5.40</span><span class="oddsItem rLine oddsItemKeep">4.10</span><span class="oddsItem oddsItemKeep">1.43</span></div>
											<div class="hhadOdds"><span class="oddsItem rLine oddsItemKeep">2.38</span><span class="oddsItem rLine oddsItemKeep">3.50</span><span class="oddsItem oddsItemKeep">2.36</span></div>
										</td>
										<td class="linkTd">
											<a href="http://info.sporttery.cn/football/info/fb_match_news.php?m=114605" target="_blank">讯</a>
											<a href="http://info.sporttery.cn/football/search_odds.php?mid=114605" target="_blank">同</a>
										</td>
										<td class="uOddsTd">
											<div class="hadU bLine"><span class="rLine" title="37">6%</span><span class="rLine" title="62">10%</span><span title="552">85%</span></div>
											<div class="hhadU"><span class="rLine" title="48">12%</span><span class="rLine" title="121">31%</span><span title="219">56%</span></div>
										</td>
										<td class="matchInfoTd">&nbsp;</td>
									</tr>
									<tr id="list_114606" singleindex="0" dataindex="1_48" class="listTr" lindex="3" bindex="2" line="-1" style="display: none;">
										<td>周六<br>075</td>
										<td title="荷兰甲级联赛" class="lname" style="background-color:#FF6699">荷甲</td>
										<td>12-09<br>03:45</td>
										<td><img title="大致多云" src="http://static.sporttery.cn/www/images/weather_logo/cloudy.png"><br>&nbsp;12°</td>
										<td title="点击VS进入对阵数据页,点击球队名称进入球队介绍页" onclick="toArrData(114606)" class="vsTd"><label>[荷甲13]</label>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=1514">海牙</a>
											<a onclick="stopEvent(event)" class="vsA" target="_blank" href="http://info.sporttery.cn/football/info/fb_match_info.php?m=114606">VS</a>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=1537">格拉夫</a><label>[荷甲17]</label></td>
										<td class="goalLineTd">
											<div title="胜平负" class="hadGL">0</div>
											<div title="让球胜平负" class="hhadGL"><label style="font-weight:normal;"></label>-1</div>
										</td>
										<td>
											<div class="hadOdds bLine"><span class="oddsItem rLine oddsItemKeep">1.44</span><span class="oddsItem rLine oddsItemKeep">4.20</span><span class="oddsItem oddsItemKeep">5.10</span></div>
											<div class="hhadOdds"><span class="oddsItem rLine oddsItemKeep">2.28</span><span class="oddsItem rLine oddsItemKeep">3.60</span><span class="oddsItem oddsItemKeep">2.42</span></div>
										</td>
										<td class="linkTd">
											<a href="http://info.sporttery.cn/football/info/fb_match_news.php?m=114606" target="_blank">讯</a>
											<a href="http://info.sporttery.cn/football/search_odds.php?mid=114606" target="_blank">同</a>
										</td>
										<td class="uOddsTd">
											<div class="hadU bLine"><span class="rLine" title="35">49%</span><span class="rLine" title="9">13%</span><span title="28">39%</span></div>
											<div class="hhadU"><span class="rLine" title="14">44%</span><span class="rLine" title="5">16%</span><span title="13">41%</span></div>
										</td>
										<td class="matchInfoTd">&nbsp;</td>
									</tr>
									<tr id="list_114609" singleindex="0" dataindex="1_49" class="listTr" lindex="11" bindex="2" line="1" style="display: none;">
										<td>周六<br>078</td>
										<td title="葡萄牙超级联赛" class="lname" style="background-color:#008888">葡超</td>
										<td>12-09<br>04:30</td>
										<td><img title="天晴" src="http://static.sporttery.cn/www/images/weather_logo/sunny.png"><br>&nbsp;9°</td>
										<td title="点击VS进入对阵数据页,点击球队名称进入球队介绍页" onclick="toArrData(114609)" class="vsTd"><label>[葡超7]</label>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=1696">塞图巴尔</a>
											<a onclick="stopEvent(event)" class="vsA" target="_blank" href="http://info.sporttery.cn/football/info/fb_match_info.php?m=114609">VS</a>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=1679">本菲卡</a><label>[葡超4]</label></td>
										<td class="goalLineTd">
											<div title="胜平负" class="hadGL">0</div>
											<div title="让球胜平负" class="hhadGL"><label style="font-weight:normal;"></label>+1</div>
										</td>
										<td>
											<div class="hadOdds bLine"><span class="oddsItem rLine oddsItemKeep">7.20</span><span class="oddsItem rLine oddsItemKeep">4.00</span><span class="oddsItem oddsItemKeep">1.35</span></div>
											<div class="hhadOdds"><span class="oddsItem rLine oddsItemKeep">2.74</span><span class="oddsItem rLine oddsItemKeep">3.40</span><span class="oddsItem oddsItemKeep">2.13</span></div>
										</td>
										<td class="linkTd">
											<a href="http://info.sporttery.cn/football/info/fb_match_news.php?m=114609" target="_blank">讯</a>
											<a href="http://info.sporttery.cn/football/search_odds.php?mid=114609" target="_blank">同</a>
										</td>
										<td class="uOddsTd">
											<div class="hadU bLine"><span class="rLine" title="35">16%</span><span class="rLine" title="33">15%</span><span title="147">68%</span></div>
											<div class="hhadU"><span class="rLine" title="24">18%</span><span class="rLine" title="41">30%</span><span title="70">52%</span></div>
										</td>
										<td class="matchInfoTd">&nbsp;</td>
									</tr>
									<tr id="list_114613" singleindex="0" dataindex="1_50" class="listTr" lindex="16" bindex="2" line="-1" style="display: none;">
										<td>周六<br>082</td>
										<td title="美国职业大联盟" class="lname" style="background-color:#660033">美职足</td>
										<td>12-09<br>09:00</td>
										<td><img title="大致多云" src="http://static.sporttery.cn/www/images/weather_logo/cloudy.png"><br>&nbsp;3°</td>
										<td title="点击VS进入对阵数据页,点击球队名称进入球队介绍页" onclick="toArrData(114613)" class="vsTd"><label></label>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=38167">亚特联</a>
											<a onclick="stopEvent(event)" class="vsA" target="_blank" href="http://info.sporttery.cn/football/info/fb_match_info.php?m=114613">VS</a>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=17501">波特兰</a><label></label></td>
										<td class="goalLineTd">
											<div title="胜平负" class="hadGL">0</div>
											<div title="让球胜平负" class="hhadGL"><label style="font-weight:normal;"></label>-1</div>
										</td>
										<td>
											<div class="hadOdds bLine"><span class="oddsItem rLine oddsItemKeep">1.31</span><span class="oddsItem rLine oddsItemKeep">4.50</span><span class="oddsItem oddsItemKeep">7.00</span></div>
											<div class="hhadOdds"><span class="oddsItem rLine oddsItemKeep">2.02</span><span class="oddsItem rLine oddsItemKeep">3.45</span><span class="oddsItem oddsItemKeep">2.90</span></div>
										</td>
										<td class="linkTd">
											<a href="http://info.sporttery.cn/football/info/fb_match_news.php?m=114613" target="_blank">讯</a>
											<a href="http://info.sporttery.cn/football/search_odds.php?mid=114613" target="_blank">同</a>
										</td>
										<td class="uOddsTd">
											<div class="hadU bLine"><span class="rLine" title="124">76%</span><span class="rLine" title="25">15%</span><span title="15">9%</span></div>
											<div class="hhadU"><span class="rLine" title="55">59%</span><span class="rLine" title="28">30%</span><span title="11">12%</span></div>
										</td>
										<td class="matchInfoTd">&nbsp;</td>
									</tr>
									<tr>
										<td class="bDateTd" colspan="10" bindex="3">周日 2018-12-09&nbsp;&nbsp;&nbsp;共<label>27</label>场比赛&nbsp;&nbsp;&nbsp;
											<a href="javascript:void(0);" class="bDateHide">[显示]</a>
										</td>
									</tr>
									<tr id="list_114616" singleindex="0" dataindex="2_0" class="listTr" lindex="1" bindex="3" line="-1" style="display: none;">
										<td style="width: 48px;">周日<br>002</td>
										<td title="澳大利亚超级联赛" class="lname" style="background-color: rgb(255, 112, 0); width: 73px;">澳超</td>
										<td style="width: 49px;">12-09<br>14:00</td>
										<td style="width: 49px;"><img title="天晴" src="http://static.sporttery.cn/www/images/weather_logo/sunny.png"><br>&nbsp;27°</td>
										<td title="点击VS进入对阵数据页,点击球队名称进入球队介绍页" onclick="toArrData(114616)" class="vsTd" style="width: 301px;"><label>[澳超7]</label>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=4320">纽喷气机</a>
											<a onclick="stopEvent(event)" class="vsA" target="_blank" href="http://info.sporttery.cn/football/info/fb_match_info.php?m=114616">VS</a>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=4321">布里斯班</a><label>[澳超6]</label></td>
										<td class="goalLineTd" style="width: 61px;">
											<div title="胜平负" class="hadGL">0</div>
											<div title="让球胜平负" class="hhadGL"><label style="font-weight:normal;"></label>-1</div>
										</td>
										<td style="width: 301px;">
											<div class="hadOdds bLine"><span class="oddsItem rLine oddsItemKeep">1.84</span><span class="oddsItem rLine oddsItemKeep">3.45</span><span class="oddsItem oddsItemKeep">3.40</span></div>
											<div class="hhadOdds"><span class="oddsItem rLine oddsItemKeep">3.55</span><span class="oddsItem rLine oddsItemKeep">3.60</span><span class="oddsItem oddsItemKeep">1.76</span></div>
										</td>
										<td class="linkTd" style="width: 73px;">
											<a href="http://info.sporttery.cn/football/info/fb_match_news.php?m=114616" target="_blank">讯</a>
											<a href="http://info.sporttery.cn/football/search_odds.php?mid=114616" target="_blank">同</a>
										</td>
										<td class="uOddsTd" style="width: 136px;">
											<div class="hadU bLine"><span class="rLine" title="22">58%</span><span class="rLine" title="11">29%</span><span title="5">13%</span></div>
											<div class="hhadU"><span class="rLine" title="2">8%</span><span class="rLine" title="7">29%</span><span title="15">63%</span></div>
										</td>
										<td class="matchInfoTd" style="width: 81px;">&nbsp;</td>
									</tr>
									<tr id="list_114617" singleindex="0" dataindex="2_1" class="listTr" lindex="17" bindex="3" line="-1" style="display: none;">
										<td>周日<br>003</td>
										<td title="日本天皇杯" class="lname" style="background-color:#003306">天皇杯</td>
										<td>12-09<br>17:00</td>
										<td>未知<br>&nbsp;12°</td>
										<td title="点击VS进入对阵数据页,点击球队名称进入球队介绍页" onclick="toArrData(114617)" class="vsTd"><label></label>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=1323">浦和红钻</a>
											<a onclick="stopEvent(event)" class="vsA" target="_blank" href="http://info.sporttery.cn/football/info/fb_match_info.php?m=114617">VS</a>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=1344">仙台七夕</a><label></label></td>
										<td class="goalLineTd">
											<div title="胜平负" class="hadGL">0</div>
											<div title="让球胜平负" class="hhadGL"><label style="font-weight:normal;"></label>-1</div>
										</td>
										<td>
											<div class="hadOdds bLine"><span class="oddsItem rLine oddsItemKeep">1.57</span><span class="oddsItem rLine oddsItemKeep">3.65</span><span class="oddsItem oddsItemKeep">4.60</span></div>
											<div class="hhadOdds"><span class="oddsItem rLine oddsItemKeep">2.79</span><span class="oddsItem rLine oddsItemKeep">3.35</span><span class="oddsItem oddsItemKeep">2.12</span></div>
										</td>
										<td class="linkTd">
											<a href="http://info.sporttery.cn/football/info/fb_match_news.php?m=114617" target="_blank">讯</a>
											<a href="http://info.sporttery.cn/football/search_odds.php?mid=114617" target="_blank">同</a>
										</td>
										<td class="uOddsTd">
											<div class="hadU bLine"><span class="rLine" title="230">84%</span><span class="rLine" title="36">13%</span><span title="9">3%</span></div>
											<div class="hhadU"><span class="rLine" title="42">51%</span><span class="rLine" title="26">31%</span><span title="15">18%</span></div>
										</td>
										<td class="matchInfoTd">&nbsp;</td>
									</tr>
									<tr id="list_114618" singleindex="0" dataindex="2_2" class="listTr" lindex="10" bindex="3" line="-1" style="display: none;">
										<td>周日<br>004</td>
										<td title="西班牙甲级联赛" class="lname" style="background-color:#006633">西甲</td>
										<td>12-09<br>19:00</td>
										<td><img title="天晴" src="http://static.sporttery.cn/www/images/weather_logo/sunny.png"><br>&nbsp;8°</td>
										<td title="点击VS进入对阵数据页,点击球队名称进入球队介绍页" onclick="toArrData(114618)" class="vsTd"><label>[西甲12]</label>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=2042">埃瓦尔</a>
											<a onclick="stopEvent(event)" class="vsA" target="_blank" href="http://info.sporttery.cn/football/info/fb_match_info.php?m=114618">VS</a>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=2036">莱万特</a><label>[西甲6]</label></td>
										<td class="goalLineTd">
											<div title="胜平负" class="hadGL">0</div>
											<div title="让球胜平负" class="hhadGL"><label style="font-weight:normal;"></label>-1</div>
										</td>
										<td>
											<div class="hadOdds bLine"><span class="oddsItem rLine oddsItemKeep">1.70</span><span class="oddsItem rLine oddsItemKeep">3.55</span><span class="oddsItem oddsItemKeep">3.85</span></div>
											<div class="hhadOdds"><span class="oddsItem rLine oddsItemKeep">3.20</span><span class="oddsItem rLine oddsItemKeep">3.50</span><span class="oddsItem oddsItemKeep">1.89</span></div>
										</td>
										<td class="linkTd">
											<a href="http://info.sporttery.cn/football/info/fb_match_news.php?m=114618" target="_blank">讯</a>
											<a href="http://info.sporttery.cn/football/search_odds.php?mid=114618" target="_blank">同</a>
										</td>
										<td class="uOddsTd">
											<div class="hadU bLine"><span class="rLine" title="29">36%</span><span class="rLine" title="23">29%</span><span title="28">35%</span></div>
											<div class="hhadU"><span class="rLine" title="6">14%</span><span class="rLine" title="12">29%</span><span title="24">57%</span></div>
										</td>
										<td class="matchInfoTd">&nbsp;</td>
									</tr>
									<tr id="list_114620" singleindex="0" dataindex="2_3" class="listTr" lindex="3" bindex="3" line="-1" style="display: none;">
										<td>周日<br>006</td>
										<td title="荷兰甲级联赛" class="lname" style="background-color:#FF6699">荷甲</td>
										<td>12-09<br>19:15</td>
										<td><img title="大致多云" src="http://static.sporttery.cn/www/images/weather_logo/cloudy.png"><br>&nbsp;12°</td>
										<td title="点击VS进入对阵数据页,点击球队名称进入球队介绍页" onclick="toArrData(114620)" class="vsTd"><label>[荷甲5]</label>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=1523">乌德勒支</a>
											<a onclick="stopEvent(event)" class="vsA" target="_blank" href="http://info.sporttery.cn/football/info/fb_match_info.php?m=114620">VS</a>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=1536">赫拉克勒</a><label>[荷甲4]</label></td>
										<td class="goalLineTd">
											<div title="胜平负" class="hadGL">0</div>
											<div title="让球胜平负" class="hhadGL"><label style="font-weight:normal;"></label>-1</div>
										</td>
										<td>
											<div class="hadOdds bLine"><span class="oddsItem rLine oddsItemKeep">1.46</span><span class="oddsItem rLine oddsItemKeep">4.25</span><span class="oddsItem oddsItemKeep">4.80</span></div>
											<div class="hhadOdds"><span class="oddsItem rLine oddsItemKeep">2.30</span><span class="oddsItem rLine oddsItemKeep">3.70</span><span class="oddsItem oddsItemKeep">2.36</span></div>
										</td>
										<td class="linkTd">
											<a href="http://info.sporttery.cn/football/info/fb_match_news.php?m=114620" target="_blank">讯</a>
											<a href="http://info.sporttery.cn/football/search_odds.php?mid=114620" target="_blank">同</a>
										</td>
										<td class="uOddsTd">
											<div class="hadU bLine"><span class="rLine" title="36">53%</span><span class="rLine" title="14">21%</span><span title="18">26%</span></div>
											<div class="hhadU"><span class="rLine" title="20">49%</span><span class="rLine" title="10">24%</span><span title="11">27%</span></div>
										</td>
										<td class="matchInfoTd">&nbsp;</td>
									</tr>
									<tr id="list_114621" singleindex="0" dataindex="2_4" class="listTr" lindex="6" bindex="3" line="1" style="display: none;">
										<td>周日<br>007</td>
										<td title="意大利甲级联赛" class="lname" style="background-color:#0066FF">意甲</td>
										<td>12-09<br>19:30</td>
										<td><img title="天晴" src="http://static.sporttery.cn/www/images/weather_logo/sunny.png"><br>&nbsp;6°</td>
										<td title="点击VS进入对阵数据页,点击球队名称进入球队介绍页" onclick="toArrData(114621)" class="vsTd"><label>[意甲8]</label>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=5681">萨索洛</a>
											<a onclick="stopEvent(event)" class="vsA" target="_blank" href="http://info.sporttery.cn/football/info/fb_match_info.php?m=114621">VS</a>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=1259">佛罗伦萨</a><label>[意甲12]</label></td>
										<td class="goalLineTd">
											<div title="胜平负" class="hadGL">0</div>
											<div title="让球胜平负" class="hhadGL"><label style="font-weight:normal;"></label>+1</div>
										</td>
										<td>
											<div class="hadOdds bLine"><span class="oddsItem rLine oddsItemKeep">2.62</span><span class="oddsItem rLine oddsItemKeep">3.05</span><span class="oddsItem oddsItemKeep">2.38</span></div>
											<div class="hhadOdds"><span class="oddsItem rLine oddsItemKeep">1.45</span><span class="oddsItem rLine oddsItemKeep">3.95</span><span class="oddsItem oddsItemKeep">5.40</span></div>
										</td>
										<td class="linkTd">
											<a href="http://info.sporttery.cn/football/info/fb_match_news.php?m=114621" target="_blank">讯</a>
											<a href="http://info.sporttery.cn/football/search_odds.php?mid=114621" target="_blank">同</a>
										</td>
										<td class="uOddsTd">
											<div class="hadU bLine"><span class="rLine" title="32">23%</span><span class="rLine" title="63">44%</span><span title="47">33%</span></div>
											<div class="hhadU"><span class="rLine" title="52">65%</span><span class="rLine" title="14">18%</span><span title="14">18%</span></div>
										</td>
										<td class="matchInfoTd">&nbsp;</td>
									</tr>
									<tr id="list_114622" singleindex="0" dataindex="2_5" class="listTr" lindex="2" bindex="3" line="-1" style="display: none;">
										<td>周日<br>008</td>
										<td title="德国乙级联赛" class="lname" style="background-color:#DB31EE">德乙</td>
										<td>12-09<br>20:30</td>
										<td><img title="大致多云" src="http://static.sporttery.cn/www/images/weather_logo/cloudy.png"><br>&nbsp;10°</td>
										<td title="点击VS进入对阵数据页,点击球队名称进入球队介绍页" onclick="toArrData(114622)" class="vsTd"><label>[德乙14]</label>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=976">比勒费</a>
											<a onclick="stopEvent(event)" class="vsA" target="_blank" href="http://info.sporttery.cn/football/info/fb_match_info.php?m=114622">VS</a>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=5898">桑德豪森</a><label>[德乙17]</label></td>
										<td class="goalLineTd">
											<div title="胜平负" class="hadGL">0</div>
											<div title="让球胜平负" class="hhadGL"><label style="font-weight:normal;"></label>-1</div>
										</td>
										<td>
											<div class="hadOdds bLine"><span class="oddsItem rLine oddsItemKeep">2.20</span><span class="oddsItem rLine oddsItemKeep">3.10</span><span class="oddsItem oddsItemKeep">2.85</span></div>
											<div class="hhadOdds"><span class="oddsItem rLine oddsItemKeep">4.90</span><span class="oddsItem rLine oddsItemKeep">3.75</span><span class="oddsItem oddsItemKeep">1.52</span></div>
										</td>
										<td class="linkTd">
											<a href="http://info.sporttery.cn/football/info/fb_match_news.php?m=114622" target="_blank">讯</a>
											<a href="http://info.sporttery.cn/football/search_odds.php?mid=114622" target="_blank">同</a>
										</td>
										<td class="uOddsTd">
											<div class="hadU bLine"><span class="rLine" title="32">40%</span><span class="rLine" title="34">42%</span><span title="15">19%</span></div>
											<div class="hhadU"><span class="rLine" title="2">29%</span><span class="rLine" title="2">29%</span><span title="3">43%</span></div>
										</td>
										<td class="matchInfoTd">&nbsp;</td>
									</tr>
									<tr id="list_114623" singleindex="0" dataindex="2_6" class="listTr" lindex="2" bindex="3" line="-1" style="display: none;">
										<td>周日<br>009</td>
										<td title="德国乙级联赛" class="lname" style="background-color:#DB31EE">德乙</td>
										<td>12-09<br>20:30</td>
										<td><img title="多云" src="http://static.sporttery.cn/www/images/weather_logo/cloudy.png"><br>&nbsp;7°</td>
										<td title="点击VS进入对阵数据页,点击球队名称进入球队介绍页" onclick="toArrData(114623)" class="vsTd"><label>[德乙11]</label>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=995">德累斯顿</a>
											<a onclick="stopEvent(event)" class="vsA" target="_blank" href="http://info.sporttery.cn/football/info/fb_match_info.php?m=114623">VS</a>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=1019">基尔</a><label>[德乙6]</label></td>
										<td class="goalLineTd">
											<div title="胜平负" class="hadGL">0</div>
											<div title="让球胜平负" class="hhadGL"><label style="font-weight:normal;"></label>-1</div>
										</td>
										<td>
											<div class="hadOdds bLine"><span class="oddsItem rLine oddsItemKeep">2.35</span><span class="oddsItem rLine oddsItemKeep">3.40</span><span class="oddsItem oddsItemKeep">2.45</span></div>
											<div class="hhadOdds"><span class="oddsItem rLine oddsItemKeep">4.95</span><span class="oddsItem rLine oddsItemKeep">4.15</span><span class="oddsItem oddsItemKeep">1.46</span></div>
										</td>
										<td class="linkTd">
											<a href="http://info.sporttery.cn/football/info/fb_match_news.php?m=114623" target="_blank">讯</a>
											<a href="http://info.sporttery.cn/football/search_odds.php?mid=114623" target="_blank">同</a>
										</td>
										<td class="uOddsTd">
											<div class="hadU bLine"><span class="rLine" title="20">24%</span><span class="rLine" title="19">23%</span><span title="44">53%</span></div>
											<div class="hhadU"><span class="rLine" title="10">14%</span><span class="rLine" title="6">8%</span><span title="58">78%</span></div>
										</td>
										<td class="matchInfoTd">&nbsp;</td>
									</tr>
									<tr id="list_114624" singleindex="0" dataindex="2_7" class="listTr" lindex="2" bindex="3" line="1" style="display: none;">
										<td>周日<br>010</td>
										<td title="德国乙级联赛" class="lname" style="background-color:#DB31EE">德乙</td>
										<td>12-09<br>20:30</td>
										<td><img title="多云" src="http://static.sporttery.cn/www/images/weather_logo/cloudy.png"><br>&nbsp;10°</td>
										<td title="点击VS进入对阵数据页,点击球队名称进入球队介绍页" onclick="toArrData(114624)" class="vsTd"><label>[德乙16]</label>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=2818">马格德堡</a>
											<a onclick="stopEvent(event)" class="vsA" target="_blank" href="http://info.sporttery.cn/football/info/fb_match_info.php?m=114624">VS</a>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=1026">柏林联合</a><label>[德乙3]</label></td>
										<td class="goalLineTd">
											<div title="胜平负" class="hadGL">0</div>
											<div title="让球胜平负" class="hhadGL"><label style="font-weight:normal;"></label>+1</div>
										</td>
										<td>
											<div class="hadOdds bLine"><span class="oddsItem rLine oddsItemKeep">3.10</span><span class="oddsItem rLine oddsItemKeep">3.05</span><span class="oddsItem oddsItemKeep">2.09</span></div>
											<div class="hhadOdds"><span class="oddsItem rLine oddsItemKeep">1.58</span><span class="oddsItem rLine oddsItemKeep">3.65</span><span class="oddsItem oddsItemKeep">4.50</span></div>
										</td>
										<td class="linkTd">
											<a href="http://info.sporttery.cn/football/info/fb_match_news.php?m=114624" target="_blank">讯</a>
											<a href="http://info.sporttery.cn/football/search_odds.php?mid=114624" target="_blank">同</a>
										</td>
										<td class="uOddsTd">
											<div class="hadU bLine"><span class="rLine" title="13">7%</span><span class="rLine" title="66">34%</span><span title="117">60%</span></div>
											<div class="hhadU"><span class="rLine" title="10">21%</span><span class="rLine" title="11">23%</span><span title="26">55%</span></div>
										</td>
										<td class="matchInfoTd">&nbsp;</td>
									</tr>
									<tr id="list_114630" singleindex="0" dataindex="2_8" class="listTr" lindex="6" bindex="3" line="-1" style="display: none;">
										<td>周日<br>016</td>
										<td title="意大利甲级联赛" class="lname" style="background-color:#0066FF">意甲</td>
										<td>12-09<br>22:00</td>
										<td><img title="天晴" src="http://static.sporttery.cn/www/images/weather_logo/sunny.png"><br>&nbsp;2°</td>
										<td title="点击VS进入对阵数据页,点击球队名称进入球队介绍页" onclick="toArrData(114630)" class="vsTd"><label>[意甲17]</label>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=1261">恩波利</a>
											<a onclick="stopEvent(event)" class="vsA" target="_blank" href="http://info.sporttery.cn/football/info/fb_match_info.php?m=114630">VS</a>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=1249">博洛尼亚</a><label>[意甲18]</label></td>
										<td class="goalLineTd">
											<div title="胜平负" class="hadGL">0</div>
											<div title="让球胜平负" class="hhadGL"><label style="font-weight:normal;"></label>-1</div>
										</td>
										<td>
											<div class="hadOdds bLine"><span class="oddsItem rLine oddsItemKeep">1.85</span><span class="oddsItem rLine oddsItemKeep">3.30</span><span class="oddsItem oddsItemKeep">3.50</span></div>
											<div class="hhadOdds"><span class="oddsItem rLine oddsItemKeep">3.65</span><span class="oddsItem rLine oddsItemKeep">3.55</span><span class="oddsItem oddsItemKeep">1.75</span></div>
										</td>
										<td class="linkTd">
											<a href="http://info.sporttery.cn/football/info/fb_match_news.php?m=114630" target="_blank">讯</a>
											<a href="http://info.sporttery.cn/football/search_odds.php?mid=114630" target="_blank">同</a>
										</td>
										<td class="uOddsTd">
											<div class="hadU bLine"><span class="rLine" title="44">41%</span><span class="rLine" title="43">40%</span><span title="20">19%</span></div>
											<div class="hhadU"><span class="rLine" title="5">28%</span><span class="rLine" title="6">33%</span><span title="7">39%</span></div>
										</td>
										<td class="matchInfoTd">&nbsp;</td>
									</tr>
									<tr id="list_114631" singleindex="0" dataindex="2_9" class="listTr" lindex="6" bindex="3" line="1" style="display: none;">
										<td>周日<br>017</td>
										<td title="意大利甲级联赛" class="lname" style="background-color:#0066FF">意甲</td>
										<td>12-09<br>22:00</td>
										<td>未知<br>&nbsp;</td>
										<td title="点击VS进入对阵数据页,点击球队名称进入球队介绍页" onclick="toArrData(114631)" class="vsTd"><label>[意甲16]</label>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=1246">乌迪内斯</a>
											<a onclick="stopEvent(event)" class="vsA" target="_blank" href="http://info.sporttery.cn/football/info/fb_match_info.php?m=114631">VS</a>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=1255">亚特兰大</a><label>[意甲11]</label></td>
										<td class="goalLineTd">
											<div title="胜平负" class="hadGL">0</div>
											<div title="让球胜平负" class="hhadGL"><label style="font-weight:normal;"></label>+1</div>
										</td>
										<td>
											<div class="hadOdds bLine"><span class="oddsItem rLine oddsItemKeep">3.92</span><span class="oddsItem rLine oddsItemKeep">3.50</span><span class="oddsItem oddsItemKeep">1.70</span></div>
											<div class="hhadOdds"><span class="oddsItem rLine oddsItemKeep">1.90</span><span class="oddsItem rLine oddsItemKeep">3.40</span><span class="oddsItem oddsItemKeep">3.25</span></div>
										</td>
										<td class="linkTd">
											<a href="http://info.sporttery.cn/football/info/fb_match_news.php?m=114631" target="_blank">讯</a>
											<a href="http://info.sporttery.cn/football/search_odds.php?mid=114631" target="_blank">同</a>
										</td>
										<td class="uOddsTd">
											<div class="hadU bLine"><span class="rLine" title="27">30%</span><span class="rLine" title="21">23%</span><span title="43">47%</span></div>
											<div class="hhadU"><span class="rLine" title="31">56%</span><span class="rLine" title="17">31%</span><span title="7">13%</span></div>
										</td>
										<td class="matchInfoTd">&nbsp;</td>
									</tr>
									<tr id="list_114632" singleindex="0" dataindex="2_10" class="listTr" lindex="6" bindex="3" line="-1" style="display: none;">
										<td>周日<br>018</td>
										<td title="意大利甲级联赛" class="lname" style="background-color:#0066FF">意甲</td>
										<td>12-09<br>22:00</td>
										<td><img title="天晴" src="http://static.sporttery.cn/www/images/weather_logo/sunny.png"><br>&nbsp;6°</td>
										<td title="点击VS进入对阵数据页,点击球队名称进入球队介绍页" onclick="toArrData(114632)" class="vsTd"><label>[意甲9]</label>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=1243">帕尔马</a>
											<a onclick="stopEvent(event)" class="vsA" target="_blank" href="http://info.sporttery.cn/football/info/fb_match_info.php?m=114632">VS</a>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=1248">切沃</a><label>[意甲20]</label></td>
										<td class="goalLineTd">
											<div title="胜平负" class="hadGL">0</div>
											<div title="让球胜平负" class="hhadGL"><label style="font-weight:normal;"></label>-1</div>
										</td>
										<td>
											<div class="hadOdds bLine"><span class="oddsItem rLine oddsItemKeep">1.90</span><span class="oddsItem rLine oddsItemKeep">3.25</span><span class="oddsItem oddsItemKeep">3.40</span></div>
											<div class="hhadOdds"><span class="oddsItem rLine oddsItemKeep">3.80</span><span class="oddsItem rLine oddsItemKeep">3.60</span><span class="oddsItem oddsItemKeep">1.70</span></div>
										</td>
										<td class="linkTd">
											<a href="http://info.sporttery.cn/football/info/fb_match_news.php?m=114632" target="_blank">讯</a>
											<a href="http://info.sporttery.cn/football/search_odds.php?mid=114632" target="_blank">同</a>
										</td>
										<td class="uOddsTd">
											<div class="hadU bLine"><span class="rLine" title="163">69%</span><span class="rLine" title="40">17%</span><span title="32">14%</span></div>
											<div class="hhadU"><span class="rLine" title="20">37%</span><span class="rLine" title="19">35%</span><span title="15">28%</span></div>
										</td>
										<td class="matchInfoTd">&nbsp;</td>
									</tr>
									<tr id="list_114633" singleindex="0" dataindex="2_11" class="listTr" lindex="8" bindex="3" line="-1" style="display: none;">
										<td>周日<br>019</td>
										<td title="法国甲级联赛" class="lname" style="background-color:#6B2B2B">法甲</td>
										<td>12-09<br>22:00</td>
										<td><img title="多云" src="http://static.sporttery.cn/www/images/weather_logo/cloudy.png"><br>&nbsp;12°</td>
										<td title="点击VS进入对阵数据页,点击球队名称进入球队介绍页" onclick="toArrData(114633)" class="vsTd"><label>[法甲9]</label>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=898">斯特拉斯</a>
											<a onclick="stopEvent(event)" class="vsA" target="_blank" href="http://info.sporttery.cn/football/info/fb_match_info.php?m=114633">VS</a>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=902">卡昂</a><label>[法甲17]</label></td>
										<td class="goalLineTd">
											<div title="胜平负" class="hadGL">0</div>
											<div title="让球胜平负" class="hhadGL"><label style="font-weight:normal;"></label>-1</div>
										</td>
										<td>
											<div class="hadOdds bLine"><span class="oddsItem rLine oddsItemKeep">1.64</span><span class="oddsItem rLine oddsItemKeep">3.30</span><span class="oddsItem oddsItemKeep">4.65</span></div>
											<div class="hhadOdds"><span class="oddsItem rLine oddsItemKeep">3.17</span><span class="oddsItem rLine oddsItemKeep">3.20</span><span class="oddsItem oddsItemKeep">2.00</span></div>
										</td>
										<td class="linkTd">
											<a href="http://info.sporttery.cn/football/info/fb_match_news.php?m=114633" target="_blank">讯</a>
											<a href="http://info.sporttery.cn/football/search_odds.php?mid=114633" target="_blank">同</a>
										</td>
										<td class="uOddsTd">
											<div class="hadU bLine"><span class="rLine" title="77">69%</span><span class="rLine" title="12">11%</span><span title="23">21%</span></div>
											<div class="hhadU"><span class="rLine" title="15">42%</span><span class="rLine" title="11">31%</span><span title="10">28%</span></div>
										</td>
										<td class="matchInfoTd">&nbsp;</td>
									</tr>
									<tr id="list_114634" singleindex="0" dataindex="2_12" class="listTr" lindex="5" bindex="3" line="-1" style="display: none;">
										<td>周日<br>020</td>
										<td title="德国甲级联赛" class="lname" style="background-color:#990099">德甲</td>
										<td>12-09<br>22:30</td>
										<td><img title="多云" src="http://static.sporttery.cn/www/images/weather_logo/cloudy.png"><br>&nbsp;12°</td>
										<td title="点击VS进入对阵数据页,点击球队名称进入球队介绍页" onclick="toArrData(114634)" class="vsTd"><label>[德甲10]</label>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=977">美因茨</a>
											<a onclick="stopEvent(event)" class="vsA" target="_blank" href="http://info.sporttery.cn/football/info/fb_match_info.php?m=114634">VS</a>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=972">汉诺威96</a><label>[德甲17]</label></td>
										<td class="goalLineTd">
											<div title="胜平负" class="hadGL">0</div>
											<div title="让球胜平负" class="hhadGL"><label style="font-weight:normal;"></label>-1</div>
										</td>
										<td>
											<div class="hadOdds bLine"><span class="oddsItem rLine oddsItemKeep">1.75</span><span class="oddsItem rLine oddsItemKeep">3.55</span><span class="oddsItem oddsItemKeep">3.65</span></div>
											<div class="hhadOdds"><span class="oddsItem rLine oddsItemKeep">3.25</span><span class="oddsItem rLine oddsItemKeep">3.55</span><span class="oddsItem oddsItemKeep">1.86</span></div>
										</td>
										<td class="linkTd">
											<a href="http://info.sporttery.cn/football/info/fb_match_news.php?m=114634" target="_blank">讯</a>
											<a href="http://info.sporttery.cn/football/search_odds.php?mid=114634" target="_blank">同</a>
										</td>
										<td class="uOddsTd">
											<div class="hadU bLine"><span class="rLine" title="99">79%</span><span class="rLine" title="16">13%</span><span title="10">8%</span></div>
											<div class="hhadU"><span class="rLine" title="24">56%</span><span class="rLine" title="8">19%</span><span title="11">26%</span></div>
										</td>
										<td class="matchInfoTd">&nbsp;</td>
									</tr>
									<tr id="list_114635" singleindex="0" dataindex="2_13" class="listTr" lindex="11" bindex="3" line="-1" style="display: none;">
										<td>周日<br>021</td>
										<td title="葡萄牙超级联赛" class="lname" style="background-color:#008888">葡超</td>
										<td>12-09<br>23:00</td>
										<td>未知<br>&nbsp;5°</td>
										<td title="点击VS进入对阵数据页,点击球队名称进入球队介绍页" onclick="toArrData(114635)" class="vsTd"><label>[葡超8]</label>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=1687">摩雷伦斯</a>
											<a onclick="stopEvent(event)" class="vsA" target="_blank" href="http://info.sporttery.cn/football/info/fb_match_info.php?m=114635">VS</a>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=1706">圣克拉拉</a><label>[葡超10]</label></td>
										<td class="goalLineTd">
											<div title="胜平负" class="hadGL">0</div>
											<div title="让球胜平负" class="hhadGL"><label style="font-weight:normal;"></label>-1</div>
										</td>
										<td>
											<div class="hadOdds bLine"><span class="oddsItem rLine oddsItemKeep">1.85</span><span class="oddsItem rLine oddsItemKeep">3.10</span><span class="oddsItem oddsItemKeep">3.75</span></div>
											<div class="hhadOdds"><span class="oddsItem rLine oddsItemKeep">3.80</span><span class="oddsItem rLine oddsItemKeep">3.35</span><span class="oddsItem oddsItemKeep">1.76</span></div>
										</td>
										<td class="linkTd">
											<a href="http://info.sporttery.cn/football/info/fb_match_news.php?m=114635" target="_blank">讯</a>
											<a href="http://info.sporttery.cn/football/search_odds.php?mid=114635" target="_blank">同</a>
										</td>
										<td class="uOddsTd">
											<div class="hadU bLine"><span class="rLine" title="26">54%</span><span class="rLine" title="19">40%</span><span title="3">6%</span></div>
											<div class="hhadU"><span class="rLine" title="9">50%</span><span class="rLine" title="6">33%</span><span title="3">17%</span></div>
										</td>
										<td class="matchInfoTd">&nbsp;</td>
									</tr>
									<tr id="list_114636" singleindex="0" dataindex="2_14" class="listTr" lindex="11" bindex="3" line="-1" style="display: none;">
										<td>周日<br>022</td>
										<td title="葡萄牙超级联赛" class="lname" style="background-color:#008888">葡超</td>
										<td>12-09<br>23:00</td>
										<td><img title="天晴" src="http://static.sporttery.cn/www/images/weather_logo/sunny.png"><br>&nbsp;22°</td>
										<td title="点击VS进入对阵数据页,点击球队名称进入球队介绍页" onclick="toArrData(114636)" class="vsTd"><label>[葡超12]</label>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=1681">葡国民</a>
											<a onclick="stopEvent(event)" class="vsA" target="_blank" href="http://info.sporttery.cn/football/info/fb_match_info.php?m=114636">VS</a>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=1685">博阿维斯</a><label>[葡超16]</label></td>
										<td class="goalLineTd">
											<div title="胜平负" class="hadGL">0</div>
											<div title="让球胜平负" class="hhadGL"><label style="font-weight:normal;"></label>-1</div>
										</td>
										<td>
											<div class="hadOdds bLine"><span class="oddsItem rLine oddsItemKeep">2.25</span><span class="oddsItem rLine oddsItemKeep">3.05</span><span class="oddsItem oddsItemKeep">2.80</span></div>
											<div class="hhadOdds"><span class="oddsItem rLine oddsItemKeep">5.10</span><span class="oddsItem rLine oddsItemKeep">3.75</span><span class="oddsItem oddsItemKeep">1.50</span></div>
										</td>
										<td class="linkTd">
											<a href="http://info.sporttery.cn/football/info/fb_match_news.php?m=114636" target="_blank">讯</a>
											<a href="http://info.sporttery.cn/football/search_odds.php?mid=114636" target="_blank">同</a>
										</td>
										<td class="uOddsTd">
											<div class="hadU bLine"><span class="rLine" title="18">49%</span><span class="rLine" title="13">35%</span><span title="6">16%</span></div>
											<div class="hhadU"><span class="rLine" title="6">27%</span><span class="rLine" title="7">32%</span><span title="9">41%</span></div>
										</td>
										<td class="matchInfoTd">&nbsp;</td>
									</tr>
									<tr id="list_114637" singleindex="0" dataindex="2_15" class="listTr" lindex="10" bindex="3" line="1" style="display: none;">
										<td>周日<br>023</td>
										<td title="西班牙甲级联赛" class="lname" style="background-color:#006633">西甲</td>
										<td>12-09<br>23:15</td>
										<td><img title="天晴" src="http://static.sporttery.cn/www/images/weather_logo/sunny.png"><br>&nbsp;2°</td>
										<td title="点击VS进入对阵数据页,点击球队名称进入球队介绍页" onclick="toArrData(114637)" class="vsTd"><label>[西甲20]</label>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=3003">韦斯卡</a>
											<a onclick="stopEvent(event)" class="vsA" target="_blank" href="http://info.sporttery.cn/football/info/fb_match_info.php?m=114637">VS</a>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=2016">皇马</a><label>[西甲5]</label></td>
										<td class="goalLineTd">
											<div title="胜平负" class="hadGL">0</div>
											<div title="让球胜平负" class="hhadGL"><label style="font-weight:normal;"></label>+1</div>
										</td>
										<td>
											<div class="hadOdds bLine"><span class="oddsItem rLine oddsItemKeep">8.50</span><span class="oddsItem rLine oddsItemKeep">5.40</span><span class="oddsItem oddsItemKeep">1.21</span></div>
											<div class="hhadOdds"><span class="oddsItem rLine oddsItemKeep">3.50</span><span class="oddsItem rLine oddsItemKeep">4.00</span><span class="oddsItem oddsItemKeep">1.69</span></div>
										</td>
										<td class="linkTd">
											<a href="http://info.sporttery.cn/football/info/fb_match_news.php?m=114637" target="_blank">讯</a>
											<a href="http://info.sporttery.cn/football/search_odds.php?mid=114637" target="_blank">同</a>
										</td>
										<td class="uOddsTd">
											<div class="hadU bLine"><span class="rLine" title="16">4%</span><span class="rLine" title="18">4%</span><span title="375">92%</span></div>
											<div class="hhadU"><span class="rLine" title="9">3%</span><span class="rLine" title="28">10%</span><span title="254">87%</span></div>
										</td>
										<td class="matchInfoTd">&nbsp;</td>
									</tr>
									<tr id="list_114638" singleindex="0" dataindex="2_16" class="listTr" lindex="3" bindex="3" line="1" style="display: none;">
										<td>周日<br>024</td>
										<td title="荷兰甲级联赛" class="lname" style="background-color:#FF6699">荷甲</td>
										<td>12-09<br>23:45</td>
										<td><img title="雨" src="http://static.sporttery.cn/www/images/weather_logo/rain.png"><br>&nbsp;11°</td>
										<td title="点击VS进入对阵数据页,点击球队名称进入球队介绍页" onclick="toArrData(114638)" class="vsTd"><label>[荷甲18]</label>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=1524">布雷达</a>
											<a onclick="stopEvent(event)" class="vsA" target="_blank" href="http://info.sporttery.cn/football/info/fb_match_info.php?m=114638">VS</a>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=1530">维迪斯</a><label>[荷甲6]</label></td>
										<td class="goalLineTd">
											<div title="胜平负" class="hadGL">0</div>
											<div title="让球胜平负" class="hhadGL"><label style="font-weight:normal;"></label>+1</div>
										</td>
										<td>
											<div class="hadOdds bLine"><span class="oddsItem rLine oddsItemKeep">4.80</span><span class="oddsItem rLine oddsItemKeep">3.80</span><span class="oddsItem oddsItemKeep">1.52</span></div>
											<div class="hhadOdds"><span class="oddsItem rLine oddsItemKeep">2.22</span><span class="oddsItem rLine oddsItemKeep">3.45</span><span class="oddsItem oddsItemKeep">2.57</span></div>
										</td>
										<td class="linkTd">
											<a href="http://info.sporttery.cn/football/info/fb_match_news.php?m=114638" target="_blank">讯</a>
											<a href="http://info.sporttery.cn/football/search_odds.php?mid=114638" target="_blank">同</a>
										</td>
										<td class="uOddsTd">
											<div class="hadU bLine"><span class="rLine" title="14">22%</span><span class="rLine" title="6">9%</span><span title="44">69%</span></div>
											<div class="hhadU"><span class="rLine" title="13">35%</span><span class="rLine" title="6">16%</span><span title="18">49%</span></div>
										</td>
										<td class="matchInfoTd">&nbsp;</td>
									</tr>
									<tr id="list_114639" singleindex="1" dataindex="2_17" class="listTr" lindex="15" bindex="3" line="1" style="display: none;">
										<td>周日<br>025</td>
										<td title="英格兰超级联赛" class="lname" style="background-color:#FF3333">英超</td>
										<td>12-10<br>00:00</td>
										<td><img title="毛毛雨" src="http://static.sporttery.cn/www/images/weather_logo/sprinkle.png"><br>&nbsp;11°</td>
										<td title="点击VS进入对阵数据页,点击球队名称进入球队介绍页" onclick="toArrData(114639)" class="vsTd"><label>[英超14]</label>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=664">纽卡斯尔</a>
											<a onclick="stopEvent(event)" class="vsA" target="_blank" href="http://info.sporttery.cn/football/info/fb_match_info.php?m=114639">VS</a>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=680">狼队</a><label>[英超12]</label></td>
										<td class="goalLineTd">
											<div title="胜平负" class="hadGL" style="background-image:url(./images/single.gif);background-repeat:no-repeat;background-position:left top;">0</div>
											<div title="让球胜平负" class="hhadGL"><label style="font-weight:normal;"></label>+1</div>
										</td>
										<td>
											<div class="hadOdds bLine"><span class="oddsItem rLine oddsItemKeep">2.75</span><span class="oddsItem rLine oddsItemKeep">2.90</span><span class="oddsItem oddsItemKeep">2.38</span></div>
											<div class="hhadOdds"><span class="oddsItem rLine oddsItemKeep">1.46</span><span class="oddsItem rLine oddsItemKeep">3.85</span><span class="oddsItem oddsItemKeep">5.40</span></div>
										</td>
										<td class="linkTd">
											<a href="http://info.sporttery.cn/football/info/fb_match_news.php?m=114639" target="_blank">讯</a>
											<a href="http://info.sporttery.cn/football/search_odds.php?mid=114639" target="_blank">同</a>
										</td>
										<td class="uOddsTd">
											<div class="hadU bLine"><span class="rLine" title="77">32%</span><span class="rLine" title="97">41%</span><span title="64">27%</span></div>
											<div class="hhadU"><span class="rLine" title="54">63%</span><span class="rLine" title="18">21%</span><span title="14">16%</span></div>
										</td>
										<td class="matchInfoTd">&nbsp;</td>
									</tr>
									<tr id="list_114640" singleindex="0" dataindex="2_18" class="listTr" lindex="8" bindex="3" line="-1" style="display: none;">
										<td>周日<br>026</td>
										<td title="法国甲级联赛" class="lname" style="background-color:#6B2B2B">法甲</td>
										<td>12-10<br>00:00</td>
										<td><img title="多云" src="http://static.sporttery.cn/www/images/weather_logo/cloudy.png"><br>&nbsp;11°</td>
										<td title="点击VS进入对阵数据页,点击球队名称进入球队介绍页" onclick="toArrData(114640)" class="vsTd"><label>[法甲2]</label>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=895">里尔</a>
											<a onclick="stopEvent(event)" class="vsA" target="_blank" href="http://info.sporttery.cn/football/info/fb_match_info.php?m=114640">VS</a>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=921">兰斯</a><label>[法甲11]</label></td>
										<td class="goalLineTd">
											<div title="胜平负" class="hadGL">0</div>
											<div title="让球胜平负" class="hhadGL"><label style="font-weight:normal;"></label>-1</div>
										</td>
										<td>
											<div class="hadOdds bLine"><span class="oddsItem rLine oddsItemKeep">1.62</span><span class="oddsItem rLine oddsItemKeep">3.35</span><span class="oddsItem oddsItemKeep">4.70</span></div>
											<div class="hhadOdds"><span class="oddsItem rLine oddsItemKeep">3.12</span><span class="oddsItem rLine oddsItemKeep">3.20</span><span class="oddsItem oddsItemKeep">2.02</span></div>
										</td>
										<td class="linkTd">
											<a href="http://info.sporttery.cn/football/info/fb_match_news.php?m=114640" target="_blank">讯</a>
											<a href="http://info.sporttery.cn/football/search_odds.php?mid=114640" target="_blank">同</a>
										</td>
										<td class="uOddsTd">
											<div class="hadU bLine"><span class="rLine" title="177">85%</span><span class="rLine" title="23">11%</span><span title="8">4%</span></div>
											<div class="hhadU"><span class="rLine" title="35">50%</span><span class="rLine" title="23">33%</span><span title="12">17%</span></div>
										</td>
										<td class="matchInfoTd">&nbsp;</td>
									</tr>
									<tr id="list_114642" singleindex="0" dataindex="2_19" class="listTr" lindex="5" bindex="3" line="-1" style="display: none;">
										<td>周日<br>028</td>
										<td title="德国甲级联赛" class="lname" style="background-color:#990099">德甲</td>
										<td>12-10<br>01:00</td>
										<td><img title="大致多云" src="http://static.sporttery.cn/www/images/weather_logo/cloudy.png"><br>&nbsp;11°</td>
										<td title="点击VS进入对阵数据页,点击球队名称进入球队介绍页" onclick="toArrData(114642)" class="vsTd"><label>[德甲2]</label>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=971">门兴</a>
											<a onclick="stopEvent(event)" class="vsA" target="_blank" href="http://info.sporttery.cn/football/info/fb_match_info.php?m=114642">VS</a>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=962">斯图加特</a><label>[德甲16]</label></td>
										<td class="goalLineTd">
											<div title="胜平负" class="hadGL">0</div>
											<div title="让球胜平负" class="hhadGL"><label style="font-weight:normal;"></label>-1</div>
										</td>
										<td>
											<div class="hadOdds bLine"><span class="oddsItem rLine oddsItemKeep">1.38</span><span class="oddsItem rLine oddsItemKeep">4.40</span><span class="oddsItem oddsItemKeep">5.70</span></div>
											<div class="hhadOdds"><span class="oddsItem rLine oddsItemKeep">2.11</span><span class="oddsItem rLine oddsItemKeep">3.70</span><span class="oddsItem oddsItemKeep">2.60</span></div>
										</td>
										<td class="linkTd">
											<a href="http://info.sporttery.cn/football/info/fb_match_news.php?m=114642" target="_blank">讯</a>
											<a href="http://info.sporttery.cn/football/search_odds.php?mid=114642" target="_blank">同</a>
										</td>
										<td class="uOddsTd">
											<div class="hadU bLine"><span class="rLine" title="320">88%</span><span class="rLine" title="34">9%</span><span title="10">3%</span></div>
											<div class="hhadU"><span class="rLine" title="186">84%</span><span class="rLine" title="29">13%</span><span title="7">3%</span></div>
										</td>
										<td class="matchInfoTd">&nbsp;</td>
									</tr>
									<tr id="list_114643" singleindex="0" dataindex="2_20" class="listTr" lindex="6" bindex="3" line="-1" style="display: none;">
										<td>周日<br>029</td>
										<td title="意大利甲级联赛" class="lname" style="background-color:#0066FF">意甲</td>
										<td>12-10<br>01:00</td>
										<td><img title="天晴" src="http://static.sporttery.cn/www/images/weather_logo/sunny.png"><br>&nbsp;11°</td>
										<td title="点击VS进入对阵数据页,点击球队名称进入球队介绍页" onclick="toArrData(114643)" class="vsTd"><label>[意甲14]</label>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=1276">热那亚</a>
											<a onclick="stopEvent(event)" class="vsA" target="_blank" href="http://info.sporttery.cn/football/info/fb_match_info.php?m=114643">VS</a>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=1287">费拉拉</a><label>[意甲15]</label></td>
										<td class="goalLineTd">
											<div title="胜平负" class="hadGL">0</div>
											<div title="让球胜平负" class="hhadGL"><label style="font-weight:normal;"></label>-1</div>
										</td>
										<td>
											<div class="hadOdds bLine"><span class="oddsItem rLine oddsItemKeep">1.82</span><span class="oddsItem rLine oddsItemKeep">3.30</span><span class="oddsItem oddsItemKeep">3.65</span></div>
											<div class="hhadOdds"><span class="oddsItem rLine oddsItemKeep">3.60</span><span class="oddsItem rLine oddsItemKeep">3.45</span><span class="oddsItem oddsItemKeep">1.78</span></div>
										</td>
										<td class="linkTd">
											<a href="http://info.sporttery.cn/football/info/fb_match_news.php?m=114643" target="_blank">讯</a>
											<a href="http://info.sporttery.cn/football/search_odds.php?mid=114643" target="_blank">同</a>
										</td>
										<td class="uOddsTd">
											<div class="hadU bLine"><span class="rLine" title="45">53%</span><span class="rLine" title="33">39%</span><span title="7">8%</span></div>
											<div class="hhadU"><span class="rLine" title="11">38%</span><span class="rLine" title="10">34%</span><span title="8">28%</span></div>
										</td>
										<td class="matchInfoTd">&nbsp;</td>
									</tr>
									<tr id="list_114646" singleindex="0" dataindex="2_21" class="listTr" lindex="10" bindex="3" line="-1" style="display: none;">
										<td>周日<br>032</td>
										<td title="西班牙甲级联赛" class="lname" style="background-color:#006633">西甲</td>
										<td>12-10<br>01:30</td>
										<td><img title="天晴" src="http://static.sporttery.cn/www/images/weather_logo/sunny.png"><br>&nbsp;27°</td>
										<td title="点击VS进入对阵数据页,点击球队名称进入球队介绍页" onclick="toArrData(114646)" class="vsTd"><label>[西甲10]</label>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=2028">皇家社会</a>
											<a onclick="stopEvent(event)" class="vsA" target="_blank" href="http://info.sporttery.cn/football/info/fb_match_info.php?m=114646">VS</a>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=2031">巴利亚多</a><label>[西甲15]</label></td>
										<td class="goalLineTd">
											<div title="胜平负" class="hadGL">0</div>
											<div title="让球胜平负" class="hhadGL"><label style="font-weight:normal;"></label>-1</div>
										</td>
										<td>
											<div class="hadOdds bLine"><span class="oddsItem rLine oddsItemKeep">1.57</span><span class="oddsItem rLine oddsItemKeep">3.40</span><span class="oddsItem oddsItemKeep">5.05</span></div>
											<div class="hhadOdds"><span class="oddsItem rLine oddsItemKeep">2.98</span><span class="oddsItem rLine oddsItemKeep">3.20</span><span class="oddsItem oddsItemKeep">2.08</span></div>
										</td>
										<td class="linkTd">
											<a href="http://info.sporttery.cn/football/info/fb_match_news.php?m=114646" target="_blank">讯</a>
											<a href="http://info.sporttery.cn/football/search_odds.php?mid=114646" target="_blank">同</a>
										</td>
										<td class="uOddsTd">
											<div class="hadU bLine"><span class="rLine" title="77">73%</span><span class="rLine" title="17">16%</span><span title="12">11%</span></div>
											<div class="hhadU"><span class="rLine" title="14">35%</span><span class="rLine" title="19">48%</span><span title="7">18%</span></div>
										</td>
										<td class="matchInfoTd">&nbsp;</td>
									</tr>
									<tr id="list_114647" singleindex="0" dataindex="2_22" class="listTr" lindex="11" bindex="3" line="-1" style="display: none;">
										<td>周日<br>033</td>
										<td title="葡萄牙超级联赛" class="lname" style="background-color:#008888">葡超</td>
										<td>12-10<br>01:30</td>
										<td>未知<br>&nbsp;5°</td>
										<td title="点击VS进入对阵数据页,点击球队名称进入球队介绍页" onclick="toArrData(114647)" class="vsTd"><label>[葡超5]</label>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=1689">吉马良斯</a>
											<a onclick="stopEvent(event)" class="vsA" target="_blank" href="http://info.sporttery.cn/football/info/fb_match_info.php?m=114647">VS</a>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=1683">里奥阿维</a><label>[葡超6]</label></td>
										<td class="goalLineTd">
											<div title="胜平负" class="hadGL">0</div>
											<div title="让球胜平负" class="hhadGL"><label style="font-weight:normal;"></label>-1</div>
										</td>
										<td>
											<div class="hadOdds bLine"><span class="oddsItem rLine oddsItemKeep">1.92</span><span class="oddsItem rLine oddsItemKeep">3.20</span><span class="oddsItem oddsItemKeep">3.40</span></div>
											<div class="hhadOdds"><span class="oddsItem rLine oddsItemKeep">3.80</span><span class="oddsItem rLine oddsItemKeep">3.55</span><span class="oddsItem oddsItemKeep">1.71</span></div>
										</td>
										<td class="linkTd">
											<a href="http://info.sporttery.cn/football/info/fb_match_news.php?m=114647" target="_blank">讯</a>
											<a href="http://info.sporttery.cn/football/search_odds.php?mid=114647" target="_blank">同</a>
										</td>
										<td class="uOddsTd">
											<div class="hadU bLine"><span class="rLine" title="43">57%</span><span class="rLine" title="28">37%</span><span title="4">5%</span></div>
											<div class="hhadU"><span class="rLine" title="17">65%</span><span class="rLine" title="5">19%</span><span title="4">15%</span></div>
										</td>
										<td class="matchInfoTd">&nbsp;</td>
									</tr>
									<tr id="list_114649" singleindex="0" dataindex="2_23" class="listTr" lindex="6" bindex="3" line="-1" style="display: none;">
										<td>周日<br>035</td>
										<td title="意大利甲级联赛" class="lname" style="background-color:#0066FF">意甲</td>
										<td>12-10<br>03:30</td>
										<td><img title="雾" src="http://static.sporttery.cn/www/images/weather_logo/fog.png"><br>&nbsp;2°</td>
										<td title="点击VS进入对阵数据页,点击球队名称进入球队介绍页" onclick="toArrData(114649)" class="vsTd"><label>[意甲4]</label>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=1240">AC米兰</a>
											<a onclick="stopEvent(event)" class="vsA" target="_blank" href="http://info.sporttery.cn/football/info/fb_match_info.php?m=114649">VS</a>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=1268">都灵</a><label>[意甲6]</label></td>
										<td class="goalLineTd">
											<div title="胜平负" class="hadGL">0</div>
											<div title="让球胜平负" class="hhadGL"><label style="font-weight:normal;"></label>-1</div>
										</td>
										<td>
											<div class="hadOdds bLine"><span class="oddsItem rLine oddsItemKeep">1.69</span><span class="oddsItem rLine oddsItemKeep">3.45</span><span class="oddsItem oddsItemKeep">4.05</span></div>
											<div class="hhadOdds"><span class="oddsItem rLine oddsItemKeep">3.15</span><span class="oddsItem rLine oddsItemKeep">3.45</span><span class="oddsItem oddsItemKeep">1.92</span></div>
										</td>
										<td class="linkTd">
											<a href="http://info.sporttery.cn/football/info/fb_match_news.php?m=114649" target="_blank">讯</a>
											<a href="http://info.sporttery.cn/football/search_odds.php?mid=114649" target="_blank">同</a>
										</td>
										<td class="uOddsTd">
											<div class="hadU bLine"><span class="rLine" title="121">61%</span><span class="rLine" title="59">30%</span><span title="19">10%</span></div>
											<div class="hhadU"><span class="rLine" title="16">25%</span><span class="rLine" title="32">49%</span><span title="17">26%</span></div>
										</td>
										<td class="matchInfoTd">&nbsp;</td>
									</tr>
									<tr id="list_114650" singleindex="0" dataindex="2_24" class="listTr" lindex="18" bindex="3" line="-1" style="display: none;">
										<td>周日<br>036</td>
										<td title="南美解放者杯" class="lname" style="background-color:#00A653">解放者杯</td>
										<td>12-10<br>03:30</td>
										<td><img title="大致多云" src="http://static.sporttery.cn/www/images/weather_logo/cloudy.png"><br>&nbsp;15°</td>
										<td title="点击VS进入对阵数据页,点击球队名称进入球队介绍页" onclick="toArrData(114650)" class="vsTd"><label></label>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=107">河床</a>
											<a onclick="stopEvent(event)" class="vsA" target="_blank" href="http://info.sporttery.cn/football/info/fb_match_info.php?m=114650">VS</a>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=95">博卡</a><label></label></td>
										<td class="goalLineTd">
											<div title="胜平负" class="hadGL">0</div>
											<div title="让球胜平负" class="hhadGL"><label style="font-weight:normal;"></label>-1</div>
										</td>
										<td>
											<div class="hadOdds bLine"><span class="oddsItem rLine oddsItemKeep">2.40</span><span class="oddsItem rLine oddsItemKeep">2.65</span><span class="oddsItem oddsItemKeep">3.00</span></div>
											<div class="hhadOdds"><span class="oddsItem rLine oddsItemKeep">5.85</span><span class="oddsItem rLine oddsItemKeep">3.80</span><span class="oddsItem oddsItemKeep">1.44</span></div>
										</td>
										<td class="linkTd">
											<a href="http://info.sporttery.cn/football/info/fb_match_news.php?m=114650" target="_blank">讯</a>
											<a href="http://info.sporttery.cn/football/search_odds.php?mid=114650" target="_blank">同</a>
										</td>
										<td class="uOddsTd">
											<div class="hadU bLine"><span class="rLine" title="89">39%</span><span class="rLine" title="84">37%</span><span title="53">23%</span></div>
											<div class="hhadU"><span class="rLine" title="30">38%</span><span class="rLine" title="17">22%</span><span title="31">40%</span></div>
										</td>
										<td class="matchInfoTd">&nbsp;<span style="cursor:pointer;" title="该场球赛将在西班牙-马德里举行。中国体育竞猜彩票以“河床”为主队进行投注。">中立</span></td>
									</tr>
									<tr id="list_114651" singleindex="0" dataindex="2_25" class="listTr" lindex="10" bindex="3" line="-1" style="display: none;">
										<td>周日<br>037</td>
										<td title="西班牙甲级联赛" class="lname" style="background-color:#006633">西甲</td>
										<td>12-10<br>03:45</td>
										<td><img title="天晴" src="http://static.sporttery.cn/www/images/weather_logo/sunny.png"><br>&nbsp;10°</td>
										<td title="点击VS进入对阵数据页,点击球队名称进入球队介绍页" onclick="toArrData(114651)" class="vsTd"><label>[西甲11]</label>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=2025">贝蒂斯</a>
											<a onclick="stopEvent(event)" class="vsA" target="_blank" href="http://info.sporttery.cn/football/info/fb_match_info.php?m=114651">VS</a>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=2054">巴列卡诺</a><label>[西甲19]</label></td>
										<td class="goalLineTd">
											<div title="胜平负" class="hadGL">0</div>
											<div title="让球胜平负" class="hhadGL"><label style="font-weight:normal;"></label>-1</div>
										</td>
										<td>
											<div class="hadOdds bLine"><span class="oddsItem rLine oddsItemKeep">1.42</span><span class="oddsItem rLine oddsItemKeep">4.10</span><span class="oddsItem oddsItemKeep">5.55</span></div>
											<div class="hhadOdds"><span class="oddsItem rLine oddsItemKeep">2.32</span><span class="oddsItem rLine oddsItemKeep">3.45</span><span class="oddsItem oddsItemKeep">2.45</span></div>
										</td>
										<td class="linkTd">
											<a href="http://info.sporttery.cn/football/info/fb_match_news.php?m=114651" target="_blank">讯</a>
											<a href="http://info.sporttery.cn/football/search_odds.php?mid=114651" target="_blank">同</a>
										</td>
										<td class="uOddsTd">
											<div class="hadU bLine"><span class="rLine" title="91">67%</span><span class="rLine" title="21">15%</span><span title="24">18%</span></div>
											<div class="hhadU"><span class="rLine" title="28">45%</span><span class="rLine" title="17">27%</span><span title="17">27%</span></div>
										</td>
										<td class="matchInfoTd">&nbsp;</td>
									</tr>
									<tr id="list_114653" singleindex="0" dataindex="2_26" class="listTr" lindex="11" bindex="3" line="-1" style="display: none;">
										<td>周日<br>039</td>
										<td title="葡萄牙超级联赛" class="lname" style="background-color:#008888">葡超</td>
										<td>12-10<br>04:00</td>
										<td>未知<br>&nbsp;11°</td>
										<td title="点击VS进入对阵数据页,点击球队名称进入球队介绍页" onclick="toArrData(114653)" class="vsTd"><label>[葡超2]</label>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=1680">里斯本</a>
											<a onclick="stopEvent(event)" class="vsA" target="_blank" href="http://info.sporttery.cn/football/info/fb_match_info.php?m=114653">VS</a>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=1702">阿维斯</a><label>[葡超13]</label></td>
										<td class="goalLineTd">
											<div title="胜平负" class="hadGL">0</div>
											<div title="让球胜平负" class="hhadGL"><label style="font-weight:normal;"></label>-1</div>
										</td>
										<td>
											<div class="hadOdds bLine"><span class="oddsItem rLine oddsItemKeep">1.19</span><span class="oddsItem rLine oddsItemKeep">5.20</span><span class="oddsItem oddsItemKeep">10.50</span></div>
											<div class="hhadOdds"><span class="oddsItem rLine oddsItemKeep">1.69</span><span class="oddsItem rLine oddsItemKeep">3.70</span><span class="oddsItem oddsItemKeep">3.75</span></div>
										</td>
										<td class="linkTd">
											<a href="http://info.sporttery.cn/football/info/fb_match_news.php?m=114653" target="_blank">讯</a>
											<a href="http://info.sporttery.cn/football/search_odds.php?mid=114653" target="_blank">同</a>
										</td>
										<td class="uOddsTd">
											<div class="hadU bLine"><span class="rLine" title="207">85%</span><span class="rLine" title="22">9%</span><span title="15">6%</span></div>
											<div class="hhadU"><span class="rLine" title="136">82%</span><span class="rLine" title="27">16%</span><span title="2">1%</span></div>
										</td>
										<td class="matchInfoTd">&nbsp;</td>
									</tr>
									<tr>
										<td class="bDateTd" colspan="10" bindex="4">周一 2018-12-10&nbsp;&nbsp;&nbsp;共<label>2</label>场比赛&nbsp;&nbsp;&nbsp;
											<a href="javascript:void(0);" class="bDateHide">[显示]</a>
										</td>
									</tr>
									<tr id="list_114662" singleindex="0" dataindex="3_0" class="listTr" lindex="15" bindex="4" line="-1" style="display: none;">
										<td style="width: 48px;">周一<br>005</td>
										<td title="英格兰超级联赛" class="lname" style="background-color: rgb(255, 51, 51); width: 73px;">英超</td>
										<td style="width: 49px;">12-11<br>04:00</td>
										<td style="width: 49px;"><img title="大致多云" src="http://static.sporttery.cn/www/images/weather_logo/cloudy.png"><br>&nbsp;12°</td>
										<td title="点击VS进入对阵数据页,点击球队名称进入球队介绍页" onclick="toArrData(114662)" class="vsTd" style="width: 301px;"><label>[英超6]</label>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=674">埃弗顿</a>
											<a onclick="stopEvent(event)" class="vsA" target="_blank" href="http://info.sporttery.cn/football/info/fb_match_info.php?m=114662">VS</a>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=696">沃特福德</a><label>[英超11]</label></td>
										<td class="goalLineTd" style="width: 61px;">
											<div title="胜平负" class="hadGL">0</div>
											<div title="让球胜平负" class="hhadGL"><label style="font-weight:normal;"></label>-1</div>
										</td>
										<td style="width: 301px;">
											<div class="hadOdds bLine"><span class="oddsItem rLine oddsItemKeep">1.63</span><span class="oddsItem rLine oddsItemKeep">3.55</span><span class="oddsItem oddsItemKeep">4.30</span></div>
											<div class="hhadOdds"><span class="oddsItem rLine oddsItemKeep">2.91</span><span class="oddsItem rLine oddsItemKeep">3.45</span><span class="oddsItem oddsItemKeep">2.02</span></div>
										</td>
										<td class="linkTd" style="width: 73px;">
											<a href="http://info.sporttery.cn/football/info/fb_match_news.php?m=114662" target="_blank">讯</a>
											<a href="http://info.sporttery.cn/football/search_odds.php?mid=114662" target="_blank">同</a>
										</td>
										<td class="uOddsTd" style="width: 136px;">
											<div class="hadU bLine"><span class="rLine" title="7">58%</span><span class="rLine" title="4">33%</span><span title="1">8%</span></div>
											<div class="hhadU"><span class="rLine" title="3">100%</span><span class="rLine" title="0">0%</span><span title="0">0%</span></div>
										</td>
										<td class="matchInfoTd" style="width: 81px;">&nbsp;</td>
									</tr>
									<tr id="list_114663" singleindex="0" dataindex="3_1" class="listTr" lindex="10" bindex="4" line="-1" style="display: none;">
										<td>周一<br>006</td>
										<td title="西班牙甲级联赛" class="lname" style="background-color:#006633">西甲</td>
										<td>12-11<br>04:00</td>
										<td><img title="天晴" src="http://static.sporttery.cn/www/images/weather_logo/sunny.png"><br>&nbsp;6°</td>
										<td title="点击VS进入对阵数据页,点击球队名称进入球队介绍页" onclick="toArrData(114663)" class="vsTd"><label>[西甲18]</label>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=2019">毕尔巴鄂</a>
											<a onclick="stopEvent(event)" class="vsA" target="_blank" href="http://info.sporttery.cn/football/info/fb_match_info.php?m=114663">VS</a>
											<a onclick="stopEvent(event)" target="_blank" href="http://info.sporttery.cn/football/info/fb_team_info.php?tid=2101">赫罗纳</a><label>[西甲8]</label></td>
										<td class="goalLineTd">
											<div title="胜平负" class="hadGL">0</div>
											<div title="让球胜平负" class="hhadGL"><label style="font-weight:normal;"></label>-1</div>
										</td>
										<td>
											<div class="hadOdds bLine"><span class="oddsItem rLine oddsItemKeep">1.85</span><span class="oddsItem rLine oddsItemKeep">3.20</span><span class="oddsItem oddsItemKeep">3.65</span></div>
											<div class="hhadOdds"><span class="oddsItem rLine oddsItemKeep">3.80</span><span class="oddsItem rLine oddsItemKeep">3.40</span><span class="oddsItem oddsItemKeep">1.75</span></div>
										</td>
										<td class="linkTd">
											<a href="http://info.sporttery.cn/football/info/fb_match_news.php?m=114663" target="_blank">讯</a>
											<a href="http://info.sporttery.cn/football/search_odds.php?mid=114663" target="_blank">同</a>
										</td>
										<td class="uOddsTd">
											<div class="hadU bLine"><span class="rLine" title="9">64%</span><span class="rLine" title="3">21%</span><span title="2">14%</span></div>
											<div class="hhadU"><span class="rLine" title="0">0%</span><span class="rLine" title="2">40%</span><span title="3">60%</span></div>
										</td>
										<td class="matchInfoTd">&nbsp;</td>
									</tr>
									<tr>
										<td style="height:5px;" colspan="10"></td>
									</tr>
								</tbody>
							</table>-->

							<!--<table>
								<tr v-for="">
									<td>1</td>
									<td>2</td>
									<td>3</td>
									<td>4</td>
									<td>5</td>
									<td>1</td>
									<td>2</td>
									<td>3</td>
									<td>4</td>
									<td>5</td>
									<td>1</td>
									<td>2</td>
								</tr>
							</table>-->
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
	import hovertoptip from '../../common/templates/toptip/hovertoptip'
	
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
				],
				weekdata: [1, 2, 3]
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
			"v-register": register,
			"v-hovertoptip":hovertoptip
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
							#headerTr {
								tbody {
									tr {
										td {
											border: 1px solid #E3E3E3;
											border-top: none;
											background: #F8F8F8;
											text-align: center;
										}
										td:nth-child(2n) {
											border-left: none;
											border-right: none;
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