import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from './../../config/axios';
import {PostEntity} from "../../types/articlesTypes";
import {useToken} from "../../hooks/useToken";

export interface ArticlesState {
    status: 'idle' | 'loading' | 'failed',
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
    async (data: {"title": string, "content": string, thumbnail?: string}, thunkAPI) => {
        const token = await useToken()
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

export const ArticlesReducer = createSlice({
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
    },
});

export const {} = ArticlesReducer.actions;

// Selectors
// export const access_token = (state: RootState) => state.user.access_token;

export default ArticlesReducer.reducer;
