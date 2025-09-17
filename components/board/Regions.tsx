// components/dashboard/Regions.tsx

"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Filter, Search, RefreshCw, Download, Eye, Calendar, X } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

import { regionSummary, rajasthanDistricts, institutionData, institutionTypes } from '@/lib/data';

export default function Regions() {
    // All state related to filtering is now local to this component
    const [selectedLevel, setSelectedLevel] = useState('state'); // state, district, institution
    const [selectedRegion, setSelectedRegion] = useState('all');
    const [selectedDistrict, setSelectedDistrict] = useState('all');
    const [selectedInstitutionType, setSelectedInstitutionType] = useState('all');
    const [selectedInstitution, setSelectedInstitution] = useState('all');
    const [selectedMetric, setSelectedMetric] = useState('enrollment');
    const [selectedTimeframe, setSelectedTimeframe] = useState('current');
    const [searchQuery, setSearchQuery] = useState('');

    // All helper functions are also moved inside the component
    const getAvailableDistricts = () => {
        if (selectedRegion === 'all') return rajasthanDistricts.map(d => d.name);
        return rajasthanDistricts.filter(district => district.region === selectedRegion).map(d => d.name);
    }

    const getAvailableInstitutions = () => {
        let filtered = institutionData;
        if (selectedRegion !== 'all') {
            filtered = filtered.filter(inst => inst.region === selectedRegion);
        }
        if (selectedDistrict !== 'all') {
            filtered = filtered.filter(inst => inst.district === selectedDistrict);
        }
        if (selectedInstitutionType !== 'all') {
            filtered = filtered.filter(inst => inst.type === selectedInstitutionType);
        }
        if (searchQuery) {
            filtered = filtered.filter(inst =>
                inst.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                inst.type.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        return filtered;
    }
    
    const handleRegionChange = (region: string) => {
        setSelectedRegion(region);
        setSelectedDistrict('all');
        setSelectedInstitution('all');
    }

    const handleDistrictChange = (district: string) => {
        setSelectedDistrict(district);
        setSelectedInstitution('all');
    }

    const getFilteredData = () => {
        // This is a simplified logic. You might need to adjust based on your actual data structure.
        let data: any[] = [];
    
        if (selectedLevel === 'state') {
            data = regionSummary.map(r => ({ name: r.region, enrollment: r.avgEnrollment, students: r.totalStudents }));
        } else if (selectedLevel === 'district') {
            let districts = rajasthanDistricts;
            if (selectedRegion !== 'all') {
                districts = districts.filter(d => d.region === selectedRegion);
            }
            data = districts.map(d => ({ name: d.name, enrollment: d.enrollment, students: d.students }));
        } else { // institution
            data = getAvailableInstitutions().map(i => ({ name: i.name, enrollment: i.enrollment, students: i.students }));
        }
    
        if (searchQuery) {
            data = data.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
        }
    
        return data;
    };
    
    const filteredDistricts = rajasthanDistricts.filter(district => {
        if (selectedRegion === 'all') return true;
        return district.region === selectedRegion;
    });

   return (
         <div className="space-y-6">
           {/* Regional Overview Cards */}
           <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
             {regionSummary.map((region, index) => (
               <Card key={index} className="border-2 border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300">
                 <CardHeader className="pb-2">
                   <CardTitle className="text-sm font-medium text-slate-700">{region.region} Region</CardTitle>
                 </CardHeader>
                 <CardContent>
                   <div className="space-y-2">
                     <div className="text-lg font-bold text-slate-800">{region.districts} Districts</div>
                     <div className="text-sm text-slate-600">
                       <div>Enrollment: {region.avgEnrollment}%</div>
                       <div>Students: {(region.totalStudents / 1000).toFixed(0)}K</div>
                       <div>Budget: ₹{region.budget}Cr</div>
                     </div>
                   </div>
                 </CardContent>
               </Card>
             ))}
           </div>
   
           {/* Comprehensive Hierarchical Filters */}
           <Card className="border-2 border-blue-100 shadow-lg bg-gradient-to-r from-blue-50 to-indigo-50">
             <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
               <CardTitle className="flex items-center gap-2">
                 <Filter className="h-5 w-5" />
                 Comprehensive Analytics Filters
               </CardTitle>
               <CardDescription className="text-foreground/80">
                 Drill down from state to district to institution level data
               </CardDescription>
             </CardHeader>
             <CardContent className="p-6">
               {/* Level Selection */}
               <div className="mb-6">
                 <Label className="text-sm font-semibold text-slate-700 mb-2 block">Analysis Level</Label>
                 <div className="flex flex-wrap gap-2">
                   {['state', 'district', 'institution'].map((level) => (
                     <Button
                       key={level}
                       variant={selectedLevel === level ? 'default' : 'outline'}
                       size="sm"
                       onClick={() => setSelectedLevel(level)}
                       className={selectedLevel === level ? 'bg-brand-primary hover:bg-brand-primary/90' : 'hover:bg-background-muted'}
                     >
                       {level.charAt(0).toUpperCase() + level.slice(1)} Level
                     </Button>
                   ))}
                 </div>
               </div>
   
               {/* Search and Quick Filters */}
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                 <div>
                   <Label className="text-sm font-medium text-slate-700">Search</Label>
                   <div className="relative">
                     <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                     <Input
                       placeholder="Search districts, institutions..."
                       value={searchQuery}
                       onChange={(e) => setSearchQuery(e.target.value)}
                       className="pl-10"
                     />
                   </div>
                 </div>
                 <div>
                   <Label className="text-sm font-medium text-slate-700">Timeframe</Label>
                   <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                     <SelectTrigger>
                       <SelectValue placeholder="Select timeframe" />
                     </SelectTrigger>
                     <SelectContent>
                       <SelectItem value="current">Current Academic Year</SelectItem>
                       <SelectItem value="previous">Previous Academic Year</SelectItem>
                       <SelectItem value="last3">Last 3 Years</SelectItem>
                       <SelectItem value="last5">Last 5 Years</SelectItem>
                     </SelectContent>
                   </Select>
                 </div>
                 <div>
                   <Label className="text-sm font-medium text-slate-700">Primary Metric</Label>
                   <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                     <SelectTrigger>
                       <SelectValue placeholder="Select metric" />
                     </SelectTrigger>
                     <SelectContent>
                       <SelectItem value="enrollment">Enrollment Rate</SelectItem>
                       <SelectItem value="retention">Retention Rate</SelectItem>
                       <SelectItem value="completion">Completion Rate</SelectItem>
                       <SelectItem value="infrastructure">Infrastructure Score</SelectItem>
                       <SelectItem value="budget">Budget Utilization</SelectItem>
                       <SelectItem value="performance">Academic Performance</SelectItem>
                     </SelectContent>
                   </Select>
                 </div>
                 <div className="flex items-end">
                   <Button className="w-full bg-brand-primary hover:bg-brand-primary/90" variant="default">
                     <RefreshCw className="h-4 w-4 mr-2" />
                     Apply Filters
                   </Button>
                 </div>
               </div>
   
               {/* Hierarchical Filters */}
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                 <div>
                   <Label className="text-sm font-medium text-slate-700">Region</Label>
                   <Select value={selectedRegion} onValueChange={handleRegionChange}>
                     <SelectTrigger>
                       <SelectValue placeholder="Select region" />
                     </SelectTrigger>
                     <SelectContent>
                       <SelectItem value="all">All Regions</SelectItem>
                       <SelectItem value="Central">Central Rajasthan</SelectItem>
                       <SelectItem value="Western">Western Rajasthan</SelectItem>
                       <SelectItem value="Eastern">Eastern Rajasthan</SelectItem>
                       <SelectItem value="Southern">Southern Rajasthan</SelectItem>
                       <SelectItem value="Northern">Northern Rajasthan</SelectItem>
                     </SelectContent>
                   </Select>
                 </div>
   
                 <div>
                   <Label className="text-sm font-medium text-slate-700">District</Label>
                   <Select
                     value={selectedDistrict}
                     onValueChange={handleDistrictChange}
                     disabled={selectedRegion === 'all'}
                   >
                     <SelectTrigger>
                       <SelectValue placeholder="Select district" />
                     </SelectTrigger>
                     <SelectContent>
                       <SelectItem value="all">All Districts</SelectItem>
                       {getAvailableDistricts().map((district) => (
                         <SelectItem key={district} value={district}>
                           {district}
                         </SelectItem>
                       ))}
                     </SelectContent>
                   </Select>
                 </div>
   
                 <div>
                   <Label className="text-sm font-medium text-slate-700">Institution Type</Label>
                   <Select
                     value={selectedInstitutionType}
                     onValueChange={setSelectedInstitutionType}
                     disabled={selectedLevel === 'state'}
                   >
                     <SelectTrigger>
                       <SelectValue placeholder="Select type" />
                     </SelectTrigger>
                     <SelectContent>
                       <SelectItem value="all">All Types</SelectItem>
                       {institutionTypes.map((type) => (
                         <SelectItem key={type} value={type}>
                           {type}
                         </SelectItem>
                       ))}
                     </SelectContent>
                   </Select>
                 </div>
               </div>
   
               {/* Institution Selection (when district is selected) */}
               {selectedLevel === 'institution' && selectedDistrict !== 'all' && (
                 <div className="mt-4">
                   <Label className="text-sm font-medium text-slate-700">Specific Institution</Label>
                   <Select value={selectedInstitution} onValueChange={setSelectedInstitution}>
                     <SelectTrigger>
                       <SelectValue placeholder="Select institution" />
                     </SelectTrigger>
                     <SelectContent>
                       <SelectItem value="all">All Institutions</SelectItem>
                       {getAvailableInstitutions().map((institution) => (
                         <SelectItem key={institution.id} value={institution.id}>
                           {institution.name} ({institution.type})
                         </SelectItem>
                       ))}
                     </SelectContent>
                   </Select>
                 </div>
               )}
   
               {/* Action Buttons */}
               <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-slate-200">
                 <Button variant="outline" size="sm">
                   <Download className="h-4 w-4 mr-2" />
                   Export Data
                 </Button>
                 <Button variant="outline" size="sm">
                   <Eye className="h-4 w-4 mr-2" />
                   View Details
                 </Button>
                 <Button variant="outline" size="sm">
                   <Calendar className="h-4 w-4 mr-2" />
                   Schedule Report
                 </Button>
                 <Button
                   variant="ghost"
                   size="sm"
                   onClick={() => {
                     setSelectedLevel('state')
                     setSelectedRegion('all')
                     setSelectedDistrict('all')
                     setSelectedInstitutionType('all')
                     setSelectedInstitution('all')
                     setSearchQuery('')
                   }}
                 >
                   <X className="h-4 w-4 mr-2" />
                   Clear All
                 </Button>
               </div>
             </CardContent>
           </Card>
   
           {/* Filter Summary */}
           <Card className="border-2 border-blue-100 shadow-lg bg-gradient-to-r from-blue-50 to-blue-50">
             <CardContent className="pt-6">
               <div className="flex items-center justify-between">
                 <div className="flex items-center space-x-4">
                   <div className="bg-brand-primary/10 p-2 rounded-lg">
                     <Filter className="h-5 w-5 text-brand-primary" />
                   </div>
                   <div>
                     <h3 className="font-semibold text-slate-800">Current View</h3>
                     <p className="text-sm text-slate-600">
                       {selectedLevel === 'state' ? 'State-level Overview' :
                         selectedLevel === 'district' ? `District: ${selectedDistrict || 'All Districts'}` :
                           `Institution: ${selectedInstitution || 'All Institutions'}`}
                       {selectedRegion && ` • Region: ${selectedRegion}`}
                       {selectedInstitutionType && ` • Type: ${selectedInstitutionType}`}
                     </p>
                   </div>
                 </div>
                 <div className="text-right">
                   <div className="text-2xl font-bold text-slate-800">{getFilteredData().length}</div>
                   <div className="text-sm text-slate-600">
                     {selectedLevel === 'state' ? 'Regions' :
                       selectedLevel === 'district' ? 'Districts' :
                         'Institutions'}
                   </div>
                 </div>
               </div>
             </CardContent>
           </Card>
   
           {/* District Performance Visualization */}
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
             <Card className="border-2 border-blue-100 shadow-lg">
               <CardHeader>
                 <CardTitle className="text-slate-800">
                   {selectedLevel === 'state' ? 'Regional Performance Overview' :
                     selectedLevel === 'district' ? 'District Performance Comparison' :
                       'Institution Performance Analysis'}
                 </CardTitle>
                 <CardDescription>
                   {selectedLevel === 'state' ? 'Key education metrics across regions' :
                     selectedLevel === 'district' ? 'Key education metrics across districts' :
                       'Key education metrics across institutions'}
                 </CardDescription>
               </CardHeader>
               <CardContent>
                 <ResponsiveContainer width="100%" height={400}>
                   <BarChart data={getFilteredData()}>
                     <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                     <XAxis
                       dataKey="name"
                       stroke="#64748b"
                       angle={-45}
                       textAnchor="end"
                       height={80}
                     />
                     <YAxis stroke="#64748b" />
                     <Tooltip
                       contentStyle={{
                         backgroundColor: "#f8fafc",
                         border: "1px solid #e2e8f0",
                         borderRadius: "8px",
                       }}
                       formatter={(value, name) => [
                         `${value}%`,
                         typeof name === 'string' ? name.charAt(0).toUpperCase() + name.slice(1) : name
                       ]}
                     />
                     <Bar dataKey={selectedMetric} fill="#3b82f6" radius={[4, 4, 0, 0]} />
                   </BarChart>
                 </ResponsiveContainer>
               </CardContent>
             </Card>
   
             <Card className="border-2 border-blue-100 shadow-lg">
               <CardHeader>
                 <CardTitle className="text-slate-800">Regional Distribution</CardTitle>
                 <CardDescription>Student population by region</CardDescription>
               </CardHeader>
               <CardContent>
                 <ResponsiveContainer width="100%" height={400}>
                   <PieChart>
                     <Pie
                       data={regionSummary}
                       cx="50%"
                       cy="50%"
                       labelLine={false}
                       label={({ region, totalStudents }) =>
                         `${region}: ${(totalStudents / 1000).toFixed(0)}K`
                       }
                       outerRadius={120}
                       fill="#8884d8"
                       dataKey="totalStudents"
                     >
                       {regionSummary.map((entry, index) => (
                         <Cell key={`cell-${index}`} fill={[
                           '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'
                         ][index % 5]} />
                       ))}
                     </Pie>
                     <Tooltip
                       formatter={(value) => [`${(Number(value) / 1000).toFixed(0)}K Students`, 'Population']}
                     />
                   </PieChart>
                 </ResponsiveContainer>
               </CardContent>
             </Card>
           </div>
   
           {/* Detailed District Table */}
           <Card className="border-2 border-blue-100 shadow-lg">
             <CardHeader>
               <CardTitle className="text-slate-800">District Details</CardTitle>
               <CardDescription>Comprehensive metrics for selected districts</CardDescription>
             </CardHeader>
             <CardContent>
               <div className="overflow-x-auto">
                 <Table>
                   <TableHeader>
                     <TableRow>
                       <TableHead>District</TableHead>
                       <TableHead>Region</TableHead>
                       <TableHead>Schools</TableHead>
                       <TableHead>Students</TableHead>
                       <TableHead>Teachers</TableHead>
                       <TableHead>Enrollment %</TableHead>
                       <TableHead>Retention %</TableHead>
                       <TableHead>Budget (₹Cr)</TableHead>
                       <TableHead>Literacy %</TableHead>
                     </TableRow>
                   </TableHeader>
                   <TableBody>
                     {filteredDistricts.map((district, index) => (
                       <TableRow key={index}>
                         <TableCell className="font-medium">{district.name}</TableCell>
                         <TableCell>
                           <Badge variant="outline">{district.region}</Badge>
                         </TableCell>
                         <TableCell>{district.schools.toLocaleString()}</TableCell>
                         <TableCell>{district.students.toLocaleString()}</TableCell>
                         <TableCell>{district.teachers.toLocaleString()}</TableCell>
                         <TableCell>
                           <div className="flex items-center space-x-2">
                             <span>{district.enrollment}%</span>
                             <Progress value={district.enrollment} className="w-16 h-2" />
                           </div>
                         </TableCell>
                         <TableCell>
                           <div className="flex items-center space-x-2">
                             <span>{district.retention}%</span>
                             <Progress value={district.retention} className="w-16 h-2" />
                           </div>
                         </TableCell>
                         <TableCell>₹{district.budget}</TableCell>
                         <TableCell>{district.literacyRate}%</TableCell>
                       </TableRow>
                     ))}
                   </TableBody>
                 </Table>
               </div>
             </CardContent>
           </Card>
         </div>
       );
}