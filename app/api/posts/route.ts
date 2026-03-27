import { NextResponse } from 'next/server';
import { mockPosts, type Post } from '@/lib/posts-data';

// In-memory store (would be a database in production)
let posts = [...mockPosts];

export async function GET() {
  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const newPost: Post = {
      id: Date.now().toString(),
      images: body.images || [],
      caption: body.caption || '',
      status: body.status || 'draft',
      scheduledDate: body.scheduledDate,
      platform: body.platform || 'instagram',
      strategy: body.strategy,
      autoPost: body.autoPost || false,
      shareToPlatforms: body.shareToPlatforms || [],
      author: {
        name: 'FireWork',
        handle: '@firework',
        avatar: '',
      },
    };

    posts = [newPost, ...posts];

    return NextResponse.json(newPost, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}
