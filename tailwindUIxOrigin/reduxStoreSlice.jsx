// THE FOLLOWING IS AN EXAMPLE REDUX STORE SLICE WITH ASYNC THUNKS
// IT COVERS A TASKS SLICE WHICH IS FETCHING AND POSTING TASKS TO AN API USING AXIOS

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Only required if the slice is responsible for managing the state of authentication for the app
// import {
//   CognitoUserPool,
//   CognitoUser,
//   AuthenticationDetails
// } from "amazon-cognito-identity-js";

// IMPORTANT: The store key for this slice is the same as the name: [CHANGE for name property of slice e.g. tasksState in this example]. You should use this when accessing state related to this slice.
// IMPORTANT: For example to access the tasks array from a component you would use useSelector(state => state.[CHANGE for name property of slice e.g. tasksState in this example].tasks ensuring you get the case correct as redux slices are case sensitive)

// Example API endpoing using the VITE import.meta approach
const API_URL = import.meta.env.VITE_TaskAPIUrl;

// Async thunk for fetching tasks from the API using Axios
// inputs are: none (add inputs and their types here as a comment)
// make sure you add a comment for each required input to the async function and its type
export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      // Handle error more precisely to get a meaningful message
      const errorMessage = error.response?.data?.message || error.message;
      return rejectWithValue(errorMessage);
    }
  }
);

function validateTask(task) {
  // check each property of the task object, ensuring it is present and of the right type
  if (!task.title || typeof task.title !== "string") {
    return "Task title must be a string";
  }
  if (!task.description || typeof task.description !== "string") {
    return "Task description must be a string";
  }
}

// Async thunk for posting a new task to the API using Axios
// input parameter types must be included as a comment for thunks that require inputs
// e.g. newTask: { title: string, description: string }
export const postTask = createAsyncThunk(
  "tasks/postTask",
  async (newTask, { rejectWithValue }) => {
    try {
      // validate the task before posting
      const validationError = validateTask(newTask);
      if (validationError) {
        return rejectWithValue(validationError);
      }

      const response = await axios.post(API_URL, newTask, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      return rejectWithValue(errorMessage);
    }
  }
);

// Example Async thunk for toggling visibility of a modal
// All state changes are done using async thunks, including simply state propertie like this
// inputs are: none
export const toggleModalVisibility = createAsyncThunk(
  "modal/toggleModalVisibility",
  async (_, { getState }) => {
    const { modalVisibility } = getState().modalState;
    return !modalVisibility;
  }
);

const initialState = {
  tasks: [],
  loading: false,
  error: null,
};

const tasksSlice = createSlice({
  name: "tasksState",
  initialState,
  reducers: {},
  // use extraReducers to handle the async thunk states, modifying the state directly in the addCase
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(postTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.push(action.payload);
      })
      .addCase(postTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(toggleModalVisibility.fulfilled, (state, action) => {
        state.modalVisibility = action.payload;
      });
  },
});

// slices never expose selectors, the state is instead accessed directly

// Export the reducer to be used in the store
export const tasksReducer = tasksSlice.reducer;

// IMPORTANT: Never export thunks here
