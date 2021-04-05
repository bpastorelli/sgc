const proxy = [
  {
    context: '/api',
    target: 'http://viacep.com.br/ws',
    secure: true,
    changeOrigin: true,
    pathRewrite: {'^/api': ''}
  }
];

module.exports = proxy;
