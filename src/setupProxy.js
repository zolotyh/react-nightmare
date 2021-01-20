const { createProxyMiddleware } = require('http-proxy-middleware');

const variables = JSON.stringify(process.env);

module.exports = function init(app) {
  app.use('/api/login', (_req, res, next) => {
    res.cookie('JSESSIONID', '1', { httpOnly: true });
    res.send('{}');
    next();
  });

  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:4010',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    })
  );
};
