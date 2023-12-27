module.exports = {
  filenameHashing: false,
  transpileDependencies: [
    'vuetify'
  ],
  publicPath: process.env.NODE_ENV === 'production' ? 'https://pixelit.hstar.top/' : '/'
}