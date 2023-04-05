import { createSlice } from '@reduxjs/toolkit';


export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {},
    token: null
  },
  reducers: {
    setUser: (state, {payload}) => {
      state.token = payload.access_token
      state.user = payload.account
    },
  },
  extraReducers: {},
});

export default userSlice.reducer;

export const { setUser } = userSlice.actions;
