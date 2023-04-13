let isRefreshing = true
let subsribers = []
const BASE_URL = "http://localhost:3000"
// const BASE_URL = "http://192.168.137.1:3000"

function onAccessTokenFetched(){
	subsribers.forEach((callback)=>{
		callback()
	})
	subsribers = []
}

function addSubscriber(callback){
	subsribers.push(callback)
}

function getNewToken(options){
	return new Promise((resolve,reject)=>{
		uni.request({
			url:options.url || '',
			method:options.method || '',
			header:options.header || '',
			data: options.data || '',
			success:(res)=> {
				let newtoken = res.data.data.user.token
				uni.setStorageSync("token",newtoken)
				resolve(res.data)
			},
			fail:(error)=>{
				return reject(error)
			}
		})
	})
}

export const myRequery = function(options={}){	
	let url = options.url
	let method = options.method || "GET"
	let data = options.data || {}
	let params = options.params || {}
	let body = options.body || {}
	let token = uni.getStorageSync("token")
	let callback = options.callback || ''
	let _this = this
	let header = options.header || {}
	
	uni.getNetworkType({
		success(res) {
			if(res.networkType=='none'){ //判断当前是否有网,无网络直接返回，并提示
				uni.showToast({
					icon:'error',
					title:"无网络链接，请稍后再试!"
				})
				return 
			}
		}
	})
	
	let tks = header.token || ''
	if(tks==true && uni.getStorageSync("token")==''){ //判断是否登录，没有登录直接跳转到登录页
		uni.switchTab({
			url:"/pages/about/about"
		})
		return
	}
	
	return new Promise((resolve,reject)=>{
		uni.request({
			url:BASE_URL+url,
			method,
			data,
			params,
			body,
			header:{
				"token": token || '',
				"content-type":method == 'POST' ? 'application/json;charset=utf-8' : 'appliation/x-www-form-urlencoded'
			},
			callback,
			complete:(res) =>{
				if(callback) return callback(res.data)
				let statusCode = res.data.code || ''
				let errText = res.data.data.msg || ''
				if(statusCode == 404){
					console.log("接口不存在")
				}else if(statusCode == 401 || statusCode == 10002){ //说明token过期
					console.log("token过期，重新获取")
					addSubscriber(()=>{
						myRequery({
							url,
							data,
							method,
							header,
							callback:resolve
						})
					})
					if(isRefreshing){ 
						getNewToken({
							url:BASE_URL+'/api/user/getNewToken',
							method,
							header:{
								"token":token,
								"content-type":method == 'POST'?'application/json;charset=utf-8':'appliation/x-www-form-urlencoded'
							}
						}).then((res)=>{
							onAccessTokenFetched();
							isRefreshing = true
						})
					}
					isRefreshing = false
				}else if(statusCode == 200 || statusCode == 0 || statusCode == 1){
					//登录成功，抛出数据
					resolve(res.data)
				}else if( statusCode === 10004){
					reject(res.data)
				}else if(statusCode == 30001 || statusCode == 30002){
					// 提示用户登录信息不全，需要获取用户信息
					uni.navigateTo({
						url:"/pages/about/about"
					})
				}else if(statusCode.startsWith('5')){
					uni.showToast({
						icon:'error',
						title:"服务器报错，请重试!"
					})
				}
			},
			fail:(error)=> {
				uni.showToast({
					icon:'error',
					title:"数据请求失败"
				})
				return reject(error)
			}
		})
	})
}