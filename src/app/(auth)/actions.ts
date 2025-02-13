import axios from 'axios';

export type FormData = {
  username?: string;
  email?: string;
  password?: string;
};

export const register = async (formData: FormData) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify(formData);

  const res = await axios.post('/users/register', body, config);

  return res;
};

export const login = async (formData: FormData) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify(formData);

  const res = await axios.post('/users/login', body, config);

  return res;
};
