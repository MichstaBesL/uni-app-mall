<template>
	<view class="content">
		<scroll-view scroll-y='true' show-scrollbar class="left">
			<view 
				v-for="item in columnlist" 
				:key="item.id" 
				:class="active==item.id?'active':''"
				@click="getRightList(item.id)"
			>
				{{item.title}}
			</view>
		</scroll-view>
		<scroll-view scroll-y='true' show-scrollbar class="right">
			<view class="right_center">
				<view class="right_item" v-for="item in rightList" :key="item.id">
					<image :src="item.imgUrl" @click="previewImage(item.imgUrl)">
						<view class="title">
							{{item.title}}
						</view>
				</view>
				<view v-show="rightList.length==0">暂无数据</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				active:0,
				columnlist: [],
				rightList:[]
			}
		},
		methods: {
			async getColumn() {
				const res = await this.$myRequery({
					url: "/api/getColumn"
				})
				if (res.data.success != true) return
				this.active = res.data.columnlist[0].id
				this.columnlist = res.data.columnlist
				this.getRightList(res.data.columnlist[0].id)
			},
			async getRightList(id){
				this.active = id
				const res = await this.$myRequery({
					url: "/api/getColumnList",
					data:{id,}
				})
				this.rightList = res.data.columnlist
			},
			previewImage(url){
				const urls = this.rightList.map(item=>{
					return item.imgUrl
				})
				
				uni.previewImage({
					urls:urls,
					current:url
				})
			}
		},
		onLoad() {
			this.getColumn()
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
	}

	.content {
		display: flex;
		height: 100%;

		.left {
			flex: 2;
			text-align: center;
			height: 100%;
			border-right: 1px solid #e2e2e2;

			.active {
				background: $uni-qj-color;
				color: white;
			}

			view {
				font-size: 34rpx;
				line-height: 130rpx;
			}
		}

		.right {
			flex: 5;
			height: 100%;

			.right_center {
				padding: 10rpx;
			}

			.right_item {
				image {
					width: 100%;
					height: 400rpx;
					border-radius: 10rpx;
				}

				.title {
					font-size: 32rpx;
					line-height: 46rpx;
				}
			}
		}
	}
</style>
