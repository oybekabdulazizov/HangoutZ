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
import useTokens from '@/hooks/useTokens';
import { signupInitialValues } from '@/lib/constants';
import { signupFormSchema } from '@/lib/schemas';

const SignUpForm: FC = ({}) => {
  const [signUp] = useSignUpMutation();
  const { setTokens } = useTokens();

  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: signupInitialValues,
  });

  const onSubmit = async (values: z.infer<typeof signupFormSchema>) => {
    try {
      const res = await signUp(values).unwrap();
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
          className='flex flex-col gap-3'
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
                    className='input-field px-4'
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
                    className='input-field px-4'
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
                    className='input-field px-4'
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
          <FormField
            control={form.control}
            name='passwordConfirmation'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder='Password confirmation'
                    {...field}
                    className='input-field px-4'
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
