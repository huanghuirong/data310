<template>
	<div id="homepage">
		<el-container class="el-container">
			<!--头部-->
			<el-header class="el-header">
				<div class="headerText">
					<div></div>
					<div>2</div>
				</div>
			</el-header>
			<!--内容-->
			<el-main class="el-main">Main</el-main>
			<!--底部-->
			<el-footer class="el-footer">
				<foot></foot>
			</el-footer>
		</el-container>
	</div>
</template>
<script>
	import foot from '../../common/templates/foot/foot'
	export default {
		data() {
			return {

			}
		},
		props: {

		},
		created() {

		},
		watch: {

		},
		methods: {

		},
		components: {
			foot
		},
		computed: {

		}
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	#homepage {
		overflow: scroll;
		.el-container {
			.el-header,
			.el-footer {
				background: #fff;
				color: #333;
				text-align: center;
				line-height:120px;
			}
			.el-header {
				position: fixed;
				top: 0px;
				left: 0px;
				right: 0px;
				height:100px;
				border-bottom:1px solid red;
				text-align: center;
				margin: 0 auto;
				.headerText {
					margin: 0 auto;
					border: 1px solid red;
					width: 1160px;
					min-width: 1160px;
					height: 100%;
					display: flex;
					align-items: center;
					justify-content: space-between;
				}
			}
			.el-footer {
				position: fixed;
				bottom: 0px;
				left: 0px;
				right: 0px;
				/*display: flex;
				align-items: center;
				justify-content: center;*/
			}
			.el-main {
				background-color: #E9EEF3;
				color: #333;
				text-align: center;
				line-height:320px;
			}
		}
	}
</style>