// API service for university data from port 8000

const API_BASE_URL = 'http://localhost:8000/api';

export interface Student {
  studentId: string;
  gpa_current: number;
  gpa_trend: number;
  backlogs_count: number;
  failed_subjects_count: number;
  assignment_submission_rate: number;
  attendance_overall_percent: number;
  attendance_trend: number;
  absences: number;
  late_arrivals: number;
  class_participation_score: number;
  extracurricular_count: number;
  lms_logins_per_week: number;
  lms_video_completion_rate: number;
  engagement_ratio: number;
  family_income: number;
  income_per_dependent: number;
  scholarship_status: number;
  first_gen_learner: number;
  hostel_resident: number;
  commute_time_minutes: number;
  chronic_illness: number;
  disability: number;
  stress_level_num: number;
  teacher_feedback_avg_rating: number;
  disciplinary_complaints: number;
  disciplinary_appreciations: number;
  career_interest_clarity: number;
  counselling_sessions_attended: number;
  pending_counselling_sessions: number;
  days_since_last_counselling: number;
  age: number;
  gender: string;
  category: string;
  location: string;
  label_dropout_next_sem: number;
  riskLevel: 'high' | 'medium' | 'low';
}

export interface University {
  id: string;
  name: string;
  path: string;
}

export interface UniversityStudentsResponse {
  universityId: string;
  students: Student[];
  total: number;
  filtered: number;
  metadata: {
    hasMore: boolean;
    filters: {
      riskLevel: string | null;
      limit: number;
      offset: number | null;
    };
  };
}

export interface UniversitiesResponse {
  universities: University[];
  total: number;
}

// API service class
export class UniversityApiService {
  private static instance: UniversityApiService;
  
  public static getInstance(): UniversityApiService {
    if (!UniversityApiService.instance) {
      UniversityApiService.instance = new UniversityApiService();
    }
    return UniversityApiService.instance;
  }

  private async fetchWithErrorHandling<T>(url: string): Promise<T> {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API fetch error:', error);
      throw error;
    }
  }

  // Get all universities
  async getUniversities(): Promise<UniversitiesResponse> {
    return this.fetchWithErrorHandling<UniversitiesResponse>(
      `${API_BASE_URL}/universities`
    );
  }

  // Get students for a specific university
  async getUniversityStudents(
    universityId: string,
    options: {
      riskLevel?: 'high' | 'medium' | 'low';
      limit?: number;
      offset?: number;
    } = {}
  ): Promise<UniversityStudentsResponse> {
    const params = new URLSearchParams();
    if (options.riskLevel) params.append('riskLevel', options.riskLevel);
    if (options.limit) params.append('limit', options.limit.toString());
    if (options.offset) params.append('offset', options.offset.toString());

    const queryString = params.toString();
    const url = `${API_BASE_URL}/universities/${universityId}/students${queryString ? `?${queryString}` : ''}`;
    
    return this.fetchWithErrorHandling<UniversityStudentsResponse>(url);
  }

  // Get all students from a university (paginated)
  async getAllUniversityStudents(universityId: string): Promise<Student[]> {
    const allStudents: Student[] = [];
    let offset = 0;
    const limit = 100; // Fetch in batches
    let hasMore = true;

    while (hasMore) {
      const response = await this.getUniversityStudents(universityId, {
        limit,
        offset
      });
      
      allStudents.push(...response.students);
      hasMore = response.metadata.hasMore;
      offset += limit;
    }

    return allStudents;
  }

  // Calculate university statistics from student data
  calculateUniversityStats(students: Student[]) {
    const totalStudents = students.length;
    const highRiskStudents = students.filter(s => s.riskLevel === 'high').length;
    const mediumRiskStudents = students.filter(s => s.riskLevel === 'medium').length;
    const lowRiskStudents = students.filter(s => s.riskLevel === 'low').length;
    
    const averageGPA = students.reduce((sum, s) => sum + s.gpa_current, 0) / totalStudents;
    const averageAttendance = students.reduce((sum, s) => sum + s.attendance_overall_percent, 0) / totalStudents;
    const dropoutPredicted = students.filter(s => s.label_dropout_next_sem === 1).length;
    const dropoutRate = (dropoutPredicted / totalStudents) * 100;
    
    // Department-wise breakdown (simplified - using category as proxy)
    const departmentStats = students.reduce((acc, student) => {
      const dept = student.category || 'General';
      if (!acc[dept]) {
        acc[dept] = { count: 0, totalGPA: 0, dropouts: 0 };
      }
      acc[dept].count++;
      acc[dept].totalGPA += student.gpa_current;
      if (student.label_dropout_next_sem === 1) acc[dept].dropouts++;
      return acc;
    }, {} as Record<string, { count: number; totalGPA: number; dropouts: number }>);

    const departmentData = Object.entries(departmentStats).map(([dept, stats]) => ({
      department: dept,
      enrollment: stats.count,
      averageGPA: stats.totalGPA / stats.count,
      dropoutRate: (stats.dropouts / stats.count) * 100
    }));

    return {
      totalStudents,
      highRiskStudents,
      mediumRiskStudents,
      lowRiskStudents,
      averageGPA: Math.round(averageGPA * 100) / 100,
      averageAttendance: Math.round(averageAttendance * 100) / 100,
      dropoutRate: Math.round(dropoutRate * 100) / 100,
      departmentData
    };
  }

  // Get risk level distribution for charts
  getRiskLevelDistribution(students: Student[]) {
    const distribution = students.reduce((acc, student) => {
      acc[student.riskLevel] = (acc[student.riskLevel] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return [
      { name: 'High Risk', value: distribution.high || 0, color: '#ef4444' },
      { name: 'Medium Risk', value: distribution.medium || 0, color: '#f97316' },
      { name: 'Low Risk', value: distribution.low || 0, color: '#22c55e' }
    ];
  }

  // Get engagement vs dropout correlation data
  getEngagementDropoutData(students: Student[]) {
    return students.map(student => ({
      engagement: student.engagement_ratio * 10, // Scale for better visualization
      dropoutProbability: student.label_dropout_next_sem * 100,
      studentId: student.studentId,
      riskLevel: student.riskLevel
    }));
  }

  // Get attendance trend data (simplified)
  getAttendanceTrendData(students: Student[]) {
    // Group by attendance ranges for trend visualization
    const ranges = [
      { range: '0-20%', count: 0 },
      { range: '21-40%', count: 0 },
      { range: '41-60%', count: 0 },
      { range: '61-80%', count: 0 },
      { range: '81-100%', count: 0 }
    ];

    students.forEach(student => {
      const attendance = student.attendance_overall_percent;
      if (attendance <= 20) ranges[0].count++;
      else if (attendance <= 40) ranges[1].count++;
      else if (attendance <= 60) ranges[2].count++;
      else if (attendance <= 80) ranges[3].count++;
      else ranges[4].count++;
    });

    return ranges;
  }
}

// Export singleton instance
export const universityApi = UniversityApiService.getInstance();