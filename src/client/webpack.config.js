var path = require("path");

module.exports = {
  entry: {
    app: path.resolve(__dirname, "./static/js/entry.js")
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js"
  },
  module: {
  	loaders: [
			{
				//tell webpack to use jsx-loader for all *.jsx files
				test: /\.jsx$/,
				loader: 'jsx-loader?insertPragma=React.DOM&harmony'
			},
			{
				test: /\.css$/, // Only .css files
				loader: 'style!css' // Run both loaders
			}
		]
  }
};