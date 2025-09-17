"use client"

import React, { useState, useEffect } from "react"
import { TrendingUp, Users, AlertTriangle, GraduationCap, BarChart3, RefreshCw } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter,
} from "recharts"
import { universityApi, type Student } from "@/lib/api/universityApi"

interface UniversityOverviewProps {
  selectedUniversity?: string;
}

// Fallback data for when API is unavailable
const fallbackDropoutReasonsData = [
  { name: "Financial", value: 35, color: "#ef4444" },
  { name: "Academic", value: 28, color: "#f97316" },
  { name: "Personal", value: 20, color: "#eab308" },
  { name: "Health", value: 12, color: "#22c55e" },
  { name: "Others", value: 5, color: "#6366f1" }
]

const fallbackYearlyTrend = [
  { year: "2019", rate: 12.5 },
  { year: "2020", rate: 11.8 },
  { year: "2021", rate: 10.2 },
  { year: "2022", rate: 9.1 },
  { year: "2023", rate: 8.2 }
]

export default function UniversityOverview({ selectedUniversity = "university-a" }: UniversityOverviewProps) {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchUniversityData = async () => {
    try {
      setLoading(true);
      setError(null);
      const allStudents = await universityApi.getAllUniversityStudents(selectedUniversity);
      setStudents(allStudents);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch university data');
      console.error('Error fetching university data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUniversityData();
    
    // Set up auto-refresh every 30 seconds
    const interval = setInterval(fetchUniversityData, 30000);
    return () => clearInterval(interval);
  }, [selectedUniversity]);

  // Calculate real-time statistics
  const stats = students.length > 0 ? universityApi.calculateUniversityStats(students) : null;
  const riskDistribution = students.length > 0 ? universityApi.getRiskLevelDistribution(students) : [];
  const engagementData = students.length > 0 ? universityApi.getEngagementDropoutData(students) : [];
  const attendanceData = students.length > 0 ? universityApi.getAttendanceTrendData(students) : [];

  // Generate KPIs from real data
  const universityKPIs = stats ? [
    {
      title: "Total Students",
      value: stats.totalStudents.toLocaleString(),
      target: "13,000",
      percentage: Math.min((stats.totalStudents / 13000) * 100, 100),
      trend: "+2.3%", // This would come from historical comparison
      icon: "👥",
      status: stats.totalStudents > 12000 ? "good" : "needs_improvement"
    },
    {
      title: "Dropout Rate",
      value: `${stats.dropoutRate}%`,
      target: "<10%",
      percentage: Math.max(100 - (stats.dropoutRate * 10), 0),
      trend: stats.dropoutRate < 10 ? "-1.5%" : "+0.8%",
      icon: "📉",
      status: stats.dropoutRate < 8 ? "excellent" : stats.dropoutRate < 12 ? "good" : "needs_improvement"
    },
    {
      title: "At-Risk Students",
      value: stats.highRiskStudents.toString(),
      target: "<400",
      percentage: Math.max(100 - (stats.highRiskStudents / 400) * 100, 0),
      trend: stats.highRiskStudents < 300 ? "-12" : "+8",
      icon: "⚠️",
      status: stats.highRiskStudents < 300 ? "excellent" : stats.highRiskStudents < 400 ? "good" : "needs_improvement"
    },
    {
      title: "Average GPA",
      value: stats.averageGPA.toString(),
      target: ">7.0",
      percentage: (stats.averageGPA / 10) * 100,
      trend: stats.averageGPA > 7 ? "+0.2" : "-0.1",
      icon: "🎓",
      status: stats.averageGPA > 7.5 ? "excellent" : stats.averageGPA > 6.5 ? "good" : "needs_improvement"
    }
  ] : [];

  if (error) {
    return (
      <div className="space-y-8">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2 text-red-600">
              <AlertTriangle className="h-5 w-5" />
              <span>Error loading university data: {error}</span>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={fetchUniversityData}
                className="ml-auto"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Retry
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header with refresh button */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">University Overview</h2>
          {lastUpdated && (
            <p className="text-sm text-gray-500">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </p>
          )}
        </div>
        <Button 
          variant="outline" 
          onClick={fetchUniversityData}
          disabled={loading}
          className="flex items-center space-x-2"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </Button>
      </div>
      {/* University KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading ? (
          // Loading skeletons
          Array.from({ length: 4 }).map((_, index) => (
            <Card key={index} className="relative overflow-hidden border-l-4 border-l-blue-500">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-8 w-8 rounded" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-baseline space-x-2">
                    <Skeleton className="h-8 w-16" />
                    <Skeleton className="h-5 w-12" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Skeleton className="h-3 w-20" />
                      <Skeleton className="h-3 w-8" />
                    </div>
                    <Skeleton className="h-2 w-full" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          universityKPIs.map((kpi, index) => (
            <Card key={index} className="relative overflow-hidden border-l-4 border-l-blue-500 hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-gray-600">{kpi.title}</CardTitle>
                  <span className="text-2xl">{kpi.icon}</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-baseline space-x-2">
                    <span className="text-3xl font-bold text-gray-900">{kpi.value}</span>
                    <Badge variant={kpi.status === "excellent" ? "default" : kpi.status === "good" ? "secondary" : "destructive"} className="text-xs">
                      {kpi.trend}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Target: {kpi.target}</span>
                      <span className="font-medium">{Math.round(kpi.percentage)}%</span>
                    </div>
                    <Progress value={kpi.percentage} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Department Enrollment vs Dropout Rate */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              <span>Department Analysis</span>
            </CardTitle>
            <CardDescription>Enrollment vs Dropout Rate by Department</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-500">Loading department data...</p>
                  </div>
                </div>
              ) : (
                <BarChart data={stats?.departmentData || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="department" />
                  <YAxis yAxisId="left" orientation="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Bar yAxisId="left" dataKey="enrollment" fill="#3b82f6" name="Enrollment" />
                  <Bar yAxisId="right" dataKey="dropoutRate" fill="#ef4444" name="Dropout Rate (%)" />
                </BarChart>
              )}
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Risk Level Distribution */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              <span>Student Risk Levels</span>
            </CardTitle>
            <CardDescription>Distribution of students by risk level (real-time)</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-500">Loading risk distribution...</p>
                  </div>
                </div>
              ) : (
                <PieChart>
                  <Pie
                    data={riskDistribution.length > 0 ? riskDistribution : fallbackDropoutReasonsData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${percent ? (percent * 100).toFixed(0) : 0}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {(riskDistribution.length > 0 ? riskDistribution : fallbackDropoutReasonsData).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              )}
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Trend Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Yearly Dropout Trend */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <span>Attendance Distribution</span>
            </CardTitle>
            <CardDescription>Current student attendance ranges (real-time)</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-500">Loading attendance data...</p>
                  </div>
                </div>
              ) : (
                <BarChart data={attendanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="range" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#10b981" name="Students" />
                </BarChart>
              )}
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Engagement vs Dropout Correlation */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-purple-600" />
              <span>Engagement Impact</span>
            </CardTitle>
            <CardDescription>Student engagement vs dropout probability</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-500">Loading engagement data...</p>
                  </div>
                </div>
              ) : (
                <ScatterChart data={engagementData.slice(0, 50)}> {/* Limit points for performance */}
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="engagement" name="Engagement" unit="%" />
                  <YAxis dataKey="dropoutProbability" name="Dropout Probability" unit="%" />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                  <Scatter dataKey="dropoutProbability" fill="#8b5cf6" />
                </ScatterChart>
              )}
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}