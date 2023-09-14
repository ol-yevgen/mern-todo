export interface AuthTypes {
    userName: string,
    accessToken: string,
    userId: string
}

export interface TaskType {
    _id: string,
    title: string,
    text: string,
    done: boolean,
    createdAt: string,
    updatedAt: string,
}