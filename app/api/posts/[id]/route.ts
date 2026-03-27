import { NextResponse } from "next/server"
import { mockPosts, type Post } from "@/lib/posts-data"

// In-memory store (would be a database in production)
let posts = [...mockPosts]

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const post = posts.find(p => p.id === id)
  
  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 })
  }
  
  return NextResponse.json(post)
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    
    const index = posts.findIndex(p => p.id === id)
    
    if (index === -1) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }
    
    const updatedPost: Post = {
      ...posts[index],
      images: body.images ?? posts[index].images,
      caption: body.caption ?? posts[index].caption,
      status: body.status ?? posts[index].status,
      scheduledDate: body.scheduledDate ?? posts[index].scheduledDate,
      platform: body.platform ?? posts[index].platform,
      strategy: body.strategy ?? posts[index].strategy,
      autoPost: body.autoPost ?? posts[index].autoPost,
      shareToPlatforms: body.shareToPlatforms ?? posts[index].shareToPlatforms,
    }
    
    posts[index] = updatedPost
    
    return NextResponse.json(updatedPost)
  } catch {
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const index = posts.findIndex(p => p.id === id)
  
  if (index === -1) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 })
  }
  
  posts = posts.filter(p => p.id !== id)
  
  return NextResponse.json({ success: true })
}
