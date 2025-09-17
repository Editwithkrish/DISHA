"use client"

import React from "react"
import { BarChart3, TrendingUp, Users, GraduationCap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
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

// Data arrays
const departmentData = [
  { department: "Engineering", enrollment: 3200, dropoutRate: 6.5 },
  { department: "Arts", enrollment: 2800, dropoutRate: 9.2 },
  { department: "Commerce", enrollment: 2400, dropoutRate: 7.8 },
  { department: "Science", enrollment: 2100, dropoutRate: 5.9 },
  { department: "Management", enrollment: 1950, dropoutRate: 8.4 }
]

const staffStudentRatios = [
  { department: "Engineering", ratio: "1:18", optimal: "1:15", status: "needs_improvement" },
  { department: "Science", ratio: "1:16", optimal: "1:15", status: "good" },
  { department: "Arts", ratio: "1:22", optimal: "1:20", status: "acceptable" },
  { department: "Commerce", ratio: "1:25", optimal: "1:20", status: "needs_improvement" },
  { department: "Management", ratio: "1:19", optimal: "1:18", status: "good" }
]

const researchOutputData = [
  { year: "2020", publications: 234, patents: 12, funding: 15.6 },
  { year: "2021", publications: 267, patents: 18, funding: 18.9 },
  { year: "2022", publications: 298, patents: 23, funding: 22.4 },
  { year: "2023", publications: 342, patents: 31, funding: 28.7 }
]

const courseSuccessRates = [
  { course: "Calculus I", successRate: 78.5, difficulty: "High", enrollment: 450 },
  { course: "Physics I", successRate: 82.1, difficulty: "High", enrollment: 380 },
  { course: "Chemistry I", successRate: 85.3, difficulty: "Medium", enrollment: 320 },
  { course: "English Comp", successRate: 91.2, difficulty: "Low", enrollment: 520 },
  { course: "Statistics", successRate: 76.8, difficulty: "High", enrollment: 290 }
]

const majorDeclarationTrends = [
  { major: "Computer Science", declared: 890, changed: 67, retention: 92.5 },
  { major: "Engineering", declared: 756, changed: 89, retention: 88.2 },
  { major: "Business", declared: 634, changed: 45, retention: 92.9 },
  { major: "Sciences", declared: 567, changed: 78, retention: 86.2 },
  { major: "Arts", declared: 445, changed: 34, retention: 92.4 }
]

const internshipPlacementData = [
  { department: "Engineering", placements: 234, applications: 267, rate: 87.6 },
  { department: "Business", placements: 189, applications: 203, rate: 93.1 },
  { department: "Computer Science", placements: 156, applications: 167, rate: 93.4 },
  { department: "Sciences", placements: 98, applications: 134, rate: 73.1 },
  { department: "Arts", placements: 67, applications: 89, rate: 75.3 }
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

export default function DepartmentAnalytics() {
  return (
    <div className="space-y-8">
      {/* Department Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Total Departments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">5</div>
            <p className="text-sm text-gray-500 mt-1">Active academic departments</p>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Average Enrollment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">2,490</div>
            <p className="text-sm text-gray-500 mt-1">Students per department</p>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Best Performing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-gray-900">Science</div>
            <p className="text-sm text-gray-500 mt-1">Lowest dropout rate: 5.9%</p>
          </CardContent>
        </Card>
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
              <BarChart data={departmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="department" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="enrollment" fill="#3b82f6" />
              </BarChart>
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
              <BarChart data={departmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="department" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="dropoutRate" fill="#ef4444" />
              </BarChart>
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
              {staffStudentRatios.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.department}</TableCell>
                  <TableCell>{item.ratio}</TableCell>
                  <TableCell>{item.optimal}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(item.status)}>
                      {item.status.replace('_', ' ')}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
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
            <LineChart data={researchOutputData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Line yAxisId="left" type="monotone" dataKey="publications" stroke="#3b82f6" strokeWidth={2} name="Publications" />
              <Line yAxisId="left" type="monotone" dataKey="patents" stroke="#10b981" strokeWidth={2} name="Patents" />
              <Line yAxisId="right" type="monotone" dataKey="funding" stroke="#f59e0b" strokeWidth={2} name="Funding (M$)" />
            </LineChart>
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
              {courseSuccessRates.map((course, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{course.course}</TableCell>
                  <TableCell>{course.successRate}%</TableCell>
                  <TableCell>
                    <Badge className={getDifficultyColor(course.difficulty)}>
                      {course.difficulty}
                    </Badge>
                  </TableCell>
                  <TableCell>{course.enrollment}</TableCell>
                  <TableCell>
                    <div className="w-full">
                      <Progress value={course.successRate} className="h-2" />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
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
            <BarChart data={internshipPlacementData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="department" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="rate" fill="#8b5cf6" name="Placement Rate (%)" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}