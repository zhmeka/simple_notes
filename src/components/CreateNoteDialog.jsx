import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from "@material-ui/core"
import { CloseIcon } from "./Icons"
import { collection, addDoc, Timestamp } from "firebase/firestore"
import { db } from "../firebase"
import useInput from "../hooks/useInput"
import useAuth from "../hooks/useAuth"
import { useEffect, useState } from "react"
import { Box } from "@material-ui/system"

const CreateNoteDialog = ({ open, close }) => {
  const title = useInput("")
  const body = useInput("")
  const { user } = useAuth()
  const [disabled, setDisabled] = useState(true)
  const [loading, setLoading] = useState(false)

  const addNoteHandle = async () => {
    setLoading(true)
    setDisabled(false)
    await addDoc(collection(db, user.email), {
      title: title.value,
      body: body.value,
      createdAt: Timestamp.fromDate(new Date()),
    })
    setLoading(false)
    setDisabled(true)
    close()
    title.clear()
    body.clear()
  }

  useEffect(() => {
    if (title.value || body.value) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }, [title.value, body.value])

  return (
    <Dialog open={open} onClose={close}>
      <DialogTitle>
        Новая заметка
        <IconButton
          onClick={close}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <TextField
          value={title.value}
          onChange={title.onChange}
          autoFocus
          margin="dense"
          label="Заголовок"
          fullWidth
        />
        <TextField
          value={body.value}
          onChange={body.onChange}
          margin="dense"
          label="Заметка"
          fullWidth
          multiline
          minRows={3}
          maxRows={8}
        />
      </DialogContent>
      <DialogActions>
        <Box sx={{ position: "relative" }}>
          <Button disabled={disabled} onClick={addNoteHandle}>
            Добавить
          </Button>
          {loading && (
            <CircularProgress
              size={24}
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                marginTop: "-12px",
                marginLeft: "-12px",
              }}
            />
          )}
        </Box>
      </DialogActions>
    </Dialog>
  )
}

export default CreateNoteDialog
