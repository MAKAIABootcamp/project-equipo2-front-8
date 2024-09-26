// tipsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../../Firebase/firebaseConfig";

// Crear un thunk para obtener los datos desde Firestore
export const fetchTips = createAsyncThunk("tips/fetchTips", async () => {
  const querySnapshot = await getDocs(collection(database, "tips"));
  return querySnapshot.docs.map(doc => doc.data());
});

const tipsSlice = createSlice({
    name: "tips",
    initialState: {
      tips: [],
      status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchTips.pending, (state) => {
          state.status = "loading";
        })
        .addCase(fetchTips.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.tips = action.payload; // Aquí se incluyen los datos con las imágenes
        })
        .addCase(fetchTips.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        });
    },
  });


const tipsReducer = tipsSlice.reducer;
export default tipsReducer;
