const john = {
  firstname: 'John',
  lastname: 'Smith',
  username: 'johnsmith',
  email: 'john@smith.com',
  password: 'password',
};

const jacob = {
  firstname: 'Jacob',
  lastname: 'Parks',
  username: 'jacobparks',
  email: 'jacob@parks.com',
  password: 'flowers',
};

const noEmail = { 
  firstname: 'Bill',
  lastname: 'Waters',
  username: 'billwaters',
  password: 'monopoly',
};

const noUsername = {
  firstname: 'Bill',
  lastname: 'Waters',
  email: 'bill@waters.com',
  password: 'monopoly',
};

const noPassword = {
  firstname: 'Bill',
  lastname: 'Waters',
  username: 'billwaters',
  email: 'bill@waters.com',
};

const shortPassword = {
  firstname: 'Henry',
  lastname: 'IX',
  username: 'henryix',
  email: 'henry@ix.com',
  password: 'ix',
};

module.exports = {
  john, 
  jacob,
  noEmail, 
  noUsername,
  noPassword,
  shortPassword,
};