import { createSlice } from '@reduxjs/toolkit';

export const cameraSlice = createSlice({
  name: 'camera',
  initialState:{
    captureImage: null
  },
  reducers: {
    setCameraImage: (state,action) => {
      state.captureImage = action.payload;
    },
    resetCameraImage: (state) => {
      state.captureImage = null;
    },
  }
});

export const { setCameraImage, resetCameraImage } = cameraSlice.actions;

export const selectCaptureImage = (state) => state.camera.captureImage;

export default cameraSlice.reducer;
