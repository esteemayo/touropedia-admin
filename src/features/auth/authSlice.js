import jwtDecode from 'jwt-decode';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { login } from 'services/authService';

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ credentials, navigate, toast }, { rejectWithValue }) => {
    try {
      const { data } = await login({ ...credentials });
      toast.success('Login Successfully');
      data.user.role === 'admin' && navigate('/');
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const initialState = {
  user: null,
  loading: false,
  error: '',
};

const tokenKey = 'accessToken';
const token = localStorage.getItem(tokenKey);

if (token) {
  const decodedToken = jwtDecode(token);
  const expiredToken = decodedToken.exp * 1000;

  if (expiredToken < new Date().getTime()) {
    localStorage.clear();
  } else {
    initialState.user = decodedToken;
  }
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLogout: (state) => {
      localStorage.clear();
      state.user = null;
    },
  },
  extraReducers: {
    [loginUser.pending]: (state) => {
      state.loading = true;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      payload.user.role === 'admin' &&
        localStorage.setItem(tokenKey, payload.token);
      state.user = payload.user.role === 'admin' && payload;
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload.message;
    },
  },
});

export const { setLogout } = authSlice.actions;

export default authSlice.reducer;
