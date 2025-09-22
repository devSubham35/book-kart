"use client";

import { z } from "zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PAGE_PATHS } from "@/routes/pagePaths";
import { loginSchema } from "../schema/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@/components/ui/separator";
import SocialLogin from "@/components/global/SocialLogin";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Lock, BookOpen, Users } from "lucide-react";

const LoginUI = () => {
  const form = useForm<z.infer<typeof loginSchema>>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    console.log(data, "++66");
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gradient-to-b from-background to-muted px-4">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 border rounded-lg bg-card overflow-hidden shadow-lg">
        {/* Left Content */}
        <div className="hidden md:flex flex-col justify-center bg-muted/40 p-8 space-y-6">
          <h2 className="text-2xl font-bold">Welcome Back!</h2>
          <p className="text-sm text-muted-foreground">
            Log in to continue buying, selling, and sharing books with our community.
          </p>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Lock className="w-6 h-6 text-primary" />
              <div>
                <h3 className="font-semibold">Secure Login</h3>
                <p className="text-sm text-muted-foreground">
                  Your data is safe with encrypted login and secure sessions.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <BookOpen className="w-6 h-6 text-primary" />
              <div>
                <h3 className="font-semibold">Access Your Library</h3>
                <p className="text-sm text-muted-foreground">
                  Continue exploring books you saved or purchased earlier.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Users className="w-6 h-6 text-primary" />
              <div>
                <h3 className="font-semibold">Stay Connected</h3>
                <p className="text-sm text-muted-foreground">
                  Engage with readers and sellers from across the community.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Login Form */}
        <div className="flex flex-col items-center justify-center p-6">
          <div className="max-w-sm w-full">
            <div className="my-4 mb-6 text-center">
              <h1 className="text-xl font-bold">Welcome Back</h1>
              <p className="text-sm text-muted-foreground">
                Please login to buy or sell books.
              </p>
            </div>

            <SocialLogin />

            <div className="my-4 w-full flex items-center justify-center overflow-hidden">
              <Separator />
              <span className="text-sm px-2">OR</span>
              <Separator />
            </div>

            <Form {...form}>
              <form
                className="w-full space-y-3"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Email" {...field} />
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
                        <Input type="password" placeholder="Password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="mt-2 w-full">
                  Continue
                </Button>
              </form>
            </Form>

            <p className="mt-5 text-sm text-center">
              Don’t have an account?
              <Link href={PAGE_PATHS.register} className="ml-1 underline text-muted-foreground">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginUI;
