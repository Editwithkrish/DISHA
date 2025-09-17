"use client";

import React, { useState, useEffect } from 'react';
import { BarChart3, Users, GraduationCap, AlertTriangle, Headset, FileText } from 'lucide-react';
import UniversityHeader from '@/components/university/UniversityHeader';
import UniversitySidebar from '@/components/university/UniversitySidebar';
import UniversityOverview from '@/components/university/UniversityOverview';
import DepartmentAnalytics from '@/components/university/DepartmentAnalytics';
import FacultyEngagement from '@/components/university/FacultyEngagement';
import StudentRiskInsights from '@/components/university/StudentRiskInsights';
import CounselingSupport from '@/components/university/CounselingSupport';
import ExportReports from '@/components/university/ExportReports';

export default function UniversityDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');
  const [isMobile, setIsMobile] = useState(false);

  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'departments', label: 'Departments', icon: Users },
    { id: 'faculty', label: 'Faculty', icon: GraduationCap },
    { id: 'student-risk', label: 'Student Risk', icon: AlertTriangle },
    { id: 'counseling', label: 'Counseling', icon: Headset },
    { id: 'reports', label: 'Reports', icon: FileText },
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'overview':
        return <UniversityOverview />;
      case 'departments':
        return <DepartmentAnalytics />;
      case 'faculty':
        return <FacultyEngagement />;
      case 'student-risk':
        return <StudentRiskInsights />;
      case 'counseling':
        return <CounselingSupport />;
      case 'reports':
        return <ExportReports />;
      default:
        return <UniversityOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <UniversitySidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isMobile={isMobile}
        sidebarItems={sidebarItems}
      />

      <div className="lg:pl-72">
        <UniversityHeader
          activeSection={activeSection}
          isMobile={isMobile}
          onMenuClick={() => setSidebarOpen(true)}
          sidebarItems={sidebarItems}
        />

        <main className="py-10">
          <div className="px-4 sm:px-6 lg:px-8">
            {renderActiveSection()}
          </div>
        </main>
      </div>
    </div>
  );
}