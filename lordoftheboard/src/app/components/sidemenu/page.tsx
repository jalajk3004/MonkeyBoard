"use client";

import { ChevronUp, Home, Search, User2 } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const router = useRouter();
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const storedUsername = sessionStorage.getItem("username");
    setUsername(storedUsername);
  }, [router]);

  const handleLogout = () => {
    sessionStorage.clear();
    router.replace("/auth");
  };

  return (
    <Sidebar collapsible="icon" variant="sidebar">
      <SidebarHeader className={`${state === "collapsed" ? "hidden" : ""}`}>
        Lord Of The Board
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent >
            <SidebarMenu >
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className="w-full">
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 transition">
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="px-2 py-2 border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="flex items-center gap-2 w-full px-3 py-2 rounded-md hover:bg-gray-100 transition">
                  <User2 className="w-5 h-5" />
                  <span>{username}</span>
                  <ChevronUp className="ml-auto w-4 h-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" align="end" className="w-44">
                <DropdownMenuItem>Account</DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="text-red-600 hover:bg-red-100">
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
