export enum TaskStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
  ARCHIVED = "ARCHIVED",
}

export interface Task {
  _id?: string;
  title: string;
  description: string;
  status: TaskStatus;
}

export interface CreateTaskDTO {
  title: string
  description: string
}

export interface UpdateTaskDTO {
  _id: string
  title?: string
  description?: string
  status?: TaskStatus
}
