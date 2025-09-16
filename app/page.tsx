"use client"

import React, { useState } from "react"
import Link from "next/link"
import {
  BarChart3,
  Bell,
  Menu,
  AlertTriangle,
  Users,
  GraduationCap,
  TrendingUp,
  FileText,
  Settings,
  MapPin,
  BrainCircuit,
  HeartHandshake,
  UserCheck,
  Globe,
  ChevronDown,
  Download,
  Filter,
  Search,
  Eye,
  X,
  Calendar,
  Plus,
  RefreshCw,
  Award,
  Target,
  Clock,
  BookOpen,
  MessageCircle,
  Star,
  Trophy,
  Zap,
  Shield,
  Phone,
  Mail,
  DollarSign,
  CheckCircle,
  AlertCircle,
  Info,
  Lightbulb,
  Heart,
  Smile,
  ThumbsUp,
  Bookmark,
  ExternalLink,
  ArrowRight,
  Play,
  Github,
  Linkedin,
  ChevronRight,
  Cpu,
  Database,
  Monitor,
  Smartphone,
  Server,
  Cloud,
  Activity,
  PieChart,
  BarChart,
  LineChart as LineChartIcon,
  TrendingDown,
  UserPlus,
  GraduationCapIcon,
  Building,
  Flag
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"

export default function LandingPage() {
  const [activeScreenshot, setActiveScreenshot] = useState(0)

  const screenshots = [
    {
      title: "Student Dashboard",
      description: "Personal KPIs, AI counselling, and gamified learning",
      image: "/placeholder.jpg"
    },
    {
      title: "University Dashboard",
      description: "Institution-level analytics and student tracking",
      image: "/placeholder.jpg"
    },
    {
      title: "Government Dashboard",
      description: "National dropout analytics and policy insights",
      image: "/placeholder.jpg"
    }
  ]

  const teamMembers = [
    { name: "Krishna Jha", role: "Developer", avatar: "KJ" },
    { name: "Pratik Patwe", role: "AI/ML Engineer", avatar: "PP" },
    { name: "Vishvambar", role: "Developer", avatar: "VU" },
    { name: "Parth Dhatrak", role: "Data Scientist", avatar: "PD" },
    { name: "Divyani Gour", role: "UI/UX Designer", avatar: "DG" },
    { name: "Vanshika Koup", role: "UI/UX Designer", avatar: "VK" }
  ]

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
      {/* Navigation Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-800">AI Dropout Prevention</h1>
                <p className="text-sm text-slate-600">Smart India Hackathon 2025</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection('problem')} className="text-slate-600 hover:text-slate-800 transition-colors">Problem</button>
              <button onClick={() => scrollToSection('solution')} className="text-slate-600 hover:text-slate-800 transition-colors">Solution</button>
              <button onClick={() => scrollToSection('modules')} className="text-slate-600 hover:text-slate-800 transition-colors">Modules</button>
              <button onClick={() => scrollToSection('team')} className="text-slate-600 hover:text-slate-800 transition-colors">Team</button>
            </nav>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Play className="h-4 w-4 mr-2" />
                Get Started
              </Button>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                Login
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden mt-[-70px]">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-indigo-600/15 to-purple-700/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">

            <div className="mb-6">
              <div>
                <img
                  src="https://mituniversity.ac.in/assets_web/images/LOGO3.png"
                  alt="MIT University Logo"
                  className="h-16 p-2 mx-auto mb-4 bg-purple-900 rounded-lg"
                />
              </div>
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold text-slate-800 mb-6">
              Preventing Student Dropouts with
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> AI-powered Counselling</span>
            </h1>
            <p className="text-xl text-slate-600 mb-12 max-w-3xl mx-auto">
              An intelligent early warning system that combines AI prediction models with personalized counselling to identify at-risk students and provide timely interventions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4">
                <Play className="h-5 w-5 mr-2" />
                Get Started
              </Button>
              <Button size="lg" variant="outline" className="px-8 py-4">
                <ArrowRight className="h-5 w-5 mr-2" />
                Login to Dashboard
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section id="problem" className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-100 to-orange-100 rounded-full mb-6">
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-6">The Challenge We're Solving</h2>
            <div className="max-w-4xl mx-auto">
              <Card className="border-2 border-red-100 shadow-lg bg-gradient-to-br from-red-50/80 to-orange-50/60">
                <CardContent className="p-8">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-red-600 mb-4">12.6%</div>
                    <p className="text-xl text-slate-700 mb-6">
                      Every year, <strong>lakhs of students drop out</strong> due to financial, academic, and emotional challenges across India's education system.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <DollarSign className="h-6 w-6 text-red-600" />
                        </div>
                        <h4 className="font-semibold text-slate-800">Financial Stress</h4>
                        <p className="text-sm text-slate-600 mt-1">Unable to afford fees and living expenses</p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <BookOpen className="h-6 w-6 text-red-600" />
                        </div>
                        <h4 className="font-semibold text-slate-800">Academic Struggles</h4>
                        <p className="text-sm text-slate-600 mt-1">Poor performance and lack of support</p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Heart className="h-6 w-6 text-red-600" />
                        </div>
                        <h4 className="font-semibold text-slate-800">Emotional Issues</h4>
                        <p className="text-sm text-slate-600 mt-1">Mental health and social pressures</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Overview */}
      <section id="solution" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full mb-6">
              <Lightbulb className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-6">Our AI-Powered Solution</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              A comprehensive ecosystem that predicts, prevents, and provides personalized support to at-risk students.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature Card 1 */}
            <Card className="border-2 border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-blue-50/80 to-indigo-50/60 hover:border-blue-300">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-slate-800">🎯 AI Dropout Prediction</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 text-center">
                  Machine learning models analyze academic, financial, and behavioral patterns to identify at-risk students early.
                </p>
              </CardContent>
            </Card>

            {/* Feature Card 2 */}
            <Card className="border-2 border-purple-100 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-purple-50/80 to-pink-50/60 hover:border-purple-300">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BrainCircuit className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-slate-800">🤖 24/7 AI Counselling</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 text-center">
                  Intelligent chatbots provide instant emotional support, study guidance, and connect students with human counselors.
                </p>
              </CardContent>
            </Card>

            {/* Feature Card 3 */}
            <Card className="border-2 border-green-100 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-green-50/80 to-emerald-50/60 hover:border-green-300">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-slate-800">🏫 Smart Dashboards</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 text-center">
                  Role-based dashboards for students, teachers, administrators, and government officials with real-time analytics.
                </p>
              </CardContent>
            </Card>

            {/* Feature Card 4 */}
            <Card className="border-2 border-yellow-100 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-yellow-50/80 to-amber-50/60 hover:border-yellow-300">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-slate-800">💡 Scholarship Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 text-center">
                  Automated scholarship matching, application tracking, and financial aid recommendations based on student profiles.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* USP Section */}
      <section className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-6">Why Our Solution is Unique</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Combining cutting-edge AI with human empathy to create a comprehensive support ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-2 border-emerald-100 shadow-lg bg-gradient-to-br from-emerald-50/80 to-green-50/60">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Zap className="h-6 w-6 text-emerald-600" />
                </div>
                <CardTitle className="text-lg text-slate-800">Proactive Early Warning</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 text-center">
                  Identifies at-risk students 6-12 months before potential dropout, enabling timely interventions.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-100 shadow-lg bg-gradient-to-br from-blue-50/80 to-indigo-50/60">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <HeartHandshake className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-lg text-slate-800">AI + Human Hybrid</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 text-center">
                  Combines AI efficiency with human empathy for personalized counselling and emotional support.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-100 shadow-lg bg-gradient-to-br from-purple-50/80 to-pink-50/60">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Trophy className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle className="text-lg text-slate-800">Gamified Motivation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 text-center">
                  Achievement badges, leaderboards, and progress tracking to keep students engaged and motivated.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-orange-100 shadow-lg bg-gradient-to-br from-orange-50/80 to-amber-50/60">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Globe className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle className="text-lg text-slate-800">Scalable + Multilingual</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 text-center">
                  Cloud-native architecture supporting multiple languages and millions of students across India.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section id="modules" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-6">Role-Based Access Modules</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Tailored dashboards and features for different stakeholders in the education ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Student Module */}
            <Card className="border-2 border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-blue-50/80 to-indigo-50/60 hover:border-blue-300 group cursor-pointer">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <GraduationCap className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-slate-800">👩‍🎓 Students</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 text-center mb-4">
                  Personal dashboard with risk assessment, AI counselling, study resources, and gamified progress tracking.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center text-xs text-slate-600">
                    <CheckCircle className="h-3 w-3 mr-2 text-green-500" />
                    Personal KPI monitoring
                  </div>
                  <div className="flex items-center text-xs text-slate-600">
                    <CheckCircle className="h-3 w-3 mr-2 text-green-500" />
                    24/7 AI counselling chat
                  </div>
                  <div className="flex items-center text-xs text-slate-600">
                    <CheckCircle className="h-3 w-3 mr-2 text-green-500" />
                    Achievement badges
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Teacher Module */}
            <Card className="border-2 border-green-100 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-green-50/80 to-emerald-50/60 hover:border-green-300 group cursor-pointer">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-slate-800">👨‍🏫 Teachers</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 text-center mb-4">
                  Early warning alerts, student progress tracking, and intervention recommendation tools.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center text-xs text-slate-600">
                    <CheckCircle className="h-3 w-3 mr-2 text-green-500" />
                    At-risk student alerts
                  </div>
                  <div className="flex items-center text-xs text-slate-600">
                    <CheckCircle className="h-3 w-3 mr-2 text-green-500" />
                    Class performance analytics
                  </div>
                  <div className="flex items-center text-xs text-slate-600">
                    <CheckCircle className="h-3 w-3 mr-2 text-green-500" />
                    Intervention tracking
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Admin Module */}
            <Card className="border-2 border-purple-100 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-purple-50/80 to-pink-50/60 hover:border-purple-300 group cursor-pointer">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Building className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-slate-800">🏫 Admin</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 text-center mb-4">
                  Institution-level reports, resource allocation insights, and comprehensive analytics dashboards.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center text-xs text-slate-600">
                    <CheckCircle className="h-3 w-3 mr-2 text-green-500" />
                    Institution analytics
                  </div>
                  <div className="flex items-center text-xs text-slate-600">
                    <CheckCircle className="h-3 w-3 mr-2 text-green-500" />
                    Resource optimization
                  </div>
                  <div className="flex items-center text-xs text-slate-600">
                    <CheckCircle className="h-3 w-3 mr-2 text-green-500" />
                    Policy recommendations
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Government Module */}
            <Card className="border-2 border-orange-100 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-orange-50/80 to-amber-50/60 hover:border-orange-300 group cursor-pointer">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Flag className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-slate-800">🏢 Government</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 text-center mb-4">
                  National dropout analytics, policy impact assessment, and strategic education planning tools.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center text-xs text-slate-600">
                    <CheckCircle className="h-3 w-3 mr-2 text-green-500" />
                    National trend analysis
                  </div>
                  <div className="flex items-center text-xs text-slate-600">
                    <CheckCircle className="h-3 w-3 mr-2 text-green-500" />
                    Policy impact tracking
                  </div>
                  <div className="flex items-center text-xs text-slate-600">
                    <CheckCircle className="h-3 w-3 mr-2 text-green-500" />
                    Budget allocation insights
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* System Architecture */}
      <section className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-6">System Architecture</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Scalable, secure, and intelligent architecture designed for millions of users.
            </p>
          </div>

          <Card className="border-2 border-slate-200 shadow-lg bg-white/80">
            <CardContent className="p-8">
              <div className="flex flex-col lg:flex-row items-center justify-between space-y-8 lg:space-y-0 lg:space-x-8">
                {/* Client Layer */}
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Smartphone className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="font-semibold text-slate-800 mb-2">Client Layer</h4>
                  <p className="text-sm text-slate-600">Web & Mobile Apps</p>
                </div>

                <ChevronRight className="h-6 w-6 text-slate-400 hidden lg:block" />

                {/* API Gateway */}
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Server className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="font-semibold text-slate-800 mb-2">API Gateway</h4>
                  <p className="text-sm text-slate-600">Authentication & Routing</p>
                </div>

                <ChevronRight className="h-6 w-6 text-slate-400 hidden lg:block" />

                {/* AI Engine */}
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Cpu className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="font-semibold text-slate-800 mb-2">AI Engine</h4>
                  <p className="text-sm text-slate-600">ML Models & Predictions</p>
                </div>

                <ChevronRight className="h-6 w-6 text-slate-400 hidden lg:block" />

                {/* Dashboards */}
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Monitor className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="font-semibold text-slate-800 mb-2">Dashboards</h4>
                  <p className="text-sm text-slate-600">Role-based Analytics</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/*  */}

      {/* Team Section */}
      <section id="team" className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-6">Our Team</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Passionate developers and researchers working to transform education through technology.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {teamMembers.map((member, index) => (
              <Card key={index} className="border-2 border-slate-100 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 hover:border-blue-200 text-center">
                <CardContent className="p-6">
                  <Avatar className="w-16 h-16 mx-auto mb-4">
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white font-semibold">
                      {member.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <h4 className="font-semibold text-slate-800 mb-1">{member.name}</h4>
                  <p className="text-sm text-slate-600">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Brand */}
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <GraduationCap className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">AI Dropout Prevention</h3>
                  <p className="text-sm text-slate-400">Smart India Hackathon 2025</p>
                </div>
              </div>
              <p className="text-slate-400 text-sm">
                Built for Smart India Hackathon 2025 – PSID SIH25102
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <Link href="/student" className="block text-slate-400 hover:text-white transition-colors text-sm">
                  Student Dashboard
                </Link>
                <Link href="/university" className="block text-slate-400 hover:text-white transition-colors text-sm">
                  University Dashboard
                </Link>
                <Link href="/" className="block text-slate-400 hover:text-white transition-colors text-sm">
                  Government Dashboard
                </Link>
                <button onClick={() => scrollToSection('problem')} className="block text-slate-400 hover:text-white transition-colors text-sm text-left">
                  Problem Statement
                </button>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold mb-4">Contact Us</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-slate-400" />
                  <span className="text-slate-400 text-sm">team@aidropoutprevention.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Github className="h-4 w-4 text-slate-400" />
                  <span className="text-slate-400 text-sm">github.com/ai-dropout-prevention</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Linkedin className="h-4 w-4 text-slate-400" />
                  <span className="text-slate-400 text-sm">linkedin.com/company/ai-dropout-prevention</span>
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-8 bg-slate-700" />

          <div className="text-center text-slate-400 text-sm">
            <p>&copy; 2025 AI Dropout Prevention System. Built for Smart India Hackathon 2025.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}