<template>
	<view>
		<view>
			<good-list :goods="good_list" @cheang="cheang"></good-list>
		</view>
		<view class="prompt" v-show="showPrompt">-------我也是有底线的-------</view>
	</view>
</template>

<script>
	import goods from "@/components/good_list.vue"
	export default {
		data() {
			return {
				good_list:[],
				page:1,
				showPrompt:false,
			}
		},
		components:{
			"good-list":goods
		},
		onLoad() {
			this.getGoods()
		},
		methods: {
			getGoods(option){
				this.$myRequery({
					url:"/api/getGoods",
					data:{
						page:option?option:this.page
					}
				}).then(res=>{
					// 如果返回的数组长度为0说明没有数据了
					if(res.data.sumNumber == 0){
						this.showPrompt = true
						return 
					}
					this.good_list = [...this.good_list,...res.data.goods_list]
				})
				this.page++
			},
			cheang(args){ //跳转商品详情页
				uni.redirectTo({
					url:'/pages/detail/detail?id='+JSON.stringify(args.id)
				})
			}
		},
		onReachBottom() {
			if(this.showPrompt) return
			this.getGoods(this.page)
		},
		onPullDownRefresh() {
			this.page = 1
			this.showPrompt = false
			this.good_list = []
			
			this.getGoods()
			setTimeout(()=>{
				uni.stopPullDownRefresh()
			},1000)
		}
	}
</script>

<style lang="scss">
	.prompt{
		font-size: 28rpx;
		color: #ccc;
		text-align: center;
		margin: 26rpx 0;
	}
</style>
