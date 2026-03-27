'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, Share2, Bookmark, ExternalLink, Instagram, Twitter } from 'lucide-react';

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

interface TrendingPostModalProps {
  post: TrendingPost | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave?: (postId: string) => void;
  isSaved?: boolean;
}

export function TrendingPostModal({ post, open, onOpenChange, onSave, isSaved = false }: TrendingPostModalProps) {
  if (!post) return null;

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const statusColors = {
    trending: 'bg-[#FFD54F] text-[#2E2E2E]',
    growing: 'bg-[#A7D7A0] text-[#2E2E2E]',
    stable: 'bg-[#CFEFFF] text-[#2E2E2E]',
  };

  const PlatformIcon = post.platform === 'instagram' ? Instagram : Twitter;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-20xl p-0 overflow-hidden rounded-[20px] border-border">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.1fr]">
          {/* Image Section */}
          <div className="relative aspect-square bg-muted">
            <img src={post.imageUrl} alt={post.caption} className="w-full h-full object-cover" />
            <Badge
              className={`absolute top-4 left-4 ${statusColors[post.status]} border-0 rounded-full px-3 py-1 text-xs font-medium capitalize`}>
              {post.status}
            </Badge>
          </div>

          {/* Content Section */}
          <div className="flex flex-col p-6 min-w-0">
            <DialogHeader className="pb-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
                  {post.author.avatar ?
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  : <span className="text-sm font-medium text-foreground">{post.author.name.charAt(0)}</span>}
                </div>
                <div className="flex-1">
                  <DialogTitle className="text-base font-semibold text-foreground">{post.author.name}</DialogTitle>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <PlatformIcon className="h-3.5 w-3.5" />
                    <span className="text-xs capitalize">{post.platform}</span>
                  </div>
                </div>
              </div>
            </DialogHeader>

            {/* Caption */}
            <div className="flex-1 py-4">
              <p className="text-sm text-foreground leading-relaxed">{post.caption}</p>
            </div>

            {/* Engagement Stats */}
            <div className="py-4 border-t border-b border-border">
              <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">Engagement</h4>
              <div className="grid grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-[#FFD54F]/20 flex items-center justify-center">
                    <Heart className="h-4 w-4 text-[#FFD54F]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{formatNumber(post.likes)}</p>
                    <p className="text-xs text-muted-foreground">Likes</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-[#CFEFFF]/50 flex items-center justify-center">
                    <MessageCircle className="h-4 w-4 text-[#0EA5E9]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{formatNumber(post.comments)}</p>
                    <p className="text-xs text-muted-foreground">Comments</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-[#A7D7A0]/30 flex items-center justify-center">
                    <Share2 className="h-4 w-4 text-[#22C55E]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{formatNumber(post.shares)}</p>
                    <p className="text-xs text-muted-foreground">Shares</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                className="w-full sm:flex-1 rounded-[16px] border-border hover:bg-secondary whitespace-nowrap"
                onClick={() => onSave?.(post.id)}>
                <Bookmark className={`h-4 w-4 mr-2 shrink-0 ${isSaved ? 'fill-[#FFD54F] text-[#FFD54F]' : ''}`} />
                {isSaved ? 'Saved' : 'Save'}
              </Button>

              <Button className="w-full sm:flex-1 rounded-[16px] bg-[#A7D7A0] text-[#2E2E2E] hover:bg-[#8BC483] whitespace-nowrap">
                <ExternalLink className="h-4 w-4 mr-2 shrink-0" />
                View Original
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
