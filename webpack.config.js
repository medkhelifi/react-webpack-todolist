var path = require("path");
var webpack = require("webpack");

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: './index.html',
    filename: 'index.html',
    inject: 'body'
});

module.exports = {
    entry: {
        app: ["./src/main.jsx", './src/sass/main.scss']
    },
    output: {
        path: path.resolve(__dirname, "public"),
        publicPath: "/public/",
        filename: "bundle.js"
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            Popper: ['popper.js', 'default'],
        }),
        HtmlWebpackPluginConfig
    ],
    module: {
        rules: [{
            test: /\.scss$/,
            use: [{
                loader: "style-loader"
            }, {
                loader: "css-loader"
            }, {
                loader: "sass-loader",
            }
            ]
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                    }
                ]
            }],
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                include: /src/,
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    },

    node: {
        fs: 'empty'
    },

};