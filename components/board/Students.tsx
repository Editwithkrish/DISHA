// components/dashboard/Students.tsx

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Users, TrendingUp, AlertTriangle, Calendar } from 'lucide-react';
import { PieChart, Pie, Cell, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

import { studentsData, riskDistributionData, performanceAttendanceData, gradeDistributionData } from '@/lib/data';

export default function Students() {
    const totalStudents = studentsData.length;
    const highRiskCount = studentsData.filter(s => s.riskLevel === 'High').length;
    const avgAttendance = studentsData.reduce((sum, s) => sum + s.attendance, 0) / totalStudents;
    const avgPerformance = studentsData.reduce((sum, s) => sum + s.performance, 0) / totalStudents;

    return (
          <div className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-white border-blue-100 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-700">Total Students</CardTitle>
                  <Users className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-900">{totalStudents}</div>
                  <p className="text-xs text-slate-500">Active students monitored</p>
                </CardContent>
              </Card>
    
              <Card className="bg-white border-red-100 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-700">High Risk Students</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">{highRiskCount}</div>
                  <p className="text-xs text-red-500">Require immediate attention</p>
                </CardContent>
              </Card>
    
              <Card className="bg-white border-blue-100 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-700">Average Attendance</CardTitle>
                  <Calendar className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">{avgAttendance.toFixed(1)}%</div>
                  <p className="text-xs text-blue-500">Overall attendance rate</p>
                </CardContent>
              </Card>
    
              <Card className="bg-white border-purple-100 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-700">Average Performance</CardTitle>
                  <TrendingUp className="h-4 w-4 text-[#0A3A67]" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-600">{avgPerformance.toFixed(1)}%</div>
                  <p className="text-xs text-[#0A3A67]">Academic performance</p>
                </CardContent>
              </Card>
            </div>
    
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Risk Distribution Chart */}
              <Card className="bg-white border-blue-100 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-slate-800">Student Risk Distribution</CardTitle>
                  <CardDescription>Classification by dropout risk level</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={riskDistributionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent = 0 }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {riskDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'white',
                          border: '1px solid #e2e8f0',
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
    
              {/* Performance vs Attendance Scatter */}
              <Card className="bg-white border-blue-100 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-slate-800">Performance vs Attendance</CardTitle>
                  <CardDescription>Correlation between attendance and academic performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={performanceAttendanceData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis
                        dataKey="name"
                        tick={{ fontSize: 12 }}
                        stroke="#64748b"
                      />
                      <YAxis
                        tick={{ fontSize: 12 }}
                        stroke="#64748b"
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'white',
                          border: '1px solid #e2e8f0',
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                      <Area type="monotone" dataKey="attendance" stackId="1" stroke="#3B82F6" fill="#DBEAFE" />
                      <Area type="monotone" dataKey="performance" stackId="1" stroke="#10B981" fill="#D1FAE5" />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
    
            {/* Students Table with Risk Analysis */}
            <Card className="bg-white border-blue-100 shadow-sm">
              <CardHeader>
                <CardTitle className="text-slate-800">Individual Student Analytics</CardTitle>
                <CardDescription>Detailed view of student performance and risk factors</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Grade</TableHead>
                      <TableHead>Attendance</TableHead>
                      <TableHead>Performance</TableHead>
                      <TableHead>Risk Level</TableHead>
                      <TableHead>Last Active</TableHead>
                      <TableHead>Suggestions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {studentsData.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium">{student.name}</TableCell>
                        <TableCell>{student.grade}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span>{student.attendance}%</span>
                            <div className={`w-2 h-2 rounded-full ${student.attendance >= 85 ? 'bg-blue-500' :
                              student.attendance >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                              }`} />
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span>{student.performance}%</span>
                            <div className={`w-2 h-2 rounded-full ${student.performance >= 80 ? 'bg-blue-500' :
                              student.performance >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                              }`} />
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={student.riskLevel === 'High' ? 'destructive' :
                              student.riskLevel === 'Medium' ? 'default' : 'secondary'}
                            className={student.riskLevel === 'Low' ? 'bg-blue-100 text-blue-800' : ''}
                          >
                            {student.riskLevel}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-slate-600">{student.lastActive}</TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            {student.suggestions.slice(0, 2).map((suggestion, idx) => (
                              <div key={idx} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                                {suggestion}
                              </div>
                            ))}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
    
            {/* Grade Distribution */}
            <Card className="bg-white border-blue-100 shadow-sm">
              <CardHeader>
                <CardTitle className="text-slate-800">Student Distribution by Grade</CardTitle>
                <CardDescription>Number of students across different grade levels</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={gradeDistributionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis
                      dataKey="grade"
                      tick={{ fontSize: 12 }}
                      stroke="#64748b"
                    />
                    <YAxis
                      tick={{ fontSize: 12 }}
                      stroke="#64748b"
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Bar dataKey="students" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        );
}