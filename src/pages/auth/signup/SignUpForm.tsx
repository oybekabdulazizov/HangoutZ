import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import DatePicker from 'react-datepicker';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router';
import Cookies from 'js-cookie';

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
import { signupInitialValues } from '@/lib/constants';
import { signupFormSchema } from '@/lib/schemas';
import { calendarIcon } from '@/assets/icons';

const SignUpForm: FC = ({}) => {
  const [signUp] = useSignUpMutation();
  const navigate = useNavigate();
  const location = useLocation();

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
      Cookies.set('sessionToken', res.sessionToken, {
        expires: new Date(res.sessionTokenExpiresAt),
      });
      Cookies.set('refreshToken', res.refreshToken, {
        expires: new Date(res.refreshTokenExpiresAt),
      });
      Cookies.set('user', JSON.stringify(res.user), {
        expires: new Date(res.refreshTokenExpiresAt),
      });
      navigate(location.state.from || '/');
    } catch (err: any) {
      if (err.data.message === 'Email taken') {
        form.setError('email', { type: 'custom', message: err.data.message });
      } else {
        toast.error('Error occurred in Sign Up page', {
          icon: '❌',
        });
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
          <Button type='submit' className='button'>
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SignUpForm;
