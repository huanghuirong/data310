<template>
	<div id="head">
		<div class="header">
			<div class="headAll">
				<div class="headAllLeft">
					<img src="./logo.png" alt="" />
				</div>
				<div class="headAllRight">
					<div class="headCustom">
						<img src="./custom.png" alt="" />
						<span>客服电话：400-860-93932</span>
					</div>
					<div class="headLogin">

						<div class="headHaveLogin" v-if="haveLoginShow">
							<img src="./headportrait.png" alt="" />
							<span>用户名</span>
						</div>
						<div class="headNoLogin" @click="clickLogin()" v-else>登录，体验智能推荐</div>
					</div>
				</div>
			</div>
		</div>
	</div>

</template>
<script>
	export default {
		data() {
			return {
				haveLoginShow:false
			}
		},
		props: {

		},
		created() {

		},
		watch: {

		},
		methods: {
			clickLogin() {
				this.$emit('clickLogin')
			}
		},
		components: {

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
	
	#head {
		/*头部*/
		.header {
			color: #333;
			text-align: center;
			height: 100px;
			box-shadow: 0px 2px 0px #D9D9D9;
			-webkit-box-shadow: 0px 2px 0px #D9D9D9;
			-moz-box-shadow: 0px 2px 0px #D9D9D9;
			-o-box-shadow: 0px 2px 0px #D9D9D9;
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
	}
</style>