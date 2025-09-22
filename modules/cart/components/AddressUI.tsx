
import Image from "next/image";
import AddressForm from "./AddressForm";
import React, { useState } from "react";
import { HiPlus } from "react-icons/hi";
import { Edit, Trash } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
    DropdownMenu, DropdownMenuTrigger,
    DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";


interface Address {
    id: number;
    name: string;
    phoneNumber: string;
    flatHouse: string;
    area: string;
    landmark: string;
}

const AddressUI = () => {

    const [addresses, setAddresses] = useState<Address[]>([
        {
            id: 1,
            name: "John Doe",
            phoneNumber: "9876543210",
            flatHouse: "B-123",
            area: "Sector 5",
            landmark: "Near Park",
        },
        {
            id: 2,
            name: "Jane Smith",
            phoneNumber: "9988776655",
            flatHouse: "A-101",
            area: "Sector 9",
            landmark: "Opposite Mall",
        },
    ]);

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedAddress, setSelectedAddress] = useState<Address | null>(addresses[0]);

    const handleModalOpen = () => {
        setIsModalOpen(true)
    }
    const handleModalClose = () => {
        setIsModalOpen(false)
    }


    const handleAddressSelect = (value: string) => {
        const selected = addresses.find((address) => address.id.toString() === value);
        if (selected) {
            setSelectedAddress(selected);
        }
    };

    const handleDelete = (id: number) => {
        setAddresses(addresses.filter((address) => address.id !== id));
    };

    const handleEdit = (id: number) => {
        const updatedAddresses = addresses.map((address) =>
            address.id === id
                ? { ...address, name: "Updated Name" } // Example: update name
                : address
        );
        setAddresses(updatedAddresses);
    };

    return (
        <div className="p-6 border rounded-lg">
            <h1 className="text-lg font-semibold mb-4">Select Your Address</h1>
            <RadioGroup
                onValueChange={handleAddressSelect}
                value={selectedAddress ? String(selectedAddress.id) : ""}
                className="space-y-0 flex flex-col gap-3"
            >
                {addresses.map((address) => (
                    <div
                        key={address.id}
                        className={`flex items-center gap-3 border rounded-lg p-4 py-3 cursor-pointer
                ${selectedAddress?.id === address.id ? "bg-muted" : ""}`}
                        onClick={() => handleAddressSelect(String(address.id))}
                    >
                        <RadioGroupItem
                            value={String(address.id)}
                            id={`address-${address.id}`}
                            checked={selectedAddress?.id === address.id}
                            onChange={() => handleAddressSelect(String(address.id))}
                        />
                        <div className="flex-grow cursor-pointer">
                            <h1 className="mb-1">{address.name}</h1>
                            <Label htmlFor={`address-${address.id}`}>
                                {address.flatHouse}, {address.area}, {address.landmark}
                            </Label>
                        </div>

                        {/* Three-dot menu */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="p-1">
                                    <span className="text-lg">•••</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleEdit(address.id)}>
                                    <Edit className="mr-2" /> Edit
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => handleDelete(address.id)}>
                                    <Trash className="mr-2" /> Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                ))}
            </RadioGroup>


            <Button onClick={handleModalOpen} className="w-full mt-3">
                <HiPlus />
                Add New Address
            </Button>

            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="!max-w-3xl w-full p-0">
                    {/* Container for image and form */}
                    <div className="w-full h-[450px] flex flex-col md:flex-row gap-2">

                        {/* Image Section */}
                        <div className="w-full md:w-1/2 h-full overflow-hidden rounded-lg">
                            <Image
                                width={500}
                                height={500}
                                alt="gmap"
                                src="/images/gmap.png"
                                className="object-cover w-full h-full"
                            />
                        </div>

                        {/* Address Form Section */}
                        <div className="w-full md:w-1/2 h-full overflow-y-auto scrollbar-hidden">
                            <AddressForm onClose={handleModalClose} />
                        </div>

                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AddressUI;
