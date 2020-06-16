import {Comment} from "./comment";

export interface ScreamInterface {
    screamId?: string,
    body: string,
    userHandle: string,
    createdAt: string,
    likeCount: number
    commentCount: number,
    comments?: Array<Comment>
    userImage?: string
}