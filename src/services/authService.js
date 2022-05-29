import http from './httpService';

const apiEndpoint = 'auth';
const tokenKey = 'accessToken';

export const login = (credentials) =>
  http.post(`${apiEndpoint}/signin`, credentials);

export const getJwt = () => localStorage.getItem(tokenKey);
