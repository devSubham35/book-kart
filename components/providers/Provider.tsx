"use client";

import { Toaster } from "sonner";
import { ReactNode } from "react";
import Navbar from "../global/Navbar";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function Provider({ children }: { children: ReactNode }) {
  return (
        <QueryClientProvider client={queryClient}>
          <ThemeProvider attribute="class">
            <main>
              <Navbar />
              <div className="min-h-[calc(100vh-64px)] scrollbar-hidden">{children}</div>
            </main>
          </ThemeProvider>
          <Toaster
            position="bottom-right"
            richColors
            toastOptions={{
              style: {
                background: "var(--card)",
                boxShadow: "var(--shadow-md)",
                color: "var(--card-foreground)",
                border: "1px solid var(--border)",
                fontFamily: "var(--font-outfit)",
              },
            }}
          />
        </QueryClientProvider>
  );
}
