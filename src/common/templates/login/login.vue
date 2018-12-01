<template>
	<div id="login">
		<div class="loginAll">
			<div class="loginClose" @click="clickLoginClose()">
				<i class="el-icon-close"></i>
			</div>
			<div class="loginName">登录</div>
			<div class="loginPhone">
				<i class="el-icon-mobile-phone"></i>
				<div class="loginPhoneWord" >手机号</div>
				<div class="loginPhoneInput">
					<input type="text" v-model="phoneNum" maxlength="11" />
				</div>
			</div>
			<div class="loginPassword">
				<i class="el-icon-view"></i>
				<div class="loginPassWord">密码</div>
				<div class="loginPassInput">
					<input type="text" v-model="password"/>
				</div>
			</div>
			<div class="loginGo">
				<div class="goRegister" @click="clickGoRegister()">立即注册</div>
				<div @click="clickForget()">忘记密码</div>
			</div>
			<div class="loginBtn" @click="login()">
				<div>登录</div>
			</div>
		</div>
	</div>

</template>
<script>
	export default {
		data() {
			return {
				phoneNum:'',
				password:'',
			}
		},
		props: {

			
		},
		created() {
		},
		watch: {
			phoneNum(val) {
				console.log(val)
			},
			
		},
		methods: {
			clickLoginClose() {
				this.$emit('clickLoginClose')
			},
			clickGoRegister() {
				this.$emit('clickGoRegister')
			},
			clickForget() {
				this.$emit('clickForget')
			},
			login(){
				if(this.phoneNum == '') {
					console.log('请输入手机号')
//					this.message = '请输入手机号'
//					this.$refs.toptip.show()
				} else if(this.password == '') {
					console.log("请输入密码")
//					this.message = '请输入密码'
//					this.$refs.toptip.show()
				} else {
					this.logPhone()
				}
			},
			//			验证手机号
			logPhone() {
				let re = /^1\d{10}$/
				if(!re.test(this.phoneNum)) {
					console.log("请输入正确的11位手机号码")
//					this.message = '请输入正确的11位手机号码'
//					this.$refs.toptip.show()
					return
				} else {
					console.log("success")
//					this._login_()
				}
			},
		},
		components: {

		},
		computed: {

		}
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	/*登录*/
	
	* {
		margin: 0px;
		padding: 0px;
		list-style: none;
		text-decoration: none;
	}
	
	#login {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0px;
		left: 0px;
		right: 0px;
		bottom: 0px;
		background: rgba(0, 0, 0, 0.7);
		z-index: 100;
		.loginAll {
			width: 408px;
			background: #FFFFFF;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			padding: 18px 20px 40px 20px;
			box-sizing: border-box;
			.loginClose {
				text-align: right;
			}
			.loginName {
				font-size: 20px;
				color: #333333;
				margin-bottom: 20px;
			}
			.loginPhone {
				display: flex;
				align-items: center;
				border: 1px solid #D9D9D9;
				padding: 8px 12px;
				box-sizing: border-box;
				.loginPhoneWord {
					margin: 0px 5px;
					font-size: 16px;
					color: #BFBFBF;
				}
				.loginPhoneInput {
					flex: 1;
					input {
						width: 100%;
						height: 25px;
						border: none;
						outline: none;
					}
				}
			}
			.loginPassword {
				display: flex;
				align-items: center;
				margin: 24px 0px;
				border: 1px solid #D9D9D9;
				padding: 8px 12px;
				box-sizing: border-box;
				.loginPassWord {
					margin: 0px 5px;
					font-size: 16px;
					color: #BFBFBF;
				}
				.loginPassInput {
					flex: 1;
					input {
						width: 100%;
						height: 25px;
						border: none;
						outline: none;
					}
				}
			}
			.loginGo {
				display: flex;
				align-items: center;
				justify-content: space-between;
				font-size: 14px;
				.goRegister {
					color: #FF5A00;
				}
			}
			.loginBtn {
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