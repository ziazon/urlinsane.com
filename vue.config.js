module.exports = {
  devServer: {
    proxy: {
      '/api/typo': {
        changeOrigin: true,
        target: 'http://localhost:8888',
        pathRewrite: {
          '^/api/typo': '',
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
