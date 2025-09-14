"use client"

import React, { useState, useEffect } from "react"
import 'leaflet/dist/leaflet.css'
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
import dynamic from 'next/dynamic'

// Dynamic import for Leaflet to avoid SSR issues
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false })
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false })
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false })
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false })
const CircleMarker = dynamic(() => import('react-leaflet').then(mod => mod.CircleMarker), { ssr: false })
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

// Language translations
const translations = {
  en: {
    title: "Education Ministry of Rajasthan - Board Level Dashboard",
    subtitle: "Strategic Education Analytics & Policy Support System",
    overview: "Executive Overview",
    regions: "State Analytics",
    universities: "Higher Education Institution",
    teachers: "Faculty Analytics",
    students: "Student Population Analytic",
    aiInsights: "Predictive Analytics",
    counselling: "Student Support Services",
    reports: "Ministry Reports",
    settings: "System Administration",
    totalStudents: "Total Enrolled Students",
    dropoutRate: "State Dropout Rate",
    highRiskStudents: "At-Risk Population",
    regionsMonitored: "Districts Under Monitoring",
    yearlyDropoutTrend: "State-wide Dropout Trends",
    dropoutByLevel: "Dropout Analysis by Education Level",
    dropoutReasons: "Primary Dropout Factors",
    lastUpdated: "Data Last Synchronized",
    ministryKPIs: "Ministry Key Performance Indicators",
    statePerformance: "Rajasthan Education Performance",
    budgetUtilization: "Budget Utilization",
    policyImpact: "Policy Impact Assessment",
  },
  hi: {
    title: "राजस्थान शिक्षा मंत्रालय - बोर्ड स्तरीय डैशबोर्ड",
    subtitle: "रणनीतिक शिक्षा विश्लेषण और नीति सहायता प्रणाली",
    overview: "कार्यकारी अवलोकन",
    regions: "राज्य विश्लेषण",
    universities: "उच्च शिक्षा संस्थान",
    teachers: "संकाय विश्लेषण",
    students: "छात्र जनसंख्या विश्लेषण",
    aiInsights: "भविष्यवाणी विश्लेषण",
    counselling: "छात्र सहायता सेवाएं",
    reports: "मंत्रालय रिपोर्ट",
    settings: "सिस्टम प्रशासन",
    totalStudents: "कुल नामांकित छात्र",
    dropoutRate: "राज्य ड्रॉपआउट दर",
    highRiskStudents: "जोखिम वाली जनसंख्या",
    regionsMonitored: "निगरानी के तहत जिले",
    yearlyDropoutTrend: "राज्यव्यापी ड्रॉपआउट रुझान",
    dropoutByLevel: "शिक्षा स्तर के अनुसार ड्रॉपआउट विश्लेषण",
    dropoutReasons: "प्राथमिक ड्रॉपआउट कारक",
    lastUpdated: "डेटा अंतिम सिंक्रोनाइज़ेशन",
    ministryKPIs: "मंत्रालय मुख्य प्रदर्शन संकेतक",
    statePerformance: "राजस्थान शिक्षा प्रदर्शन",
    budgetUtilization: "बजट उपयोग",
    policyImpact: "नीति प्रभाव मूल्यांकन",
  },
  mr: {
    title: "राजस्थान शिक्षण मंत्रालय - बोर्ड स्तरीय डॅशबोर्ड",
    subtitle: "धोरणात्मक शिक्षण विश्लेषण आणि धोरण सहाय्य प्रणाली",
    overview: "कार्यकारी विहंगावलोकन",
    regions: "राज्य विश्लेषण",
    universities: "उच्च शिक्षण संस्था",
    teachers: "शिक्षक विश्लेषण",
    students: "विद्यार्थी लोकसंख्या विश्लेषण",
    aiInsights: "भविष्यसूचक विश्लेषण",
    counselling: "विद्यार्थी सहाय्य सेवा",
    reports: "मंत्रालय अहवाल",
    settings: "प्रणाली प्रशासन",
    totalStudents: "एकूण नोंदणीकृत विद्यार्थी",
    dropoutRate: "राज्य ड्रॉपआउट दर",
    highRiskStudents: "जोखमीची लोकसंख्या",
    regionsMonitored: "निरीक्षणाधीन जिल्हे",
    yearlyDropoutTrend: "राज्यव्यापी ड्रॉपआउट प्रवृत्ती",
    dropoutByLevel: "शिक्षण स्तरानुसार ड्रॉपआउट विश्लेषण",
    dropoutReasons: "प्राथमिक ड्रॉपआउट घटक",
    lastUpdated: "डेटा शेवटचे सिंक्रोनाइझेशन",
    ministryKPIs: "मंत्रालय मुख्य कामगिरी निर्देशक",
    statePerformance: "राजस्थान शिक्षण कामगिरी",
    budgetUtilization: "अर्थसंकल्प वापर",
    policyImpact: "धोरण प्रभाव मूल्यांकन",
  },
}

