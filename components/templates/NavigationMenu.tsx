"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  User as UserIcon,
  Book,
  LogOut,
  Coins,
  BookOpen,
  BookCopy,
  Bookmark,
} from "lucide-react";

// import { useUserStore } from "@/stores/user/userStore";
import { useEffect, useState } from "react";
import { User } from "@/constants/stories";
import { useUserStore } from "@/hooks/useUserStore";
// import { User } from "@/constants/stories";
// import { useTheme } from "@/hooks/usePreferences";
// import { useUser } from "../contexts/UserContext";
// import { useTheme } from "../contexts/ThemeContext";

interface NavigationProps {
  children: React.ReactNode;
}

export function Navigation({ children }: NavigationProps) {
  // const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const logout = useUserStore((state) => state.logout);
  const getMe = useUserStore((state) => state.getMe);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const phoneNumber = localStorage.getItem("userId");
      if (phoneNumber) {
        const res = await getMe(phoneNumber);
        if (res === null) {
          router.push("/auth/login");
        }
        // console.log(res);

        setUser(res);
      } else {
        router.push("/auth/login");
      }
      return null;
    };

    fetchUserData();
  }, [getMe, router]);

  // const phoneNumber = localStorage.getItem("userId");
  // const { resolvedTheme } = useTheme();

  const navigationItems = [
    { href: "/library", label: "Library", icon: BookCopy },
    { href: "/bookmark", label: "Bookmark", icon: Bookmark },
    { href: "/my-reads", label: "My Reads", icon: BookOpen },
    { href: "/profile", label: "Profile", icon: UserIcon },
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
    // setIsMobileMenuOpen(false);
  };

  if (!user) {
    return (
      <div className="flex flex-col lg:min-h-screen  bg-gray-50 dark:bg-gray-900 lg:flex-row ">
        <div className="w-full h-[64px] lg:h-screen lg:w-64 animate-pulse dark:bg-gray-800"></div>{" "}
        {children}
      </div>
    );
  }

  return (
    <div className="lg:min-h-screen top-0 pb-[10dvh] pt-[10dvh] md:pb-0 md:pt-[7dvh] lg:py-0 bg-gray-50 dark:bg-gray-900">
      {/* Mobile Header */}
      <header className="lg:hidden fixed w-[100dvw] top-0 z-[1000] bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 safe-top">
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
            <Link
              href={"/profile"}
              className="w-8 h-8 bg-primary rounded-full flex items-center justify-center"
            >
              <UserIcon className="w-4 h-4 text-white" />
            </Link>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Desktop Sidebar */}
        <nav className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700">
          <Link
            href={"/"}
            className="flex items-center cursor-pointer gap-2 p-6 border-b border-gray-200 dark:border-gray-700"
          >
            <Book className="w-8 h-8 text-primary" />
            <span className="font-bold text-xl">StoryBook</span>
          </Link>

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
                    <UserIcon className="w-4 h-4 text-white" />
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

        <nav
          className="flex bottom-0 rounded-[50px] mb-[2px] mx-[2px] justify-center items-center backdrop-blur-[40px] fixed z-10 lg:hidden w-[100dvw]"
          // onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-center items-center inset-1">
            <div className="space-y-1 justify-around z-[20] backdrop-blur-[40px] flex md:w-[60dvw] w-[100dvw]">
              {navigationItems.map(({ href, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  // onClick={() => setIsMobileMenuOpen(false)}
                  className={`
                    flex items-center px-5 py-5 not-[]:text-sm font-medium transition-colors
                    ${
                      isActive(href)
                        ? "bg-blue-100 dark:bg-blue-300 rounded-[50%] backdrop-blur-[40px] text-primary dark:text-gray-900"
                        : "text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>
        </nav>

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
