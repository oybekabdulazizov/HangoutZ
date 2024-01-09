import * as z from 'zod';

const loginFormSchema = z.object({
  email: z.string().trim().email('Please provide a valid email'),
  password: z
    .string()
    .trim()
    .min(8, 'Password must be at least 8 characters')
    .max(64, 'Password cannot be longer that 64 characters'),
});

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

const signupFormSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, 'Name must be at least 2 characters')
      .max(100, 'Name cannot be longer than 100 characters'),
    lastname: z
      .string()
      .trim()
      .min(2, 'Lastname must be at least 2 characters')
      .max(100, 'Lastname cannot be longer than 100 characters'),
    email: z.string().trim().email('Please provide a valid email'),
    dateOfBirth: z.string().trim().min(10, 'Date of birth is required'),
    password: z
      .string()
      .trim()
      .min(8, 'Password must be at least 8 characters')
      .max(64, 'Password cannot be longer that 64 characters'),
    passwordConfirmation: z
      .string()
      .trim()
      .min(8, 'Password must be at least 8 characters')
      .max(64, 'Password cannot be longer that 64 characters'),
  })
  .refine((values) => values.password === values.passwordConfirmation, {
    path: ['passwordConfirmation'],
    message: 'Password and its confirmation must match',
  });

export { loginFormSchema, resetPasswordFormSchema, signupFormSchema };
