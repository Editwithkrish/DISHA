"use client"

import React from "react"
import { Users, TrendingUp, Award, BookOpen } from "lucide-react"
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
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"

// Data arrays
const facultyData = [
  { name: "Dr. Rajesh Kumar", department: "Engineering", engagement: 94, workload: 85, dropoutRate: 4.2, rank: 1 },
  { name: "Prof. Priya Sharma", department: "Science", engagement: 91, workload: 78, dropoutRate: 4.8, rank: 2 },
  { name: "Dr. Amit Patel", department: "Commerce", engagement: 89, workload: 82, dropoutRate: 5.1, rank: 3 },
  { name: "Prof. Sunita Gupta", department: "Arts", engagement: 87, workload: 75, dropoutRate: 6.2, rank: 4 },
  { name: "Dr. Vikram Singh", department: "Management", engagement: 85, workload: 88, dropoutRate: 6.8, rank: 5 }
]

const facultyWorkloadData = [
  { name: "Dr. Johnson", teaching: 40, research: 35, admin: 25, satisfaction: 4.2 },
  { name: "Prof. Chen", teaching: 50, research: 30, admin: 20, satisfaction: 4.0 },
  { name: "Dr. Davis", teaching: 35, research: 45, admin: 20, satisfaction: 4.5 },
  { name: "Prof. Wilson", teaching: 60, research: 20, admin: 20, satisfaction: 3.8 },
  { name: "Dr. Anderson", teaching: 45, research: 35, admin: 20, satisfaction: 4.3 }
]

const professionalDevelopmentData = [
  { category: "Conferences Attended", completed: 89, target: 100, progress: 89 },
  { category: "Certifications Earned", completed: 34, target: 40, progress: 85 },
  { category: "Training Hours", completed: 1240, target: 1500, progress: 83 },
  { category: "Research Collaborations", completed: 67, target: 75, progress: 89 }
]

const facultyRetentionData = [
  { year: "2020", retained: 94.2, departed: 5.8, newHires: 23 },
  { year: "2021", retained: 95.7, departed: 4.3, newHires: 18 },
  { year: "2022", retained: 93.8, departed: 6.2, newHires: 29 },
  { year: "2023", retained: 96.1, departed: 3.9, newHires: 15 }
]

const professorPerformanceData = [
  { name: "Dr. Sarah Johnson", rating: 4.8, courses: 3, successRate: 89.2, research: "High" },
  { name: "Prof. Michael Chen", rating: 4.6, courses: 4, successRate: 85.7, research: "Medium" },
  { name: "Dr. Emily Davis", rating: 4.9, courses: 2, successRate: 92.1, research: "High" },
  { name: "Prof. Robert Wilson", rating: 4.3, courses: 5, successRate: 81.4, research: "Low" },
  { name: "Dr. Lisa Anderson", rating: 4.7, courses: 3, successRate: 87.9, research: "High" }
]

const getEngagementColor = (engagement: number) => {
  if (engagement >= 90) return "bg-green-100 text-green-800"
  if (engagement >= 80) return "bg-yellow-100 text-yellow-800"
  return "bg-red-100 text-red-800"
}

const getResearchColor = (research: string) => {
  switch (research) {
    case "High": return "bg-green-100 text-green-800"
    case "Medium": return "bg-yellow-100 text-yellow-800"
    case "Low": return "bg-red-100 text-red-800"
    default: return "bg-gray-100 text-gray-800"
  }
}

const getSatisfactionColor = (satisfaction: number) => {
  if (satisfaction >= 4.5) return "text-green-600"
  if (satisfaction >= 4.0) return "text-yellow-600"
  return "text-red-600"
}

