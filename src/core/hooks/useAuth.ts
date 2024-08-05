import { useSelector } from 'react-redux'
import { User } from '../types/user'
import { useStoreBy } from './useStoreBy'

export const useAuth = (): boolean => {

    const user = useStoreBy<User>('user')

    return !!user.id
}