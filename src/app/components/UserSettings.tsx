"use client";

import {
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useFetchWithAuth } from "@/app/hooks/useFetchWithAuth";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";
import SettingsList from "./SettingsList";
import AccountSettings from "./AccountSettings";
import DataControlSettings from "./DataControlSettings";

type ResponseLengthTypes = "short" | "medium" | "long";
type ResponseToneTypes = "formal" | "casual" | "neutral";

type UserSettings = {
  responseLength: ResponseLengthTypes;
  tone: ResponseToneTypes;
  contextMemory: boolean;
};

const keyMap: Record<keyof UserSettings, string> = {
  responseLength: "response_length",
  tone: "tone",
  contextMemory: "context_memory",
};

function convertToSnakeCase<K extends keyof UserSettings>(
  field: K,
  value: UserSettings[K]
) {
  return {
    [keyMap[field]]: value,
  };
}

function convertToCamelCase(data: Record<string, unknown>): UserSettings {
  return {
    responseLength: data["response_length"] as ResponseLengthTypes,
    tone: data["tone"] as ResponseToneTypes,
    contextMemory: data["context_memory"] as boolean,
  };
}

export default function UserSettings() {
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fetchWithAuth = useFetchWithAuth();
  const { accessToken } = useAuth();

  useEffect(() => {
    if (!accessToken) return;

    const fetchUserSettings = async () => {
      setIsLoading(true);

      try {
        const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
        const res = await fetchWithAuth(`${API_BASE_URL}/auth/user/settings/`);

        if (!res.ok) {
          throw new Error("Failed to load user settings");
        }

        const rawSettings = await res.json();
        const userSettings = convertToCamelCase(rawSettings);
        setSettings(userSettings);
      } catch (err) {
        console.error("Failed to fetch user settings", err);
        toast.error("Failed to load user settings");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserSettings();
  }, [accessToken]);

  const updateSetting = async (
    field: keyof UserSettings,
    value: UserSettings[keyof UserSettings]
  ) => {
    if (!settings) return;
    try {
      const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
      setSettings((prev) => {
        if (!prev) return prev;
        return { ...prev, [field]: value };
      });
      const payload = convertToSnakeCase(field, value);
      const res = await fetchWithAuth(`${API_BASE_URL}/auth/user/settings/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        throw new Error("Failed to update setting");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update setting");
    }
  };

  return (
    <DialogContent className="sm:max-w-[650px] sm:h-[500px] flex flex-col overflow-hidden">
      <DialogHeader className="shrink-0">
        <DialogTitle className="text-lg">Settings</DialogTitle>
        <Separator />
      </DialogHeader>
      <DialogDescription>
        Configure AI behavior, data controls, and account settings.
      </DialogDescription>

      <Tabs
        defaultValue="aiBehavior"
        className="w-full flex flex-row flex-1 overflow-hidden"
      >
        <SettingsList />

        <ScrollArea className="flex-1 px-5">
          {isLoading ? (
            <div className="p-6">Loading settings...</div>
          ) : (
            <>
              <TabsContent
                value="aiBehavior"
                className="mt-4 max-w-md space-y-6"
              >
                <Card className="shadow-none">
                  <CardHeader>
                    <CardTitle>Response Length</CardTitle>
                    <CardDescription>
                      Choose how long AI replies should be.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-4">
                      {["short", "medium", "long"].map((length) => (
                        <button
                          key={length}
                          onClick={() =>
                            updateSetting(
                              "responseLength",
                              length as ResponseLengthTypes
                            )
                          }
                          className={`px-4 py-2 rounded cursor-pointer ${
                            settings?.responseLength === length
                              ? "bg-primary text-white"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {length.charAt(0).toUpperCase() + length.slice(1)}
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-none">
                  <CardHeader>
                    <CardTitle>Tone</CardTitle>
                    <CardDescription>
                      Select the tone AI should use.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-4">
                      {["formal", "casual", "neutral"].map((t) => (
                        <button
                          key={t}
                          onClick={() =>
                            updateSetting("tone", t as ResponseToneTypes)
                          }
                          className={`px-4 py-2 rounded cursor-pointer ${
                            settings?.tone === t
                              ? "bg-primary text-white"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {t.charAt(0).toUpperCase() + t.slice(1)}
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-none">
                  <CardHeader>
                    <CardTitle>Context Memory</CardTitle>
                    <CardDescription>
                      Enable or disable context memory.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Switch
                      checked={settings?.contextMemory}
                      onCheckedChange={(val) =>
                        updateSetting("contextMemory", val)
                      }
                      aria-label="Context Memory Toggle"
                      className="cursor-pointer"
                    />
                  </CardContent>
                </Card>
              </TabsContent>
              <DataControlSettings />
              <AccountSettings />
            </>
          )}
        </ScrollArea>
      </Tabs>
    </DialogContent>
  );
}
