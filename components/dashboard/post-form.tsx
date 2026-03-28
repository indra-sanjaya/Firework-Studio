'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  Plus,
  ImageIcon,
  ChevronRight,
  AtSign,
  Link2,
  Smile,
  MapPin,
  Hash,
  CalendarDays,
  Clock,
  Layers,
} from 'lucide-react';
import { type Post, sampleImages, strategies } from '@/lib/posts-data';

interface PostFormProps {
  initialData?: Post;
  mode: 'create' | 'edit';
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

export function PostForm({ initialData, mode, formData, setFormData }: PostFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const isScheduled = !!formData.scheduledDate;

  const addImage = () => {
    const available = sampleImages.filter((img) => !formData.images.includes(img));
    if (available.length > 0) {
      setFormData((prev: any) => ({
        ...prev,
        images: [...prev.images, available[0]],
      }));
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        status: isScheduled ? 'scheduled' : 'draft',
        shareToPlatforms: formData.shareToFacebook ? ['facebook'] : [],
      };
      const url = mode === 'edit' && initialData ? `/api/posts/${initialData.id}` : '/api/posts';
      await fetch(url, {
        method: mode === 'edit' ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      router.push('/dashboard/planning');
      router.refresh();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* ── SECTION 1: Image Uploader ── */}
      <div className="p-5 border-b border-border">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">Media</p>

        {/* Main image */}
        <div className="relative aspect-square w-full rounded-[14px] bg-secondary overflow-hidden mb-3">
          {formData.images[selectedImageIndex] ?
            <Image src={formData.images[selectedImageIndex]} alt="preview" fill className="object-cover" />
          : <div className="flex flex-col items-center justify-center h-full gap-2 text-muted-foreground">
              <ImageIcon className="h-8 w-8" />
              <span className="text-xs">No image selected</span>
            </div>
          }
        </div>

        {/* Thumbnails */}
        <div className="flex gap-2 flex-wrap">
          {formData.images.map((img: string, i: number) => (
            <button
              key={i}
              onClick={() => setSelectedImageIndex(i)}
              className={`relative w-12 h-12 rounded-[10px] overflow-hidden border-2 transition-all ${
                i === selectedImageIndex ? 'border-primary' : 'border-transparent'
              }`}>
              <Image src={img} alt="" fill className="object-cover" />
            </button>
          ))}
          <button
            onClick={addImage}
            className="w-12 h-12 rounded-[10px] border border-dashed border-muted-foreground/40 flex items-center justify-center hover:border-primary hover:text-primary transition-colors text-muted-foreground">
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* ── SECTION 2: Platform + Type ── */}
      <div className="px-5 py-4 border-b border-border">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">
          Publish Settings
        </p>

        <div className="grid grid-cols-2 gap-2 mb-2">
          <div className="flex flex-col gap-1">
            <label className="text-[11px] text-muted-foreground">Platform</label>
            <select
              value={formData.platform}
              onChange={(e) => setFormData((prev: any) => ({ ...prev, platform: e.target.value }))}
              className="rounded-[10px] border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary">
              <option value="instagram">Instagram</option>
              <option value="twitter">Twitter</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[11px] text-muted-foreground">Post Type</label>
            <select
              value={formData.postType}
              onChange={(e) => setFormData((prev: any) => ({ ...prev, postType: e.target.value }))}
              className="rounded-[10px] border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary">
              <option value="post">Post</option>
              <option value="stories">Stories</option>
              <option value="reels">Reels</option>
            </select>
          </div>
        </div>

        {/* Date + Time row */}
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col gap-1">
            <label className="text-[11px] text-muted-foreground flex items-center gap-1">
              <CalendarDays className="h-3 w-3" /> Date
            </label>
            <input
              type="date"
              value={formData.scheduledDate.split('T')[0] || ''}
              onChange={(e) => {
                const date = e.target.value;
                const time = formData.scheduledDate.split('T')[1] || '12:00';
                setFormData((prev: any) => ({
                  ...prev,
                  scheduledDate: date ? `${date}T${time}` : '',
                }));
              }}
              className="rounded-[10px] border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[11px] text-muted-foreground flex items-center gap-1">
              <Clock className="h-3 w-3" /> Time
            </label>
            <input
              type="time"
              value={formData.scheduledDate.split('T')[1] || ''}
              onChange={(e) => {
                const time = e.target.value;
                const date = formData.scheduledDate.split('T')[0] || '';
                setFormData((prev: any) => ({
                  ...prev,
                  scheduledDate: date ? `${date}T${time}` : '',
                }));
              }}
              className="rounded-[10px] border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        {/* Status pill */}
        <div className="mt-3 flex items-center gap-2">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
              isScheduled ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
            }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${isScheduled ? 'bg-green-500' : 'bg-yellow-500'}`} />
            {isScheduled ? 'Scheduled' : 'Draft'}
          </span>
        </div>
      </div>

      {/* ── SECTION 3: Caption ── */}
      <div className="px-5 py-4 border-b border-border flex-1">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">Caption</p>

        <textarea
          value={formData.caption}
          onChange={(e) => setFormData((prev: any) => ({ ...prev, caption: e.target.value }))}
          placeholder="Write your caption..."
          className="w-full h-28 rounded-[12px] border bg-background p-3 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-muted-foreground/50"
        />

        {/* Toolbar + counter */}
        <div className="flex items-center justify-between mt-2 text-muted-foreground">
          <div className="flex gap-3">
            {[AtSign, Hash, Link2, Smile, MapPin].map((Icon, i) => (
              <button key={i} className="hover:text-foreground transition-colors">
                <Icon className="h-3.5 w-3.5" />
              </button>
            ))}
          </div>
          <span className={`text-[11px] ${formData.caption.length > 2000 ? 'text-red-500' : ''}`}>
            {formData.caption.length} / 2200
          </span>
        </div>
      </div>

      {/* ── SECTION 4: Strategy ── */}
      <div className="px-5 py-4 border-b border-border">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-1">
          <Layers className="h-3 w-3" /> Strategy
        </p>
        <select
          value={formData.strategy}
          onChange={(e) => setFormData((prev: any) => ({ ...prev, strategy: e.target.value }))}
          className="w-full rounded-[10px] bg-[#A7D7A0]/30 border border-[#A7D7A0] px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#A7D7A0]">
          <option value="">Select a strategy...</option>
          {strategies.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      {/* ── FOOTER: Actions ── */}
      <div className="px-5 py-4 flex items-center justify-end gap-2">
        <button
          onClick={() => router.back()}
          className="px-4 py-2 border rounded-[10px] text-sm hover:bg-secondary transition-colors">
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          disabled={!formData.caption.trim() || isSubmitting}
          className="px-5 py-2 bg-[#A7D7A0] rounded-[10px] text-sm font-medium flex items-center gap-1.5 hover:bg-[#8BC483] disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
          {isSubmitting ? 'Saving...' : 'Save'}
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
