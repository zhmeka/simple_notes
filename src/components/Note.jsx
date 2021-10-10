import {
  Card,
  CardContent,
  ClickAwayListener,
  Grid,
  TextField,
  Typography,
  ButtonGroup,
  Button,
  LinearProgress,
} from "@material-ui/core"
import { useEffect, useState } from "react"
import { doc, setDoc, deleteDoc } from "firebase/firestore"
import { db } from "../firebase"
import useAuth from "../hooks/useAuth"
import useInput from "../hooks/useInput"

const Note = ({ data }) => {
  const [editing, setEditing] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()
  const title = useInput(data.title)
  const body = useInput(data.body)

  useEffect(() => {
    if (data.title !== title.value || data.body !== body.value) {
      setDisabled(!(title.value || body.value))
    } else {
      setDisabled(true)
    }
  }, [data.title, data.body, title.value, body.value])

  const updateNoteHandle = async () => {
    setLoading(true)
    await setDoc(doc(db, user.email, data.id), {
      title: title.value,
      body: body.value,
    })
    setLoading(false)
  }

  const deleteNoteHandle = async () => {
    await deleteDoc(doc(db, user.email, data.id))
  }

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <ClickAwayListener onClickAway={() => setEditing(false)}>
        <Card
          elevation={editing ? 5 : 1}
          sx={{ position: "relative" }}
          onClick={() => setEditing(true)}
        >
          {loading && (
            <LinearProgress
              sx={{ position: "absolute", left: "0", width: "100%" }}
            />
          )}
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
              <Typography sx={{ whiteSpace: "pre-wrap" }}>
                {data.body}
              </Typography>
            </CardContent>
          )}
        </Card>
      </ClickAwayListener>
    </Grid>
  )
}

export default Note
