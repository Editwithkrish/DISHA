import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(request: NextRequest) {
  try {
    // Get the path to the data directory
    const dataPath = path.join(process.cwd(), 'data')
    
    // Check if data directory exists
    if (!fs.existsSync(dataPath)) {
      return NextResponse.json(
        { error: 'Data directory not found' },
        { status: 404 }
      )
    }
    
    // Read all directories in the data folder
    const items = fs.readdirSync(dataPath, { withFileTypes: true })
    const universities = items
      .filter(item => item.isDirectory())
      .map(dir => ({
        id: dir.name,
        name: dir.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        path: `/api/universities/${dir.name}/students`
      }))
    
    // Return the universities list
    return NextResponse.json({
      universities,
      total: universities.length
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
    console.error('Error reading universities data:', error)
    return NextResponse.json(
      { error: 'Failed to load universities data' },
      { status: 500 }
    )
  }
}

// Optional: Add POST method for future university creation
export async function POST(request: NextRequest) {
  return NextResponse.json(
    { error: 'POST method not implemented yet' },
    { status: 501 }
  )
}