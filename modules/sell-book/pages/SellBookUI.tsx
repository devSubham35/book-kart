"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import SellerForm from "../components/SellerForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface SellBookUIProps extends React.ComponentProps<typeof Button> {
  className?: string;
}

export default function SellBookUI({ className, ...props }: SellBookUIProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={className} {...props}>
          Sell Books
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Sell a Book</DialogTitle>
        </DialogHeader>
        <SellerForm />
      </DialogContent>
    </Dialog>
  );
}
