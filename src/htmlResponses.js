// const fs = require('fs');
// const { request } = require('http');

// const index = fs.readFileSync(`${__dirname}/../client/client.html`);
// const css = fs.readFileSync(`${__dirname}/../client/style.css`);

// const wrightResponse = (response, fileType, type) => {
//   response.writeHead(200, { 'Content-Type': type });
//   response.write(fileType);
//   response.end();
// };

// // get the home page
// const getIndex = (request, response) => {
//   wrightResponse(response, index, 'text/html');
// };

// // get the css
// const getCSS = (request, response) => {
//   wrightResponse(response, css, 'text/css');
// };

// module.exports = {
//   getIndex,
//   getCSS
// };

const fs = require('fs');
//const { request } = require('http');

const loadhtml = (request, response, path, type) => {
  response.writeHead(200, { 'Content-Type': type });
  response.write(fs.readFileSync(`${__dirname}/../${path}`));
  response.end();
}

module.exports = {
  loadhtml,
};
