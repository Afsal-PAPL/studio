import React from 'react';
import Link from 'next/link';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Bell, HelpCircle, Map, MapPin, BarChart3, Settings, LogOut } from 'lucide-react';

const Logo = () => (
    <div className="flex items-center gap-2 font-bold text-lg font-headline text-primary">
        <svg width="150" height="40" viewBox="0 0 150 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M24.8,4.2C23.1,2.5,20.8,1,18,1C13.6,1,10,4.6,10,9c0,2.8,1.5,5.1,4.2,6.8l-0.2,0.2C11.5,18.5,10,21.9,10,25.5c0,4.4,3.6,8,8,8s8-3.6,8-8c0-3.6-1.5-6.9-4.2-8.5l0.2-0.2C24.5,14.3,26,11.9,26,9C26,7.2,25.5,5.6,24.8,4.2z M18,2.5c2.3,0,4.2,1.2,5.5,3.1C22.2,6.1,20.2,6.5,18,6.5c-2.2,0-4.2-0.4-5.5-0.9C13.8,3.7,15.7,2.5,18,2.5z M12.5,9c0-2.3,1.2-4.2,3.1-5.5c0.5,1.3,0.9,2.8,0.9,4.4s-0.4,3.1-0.9,4.4C13.7,11.2,12.5,9.3,12.5,9z M18,11.5c2.2,0,4.2,0.4,5.5,0.9c-1.3,1.9-3.2,3.1-5.5,3.1s-4.2-1.2-5.5-3.1C13.8,11.9,15.8,11.5,18,11.5z M23.5,9c0,2.3-1.2,4.2-3.1,5.5c-0.5-1.3-0.9-2.8-0.9-4.4s0.4-3.1,0.9-4.4C22.3,6.8,23.5,9.7,23.5,9z M18,32c-3.6,0-6.5-2.9-6.5-6.5s2.9-6.5,6.5-6.5s6.5,2.9,6.5,6.5S21.6,32,18,32z" fill="#2E8B57"/>
            <path d="M18,19.5c-3,0-5.5,2.5-5.5,5.5s2.5,5.5,5.5,5.5s5.5-2.5,5.5-5.5S21,19.5,18,19.5z" fill="#4682B4"/>
            <text x="35" y="22" fontFamily="Inter, sans-serif" fontSize="16" fontWeight="bold">
                <tspan fill="#4A4A4A">i</tspan><tspan fill="#2E8B57">PUMP</tspan><tspan fill="#4682B4">NET</tspan>
                <tspan fontSize="8" dy="-8">™</tspan>
            </text>
            <text x="35" y="35" fontFamily="Inter, sans-serif" fontSize="8" fill="#4A4A4A">Smart Pumping, Smarter Operations</text>
        </svg>
    </div>
);

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <Logo />
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <Link href="/map">
                <SidebarMenuButton tooltip="Map Overview">
                  <Map />
                  Map Overview
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/status">
                <SidebarMenuButton tooltip="Location Status">
                  <MapPin />
                  Location Status
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/reports">
                <SidebarMenuButton tooltip="Reports">
                  <BarChart3 />
                  Reports
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
               <Link href="#">
                <SidebarMenuButton tooltip="Settings">
                  <Settings />
                  Settings
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 sm:px-6">
          <SidebarTrigger className="md:hidden" />
          <div className="flex-1" />
          <Button variant="ghost" size="icon" className="rounded-full">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <HelpCircle className="h-5 w-5" />
            <span className="sr-only">Help</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://placehold.co/32x32.png" alt="@user" data-ai-hint="person avatar" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/login"><LogOut className="mr-2 h-4 w-4" />Log out</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex-1 p-4 sm:p-6 bg-background">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
