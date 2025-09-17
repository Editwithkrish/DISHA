// lib/data.ts

//Language Translation..
export const translations = {
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
};

// Sample data for charts
export const yearlyTrendData = [
    { year: "2019", rate: 12.5 },
    { year: "2020", rate: 14.2 },
    { year: "2021", rate: 13.8 },
    { year: "2022", rate: 11.9 },
    { year: "2023", rate: 10.4 },
    { year: "2024", rate: 9.2 },
];

// Sample data for regions and districts
export const regionsData = [
    { id: 1, name: 'Jaipur', lat: 26.9124, lng: 75.7873, dropoutRate: 8.5, students: 125000, riskLevel: 'low' },
    { id: 2, name: 'Jodhpur', lat: 26.2389, lng: 73.0243, dropoutRate: 12.3, students: 89000, riskLevel: 'medium' },
    { id: 3, name: 'Udaipur', lat: 24.5854, lng: 73.7125, dropoutRate: 15.7, students: 67000, riskLevel: 'high' },
    { id: 4, name: 'Kota', lat: 25.2138, lng: 75.8648, dropoutRate: 6.2, students: 95000, riskLevel: 'low' },
    { id: 5, name: 'Ajmer', lat: 26.4499, lng: 74.6399, dropoutRate: 18.9, students: 78000, riskLevel: 'high' },
    { id: 6, name: 'Bikaner', lat: 28.0229, lng: 73.3119, dropoutRate: 14.1, students: 52000, riskLevel: 'medium' },
    { id: 7, name: 'Alwar', lat: 27.5530, lng: 76.6346, dropoutRate: 11.8, students: 71000, riskLevel: 'medium' },
    { id: 8, name: 'Bharatpur', lat: 27.2152, lng: 77.4977, dropoutRate: 9.4, students: 48000, riskLevel: 'low' }
];

export const universitiesData = [
    { id: 1, name: 'University of Rajasthan', location: 'Jaipur', students: 45000, dropoutRate: 7.2, stream: 'Arts & Science', year: 2024 },
    { id: 2, name: 'Rajasthan Technical University', location: 'Kota', students: 38000, dropoutRate: 5.8, stream: 'Engineering', year: 2024 },
    { id: 3, name: 'Maharana Pratap University', location: 'Udaipur', students: 32000, dropoutRate: 9.1, stream: 'Agriculture', year: 2024 },
    { id: 4, name: 'Jai Narain Vyas University', location: 'Jodhpur', students: 28000, dropoutRate: 8.5, stream: 'Commerce', year: 2024 },
    { id: 5, name: 'Mohanlal Sukhadia University', location: 'Udaipur', students: 25000, dropoutRate: 6.9, stream: 'Science', year: 2024 }
];

export const teachersData = [
    { id: 1, name: 'Dr. Priya Sharma', subject: 'Mathematics', engagement: 92, workload: 18, students: 120, dropoutRate: 4.2, experience: 8 },
    { id: 2, name: 'Prof. Rajesh Kumar', subject: 'Physics', engagement: 87, workload: 22, students: 95, dropoutRate: 6.8, experience: 12 },
    { id: 3, name: 'Dr. Anita Singh', subject: 'Chemistry', engagement: 95, workload: 16, students: 110, dropoutRate: 3.1, experience: 6 },
    { id: 4, name: 'Mr. Vikram Joshi', subject: 'Biology', engagement: 78, workload: 25, students: 85, dropoutRate: 9.5, experience: 15 },
    { id: 5, name: 'Dr. Meera Gupta', subject: 'English', engagement: 89, workload: 20, students: 130, dropoutRate: 5.7, experience: 10 },
    { id: 6, name: 'Prof. Suresh Patel', subject: 'History', engagement: 82, workload: 19, students: 75, dropoutRate: 7.3, experience: 18 },
    { id: 7, name: 'Dr. Kavita Rao', subject: 'Economics', engagement: 91, workload: 17, students: 105, dropoutRate: 4.8, experience: 7 },
    { id: 8, name: 'Mr. Amit Verma', subject: 'Computer Science', engagement: 94, workload: 21, students: 140, dropoutRate: 2.9, experience: 5 }
];

