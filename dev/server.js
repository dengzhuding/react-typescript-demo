/**
  使用webpack-dev-middleware中间件启动开发服务，提供简单的即时热更新
**/
const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');
const express = require('express');

const app = express();
const config = require('../webpack.config.js')
const compiler = webpack({
/** webpack options **/
  ...config
});
app.use(middleware(compiler, {
  /** webpack-dev-middleware options **/
  publicPath: config.output.publicPath
}));

const PORT = process.env.PORT || 3000
console.log('PORT: ', PORT);
app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`)
})
