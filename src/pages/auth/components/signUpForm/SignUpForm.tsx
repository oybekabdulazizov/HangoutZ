import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useSignUpMutation } from '@/store';

const formSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, 'Name must be at least 2 characters')
      .max(100, 'Name cannot be longer than 100 characters'),
    lastname: z
      .string()
      .trim()
      .min(2, 'Lastname must be at least 2 characters')
      .max(100, 'Lastname cannot be longer than 100 characters'),
    email: z.string().trim().email('Please provide a valid email'),
    dateOfBirth: z.string().trim().min(16, 'Date of birth is required'),
    password: z
      .string()
      .trim()
      .min(8, 'Password must be at least 8 characters')
      .max(64, 'Password cannot be longer that 64 characters'),
    passwordConfirmation: z
      .string()
      .trim()
      .min(8, 'Password must be at least 8 characters')
      .max(64, 'Password cannot be longer that 64 characters'),
  })
  .refine((values) => values.password === values.passwordConfirmation, {
    path: ['passwordConfirmation'],
    message: 'Password and its confirmation must match',
  });

const initialValues = {
  name: '',
  lastname: '',
  email: '',
  dateOfBirth: '',
  password: '',
  passwordConfirmation: '',
};

const SignUpForm: FC = ({}) => {
  const [signUp] = useSignUpMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await signUp(values).unwrap();
      if (res.status !== 400) form.reset();
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <div className='w-full'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex flex-col gap-5'
        >
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder='Name'
                    {...field}
                    className='input-field'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='lastname'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder='Lastname'
                    {...field}
                    className='input-field'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder='Email'
                    {...field}
                    className='input-field'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='dateOfBirth'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder='Date of birth'
                    {...field}
                    className='input-field'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder='Password'
                    {...field}
                    className='input-field'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='passwordConfirmation'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder='Password confirmation'
                    {...field}
                    className='input-field'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' className='rounded-xl'>
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SignUpForm;
