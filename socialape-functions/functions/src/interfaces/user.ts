export interface User {
    userId?: string,
    email: string,
    password: string,
    confirmPassword: string,
    handle: string,
    createdAt?: string,
    imageUrl?: string,
    bio?: string,
    website?: string | null,
    location?: string
}