const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    // Главный файл
    entry: {
        polyfill: 'babel-polyfill',
        app: './js/main.js',
    },
    // Исходники - context:
    context: path.resolve(__dirname, 'src'),
    // Сервер разработки
    devServer: {
        publicPath: '/',
        port: 9000,
        contentBase: path.join(process.cwd(), 'dist'),
        host: 'localhost',
        historyApiFallback: true,
        noInfo: false,
        stats: 'minimal',
        hot: true,

    },


    module: {
        // Настройка трансформации файла
        // Для того, чтобы трансформировать файл, используются специальные утилиты - загрузчики (loaders).
        // Массив rules внутри объекта module определяет список правил для загрузчиков.
        rules: [
            {
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
                test: /\.js$/,
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',

                        options: {
                            importLoaders: 1,
                            sourceMap: true,
                        },
                    },
                ],
            },
            {
                test: /\.(jpg|png|svg)$/,
                loader: 'file-loader',

            },
            /** Шрифты */
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
        ],
    },
    // Вебпак плагины используются для настройки процесса сборки.
    // Например, плагин для минификации кода (во время сборки код подвергается очистке и минификации).
    // Или плагин для сборки html страницы и css кода (скрипты вставляются в html, куски css собираются в один файл).
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({filename: './assets/style.css'}),
        new HtmlWebpackPlugin({
            template: 'index.html',
            // title: "Hello!"
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/assets'),
                    to: path.resolve(__dirname, 'dist/assets')
                },
            ]
        })
    ],
    // Кроме entry, мы можем указать поле, куда (в какой файл) собирать конечный результат.
    // Это свойство задаётся с помощью поля output.
    // По умолчанию, весь результирующий код собирается в папку dist.
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[hash].js',
    },
    mode: 'development',
};
