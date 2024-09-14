
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../Firebase/firebaseConfig";

export const createAccountThunk = createAsyncThunk(
  "auth/createAccount",
  async ({ email, password, name, photo }) => {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
    return {
      id: userCredentials.user.uid,
      displayName: name,
      email: email,
      accessToken: userCredentials.user.accessToken,
      photoURL: photo,
    };
  }
);

export const loginWithEmailAndPassworThunk = createAsyncThunk(
  "auth/login",
  async ({ email, password }) => {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return {
      id: user.uid,
      displayName: user.displayName,
      email: email,
      accessToken: user.accessToken,
      photoURL: user.photoURL,
    };
  }
);

export const logoutThunk = createAsyncThunk("auth/logout", async () => {
  await signOut(auth);
  return null;
});

export const googleLoginThunk = createAsyncThunk(
  "auth/googleLogin",
  async () => {
    const googleProvider = new GoogleAuthProvider();
    const { user } = await signInWithPopup(auth, googleProvider);
    return {
      id: user.uid,
      displayName: user.displayName,
      accessToken: user.accessToken,
      photoURL: user.photoURL,
      email: user.email,
    };
  }
);

export const loginWithVerificationCodeThunk = createAsyncThunk(
  "auth/loginWithVerificationCode",
  async (code, { rejectWithValue }) => {
    try {
      const confirmationResult = window.confirmationResult;
      if (!confirmationResult) {
        throw new Error("No hay resultado de confirmación disponible");
      }
      const { user } = await confirmationResult.confirm(code);

      return {
        id: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
        phoneNumber: user.phoneNumber,
        accessToken: user.accessToken,
      };
    } catch (error) {
      return rejectWithValue(error.message || "Error en la verificación");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAccountThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAccountThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(createAccountThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(loginWithEmailAndPassworThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginWithEmailAndPassworThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginWithEmailAndPassworThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(logoutThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(logoutThunk.rejected, (state, action) => {
        (state.loading = false), (state.error = action.error.message);
      })
      .addCase(googleLoginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(googleLoginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(googleLoginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      }).addCase(loginWithVerificationCodeThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      }).addCase(loginWithVerificationCodeThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
      }).addCase(loginWithVerificationCodeThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

const authReducer = authSlice.reducer;
export default authReducer;

export const { clearError } = authSlice.actions;
