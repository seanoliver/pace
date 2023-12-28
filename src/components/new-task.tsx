import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';


const newTaskSchema = z.object({
  title: z.string().min(1),
  created_at: z.date().default(() => new Date()),
  user_id: z.string().uuid(),

});

export default function NewTask() {
  const newTaskForm = useForm<z.infer<typeof newTaskSchema>>({
    resolver: zodResolver(newTaskSchema),
    defaultValues: {
      title: '',
    },
  });
  return (
    <div>
      <h1>New Task</h1>
      <input type="text" placeholder="Task Name" />
    </div>
  )
}