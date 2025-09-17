"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { FiUser, FiMail, FiPhone } from "react-icons/fi";
import { profileSchema } from "../../schema/profileForm.schema";


type ProfileFormValues = z.infer<typeof profileSchema>;

export default function ProfileForm() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: "Dheeraj Agr",
      email: "user@email.com",
      phone: "87087263566",
      address: "123, Green Park Colony, New Delhi",
    },
  });

  const onSubmit = (data: ProfileFormValues) => {
    console.log("Profile Submitted:", data);
  };

  return (
    <div className="p-6 border rounded-lg bg-accent/10">
      <h2 className="text-lg font-semibold mb-4">Personal Information</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Username */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your name"
                      startIcon={<FiUser className="w-4 h-4" />}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
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
                      startIcon={<FiMail className="w-4 h-4" />}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone (Full Width) */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="lg:col-span-2">
                  <FormLabel>Phone number</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="Enter phone number"
                      startIcon={<FiPhone className="w-4 h-4" />}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Address */}
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="lg:col-span-2">
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter your full address"
                      className="resize-none"
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
            >
              Discard Changes
            </Button>
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
