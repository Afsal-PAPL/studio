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
