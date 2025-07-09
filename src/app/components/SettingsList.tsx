import { TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SettingsList() {
  return (
    <TabsList className="flex flex-col bg-muted p-2 gap-2 min-w-[160px] shrink-0">
      <TabsTrigger
        value="aiBehavior"
        className="w-full py-2 ring-none justify-start flex-0 cursor-pointer"
      >
        AI Behavior
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
  );
}
