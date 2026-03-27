'use client';

import { useState } from 'react';
import { PostCard } from '@/components/dashboard/post-card';
import { ChartCard } from '@/components/dashboard/chart-card';
import { TrendingPostModal } from '@/components/dashboard/trending-post-modal';

const hashtagData = {
  instagram: [
    { name: '#nature', value: 2400 },
    { name: '#travel', value: 1800 },
    { name: '#sunset', value: 1500 },
    { name: '#photo', value: 1200 },
    { name: '#explore', value: 900 },
  ],
  twitter: [
    { name: '#trending', value: 3200 },
    { name: '#viral', value: 2100 },
    { name: '#news', value: 1800 },
    { name: '#tech', value: 1400 },
    { name: '#daily', value: 1100 },
  ],
};

const trendingPosts = [
  {
    id: 'trending-1',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop',
    caption: "Mountain sunrise vibes - nature's alarm clock never disappoints",
    likes: 24500,
    comments: 1820,
    shares: 3200,
    status: 'trending' as const,
    platform: 'instagram' as const,
    author: { name: 'NatureExplorer', avatar: '' },
  },
  {
    id: 'trending-2',
    imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop',
    caption: 'Forest therapy session - sometimes all you need is trees and silence',
    likes: 18200,
    comments: 945,
    shares: 2100,
    status: 'growing' as const,
    platform: 'twitter' as const,
    author: { name: 'WildernessWanderer', avatar: '' },
  },
  {
    id: 'trending-3',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    caption: "Ocean waves and salty air - the best therapy money can't buy",
    likes: 31200,
    comments: 2340,
    shares: 4500,
    status: 'trending' as const,
    platform: 'instagram' as const,
    author: { name: 'CoastalDreamer', avatar: '' },
  },
  {
    id: 'trending-4',
    imageUrl: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400&h=400&fit=crop',
    caption: "Golden hour in the meadows - nature's perfect lighting",
    likes: 15600,
    comments: 780,
    shares: 1400,
    status: 'stable' as const,
    platform: 'twitter' as const,
    author: { name: 'SunsetChaser', avatar: '' },
  },
  {
    id: 'trending-5',
    imageUrl: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=400&fit=crop',
    caption: 'Valley views that take your breath away - hiking is worth it',
    likes: 22300,
    comments: 1560,
    shares: 2800,
    status: 'trending' as const,
    platform: 'instagram' as const,
    author: { name: 'TrailBlazer', avatar: '' },
  },
  {
    id: 'trending-6',
    imageUrl: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=400&h=400&fit=crop',
    caption: 'Peak performance starts with peak views - morning motivation',
    likes: 19800,
    comments: 1120,
    shares: 1900,
    status: 'growing' as const,
    platform: 'twitter' as const,
    author: { name: 'MountainMind', avatar: '' },
  },
];

type TrendingPost = (typeof trendingPosts)[number];

export default function TrendingPage() {
  const [selectedPost, setSelectedPost] = useState<TrendingPost | null>(null);
  const [savedPosts, setSavedPosts] = useState<string[]>([]);

  const handleSavePost = (postId: string) => {
    setSavedPosts((prev) => (prev.includes(postId) ? prev.filter((id) => id !== postId) : [...prev, postId]));
  };

  return (
    <div className="p-8">
      {/* Hashtag Charts */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ChartCard
          title="Instagram Top Hashtags"
          subtitle="Most engaging hashtags this week"
          data={hashtagData.instagram}
          type="area"
        />
        <ChartCard
          title="Twitter Top Hashtags"
          subtitle="Most engaging hashtags this week"
          data={hashtagData.twitter}
          type="area"
        />
      </section>

      {/* Trending Posts Feed */}
      <section>
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-foreground">Trending Posts</h2>
          <p className="text-sm text-muted-foreground mt-1">Top performing content across platforms</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingPosts.map((post) => (
            <button
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="text-left transition-transform hover:scale-[1.02]">
              <PostCard {...post} />
            </button>
          ))}
        </div>
      </section>

      {/* Post Modal */}
      <TrendingPostModal
        post={selectedPost}
        open={!!selectedPost}
        onOpenChange={(open) => !open && setSelectedPost(null)}
        onSave={handleSavePost}
        isSaved={selectedPost ? savedPosts.includes(selectedPost.id) : false}
      />
    </div>
  );
}
