const http = require('http');
const url = require('url');

const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

// list of all handled URLs by method
const urlStruct = {
  'GET': {
    '/': htmlHandler.getIndex,
    '/getUsers': htmlHandler.getIndex,
    '/notReal': htmlHandler.getIndex,
    '/addUser': htmlHandler.getIndex,
    '/style.css': htmlHandler.getCSS,
    notFound: jsonHandler.notFound,
  },
  'HEAD': {
    '/getUsers': jsonHandler.getUsersMeta,
    notFound: jsonHandler.notFoundMeta,
  },
};

// get the url
const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  console.log(parsedUrl);

  // not found meta goes first

  // assuming the path exists
  urlStruct['GET'][parsedUrl.pathname](request, response);
};

http.createServer(onRequest).listen(port);
