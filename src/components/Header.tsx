'use client';

import { LogOut, Menu } from './Icons';

interface HeaderProps {
  userName: string;
  userEmail: string;
  onLogout: () => void;
}

export default function Header({ userName, userEmail, onLogout }: HeaderProps) {
  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title */}
          <div className="flex items-center gap-3">
            <button className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            </button>
<div className="flex items-center gap-3">
              {/* <div className="w-10 h-10 bg-blue-900 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
              </div> */}
              <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center">
                <img 
                  src="/logo pic.png" 
                  alt="Logo" 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800 dark:text-white">
                  AI Assistant
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Blueprint Management
                </p>
              </div>
            </div>
          </div>

          {/* User Info and Logout */}
          <div className="flex items-center gap-4">
            {/* Logout Button */}
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg transition-colors font-medium"
            >
              <LogOut className="w-5 h-5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
