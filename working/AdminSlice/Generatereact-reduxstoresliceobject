// ["AdminSlice", "Store"]    
// IMPORTANT: The store key for this slice is guaranteed to be adminState. You should use this when accessing state related to this slice e.g. state.adminState.

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CognitoUserPool, CognitoUser } from "amazon-cognito-identity-js";
import axios from "axios";

const userPool = new CognitoUserPool({
  UserPoolId: import.meta.env.VITE_AWSCognitoUserPoolId,
  ClientId: import.meta.env.VITE_AWSCognitoUserPoolClientId,
});

// Async thunk for fetching users
// inputs: none
export const fetchUsers = createAsyncThunk(
  "admin/fetchUsers",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().authenticationState;
      const response = await axios.get("/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for creating a new user
// inputs: NewUser object { username: string, password: string, email: string, role: string }
export const createUser = createAsyncThunk(
  "admin/createUser",
  async (newUser, { getState, rejectWithValue }) => {
    if (typeof newUser.username !== 'string' || newUser.username.trim() === '') {
      return rejectWithValue("Invalid username");
    }
    if (typeof newUser.password !== 'string' || newUser.password.trim() === '') {
      return rejectWithValue("Invalid password");
    }
    if (typeof newUser.email !== 'string' || newUser.email.trim() === '') {
      return rejectWithValue("Invalid email");
    }
    if (typeof newUser.role !== 'string' || newUser.role.trim() === '') {
      return rejectWithValue("Invalid role");
    }
    try {
      const { token } = getState().authenticationState;
      const response = await axios.post("/users", newUser, {
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for updating a user
// inputs: UpdateUser object { userId: string, updates: { password?: string, email?: string, role?: string } }
export const updateUser = createAsyncThunk(
  "admin/updateUser",
  async ({ userId, updates }, { getState, rejectWithValue }) => {
    if (typeof userId !== 'string' || userId.trim() === '') {
      return rejectWithValue("Invalid userId");
    }
    if (updates.password && (typeof updates.password !== 'string' || updates.password.trim() === '')) {
      return rejectWithValue("Invalid password");
    }
    if (updates.email && (typeof updates.email !== 'string' || updates.email.trim() === '')) {
      return rejectWithValue("Invalid email");
    }
    if (updates.role && (typeof updates.role !== 'string' || updates.role.trim() === '')) {
      return rejectWithValue("Invalid role");
    }
    try {
      const { token } = getState().authenticationState;
      const response = await axios.put(`/users/${userId}`, updates, {
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for deleting a user
// inputs: userId: string
export const deleteUser = createAsyncThunk(
  "admin/deleteUser",
  async (userId, { getState, rejectWithValue }) => {
    if (typeof userId !== 'string' || userId.trim() === '') {
      return rejectWithValue("Invalid userId");
    }
    try {
      const { token } = getState().authenticationState;
      await axios.delete(`/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return userId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for selecting a user
// inputs: user: User object
export const selectUser = createAsyncThunk(
  "admin/selectUser",
  async (user, { rejectWithValue }) => {
    if (!user || typeof user !== 'object') {
      return rejectWithValue("Invalid user object");
    }
    return user;
  }
);

const initialState = {
  users: [],
  selectedUser: null,
  error: null,
  isLoading: false
};

const adminSlice = createSlice({
  name: "adminState",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users.push(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.users.findIndex(user => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = state.users.filter(user => user.id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(selectUser.fulfilled, (state, action) => {
        state.selectedUser = action.payload;
      })
      .addCase(selectUser.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const adminReducer = adminSlice.reducer;