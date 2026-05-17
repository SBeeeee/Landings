import api from '../utils/api';

export interface RegisterInput {
  username: string;
  email: string;
  password: string;
}

export interface LoginInput {
  username: string;
  password: string;
}

export interface User {
  _id?: string;
  username: string;
  email: string;
  createdAt: string;
}

const authService = {
  register: async (data: RegisterInput): Promise<User> => {
    const res = await api.post('/users/register', data);
    return res.data.user;
  },

  login: async (data: LoginInput): Promise<User> => {
    const res = await api.post('/users/login', data);
    return res.data.user;
  },

  logout: async (): Promise<void> => {
    await api.post('/users/logout');
  },

  getMe: async (): Promise<User> => {
    const res = await api.get('/users/me');
    return res.data.user;
  },
};

export default authService;
