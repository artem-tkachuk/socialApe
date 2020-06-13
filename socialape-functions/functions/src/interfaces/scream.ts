import {Comment} from "./comment";

export interface Scream {
    screamId: string,
    body: string,
    userHandle: string,
    createdAt: Date,
    likeCount: number
    commentCount: number,
    comments: Array<Comment>
}