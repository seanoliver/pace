import { cookies } from "next/headers";
import { useSupabaseServerClient } from "./hooks/use-supabase-server";
import { Task } from "./types";

const supabase = useSupabaseServerClient(cookies());

export const createTask = async (task: Task) => {
  const { data, error } = await supabase.from("tasks").insert([task]);
  if (error) {
    throw error;
  }
  return data;
}

export const updateTask = async (task: Task) => {
  const { data, error } = await supabase.from("tasks").update(task).match({ id: task.id });
  if (error) {
    throw error;
  }
  return data;
}

export const deleteTask = async (id: string) => {
  const { data, error } = await supabase.from("tasks").delete().match({ id });
  if (error) {
    throw error;
  }
  return data;
}

export const getTasks = async () => {
  const { data, error } = await supabase.from("tasks").select("*");
  if (error) {
    throw error;
  }
  return data;
}