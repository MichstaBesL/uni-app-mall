<template>
	<view>
		<view class="centainer">
			<view class="cen_title">
				注册
			</view>
			<view>
				<view class="cen_input">
					<uni-easyinput prefixIcon="person-filled" class="uni-mt-5 input" v-model="form.name"
						placeholder="请输账号"></uni-easyinput>
				</view>
				<view class="cen_input" :class="{'show_ts':tsIsshow}">
					<view class="ps_ts">密码不一致，请重新输入</view>
					<uni-easyinput prefixIcon="locked" type="password" v-model="form.password" placeholder="请输入密码">
					</uni-easyinput>
				</view>
				<view class="cen_input" :class="{'show_ts':tsIsshow}">
					<view class="ps_ts">密码不一致，请重新输入</view>
					<uni-easyinput prefixIcon="locked" type="password" v-model="form.password2" placeholder="请再次输入密码">
					</uni-easyinput>
				</view>
			</view>
			<view class="cen_submit">
				<button type="primary" v-bind:disabled="disabled" @click="goRegister">注册</button>
				<view class="register" @click="goLogin">已有账号，去登录</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				form:{
					name:'',
					password:'',
					password2:''
				}
			}
		},
		computed:{
			tsIsshow(){
				return this.form.password.trim() == this.form.password2.trim() ? false:true
			},
			disabled(){
				return this.form.name.trim() !='' && !this.tsIsshow && this.form.password.trim()!='' && this.form.password2.trim()!='' ? false:true
			}
		},
		methods:{ 
			goLogin(){
				uni.switchTab({
					url:"/pages/about/about"
				})
			},
			goRegister(){
				this.$myRequery({
					url:'/api/user/register',
					data:{
						name:this.form.name,
						password:this.form.password
					}
				}).then(res=>{
					if(res.data.success){
						uni.showToast({
							title:res.data.message
						})
						uni.setStorage({
							key:"token",
							data:res.data.user.token
						})
						setTimeout(()=>{
							uni.switchTab({
								url:'/pages/index/index'
							})
						},600)
					}
					console.log(res)
				})
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
