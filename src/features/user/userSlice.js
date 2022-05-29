import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as userAPI from 'services/userService';

export const registerUser = createAsyncThunk(
  'user/register',
  async ({ credentials, navigate, toast }, { rejectWithValue }) => {
    try {
      const { data } = await userAPI.register({ ...credentials });
      toast.success('User Registered Successfully');
      navigate('/users');
      return data.user;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchAllUsers = createAsyncThunk(
  'user/getAllUsers',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await userAPI.getAllUsers();
      return data.users;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchUsers = createAsyncThunk(
  'user/getUsers',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await userAPI.getUsers();
      return data.users;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const removeUser = createAsyncThunk(
  'user/deleteUser',
  async ({ userId, toast }, { rejectWithValue }) => {
    try {
      await userAPI.deleteUser(userId);
      toast.success('User Deleted Successfully');
      return;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const initialState = {
  users: [],
  loading: false,
  error: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.loading = true;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      state.loading = true;
      state.users.push(payload);
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.loading = true;
      state.error = payload.message;
    },
    [fetchAllUsers.pending]: (state) => {
      state.loading = true;
    },
    [fetchAllUsers.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.users = payload;
    },
    [fetchAllUsers.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload.message;
    },
    [fetchUsers.pending]: (state) => {
      state.loading = true;
    },
    [fetchUsers.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.users = payload;
    },
    [fetchUsers.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload.message;
    },
    [removeUser.pending]: (state) => {
      state.loading = true;
    },
    [removeUser.fulfilled]: (state, { meta }) => {
      state.loading = false;

      const {
        arg: { userId },
      } = meta;

      if (userId) {
        state.users.splice(
          state.users.findIndex((item) => item._id === userId),
          1
        );
      }
    },
    [removeUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload.message;
    },
  },
});

export default userSlice.reducer;
