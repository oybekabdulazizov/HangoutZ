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
import useTokens from '@/hooks/useTokens';
import { useResetPasswordMutation } from '@/store';
import { resetPasswordInitialValues } from '@/lib/constants';
import { resetPasswordFormSchema } from '@/lib/schemas';
import toast from 'react-hot-toast';

const ResetPasswordForm: FC = ({}) => {
  const [resetPassword] = useResetPasswordMutation();
  const { removeTokens } = useTokens();

  const form = useForm<z.infer<typeof resetPasswordFormSchema>>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: resetPasswordInitialValues,
  });

  const onSubmit = async (values: z.infer<typeof resetPasswordFormSchema>) => {
    try {
      await resetPassword(values).unwrap();
      form.reset();
      removeTokens('session-token');
      removeTokens('refresh-token');
      removeTokens('user');
    } catch (err: any) {
      toast.error('Error occurred in Reset Password page', {
        icon: '❌',
      });
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
          className='flex flex-col gap-4'
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
                    className='input-field px-4'
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
                    className='input-field px-4'
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
                    className='input-field px-4'
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
                    className='input-field px-4'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' className='button'>
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ResetPasswordForm;
