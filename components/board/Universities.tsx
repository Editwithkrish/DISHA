// components/dashboard/Universities.tsx

"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Download } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

import { universitiesData } from '@/lib/data';

export default function Universities() {
    const [locationFilter, setLocationFilter] = useState('all');
    const [yearFilter, setYearFilter] = useState('2024');
    const [streamFilter, setStreamFilter] = useState('all');

    const filteredUniversities = universitiesData.filter(uni => {
        return (locationFilter === 'all' || uni.location === locationFilter) &&
            (yearFilter === 'all' || uni.year.toString() === yearFilter) &&
            (streamFilter === 'all' || uni.stream === streamFilter);
    });

    const exportToCSV = () => {
        const headers = ['University Name', 'Location', 'Students', 'Dropout Rate', 'Stream', 'Year'];
        const csvContent = [
            headers.join(','),
            ...filteredUniversities.map(uni =>
                [uni.name, uni.location, uni.students, uni.dropoutRate, uni.stream, uni.year].join(',')
            )
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'universities_dropout_data.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    };

    const COLORS = ['#2196F3', '#64B5F6', '#BBDEFB', '#E3F2FD', '#F5F9FF'];

    return (
        <div className="space-y-6">
            {/* Filters */}
            <Card className="bg-white border-blue-100 shadow-sm">
                <CardHeader>
                    <CardTitle className="text-slate-800">Filters & Export</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                            <Label htmlFor="location">Location</Label>
                            <Select value={locationFilter} onValueChange={setLocationFilter}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select location" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Locations</SelectItem>
                                    <SelectItem value="Jaipur">Jaipur</SelectItem>
                                    <SelectItem value="Kota">Kota</SelectItem>
                                    <SelectItem value="Udaipur">Udaipur</SelectItem>
                                    <SelectItem value="Jodhpur">Jodhpur</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="year">Year</Label>
                            <Select value={yearFilter} onValueChange={setYearFilter}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select year" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Years</SelectItem>
                                    <SelectItem value="2024">2024</SelectItem>
                                    <SelectItem value="2023">2023</SelectItem>
                                    <SelectItem value="2022">2022</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="stream">Stream</Label>
                            <Select value={streamFilter} onValueChange={setStreamFilter}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select stream" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Streams</SelectItem>
                                    <SelectItem value="Engineering">Engineering</SelectItem>
                                    <SelectItem value="Arts & Science">Arts & Science</SelectItem>
                                    <SelectItem value="Commerce">Commerce</SelectItem>
                                    <SelectItem value="Agriculture">Agriculture</SelectItem>
                                    <SelectItem value="Science">Science</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex items-end">
                            <Button onClick={exportToCSV} className="w-full bg-brand-primary hover:bg-brand-primary/90">
                                <Download className="w-4 h-4 mr-2" />
                                Export CSV
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Universities Table */}
                <Card className="bg-white border-blue-100 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-slate-800">Universities Overview</CardTitle>
                        <CardDescription>Dropout rates across universities</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>University</TableHead>
                                    <TableHead>Location</TableHead>
                                    <TableHead>Students</TableHead>
                                    <TableHead>Dropout Rate</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredUniversities.map((uni) => (
                                    <TableRow key={uni.id}>
                                        <TableCell className="font-medium">{uni.name}</TableCell>
                                        <TableCell>{uni.location}</TableCell>
                                        <TableCell>{uni.students.toLocaleString()}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <span>{uni.dropoutRate}%</span>
                                                <Badge
                                                    variant={uni.dropoutRate > 8 ? 'destructive' : uni.dropoutRate > 6 ? 'secondary' : 'default'}
                                                    className="text-xs"
                                                >
                                                    {uni.dropoutRate > 8 ? 'High' : uni.dropoutRate > 6 ? 'Medium' : 'Low'}
                                                </Badge>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {/* Dropout Rate Chart */}
                <Card className="bg-white border-blue-100 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-slate-800">Dropout Rate Comparison</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={filteredUniversities}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                <XAxis
                                    dataKey="name"
                                    stroke="#64748b"
                                    angle={-45}
                                    textAnchor="end"
                                    height={100}
                                    fontSize={10}
                                />
                                <YAxis stroke="#64748b" />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'white',
                                        border: '1px solid #e2e8f0',
                                        borderRadius: '8px',
                                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                    }}
                                />
                                <Bar dataKey="dropoutRate" fill="#64B5F6" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            {/* Stream Distribution */}
            <Card className="bg-white border-blue-100 shadow-sm">
                <CardHeader>
                    <CardTitle className="text-slate-800">Student Distribution by Stream</CardTitle>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={filteredUniversities.map(uni => ({ name: uni.stream, value: uni.students }))}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent = 0 }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {filteredUniversities.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
        </div>
    );
}