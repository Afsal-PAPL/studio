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
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0L12 2.69z"></path><path d="M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path><path d="M12 22v-6"></path></svg>
        <span>IPMS</span>
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
