import React from 'react';
import { useLocation } from 'react-router-dom';
import { MenuIcon, BellIcon, SearchIcon, SunIcon, MoonIcon } from 'lucide-react';
import { useStore } from '../../stores/useStore';
export function Topbar() {
  const { toggleSidebar, darkMode, toggleDarkMode } = useStore();
  const location = useLocation();
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Dashboard';
      case '/transactions':
        return 'Transactions';
      case '/workspaces':
        return 'Workspaces';
      default:
        return 'Dashboard';
    }
  };
  return (
    <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4 sm:px-6 lg:px-8 sticky top-0 z-20 transition-colors duration-200">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="p-2 -ml-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg lg:hidden transition-colors">
          
          <MenuIcon size={20} />
        </button>
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white tracking-tight">
          {getPageTitle()}
        </h1>
      </div>

      <div className="flex items-center gap-4 sm:gap-6">
        <div className="hidden sm:flex relative group">
          <SearchIcon
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-mpesa-500 transition-colors" />
          
          <input
            type="text"
            placeholder="Search anything..."
            className="w-64 pl-9 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-transparent focus:bg-white dark:focus:bg-gray-800 focus:border-mpesa-500 dark:focus:border-mpesa-500 focus:ring-1 focus:ring-mpesa-500 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all outline-none" />
          
        </div>

        <button
          onClick={toggleDarkMode}
          className="p-2 text-gray-400 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
          
          {darkMode ? <SunIcon size={20} /> : <MoonIcon size={20} />}
        </button>

        <button className="relative p-2 text-gray-400 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
          <BellIcon size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-gray-800"></span>
        </button>
      </div>
    </header>);

}