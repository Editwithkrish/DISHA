// components/dashboard/Teachers.tsx

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Users, TrendingUp, AlertTriangle } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

import { teachersData, engagementCorrelationData } from '@/lib/data';

export default function Teachers() {
    const avgEngagement = teachersData.reduce((sum, teacher) => sum + teacher.engagement, 0) / teachersData.length;
    const avgWorkload = teachersData.reduce((sum, teacher) => sum + teacher.workload, 0) / teachersData.length;
    const highEngagementTeachers = teachersData.filter(teacher => teacher.engagement >= 90);
    const overloadedTeachers = teachersData.filter(teacher => teacher.workload >= 22);

    return (
          <div className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-white border-blue-100 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-700">Total Teachers</CardTitle>
                  <Users className="h-4 w-4 text-brand-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-900">{teachersData.length}</div>
                  <p className="text-xs text-slate-500">Active faculty members</p>
                </CardContent>
              </Card>
    
              <Card className="bg-white border-blue-100 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-700">Avg Engagement</CardTitle>
                  <TrendingUp className="h-4 w-4 text-brand-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-900">{avgEngagement.toFixed(1)}%</div>
                  <p className="text-xs text-brand-primary">+2.3% from last month</p>
                </CardContent>
              </Card>
    
              <Card className="bg-white border-blue-100 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-700">Avg Workload</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-orange-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-900">{avgWorkload.toFixed(1)}h</div>
                  <p className="text-xs text-orange-600">Per week</p>
                </CardContent>
              </Card>
    
              <Card className="bg-white border-blue-100 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-700">High Performers</CardTitle>
                  <TrendingUp className="h-4 w-4 text-status-warning" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-900">{highEngagementTeachers.length}</div>
                  <p className="text-xs text-slate-500">90%+ engagement</p>
                </CardContent>
              </Card>
            </div>
    
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Teacher Performance Table */}
              <Card className="bg-white border-blue-100 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-slate-800">Teacher Performance Overview</CardTitle>
                  <CardDescription>Engagement levels and workload metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Teacher</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Engagement</TableHead>
                        <TableHead>Workload</TableHead>
                        <TableHead>Impact</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {teachersData.slice(0, 6).map((teacher) => (
                        <TableRow key={teacher.id}>
                          <TableCell className="font-medium">{teacher.name}</TableCell>
                          <TableCell>{teacher.subject}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Progress value={teacher.engagement} className="w-16 h-2" />
                              <span className="text-xs">{teacher.engagement}%</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={teacher.workload > 22 ? 'destructive' : teacher.workload > 18 ? 'secondary' : 'default'}>
                              {teacher.workload}h
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={teacher.dropoutRate < 5 ? 'default' : teacher.dropoutRate < 8 ? 'secondary' : 'destructive'}>
                              {teacher.dropoutRate}% dropout
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
    
              {/* Engagement vs Dropout Correlation */}
              <Card className="bg-white border-blue-100 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-slate-800">Engagement Impact Analysis</CardTitle>
                  <CardDescription>Correlation between teacher engagement and dropout rates</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={engagementCorrelationData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis
                        dataKey="engagement"
                        stroke="#64748b"
                        label={{ value: 'Teacher Engagement (%)', position: 'insideBottom', offset: -10 }}
                      />
                      <YAxis
                        stroke="#64748b"
                        label={{ value: 'Dropout Rate (%)', angle: -90, position: 'insideLeft' }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'white',
                          border: '1px solid #e2e8f0',
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="dropoutRate"
                        stroke="#ef4444"
                        strokeWidth={3}
                        dot={{ fill: '#ef4444', strokeWidth: 2, r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
    
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Workload Distribution */}
              <Card className="bg-white border-blue-100 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-slate-800">Workload Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={teachersData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis
                        dataKey="name"
                        stroke="#64748b"
                        angle={-45}
                        textAnchor="end"
                        height={100}
                        fontSize={10}
                      />
                      <YAxis stroke="#64748b" label={{ value: 'Hours/Week', angle: -90, position: 'insideLeft' }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'white',
                          border: '1px solid #e2e8f0',
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                      <Bar
                        dataKey="workload"
                        fill="#64B5F6"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
    
              {/* Engagement Levels */}
              <Card className="bg-white border-blue-100 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-slate-800">Teacher Engagement Levels</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={teachersData.sort((a, b) => a.engagement - b.engagement)}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis
                        dataKey="name"
                        stroke="#64748b"
                        angle={-45}
                        textAnchor="end"
                        height={100}
                        fontSize={10}
                      />
                      <YAxis stroke="#64748b" label={{ value: 'Engagement (%)', angle: -90, position: 'insideLeft' }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'white',
                          border: '1px solid #e2e8f0',
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="engagement"
                        stroke="#2196F3"
                        fill="#BBDEFB"
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
    
            {/* Alerts for Overloaded Teachers */}
            {overloadedTeachers.length > 0 && (
              <Card className="bg-orange-50 border-orange-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-slate-800 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-orange-500" />
                    Workload Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {overloadedTeachers.map((teacher) => (
                      <div key={teacher.id} className="flex items-center justify-between p-2 bg-white rounded border border-orange-100">
                        <span className="font-medium text-slate-800">{teacher.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-slate-600">{teacher.subject}</span>
                          <Badge variant="destructive">{teacher.workload}h/week</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        );
}