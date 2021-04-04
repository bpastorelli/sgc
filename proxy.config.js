const proxy = [
  {
    context: '/api',
    target: 'https://powerful-savannah-73743.herokuapp.com',
    pathRewrite: {'^/api': ''}
  }
];

module.exports = proxy;
