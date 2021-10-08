import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "@firebase/auth"
import { createContext, useEffect, useState } from "react"
import { auth } from "../firebase"

export const Context = createContext()

const AuthContext = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })

    return unsubscribe
  }, [])

  const logIn = async () => {
    const provider = new GoogleAuthProvider()
    const data = await signInWithPopup(auth, provider)
    setUser(data.user)
  }

  const logOut = async () => {
    await auth.signOut()
  }

  const value = {
    user,
    logIn,
    logOut,
  }
  return <Context.Provider value={value}>{children}</Context.Provider>
}

export default AuthContext
