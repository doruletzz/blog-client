import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Post, PostAction, PostFetchError, PostState } from './types/post'

import { receivePosts } from './utils'
import { AppThunk } from '../app/store';
import axios from 'axios';

export type DispatchType = (args: PostAction) => PostAction

const initialState: PostState = {
    isFetching: false,
    isError: false,
    error: { message: "" },
    posts: [],
};


export const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postsFetching: (state) => {
            state.isFetching = true;
        },

        postsReceived: (state, action: PayloadAction<Array<Post>>) => {
            // add to payload without duplicates
            console.log(action.payload, typeof action.payload);
            state.posts = state.posts.concat( action.payload.filter( i2 => !state.posts.find( i1 => i1.id == i2.id ) ) );;
            console.log(state.posts);
            state.isFetching = false;
        },

        postsFailed: (state, action: PayloadAction<PostFetchError>) => {
            state.error = action.payload;
            state.isFetching = false;
        },

    }
})

const { actions, reducer } = postSlice

export const { postsReceived, postsFetching, postsFailed } = actions

export default reducer

const baseURL = "http://localhost:4000/post/";

export const savePost = (post : Post): AppThunk => {
    return async (dispatch) => {
        try {
            dispatch(postsFetching());
            // a*/-xios.post(baseURL)*-
            axios.get(baseURL).then(({ data }) => {
                console.log(data);
                dispatch(postsReceived([post]))
            }).catch(function (error) {
                console.log(error);
            });
        } catch (error) {
            dispatch(postsFailed(error));
        }
    }
}

// Actions
export const fetchPosts = (count: number | undefined): AppThunk => {
    return async (dispatch) => {
        try {
            dispatch(postsFetching());
            axios.get(baseURL).then(({ data }) => {
                console.log(data);
                dispatch(postsReceived(data))
            }).catch(function (error) {
                console.log(error);
            });
        } catch (error) {
            dispatch(postsFailed(error));
        }
    }
}

export const fetchPost = (slug: string): AppThunk => {
    return async (dispatch) => {
        try {
            dispatch(postsFetching());
            axios.get(baseURL + slug).then(({ data }) => {
                console.log(data);
                dispatch(postsReceived([data]))
            }).catch(function (error) {
                console.log(error);
            });
        } catch (error) {
            dispatch(postsFailed(error));
        }
    }
}

