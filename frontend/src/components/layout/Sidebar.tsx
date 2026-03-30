import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboardIcon,
  ReceiptIcon,
  FolderIcon,
  SettingsIcon,
  LogOutIcon,
  XIcon } from
'lucide-react';
import { useStore } from '../../stores/useStore';
export function Sidebar() {
  const { sidebarOpen, toggleSidebar } = useStore();
  const navItems = [
  {
    name: 'Dashboard',
    path: '/',
    icon: LayoutDashboardIcon
  },
  {
    name: 'Transactions',
    path: '/transactions',
    icon: ReceiptIcon
  },
  {
    name: 'Workspaces',
    path: '/workspaces',
    icon: FolderIcon
  }];

  const sidebarClasses = `
    fixed inset-y-0 left-0 z-30 w-64 bg-sidebar text-gray-300 transform transition-transform duration-300 ease-in-out flex flex-col
    ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
    lg:translate-x-0 lg:static lg:inset-0
  `;
  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen &&
      <div
        className="fixed inset-0 bg-gray-900/50 z-20 lg:hidden backdrop-blur-sm"
        onClick={toggleSidebar} />

      }

      <aside className={sidebarClasses}>
        {/* Logo area */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-800/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-mpesa-500 flex items-center justify-center shadow-lg shadow-mpesa-500/20">
              <ReceiptIcon size={18} className="text-white" />
            </div>
            <span className="text-white font-semibold text-lg tracking-tight">
              M-Pesa Sync
            </span>
          </div>
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-1 text-gray-400 hover:text-white rounded-md">
            
            <XIcon size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-2">
            Menu
          </div>
          {navItems.map((item) =>
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => `
                flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                ${isActive ? 'bg-mpesa-500/10 text-mpesa-500' : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200'}
              `}>
            
              {({ isActive }) =>
            <>
                  <item.icon
                size={18}
                className={isActive ? 'text-mpesa-500' : ''} />
              
                  {item.name}
                </>
            }
            </NavLink>
          )}
        </nav>

        {/* Bottom section */}
        <div className="p-4 border-t border-gray-800/50 space-y-1">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:bg-gray-800/50 hover:text-gray-200 transition-colors">
            <SettingsIcon size={18} />
            Settings
          </button>

          <div className="mt-4 pt-4 border-t border-gray-800/50 flex items-center gap-3 px-2">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-mpesa-600 to-mpesa-400 flex items-center justify-center text-white font-medium text-sm shadow-md">
              JD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                John Doe
              </p>
              <p className="text-xs text-gray-500 truncate">Admin</p>
            </div>
            <button className="p-1.5 text-gray-400 hover:text-white rounded-md transition-colors">
              <LogOutIcon size={16} />
            </button>
          </div>
        </div>
      </aside>
    </>);

}