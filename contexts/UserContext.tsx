/** @format */

import { createContext, useState } from 'react'

export interface User {
  username: string
}

const UserContext = createContext<any>(null)

export function UserContextProvider({ children }: { children: any }) {
  const [user, setUser] = useState<User | null>(null)
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}
