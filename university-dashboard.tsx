"use client"

import React, { useState, useEffect } from "react"
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
  BrainCircuit,
  HeartHandshake,
  UserCheck,
  ChevronDown,
  Download,
  Filter,
  Search,
  Eye,
  X,
  Calendar,
  Plus,
  RefreshCw,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter,
} from "recharts"

// University-specific sample data
const universityKPIs = [
  {
    title: "Total Students",
    value: "12,450",
    target: "13,000",
    percentage: 95.8,
    trend: "+2.3%",
    icon: "👥",
    status: "good"
  },
  {
    title: "Dropout Rate",
    value: "8.2%",
    target: "<10%",
    percentage: 82,
    trend: "-1.5%",
    icon: "📉",
    status: "excellent"
  },
  {
    title: "At-Risk Students",
    value: "342",
    target: "<400",
    percentage: 85.5,
    trend: "-12",
    icon: "⚠️",
    status: "good"
  },
  {
    title: "Faculty Count",
    value: "485",
    target: "500",
    percentage: 97,
    trend: "+8",
    icon: "👨‍🏫",
    status: "excellent"
  }
]

const departmentData = [
  { department: "Engineering", enrollment: 3200, dropoutRate: 6.5 },
  { department: "Arts", enrollment: 2800, dropoutRate: 9.2 },
  { department: "Commerce", enrollment: 2400, dropoutRate: 7.8 },
  { department: "Science", enrollment: 2100, dropoutRate: 5.9 },
  { department: "Management", enrollment: 1950, dropoutRate: 8.4 }
]

const dropoutReasonsData = [
  { name: "Financial", value: 35, color: "#ef4444" },
  { name: "Academic", value: 28, color: "#f97316" },
  { name: "Personal", value: 20, color: "#eab308" },
  { name: "Health", value: 12, color: "#22c55e" },
  { name: "Others", value: 5, color: "#6366f1" }
]

const facultyData = [
  { name: "Dr. Rajesh Kumar", department: "Engineering", engagement: 94, workload: 85, dropoutRate: 4.2, rank: 1 },
  { name: "Prof. Priya Sharma", department: "Science", engagement: 91, workload: 78, dropoutRate: 4.8, rank: 2 },
  { name: "Dr. Amit Patel", department: "Commerce", engagement: 89, workload: 82, dropoutRate: 5.1, rank: 3 },
  { name: "Prof. Sunita Gupta", department: "Arts", engagement: 87, workload: 75, dropoutRate: 6.2, rank: 4 },
  { name: "Dr. Vikram Singh", department: "Management", engagement: 85, workload: 88, dropoutRate: 6.8, rank: 5 }
]

const yearlyDropoutTrend = [
  { year: "2019", rate: 12.5 },
  { year: "2020", rate: 11.8 },
  { year: "2021", rate: 10.2 },
  { year: "2022", rate: 9.1 },
  { year: "2023", rate: 8.2 }
]

const engagementVsDropoutData = [
  { engagement: 95, dropoutProbability: 2, department: "Engineering" },
  { engagement: 88, dropoutProbability: 5, department: "Science" },
  { engagement: 82, dropoutProbability: 8, department: "Commerce" },
  { engagement: 75, dropoutProbability: 12, department: "Arts" },
  { engagement: 70, dropoutProbability: 15, department: "Management" },
  { engagement: 65, dropoutProbability: 18, department: "Others" }
]

const highRiskStudents = [
  { name: "Rahul Verma", department: "Arts", riskPercentage: 85, intervention: "Financial Aid + Academic Support" },
  { name: "Sneha Patel", department: "Commerce", riskPercentage: 78, intervention: "Counseling + Peer Mentoring" },
  { name: "Arjun Singh", department: "Engineering", riskPercentage: 72, intervention: "Study Skills Workshop" },
  { name: "Kavya Sharma", department: "Science", riskPercentage: 68, intervention: "Health Support + Flexible Schedule" },
  { name: "Rohit Kumar", department: "Management", riskPercentage: 65, intervention: "Career Guidance + Internship" }
]

const counselingData = {
  totalSessions: 1247,
  resolvedCases: 892,
  pendingCases: 355,
  monthlyTrend: [
    { month: "Jan", sessions: 98 },
    { month: "Feb", sessions: 112 },
    { month: "Mar", sessions: 125 },
    { month: "Apr", sessions: 108 },
    { month: "May", sessions: 134 },
    { month: "Jun", sessions: 142 }
  ]
}

const recentInterventions = [
  { student: "Anita Rao", type: "Academic Support", date: "2023-06-15", status: "Ongoing" },
  { student: "Deepak Joshi", type: "Financial Aid", date: "2023-06-14", status: "Resolved" },
  { student: "Meera Gupta", type: "Mental Health", date: "2023-06-13", status: "Ongoing" },
  { student: "Karan Malhotra", type: "Career Guidance", date: "2023-06-12", status: "Resolved" },
  { student: "Pooja Singh", type: "Peer Mentoring", date: "2023-06-11", status: "Ongoing" }
]

// Academic Performance Metrics Data
const gpaDistributionData = [
  { range: "3.5-4.0", students: 2890, percentage: 23.2 },
  { range: "3.0-3.49", students: 3735, percentage: 30.0 },
  { range: "2.5-2.99", students: 3112, percentage: 25.0 },
  { range: "2.0-2.49", students: 1868, percentage: 15.0 },
  { range: "Below 2.0", students: 845, percentage: 6.8 }
]

