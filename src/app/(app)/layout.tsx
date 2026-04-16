import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Layers } from "lucide-react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <Sidebar
        variant="sidebar"
        collapsible="icon"
        className="border-none bg-background"
      >
        <SidebarHeader className="truncate h-12 justify-center">
          Net Worth Tracker
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Layers />
                  Dashboard
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <div className="w-full">
        <header className="flex p-2 items-center gap-4">
          <SidebarTrigger size="icon" />
          <h1 className="font-bold">Dashboard</h1>
        </header>
        <div className="grid grid-cols-1 gap-4 p-2 md:grid-cols-[2fr_1fr]">
          {children}
        </div>
      </div>
    </SidebarProvider>
  );
}
