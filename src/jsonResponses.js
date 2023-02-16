const users = {};

const respondJSON = (request, response, status, object) => {
  const headers = { 'Content-Type': 'application/json' };
  response.writeHead(status, headers);
  response.write(JSON.stringify(object));
  response.end();
};

const getUsers = (request, response) => {return respondJSON(request, response, 200, users);};
const updateUser = (request, response) => {return respondJSON(request, response, 201, newUser);};
const notFound = (request, response) => {return respondJSON(request, response, 404, responseJSON);};

module.exports = {
  getUsers,
  updateUser,
  notFound,
};
