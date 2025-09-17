// components/dashboard/Counselling.tsx

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { HeartHandshake, AlertTriangle, TrendingUp, UserCheck, Eye, FileText, Calendar } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

import { counsellingData } from '@/lib/data';

export default function Counselling() {
    return (
          <div className="space-y-6">
            {/* Case Management Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-brand-primary text-sm font-medium">Active Cases</p>
                    <p className="text-2xl font-bold text-brand-primary">{counsellingData.caseStats.totalActive}</p>
                  </div>
                  <HeartHandshake className="h-8 w-8 text-brand-primary" />
                  </div>
                </CardContent>
              </Card>
    
              <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-status-danger text-sm font-medium">High Risk Cases</p>
                    <p className="text-2xl font-bold text-status-danger">{counsellingData.caseStats.highRisk}</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-status-danger" />
                  </div>
                </CardContent>
              </Card>
    
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-brand-primary text-sm font-medium">Success Rate</p>
                    <p className="text-2xl font-bold text-brand-primary">{counsellingData.caseStats.successRate}%</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-brand-primary" />
                  </div>
                </CardContent>
              </Card>
    
              <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-600 text-sm font-medium">Cases Closed</p>
                      <p className="text-2xl font-bold text-purple-800">{counsellingData.caseStats.closedThisMonth}</p>
                    </div>
                    <UserCheck className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
            </div>
    
            {/* Active Cases Table */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-slate-800">Active Cases Management</CardTitle>
                <CardDescription>Track ongoing counselling sessions and student progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Case ID</TableHead>
                        <TableHead>Student Name</TableHead>
                        <TableHead>Risk Level</TableHead>
                        <TableHead>Counselor</TableHead>
                        <TableHead>Progress</TableHead>
                        <TableHead>Next Follow-up</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {counsellingData.activeCases.map((case_) => (
                        <TableRow key={case_.id}>
                          <TableCell className="font-medium">{case_.id}</TableCell>
                          <TableCell>{case_.studentName}</TableCell>
                          <TableCell>
                            <Badge
                              variant={case_.riskLevel === 'High' ? 'destructive' : case_.riskLevel === 'Medium' ? 'secondary' : 'default'}
                            >
                              {case_.riskLevel}
                            </Badge>
                          </TableCell>
                          <TableCell>{case_.counselor}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Progress value={case_.progress} className="w-16" />
                              <span className="text-sm text-slate-600">{case_.progress}%</span>
                            </div>
                          </TableCell>
                          <TableCell>{case_.nextFollowUp}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <FileText className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
    
            {/* Follow-up Schedule & Intervention Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Upcoming Follow-ups */}
              <Card className="bg-white shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-slate-800">Upcoming Follow-ups</CardTitle>
                  <CardDescription>Schedule for next counselling sessions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {counsellingData.upcomingFollowUps.map((followUp, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Calendar className="h-5 w-5 text-slate-600" />
                          <div>
                            <p className="font-medium text-slate-800">{followUp.date}</p>
                            <p className="text-sm text-slate-600">{followUp.count} sessions</p>
                          </div>
                        </div>
                        <Badge
                          variant={followUp.priority === 'High' ? 'destructive' : followUp.priority === 'Medium' ? 'secondary' : 'default'}
                        >
                          {followUp.priority}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
    
              {/* Intervention Types Analysis */}
              <Card className="bg-white shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-slate-800">Intervention Analysis</CardTitle>
                  <CardDescription>Success rates by intervention type</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={counsellingData.interventionTypes}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="type" stroke="#64748b" fontSize={12} angle={-45} textAnchor="end" height={80} />
                      <YAxis stroke="#64748b" fontSize={12} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'white',
                          border: '1px solid #e2e8f0',
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                      <Bar dataKey="success" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </div>
        );
}