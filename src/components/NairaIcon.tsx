
import React from 'react';
import { cn } from '@/lib/utils';

interface NairaIconProps {
  className?: string;
}

const NairaIcon = ({ className }: NairaIconProps) => {
  return (
    <span className={cn("text-current font-medium", className)}>₦</span>
  );
};

export default NairaIcon;
