'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  UtilityPole,
  Wallet,
  Recycle,
  Vote,
  User,
  Users,
  Home
} from 'lucide-react'

const links = [
  { id: 1, title: 'Home', url: '/', icon: Home },
  { id: 2, title: 'Wallet', url: '/wallet', icon: Wallet },
  { id: 3, title: 'Recycle', url: '/recycle', icon: Recycle },
  { id: 4, title: 'Utilities', url: '/utilities', icon: UtilityPole },
  { id: 5, title: 'DAO Voting', url: '/dao', icon: Vote },
  { id: 6, title: 'Referrals', url: '/referrals', icon: Users },
  { id: 7, title: 'Agents', url: '/agents', icon: User },
]

const Mobile = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 md:hidden">
      <div className="grid grid-cols-5 gap-1">
        {links.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.url;

          return (
            <Link
              key={item.id}
              href={item.url}
              className={`flex flex-col items-center justify-center py-2 px-1 text-xs font-medium transition-colors ${
                isActive
                  ? 'text-purple-600 dark:text-purple-400'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <Icon className="w-5 h-5 mb-1" />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Mobile;
