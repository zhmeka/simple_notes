import { Redirect, Route, Switch } from "react-router"

const Page = ({ route, children }) => {
  return (
    <Switch>
      <Route path={"/" + route}>{children}</Route>
      <Redirect to={"/" + route} />
    </Switch>
  )
}

export default Page
