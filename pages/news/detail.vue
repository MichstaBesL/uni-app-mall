<template>
	<view class="nr">
		<view class="title">
			{{detail.title}}
		</view>
		<view class="data">
			<view>
				发布时间：{{detail.fb_date}}
			</view>
			<view>
				浏览：{{detail.browse}}
			</view>
		</view>
		<view class="content">
			{{detail.content}}
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				detailId:0,
				detail:{}
			}
		},
		methods: {
			async getData(){
				const res = await this.$myRequery({
					url:"/api/getDetail",
					data:{
						id:this.detailId
					}
				})
				console.log(res)
				this.detail = res.data.newsDetail[0]
			}
		},
		onLoad(res) {
			this.detailId = res.id
			this.getData()
		}
	}
</script>

<style lang="scss">
	.nr{
		padding: 16rpx;
		.title{
			font-size: 44rpx;
			line-height: 54rpx;
			margin: 16rpx 0;
		}
		.data{
			display: flex;
			justify-content: space-between;
			font-size: 32rpx;
			margin: 16rpx 0;
		}
		.content{
			font-size: 36rpx;
			line-height: 46rpx;
		}
	}
</style>
