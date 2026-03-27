"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { PostForm } from "@/components/dashboard/post-form"
import { type Post } from "@/lib/posts-data"
import { Spinner } from "@/components/ui/spinner"

export default function EditPostPage() {
  const params = useParams()
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/posts/${params.id}`)
        if (!response.ok) {
          throw new Error("Post not found")
        }
        const data = await response.json()
        setPost(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load post")
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchPost()
    }
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-88px)] flex items-center justify-center">
        <Spinner className="h-8 w-8 text-primary" />
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="min-h-[calc(100vh-88px)] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-foreground mb-2">Post not found</h2>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    )
  }

  return <PostForm mode="edit" initialData={post} />
}
