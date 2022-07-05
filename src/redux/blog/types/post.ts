export interface PostFetchError {
	message: string;
}

export interface PostState {
	isFetching: boolean;
	isError: boolean;
	error: PostFetchError;
	posts: Array<Post>;
}

export type PostAction = {
	type: string;
	data: Array<Post>;
};

export enum Tag {
	programming = 'programming',
	blog = 'blog',
	design = 'design',
	react = 'react',
	books = 'books',
}

export interface Post {
	id: number;
	slug: string;
	title: string;
	summary: string;
	content?: string;
	user: string;
	tags: Array<Tag>;
	imageUrl?: string;
	createdAt?: Date;
	updatedAt?: Date;
}
