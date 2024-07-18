// ["AuthenticationSlice", "Store"]    


// IMPORTANT: The store key for this slice is guaranteed to be authenticationState. You should use this when accessing state related to this slice e.g. state.authenticationState.

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails
} from "amazon-cognito-identity-js";

const userPool = new CognitoUserPool({
  UserPoolId: import.meta.env.VITE_AWSCognitoUserPoolId,
  ClientId: import.meta.env.VITE_AWSCognitoUserPoolClientId,
});

// Async thunk for user login
// inputs: username: string, password: string
export const loginUser = createAsyncThunk(
  "authentication/loginUser",
  async ({ username, password }, { rejectWithValue }) => {
    if (typeof username !== 'string' || username.trim() === '') {
      return rejectWithValue("Invalid username");
    }
    if (typeof password !== 'string' || password.trim() === '') {
      return rejectWithValue("Invalid password");
    }
    return new Promise((resolve, reject) => {
      const authenticationDetails = new AuthenticationDetails({
        Username: username,
        Password: password,
      });

      const cognitoUser = new CognitoUser({
        Username: username,
        Pool: userPool,
      });

      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          resolve({
            username,
            token: result.getIdToken().getJwtToken(),
          });
        },
        onFailure: (err) => {
          reject(rejectWithValue(err.message || "Login failed"));
        },
      });
    });
  }
);

// Async thunk for user logout
// inputs: none
export const logoutUser = createAsyncThunk(
  "authentication/logoutUser",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { username } = getState().authenticationState;
      const cognitoUser = userPool.getCurrentUser();
      if (cognitoUser) {
        cognitoUser.signOut();
      }
      return username;
    } catch (error) {
      return rejectWithValue(error.message || "Logout failed");
    }
  }
);

// Async thunk for checking session
// inputs: none
export const checkSession = createAsyncThunk(
  "authentication/checkSession",
  async (_, { rejectWithValue }) => {
    return new Promise((resolve, reject) => {
      const cognitoUser = userPool.getCurrentUser();
      if (cognitoUser) {
        cognitoUser.getSession((err, session) => {
          if (err) {
            reject(rejectWithValue(err.message || "Session check failed"));
          } else if (session.isValid()) {
            resolve({
              username: cognitoUser.getUsername(),
              token: session.getIdToken().getJwtToken(),
            });
          } else {
            reject(rejectWithValue("Session is invalid"));
          }
        });
      } else {
        reject(rejectWithValue("No current user"));
      }
    });
  }
);

// Async thunk for initializing authentication
// inputs: none
export const initializeAuthentication = createAsyncThunk(
  "authentication/initializeAuthentication",
  async (_, { dispatch }) => {
    return dispatch(checkSession());
  }
);

const initialState = {
  isAuthenticated: false,
  username: null,
  token: null,
  error: null,
};

const authenticationSlice = createSlice({
  name: "authenticationState",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.username = action.payload.username;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.username = null;
        state.token = null;
        state.error = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.username = null;
        state.token = null;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(checkSession.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.username = action.payload.username;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(checkSession.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.username = null;
        state.token = null;
        state.error = action.payload;
      })
      .addCase(initializeAuthentication.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.username = action.payload.username;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(initializeAuthentication.rejected, (state) => {
        state.isAuthenticated = false;
        state.username = null;
        state.token = null;
        state.error = null;
      });
  },
});

export const authenticationReducer = authenticationSlice.reducer;