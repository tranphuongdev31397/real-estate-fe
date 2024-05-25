import * as z from 'zod'

const regexPhoneOrEmail =
  /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})|([0-9]{10})+$/

const phoneRegex = new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/)

export const signInSchema = z.object({
  phoneOrEmail: z
    .string({
      message: 'This field is required'
    })
    .refine((val) => regexPhoneOrEmail.test(val), 'Email or Phone  is not valid'),
  password: z
    .string({
      message: 'Password is required'
    })
    .min(6, 'Password at least 6 characters')
})

export const signUpSchema = z.object({
  email: z
    .string({
      message: 'This field is required'
    })
    .email('Email is not valid'),
  phone: z
    .string({
      message: 'This field is required'
    })
    .regex(phoneRegex, 'Phone is not valid'),
  password: z
    .string({
      message: 'Password is required'
    })
    .min(6, 'Password at least 6 characters')
})

export type SignInSchema = z.infer<typeof signInSchema>
export type SignUpSchema = z.infer<typeof signUpSchema>
