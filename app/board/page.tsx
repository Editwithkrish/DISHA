// app/dashboard/page.tsx

"use client"

import React, { useState, useEffect } from "react";
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';

// Import your new Sidebar component
import Sidebar from "@/components/board/Sidebar";

// Imports for the Header
import { Bell, ChevronDown, Globe, GraduationCap, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// Data and Type imports
import { translations } from '@/lib/data';
import { Language } from '@/lib/types';
import { navigationItems as navItemConfig } from '@/lib/dashboardConfig'; // Assuming you move nav items to a config file

// DYNAMICALLY IMPORT THE SECTION COMPONENTS
const Overview = dynamic(() => import('@/components/board/Overview'));
const Regions = dynamic(() => import('@/components/board/Regions'));
const Universities = dynamic(() => import('@/components/board/Universities'));
const Teachers = dynamic(() => import('@/components/board/Teachers'));
const Students = dynamic(() => import('@/components/board/Students'));
const AIInsights = dynamic(() => import('@/components/board/AIInsights'));
const Counselling = dynamic(() => import('@/components/board/Counselling'));
const Reports = dynamic(() => import('@/components/board/Reports'));
const Settings = dynamic(() => import('@/components/board/Settings'));

const languageOptions = [
  { code: "en", name: "English" },
  { code: "hi", name: "हिंदी" },
  { code: "mr", name: "मराठी" },
  { code: "gu", name: "ગુજરાતી" },
  { code: "bn", name: "বাংলা" },
  { code: "te", name: "తెలుగు" },
  { code: "ta", name: "தமிழ்" },
  { code: "kn", name: "ಕನ್ನಡ" },
  { code: "ml", name: "മലയാളം" },
  { code: "or", name: "ଓଡ଼ିଆ" },
  { code: "pa", name: "ਪੰਜਾਬੀ" },
  { code: "as", name: "অসমীয়া" },
  { code: "ur", name: "اردو" },
  { code: "sa", name: "संस्कृत" }
];

export default function DashboardPage() {
  const [activeSection, setActiveSection] = useState("overview");
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [language, setLanguage] = useState<Language>("en");
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const t = translations[language];

  // This generates the navigation items based on the current language
  const navigationItems = navItemConfig(t);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    const interval = setInterval(() => setLastUpdated(new Date()), 30000);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearInterval(interval);
    };
  }, []);

  const renderContent = () => {
    switch (activeSection) {
      case 'overview': return <Overview t={t} />;
      case 'regions': return <Regions />;
      case 'universities': return <Universities />;
      case 'teachers': return <Teachers />;
      case 'students': return <Students />;
      case 'ai-insights': return <AIInsights />;
      case 'counselling': return <Counselling />;
      case 'reports': return <Reports />;
      case 'settings': return <Settings />;
      default: return <Overview t={t} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        navigationItems={navigationItems}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isMobile={isMobile}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex-1 flex flex-col lg:ml-72">
        <header className="bg-white border-b border-gray-200">
          <div className="flex items-center justify-between px-6 py-4 md:px-8">
            <div className="flex items-center space-x-4">
              {isMobile && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="mr-2 hover:bg-gray-100"
                  onClick={() => setSidebarOpen(true)}
                >
                  <Menu className="h-5 w-5 text-gray-700" />
                </Button>
              )}
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-[#0A3A67] rounded-md flex items-center justify-center">
                  <GraduationCap className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-[#0A3A67] tracking-tight">
                    {navigationItems.find((item: { id: string; label: string }) => item.id === activeSection)?.label || "Overview"}
                  </h1>
                  <p className="text-sm text-gray-600">Education Ministry of Rajasthan</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600 hidden md:block" suppressHydrationWarning>
                {t.lastUpdated}: {lastUpdated.toLocaleTimeString()}
              </div>

              {/* Language Switcher Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center space-x-2 hover:bg-gray-100">
                    <Globe className="h-4 w-4 text-gray-700" />
                    <span className="text-sm text-gray-700 hidden sm:inline">
                      {languageOptions.find(lang => lang.code === language)?.name || "English"}
                    </span>
                    <ChevronDown className="h-3 w-3 text-gray-500" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  {languageOptions.map((lang) => (
                    <DropdownMenuItem
                      key={lang.code}
                      onClick={() => setLanguage(lang.code as Language)}
                      className={`cursor-pointer ${language === lang.code ? 'bg-gray-100 font-medium' : ''}`}
                    >
                      <span className="flex items-center justify-between w-full">
                        {lang.name}
                        {language === lang.code && <span className="text-blue-600">✓</span>}
                      </span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Notification Bell */}
              <Button variant="ghost" size="icon" className="relative hover:bg-gray-100">
                <Bell className="h-5 w-5 text-gray-700" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-600 rounded-full border-2 border-white"></span>
              </Button>

              {/* User Menu Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:bg-gray-100">
                    <Avatar className="h-10 w-10 border border-gray-300">
                      <AvatarImage src="/placeholder-user.jpg" alt="Board Admin" />
                      <AvatarFallback className="bg-[#0A3A67] text-white font-semibold text-sm">
                        BA
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-3 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">Board Administrator</p>
                    <p className="text-xs text-gray-500">admin@education.rajasthan.gov.in</p>
                  </div>
                  <DropdownMenuItem className="cursor-pointer">
                    <span>Profile Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <span>Account Preferences</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <span>System Administration</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <span>Help & Support</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer text-red-600 hover:text-red-700 hover:bg-red-50">
                    <span>Sign Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-gradient-to-b from-transparent to-slate-50/50">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

/**
 * You may also want to move the navigationItems array to its own file 
 * e.g., `lib/dashboardConfig.ts` to keep the page component even cleaner.
 * * // lib/dashboardConfig.ts
 * import { BarChart3, ... } from "lucide-react";
 * export const navigationItems = (t: any) => [
 * { id: "overview", label: t.overview, icon: BarChart3 },
 * // ... other items
 * ];
 */