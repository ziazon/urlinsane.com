module.exports = {
  devServer: {
    proxy: {
      '/api/urlinsane': {
        ws: true,
        changeOrigin: true,
        target: 'http://127.0.0.1:8888',
        pathRewrite: {
          '^/api/urlinsane': '',
        },
      },
    },
  },
  css: {
    loaderOptions: {
      sass: {
        // eslint-disable-next-line quotes
        data: `@import "@/scss/_variables.scss";`,
      },
    },
  },
};
