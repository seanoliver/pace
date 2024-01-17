import { Task } from '../lib/types'
import { supabaseServerClient } from '@/lib/supabase-server'

export const createTask = async (task: Partial<Task>) => {
  console.log('CREATE TASK, task: ', task)
  return await supabaseServerClient.from('tasks').insert([task])
}

export const updateTask = async (task: Task) => {
  return await supabaseServerClient
    .from('tasks')
    .update(task)
    .match({ id: task.id })
}

export const deleteTask = async (id: string) => {
  return await supabaseServerClient.from('tasks').delete().match({ id })
}

export const getTasks = async () => {
  return await supabaseServerClient.from('tasks').select('*')
}

export const upsertTask = async (task: Task) => {
  console.log('UPSERT TASK, task: ', task)
  if (task.id) {
    console.log('UPDATE TASK')
    return await updateTask(task)
  }
  console.log('CREATE TASK')
  return await createTask(task)
}

export const patchTask = async (task: Partial<Task>) => {
  if (!task.id) {
    throw new Error('Task ID is required')
  }
  return await supabaseServerClient
    .from('tasks')
    .update(task)
    .match({ id: task.id })
}
