import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fake API call
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const res = await fetch("http://localhost:3000/posts"); // API từ db.json
  const data = await res.json();
  return data;
});

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    items: [],
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default postsSlice.reducer;
