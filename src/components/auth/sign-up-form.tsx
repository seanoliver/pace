'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
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
import { useToast } from "@/components/ui/use-toast"

const signUpFormSchema = z
	.object({
		email: z.string().email({ message: 'Invalid email address' }),
		password: z
			.string()
			.min(8, { message: 'Password must be at least 8 characters' }),
		confirmPassword: z
			.string()
			.min(8, { message: 'Password must be at least 8 characters' }),
	})
	.refine(data => data.password === data.confirmPassword, {
		message: 'Passwords do not match',
		path: ['confirmPassword'],
	});

export default function SignUpForm() {
  const { toast } = useToast()

	const signUpForm = useForm<z.infer<typeof signUpFormSchema>>({
		resolver: zodResolver(signUpFormSchema),
		defaultValues: {
			email: '',
			password: '',
			confirmPassword: '',
		},
	});

	function onSubmit(data: z.infer<typeof signUpFormSchema>) {
		console.log('data', data);
    toast({
      title: "Account created.",
      description: `You've submitted this information\n\n ${JSON.stringify(data, null, 2)}`,
      variant: 'default'
    })
	}

	const renderFormField = (
		name: keyof z.infer<typeof signUpFormSchema>,
		label: string,
		type: string
	) => {
		return (
			<FormField
				control={signUpForm.control}
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
			<Form {...signUpForm}>
				<form
					onSubmit={signUpForm.handleSubmit(onSubmit)}
          onError={errors => toast({ title: "Error", description: JSON.stringify(errors, null, 2), variant: 'destructive' })}
					className='space-y-8'>
					{renderFormField('email', 'Email', 'email')}
					{renderFormField('password', 'Password', 'password')}
					{renderFormField('confirmPassword', 'Confirm Password', 'password')}
					<Button type='submit'>Submit</Button>
				</form>
			</Form>
		</div>
	);
}
