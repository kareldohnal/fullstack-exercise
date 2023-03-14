import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../config/store";
import axios from './../../config/axios';
import {AuthEntity} from "../../types/userTypes";

export interface UserState {
    status: 'idle' | 'loading' | 'failed',
    access_token: string | undefined,
    id: number | undefined,
    username: string | undefined,
    displayName: string | undefined,
    avatar: string | undefined,
}

const initialState: UserState = {
    status: "idle",
    access_token: undefined,
    id: undefined,
    username: undefined,
    displayName: undefined,
    avatar: undefined,
};

export const loginWithCredentials = createAsyncThunk(
    'user/loginWithCredentials',
    async (data: { "username": string, "password": string }, thunkAPI) => {
        const responseData = await axios.post(`/auth/login`, data)
            .then((response) => {
                return response.data
            })
            .catch((error) => {
                console.log("Response error:", error)
                return null
            })
        return responseData ? responseData : thunkAPI.rejectWithValue("loginWithCredentials")
    },
);

export const loginWithRefresh = createAsyncThunk(
    'user/loginWithRefresh',
    async (_, thunkAPI) => {
        const responseData = await axios.post(`/auth/refresh`)
            .then((response) => {
                return response.data
            })
            .catch((error) => {
                console.log("Response error:", error)
                return null
            })
        return responseData ? responseData : thunkAPI.rejectWithValue("loginWithRefresh")
    },
);

export const silentRefresh = createAsyncThunk(
    'user/silentRefresh',
    async (_, thunkAPI) => {
        const checkIfTokenValid = (token: string) => {
            const jwtPayload = JSON.parse(window.atob(token.split('.')[1]))
            return Date.now() < jwtPayload.exp * 1000;
        }

        const currentToken = (thunkAPI.getState() as RootState).user.access_token
        if (currentToken && checkIfTokenValid(currentToken)) {
            return currentToken
        } else {
            await thunkAPI.dispatch(loginWithRefresh())
            const newToken = (thunkAPI.getState() as RootState).user.access_token
            return newToken ? newToken : thunkAPI.rejectWithValue("silentRefresh")
        }
    },
);

export const logout = createAsyncThunk(
    'user/logout',
    async (_, thunkAPI) => {
        const logoutSuccess = await axios.post(`/auth/logout`)
            .then(() => {
                return true
            })
            .catch((error) => {
                console.log("Response error:", error)
                return null
            })
        return logoutSuccess ? logoutSuccess : thunkAPI.rejectWithValue("logout")
    },
);

export const userReducer = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginWithCredentials.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loginWithCredentials.fulfilled, (state, action: PayloadAction<AuthEntity>) => {
                state.status = "idle";
                state.id = action.payload.id;
                state.username = action.payload.username;
                state.displayName = action.payload.displayName;
                state.access_token = action.payload.access_token;
                state.avatar = action.payload.avatar ? action.payload.avatar : undefined;
            })
            .addCase(loginWithCredentials.rejected, (state) => {
                state.status = "failed";
            })
            .addCase(loginWithRefresh.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loginWithRefresh.fulfilled, (state, action: PayloadAction<AuthEntity>) => {
                state.status = "idle";
                state.id = action.payload.id;
                state.username = action.payload.username;
                state.displayName = action.payload.displayName;
                state.access_token = action.payload.access_token;
                state.avatar = action.payload.avatar ? action.payload.avatar : undefined;
            })
            .addCase(loginWithRefresh.rejected, (state) => {
                state.status = "failed";
            })
            .addCase(logout.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(logout.fulfilled, (state) => {
                state.status = "idle";
                state.id = undefined;
                state.username = undefined;
                state.displayName = undefined;
                state.access_token = undefined;
                state.avatar = undefined;
            })
            .addCase(logout.rejected, (state) => {
                state.status = "failed";
            })
    },
});

export const {} = userReducer.actions;

// Selectors
export const access_token = (state: RootState) => state.user.access_token;
export const userId = (state: RootState) => state.user.id;
export const avatar = (state: RootState) => state.user.avatar;

export default userReducer.reducer;
