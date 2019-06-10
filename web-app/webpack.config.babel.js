import path from 'path';
import webpack from 'webpack';
import { TsConfigPathsPlugin } from 'awesome-typescript-loader';

module.exports = {
    mode: 'development',
    entry: './src/server.ts',
    devtool: 'source-map',
    target: 'node',

    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },

    plugins: [
        new webpack.ProgressPlugin(),
    ],

    module: {
        rules: [
            {
                test: /.(ts|tsx)?$/,
                loader: 'awesome-typescript-loader',
                exclude: /node_modules\/(?!(inversify-shared)\/).*/,
            },
        ],
    },

    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    priority: -10,
                    test: /[\\/]node_modules[\\/]/,
                },
            },

            chunks: 'async',
            minChunks: 1,
            minSize: 30000,
            name: true,
        },
    },

    resolve: {
        plugins: [
            new TsConfigPathsPlugin({
                configFileName: 'tsconfig.json',
                useBabel: true,
                babelCore: '@babel/core',
            }),
        ],
        extensions: [
            '.tsx',
            '.ts',
            '.js',
        ],
    },
};
