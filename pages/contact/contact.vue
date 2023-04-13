<template>
	<view>
		<view>
			<image class="banner" src="https://img2.baidu.com/it/u=1507992634,347356555&fm=253&fmt=auto&app=138&f=GIF?w=536&h=200"></image>
		</view>
		<view class="content">
			<text @click="telPhone">联系电话：400-0000-0000</text>
			<view class="nr">
				地址：浙江省杭州市下沙经济开发区4号大街187号盛泰时代山.
			</view>
		</view>
		<map class="map" longitude="112.944105" latitude="28.188193" :markers="markers"></map>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				markers:[
					{
						id:2,
						longitude:'112.944105',
						latitude:'28.188193',
						iconPath:"https://img1.baidu.com/it/u=1859585489,3853419137&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=501",
						width:50,
						height:50
					}
				]
			}
		},
		methods: {
			telPhone(){
				uni.makePhoneCall({
					phoneNumber:"400-0000-0000"
				})
			}
		}
	}
</script>

<style lang="scss">
	.banner{
		width: 750rpx;
		height: 320rpx;
	}
	.map{
		width:750rpx;
		height: 750rpx;
	}
	.content{
		text{
			font-size:32rpx;
			line-height: 60rpx;
			width: 750rpx;
			display: inline-block;
			border-bottom: 1px solid #ccc;
		}
		.nr{
			font-size:32rpx;
			line-height: 60rpx;
		}
	}
</style>
