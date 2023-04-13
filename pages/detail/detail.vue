<template>
	<view class="container">
		<view class="flx1">
			<scroll-view scroll-y="true" class="btscroll">
				<view>商品详情</view>
				<view>
					<view>商品标题:{{good.title}}</view>
				</view>
				<view>
					价格：{{good.new_price}} <text
						style="text-decoration: line-through;color: #a2a2a2">{{good.lod_price}}</text>
				</view>
				<view>
					商品详情：
					<view>
						{{good.content}}
						{{good.content}}{{good.content}}{{good.content}}{{good.content}}{{good.content}}
					</view>
				</view>
			</scroll-view>
		</view>

		<view class="flx2">
			<uni-goods-nav :options="options" :buttonGroup="buttonGroup" @click="onClick" @buttonClick="buttonClick" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				good: {},
				options: [{
					icon: 'headphones',
					text: '客服'
				}, {
					icon: 'shop',
					text: '店铺',
					info: 2,
					infoBackgroundColor: '#007aff',
					infoColor: "#fff"
				}, {
					icon: 'cart',
					text: '购物车',
					info: 2
				}],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				]
			}
		},
		onLoad(res) {
			let id = res.id
			console.log(res.id)
			this.$myRequery({
				url: '/api/goods/detail',
				method: "POST",
				data: {
					id: id
				}
			}).then(res => {
				console.log("detail页面",res)
				if (res.data.success) {
					this.good = res.data.good
				}
			})
		},
		methods: {
			onClick(options) {
				console.log(options)
				let index = options.index //0客服  1店铺 2购物车
				if(index == 0){
					console.log('客服')
				}else if(index == 1){
					console.log('店铺')
				}else if(index == 2){
					console.log('购物车')
					uni.navigateTo({
						url:'/pages/cart/cart'
					})
				}
			},
			buttonClick(options) {
				console.log(options)
				let index = options.index //0加入购物车  1立即付款
				if(index==0){
					this.addCar(this.good)
				}else if(index == 1){
					this.fkGoods()
				}
			},
			fkGoods(){
				console.log("发起支付请求")
				
			},
			addCar(good){
				console.log(good.id)
				let id = good.id
				this.$myRequery({
					url:'/api/good/addCar',
					method:"POST",
					data:{
						goodId:id
					},
					header:{
						"token":true
					}
				}).then((res)=>{
					uni.showToast({
						title:"添加成功"
					})
				})
			}
		}
	}
</script>

<style lang="scss">
	.container {
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		display: flex;
		flex-direction: column;

		.flx1 {
			flex: 1;
			overflow: hidden;
			width: initial;
			padding: 20rpx;
		}

		.btscroll {
			height: 100%;

		}
	}
</style>
