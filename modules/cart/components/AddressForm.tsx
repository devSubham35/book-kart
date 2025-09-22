"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IoCloseOutline } from "react-icons/io5";
import { zodResolver } from "@hookform/resolvers/zod";
import { addressFormSchema } from "../schema/addressForm.schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const AddressForm = ({ onClose }: { onClose?: ()=> void }) => {

    const form = useForm<z.infer<typeof addressFormSchema>>({
        defaultValues: {
            name: "",
            phoneNumber: "",
            flatHouse: "",
            area: "",
            landmark: "",
        },
        resolver: zodResolver(addressFormSchema),
    });

    const onSubmit = (data: z.infer<typeof addressFormSchema>) => {
        console.log("Form data: ", data);
        // You can handle the form submission logic here (e.g., saving the address)
    };

    return (
        <div className="flex flex-col items-center justify-center w-full relative px-3">
            <div className="max-w-sm w-full">

                <div className="w-full sticky top-0 left-0 py-4 bg-background z-10 flex items-center justify-between">
                   <h1>Enter Complete Address</h1>
                   <IoCloseOutline onClick={onClose} className="text-xl cursor-pointer" />
                </div>

                <Form {...form}>
                    <form
                        className="w-full space-y-3"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Your Name</FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="Your Name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="phoneNumber"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone Number</FormLabel>
                                    <FormControl>
                                        <Input type="tel" placeholder="Phone Number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="flatHouse"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Flat / House No.</FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="Flat / House No." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="area"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Area / Sector / Locality</FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="Area / Sector / Locality" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="landmark"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nearby Landmark (Optional)</FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="Nearby Landmark" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="mt-2 w-full sticky bottom-0 left-0 py-4 bg-background">
                            <Button type="submit" className="w-full">
                                Save Address
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default AddressForm;
