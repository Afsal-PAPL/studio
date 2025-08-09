
"use client"
import React from 'react';
import Link from 'next/link';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { Map, MapPin, BarChart3, MessageSquare, Cpu, TrendingUp, ShieldCheck, AlertTriangle, ListOrdered, Warehouse, Truck, History, Droplets, Users, Calendar, Timer, FileCheck, UserCog, Plug, Database, ListChecks, BookText, Video, GraduationCap, FileQuestion, FileText, Award, FileWarning, Handshake } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function SidebarMenuClient() {
  return (
    <Accordion type="multiple" defaultValue={['item-1', 'item-3']} className="w-full">
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
              <SidebarMenuItem><Link href="/reports"><SidebarMenuButton tooltip="Reports and Analytics" size="sm"><BarChart3 />Reports and Analytics</SidebarMenuButton></Link></SidebarMenuItem>
              <SidebarMenuItem><Link href="/chat"><SidebarMenuButton tooltip="Chat with Data" size="sm"><MessageSquare />Chat with Data</SidebarMenuButton></Link></SidebarMenuItem>
              <SidebarMenuItem><Link href="/energy-optimization"><SidebarMenuButton tooltip="Energy Optimization" size="sm"><TrendingUp />Energy Optimization</SidebarMenuButton></Link></SidebarMenuItem>
              <SidebarMenuItem><Link href="/compliance"><SidebarMenuButton tooltip="Compliance" size="sm"><ShieldCheck />Compliance</SidebarMenuButton></Link></SidebarMenuItem>
           </SidebarMenu>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger className="px-4 py-2 text-sm font-semibold text-muted-foreground hover:no-underline">Maintenance</AccordionTrigger>
        <AccordionContent className="pb-0 pl-2">
           <div className="pl-2">
            <p className="text-xs font-semibold text-muted-foreground/80 mb-2 mt-2">Asset Maintenance</p>
             <SidebarMenu>
                <SidebarMenuItem><Link href="/alerts"><SidebarMenuButton tooltip="Alerts & Rules" size="sm"><AlertTriangle />Alerts & Rules</SidebarMenuButton></Link></SidebarMenuItem>
                <SidebarMenuItem>
                  <Link href="/predictive-maintenance">
                      <SidebarMenuButton 
                        tooltip="Predictive Maintenance" 
                        size="sm"
                      >
                        <TrendingUp />Predictive Maintenance
                      </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
             </SidebarMenu>
             <p className="text-xs font-semibold text-muted-foreground/80 mb-2 mt-4">Maintenance Operations</p>
              <SidebarMenu>
                <SidebarMenuItem><Link href="/work-orders"><SidebarMenuButton tooltip="Work Orders" size="sm"><ListOrdered />Work Orders</SidebarMenuButton></Link></SidebarMenuItem>
                <SidebarMenuItem><Link href="/inventory"><SidebarMenuButton tooltip="Inventory & PR" size="sm"><Warehouse />Inventory & PR</SidebarMenuButton></Link></SidebarMenuItem>
                <SidebarMenuItem><Link href="/vendors"><SidebarMenuButton tooltip="Vendors & History" size="sm"><History />Vendors & History</SidebarMenuButton></Link></SidebarMenuItem>
                <SidebarMenuItem><Link href="/consumables"><SidebarMenuButton tooltip="Consumables" size="sm"><Droplets />Consumables</SidebarMenuButton></Link></SidebarMenuItem>
             </SidebarMenu>
           </div>
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
       <AccordionItem value="resource-hub">
        <AccordionTrigger className="px-4 py-2 text-sm font-semibold text-muted-foreground hover:no-underline">Resource Hub</AccordionTrigger>
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
             <SidebarMenuItem>
              <Link href="/video-library">
                <SidebarMenuButton tooltip="Video Library" size="sm">
                  <Video />
                  Video Library
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <Link href="/learning-development">
                <SidebarMenuButton tooltip="Learning & Development" size="sm">
                  <GraduationCap />
                  Learning & Development
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <Link href="/quizzes-assessments">
                <SidebarMenuButton tooltip="Quizzes & Assessments" size="sm">
                  <FileQuestion />
                  Quizzes & Assessments
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          </SidebarMenu>
        </AccordionContent>
      </AccordionItem>
       <AccordionItem value="item-5">
        <AccordionTrigger className="px-4 py-2 text-sm font-semibold text-muted-foreground hover:no-underline">O&amp;M Management</AccordionTrigger>
        <AccordionContent className="pb-0 pl-4">
           <SidebarMenu>
              <SidebarMenuItem><Link href="/om-management/contracts"><SidebarMenuButton tooltip="Contracts" size="sm"><Handshake />Contracts</SidebarMenuButton></Link></SidebarMenuItem>
              <SidebarMenuItem><Link href="/om-management/sla-management"><SidebarMenuButton tooltip="SLA Management" size="sm"><FileText />SLA Management</SidebarMenuButton></Link></SidebarMenuItem>
              <SidebarMenuItem><Link href="/om-management/contractor-performance"><SidebarMenuButton tooltip="Contractor Performance" size="sm"><BarChart3 />Contractor Performance</SidebarMenuButton></Link></SidebarMenuItem>
              <SidebarMenuItem><Link href="/om-management/penalties-bonuses"><SidebarMenuButton tooltip="Penalties &amp; Bonuses" size="sm"><FileWarning />Penalties &amp; Bonuses</SidebarMenuButton></Link></SidebarMenuItem>
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
  )
}
