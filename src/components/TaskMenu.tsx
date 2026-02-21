import React, { useState } from "react"
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
} from "@mui/material"
import { useSnackbar } from "notistack"
import {
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Forward as MoveIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material"
import { Task, TaskStatus } from "../interfaces/Task"

interface TaskMenuProps {
  task: Task
  onUpdate: (task: Task) => Promise<void>
  onDelete: (task: Task) => Promise<void>
  onMove: (task: Task) => Promise<void>
  onMarkAsDone?: (task: Task) => Promise<void>
}

const NEXT_STATUS: Record<TaskStatus, TaskStatus | null> = {
  [TaskStatus.PENDING]: TaskStatus.IN_PROGRESS,
  [TaskStatus.IN_PROGRESS]: TaskStatus.DONE,
  [TaskStatus.DONE]: TaskStatus.ARCHIVED,
  [TaskStatus.ARCHIVED]: null,
}

const TaskMenu: React.FC<TaskMenuProps> = ({ task, onUpdate, onDelete, onMove, onMarkAsDone }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const { enqueueSnackbar } = useSnackbar()
  const open = Boolean(anchorEl)

  const [editOpen, setEditOpen] = useState(false)
  const [moveOpen, setMoveOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)

  const [editData, setEditData] = useState({ title: task.title, description: task.description })

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const nextStatus = NEXT_STATUS[task.status]

  const handleMove = async () => {
    try {
      if (nextStatus) {
        await onMove({ ...task, status: nextStatus })
        enqueueSnackbar(`Task moved to ${nextStatus.replace('_', ' ')}`, { variant: "success" })
      }
      setMoveOpen(false)
      handleMenuClose()
    } catch (error) {
      // Error handled by hook
      setMoveOpen(false)
      handleMenuClose()
    }
  }

  const handleDelete = async () => {
    try {
      await onDelete(task)
      enqueueSnackbar("Task deleted successfully", { variant: "success" })
      setDeleteOpen(false)
      handleMenuClose()
    } catch (error) {
      setDeleteOpen(false)
      handleMenuClose()
    }
  }

  const handleDone = async () => {
    try {
      await onMarkAsDone?.(task)
      enqueueSnackbar("Task marked as done", { variant: "success" })
      setMoveOpen(false)
      handleMenuClose()
    } catch (error) {
      setMoveOpen(false)
      handleMenuClose()
    }
  }

  const handleEditSave = async () => {
    try {
      await onUpdate({ ...task, ...editData })
      enqueueSnackbar("Task updated successfully", { variant: "success" })
      setEditOpen(false)
      handleMenuClose()
    } catch (error) {
      setEditOpen(false)
      handleMenuClose()
    }
  }

  return (
    <>
      <IconButton size="small" onClick={handleMenuOpen}>
        <MoreVertIcon fontSize="small" />
      </IconButton>

      <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
        <MenuItem onClick={() => setEditOpen(true)}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Edit" />
        </MenuItem>

        {nextStatus && (
          <MenuItem onClick={() => {
            setMoveOpen(true)
          }}>
            <ListItemIcon>
              <MoveIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary={`Move to ${nextStatus.replace('_', ' ')}`} />
          </MenuItem>
        )}

        <MenuItem onClick={() => setDeleteOpen(true)} sx={{ color: "error.main" }}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText primary="Delete" />
        </MenuItem>
      </Menu>
      <Dialog open={editOpen} onClose={() => setEditOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          {task.status === TaskStatus.ARCHIVED && (
            <Typography variant="body2" color="error" sx={{ mb: 2, fontWeight: 500 }}>
              Archived tasks cannot be edited.
            </Typography>
          )}
          <TextField
            fullWidth
            label="Title"
            value={editData.title}
            disabled={task.status === TaskStatus.ARCHIVED}
            onChange={(e) => setEditData({ ...editData, title: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Description"
            disabled={task.status === TaskStatus.ARCHIVED || task.status === TaskStatus.DONE}
            value={editData.description}
            onChange={(e) => setEditData({ ...editData, description: e.target.value })}
            margin="normal"
            multiline
            rows={4}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditOpen(false)}>{task.status === TaskStatus.ARCHIVED ? 'Close' : 'Cancel'}</Button>
          {task.status !== TaskStatus.ARCHIVED && (
            <Button onClick={handleEditSave} variant="contained">Save</Button>
          )}
        </DialogActions>
      </Dialog>

      <Dialog open={moveOpen} onClose={() => setMoveOpen(false)}>
        <DialogTitle>Confirm move</DialogTitle>
        <DialogContent>
          <Typography>
            ¿Are you sure you want to move this task to <strong>{nextStatus?.replace('_', ' ')}</strong>?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setMoveOpen(false)}>Cancel</Button>
          {
            nextStatus === TaskStatus.DONE ? (
              <Button onClick={handleDone} variant="contained" color="primary">Confirm</Button>
            ) : (
              <Button onClick={handleMove} variant="contained" color="primary">Confirm</Button>
            )
          }
        </DialogActions>
      </Dialog>

      <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)}>
        <DialogTitle>Eliminar Tarea</DialogTitle>
        <DialogContent>
          <Typography>
            ¿Are you sure you want to delete this task? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteOpen(false)}>Cancel</Button>
          <Button onClick={handleDelete} variant="contained" color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default TaskMenu
