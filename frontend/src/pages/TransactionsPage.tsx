import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  SearchIcon,
  FilterIcon,
  DownloadIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowUpDownIcon } from
'lucide-react';
import { useStore } from '../stores/useStore';
import { formatCurrency, formatDate } from '../utils/format';
import { exportTransactionsToCSV } from '../utils/export';
import { Badge } from '../components/ui/Badge';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
export function TransactionsPage() {
  const { transactions, isLoading, fetchTransactions } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'asc' | 'desc';
  } | null>(null);
  useEffect(() => {
    if (transactions.length === 0) {
      fetchTransactions();
    }
  }, [fetchTransactions, transactions.length]);
  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (
    sortConfig &&
    sortConfig.key === key &&
    sortConfig.direction === 'asc')
    {
      direction = 'desc';
    }
    setSortConfig({
      key,
      direction
    });
  };
  const filteredAndSortedTransactions = useMemo(() => {
    let result = [...transactions];
    if (searchTerm) {
      const lowercasedSearch = searchTerm.toLowerCase();
      result = result.filter(
        (tx) =>
        tx.name.toLowerCase().includes(lowercasedSearch) ||
        tx.phone.includes(lowercasedSearch) ||
        tx.description.toLowerCase().includes(lowercasedSearch) ||
        tx.id.toLowerCase().includes(lowercasedSearch)
      );
    }
    if (sortConfig) {
      result.sort((a, b) => {
        const aValue = a[sortConfig.key as keyof typeof a];
        const bValue = b[sortConfig.key as keyof typeof b];
        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return result;
  }, [transactions, searchTerm, sortConfig]);
  const totalPages = Math.ceil(
    filteredAndSortedTransactions.length / itemsPerPage
  );
  const paginatedTransactions = filteredAndSortedTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  if (isLoading && transactions.length === 0) {
    return <LoadingSpinner fullScreen />;
  }
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
            Transactions
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            View and manage all your M-Pesa receipts.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() =>
            exportTransactionsToCSV(filteredAndSortedTransactions)
            }
            className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors shadow-sm">
            
            <DownloadIcon size={16} />
            Export CSV
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row gap-4 justify-between items-center bg-gray-50/30 dark:bg-gray-900/30">
          <div className="relative w-full sm:max-w-xs">
            <SearchIcon
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            
            <input
              type="text"
              placeholder="Search name, phone, or ID..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-mpesa-500 focus:ring-1 focus:ring-mpesa-500 outline-none transition-all shadow-sm" />
            
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button className="inline-flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm">
              <FilterIcon size={16} />
              Filter
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-gray-50/80 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-700">
                {[
                {
                  key: 'id',
                  label: 'Transaction ID'
                },
                {
                  key: 'date',
                  label: 'Date & Time'
                },
                {
                  key: 'name',
                  label: 'Customer'
                },
                {
                  key: 'amount',
                  label: 'Amount'
                },
                {
                  key: 'status',
                  label: 'Status'
                }].
                map((col) =>
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  className="px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group select-none">
                  
                    <div className="flex items-center gap-1">
                      {col.label}
                      <ArrowUpDownIcon
                      size={14}
                      className={`text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity ${sortConfig?.key === col.key ? 'opacity-100 text-mpesa-500' : ''}`} />
                    
                    </div>
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {paginatedTransactions.length > 0 ?
              paginatedTransactions.map((tx, i) =>
              <motion.tr
                initial={{
                  opacity: 0,
                  y: 10
                }}
                animate={{
                  opacity: 1,
                  y: 0
                }}
                transition={{
                  delay: i * 0.05
                }}
                key={tx.id}
                className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors group">
                
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-mono text-gray-600 dark:text-gray-400">
                        {tx.id}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {formatDate(tx.date)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {tx.name}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {tx.phone}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {formatCurrency(tx.amount)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge status={tx.status} />
                    </td>
                  </motion.tr>
              ) :

              <tr>
                  <td
                  colSpan={5}
                  className="px-6 py-12 text-center text-gray-500 dark:text-gray-400 text-sm">
                  
                    No transactions found matching your criteria.
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between bg-gray-50/30 dark:bg-gray-900/30">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Show
            </span>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-200 rounded-md text-sm py-1 px-2 outline-none focus:border-mpesa-500">
              
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              per page
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Page <span className="font-medium">{currentPage}</span> of{' '}
              <span className="font-medium">{totalPages || 1}</span>
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-1 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                
                <ChevronLeftIcon size={20} />
              </button>
              <button
                onClick={() =>
                setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages || totalPages === 0}
                className="p-1 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                
                <ChevronRightIcon size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>);

}