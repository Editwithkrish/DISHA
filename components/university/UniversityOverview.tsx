"use client"

import React from "react"
import { TrendingUp, Users, AlertTriangle, GraduationCap, BarChart3 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
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

// Data arrays
const universityKPIs = [
  {
    title: "Total Students",
    value: "12,450",
    target: "13,000",
    percentage: 95.8,
    trend: "+2.3%",
    icon: "👥",
    status: "good"
  },
  {
    title: "Dropout Rate",
    value: "8.2%",
    target: "<10%",
    percentage: 82,
    trend: "-1.5%",
    icon: "📉",
    status: "excellent"
  },
  {
    title: "At-Risk Students",
    value: "342",
    target: "<400",
    percentage: 85.5,
    trend: "-12",
    icon: "⚠️",
    status: "good"
  },
  {
    title: "Faculty Count",
    value: "485",
    target: "500",
    percentage: 97,
    trend: "+8",
    icon: "👨‍🏫",
    status: "excellent"
  }
]

const departmentData = [
  { department: "Engineering", enrollment: 3200, dropoutRate: 6.5 },
  { department: "Arts", enrollment: 2800, dropoutRate: 9.2 },
  { department: "Commerce", enrollment: 2400, dropoutRate: 7.8 },
  { department: "Science", enrollment: 2100, dropoutRate: 5.9 },
  { department: "Management", enrollment: 1950, dropoutRate: 8.4 }
]

const dropoutReasonsData = [
  { name: "Financial", value: 35, color: "#ef4444" },
  { name: "Academic", value: 28, color: "#f97316" },
  { name: "Personal", value: 20, color: "#eab308" },
  { name: "Health", value: 12, color: "#22c55e" },
  { name: "Others", value: 5, color: "#6366f1" }
]

const yearlyDropoutTrend = [
  { year: "2019", rate: 12.5 },
  { year: "2020", rate: 11.8 },
  { year: "2021", rate: 10.2 },
  { year: "2022", rate: 9.1 },
  { year: "2023", rate: 8.2 }
]

const engagementVsDropoutData = [
  { engagement: 95, dropoutProbability: 2, department: "Engineering" },
  { engagement: 88, dropoutProbability: 5, department: "Science" },
  { engagement: 82, dropoutProbability: 8, department: "Commerce" },
  { engagement: 75, dropoutProbability: 12, department: "Arts" },
  { engagement: 70, dropoutProbability: 15, department: "Management" },
  { engagement: 65, dropoutProbability: 18, department: "Others" }
]

export default function UniversityOverview() {
  return (
    <div className="space-y-8">
      {/* University KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {universityKPIs.map((kpi, index) => (
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
                    <span className="font-medium">{kpi.percentage}%</span>
                  </div>
                  <Progress value={kpi.percentage} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
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
              <BarChart data={departmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="department" />
                <YAxis yAxisId="left" orientation="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Bar yAxisId="left" dataKey="enrollment" fill="#3b82f6" name="Enrollment" />
                <Bar yAxisId="right" dataKey="dropoutRate" fill="#ef4444" name="Dropout Rate (%)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Dropout Reasons */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              <span>Dropout Reasons</span>
            </CardTitle>
            <CardDescription>Primary factors contributing to student dropout</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={dropoutReasonsData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${percent ? (percent * 100).toFixed(0) : 0}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {dropoutReasonsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
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
              <span>Dropout Trend</span>
            </CardTitle>
            <CardDescription>5-Year dropout rate improvement</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={yearlyDropoutTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="rate" stroke="#10b981" strokeWidth={3} />
              </LineChart>
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
              <ScatterChart data={engagementVsDropoutData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="engagement" name="Engagement" unit="%" />
                <YAxis dataKey="dropoutProbability" name="Dropout Probability" unit="%" />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter dataKey="dropoutProbability" fill="#8b5cf6" />
              </ScatterChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}