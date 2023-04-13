// module.exports = {
// 	devServer:{
// 		port:"8080",
// 		disableHostCheck:true,
// 		proxy:{
// 			'/dpc':{
// 				target:"http://192.168.137.1:3000",
// 				changeOrigin:true,
// 				pathRewrite:{
// 					'^/dpc':''
// 				}
// 			}
// 		}
// 	}
// }

module.exports = {
	devServer:{
		port:"8080",
		disableHostCheck:true,
		proxy:{
			'/dpc':{
				target:"http://localhost:3000",
				changeOrigin:true,
				pathRewrite:{
					'^/dpc':''
				}
			}
		}
	}
}





