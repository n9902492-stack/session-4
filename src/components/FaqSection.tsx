import React, { useState } from 'react';
import { ChevronDown, Sparkles, ArrowRight, Calendar } from 'lucide-react';

interface FaqSectionProps {
  onStartFree: () => void;
  onOpenSlaModal: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onStartFree, onOpenSlaModal }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does seat tier billing adjust during team changes?',
      a: 'Meeting OS calculates active seats on a daily prorated basis in Indian Rupees (₹). If engineers join or depart mid-cycle, you receive an automated credit ledger on the next billing statement.',
    },
    {
      q: 'Do external guest participants consume a paid license?',
      a: 'No. Guests, vendors, candidates, and webinar viewers joining via web or mobile link are 100% free of charge and never consume a team seat quota.',
    },
    {
      q: 'Where is meeting audio and video media physically stored?',
      a: 'By default, all live audio and video packets are streamed in-memory across the LiveKit SFU plane without disk recording. When recording is explicitly initiated by a host with team consent, data lands in your configured S3 or Google Cloud storage bucket under your KMS key with local Indian data residency.',
    },
    {
      q: 'Can I use the interactive whiteboard during webinars and export diagrams?',
      a: 'Yes! The collaborative canvas whiteboard is accessible anytime directly from the top navigation header or inside the stage room. You can draw, place sticky notes, create shapes, and export complete diagrams as PNG images with one tap.',
    },
    {
      q: 'Do you provide discounts for educational or non-profit institutions?',
      a: 'Yes, verified educational institutions, academic research collectives, and registered NGOs in India receive 40% off Pro Team and Business tiers.',
    },
  ];

  return (
    <>
      {/* FAQ Accordion */}
      <section className="w-full px-4 sm:px-6 lg:px-12 py-16 bg-white border-t border-[#ede3cf]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight mb-2">
              Frequently Answered Inquiries
            </h2>
            <p className="text-base text-[#4b5563]">
              Architectural clarity on how Meeting OS handles seats, data, and edge instances.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="p-5 rounded-2xl bg-[#fbf7ee] border border-[#ede3cf] hover:border-[#d97706]/40 cursor-pointer transition-all"
                >
                  <div className="flex items-center justify-between gap-4">
                    <h4 className="font-display text-sm sm:text-base font-bold text-[#111827]">
                      {faq.q}
                    </h4>
                    <ChevronDown
                      className={`w-5 h-5 text-[#d97706] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                  {isOpen && (
                    <div className="mt-3 text-xs sm:text-sm text-[#4b5563] leading-relaxed border-t border-[#ede3cf]/60 pt-3 animate-fadeIn">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pre-Footer Conversion Stage */}
      <section className="w-full px-4 sm:px-6 lg:px-12 py-16 bg-[#f5eedd]/60 border-t border-[#ede3cf]" id="pre-footer-cta">
        <div className="max-w-7xl mx-auto">
          <div className="relative bg-white p-8 sm:p-12 lg:p-16 rounded-3xl border border-[#ede3cf] shadow-sm overflow-hidden text-center flex flex-col items-center">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#fef3c7] blur-3xl pointer-events-none opacity-60"></div>

            <div className="relative z-10 flex flex-col items-center max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#fef3c7] text-[#92400e] font-mono text-xs font-bold uppercase tracking-wider mb-4">
                <span className="w-2 h-2 rounded-full bg-[#d97706]"></span>
                <span>Instant Setup</span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111827] tracking-tight mb-4">
                Ready to transform how your organization meets?
              </h2>

              <p className="text-base text-[#4b5563] max-w-2xl mb-8 leading-relaxed">
                Spin up a clean-room workspace in under 60 seconds or configure an audited sovereign cluster with our solutions architecture team.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={onStartFree}
                  className="px-8 py-3.5 rounded-full bg-[#d97706] hover:bg-[#b45309] text-white font-mono text-xs sm:text-sm font-bold shadow-md amber-glow transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Start Free Today</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={onOpenSlaModal}
                  className="px-6 py-3.5 rounded-full bg-white text-[#111827] font-mono text-xs sm:text-sm font-semibold border border-[#ede3cf] hover:bg-[#f5eedd] transition-colors flex items-center gap-2 shadow-sm cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-[#d97706]" />
                  <span>Schedule Architecture Demo</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
