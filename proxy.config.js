const proxy = [
  {
    context: '/api',
    target: 'http://localhost:8084',
    pathRewrite: {'^/api' : ''}
  }
];

module.exports = proxy;
