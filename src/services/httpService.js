import axios from 'axios';
import { toast } from 'react-toastify';

import logger from './logService';
import { getJwt } from './authService';

const API = axios.create({
  baseURL: 'http://localhost:5555/api/v1/',
  headers: {
    Accept: 'application/json',
  },
});

API.interceptors.request.use(
  (req) => {
    req.headers.common['Authorization'] = `Bearer ${getJwt()}`;
    return req;
  },
  (error) => {
    logger.log(error);
    toast.error(error.response);
    return Promise.reject(error);
  }
);

API.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response &&
    error.response.status < 500;

  if (!expectedError) {
    logger.log(error);
    toast.error('An unexpected error occurred');
  }

  return Promise.reject(error);
});

const http = {
  get: API.get,
  post: API.post,
  patch: API.patch,
  delete: API.delete,
};

export default http;
