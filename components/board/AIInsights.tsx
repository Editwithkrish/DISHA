// components/dashboard/AIInsights.tsx

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BrainCircuit } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

import { aiInsightsData } from '@/lib/data';

export default function AIInsights() {
    
        return (
          <div className="space-y-6">
            {/* AI Prediction Accuracy */}
            <Card className="bg-white border-purple-100 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                  <BrainCircuit className="h-5 w-5text-[#0A3A67]" />
                  AI Prediction Accuracy
                </CardTitle>
                <CardDescription>Model performance and dropout predictions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Prediction vs Actual Chart */}
                  <div>
                    <h4 className="text-sm font-medium text-slate-700 mb-4">Predicted vs Actual Dropout Rates</h4>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={aiInsightsData.predictions}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                        <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                        <YAxis stroke="#64748b" fontSize={12} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'white',
                            border: '1px solid #e2e8f0',
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                          }}
                        />
                        <Line type="monotone" dataKey="predicted" stroke="#8b5cf6" strokeWidth={2} name="Predicted" />
                        <Line type="monotone" dataKey="actual" stroke="#10b981" strokeWidth={2} name="Actual" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
    
                  {/* Top Risk Factors */}
                  <div>
                    <h4 className="text-sm font-medium text-slate-700 mb-4">Top 5 Risk Factors</h4>
                    <div className="space-y-3">
                      {aiInsightsData.riskFactors.map((factor, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className={`w-2 h-2 rounded-full ${factor.trend === 'increasing' ? 'bg-red-500' :
                              factor.trend === 'decreasing' ? 'bg-blue-500' : 'bg-yellow-500'
                              }`} />
                            <span className="text-sm font-medium text-slate-700">{factor.factor}</span>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-semibold text-slate-800">{factor.impact}%</div>
                            <div className={`text-xs ${factor.trend === 'increasing' ? 'text-red-600' :
                              factor.trend === 'decreasing' ? 'text-blue-600' : 'text-yellow-600'
                              }`}>
                              {factor.trend}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
    
            {/* Regional Risk Heatmap */}
            <Card className="bg-white border-purple-100 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-slate-800">Regional Risk Analysis</CardTitle>
                <CardDescription>AI-powered regional dropout risk assessment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={aiInsightsData.region}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                        <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                        <YAxis stroke="#64748b" fontSize={12} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'white',
                            border: '1px solid #e2e8f0',
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                          }}
                        />
                        <Bar dataKey="value">
                          {aiInsightsData.region.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={
                                entry.risk === 'High'
                                  ? '#ef4444'
                                  : entry.risk === 'Medium'
                                    ? '#f59e0b'
                                    : '#10b981'
                              }
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
    
                  </div>
                  <div className="space-y-3">
                    {aiInsightsData.region.map((region, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${region.risk === 'High' ? 'bg-red-500' :
                            region.risk === 'Medium' ? 'bg-yellow-500' : 'bg-blue-500'
                            }`} />
                          <span className="text-sm font-medium text-slate-700">{region.name}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-semibold text-slate-800">{region.value}%</div>
                          <Badge variant={region.risk === 'High' ? 'destructive' : region.risk === 'Medium' ? 'secondary' : 'default'} className="text-xs">
                            {region.risk}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
    
            {/* Intervention Impact Analysis */}
            <Card className="bg-white border-purple-100 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-slate-800">Intervention Impact Analysis</CardTitle>
                <CardDescription>Effectiveness of different intervention strategies</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={aiInsightsData.interventionImpact} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis type="number" stroke="#64748b" fontSize={12} />
                    <YAxis dataKey="intervention" type="category" stroke="#64748b" fontSize={12} width={120} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Bar dataKey="before" fill="#ef4444" name="Before" />
                    <Bar dataKey="after" fill="#10b981" name="After" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        );
}