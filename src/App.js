import CreateNote from "./components/CreateNote"
import Header from "./components/Header"
import Login from "./components/Login"
import NotesWrapper from "./components/NotesWrapper"
import Page from "./components/Page"
import useAuth from "./hooks/useAuth"

const App = () => {
  const { user } = useAuth()
  return (
    <>
      <Header />
      {user ? (
        <Page route="notes">
          <CreateNote />
          <NotesWrapper />
        </Page>
      ) : (
        <Page route="login">
          <Login />
        </Page>
      )}
    </>
  )
}

export default App
