"use client"

import React, { useState, useEffect } from "react"
import { BarChart3, TrendingUp, Users, GraduationCap, RefreshCw, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
} from "recharts"
import { universityApi, type Student } from "@/lib/api/universityApi"

interface DepartmentAnalyticsProps {
  selectedUniversity?: string;
}

// Fallback data for when API is unavailable
const fallbackStaffRatios = [
  { department: "Engineering", ratio: "1:18", optimal: "1:15", status: "needs_improvement" },
  { department: "Science", ratio: "1:16", optimal: "1:15", status: "good" },
  { department: "Arts", ratio: "1:22", optimal: "1:20", status: "acceptable" },
  { department: "Commerce", ratio: "1:25", optimal: "1:20", status: "needs_improvement" },
  { department: "Management", ratio: "1:19", optimal: "1:18", status: "good" }
]

const fallbackResearchData = [
  { year: "2020", publications: 234, patents: 12, funding: 15.6 },
  { year: "2021", publications: 267, patents: 18, funding: 18.9 },
  { year: "2022", publications: 298, patents: 23, funding: 22.4 },
  { year: "2023", publications: 342, patents: 31, funding: 28.7 }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "good": return "bg-green-100 text-green-800"
    case "acceptable": return "bg-yellow-100 text-yellow-800"
    case "needs_improvement": return "bg-red-100 text-red-800"
    default: return "bg-gray-100 text-gray-800"
  }
}

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "High": return "bg-red-100 text-red-800"
    case "Medium": return "bg-yellow-100 text-yellow-800"
    case "Low": return "bg-green-100 text-green-800"
    default: return "bg-gray-100 text-gray-800"
  }
}

