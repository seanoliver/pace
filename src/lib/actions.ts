import { Task } from "./types";
import { supabaseClient } from "./hooks/use-supabase-browser";

export const createTask = async (task: Partial<Task>) => {
  console.log('CREATE TASK, task: ', task)
  const { data, error } = await supabaseClient.from("tasks").insert([task]);
  if (error) {
    throw error;
  }
  return data;
}

export const updateTask = async (task: Task) => {
  const { data, error } = await supabaseClient.from("tasks").update(task).match({ id: task.id });
  if (error) {
    throw error;
  }
  return data;
}

export const deleteTask = async (id: string) => {
  const { data, error } = await supabaseClient.from("tasks").delete().match({ id });
  if (error) {
    throw error;
  }
  return data;
}

export const getTasks = async () => {
  const { data, error } = await supabaseClient.from("tasks").select("*");
  if (error) {
    throw error;
  }
  return data;
}

export const upsertTask = async (task: Task) => {
  console.log('UPSERT TASK, task: ', task)
  if (task.id) {
    console.log('UPDATE TASK')
    return await updateTask(task);
  }
  console.log('CREATE TASK')
  return await createTask(task);
}