import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Post, PostAction, PostFetchError, PostState, Tag } from './types/post';

// import { receivePosts } from './utils'
import { AppThunk } from '../app/store';
import axios from 'axios';
import { SERVER_URL } from '../../utils/constants';

export type DispatchType = (args: PostAction) => PostAction;

const initialState: PostState = {
	isFetching: false,
	isError: false,
	error: { message: '' },
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
			state.posts = state.posts.concat(
				action.payload.filter(
					(i2) => !state.posts.find((i1) => i1.id == i2.id)
				)
			);
			state.isFetching = false;
		},

		postsFailed: (state, action: PayloadAction<PostFetchError>) => {
			state.error = action.payload;
			state.isFetching = false;
		},

		postRemoved: (state, action: PayloadAction<string>) => {
			state.posts = state.posts.filter(
				(post) =>
					post.slug !== action.payload &&
					post.id !== parseInt(action.payload)
			);
		},
	},
});

const { actions, reducer } = postSlice;

export const { postsReceived, postsFetching, postsFailed, postRemoved } =
	actions;

export default reducer;

export const savePost = (post: Post): AppThunk => {
	return async (dispatch) => {
		try {
			console.log(post);
			axios
				.post(SERVER_URL, post)
				.then(({ data }) => {
					console.log(data);
					dispatch(postsReceived([data]));
				})
				.catch(function (error) {
					console.log(error);
				});
		} catch (error) {
			dispatch(postsFailed(error));
		}
	};
};

// Actions
export const fetchPosts = (
	count: number = 10,
	tags: Array<Tag> = []
): AppThunk => {
	return async (dispatch) => {
		try {
			dispatch(postsFetching());
			axios
				.get(SERVER_URL, {
					params: {
						tags,
					},
				})
				.then(({ data }) => {
					console.log(data);
					dispatch(postsReceived(data));
				})
				.catch(function (error) {
					console.log(error);
				});
		} catch (error) {
			dispatch(postsFailed(error));
		}
	};
};

export const fetchPost = (slugOrId: string): AppThunk => {
	return async (dispatch) => {
		try {
			dispatch(postsFetching());
			axios
				.get(SERVER_URL + slugOrId)
				.then(({ data }) => {
					console.log(data);
					dispatch(postsReceived([data]));
				})
				.catch(function (error) {
					console.log(error);
				});
		} catch (error) {
			dispatch(postsFailed(error));
		}
	};
};

export const removePost = (slugOrId: string): AppThunk => {
	return async (dispatch) => {
		try {
			axios
				.delete(SERVER_URL + slugOrId)
				.then(({ data }) => {
					console.log(data);
					dispatch(postRemoved(slugOrId));
				})
				.catch(function (error) {
					console.log(error);
				});
		} catch (error) {
			dispatch(postsFailed(error));
		}
	};
};
