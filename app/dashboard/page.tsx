"use client";

import { Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Dashboard = () => {
  return (
    <div className="p-6 space-y-6 container">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        
      </div>

      <Separator />

      {/* Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Total Videos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <Video className="w-8 h-8 text-muted-foreground" />
              <p className="text-2xl font-semibold">12</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Storage Used</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">1.2 GB</p>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">5</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Videos */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Recent Videos</h2>
        <div className="border rounded-md divide-y">
          {["Video 1", "Video 2", "Video 3"].map((video, idx) => (
            <div
              key={idx}
              className="flex justify-between p-4 hover:bg-muted transition-colors"
            >
              <span>{video}</span>
              <Button variant="outline" size="sm">
                View
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
