import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../../Firebase/firebaseConfig";

export const fetchBeneficios = createAsyncThunk("beneficios/fetchBeneficios", async () => {
  const querySnapshot = await getDocs(collection(database, "BeneficiosHome"));
  return querySnapshot.docs.map((doc) => doc.data());
});

const beneficiosSlice = createSlice({
  name: "beneficios",
  initialState: {
    beneficios: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBeneficios.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBeneficios.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.beneficios = action.payload;
      })
      .addCase(fetchBeneficios.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

const beneficiosReducer = beneficiosSlice.reducer;
export default beneficiosReducer;
