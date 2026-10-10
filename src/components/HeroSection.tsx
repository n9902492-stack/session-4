import React, { useState, useRef, useEffect } from 'react';
import {
  ArrowRight,
  Sliders,
  Verified,
  Lock,
  Video,
  Phone,
  Cast,
  DoorOpen,
  BrainCircuit,
  ShieldCheck,
  Mic,
  Video as VideoIcon,
  Activity,
  Zap,
  Network,
  KeyRound,
  LogIn,
  PlusCircle,
  Sparkles,
  Camera
} from 'lucide-react';

interface HeroSectionProps {
  onStartSession: (code?: string) => void;
  onOpenWhiteboard: () => void;
  onOpenHardwareTest: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartSession,
  onOpenWhiteboard,
  onOpenHardwareTest,
}) => {
  const [activeTab, setActiveTab] = useState<string>('meetings');
  const [sessionCode, setSessionCode] = useState<string>('product-review-alpha');
  const [previewCameraActive, setPreviewCameraActive] = useState<boolean>(false);
  const videoPreviewRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const tabs = [
    { id: 'meetings', label: 'Meetings & Stage', icon: Video },
    { id: 'phone', label: 'Cloud Phone', icon: Phone },
    { id: 'webinars', label: 'Webinars & Cast', icon: Cast },
    { id: 'rooms', label: 'Connected Rooms', icon: DoorOpen },
    { id: 'companion', label: 'Companion AI', icon: BrainCircuit },
  ];

  const handleTogglePreviewCamera = async () => {
    if (previewCameraActive) {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }
      if (videoPreviewRef.current) {
        videoPreviewRef.current.srcObject = null;
      }
      setPreviewCameraActive(false);
    } else {
      try {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { width: { ideal: 1280 }, height: { ideal: 720 } },
            audio: false,
          });
          streamRef.current = stream;
          if (videoPreviewRef.current) {
            videoPreviewRef.current.srcObject = stream;
          }
          setPreviewCameraActive(true);
        }
      } catch (e) {
        alert('Camera preview unavailable or permission denied; simulated stage feed remains active.');
      }
    }
  };

  const handleGenerateSandbox = () => {
    const randomCode = `sandbox-${Math.random().toString(36).substring(2, 7)}-stage`;
    setSessionCode(randomCode);
    onStartSession(randomCode);
  };

  return (
    <section className="relative w-full px-4 sm:px-6 lg:px-12 pt-8 pb-16 bg-[#fbf7ee] overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* Tag Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#ede3cf] shadow-sm mb-6">
          <span className="w-2 h-2 rounded-full bg-[#d97706] animate-pulse"></span>
          <span className="font-mono text-xs text-[#111827] uppercase tracking-wider font-semibold">
            A MEETING OPERATING SYSTEM · Independent clean-room product
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#111827] max-w-5xl tracking-tight leading-[1.15] mb-5 text-balance">
          Meetings that move work forward,{' '}
          <span className="text-[#d97706] underline decoration-[#ca8a04]/50 decoration-wavy decoration-2 underline-offset-8">
            illuminated by ambient intelligence.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-[#4b5563] max-w-3xl mb-8 leading-relaxed">
          Plan the room. Guide the conversation. Keep the decisions. The platform brings live collaboration, scheduling, events, and trustworthy meeting memory into one workspace.
        </p>

        {/* Dual CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-8">
          <button
            onClick={() => onStartSession(sessionCode)}
            className="px-6 py-3 rounded-full bg-[#d97706] text-white font-mono text-xs sm:text-sm font-bold shadow-md hover:bg-[#b45309] amber-glow transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>Start a session</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            href="#product-workflow"
            className="px-6 py-3 rounded-full bg-white text-[#111827] font-mono text-xs sm:text-sm font-medium border border-[#ede3cf] shadow-sm hover:bg-[#f5eedd] transition-colors flex items-center gap-2"
          >
            <span>Explore the system</span>
            <Sliders className="w-4 h-4 text-[#d97706]" />
          </a>

          <button
            onClick={onOpenWhiteboard}
            className="px-5 py-3 rounded-full bg-[#fef3c7] text-[#92400e] font-mono text-xs sm:text-sm font-bold border border-[#ebd7a5] hover:bg-[#fde68a] transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#d97706]" />
            <span>Open Whiteboard</span>
          </button>
        </div>

        {/* Trust Micro-Copy */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-[#4b5563] mb-12 text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <Verified className="w-4 h-4 text-[#d97706]" />
            <span className="font-medium">Original by design — Independent clean-room product</span>
          </div>
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#d97706]" />
            <span className="font-medium">Secure by default — Tenant isolation and auditability</span>
          </div>
        </div>

        {/* Suite Navigation Tabs */}
        <div className="w-full max-w-4xl bg-white p-1.5 rounded-full border border-[#ede3cf] shadow-sm flex items-center justify-between overflow-x-auto text-nowrap gap-1 mb-12">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-full font-mono text-xs font-semibold transition-all flex items-center gap-2 ${
                  isActive
                    ? 'bg-[#111827] text-white shadow-sm'
                    : 'text-[#4b5563] hover:text-[#111827] hover:bg-[#f5eedd]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#fbbf24]' : 'text-[#d97706]'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Feature Highlight Pill based on Suite Tab */}
        {activeTab !== 'meetings' && (
          <div className="w-full max-w-4xl bg-[#fef3c7]/60 border border-[#ebd7a5] rounded-xl p-3 text-xs text-[#78350f] mb-8 text-center animate-fadeIn">
            <span className="font-bold uppercase tracking-wider">
              {tabs.find((t) => t.id === activeTab)?.label}:
            </span>{' '}
            {activeTab === 'phone' && 'Carrier-grade SIP trunking with real-time call transcription and instant huddles.'}
            {activeTab === 'webinars' && '10,000+ attendee broadcasts with moderated backstage, dynamic Q&A, and live screen cast.'}
            {activeTab === 'rooms' && 'Native room controller integrations with Neat Bar, Poly Studio, and Logitech Rally systems.'}
            {activeTab === 'companion' && 'Privacy-preserving LLMs in your VPC generating automated decision logs and action tickets.'}
          </div>
        )}
      </div>

      {/* QUICK JOIN & HARDWARE READY ENGINE CARD */}
      <div className="max-w-7xl mx-auto" id="quick-join">
        <div className="bg-white rounded-2xl p-5 sm:p-8 lg:p-10 border border-[#ede3cf] shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Live Room Stream Preview (Left) */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="relative w-full aspect-video rounded-xl bg-[#141824] overflow-hidden shadow-sm flex items-center justify-center border border-neutral-200">
                {previewCameraActive ? (
                  <video
                    ref={videoPreviewRef}
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  // Clean High-tech Stage Simulation Artwork
                  <div className="relative w-full h-full bg-gradient-to-br from-[#1c2230] via-[#151922] to-[#0c0e14] flex flex-col items-center justify-center p-6 text-center">
                    {/* Stage Ambient Glow */}
                    <div className="absolute w-72 h-72 rounded-full bg-[#d97706]/10 blur-3xl pointer-events-none"></div>

                    {/* Simulated Room Interior */}
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-3 shadow-lg">
                        <VideoIcon className="w-8 h-8 text-[#f59e0b]" />
                      </div>
                      <h4 className="font-display text-white text-lg font-bold mb-1">
                        Executive Stage Room Alpha
                      </h4>
                      <p className="text-xs text-neutral-400 max-w-sm mb-4">
                        Live collaborative stage powered by LiveKit SFU mesh with cryptographic audit trails.
                      </p>

                      <div className="flex flex-wrap items-center justify-center gap-2">
                        <button
                          onClick={handleTogglePreviewCamera}
                          className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-mono font-medium border border-white/20 transition-all flex items-center gap-1.5 cursor-pointer"
                        >
                          <Camera className="w-3.5 h-3.5 text-amber-400" />
                          <span>Test Camera Feed</span>
                        </button>

                        <button
                          onClick={onOpenHardwareTest}
                          className="px-3.5 py-1.5 rounded-full bg-[#f59e0b] hover:bg-[#d97706] text-[#111827] text-xs font-mono font-bold transition-all shadow-md amber-glow flex items-center gap-1.5 cursor-pointer"
                        >
                          <Activity className="w-3.5 h-3.5" />
                          <span>Test Hardware Page →</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Top Status Overlays */}
                <div className="absolute top-3 left-3 flex items-center gap-2 bg-black/70 backdrop-blur px-3 py-1 rounded-full shadow-sm text-white">
                  <span className="w-2 h-2 rounded-full bg-[#f59e0b] animate-pulse"></span>
                  <span className="font-mono text-[11px] font-semibold">
                    1080p 60FPS · LIVEKIT SFU READY
                  </span>
                </div>

                <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-black/70 backdrop-blur px-3 py-1 rounded-full shadow-sm text-white">
                  <Lock className="w-3 h-3 text-[#f59e0b]" />
                  <span className="font-mono text-[11px]">E2E ENCRYPTED</span>
                </div>

                {/* Bottom Diagnostic Bar */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between bg-black/80 backdrop-blur-md px-4 py-2 rounded-lg text-white">
                  <div className="flex items-center gap-4 text-xs font-mono">
                    <div className="flex items-center gap-1.5 text-neutral-200">
                      <Mic className="w-3.5 h-3.5 text-[#f59e0b]" />
                      <span>Studio Mic (Ready)</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-neutral-200">
                      <Camera className="w-3.5 h-3.5 text-[#f59e0b]" />
                      <span>4K Sensor (Active)</span>
                    </div>
                  </div>

                  {/* Audio Waveform Meter */}
                  <div className="flex items-center gap-1.5">
                    <span className="w-1 h-3 rounded-full bg-[#f59e0b] animate-pulse"></span>
                    <span className="w-1 h-4 rounded-full bg-[#f59e0b]"></span>
                    <span className="w-1 h-2 rounded-full bg-[#f59e0b] animate-pulse"></span>
                    <span className="w-1 h-5 rounded-full bg-[#f59e0b]"></span>
                    <span className="font-mono text-[11px] text-neutral-400 ml-1">0.12ms Latency</span>
                  </div>
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-[#4b5563] pt-1">
                <div className="flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-[#d97706]" />
                  <span>Zero-download browser execution</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Network className="w-4 h-4 text-[#d97706]" />
                  <span>Adaptive WebRTC Sub-100ms mesh</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#d97706]" />
                  <span>99.999% SLA Uptime Guarantee</span>
                </div>
              </div>
            </div>

            {/* Join Action Form (Right) */}
            <div className="lg:col-span-5 bg-[#fbf7ee] p-6 sm:p-8 rounded-xl border border-[#ede3cf] flex flex-col justify-center">
              <div className="inline-flex items-center gap-1.5 mb-2 text-[#92400e]">
                <DoorOpen className="w-4 h-4 text-[#d97706]" />
                <span className="font-mono text-xs uppercase font-bold tracking-wider">
                  Instant Gate
                </span>
              </div>

              <h3 className="font-display text-2xl font-bold text-[#111827] mb-1">
                Launch or Join a Stage
              </h3>

              <p className="text-xs text-[#4b5563] mb-6">
                Enter a sovereign session code or generate a zero-trust meeting perimeter with one tap.
              </p>

              <form
                className="flex flex-col gap-3.5"
                onSubmit={(e) => {
                  e.preventDefault();
                  onStartSession(sessionCode);
                }}
              >
                <div className="relative">
                  <input
                    type="text"
                    value={sessionCode}
                    onChange={(e) => setSessionCode(e.target.value)}
                    placeholder="e.g. quantum-orch-814"
                    className="w-full bg-white text-[#111827] font-mono text-xs sm:text-sm px-4 py-3 rounded-lg border border-[#ede3cf] focus:outline-none focus:border-[#d97706] focus:ring-1 focus:ring-[#d97706] shadow-inner"
                  />
                  <KeyRound className="absolute right-3.5 top-3.5 w-4 h-4 text-[#9ca3af]" />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-lg bg-[#d97706] hover:bg-[#b45309] text-white font-mono text-xs sm:text-sm font-bold shadow-md amber-glow transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Join Session Now</span>
                  <LogIn className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-3 text-center my-1">
                  <div className="flex-1 h-px bg-[#ede3cf]"></div>
                  <span className="font-mono text-[10px] text-[#6b7280] uppercase tracking-wider">
                    or
                  </span>
                  <div className="flex-1 h-px bg-[#ede3cf]"></div>
                </div>

                <button
                  type="button"
                  onClick={handleGenerateSandbox}
                  className="w-full py-3 px-4 rounded-lg bg-white hover:bg-[#f5eedd] text-[#111827] font-mono text-xs font-semibold border border-[#ede3cf] transition-colors flex items-center justify-center gap-2"
                >
                  <PlusCircle className="w-4 h-4 text-[#d97706]" />
                  <span>Generate Ad-Hoc Sandbox</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
