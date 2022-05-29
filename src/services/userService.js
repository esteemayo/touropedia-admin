import http from './httpService';

const apiEndpoint = 'users';

export const getAllUsers = () => http.get(apiEndpoint);

export const getUsers = () => http.get(`${apiEndpoint}?new=true`);

export const getUsersStats = () => http.get(`${apiEndpoint}/stats`);

export const register = (credentials) =>
  http.post(`${apiEndpoint}/signup`, credentials);

export const deleteUser = (userId) => http.delete(`${apiEndpoint}/${userId}`);
