<template>
	<view>
		<view class="news_list">
			<view class="news_item" v-for="item in newsList" :key="item.id" @click="gotoDetail(item.id)">
				<image class="image" :src="item.imgUrl"></image>
				<view class="news_item_right">
					<view class="title">
						{{item.title}}
					</view>
					<view class="right_bottom">
						<view>
							发表时间：{{item.fb_date.substring(0,10)}}
						</view>
						<view>
							浏览:{{item.browse}}次
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				newsList:[]
			}
		},
		methods: {
			async getData(){
				const res = await this.$myRequery({
					url:"/api/getNewsList"
				})
				this.newsList = res.data.newsList
			},
			gotoDetail(id){
				uni.navigateTo({
					url:"/pages/news/detail?id="+id,
				})
			}
		},
		onLoad() {
			this.getData()
		}
	}
</script>

<style lang="scss">
	.news_list{
		.news_item{
			display: flex;
			padding: 16rpx;
			border-bottom: 1px solid #DFA9A4;
			.image{
				flex: 2;
				width:280rpx;
				height: 170rpx;
			}
			.news_item_right{
				flex: 5;
				padding: 8rpx 16rpx;
				font-size: 34rpx;
				line-height: 40rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				.title{
					margin-bottom: 16rpx;
				}
				.right_bottom{
					font-size: 30rpx;
					color: #717171;
					display: flex;
					justify-content: space-between;
				}
			}
		}
	}
</style>
