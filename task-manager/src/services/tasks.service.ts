import { Task, TaskStatus } from "../interfaces/Task"
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

export const editTaskService = async (task: Task, token: string) => {
  const response = await api.put(`/tasks/${task._id}`, task, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.data.data
}

export const moveTaskService = async (taskId: string, status: TaskStatus, token: string) => {
  const response = await api.put(`/tasks/${taskId}/move`, { status }, {
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

export const markAsDoneService = async (taskId: string, token: string) => {
  const response = await api.put(`/tasks/${taskId}/markAsDone`, {}, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.data.data
}