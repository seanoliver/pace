# Pace

# TODO

- [ ] Task + time entry
- [ ] Total routine time summation
- [ ] DB + Auth (Supabase)
- [ ] Scheduled Lists vs. Ad Hoc Lists (Timed and Untimed)
- [ ] Task Timer -> Record time spent on task (regardkess of estimated time)
- [ ] Componentize click to text entry
- [ ] Task headers (grouping tasks)
- [ ] Single task completion timer for item from list ("play" button)
- [ ] Zen Mode fullscreen timer view
- [ ] Drag tasks in and out of "stack" (stack = list of tasks to be completed)


``` ts
interface Task {
  id: string;
  name: string;
  description: string;
  estimated_time: number;
  completed: boolean;
  routine_id: string;
  routine_order: number;
  completed_at: Date;
  created_at: Date;
  updated_at: Date;
}
```

``` ts
interface Completion {
  id: string;
  task_id: string;
  started_at: Date;
  stopped_at: Date;
  task_completed: boolean;
  duration: number;
}
```