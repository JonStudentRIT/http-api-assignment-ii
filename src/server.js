const http = require('http');
const url = require('url');
// const query = require('querystring');

const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  '/': htmlHandler.getIndex,
  '/getUsers' : htmlHandler.getIndex,
  '/notReal' : htmlHandler.getIndex,
  '/addUser' : htmlHandler.getIndex,
  '/style.css': htmlHandler.getCSS,
  notFound: jsonHandler.notFound
};

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  console.log(parsedUrl);

  urlStruct[parsedUrl.pathname](request, response);

};

http.createServer(onRequest).listen(port);
