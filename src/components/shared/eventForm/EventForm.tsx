import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import DatePicker from 'react-datepicker';
import toast from 'react-hot-toast';

import 'react-datepicker/dist/react-datepicker.css';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { eventSchema } from '@/lib/schemas';
import { newEventInitialValues } from '@/lib/constants';
import { uploadImage } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import CategoryDropdown from '@/components/shared/categoryDropdown/CategoryDropdown';
import { Textarea } from '@/components/ui/textarea';
import FileUploader from '@/components/shared/fileUploader/FileUploader';
import AddressAutoFill from '@/components/shared/addressAutoFill/AddressAutoFill';
import { calendarIcon, urlIcon } from '@/assets/icons';
import { Button } from '@/components/ui/button';
import IEventForm from './IEventForm';
import { useNavigate } from 'react-router';

const EventForm: React.FC<IEventForm> = ({ event, actionType }) => {
  const { axiosPrivate } = useAxiosPrivate();
  const [files, setFiles] = useState<File[]>([]);
  const [location, setLocation] = useState<string>(event?.location || '');
  const navigate = useNavigate();

  const defaultValues: typeof newEventInitialValues = event
    ? {
        title: event.title,
        description: event.description,
        location: event.location,
        category: event.category.id,
        startDateTime: new Date(event.startDateTime),
        finishDateTime: new Date(event.finishDateTime),
        url: event.url || '',
        thumbnailUrl: event.thumbnailUrl || '',
      }
    : newEventInitialValues;

  const form = useForm<z.infer<typeof eventSchema>>({
    resolver: zodResolver(eventSchema),
    defaultValues: defaultValues,
  });

  const onSubmit = async (values: z.infer<typeof eventSchema>) => {
    const { startDateTime, finishDateTime } = values;
    startDateTime.setMinutes(
      startDateTime.getMinutes() - startDateTime.getTimezoneOffset()
    );
    finishDateTime.setMinutes(
      finishDateTime.getMinutes() - finishDateTime.getTimezoneOffset()
    );
    const thumbnailUrl =
      files && files.length > 0
        ? await uploadImage(files)
        : values.thumbnailUrl;
    const eventToBeSaved = {
      ...values,
      thumbnailUrl,
      location,
      startDateTime: startDateTime.toISOString(),
      finishDateTime: finishDateTime.toISOString(),
    };
    try {
      console.log(eventToBeSaved);
      const res = event
        ? await axiosPrivate.put(`/events/${event.id}`, eventToBeSaved)
        : await axiosPrivate.post('/events', eventToBeSaved);
      console.log(res);
      if (res.status === 201) form.reset();
    } catch (err: any) {
      if (err.response && err.response.status === 401) {
        toast.error('Please log in to proceed', {
          icon: '❌',
        });
        navigate('/log-in', { state: { from: location }, replace: true });
      } else {
        toast.error('Error occurred while saving the event', {
          icon: '❌',
        });
      }
      console.log(err);
    }
  };

  useEffect(() => {
    if (location) form.setValue('location', location);
  }, [location]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col gap-4'
      >
        <div className='flex flex-col gap-4 md:flex-row'>
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
                  <CategoryDropdown
                    value={field.value}
                    onChangeHandler={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='flex flex-col gap-4 md:flex-row'>
          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormControl>
                  <Textarea
                    placeholder='Description'
                    {...field}
                    className='textarea rounded-xl h-72 resize-none'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='thumbnailUrl'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormControl>
                  <FileUploader
                    thumbnailUrl={field.value}
                    onChangeHandler={field.onChange}
                    setFiles={setFiles}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name='location'
          render={({ field }) => {
            return (
              <FormItem className='w-full'>
                <FormControl>
                  <AddressAutoFill field={field} setLocation={setLocation} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <div className='flex flex-col gap-4 md:flex-row'>
          <FormField
            control={form.control}
            name='startDateTime'
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
                  <div className='flex justify-center items-center h-[54px] w-full overflow-hidden rounded-xl bg-primary-50  px-4 py-2'>
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
                  <div className='flex justify-center items-center h-[54px] w-full overflow-hidden rounded-xl bg-primary-50  px-4 py-2'>
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

        <Button
          type='submit'
          className='button col-span-2 w-full'
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <>{actionType === 'create' ? 'Creating...' : 'Saving...'}</>
          ) : (
            <>{actionType === 'create' ? 'Create' : 'Save'}</>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default EventForm;