type Language = keyof typeof translations

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState("overview")
  const [isMobile, setIsMobile] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [language, setLanguage] = useState<Language>("en")
  const [lastUpdated, setLastUpdated] = useState(new Date())

  // Comprehensive hierarchical filter states
  const [selectedLevel, setSelectedLevel] = useState('state') // state, district, institution
  const [selectedRegion, setSelectedRegion] = useState('all')
  const [selectedDistrict, setSelectedDistrict] = useState('all')
  const [selectedInstitutionType, setSelectedInstitutionType] = useState('all')
  const [selectedInstitution, setSelectedInstitution] = useState('all')
  const [selectedMetric, setSelectedMetric] = useState('enrollment')
  const [selectedTimeframe, setSelectedTimeframe] = useState('current')
  const [searchQuery, setSearchQuery] = useState('')

  // Filter states for Universities section
  const [locationFilter, setLocationFilter] = useState('all')
  const [yearFilter, setYearFilter] = useState('2024')
  const [streamFilter, setStreamFilter] = useState('all')
  const { toast } = useToast()

  const t = translations[language]

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    const interval = setInterval(() => {
      setLastUpdated(new Date())
    }, 30000)

    return () => {
      window.removeEventListener("resize", handleResize)
      clearInterval(interval)
    }
  }, [])

  // Sample data for charts
  const yearlyTrendData = [
    { year: "2019", rate: 12.5 },
    { year: "2020", rate: 14.2 },
    { year: "2021", rate: 13.8 },
    { year: "2022", rate: 11.9 },
    { year: "2023", rate: 10.4 },
    { year: "2024", rate: 9.2 },
  ]

  // Sample data for regions and districts
  const regionsData = [
    { id: 1, name: 'Jaipur', lat: 26.9124, lng: 75.7873, dropoutRate: 8.5, students: 125000, riskLevel: 'low' },
    { id: 2, name: 'Jodhpur', lat: 26.2389, lng: 73.0243, dropoutRate: 12.3, students: 89000, riskLevel: 'medium' },
    { id: 3, name: 'Udaipur', lat: 24.5854, lng: 73.7125, dropoutRate: 15.7, students: 67000, riskLevel: 'high' },
    { id: 4, name: 'Kota', lat: 25.2138, lng: 75.8648, dropoutRate: 6.2, students: 95000, riskLevel: 'low' },
    { id: 5, name: 'Ajmer', lat: 26.4499, lng: 74.6399, dropoutRate: 18.9, students: 78000, riskLevel: 'high' },
    { id: 6, name: 'Bikaner', lat: 28.0229, lng: 73.3119, dropoutRate: 14.1, students: 52000, riskLevel: 'medium' },
    { id: 7, name: 'Alwar', lat: 27.5530, lng: 76.6346, dropoutRate: 11.8, students: 71000, riskLevel: 'medium' },
    { id: 8, name: 'Bharatpur', lat: 27.2152, lng: 77.4977, dropoutRate: 9.4, students: 48000, riskLevel: 'low' }
  ]

  const universitiesData = [
    { id: 1, name: 'University of Rajasthan', location: 'Jaipur', students: 45000, dropoutRate: 7.2, stream: 'Arts & Science', year: 2024 },
    { id: 2, name: 'Rajasthan Technical University', location: 'Kota', students: 38000, dropoutRate: 5.8, stream: 'Engineering', year: 2024 },
    { id: 3, name: 'Maharana Pratap University', location: 'Udaipur', students: 32000, dropoutRate: 9.1, stream: 'Agriculture', year: 2024 },
    { id: 4, name: 'Jai Narain Vyas University', location: 'Jodhpur', students: 28000, dropoutRate: 8.5, stream: 'Commerce', year: 2024 },
    { id: 5, name: 'Mohanlal Sukhadia University', location: 'Udaipur', students: 25000, dropoutRate: 6.9, stream: 'Science', year: 2024 }
  ]

  const teachersData = [
    { id: 1, name: 'Dr. Priya Sharma', subject: 'Mathematics', engagement: 92, workload: 18, students: 120, dropoutRate: 4.2, experience: 8 },
    { id: 2, name: 'Prof. Rajesh Kumar', subject: 'Physics', engagement: 87, workload: 22, students: 95, dropoutRate: 6.8, experience: 12 },
    { id: 3, name: 'Dr. Anita Singh', subject: 'Chemistry', engagement: 95, workload: 16, students: 110, dropoutRate: 3.1, experience: 6 },
    { id: 4, name: 'Mr. Vikram Joshi', subject: 'Biology', engagement: 78, workload: 25, students: 85, dropoutRate: 9.5, experience: 15 },
    { id: 5, name: 'Dr. Meera Gupta', subject: 'English', engagement: 89, workload: 20, students: 130, dropoutRate: 5.7, experience: 10 },
    { id: 6, name: 'Prof. Suresh Patel', subject: 'History', engagement: 82, workload: 19, students: 75, dropoutRate: 7.3, experience: 18 },
    { id: 7, name: 'Dr. Kavita Rao', subject: 'Economics', engagement: 91, workload: 17, students: 105, dropoutRate: 4.8, experience: 7 },
    { id: 8, name: 'Mr. Amit Verma', subject: 'Computer Science', engagement: 94, workload: 21, students: 140, dropoutRate: 2.9, experience: 5 }
  ]

  const engagementCorrelationData = [
    { engagement: 75, dropoutRate: 12.5 },
    { engagement: 80, dropoutRate: 9.8 },
    { engagement: 85, dropoutRate: 7.2 },
    { engagement: 90, dropoutRate: 4.5 },
    { engagement: 95, dropoutRate: 2.1 }
  ]

  const levelData = [
    { level: "Primary", dropouts: 2340 },
    { level: "Secondary", dropouts: 4560 },
    { level: "Higher Secondary", dropouts: 3210 },
    { level: "Undergraduate", dropouts: 5670 },
    { level: "Postgraduate", dropouts: 1890 },
  ]

  const reasonsData = [
    { name: "Financial Issues", value: 35, color: "#2196F3" },
    { name: "Family Problems", value: 25, color: "#64B5F6" },
    { name: "Academic Difficulty", value: 20, color: "#BBDEFB" },
    { name: "Health Issues", value: 12, color: "#E3F2FD" },
    { name: "Others", value: 8, color: "#F5F9FF" },
  ]

  // Ministry-level KPI data
  const ministryKPIs = [
    {
      title: "Budget Utilization",
      value: "₹2,847 Cr",
      percentage: 87.3,
      target: "₹3,264 Cr",
      status: "on-track",
      icon: "💰",
      trend: "+5.2%"
    },
    {
      title: "Policy Implementation",
      value: "23/28",
      percentage: 82.1,
      target: "28 Districts",
      status: "good",
      icon: "📋",
      trend: "+12.5%"
    },
    {
      title: "Digital Infrastructure",
      value: "1,847",
      percentage: 76.4,
      target: "2,418 Schools",
      status: "needs-attention",
      icon: "💻",
      trend: "+8.7%"
    },
    {
      title: "Teacher Training",
      value: "45,892",
      percentage: 91.2,
      target: "50,320 Teachers",
      status: "excellent",
      icon: "👨‍🏫",
      trend: "+15.3%"
    }
  ]

  const budgetUtilizationData = [
    { month: "Apr", allocated: 280, utilized: 245, efficiency: 87.5 },
    { month: "May", allocated: 290, utilized: 258, efficiency: 89.0 },
    { month: "Jun", allocated: 275, utilized: 241, efficiency: 87.6 },
    { month: "Jul", allocated: 310, utilized: 278, efficiency: 89.7 },
    { month: "Aug", allocated: 295, utilized: 267, efficiency: 90.5 },
    { month: "Sep", allocated: 285, utilized: 259, efficiency: 90.9 },
  ]

  const districtPerformanceData = [
    { district: "Jaipur", enrollment: 95.2, retention: 92.8, completion: 89.4, score: 92.5 },
    { district: "Jodhpur", enrollment: 89.7, retention: 87.3, completion: 84.1, score: 87.0 },
    { district: "Udaipur", enrollment: 91.3, retention: 88.9, completion: 86.7, score: 89.0 },
    { district: "Kota", enrollment: 96.8, retention: 94.2, completion: 91.5, score: 94.2 },
    { district: "Ajmer", enrollment: 87.4, retention: 84.6, completion: 81.2, score: 84.4 },
    { district: "Bikaner", enrollment: 88.9, retention: 86.1, completion: 83.7, score: 86.2 },
  ]

  const policyImpactData = [
    { policy: "Mid-Day Meal", impact: 94.2, beneficiaries: "2.1M", status: "active" },
    { policy: "Digital Classroom", impact: 78.5, beneficiaries: "1.8M", status: "expanding" },
    { policy: "Teacher Training", impact: 89.7, beneficiaries: "45K", status: "active" },
    { policy: "Infrastructure Dev", impact: 72.3, beneficiaries: "2.4M", status: "ongoing" },
    { policy: "Scholarship Program", impact: 91.8, beneficiaries: "156K", status: "active" },
  ]

  // Advanced visualization datasets
  const ministryRadarData = [
    {
      subject: 'Budget Efficiency',
      A: 87.3,
      B: 82.1,
      fullMark: 100,
    },
    {
      subject: 'Policy Implementation',
      A: 82.1,
      B: 78.5,
      fullMark: 100,
    },
    {
      subject: 'Digital Infrastructure',
      A: 76.4,
      B: 71.2,
      fullMark: 100,
    },
    {
      subject: 'Teacher Training',
      A: 91.2,
      B: 88.7,
      fullMark: 100,
    },
    {
      subject: 'Student Retention',
      A: 89.7,
      B: 85.3,
      fullMark: 100,
    },
    {
      subject: 'Infrastructure Quality',
      A: 84.6,
      B: 79.8,
      fullMark: 100,
    },
  ]

  const districtScatterData = [
    { x: 95.2, y: 92.8, z: 485392, district: 'Jaipur' },
    { x: 89.7, y: 87.3, z: 342156, district: 'Jodhpur' },
    { x: 91.3, y: 88.9, z: 298745, district: 'Udaipur' },
    { x: 96.8, y: 94.2, z: 267834, district: 'Kota' },
    { x: 87.4, y: 84.6, z: 234567, district: 'Ajmer' },
    { x: 88.9, y: 86.1, z: 198432, district: 'Bikaner' },
    { x: 92.1, y: 89.4, z: 176543, district: 'Alwar' },
    { x: 85.6, y: 82.7, z: 154321, district: 'Bharatpur' },
  ]

  const performanceComboData = [
    {
      month: 'Apr',
      enrollment: 94.2,
      retention: 91.8,
      completion: 88.5,
      budget: 280,
    },
    {
      month: 'May',
      enrollment: 94.8,
      retention: 92.3,
      completion: 89.1,
      budget: 290,
    },
    {
      month: 'Jun',
      enrollment: 95.1,
      retention: 92.7,
      completion: 89.6,
      budget: 275,
    },
    {
      month: 'Jul',
      enrollment: 95.4,
      retention: 93.1,
      completion: 90.2,
      budget: 310,
    },
    {
      month: 'Aug',
      enrollment: 95.7,
      retention: 93.5,
      completion: 90.8,
      budget: 295,
    },
    {
      month: 'Sep',
      enrollment: 96.0,
      retention: 93.9,
      completion: 91.4,
      budget: 285,
    },
  ]

  const institutionTypeData = [
    { type: 'Government Schools', count: 45672, performance: 87.3, funding: 2847 },
    { type: 'Private Schools', count: 12834, performance: 92.1, funding: 0 },
    { type: 'Government Colleges', count: 287, performance: 84.6, funding: 1256 },
    { type: 'Private Colleges', count: 156, performance: 89.4, funding: 0 },
    { type: 'Universities', count: 23, performance: 91.7, funding: 892 },
    { type: 'Technical Institutes', count: 89, performance: 88.9, funding: 456 },
  ]

  // State-level district analytics data

  const rajasthanDistricts = [
    {
      name: "Jaipur",
      enrollment: 95.2,
      retention: 92.8,
      completion: 89.4,
      infrastructure: 87.6,
      schools: 2847,
      students: 485392,
      teachers: 18472,
      budget: 284.7,
      region: "Central",
      population: 6626178,
      literacyRate: 84.1
    },
    {
      name: "Jodhpur",
      enrollment: 89.7,
      retention: 87.3,
      completion: 84.1,
      infrastructure: 82.4,
      schools: 1923,
      students: 342156,
      teachers: 12847,
      budget: 198.4,
      region: "Western",
      population: 3687165,
      literacyRate: 80.6
    },
    {
      name: "Udaipur",
      enrollment: 91.3,
      retention: 88.9,
      completion: 86.7,
      infrastructure: 85.2,
      schools: 2156,
      students: 398472,
      teachers: 14923,
      budget: 234.8,
      region: "Southern",
      population: 3068420,
      literacyRate: 82.9
    },
    {
      name: "Kota",
      enrollment: 96.8,
      retention: 94.2,
      completion: 91.5,
      infrastructure: 91.8,
      schools: 1456,
      students: 287394,
      teachers: 11234,
      budget: 167.3,
      region: "Eastern",
      population: 1951014,
      literacyRate: 88.5
    },
    {
      name: "Ajmer",
      enrollment: 87.4,
      retention: 84.6,
      completion: 81.2,
      infrastructure: 79.8,
      schools: 1789,
      students: 324567,
      teachers: 12456,
      budget: 189.2,
      region: "Central",
      population: 2583052,
      literacyRate: 81.7
    },
    {
      name: "Bikaner",
      enrollment: 88.9,
      retention: 86.1,
      completion: 83.7,
      infrastructure: 81.3,
      schools: 1634,
      students: 298734,
      teachers: 11789,
      budget: 174.6,
      region: "Northern",
      population: 2363937,
      literacyRate: 79.4
    },
    {
      name: "Alwar",
      enrollment: 90.6,
      retention: 88.2,
      completion: 85.9,
      infrastructure: 84.1,
      schools: 2234,
      students: 412893,
      teachers: 15672,
      budget: 241.7,
      region: "Eastern",
      population: 3674179,
      literacyRate: 83.2
    },
    {
      name: "Bharatpur",
      enrollment: 92.1,
      retention: 89.7,
      completion: 87.3,
      infrastructure: 86.5,
      schools: 1876,
      students: 356789,
      teachers: 13456,
      budget: 208.4,
      region: "Eastern",
      population: 2548462,
      literacyRate: 85.8
    }
  ]

  const regionSummary = [
    { region: "Central", districts: 8, avgEnrollment: 91.4, avgRetention: 88.6, totalStudents: 1247832, budget: 722.3 },
    { region: "Western", districts: 6, avgEnrollment: 87.8, avgRetention: 85.2, totalStudents: 892456, budget: 567.8 },
    { region: "Eastern", districts: 7, avgEnrollment: 93.2, avgRetention: 90.7, totalStudents: 1156734, budget: 617.4 },
    { region: "Southern", districts: 4, avgEnrollment: 89.6, avgRetention: 87.1, totalStudents: 734892, budget: 456.2 },
    { region: "Northern", districts: 3, avgEnrollment: 86.7, avgRetention: 84.3, totalStudents: 567234, budget: 389.7 }
  ]

  // Comprehensive institution data for hierarchical filtering
  const institutionData = [
    // Jaipur District Institutions
    { id: 'jp001', name: 'Government Senior Secondary School, Malviya Nagar', type: 'Government School', district: 'Jaipur', region: 'Central', students: 1247, teachers: 42, enrollment: 96.8, retention: 94.2, infrastructure: 89.4, budget: 12.4 },
    { id: 'jp002', name: 'Rajasthan University', type: 'University', district: 'Jaipur', region: 'Central', students: 45672, teachers: 1234, enrollment: 98.2, retention: 91.7, infrastructure: 92.1, budget: 234.7 },
    { id: 'jp003', name: 'Government Girls College, C-Scheme', type: 'Government College', district: 'Jaipur', region: 'Central', students: 3456, teachers: 156, enrollment: 94.3, retention: 89.8, infrastructure: 87.6, budget: 45.2 },
    { id: 'jp004', name: 'Delhi Public School, Jaipur', type: 'Private School', district: 'Jaipur', region: 'Central', students: 2134, teachers: 89, enrollment: 99.1, retention: 97.3, infrastructure: 95.8, budget: 0 },
    { id: 'jp005', name: 'Malaviya National Institute of Technology', type: 'Technical Institute', district: 'Jaipur', region: 'Central', students: 8934, teachers: 456, enrollment: 97.8, retention: 94.6, infrastructure: 93.2, budget: 156.8 },

    // Jodhpur District Institutions
    { id: 'jd001', name: 'Government Senior Secondary School, Ratanada', type: 'Government School', district: 'Jodhpur', region: 'Western', students: 987, teachers: 34, enrollment: 91.2, retention: 88.7, infrastructure: 84.3, budget: 9.8 },
    { id: 'jd002', name: 'Jai Narain Vyas University', type: 'University', district: 'Jodhpur', region: 'Western', students: 23456, teachers: 789, enrollment: 89.7, retention: 87.3, infrastructure: 85.9, budget: 145.6 },
    { id: 'jd003', name: 'Government Engineering College', type: 'Technical Institute', district: 'Jodhpur', region: 'Western', students: 2345, teachers: 123, enrollment: 92.4, retention: 89.1, infrastructure: 88.7, budget: 67.3 },
    { id: 'jd004', name: 'Sophia Girls School', type: 'Private School', district: 'Jodhpur', region: 'Western', students: 1567, teachers: 67, enrollment: 96.8, retention: 94.2, infrastructure: 91.5, budget: 0 },

    // Udaipur District Institutions
    { id: 'ud001', name: 'Government Model School, City Palace Road', type: 'Government School', district: 'Udaipur', region: 'Southern', students: 1123, teachers: 38, enrollment: 93.4, retention: 90.8, infrastructure: 87.2, budget: 11.2 },
    { id: 'ud002', name: 'Mohanlal Sukhadia University', type: 'University', district: 'Udaipur', region: 'Southern', students: 34567, teachers: 987, enrollment: 91.3, retention: 88.9, infrastructure: 86.7, budget: 189.4 },
    { id: 'ud003', name: 'Government Polytechnic College', type: 'Technical Institute', district: 'Udaipur', region: 'Southern', students: 1876, teachers: 89, enrollment: 88.9, retention: 86.4, infrastructure: 84.1, budget: 34.7 },

    // Kota District Institutions
    { id: 'kt001', name: 'Government Senior Secondary School, Vigyan Nagar', type: 'Government School', district: 'Kota', region: 'Eastern', students: 1456, teachers: 48, enrollment: 97.2, retention: 95.1, infrastructure: 92.8, budget: 14.5 },
    { id: 'kt002', name: 'University of Kota', type: 'University', district: 'Kota', region: 'Eastern', students: 12345, teachers: 456, enrollment: 96.8, retention: 94.2, infrastructure: 91.5, budget: 98.7 },
    { id: 'kt003', name: 'Allen Career Institute', type: 'Private School', district: 'Kota', region: 'Eastern', students: 15678, teachers: 234, enrollment: 99.8, retention: 98.9, infrastructure: 97.6, budget: 0 },
    { id: 'kt004', name: 'Government Engineering College, Kota', type: 'Technical Institute', district: 'Kota', region: 'Eastern', students: 3456, teachers: 167, enrollment: 95.4, retention: 92.8, infrastructure: 90.3, budget: 78.9 },

    // Additional institutions for other districts
    { id: 'aj001', name: 'Government College, Ajmer', type: 'Government College', district: 'Ajmer', region: 'Central', students: 2789, teachers: 134, enrollment: 87.4, retention: 84.6, infrastructure: 81.2, budget: 42.3 },
    { id: 'bk001', name: 'Government School, Bikaner Fort', type: 'Government School', district: 'Bikaner', region: 'Northern', students: 876, teachers: 29, enrollment: 88.9, retention: 86.1, infrastructure: 83.7, budget: 8.7 },
    { id: 'al001', name: 'Alwar University', type: 'University', district: 'Alwar', region: 'Eastern', students: 18934, teachers: 567, enrollment: 90.6, retention: 88.2, infrastructure: 85.9, budget: 123.4 },
    { id: 'bp001', name: 'Government Girls School, Bharatpur', type: 'Government School', district: 'Bharatpur', region: 'Eastern', students: 1234, teachers: 41, enrollment: 92.1, retention: 89.7, infrastructure: 87.3, budget: 12.3 }
  ]

  // Hierarchical filtering logic
  const getAvailableDistricts = () => {
    if (selectedRegion === 'all') return rajasthanDistricts
    return rajasthanDistricts.filter(district => district.region === selectedRegion)
  }

  const getAvailableInstitutions = () => {
    let filtered = institutionData
    if (selectedRegion !== 'all') {
      filtered = filtered.filter(inst => inst.region === selectedRegion)
    }
    if (selectedDistrict !== 'all') {
      filtered = filtered.filter(inst => inst.district === selectedDistrict)
    }
    if (selectedInstitutionType !== 'all') {
      filtered = filtered.filter(inst => inst.type === selectedInstitutionType)
    }
    if (searchQuery) {
      filtered = filtered.filter(inst =>
        inst.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inst.type.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    return filtered
  }

  const filteredDistricts = getAvailableDistricts()
  const filteredInstitutions = getAvailableInstitutions()

  // Institution type options
  const institutionTypes = ['Government School', 'Private School', 'Government College', 'Private College', 'University', 'Technical Institute']

  // Reset dependent filters when parent filter changes
  const handleRegionChange = (region: string) => {
    setSelectedRegion(region)
    setSelectedDistrict('all')
    setSelectedInstitution('all')
  }

  const handleDistrictChange = (district: string) => {
    setSelectedDistrict(district)
    setSelectedInstitution('all')
  }

  // Comprehensive data filtering function
  const getFilteredData = () => {
    let data = []

    if (selectedLevel === 'state') {
      // State level - show regional summary
      data = regionSummary.map(region => ({
        name: region.region,
        enrollment: region.avgEnrollment,
        students: region.totalStudents,
        budget: region.budget,
        districts: region.districts,
        performance: Math.floor(Math.random() * 20) + 75, // Mock performance score
        infrastructure: Math.floor(Math.random() * 15) + 80
      }))
    } else if (selectedLevel === 'district') {
      // District level - show districts based on region filter
      let districts = rajasthanDistricts

      if (selectedRegion !== 'all') {
        districts = districts.filter(d => d.region === selectedRegion)
      }

      data = districts.map(district => ({
        name: district.name,
        enrollment: district.enrollmentRate,
        students: district.totalStudents,
        schools: district.totalSchools,
        performance: Math.floor(Math.random() * 25) + 70,
        infrastructure: Math.floor(Math.random() * 20) + 75,
        budget: Math.floor(Math.random() * 50) + 100
      }))
    } else {
      // Institution level - show institutions based on district filter
      if (selectedDistrict !== 'all') {
        const districtData = institutionData.find(d => d.district === selectedDistrict)
        if (districtData) {
          let institutions = districtData.institutions

          if (selectedInstitutionType !== 'all') {
            institutions = institutions.filter(i => i.type === selectedInstitutionType)
          }

          data = institutions.map(institution => ({
            name: institution.name,
            enrollment: institution.enrollment,
            students: institution.students,
            performance: institution.performance,
            infrastructure: institution.infrastructure || Math.floor(Math.random() * 20) + 75,
            budget: Math.floor(Math.random() * 20) + 50
          }))
        }
      }
    }

    // Apply search filter
    if (searchQuery) {
      data = data.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    return data
  }

  const navigationItems = [
    { id: "overview", label: t.overview, icon: BarChart3 },
    { id: "regions", label: t.regions, icon: MapPin },
    { id: "universities", label: t.universities, icon: GraduationCap },
    { id: "teachers", label: t.teachers, icon: UserCheck },
    { id: "students", label: t.students, icon: Users },
    { id: "ai-insights", label: t.aiInsights, icon: BrainCircuit },
    { id: "counselling", label: t.counselling, icon: HeartHandshake },
    { id: "reports", label: t.reports, icon: FileText },
    { id: "settings", label: t.settings, icon: Settings },
  ]

  const languageOptions = [
    { code: "en", name: "English" },
    { code: "hi", name: "हिंदी" },
    { code: "mr", name: "मराठी" },
    { code: "bn", name: "বাংলা" },
    { code: "ta", name: "தமிழ்" },
    { code: "te", name: "తెలుగు" },
    { code: "gu", name: "ગુજરાતી" },
    { code: "kn", name: "ಕನ್ನಡ" },
    { code: "pa", name: "ਪੰਜਾਬੀ" },
    { code: "ml", name: "മലയാളം" },
  ]

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Ministry KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {ministryKPIs.map((kpi, index) => (
          <Card key={index} className={`border border-slate-200/60 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm ${kpi.status === 'excellent' ? 'bg-gradient-to-br from-emerald-50/80 to-green-50/60 hover:border-emerald-300' :
            kpi.status === 'good' ? 'bg-gradient-to-br from-blue-50/80 to-indigo-50/60 hover:border-blue-300' :
              kpi.status === 'on-track' ? 'bg-gradient-to-br from-amber-50/80 to-yellow-50/60 hover:border-amber-300' :
                'bg-gradient-to-br from-red-50/80 to-rose-50/60 hover:border-red-300'
            }`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-white/40 backdrop-blur-sm border-b border-white/60">
              <CardTitle className="text-sm font-semibold text-slate-800">{kpi.title}</CardTitle>
              <div className={`p-2 rounded-full ${kpi.status === 'excellent' ? 'bg-green-100' :
                kpi.status === 'good' ? 'bg-blue-100' :
                  kpi.status === 'on-track' ? 'bg-yellow-100' :
                    'bg-red-100'
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
                  <span className={`text-xs font-medium ${kpi.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'
                    }`}>{kpi.trend}</span>
                </div>
                <Progress
                  value={kpi.percentage}
                  className={`h-2 ${kpi.status === 'excellent' ? '[&>div]:bg-green-500' :
                    kpi.status === 'good' ? '[&>div]:bg-blue-500' :
                      kpi.status === 'on-track' ? '[&>div]:bg-yellow-500' :
                        '[&>div]:bg-red-500'
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
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
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

        <Card className="border-2 border-green-100 shadow-lg">
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
                    if (name === 'z') return [`${(value / 1000).toFixed(0)}K`, 'Students']
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
                  return [`${value}%`, name.charAt(0).toUpperCase() + name.slice(1)]
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
  )

  const renderRegionsDistricts = () => {
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
            <CardDescription className="text-blue-100">
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
                    className={selectedLevel === level ? 'bg-blue-600 hover:bg-blue-700' : 'hover:bg-blue-50'}
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
                <Button className="w-full bg-blue-600 hover:bg-blue-700" variant="default">
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
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
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
        <Card className="border-2 border-green-100 shadow-lg bg-gradient-to-r from-green-50 to-blue-50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 p-2 rounded-lg">
                  <Filter className="h-5 w-5 text-green-600" />
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
                      name.charAt(0).toUpperCase() + name.slice(1)
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
                    formatter={(value) => [`${(value / 1000).toFixed(0)}K Students`, 'Population']}
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
    )
  }

  const renderUniversities = () => {
    const filteredUniversities = universitiesData.filter(uni => {
      return (locationFilter === 'all' || uni.location === locationFilter) &&
        (yearFilter === 'all' || uni.year.toString() === yearFilter) &&
        (streamFilter === 'all' || uni.stream === streamFilter)
    })

    const exportToCSV = () => {
      const headers = ['University Name', 'Location', 'Students', 'Dropout Rate', 'Stream', 'Year']
      const csvContent = [
        headers.join(','),
        ...filteredUniversities.map(uni =>
          [uni.name, uni.location, uni.students, uni.dropoutRate, uni.stream, uni.year].join(',')
        )
      ].join('\n')

      const blob = new Blob([csvContent], { type: 'text/csv' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'universities_dropout_data.csv'
      a.click()
      window.URL.revokeObjectURL(url)
    }

    const COLORS = ['#2196F3', '#64B5F6', '#BBDEFB', '#E3F2FD', '#F5F9FF']

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
                <Button onClick={exportToCSV} className="w-full bg-blue-500 hover:bg-blue-600">
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
                  label={({ name, percent }) => `${name} ${( percent * 100).toFixed(0)}%`}
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
    )
  }

  const renderTeachers = () => {
    const avgEngagement = teachersData.reduce((sum, teacher) => sum + teacher.engagement, 0) / teachersData.length
    const avgWorkload = teachersData.reduce((sum, teacher) => sum + teacher.workload, 0) / teachersData.length
    const highEngagementTeachers = teachersData.filter(teacher => teacher.engagement >= 90)
    const overloadedTeachers = teachersData.filter(teacher => teacher.workload >= 22)

    return (
      <div className="space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-white border-blue-100 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-700">Total Teachers</CardTitle>
              <Users className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{teachersData.length}</div>
              <p className="text-xs text-slate-500">Active faculty members</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-blue-100 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-700">Avg Engagement</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{avgEngagement.toFixed(1)}%</div>
              <p className="text-xs text-green-600">+2.3% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-blue-100 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-700">Avg Workload</CardTitle>
              <AlertTriangle className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{avgWorkload.toFixed(1)}h</div>
              <p className="text-xs text-orange-600">Per week</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-blue-100 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-700">High Performers</CardTitle>
              <TrendingUp className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{highEngagementTeachers.length}</div>
              <p className="text-xs text-slate-500">90%+ engagement</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Teacher Performance Table */}
          <Card className="bg-white border-blue-100 shadow-sm">
            <CardHeader>
              <CardTitle className="text-slate-800">Teacher Performance Overview</CardTitle>
              <CardDescription>Engagement levels and workload metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Teacher</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Engagement</TableHead>
                    <TableHead>Workload</TableHead>
                    <TableHead>Impact</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teachersData.slice(0, 6).map((teacher) => (
                    <TableRow key={teacher.id}>
                      <TableCell className="font-medium">{teacher.name}</TableCell>
                      <TableCell>{teacher.subject}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={teacher.engagement} className="w-16 h-2" />
                          <span className="text-xs">{teacher.engagement}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={teacher.workload > 22 ? 'destructive' : teacher.workload > 18 ? 'secondary' : 'default'}>
                          {teacher.workload}h
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={teacher.dropoutRate < 5 ? 'default' : teacher.dropoutRate < 8 ? 'secondary' : 'destructive'}>
                          {teacher.dropoutRate}% dropout
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Engagement vs Dropout Correlation */}
          <Card className="bg-white border-blue-100 shadow-sm">
            <CardHeader>
              <CardTitle className="text-slate-800">Engagement Impact Analysis</CardTitle>
              <CardDescription>Correlation between teacher engagement and dropout rates</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={engagementCorrelationData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis
                    dataKey="engagement"
                    stroke="#64748b"
                    label={{ value: 'Teacher Engagement (%)', position: 'insideBottom', offset: -10 }}
                  />
                  <YAxis
                    stroke="#64748b"
                    label={{ value: 'Dropout Rate (%)', angle: -90, position: 'insideLeft' }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="dropoutRate"
                    stroke="#ef4444"
                    strokeWidth={3}
                    dot={{ fill: '#ef4444', strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Workload Distribution */}
          <Card className="bg-white border-blue-100 shadow-sm">
            <CardHeader>
              <CardTitle className="text-slate-800">Workload Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={teachersData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis
                    dataKey="name"
                    stroke="#64748b"
                    angle={-45}
                    textAnchor="end"
                    height={100}
                    fontSize={10}
                  />
                  <YAxis stroke="#64748b" label={{ value: 'Hours/Week', angle: -90, position: 'insideLeft' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Bar
                    dataKey="workload"
                    fill="#64B5F6"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Engagement Levels */}
          <Card className="bg-white border-blue-100 shadow-sm">
            <CardHeader>
              <CardTitle className="text-slate-800">Teacher Engagement Levels</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={teachersData.sort((a, b) => a.engagement - b.engagement)}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis
                    dataKey="name"
                    stroke="#64748b"
                    angle={-45}
                    textAnchor="end"
                    height={100}
                    fontSize={10}
                  />
                  <YAxis stroke="#64748b" label={{ value: 'Engagement (%)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="engagement"
                    stroke="#2196F3"
                    fill="#BBDEFB"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Alerts for Overloaded Teachers */}
        {overloadedTeachers.length > 0 && (
          <Card className="bg-orange-50 border-orange-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-slate-800 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                Workload Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {overloadedTeachers.map((teacher) => (
                  <div key={teacher.id} className="flex items-center justify-between p-2 bg-white rounded border border-orange-100">
                    <span className="font-medium text-slate-800">{teacher.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-slate-600">{teacher.subject}</span>
                      <Badge variant="destructive">{teacher.workload}h/week</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    )
  }

  // Sample students data with risk categories and analytics
  const studentsData = [
    { id: 1, name: 'Aarav Sharma', age: 16, grade: '10th', attendance: 85, performance: 78, riskLevel: 'Medium', subjects: ['Math', 'Science'], lastActive: '2024-01-15', suggestions: ['Improve attendance', 'Math tutoring needed'] },
    { id: 2, name: 'Priya Patel', age: 17, grade: '11th', attendance: 95, performance: 92, riskLevel: 'Low', subjects: ['Physics', 'Chemistry'], lastActive: '2024-01-16', suggestions: ['Maintain excellent performance'] },
    { id: 3, name: 'Rohit Kumar', age: 15, grade: '9th', attendance: 65, performance: 45, riskLevel: 'High', subjects: ['English', 'History'], lastActive: '2024-01-10', suggestions: ['Urgent counseling needed', 'Family support required', 'Academic intervention'] },
    { id: 4, name: 'Ananya Singh', age: 16, grade: '10th', attendance: 88, performance: 82, riskLevel: 'Low', subjects: ['Biology', 'Chemistry'], lastActive: '2024-01-16', suggestions: ['Continue current progress'] },
    { id: 5, name: 'Vikram Joshi', age: 18, grade: '12th', attendance: 72, performance: 58, riskLevel: 'Medium', subjects: ['Commerce', 'Economics'], lastActive: '2024-01-14', suggestions: ['Career counseling', 'Study plan revision'] },
    { id: 6, name: 'Kavya Reddy', age: 17, grade: '11th', attendance: 45, performance: 35, riskLevel: 'High', subjects: ['Math', 'Physics'], lastActive: '2024-01-08', suggestions: ['Immediate intervention', 'Parent meeting', 'Remedial classes'] },
    { id: 7, name: 'Arjun Gupta', age: 16, grade: '10th', attendance: 90, performance: 88, riskLevel: 'Low', subjects: ['Computer Science', 'Math'], lastActive: '2024-01-16', suggestions: ['Advanced learning opportunities'] },
    { id: 8, name: 'Sneha Verma', age: 15, grade: '9th', attendance: 78, performance: 68, riskLevel: 'Medium', subjects: ['Science', 'English'], lastActive: '2024-01-15', suggestions: ['Study group participation', 'Regular monitoring'] }
  ]

  const riskDistributionData = [
    { name: 'Low Risk', value: studentsData.filter(s => s.riskLevel === 'Low').length, color: '#4CAF50' },
    { name: 'Medium Risk', value: studentsData.filter(s => s.riskLevel === 'Medium').length, color: '#FF9800' },
    { name: 'High Risk', value: studentsData.filter(s => s.riskLevel === 'High').length, color: '#F44336' }
  ]

  const performanceAttendanceData = studentsData.map(student => ({
    name: student.name.split(' ')[0],
    attendance: student.attendance,
    performance: student.performance,
    riskLevel: student.riskLevel
  }))

  const gradeDistributionData = [
    { grade: '9th', students: studentsData.filter(s => s.grade === '9th').length },
    { grade: '10th', students: studentsData.filter(s => s.grade === '10th').length },
    { grade: '11th', students: studentsData.filter(s => s.grade === '11th').length },
    { grade: '12th', students: studentsData.filter(s => s.grade === '12th').length }
  ]

  // AI Insights data
  const aiInsightsData = {
    riskFactors: [
      { factor: 'Low Attendance', impact: 85, trend: 'increasing' },
      { factor: 'Poor Academic Performance', impact: 78, trend: 'stable' },
      { factor: 'Socioeconomic Status', impact: 72, trend: 'decreasing' },
      { factor: 'Family Issues', impact: 65, trend: 'increasing' },
      { factor: 'Lack of Engagement', impact: 58, trend: 'stable' }
    ],
    predictions: [
      { month: 'Jan', predicted: 12.5, actual: 11.8 },
      { month: 'Feb', predicted: 13.2, actual: 12.9 },
      { month: 'Mar', predicted: 14.1, actual: 13.7 },
      { month: 'Apr', predicted: 15.3, actual: 14.8 },
      { month: 'May', predicted: 16.2, actual: null },
      { month: 'Jun', predicted: 17.1, actual: null }
    ],
    region: [
      { name: 'North', risk: 'High', value: 18.5 },
      { name: 'South', risk: 'Medium', value: 12.3 },
      { name: 'East', risk: 'Low', value: 8.7 },
      { name: 'West', risk: 'Medium', value: 14.2 },
      { name: 'Central', risk: 'High', value: 19.8 }
    ],
    interventionImpact: [
      { intervention: 'Counseling Programs', before: 22.5, after: 15.3, improvement: 32 },
      { intervention: 'Financial Aid', before: 18.7, after: 12.1, improvement: 35 },
      { intervention: 'Mentorship', before: 16.2, after: 11.8, improvement: 27 },
      { intervention: 'Academic Support', before: 20.1, after: 13.9, improvement: 31 }
    ]
  }

  // Counselling case management data
  const counsellingData = {
    activeCases: [
      {
        id: 'C001',
        studentName: 'Rahul Sharma',
        riskLevel: 'High',
        lastSession: '2024-01-15',
        nextFollowUp: '2024-01-22',
        progress: 65,
        notes: 'Student showing improvement in attendance. Family financial issues being addressed.',
        counselor: 'Dr. Priya Patel',
        sessionsCompleted: 8,
        totalSessions: 12
      },
      {
        id: 'C002',
        studentName: 'Anita Kumar',
        riskLevel: 'Medium',
        lastSession: '2024-01-18',
        nextFollowUp: '2024-01-25',
        progress: 80,
        notes: 'Academic performance improving. Peer relationship issues resolved.',
        counselor: 'Mr. Rajesh Singh',
        sessionsCompleted: 6,
        totalSessions: 8
      },
      {
        id: 'C003',
        studentName: 'Mohammed Ali',
        riskLevel: 'High',
        lastSession: '2024-01-20',
        nextFollowUp: '2024-01-27',
        progress: 45,
        notes: 'Struggling with course difficulty. Additional academic support recommended.',
        counselor: 'Ms. Sunita Verma',
        sessionsCompleted: 4,
        totalSessions: 10
      },
      {
        id: 'C004',
        studentName: 'Deepika Rao',
        riskLevel: 'Low',
        lastSession: '2024-01-19',
        nextFollowUp: '2024-02-02',
        progress: 90,
        notes: 'Excellent progress. Ready for case closure next month.',
        counselor: 'Dr. Amit Joshi',
        sessionsCompleted: 7,
        totalSessions: 8
      }
    ],
    caseStats: {
      totalActive: 156,
      highRisk: 45,
      mediumRisk: 67,
      lowRisk: 44,
      closedThisMonth: 23,
      successRate: 78
    },
    upcomingFollowUps: [
      { date: '2024-01-22', count: 8, priority: 'High' },
      { date: '2024-01-23', count: 12, priority: 'Medium' },
      { date: '2024-01-24', count: 6, priority: 'High' },
      { date: '2024-01-25', count: 15, priority: 'Low' }
    ],
    interventionTypes: [
      { type: 'Academic Support', count: 45, success: 82 },
      { type: 'Financial Counseling', count: 38, success: 75 },
      { type: 'Personal Counseling', count: 52, success: 88 },
      { type: 'Career Guidance', count: 21, success: 91 }
    ]
  }

  const renderCounselling = () => {
    return (
      <div className="space-y-6">
        {/* Case Management Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-600 text-sm font-medium">Active Cases</p>
                  <p className="text-2xl font-bold text-blue-800">{counsellingData.caseStats.totalActive}</p>
                </div>
                <HeartHandshake className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-600 text-sm font-medium">High Risk Cases</p>
                  <p className="text-2xl font-bold text-red-800">{counsellingData.caseStats.highRisk}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-600 text-sm font-medium">Success Rate</p>
                  <p className="text-2xl font-bold text-green-800">{counsellingData.caseStats.successRate}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-600 text-sm font-medium">Cases Closed</p>
                  <p className="text-2xl font-bold text-purple-800">{counsellingData.caseStats.closedThisMonth}</p>
                </div>
                <UserCheck className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Active Cases Table */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-800">Active Cases Management</CardTitle>
            <CardDescription>Track ongoing counselling sessions and student progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Case ID</TableHead>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Risk Level</TableHead>
                    <TableHead>Counselor</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Next Follow-up</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {counsellingData.activeCases.map((case_) => (
                    <TableRow key={case_.id}>
                      <TableCell className="font-medium">{case_.id}</TableCell>
                      <TableCell>{case_.studentName}</TableCell>
                      <TableCell>
                        <Badge
                          variant={case_.riskLevel === 'High' ? 'destructive' : case_.riskLevel === 'Medium' ? 'secondary' : 'default'}
                        >
                          {case_.riskLevel}
                        </Badge>
                      </TableCell>
                      <TableCell>{case_.counselor}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={case_.progress} className="w-16" />
                          <span className="text-sm text-slate-600">{case_.progress}%</span>
                        </div>
                      </TableCell>
                      <TableCell>{case_.nextFollowUp}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <FileText className="h-4 w-4" />
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

        {/* Follow-up Schedule & Intervention Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Follow-ups */}
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-800">Upcoming Follow-ups</CardTitle>
              <CardDescription>Schedule for next counselling sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {counsellingData.upcomingFollowUps.map((followUp, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-slate-600" />
                      <div>
                        <p className="font-medium text-slate-800">{followUp.date}</p>
                        <p className="text-sm text-slate-600">{followUp.count} sessions</p>
                      </div>
                    </div>
                    <Badge
                      variant={followUp.priority === 'High' ? 'destructive' : followUp.priority === 'Medium' ? 'secondary' : 'default'}
                    >
                      {followUp.priority}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Intervention Types Analysis */}
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-800">Intervention Analysis</CardTitle>
              <CardDescription>Success rates by intervention type</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={counsellingData.interventionTypes}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="type" stroke="#64748b" fontSize={12} angle={-45} textAnchor="end" height={80} />
                  <YAxis stroke="#64748b" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Bar dataKey="success" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Reports data and templates
  const reportsData = {
    templates: [
      {
        id: 'ministry-executive-summary',
        name: 'Ministry Executive Summary',
        description: 'Comprehensive state-level education performance report for ministry leadership',
        category: 'Ministry',
        lastGenerated: '2024-01-20',
        downloads: 1245,
        priority: 'high',
        estimatedTime: '5-7 minutes'
      },
      {
        id: 'district-performance-analysis',
        name: 'District Performance Analysis',
        description: 'Detailed comparative analysis of all 33 districts in Rajasthan',
        category: 'District',
        lastGenerated: '2024-01-19',
        downloads: 892,
        priority: 'high',
        estimatedTime: '8-10 minutes'
      },
      {
        id: 'budget-utilization-report',
        name: 'Budget Utilization Report',
        description: 'Financial analysis of education budget allocation and utilization',
        category: 'Financial',
        lastGenerated: '2024-01-18',
        downloads: 567,
        priority: 'high',
        estimatedTime: '6-8 minutes'
      },
      {
        id: 'policy-impact-assessment',
        name: 'Policy Impact Assessment',
        description: 'Evaluation of education policy effectiveness and outcomes',
        category: 'Policy',
        lastGenerated: '2024-01-17',
        downloads: 423,
        priority: 'medium',
        estimatedTime: '10-12 minutes'
      },
      {
        id: 'enrollment-trends-analysis',
        name: 'Enrollment Trends Analysis',
        description: 'State-wide enrollment patterns and demographic analysis',
        category: 'Analytics',
        lastGenerated: '2024-01-16',
        downloads: 356,
        priority: 'medium',
        estimatedTime: '7-9 minutes'
      },
      {
        id: 'teacher-performance-report',
        name: 'Teacher Performance & Training Report',
        description: 'Faculty analytics, training needs, and performance metrics',
        category: 'HR',
        lastGenerated: '2024-01-15',
        downloads: 298,
        priority: 'medium',
        estimatedTime: '9-11 minutes'
      },
      {
        id: 'infrastructure-assessment',
        name: 'Infrastructure Assessment Report',
        description: 'School infrastructure status and development needs across districts',
        category: 'Infrastructure',
        lastGenerated: '2024-01-14',
        downloads: 234,
        priority: 'low',
        estimatedTime: '12-15 minutes'
      },
      {
        id: 'compliance-audit-report',
        name: 'Compliance Audit Report',
        description: 'Regulatory compliance status and audit findings',
        category: 'Compliance',
        lastGenerated: '2024-01-13',
        downloads: 189,
        priority: 'high',
        estimatedTime: '8-10 minutes'
      }
    ],
    recentReports: [
      {
        name: 'Ministry Executive Summary - Q4 2024',
        type: 'PDF',
        size: '4.2 MB',
        generatedOn: '2024-01-20',
        status: 'Ready',
        category: 'Ministry',
        requestedBy: 'Secretary, Education'
      },
      {
        name: 'District Performance Analysis - January 2024',
        type: 'Excel',
        size: '6.8 MB',
        generatedOn: '2024-01-19',
        status: 'Ready',
        category: 'District',
        requestedBy: 'Director, School Education'
      },
      {
        name: 'Budget Utilization Report - FY 2023-24',
        type: 'PDF',
        size: '3.5 MB',
        generatedOn: '2024-01-18',
        status: 'Ready',
        category: 'Financial',
        requestedBy: 'Joint Secretary, Finance'
      },
      {
        name: 'Policy Impact Assessment - Mid-Day Meal Scheme',
        type: 'PDF',
        size: '2.9 MB',
        generatedOn: '2024-01-17',
        status: 'Processing',
        category: 'Policy',
        requestedBy: 'Additional Secretary, Policy'
      },
      {
        name: 'Enrollment Trends Analysis - 2023-24',
        type: 'Excel',
        size: '5.1 MB',
        generatedOn: '2024-01-16',
        status: 'Ready',
        category: 'Analytics',
        requestedBy: 'Director, Statistics'
      },
      {
        name: 'Teacher Performance Report - December 2023',
        type: 'PDF',
        size: '4.7 MB',
        generatedOn: '2024-01-15',
        status: 'Failed',
        category: 'HR',
        requestedBy: 'Director, Teacher Training'
      }
    ],
    filters: {
      timeframes: [
        'Last 7 days',
        'Last 30 days',
        'Last 3 months',
        'Last 6 months',
        'Current Financial Year',
        'Previous Financial Year',
        'Last 2 years',
        'Custom range'
      ],
      regions: [
        'All Districts',
        'Jaipur Division',
        'Jodhpur Division',
        'Bharatpur Division',
        'Ajmer Division',
        'Kota Division',
        'Bikaner Division',
        'Udaipur Division',
        'Custom Selection'
      ],
      categories: [
        'All Categories',
        'Ministry',
        'District',
        'Financial',
        'Policy',
        'Analytics',
        'HR',
        'Infrastructure',
        'Compliance'
      ],
      formats: ['PDF', 'Excel', 'CSV', 'PowerPoint'],
      priorities: ['All Priorities', 'High', 'Medium', 'Low'],
      departments: [
        'All Departments',
        'School Education',
        'Higher Education',
        'Technical Education',
        'Sanskrit Education',
        'Finance & Planning'
      ]
    },
    scheduledReports: [
      {
        id: 'weekly-summary',
        name: 'Weekly Performance Summary',
        frequency: 'Weekly',
        nextRun: '2024-01-22',
        recipients: ['secretary@education.rajasthan.gov.in', 'director@education.rajasthan.gov.in'],
        format: 'PDF',
        status: 'Active'
      },
      {
        id: 'monthly-budget',
        name: 'Monthly Budget Utilization',
        frequency: 'Monthly',
        nextRun: '2024-02-01',
        recipients: ['finance@education.rajasthan.gov.in'],
        format: 'Excel',
        status: 'Active'
      },
      {
        id: 'quarterly-policy',
        name: 'Quarterly Policy Impact Review',
        frequency: 'Quarterly',
        nextRun: '2024-04-01',
        recipients: ['policy@education.rajasthan.gov.in'],
        format: 'PDF',
        status: 'Paused'
      }
    ]
  }

  const renderReports = () => {
    const [selectedTimeframe, setSelectedTimeframe] = useState('Last 30 days')
    const [selectedRegion, setSelectedRegion] = useState('All Districts')
    const [selectedCategory, setSelectedCategory] = useState('All Categories')
    const [selectedFormat, setSelectedFormat] = useState('PDF')
    const [selectedPriority, setSelectedPriority] = useState('All Priorities')
    const [selectedDepartment, setSelectedDepartment] = useState('All Departments')
    const [activeTab, setActiveTab] = useState('templates')

    const handleGenerateReport = (templateId: string) => {
      toast({
        title: "Report Generation Started",
        description: "Your report is being generated and will be available shortly.",
      })
    }

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
            <Button onClick={() => handleGenerateReport('custom')} className="bg-blue-600 hover:bg-blue-700">
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
              <Settings className="h-5 w-5 text-blue-500" />
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
                <Button className="bg-blue-600 hover:bg-blue-700">
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
    )
  }

  // Settings data and configuration
  const settingsData = {
    profile: {
      name: 'Dr. Rajesh Kumar',
      email: 'rajesh.kumar@education.gov.in',
      role: 'Admin',
      department: 'Ministry of Education',
      phone: '+91 98765 43210',
      avatar: '/api/placeholder/100/100'
    },
    roles: [
      { id: 'admin', name: 'Administrator', description: 'Full system access and user management' },
      { id: 'teacher', name: 'Teacher', description: 'Access to student data and basic analytics' },
      { id: 'counsellor', name: 'Counsellor', description: 'Access to counselling and intervention tools' }
    ],
    preferences: {
      theme: 'light',
      language: 'en',
      notifications: {
        email: true,
        push: true,
        sms: false,
        reports: true
      },
      dashboard: {
        autoRefresh: true,
        refreshInterval: 30,
        defaultView: 'overview'
      }
    },
    security: {
      twoFactorEnabled: false,
      lastPasswordChange: '2024-01-15',
      loginHistory: [
        { date: '2024-01-20', time: '09:15 AM', location: 'New Delhi, India', device: 'Chrome on Windows' },
        { date: '2024-01-19', time: '02:30 PM', location: 'New Delhi, India', device: 'Chrome on Windows' },
        { date: '2024-01-18', time: '10:45 AM', location: 'New Delhi, India', device: 'Safari on iPhone' }
      ]
    }
  }

  const renderSettings = () => {
    const [activeTab, setActiveTab] = useState('profile')
    const [profile, setProfile] = useState(settingsData.profile)
    const [preferences, setPreferences] = useState(settingsData.preferences)
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(settingsData.security.twoFactorEnabled)

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
              <Settings className="h-5 w-5 text-blue-500" />
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
                      <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                        <UserCheck className="h-6 w-6 text-blue-600" />
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
                            <Badge variant="outline" className="text-green-600">Connected</Badge>
                            <Switch defaultChecked />
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <Label>State Financial System</Label>
                            <p className="text-sm text-muted-foreground">Integration with budget management system</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className="text-green-600">Connected</Badge>
                            <Switch defaultChecked />
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <Label>UDISE+ Portal</Label>
                            <p className="text-sm text-muted-foreground">Unified District Information System for Education</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className="text-yellow-600">Pending</Badge>
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
    )
  }

  const renderAIInsights = () => {
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
                          factor.trend === 'decreasing' ? 'bg-green-500' : 'bg-yellow-500'
                          }`} />
                        <span className="text-sm font-medium text-slate-700">{factor.factor}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-slate-800">{factor.impact}%</div>
                        <div className={`text-xs ${factor.trend === 'increasing' ? 'text-red-600' :
                          factor.trend === 'decreasing' ? 'text-green-600' : 'text-yellow-600'
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
                        region.risk === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'
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
    )
  }

  const renderStudents = () => {
    const totalStudents = studentsData.length
    const highRiskCount = studentsData.filter(s => s.riskLevel === 'High').length
    const mediumRiskCount = studentsData.filter(s => s.riskLevel === 'Medium').length
    const lowRiskCount = studentsData.filter(s => s.riskLevel === 'Low').length
    const avgAttendance = studentsData.reduce((sum, s) => sum + s.attendance, 0) / totalStudents
    const avgPerformance = studentsData.reduce((sum, s) => sum + s.performance, 0) / totalStudents

    return (
      <div className="space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-white border-blue-100 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-700">Total Students</CardTitle>
              <Users className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{totalStudents}</div>
              <p className="text-xs text-slate-500">Active students monitored</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-red-100 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-700">High Risk Students</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{highRiskCount}</div>
              <p className="text-xs text-red-500">Require immediate attention</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-green-100 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-700">Average Attendance</CardTitle>
              <Calendar className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{avgAttendance.toFixed(1)}%</div>
              <p className="text-xs text-green-500">Overall attendance rate</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-purple-100 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-700">Average Performance</CardTitle>
              <TrendingUp className="h-4 w-4 text-[#0A3A67]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{avgPerformance.toFixed(1)}%</div>
              <p className="text-xs text-[#0A3A67]">Academic performance</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Risk Distribution Chart */}
          <Card className="bg-white border-blue-100 shadow-sm">
            <CardHeader>
              <CardTitle className="text-slate-800">Student Risk Distribution</CardTitle>
              <CardDescription>Classification by dropout risk level</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={riskDistributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {riskDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
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

          {/* Performance vs Attendance Scatter */}
          <Card className="bg-white border-blue-100 shadow-sm">
            <CardHeader>
              <CardTitle className="text-slate-800">Performance vs Attendance</CardTitle>
              <CardDescription>Correlation between attendance and academic performance</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={performanceAttendanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 12 }}
                    stroke="#64748b"
                  />
                  <YAxis
                    tick={{ fontSize: 12 }}
                    stroke="#64748b"
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Area type="monotone" dataKey="attendance" stackId="1" stroke="#3B82F6" fill="#DBEAFE" />
                  <Area type="monotone" dataKey="performance" stackId="1" stroke="#10B981" fill="#D1FAE5" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Students Table with Risk Analysis */}
        <Card className="bg-white border-blue-100 shadow-sm">
          <CardHeader>
            <CardTitle className="text-slate-800">Individual Student Analytics</CardTitle>
            <CardDescription>Detailed view of student performance and risk factors</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead>Attendance</TableHead>
                  <TableHead>Performance</TableHead>
                  <TableHead>Risk Level</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead>Suggestions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {studentsData.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell>{student.grade}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span>{student.attendance}%</span>
                        <div className={`w-2 h-2 rounded-full ${student.attendance >= 85 ? 'bg-green-500' :
                          student.attendance >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                          }`} />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span>{student.performance}%</span>
                        <div className={`w-2 h-2 rounded-full ${student.performance >= 80 ? 'bg-green-500' :
                          student.performance >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                          }`} />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={student.riskLevel === 'High' ? 'destructive' :
                          student.riskLevel === 'Medium' ? 'default' : 'secondary'}
                        className={student.riskLevel === 'Low' ? 'bg-green-100 text-green-800' : ''}
                      >
                        {student.riskLevel}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-slate-600">{student.lastActive}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {student.suggestions.slice(0, 2).map((suggestion, idx) => (
                          <div key={idx} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                            {suggestion}
                          </div>
                        ))}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Grade Distribution */}
        <Card className="bg-white border-blue-100 shadow-sm">
          <CardHeader>
            <CardTitle className="text-slate-800">Student Distribution by Grade</CardTitle>
            <CardDescription>Number of students across different grade levels</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={gradeDistributionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="grade"
                  tick={{ fontSize: 12 }}
                  stroke="#64748b"
                />
                <YAxis
                  tick={{ fontSize: 12 }}
                  stroke="#64748b"
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Bar dataKey="students" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    )
  }

  const renderComingSoon = (sectionName: string) => (
    <div className="flex items-center justify-center h-full min-h-[400px]">
      <Card className="w-full max-w-md border-2 border-blue-200 shadow-lg">
        <CardHeader className="bg-blue-50">
          <CardTitle className="text-slate-800">Coming Soon</CardTitle>
          <CardDescription className="text-slate-600">
            The {sectionName} section is under development.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-slate-700">
            This section will provide comprehensive tools and insights for the DISHA platform.
          </p>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="flex h-screen flex h-screen bg-gray-50">
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
                  <p className="text-xs text-amber-100 font-medium">Ministry Dashboard</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)} className="text-white hover:bg-white/20">
                <X className="h-5 w-5" />
              </Button>
            </div>
            <nav className="p-6 space-y-1">
              {navigationItems.map((item) => {
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
                <p className="text-xs text-gray-600">Ministry Dashboard</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-md transition-all duration-200 ${activeSection === item.id
                    ? "bg-white text-[#0A3A67] border-l-4 border-[#138808]" // Green accent for active
                    : "text-gray-200 hover:bg-[#0C477A] hover:text-white"
                    }`}
                >
                  <Icon
                    className={`mr-3 h-5 w-5 ${activeSection === item.id ? "text-[#138808]" : "text-gray-300"
                      }`}
                  />
                  <span>{item.label}</span>
                </button>
              )
            })}
          </nav>
        </div>
      </div>


      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-72">
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
                    {navigationItems.find((item) => item.id === activeSection)?.label || t.overview}
                  </h1>
                  <p className="text-sm text-gray-600">Education Ministry of Rajasthan</p>
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600 hidden md:block" suppressHydrationWarning >
                {t.lastUpdated}: {lastUpdated.toLocaleTimeString()}
              </div>

              {/* Language Switcher */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                  >
                    <Globe className="h-4 w-4 mr-2 text-gray-500" />
                    {languageOptions.find((lang) => lang.code === language)?.name || "English"}
                    <ChevronDown className="h-4 w-4 ml-2 text-gray-500" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  {languageOptions.map((lang) => (
                    <DropdownMenuItem
                      key={lang.code}
                      onClick={() => setLanguage(lang.code as Language)}
                      className={language === lang.code ? "bg-green-50 text-green-700" : ""}
                    >
                      {lang.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

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
                      <AvatarImage src="/placeholder-user.jpg" alt="Ministry Admin" />
                      <AvatarFallback className="bg-gray-200 text-gray-700 font-semibold">
                        MA
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
          {activeSection === "regions" && renderRegionsDistricts()}
          {activeSection === "universities" && renderUniversities()}
          {activeSection === "teachers" && renderTeachers()}
          {activeSection === "students" && renderStudents()}
          {activeSection === "ai-insights" && renderAIInsights()}
          {activeSection === "counselling" && renderCounselling()}
          {activeSection === "reports" && renderReports()}
          {activeSection === "settings" && renderSettings()}
        </main>
      </div>
    </div>
  )
}
