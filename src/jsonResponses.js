// object to hold users
const users = {
  users: {
    // Jon: {
    //   name: 'Jon',
    //   age: 123,
    // },
  },
};

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
const getUsers = (request, response) => respondJSON(request, response, 200, users);
// get list of users without the users
const getUsersMeta = (request, response) => respondJSONMeta(request, response, 200);
// update existing user
const updateUser = (request, response, params) => {
  // test changes
  // users.users.Jon.name = 'Karcher';
  // users.users.Jon.age = 321;
  // const newUser = {
  //     name: 'New User',
  //     age: 456,
  // }
  // users.users['New User'] = newUser;
  let responseJSON = {};
  if (!params.name || !params.age) {
    responseJSON = {
      message: 'Name and age are both required.',
      id: 'addUserMissingParams',
    };
    return respondJSON(request, response, 400, responseJSON);
  }
  //   if (users.users[params.name]) {
  //     users.users[params.name].name = params.name;
  //     users.users[params.name].age = params.age;
  //   }

  const newUser = {
    name: params.name,
    age: params.age,
  };
  users.users[params.name] = newUser;
  responseJSON = users;

  return respondJSON(request, response, 201, responseJSON);
};
// page not found
const notFound = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };
  respondJSON(request, response, 404, responseJSON);
};
// page not found without a message
const notFoundMeta = (request, response) => {
  respondJSONMeta(request, response, 404);
};

module.exports = {
  getUsers,
  getUsersMeta,
  updateUser,
  notFound,
  notFoundMeta,
};
