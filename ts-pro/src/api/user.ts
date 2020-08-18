import axios from 'axios'
import { UserStatus, IUser } from './type'

export const defaultUserInfo: IUser = {
  name: '',
  id: 0,
  avatar: '',
  age: 0,
  address: '',
  status: UserStatus.inActive
}

export const getUserInfo = (params: any) =>
  axios({
    url: '/user',
    method: 'get',
    params
  })
