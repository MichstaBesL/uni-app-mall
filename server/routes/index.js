var express = require('express');
var router = express.Router();
var connection = require("../db/sql")
const { ifExpireToken } = require('../db/user.js');
var _User = require('../db/user.js') // name  password
/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', {
		title: 'Express'
	});
});
router.get('/api/getSwiper', function(req, res, next) {
	connection.query(`select * from swiper`, function(error, results) {
		if (results.length > 0) {
			res.send({
				code: 200,
				data: {
					success: true,
					list: results
				}
			})
		} else {
			res.send({
				code: 200,
				data: {
					success: true,
					list: []
				}
			})
		}
	})
});
router.get('/api/getHotGoods', function(req, res, next) {
	// 前端传递的参数 
	const data = req.query
	let pages = data.page - 1 < 0 ? 0 : data.page - 1
	pages = pages != 1 ? pages * 10 : pages
	connection.query(`select * from goods limit ${pages},10`, function(error, results) {
		if (results.length > 0) {
			res.send({
				code: 200,
				data: {
					success: true,
					goods_list: results,
				}
			})
		} else {
			res.send({
				code: 200,
				data: {
					success: true,
					goods_list: [],
				}
			})
		}
	})

});
router.get('/api/getGoods', function(req, res, next) {
	// 前端传递的参数
	const data = req.query
	let pages = data.page - 1 < 0 ? 0 : data.page - 1
	pages = pages != 1 ? pages * 10 : pages
	connection.query(`select * from goods limit ${pages},10`, function(error, results) {
		if (results.length > 0) {
			res.send({
				code: 200,
				data: {
					success: true,
					goods_list: results,
					sumNumber: results.length
				}
			})
		} else {
			res.send({
				code: 200,
				data: {
					success: true,
					goods_list: [],
					sumNumber: results.length,
				}
			})
		}
	})
});
router.get('/api/getColumn', function(req, res, next) {
	connection.query(`select * from columns`, function(error, results) {
		if (results.length > 0) {
			res.send({
				code: 200,
				data: {
					success: true,
					columnlist: results,
					sumNumber: results.length
				}
			})
		} else {
			res.send({
				code: 200,
				data: {
					success: true,
					columnlist: [],
					sumNumber: results.length,
				}
			})
		}
	})
});
router.get('/api/getColumnList', function(req, res, next) {
	const data = req.query
	connection.query(`select * from column_list where col_id = ${data.id}`, function(error, results) {
		if (results.length > 0) {
			res.send({
				code: 200,
				data: {
					success: true,
					columnlist: results,
					sumNumber: results.length
				}
			})
		} else {
			res.send({
				code: 200,
				data: {
					success: true,
					columnlist: [],
					sumNumber: results.length,
				}
			})
		}
	})
});
router.get('/api/getNewsList', function(req, res, next) {
	connection.query(`select * from news_list`, function(error, results) {
		if (results.length > 0) {
			res.send({
				code: 200,
				data: {
					success: true,
					newsList: results,
					sumNumber: results.length
				}
			})
		} else {
			res.send({
				code: 200,
				data: {
					success: true,
					newsList: [],
					sumNumber: results.length,
				}
			})
		}
	})
})

// /api/getDetail 详情页数据 
router.get('/api/getDetail', function(req, res, next) {
	const data = req.query
	connection.query(`select * from news_list where id = ${data.id}`, function(error, results) {
		if (results.length > 0) {
			res.send({
				code: 200,
				data: {
					success: true,
					newsDetail: results
				}
			})
		} else {
			res.send({
				code: 200,
				data: {
					success: true,
					newsDetail: []
				}
			})
		}
	})
})
//注册api /api/user/register
router.get('/api/user/register', function(req, res, next) {
	/* 
		1检查用户是否存在，如果存在直接send提示信息
		2如果不存在，添加用户，并返回用户信息
	 */
	
	const {name,password} = req.query
	const user = {name,password}
	connection.query(`select * from user where name='${user.name}'`,function(error,results){
		if(results.length > 0){ //大于0说明用户已存在
			res.send({
				code:200,
				data:{
					success:true,
					message:'用户已存在'
				}
			})
		}else{
			connection.query(_User.addUser(user),function(error, results) {
				connection.query(`select * from user where name='${user.name}'`,function(error,results){
					res.send({
						code:200,
						data:{
							success:true,
							message:'注册成功',
							user: results[0]
						}
					})
				})
				
			})
		}
	})
})

