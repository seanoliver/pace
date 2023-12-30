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
import { Button } from './ui/button';
import { useEffect } from 'react';

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
    await fetch ('/api/tasks', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  const renderHiddenStatusField = () => {
    return (
      <FormField
        control={newTaskForm.control}
        name='status'
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input
                {...field}
                type='hidden'
                value={newTaskForm.getValues('status') || ''}
              />
            </FormControl>
          </FormItem>
        )}
      />
    )
  }

  const renderHiddenUserIdField = () => {
    if (!user) return null;

    return (
      <FormField
        control={newTaskForm.control}
        name='user_id'
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input
                {...field}
                type='hidden'
                value={user.id}
              />
            </FormControl>
          </FormItem>
        )}
      />
    )
  }

  // Update the user_id field if the user changes
  useEffect(() => {
    if (user) {
      newTaskForm.reset({
        title: '',
        user_id: user.id,
        status: 'todo',
      });
    }
  }, [user]);

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
          {renderHiddenStatusField()}
          {renderHiddenUserIdField()}
          <Button type='submit' disabled={!user}>Submit</Button>
        </form>
      </Form>
    </div>
  )
}