const courseCompletionData = [
  { semester: "Fall 2022", completed: 94.2, withdrawn: 5.8 },
  { semester: "Spring 2023", completed: 95.1, withdrawn: 4.9 },
  { semester: "Fall 2023", completed: 96.3, withdrawn: 3.7 },
  { semester: "Spring 2024", completed: 95.8, withdrawn: 4.2 }
]

const academicProbationData = [
  { year: "2020", onProbation: 892, recovered: 634, percentage: 71.1 },
  { year: "2021", onProbation: 756, recovered: 578, percentage: 76.5 },
  { year: "2022", onProbation: 623, recovered: 489, percentage: 78.5 },
  { year: "2023", onProbation: 534, recovered: 445, percentage: 83.3 }
]

const graduationRateData = [
  { cohort: "2018", fourYear: 68.2, fiveYear: 78.9, sixYear: 82.1 },
  { cohort: "2019", fourYear: 70.1, fiveYear: 80.3, sixYear: 83.7 },
  { cohort: "2020", fourYear: 72.5, fiveYear: 82.1, sixYear: 85.2 },
  { cohort: "2021", fourYear: 74.8, fiveYear: 84.2, sixYear: 87.1 }
]

// Financial & Resource Management Data
const budgetAllocationData = [
  { category: "Academic Programs", amount: 45.2, color: "#2196F3" },
  { category: "Faculty Salaries", amount: 28.7, color: "#4CAF50" },
  { category: "Infrastructure", amount: 12.3, color: "#FF9800" },
  { category: "Research", amount: 8.1, color: "#9C27B0" },
  { category: "Student Services", amount: 5.7, color: "#F44336" }
]

const scholarshipData = [
  { type: "Merit-based", recipients: 2340, amount: 12.8, impact: 92.3 },
  { type: "Need-based", recipients: 3890, amount: 18.5, impact: 87.6 },
  { type: "Athletic", recipients: 456, amount: 3.2, impact: 94.1 },
  { type: "Diversity", recipients: 678, amount: 4.1, impact: 89.2 }
]

const infrastructureUtilization = [
  { facility: "Classrooms", capacity: 85.2, peak: 94.7, optimal: 80 },
  { facility: "Laboratories", capacity: 78.9, peak: 89.3, optimal: 75 },
  { facility: "Library", capacity: 67.4, peak: 82.1, optimal: 70 },
  { facility: "Sports Complex", capacity: 72.8, peak: 91.5, optimal: 75 }
]

const revenueStreamsData = [
  { source: "Tuition Fees", amount: 156.7, growth: 3.2 },
  { source: "Government Grants", amount: 89.4, growth: 1.8 },
  { source: "Research Funding", amount: 34.2, growth: 8.7 },
  { source: "Donations", amount: 23.8, growth: 12.4 },
  { source: "Other Income", amount: 15.3, growth: -2.1 }
]

// Student Lifecycle Analytics Data
const admissionFunnelData = [
  { stage: "Applications", count: 18750, percentage: 100 },
  { stage: "Qualified", count: 14200, percentage: 75.7 },
  { stage: "Interviewed", count: 9840, percentage: 52.5 },
  { stage: "Offered", count: 6890, percentage: 36.7 },
  { stage: "Enrolled", count: 3420, percentage: 18.2 }
]

const studentDemographicsData = {
  age: [
    { range: "18-20", count: 5890, percentage: 47.3 },
    { range: "21-23", count: 4230, percentage: 34.0 },
    { range: "24-26", count: 1680, percentage: 13.5 },
    { range: "27+", count: 650, percentage: 5.2 }
  ],
  gender: [
    { type: "Female", count: 6890, percentage: 55.3 },
    { type: "Male", count: 5340, percentage: 42.9 },
    { type: "Other", count: 220, percentage: 1.8 }
  ],
  geographic: [
    { region: "Local (50km)", count: 4890, percentage: 39.3 },
    { region: "State", count: 3780, percentage: 30.4 },
    { region: "National", count: 2890, percentage: 23.2 },
    { region: "International", count: 890, percentage: 7.1 }
  ]
}

const alumniTrackingData = [
  { graduationYear: "2020", employed: 89.2, avgSalary: 52000, satisfaction: 4.2 },
  { graduationYear: "2021", employed: 91.7, avgSalary: 54500, satisfaction: 4.3 },
  { graduationYear: "2022", employed: 93.1, avgSalary: 57200, satisfaction: 4.4 },
  { graduationYear: "2023", employed: 94.8, avgSalary: 59800, satisfaction: 4.5 }
]

const studentSatisfactionData = [
  { category: "Academic Quality", score: 4.3, trend: "+0.2" },
  { category: "Faculty Support", score: 4.1, trend: "+0.1" },
  { category: "Campus Facilities", score: 3.9, trend: "+0.3" },
  { category: "Career Services", score: 4.0, trend: "+0.4" },
  { category: "Student Life", score: 4.2, trend: "+0.1" }
]

// Operational Metrics Data
const staffStudentRatios = [
  { department: "Engineering", ratio: "1:18", optimal: "1:15", status: "needs_improvement" },
  { department: "Science", ratio: "1:16", optimal: "1:15", status: "good" },
  { department: "Arts", ratio: "1:22", optimal: "1:20", status: "acceptable" },
  { department: "Commerce", ratio: "1:25", optimal: "1:20", status: "needs_improvement" },
  { department: "Management", ratio: "1:19", optimal: "1:18", status: "good" }
]

const researchOutputData = [
  { year: "2020", publications: 234, patents: 12, funding: 15.6 },
  { year: "2021", publications: 267, patents: 18, funding: 18.9 },
  { year: "2022", publications: 298, patents: 23, funding: 22.4 },
  { year: "2023", publications: 342, patents: 31, funding: 28.7 }
]

