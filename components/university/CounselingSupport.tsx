"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { Headset, Users, Calendar, TrendingUp, Clock, CheckCircle, AlertCircle, Phone } from 'lucide-react';

// Counseling data
const counselingStats = [
  { metric: 'Total Sessions', value: 1247, change: '+12%', icon: Calendar },
  { metric: 'Active Cases', value: 89, change: '+5%', icon: Users },
  { metric: 'Success Rate', value: '78%', change: '+3%', icon: CheckCircle },
  { metric: 'Avg Wait Time', value: '3.2 days', change: '-15%', icon: Clock }
];

const sessionTrends = [
  { month: 'Jan', individual: 45, group: 23, crisis: 8, total: 76 },
  { month: 'Feb', individual: 52, group: 28, crisis: 12, total: 92 },
  { month: 'Mar', individual: 48, group: 31, crisis: 9, total: 88 },
  { month: 'Apr', individual: 56, group: 25, crisis: 15, total: 96 },
  { month: 'May', individual: 61, group: 29, crisis: 11, total: 101 },
  { month: 'Jun', individual: 58, group: 33, crisis: 7, total: 98 }
];

const issueCategories = [
  { name: 'Academic Stress', value: 35, color: '#3b82f6' },
  { name: 'Anxiety/Depression', value: 28, color: '#ef4444' },
  { name: 'Relationship Issues', value: 18, color: '#f59e0b' },
  { name: 'Financial Stress', value: 12, color: '#10b981' },
  { name: 'Family Problems', value: 7, color: '#8b5cf6' }
];

const counselorWorkload = [
  { name: 'Dr. Sarah Johnson', activeClients: 24, weeklyHours: 32, specialization: 'Academic Stress', satisfaction: 4.8 },
  { name: 'Dr. Michael Chen', activeClients: 19, weeklyHours: 28, specialization: 'Anxiety/Depression', satisfaction: 4.9 },
  { name: 'Dr. Emily Rodriguez', activeClients: 22, weeklyHours: 30, specialization: 'Crisis Intervention', satisfaction: 4.7 },
  { name: 'Dr. David Thompson', activeClients: 18, weeklyHours: 26, specialization: 'Relationship Counseling', satisfaction: 4.6 },
  { name: 'Dr. Lisa Wang', activeClients: 21, weeklyHours: 29, specialization: 'Group Therapy', satisfaction: 4.8 }
];

const interventionOutcomes = [
  { intervention: 'Individual Therapy', completed: 156, successful: 122, ongoing: 34 },
  { intervention: 'Group Sessions', completed: 89, successful: 71, ongoing: 18 },
  { intervention: 'Crisis Support', completed: 45, successful: 38, ongoing: 7 },
  { intervention: 'Peer Support', completed: 67, successful: 52, ongoing: 15 },
  { intervention: 'Workshops', completed: 234, successful: 198, ongoing: 36 }
];

const upcomingAppointments = [
  { time: '9:00 AM', student: 'Alex Johnson', counselor: 'Dr. Sarah Johnson', type: 'Individual', status: 'Confirmed' },
  { time: '10:30 AM', student: 'Emma Davis', counselor: 'Dr. Michael Chen', type: 'Follow-up', status: 'Confirmed' },
  { time: '2:00 PM', student: 'Group Session A', counselor: 'Dr. Lisa Wang', type: 'Group', status: 'Scheduled' },
  { time: '3:30 PM', student: 'Mike Brown', counselor: 'Dr. Emily Rodriguez', type: 'Crisis', status: 'Urgent' },
  { time: '4:00 PM', student: 'Sarah Williams', counselor: 'Dr. David Thompson', type: 'Individual', status: 'Confirmed' }
];

