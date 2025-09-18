"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import SellerForm from "../components/SellerForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";


export default function SellBookUI() {

  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Sell Books</Button>
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
