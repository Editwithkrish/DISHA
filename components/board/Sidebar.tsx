// components/dashboard/Sidebar.tsx

"use client"

import React from 'react';
import { Button } from "@/components/ui/button";
import { GraduationCap, X } from "lucide-react";
import type { LucideIcon } from 'lucide-react';

// Define the shape of the navigation items
interface NavItem {
    id: string;
    label: string;
    icon: LucideIcon;
}

// Define the props the Sidebar component will accept
interface SidebarProps {
    navigationItems: NavItem[];
    activeSection: string;
    setActiveSection: (section: string) => void;
    isMobile: boolean;
    sidebarOpen: boolean;
    setSidebarOpen: (isOpen: boolean) => void;
}

export default function Sidebar({
    navigationItems,
    activeSection,
    setActiveSection,
    isMobile,
    sidebarOpen,
    setSidebarOpen
}: SidebarProps) {
    
    const handleItemClick = (itemId: string) => {
        setActiveSection(itemId);
        if (isMobile) {
            setSidebarOpen(false);
        }
    };

    // This is the content for both mobile and desktop sidebars
    const sidebarContent = (
        <>
            {/* Header */}
            <div className="flex items-center px-6 py-5 bg-white border-b border-gray-200">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-[#0A3A67] rounded-md flex items-center justify-center">
                        <GraduationCap className="h-6 w-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold text-[#0A3A67] tracking-wide">DISHA</h1>
                        <p className="text-xs text-gray-600">Ministry Dashboard</p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-1">
                {navigationItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <button
                            key={item.id}
                            onClick={() => handleItemClick(item.id)}
                            className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-md transition-all duration-200 ${activeSection === item.id
                                ? "bg-white text-[#0A3A67] border-l-4 border-[#138808]"
                                : "text-gray-200 hover:bg-[#0C477A] hover:text-white"
                                }`}
                        >
                            <Icon
                                className={`mr-3 h-5 w-5 ${activeSection === item.id ? "text-[#138808]" : "text-gray-300"}`}
                            />
                            <span>{item.label}</span>
                        </button>
                    );
                })}
            </nav>
        </>
    );
    
    return (
        <>
            {/* Mobile Sidebar Overlay */}
            {isMobile && sidebarOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
                    <div className="fixed left-0 top-0 h-full w-80 bg-[#0A3A67] shadow-2xl flex flex-col">
                        <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)} className="absolute top-4 right-4 text-white hover:bg-white/20">
                            <X className="h-5 w-5" />
                        </Button>
                        {sidebarContent}
                    </div>
                </div>
            )}

            {/* Desktop Sidebar */}
            <div className="hidden lg:flex lg:w-72 lg:flex-col lg:fixed lg:inset-y-0">
                <div className="flex flex-col flex-grow bg-[#0A3A67] border-r border-gray-300">
                    {sidebarContent}
                </div>
            </div>
        </>
    );
}