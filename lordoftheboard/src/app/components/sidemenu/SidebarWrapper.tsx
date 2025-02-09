"use client";

import { usePathname } from "next/navigation";
import { SidebarProvider } from "@/components/ui/sidebar";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./page";

export function SidebarWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Define paths where the sidebar should be hidden
  const hiddenRoutes = ["/auth"];
  const shouldHideSidebar = hiddenRoutes.includes(pathname);

  return (
    <SidebarProvider>
      {!shouldHideSidebar && <AppSidebar />}
      <main className="w-full min-h-screen flex m-1">
        {!shouldHideSidebar && <SidebarTrigger />}
        {children}  
      </main>
    </SidebarProvider>
  );
}
