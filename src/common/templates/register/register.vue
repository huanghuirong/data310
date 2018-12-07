<template>
	<div id="resting">

		<!--注册-->
		<div class="register">
			<div class="registerClose" @click="clickRegisterClose()">
				<i class="el-icon-close"></i>
			</div>
			<div class="registerName">注册</div>
			<div class="tips">{{message}}</div>
			<div class="registerPhone">
				<el-input v-model="phoneNum" maxlength="11" placeholder="请输入11位手机号">
				</el-input>
			</div>
			<div class="registerCode">
				<el-input placeholder="输入验证码" v-model="codeNum" class="input-with-select">
					<el-button id="codeNum" slot="append" @click="getCode">{{codeWord}}</el-button>
				</el-input>
			</div>
			<el-input class="registerPass" placeholder="6 - 16 位密码，区分大小写" v-model="password" clearable>
			</el-input>
			<el-input class="registerPassTwo" placeholder="确认密码" v-model="password" clearable>
			</el-input>
			<div class="registerBtn" @click="register()">
				<div>注册</div>
			</div>
		</div>

	</div>

</template>
<script>
	import { HomeList } from '@/api/home-api.js'
	//		import { loadMine } from "@/utils/catch"
	export default {
		data() {
			return {
				message: '', //提示消息
				codeWord: '', //获取验证码
				phoneNum: '', //手机号
				codeNum: '', //验证码
				password: '', //密码
				time: 61, //倒计时
				timer: '', //倒计时
			}
		},
		props: {

		},
		created() {
			this.codeWord = "获取验证码"
			//			console.log(HomeList())
		},
		watch: {

		},
		methods: {
			//			注册关闭按钮
			clickRegisterClose() {
				this.$emit('clickRegisterClose')
			},
			//			点击获取验证码
			getCode() {
				if(this.codeWord == "获取验证码" || this.codeWord == "重新获取") {
					if(this.phoneNum == '') {
						this.message = '请您输入手机号';
						return;
					} else {
						let re = /^1\d{10}$/
						if(!re.test(this.phoneNum)) {
							this.message = '请输入正确的11位手机号码';
							return;
						} else {
							this.message = ''
							console.log("success")
							this._getCode_()
						}
					}
				}
			},

			//			点击注册按钮
			register() {
				clearInterval(this.timer)
				if(this.phoneNum == '') {
					this.message = '请您输入手机号'
				} else if(this.codeNum == '') {
					this.message = '请您输入验证码'
				} else if(this.password == '') {
					this.message = '请您输入密码'
				} else {
					this.message = ''
					this.logPhone()
				}
			},
			//			验证手机号
			logPhone() {
				let re = /^1\d{10}$/
				if(!re.test(this.phoneNum)) {
					this.message = '请您输入正确的11位手机号码'
					return
				} else {
					this.message = ''
					console.log("success")
					//					this._login_()
				}
			},

			//			接口开始
			//			获取验证码调接口
			_getCode_() {

				var self = this;
				HomeList({
					//					'token': loadMine().token,
					//					'uid': loadMine().uid,
					'token': 'npvdi2tfj3fg8hec7j1h4um5kh',
					'uid': '337702',
					'page': this.page,
					'required': true
				}).then((response) => {
					if(response.data.code == 200) {
						//倒计时

						
					}else{
						clearInterval(self.timer)
						var time = self.time;
						console.log(time)
						function timeShow() {

							time--;

							if(time > 60) {
								clearInterval(self.timer)
								self.codeWord = '获取验证码';
							} else if(time <= 0) {
								self.codeWord = "重新获取"
								clearInterval(self.timer)
							} else {
								self.codeWord = `${time}S重新获取`
							}
							console.log("Aa")
							console.log(time)
							
						};
						self.timer = setInterval(timeShow, 1000);
						console.log(self.timer)
//						setTimeout(function() {
//							console.log('登录成功');
//						}, 1500);
					}

				}).catch((error) => {
					console.log("错误")
				});
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
			.tips {
				text-align: left;
				margin: 5px;
				color: #fc4343;
				font-size: 12px;
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