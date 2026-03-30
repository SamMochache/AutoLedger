import React from 'react';
interface BadgeProps {
  status: 'completed' | 'pending' | 'failed' | string;
}
export function Badge({ status }: BadgeProps) {
  const getStyles = () => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 dark:bg-green-500/15 text-green-700 dark:text-green-400 border-green-200 dark:border-green-500/20';
      case 'pending':
        return 'bg-yellow-100 dark:bg-yellow-500/15 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-500/20';
      case 'failed':
        return 'bg-red-100 dark:bg-red-500/15 text-red-700 dark:text-red-400 border-red-200 dark:border-red-500/20';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600';
    }
  };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border capitalize ${getStyles()}`}>
      
      {status}
    </span>);

}