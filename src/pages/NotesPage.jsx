import { Redirect, Route, Switch } from "react-router"
import CreateNote from "../components/CreateNote"
import NotesWrapper from "../components/NotesWrapper"

const NotesPage = () => {
  return (
    <Switch>
      <Route path="/notes">
        <CreateNote />
        <NotesWrapper />
      </Route>
      <Redirect to="/notes" />
    </Switch>
  )
}

export default NotesPage
