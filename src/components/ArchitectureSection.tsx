import React from 'react';
import { ShieldCheck, ArrowRightLeft, Radio, Server, CheckCircle2, Terminal } from 'lucide-react';

interface ArchitectureSectionProps {
  onOpenSlaModal: () => void;
}

export const ArchitectureSection: React.FC<ArchitectureSectionProps> = ({ onOpenSlaModal }) => {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-12 py-16 bg-white border-t border-[#ede3cf]" id="architecture-section">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-[#92400e] font-bold uppercase tracking-widest mb-2">
            <span>03</span>
            <span>·</span>
            <span>SYSTEM ARCHITECTURE</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight mb-3">
            Designed as a system of clear boundaries.
          </h2>

          <p className="text-base text-[#4b5563] leading-relaxed">
            Meeting OS physically isolates governance, state transmission, and video SFU transport into dedicated planes, eliminating cross-tenant data spillage.
          </p>
        </div>

        {/* 3 Plane Architecture Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Plane 01: Control Plane */}
          <div className="bg-[#fbf7ee] p-6 sm:p-8 rounded-2xl border border-[#ede3cf] flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs uppercase tracking-wider text-[#92400e] font-bold">
                  Plane 01
                </span>
                <ShieldCheck className="w-6 h-6 text-[#d97706]" />
              </div>

              <h3 className="font-display text-2xl font-bold text-[#111827] mb-2">
                Control Plane
              </h3>

              <p className="text-xs sm:text-sm text-[#4b5563] mb-6 leading-relaxed">
                Manages tenant identity, role-based meeting admissions, agenda schemas, and audit vaults.
              </p>

              <ul className="space-y-2 mb-6 text-xs text-[#4b5563]">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d97706]"></span>
                  <span>PostgreSQL Row-Level Security (RLS)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d97706]"></span>
                  <span>SAML 2.0 / OIDC enterprise sign-on</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d97706]"></span>
                  <span>Cryptographic audit trail signing</span>
                </li>
              </ul>
            </div>

            <div className="p-3 rounded-lg bg-white border border-[#ede3cf] text-[#111827] font-mono text-[11px] font-semibold flex items-center justify-between">
              <span>STATUS: STRICT_ISOLATION_OK</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            </div>
          </div>

          {/* Plane 02: Realtime Plane */}
          <div className="bg-[#fbf7ee] p-6 sm:p-8 rounded-2xl border border-[#ede3cf] flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs uppercase tracking-wider text-[#92400e] font-bold">
                  Plane 02
                </span>
                <ArrowRightLeft className="w-6 h-6 text-[#d97706]" />
              </div>

              <h3 className="font-display text-2xl font-bold text-[#111827] mb-2">
                Realtime Plane
              </h3>

              <p className="text-xs sm:text-sm text-[#4b5563] mb-6 leading-relaxed">
                Low-latency collaborative fabric synchronizing stage state, agendas, hands, and canvas annotations.
              </p>

              <ul className="space-y-2 mb-6 text-xs text-[#4b5563]">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d97706]"></span>
                  <span>Distributed CRDT document sync</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d97706]"></span>
                  <span>WebSocket mesh with fallback</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d97706]"></span>
                  <span>Sub-20ms edge propagation</span>
                </li>
              </ul>
            </div>

            <div className="p-3 rounded-lg bg-white border border-[#ede3cf] text-[#111827] font-mono text-[11px] font-semibold flex items-center justify-between">
              <span>STATUS: 18ms_SYNC_MESH</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            </div>
          </div>

          {/* Plane 03: Media Plane (LiveKit) */}
          <div className="bg-[#fbf7ee] p-6 sm:p-8 rounded-2xl border border-[#ede3cf] flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs uppercase tracking-wider text-[#92400e] font-bold">
                  Plane 03
                </span>
                <Radio className="w-6 h-6 text-[#d97706]" />
              </div>

              <h3 className="font-display text-2xl font-bold text-[#111827] mb-2">
                Media Plane (LiveKit)
              </h3>

              <p className="text-xs sm:text-sm text-[#4b5563] mb-6 leading-relaxed">
                Next-generation Selective Forwarding Unit (SFU) audio and 4K video transport cluster.
              </p>

              <ul className="space-y-2 mb-6 text-xs text-[#4b5563]">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d97706]"></span>
                  <span>LiveKit SFU global auto-routing</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d97706]"></span>
                  <span>Simulcast adaptive bitrate encoding</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d97706]"></span>
                  <span>Zero audio persistence without consent</span>
                </li>
              </ul>
            </div>

            <div className="p-3 rounded-lg bg-white border border-[#ede3cf] text-[#111827] font-mono text-[11px] font-semibold flex items-center justify-between">
              <span>STATUS: LIVEKIT_SFU_ONLINE</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            </div>
          </div>
        </div>

        {/* Architecture Topology Strip */}
        <div className="p-6 rounded-2xl bg-[#fbf7ee] border border-[#ede3cf] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-white border border-[#ede3cf] flex items-center justify-center text-[#d97706] shrink-0">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-display font-bold text-sm sm:text-base text-[#111827]">
                Want to deploy an air-gapped sovereign cluster?
              </h4>
              <p className="text-xs text-[#6b7280]">
                We provide Helm charts and AWS GovCloud / Azure Confidential Cloud deployment scripts with Indian data residency.
              </p>
            </div>
          </div>

          <button
            onClick={onOpenSlaModal}
            className="px-5 py-2.5 rounded-full bg-white text-[#111827] font-mono text-xs font-semibold border border-[#ede3cf] hover:bg-[#f5eedd] transition-colors whitespace-nowrap shadow-sm cursor-pointer"
          >
            Read Deployment Spec →
          </button>
        </div>
      </div>
    </section>
  );
};
