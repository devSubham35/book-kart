"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PAGE_PATHS } from "@/routes/pagePaths";
import { Card, CardContent } from "@/components/ui/card";
import {
  BookOpen,
  DollarSign,
  Headphones,
  ShieldCheck,
  ShoppingCart,
  Star,
  Truck,
} from "lucide-react";
import SellBookUI from "@/modules/sell-book/pages/SellBookUI";

// Configs for "How It Works"
const howItWorks = [
  {
    icon: BookOpen,
    title: "Browse Books",
    description: "Explore our wide collection of new & pre-loved books.",
  },
  {
    icon: ShoppingCart,
    title: "Easy Purchase",
    description: "Add books to cart, checkout securely, and enjoy reading.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Get books delivered to your doorstep in just a few days.",
  },
  {
    icon: DollarSign,
    title: "Sell Your Books",
    description: "List your used books, set your price, and get paid quickly.",
  },
];

// Configs for "Why Choose Us"
const whyChooseUs = [
  {
    icon: Star,
    title: "Wide Selection",
    description: "From bestsellers to rare finds, we’ve got books for everyone.",
  },
  {
    icon: ShieldCheck,
    title: "Trusted Platform",
    description: "Secure payments, verified sellers, and reliable service.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Our friendly team is always here to help you out.",
  },
];

export default function Home() {
  return (
    <div className="relative flex flex-col min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Hero Section */}
      <main className="z-50 min-h-[70vh] flex flex-col items-center justify-center flex-1 text-center px-6 py-20">
        <h1 className="text-4xl md:text-6xl font-bold">
          Buy & Sell Books <br /> Anytime, Anywhere
        </h1>
        <p className="text-lg text-muted-foreground mt-4 max-w-xl">
          Discover thousands of books at unbeatable prices. Sell your old books,
          buy new ones, and enjoy reading made simple.
        </p>
        <div className="flex gap-4 mt-6">
          <Link href={PAGE_PATHS.books}>
            <Button className="text-base py-5">Start Shopping</Button>
          </Link>
          <SellBookUI variant="outline" className="text-base py-5" />
        </div>

        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage: `
              repeating-linear-gradient(45deg, rgba(0, 0, 0, 0.1) 0, rgba(0, 0, 0, 0.1) 1px, transparent 1px, transparent 20px),
              repeating-linear-gradient(-45deg, rgba(0, 0, 0, 0.1) 0, rgba(0, 0, 0, 0.1) 1px, transparent 1px, transparent 20px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
      </main>

      {/* How It Works Section */}
      <section className="py-16 px-6 bg-muted/20">
        <h2 className="text-3xl font-bold text-center">How It Works</h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mt-3 mb-10">
          Buying or selling books has never been easier. Follow these simple
          steps and get started in just minutes.
        </p>
        <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {howItWorks.map(({ icon: Icon, title, description }) => (
            <Card key={title} className="p-6 shadow-none z-50">
              <CardContent className="flex flex-col items-center text-center gap-3">
                <Icon className="w-10 h-10 text-primary" />
                <h3 className="font-semibold text-lg">{title}</h3>
                <p className="text-sm text-muted-foreground">{description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 px-6 text-center">
        <h2 className="text-3xl font-bold">Why Choose Us</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mt-3 mb-10">
          We combine a passion for books with the latest technology to make your
          reading journey seamless, affordable, and trustworthy.
        </p>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {whyChooseUs.map(({ icon: Icon, title, description }) => (
            <Card key={title} className="p-6 shadow-none z-50">
              <CardContent className="flex flex-col items-center gap-3">
                <Icon className="w-10 h-10 text-primary" />
                <h3 className="font-semibold text-lg">{title}</h3>
                <p className="text-sm text-muted-foreground">{description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* About Us & Contact Us Section */}
      <section className="py-16 px-6 bg-background">
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* About Us */}
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold">About Us</h2>
            <p className="text-muted-foreground mt-3 mb-6">
              We’re more than just a bookstore — we’re a community of book lovers
              dedicated to making reading accessible for all.
            </p>
            <p className="text-muted-foreground text-lg">
              Our platform connects readers and sellers, ensuring that every book
              finds a new home. Whether you’re buying or selling, we make it simple,
              affordable, and enjoyable.
            </p>
          </div>

          {/* Contact Us */}
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
            <p className="text-muted-foreground mb-6">
              Have questions? We’d love to hear from you.
            </p>
            <form className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border rounded-lg p-3"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full border rounded-lg p-3"
              />
              <textarea
                placeholder="Your Message"
                className="w-full border rounded-lg p-3 h-32"
              />
              <Button className="px-6 w-fit">Send Message</Button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="p-6 text-center text-sm text-muted-foreground border-t bg-background">
        © {new Date().getFullYear()} Bookify. All rights reserved.
      </footer>
    </div>
  );
}
