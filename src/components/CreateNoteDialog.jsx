import {
  Button,
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

const CreateNoteDialog = ({ open, close }) => {
  const title = useInput("")
  const body = useInput("")
  const { user } = useAuth()

  const addNoteHandle = async () => {
    await addDoc(collection(db, user.email), {
      title: title.value,
      body: body.value,
      createdAt: Timestamp.fromDate(new Date()),
    })
    close()
    title.clear()
    body.clear()
  }

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
        <Button onClick={addNoteHandle}>Добавить</Button>
      </DialogActions>
    </Dialog>
  )
}

export default CreateNoteDialog
