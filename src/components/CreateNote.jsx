import { Button } from "@material-ui/core"
import { Box } from "@material-ui/system"
import { useState } from "react"
import CreateNoteDialog from "./CreateNoteDialog"
import { AddIcon } from "./Icons"

const CreateNote = () => {
  const [openDialog, setOpeningDialog] = useState(false)

  return (
    <>
      <Box sx={{ p: 3, display: "flex", justifyContent: "center" }}>
        <Button
          onClick={() => setOpeningDialog(true)}
          variant="contained"
          startIcon={<AddIcon />}
        >
          Добавить заметку
        </Button>
      </Box>
      <CreateNoteDialog
        open={openDialog}
        close={() => setOpeningDialog(false)}
      />
    </>
  )
}

export default CreateNote
