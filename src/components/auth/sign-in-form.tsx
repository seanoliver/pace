'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from "@/components/ui/use-toast";
import { supabaseClient } from '@/lib/hooks/use-supabase-browser';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const signInFormSchema = z
	.object({
		email: z.string().email({ message: 'Invalid email address' }),
		password: z
			.string()
			.min(8, { message: 'Password must be at least 8 characters' }),
	})

export default function SignInForm() {
  const { toast } = useToast()
  const router = useRouter()

	const signInForm = useForm<z.infer<typeof signInFormSchema>>({
		resolver: zodResolver(signInFormSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	async function onSubmit(data: z.infer<typeof signInFormSchema>) {
    const { data: userData, error } = await supabaseClient.auth.signInWithPassword({
      email: data.email,
      password: data.password
    })

    if (error) {
      toast({ title: "Error", description: error.message, variant: 'destructive' })
    } else {
      router.push('/') // TODO: Redirect to last page from which user was redirected to sign in
    }
	}

	const renderFormField = (
		name: keyof z.infer<typeof signInFormSchema>,
		label: string,
		type: string
	) => {
		return (
			<FormField
				control={signInForm.control}
				name={name}
				render={({ field }) => (
					<FormItem>
						<FormLabel>{label}</FormLabel>
						<FormControl>
							<Input
								type={type}
								{...field}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		);
	};

	return (
		<div className='w-1/3'>
			<Form {...signInForm}>
				<form
					onSubmit={signInForm.handleSubmit(onSubmit)}
          onError={errors => toast({ title: "Error", description: JSON.stringify(errors, null, 2), variant: 'destructive' })}
					className='space-y-8'>
					{renderFormField('email', 'Email', 'email')}
					{renderFormField('password', 'Password', 'password')}
					<Button type='submit'>Submit</Button>
				</form>
			</Form>
      <div className='flex justify-center'>
        <Button variant={'link'} onClick={() => router.push('/sign-up')}>Sign Up</Button>
      </div>
		</div>
	);
}
