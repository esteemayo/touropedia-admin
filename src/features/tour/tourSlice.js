import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as tourAPI from 'services/tourService';

export const fetchTours = createAsyncThunk(
  'tour/getTours',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await tourAPI.getTours();
      return data.tours;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchTour = createAsyncThunk(
  'tour/getTour',
  async (tourId, { rejectWithValue }) => {
    try {
      const { data } = await tourAPI.getTour(tourId);
      return data.tour;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const createNewTour = createAsyncThunk(
  'tour/createTour',
  async ({ tour, navigate, toast }, { rejectWithValue }) => {
    try {
      const { data } = await tourAPI.createTour({ ...tour });
      toast.success('Tour Created Successfully');
      navigate('/tours');
      return data.tour;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updTour = createAsyncThunk(
  'tour/updateTour',
  async ({ tourId, tour, navigate, toast }, { rejectWithValue }) => {
    try {
      const { data } = await tourAPI.updateTour(tourId, tour);
      toast.success('Tour Updated Successfully');
      navigate('/tours');
      return data.tour;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const removeTour = createAsyncThunk(
  'tour/deleteTour',
  async ({ tourId, toast }, { rejectWithValue }) => {
    try {
      await tourAPI.deleteTour(tourId);
      toast.success('Tour Deleted Successfully');
      return;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const initialState = {
  tours: [],
  tour: {},
  loading: false,
  error: '',
};

const tourSlice = createSlice({
  name: 'tour',
  initialState,
  extraReducers: {
    [fetchTours.pending]: (state) => {
      state.loading = true;
    },
    [fetchTours.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.tours = payload;
    },
    [fetchTours.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload.message;
    },
    [fetchTour.pending]: (state) => {
      state.loading = true;
    },
    [fetchTour.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.tour = payload;
    },
    [fetchTour.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload.message;
    },
    [createNewTour.pending]: (state) => {
      state.loading = true;
    },
    [createNewTour.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.tours.push(payload);
    },
    [createNewTour.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload.message;
    },
    [updTour.pending]: (state) => {
      state.loading = true;
    },
    [updTour.fulfilled]: (state, { meta, payload }) => {
      state.loading = false;

      const {
        arg: { tourId },
      } = meta;

      if (tourId) {
        state.tours = state.tours.map((item) =>
          item._id === tourId ? payload : item
        );
      }
    },
    [updTour.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload.message;
    },
    [removeTour.pending]: (state) => {
      state.loading = true;
    },
    [removeTour.fulfilled]: (state, { meta }) => {
      state.loading = false;

      const {
        arg: { tourId },
      } = meta;

      if (tourId) {
        state.tours.splice(
          state.tours.findIndex((item) => item._id === tourId),
          1
        );
      }
    },
    [removeTour.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload.message;
    },
  },
});

export default tourSlice.reducer;
