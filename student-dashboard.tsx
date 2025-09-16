"use client"
import { useState, useEffect } from "react"
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
  ExternalLink
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
  Area,
  AreaChart,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ScatterChart,
  Scatter,
  ComposedChart,
  Legend,
} from "recharts"

interface StudentDashboardProps {
  studentId?: string
  studentName?: string
}

export default function StudentDashboard({ studentId = "STU001", studentName = "Priya Sharma" }: StudentDashboardProps) {
  const [activeSection, setActiveSection] = useState("overview")
  const [showChatbot, setShowChatbot] = useState(false)
  const { toast } = useToast()

  // Student Personal KPIs
  const studentKPIs = [
    {
      title: "Risk Score",
      value: "Low",
      percentage: 85,
      target: "Keep Above 80%",
      status: "excellent",
      icon: "🛡️",
      trend: "+2.1%",
      description: "Overall academic risk assessment"
    },
    {
      title: "Attendance Rate",
      value: "92.5%",
      percentage: 92.5,
      target: "90% Required",
      status: "excellent",
      icon: "📅",
      trend: "+1.8%",
      description: "Class attendance this semester"
    },
    {
      title: "Current GPA",
      value: "8.4/10",
      percentage: 84,
      target: "8.0+ Target",
      status: "good",
      icon: "📊",
      trend: "+0.3",
      description: "Academic performance grade"
    },
    {
      title: "Motivation Streak",
      value: "12 Days",
      percentage: 75,
      target: "15 Days Goal",
      status: "good",
      icon: "🔥",
      trend: "+3 Days",
      description: "Consecutive active learning days"
    }
  ]

  // Academic Performance Over Time
  const academicPerformanceData = [
    { semester: "Sem 1", gpa: 7.2, classAvg: 7.5, attendance: 88 },
    { semester: "Sem 2", gpa: 7.8, classAvg: 7.6, attendance: 91 },
    { semester: "Sem 3", gpa: 8.1, classAvg: 7.7, attendance: 89 },
    { semester: "Sem 4", gpa: 8.4, classAvg: 7.8, attendance: 92.5 },
  ]

  // Dropout Risk Factors
  const riskFactorsData = [
    { factor: "Attendance", score: 92, risk: "Low" },
    { factor: "Academic", score: 84, risk: "Low" },
    { factor: "Financial", score: 65, risk: "Medium" },
    { factor: "Engagement", score: 78, risk: "Low" },
    { factor: "Social", score: 88, risk: "Low" }
  ]

  // AI Recommendations
  const aiRecommendations = [
    {
      type: "study",
      title: "Focus on Mathematics",
      description: "Your calculus scores show room for improvement. Consider joining study groups.",
      priority: "high",
      icon: "📚"
    },
    {
      type: "career",
      title: "Explore Data Science",
      description: "Based on your strong performance in statistics, consider data science courses.",
      priority: "medium",
      icon: "💼"
    },
    {
      type: "financial",
      title: "Scholarship Opportunity",
      description: "You're eligible for the Merit Scholarship. Application deadline: March 15th.",
      priority: "high",
      icon: "💰"
    }
  ]

  // Upcoming Counselling Sessions
  const counsellingSessions = [
    {
      date: "2024-01-15",
      time: "2:00 PM",
      counselor: "Dr. Anjali Mehta",
      type: "Academic Planning",
      status: "scheduled"
    },
    {
      date: "2024-01-22",
      time: "11:00 AM",
      counselor: "Prof. Rajesh Kumar",
      type: "Career Guidance",
      status: "scheduled"
    }
  ]

  // Past Sessions
  const pastSessions = [
    {
      date: "2024-01-08",
      counselor: "Dr. Anjali Mehta",
      type: "Study Strategies",
      feedback: "Excellent progress on time management techniques",
      rating: 5
    },
    {
      date: "2023-12-18",
      counselor: "Ms. Priya Singh",
      type: "Stress Management",
      feedback: "Good implementation of mindfulness practices",
      rating: 4
    }
  ]

  // Achievement Badges
  const achievements = [
    { name: "Perfect Attendance", icon: "🎯", earned: true, description: "100% attendance for 2 weeks" },
    { name: "Top Scorer", icon: "🏆", earned: true, description: "Highest marks in Data Structures" },
    { name: "Active Learner", icon: "⚡", earned: true, description: "Completed 5 extra assignments" },
    { name: "Peer Helper", icon: "🤝", earned: false, description: "Help 3 classmates with studies" },
    { name: "Research Star", icon: "🔬", earned: false, description: "Complete a research project" }
  ]

  // Notifications
  const notifications = [
    {
      type: "alert",
      title: "Assignment Due Tomorrow",
      message: "Database Management assignment due by 11:59 PM",
      time: "2 hours ago",
      priority: "high"
    },
    {
      type: "positive",
      title: "Great Job! 📈",
      message: "Your GPA improved by 0.3 points this semester!",
      time: "1 day ago",
      priority: "medium"
    },
    {
      type: "info",
      title: "New Study Material",
      message: "Machine Learning resources added to your course",
      time: "3 days ago",
      priority: "low"
    }
  ]

  // Study Resources
  const studyResources = [
    {
      title: "DIKSHA - Digital Learning",
      description: "Government approved study materials",
      type: "platform",
      url: "#",
      icon: "📱"
    },
    {
      title: "NPTEL Courses",
      description: "Free online courses by IITs",
      type: "courses",
      url: "#",
      icon: "🎓"
    },
    {
      title: "Library E-Books",
      description: "Digital library access",
      type: "books",
      url: "#",
      icon: "📚"
    }
  ]

  // Emergency Contacts
  const emergencyContacts = [
    {
      name: "Dr. Anjali Mehta",
      role: "Academic Mentor",
      phone: "+91-9876543210",
      email: "anjali.mehta@university.edu",
      available: "Mon-Fri 9AM-5PM"
    },
    {
      name: "Ms. Priya Singh",
      role: "Student Counselor",
      phone: "+91-9876543211",
      email: "priya.singh@university.edu",
      available: "24/7 Emergency"
    }
  ]

  const renderPersonalOverview = () => (
    <div className="space-y-6">
      {/* Student KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {studentKPIs.map((kpi, index) => (
          <Card key={index} className={`border border-slate-200/60 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm ${kpi.status === 'excellent' ? 'bg-gradient-to-br from-status-excellent/10 to-status-excellent/5 hover:border-status-excellent' :
              kpi.status === 'good' ? 'bg-gradient-to-br from-brand-primary/10 to-brand-primary/5 hover:border-brand-primary' :
                kpi.status === 'on-track' ? 'bg-gradient-to-br from-status-warning/10 to-status-warning/5 hover:border-status-warning' :
                  'bg-gradient-to-br from-status-danger/10 to-status-danger/5 hover:border-status-danger'
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
              <p className="text-xs text-slate-600 mt-1">{kpi.description}</p>
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

      {/* AI Counselling Panel */}
      <Card className="border-2 border-purple-100 shadow-lg bg-gradient-to-br from-purple-50/80 to-indigo-50/60">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-slate-800 flex items-center gap-2">
                <BrainCircuit className="h-5 w-5 text-purple-600" />
                AI Counselling & Recommendations
              </CardTitle>
              <CardDescription>Personalized guidance powered by AI</CardDescription>
            </div>
            <Button
              onClick={() => setShowChatbot(true)}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Chat with AI
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {aiRecommendations.map((rec, index) => (
              <div key={index} className={`p-4 rounded-lg border ${rec.priority === 'high' ? 'bg-red-50 border-red-200' :
                  rec.priority === 'medium' ? 'bg-yellow-50 border-yellow-200' :
                    'bg-blue-50 border-blue-200'
                }`}>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{rec.icon}</span>
                  <div>
                    <h4 className="font-semibold text-slate-800">{rec.title}</h4>
                    <p className="text-sm text-slate-600 mt-1">{rec.description}</p>
                    <Badge className={`mt-2 ${rec.priority === 'high' ? 'bg-red-100 text-red-800' :
                        rec.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                      }`}>
                      {rec.priority} priority
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderAcademicAnalytics = () => (
    <div className="space-y-6">
      {/* Academic Performance Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-2 border-blue-100 shadow-lg">
          <CardHeader>
            <CardTitle className="text-slate-800">Academic Performance Trend</CardTitle>
            <CardDescription>GPA progression over semesters</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={academicPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                <XAxis dataKey="semester" stroke="#64748b" />
                <YAxis stroke="#64748b" domain={[6, 10]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="gpa"
                  stroke="#2196F3"
                  strokeWidth={3}
                  dot={{ fill: "#2196F3", strokeWidth: 2, r: 6 }}
                  name="Your GPA"
                />
                <Line
                  type="monotone"
                  dataKey="classAvg"
                  stroke="#94a3b8"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ fill: "#94a3b8", strokeWidth: 2, r: 4 }}
                  name="Class Average"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Risk Factors Chart */}
        <Card className="border-2 border-orange-100 shadow-lg">
          <CardHeader>
            <CardTitle className="text-slate-800">Dropout Risk Analysis</CardTitle>
            <CardDescription>Risk factor contribution assessment</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={riskFactorsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#fed7aa" />
                <XAxis dataKey="factor" stroke="#64748b" />
                <YAxis stroke="#64748b" domain={[0, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fef3c7",
                    border: "1px solid #fbbf24",
                    borderRadius: "8px",
                  }}
                />
                <Bar
                  dataKey="score"
                  fill="#f59e0b"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Performance Comparison */}
      <Card className="border-2 border-status-good/20 shadow-lg">
        <CardHeader>
          <CardTitle className="text-slate-800">Performance Comparison</CardTitle>
          <CardDescription>How you compare with class averages</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-status-excellent/10 rounded-lg">
              <div className="text-3xl font-bold text-status-excellent">+0.6</div>
              <div className="text-sm text-slate-600">Above Class Average</div>
              <div className="text-xs text-slate-500 mt-1">GPA Difference</div>
            </div>
            <div className="text-center p-4 bg-brand-primary/10 rounded-lg">
              <div className="text-3xl font-bold text-brand-primary">Top 15%</div>
              <div className="text-sm text-slate-600">Class Ranking</div>
              <div className="text-xs text-slate-500 mt-1">Academic Performance</div>
            </div>
            <div className="text-center p-4 bg-brand-secondary/10 rounded-lg">
              <div className="text-3xl font-bold text-brand-secondary">92.5%</div>
              <div className="text-sm text-slate-600">Attendance Rate</div>
              <div className="text-xs text-slate-500 mt-1">vs 87% Class Avg</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderCounsellingSupport = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Sessions */}
        <Card className="border-2 border-indigo-100 shadow-lg">
          <CardHeader>
            <CardTitle className="text-slate-800 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-indigo-600" />
              Upcoming Counselling Sessions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {counsellingSessions.map((session, index) => (
                <div key={index} className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-slate-800">{session.type}</h4>
                      <p className="text-sm text-slate-600">{session.counselor}</p>
                      <p className="text-xs text-slate-500 mt-1">
                        {new Date(session.date).toLocaleDateString()} at {session.time}
                      </p>
                    </div>
                    <Badge className="bg-status-good/20 text-status-good">Scheduled</Badge>
                  </div>
                </div>
              ))}
              <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Book New Session
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Past Sessions */}
        <Card className="border-2 border-teal-100 shadow-lg">
          <CardHeader>
            <CardTitle className="text-slate-800 flex items-center gap-2">
              <Clock className="h-5 w-5 text-teal-600" />
              Past Sessions & Feedback
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pastSessions.map((session, index) => (
                <div key={index} className="p-4 bg-teal-50 rounded-lg border border-teal-200">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold text-slate-800">{session.type}</h4>
                      <p className="text-sm text-slate-600">{session.counselor}</p>
                      <p className="text-xs text-slate-500">
                        {new Date(session.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < session.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-slate-700 italic">"{session.feedback}"</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Anonymous Help Corner */}
      <Card className="border-2 border-pink-100 shadow-lg bg-gradient-to-br from-pink-50/80 to-rose-50/60">
        <CardHeader>
          <CardTitle className="text-slate-800 flex items-center gap-2">
            <Heart className="h-5 w-5 text-pink-600" />
            Anonymous Help Corner
          </CardTitle>
          <CardDescription>Safe space for emotional support and guidance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white/60 rounded-lg text-center">
              <Smile className="h-8 w-8 text-pink-600 mx-auto mb-2" />
              <h4 className="font-semibold text-slate-800">Mental Health</h4>
              <p className="text-sm text-slate-600 mt-1">Stress, anxiety, and wellness support</p>
              <Button variant="outline" className="mt-3 w-full">
                Get Help
              </Button>
            </div>
            <div className="p-4 bg-white/60 rounded-lg text-center">
              <Users className="h-8 w-8 text-pink-600 mx-auto mb-2" />
              <h4 className="font-semibold text-slate-800">Peer Support</h4>
              <p className="text-sm text-slate-600 mt-1">Connect with fellow students</p>
              <Button variant="outline" className="mt-3 w-full">
                Join Group
              </Button>
            </div>
            <div className="p-4 bg-white/60 rounded-lg text-center">
              <Phone className="h-8 w-8 text-pink-600 mx-auto mb-2" />
              <h4 className="font-semibold text-slate-800">Crisis Helpline</h4>
              <p className="text-sm text-slate-600 mt-1">24/7 emergency support</p>
              <Button variant="outline" className="mt-3 w-full">
                Call Now
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderNotificationsAlerts = () => (
    <div className="space-y-6">
      <Card className="border-2 border-amber-100 shadow-lg">
        <CardHeader>
          <CardTitle className="text-slate-800 flex items-center gap-2">
            <Bell className="h-5 w-5 text-amber-600" />
            Notifications & Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notifications.map((notification, index) => (
              <div key={index} className={`p-4 rounded-lg border-l-4 ${notification.type === 'alert' ? 'bg-red-50 border-red-400' :
                  notification.type === 'positive' ? 'bg-status-good/10 border-status-good' :
                    'bg-blue-50 border-blue-400'
                }`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    {
                      notification.type === 'alert' ? <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" /> :
                        notification.type === 'positive' ? <CheckCircle className="h-5 w-5 text-status-good mt-0.5" /> :
                          <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                    }
                    <div>
                      <h4 className="font-semibold text-slate-800">{notification.title}</h4>
                      <p className="text-sm text-slate-600 mt-1">{notification.message}</p>
                      <p className="text-xs text-slate-500 mt-2">{notification.time}</p>
                    </div>
                  </div>
                  <Badge className={`${notification.priority === 'high' ? 'bg-red-100 text-red-800' :
                      notification.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                    }`}>
                    {notification.priority}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderGamificationMotivation = () => (
    <div className="space-y-6">
      {/* Achievement Badges */}
      <Card className="border-2 border-yellow-100 shadow-lg bg-gradient-to-br from-yellow-50/80 to-amber-50/60">
        <CardHeader>
          <CardTitle className="text-slate-800 flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-600" />
            Achievement Badges
          </CardTitle>
          <CardDescription>Celebrate your learning milestones</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {achievements.map((achievement, index) => (
              <div key={index} className={`p-4 rounded-lg text-center transition-all duration-300 ${achievement.earned
                  ? 'bg-gradient-to-br from-yellow-100 to-amber-100 border-2 border-yellow-300 shadow-md'
                  : 'bg-gray-100 border-2 border-gray-200 opacity-60'
                }`}>
                <div className={`text-3xl mb-2 ${achievement.earned ? 'grayscale-0' : 'grayscale'
                  }`}>
                  {achievement.icon}
                </div>
                <h4 className={`font-semibold text-sm ${achievement.earned ? 'text-slate-800' : 'text-slate-500'
                  }`}>
                  {achievement.name}
                </h4>
                <p className={`text-xs mt-1 ${achievement.earned ? 'text-slate-600' : 'text-slate-400'
                  }`}>
                  {achievement.description}
                </p>
                {achievement.earned && (
                  <Badge className="mt-2 bg-yellow-200 text-yellow-800">Earned!</Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Leaderboard */}
      <Card className="border-2 border-purple-100 shadow-lg">
        <CardHeader>
          <CardTitle className="text-slate-800 flex items-center gap-2">
            <Zap className="h-5 w-5 text-purple-600" />
            Class Engagement Leaderboard
          </CardTitle>
          <CardDescription>Top engaged students this month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { rank: 1, name: "You (Priya Sharma)", score: 2847, badge: "🥇" },
              { rank: 2, name: "Rahul Verma", score: 2756, badge: "🥈" },
              { rank: 3, name: "Sneha Patel", score: 2689, badge: "🥉" },
              { rank: 4, name: "Arjun Singh", score: 2634, badge: "" },
              { rank: 5, name: "Kavya Reddy", score: 2598, badge: "" }
            ].map((student, index) => (
              <div key={index} className={`flex items-center justify-between p-3 rounded-lg ${student.rank === 1 ? 'bg-gradient-to-r from-yellow-100 to-amber-100 border border-yellow-300' :
                  'bg-slate-50 border border-slate-200'
                }`}>
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold text-slate-600">#{student.rank}</span>
                  <span className="text-2xl">{student.badge}</span>
                  <span className={`font-semibold ${student.rank === 1 ? 'text-yellow-800' : 'text-slate-800'
                    }`}>
                    {student.name}
                  </span>
                </div>
                <div className={`font-bold ${student.rank === 1 ? 'text-yellow-700' : 'text-slate-600'
                  }`}>
                  {student.score} pts
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderResourcesHelp = () => (
    <div className="space-y-6">
      {/* Study Resources */}
      <Card className="border-2 border-cyan-100 shadow-lg">
        <CardHeader>
          <CardTitle className="text-slate-800 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-cyan-600" />
            Study Resources
          </CardTitle>
          <CardDescription>Access learning materials and platforms</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {studyResources.map((resource, index) => (
              <div key={index} className="p-4 bg-cyan-50 rounded-lg border border-cyan-200 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{resource.icon}</span>
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-800">{resource.title}</h4>
                    <p className="text-sm text-slate-600 mt-1">{resource.description}</p>
                    <Button variant="outline" size="sm" className="mt-3">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Access
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Financial Aid Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-2 border-status-good/20 shadow-lg">
          <CardHeader>
            <CardTitle className="text-slate-800 flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-status-good" />
              Scholarship & Financial Aid
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-status-good/10 rounded-lg border border-status-good/20">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-slate-800">Merit Scholarship</h4>
                  <Badge className="bg-status-good/20 text-status-good">Eligible</Badge>
                </div>
                <p className="text-sm text-slate-600">₹50,000 per semester</p>
                <p className="text-xs text-slate-500 mt-1">Application deadline: March 15, 2024</p>
                <Button size="sm" className="mt-3 bg-status-good hover:bg-status-good/90 text-white">
                  Apply Now
                </Button>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-slate-800">Need-based Aid</h4>
                  <Badge className="bg-blue-100 text-blue-800">Under Review</Badge>
                </div>
                <p className="text-sm text-slate-600">₹25,000 per semester</p>
                <p className="text-xs text-slate-500 mt-1">Decision expected: February 28, 2024</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Emergency Contacts */}
        <Card className="border-2 border-red-100 shadow-lg">
          <CardHeader>
            <CardTitle className="text-slate-800 flex items-center gap-2">
              <Phone className="h-5 w-5 text-red-600" />
              Emergency Contacts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {emergencyContacts.map((contact, index) => (
                <div key={index} className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <h4 className="font-semibold text-slate-800">{contact.name}</h4>
                  <p className="text-sm text-slate-600">{contact.role}</p>
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Phone className="h-4 w-4" />
                      <span>{contact.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Mail className="h-4 w-4" />
                      <span>{contact.email}</span>
                    </div>
                    <p className="text-xs text-slate-500">{contact.available}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const navigationItems = [
    { id: "overview", label: "Personal Overview", icon: BarChart3 },
    { id: "analytics", label: "Academic Analytics", icon: TrendingUp },
    { id: "counselling", label: "Counselling & Support", icon: HeartHandshake },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "gamification", label: "Achievements", icon: Trophy },
    { id: "resources", label: "Resources & Help", icon: BookOpen },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <GraduationCap className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-slate-800">Student Dashboard</h1>
                  <p className="text-sm text-slate-600">Welcome back, {studentName}!</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowChatbot(true)}
                className="hidden sm:flex"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                AI Assistant
              </Button>
              <Avatar>
                <AvatarImage src="/placeholder-user.jpg" alt={studentName} />
                <AvatarFallback>PS</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white/60 backdrop-blur-sm border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto py-4">
            {navigationItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${activeSection === item.id
                      ? "bg-blue-100 text-blue-700 border border-blue-200"
                      : "text-slate-600 hover:text-slate-800 hover:bg-slate-100"
                    }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeSection === "overview" && renderPersonalOverview()}
        {activeSection === "analytics" && renderAcademicAnalytics()}
        {activeSection === "counselling" && renderCounsellingSupport()}
        {activeSection === "notifications" && renderNotificationsAlerts()}
        {activeSection === "gamification" && renderGamificationMotivation()}
        {activeSection === "resources" && renderResourcesHelp()}
      </main>

      {/* AI Chatbot Modal */}
      {showChatbot && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md h-96 flex flex-col">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="font-semibold text-slate-800">AI Study Assistant</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowChatbot(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-4">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm text-slate-700">
                    Hi Priya! I'm your AI study assistant. How can I help you today?
                  </p>
                </div>
                <div className="bg-slate-100 p-3 rounded-lg ml-8">
                  <p className="text-sm text-slate-700">
                    I need help with my calculus assignment.
                  </p>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm text-slate-700">
                    I'd be happy to help! What specific topic in calculus are you working on?
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input placeholder="Type your message..." className="flex-1" />
                <Button size="sm">
                  Send
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}