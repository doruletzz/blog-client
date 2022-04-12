
export interface PostFetchError {
    message: string
}

export interface PostState {
    isFetching: boolean,
    isError: boolean,
    error: PostFetchError,
    posts: Array<Post>
}

export type PostAction = {
    type: string
    data: Array<Post>
  }

export interface Post {
    id : number,
    slug : string,
    title: string,
    summary: string,
    content: string,
    user: string,
    imageUrl: string,
    createdAt?: Date | undefined,
    updatedAt?: Date | undefined,
}

