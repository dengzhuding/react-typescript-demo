const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// 生成打包依赖图插件
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = (env, argv) => {
  return {
    mode: env.production ? 'production' : 'development',
    // mode: 'production',
    devtool: env.production ? 'source-map' : 'eval',
    context: __dirname,
    entry: {
      index: {
        import: './src/index.tsx'
      },
      // 'another-module': {
      //   import: './src/another-module.tsx',
      // }
    },
    plugins: [
      new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
      new HtmlWebpackPlugin({
        title: 'index-html',
        template: path.join(__dirname, 'public/index.html'),
        filename: 'index.html',
        chunks: ['index', 'react']
      }),
      // new HtmlWebpackPlugin({
      //   title: 'another-module-html',
      //   template: path.join(__dirname, 'public/index.html'),
      //   filename: 'another-module.html',
      //   chunks: ['another-module']
      // })
    ]
    .concat([false && env.production ? '' : new BundleAnalyzerPlugin()]),
    optimization: {
      // 告知 webpack 当选择模块 id 时需要使用哪种算法 'natural' | 'named' | 'deterministic' | 'size'
      moduleIds: 'deterministic',
      // 提取引导模板
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          react: {
            name: "chunk-react",
            test: /[\\/]node_modules[\\/]react|react-dom[\\/]/,
            chunks: "all",
            priority: 3,
            reuseExistingChunk: true,
            enforce: true
          },
          lodash: {
            name: "chunk-lodash",
            test: /[\\/]node_modules[\\/]lodash[\\/]/,
            chunks: "all",
            priority: 3,
            reuseExistingChunk: true,
            enforce: true
          },
          zrender: {
            name: "chunk-zrender",
            test: /[\\/]node_modules[\\/]zrender[\\/]/,
            chunks: "all",
            priority: 3,
            reuseExistingChunk: true,
            enforce: true
          },
          echarts: {
            name: "chunk-echarts",
            test: /[\\/]node_modules[\\/]echarts[\\/]/,
            chunks: "all",
            priority: 3,
            reuseExistingChunk: true,
            enforce: true
          },
          // 提取第三方库
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'chunk-vendors',
            chunks: 'all',
            priority: 1,
            reuseExistingChunk: true,
            enforce: true
          },
          // 提取公共库
          // common: {
          //   name: 'chunk-common',
          //   minChunks: 2,
          //   priority: 0,
          //   chunks: 'initial',
          //   reuseExistingChunk: true
          // }
        }
      }
    },
    output: {
        // filename: 'bundle.js',
        filename: '[name].[contenthash].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },

    devServer: {
      contentBase: './dist'
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src/'),
        '@common': path.resolve(__dirname, 'src/common/'),
        '@components': path.resolve(__dirname, 'src/common/components/'),
        '@utils': path.resolve(__dirname, 'src/common/utils/'),
        '@pages': path.resolve(__dirname, 'src/pages/'),
      },
        // Add '.ts' and '.tsx' as resolvable extensions.
      extensions: ['.ts', '.tsx', '.js', '.json']
    },

    module: {
        rules: [
            {
              test: /\.tsx?$/,
              loader: 'ts-loader',
              exclude: /node_modules/
            },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' }
        ]
    },

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        // 'react': 'React',
        // 'react-dom': 'ReactDOM'
    }
  }
};
