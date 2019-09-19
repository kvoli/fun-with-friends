export default function authenticate(username, password) {
  if (username === 'johnsmith' && password === 'originality') {
    return {
      user: {
        firstname: 'John',
        lastname: 'Smith',
        email: 'johnsmith@funwithfriends.net',
        username: 'johnsmith',
      },
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    };
  }
  return {
    error: 'Incorrect username or password.',
  };
}