const campusSafetyData = [
  { category: "Security Incidents", count: 23, trend: "-15%", severity: "low" },
  { category: "Medical Emergencies", count: 67, trend: "+8%", severity: "medium" },
  { category: "Fire Safety", count: 3, trend: "-50%", severity: "low" },
  { category: "Theft Reports", count: 12, trend: "-25%", severity: "low" }
]

const sustainabilityMetrics = [
  { metric: "Energy Consumption", value: "2.3 MWh", target: "2.0 MWh", progress: 85 },
  { metric: "Water Usage", value: "45.2k L", target: "40k L", progress: 88 },
  { metric: "Waste Recycled", value: "78%", target: "80%", progress: 97 },
  { metric: "Carbon Footprint", value: "1.2k tons", target: "1.0k tons", progress: 83 }
]

// Course-Level Analytics Data
const courseSuccessRates = [
  { course: "Calculus I", successRate: 78.5, difficulty: "High", enrollment: 450 },
  { course: "Physics I", successRate: 82.1, difficulty: "High", enrollment: 380 },
  { course: "Chemistry I", successRate: 85.3, difficulty: "Medium", enrollment: 320 },
  { course: "English Comp", successRate: 91.2, difficulty: "Low", enrollment: 520 },
  { course: "Statistics", successRate: 76.8, difficulty: "High", enrollment: 290 }
]

const professorPerformanceData = [
  { name: "Dr. Sarah Johnson", rating: 4.8, courses: 3, successRate: 89.2, research: "High" },
  { name: "Prof. Michael Chen", rating: 4.6, courses: 4, successRate: 85.7, research: "Medium" },
  { name: "Dr. Emily Davis", rating: 4.9, courses: 2, successRate: 92.1, research: "High" },
  { name: "Prof. Robert Wilson", rating: 4.3, courses: 5, successRate: 81.4, research: "Low" },
  { name: "Dr. Lisa Anderson", rating: 4.7, courses: 3, successRate: 87.9, research: "High" }
]

const curriculumEffectivenessData = [
  { program: "Computer Science", employmentRate: 96.2, avgSalary: 75000, satisfaction: 4.6 },
  { program: "Mechanical Eng", employmentRate: 94.8, avgSalary: 68000, satisfaction: 4.4 },
  { program: "Business Admin", employmentRate: 89.3, avgSalary: 55000, satisfaction: 4.2 },
  { program: "Biology", employmentRate: 87.1, avgSalary: 48000, satisfaction: 4.1 },
  { program: "Psychology", employmentRate: 82.7, avgSalary: 42000, satisfaction: 4.0 }
]

// Student Success Indicators Data
const majorDeclarationTrends = [
  { major: "Computer Science", declared: 890, changed: 67, retention: 92.5 },
  { major: "Engineering", declared: 756, changed: 89, retention: 88.2 },
  { major: "Business", declared: 634, changed: 45, retention: 92.9 },
  { major: "Sciences", declared: 567, changed: 78, retention: 86.2 },
  { major: "Arts", declared: 445, changed: 34, retention: 92.4 }
]

const prerequisiteSuccessData = [
  { prerequisite: "Math 101", nextCourse: "Math 201", successRate: 84.2, correlation: 0.78 },
  { prerequisite: "Physics 101", nextCourse: "Physics 201", successRate: 79.6, correlation: 0.82 },
  { prerequisite: "Chem 101", nextCourse: "Chem 201", successRate: 87.3, correlation: 0.75 },
  { prerequisite: "English 101", nextCourse: "English 201", successRate: 91.8, correlation: 0.68 }
]

const internshipPlacementData = [
  { department: "Engineering", placements: 234, applications: 267, rate: 87.6 },
  { department: "Business", placements: 189, applications: 203, rate: 93.1 },
  { department: "Computer Science", placements: 156, applications: 167, rate: 93.4 },
  { department: "Sciences", placements: 98, applications: 134, rate: 73.1 },
  { department: "Arts", placements: 67, applications: 89, rate: 75.3 }
]

const jobPlacementByMajor = [
  { major: "Computer Science", placed: 96.2, avgSalary: 75000, timeToJob: 2.3 },
  { major: "Engineering", placed: 94.8, avgSalary: 68000, timeToJob: 2.8 },
  { major: "Business", placed: 89.3, avgSalary: 55000, timeToJob: 3.2 },
  { major: "Sciences", placed: 87.1, avgSalary: 48000, timeToJob: 4.1 },
  { major: "Arts", placed: 82.7, avgSalary: 42000, timeToJob: 4.8 }
]

// Faculty & Staff Analytics Data
const facultyWorkloadData = [
  { name: "Dr. Johnson", teaching: 40, research: 35, admin: 25, satisfaction: 4.2 },
  { name: "Prof. Chen", teaching: 50, research: 30, admin: 20, satisfaction: 4.0 },
  { name: "Dr. Davis", teaching: 35, research: 45, admin: 20, satisfaction: 4.5 },
  { name: "Prof. Wilson", teaching: 60, research: 20, admin: 20, satisfaction: 3.8 },
  { name: "Dr. Anderson", teaching: 45, research: 35, admin: 20, satisfaction: 4.3 }
]

const professionalDevelopmentData = [
  { category: "Conferences Attended", completed: 89, target: 100, progress: 89 },
  { category: "Certifications Earned", completed: 34, target: 40, progress: 85 },
  { category: "Training Hours", completed: 1240, target: 1500, progress: 83 },
  { category: "Research Collaborations", completed: 67, target: 75, progress: 89 }
]

