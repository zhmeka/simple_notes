import { useContext } from "react"
import { Context } from "../context/AuthContext"

const useAuth = () => {
  return useContext(Context)
}

export default useAuth
