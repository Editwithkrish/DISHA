import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(request: NextRequest) {
  try {
    // Get the path to the mock data file
    const filePath = path.join(process.cwd(), 'mock-students-data.json')
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: 'Student data file not found' },
        { status: 404 }
      )
    }
    
    // Read the JSON file
    const fileContent = fs.readFileSync(filePath, 'utf8')
    const studentsData = JSON.parse(fileContent)
    
    // Return the data with appropriate headers
    return NextResponse.json(studentsData, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    })
    
  } catch (error) {
    console.error('Error reading student data:', error)
    return NextResponse.json(
      { error: 'Failed to load student data' },
      { status: 500 }
    )
  }
}

// Optional: Add POST method for future data updates
export async function POST(request: NextRequest) {
  return NextResponse.json(
    { error: 'POST method not implemented yet' },
    { status: 501 }
  )
}