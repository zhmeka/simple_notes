import { Container } from "@material-ui/core"
import CreateNote from "./components/CreateNote"
import Header from "./components/Header"
import Login from "./components/Login"
import NotesWrapper from "./components/NotesWrapper"
import Page from "./components/Page"
import useAuth from "./hooks/useAuth"
import { useState } from "react"

const App = () => {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const loadingHandle = (bool) => {
    setLoading(bool)
  }

  return (
    <>
      <Header loading={loading} />
      <Container>
        {user ? (
          <Page route="notes">
            <CreateNote />
            <NotesWrapper setLoading={loadingHandle} />
          </Page>
        ) : (
          <Page route="login">
            <Login />
          </Page>
        )}
      </Container>
    </>
  )
}

export default App
