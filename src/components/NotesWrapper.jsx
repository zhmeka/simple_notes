import { collection, onSnapshot, query } from "@firebase/firestore"
import { Grid } from "@material-ui/core"
import { Box } from "@material-ui/system"
import { useEffect, useState } from "react"
import { db } from "../firebase"
import useAuth from "../hooks/useAuth"
import Note from "./Note"

const NotesWrapper = () => {
  const [notes, setNotes] = useState([])
  console.log("нотатки епта")
  const { user } = useAuth()
  useEffect(() => {
    const q = query(collection(db, user.email))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      let newNotesArray = []
      snapshot.forEach((doc) => {
        newNotesArray.push({ ...doc.data(), id: doc.id })
      })
      setNotes(newNotesArray)
    })
    return unsubscribe
  }, [])
  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2}>
        {notes.length > 0 &&
          notes.map((data) => <Note data={data} key={data.id} />)}
      </Grid>
    </Box>
  )
}

export default NotesWrapper
