"use client";

import { z } from "zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PAGE_PATHS } from "@/routes/pagePaths";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@/components/ui/separator";
import SocialLogin from "@/components/global/SocialLogin";
import { registerSchema } from "../schema/register.schema";
import { useRegisterMutation } from "@/api/hook/auth/hook";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const RegisterUI = () => {

    const router = useRouter();
    const { mutate: registerMutation, isPending: isRegisterPending } = useRegisterMutation();

    const form = useForm<z.infer<typeof registerSchema>>({
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = (data: z.infer<typeof registerSchema>) => {
        registerMutation(data, {
            onSuccess: ()=> router.push(PAGE_PATHS.dashboard.root)
        })
    };

    return (
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
            <div className="max-w-sm w-full flex flex-col items-center border rounded-lg p-6 bg-card">
                <div className="my-4 mb-6 text-center">
                    <h1 className="text-xl font-bold">
                        Welcome
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Please register to upload and manage your videos.
                    </p>
                </div>


                <SocialLogin />

                <div className="my-7 w-full flex items-center justify-center overflow-hidden">
                    <Separator />
                    <span className="text-sm px-2">OR</span>
                    <Separator />
                </div>

                <Form {...form}>
                    <form
                        className="w-full space-y-4"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder="Email"
                                            className="w-full"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="Password"
                                            className="w-full"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="Confirm Password"
                                            className="w-full"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button loading={isRegisterPending} type="submit" className="mt-4 w-full">
                            Continue
                        </Button>
                    </form>
                </Form>
                <p className="mt-5 text-sm text-center">
                    Already have an account?
                    <Link href={PAGE_PATHS.login} className="ml-1 underline text-muted-foreground">
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterUI;
