// import faker from '@faker-js/faker';
// import { Dispatch } from '@reduxjs/toolkit';

// import { Post,  PostAction, PostFetchError } from './types/post'

// const {
//     date: { past },
//     lorem: { paragraph, paragraphs, slug, words },
//     random: { uuid },
// } = faker;

// type OptionsType = {
//     id?: number,
//     slug?: string
// }

// // function simulates post fetch
// export const receivePosts = (count: number = 1, options: OptionsType = {}): Array<Post> => {


//     // const posts = Array<Post>(count)
//     //     .fill({} as Post)
//     //     .map(() => {
//     //         const summary = paragraph();
//     //         return {
//     //             id: options.id || uuid().split('-')[0],
//     //             user: words(),
//     //             slug: options.slug || slug(),
//     //             title: words(),
//     //             summary,
//     //             content: `${summary}\n${paragraphs()}`,
//     //             date: past(),
//     //             createdAt: past(),
//     //             updatedAt: past(),
//     //         } as Post;
//     //     });

//     if (posts.length !== count)
//         throw { message: "Fetch Unsuccesful" }

//     return posts;
// }