export const engagementCorrelationData = [
    { engagement: 75, dropoutRate: 12.5 },
    { engagement: 80, dropoutRate: 9.8 },
    { engagement: 85, dropoutRate: 7.2 },
    { engagement: 90, dropoutRate: 4.5 },
    { engagement: 95, dropoutRate: 2.1 }
];

export const levelData = [
    { level: "Primary", dropouts: 2340 },
    { level: "Secondary", dropouts: 4560 },
    { level: "Higher Secondary", dropouts: 3210 },
    { level: "Undergraduate", dropouts: 5670 },
    { level: "Postgraduate", dropouts: 1890 },
];

export const reasonsData = [
    { name: "Financial Issues", value: 35, color: "#2196F3" },
    { name: "Family Problems", value: 25, color: "#64B5F6" },
    { name: "Academic Difficulty", value: 20, color: "#BBDEFB" },
    { name: "Health Issues", value: 12, color: "#E3F2FD" },
    { name: "Others", value: 8, color: "#F5F9FF" },
];

// Ministry-level KPI data
export const ministryKPIs = [
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
];

export const budgetUtilizationData = [
    { month: "Apr", allocated: 280, utilized: 245, efficiency: 87.5 },
    { month: "May", allocated: 290, utilized: 258, efficiency: 89.0 },
    { month: "Jun", allocated: 275, utilized: 241, efficiency: 87.6 },
    { month: "Jul", allocated: 310, utilized: 278, efficiency: 89.7 },
    { month: "Aug", allocated: 295, utilized: 267, efficiency: 90.5 },
    { month: "Sep", allocated: 285, utilized: 259, efficiency: 90.9 },
];

export const districtPerformanceData = [
    { district: "Jaipur", enrollment: 95.2, retention: 92.8, completion: 89.4, score: 92.5 },
    { district: "Jodhpur", enrollment: 89.7, retention: 87.3, completion: 84.1, score: 87.0 },
    { district: "Udaipur", enrollment: 91.3, retention: 88.9, completion: 86.7, score: 89.0 },
    { district: "Kota", enrollment: 96.8, retention: 94.2, completion: 91.5, score: 94.2 },
    { district: "Ajmer", enrollment: 87.4, retention: 84.6, completion: 81.2, score: 84.4 },
    { district: "Bikaner", enrollment: 88.9, retention: 86.1, completion: 83.7, score: 86.2 },
];

export const policyImpactData = [
    { policy: "Mid-Day Meal", impact: 94.2, beneficiaries: "2.1M", status: "active" },
    { policy: "Digital Classroom", impact: 78.5, beneficiaries: "1.8M", status: "expanding" },
    { policy: "Teacher Training", impact: 89.7, beneficiaries: "45K", status: "active" },
    { policy: "Infrastructure Dev", impact: 72.3, beneficiaries: "2.4M", status: "ongoing" },
    { policy: "Scholarship Program", impact: 91.8, beneficiaries: "156K", status: "active" },
];

// Advanced visualization datasets
export const ministryRadarData = [
    { subject: 'Budget Efficiency', A: 87.3, B: 82.1, fullMark: 100, },
    { subject: 'Policy Implementation', A: 82.1, B: 78.5, fullMark: 100, },
    { subject: 'Digital Infrastructure', A: 76.4, B: 71.2, fullMark: 100, },
    { subject: 'Teacher Training', A: 91.2, B: 88.7, fullMark: 100, },
    { subject: 'Student Retention', A: 89.7, B: 85.3, fullMark: 100, },
    { subject: 'Infrastructure Quality', A: 84.6, B: 79.8, fullMark: 100, },
];

export const districtScatterData = [
    { x: 95.2, y: 92.8, z: 485392, district: 'Jaipur' },
    { x: 89.7, y: 87.3, z: 342156, district: 'Jodhpur' },
    { x: 91.3, y: 88.9, z: 298745, district: 'Udaipur' },
    { x: 96.8, y: 94.2, z: 267834, district: 'Kota' },
    { x: 87.4, y: 84.6, z: 234567, district: 'Ajmer' },
    { x: 88.9, y: 86.1, z: 198432, district: 'Bikaner' },
    { x: 92.1, y: 89.4, z: 176543, district: 'Alwar' },
    { x: 85.6, y: 82.7, z: 154321, district: 'Bharatpur' },
];

