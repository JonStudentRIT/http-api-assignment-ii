const http = require('http');
const url = require('url');

const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

// list of all handled URLs by method
const urlStruct = {
  POST: {
    '/addUser': jsonHandler.updateUser,
  },
  GET: {
    '/': htmlHandler.getIndex,
    '/getUsers': jsonHandler.getUsers,
    '/notReal': jsonHandler.notReal,
    '/style.css': htmlHandler.getCSS,
    notFound: jsonHandler.notFound,
  },
  HEAD: {
    '/getUsers': jsonHandler.getUsersMeta,
    notFound: jsonHandler.notFoundMeta,
  },
};

// get the url
const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);

  // if the method isnt handled
  if (!urlStruct[request.method]) {
    urlStruct.HEAD.notFound(request, response);
  }

  // if the url and method are handled
  if (urlStruct[request.method][parsedUrl.pathname]) {
    urlStruct[request.method][parsedUrl.pathname](request, response);
  } else {
    urlStruct[request.method].notFound(request, response);
  }
};

http.createServer(onRequest).listen(port);