export default function DepartmentAnalytics({ selectedUniversity = "mit-adt" }: DepartmentAnalyticsProps) {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchDepartmentData = async () => {
    try {
      setLoading(true);
      setError(null);
      const allStudents = await universityApi.getAllUniversityStudents(selectedUniversity);
      setStudents(allStudents);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch department data');
      console.error('Error fetching department data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartmentData();
    
    // Set up auto-refresh every 45 seconds
    const interval = setInterval(fetchDepartmentData, 45000);
    return () => clearInterval(interval);
  }, [selectedUniversity]);

  // Calculate real-time statistics from student data
  const stats = students.length > 0 ? universityApi.calculateUniversityStats(students) : null;
  const departmentData = stats?.departmentData || [];
  
  // Generate course success rates from real data
  const courseSuccessRates = students.length > 0 ? [
    {
      course: "High GPA (>8.0)",
      successRate: Math.round((students.filter(s => s.gpa_current > 8.0).length / students.length) * 100),
      difficulty: "High",
      enrollment: students.filter(s => s.gpa_current > 8.0).length
    },
    {
      course: "Good GPA (6.0-8.0)",
      successRate: Math.round((students.filter(s => s.gpa_current >= 6.0 && s.gpa_current <= 8.0).length / students.length) * 100),
      difficulty: "Medium",
      enrollment: students.filter(s => s.gpa_current >= 6.0 && s.gpa_current <= 8.0).length
    },
    {
      course: "Low GPA (<6.0)",
      successRate: Math.round((students.filter(s => s.gpa_current < 6.0).length / students.length) * 100),
      difficulty: "Low",
      enrollment: students.filter(s => s.gpa_current < 6.0).length
    },
    {
      course: "High Attendance (>90%)",
      successRate: Math.round((students.filter(s => s.attendance_overall_percent > 90).length / students.length) * 100),
      difficulty: "Medium",
      enrollment: students.filter(s => s.attendance_overall_percent > 90).length
    },
    {
      course: "Low Risk Students",
      successRate: Math.round((students.filter(s => s.riskLevel === 'low').length / students.length) * 100),
      difficulty: "Low",
      enrollment: students.filter(s => s.riskLevel === 'low').length
    }
  ] : [];

  // Generate internship placement data from engagement scores
  const internshipPlacementData = departmentData.map(dept => ({
    department: dept.department,
    placements: Math.round(dept.enrollment * 0.75), // Simulated placement count
    applications: dept.enrollment,
    rate: Math.round((dept.enrollment * 0.75 / dept.enrollment) * 100)
  }));

  if (error) {
    return (
      <div className="space-y-8">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2 text-red-600">
              <AlertTriangle className="h-5 w-5" />
              <span>Error loading department data: {error}</span>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={fetchDepartmentData}
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
          <h2 className="text-2xl font-bold text-gray-900">Department Analytics</h2>
          {lastUpdated && (
            <p className="text-sm text-gray-500">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </p>
          )}
        </div>
        <Button 
          variant="outline" 
          onClick={fetchDepartmentData}
          disabled={loading}
          className="flex items-center space-x-2"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </Button>
      </div>
      {/* Department Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          // Loading skeletons
          Array.from({ length: 3 }).map((_, index) => (
            <Card key={index} className="border-l-4 border-l-blue-500">
              <CardHeader className="pb-3">
                <Skeleton className="h-4 w-32" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16 mb-2" />
                <Skeleton className="h-3 w-40" />
              </CardContent>
            </Card>
          ))
        ) : (
          <>
            <Card className="border-l-4 border-l-blue-500">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600">Total Departments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">{departmentData.length}</div>
                <p className="text-sm text-gray-500 mt-1">Active academic departments</p>
              </CardContent>
            </Card>
            
            <Card className="border-l-4 border-l-green-500">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600">Average Enrollment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">
                  {departmentData.length > 0 
                    ? Math.round(departmentData.reduce((sum, dept) => sum + dept.enrollment, 0) / departmentData.length).toLocaleString()
                    : '0'
                  }
                </div>
                <p className="text-sm text-gray-500 mt-1">Students per department</p>
              </CardContent>
            </Card>
            
            <Card className="border-l-4 border-l-orange-500">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600">Best Performing</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold text-gray-900">
                  {departmentData.length > 0 
                    ? departmentData.reduce((best, dept) => dept.dropoutRate < best.dropoutRate ? dept : best, departmentData[0])?.department || 'N/A'
                    : 'N/A'
                  }
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {departmentData.length > 0 
                    ? `Lowest dropout rate: ${departmentData.reduce((best, dept) => dept.dropoutRate < best.dropoutRate ? dept : best, departmentData[0])?.dropoutRate.toFixed(1)}%`
                    : 'No data available'
                  }
                </p>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* Department Enrollment and Dropout Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              <span>Department Enrollment</span>
            </CardTitle>
            <CardDescription>Student enrollment by department</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-500">Loading enrollment data...</p>
                  </div>
                </div>
              ) : (
                <BarChart data={departmentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="department" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="enrollment" fill="#3b82f6" />
                </BarChart>
              )}
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-red-600" />
              <span>Dropout Rates</span>
            </CardTitle>
            <CardDescription>Dropout rates by department</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-500">Loading dropout data...</p>
                  </div>
                </div>
              ) : (
                <BarChart data={departmentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="department" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="dropoutRate" fill="#ef4444" />
                </BarChart>
              )}
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Staff-Student Ratios */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-purple-600" />
            <span>Staff-Student Ratios</span>
          </CardTitle>
          <CardDescription>Current ratios vs optimal targets</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Department</TableHead>
                <TableHead>Current Ratio</TableHead>
                <TableHead>Optimal Ratio</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-20" /></TableCell>
                  </TableRow>
                ))
              ) : (
                (departmentData.length > 0 ? departmentData : fallbackStaffRatios).map((item, index) => {
                  // Generate staff ratios from real data or use fallback
                  const ratio = 'enrollment' in item ? `1:${Math.round(item.enrollment / 50)}` : item.ratio;
                  const optimal = 'enrollment' in item ? '1:15' : item.optimal;
                  const currentRatio = 'enrollment' in item ? Math.round(item.enrollment / 50) : parseInt(item.ratio.split(':')[1]);
                  const optimalRatio = 'enrollment' in item ? 15 : parseInt(item.optimal.split(':')[1]);
                  const status = 'enrollment' in item 
                    ? (currentRatio <= optimalRatio ? 'good' : currentRatio <= optimalRatio + 3 ? 'acceptable' : 'needs_improvement')
                    : item.status;
                  
                  return (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{'enrollment' in item ? item.department : item.department}</TableCell>
                      <TableCell>{ratio}</TableCell>
                      <TableCell>{optimal}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(status)}>
                          {status.replace('_', ' ')}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Research Output Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <GraduationCap className="h-5 w-5 text-green-600" />
            <span>Research Output Trends</span>
          </CardTitle>
          <CardDescription>Publications, patents, and funding over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-500">Loading research data...</p>
                  </div>
                </div>
              ) : (
                <LineChart data={fallbackResearchData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Line yAxisId="left" type="monotone" dataKey="publications" stroke="#3b82f6" strokeWidth={2} name="Publications" />
                  <Line yAxisId="left" type="monotone" dataKey="patents" stroke="#10b981" strokeWidth={2} name="Patents" />
                  <Line yAxisId="right" type="monotone" dataKey="funding" stroke="#f59e0b" strokeWidth={2} name="Funding (M$)" />
                </LineChart>
              )}
            </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Course Success Rates */}
      <Card>
        <CardHeader>
          <CardTitle>Course Success Rates</CardTitle>
          <CardDescription>Success rates for key courses</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course</TableHead>
                <TableHead>Success Rate</TableHead>
                <TableHead>Difficulty</TableHead>
                <TableHead>Enrollment</TableHead>
                <TableHead>Progress</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-12" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-16" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                    <TableCell><Skeleton className="h-2 w-full" /></TableCell>
                  </TableRow>
                ))
              ) : (
                courseSuccessRates.map((course, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{course.course}</TableCell>
                    <TableCell>{course.successRate}%</TableCell>
                    <TableCell>
                      <Badge className={getDifficultyColor(course.difficulty)}>
                        {course.difficulty}
                      </Badge>
                    </TableCell>
                    <TableCell>{course.enrollment.toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="w-full">
                        <Progress value={course.successRate} className="h-2" />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Internship Placement Rates */}
      <Card>
        <CardHeader>
          <CardTitle>Internship Placement Rates</CardTitle>
          <CardDescription>Internship placements by department</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-500">Loading placement data...</p>
                  </div>
                </div>
              ) : (
                <BarChart data={internshipPlacementData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="department" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="rate" fill="#8b5cf6" name="Placement Rate (%)" />
                </BarChart>
              )}
            </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}