const query = require('querystring');

// where users are stored
const users = {};

// general json response get function
const respondJSON = (request, response, status, object) => {
  const headers = { 'Content-Type': 'application/json' };
  response.writeHead(status, headers);
  response.write(JSON.stringify(object));
  response.end();
};

// general json response head function
const respondJSONMeta = (request, response, status) => {
  const headers = { 'Content-Type': 'application/json' };
  response.writeHead(status, headers);
  response.end();
};

// get list of users
const getUsers = (request, response) => {
  const responseJSON = { message: users };
  return respondJSON(request, response, 200, responseJSON);
};

// get list of users without the users
const getUsersMeta = (request, response) => {
  respondJSON(request, response, 200);
};

// create or update existing user
const updateUser = (request, response) => {
  let body = [];

  request.on('data', (chunk) => {
    body.push(chunk);
  });

  request.on('end', () => {
    const bodyString = Buffer.concat(body).toString();
    body = query.parse(bodyString);

    const responseJSON = {};

    // start with a fail code
    let responseCode = 400;

    // if there are missing params
    if (!body.name || !body.age) {
      responseJSON.message = 'Name and age are both required.';
      responseJSON.id = 'addUserMissingParams';
      return respondJSON(request, response, responseCode, responseJSON);
    }

    // if the user already exists
    if (users[body.name]) {
      responseCode = 204;
    } else {
      responseCode = 201;
      users[body.name] = {};
    }

    // overwright the curent values stored
    users[body.name].name = body.name;
    users[body.name].age = body.age;

    if (responseCode === 201) {
      responseJSON.message = 'Created Successfully';
      return respondJSON(request, response, responseCode, responseJSON);
    }

    // if we havent gotten any data to update then just confirm the head update action
    return respondJSONMeta(request, response, responseCode);
  });
};

// testing if the element can handle being not found
const notReal = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notReal',
  };

  return respondJSON(request, response, 404, responseJSON);
};

// if the page really wasnt found
const notFound = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };
  respondJSON(request, response, 404, responseJSON);
};

// if the not found page is tested by the head selection
const notFoundMeta = (request, response) => {
  respondJSONMeta(request, response, 404);
};

module.exports = {
  getUsers,
  getUsersMeta,
  updateUser,
  notFound,
  notReal,
  notFoundMeta,
};
