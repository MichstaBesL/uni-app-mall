<template>
	<view class="good">
		<view class="good_list">
			<view class="good_item" v-for="item in goods" :key="item.id" @click="cheangs(item.id)">
				<view>
					<image :src="item.imgUrl"></image>
				</view>
				<view>
					<view class="price">
						<text>￥{{item.new_price}}</text>
						<text>￥{{item.lod_price}}</text>
					</view>
					<view class="good_nr">
						{{item.title}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "good_list",
		props:["goods"],
		data() {
			return {
				
			};
		},
		methods:{
			cheangs(ids){
				this.$emit("cheang",{id:ids})
			}
		}
	}
</script>

<style lang="scss">
	.good_list {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		padding: 0 14rpx;

		.good_item {
			width: 360rpx;
			background-color: #fff;
			margin-bottom: 10rpx;
			font-size: 35rpx;

			view {
				margin: 10rpx;
			}

			.price {
				text:nth-child(1) {
					color: $uni-qj-color;
					font-size: 40rpx;
				}

				text:nth-child(2) {
					color: #828282;
					font-size: 30rpx;
					text-decoration: line-through;
					margin-left: 20rpx;
				}
			}

			.good_nr {
				line-height: 50rpx;
			}
		}

		image {
			width: 100%;
		}
	}
</style>
