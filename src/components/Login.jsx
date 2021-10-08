import { Button, Link, Typography } from "@material-ui/core"
import { Box } from "@material-ui/system"
import useAuth from "../hooks/useAuth"

const Login = () => {
  const { logIn } = useAuth()
  const style = {
    box: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "85vh",
    },
  }
  return (
    <Box sx={style.box}>
      <Button onClick={logIn} variant="contained">
        Войти с помощью Google
      </Button>
      <Typography>
        Cоздано{" "}
        <Link href="https://github.com/zhmeka" target="_blank">
          Евгением
        </Link>
      </Typography>
    </Box>
  )
}

export default Login
