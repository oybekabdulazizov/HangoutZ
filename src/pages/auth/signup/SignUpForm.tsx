import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import DatePicker from 'react-datepicker';

import calendarIcon from '@/assets/icons/calendar.svg';

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
      const dateOfBirthStr = values.dateOfBirth.toISOString();
      const newUser = {
        ...values,
        dateOfBirth: dateOfBirthStr.substring(0, dateOfBirthStr.indexOf('T')),
      };
      const res = await signUp(newUser).unwrap();
      if (res.status !== 400) form.reset();
      setTokens('session-token', res.sessionToken, {
        expires: new Date(res.sessionTokenExpiresAt),
      });
      setTokens('refresh-token', res.refreshToken, {
        expires: new Date(res.refreshTokenExpiresAt),
      });
    } catch (err: any) {
      if (err.data.message === 'Email taken') {
        form.setError('email', { type: 'custom', message: err.data.message });
      } else {
        console.log(err);
      }
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
              <FormItem className='w-full'>
                <FormControl>
                  <div className='flex justify-center items-center h-[54px] w-full overflow-hidden rounded-xl bg-primary-50  px-4 py-2'>
                    <img
                      src={calendarIcon}
                      alt='calendar-icon'
                      width={24}
                      height={24}
                      className='filter-grey'
                    />
                    <p className='ml-2 whitespace-nowrap text-grey-600'>
                      Date of Birth:
                    </p>
                    <DatePicker
                      selected={field.value}
                      onChange={(date: Date) => field.onChange(date)}
                      dateFormat={'yyyy-MM-dd'}
                      wrapperClassName='datePicker'
                    />
                  </div>
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
