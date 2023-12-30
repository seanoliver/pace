'use client';

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
import { usePaceStore } from '@/lib/store';
import { createTask } from '@/server/tasks';
import { Button } from './ui/button';

const newTaskSchema = z.object({
  title: z.string().min(1),
  user_id: z.string().uuid(),
  status: z.enum(["todo", "doing", "done"]),
});

export default function NewTask() {
  const { user } = usePaceStore((state) => ({ user: state.user }));
  const newTaskForm = useForm<z.infer<typeof newTaskSchema>>({
    resolver: zodResolver(newTaskSchema),
    defaultValues: {
      title: '',
      user_id: user?.id,
      status: 'todo',
    },
  });

  async function onSubmit(formData: z.infer<typeof newTaskSchema>) {
    console.log('NEW TASK ON SUBMIT', formData);
    await createTask(formData);
  }

  const renderHiddenFields = (fields: (keyof z.infer<typeof newTaskSchema>)[]) => {
    return (
      <>
        {fields.map(f => (
          <FormField
            key={f}
            control={newTaskForm.control}
            name={f}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type='hidden'
                    value={newTaskForm.getValues(f)}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        ))}
      </>
    )
  }

  return (
    <div>
      <Form {...newTaskForm}>
        <form onSubmit={newTaskForm.handleSubmit(onSubmit)}>
          <FormField
            control={newTaskForm.control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor={field.name}>Task Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type='text'
                    placeholder='Task Name'
                  />
                </FormControl>
                <FormMessage>
                  {newTaskForm.formState.errors.title?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          {renderHiddenFields(['user_id', 'status'])}
          <Button type='submit'>Submit</Button>
        </form>
      </Form>
    </div>
  )
}