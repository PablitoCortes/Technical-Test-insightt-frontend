import { useEffect, useState } from "react"
import { useAuth0 } from "@auth0/auth0-react"
import { createTaskService, getTasksService } from "../services/tasks.service"
import { Task } from "../interfaces/Task"

export const useTasks = () => {
  const { getAccessTokenSilently } = useAuth0()
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)

  const fetchTasks = async () => {
    try {
      const token = await getAccessTokenSilently()
      const data = await getTasksService(token)
      setTasks(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const createTask = async (task: Task) => {
    try {
      const token = await getAccessTokenSilently()
      const newTask = await createTaskService(task, token)
      setTasks([...tasks, newTask])
    } catch (error) {
      console.error("Error creating task:", error)
      throw error
    }
  }
  return {
    tasks,
    loading,
    refetch: fetchTasks,
    createTask
  }
}