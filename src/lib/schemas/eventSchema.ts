import * as z from 'zod';

export const eventSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, 'Title is required')
    .max(100, 'Title cannot be longer than 100 characters'),
  description: z
    .string()
    .trim()
    .min(1, 'Description is required')
    .max(500, 'Description cannot be longer than 500 characters'),
  location: z
    .string()
    .trim()
    .min(1, 'Location is required')
    .max(255, 'Location cannot be longer than 255 characters'),
  category: z
    .string()
    .trim()
    .min(1, 'Category is required')
    .max(100, 'Category cannot be longer than 100 characters'),
  startDateTime: z.date(),
  finishDateTime: z.date(),
  url: z
    .string()
    .trim()
    .url()
    .max(255, 'URL cannot be longer than 255 characters'),
});
