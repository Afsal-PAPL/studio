
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
import { Home, Bell, HelpCircle, Map, MapPin, BarChart3, Settings, LogOut, BookText, MessageSquare, Cpu, TrendingUp, ShieldCheck, AlertTriangle, ListOrdered, Warehouse, Truck, History, Droplets, Users, Calendar, Timer, FileCheck, UserCog, Plug, Database, ListChecks } from 'lucide-react';
import Image from 'next/image';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const Logo = () => (
    <div className="flex items-center gap-2 font-bold text-lg font-headline text-primary">
        <Image src="https://www.pumpacademy.in/images/logo-update.png" alt="HydroView Logo" width={150} height={40} />
    </div>
);

const NavLink = ({ href, icon, children }: { href: string; icon: React.ReactNode; children: React.ReactNode }) => (
    <Link href={href} className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
        {icon}
        {children}
    </Link>
);


export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <Logo />
        </SidebarHeader>
        <SidebarContent className="p-0">
           <SidebarMenu className="p-2">
              <SidebarMenuItem><Link href="/map"><SidebarMenuButton tooltip="Home" size="sm"><Home />Home</SidebarMenuButton></Link></SidebarMenuItem>
           </SidebarMenu>
          <Accordion type="multiple" defaultValue={['item-1']} className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="px-4 py-2 text-sm font-semibold text-muted-foreground hover:no-underline">Operations</AccordionTrigger>
              <AccordionContent className="pb-0 pl-4">
                 <SidebarMenu>
                    <SidebarMenuItem><Link href="/map"><SidebarMenuButton tooltip="Map Overview" size="sm"><Map />Map Overview</SidebarMenuButton></Link></SidebarMenuItem>
                    <SidebarMenuItem><Link href="/status"><SidebarMenuButton tooltip="Location-Wise Status" size="sm"><MapPin />Location-Wise Status</SidebarMenuButton></Link></SidebarMenuItem>
                    <SidebarMenuItem><Link href="/digital-twin"><SidebarMenuButton tooltip="Digital Twin" size="sm"><Cpu />Digital Twin</SidebarMenuButton></Link></SidebarMenuItem>
                 </SidebarMenu>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="px-4 py-2 text-sm font-semibold text-muted-foreground hover:no-underline">Analytics</AccordionTrigger>
              <AccordionContent className="pb-0 pl-4">
                 <SidebarMenu>
                    <SidebarMenuItem><Link href="/reports"><SidebarMenuButton tooltip="Reports" size="sm"><BarChart3 />Reports and Analytics</SidebarMenuButton></Link></SidebarMenuItem>
                    <SidebarMenuItem><Link href="/chat"><SidebarMenuButton tooltip="Chat with Data" size="sm"><MessageSquare />Chat with Data</SidebarMenuButton></Link></SidebarMenuItem>
                    <SidebarMenuItem><Link href="/energy-optimization"><SidebarMenuButton tooltip="Energy Optimization" size="sm"><TrendingUp />Energy Optimization</SidebarMenuButton></Link></SidebarMenuItem>
                    <SidebarMenuItem><Link href="/compliance"><SidebarMenuButton tooltip="Compliance" size="sm"><ShieldCheck />Compliance</SidebarMenuButton></Link></SidebarMenuItem>
                 </SidebarMenu>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="px-4 py-2 text-sm font-semibold text-muted-foreground hover:no-underline">Maintenance</AccordionTrigger>
              <AccordionContent className="pb-0 pl-4">
                 <SidebarMenu>
                    <SidebarMenuItem><Link href="/alerts"><SidebarMenuButton tooltip="Alerts & Rules" size="sm"><AlertTriangle />Alerts & Rules</SidebarMenuButton></Link></SidebarMenuItem>
                    <SidebarMenuItem><Link href="/work-orders"><SidebarMenuButton tooltip="Work Orders" size="sm"><ListOrdered />Work Orders</SidebarMenuButton></Link></SidebarMenuItem>
                    <SidebarMenuItem><Link href="/inventory"><SidebarMenuButton tooltip="Inventory & PR" size="sm"><Warehouse />Inventory & PR</SidebarMenuButton></Link></SidebarMenuItem>
                    <SidebarMenuItem><Link href="/reports" asChild><SidebarMenuButton tooltip="Predictive Maintenance" size="sm" onClick={() => { const el = document.querySelector('[data-radix-collection-item][value="predictive"]'); if (el instanceof HTMLElement) el.click(); }}><TrendingUp />Predictive Maintenance</SidebarMenuButton></Link></SidebarMenuItem>
                    <SidebarMenuItem><Link href="/vendors"><SidebarMenuButton tooltip="Vendors & History" size="sm"><History />Vendors & History</SidebarMenuButton></Link></SidebarMenuItem>
                    <SidebarMenuItem><Link href="/consumables"><SidebarMenuButton tooltip="Consumables" size="sm"><Droplets />Consumables</SidebarMenuButton></Link></SidebarMenuItem>
                 </SidebarMenu>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="px-4 py-2 text-sm font-semibold text-muted-foreground hover:no-underline">Workforce</AccordionTrigger>
              <AccordionContent className="pb-0 pl-4">
                 <SidebarMenu>
                    <SidebarMenuItem><Link href="/workforce/attendance"><SidebarMenuButton tooltip="Attendance" size="sm"><Users />Attendance</SidebarMenuButton></Link></SidebarMenuItem>
                    <SidebarMenuItem><Link href="/workforce/shifts"><SidebarMenuButton tooltip="Shifts" size="sm"><Calendar />Shifts</SidebarMenuButton></Link></SidebarMenuItem>
                    <SidebarMenuItem><Link href="/workforce/sla-tracking"><SidebarMenuButton tooltip="SLA Tracking" size="sm"><Timer />SLA Tracking</SidebarMenuButton></Link></SidebarMenuItem>
                 </SidebarMenu>
              </AccordionContent>
            </AccordionItem>
             <AccordionItem value="item-5">
              <AccordionTrigger className="px-4 py-2 text-sm font-semibold text-muted-foreground hover:no-underline">Knowledge</AccordionTrigger>
              <AccordionContent className="pb-0 pl-4">
                <SidebarMenu>
                  <SidebarMenuItem>
                    <Link href="/knowledge-base">
                      <SidebarMenuButton tooltip="Knowledge Base" size="sm">
                        <BookText />
                        Knowledge Base
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                </SidebarMenu>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6">
              <AccordionTrigger className="px-4 py-2 text-sm font-semibold text-muted-foreground hover:no-underline">Admin</AccordionTrigger>
              <AccordionContent className="pb-0 pl-4">
                 <SidebarMenu>
                    <SidebarMenuItem><Link href="/admin/users-roles"><SidebarMenuButton tooltip="Users & Roles" size="sm"><UserCog />Users & Roles</SidebarMenuButton></Link></SidebarMenuItem>
                    <SidebarMenuItem><Link href="/admin/integrations"><SidebarMenuButton tooltip="Integrations" size="sm"><Plug />Integrations</SidebarMenuButton></Link></SidebarMenuItem>
                    <SidebarMenuItem><Link href="/admin/data-sources"><SidebarMenuButton tooltip="Data Sources" size="sm"><Database />Data Sources</SidebarMenuButton></Link></SidebarMenuItem>
                    <SidebarMenuItem><Link href="/admin/audit-logs"><SidebarMenuButton tooltip="Audit Logs" size="sm"><ListChecks />Audit Logs</SidebarMenuButton></Link></SidebarMenuItem>
                 </SidebarMenu>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </SidebarContent>
        <SidebarFooter>
            <div className='border-t border-border p-4'>
                <p className="text-xs text-muted-foreground text-center">PUMPACADEMY</p>
            </div>
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
