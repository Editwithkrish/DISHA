"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Download, FileText, BarChart3, Users, Calendar as CalendarIcon, Settings, Clock, CheckCircle } from 'lucide-react';
import { format } from "date-fns";

// Report templates data
const reportTemplates = [
  {
    id: 'academic-performance',
    name: 'Academic Performance Report',
    description: 'Comprehensive analysis of student academic metrics',
    category: 'Academic',
    frequency: 'Monthly',
    lastGenerated: '2024-01-15',
    size: '2.3 MB',
    format: ['PDF', 'Excel', 'CSV']
  },
  {
    id: 'enrollment-analytics',
    name: 'Enrollment Analytics',
    description: 'Student enrollment trends and demographics',
    category: 'Enrollment',
    frequency: 'Weekly',
    lastGenerated: '2024-01-20',
    size: '1.8 MB',
    format: ['PDF', 'Excel']
  },
  {
    id: 'faculty-workload',
    name: 'Faculty Workload Report',
    description: 'Faculty teaching loads and performance metrics',
    category: 'Faculty',
    frequency: 'Semester',
    lastGenerated: '2024-01-10',
    size: '3.1 MB',
    format: ['PDF', 'Word', 'Excel']
  },
  {
    id: 'financial-summary',
    name: 'Financial Summary',
    description: 'Budget allocation and expenditure analysis',
    category: 'Financial',
    frequency: 'Monthly',
    lastGenerated: '2024-01-18',
    size: '4.2 MB',
    format: ['PDF', 'Excel']
  },
  {
    id: 'student-success',
    name: 'Student Success Metrics',
    description: 'Retention, graduation, and success indicators',
    category: 'Student Success',
    frequency: 'Quarterly',
    lastGenerated: '2024-01-12',
    size: '2.7 MB',
    format: ['PDF', 'PowerPoint', 'Excel']
  },
  {
    id: 'research-output',
    name: 'Research Output Report',
    description: 'Publications, grants, and research metrics',
    category: 'Research',
    frequency: 'Annual',
    lastGenerated: '2024-01-05',
    size: '5.1 MB',
    format: ['PDF', 'Excel']
  }
];

const recentReports = [
  {
    name: 'Q4 2023 Academic Performance',
    type: 'Academic Performance Report',
    generatedBy: 'Dr. Sarah Johnson',
    date: '2024-01-20',
    status: 'Completed',
    downloads: 23,
    size: '2.3 MB'
  },
  {
    name: 'January Enrollment Summary',
    type: 'Enrollment Analytics',
    generatedBy: 'Mike Chen',
    date: '2024-01-19',
    status: 'Completed',
    downloads: 15,
    size: '1.8 MB'
  },
  {
    name: 'Faculty Workload Analysis',
    type: 'Faculty Workload Report',
    generatedBy: 'Dr. Emily Rodriguez',
    date: '2024-01-18',
    status: 'Processing',
    downloads: 0,
    size: '3.1 MB'
  },
  {
    name: 'December Financial Report',
    type: 'Financial Summary',
    generatedBy: 'David Thompson',
    date: '2024-01-17',
    status: 'Completed',
    downloads: 8,
    size: '4.2 MB'
  }
];

const scheduledReports = [
  {
    name: 'Weekly Enrollment Update',
    schedule: 'Every Monday 9:00 AM',
    nextRun: '2024-01-22',
    recipients: ['admin@university.edu', 'enrollment@university.edu'],
    format: 'PDF'
  },
  {
    name: 'Monthly Academic Summary',
    schedule: 'First Monday of each month',
    nextRun: '2024-02-05',
    recipients: ['dean@university.edu', 'provost@university.edu'],
    format: 'Excel'
  },
  {
    name: 'Quarterly Board Report',
    schedule: 'End of each quarter',
    nextRun: '2024-03-31',
    recipients: ['board@university.edu'],
    format: 'PowerPoint'
  }
];

