

module.exports = {
	configureWebpack: {
        resolve: {
            extensions: ['js', 'vue'],
            alias: {
                'src': '@'
            }
        }
    },
	devServer: {
		open: true, // 自动打开浏览器
		host: '0.0.0.0', // 真机模拟，使用
		port: '8080', // 前台代理端口号
		https: false, // https： {type: Booleam}
		hotOnly: false, // 热更新
		proxy: {
			'/api': {
				target: 'http://ttapi.research.itcast.cn/', // 要访问的跨域的域名
				ws: true, // 如果要代理websockets
				changeOrigin: true, // 开启代理
				pathRewrite: { // 路径重写
					'^/api': '' // 使用 `/api` 代替 `target` 要访问的跨域的域名
				}
			}
		}
	}
}
