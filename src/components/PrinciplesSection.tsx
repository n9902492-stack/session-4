import React from 'react';
import {
  ShieldAlert,
  Fingerprint,
  UserCheck,
  CheckCircle2,
  Tv,
  Brain,
  MessageSquare,
  MonitorCheck,
  Lock,
  Code2
} from 'lucide-react';

export const PrinciplesSection: React.FC = () => {
  const tenets = [
    {
      icon: ShieldAlert,
      title: 'Tenant Boundaries',
      desc: 'Data never leaks between organizations. Dedicated cryptographic isolation tokens per room instance.',
    },
    {
      icon: Fingerprint,
      title: 'Consent Before Capture',
      desc: 'Zero stealth bots. AI and recording mechanisms require explicit, real-time unshaded approval from all parties.',
    },
    {
      icon: UserCheck,
      title: 'Human in Control',
      desc: 'AI extracts suggestions and draft recaps, but never auto-commits actions without direct human verification.',
    },
    {
      icon: CheckCircle2,
      title: 'Honest Delivery Status',
      desc: 'Transparent network diagnostics. When connection dips occur, all participants get truthful latency readouts.',
    },
  ];

  const features = [
    {
      icon: Tv,
      title: 'HD Video & Canvases',
      desc: 'Collaborative infinite whiteboards alongside 4K video feeds with dynamic speaker highlighting.',
    },
    {
      icon: Brain,
      title: 'Companion Enterprise AI',
      desc: 'Private LLM models hosted in your VPC to synthesize talking points into structured action logs.',
    },
    {
      icon: MessageSquare,
      title: 'Team Chat & Huddles',
      desc: 'Persistent async channels that escalate instantly into zero-friction audio/video huddles.',
    },
    {
      icon: MonitorCheck,
      title: 'Hybrid Rooms & Workspaces',
      desc: 'Works out-of-the-box with Neat, Poly, and Logitech hardware with single-click calendar joins.',
    },
    {
      icon: Lock,
      title: 'Bank-Grade Compliance',
      desc: 'SOC 2 Type II certified, HIPAA compliant with BAA, and fully aligned with GDPR Article 28 data processing.',
    },
    {
      icon: Code2,
      title: 'SDK & Developer APIs',
      desc: 'Embed Meeting OS video tiles, stage agendas, and memory hooks directly into internal workflows.',
    },
  ];

  const partners = ['NETSCALE', 'VOXFLOW', 'SENTINEL', 'DATACROFT', 'MEDISYNC'];

  return (
    <section className="w-full px-4 sm:px-6 lg:px-12 py-16 bg-[#fbf7ee] border-t border-[#ede3cf]" id="principles-section">
      <div className="max-w-7xl mx-auto">
        {/* Core Principles Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-[#92400e] font-bold uppercase tracking-widest mb-2">
            <span>04</span>
            <span>·</span>
            <span>CORE PRINCIPLES</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight mb-3">
            Trust is a product feature, not a legal disclaimer.
          </h2>

          <p className="text-base text-[#4b5563] leading-relaxed">
            We built this operating system under clean-room engineering principles. Security and dignity are baked directly into user controls.
          </p>
        </div>

        {/* 4 Tenet Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {tenets.map((t, idx) => {
            const Icon = t.icon;
            return (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-[#ede3cf] shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#fef3c7] text-[#92400e] flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-[#d97706]" />
                  </div>

                  <h3 className="font-display text-base font-bold text-[#111827] mb-2">
                    {t.title}
                  </h3>

                  <p className="text-xs text-[#4b5563] leading-relaxed">
                    {t.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Social Proof Logo Band */}
        <div className="bg-white px-8 py-6 rounded-2xl border border-[#ede3cf] shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 mb-20">
          <span className="font-mono text-xs uppercase tracking-widest text-[#6b7280]">
            Trusted by sovereign engineering teams
          </span>
          <div className="flex flex-wrap items-center gap-8 sm:gap-12 font-display text-base sm:text-lg font-bold tracking-wider text-[#111827]/70">
            {partners.map((p, i) => (
              <span key={i} className="hover:text-[#111827] transition-colors">
                {p}
              </span>
            ))}
          </div>
        </div>

        {/* Unified Suite Features Grid */}
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight mb-2">
            Built for the enterprise that refuses complexity.
          </h2>
          <p className="text-base text-[#4b5563]">
            Complete stack coverage without the toolchain sprawl.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, idx) => {
            const Icon = f.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-[#ede3cf] shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 rounded-xl bg-[#fef3c7] text-[#92400e] flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-[#d97706]" />
                </div>
                <h4 className="font-display text-base font-bold text-[#111827] mb-2">
                  {f.title}
                </h4>
                <p className="text-xs text-[#4b5563] leading-relaxed">
                  {f.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
