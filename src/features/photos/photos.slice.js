import { createSlice } from "@reduxjs/toolkit";
import { selectSearchTerm } from "../search/search.slice";
import photos from "./photos.data.js";
import { DOG_DELETE_AMOUNT } from "../../config/config.js";

const initialState = {
  photos,
};

const options = {
  name: "photos",
  initialState,
  reducers: {
    // Task 1: Create an `addPhoto()` case reducer that adds a photo to state.photos.
    addPhoto: (state, action) => {
      state.photos.unshift(action.payload);
    },
    // Task 6: Create an `removePhoto()` case reducer that removes a photo from state.photos
    removePhoto: (state, action) => {
      state.photos.splice(
        state.photos.findIndex((photo) => photo.id === action.payload),
        DOG_DELETE_AMOUNT
      );
    },
  },
};

const photosSlice = createSlice(options);

export const { addPhoto, removePhoto } = photosSlice.actions;

export default photosSlice.reducer;

export const selectAllPhotos = (state) => state.photos.photos;

export const selectFilteredPhotos = (state) => {
  const filteredPhotos = state.photos.photos.filter((photo) => {
    const photoCaption = photo.caption;
    const currentSearchTerm = selectSearchTerm(state);

    return photoCaption.includes(currentSearchTerm);
  });

  return filteredPhotos;
  // Task 12: Complete `selectFilteredPhotos()` selector to return a filtered list of photos whose captions match the user's search term
};