const facultyRetentionData = [
  { year: "2020", retained: 94.2, departed: 5.8, newHires: 23 },
  { year: "2021", retained: 95.7, departed: 4.3, newHires: 18 },
  { year: "2022", retained: 93.8, departed: 6.2, newHires: 29 },
  { year: "2023", retained: 96.1, departed: 3.9, newHires: 15 }
]

// Predictive Analytics Data
const earlyWarningIndicators = [
  { student: "John Doe", riskScore: 85, factors: ["Low GPA", "Poor Attendance"], intervention: "Academic Support" },
  { student: "Jane Smith", riskScore: 78, factors: ["Financial Issues", "Course Load"], intervention: "Financial Aid" },
  { student: "Mike Johnson", riskScore: 72, factors: ["Social Integration", "Study Skills"], intervention: "Peer Mentoring" },
  { student: "Sarah Wilson", riskScore: 69, factors: ["Health Issues", "Time Management"], intervention: "Counseling" }
]

const enrollmentForecastData = [
  { year: "2024", predicted: 13200, confidence: 92, factors: ["Demographics", "Economic"] },
  { year: "2025", predicted: 13800, confidence: 87, factors: ["Program Growth", "Reputation"] },
  { year: "2026", predicted: 14200, confidence: 82, factors: ["Market Demand", "Competition"] },
  { year: "2027", predicted: 14600, confidence: 78, factors: ["Technology", "Industry Trends"] }
]

const resourceDemandPrediction = [
  { resource: "Faculty", current: 485, predicted: 520, timeline: "2025", priority: "High" },
  { resource: "Classrooms", current: 120, predicted: 135, timeline: "2024", priority: "Medium" },
  { resource: "Lab Equipment", current: 85, predicted: 95, timeline: "2025", priority: "High" },
  { resource: "Dormitories", current: 45, predicted: 52, timeline: "2026", priority: "Low" }
]

