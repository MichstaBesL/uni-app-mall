<template>
	<view>
		<view class="good_content">
			<view class="tit">热门商品</view>
			<good-list :goods="HotGoods" @cheang="cheang"></good-list>
			<view class="prompt" v-show="showPrompt">-------我也是有底线的-------</view>
		</view>
	</view>
</template>

<script>
	import	goods from"@/components/good_list.vue"
	export default {
		data() {
			return {
				HotGoods:[], 		//商品
				page:1, 			//第几页商品
				showPrompt:false,	//是否显示，false不显示
			}
		},
		components:{
			"good-list":goods,
		},
		created(){
			this.getHotGoods()
		},
		methods: {
			getHotGoods(page=1){
				this.$myRequery({
					url:"/api/getHotGoods",
					data:{
						page:page
					}
				}).then(res=>{
					if(res.data.success==true){
						if(res.data.goods_list.length==0) return this.showPrompt = true 
						
						this.HotGoods = [...this.HotGoods,...res.data.goods_list]
						
						this.page++ //请求成功后页数加1
					}
				})
			},
			cheang(id){
				uni.redirectTo({
					url:'/pages/detail/detail?id='+JSON.stringify(id.id)
				})
			}
		},
		onReachBottom() {
			this.getHotGoods(this.page)
		},
		onPullDownRefresh() { //下拉刷新
			this.HotGoods = []
			this.page = 1
			this.showPrompt = false
			
			this.getHotGoods()
			setTimeout(()=>{
				uni.stopPullDownRefresh()
			},500)
		}
	}
</script>

<style lang="scss">
	.good_content {
		background: #EEEEEE;

		.tit {
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
	.prompt{
		width:100%;
		text-align: center;
	}
</style>
