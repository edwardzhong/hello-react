const merge = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
	mode: "production",
	output: {
		publicPath: "./" //使用相对路径(./)生成可以静态访问的页面，绝对路径(/)才能devServer使用
	}
});
