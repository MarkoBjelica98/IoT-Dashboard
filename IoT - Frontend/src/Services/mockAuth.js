/* const users = [];

export const register = (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const existingUser = users.find((u) => u.email === email);

      if (existingUser) {
        reject({ message: 'User already exists' });
        return;
      }

      users.push({ email, password });

      resolve({ message: 'Registered successfully' });
    }, 500);
  });
};

export const login = (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const foundUser = users.find(
        (u) => u.email === email && u.password === password,
      );

      if (!foundUser) {
        reject({ message: 'Invalid credentials' });
        return;
      }

      resolve({
        token: 'fake-jwt-token',
        email: foundUser.email,
      });
    }, 500);
  });
};
*/
