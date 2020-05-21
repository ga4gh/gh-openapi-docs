const path = require('path');
const webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');

module.exports = {
    target: "node",
    output: {
        devtoolModuleFilenameTemplate: '[absolute-resource-path]',
        devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]'
    },
    resolve: {
        alias: {
            '@lib': path.resolve(__dirname, 'src/lib')
        },
        modules: [
            'node_modules'
        ]
    },
    module: {
        rules: [
            {
                test: /\.(js)/,
                include: path.resolve('src'),
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'istanbul-instrumenter-loader',
                        query: {
                            esModules: true
                        }
                    },
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env'
                            ],
                            plugins: [
                                '@babel/plugin-syntax-dynamic-import',
                                '@babel/plugin-transform-regenerator'
                            ]
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                MOCHA_TEST: JSON.stringify(true)
            }
        })
    ],
    externals: [nodeExternals()],
    devtool: "inline-cheap-module-source-map"
}