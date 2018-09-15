const {resolve} = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    context: resolve(__dirname, 'src'),
    entry: [
        './main.jsx'
        // the entry point of our app
    ],
    output: {
        path:resolve(__dirname, "public"),
        publicPath: "/public/",
        filename: "bundle.js"
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: ['babel-loader',],
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
                        use: [
                            {
                                loader: "css-loader" // translates CSS into CommonJS
                            },
                            {
                                loader: "sass-loader" // compiles Sass to CSS
                            }
                        ],
                        fallback: "style-loader" // used when css not extracted
                    }
                ))
            },
            {
                test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
                use: 'url-loader'
            },
            {
                test: /\.css$/,
                loaders: ["style-loader","css-loader"]
            }
        ]
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        // prints more readable module names in the browser console on HMR updates
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            Popper: ['popper.js', 'default'],
        }),
        new ExtractTextPlugin({filename: 'bundle.css', allChunks: true})
    ],
};
