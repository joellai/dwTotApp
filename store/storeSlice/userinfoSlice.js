import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isLogin: false,
  privk: undefined,
  pubk: undefined,
  ctrAdrs: undefined,
  token: undefined,
  collectionList: [],
  touchToEarnList: [],
};
const userInfoSlice = createSlice({
  name: "userinfo",
  initialState: initialState,
  reducers: {
    signup: (state, action) => {
      const resData = action.payload;
      for (let [key, val] of Object.entries(resData)) {
        state[key] = val;
      }
    },
    login: (state, action) => {
      const token = action.payload;
      state.token = token;
      state.isLogin = true;
    },
    updateTouchToEarnStatus: (state, action) => {
      const payload = action.payload;
      const model_id = payload.model_id;
      const status = payload.status;
      console.log(action);
      console.log(status);
      const target = state.touchToEarnList.find(
        (item) => item._id === model_id
      );
      console.log(target);
      if (!target) {
        state.touchToEarnList.push({ model_id, status: status });
      } else {
        target.status = status;
      }
    },
    getTouchToEarnStatus: (state, action) => {
      const model_id = action.model_id;
      const target = state.touchToEarnList.find(
        (item) => item._id === model_id
      );
      if (target) {
        return target.status;
      } else {
        return undefined;
      }
    },
    setLogin: (state, action) => {
      state.isLogin = action.payload;
    },
    clearInfo: (state) => {
      return ({ ...state } = { ...initialState });
    },
  },
});

export const actions = userInfoSlice.actions;
export default userInfoSlice.reducer;
