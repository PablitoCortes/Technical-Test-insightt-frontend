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
  MoreVert as MoreVertIcon,
  CheckCircle as CheckCircleIcon,
  RadioButtonUnchecked as PendingIcon
} from "@mui/icons-material"
import { useEffect, useMemo, useState } from "react"
import { getTasksService, createTaskService } from "../services/tasks.service"
import { TaskStatus, type Task } from "../interfaces/Task"
import NewTaskModal from "../components/newTaskModal"
import type { CreateTaskDTO } from "../interfaces/Task"
import { useTasks } from "../hooks/useTasks"

const MockTask = ({ title, status }: { title: string, status: string }) => (
  <Card sx={{ border: '1px solid', borderColor: 'divider', boxShadow: 'none' }}>
    <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={1}>
        <Stack direction="row" spacing={1} alignItems="center">
          {status === TaskStatus.COMPLETED ? <CheckCircleIcon color="success" fontSize="small" /> : <PendingIcon color="action" fontSize="small" />}
          <Typography variant="subtitle2" color="text.secondary" sx={{ fontSize: '0.75rem', fontWeight: 600 }}>
            {status}
          </Typography>
        </Stack>
        <IconButton size="small"><MoreVertIcon fontSize="inherit" /></IconButton>
      </Stack>
      <Typography variant="body1" sx={{ fontWeight: 500, mb: 2 }}>{title}</Typography>
      <Chip
        label={status}
        size="small"
        variant="outlined"
        sx={{
          fontSize: '0.65rem',
          height: 20,
          fontWeight: 700,
          borderColor: status === 'DONE' ? 'success.main' : 'warning.main',
          color: status === 'DONE' ? 'success.main' : 'warning.main'
        }}
      />
    </CardContent>
  </Card>
)

const DashboardPage = () => {
  const { user, logout } = useAuth0()
  const { tasks, loading, createTask } = useTasks()
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
    () => Array.isArray(tasks) ? tasks.filter((task) => task.status === TaskStatus.COMPLETED) : [],
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

      <Container maxWidth="lg" sx={{ py: 6, flexGrow: 1 }}>
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
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Stack spacing={2}>
              <Typography variant="overline" color="text.secondary" fontWeight={700}>Pending ({pendingTasks.length})</Typography>
              {pendingTasks.map((task) => (
                <MockTask key={task._id} title={task.title} status={task.status} />
              ))}
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Stack spacing={2}>
              <Typography variant="overline" color="text.secondary" fontWeight={700}>In Progress ({inProgressTasks.length})</Typography>
              {inProgressTasks.map((task) => (
                <MockTask key={task._id} title={task.title} status={task.status} />
              ))}
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Stack spacing={2}>
              <Typography variant="overline" color="text.secondary" fontWeight={700}>Completed ({completedTasks.length})</Typography>
              {completedTasks.map((task) => (
                <MockTask key={task._id} title={task.title} status={task.status} />
              ))}
            </Stack>
          </Grid>
        </Grid>
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
