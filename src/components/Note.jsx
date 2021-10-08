import {
  Card,
  CardContent,
  ClickAwayListener,
  Grid,
  TextField,
  Typography,
  ButtonGroup,
  Button,
} from "@material-ui/core"
import { useEffect, useState } from "react"
import { doc, setDoc, deleteDoc } from "firebase/firestore"
import { db } from "../firebase"
import useAuth from "../hooks/useAuth"
import useInput from "../hooks/useInput"

const Note = ({ data }) => {
  const [editing, setEditing] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const { user } = useAuth()
  const title = useInput(data.title)
  const body = useInput(data.body)

  useEffect(() => {
    if (data.title !== title.value || data.body !== body.value) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }, [data.title, data.body, title.value, body.value])

  const updateNoteHandle = async () => {
    await setDoc(doc(db, user.email, data.id), {
      title: title.value,
      body: body.value,
    })
  }

  const deleteNoteHandle = async () => {
    await deleteDoc(doc(db, user.email, data.id))
  }

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
      <ClickAwayListener onClickAway={() => setEditing(false)}>
        <Card onClick={() => setEditing(true)}>
          {editing ? (
            <CardContent>
              <TextField
                value={title.value}
                onChange={title.onChange}
                label="Заголовок"
                fullWidth
                size="small"
                margin="dense"
                autoFocus
              />
              <TextField
                value={body.value}
                onChange={body.onChange}
                label="Заметка"
                fullWidth
                size="small"
                multiline
                minRows={3}
                maxRows={6}
                margin="dense"
              />
              <ButtonGroup fullWidth variant="text" size="small">
                <Button onClick={deleteNoteHandle}>Удалить</Button>
                <Button disabled={disabled} onClick={updateNoteHandle}>
                  Обновить
                </Button>
              </ButtonGroup>
            </CardContent>
          ) : (
            <CardContent>
              <Typography variant="h5">{data.title}</Typography>
              <Typography>{data.body}</Typography>
            </CardContent>
          )}
        </Card>
      </ClickAwayListener>
    </Grid>
  )
}

export default Note
