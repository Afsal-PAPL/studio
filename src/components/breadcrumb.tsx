import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import React from 'react';
import { cn } from '@/lib/utils';

type BreadcrumbItem = {
    label: string;
    href?: string;
};

export function Breadcrumb({ items, className }: { items: BreadcrumbItem[], className?: string }) {
    return (
        <nav aria-label="breadcrumb" className={cn(className)}>
            <ol className="flex items-center gap-1.5">
                {items.map((item, index) => (
                    <li key={index} className="flex items-center gap-1.5">
                        {index > 0 && <ChevronRight className="h-4 w-4 text-muted-foreground" />}
                        {item.href ? (
                            <Link href={item.href} className="text-sm font-medium text-primary hover:underline">{item.label}</Link>
                        ) : (
                            <span className="text-sm font-medium text-muted-foreground">{item.label}</span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}
