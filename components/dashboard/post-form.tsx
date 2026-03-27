"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { 
  Plus, 
  ImageIcon, 
  Instagram, 
  ChevronLeft, 
  ChevronRight,
  AtSign,
  Link2,
  Smile,
  MapPin,
  Hash,
  Settings2
} from "lucide-react"
import { type Post, sampleImages, strategies } from "@/lib/posts-data"

interface PostFormProps {
  initialData?: Post
  mode: "create" | "edit"
}

const platforms = [
  { id: "instagram", label: "Instagram", icon: Instagram, color: "#E1306C" },
]

const scheduleOptions = [
  { id: "draft", label: "Save as draft" },
  { id: "now", label: "Post now" },
  { id: "custom", label: "Custom time" },
  { id: "best", label: "Your best times to post" },
]

export function PostForm({ initialData, mode }: PostFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Form state
  const [formData, setFormData] = useState({
    images: initialData?.images || [sampleImages[0]],
    caption: initialData?.caption || "",
    platform: initialData?.platform || "instagram",
    strategy: initialData?.strategy || "",
    scheduleOption: initialData?.status === "scheduled" ? "custom" : "draft",
    scheduledDate: initialData?.scheduledDate || "",
    autoPost: initialData?.autoPost ?? true,
    shareToFacebook: initialData?.shareToPlatforms?.includes("facebook") || false,
  })
  
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [activeTab, setActiveTab] = useState<"post" | "stories" | "reels">("post")
  
  // Week calendar
  const today = new Date()
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today)
    date.setDate(today.getDate() + i - 1)
    return date
  })
  const [selectedDate, setSelectedDate] = useState(today)
  
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  const addImage = () => {
    const availableImages = sampleImages.filter(img => !formData.images.includes(img))
    if (availableImages.length > 0) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, availableImages[0]]
      }))
    }
  }

  const handleSubmit = async (saveAsDraft: boolean = true) => {
    setIsSubmitting(true)
    
    try {
      const status = saveAsDraft ? "draft" : formData.scheduleOption === "now" ? "published" : "scheduled"
      
      const payload = {
        images: formData.images,
        caption: formData.caption,
        status,
        platform: formData.platform,
        strategy: formData.strategy || undefined,
        scheduledDate: formData.scheduleOption === "custom" && formData.scheduledDate 
          ? formData.scheduledDate 
          : undefined,
        autoPost: formData.autoPost,
        shareToPlatforms: formData.shareToFacebook ? ["facebook"] : [],
      }
      
      const url = mode === "edit" && initialData 
        ? `/api/posts/${initialData.id}` 
        : "/api/posts"
      
      const method = mode === "edit" ? "PUT" : "POST"
      
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      
      if (response.ok) {
        router.push("/dashboard/planning")
        router.refresh()
      }
    } catch (error) {
      console.error("Failed to save post:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDiscard = () => {
    router.push("/dashboard/planning")
  }

  return (
    <div className="min-h-[calc(100vh-88px)] bg-background">
      {/* Week Calendar Header */}
      <div className="border-b border-border bg-card px-6 py-4">
        <div className="flex items-center justify-between">
          <button className="rounded-full p-2 hover:bg-secondary transition-colors">
            <ChevronLeft className="h-5 w-5 text-muted-foreground" />
          </button>
          
          <div className="flex items-center gap-2">
            {weekDays.map((date, index) => {
              const isSelected = date.toDateString() === selectedDate.toDateString()
              const isToday = date.toDateString() === today.toDateString()
              
              return (
                <button
                  key={index}
                  onClick={() => setSelectedDate(date)}
                  className={`flex flex-col items-center rounded-[12px] px-4 py-2 transition-colors ${
                    isSelected 
                      ? "bg-[#A7D7A0] text-[#2E2E2E]" 
                      : isToday 
                        ? "bg-secondary text-foreground"
                        : "hover:bg-secondary text-muted-foreground"
                  }`}
                >
                  <span className="text-xs">{date.getDate()}</span>
                  <span className="text-sm font-medium">{dayNames[date.getDay()]}</span>
                </button>
              )
            })}
          </div>
          
          <div className="flex items-center gap-4">
            <button className="rounded-full p-2 hover:bg-secondary transition-colors">
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </button>
            <span className="text-sm font-medium text-primary">
              {monthNames[selectedDate.getMonth()]} - {monthNames[(selectedDate.getMonth() + 1) % 12]} {selectedDate.getFullYear()}
            </span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="rounded-[20px] bg-card shadow-[0_4px_12px_rgba(0,0,0,0.05)] overflow-hidden">
          {/* Tabs */}
          <div className="flex items-center justify-between border-b border-border px-6 py-4">
            <div className="flex items-center gap-6">
              {(["post", "stories", "reels"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`text-sm font-medium uppercase tracking-wide transition-colors ${
                    activeTab === tab 
                      ? "text-foreground" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            
            <div className="flex items-center gap-4">
              <button className="rounded-full p-2 hover:bg-secondary transition-colors">
                <Settings2 className="h-5 w-5 text-muted-foreground" />
              </button>
              <span className="text-sm text-muted-foreground">
                {formData.scheduleOption === "draft" ? "Unscheduled" : "Scheduled"}
              </span>
            </div>
          </div>

          <div className="grid lg:grid-cols-2">
            {/* Left Column - Image Preview */}
            <div className="p-6 border-r border-border">
              {/* Platform Selector */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#833AB4] via-[#E1306C] to-[#F77737] p-0.5">
                  <div className="rounded-full bg-white p-2">
                    <Instagram className="h-5 w-5 text-[#E1306C]" />
                  </div>
                </div>
                <button className="rounded-full border-2 border-dashed border-border p-2 hover:border-primary transition-colors">
                  <Plus className="h-5 w-5 text-muted-foreground" />
                </button>
              </div>

              {/* Main Image Preview */}
              <div className="relative aspect-square rounded-[20px] overflow-hidden bg-secondary mb-4">
                {formData.images[selectedImageIndex] ? (
                  <Image
                    src={formData.images[selectedImageIndex]}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <ImageIcon className="h-16 w-16 text-muted-foreground" />
                  </div>
                )}
                
                {/* Edit overlay button */}
                <button className="absolute bottom-4 left-4 rounded-full bg-[#2E2E2E]/80 p-2 text-white hover:bg-[#2E2E2E] transition-colors">
                  <Settings2 className="h-4 w-4" />
                </button>
              </div>

              {/* Thumbnail Row */}
              <div className="flex gap-3">
                {formData.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative w-16 h-16 rounded-[12px] overflow-hidden border-2 transition-all ${
                      index === selectedImageIndex 
                        ? "border-primary ring-2 ring-primary/20" 
                        : "border-transparent hover:border-border"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
                {formData.images.length < 4 && (
                  <button
                    onClick={addImage}
                    className="w-16 h-16 rounded-[12px] border-2 border-dashed border-border flex items-center justify-center hover:border-primary hover:bg-secondary transition-all"
                  >
                    <Plus className="h-5 w-5 text-muted-foreground" />
                  </button>
                )}
              </div>
            </div>

            {/* Right Column - Caption & Settings */}
            <div className="flex flex-col">
              {/* Strategy Selector */}
              <div className="flex items-center justify-end p-4 border-b border-border">
                <select
                  value={formData.strategy}
                  onChange={(e) => setFormData(prev => ({ ...prev, strategy: e.target.value }))}
                  className="rounded-[12px] bg-[#A7D7A0] px-4 py-2 text-sm font-medium text-[#2E2E2E] border-0 cursor-pointer"
                >
                  <option value="">Strategy: Choose One</option>
                  {strategies.map((s) => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
              </div>

              {/* Caption Input */}
              <div className="flex-1 p-6">
                <textarea
                  value={formData.caption}
                  onChange={(e) => setFormData(prev => ({ ...prev, caption: e.target.value }))}
                  placeholder="Craft the perfect caption here..."
                  className="w-full h-48 rounded-[16px] border border-border bg-background p-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  maxLength={2200}
                />
                
                {/* Caption Tools */}
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-4">
                    <button className="text-muted-foreground hover:text-foreground transition-colors">
                      <AtSign className="h-5 w-5" />
                    </button>
                    <button className="text-muted-foreground hover:text-foreground transition-colors">
                      <Hash className="h-5 w-5" />
                    </button>
                    <button className="text-muted-foreground hover:text-foreground transition-colors">
                      <Link2 className="h-5 w-5" />
                    </button>
                    <button className="text-muted-foreground hover:text-foreground transition-colors">
                      <Smile className="h-5 w-5" />
                    </button>
                    <button className="text-muted-foreground hover:text-foreground transition-colors">
                      <MapPin className="h-5 w-5" />
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>0 / 30</span>
                    <span className="mx-2">|</span>
                    <span>{formData.caption.length} / 2200</span>
                  </div>
                </div>
              </div>

              {/* Schedule & Auto Post Settings */}
              <div className="grid grid-cols-2 gap-6 p-6 border-t border-border">
                {/* Schedule Options */}
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-4">Schedule your post</h4>
                  <div className="space-y-3">
                    {scheduleOptions.map((option) => (
                      <label key={option.id} className="flex items-center gap-3 cursor-pointer">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                          formData.scheduleOption === option.id 
                            ? "border-primary bg-primary" 
                            : "border-border"
                        }`}>
                          {formData.scheduleOption === option.id && (
                            <div className="w-2 h-2 rounded-full bg-white" />
                          )}
                        </div>
                        <span className={`text-sm ${
                          formData.scheduleOption === option.id 
                            ? "text-foreground font-medium" 
                            : "text-muted-foreground"
                        }`}>
                          {option.label}
                        </span>
                      </label>
                    ))}
                    
                    {formData.scheduleOption === "best" && (
                      <p className="text-xs text-muted-foreground ml-8">
                        When your audience is most online
                      </p>
                    )}
                    
                    {formData.scheduleOption === "custom" && (
                      <input
                        type="datetime-local"
                        value={formData.scheduledDate}
                        onChange={(e) => setFormData(prev => ({ ...prev, scheduledDate: e.target.value }))}
                        className="ml-8 rounded-[12px] border border-border bg-background px-3 py-2 text-sm"
                      />
                    )}
                  </div>
                </div>

                {/* Auto Post Settings */}
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-4">Auto Post to Instagram</h4>
                  <label className="flex items-center justify-between cursor-pointer mb-4">
                    <div className="flex items-center gap-2">
                      <Instagram className="h-4 w-4 text-[#E1306C]" />
                      <span className="text-sm text-muted-foreground">@trendbloom</span>
                    </div>
                    <button
                      onClick={() => setFormData(prev => ({ ...prev, autoPost: !prev.autoPost }))}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        formData.autoPost ? "bg-primary" : "bg-border"
                      }`}
                    >
                      <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                        formData.autoPost ? "left-7" : "left-1"
                      }`} />
                    </button>
                  </label>

                  <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                    Share copy to Facebook
                    <span className="text-xs bg-[#CFEFFF] text-[#0EA5E9] px-2 py-0.5 rounded-full">Beta</span>
                  </h4>
                  <label className="flex items-center justify-between cursor-pointer">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-[#1877F2]" />
                      <span className="text-sm text-muted-foreground">TrendBloom Page</span>
                    </div>
                    <button
                      onClick={() => setFormData(prev => ({ ...prev, shareToFacebook: !prev.shareToFacebook }))}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        formData.shareToFacebook ? "bg-primary" : "bg-border"
                      }`}
                    >
                      <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                        formData.shareToFacebook ? "left-7" : "left-1"
                      }`} />
                    </button>
                  </label>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 p-6 border-t border-border bg-secondary/30">
                <button
                  onClick={handleDiscard}
                  disabled={isSubmitting}
                  className="rounded-[16px] border border-border px-6 py-3 text-sm font-medium text-muted-foreground hover:bg-secondary transition-colors disabled:opacity-50"
                >
                  Discard Draft
                </button>
                <button
                  onClick={() => handleSubmit(true)}
                  disabled={isSubmitting || !formData.caption.trim()}
                  className="rounded-[16px] bg-[#A7D7A0] px-6 py-3 text-sm font-medium text-[#2E2E2E] hover:bg-[#8BC98B] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isSubmitting ? "Saving..." : mode === "edit" ? "Update Post" : "Save as Draft"}
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
