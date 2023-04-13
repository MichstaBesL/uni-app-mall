<template>
	<view>
		<!-- 登录成功展示的页面 -->
		<view v-if="isDenLu">
			登录成功
			<u-button type="primary" @click="outSublimt"> 退出登录</u-button>
		</view>
		
		<!-- 没有登录展示的 登录页面 -->
		<view class="centainer" v-else>
			<view class="cen_title">
				登录
			</view>
			<view>
				<view class="cen_input" :class="{'show_ts':form.name.show_ts}">
					<view class="ps_ts">账号或密码错误，请重新输入</view>
					<uni-easyinput prefixIcon="person-filled" class="uni-mt-5 input" trim="all" v-model="form.name.value"
						placeholder="请输账号"></uni-easyinput>
				</view>
				<view class="cen_input" :class="{'show_ts':form.password.show_ts}">
					<view class="ps_ts">账号或密码错误，请重新输入</view>
					<uni-easyinput prefixIcon="locked" type="password" v-model="form.password.value" placeholder="请输入密码">
					</uni-easyinput>
				</view>
			</view>
			<view class="cen_submit">
				<u-button type="primary" v-bind:disabled="disabled" text="登录" @click="goLogin"></u-button>
				<view class="register" @click="goRegister">注册</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: { //表单信息
					name: {value:'456',show_ts:false},
					password:{value:'111',show_ts:false}
				},
				isDenLu:uni.getStorageSync("token")
			}
		},
		computed: {
			disabled() {
				return this.form.name.value && this.form.password.value ? false : true;
			}
		},
		methods: {
			goLogin() {
				this.$myRequery({
					url:'/api/user/login',
					data:{
						name:this.form.name.value.trim(),
						password:this.form.password.value.trim()
					}
				}).then((res)=>{
					if(!res.data.success) { //登录失败
						console.log("about,login",res.data.msg)
						return uni.showToast({
							title:res.data.msg
						})
						 
					}
					var token = res.data.user.token
					uni.showToast({
						title:"登录成功"
					})
					uni.setStorage({
						key:"token",
						data:token
					})
					let jwt = require("jsonwebtoken")
					console.log("about,login",jwt.decode(token))
					setTimeout(()=>{
						this.isDenLu = true
						
					},600)
				})
			},
			goRegister(){ //用户注册
				uni.redirectTo({
					url:"/pages/about/register"
				})
			},
			outSublimt(){//退出登录
				uni.showToast({
					title:"已退出登录"
				})
				setTimeout(()=>{
					this.isDenLu = false
					uni.removeStorageSync("token")
				},600)
			}
		}
	}
</script>

<style lang="scss">
	.centainer {
		padding: 0 60rpx;

		.cen_title {
			text-align: center;
			padding: 50rpx;
			font-size: 58rpx;
			color: #1AAD19;
		}

		.cen_input {
			margin-top: 30rpx;

			.ps_ts {
				font-size: 24rpx;
				color: orangered;
				margin: 10rpx 0;
				position: relative;
				top: 16px;
				transition: all .3s ease;
			}
			
		}
		.show_ts{
			// .input{border-color: red!important;}
			.ps_ts{
				top:0rpx!important
			}
		}
		.cen_submit {
			margin-top: 40rpx;
			
			.register{
				text-align: center;
				font-size: 30rpx;
				color: #444;
				padding:28rpx 0;
			}
		}
	}
</style>
