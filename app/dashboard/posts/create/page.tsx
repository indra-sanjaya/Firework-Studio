'use client';

import { useState } from 'react';
import Image from 'next/image';
import { PostForm } from '@/components/dashboard/post-form';
import { PostPreview } from '@/components/dashboard/post-preview';
import { TrendingPostModal } from '@/components/dashboard/trending-post-modal';
import { type Post } from '@/lib/posts-data';
import { TrendingUp, Flame } from 'lucide-react';

interface TrendingPost {
  id: string;
  imageUrl: string;
  caption: string;
  likes: number;
  comments: number;
  shares: number;
  status: 'trending' | 'growing' | 'stable';
  platform: 'instagram' | 'twitter';
  author: {
    name: string;
    avatar?: string;
  };
}

const statusConfig = {
  trending: { label: 'Trending', className: 'bg-[#FFD54F] text-[#2E2E2E]' },
  growing: { label: 'Growing', className: 'bg-[#A7D7A0] text-[#2E2E2E]' },
  stable: { label: 'Stable', className: 'bg-[#CFEFFF] text-[#2E2E2E]' },
};

const formatNumber = (n: number) => {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
  if (n >= 1_000) return (n / 1_000).toFixed(1) + 'K';
  return n.toString();
};

export default function CreatePostPage() {
  const [formData, setFormData] = useState<Partial<Post>>({
    images: [],
    caption: '',
    platform: 'instagram',
    postType: 'post',
    strategy: '',
    scheduledDate: '',
    autoPost: true,
    shareToPlatforms: [],
  });

  const [selectedPost, setSelectedPost] = useState<TrendingPost | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const trendingPosts: TrendingPost[] = [
    {
      id: '1',
      imageUrl: 'https://images.unsplash.com/photo-1492724441997-5dc865305da7',
      caption: 'Viral hook + clean aesthetic 🔥',
      likes: 12000,
      comments: 800,
      shares: 320,
      status: 'trending',
      platform: 'instagram',
      author: { name: 'Creator A' },
    },
    {
      id: '2',
      imageUrl: 'https://images.unsplash.com/photo-1529336953121-ad5a0d43d0d2',
      caption: 'Minimal content wins attention',
      likes: 8700,
      comments: 500,
      shares: 210,
      status: 'growing',
      platform: 'instagram',
      author: { name: 'Creator B' },
    },
    {
      id: '3',
      imageUrl: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2',
      caption: 'Bold messaging + contrast',
      likes: 5400,
      comments: 300,
      shares: 150,
      status: 'stable',
      platform: 'twitter',
      author: { name: 'Creator C' },
    },
    {
      id: '4',
      imageUrl: 'https://images.unsplash.com/photo-1504204267155-aaad8e81290d',
      caption: 'Morning routine that converts',
      likes: 9100,
      comments: 420,
      shares: 180,
      status: 'growing',
      platform: 'instagram',
      author: { name: 'Creator D' },
    },
    {
      id: '5',
      imageUrl: 'https://images.unsplash.com/photo-1511988617509-a57c8a288659',
      caption: 'Subtle storytelling always wins',
      likes: 6300,
      comments: 290,
      shares: 140,
      status: 'stable',
      platform: 'twitter',
      author: { name: 'Creator E' },
    },
  ];

  const openModal = (post: TrendingPost) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const handleSaveTrending = () => {
    if (!selectedPost) return;
    setFormData((prev) => ({
      ...prev,
      images: [selectedPost.imageUrl],
      caption: selectedPost.caption,
      platform: selectedPost.platform,
    }));
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 space-y-6">
      {/* ═══ TOP: Create Post Panel ═══ */}
      <div className="rounded-[20px] bg-card shadow-sm border border-border overflow-hidden">
        <div className="grid lg:grid-cols-2 min-h-[600px]">
          {/* LEFT — Form */}
          <div className="border-r border-border overflow-y-auto">
            <PostForm formData={formData} setFormData={setFormData} mode="create" />
          </div>

          {/* RIGHT — Preview */}
          <div className="hidden lg:flex items-center justify-center bg-muted/40 p-8">
            <PostPreview formData={formData} />
          </div>
        </div>
      </div>

      {/* ═══ BOTTOM: Trending Inspirations ═══ */}
      <div>
        {/* Section header */}
        <div className="flex items-center gap-2 mb-4">
          <div className="h-7 w-7 rounded-full bg-[#FFD54F]/20 flex items-center justify-center">
            <Flame className="h-3.5 w-3.5 text-[#F59E0B]" />
          </div>
          <h3 className="text-sm font-semibold">Trending Inspirations</h3>
          <span className="text-xs text-muted-foreground">— click to use as inspiration</span>
        </div>

        {/* Scrollable horizontal row of compact cards */}
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {trendingPosts.map((post) => {
            const status = statusConfig[post.status];
            return (
              <button
                key={post.id}
                onClick={() => openModal(post)}
                className="group flex-shrink-0 w-[160px] rounded-[14px] border border-border bg-card overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 text-left">
                {/* Thumbnail */}
                <div className="relative w-full aspect-square">
                  <Image
                    src={post.imageUrl}
                    alt={post.caption}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Status badge overlaid */}
                  <span
                    className={`absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-semibold capitalize ${status.className}`}>
                    {status.label}
                  </span>
                </div>

                {/* Info */}
                <div className="p-2.5">
                  <p className="text-xs line-clamp-2 leading-snug text-foreground mb-1.5">{post.caption}</p>
                  <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                    <TrendingUp className="h-3 w-3" />
                    <span>{formatNumber(post.likes)} likes</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ═══ Modal ═══ */}
      <TrendingPostModal
        post={selectedPost}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSave={handleSaveTrending}
      />
    </div>
  );
}
