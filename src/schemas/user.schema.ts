import { z } from "zod";

const passwordSchema = z.string().refine(password => {
    if (password.length < 8) return false;
    if (!/[A-Z]/.test(password)) return false;
    if (!/[a-z]/.test(password)) return false;
    if (!/\d/.test(password)) return false;
    if (!/[^A-Za-z0-9]/.test(password)) return false;

    return true;
}, {
    message: 'The password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.'
});

export const userRegisterSchema = z.object({
    username: z.string().min(6).max(255),
    password: passwordSchema,
    email: z.string().email()
})

export const userUpdateSchema = z.object({
    username: z.string().min(6).max(255),
    password: passwordSchema,
    email: z.string().email(),
    role: z.string()
})

export const loginSchema = userRegisterSchema.omit({
    username: true
});