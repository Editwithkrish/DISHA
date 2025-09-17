// lib/dashboardConfig.ts

import {
    BarChart3,
    MapPin,
    GraduationCap,
    UserCheck,
    Users,
    BrainCircuit,
    HeartHandshake,
    FileText,
    Settings,
  } from "lucide-react";
  
  /**
   * Generates the navigation items array based on the provided translations.
   * @param t The translations object for the currently selected language.
   * @returns An array of navigation item objects.
   */
  export const navigationItems = (t: any) => [
    { id: "overview", label: t.overview, icon: BarChart3 },
    { id: "regions", label: t.regions, icon: MapPin },
    { id: "universities", label: t.universities, icon: GraduationCap },
    { id: "teachers", label: t.teachers, icon: UserCheck },
    { id: "students", label: t.students, icon: Users },
    { id: "ai-insights", label: t.aiInsights, icon: BrainCircuit },
    { id: "counselling", label: t.counselling, icon: HeartHandshake },
    { id: "reports", label: t.reports, icon: FileText },
    { id: "settings", label: t.settings, icon: Settings },
  ];