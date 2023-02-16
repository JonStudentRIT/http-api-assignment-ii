// object to hold users
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
const getUsers = (request, response) => respondJSON(request, response, 200, object);
// get list of users without the users
const getUsersMeta = (request, response) => respondJSONMeta(request, response, 200);
// update existing user
const updateUser = (request, response) => respondJSON(request, response, 201, object);
// page not found
const notFound = (request, response) => respondJSON(request, response, 404, object);
// page not found without a message
const notFoundMeta = (request, response) => respondJSONMeta(request, response, 404);

module.exports = {
  getUsers,
  getUsersMeta,
  updateUser,
  notFound,
  notFoundMeta,
};
