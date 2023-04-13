<template>
	<view class="container">
		<scroll-view class="scrool" scroll-y="true">
			<view class="carList" v-if="carList.length">
				<view class="carItem" v-for="(item,id) in carList" :key="id">
					<checkbox value="cb" :checked="item.checked" @click="cheang(item)" />
					<img :src="item.good_img" alt="">
					<view class="ms">
						<view class="title">{{item.good_name}}</view>
						<view class="mss">{{item.good_container}}</view>
					</view>
					<view class="carPrice">
						￥{{item.good_price}}
						<view style="display: flex;justify-content: center;margin-top: 16rpx;align-items: center;color: rgba(0,0,0,.5);">
							X:<input style="width: 60rpx;border: 1rpx solid rgba(0,0,0,.5);margin-left: 10rpx;" type="text" :value="item.good_num">
						</view>
					</view>
				</view>
			</view>
			<view v-else>
				暂无数据，去首页添加
			</view>
		</scroll-view>
		<view class="footer">
			<view style="overflow: hidden;height: 60rpx;">
				<checkbox :checked="isQuanSelect" @click="quanSelect" /> 总: {{sumNum}} 件商品，共:{{sumPrice}} 元
			</view>
			<view class="zf" @click="pay">
				立即支付
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				carList:[],
				checkedList:[]
			}
		},
		computed:{
			isQuanSelect(){
				return this.carList.length == this.checkedList.length && this.carList.length != 0 && this.checkedList.length!=0 ? true:false
			},
			sumNum(){
				let sumNum = 0
				this.carList.forEach((item)=>{ 
					if(item.checked){
						sumNum += item.good_num
					}
				})
				return sumNum
			},
			sumPrice(){
				let sumPrice = 0
				this.carList.forEach((item)=>{
					if(item.checked){
						sumPrice += item.good_num * item.good_price
					}
				})
				return sumPrice
			}
		},
		onLoad() {
			this.$myRequery({
				url:'/api/cart/listShow',
				method:"POST",
				header:{
					"token":true
				}
			}).then(res=>{
				if(res.data.success){
					// checked
					this.carList = res.data.carList.map((item)=>{
						item.checked = false
						return item
					})
				}
			})
		},
		methods: {
			cheang(item){ //单选
				/* 
					改变当前的选中状
					判断是否已经存在于this.checkedList
						如果不存在就添加进去
						存在的话就去除
				 */
				item.checked = !item.checked
				let index = this.checkedList.indexOf(item.id) //查找下标，如果存在返回当前下标，不存在返回-1
				if( index == '-1'){
					this.checkedList.push(item.id)
					return ;
				}
				this.checkedList.splice(index,1)
			},
			quanSelect(){ //全选
				let ischeck = this.carList.length == this.checkedList.length ? true : false
				//true 全部取消  false 全部选中
				if(ischeck){
					this.carList.forEach((item)=>{
						item.checked = false
					})
					this.checkedList = []
				}else{
					this.checkedList = this.carList.map((item)=>{
						item.checked = true
						return item.id
					})
				}
			},
			pay(){ //立即支付
				if(this.checkedList.length > 0){
					setTimeout(()=>{
						uni.showToast({
							title:"运气-"+this.sumPrice
						})
					},500)
				}else{
					uni.showToast({
						icon:'error',
						title:"未选择商品"
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.container{
		display: flex;
		height:100vh;
		overflow: hidden;
		flex-direction: column;
		flex:1;
		
		.scrool{
			height:100%;
			flex: 1;
			overflow: hidden;
			width: initial;
			
			.carList{
				display:flex;
				flex-flow: wrap;
				
				.carItem:nth-child(1){
					margin-top: 16rpx;
				}
				.carItem{
					width: 100%;
					height: 240rpx;
					background-color: #eaeaea;
					margin:0 14rpx 14rpx 14rpx;
					border-radius: 16rpx;
					overflow: hidden;
					display: flex;
					align-items: center;
					flex-flow: wrap;
					padding: 0 20rpx;
					text-align: center;
					
					
					img{
						width: 140rpx;
						height:140rpx;
						object-fit: cover;
					}
					.ms{
						width: 50%;
						text-align: left;
						padding-left: 20rpx;
						box-sizing: border-box;
						
						.title{
							font-size: 34rpx;
							outline: none;
							word-break: keep-all;
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;
							
						}
						.mss{
							font-size: 28rpx;
							margin-top: 16rpx;
							color: rgba(0,0,0,.5);
							-webkit-box-orient :vertical;
							display: -webkit-box;
							-webkit-line-clamp:2;
							overflow: hidden;
						}
					}
					.carPrice{
						width:20%;
						color: #F22328;
						font-size: 32rpx;
					}
				}
			}
		}
		.footer{
			border-top:1rpx solid  #eaeaea;
			border-radius: 16rpx 10rpx 0 0;
			height:100rpx;
			padding: 18rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 32rpx;
			
			.zf{
				background:#F22328;
				color:#fff;
				width: 270rpx;
				text-align: center;
				padding: 26rpx;
				border-radius: 50rpx;
				font-size: 34rpx;
			}
		}
	}
</style>
