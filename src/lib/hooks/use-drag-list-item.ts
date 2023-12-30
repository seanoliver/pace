import { useCallback, useEffect, useRef, useState } from "react";
import { Task } from "../types";

const useTaskListItem = (currentTask: Task) => {
  const [task, setTask] = useState(currentTask); // Current task
  const [isEditing, setIsEditing] = useState(false); // Toggle between "editing" and "display" mode
  const [isDragging, setIsDragging] = useState(false); // Used to distinguish between dragging and clicking
  const [taskTitle, setTaskTitle] = useState(task.title); // Controlled input value for task title

  const dragTimeoutRef = useRef<NodeJS.Timeout>();
  const inputRef = useRef<HTMLInputElement>(null);

  const dragDelay = 200; // ms

  // Save the new task title when the input is blurred
  const handleBlur = useCallback(() => {
    console.log("HANDLE BLUR, taskTitle: ", taskTitle);
    let updatedTask = { ...task, title: taskTitle };

    setIsEditing(false);
    setTask(updatedTask);
    // upsertTask(updatedTask);
  }, [taskTitle]);

  // Set isEditing to true when text is clicked (not dragged)
  const handleTextClick = () => {
    if (!isDragging) setIsEditing(true);
  };

  // Callback to initialize dragging
  const initDrag = () => setIsDragging(true);

  // Set timeout to initialize dragging after dragDelay ms
  const handleMouseDown = useCallback(
    (event: React.MouseEvent) => {
      dragTimeoutRef.current = setTimeout(initDrag, dragDelay);
    },
    [initDrag, dragDelay]
  );

  // Clear timeout and end dragging; if not dragging, handle text click
  const handleMouseUp = useCallback(() => {
    clearTimeout(dragTimeoutRef.current);
    if (!isDragging) handleTextClick();
    setIsDragging(false);
  }, [isDragging, handleTextClick]);

  // Control the task title state whenever the input value changes
  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setTaskTitle(event.target.value);

  const handleDurationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    task.duration = parseInt(event.target.value, 10);
  };

  // Toggle task status between "todo" and "done"
  // TODO: Support 'doing' status
  const toggleCompleted = () => {
    let updatedTask = { ...task };

    if (task.status === "todo") {
      updatedTask.status = "done";
			updatedTask.completed_at = ((new Date()).toISOString()).toLocaleString()
    } else {
      updatedTask.status = "todo";
    }

    setTask(updatedTask);
    // updateTask(updatedTask);
  };

  // Clean up the timeout when the component unmounts
  useEffect(() => {
    return () => {
      if (dragTimeoutRef.current) {
        clearTimeout(dragTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isEditing) {
      // Focus on the next tick
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [isEditing]);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  return {
    isEditing,
    isDragging,
    taskTitle,
    inputRef,
    handleBlur,
    handleTextClick,
    handleMouseDown,
    handleMouseUp,
    handleTextChange,
    handleDurationChange,
    toggleCompleted,
  };
};

export default useTaskListItem;
