<template>
	<div id="resting">

		<!--注册-->
		<div class="register">
			<div class="registerClose" @click="clickRegisterClose()">
				<i class="el-icon-close"></i>
			</div>
			<div class="registerName">注册</div>
			<div class="registerPhone">
				<el-input placeholder="请输入11位手机号">
				</el-input>
			</div>
			<div class="registerCode">
				<el-input placeholder="输入验证码" v-model="input5" class="input-with-select">
					<el-button slot="append">获取验证码</el-button>
				</el-input>
			</div>
			<el-input class="registerPass" placeholder="6 - 16 位密码，区分大小写" v-model="input10" clearable>
			</el-input>
			<el-input class="registerPassTwo" placeholder="确认密码" v-model="input10" clearable>
			</el-input>
			<div class="registerBtn">
				<div>注册</div>
			</div>
		</div>

	</div>

</template>
<script>
	export default {
		data() {
			return {
				input5: '',
				input10: '',
			}
		},
		props: {

		},
		created() {

		},
		watch: {

		},
		methods: {
			clickRegisterClose(){
				this.$emit('clickRegisterClose')
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
	
	#resting {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0px;
		left: 0px;
		right: 0px;
		bottom: 0px;
		background: rgba(0, 0, 0, 0.7);
		z-index: 100;
		.register {
			width: 408px;
			background: #FFFFFF;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			padding: 18px 20px 40px 20px;
			box-sizing: border-box;
			.registerClose {
				text-align: right;
			}
			.registerName {
				font-size: 20px;
				color: #333333;
				margin-bottom: 20px;
			}
			.registerPhone {}
			.registerCode {
				margin: 24px 0px;
				.el-button {
					width: 102px;
				}
			}
			.registerPass {
				display: flex;
				align-items: center;
				justify-content: space-between;
				font-size: 14px;
			}
			.registerPassTwo {
				margin-top: 24px;
			}
			.registerBtn {
				font-size: 16px;
				color: #FFFFFF;
				background: #FF5A00;
				padding: 8px 0px;
				box-sizing: border-box;
				text-align: center;
				margin-top: 24px;
			}
		}
	}
</style>