import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { auth } from '@/lib/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import type { User } from 'firebase/auth';

const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be atleast 2 characters"
    }),
    email: z.string().email({
        message: "Invalid email address"
    }),
    password: z.string().min(8, {message: "Password must be atleast 8 characters"}),
    role: z.enum(["CUSTOMER"])
})

const SignupForm = () => {
    const [user, setUser] = useState<User | null>(null);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            role: "CUSTOMER"
        }
    })

    const handleSubmit = async (values: z.infer<typeof formSchema>) => {
        await createUserWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredential) => {
            setUser(userCredential.user)
            console.log(userCredential);
        })
        .catch((error) => {
            console.error(error.message);
        })
        console.log(user);
        console.log(values);
    }
    
    return(
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                    <FormField
                        control={form.control}
                        name='username'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username :</FormLabel>
                                <FormControl>
                                    <Input type='text' placeholder='username' {...field}/>
                                </FormControl>
                                <FormDescription>
                                    Your Username
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='email'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>email :</FormLabel>
                                <FormControl>
                                    <Input type='email' placeholder='your@mail.com' {...field}/>
                                </FormControl>
                                <FormDescription>
                                    Your email
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='password'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password :</FormLabel>
                                <FormControl>
                                    <Input type='password' placeholder='password' {...field}/>
                                </FormControl>
                                <FormDescription>
                                    Your Username
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type='submit'>Submit</Button>
                </form>
            </Form>
        </>
    )
}

export default SignupForm