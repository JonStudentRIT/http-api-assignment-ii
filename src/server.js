const http = require('http');
const url = require('url');
//const query = require('querystring');

const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const onRequest = (request, response) => {
  //htmlHandler.getIndex(request, response);
  htmlHandler.loadhtml(request, response, 'client/client.html', 'text/html');
};

http.createServer(onRequest).listen(port);