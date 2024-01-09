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
import { useLogInMutation } from '@/store';
import useTokens from '@/hooks/useTokens';
import { loginFormSchema } from '@/lib/schemas/authSchemas';
import { loginInitialValue } from '@/lib/constants';

const LogInForm: FC = ({}) => {
  const [logIn] = useLogInMutation();
  const { setTokens } = useTokens();

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: loginInitialValue,
  });

  const onSubmit = async (values: z.infer<typeof loginFormSchema>) => {
    try {
      const res = await logIn(values).unwrap();
      if (res.status !== 400) form.reset();
      setTokens('session-token', res.sessionToken, {
        expires: new Date(res.sessionTokenExpiresAt),
      });
      setTokens('refresh-token', res.refreshToken, {
        expires: new Date(res.refreshTokenExpiresAt),
      });
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
          <Button type='submit' className='rounded-xl'>
            Log in
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default LogInForm;