const wellnessPrograms = [
  { program: 'Mindfulness Workshops', participants: 145, completion: 78, satisfaction: 4.6 },
  { program: 'Stress Management', participants: 123, completion: 85, satisfaction: 4.7 },
  { program: 'Study Skills Training', participants: 167, completion: 92, satisfaction: 4.5 },
  { program: 'Peer Support Groups', participants: 89, completion: 67, satisfaction: 4.8 },
  { program: 'Mental Health Awareness', participants: 234, completion: 88, satisfaction: 4.4 }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Urgent': return 'bg-red-100 text-red-800 border-red-200';
    case 'Confirmed': return 'bg-green-100 text-green-800 border-green-200';
    case 'Scheduled': return 'bg-blue-100 text-blue-800 border-blue-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const COLORS = ['#3b82f6', '#ef4444', '#f59e0b', '#10b981', '#8b5cf6'];

export default function CounselingSupport() {
  return (
    <div className="space-y-6">
      {/* Counseling Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {counselingStats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.metric}</CardTitle>
                <IconComponent className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.change} from last month</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Session Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Counseling Session Trends</CardTitle>
          <CardDescription>Monthly breakdown of different session types</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={sessionTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="individual" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} name="Individual" />
              <Area type="monotone" dataKey="group" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.6} name="Group" />
              <Area type="monotone" dataKey="crisis" stackId="1" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} name="Crisis" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Issue Categories */}
        <Card>
          <CardHeader>
            <CardTitle>Common Issues</CardTitle>
            <CardDescription>Distribution of counseling session topics</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={issueCategories}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${percent ? (percent * 100).toFixed(0) : 0}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {issueCategories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Today's Appointments */}
        <Card>
          <CardHeader>
            <CardTitle>Today's Appointments</CardTitle>
            <CardDescription>Scheduled counseling sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingAppointments.map((appointment, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="text-sm font-medium">{appointment.time}</div>
                    <div>
                      <div className="text-sm font-medium">{appointment.student}</div>
                      <div className="text-xs text-muted-foreground">{appointment.counselor}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">{appointment.type}</Badge>
                    <Badge className={getStatusColor(appointment.status)}>
                      {appointment.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Counselor Workload */}
      <Card>
        <CardHeader>
          <CardTitle>Counselor Workload</CardTitle>
          <CardDescription>Current caseload and performance metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Counselor</th>
                  <th className="text-left p-2">Active Clients</th>
                  <th className="text-left p-2">Weekly Hours</th>
                  <th className="text-left p-2">Specialization</th>
                  <th className="text-left p-2">Satisfaction</th>
                  <th className="text-left p-2">Workload</th>
                </tr>
              </thead>
              <tbody>
                {counselorWorkload.map((counselor, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-2 font-medium">{counselor.name}</td>
                    <td className="p-2">{counselor.activeClients}</td>
                    <td className="p-2">{counselor.weeklyHours}h</td>
                    <td className="p-2">{counselor.specialization}</td>
                    <td className="p-2">
                      <div className="flex items-center space-x-1">
                        <span>{counselor.satisfaction}</span>
                        <span className="text-yellow-500">★</span>
                      </div>
                    </td>
                    <td className="p-2">
                      <Progress value={(counselor.activeClients / 30) * 100} className="h-2 w-20" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Intervention Outcomes */}
        <Card>
          <CardHeader>
            <CardTitle>Intervention Outcomes</CardTitle>
            <CardDescription>Success rates of different intervention types</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={interventionOutcomes}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="intervention" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="completed" fill="#e5e7eb" name="Completed" />
                <Bar dataKey="successful" fill="#10b981" name="Successful" />
                <Bar dataKey="ongoing" fill="#3b82f6" name="Ongoing" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Wellness Programs */}
        <Card>
          <CardHeader>
            <CardTitle>Wellness Programs</CardTitle>
            <CardDescription>Preventive mental health initiatives</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {wellnessPrograms.map((program, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{program.program}</span>
                    <span className="text-sm text-muted-foreground">{program.participants} participants</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <div className="text-xs text-muted-foreground mb-1">Completion Rate</div>
                      <Progress value={program.completion} className="h-2" />
                      <div className="text-xs text-muted-foreground mt-1">{program.completion}%</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-muted-foreground">Satisfaction</div>
                      <div className="text-sm font-medium">{program.satisfaction} ★</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common counseling support tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button className="h-auto p-4 flex flex-col items-center space-y-2">
              <Calendar className="h-6 w-6" />
              <span>Schedule Session</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <Phone className="h-6 w-6" />
              <span>Crisis Hotline</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <Users className="h-6 w-6" />
              <span>Group Sessions</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <Headset className="h-6 w-6" />
              <span>Wellness Check</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}