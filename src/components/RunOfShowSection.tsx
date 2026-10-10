import React, { useState, useEffect } from 'react';
import { Timer, CheckCheck, Play, CheckCircle2, Clock, Sparkles, ChevronRight } from 'lucide-react';

export const RunOfShowSection: React.FC = () => {
  const [activeItemIndex, setActiveItemIndex] = useState<number>(1);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(12 * 60 + 38); // 12:38
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleExtension = () => {
    setSecondsRemaining((prev) => prev + 5 * 60);
    setToast('Time extension of +5m synchronized to all 28 stage participants.');
    setTimeout(() => setToast(null), 3000);
  };

  const topics = [
    {
      num: '01',
      title: 'Welcome & Pre-reads',
      duration: '5 min allocated',
      status: 'Completed',
      timeDisplay: '05:00',
    },
    {
      num: '02',
      title: 'Clean-Room LiveKit Architecture Review',
      presenter: 'Presenter: Elena Rostova · Stage Screen Shared',
      duration: 'of 20 min',
      current: true,
    },
    {
      num: '03',
      title: 'Open Floor & Consensus Q&A',
      duration: '15 min allocated',
      timeDisplay: '15:00',
    },
    {
      num: '04',
      title: 'Action Item Commitment & Signing',
      duration: '5 min allocated',
      timeDisplay: '05:00',
    },
  ];

  return (
    <section className="w-full px-4 sm:px-6 lg:px-12 py-16 bg-[#f5eedd]/60 border-t border-[#ede3cf]" id="agenda-section">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Narrative Column */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="inline-flex items-center gap-2 font-mono text-xs text-[#92400e] font-bold uppercase tracking-widest mb-2">
              <span>02</span>
              <span>·</span>
              <span>RUN OF SHOW</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight mb-4">
              The agenda is part of the meeting, not a document nobody opens.
            </h2>

            <p className="text-base text-[#4b5563] mb-6 leading-relaxed">
              Say goodbye to rambling debates and ignored agendas. Stage runs as a synchronized HUD visible to all participants, automatically transitioning topics based on time budgets.
            </p>

            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-[#ede3cf] shadow-sm">
                <div className="w-8 h-8 rounded-lg bg-[#fef3c7] text-[#92400e] flex items-center justify-center shrink-0">
                  <Timer className="w-4 h-4 text-[#d97706]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#111827] font-mono">Paced Progress Bar</h4>
                  <p className="text-xs text-[#6b7280] leading-relaxed">
                    Ambient countdown shifts subtly from warm amber to soft gold as time elapses.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-[#ede3cf] shadow-sm">
                <div className="w-8 h-8 rounded-lg bg-[#fef3c7] text-[#92400e] flex items-center justify-center shrink-0">
                  <CheckCheck className="w-4 h-4 text-[#d97706]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#111827] font-mono">Action Pinning</h4>
                  <p className="text-xs text-[#6b7280] leading-relaxed">
                    Participants can flag explicit commitments without breaking conversational tempo.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Interactive Run of Show Stage HUD */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-[#ede3cf] shadow-md">
            {/* HUD Top Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-[#ede3cf] mb-5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#d97706] animate-pulse"></span>
                <span className="font-display font-bold text-sm sm:text-base text-[#111827]">
                  Weekly Architecture Sync
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="px-2.5 py-1 rounded bg-[#f5eedd] text-[#111827] font-semibold">
                  Total: 45:00
                </span>
                <span className="px-2.5 py-1 rounded bg-[#d97706] text-white font-bold amber-glow">
                  Stage Active
                </span>
              </div>
            </div>

            {/* Notification Toast */}
            {toast && (
              <div className="bg-[#fef3c7] border border-[#ebd7a5] text-[#92400e] text-xs p-2 rounded-lg mb-3 animate-fadeIn flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#d97706]" />
                <span>{toast}</span>
              </div>
            )}

            {/* Timeline Items List */}
            <div className="flex flex-col gap-2.5">
              {/* Item 1: Done */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#fbf7ee] opacity-75 border border-transparent">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#059669]" />
                  <div>
                    <div className="text-xs font-mono font-medium text-[#111827] line-through">
                      01 Welcome & Pre-reads
                    </div>
                    <div className="text-[11px] text-[#6b7280]">
                      5 min allocated · Completed
                    </div>
                  </div>
                </div>
                <span className="text-xs font-mono text-[#6b7280]">05:00</span>
              </div>

              {/* Item 2: Active Highlight */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-[#fef3c7]/50 border border-[#ebd7a5] shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#d97706] flex items-center justify-center text-white shrink-0 shadow-sm">
                    <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-[#111827] flex items-center gap-2 flex-wrap">
                      <span>02 Clean-Room LiveKit Architecture Review</span>
                      <span className="px-2 py-0.5 rounded-full bg-[#d97706] text-white text-[9px] uppercase font-bold tracking-wider font-mono">
                        CURRENT
                      </span>
                    </div>
                    <div className="text-[11px] text-[#92400e] font-medium mt-0.5">
                      Presenter: Elena Rostova · Stage Screen Shared
                    </div>
                  </div>
                </div>
                <div className="text-right shrink-0 ml-2">
                  <span className="font-display font-extrabold text-lg sm:text-xl text-[#111827] font-mono">
                    {formatTime(secondsRemaining)}
                  </span>
                  <span className="block text-[10px] text-[#6b7280] font-mono">
                    of 20 min
                  </span>
                </div>
              </div>

              {/* Item 3 */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#fbf7ee] border border-transparent">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full border-2 border-[#d1d5db] flex items-center justify-center text-xs"></div>
                  <div>
                    <div className="text-xs font-mono font-medium text-[#111827]">
                      03 Open Floor & Consensus Q&A
                    </div>
                    <div className="text-[11px] text-[#6b7280]">15 min allocated</div>
                  </div>
                </div>
                <span className="text-xs font-mono text-[#6b7280]">15:00</span>
              </div>

              {/* Item 4 */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#fbf7ee] border border-transparent">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full border-2 border-[#d1d5db] flex items-center justify-center text-xs"></div>
                  <div>
                    <div className="text-xs font-mono font-medium text-[#111827]">
                      04 Action Item Commitment & Signing
                    </div>
                    <div className="text-[11px] text-[#6b7280]">5 min allocated</div>
                  </div>
                </div>
                <span className="text-xs font-mono text-[#6b7280]">05:00</span>
              </div>
            </div>

            {/* Bottom HUD Actions */}
            <div className="mt-5 pt-4 border-t border-[#ede3cf] flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-[#6b7280] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>Synchronized stage broadcast to all 28 attendees</span>
              </span>

              <button
                onClick={handleExtension}
                className="px-4 py-1.5 rounded-full bg-[#f5eedd] hover:bg-[#ede3cf] text-[#111827] text-xs font-mono font-semibold transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Clock className="w-3.5 h-3.5 text-[#d97706]" />
                <span>Request Time Extension (+5m)</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
