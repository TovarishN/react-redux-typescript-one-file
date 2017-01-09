var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        'bundle': './src/js/App.tsx'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: "/assets/",
        filename: '[name].js',
        // devtoolModuleFilenameTemplate: '[absolute-resource-path]',
        // devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]'
    },
    //target: 'node',
    // node: {
    //     __dirname: true,
    //     __filename: true,
    // },
    devtool: 'source-map',
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.css', '.html', 'png', 'jpg']
    },
    module: {
        loaders: [
            { test: /\.tsx?$/, loader: 'ts-loader' },
            { test: /\.css$/, loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: 'css-loader' }) }
        ]
    },
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },
    plugins: [
        new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"production"' }),
        //new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false }, except: ['exports', 'require'] }),
        new ExtractTextPlugin('css/[name].css')
    ],
};