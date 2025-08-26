"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Switch } from "@/components/ui/switch";
import { format } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { AlertCircle, Zap, Droplets } from "lucide-react";


// --- Data ---
const drinkingWaterNetwork = {
  qualitative: { ph: 7.5, turbidity: 1.2, chlorine: 0.5, hardness: 120 },
  quantitative: { totalMLPumpedToday: 250000, operatingPumps: 5, totalConsumption: 5000 },
};

const sewageWaterNetwork = {
  qualitative: { ph: 6.8, chlorides: 150, COD: 250 },
  quantitative: { totalMLPumpedToday: 150000, operatingPumps: 4, totalConsumption: 3500 },
};

const stormWaterNetwork = {
  qualitative: { turbidity: 5.5, suspendedSolids: 120, pollutants: "Oil, grease" },
  quantitative: { totalMLPumpedToday: 300000, operatingPumps: 6, totalConsumption: 4500 },
};

const networkFlowData = [
  { name: "Raw Water PumpHouse", pumped: 500000 },
  { name: "WTP", pumped: 400000 },
  { name: "Treated Water PumpHouse", pumped: 380000 },
  { name: "Reservoirs", pumped: 370000 },
];

const zoneData = [
  { id: 1, drinking: { operatingPumps: 2, totalConsumption: 1000 }, sewage: { operatingPumps: 1, totalConsumption: 800 }, storm: { operatingPumps: 2, totalConsumption: 950 } },
  { id: 2, drinking: { operatingPumps: 1, totalConsumption: 850 }, sewage: { operatingPumps: 2, totalConsumption: 1200 }, storm: { operatingPumps: 2, totalConsumption: 1500 } },
  { id: 3, drinking: { operatingPumps: 2, totalConsumption: 650 }, sewage: { operatingPumps: 1, totalConsumption: 1500 }, storm: { operatingPumps: 2, totalConsumption: 2050 } },
];

const waterJourneySteps = [
    { name: "Reservoir", data: { "Level": "85%" } },
    { name: "Raw Water Pump House", data: { "Total Inflow": "510 MLD" } },
    { name: "WTP", data: { "Turbidity": "0.9 NTU" } },
    { name: "Treated Water Pump House", data: { "Total Discharge": "495 MLD" } },
    { name: "Main Balancing Reservoir", data: { "Level": "92%" } },
    { name: "Water Distribution Station", data: { "Pressure": "2.5 bar" } },
    { name: "Intermediate Pumping Station", data: { "Flow Rate": "1500 m³/h" } },
    { name: "End User", data: {} },
];

// --- UPDATED: Journey Step and Arrow Components ---
const JourneyStep = ({ name, data }) => (
  <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-lg px-3 py-2 text-center min-w-[170px] h-[70px] flex flex-col justify-center">
    <p className="font-bold text-sm mb-1">{name}</p>
    <div className="text-xs text-blue-700 dark:text-blue-300">
      {Object.entries(data).map(([key, value]) => (
        <div key={key}>
          <span className="font-semibold">{key}:</span> {value}
        </div>
      ))}
    </div>
  </div>
);

const RightArrow = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-2 text-gray-400 flex-shrink-0"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
);
const LeftArrow = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-2 text-gray-400 flex-shrink-0"><path d="M19 12H5" /><path d="m12 19-7-7 7-7" /></svg>
);
const DownArrow = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><path d="M12 5v14" /><path d="m19 12-7 7-7-7" /></svg>
);

