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
        <svg width="102" height="24" viewBox="0 0 102 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.832031 23.5V0.5H5.81203V23.5H0.832031Z" fill="#2E8B57"/>
            <path d="M12.4344 23.5V0.5H23.5544V5.16H17.4144V9.8H22.9944V14.46H17.4144V18.84H23.6144V23.5H12.4344Z" fill="#2E8B57"/>
            <path d="M36.1333 16.18L32.9533 23.5H27.5533L33.7933 12L27.6733 0.5H33.1933L36.2533 7.48L39.3133 0.5H44.6533L38.5333 12L44.7733 23.5H39.3733L36.1333 16.18Z" fill="#2E8B57"/>
            <path d="M47.7801 23.5V0.5H52.7601V23.5H47.7801Z" fill="#2E8B57"/>
            <path d="M60.9711 23.5V5.16H55.8511V0.5H71.3311V5.16H66.2111V23.5H60.9711Z" fill="#2E8B57"/>
            <path d="M79.9193 23.5L74.0393 0.5H79.6793L82.5593 15.28L85.5593 0.5H91.0193L94.0193 15.28L96.8993 0.5H101.999L96.1193 23.5H90.8393L88.2593 9.4L85.6193 23.5H79.9193Z" fill="#2E8B57"/>
            <path d="M0.832031 23.5V0.5H5.81203V23.5H0.832031Z" fill="#4682B4"/>
            <path d="M12.4344 23.5V0.5H23.5544V5.16H17.4144V9.8H22.9944V14.46H17.4144V18.84H23.6144V23.5H12.4344Z" fill="#4682B4"/>
            <path d="M36.1333 16.18L32.9533 23.5H27.5533L33.7933 12L27.6733 0.5H33.1933L36.2533 7.48L39.3133 0.5H44.6533L38.5333 12L44.7733 23.5H39.3733L36.1333 16.18Z" fill="#4682B4"/>
            <path d="M47.7801 23.5V0.5H52.7601V23.5H47.7801Z" fill="#4682B4"/>
            <path d="M60.9711 23.5V5.16H55.8511V0.5H71.3311V5.16H66.2111V23.5H60.9711Z" fill="#4682B4"/>
            <path d="M79.9193 23.5L74.0393 0.5H79.6793L82.5593 15.28L85.5593 0.5H91.0193L94.0193 15.28L96.8993 0.5H101.999L96.1193 23.5H90.8393L88.2593 9.4L85.6193 23.5H79.9193Z" fill="#4682B4"/>
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
