// components/dashboard/Overview.tsx

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ScatterChart, Scatter, ComposedChart, Legend,
} from "recharts";

// Import only the data this component needs from your central data file
import { 
    ministryKPIs, 
    yearlyTrendData, 
    levelData, 
    reasonsData, 
    budgetUtilizationData, 
    districtPerformanceData, 
    policyImpactData, 
    ministryRadarData, 
    districtScatterData, 
    performanceComboData, 
    institutionTypeData 
} from '@/lib/data';

interface OverviewProps {
  t: any; // You can create a more specific type for your translations object if needed
}

export default function Overview({ t }: OverviewProps) {
  return (
    <div className="space-y-6">
      {/* Ministry KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {ministryKPIs.map((kpi, index) => (
          <Card key={index} className={`border border-slate-200/60 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm ${kpi.status === 'excellent' ? 'bg-gradient-to-br from-emerald-50/80 to-blue-50/60 hover:border-emerald-300' :
            kpi.status === 'good' ? 'bg-gradient-to-br from-blue-50/80 to-indigo-50/60 hover:border-blue-300' :
              kpi.status === 'on-track' ? 'bg-gradient-to-br from-amber-50/80 to-yellow-50/60 hover:border-amber-300' :
                'bg-gradient-to-br from-red-50/80 to-rose-50/60 hover:border-red-300'
            }`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-white/40 backdrop-blur-sm border-b border-white/60">
              <CardTitle className="text-sm font-semibold text-slate-800">{kpi.title}</CardTitle>
              <div className={`p-2 rounded-full ${kpi.status === 'excellent' ? 'bg-status-excellent/20' :
                  kpi.status === 'good' ? 'bg-brand-primary/20' :
                    kpi.status === 'on-track' ? 'bg-status-warning/20' :
                      'bg-status-danger/20'
                  }`}>
                <span className="text-lg">{kpi.icon}</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-800">{kpi.value}</div>
              <p className="text-xs text-slate-600 mt-1">Target: {kpi.target}</p>
              <div className="mt-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-slate-600">{kpi.percentage}%</span>
                  <span className={`text-xs font-medium ${kpi.trend.startsWith('+') ? 'text-status-excellent' : 'text-status-danger'
                      }`}>{kpi.trend}</span>
                </div>
                <Progress
                  value={kpi.percentage}
                  className={`h-2 ${kpi.status === 'excellent' ? '[&>div]:bg-status-excellent' :
                      kpi.status === 'good' ? '[&>div]:bg-brand-primary' :
                        kpi.status === 'on-track' ? '[&>div]:bg-status-warning' :
                          '[&>div]:bg-status-danger'
                      }`}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-2 border-blue-100 shadow-lg">
          <CardHeader>
            <CardTitle className="text-slate-800">{t.yearlyDropoutTrend}</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={yearlyTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                <XAxis dataKey="year" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="rate"
                  stroke="#2196F3"
                  strokeWidth={3}
                  dot={{ fill: "#2196F3", strokeWidth: 2, r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-2 border-blue-100 shadow-lg">
          <CardHeader>
            <CardTitle className="text-slate-800">{t.dropoutByLevel}</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={levelData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                <XAxis dataKey="level" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="dropouts" fill="#64B5F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="border-2 border-blue-100 shadow-lg">
        <CardHeader>
          <CardTitle className="text-slate-800">{t.dropoutReasons}</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={reasonsData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {reasonsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Ministry-Level Advanced Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <Card className="border-2 border-blue-100 shadow-lg">
          <CardHeader>
            <CardTitle className="text-slate-800">{t.budgetUtilization}</CardTitle>
            <CardDescription>Monthly budget allocation vs utilization trends</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={budgetUtilizationData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                  }}
                  formatter={(value, name) => [
                    `₹${value} Cr`,
                    name === 'allocated' ? 'Allocated' : 'Utilized'
                  ]}
                />
                <Area
                  type="monotone"
                  dataKey="allocated"
                  stackId="1"
                  stroke="#3b82f6"
                  fill="#dbeafe"
                  fillOpacity={0.6}
                />
                <Area
                  type="monotone"
                  dataKey="utilized"
                  stackId="2"
                  stroke="#10b981"
                  fill="#d1fae5"
                  fillOpacity={0.8}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-2 border-blue-100 shadow-lg">
          <CardHeader>
            <CardTitle className="text-slate-800">District Performance Scorecard</CardTitle>
            <CardDescription>Comprehensive education metrics by district</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={districtPerformanceData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                <XAxis type="number" domain={[0, 100]} stroke="#64748b" />
                <YAxis dataKey="district" type="category" stroke="#64748b" width={80} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                  }}
                  formatter={(value, name) => [
                    `${value}%`,
                    name === 'score' ? 'Overall Score' : name
                  ]}
                />
                <Bar dataKey="score" fill="#3b82f6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="border-2 border-blue-100 shadow-lg mt-6">
        <CardHeader>
          <CardTitle className="text-slate-800">{t.policyImpact}</CardTitle>
          <CardDescription>Impact assessment of key ministry policies</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {policyImpactData.map((policy, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-slate-800">{policy.policy}</h4>
                    <Badge variant={policy.status === 'active' ? 'default' : 'secondary'}>
                      {policy.status}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <div className="flex justify-between text-sm text-slate-600 mb-1">
                        <span>Impact Score</span>
                        <span>{policy.impact}%</span>
                      </div>
                      <Progress value={policy.impact} className="h-2" />
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-slate-800">{policy.beneficiaries}</div>
                      <div className="text-xs text-slate-600">Beneficiaries</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Advanced Ministry Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <Card className="border-2 border-purple-100 shadow-lg">
          <CardHeader>
            <CardTitle className="text-slate-800">Ministry Performance Radar</CardTitle>
            <CardDescription>Multi-dimensional performance analysis across key areas</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <RadarChart data={ministryRadarData}>
                <PolarGrid stroke="#e0e7ff" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12, fill: '#64748b' }} />
                <PolarRadiusAxis
                  angle={90}
                  domain={[0, 100]}
                  tick={{ fontSize: 10, fill: '#64748b' }}
                />
                <Radar
                  name="Current Year"
                  dataKey="A"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
                <Radar
                  name="Previous Year"
                  dataKey="B"
                  stroke="#10b981"
                  fill="#10b981"
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
                <Legend />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                  }}
                  formatter={(value, name) => [`${value}%`, name]}
                />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-2 border-blue-100 shadow-lg">
          <CardHeader>
            <CardTitle className="text-slate-800">District Enrollment vs Retention</CardTitle>
            <CardDescription>Scatter analysis of district performance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <ScatterChart data={districtScatterData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                <XAxis
                  type="number"
                  dataKey="x"
                  name="Enrollment Rate"
                  unit="%"
                  domain={[80, 100]}
                  stroke="#64748b"
                />
                <YAxis
                  type="number"
                  dataKey="y"
                  name="Retention Rate"
                  unit="%"
                  domain={[80, 100]}
                  stroke="#64748b"
                />
                <Tooltip
                  cursor={{ strokeDasharray: '3 3' }}
                  contentStyle={{
                    backgroundColor: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                  }}
                  formatter={(value, name, props) => {
                    if (name === 'x') return [`${value}%`, 'Enrollment Rate']
                    if (name === 'y') return [`${value}%`, 'Retention Rate']
                    if (name === 'z') return [`${(Number(value)/1000).toFixed(0)}K`, 'Students']
                    return [value, name]
                  }}
                  labelFormatter={(label, payload) => {
                    return payload?.[0]?.payload?.district || 'District'
                  }}
                />
                <Scatter
                  name="Districts"
                  dataKey="z"
                  fill="#10b981"
                  fillOpacity={0.7}
                />
              </ScatterChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="border-2 border-orange-100 shadow-lg mt-6">
        <CardHeader>
          <CardTitle className="text-slate-800">Comprehensive Performance Trends</CardTitle>
          <CardDescription>Combined view of education metrics and budget allocation</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <ComposedChart data={performanceComboData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
              <XAxis dataKey="month" stroke="#64748b" />
              <YAxis yAxisId="left" stroke="#64748b" />
              <YAxis yAxisId="right" orientation="right" stroke="#64748b" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                }}
                formatter={(value, name) => {
                  if (name === 'budget') return [`₹${value} Cr`, 'Budget']
                  return [`${value}%`, String(name).charAt(0).toUpperCase() + String(name).slice(1)]
                }}
              />
              <Legend />
              <Bar yAxisId="right" dataKey="budget" fill="#f59e0b" fillOpacity={0.7} />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="enrollment"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="retention"
                stroke="#10b981"
                strokeWidth={3}
                dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="completion"
                stroke="#8b5cf6"
                strokeWidth={3}
                dot={{ fill: "#8b5cf6", strokeWidth: 2, r: 4 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="border-2 border-indigo-100 shadow-lg mt-6">
        <CardHeader>
          <CardTitle className="text-slate-800">Institution Type Analysis</CardTitle>
          <CardDescription>Performance and funding distribution across institution types</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={institutionTypeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
              <XAxis dataKey="type" stroke="#64748b" angle={-45} textAnchor="end" height={100} />
              <YAxis stroke="#64748b" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                }}
                formatter={(value, name) => {
                  if (name === 'performance') return [`${value}%`, 'Performance Score']
                  if (name === 'funding') return [`₹${value} Cr`, 'Funding']
                  return [value, name]
                }}
              />
              <Bar dataKey="performance" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}