import {
  AppBar,
  Avatar,
  Container,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@material-ui/core"
import { Box } from "@material-ui/system"
import { useState } from "react"
import useAuth from "../hooks/useAuth"
import { LogOutIcon } from "./Icons"

const Header = () => {
  const { user, logOut } = useAuth()
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Container disableGutters>
          <Toolbar>
            <Typography sx={{ flexGrow: 1 }} variant="h6" component="div">
              Simple Notes
            </Typography>
            {user && <UserCircle logOut={logOut} photoURL={user.photoURL} />}
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  )
}

const UserCircle = ({ logOut, photoURL }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const closeHandle = () => {
    setAnchorEl(null)
  }

  const clickHandle = (event) => {
    setAnchorEl(event.currentTarget)
  }

  return (
    <>
      <IconButton onClick={clickHandle}>
        <Avatar src={photoURL}></Avatar>
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={closeHandle}>
        <MenuItem onClick={logOut}>
          <ListItemIcon>
            <LogOutIcon />
          </ListItemIcon>{" "}
          Выйти
        </MenuItem>
      </Menu>
    </>
  )
}

export default Header
