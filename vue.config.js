module.exports = {
  transpileDependencies: [
    'vuetify',
  ],
  configureWebpack: {
    devtool: process.env.NODE_ENV === 'development' ? 'source-map' : '',
  },
};