export const performanceComboData = [
    { month: 'Apr', enrollment: 94.2, retention: 91.8, completion: 88.5, budget: 280, },
    { month: 'May', enrollment: 94.8, retention: 92.3, completion: 89.1, budget: 290, },
    { month: 'Jun', enrollment: 95.1, retention: 92.7, completion: 89.6, budget: 275, },
    { month: 'Jul', enrollment: 95.4, retention: 93.1, completion: 90.2, budget: 310, },
    { month: 'Aug', enrollment: 95.7, retention: 93.5, completion: 90.8, budget: 295, },
    { month: 'Sep', enrollment: 96.0, retention: 93.9, completion: 91.4, budget: 285, },
];

export const institutionTypeData = [
    { type: 'Government Schools', count: 45672, performance: 87.3, funding: 2847 },
    { type: 'Private Schools', count: 12834, performance: 92.1, funding: 0 },
    { type: 'Government Colleges', count: 287, performance: 84.6, funding: 1256 },
    { type: 'Private Colleges', count: 156, performance: 89.4, funding: 0 },
    { type: 'Universities', count: 23, performance: 91.7, funding: 892 },
    { type: 'Technical Institutes', count: 89, performance: 88.9, funding: 456 },
];

// State-level district analytics data
export const rajasthanDistricts = [
    { name: "Jaipur", enrollment: 95.2, retention: 92.8, completion: 89.4, infrastructure: 87.6, schools: 2847, students: 485392, teachers: 18472, budget: 284.7, region: "Central", population: 6626178, literacyRate: 84.1 },
    { name: "Jodhpur", enrollment: 89.7, retention: 87.3, completion: 84.1, infrastructure: 82.4, schools: 1923, students: 342156, teachers: 12847, budget: 198.4, region: "Western", population: 3687165, literacyRate: 80.6 },
    { name: "Udaipur", enrollment: 91.3, retention: 88.9, completion: 86.7, infrastructure: 85.2, schools: 2156, students: 398472, teachers: 14923, budget: 234.8, region: "Southern", population: 3068420, literacyRate: 82.9 },
    { name: "Kota", enrollment: 96.8, retention: 94.2, completion: 91.5, infrastructure: 91.8, schools: 1456, students: 287394, teachers: 11234, budget: 167.3, region: "Eastern", population: 1951014, literacyRate: 88.5 },
    { name: "Ajmer", enrollment: 87.4, retention: 84.6, completion: 81.2, infrastructure: 79.8, schools: 1789, students: 324567, teachers: 12456, budget: 189.2, region: "Central", population: 2583052, literacyRate: 81.7 },
    { name: "Bikaner", enrollment: 88.9, retention: 86.1, completion: 83.7, infrastructure: 81.3, schools: 1634, students: 298734, teachers: 11789, budget: 174.6, region: "Northern", population: 2363937, literacyRate: 79.4 },
    { name: "Alwar", enrollment: 90.6, retention: 88.2, completion: 85.9, infrastructure: 84.1, schools: 2234, students: 412893, teachers: 15672, budget: 241.7, region: "Eastern", population: 3674179, literacyRate: 83.2 },
    { name: "Bharatpur", enrollment: 92.1, retention: 89.7, completion: 87.3, infrastructure: 86.5, schools: 1876, students: 356789, teachers: 13456, budget: 208.4, region: "Eastern", population: 2548462, literacyRate: 85.8 }
];

export const regionSummary = [
    { region: "Central", districts: 8, avgEnrollment: 91.4, avgRetention: 88.6, totalStudents: 1247832, budget: 722.3 },
    { region: "Western", districts: 6, avgEnrollment: 87.8, avgRetention: 85.2, totalStudents: 892456, budget: 567.8 },
    { region: "Eastern", districts: 7, avgEnrollment: 93.2, avgRetention: 90.7, totalStudents: 1156734, budget: 617.4 },
    { region: "Southern", districts: 4, avgEnrollment: 89.6, avgRetention: 87.1, totalStudents: 734892, budget: 456.2 },
    { region: "Northern", districts: 3, avgEnrollment: 86.7, avgRetention: 84.3, totalStudents: 567234, budget: 389.7 }
];

