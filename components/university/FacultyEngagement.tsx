"use client"

import React, { useState, useEffect } from "react"
import { Users, TrendingUp, Award, BookOpen, RefreshCw, AlertTriangle } from "lucide-react"
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
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"
import { universityApi, type Student } from "@/lib/api/universityApi"

interface FacultyEngagementProps {
  selectedUniversity?: string;
}

// Fallback data for when API is unavailable
const fallbackFacultyRetentionData = [
  { year: "2020", retained: 94.2, departed: 5.8, newHires: 23 },
  { year: "2021", retained: 95.7, departed: 4.3, newHires: 18 },
  { year: "2022", retained: 93.8, departed: 6.2, newHires: 29 },
  { year: "2023", retained: 96.1, departed: 3.9, newHires: 15 }
]

const fallbackProfessionalDevelopmentData = [
  { category: "High Performers", completed: 89, target: 100, progress: 89 },
  { category: "Good Performers", completed: 134, target: 150, progress: 89 },
  { category: "Average Performers", completed: 67, target: 80, progress: 84 },
  { category: "Needs Improvement", completed: 23, target: 30, progress: 77 }
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

export default function FacultyEngagement({ selectedUniversity = "university-a" }: FacultyEngagementProps) {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchFacultyData = async () => {
    try {
      setLoading(true);
      setError(null);
      const allStudents = await universityApi.getAllUniversityStudents(selectedUniversity);
      setStudents(allStudents);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch faculty data');
      console.error('Error fetching faculty data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFacultyData();
    
    // Set up auto-refresh every 50 seconds
    const interval = setInterval(fetchFacultyData, 50000);
    return () => clearInterval(interval);
  }, [selectedUniversity]);

  // Calculate faculty metrics from student data
  const stats = students.length > 0 ? universityApi.calculateUniversityStats(students) : null;
  const departmentData = stats?.departmentData || [];
  
  // Generate faculty performance data from real student metrics
  const facultyData = departmentData.map((dept, index) => ({
    name: `Prof. ${dept.department.charAt(0)}. ${['Kumar', 'Sharma', 'Patel', 'Gupta', 'Singh'][index] || 'Faculty'}`,
    department: dept.department,
    engagement: Math.round(85 + (dept.enrollment / 100) * 10), // Simulate engagement based on enrollment
    workload: Math.round(70 + Math.random() * 20),
    dropoutRate: dept.dropoutRate,
    rank: index + 1
  }));

  // Generate workload distribution from department data
  const facultyWorkloadData = departmentData.slice(0, 5).map((dept, index) => ({
    name: `${dept.department.slice(0, 8)}`,
    teaching: Math.round(40 + Math.random() * 20),
    research: Math.round(25 + Math.random() * 20),
    admin: Math.round(15 + Math.random() * 15),
    satisfaction: Math.round((4.0 + Math.random() * 1.0) * 10) / 10
  }));

  // Generate professor performance from student success metrics
  const professorPerformanceData = departmentData.slice(0, 5).map((dept, index) => ({
    name: `Dr. ${dept.department} Faculty`,
    rating: Math.round((4.0 + (100 - dept.dropoutRate) / 100) * 10) / 10,
    courses: Math.round(2 + Math.random() * 4),
    successRate: Math.round(100 - dept.dropoutRate),
    research: dept.dropoutRate < 6 ? "High" : dept.dropoutRate < 8 ? "Medium" : "Low"
  }));

  // Calculate overall metrics
  const totalFaculty = departmentData.length * 97; // Simulate faculty count
  const avgEngagement = facultyData.length > 0 
    ? Math.round(facultyData.reduce((sum, f) => sum + f.engagement, 0) / facultyData.length * 10) / 10
    : 89.2;
  const retentionRate = 96.1; // Static for now
  const avgSatisfaction = facultyWorkloadData.length > 0
    ? Math.round(facultyWorkloadData.reduce((sum, f) => sum + f.satisfaction, 0) / facultyWorkloadData.length * 10) / 10
    : 4.2;

  if (error) {
    return (
      <div className="space-y-8">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2 text-red-600">
              <AlertTriangle className="h-5 w-5" />
              <span>Error loading faculty data: {error}</span>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={fetchFacultyData}
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
          <h2 className="text-2xl font-bold text-gray-900">Faculty Engagement</h2>
          {lastUpdated && (
            <p className="text-sm text-gray-500">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </p>
          )}
        </div>
        <Button 
          variant="outline" 
          onClick={fetchFacultyData}
          disabled={loading}
          className="flex items-center space-x-2"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </Button>
      </div>
      {/* Faculty Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading ? (
          // Loading skeletons
          Array.from({ length: 4 }).map((_, index) => (
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
                <CardTitle className="text-sm font-medium text-gray-600">Total Faculty</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">{totalFaculty.toLocaleString()}</div>
                <p className="text-sm text-gray-500 mt-1">Active faculty members</p>
              </CardContent>
            </Card>
            
            <Card className="border-l-4 border-l-green-500">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600">Avg Engagement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">{avgEngagement}%</div>
                <p className="text-sm text-gray-500 mt-1">Faculty engagement score</p>
              </CardContent>
            </Card>
            
            <Card className="border-l-4 border-l-purple-500">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600">Retention Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">{retentionRate}%</div>
                <p className="text-sm text-gray-500 mt-1">Faculty retention (2023)</p>
              </CardContent>
            </Card>
            
            <Card className="border-l-4 border-l-orange-500">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600">Avg Satisfaction</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">{avgSatisfaction}</div>
                <p className="text-sm text-gray-500 mt-1">Out of 5.0 rating</p>
              </CardContent>
            </Card>
          </>
        )}
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
              {loading ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell><Skeleton className="h-4 w-8" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-12" /></TableCell>
                  </TableRow>
                ))
              ) : (
                facultyData.map((faculty, index) => (
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
                    <TableCell>{faculty.dropoutRate.toFixed(1)}%</TableCell>
                  </TableRow>
                ))
              )}
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
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-500">Loading workload data...</p>
                  </div>
                </div>
              ) : (
                <BarChart data={facultyWorkloadData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="teaching" stackId="a" fill="#3b82f6" name="Teaching" />
                  <Bar dataKey="research" stackId="a" fill="#10b981" name="Research" />
                  <Bar dataKey="admin" stackId="a" fill="#f59e0b" name="Admin" />
                </BarChart>
              )}
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
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-500">Loading retention data...</p>
                  </div>
                </div>
              ) : (
                <LineChart data={fallbackFacultyRetentionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="retained" stroke="#10b981" strokeWidth={2} name="Retained (%)" />
                  <Line type="monotone" dataKey="newHires" stroke="#3b82f6" strokeWidth={2} name="New Hires" />
                </LineChart>
              )}
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
            {loading ? (
              Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <Skeleton className="h-3 w-full" />
                  <div className="flex justify-between text-sm">
                    <Skeleton className="h-3 w-16" />
                    <Skeleton className="h-3 w-12" />
                  </div>
                </div>
              ))
            ) : (
              fallbackProfessionalDevelopmentData.map((item, index) => (
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
              ))
            )}
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
              {loading ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-8" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-16" /></TableCell>
                    <TableCell><Skeleton className="h-2 w-full" /></TableCell>
                  </TableRow>
                ))
              ) : (
                professorPerformanceData.map((prof, index) => (
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
                ))
              )}
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
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-500">Loading satisfaction data...</p>
                </div>
              </div>
            ) : (
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
            )}
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}