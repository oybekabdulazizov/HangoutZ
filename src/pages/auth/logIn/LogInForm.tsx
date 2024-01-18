import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useLocation, useNavigate } from 'react-router';

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
import { loginInitialValue } from '@/lib/constants';
import { loginFormSchema } from '@/lib/schemas';
import toast from 'react-hot-toast';

const LogInForm: FC = ({}) => {
  const [logIn] = useLogInMutation();
  const { setTokens } = useTokens();
  const navigate = useNavigate();
  const location = useLocation();

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: loginInitialValue,
  });

  const onSubmit = async (values: z.infer<typeof loginFormSchema>) => {
    try {
      const res = await logIn(values).unwrap();
      if (res.status !== 400) form.reset();
      setTokens('sessionToken', res.sessionToken, {
        expires: new Date(res.sessionTokenExpiresAt),
      });
      setTokens('refreshToken', res.refreshToken, {
        expires: new Date(res.refreshTokenExpiresAt),
      });
      setTokens('user', res.user, {
        expires: new Date(res.refreshTokenExpiresAt),
      });
      navigate(location.state.from || '/');
    } catch (err: any) {
      toast.error('Error occurred in Log In page', {
        icon: '❌',
      });
      console.log(err);
    }
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
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder='Password'
                    {...field}
                    className='input-field px-4'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' className='button'>
            Log in
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default LogInForm;
