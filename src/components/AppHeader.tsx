
import React from 'react';
import { Target } from 'lucide-react';

interface AppHeaderProps {
  title: string;
  subtitle?: string;
}

export default function AppHeader({ title, subtitle }: AppHeaderProps) {
  return (
    <div className="flex items-center gap-3 animate-fade-in">
      <Target className="w-6 h-6 text-white/80" />
      <div>
        <h1 className="text-2xl font-light tracking-tight text-gradient">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm text-white/60 mt-0.5">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
