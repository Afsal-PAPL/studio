
"use client"
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PlusCircle, List, LayoutGrid, SlidersHorizontal, MoreHorizontal, AlertCircle, Clock, Tool } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const workOrders = [
  { id: 'WO-00125', asset: 'Dariyapur WDS - Pump 2', fault: 'High Vibration Detected', status: 'Assigned', assignee: 'R. Sharma', sla: '24h', priority: 'High' },
  { id: 'WO-00124', asset: 'Kotarpur WTP - Motor 1', fault: 'Bearing Temp Exceeded', status: 'In Progress', assignee: 'S. Patel', sla: '48h', priority: 'High' },
  { id: 'WO-00123', asset: 'Moterra SPS - Pump 8', fault: 'Seal Leakage', status: 'Waiting Parts', assignee: 'A. Khan', sla: '72h', priority: 'Medium' },
  { id: 'WO-00122', asset: 'Raska WTP - Pump 3', fault: 'Scheduled Maintenance', status: 'Completed', assignee: 'V. Singh', sla: 'N/A', priority: 'Low' },
  { id: 'WO-00121', asset: 'Vejalpur SWPS - Pump 7', fault: 'Low Flow Rate', status: 'New', assignee: 'Unassigned', sla: '48h', priority: 'Medium' },
];

const statusVariant: {[key: string]: "default" | "secondary" | "destructive" | "outline"} = {
  'New': 'secondary',
  'Assigned': 'default',
  'In Progress': 'outline',
  'Waiting Parts': 'destructive',
  'Completed': 'secondary'
};

const statusColor: {[key: string]: string} = {
  'New': 'bg-gray-500',
  'Assigned': 'bg-blue-500',
  'In Progress': 'bg-yellow-500',
  'Waiting Parts': 'bg-orange-500',
  'Completed': 'bg-green-500',
};

const kanbanColumns = {
  'New': workOrders.filter(wo => wo.status === 'New'),
  'Assigned': workOrders.filter(wo => wo.status === 'Assigned'),
  'In Progress': workOrders.filter(wo => wo.status === 'In Progress'),
  'Waiting Parts': workOrders.filter(wo => wo.status === 'Waiting Parts'),
  'Completed': workOrders.filter(wo => wo.status === 'Completed'),
};

const KanbanCard = ({ wo }: { wo: typeof workOrders[0] }) => (
    <Card className="mb-4">
        <CardHeader className="p-4">
            <div className="flex justify-between items-start">
                 <CardTitle className="text-sm font-bold">{wo.id}</CardTitle>
                 <Badge variant={wo.priority === 'High' ? 'destructive' : 'secondary'}>{wo.priority}</Badge>
            </div>
            <CardDescription className="text-xs pt-1">{wo.asset}</CardDescription>
        </CardHeader>
        <CardContent className="p-4 pt-0">
            <p className="text-sm mb-3">{wo.fault}</p>
            <div className="flex justify-between items-center text-xs text-muted-foreground">
                <div className="flex items-center gap-1"><Clock className="h-3 w-3" /> {wo.sla}</div>
                <div className="font-semibold">{wo.assignee}</div>
            </div>
        </CardContent>
    </Card>
)

export default function WorkOrdersPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold font-headline">Work Orders</h1>
                    <p className="text-muted-foreground">Streamline maintenance and repair operations.</p>
                </div>
                <div className="flex gap-2">
                    <Button><PlusCircle className="mr-2 h-4 w-4" /> Create Work Order</Button>
                </div>
            </div>

             <Tabs defaultValue="list">
                <div className="flex justify-between items-center">
                    <TabsList>
                        <TabsTrigger value="list"><List className="mr-2 h-4 w-4" /> List View</TabsTrigger>
                        <TabsTrigger value="kanban"><LayoutGrid className="mr-2 h-4 w-4" /> Kanban View</TabsTrigger>
                    </TabsList>
                    <div className="flex items-center gap-2">
                         <Select defaultValue="all">
                            <SelectTrigger className="w-[180px]"><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Statuses</SelectItem>
                                <SelectItem value="new">New</SelectItem>
                                <SelectItem value="assigned">Assigned</SelectItem>
                                <SelectItem value="in-progress">In Progress</SelectItem>
                                <SelectItem value="waiting-parts">Waiting for Parts</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                            </SelectContent>
                        </Select>
                         <Button variant="outline"><SlidersHorizontal className="h-4 w-4" /></Button>
                    </div>
                </div>
                <TabsContent value="list" className="mt-4">
                    <Card>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>WO ID</TableHead>
                                    <TableHead>Asset</TableHead>
                                    <TableHead>Fault</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Assigned To</TableHead>
                                    <TableHead>SLA</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {workOrders.map((wo) => (
                                    <TableRow key={wo.id}>
                                        <TableCell className="font-medium">{wo.id}</TableCell>
                                        <TableCell>{wo.asset}</TableCell>
                                        <TableCell>{wo.fault}</TableCell>
                                        <TableCell>
                                            <Badge variant={statusVariant[wo.status]}>{wo.status}</Badge>
                                        </TableCell>
                                        <TableCell>{wo.assignee}</TableCell>
                                        <TableCell>{wo.sla}</TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-8 w-8 p-0"><MoreHorizontal className="h-4 w-4" /></Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem>View Details</DropdownMenuItem>
                                                    <DropdownMenuItem>Assign</DropdownMenuItem>
                                                    <DropdownMenuItem>Update Status</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Card>
                </TabsContent>
                <TabsContent value="kanban" className="mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                        {Object.entries(kanbanColumns).map(([status, wos]) => (
                            <div key={status} className="bg-muted p-2 rounded-lg">
                                <h3 className="font-bold p-2 flex items-center gap-2">
                                    <span className={cn("h-3 w-3 rounded-full", statusColor[status])}></span>
                                    {status} ({wos.length})
                                </h3>
                                <div className="space-y-2">
                                    {wos.map(wo => <KanbanCard key={wo.id} wo={wo} />)}
                                </div>
                            </div>
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
