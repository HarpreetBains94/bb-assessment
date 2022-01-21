module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  rules: [
    {
     test: /\.svg$/,
     loader: 'vue-svg-loader', // `vue-svg` for webpack 1.x
    },
  ],
}
