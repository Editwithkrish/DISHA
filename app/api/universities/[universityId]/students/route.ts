import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

interface RouteParams {
  params: {
    universityId: string
  }
}

export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { universityId } = await params
    
    // Validate university ID
    if (!universityId || typeof universityId !== 'string') {
      return NextResponse.json(
        { error: 'Invalid university ID' },
        { status: 400 }
      )
    }
    
    // Get the path to the specific university's students file
    const filePath = path.join(process.cwd(), 'data', universityId, 'students.json')
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: `Students data not found for university: ${universityId}` },
        { status: 404 }
      )
    }
    
    // Read the JSON file
    const fileContent = fs.readFileSync(filePath, 'utf8')
    const studentsData = JSON.parse(fileContent)
    
    // Get query parameters for filtering/pagination
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get('limit')
    const offset = searchParams.get('offset')
    const riskLevel = searchParams.get('riskLevel')
    
    let filteredData = studentsData
    
    // Filter by risk level if provided
    if (riskLevel) {
      if (riskLevel === 'high') {
        filteredData = studentsData.filter((student: any) => 
          student.label_dropout_next_sem === 1
        )
      } else if (riskLevel === 'low') {
        filteredData = studentsData.filter((student: any) => 
          student.label_dropout_next_sem === 0
        )
      }
    }
    
    // Apply pagination if provided
    if (limit || offset) {
      const limitNum = limit ? parseInt(limit, 10) : filteredData.length
      const offsetNum = offset ? parseInt(offset, 10) : 0
      filteredData = filteredData.slice(offsetNum, offsetNum + limitNum)
    }
    
    // Return the data with metadata
    return NextResponse.json({
      universityId,
      students: filteredData,
      total: studentsData.length,
      filtered: filteredData.length,
      metadata: {
        hasMore: limit && offset ? 
          (parseInt(offset, 10) + parseInt(limit, 10)) < studentsData.length : false,
        filters: {
          riskLevel: riskLevel || null,
          limit: limit ? parseInt(limit, 10) : null,
          offset: offset ? parseInt(offset, 10) : null
        }
      }
    }, {
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

// Optional: Add POST method for future student data updates
export async function POST(
  request: NextRequest,
  { params }: RouteParams
) {
  const { universityId } = await params
  return NextResponse.json(
    { error: 'POST method not implemented yet' },
    { status: 501 }
  )
}