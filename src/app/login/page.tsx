"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff } from 'lucide-react';

const Logo = () => (
    <div className="flex items-center gap-2 font-bold text-2xl font-headline text-primary">
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


export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
      <div className="relative hidden bg-gray-100 lg:flex items-center justify-center">
        <Image
          src="https://placehold.co/1080x1920.png"
          alt="Pumping station"
          data-ai-hint="industrial pumping station"
          width="1080"
          height="1920"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="relative z-10 bg-black/50 p-8 rounded-lg text-white">
          <h2 className="text-4xl font-bold">Real-time Pump Monitoring</h2>
          <p className="mt-4 text-lg">Efficiency at your fingertips.</p>
        </div>
      </div>
      <div className="flex items-center justify-center py-12 bg-background">
        <div className="mx-auto grid w-[380px] gap-6 p-6">
          <div className="grid gap-4 text-center">
            <div className="flex justify-center">
              <Logo />
            </div>
            <p className="text-balance text-muted-foreground">
              Sign in to access the Integrated Performance Management System
            </p>
          </div>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Sign In</CardTitle>
              <CardDescription>Enter your email below to login to your account.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" required />
              </div>
              <div className="grid gap-2 relative">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link href="#" className="ml-auto inline-block text-sm underline">
                    Forgot your password?
                  </Link>
                </div>
                <Input id="password" type={showPassword ? "text" : "password"} required />
                <Button variant="ghost" size="icon" type="button" className="absolute right-1 top-[2.2rem] h-7 w-7" onClick={() => setShowPassword(!showPassword)}>
                  <span className="sr-only">{showPassword ? 'Hide password' : 'Show password'}</span>
                  {showPassword ? <EyeOff className="h-4 w-4"/> : <Eye className="h-4 w-4"/>}
                </Button>
              </div>
              <Button type="submit" className="w-full" asChild>
                <Link href="/map">Sign in</Link>
              </Button>
            </CardContent>
          </Card>
           <div className="mt-4 text-center text-xs text-muted-foreground">
            Powered by iPUMPNET & PUMPACADEMY
          </div>
        </div>
      </div>
    </div>
  )
}
