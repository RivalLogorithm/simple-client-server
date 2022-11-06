import {createContext} from 'react'

export const UserContext = createContext({
    id: null,
    firstName: null,
    lastName: null,
    email: null
})