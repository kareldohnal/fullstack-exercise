import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from './../../config/axios';
import {PostEntity} from "../../types/articlesTypes";
import {RootState} from "../../config/store";
import {silentRefresh} from "../login/userSlice";

export interface ArticlesState {
    status: 'idle' | 'loading' | 'failed'
    allArticles: Array<PostEntity> | undefined
    selectedArticle: PostEntity | undefined
}

const initialState: ArticlesState = {
    status: "idle",
    allArticles: undefined,
    selectedArticle: undefined
};

export const createPost = createAsyncThunk(
    'articles/createPost',
    async (data: {"authorId": number, postInput: {"title": string, "content": string, thumbnail?: string}}, thunkAPI) => {
        await thunkAPI.dispatch(silentRefresh())
        const token = (thunkAPI.getState() as RootState).user.access_token
        if (!token) return thunkAPI.rejectWithValue("loginWithCredentials: token unavailable")
        const responseData = await axios.post(`/posts`, data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }})
            .then((response) =>  {
                return response.data
            })
            .catch((error) => {
                console.log("Response error:", error)
                return null
            })
        return responseData ? responseData : thunkAPI.rejectWithValue("loginWithCredentials")
    },
);

export const getAllPosts = createAsyncThunk(
    'articles/getAllPosts',
    async (_, thunkAPI) => {
        const responseData = await axios.get(`/posts/getAllPosts`)
            .then((response) =>  {
                return response.data
            })
            .catch((error) => {
                console.log("Response error:", error)
                return null
            })
        return responseData ? responseData : thunkAPI.rejectWithValue("loginWithCredentials")
    },
);

export const articlesReducer = createSlice({
    name: 'articles',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(createPost.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createPost.fulfilled, (state) => {
                state.status = "idle";
            })
            .addCase(createPost.rejected, (state) => {
                state.status = "failed";
            })
            .addCase(getAllPosts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAllPosts.fulfilled, (state, action: PayloadAction<Array<PostEntity>>) => {
                state.status = "idle";
                state.allArticles = action.payload
            })
            .addCase(getAllPosts.rejected, (state) => {
                state.status = "failed";
            })
    },
});

export const {} = articlesReducer.actions;

// Selectors
export const allArticles = (state: RootState) => state.articles.allArticles;

export default articlesReducer.reducer;
