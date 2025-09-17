// components/dashboard/Settings.tsx

"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Settings as SettingsIcon, UserCheck } from 'lucide-react';

import { settingsData } from '@/lib/data';

export default function Settings() {
    const { toast } = useToast();
    const [activeTab, setActiveTab] = useState('profile');
    const [profile, setProfile] = useState(settingsData.profile);
    const [preferences, setPreferences] = useState(settingsData.preferences);
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(settingsData.security.twoFactorEnabled);

    const handleSaveProfile = () => {
        toast({
          title: "Profile Updated",
          description: "Your profile information has been saved successfully.",
        })
      }
  
      const handleSavePreferences = () => {
        toast({
          title: "Preferences Updated",
          description: "Your preferences have been saved successfully.",
        })
      }
  
      const handlePasswordChange = () => {
        toast({
          title: "Password Change",
          description: "Password change request has been initiated. Check your email for instructions.",
        })
      }

    return (
          <div className="space-y-6">
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                  <div className="h-5 w-5 text-brand-primary">
                    <SettingsIcon />
                  </div>
                  Settings
                </CardTitle>
                <CardDescription>Manage your account, preferences, and security settings</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-6">
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="preferences">Preferences</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                    <TabsTrigger value="roles">Roles & Access</TabsTrigger>
                    <TabsTrigger value="system">System Config</TabsTrigger>
                    <TabsTrigger value="ministry">Ministry Settings</TabsTrigger>
                  </TabsList>
    
                  {/* Profile Tab */}
                  <TabsContent value="profile" className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Profile Information</CardTitle>
                        <CardDescription>Update your personal information and contact details</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center space-x-4">
                          <Avatar className="h-20 w-20">
                            <AvatarImage src={profile.avatar} alt={profile.name} />
                            <AvatarFallback>{profile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <Button variant="outline">Change Photo</Button>
                        </div>
    
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                              id="name"
                              value={profile.name}
                              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              type="email"
                              value={profile.email}
                              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input
                              id="phone"
                              value={profile.phone}
                              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="department">Department</Label>
                            <Input
                              id="department"
                              value={profile.department}
                              onChange={(e) => setProfile({ ...profile, department: e.target.value })}
                            />
                          </div>
                        </div>
    
                        <div className="flex justify-end">
                          <Button onClick={handleSaveProfile}>Save Changes</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
    
                  {/* Preferences Tab */}
                  <TabsContent value="preferences" className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Display Preferences</CardTitle>
                        <CardDescription>Customize your dashboard appearance and behavior</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="theme">Theme</Label>
                            <Select value={preferences.theme} onValueChange={(value) => setPreferences({ ...preferences, theme: value })}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="light">Light</SelectItem>
                                <SelectItem value="dark">Dark</SelectItem>
                                <SelectItem value="system">System</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="language">Language</Label>
                            <Select value={preferences.language} onValueChange={(value) => setPreferences({ ...preferences, language: value })}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="en">English</SelectItem>
                                <SelectItem value="hi">हिंदी</SelectItem>
                                <SelectItem value="mr">मराठी</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
    
                        <Separator />
    
                        <div className="space-y-4">
                          <h4 className="text-sm font-medium">Dashboard Settings</h4>
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label>Auto Refresh</Label>
                              <p className="text-sm text-muted-foreground">Automatically refresh dashboard data</p>
                            </div>
                            <Switch
                              checked={preferences.dashboard.autoRefresh}
                              onCheckedChange={(checked) => setPreferences({
                                ...preferences,
                                dashboard: { ...preferences.dashboard, autoRefresh: checked }
                              })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="refresh-interval">Refresh Interval (seconds)</Label>
                            <Select
                              value={preferences.dashboard.refreshInterval.toString()}
                              onValueChange={(value) => setPreferences({
                                ...preferences,
                                dashboard: { ...preferences.dashboard, refreshInterval: parseInt(value) }
                              })}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="15">15 seconds</SelectItem>
                                <SelectItem value="30">30 seconds</SelectItem>
                                <SelectItem value="60">1 minute</SelectItem>
                                <SelectItem value="300">5 minutes</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
    
                        <div className="flex justify-end">
                          <Button onClick={handleSavePreferences}>Save Preferences</Button>
                        </div>
                      </CardContent>
                    </Card>
    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Notification Settings</CardTitle>
                        <CardDescription>Choose how you want to receive notifications</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label>Email Notifications</Label>
                              <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                            </div>
                            <Switch
                              checked={preferences.notifications.email}
                              onCheckedChange={(checked) => setPreferences({
                                ...preferences,
                                notifications: { ...preferences.notifications, email: checked }
                              })}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label>Push Notifications</Label>
                              <p className="text-sm text-muted-foreground">Receive browser push notifications</p>
                            </div>
                            <Switch
                              checked={preferences.notifications.push}
                              onCheckedChange={(checked) => setPreferences({
                                ...preferences,
                                notifications: { ...preferences.notifications, push: checked }
                              })}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label>SMS Notifications</Label>
                              <p className="text-sm text-muted-foreground">Receive notifications via SMS</p>
                            </div>
                            <Switch
                              checked={preferences.notifications.sms}
                              onCheckedChange={(checked) => setPreferences({
                                ...preferences,
                                notifications: { ...preferences.notifications, sms: checked }
                              })}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label>Report Notifications</Label>
                              <p className="text-sm text-muted-foreground">Get notified when reports are ready</p>
                            </div>
                            <Switch
                              checked={preferences.notifications.reports}
                              onCheckedChange={(checked) => setPreferences({
                                ...preferences,
                                notifications: { ...preferences.notifications, reports: checked }
                              })}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
    
                  {/* Security Tab */}
                  <TabsContent value="security" className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Security Settings</CardTitle>
                        <CardDescription>Manage your account security and authentication</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label>Two-Factor Authentication</Label>
                              <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                            </div>
                            <Switch
                              checked={twoFactorEnabled}
                              onCheckedChange={setTwoFactorEnabled}
                            />
                          </div>
                          <Separator />
                          <div className="space-y-2">
                            <Label>Password</Label>
                            <div className="flex items-center justify-between">
                              <p className="text-sm text-muted-foreground">Last changed: {settingsData.security.lastPasswordChange}</p>
                              <Button variant="outline" onClick={handlePasswordChange}>Change Password</Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Login History</CardTitle>
                        <CardDescription>Recent login activity on your account</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {settingsData.security.loginHistory.map((login, index) => (
                            <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                              <div>
                                <p className="font-medium">{login.date} at {login.time}</p>
                                <p className="text-sm text-muted-foreground">{login.location} • {login.device}</p>
                              </div>
                              <Badge variant="outline">Successful</Badge>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
    
                  {/* Roles & Access Tab */}
                  <TabsContent value="roles" className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Current Role</CardTitle>
                        <CardDescription>Your current role and permissions</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center space-x-4 p-4 border rounded-lg">
                          <div className="h-12 w-12 rounded-full bg-brand-primary/10 flex items-center justify-center">
                      <UserCheck className="h-6 w-6 text-brand-primary" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold">{profile.role}</h4>
                            <p className="text-sm text-muted-foreground">
                              {settingsData.roles.find(r => r.name === profile.role)?.description}
                            </p>
                          </div>
                          <Badge>{profile.role}</Badge>
                        </div>
                      </CardContent>
                    </Card>
    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Available Roles</CardTitle>
                        <CardDescription>Different role types and their permissions</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {settingsData.roles.map((role) => (
                            <div key={role.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                              <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center">
                                <UserCheck className="h-5 w-5 text-slate-600" />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium">{role.name}</h4>
                                <p className="text-sm text-muted-foreground">{role.description}</p>
                              </div>
                              <Badge variant={role.name === profile.role ? 'default' : 'outline'}>
                                {role.name === profile.role ? 'Current' : 'Available'}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
    
                  {/* System Configuration Tab */}
                  <TabsContent value="system" className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Data Management</CardTitle>
                        <CardDescription>Configure data sources, synchronization, and backup settings</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="data-source">Primary Data Source</Label>
                            <Select defaultValue="rajasthan-db">
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="rajasthan-db">Rajasthan Education Database</SelectItem>
                                <SelectItem value="central-db">Central Education Database</SelectItem>
                                <SelectItem value="hybrid">Hybrid Sources</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="sync-frequency">Data Sync Frequency</Label>
                            <Select defaultValue="hourly">
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="real-time">Real-time</SelectItem>
                                <SelectItem value="hourly">Hourly</SelectItem>
                                <SelectItem value="daily">Daily</SelectItem>
                                <SelectItem value="weekly">Weekly</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
    
                        <Separator />
    
                        <div className="space-y-4">
                          <h4 className="text-sm font-medium">System Performance</h4>
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label>Enable Caching</Label>
                              <p className="text-sm text-muted-foreground">Improve dashboard performance with data caching</p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label>Auto-scaling</Label>
                              <p className="text-sm text-muted-foreground">Automatically scale resources based on usage</p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cache-duration">Cache Duration (hours)</Label>
                            <Select defaultValue="6">
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="1">1 hour</SelectItem>
                                <SelectItem value="6">6 hours</SelectItem>
                                <SelectItem value="12">12 hours</SelectItem>
                                <SelectItem value="24">24 hours</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">API Configuration</CardTitle>
                        <CardDescription>Manage external integrations and API settings</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label>Enable External APIs</Label>
                              <p className="text-sm text-muted-foreground">Allow integration with external education systems</p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="api-rate-limit">API Rate Limit (requests/minute)</Label>
                            <Select defaultValue="1000">
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="100">100</SelectItem>
                                <SelectItem value="500">500</SelectItem>
                                <SelectItem value="1000">1000</SelectItem>
                                <SelectItem value="5000">5000</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="api-timeout">API Timeout (seconds)</Label>
                            <Input id="api-timeout" type="number" defaultValue="30" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
    
                  {/* Ministry Settings Tab */}
                  <TabsContent value="ministry" className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Ministry Configuration</CardTitle>
                        <CardDescription>Configure ministry-specific settings and policies</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="ministry-name">Ministry Name</Label>
                            <Input id="ministry-name" defaultValue="Education Ministry of Rajasthan" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="ministry-code">Ministry Code</Label>
                            <Input id="ministry-code" defaultValue="EDU-RAJ-2024" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="financial-year">Current Financial Year</Label>
                            <Select defaultValue="2024-25">
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="2023-24">2023-24</SelectItem>
                                <SelectItem value="2024-25">2024-25</SelectItem>
                                <SelectItem value="2025-26">2025-26</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="budget-allocation">Total Budget Allocation (₹ Crores)</Label>
                            <Input id="budget-allocation" type="number" defaultValue="15000" />
                          </div>
                        </div>
    
                        <Separator />
    
                        <div className="space-y-4">
                          <h4 className="text-sm font-medium">Policy Settings</h4>
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label>Enable Policy Impact Tracking</Label>
                              <p className="text-sm text-muted-foreground">Track the impact of education policies on key metrics</p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label>Automated Compliance Monitoring</Label>
                              <p className="text-sm text-muted-foreground">Monitor compliance with education regulations</p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="reporting-frequency">Ministry Reporting Frequency</Label>
                            <Select defaultValue="monthly">
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="weekly">Weekly</SelectItem>
                                <SelectItem value="monthly">Monthly</SelectItem>
                                <SelectItem value="quarterly">Quarterly</SelectItem>
                                <SelectItem value="annually">Annually</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">District Management</CardTitle>
                        <CardDescription>Configure district-level settings and thresholds</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="dropout-threshold">Dropout Alert Threshold (%)</Label>
                            <Input id="dropout-threshold" type="number" defaultValue="15" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="enrollment-target">Enrollment Target (%)</Label>
                            <Input id="enrollment-target" type="number" defaultValue="95" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="literacy-target">Literacy Target (%)</Label>
                            <Input id="literacy-target" type="number" defaultValue="85" />
                          </div>
                        </div>
    
                        <Separator />
    
                        <div className="space-y-4">
                          <h4 className="text-sm font-medium">Performance Monitoring</h4>
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label>Real-time District Monitoring</Label>
                              <p className="text-sm text-muted-foreground">Monitor district performance in real-time</p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label>Automated Alerts</Label>
                              <p className="text-sm text-muted-foreground">Send alerts when thresholds are breached</p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="alert-recipients">Alert Recipients</Label>
                            <Textarea
                              id="alert-recipients"
                              placeholder="Enter email addresses separated by commas"
                              defaultValue="secretary@education.rajasthan.gov.in, director@education.rajasthan.gov.in"
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Data Export & Integration</CardTitle>
                        <CardDescription>Configure data export formats and external integrations</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-4">
                          <h4 className="text-sm font-medium">Export Settings</h4>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="flex items-center space-x-2">
                              <Switch id="pdf-export" defaultChecked />
                              <Label htmlFor="pdf-export">PDF Export</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Switch id="excel-export" defaultChecked />
                              <Label htmlFor="excel-export">Excel Export</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Switch id="csv-export" defaultChecked />
                              <Label htmlFor="csv-export">CSV Export</Label>
                            </div>
                          </div>
    
                          <Separator />
    
                          <h4 className="text-sm font-medium">External Integrations</h4>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 border rounded-lg">
                              <div>
                                <Label>Central Education Database</Label>
                                <p className="text-sm text-muted-foreground">Sync with national education database</p>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Badge variant="outline" className="text-brand-primary">Connected</Badge>
                                <Switch defaultChecked />
                              </div>
                            </div>
                            <div className="flex items-center justify-between p-3 border rounded-lg">
                              <div>
                                <Label>State Financial System</Label>
                                <p className="text-sm text-muted-foreground">Integration with budget management system</p>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Badge variant="outline" className="text-brand-primary">Connected</Badge>
                                <Switch defaultChecked />
                              </div>
                            </div>
                            <div className="flex items-center justify-between p-3 border rounded-lg">
                              <div>
                                <Label>UDISE+ Portal</Label>
                                <p className="text-sm text-muted-foreground">Unified District Information System for Education</p>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Badge variant="outline" className="text-status-warning">Pending</Badge>
                                <Switch />
                              </div>
                            </div>
                          </div>
                        </div>
    
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline">Test Connections</Button>
                          <Button>Save Configuration</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        );
}