export default function UniversityDashboard() {
  const [activeSection, setActiveSection] = useState("overview")
  const [isMobile, setIsMobile] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedYear, setSelectedYear] = useState("2023")
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const { toast } = useToast()

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const handleExportCSV = () => {
    toast({
      title: "Export Started",
      description: "Your CSV report is being generated...",
    })
  }

  const handleScheduleReport = () => {
    toast({
      title: "Report Scheduled",
      description: "Weekly report has been scheduled successfully.",
    })
  }

  const renderOverview = () => (
    <div className="space-y-6">
      {/* University KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {universityKPIs.map((kpi, index) => (
          <Card key={index} className={`border border-slate-200/60 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm ${kpi.status === 'excellent' ? 'bg-gradient-to-br from-status-excellent/10 to-status-excellent/5 hover:border-status-excellent' :
            kpi.status === 'good' ? 'bg-gradient-to-br from-brand-primary/10 to-brand-primary/5 hover:border-brand-primary' :
              kpi.status === 'warning' ? 'bg-gradient-to-br from-status-warning/10 to-status-warning/5 hover:border-status-warning' :
                'bg-gradient-to-br from-status-danger/10 to-status-danger/5 hover:border-status-danger'
            }`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-white/40 backdrop-blur-sm border-b border-white/60">
              <CardTitle className="text-sm font-semibold text-slate-800">{kpi.title}</CardTitle>
              <div className={`p-2 rounded-full ${kpi.status === 'excellent' ? 'bg-status-excellent/20' :
                kpi.status === 'good' ? 'bg-brand-primary/20' :
                  kpi.status === 'warning' ? 'bg-status-warning/20' :
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
                  <span className={`text-xs font-medium ${kpi.trend.startsWith('+') ? 'text-status-good' : 'text-status-danger'
                    }`}>{kpi.trend}</span>
                </div>
                <Progress
                  value={kpi.percentage}
                  className={`h-2 ${kpi.status === 'excellent' ? '[&>div]:bg-status-excellent' :
                    kpi.status === 'good' ? '[&>div]:bg-blue-500' :
                      kpi.status === 'warning' ? '[&>div]:bg-yellow-500' :
                        '[&>div]:bg-red-500'
                    }`}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Academic Performance Metrics */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Academic Performance Metrics</h3>

        {/* GPA Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-gradient-to-br from-white to-slate-50 border border-slate-200 rounded-xl p-6 shadow-sm">
            <h4 className="text-lg font-medium text-gray-800 mb-4">GPA Distribution</h4>
            <div className="space-y-3">
              {gpaDistributionData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{item.range}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-800">{item.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Course Success Rates */}
          <div className="bg-gradient-to-br from-white to-slate-50 border border-slate-200 rounded-xl p-6 shadow-sm">
            <h4 className="text-lg font-medium text-gray-800 mb-4">Course Success Rates</h4>
            <div className="space-y-3">
              {courseSuccessRates.map((course, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-medium text-gray-800">{course.course}</span>
                    <span className={`ml-2 px-2 py-1 text-xs rounded-full ${course.difficulty === 'High' ? 'bg-red-100 text-red-700' :
                      course.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-status-good/20 text-status-good'
                      }`}>
                      {course.difficulty}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-800">{course.successRate}%</div>
                    <div className="text-xs text-gray-500">{course.enrollment} students</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Professor Performance */}
        <div className="bg-gradient-to-br from-white to-slate-50 border border-slate-200 rounded-xl p-6 shadow-sm mb-6">
          <h4 className="text-lg font-medium text-gray-800 mb-4">Top Performing Faculty</h4>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 text-sm font-medium text-gray-600">Faculty</th>
                  <th className="text-left py-2 text-sm font-medium text-gray-600">Rating</th>
                  <th className="text-left py-2 text-sm font-medium text-gray-600">Courses</th>
                  <th className="text-left py-2 text-sm font-medium text-gray-600">Success Rate</th>
                  <th className="text-left py-2 text-sm font-medium text-gray-600">Research</th>
                </tr>
              </thead>
              <tbody>
                {professorPerformanceData.map((prof, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="py-3 text-sm text-gray-800">{prof.name}</td>
                    <td className="py-3">
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-gray-800">{prof.rating}</span>
                        <div className="ml-2 flex">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className={`w-3 h-3 ${i < Math.floor(prof.rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 text-sm text-gray-800">{prof.courses}</td>
                    <td className="py-3 text-sm text-gray-800">{prof.successRate}%</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 text-xs rounded-full ${prof.research === 'High' ? 'bg-status-good/20 text-status-good' :
                        prof.research === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                        {prof.research}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Financial & Resource Management */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Financial & Resource Management</h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Budget Allocation */}
          <div className="bg-gradient-to-br from-white to-slate-50 border border-slate-200 rounded-xl p-6 shadow-sm">
            <h4 className="text-lg font-medium text-gray-800 mb-4">Budget Allocation</h4>
            <div className="space-y-4">
              {budgetAllocationData.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">{item.category}</span>
                    <span className="text-sm font-medium text-gray-800">${item.amount}M</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${(item.amount / 50) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Amount: ${item.amount}M</span>
                    <span>Amount: ${item.amount}M</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Revenue Streams */}
          <div className="bg-gradient-to-br from-white to-slate-50 border border-slate-200 rounded-xl p-6 shadow-sm">
            <h4 className="text-lg font-medium text-gray-800 mb-4">Revenue Streams</h4>
            <div className="space-y-3">
              {revenueStreamsData.map((stream, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{stream.source}</span>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-800">${stream.amount}M</div>
                    <div className={`text-xs ${stream.growth > 0 ? 'text-status-good' : 'text-status-danger'
                      }`}>
                      {stream.growth > 0 ? '+' : ''}{stream.growth}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sustainability Metrics */}
        <div className="bg-gradient-to-br from-white to-slate-50 border border-slate-200 rounded-xl p-6 shadow-sm">
          <h4 className="text-lg font-medium text-gray-800 mb-4">Sustainability Metrics</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {sustainabilityMetrics.map((metric, index) => (
              <div key={index} className="text-center">
                <div className="text-sm text-gray-600 mb-2">{metric.metric}</div>
                <div className="text-lg font-semibold text-gray-800 mb-1">{metric.value}</div>
                <div className="text-xs text-gray-500 mb-2">Target: {metric.target}</div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${metric.progress >= 90 ? 'bg-status-excellent' :
                      metric.progress >= 70 ? 'bg-status-warning' : 'bg-status-danger'
                      }`}
                    style={{ width: `${metric.progress}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 mt-1">{metric.progress}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderDepartmentAnalytics = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-2 border-blue-100 shadow-lg">
          <CardHeader>
            <CardTitle className="text-slate-800">Enrollment vs Dropout Rate by Department</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={departmentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                <XAxis dataKey="department" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="enrollment" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="dropoutRate" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-2 border-blue-100 shadow-lg">
          <CardHeader>
            <CardTitle className="text-slate-800">Dropout Reasons Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={dropoutReasonsData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(props) => {
                    if (props.name && typeof props.percent === 'number') {
                      return `${props.name} ${(props.percent * 100).toFixed(0)}%`;
                    }
                    return '';
                  }}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {dropoutReasonsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Student Success Indicators */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Student Success Indicators</h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Major Declaration Trends */}
          <div className="bg-gradient-to-br from-white to-slate-50 border border-slate-200 rounded-xl p-6 shadow-sm">
            <h4 className="text-lg font-medium text-gray-800 mb-4">Major Declaration Trends</h4>
            <div className="space-y-3">
              {majorDeclarationTrends.map((major, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-medium text-gray-800">{major.major}</span>
                    <div className="text-xs text-gray-500">Declared: {major.declared} | Changed: {major.changed}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-800">{major.retention}%</div>
                    <div className="text-xs text-gray-500">Retention</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Internship Placement Rates */}
          <div className="bg-gradient-to-br from-white to-slate-50 border border-slate-200 rounded-xl p-6 shadow-sm">
            <h4 className="text-lg font-medium text-gray-800 mb-4">Internship Placement Rates</h4>
            <div className="space-y-3">
              {internshipPlacementData.map((dept, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{dept.department}</span>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-800">{dept.rate}%</div>
                    <div className="text-xs text-gray-500">{dept.placements}/{dept.applications}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Job Placement by Major */}
        <div className="bg-gradient-to-br from-white to-slate-50 border border-slate-200 rounded-xl p-6 shadow-sm mb-6">
          <h4 className="text-lg font-medium text-gray-800 mb-4">Job Placement by Major</h4>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 text-sm font-medium text-gray-600">Major</th>
                  <th className="text-left py-2 text-sm font-medium text-gray-600">Placement Rate</th>
                  <th className="text-left py-2 text-sm font-medium text-gray-600">Avg Salary</th>
                  <th className="text-left py-2 text-sm font-medium text-gray-600">Time to Job</th>
                </tr>
              </thead>
              <tbody>
                {jobPlacementByMajor.map((job, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="py-3 text-sm text-gray-800">{job.major}</td>
                    <td className="py-3 text-sm text-gray-800">{job.placed}%</td>
                    <td className="py-3 text-sm text-gray-800">${job.avgSalary.toLocaleString()}</td>
                    <td className="py-3 text-sm text-gray-800">{job.timeToJob} months</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Predictive Analytics */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Predictive Analytics</h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Early Warning System */}
          <div className="bg-gradient-to-br from-white to-slate-50 border border-slate-200 rounded-xl p-6 shadow-sm">
            <h4 className="text-lg font-medium text-gray-800 mb-4">Early Warning Indicators</h4>
            <div className="space-y-3">
              {earlyWarningIndicators.map((student, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm font-medium text-gray-800">{student.student}</span>
                    <span className={`px-2 py-1 text-xs rounded-full ${student.riskScore >= 80 ? 'bg-red-100 text-red-700' :
                      student.riskScore >= 70 ? 'bg-yellow-100 text-yellow-700' :
                        'bg-status-good/20 text-status-good'
                      }`}>
                      Risk: {student.riskScore}%
                    </span>
                  </div>
                  <div className="text-xs text-gray-600 mb-1">
                    Factors: {student.factors.join(', ')}
                  </div>
                  <div className="text-xs text-blue-600">
                    Intervention: {student.intervention}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Enrollment Forecast */}
          <div className="bg-gradient-to-br from-white to-slate-50 border border-slate-200 rounded-xl p-6 shadow-sm">
            <h4 className="text-lg font-medium text-gray-800 mb-4">Enrollment Forecast</h4>
            <div className="space-y-3">
              {enrollmentForecastData.map((forecast, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-medium text-gray-800">{forecast.year}</span>
                    <div className="text-xs text-gray-500">{forecast.factors.join(', ')}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-800">{forecast.predicted.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">{forecast.confidence}% confidence</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Faculty & Staff Analytics */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Faculty & Staff Analytics</h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Faculty Workload Distribution */}
          <div className="bg-gradient-to-br from-white to-slate-50 border border-slate-200 rounded-xl p-6 shadow-sm">
            <h4 className="text-lg font-medium text-gray-800 mb-4">Faculty Workload Distribution</h4>
            <div className="space-y-3">
              {facultyWorkloadData.map((faculty, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-800">{faculty.name}</span>
                    <span className="text-sm text-gray-600">Satisfaction: {faculty.satisfaction}/5</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="text-center">
                      <div className="text-gray-600">Teaching</div>
                      <div className="font-medium">{faculty.teaching}%</div>
                    </div>
                    <div className="text-center">
                      <div className="text-gray-600">Research</div>
                      <div className="font-medium">{faculty.research}%</div>
                    </div>
                    <div className="text-center">
                      <div className="text-gray-600">Admin</div>
                      <div className="font-medium">{faculty.admin}%</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Professional Development */}
          <div className="bg-gradient-to-br from-white to-slate-50 border border-slate-200 rounded-xl p-6 shadow-sm">
            <h4 className="text-lg font-medium text-gray-800 mb-4">Professional Development Progress</h4>
            <div className="space-y-4">
              {professionalDevelopmentData.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">{item.category}</span>
                    <span className="text-sm font-medium text-gray-800">{item.completed}/{item.target}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${item.progress >= 90 ? 'bg-status-excellent' :
                        item.progress >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                      style={{ width: `${item.progress}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{item.progress}% Complete</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Operational Metrics */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Operational Metrics</h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Staff-to-Student Ratios */}
          <div className="bg-gradient-to-br from-white to-slate-50 border border-slate-200 rounded-xl p-6 shadow-sm">
            <h4 className="text-lg font-medium text-gray-800 mb-4">Staff-to-Student Ratios</h4>
            <div className="space-y-3">
              {staffStudentRatios.map((dept, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-medium text-gray-800">{dept.department}</span>
                    <div className="text-xs text-gray-500">Optimal: {dept.optimal}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-800">{dept.ratio}</div>
                    <span className={`px-2 py-1 text-xs rounded-full ${dept.status === 'good' ? 'bg-status-good/20 text-status-good' :
                      dept.status === 'acceptable' ? 'bg-status-warning/20 text-status-warning' :
                        'bg-status-danger/20 text-status-danger'
                      }`}>
                      {dept.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Campus Safety Statistics */}
          <div className="bg-gradient-to-br from-white to-slate-50 border border-slate-200 rounded-xl p-6 shadow-sm">
            <h4 className="text-lg font-medium text-gray-800 mb-4">Campus Safety Statistics</h4>
            <div className="space-y-3">
              {campusSafetyData.map((safety, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{safety.category}</span>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-800">{safety.count}</div>
                    <div className={`text-xs ${safety.trend.startsWith('-') ? 'text-status-good' : 'text-status-danger'
                      }`}>
                      {safety.trend}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderFacultyEngagement = () => (
    <div className="space-y-6">
      <Card className="border-2 border-blue-100 shadow-lg">
        <CardHeader>
          <CardTitle className="text-slate-800">Faculty Performance Overview</CardTitle>
          <CardDescription>Top performing faculty highlighted</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Engagement %</TableHead>
                <TableHead>Workload</TableHead>
                <TableHead>Student Dropout Rate</TableHead>
                <TableHead>Rank</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {facultyData.map((faculty, index) => (
                <TableRow key={index} className={faculty.rank <= 3 ? "bg-status-good/10" : ""}>
                  <TableCell className="font-medium">
                    {faculty.name}
                    {faculty.rank <= 3 && <Badge className="ml-2" variant="secondary">Top {faculty.rank}</Badge>}
                  </TableCell>
                  <TableCell>{faculty.department}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <span>{faculty.engagement}%</span>
                      <Progress value={faculty.engagement} className="w-16 h-2" />
                    </div>
                  </TableCell>
                  <TableCell>{faculty.workload}%</TableCell>
                  <TableCell className={faculty.dropoutRate < 5 ? "text-status-good" : "text-status-danger"}>
                    {faculty.dropoutRate}%
                  </TableCell>
                  <TableCell>
                    <Badge variant={faculty.rank <= 3 ? "default" : "outline"}>
                      #{faculty.rank}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )

  const renderStudentRiskInsights = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-2 border-blue-100 shadow-lg">
          <CardHeader>
            <CardTitle className="text-slate-800">5-Year Dropout Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={yearlyDropoutTrend}>
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
            <CardTitle className="text-slate-800">Student Engagement vs Dropout Probability</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <ScatterChart data={engagementVsDropoutData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                <XAxis
                  type="number"
                  dataKey="engagement"
                  name="Engagement"
                  unit="%"
                  domain={[60, 100]}
                  stroke="#64748b"
                />
                <YAxis
                  type="number"
                  dataKey="dropoutProbability"
                  name="Dropout Probability"
                  unit="%"
                  domain={[0, 20]}
                  stroke="#64748b"
                />
                <Tooltip
                  cursor={{ strokeDasharray: '3 3' }}
                  contentStyle={{
                    backgroundColor: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                  }}
                  formatter={(value, name) => {
                    if (name === 'engagement') return [`${value}%`, 'Engagement']
                    if (name === 'dropoutProbability') return [`${value}%`, 'Dropout Risk']
                    return [value, name]
                  }}
                  labelFormatter={(label, payload) => {
                    return payload?.[0]?.payload?.department || 'Department'
                  }}
                />
                <Scatter name="Departments" dataKey="dropoutProbability" fill="#10b981" />
              </ScatterChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="border-2 border-status-danger/20 shadow-lg">
        <CardHeader>
          <CardTitle className="text-slate-800">High Risk Students (AI-Driven Insights)</CardTitle>
          <CardDescription>Students requiring immediate intervention</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Risk %</TableHead>
                <TableHead>Suggested Intervention</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {highRiskStudents.map((student, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>{student.department}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <span className="text-status-danger font-semibold">{student.riskPercentage}%</span>
                      <Progress value={student.riskPercentage} className="w-16 h-2 [&>div]:bg-status-danger" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {student.intervention}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )

  const renderCounselingSupport = () => (
    <div className="space-y-6">
      {/* Counseling KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border border-slate-200/60 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm bg-gradient-to-br from-blue-50/80 to-indigo-50/60 hover:border-blue-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-white/40 backdrop-blur-sm border-b border-white/60">
            <CardTitle className="text-sm font-semibold text-slate-800">Total Sessions</CardTitle>
            <div className="p-2 rounded-full bg-blue-100">
              <HeartHandshake className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800">{counselingData.totalSessions}</div>
            <p className="text-xs text-slate-600 mt-1">This academic year</p>
          </CardContent>
        </Card>

        <Card className="border border-slate-200/60 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm bg-gradient-to-br from-emerald-50/80 to-blue-50/60 hover:border-emerald-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-white/40 backdrop-blur-sm border-b border-white/60">
            <CardTitle className="text-sm font-semibold text-slate-800">Resolved Cases</CardTitle>
            <div className="p-2 rounded-full bg-status-good/20">
              <UserCheck className="h-4 w-4 text-status-good" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800">{counselingData.resolvedCases}</div>
            <p className="text-xs text-slate-600 mt-1">Success rate: {Math.round((counselingData.resolvedCases / counselingData.totalSessions) * 100)}%</p>
          </CardContent>
        </Card>

        <Card className="border border-slate-200/60 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm bg-gradient-to-br from-status-warning/10 to-status-warning/5 hover:border-status-warning">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-white/40 backdrop-blur-sm border-b border-white/60">
            <CardTitle className="text-sm font-semibold text-slate-800">Pending Cases</CardTitle>
            <div className="p-2 rounded-full bg-status-warning/20">
              <AlertTriangle className="h-4 w-4 text-status-warning" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800">{counselingData.pendingCases}</div>
            <p className="text-xs text-slate-600 mt-1">Require attention</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-2 border-blue-100 shadow-lg">
          <CardHeader>
            <CardTitle className="text-slate-800">Monthly Counseling Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={counselingData.monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                <XAxis dataKey="month" stroke="#64748b" />
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
                  dataKey="sessions"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ fill: "#10b981", strokeWidth: 2, r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-2 border-blue-100 shadow-lg">
          <CardHeader>
            <CardTitle className="text-slate-800">Recent Counseling Interventions</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentInterventions.map((intervention, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{intervention.student}</TableCell>
                    <TableCell>{intervention.type}</TableCell>
                    <TableCell>{intervention.date}</TableCell>
                    <TableCell>
                      <Badge variant={intervention.status === "Resolved" ? "default" : "secondary"}>
                        {intervention.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderExportReports = () => (
    <div className="space-y-6">
      <Card className="border-2 border-blue-100 shadow-lg">
        <CardHeader>
          <CardTitle className="text-slate-800">Export & Reports</CardTitle>
          <CardDescription>Generate and schedule university reports</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="year-select">Academic Year</Label>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger>
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2023">2023-24</SelectItem>
                  <SelectItem value="2022">2022-23</SelectItem>
                  <SelectItem value="2021">2021-22</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="department-select">Department</Label>
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="arts">Arts</SelectItem>
                  <SelectItem value="commerce">Commerce</SelectItem>
                  <SelectItem value="science">Science</SelectItem>
                  <SelectItem value="management">Management</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="category-select">Student Category</Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Students</SelectItem>
                  <SelectItem value="at-risk">At-Risk Students</SelectItem>
                  <SelectItem value="high-performers">High Performers</SelectItem>
                  <SelectItem value="dropouts">Dropouts</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Export Buttons */}
          <div className="flex flex-wrap gap-4">
            <Button onClick={handleExportCSV} className="flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Export to CSV</span>
            </Button>
            <Button onClick={handleScheduleReport} variant="outline" className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>Schedule Report</span>
            </Button>
            <Button variant="outline" className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>Generate PDF</span>
            </Button>
          </div>

          {/* Report Preview */}
          <div className="border rounded-lg p-4 bg-slate-50">
            <h4 className="font-semibold text-slate-800 mb-2">Report Preview</h4>
            <p className="text-sm text-slate-600">
              Selected filters: Year {selectedYear}, Department: {selectedDepartment}, Category: {selectedCategory}
            </p>
            <p className="text-sm text-slate-600 mt-1">
              This report will include student enrollment, dropout rates, faculty performance, and counseling data.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const sidebarItems = [
    { id: "overview", label: "University Overview", icon: BarChart3 },
    { id: "departments", label: "Department Analytics", icon: GraduationCap },
    { id: "faculty", label: "Faculty Engagement", icon: Users },
    { id: "risk-insights", label: "Student Risk Insights", icon: BrainCircuit },
    { id: "counseling", label: "Counseling & Support", icon: HeartHandshake },
    { id: "reports", label: "Export & Reports", icon: FileText },
  ]

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile Sidebar Overlay */}
      {isMobile && sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <div className="fixed left-0 top-0 h-full w-80 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 shadow-2xl">
            <div className="flex items-center justify-between p-6 bg-gradient-to-r from-amber-600 via-orange-500 to-red-500 border-b border-amber-400/20">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                  <GraduationCap className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white tracking-wide">DISHA</h2>
                  <p className="text-xs text-amber-100 font-medium">University Dashboard</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)} className="text-white hover:bg-white/20">
                <X className="h-5 w-5" />
              </Button>
            </div>
            <nav className="p-6 space-y-1">
              {sidebarItems.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveSection(item.id)
                      setSidebarOpen(false)
                    }}
                    className={`flex items-center w-full px-4 py-3.5 text-sm font-medium rounded-xl transition-all duration-300 group ${activeSection === item.id
                      ? "bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-100 border-l-4 border-amber-400 shadow-lg backdrop-blur-sm"
                      : "text-slate-300 hover:bg-slate-700/50 hover:text-amber-100 hover:shadow-md"
                      }`}
                  >
                    <Icon className={`mr-4 h-5 w-5 transition-all duration-300 ${activeSection === item.id ? "text-amber-300" : "text-slate-400 group-hover:text-amber-200"
                      }`} />
                    <span className="font-medium tracking-wide">{item.label}</span>
                  </button>
                )
              })}
            </nav>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-72 lg:flex-col lg:fixed lg:inset-y-0">
        <div className="flex flex-col flex-grow bg-[#0A3A67] border-r border-gray-300">
          {/* Header */}
          <div className="flex items-center px-6 py-5 bg-white border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#0A3A67] rounded-md flex items-center justify-center">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-[#0A3A67] tracking-wide">DISHA</h1>
                <p className="text-xs text-gray-600">University Dashboard</p>
              </div>
            </div>
          </div>
          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1">
            {sidebarItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-md transition-all duration-200 ${activeSection === item.id
                    ? "bg-white text-[#0A3A67] border-l-4 border-[#138808]"
                    : "text-gray-200 hover:bg-[#0C477A] hover:text-white"
                    }`}
                >
                  <Icon className={`mr-3 h-5 w-5 ${activeSection === item.id ? "text-[#138808]" : "text-gray-300"
                    }`} />
                  <span>{item.label}</span>
                </button>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-72">
        <header className="bg-white border-b border-gray-200">
          <div className="flex items-center justify-between px-6 py-4 md:px-8">
            {/* Left Section */}
            <div className="flex items-center space-x-4">
              {isMobile && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="mr-2 hover:bg-gray-100"
                  onClick={() => setSidebarOpen(true)}
                >
                  <Menu className="h-5 w-5 text-gray-700" />
                </Button>
              )}

              <div className="flex items-center space-x-3">
                {/* Logo/Icon */}
                <div className="w-8 h-8 bg-[#0A3A67] rounded-md flex items-center justify-center">
                  <GraduationCap className="h-5 w-5 text-white" />
                </div>

                {/* Title */}
                <div>
                  <h1 className="text-2xl font-bold text-[#0A3A67] tracking-tight">
                    {sidebarItems.find((item) => item.id === activeSection)?.label || "University Overview"}
                  </h1>
                  <p className="text-sm text-gray-600">University Analytics Dashboard</p>
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-gray-100"
              >
                <Bell className="h-5 w-5 text-gray-700" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-600 rounded-full border-2 border-white"></span>
              </Button>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full hover:bg-gray-100"
                  >
                    <Avatar className="h-10 w-10 border border-gray-300">
                      <AvatarImage src="/placeholder-user.jpg" alt="University Admin" />
                      <AvatarFallback className="bg-gray-200 text-gray-700 font-semibold">
                        UA
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-gradient-to-b from-transparent to-slate-50/50">
          {activeSection === "overview" && renderOverview()}
          {activeSection === "departments" && renderDepartmentAnalytics()}
          {activeSection === "faculty" && renderFacultyEngagement()}
          {activeSection === "risk-insights" && renderStudentRiskInsights()}
          {activeSection === "counseling" && renderCounselingSupport()}
          {activeSection === "reports" && renderExportReports()}
        </main>
      </div>
    </div>
  )
}