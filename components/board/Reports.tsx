// components/dashboard/Reports.tsx

"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { FileText, Calendar, Settings, Download, Eye, RefreshCw, Plus } from 'lucide-react';

import { reportsData } from '@/lib/data';

export default function Reports() {
    const { toast } = useToast();
    const [selectedTimeframe, setSelectedTimeframe] = useState('Last 30 days');
    const [selectedRegion, setSelectedRegion] = useState('All Districts');
    const [selectedCategory, setSelectedCategory] = useState('All Categories');
    const [selectedFormat, setSelectedFormat] = useState('PDF');
    const [selectedPriority, setSelectedPriority] = useState('All Priorities');
    const [selectedDepartment, setSelectedDepartment] = useState('All Departments');
    const [activeTab, setActiveTab] = useState('templates');

    const handleGenerateReport = (templateId: string) => {
      toast({
        title: "Report Generation Started",
        description: `Generating report for ${templateId}. You will be notified.`,
      });
    };

    
    const handleDownloadReport = (reportName: string) => {
        toast({
          title: "Download Started",
          description: `Downloading ${reportName}...`,
        })
      }
  
      const handleScheduleReport = (reportId: string) => {
            toast({
              title: "Report Scheduled",
              description: "Your report has been scheduled successfully.",
            })
          }
      
          const filteredTemplates = reportsData.templates.filter(template => {
            return (selectedCategory === 'All Categories' || template.category === selectedCategory) &&
              (selectedPriority === 'All Priorities' || template.priority === selectedPriority)
          })
      
          return (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Ministry Reports</h2>
                  <p className="text-slate-600 mt-1">Generate comprehensive ministry-level reports and analytics</p>
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => handleGenerateReport('custom')} className="bg-brand-primary hover:bg-brand-primary/90">
                    <FileText className="w-4 h-4 mr-2" />
                    Quick Generate
                  </Button>
                  <Button variant="outline">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Report
                  </Button>
                </div>
              </div>
      
              {/* Report Navigation Tabs */}
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8">
                  <button
                    onClick={() => setActiveTab('templates')}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'templates'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                  >
                    Report Templates
                  </button>
                  <button
                    onClick={() => setActiveTab('recent')}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'recent'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                  >
                    Recent Reports
                  </button>
                  <button
                    onClick={() => setActiveTab('scheduled')}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'scheduled'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                  >
                    Scheduled Reports
                  </button>
                </nav>
              </div>
      
              {/* Advanced Filters */}
              <Card className="bg-white shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                    <Settings className="h-5 w-5 text-brand-primary" />
                    Report Configuration & Filters
                  </CardTitle>
                  <CardDescription>Configure report parameters and apply advanced filters</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="timeframe">Time Period</Label>
                      <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select timeframe" />
                        </SelectTrigger>
                        <SelectContent>
                          {reportsData.filters.timeframes.map((timeframe) => (
                            <SelectItem key={timeframe} value={timeframe}>{timeframe}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
      
                    <div className="space-y-2">
                      <Label htmlFor="region">Region/District</Label>
                      <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select region" />
                        </SelectTrigger>
                        <SelectContent>
                          {reportsData.filters.regions.map((region) => (
                            <SelectItem key={region} value={region}>{region}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
      
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {reportsData.filters.categories.map((category) => (
                            <SelectItem key={category} value={category}>{category}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
      
                    <div className="space-y-2">
                      <Label htmlFor="priority">Priority</Label>
                      <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          {reportsData.filters.priorities.map((priority) => (
                            <SelectItem key={priority} value={priority}>{priority}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
      
                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          {reportsData.filters.departments.map((department) => (
                            <SelectItem key={department} value={department}>{department}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
      
                    <div className="space-y-2">
                      <Label htmlFor="format">Export Format</Label>
                      <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select format" />
                        </SelectTrigger>
                        <SelectContent>
                          {reportsData.filters.formats.map((format) => (
                            <SelectItem key={format} value={format}>{format}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
      
              {/* Report Templates Tab */}
              {activeTab === 'templates' && (
                <Card className="bg-white shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-slate-800">Ministry Report Templates</CardTitle>
                    <CardDescription>Pre-built ministry-level report templates for comprehensive analysis</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredTemplates.map((template) => (
                        <Card key={template.id} className="border border-slate-200 hover:border-blue-300 transition-colors">
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between mb-3">
                              <h4 className="font-semibold text-slate-800 text-lg">{template.name}</h4>
                              <div className="flex gap-2">
                                <Badge
                                  variant={template.priority === 'high' ? 'destructive' :
                                    template.priority === 'medium' ? 'default' : 'secondary'}
                                >
                                  {template.priority}
                                </Badge>
                                <Badge variant="outline">{template.category}</Badge>
                              </div>
                            </div>
                            <p className="text-slate-600 mb-4">{template.description}</p>
                            <div className="space-y-2 text-sm text-slate-500 mb-4">
                              <div className="flex justify-between">
                                <span>Last generated:</span>
                                <span>{template.lastGenerated}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Downloads:</span>
                                <span>{template.downloads.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Est. time:</span>
                                <span>{template.estimatedTime}</span>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                className="flex-1"
                                onClick={() => handleGenerateReport(template.id)}
                              >
                                <Download className="w-4 h-4 mr-2" />
                                Generate
                              </Button>
                              <Button variant="outline" size="sm">
                                <Calendar className="w-4 h-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
      
              {/* Recent Reports Tab */}
              {activeTab === 'recent' && (
                <Card className="bg-white shadow-sm">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg font-semibold text-slate-800">Recent Reports</CardTitle>
                        <CardDescription>Previously generated reports available for download</CardDescription>
                      </div>
                      <Button variant="outline" size="sm">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Refresh
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Report Name</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Size</TableHead>
                            <TableHead>Generated</TableHead>
                            <TableHead>Requested By</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {reportsData.recentReports.map((report, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium">{report.name}</TableCell>
                              <TableCell>
                                <Badge variant="outline">{report.category}</Badge>
                              </TableCell>
                              <TableCell>
                                <Badge variant="secondary">{report.type}</Badge>
                              </TableCell>
                              <TableCell>{report.size}</TableCell>
                              <TableCell>{report.generatedOn}</TableCell>
                              <TableCell className="text-sm text-slate-600">{report.requestedBy}</TableCell>
                              <TableCell>
                                <Badge
                                  variant={report.status === 'Ready' ? 'default' :
                                    report.status === 'Processing' ? 'secondary' : 'destructive'}
                                >
                                  {report.status}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className="flex gap-1">
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => handleDownloadReport(report.name)}
                                    disabled={report.status !== 'Ready'}
                                  >
                                    <Download className="w-4 h-4" />
                                  </Button>
                                  <Button size="sm" variant="ghost">
                                    <Eye className="w-4 h-4" />
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
              )}
      
              {/* Scheduled Reports Tab */}
              {activeTab === 'scheduled' && (
                <Card className="bg-white shadow-sm">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg font-semibold text-slate-800">Scheduled Reports</CardTitle>
                        <CardDescription>Automated report generation schedules</CardDescription>
                      </div>
                      <Button className="bg-brand-primary hover:bg-brand-primary/90">
                        <Plus className="w-4 h-4 mr-2" />
                        New Schedule
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {reportsData.scheduledReports.map((schedule) => (
                        <div key={schedule.id} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <h4 className="font-semibold text-slate-800">{schedule.name}</h4>
                              <div className="flex items-center gap-4 mt-2 text-sm text-slate-600">
                                <span>Frequency: {schedule.frequency}</span>
                                <span>Next Run: {schedule.nextRun}</span>
                                <span>Format: {schedule.format}</span>
                                <Badge
                                  variant={schedule.status === 'Active' ? 'default' : 'secondary'}
                                >
                                  {schedule.status}
                                </Badge>
                              </div>
                              <div className="mt-2">
                                <span className="text-sm text-slate-500">Recipients: </span>
                                <span className="text-sm">{schedule.recipients.join(', ')}</span>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <Settings className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant={schedule.status === 'Active' ? 'secondary' : 'default'}
                              >
                                {schedule.status === 'Active' ? 'Pause' : 'Resume'}
                              </Button>
                            </div>
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