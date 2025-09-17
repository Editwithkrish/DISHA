"use client"

import React from "react"
import { Bell, Menu, GraduationCap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface UniversityHeaderProps {
  activeSection: string
  isMobile: boolean
  onMenuClick: () => void
  sidebarItems: Array<{
    id: string
    label: string
    icon: any
  }>
}

export default function UniversityHeader({ 
  activeSection, 
  isMobile, 
  onMenuClick, 
  sidebarItems 
}: UniversityHeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4 md:px-8">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              className="mr-2 hover:bg-gray-100"
              onClick={onMenuClick}
            >
              <Menu className="h-5 w-5 text-gray-700" />
            </Button>
          )}

          <div className="flex items-center space-x-3">
            {/* Logo/Icon */}
            <div className="w-8 h-8 bg-[#0A3A67] rounded-md flex items-center justify-center">
              <GraduationCap className="h-5 w-5 text-white" />
            </div>

            {/* Title */}
            <div>
              <h1 className="text-2xl font-bold text-[#0A3A67] tracking-tight">
                {sidebarItems.find((item) => item.id === activeSection)?.label || "University Overview"}
              </h1>
              <p className="text-sm text-gray-600">University Analytics Dashboard</p>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="relative hover:bg-gray-100"
          >
            <Bell className="h-5 w-5 text-gray-700" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-600 rounded-full border-2 border-white"></span>
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-10 w-10 rounded-full hover:bg-gray-100"
              >
                <Avatar className="h-10 w-10 border border-gray-300">
                  <AvatarImage src="/placeholder-user.jpg" alt="University Admin" />
                  <AvatarFallback className="bg-gray-200 text-gray-700 font-semibold">
                    UA
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}