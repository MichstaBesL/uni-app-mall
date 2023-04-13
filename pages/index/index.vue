<template>
	<view class="content">
		<!-- swiper -->
		<view>
			<swiper indicator-dots autoplay circular indicator-active-color="#A80002">
				<swiper-item v-for="item in swiperList" :key="item.id">
					<image :src="item.imgUrl"></image>
				</swiper-item>
			</swiper>
		</view>
		<!-- nav导航 -->
		<view class="nav">
			<view class="nav_list">
				<view 
				class="nav_item"
				v-for="(item,index) in nav"
				:key="index"
				@click="gotoPath(item.path)"
				>
					<view :class="item.icon"></view>
					<text>{{item.title}}</text>
				</view>
			</view>
		</view>
		
		<!-- 推荐商品 -->
		
		<view class="good_content">
			<view class="tit">推荐商品</view>
			<good-list :goods="HotGoods" @cheang="cheang"></good-list>
		</view>
	</view>
</template>

<script>
	import goods from "@/components/good_list.vue"

	export default {
		data() {
			return {
				swiperList: [],
				HotGoods:[],
				nav:[
					{
						icon:"iconfont icon-tianmaochaoshi-gouwuche",
						title:"黑马超市",
						path:"/pages/market/market"
					},
					{
						icon:"iconfont icon-contact",
						title:"联系我们",
						path:"/pages/contact/contact"
					},
					{
						icon:"iconfont icon-tupian",
						title:"社区图片",
						path:"/pages/community/community"
					},
					{
						icon:"iconfont icon-shipin",
						title:"学习视频",
						path:"/pages/video/video"
					}
				]
			}
		},
		components:{
			"good-list":goods
		},
		onLoad() {
			this.getSwiper()
			this.getHotGoods()
		},
		methods: {
			//获取swiper
			getSwiper() {
				// 未封装前写法
				// uni.request({
				// 	url:"http://localhost:3000/api/getSwiper",
				// 	method:'GET',
				// 	success:(res)=>{
				// 		console.log(res.data.data)
				// 		if(res.data.data.success){
				// 			this.swiperList = res.data.data.list
				// 		}else{
				// 			return uni.showToast({
				// 				title:"请求失败"
				// 			})
				// 		}
				// 	}
				// })
				this.$myRequery({
					url: "/api/getSwiper"
				}).then((res) => {
					this.swiperList = res.data.list
				})
			},
			// 获取首页推荐商品列表
			getHotGoods(){
				this.$myRequery({
					url:"/api/getHotGoods",
					data:{
						page:1
					}
				}).then((res)=>{
					this.HotGoods = res.data.goods_list
				})
			},
			gotoPath(paths){
				uni.navigateTo({
					url:paths
				})
			},
			cheang(args){
				uni.redirectTo({
					url:'/pages/detail/detail?id='+JSON.stringify(args.id)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import url("../../static/font/iconfont.css");
	.content {
		swiper {
			width: 750rpx;
			height: 380rpx;
			image{
				width: 100%;
			}
		}
	}

	.nav_list {
		display: flex;
		justify-content: space-evenly;
		padding-bottom: 35rpx;

		.nav_item {
			text-align: center;
			color: #828282;
			font-size: 30rpx;
			
			view:nth-child(1){
				background: $uni-qj-color;
				color: #fff;
				width: 100rpx;
				height: 100rpx;
				border-radius: 100rpx;
				font-size: 50rpx;
				display: flex;
				justify-content: center;
				flex-direction: column-reverse;
				margin: 10px;
			}
		}
	}
	
	.good_content{
		background: #EEEEEE;
		.tit{
			color: $uni-qj-color;
			letter-spacing: 30rpx;
			font-size: 35rpx;
			text-align: center;
			background: #fff;
			line-height: 90rpx;
			margin: 10rpx 0;
			display: inline-block;
			width: 100%;
		}
		
	}
</style>
