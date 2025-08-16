"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  Heart,
  User,
  Book,
  Settings,
  LogOut,
  Menu,
  X,
  Coins,
  BookOpen,
  BookCopy,
  Bookmark,
} from "lucide-react";
import { useUser } from "@/context/UserContext";
import { useTheme } from "@/hooks/usePreferences";
// import { useUser } from "../contexts/UserContext";
// import { useTheme } from "../contexts/ThemeContext";

interface NavigationProps {
  children: React.ReactNode;
}

export function Navigation({ children }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useUser();
  // const { resolvedTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();

  const navigationItems = [
    { href: "/library", label: "Library", icon: BookCopy },
    { href: "/bookmark", label: "Bookmark", icon: Bookmark },
    { href: "/my-reads", label: "My Reads", icon: BookOpen },
    { href: "/profile", label: "Profile", icon: User },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  const handleLogout = () => {
    logout();
    router.push("/auth/login");
    setIsMobileMenuOpen(false);
  };

  if (!user) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile Header */}
      <header className="lg:hidden bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 safe-top">
        <div className="flex items-center justify-between p-4">
          <Link href="/" className="flex items-center gap-2">
            <Book className="w-6 h-6 text-primary" />
            <span className="font-bold text-lg">StoryBook</span>
          </Link>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-sm font-medium text-amber-600">
              <Coins className="w-4 h-4" />
              <span>{user.points}</span>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Desktop Sidebar */}
        <nav className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 p-6 border-b border-gray-200 dark:border-gray-700">
            <Book className="w-8 h-8 text-primary" />
            <span className="font-bold text-xl">StoryBook</span>
          </div>

          <div className="flex-1 flex flex-col justify-between py-6">
            <div className="space-y-1 px-3">
              {navigationItems.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className={`
                    flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors
                    ${
                      isActive(href)
                        ? "bg-[#c9facc77] dark:bg-blue-900 text-primary dark:text-blue-300"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  {label}
                </Link>
              ))}
            </div>

            <div className="px-3 space-y-4">
              <div className="flex items-center gap-2 px-3 py-2 bg-amber-50 dark:bg-transparent rounded-lg">
                <Coins className="w-5 h-5 text-amber-600 dark:text-yellow-400" />
                <div>
                  <div className="text-sm font-medium text-amber-700 dark:text-yellow-400">
                    {user.points} Points
                  </div>
                  <Link
                    href="/subscription"
                    className="text-xs text-amber-600 hover:text-amber-700 dark:text-yellow-400 dark:hover:text-yellow-300"
                  >
                    Get more points
                  </Link>
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <div className="flex items-center gap-3 px-3 py-2 text-sm">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">User</div>
                    <div className="text-xs text-gray-500 truncate">
                      {user.phoneNumber}
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3 py-2 mt-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div
            className="lg:hidden fixed inset-0 z-50 bg-black/50"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <nav
              className="w-64 h-full bg-white dark:bg-gray-800 safe-top"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-2 p-6 border-b border-gray-200 dark:border-gray-700">
                <Book className="w-8 h-8 text-blue-600" />
                <span className="font-bold text-xl">StoryBook</span>
              </div>

              <div className="flex-1 flex flex-col justify-between py-6 h-[calc(100%-5rem)]">
                <div className="space-y-1 px-3">
                  {navigationItems.map(({ href, label, icon: Icon }) => (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`
                        flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors
                        ${
                          isActive(href)
                            ? "bg-blue-100 dark:bg-blue-900 text-primary dark:text-blue-300"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        }
                      `}
                    >
                      <Icon className="w-5 h-5" />
                      {label}
                    </Link>
                  ))}
                </div>

                <div className="px-3 space-y-4">
                  <div className="flex items-center gap-2 px-3 py-2 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                    <Coins className="w-5 h-5 text-amber-600" />
                    <div>
                      <div className="text-sm font-medium text-amber-700 dark:text-amber-300">
                        {user.points} Points
                      </div>
                      <Link
                        href="/subscription"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-xs text-amber-600 hover:text-amber-700"
                      >
                        Get more points
                      </Link>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <div className="flex items-center gap-3 px-3 py-2 text-sm">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">User</div>
                        <div className="text-xs text-gray-500 truncate">
                          {user.phoneNumber}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-3 py-2 mt-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    >
                      <LogOut className="w-5 h-5" />
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 lg:ml-64 dark:bg-dark-primary  bdark:bg-gray-800">
          <div className="min-h-screen w-full safe-bottom main-container-">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
