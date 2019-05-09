module.exports = {
  devServer: {
    proxy: {
      '/api/url-insane': {
        ws: true,
        changeOrigin: true,
        target: 'http://127.0.0.1:8888',
        pathRewrite: {
          '^/api/url-insane': '',
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
