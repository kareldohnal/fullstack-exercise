
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface CommentInput {
    author: string;
    content: string;
}

export interface PostInput {
    title: string;
    content: string;
    thumbnail?: Nullable<string>;
}

export interface ResponseStatus {
    status: number;
    message?: Nullable<string>;
}

export interface Comment {
    id: number;
    post: number;
    author: string;
    content: string;
    timestampCreated: string;
}

export interface IQuery {
    getComments(postId: number): Nullable<Comment>[] | Promise<Nullable<Comment>[]>;
    getAllPosts(): Nullable<Post>[] | Promise<Nullable<Post>[]>;
    getPost(id: number): Post | Promise<Post>;
}

export interface IMutation {
    createComment(postId: number, commentInput: CommentInput): ResponseStatus | Promise<ResponseStatus>;
    createPost(authorId: number, postInput: PostInput): Post | Promise<Post>;
    updatePost(id: number, postInput?: Nullable<PostInput>): ResponseStatus | Promise<ResponseStatus>;
    deletePost(id: number): ResponseStatus | Promise<ResponseStatus>;
    voteOnComment(commentId: number, effect: boolean): ResponseStatusWithIP | Promise<ResponseStatusWithIP>;
}

export interface Post {
    id: number;
    title: string;
    content: string;
    timestampCreated: string;
    timestampEdited: string;
    thumbnail?: Nullable<string>;
}

export interface ResponseStatusWithIP {
    status: number;
    ip?: Nullable<string>;
    message?: Nullable<string>;
}

type Nullable<T> = T | null;
