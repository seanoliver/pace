import { Task } from "@/lib/types";
import { createTask, deleteTask, getTasks, patchTask, updateTask } from "@/server/tasks";

export async function GET(req: Request) {
  const { data, error } = await getTasks();
  console.log ("data: ", data);
  if (error) {
    return new Response(JSON.stringify({ error }), { status: 400 });
  }
  return new Response(JSON.stringify(data), { status: 200 });
}

export async function HEAD(req: Request) {
  return new Response(null, { status: 200 });
}

export async function POST(req: Request) {
  const taskData = await req.json(); // Assuming the task data is in the request body
  const { data, error } = await createTask(taskData);
  if (error) {
    return new Response(JSON.stringify({ error }), { status: 400 });
  }
  return new Response(JSON.stringify(data), { status: 201 });
}

export async function PUT(req: Request) {
  const { id, data: reqData } = await req.json();
  const taskData: Task = { ...reqData, id };
  const { data, error } = await updateTask(taskData);
  if (error) {
    return new Response(JSON.stringify({ error }), { status: 400 });
  }
  return new Response(JSON.stringify(data), { status: 200 });
}

export async function DELETE(req: Request) {
  // Assuming you have a deleteTask function
  const { id } = await req.json();
  const { data, error } = await deleteTask(id);
  if (error) {
    return new Response(JSON.stringify({ error }), { status: 400 });
  }
  return new Response(JSON.stringify(data), { status: 200 });
}

export async function PATCH(req: Request) {
  // Assuming you have a patchTask function
  const { id, data: reqData } = await req.json();
  const taskData: Task = { ...reqData, id };
  const { data, error } = await patchTask(taskData);
  if (error) {
    return new Response(JSON.stringify({ error }), { status: 400 });
  }
  return new Response(JSON.stringify(data), { status: 200 });
}
