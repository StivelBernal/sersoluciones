const devMode = process.env.NODE_ENV !== 'production';
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {

    // Modo que toma el webpack
    mode: devMode ? 'development' : 'production',

    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin({
                minify: CssMinimizerPlugin.cssoMinify,
            }),
            new TerserPlugin({
                extractComments: true,
            })
        ],
    },
    // Configura el archivo de lectura principal
    entry: './static/src/app.js',

    // Da la salida el path y el nombre del archivo final
    output: {
        path: __dirname + '/static/bundle',
        filename: devMode ? 'bundle.js' : 'bundle.min.js'
    },

    // Configurar dev-server para que escuche por un puerto especifico
    devServer: {
        port: 5004
    },

    // Para que renderice vue pero deje su interior normal
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js',   
        },
        extensions: ['*', '.js', '.vue', '.json']
    },

    // Para que renderice vue pero deje su interior normal
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
            },
        extensions: ['*', '.js', '.vue', '.json']
    },
      // Para usar sass
    module: {
        rules: [
            {
                test: /\.(gif|svg|jpg|png)$/,
                loader: "file-loader"
            },
            {
                //regla para vuetify
                test: /\.s(c|a)ss$/,
                use: [
                'vue-style-loader',
                'css-loader',
                {
                    loader: 'sass-loader',
                    // Requires sass-loader@^7.0.0
                    options: {
                    implementation: require('sass'),
                    fiber: require('fibers'),
                    indentedSyntax: true // optional
                    },
                    // Requires sass-loader@^8.0.0
                    options: {
                    implementation: require('sass'),
                    sassOptions: {
                        fiber: require('fibers'),
                        indentedSyntax: true // optional
                    }
                    },
                }]
            },
            {   
                // Regla para el scss
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ]
            },
            {
                // regla para vue
                test: /\.vue$/,
                use: 'vue-loader'
            }
        ]
    },


    plugins: [
        // Plugin para que se exporte por aparte el css
        new MiniCssExtractPlugin({
            filename: devMode ? 'bundle.css' : 'bundle.min.css'
        }),
        new VueLoaderPlugin()
    ],

}