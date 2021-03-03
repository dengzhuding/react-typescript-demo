const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
      index: "./src/index.tsx",
      hello: "./src/hello.tsx"
    },
    plugins: [
      new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
      new HtmlWebpackPlugin({
        title: "development html",
        template: path.join(__dirname, "public/index.html")
      })
    ],
    optimization: {
      splitChunks: {
        chunk: 'all'
      }
    },
    output: {
        // filename: "bundle.js",
        filename: "[name].[contenthash].bundle.js",
        path: path.resolve(__dirname, "dist"),
        publicPath: '/'
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "inline-source-map",

    devServer: {
      contentBase: './dist'
    },
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            {
              test: /\.tsx?$/,
              loader: "ts-loader",
              exclude: /node_modules/
            },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    },

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        // "react": "React",
        // "react-dom": "ReactDOM"
    }
};
