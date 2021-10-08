import Header from "./components/Header"
import useAuth from "./hooks/useAuth"
import LoginPage from "./pages/LoginPage"
import NotesPage from "./pages/NotesPage"

const App = () => {
  const { user } = useAuth()
  return (
    <>
      <Header />
      {user ? <NotesPage /> : <LoginPage />}
    </>
  )
}

export default App
