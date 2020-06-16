import {User} from "./user";
import {Notification} from "./notification";
import {Like} from "./like";
import {ScreamInterface} from "./screamInterface";

export interface UserDetails {
    //Redux data
    credentials?: User,
    likes?: Array<Like>
    notifications?: Array<Notification>,
    screams?: Array<ScreamInterface>
}