const getCategoryColor = (category: string) => {
  const colors: { [key: string]: string } = {
    'Academic': 'bg-blue-100 text-blue-800 border-blue-200',
    'Enrollment': 'bg-green-100 text-green-800 border-green-200',
    'Faculty': 'bg-purple-100 text-purple-800 border-purple-200',
    'Financial': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'Student Success': 'bg-indigo-100 text-indigo-800 border-indigo-200',
    'Research': 'bg-pink-100 text-pink-800 border-pink-200'
  };
  return colors[category] || 'bg-gray-100 text-gray-800 border-gray-200';
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Completed': return 'bg-green-100 text-green-800 border-green-200';
    case 'Processing': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'Failed': return 'bg-red-100 text-red-800 border-red-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

export default function ExportReports() {
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [selectedFormat, setSelectedFormat] = useState('');
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({});
  const [includeCharts, setIncludeCharts] = useState(true);
  const [includeRawData, setIncludeRawData] = useState(false);
  const [recipientEmail, setRecipientEmail] = useState('');

  const handleGenerateReport = () => {
    // Report generation logic would go here
    console.log('Generating report with:', {
      template: selectedTemplate,
      format: selectedFormat,
      dateRange,
      includeCharts,
      includeRawData,
      recipientEmail
    });
  };

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reports Generated</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">247</div>
            <p className="text-xs text-muted-foreground">+12 this month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Downloads</CardTitle>
            <Download className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">+89 this week</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scheduled Reports</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">3 running today</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98.5%</div>
            <p className="text-xs text-muted-foreground">+0.3% this month</p>
          </CardContent>
        </Card>
      </div>

      {/* Report Generator */}
      <Card>
        <CardHeader>
          <CardTitle>Generate New Report</CardTitle>
          <CardDescription>Create custom reports with specific parameters</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="template">Report Template</Label>
                <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a report template" />
                  </SelectTrigger>
                  <SelectContent>
                    {reportTemplates.map((template) => (
                      <SelectItem key={template.id} value={template.id}>
                        {template.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="format">Export Format</Label>
                <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="excel">Excel</SelectItem>
                    <SelectItem value="csv">CSV</SelectItem>
                    <SelectItem value="word">Word</SelectItem>
                    <SelectItem value="powerpoint">PowerPoint</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>Date Range</Label>
                <div className="flex space-x-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="flex-1">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateRange.from ? format(dateRange.from, "PPP") : "From date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={dateRange.from}
                        onSelect={(date) => setDateRange(prev => ({ ...prev, from: date }))}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="flex-1">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateRange.to ? format(dateRange.to, "PPP") : "To date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={dateRange.to}
                        onSelect={(date) => setDateRange(prev => ({ ...prev, to: date }))}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label>Report Options</Label>
                <div className="space-y-3 mt-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="charts" 
                      checked={includeCharts} 
                      onCheckedChange={setIncludeCharts}
                    />
                    <Label htmlFor="charts">Include charts and visualizations</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="rawdata" 
                      checked={includeRawData} 
                      onCheckedChange={setIncludeRawData}
                    />
                    <Label htmlFor="rawdata">Include raw data tables</Label>
                  </div>
                </div>
              </div>
              
              <div>
                <Label htmlFor="email">Send to Email (Optional)</Label>
                <Input 
                  id="email"
                  type="email"
                  placeholder="recipient@university.edu"
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                />
              </div>
              
              <Button 
                onClick={handleGenerateReport} 
                className="w-full"
                disabled={!selectedTemplate || !selectedFormat}
              >
                <Download className="mr-2 h-4 w-4" />
                Generate Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Report Templates */}
        <Card>
          <CardHeader>
            <CardTitle>Available Templates</CardTitle>
            <CardDescription>Pre-configured report templates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reportTemplates.map((template) => (
                <div key={template.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold">{template.name}</h4>
                      <p className="text-sm text-muted-foreground">{template.description}</p>
                    </div>
                    <Badge className={getCategoryColor(template.category)}>
                      {template.category}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <span>Frequency: {template.frequency}</span>
                    <span>Size: {template.size}</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex space-x-1">
                      {template.format.map((fmt) => (
                        <Badge key={fmt} variant="outline" className="text-xs">
                          {fmt}
                        </Badge>
                      ))}
                    </div>
                    <Button size="sm" variant="outline">
                      <Download className="h-3 w-3 mr-1" />
                      Generate
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Reports */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Reports</CardTitle>
            <CardDescription>Recently generated reports</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentReports.map((report, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold">{report.name}</h4>
                      <p className="text-sm text-muted-foreground">{report.type}</p>
                    </div>
                    <Badge className={getStatusColor(report.status)}>
                      {report.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground mb-2">
                    <div>By: {report.generatedBy}</div>
                    <div>Date: {report.date}</div>
                    <div>Downloads: {report.downloads}</div>
                    <div>Size: {report.size}</div>
                  </div>
                  {report.status === 'Completed' && (
                    <Button size="sm" variant="outline" className="w-full">
                      <Download className="h-3 w-3 mr-1" />
                      Download
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Scheduled Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Scheduled Reports</CardTitle>
          <CardDescription>Automated report generation schedule</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {scheduledReports.map((report, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-semibold">{report.name}</h4>
                    <p className="text-sm text-muted-foreground">{report.schedule}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Settings className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline">
                      Run Now
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Next Run: </span>
                    <span className="font-medium">{report.nextRun}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Format: </span>
                    <Badge variant="outline">{report.format}</Badge>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Recipients: </span>
                    <span className="font-medium">{report.recipients.length}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}