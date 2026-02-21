import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
} from "@mui/material"
import { useState } from "react"
import type { CreateTaskDTO } from "../interfaces/Task"

interface Props {
  open: boolean
  onClose: () => void
  onSave: (task: CreateTaskDTO) => Promise<void>
}

const NewTaskModal = ({ open, onClose, onSave }: Props) => {
  const [formData, setFormData] = useState<CreateTaskDTO>({
    title: "",
    description: "",
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await onSave(formData)
      setFormData({ title: "", description: "" })
      setTimeout(() => {
        onClose()
      }, 1000);
    } catch (error) {
      console.error("Error saving task:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle sx={{ fontWeight: 700 }}>New Task</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <TextField
              name="title"
              label="Task Title"
              fullWidth
              required
              value={formData.title}
              onChange={handleChange}
              variant="outlined"
            />
            <TextField
              name="description"
              label="Description"
              fullWidth
              multiline
              rows={3}
              value={formData.description}
              onChange={handleChange}
              variant="outlined"
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={onClose} color="inherit">Cancel</Button>
          <Button
            type="submit"
            variant="contained"
            disabled={loading || !formData.title}
          >
            {loading ? "Creating..." : "Create Task"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default NewTaskModal
