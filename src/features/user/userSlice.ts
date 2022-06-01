import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import IUser from '../../db/types/user.type';
import UserServices from '../../db/services/user.services';
// Type actions
import { LoginPayload, UserState } from './types-action';
// Initital state
const initialState: UserState = {
  value: null,
  status: 'idle',
};
// Async function with database
// Return tenDangNhap, matKhau

// Xử lý bất đồng bộ thì
export const LoginAsync = createAsyncThunk(
  'user/login',
  async (info: LoginPayload) => {
    const data = await UserServices.login(info.tenDangNhap, info.matKhau);
    return data;
  },
);

// Define name for reducer, initital state value,
export const userSlice = createSlice({
  // name ở đây được hiểu là tên của reducer để đặt trong store
  name: 'user',
  // state lưu trữ dữ liệu
  initialState,

  // actions: CRUD dữ liệu đã có trong reducer
  reducers: {
    updateUser: (state, action: PayloadAction<IUser>) => {
      state.value = action.payload;
    },
  },

  // Handle async action
  extraReducers: builder => {
    builder
      .addCase(LoginAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(LoginAsync.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = 'idle';
        if (action.payload) {
          state.value = action.payload;
        } else {
          state.status = 'failed';
          state.value = null;
        }
      })
      .addCase(LoginAsync.rejected, state => {
        state.status = 'failed';
      });
  },
});

export const { updateUser } = userSlice.actions;
// Lấy dữ liệu từ state
export const selectUser = (state: RootState) => state.user.value;
export const selectUserStatus = (state: RootState) => state.user.status;

export default userSlice.reducer;
