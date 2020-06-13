import {User} from "../interfaces/user";

export const validateNewUserData = (newUser: User) => {
    let errors: { [key: string]: string } = {};

    // email
    if(isEmpty(newUser.email)) {
        errors.email = `Must not be empty!`;
    } else if (!isEmail(newUser.email)) {
        errors.email = `Must be a valid email address!`;
    }

    // password
    if (isEmpty(newUser.password)) {
        errors.password = `Must not be empty`;
    }

    // confirm password
    if (newUser.password !== newUser.confirmPassword) {
        errors.confirmPassword = `Password must match!`;
    }

    // handle
    if (isEmpty(newUser.handle)) {
        errors.handle = `Must not be empty`;
    }

    return {
        errors,
        valid: Object.keys(errors).length === 0
    };
};

export const validateLoginData = (loginUserData: { email: string, password: string}) => {
    let errors: { [key: string]: string } = {};

    if (isEmpty(loginUserData.email)) {
        errors.email = `Must not be empty`;
    }

    if (isEmpty(loginUserData.password)) {
        errors.password = `Must not be empty`;
    }

    return {
        errors,
        valid: Object.keys(errors).length === 0
    }
};

export const reduceUserDetails = (user: User) => {
    let userDetails: {[key: string]: string} = {};

    if (!isEmpty(user.bio!.trim())) {
        userDetails.bio = user.bio!;
    }

    if (!isEmpty(user.website!.trim())) {
        //https://website.com
        if (user.website!.trim().substring(0, 4) !== 'http') {
            userDetails.website = `http://${user.website!.trim()}`;
        } else {
            userDetails.website = user.website!;
        }
    }

    if (!isEmpty(user.location!.trim())) {
        userDetails.location = user.location!;
    }

    return userDetails;
};


//helper functions

export const isEmpty = (email: string) => {
    return email.trim() === ``;
};

export const isEmail = (email: string) => {
    const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return email.match(emailRegEx);
};