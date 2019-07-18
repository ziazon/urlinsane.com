module.exports = {
  devServer: {
    proxy: {
      '/api/typo': {
        changeOrigin: true,
        target: process.env.API_PROXY || 'http://api.urlinsane.com',
        pathRewrite: {
          '^/api/typo': '',
        },
      },
    },
  },
  css: {
    loaderOptions: {
      less: {
        modifyVars: {},
        javascriptEnabled: true,
      },
    },
  },
};