// 用户登录
router.get('/api/user/login', function(req, res, next) {
	//每次登录都要重新获取最新的token
	const {name,password} = req.query
	connection.query(`select * from user where name=${name} and password=${password}`,function(error,results){
		if(results.length >0 ){ 
			connection.query(_User.updataNewToken(results[0]),function(error2,results2){
				res.send({
					code:200,
					data:{
						success:true,
						user:results[0],
						msg:"登录成功"
					}
				})
			})
		}else{
			res.send({
				code:200,
				data:{
					success:false,
					msg:'账号不存在，或信息错误'
				}
			})
		}
	})
	
})

// 更新token /api/user/getNewToken
router.post('/api/user/getNewToken', function(req, res, next) {

	let token = req.headers.token
	let jwt = require("jsonwebtoken")
	let tk = jwt.decode(token)
	let name = tk.data.name

	connection.query(_User.selectUser(name),function(error,results){
		if(results.length > 0){
			connection.query(_User.updataNewToken(results[0]),function(error,results){
				connection.query(_User.selectUser(name),function(error,results){ //查询最新的用户信息并返回 
					res.send({
						code:200,
						data:{
							success:true,
							msg:'token更新成功',
							user:results[0]
						}
					})	
				})
			})
			
		}
	})
})

//商品详情
router.post('/api/goods/detail',function(req,res,next){
	let id = req.body.id
	connection.query(`select * from goods where id = ${id}`,function(error,results){
		res.send({
			code:200,
			data:{
				success:true,
				msg:"查询成功",
				good:results[0]
			}
		})
	})
})

// 添加购物车
// /api/good/addCar
router.post('/api/good/addCar',function(req,res,next){
	/* 
		前端传入token
		后端判断token是否过期，过期返回401
		没有过期则
			先判断该商品是否已存在购物车内
				存在的话数量加1
				不存在再添加
	 */
	let token = req.headers.token
	let goodId = req.body.goodId
	let ifexpToken = _User.ifExpireToken(token)  //判断token是否过期，过期会直接返回401
	
	if(ifexpToken.ifexp){
		res.send({
			code:401,
			data:{
				success:true,
				msg:'token过期'
			}
		})
	}else{
		connection.query(_User.selectUser(ifexpToken.user.data.name),function(error,results){
			let userid = results[0].id
			if(results.length > 0){
				connection.query(`select * from cart where uid=${userid} and good_id=${goodId}`,function(error,results){
					if(results.length>0){ //说明商品已经存在购物车，数量加1
						let goodsNum = results[0].good_num
						connection.query(`update cart set good_num=replace(good_num,${goodsNum},${goodsNum+1}) where uid=${userid} and good_id=${goodId}`,function(error,results){
							res.send({
								code:200,
								data:{
									success:true,
									msg:"添加成功"
								}
							})
						})
					}else{
						connection.query(`select * from goods where id = ${goodId}`,function(error,results){
							connection.query(`
								insert into cart(uid,good_id,good_name,good_container,good_price,good_img,good_num) 
								values(${userid},${goodId},'${results[0].title}','${results[0].content}',${results[0].new_price},'${results[0].imgUrl}',1)
							`,function(error,results){
								res.send({
									code:200,
									data:{
										success:true,
										msg:"添加成功"
									}
								})
							})
						})
					}
				})
			}
		})
	}
})

//购物车展示 /api/cart/listShow
router.post('/api/cart/listShow',function(req,res,next){
	let token = req.headers.token
	let ifexpToken = _User.ifExpireToken(token)  //判断token是否过期，过期会直接返回401
	if(ifexpToken.ifexp){
		res.send({
			code:401,
			data:{
				success:true,
				msg:'token过期'
			}
		})
	}else{
		let userName = ifexpToken.user.data.name
		connection.query(`select * from user where name=${userName}`,function(error,results){
			if(results.length > 0){
				connection.query(`select * from cart where uid=${results[0].id}`,function(error,results){
					if(results.length > 0){
						res.send({
							code:200,
							data:{
								success:true,
								msg:'查询成功',
								carList:results
							}
						})
					}
				})
			}
		})
	}
	
})


module.exports = router;
