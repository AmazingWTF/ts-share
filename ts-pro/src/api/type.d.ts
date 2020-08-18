export enum UserStatus {
  inActive,
  avtive
}

export interface IUser {
  name: string
  id: number
  avatar: string
  age: number
  address: string
  status: UserStatus
}
