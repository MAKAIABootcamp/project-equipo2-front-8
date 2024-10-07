import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../../Firebase/firebaseConfig";


export const fetchTemplates = createAsyncThunk("templates/fetchTemplates", async () => {
    const querySnapshot = await getDocs(collection(database, "Plantillas"));
    return querySnapshot.docs.map((doc) => doc.data());
  });

const templatesSlice = createSlice({
  name: "templates",
  initialState: {
    templates: [],
    status: "idle", 
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTemplates.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTemplates.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.templates = action.payload;
      })
      .addCase(fetchTemplates.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

const templatesReducer = templatesSlice.reducer;
export default templatesReducer;