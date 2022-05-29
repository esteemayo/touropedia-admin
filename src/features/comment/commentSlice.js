import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { deleteComment, getComments } from 'services/commentService';

export const fetchComments = createAsyncThunk(
  'comment/getComments',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await getComments();
      return data.comments;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const removeComment = createAsyncThunk(
  'comment/deleteComment',
  async ({ commentId, toast }, { rejectWithValue }) => {
    try {
      await deleteComment(commentId);
      toast.success('Comment Deleted Successfully');
      return;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const initialState = {
  comments: [],
  loading: false,
  error: '',
};

const commentSlice = createSlice({
  name: 'comment',
  initialState,
  extraReducers: {
    [fetchComments.pending]: (state) => {
      state.loading = true;
    },
    [fetchComments.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.comments = payload;
    },
    [fetchComments.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload.message;
    },
    [removeComment.pending]: (state) => {
      state.loading = true;
    },
    [removeComment.fulfilled]: (state, { meta }) => {
      state.loading = false;

      const {
        arg: { commentId },
      } = meta;

      if (commentId) {
        state.comments.splice(
          state.comments.findIndex((item) => item._id === commentId),
          1
        );
      }
    },
    [removeComment.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload.message;
    },
  },
});

export default commentSlice.reducer;
