import type { Task } from "../interfaces/Task"
import api from "./api"

export const getTasksService = async (token: string) => {
  const response = await api.get("/tasks", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.data.data
}

export const createTaskService = async (task: Task, token: string) => {
  const response = await api.post("/tasks", task, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.data.data
}

export const updateTaskService = async (task: Task, token: string) => {
  const response = await api.put(`/tasks/${task._id}`, task, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.data.data
}

export const deleteTaskService = async (task: Task, token: string) => {
  const response = await api.delete(`/tasks/${task._id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.data.data
}