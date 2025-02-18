"use client";

import { usePathname } from "next/navigation";
import { SidebarProvider } from "@/components/ui/sidebar";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";

export function SidebarWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Define paths where the sidebar should be hidden
  const hiddenRoutes = ["/auth"];
  const shouldHideSidebar = hiddenRoutes.includes(pathname);

  return (
    <SidebarProvider>
        <div className="grid grid-cols-[auto,1fr] w-full ">
      {!shouldHideSidebar && <AppSidebar />}
      <main className="w-full min-h-screen flex overflow-auto  ">
        {!shouldHideSidebar && <SidebarTrigger />}
        {children}  
      </main>
      </div>
    </SidebarProvider>
  );
}
