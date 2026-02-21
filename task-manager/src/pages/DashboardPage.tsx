import { useAuth0 } from "@auth0/auth0-react"
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Chip,
  Stack,
  IconButton,
  AppBar,
  Toolbar,
  Avatar
} from "@mui/material"
import {
  Add as AddIcon,
  Logout as LogoutIcon,
  CheckCircle as CheckCircleIcon,
  RadioButtonUnchecked as PendingIcon,
  Archive as ArchiveIcon,
  PlayCircleOutline as ProgressIcon
} from "@mui/icons-material"
import { useMemo, useState } from "react"
import { TaskStatus, type Task } from "../interfaces/Task"
import NewTaskModal from "../components/newTaskModal"
import type { CreateTaskDTO } from "../interfaces/Task"
import { useTasks } from "../hooks/useTasks"
import TaskMenu from "../components/TaskMenu"

interface TaskCardProps {
  task: Task
  onUpdate: (task: Task) => Promise<void>
  onDelete: (task: Task) => Promise<void>
  onMove: (task: Task) => Promise<void>
  onMarkAsDone?: (task: Task) => Promise<void>
}

const TaskCard = ({ task, onUpdate, onDelete, onMove, onMarkAsDone }: TaskCardProps) => {
  const getStatusIcon = () => {
    switch (task.status) {
      case TaskStatus.DONE: return <CheckCircleIcon color="success" fontSize="small" />
      case TaskStatus.IN_PROGRESS: return <ProgressIcon color="primary" fontSize="small" />
      case TaskStatus.ARCHIVED: return <ArchiveIcon color="action" fontSize="small" />
      default: return <PendingIcon color="action" fontSize="small" />
    }
  }

  const getStatusColor = () => {
    switch (task.status) {
      case TaskStatus.DONE: return 'success'
      case TaskStatus.IN_PROGRESS: return 'primary'
      case TaskStatus.ARCHIVED: return 'default'
      default: return 'warning'
    }
  }

  return (
    <Card sx={{ border: '1px solid', borderColor: 'divider', boxShadow: 'none' }}>
      <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={1}>
          <Stack direction="row" spacing={1} alignItems="center">
            {getStatusIcon()}
            <Typography variant="subtitle2" color="text.secondary" sx={{ fontSize: '0.75rem', fontWeight: 600 }}>
              {task.status.replace('_', ' ')}
            </Typography>
          </Stack>
          <TaskMenu task={task} onUpdate={onUpdate} onDelete={onDelete} onMove={onMove} onMarkAsDone={onMarkAsDone} />
        </Stack>
        <Typography variant="body1" sx={{ fontWeight: 500, mb: 1 }}>{task.title}</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {task.description}
        </Typography>
        <Chip
          label={task.status.replace('_', ' ')}
          size="small"
          variant="outlined"
          color={getStatusColor()}
          sx={{
            fontSize: '0.65rem',
            height: 20,
            fontWeight: 700,
          }}
        />
      </CardContent>
    </Card>
  )
}

const DashboardPage = () => {
  const { user, logout } = useAuth0()
  const { tasks, loading, createTask, updateTask, markTaskAsDone, moveTask, deleteTask } = useTasks()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleSaveTask = async (taskDto: CreateTaskDTO) => {
    try {
      const task: Task = {
        title: taskDto.title,
        description: taskDto.description,
        status: TaskStatus.PENDING
      }
      await createTask(task)
    } catch (error) {
      console.error("Error creating task:", error)
      throw error
    }
  }

  const pendingTasks = useMemo(
    () => Array.isArray(tasks) ? tasks.filter((task) => task.status === TaskStatus.PENDING) : [],
    [tasks]
  );
  const inProgressTasks = useMemo(
    () => Array.isArray(tasks) ? tasks.filter((task) => task.status === TaskStatus.IN_PROGRESS) : [],
    [tasks]
  );
  const completedTasks = useMemo(
    () => Array.isArray(tasks) ? tasks.filter((task) => task.status === TaskStatus.DONE) : [],
    [tasks]
  );
  const archivedTasks = useMemo(
    () => Array.isArray(tasks) ? tasks.filter((task) => task.status === TaskStatus.ARCHIVED) : [],
    [tasks]
  );

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppBar
        position="static"
        color="inherit"
        elevation={0}
        sx={{ borderBottom: '1px solid', borderColor: 'divider' }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>Tasker</Typography>
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography variant="body2" color="text.secondary" sx={{ display: { xs: 'none', sm: 'block' } }}>
              {user?.email}
            </Typography>
            <Avatar src={user?.picture} sx={{ width: 32, height: 32 }} />
            <IconButton onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })} size="small">
              <LogoutIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ py: 6, flexGrow: 1 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-end" mb={6}>
          <Box>
            <Typography variant="h4">Workspace</Typography>
            <Typography variant="body1" color="text.secondary">Manage your focus and priority.</Typography>
          </Box>
          <Button
            variant="contained"
            onClick={() => setIsModalOpen(true)}
            startIcon={<AddIcon />}>New Task</Button>
        </Stack>

        {loading ? (
          <Typography>Loading tasks...</Typography>
        ) : (
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Stack spacing={2}>
                <Typography variant="overline" color="text.secondary" fontWeight={700}>Pending ({pendingTasks.length})</Typography>
                {pendingTasks.map((task) => (
                  <TaskCard key={task._id} task={task} onMove={moveTask} onUpdate={updateTask} onDelete={deleteTask} onMarkAsDone={markTaskAsDone} />
                ))}
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Stack spacing={2}>
                <Typography variant="overline" color="text.secondary" fontWeight={700}>In Progress ({inProgressTasks.length})</Typography>
                {inProgressTasks.map((task) => (
                  <TaskCard key={task._id} task={task} onMove={moveTask} onUpdate={updateTask} onDelete={deleteTask} onMarkAsDone={markTaskAsDone} />
                ))}
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Stack spacing={2}>
                <Typography variant="overline" color="text.secondary" fontWeight={700}>Completed ({completedTasks.length})</Typography>
                {completedTasks.map((task) => (
                  <TaskCard key={task._id} task={task} onMove={moveTask} onUpdate={updateTask} onDelete={deleteTask} onMarkAsDone={markTaskAsDone} />
                ))}
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Stack spacing={2}>
                <Typography variant="overline" color="text.secondary" fontWeight={700}>Archived ({archivedTasks.length})</Typography>
                {archivedTasks.map((task) => (
                  <TaskCard key={task._id} task={task} onMove={moveTask} onUpdate={updateTask} onDelete={deleteTask} onMarkAsDone={markTaskAsDone} />
                ))}
              </Stack>
            </Grid>
          </Grid>
        )}
      </Container>
      <NewTaskModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTask}
      />
    </Box>
  )
}

export default DashboardPage
