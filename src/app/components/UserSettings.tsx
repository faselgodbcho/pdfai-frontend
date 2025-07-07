"use client";

import {
  DialogHeader,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

export default function UserSettings() {
  return (
    <DialogContent className="sm:max-w-[600px] sm:min-h-[400px] flex flex-col">
      <DialogHeader className="h-fit">
        <DialogTitle className="text-lg">Settings</DialogTitle>
        <Separator />
      </DialogHeader>

      <Tabs defaultValue="account" className="w-full flex flex-row flex-1">
        <TabsList className="flex flex-col bg-muted p-2 gap-2">
          <TabsTrigger
            value="aiBehavior"
            className="w-full py-2 ring-none justify-start flex-0 cursor-pointer"
          >
            AI Behavior
          </TabsTrigger>
          <TabsTrigger
            value="pdfPreferences"
            className="w-full py-2 ring-none justify-start flex-0 cursor-pointer"
          >
            PDF Preferences
          </TabsTrigger>
          <TabsTrigger
            value="dataControl"
            className="w-full py-2 ring-none justify-start flex-0 cursor-pointer"
          >
            Data Controls
          </TabsTrigger>
          <TabsTrigger
            value="accountSettings"
            className="w-full py-2 ring-none justify-start flex-0 cursor-pointer"
          >
            Account Settings
          </TabsTrigger>
        </TabsList>

        <div className="flex-1 p-3">
          <TabsContent value="aiBehavior" className="mt-4 flex-1 max-w-sm">
            <Card>
              <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Card Description</CardDescription>
                <CardAction>Card Action</CardAction>
              </CardHeader>
              <CardContent>
                <p>Card Content</p>
              </CardContent>
              <CardFooter>
                <p>Card Footer</p>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="pdfPreferences" className="mt-4">
            <div className="space-y-2 text-sm">
              <p>
                Clear chat history, export data, or delete your account
                permanently.
              </p>
              {/* Privacy settings go here */}
            </div>
          </TabsContent>
          <TabsContent value="accountSettings" className="mt-4">
            <div className="space-y-2 text-sm">
              <p>
                Clear chat history, export data, or delete your account
                permanently.
              </p>
              {/* Privacy settings go here */}
            </div>
          </TabsContent>
          <TabsContent value="dataControl" className="mt-4">
            <div className="space-y-2 text-sm">
              <p>
                Clear chat history, export data, or delete your account
                permanently.
              </p>
              {/* Privacy settings go here */}
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </DialogContent>
  );
}
