import { Redirect, Route, Switch } from "react-router"
import Login from "../components/Login"

const LoginPage = () => {
  return (
    <Switch>
      <Route path="/login">
        <Login />
      </Route>
      <Redirect to="/login" />
    </Switch>
  )
}

export default LoginPage
