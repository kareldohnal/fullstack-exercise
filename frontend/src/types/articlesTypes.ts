import {AuthEntity} from "./userTypes";

export interface PostEntity {
    id: number,
    author: AuthEntity,
    title: string,
    content: string,
    timestampCreated: string,
    timestampEdited: string,
    thumbnail?: string,
    comments: Array<CommentEntity>
}

export interface CommentEntity {
    id: number,
    author: string,
    content: string,
    timestampCreated: string,
    votes?: Array<VoteEntity>
}

export interface VoteEntity {
    id: number;
    effect: boolean | null;
    ip: string;
}
