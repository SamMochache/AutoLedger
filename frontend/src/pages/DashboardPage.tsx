import React, { useEffect, Children } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowUpRightIcon,
  ArrowDownRightIcon,
  CreditCardIcon,
  ActivityIcon,
  UsersIcon,
  DownloadIcon,
  PlusIcon } from
'lucide-react';
import { Link } from 'react-router-dom';
import { useStore } from '../stores/useStore';
import { usePolling } from '../hooks/usePolling';
import { formatCurrency, formatDate } from '../utils/format';
import { exportTransactionsToCSV } from '../utils/export';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { ErrorMessage } from '../components/ui/ErrorMessage';
import { Badge } from '../components/ui/Badge';
export function DashboardPage() {
  const {
    transactions,
    workspaces,
    isLoading,
    error,
    fetchTransactions,
    fetchWorkspaces
  } = useStore();
  useEffect(() => {
    fetchTransactions();
    fetchWorkspaces();
  }, [fetchTransactions, fetchWorkspaces]);
  // Auto-refresh every 30 seconds
  usePolling(fetchTransactions, 30000);
  if (isLoading && transactions.length === 0) {
    return <LoadingSpinner fullScreen />;
  }
  if (error && transactions.length === 0) {
    return (
      <ErrorMessage
        message={error}
        onRetry={fetchTransactions}
        className="max-w-md mx-auto mt-12" />);


  }
  // Calculate metrics
  const totalAmount = transactions.reduce((sum, t) => sum + t.amount, 0);
  const todayTransactions = transactions.filter((t) => {
    const today = new Date();
    const txDate = new Date(t.date);
    return (
      txDate.getDate() === today.getDate() &&
      txDate.getMonth() === today.getMonth() &&
      txDate.getFullYear() === today.getFullYear());

  });
  const todayAmount = todayTransactions.reduce((sum, t) => sum + t.amount, 0);
  const metrics = [
  {
    title: 'Total Revenue',
    value: formatCurrency(totalAmount),
    change: '+12.5%',
    isPositive: true,
    icon: CreditCardIcon
  },
  {
    title: 'Transactions Today',
    value: todayTransactions.length.toString(),
    change: '+4.2%',
    isPositive: true,
    icon: ActivityIcon
  },
  {
    title: 'Revenue Today',
    value: formatCurrency(todayAmount),
    change: '-2.1%',
    isPositive: false,
    icon: ArrowUpRightIcon
  },
  {
    title: 'Active Workspaces',
    value: workspaces.length.toString(),
    change: '+1',
    isPositive: true,
    icon: UsersIcon
  }];

  const containerVariants = {
    hidden: {
      opacity: 0
    },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24
      }
    }
  };
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
            Overview
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Monitor your M-Pesa automated receipts and workspaces.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => exportTransactionsToCSV(transactions)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors shadow-sm">
            
            <DownloadIcon size={16} />
            Export
          </button>
          <Link
            to="/workspaces"
            className="inline-flex items-center gap-2 px-4 py-2 bg-mpesa-500 text-white rounded-lg text-sm font-medium hover:bg-mpesa-600 transition-colors shadow-sm shadow-mpesa-500/20">
            
            <PlusIcon size={16} />
            New Workspace
          </Link>
        </div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {metrics.map((metric, index) =>
        <motion.div
          key={index}
          variants={itemVariants}
          className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200">
          
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-gray-900 flex items-center justify-center text-gray-500 dark:text-gray-400">
                <metric.icon size={20} />
              </div>
              <span
              className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${metric.isPositive ? 'bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400' : 'bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-400'}`}>
              
                {metric.isPositive ?
              <ArrowUpRightIcon size={12} /> :

              <ArrowDownRightIcon size={12} />
              }
                {metric.change}
              </span>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {metric.title}
              </h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1 tracking-tight">
                {metric.value}
              </p>
            </div>
          </motion.div>
        )}
      </motion.div>

      <motion.div
        initial={{
          opacity: 0,
          y: 20
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        transition={{
          delay: 0.4,
          duration: 0.5
        }}
        className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm overflow-hidden">
        
        <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Recent Transactions
          </h2>
          <Link
            to="/transactions"
            className="text-sm font-medium text-mpesa-600 dark:text-mpesa-500 hover:text-mpesa-700 dark:hover:text-mpesa-400 transition-colors">
            
            View all
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-700">
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Transaction
                </th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {transactions.slice(0, 5).map((tx) =>
              <tr
                key={tx.id}
                className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors">
                
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-300 font-medium text-xs">
                        {tx.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {tx.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {tx.phone}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {formatCurrency(tx.amount)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(tx.date)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge status={tx.status} />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>);

}