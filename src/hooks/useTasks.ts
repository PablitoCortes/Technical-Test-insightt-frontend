import { useEffect, useState } from "react"
import { useAuth0 } from "@auth0/auth0-react"
import { useSnackbar } from "notistack"
import { createTaskService, deleteTaskService, editTaskService, getTasksService, markAsDoneService, moveTaskService } from "../services/tasks.service"
import { Task } from "../interfaces/Task"

export const useTasks = () => {
  const { getAccessTokenSilently } = useAuth0()
  const { enqueueSnackbar } = useSnackbar()
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)

  const fetchTasks = async () => {
    try {
      const token = (window as any).Cypress ? 'fake-token' : await getAccessTokenSilently()
      const data = await getTasksService(token)
      setTasks(data)
    } catch (error) {
      console.error(error)
      enqueueSnackbar("Error fetching tasks", { variant: "error" })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const createTask = async (task: Task) => {
    try {
      const token = (window as any).Cypress ? 'fake-token' : await getAccessTokenSilently()
      const newTask = await createTaskService(task, token)
      setTasks([...tasks, newTask])
    } catch (error) {
      enqueueSnackbar("Error creating task", { variant: "error" })
      throw error
    }
  }

  const updateTask = async (task: Task) => {

    try {
      const token = (window as any).Cypress ? 'fake-token' : await getAccessTokenSilently()
      const editedTask = await editTaskService(task, token)
      setTasks(prev => prev.map(t => t._id === editedTask._id ? editedTask : t))
      return editedTask
    } catch (error) {
      enqueueSnackbar("Error updating task", { variant: "error" })
      throw error
    }
  }

  const markTaskAsDone = async (task: Task) => {
    try {
      const token = (window as any).Cypress ? 'fake-token' : await getAccessTokenSilently()
      const updatedTask = await markAsDoneService(task._id!, token)
      setTasks(prev => prev.map(t => t._id === updatedTask._id ? updatedTask : t))
      return updatedTask
    } catch (error) {
      enqueueSnackbar("Error marking task as done", { variant: "error" })
      throw error
    }
  }

  const moveTask = async (task: Task) => {
    try {
      const token = (window as any).Cypress ? 'fake-token' : await getAccessTokenSilently()
      const updatedTask = await moveTaskService(task._id!, task.status, token)
      setTasks(prev => prev.map(t => t._id === updatedTask._id ? updatedTask : t))
      return updatedTask
    } catch (error) {
      enqueueSnackbar("Error moving task", { variant: "error" })
      throw error
    }
  }

  const deleteTask = async (task: Task) => {
    try {
      const token = (window as any).Cypress ? 'fake-token' : await getAccessTokenSilently()
      await deleteTaskService(task, token)
      setTasks(prev => prev.filter(t => t._id !== task._id))
    } catch (error) {
      enqueueSnackbar("Error deleting task", { variant: "error" })
      throw error
    }
  }

  return {
    tasks,
    loading,
    refetch: fetchTasks,
    createTask,
    updateTask,
    markTaskAsDone,
    moveTask,
    deleteTask
  }
}