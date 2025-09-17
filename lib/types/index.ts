// types/index.ts

/**
 * Defines the available languages for translation.
 */
export type Language = "en" | "hi" | "mr";

/**
 * Represents a geographical region/district with educational stats.
 * Corresponds to the `regionsData` array.
 */
export interface Region {
  id: number;
  name: string;
  lat: number;
  lng: number;
  dropoutRate: number;
  students: number;
  riskLevel: 'low' | 'medium' | 'high';
}

/**
 * Represents a university with its specific data points.
 * Corresponds to the `universitiesData` array.
 */
export interface University {
  id: number;
  name: string;
  location: string;
  students: number;
  dropoutRate: number;
  stream: string;
  year: number;
}

/**
 * Represents a teacher's performance and workload metrics.
 * Corresponds to the `teachersData` array.
 */
export interface Teacher {
  id: number;
  name: string;
  subject: string;
  engagement: number;
  workload: number;
  students: number;
  dropoutRate: number;
  experience: number;
}

/**
 * Represents a student's profile and risk analysis.
 * Corresponds to the `studentsData` array.
 */
export interface Student {
    id: number;
    name: string;
    age: number;
    grade: string;
    attendance: number;
    performance: number;
    riskLevel: 'Low' | 'Medium' | 'High';
    subjects: string[];
    lastActive: string;
    suggestions: string[];
}

/**
 * Represents detailed analytics for a district in Rajasthan.
 * Corresponds to the `rajasthanDistricts` array.
 */
export interface District {
  name: string;
  enrollment: number;
  retention: number;
  completion: number;
  infrastructure: number;
  schools: number;
  students: number;
  teachers: number;
  budget: number;
  region: string;
  population: number;
  literacyRate: number;
}

/**
 * Represents a single educational institution.
 * Corresponds to the `institutionData` array.
 */
export interface Institution {
  id: string;
  name: string;
  type: string;
  district: string;
  region: string;
  students: number;
  teachers: number;
  enrollment: number;
  retention: number;
  infrastructure: number;
  budget: number;
}