export default function HomePage() {
  const journeyRow1 = waterJourneySteps.slice(0, 5);
  const journeyRow2 = waterJourneySteps.slice(5);

  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="space-y-4 p-3 md:p-4">
        {/* --- MOVED DISCLAIMER CARD --- */}
        <Card className="bg-red-50 border border-red-200 dark:bg-red-950 dark:border-red-800">
            <CardContent className="p-4 flex items-start text-red-700 dark:text-red-300">
                <AlertCircle className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                    <h3 className="font-bold mb-1">Disclaimer</h3>
                    <p className="text-sm">
                        This UI is for demonstration purposes only. As a SaaS company, our interface evolves with product releases. The core data and visualizations shown here will be available in the final product.
                    </p>
                </div>
            </CardContent>
        </Card>
        {/* --- END OF MOVED CARD --- */}

        <h1 className="text-3xl font-bold">Water Network Overview</h1>

        <Tabs defaultValue="overview">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="zone-wise">Zone-wise View</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card>
                <CardHeader><CardTitle>Drinking Water Network</CardTitle><CardDescription>Treatment and supply network details.</CardDescription></CardHeader>
                <CardContent><div className="space-y-4"><div><h3 className="font-bold text-lg mb-2">Qualitative Data</h3><p>pH: {drinkingWaterNetwork.qualitative.ph}</p><p>Turbidity: {drinkingWaterNetwork.qualitative.turbidity} NTU</p><p>Chlorine: {drinkingWaterNetwork.qualitative.chlorine} mg/L</p><p>Hardness: {drinkingWaterNetwork.qualitative.hardness} mg/L</p></div><div><h3 className="font-bold text-lg mb-2">Quantitative Data</h3><p>Total ML Pumped Today: {drinkingWaterNetwork.quantitative.totalMLPumpedToday.toLocaleString()} L</p><p>Operating Pumps: {drinkingWaterNetwork.quantitative.operatingPumps}</p><p>Total Energy Consumption: {drinkingWaterNetwork.quantitative.totalConsumption.toLocaleString()} kWh</p></div></div></CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle>Sewage Water Network</CardTitle><CardDescription>Treatment and discharge network details.</CardDescription></CardHeader>
                <CardContent><div className="space-y-4"><div><h3 className="font-bold text-lg mb-2">Qualitative Data</h3><p>pH: {sewageWaterNetwork.qualitative.ph}</p><p>Chlorides: {sewageWaterNetwork.qualitative.chlorides} mg/L</p><p>COD: {sewageWaterNetwork.qualitative.COD} mg/L</p></div><div><h3 className="font-bold text-lg mb-2">Quantitative Data</h3><p>Total ML Pumped Today: {sewageWaterNetwork.quantitative.totalMLPumpedToday.toLocaleString()} L</p><p>Operating Pumps: {sewageWaterNetwork.quantitative.operatingPumps}</p><p>Total Energy Consumption: {sewageWaterNetwork.quantitative.totalConsumption.toLocaleString()} kWh</p></div></div></CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle>Storm Water Pumping Network</CardTitle><CardDescription>Stormwater management network details.</CardDescription></CardHeader>
                <CardContent><div className="space-y-4"><div><h3 className="font-bold text-lg mb-2">Qualitative Data</h3><p>Turbidity: {stormWaterNetwork.qualitative.turbidity} NTU</p><p>Suspended Solids: {stormWaterNetwork.qualitative.suspendedSolids} mg/L</p><p>Pollutants: {stormWaterNetwork.qualitative.pollutants}</p></div><div><h3 className="font-bold text-lg mb-2">Quantitative Data</h3><p>Total ML Pumped Today: {stormWaterNetwork.quantitative.totalMLPumpedToday.toLocaleString()} L</p><p>Operating Pumps: {stormWaterNetwork.quantitative.operatingPumps}</p><p>Total Energy Consumption: {stormWaterNetwork.quantitative.totalConsumption.toLocaleString()} kWh</p></div></div></CardContent>
              </Card>
            </div>

            <Card className="w-full">
              <CardHeader><CardTitle>Drinking Water Journey</CardTitle><CardDescription>Visualizing the flow of water from source to consumer.</CardDescription></CardHeader>
              <CardContent>
                <div className="flex flex-col">
                  {/* Row 1 */}
                  <div className="flex items-center justify-center flex-wrap gap-y-4">
                    {journeyRow1.map((step, index) => (
                      <React.Fragment key={step.name}>
                        <JourneyStep name={step.name} data={step.data} />
                        {index < journeyRow1.length - 1 && <RightArrow />}
                      </React.Fragment>
                    ))}
                  </div>
                  
                  {/* Connecting Arrow */}
                  <div className="flex justify-end" style={{ paddingRight: '95px', margin: '4px 0' }}>
                    <DownArrow />
                  </div>
                  
                  {/* Row 2 */}
                  <div className="flex items-center justify-center flex-wrap gap-y-4 flex-row-reverse">
                    {journeyRow2.map((step, index) => (
                      <React.Fragment key={step.name}>
                        <JourneyStep name={step.name} data={step.data} />
                        {index < journeyRow2.length - 1 && <LeftArrow />}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card>
                <CardHeader><CardTitle>Water Flow Hierarchy</CardTitle><CardDescription>Water volume through different pumping stages.</CardDescription></CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={networkFlowData}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" /><YAxis /><Tooltip /><Legend /><Bar dataKey="pumped" fill="hsl(var(--primary))" /></BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle>Key Metrics & Alerts</CardTitle><CardDescription>At-a-glance system health and status.</CardDescription></CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center p-3 rounded-lg bg-green-100 dark:bg-green-900"><Droplets className="h-6 w-6 mr-3 text-green-600 dark:text-green-300"/><div><p className="font-semibold">Reservoir Level</p><p className="text-lg font-bold text-green-700 dark:text-green-200">85% <span className="text-sm font-normal">(Stable)</span></p></div></div>
                  <div className="flex items-center p-3 rounded-lg bg-blue-100 dark:bg-blue-900"><Zap className="h-6 w-6 mr-3 text-blue-600 dark:text-blue-300"/><div><p className="font-semibold">Overall Energy Consumption</p><p className="text-lg font-bold text-blue-700 dark:text-blue-200">13,000 kWh <span className="text-sm font-normal">(Normal)</span></p></div></div>
                  <div className="flex items-center p-3 rounded-lg bg-yellow-100 dark:bg-yellow-900"><AlertCircle className="h-6 w-6 mr-3 text-yellow-600 dark:text-yellow-300"/><div><p className="font-semibold">Active Alerts</p><p className="text-yellow-800 dark:text-yellow-200">Pump #2 at WTP reports minor leak. Maintenance scheduled.</p></div></div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="zone-wise" className="mt-4 space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {zoneData.map((zone) => (
                <Card key={zone.id} className="flex flex-col">
                  <CardHeader><CardTitle>Zone {zone.id} View</CardTitle><CardDescription>Summary of water network operations in Zone {zone.id}.</CardDescription></CardHeader>
                  <CardContent className="space-y-4 flex-grow"><h3 className="font-semibold text-center">Zone-wise Summary</h3><div className="space-y-3"><Card><CardHeader className="p-3"><CardTitle className="text-base">Drinking Water Network</CardTitle></CardHeader><CardContent className="p-3 pt-0 text-sm"><p>Operating Pumps: {zone.drinking.operatingPumps}</p><p>Energy Use: {zone.drinking.totalConsumption} kWh</p></CardContent></Card><Card><CardHeader className="p-3"><CardTitle className="text-base">Sewage Water Network</CardTitle></CardHeader><CardContent className="p-3 pt-0 text-sm"><p>Operating Pumps: {zone.sewage.operatingPumps}</p><p>Energy Use: {zone.sewage.totalConsumption} kWh</p></CardContent></Card><Card><CardHeader className="p-3"><CardTitle className="text-base">Storm Water Drain Network</CardTitle></CardHeader><CardContent className="p-3 pt-0 text-sm"><p>Operating Pumps: {zone.storm.operatingPumps}</p><p>Energy Use: {zone.storm.totalConsumption} kWh</p></CardContent></Card></div></CardContent>
                  <CardFooter><a href="/status" className="w-full"><Button className="w-full">View Zone {zone.id}</Button></a></CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
