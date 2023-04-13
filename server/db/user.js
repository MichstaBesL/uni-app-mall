//引入token包
let jwt = require("jsonwebtoken")
//口令
let secret = "LDMLDMLDM"
const _User = {
	selectUser(name){
		return `select * from user where name = ${name}`
	},
	addUser(options) {
		let name = options.name
		let password = options.password || "666666"

		//用户信息
		let user = {
			name: options.name
		}
		//生成token
		let token = jwt.sign({
			exp: Math.floor(Date.now() / 1000) + (60 * 60), //1小时过期时间
			data:user
		}, secret)
		return "insert into user(name,password,token) values('"+name+"','"+password+"','"+token+"')"
	},
	ifExpireToken(token){  //是否过期
		let ifexpirtoken = true //是否过期,默认true过期
		let tokendata = jwt.decode(token)
		let data = Math.floor(Date.now() / 1000)  //当前时间戳
		ifexpirtoken = tokendata.exp <= data ? true : false
		
		return {
			ifexp:ifexpirtoken,
			user:tokendata
		}
	},
	updataNewToken(options){
		//生成新的token
		let newToken = jwt.sign({
			// exp: Math.floor(Date.now() / 1000) + (60 * 60), //1小时过期时间
			exp: Math.floor(Date.now() / 1000) + (1 * 60), 
			data:{
				name:options.name
			}
		}, secret)
		console.log("更新token",jwt.decode(newToken))
		// console.log("新的token",newToken)
		// console.log(options)
		return `update user set token=replace(token,'${options.token}','${newToken}') where id=${options.id}`
	}
}
exports = module.exports = _User
