'use client';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useState } from 'react';

// ─── PURPOSE COLORS ──────────────────────────────────────────────────────────
const PURPOSE_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  hook: { label: 'Hook', color: '#F97316', bg: 'rgba(249,115,22,0.15)' },
  build: { label: 'Build', color: '#3B82F6', bg: 'rgba(59,130,246,0.15)' },
  payoff: { label: 'Payoff', color: '#10B981', bg: 'rgba(16,185,129,0.15)' },
  cta: { label: 'CTA', color: '#A855F7', bg: 'rgba(168,85,247,0.15)' },
};

// ─── TYPES ───────────────────────────────────────────────────────────────────
type Scene = {
  id: number;
  purpose: string;
  description: string;
  startTime: number;
  endTime: number;
  camera: string;
  motion: string;
  emotion: string;
  soundEffect: { name: string };
};

// ─── MAIN MODAL ──────────────────────────────────────────────────────────────
export default function StoryboardPreviewModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [activeScene, setActiveScene] = useState<number>(0);

  const data = {
    concept: {
      title: 'Stop Ruining Your Morning Hydration',
      hook: 'Stop drinking water like this in the morning.',
    },
    globalStyle: {
      visualStyle: 'Modern, clean, high-contrast fitness aesthetic',
      colorPalette: 'Electric blue, white, dark charcoal',
    },
    structure: { type: 'video' },
    scenes: [
      {
        id: 1,
        purpose: 'hook',
        description: 'Person gulping sugary drink looking tired',
        startTime: 0,
        endTime: 3,
        camera: 'Close-up',
        motion: 'Fast zoom-in',
        emotion: 'Urgency',
        soundEffect: { name: 'AUUGHHH' },
      },
      {
        id: 2,
        purpose: 'build',
        description: 'Pouring lemon water. MISTAKE #1 text overlay',
        startTime: 3,
        endTime: 6,
        camera: 'Overhead',
        motion: 'Fast cut',
        emotion: 'Instructional',
        soundEffect: { name: 'Core Sound' },
      },
      {
        id: 3,
        purpose: 'build',
        description: 'Adding electrolytes. MISTAKE #2 text',
        startTime: 6,
        endTime: 9,
        camera: 'Macro',
        motion: 'Handheld',
        emotion: 'Informative',
        soundEffect: { name: 'Error sound' },
      },
      {
        id: 4,
        purpose: 'payoff',
        description: 'Drinks water, looks refreshed and energised',
        startTime: 9,
        endTime: 12,
        camera: 'Eye-level',
        motion: 'Slow tilt',
        emotion: 'Satisfied',
        soundEffect: { name: 'Correct ding' },
      },
      {
        id: 5,
        purpose: 'cta',
        description: 'READ CAPTION text on screen, talent smiling to camera',
        startTime: 12,
        endTime: 15,
        camera: 'Medium shot',
        motion: 'Static',
        emotion: 'Empowering',
        soundEffect: { name: 'Champions' },
      },
      {
        id: 6,
        purpose: 'cta',
        description: 'READ CAPTION text on screen, talent smiling to camera',
        startTime: 12,
        endTime: 15,
        camera: 'Medium shot',
        motion: 'Static',
        emotion: 'Empowering',
        soundEffect: { name: 'Champions' },
      },
      {
        id: 7,
        purpose: 'cta',
        description: 'READ CAPTION text on screen, talent smiling to camera',
        startTime: 12,
        endTime: 15,
        camera: 'Medium shot',
        motion: 'Static',
        emotion: 'Empowering',
        soundEffect: { name: 'Champions' },
      },
    ] as Scene[],
  };

  const totalDuration = data.scenes[data.scenes.length - 1].endTime;
  const scene = data.scenes[activeScene];
  const purposeCfg = PURPOSE_CONFIG[scene.purpose] ?? {
    label: scene.purpose,
    color: '#6B7280',
    bg: 'rgba(107,114,128,0.15)',
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="p-0 overflow-auto border-0"
        style={{
          width: '92vw',
          maxWidth: '1200px',
          height: '88vh',
          maxHeight: '860px',
          background: '#0F1117',
          borderRadius: '20px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
        }}>
        {/* ── HEADER ─────────────────────────────────────────────────────── */}
        <div
          style={{
            padding: '20px 28px 16px',
            borderBottom: '1px solid rgba(255,255,255,0.07)',
            flexShrink: 0,
          }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: '#6B7280',
                  }}>
                  Storyboard Preview
                </span>
                <span
                  style={{
                    fontSize: 11,
                    padding: '2px 8px',
                    borderRadius: 20,
                    background: 'rgba(255,255,255,0.06)',
                    color: '#9CA3AF',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}>
                  {data.structure.type} · {totalDuration}s
                </span>
              </div>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F9FAFB', lineHeight: 1.3, margin: 0 }}>
                {data.concept.title}
              </h2>
              <p style={{ fontSize: 13, color: '#6B7280', marginTop: 4 }}>{data.concept.hook}</p>
            </div>

            {/* Style tags */}
            <div style={{ display: 'flex', gap: 8, flexShrink: 0, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
              {[data.globalStyle.visualStyle, data.globalStyle.colorPalette].map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: 11,
                    padding: '4px 10px',
                    borderRadius: 8,
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: '#9CA3AF',
                    whiteSpace: 'nowrap',
                  }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* ── TIMELINE BAR ─────────────────────────────────────────────── */}
          <div style={{ marginTop: 16, display: 'flex', gap: 3, height: 6, borderRadius: 6, overflow: 'hidden' }}>
            {data.scenes.map((s, i) => {
              const cfg = PURPOSE_CONFIG[s.purpose] ?? { color: '#6B7280', bg: '', label: '' };
              const widthPct = ((s.endTime - s.startTime) / totalDuration) * 100;
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveScene(i)}
                  style={{
                    width: `${widthPct}%`,
                    background: i === activeScene ? cfg.color : 'rgba(255,255,255,0.12)',
                    borderRadius: 3,
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'background 0.2s',
                    padding: 0,
                  }}
                  title={`Scene ${i + 1}: ${s.purpose}`}
                />
              );
            })}
          </div>
        </div>

        {/* ── BODY ───────────────────────────────────────────────────────── */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            padding: '20px 28px 24px',
            gap: 20,
          }}>
          {/* ── SCENE STRIP ────────────────────────────────────────────── */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, flexShrink: 0 }}>
            {data.scenes.map((s, i) => {
              const cfg = PURPOSE_CONFIG[s.purpose] ?? {
                color: '#6B7280',
                bg: 'rgba(107,114,128,0.15)',
                label: s.purpose,
              };
              const isActive = i === activeScene;
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveScene(i)}
                  style={{
                    flex: 1,
                    background: isActive ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.02)',
                    border: `1.5px solid ${isActive ? cfg.color : 'rgba(255,255,255,0.07)'}`,
                    borderRadius: 14,
                    padding: '12px 10px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.18s',
                    position: 'relative',
                    overflow: 'hidden',
                  }}>
                  {/* accent top bar */}
                  {isActive && (
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 3,
                        background: cfg.color,
                        borderRadius: '14px 14px 0 0',
                      }}
                    />
                  )}

                  {/* scene number */}
                  <div
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: '0.06em',
                      color: isActive ? cfg.color : '#4B5563',
                      marginBottom: 6,
                    }}>
                    SCENE {i + 1}
                  </div>

                  {/* preview box — aspect ratio 16:9 */}
                  <div
                    style={{
                      width: '100%',
                      aspectRatio: '16/9',
                      background: isActive ? cfg.bg : 'rgba(255,255,255,0.03)',
                      borderRadius: 8,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: 8,
                      position: 'relative',
                      overflow: 'hidden',
                    }}>
                    <span style={{ fontSize: 20 }}>
                      {s.purpose === 'hook' ?
                        '🎣'
                      : s.purpose === 'build' ?
                        '🔨'
                      : s.purpose === 'payoff' ?
                        '✅'
                      : '📣'}
                    </span>
                    {/* timecode */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: 4,
                        right: 6,
                        fontSize: 9,
                        color: 'rgba(255,255,255,0.4)',
                        fontFamily: 'monospace',
                      }}>
                      {s.startTime}s–{s.endTime}s
                    </div>
                  </div>

                  {/* purpose badge */}
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      fontSize: 10,
                      fontWeight: 600,
                      padding: '2px 7px',
                      borderRadius: 20,
                      background: cfg.bg,
                      color: cfg.color,
                      textTransform: 'capitalize',
                      letterSpacing: '0.04em',
                    }}>
                    {cfg.label}
                  </div>
                </button>
              );
            })}
          </div>

          {/* ── DETAIL PANEL ───────────────────────────────────────────── */}
          <div
            style={{
              minHeight: 300,
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 16,
              overflow: 'hidden',
              display: 'flex',
            }}>
            {/* Left — scene description */}
            <div
              style={{
                flex: 1,
                padding: '20px 24px',
                borderRight: '1px solid rgba(255,255,255,0.06)',
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
              }}>
              <div>
                <p
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    color: '#4B5563',
                    textTransform: 'uppercase',
                    marginBottom: 6,
                  }}>
                  Scene {activeScene + 1} Description
                </p>
                <p style={{ fontSize: 15, color: '#E5E7EB', lineHeight: 1.6, margin: 0 }}>{scene.description}</p>
              </div>

              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 4 }}>
                <Tag icon="⏱" label={`${scene.startTime}s → ${scene.endTime}s`} />
                <Tag icon="🎭" label={scene.emotion} color={purposeCfg.color} />
              </div>
            </div>

            {/* Right — production details */}
            <div
              style={{
                width: 260,
                padding: '20px 24px',
                display: 'flex',
                flexDirection: 'column',
                gap: 14,
                flexShrink: 0,
              }}>
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  color: '#4B5563',
                  textTransform: 'uppercase',
                  margin: 0,
                }}>
                Production Notes
              </p>

              <DetailRow icon="🎥" label="Camera" value={scene.camera} />
              <DetailRow icon="🎬" label="Motion" value={scene.motion} />
              <DetailRow icon="💭" label="Emotion" value={scene.emotion} />
              <DetailRow icon="🔊" label="Sound" value={scene.soundEffect.name} />

              {/* purpose chip */}
              <div style={{ marginTop: 'auto' }}>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '6px 14px',
                    borderRadius: 24,
                    background: purposeCfg.bg,
                    border: `1px solid ${purposeCfg.color}40`,
                    fontSize: 12,
                    fontWeight: 600,
                    color: purposeCfg.color,
                    textTransform: 'capitalize',
                  }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: purposeCfg.color }} />
                  {purposeCfg.label} Scene
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── SUB-COMPONENTS ──────────────────────────────────────────────────────────
function Tag({ icon, label, color }: { icon: string; label: string; color?: string }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        fontSize: 12,
        padding: '4px 10px',
        borderRadius: 8,
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.08)',
        color: color ?? '#9CA3AF',
      }}>
      {icon} {label}
    </span>
  );
}

function DetailRow({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <span
        style={{
          fontSize: 10,
          color: '#4B5563',
          textTransform: 'uppercase',
          letterSpacing: '0.07em',
          fontWeight: 600,
        }}>
        {icon} {label}
      </span>
      <span style={{ fontSize: 13, color: '#D1D5DB', fontWeight: 500 }}>{value}</span>
    </div>
  );
}
