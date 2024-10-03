import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../../Firebase/firebaseConfig";


export const fetchCarrusel = createAsyncThunk("carrusel/fetchCarrusel", async () => {
  const querySnapshot = await getDocs(collection(database, "CarruselHome"));
  return querySnapshot.docs.map((doc) => doc.data());
});

const carruselSlice = createSlice({
  name: "carrusel",
  initialState: {
    carrusel: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCarrusel.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCarrusel.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.carrusel = action.payload;
      })
      .addCase(fetchCarrusel.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

const carruselReducer = carruselSlice.reducer;
export default carruselReducer;