export default function FacultyEngagement() {
  return (
    <div className="space-y-8">
      {/* Faculty Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Total Faculty</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">485</div>
            <p className="text-sm text-gray-500 mt-1">Active faculty members</p>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Avg Engagement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">89.2%</div>
            <p className="text-sm text-gray-500 mt-1">Faculty engagement score</p>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Retention Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">96.1%</div>
            <p className="text-sm text-gray-500 mt-1">Faculty retention (2023)</p>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Avg Satisfaction</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">4.2</div>
            <p className="text-sm text-gray-500 mt-1">Out of 5.0 rating</p>
          </CardContent>
        </Card>
      </div>

      {/* Top Faculty Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Award className="h-5 w-5 text-yellow-600" />
            <span>Top Faculty Performance</span>
          </CardTitle>
          <CardDescription>Faculty ranked by engagement and student outcomes</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rank</TableHead>
                <TableHead>Faculty</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Engagement</TableHead>
                <TableHead>Workload</TableHead>
                <TableHead>Student Dropout Rate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {facultyData.map((faculty, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">#{faculty.rank}</TableCell>
                  <TableCell className="font-medium">{faculty.name}</TableCell>
                  <TableCell>{faculty.department}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <span>{faculty.engagement}%</span>
                      <Badge className={getEngagementColor(faculty.engagement)}>
                        {faculty.engagement >= 90 ? 'Excellent' : faculty.engagement >= 80 ? 'Good' : 'Needs Improvement'}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Progress value={faculty.workload} className="h-2 w-16" />
                    <span className="text-xs text-gray-500">{faculty.workload}%</span>
                  </TableCell>
                  <TableCell>{faculty.dropoutRate}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Faculty Workload Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-600" />
              <span>Workload Distribution</span>
            </CardTitle>
            <CardDescription>Teaching, research, and administrative responsibilities</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={facultyWorkloadData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="teaching" stackId="a" fill="#3b82f6" name="Teaching" />
                <Bar dataKey="research" stackId="a" fill="#10b981" name="Research" />
                <Bar dataKey="admin" stackId="a" fill="#f59e0b" name="Admin" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <span>Faculty Retention Trends</span>
            </CardTitle>
            <CardDescription>Retention rates and new hires over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={facultyRetentionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="retained" stroke="#10b981" strokeWidth={2} name="Retained (%)" />
                <Line type="monotone" dataKey="newHires" stroke="#3b82f6" strokeWidth={2} name="New Hires" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Professional Development Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BookOpen className="h-5 w-5 text-purple-600" />
            <span>Professional Development</span>
          </CardTitle>
          <CardDescription>Faculty development goals and progress</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {professionalDevelopmentData.map((item, index) => (
              <div key={index} className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{item.category}</span>
                  <span className="text-sm text-gray-500">{item.completed}/{item.target}</span>
                </div>
                <Progress value={item.progress} className="h-3" />
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Progress</span>
                  <span className="font-medium">{item.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Professor Performance Details */}
      <Card>
        <CardHeader>
          <CardTitle>Professor Performance Details</CardTitle>
          <CardDescription>Detailed performance metrics for faculty members</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Professor</TableHead>
                <TableHead>Student Rating</TableHead>
                <TableHead>Courses</TableHead>
                <TableHead>Success Rate</TableHead>
                <TableHead>Research Level</TableHead>
                <TableHead>Overall Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {professorPerformanceData.map((prof, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{prof.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <span className={`font-medium ${getSatisfactionColor(prof.rating)}`}>
                        {prof.rating}
                      </span>
                      <span className="text-gray-400">/5.0</span>
                    </div>
                  </TableCell>
                  <TableCell>{prof.courses}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Progress value={prof.successRate} className="h-2 w-16" />
                      <span className="text-sm">{prof.successRate}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getResearchColor(prof.research)}>
                      {prof.research}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="w-full">
                      <Progress value={(prof.rating / 5) * 100} className="h-2" />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Faculty Satisfaction Radar */}
      <Card>
        <CardHeader>
          <CardTitle>Faculty Satisfaction Analysis</CardTitle>
          <CardDescription>Multi-dimensional view of faculty satisfaction metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart data={facultyWorkloadData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="name" />
              <PolarRadiusAxis angle={90} domain={[0, 5]} />
              <Radar
                name="Satisfaction"
                dataKey="satisfaction"
                stroke="#8b5cf6"
                fill="#8b5cf6"
                fillOpacity={0.3}
                strokeWidth={2}
              />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}