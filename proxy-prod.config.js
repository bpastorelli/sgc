const proxy = [
  {
    context: '/api',
    target: 'http://viacep.com.br/ws',
    secure: false,
    changeOrigin: true,
    pathRewrite: {'^/api': ''},
    loglevel: 'debug'
  },
];

module.exports = proxy;
