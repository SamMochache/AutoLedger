import React from 'react';
import { Loader2Icon } from 'lucide-react';
interface LoadingSpinnerProps {
  size?: number;
  className?: string;
  fullScreen?: boolean;
}
export function LoadingSpinner({
  size = 24,
  className = '',
  fullScreen = false
}: LoadingSpinnerProps) {
  const spinner =
  <Loader2Icon
    size={size}
    className={`animate-spin text-mpesa-500 ${className}`} />;


  if (fullScreen) {
    return (
      <div className="flex items-center justify-center min-h-screen w-full bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm">
        {spinner}
      </div>);

  }
  return spinner;
}