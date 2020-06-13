import {User} from "./user";

export interface UserDetails {
    //Redux data
    credentials?: User,
    likes?: [
        {
            userHandle: string,
            screamId: string
        }
    ]
}