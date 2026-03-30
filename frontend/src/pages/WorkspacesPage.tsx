import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  PlusIcon,
  MessageCircleIcon,
  FileSpreadsheetIcon,
  MoreVerticalIcon,
  FolderIcon } from
'lucide-react';
import { useStore } from '../stores/useStore';
import { formatDate } from '../utils/format';
import { Modal } from '../components/ui/Modal';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { EmptyState } from '../components/ui/EmptyState';
export function WorkspacesPage() {
  const {
    workspaces,
    isLoading,
    fetchWorkspaces,
    createWorkspace,
    deleteWorkspace
  } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    chatId: '',
    googleSheetUrl: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    if (workspaces.length === 0) {
      fetchWorkspaces();
    }
  }, [fetchWorkspaces, workspaces.length]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await createWorkspace(formData);
    setIsSubmitting(false);
    setIsModalOpen(false);
    setFormData({
      name: '',
      chatId: '',
      googleSheetUrl: ''
    });
  };
  if (isLoading && workspaces.length === 0) {
    return <LoadingSpinner fullScreen />;
  }
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
            Workspaces
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage your WhatsApp groups and Google Sheets integrations.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-mpesa-500 text-white rounded-lg text-sm font-medium hover:bg-mpesa-600 transition-colors shadow-sm shadow-mpesa-500/20">
          
          <PlusIcon size={16} />
          New Workspace
        </button>
      </div>

      {workspaces.length === 0 ?
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-8">
          <EmptyState
          icon={FolderIcon}
          title="No workspaces yet"
          description="Create a workspace to start syncing M-Pesa receipts from WhatsApp to Google Sheets."
          action={
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-mpesa-500 text-white rounded-lg text-sm font-medium hover:bg-mpesa-600 transition-colors shadow-sm">
            
                <PlusIcon size={16} />
                Create Workspace
              </button>
          } />
        
        </div> :

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {workspaces.map((ws, i) =>
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
            delay: i * 0.1
          }}
          key={ws.id}
          className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group">
          
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-mpesa-50 dark:bg-mpesa-500/10 text-mpesa-600 dark:text-mpesa-400 flex items-center justify-center">
                    <FolderIcon size={24} />
                  </div>
                  <button
                onClick={() => {
                  if (
                  confirm(
                    'Are you sure you want to delete this workspace?'
                  ))
                  {
                    deleteWorkspace(ws.id);
                  }
                }}
                className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                
                    <MoreVerticalIcon size={20} />
                  </button>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  {ws.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                  Created {formatDate(ws.createdAt)}
                </p>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 rounded-full bg-green-50 dark:bg-green-500/10 flex items-center justify-center text-green-600 dark:text-green-400 shrink-0">
                      <MessageCircleIcon size={16} />
                    </div>
                    <div className="truncate">
                      <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        WhatsApp ID
                      </p>
                      <p className="text-gray-900 dark:text-gray-200 truncate font-mono text-xs mt-0.5">
                        {ws.chatId}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                      <FileSpreadsheetIcon size={16} />
                    </div>
                    <div className="truncate">
                      <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Google Sheet
                      </p>
                      <a
                    href={ws.googleSheetUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-mpesa-600 dark:text-mpesa-400 hover:underline truncate text-xs mt-0.5 block">
                    
                        {ws.googleSheetUrl}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50/80 dark:bg-gray-900/50 px-6 py-3 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Total synced
                </span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white bg-white dark:bg-gray-800 px-2.5 py-1 rounded-md border border-gray-200 dark:border-gray-600 shadow-sm">
                  {ws.transactionCount.toLocaleString()}
                </span>
              </div>
            </motion.div>
        )}
        </div>
      }

      <Modal
        isOpen={isModalOpen}
        onClose={() => !isSubmitting && setIsModalOpen(false)}
        title="Create Workspace">
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              
              Workspace Name
            </label>
            <input
              id="name"
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value
              })
              }
              className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-mpesa-500 focus:ring-1 focus:ring-mpesa-500 outline-none transition-all"
              placeholder="e.g. Main Store Receipts" />
            
          </div>

          <div>
            <label
              htmlFor="chatId"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              
              WhatsApp Chat ID
            </label>
            <input
              id="chatId"
              type="text"
              required
              value={formData.chatId}
              onChange={(e) =>
              setFormData({
                ...formData,
                chatId: e.target.value
              })
              }
              className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg text-sm font-mono text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-mpesa-500 focus:ring-1 focus:ring-mpesa-500 outline-none transition-all"
              placeholder="e.g. 12036302918273645@g.us" />
            
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5">
              The unique ID of the WhatsApp group or chat to monitor.
            </p>
          </div>

          <div>
            <label
              htmlFor="sheetUrl"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              
              Google Sheet URL
            </label>
            <input
              id="sheetUrl"
              type="url"
              required
              value={formData.googleSheetUrl}
              onChange={(e) =>
              setFormData({
                ...formData,
                googleSheetUrl: e.target.value
              })
              }
              className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-mpesa-500 focus:ring-1 focus:ring-mpesa-500 outline-none transition-all"
              placeholder="https://docs.google.com/spreadsheets/d/..." />
            
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5">
              Make sure the service account has editor access to this sheet.
            </p>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-gray-100 dark:border-gray-700">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              disabled={isSubmitting}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50">
              
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center min-w-[100px] px-4 py-2 text-sm font-medium text-white bg-mpesa-500 rounded-lg hover:bg-mpesa-600 transition-colors disabled:opacity-70 shadow-sm shadow-mpesa-500/20">
              
              {isSubmitting ?
              <LoadingSpinner size={16} className="text-white" /> :

              'Create'
              }
            </button>
          </div>
        </form>
      </Modal>
    </div>);

}