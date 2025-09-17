"use client"

import React from "react"
import { X, GraduationCap } from "lucide-react"
import { Button } from "@/components/ui/button"

interface UniversitySidebarProps {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  activeSection: string
  setActiveSection: (section: string) => void
  isMobile: boolean
  sidebarItems: Array<{
    id: string
    label: string
    icon: any
  }>
}

export default function UniversitySidebar({ 
  sidebarOpen, 
  setSidebarOpen, 
  activeSection, 
  setActiveSection, 
  isMobile, 
  sidebarItems 
}: UniversitySidebarProps) {
  return (
    <>
      {/* Mobile Sidebar Overlay */}
      {isMobile && sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <div className="fixed left-0 top-0 h-full w-80 bg-gradient-to-b from-[#0A3A67] to-[#0C477A] shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-white/20">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center shadow-lg">
                  <GraduationCap className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white tracking-wide">DISHA</h2>
                  <p className="text-xs text-amber-100 font-medium">University Dashboard</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)} className="text-white hover:bg-white/20">
                <X className="h-5 w-5" />
              </Button>
            </div>
            <nav className="p-6 space-y-1">
              {sidebarItems.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveSection(item.id)
                      setSidebarOpen(false)
                    }}
                    className={`flex items-center w-full px-4 py-3.5 text-sm font-medium rounded-xl transition-all duration-300 group ${activeSection === item.id
                      ? "bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-100 border-l-4 border-amber-400 shadow-lg backdrop-blur-sm"
                      : "text-slate-300 hover:bg-slate-700/50 hover:text-amber-100 hover:shadow-md"
                      }`}
                  >
                    <Icon className={`mr-4 h-5 w-5 transition-all duration-300 ${activeSection === item.id ? "text-amber-300" : "text-slate-400 group-hover:text-amber-200"
                      }`} />
                    <span className="font-medium tracking-wide">{item.label}</span>
                  </button>
                )
              })}
            </nav>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-72 lg:flex-col lg:fixed lg:inset-y-0">
        <div className="flex flex-col flex-grow bg-[#0A3A67] border-r border-gray-300">
          {/* Header */}
          <div className="flex items-center px-6 py-5 bg-white border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#0A3A67] rounded-md flex items-center justify-center">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-[#0A3A67] tracking-wide">DISHA</h1>
                <p className="text-xs text-gray-600">University Dashboard</p>
              </div>
            </div>
          </div>
          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1">
            {sidebarItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-md transition-all duration-200 ${activeSection === item.id
                    ? "bg-white text-[#0A3A67] border-l-4 border-[#138808]"
                    : "text-gray-200 hover:bg-[#0C477A] hover:text-white"
                    }`}
                >
                  <Icon className={`mr-3 h-5 w-5 ${activeSection === item.id ? "text-[#138808]" : "text-gray-300"
                    }`} />
                  <span>{item.label}</span>
                </button>
              )
            })}
          </nav>
        </div>
      </div>
    </>
  )
}