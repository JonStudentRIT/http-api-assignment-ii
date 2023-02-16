const http = require('http');
const url = require('url');
const query = require('querystring');

const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

// list of all handled URLs by method
const urlStruct = {
  // 'GET': {
  '/': htmlHandler.getIndex,
  '/getUsers': jsonHandler.getUsers,
  '/notReal': htmlHandler.getIndex,
  '/addUser': jsonHandler.updateUser,
  '/style.css': htmlHandler.getCSS,
  notFound: jsonHandler.notFound,
  // },
  // 'HEAD': {
  //   '/getUsers': jsonHandler.getUsersMeta,
  //   notFound: jsonHandler.notFoundMeta,
  // },
};

// get the url
const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  const params = query.parse(parsedUrl.query);
  console.log(parsedUrl);

  // not found meta goes first

  // assuming the path exists
  if (urlStruct[parsedUrl.pathname]) {
    urlStruct[parsedUrl.pathname](request, response, params);
  } else {
    urlStruct.notFound(request, response);
  }
};

http.createServer(onRequest).listen(port);
