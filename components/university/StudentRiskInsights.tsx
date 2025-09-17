"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, ScatterChart, Scatter } from 'recharts';
import { AlertTriangle, TrendingDown, Users, Clock, Target, BookOpen } from 'lucide-react';

// Risk analysis data
const riskStudents = [
  { id: 'ST001', name: 'Alex Johnson', department: 'Computer Science', riskLevel: 'High', gpa: 2.1, attendance: 65, lastLogin: '3 days ago', alerts: ['Low GPA', 'Poor Attendance'] },
  { id: 'ST002', name: 'Sarah Williams', department: 'Mathematics', riskLevel: 'Medium', gpa: 2.8, attendance: 78, lastLogin: '1 day ago', alerts: ['Declining Performance'] },
  { id: 'ST003', name: 'Mike Brown', department: 'Physics', riskLevel: 'High', gpa: 1.9, attendance: 55, lastLogin: '5 days ago', alerts: ['Critical GPA', 'Extended Absence'] },
  { id: 'ST004', name: 'Emma Davis', department: 'Chemistry', riskLevel: 'Low', gpa: 3.2, attendance: 88, lastLogin: 'Today', alerts: [] },
  { id: 'ST005', name: 'John Wilson', department: 'Biology', riskLevel: 'Medium', gpa: 2.6, attendance: 72, lastLogin: '2 days ago', alerts: ['Inconsistent Attendance'] }
];

const riskTrends = [
  { month: 'Jan', highRisk: 45, mediumRisk: 78, lowRisk: 234 },
  { month: 'Feb', highRisk: 52, mediumRisk: 85, lowRisk: 221 },
  { month: 'Mar', highRisk: 48, mediumRisk: 92, lowRisk: 218 },
  { month: 'Apr', highRisk: 41, mediumRisk: 88, lowRisk: 229 },
  { month: 'May', highRisk: 38, mediumRisk: 82, lowRisk: 238 },
  { month: 'Jun', highRisk: 35, mediumRisk: 79, lowRisk: 244 }
];

const interventionSuccess = [
  { type: 'Academic Tutoring', success: 78, total: 95 },
  { type: 'Counseling Sessions', success: 65, total: 82 },
  { type: 'Peer Mentoring', success: 42, total: 58 },
  { type: 'Study Groups', success: 89, total: 112 },
  { type: 'Financial Aid', success: 34, total: 41 }
];

const earlyWarningMetrics = [
  { metric: 'GPA Below 2.5', count: 127, percentage: 8.2 },
  { metric: 'Attendance < 70%', count: 89, percentage: 5.7 },
  { metric: 'No LMS Login 7+ Days', count: 156, percentage: 10.1 },
  { metric: 'Failed 2+ Courses', count: 73, percentage: 4.7 },
  { metric: 'Financial Hold', count: 45, percentage: 2.9 }
];

const predictiveFactors = [
  { factor: 'Previous GPA', weight: 0.35, impact: 'High' },
  { factor: 'Attendance Rate', weight: 0.28, impact: 'High' },
  { factor: 'Engagement Score', weight: 0.22, impact: 'Medium' },
  { factor: 'Financial Status', weight: 0.15, impact: 'Medium' }
];

const getRiskColor = (level: string) => {
  switch (level) {
    case 'High': return 'bg-red-100 text-red-800 border-red-200';
    case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'Low': return 'bg-green-100 text-green-800 border-green-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const COLORS = ['#ef4444', '#f59e0b', '#10b981', '#3b82f6'];

export default function StudentRiskInsights() {
  return (
    <div className="space-y-6">
      {/* Risk Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Risk Students</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">35</div>
            <p className="text-xs text-muted-foreground">-3 from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Medium Risk Students</CardTitle>
            <TrendingDown className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">79</div>
            <p className="text-xs text-muted-foreground">-3 from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Interventions Active</CardTitle>
            <Target className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142</div>
            <p className="text-xs text-muted-foreground">+8 new this week</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <BookOpen className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">73%</div>
            <p className="text-xs text-muted-foreground">+5% from last semester</p>
          </CardContent>
        </Card>
      </div>

      {/* Risk Trends Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Risk Level Trends</CardTitle>
          <CardDescription>Student risk distribution over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={riskTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="highRisk" stroke="#ef4444" strokeWidth={2} name="High Risk" />
              <Line type="monotone" dataKey="mediumRisk" stroke="#f59e0b" strokeWidth={2} name="Medium Risk" />
              <Line type="monotone" dataKey="lowRisk" stroke="#10b981" strokeWidth={2} name="Low Risk" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* High Risk Students List */}
        <Card>
          <CardHeader>
            <CardTitle>High Risk Students</CardTitle>
            <CardDescription>Students requiring immediate attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {riskStudents.filter(student => student.riskLevel === 'High').map((student) => (
                <div key={student.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold">{student.name}</h4>
                      <p className="text-sm text-muted-foreground">{student.department}</p>
                    </div>
                    <Badge className={getRiskColor(student.riskLevel)}>
                      {student.riskLevel} Risk
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm mb-2">
                    <div>GPA: <span className="font-medium">{student.gpa}</span></div>
                    <div>Attendance: <span className="font-medium">{student.attendance}%</span></div>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {student.alerts.map((alert, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {alert}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Early Warning Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Early Warning Indicators</CardTitle>
            <CardDescription>Key metrics triggering risk alerts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {earlyWarningMetrics.map((metric, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{metric.metric}</span>
                    <span className="text-sm text-muted-foreground">{metric.count} students</span>
                  </div>
                  <Progress value={metric.percentage * 10} className="h-2" />
                  <div className="text-xs text-muted-foreground">{metric.percentage}% of total students</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Intervention Success Rates */}
        <Card>
          <CardHeader>
            <CardTitle>Intervention Success Rates</CardTitle>
            <CardDescription>Effectiveness of different intervention strategies</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={interventionSuccess}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip formatter={(value, name) => [value, name === 'success' ? 'Successful' : 'Total']} />
                <Bar dataKey="total" fill="#e5e7eb" name="Total" />
                <Bar dataKey="success" fill="#10b981" name="Successful" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Predictive Factors */}
        <Card>
          <CardHeader>
            <CardTitle>Predictive Risk Factors</CardTitle>
            <CardDescription>Factors contributing to student risk assessment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {predictiveFactors.map((factor, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{factor.factor}</span>
                    <Badge variant={factor.impact === 'High' ? 'destructive' : 'secondary'}>
                      {factor.impact} Impact
                    </Badge>
                  </div>
                  <Progress value={factor.weight * 100} className="h-2" />
                  <div className="text-xs text-muted-foreground">Weight: {(factor.weight * 100).toFixed(0)}%</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Critical Alerts */}
      <Card>
        <CardHeader>
          <CardTitle>Critical Alerts</CardTitle>
          <CardDescription>Immediate action required</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Alert className="border-red-200 bg-red-50">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">
                <strong>3 students</strong> have not logged into the LMS for over 10 days and have GPA below 2.0
              </AlertDescription>
            </Alert>
            <Alert className="border-yellow-200 bg-yellow-50">
              <Clock className="h-4 w-4 text-yellow-600" />
              <AlertDescription className="text-yellow-800">
                <strong>12 students</strong> are showing declining performance patterns across multiple courses
              </AlertDescription>
            </Alert>
            <Alert className="border-blue-200 bg-blue-50">
              <Users className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-800">
                <strong>8 students</strong> have requested academic counseling appointments this week
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}