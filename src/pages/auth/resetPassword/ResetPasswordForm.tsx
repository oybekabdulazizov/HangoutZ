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
import useTokens from '@/pages/hooks/useTokens';
import { useResetPasswordMutation } from '@/store';

const resetPasswordFormSchema = z
  .object({
    email: z.string().trim().email('Please provide a valid email'),
    oldPassword: z
      .string()
      .trim()
      .min(8, 'Password must be at least 8 characters')
      .max(64, 'Password cannot be longer that 64 characters'),
    newPassword: z
      .string()
      .trim()
      .min(8, 'New password must be between 8 and 64 characters')
      .max(64, 'New password must be between 8 and 64 characters'),
    confirmNewPassword: z
      .string()
      .trim()
      .min(8, 'New password must be between 8 and 64 characters')
      .max(64, 'New password must be between 8 and 64 characters'),
  })
  .refine((values) => values.newPassword === values.confirmNewPassword, {
    path: ['confirmNewPassword'],
    message: 'New password and its confirmation must match',
  });

const initialValues = {
  email: '',
  oldPassword: '',
  newPassword: '',
  confirmNewPassword: '',
};

const ResetPasswordForm: FC = ({}) => {
  const [resetPassword] = useResetPasswordMutation();
  const { removeTokens } = useTokens();

  const form = useForm<z.infer<typeof resetPasswordFormSchema>>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: initialValues,
  });

  const onSubmit = async (values: z.infer<typeof resetPasswordFormSchema>) => {
    try {
      await resetPassword(values).unwrap();
      form.reset();
      removeTokens('session-token');
      removeTokens('refresh-token');
    } catch (err: any) {
      console.log('caught error: ');
      console.log(err);
      return;
    }
    form.reset();
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
            name='oldPassword'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder='Old password'
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
            name='newPassword'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder='New password'
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
            name='confirmNewPassword'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder='New password confirmation'
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

export default ResetPasswordForm;
