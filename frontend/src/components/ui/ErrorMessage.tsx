import React from 'react';
import { AlertCircleIcon, RefreshCwIcon } from 'lucide-react';
interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  className?: string;
}
export function ErrorMessage({
  message,
  onRetry,
  className = ''
}: ErrorMessageProps) {
  return (
    <div
      className={`rounded-xl bg-red-50 dark:bg-red-500/10 p-4 border border-red-100 dark:border-red-500/20 flex items-start gap-3 ${className}`}>
      
      <AlertCircleIcon
        className="text-red-500 dark:text-red-400 mt-0.5 shrink-0"
        size={20} />
      
      <div className="flex-1">
        <h3 className="text-sm font-medium text-red-800 dark:text-red-300">
          Error
        </h3>
        <p className="text-sm text-red-700 dark:text-red-400 mt-1">{message}</p>

        {onRetry &&
        <button
          onClick={onRetry}
          className="mt-3 flex items-center gap-1.5 text-sm font-medium text-red-700 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition-colors">
          
            <RefreshCwIcon size={14} />
            Try again
          </button>
        }
      </div>
    </div>);

}