// Comprehensive institution data for hierarchical filtering
export const institutionData = [
    // ... all institution data objects
    // ... all the way to the last institution
    { id: 'bp001', name: 'Government Girls School, Bharatpur', type: 'Government School', district: 'Bharatpur', region: 'Eastern', students: 1234, teachers: 41, enrollment: 92.1, retention: 89.7, infrastructure: 87.3, budget: 12.3 }
   , 
   
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
];

export const institutionTypes = ['Government School', 'Private School', 'Government College', 'Private College', 'University', 'Technical Institute'];

// Sample students data with risk categories and analytics
export const studentsData = [
    { id: 1, name: 'Aarav Sharma', age: 16, grade: '10th', attendance: 85, performance: 78, riskLevel: 'Medium', subjects: ['Math', 'Science'], lastActive: '2024-01-15', suggestions: ['Improve attendance', 'Math tutoring needed'] },
    { id: 2, name: 'Priya Patel', age: 17, grade: '11th', attendance: 95, performance: 92, riskLevel: 'Low', subjects: ['Physics', 'Chemistry'], lastActive: '2024-01-16', suggestions: ['Maintain excellent performance'] },
    { id: 3, name: 'Rohit Kumar', age: 15, grade: '9th', attendance: 65, performance: 45, riskLevel: 'High', subjects: ['English', 'History'], lastActive: '2024-01-10', suggestions: ['Urgent counseling needed', 'Family support required', 'Academic intervention'] },
    { id: 4, name: 'Ananya Singh', age: 16, grade: '10th', attendance: 88, performance: 82, riskLevel: 'Low', subjects: ['Biology', 'Chemistry'], lastActive: '2024-01-16', suggestions: ['Continue current progress'] },
    { id: 5, name: 'Vikram Joshi', age: 18, grade: '12th', attendance: 72, performance: 58, riskLevel: 'Medium', subjects: ['Commerce', 'Economics'], lastActive: '2024-01-14', suggestions: ['Career counseling', 'Study plan revision'] },
    { id: 6, name: 'Kavya Reddy', age: 17, grade: '11th', attendance: 45, performance: 35, riskLevel: 'High', subjects: ['Math', 'Physics'], lastActive: '2024-01-08', suggestions: ['Immediate intervention', 'Parent meeting', 'Remedial classes'] },
    { id: 7, name: 'Arjun Gupta', age: 16, grade: '10th', attendance: 90, performance: 88, riskLevel: 'Low', subjects: ['Computer Science', 'Math'], lastActive: '2024-01-16', suggestions: ['Advanced learning opportunities'] },
    { id: 8, name: 'Sneha Verma', age: 15, grade: '9th', attendance: 78, performance: 68, riskLevel: 'Medium', subjects: ['Science', 'English'], lastActive: '2024-01-15', suggestions: ['Study group participation', 'Regular monitoring'] }
];

export const riskDistributionData = [
    { name: 'Low Risk', value: studentsData.filter(s => s.riskLevel === 'Low').length, color: '#4CAF50' },
    { name: 'Medium Risk', value: studentsData.filter(s => s.riskLevel === 'Medium').length, color: '#FF9800' },
    { name: 'High Risk', value: studentsData.filter(s => s.riskLevel === 'High').length, color: '#F44336' }
];

export const performanceAttendanceData = studentsData.map(student => ({
    name: student.name.split(' ')[0],
    attendance: student.attendance,
    performance: student.performance,
    riskLevel: student.riskLevel
}));

export const gradeDistributionData = [
    { grade: '9th', students: studentsData.filter(s => s.grade === '9th').length },
    { grade: '10th', students: studentsData.filter(s => s.grade === '10th').length },
    { grade: '11th', students: studentsData.filter(s => s.grade === '11th').length },
    { grade: '12th', students: studentsData.filter(s => s.grade === '12th').length }
];

// AI Insights data
export const aiInsightsData = {
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
  };

// Counselling case management data
export const counsellingData = {
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
  };

// Reports data and templates
export const reportsData = {
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

// Settings data and configuration
export const settingsData = {
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
