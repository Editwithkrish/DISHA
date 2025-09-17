# Student Data API Documentation

This API provides endpoints to access student data organized by universities. The data is structured with universities as folders containing student information.

## Data Structure

```
data/
├── university-a/
│   └── students.json
├── university-b/
│   └── students.json
└── university-c/
    └── students.json
```

## API Endpoints

### 1. Get All Universities

**Endpoint:** `GET /api/universities`

**Description:** Returns a list of all available universities in the system.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "university-a",
      "name": "University A",
      "path": "data/university-a"
    },
    {
      "id": "university-b", 
      "name": "University B",
      "path": "data/university-b"
    },
    {
      "id": "university-c",
      "name": "University C", 
      "path": "data/university-c"
    }
  ],
  "total": 3
}
```

### 2. Get Students by University

**Endpoint:** `GET /api/universities/[universityId]/students`

**Description:** Returns students data for a specific university with filtering and pagination support.

**Parameters:**
- `universityId` (path): University identifier (university-a, university-b, university-c)
- `riskLevel` (query, optional): Filter by risk level (high, medium, low)
- `page` (query, optional): Page number for pagination (default: 1)
- `limit` (query, optional): Number of items per page (default: 10, max: 100)

**Example:** `GET /api/universities/university-a/students?riskLevel=high&page=1&limit=5`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "studentId": "STU20001",
      "gpa_current": 3.2,
      "label_dropout_next_sem": 1,
      "riskLevel": "high"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 5,
    "total": 15,
    "totalPages": 3,
    "hasNext": true,
    "hasPrev": false
  },
  "university": {
    "id": "university-a",
    "name": "University A"
  }
}
```

## Data Fields Explanation

### Academic Performance
- `gpa_current`: Current GPA (0-10 scale)
- `gpa_trend`: GPA change from previous semester
- `backlogs_count`: Number of failed subjects carried forward
- `failed_subjects_count`: Number of subjects failed in current semester
- `assignment_submission_rate`: Percentage of assignments submitted on time

### Attendance & Engagement
- `attendance_overall_percent`: Overall attendance percentage
- `attendance_trend`: Change in attendance from previous period
- `absences`: Total number of absences
- `late_arrivals`: Number of times student arrived late
- `class_participation_score`: Participation score (0-100)
- `extracurricular_count`: Number of extracurricular activities

### Digital Learning
- `lms_logins_per_week`: Average LMS logins per week
- `lms_video_completion_rate`: Percentage of educational videos completed
- `engagement_ratio`: Overall engagement metric

### Socioeconomic Factors
- `family_income`: Annual family income
- `income_per_dependent`: Income divided by number of dependents
- `scholarship_status`: 1 if on scholarship, 0 otherwise
- `first_gen_learner`: 1 if first-generation college student, 0 otherwise
- `hostel_resident`: 1 if living in hostel, 0 otherwise
- `commute_time_minutes`: Daily commute time in minutes

### Health & Wellness
- `chronic_illness`: 1 if has chronic illness, 0 otherwise
- `disability`: 1 if has disability, 0 otherwise
- `stress_level_num`: Stress level (1-5 scale)

### Support & Feedback
- `teacher_feedback_avg_rating`: Average teacher feedback rating (1-5)
- `disciplinary_complaints`: Number of disciplinary complaints
- `disciplinary_appreciations`: Number of appreciations received
- `career_interest_clarity`: Career clarity level (0-2)
- `counselling_sessions_attended`: Number of counselling sessions attended
- `pending_counselling_sessions`: Number of pending counselling sessions
- `days_since_last_counselling`: Days since last counselling session

### Demographics
- `age`: Student age
- `gender`: Student gender
- `category`: Social category (General, OBC, SC, ST)
- `location`: Location type (Urban, Semi-Urban, Rural)

### Risk Assessment
- `label_dropout_next_sem`: 1 if at risk of dropout, 0 otherwise

## Error Responses

### 400 Bad Request
```json
{
  "error": "Invalid university ID"
}
```

### 404 Not Found
```json
{
  "error": "Students data not found for university: invalid-university"
}
```

### 500 Internal Server Error
```json
{
  "error": "Failed to load student data"
}
```

## Usage Examples

### JavaScript/TypeScript
```javascript
// Get all universities
const universities = await fetch('/api/universities').then(res => res.json())

// Get students from specific university
const universityAStudents = await fetch('/api/universities/university-a/students')
  .then(res => res.json())

// Get high-risk students across all universities
const highRiskStudents = await fetch('/api/students/all?riskLevel=high')
  .then(res => res.json())

// Get paginated results
const paginatedStudents = await fetch('/api/students/all?limit=5&offset=0')
  .then(res => res.json())
```

### cURL
```bash
# Get all universities
curl http://localhost:3000/api/universities

# Get students from university-a
curl http://localhost:3000/api/universities/university-a/students

# Get high-risk students with pagination
curl "http://localhost:3000/api/students/all?riskLevel=high&limit=3&offset=0"
```

## Notes

- All endpoints return JSON responses
- Responses include appropriate caching headers
- Error handling is implemented for missing files and invalid parameters
- The API supports filtering, pagination, and statistical aggregation
- Student data includes university information when fetched from cross-university endpoints