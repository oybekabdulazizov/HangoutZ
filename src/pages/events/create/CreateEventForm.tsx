import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import calendarIcon from '@/assets/icons/calendar.svg';
import urlIcon from '@/assets/icons/link.svg';
import locationIcon from '@/assets/icons/location-grey.svg';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { newEventInitialValues } from '@/lib/constants';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useCreateEventMutation } from '@/store';
import { Textarea } from '@/components/ui/textarea';
import { axiosPrivate } from '@/lib/api/axiosApi';
import { eventSchema } from '@/lib/schemas';

const CreateEventForm: FC = ({}) => {
  const [createEvent] = useCreateEventMutation();

  const form = useForm<z.infer<typeof eventSchema>>({
    resolver: zodResolver(eventSchema),
    defaultValues: newEventInitialValues,
  });

  const onSubmit = async (values: z.infer<typeof eventSchema>) => {
    const newEvent = {
      ...values,
      startDateTime: values.startDateTime.toISOString(),
      finishDateTime: values.finishDateTime.toISOString(),
    };
    try {
      const res = await axiosPrivate.post('/events', newEvent);
      if (res.status === 201) form.reset();
      console.log(res);
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col gap-3'
      >
        <div className='flex flex-col gap-3 md:flex-row'>
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormControl>
                  <Input
                    placeholder='Title'
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
            name='category'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormControl>
                  <Input
                    placeholder='Category'
                    {...field}
                    className='input-field px-4'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='flex flex-col md:flex-row'>
          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormControl>
                  <Textarea
                    placeholder='Description'
                    {...field}
                    className='textarea rounded-xl'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='flex flex-col md:flex-row'>
          <FormField
            control={form.control}
            name='location'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormControl>
                  <div className='flex justify-center items-center h-[54px] w-full overflow-hidden rounded-xl bg-grey-50 px-4'>
                    <img
                      src={locationIcon}
                      alt='location-icon'
                      width={24}
                      height={24}
                    />
                    <Input
                      placeholder='Location'
                      {...field}
                      className='input-field px-2'
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='flex flex-col gap-3 md:flex-row'>
          <FormField
            control={form.control}
            name='startDateTime'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormControl>
                  <div className='flex justify-center items-center h-[54px] w-full overflow-hidden rounded-xl bg-grey-50 px-4 py-2'>
                    <img
                      src={calendarIcon}
                      alt='calendar-icon'
                      width={24}
                      height={24}
                      className='filter-grey'
                    />
                    <p className='ml-2 whitespace-nowrap text-grey-600'>
                      Start Date:
                    </p>
                    <DatePicker
                      selected={field.value}
                      onChange={(date: Date) => field.onChange(date)}
                      showTimeSelect
                      timeInputLabel='Time'
                      dateFormat={'yyyy-MM-dd HH:mm'}
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
            name='finishDateTime'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormControl>
                  <div className='flex justify-center items-center h-[54px] w-full overflow-hidden rounded-xl bg-grey-50 px-4 py-2'>
                    <img
                      src={calendarIcon}
                      alt='calendar-icon'
                      width={24}
                      height={24}
                      className='filter-grey'
                    />
                    <p className='ml-2 whitespace-nowrap text-grey-600'>
                      Finish Date:
                    </p>
                    <DatePicker
                      selected={field.value}
                      onChange={(date: Date) => field.onChange(date)}
                      showTimeSelect
                      timeInputLabel='Time:'
                      dateFormat={'yyyy-MM-dd HH:mm'}
                      wrapperClassName='datePicker'
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='flex flex-col md:flex-row'>
          <FormField
            control={form.control}
            name='url'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormControl>
                  <div className='flex justify-center items-center h-[54px] w-full overflow-hidden rounded-xl bg-grey-50 px-4 py-2'>
                    <img
                      src={urlIcon}
                      alt='url-icon'
                      width={24}
                      height={24}
                      className='filter-grey'
                    />
                    <Input
                      placeholder='URL'
                      {...field}
                      className='input-field px-2'
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type='submit' className='button col-span-2 w-full'>
          Create
        </Button>
      </form>
    </Form>
  );
};

export default CreateEventForm;
