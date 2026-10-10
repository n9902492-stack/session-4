import React from 'react';
import { Calendar, Compass, Database, CheckCircle2, Clock, Sparkles } from 'lucide-react';

export const ProductContinuum: React.FC = () => {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-12 py-16 bg-white border-t border-[#ede3cf]" id="product-workflow">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-[#92400e] font-bold uppercase tracking-widest mb-2">
            <span>01</span>
            <span>·</span>
            <span>PRODUCT CONTINUUM</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight mb-3">
            One continuous workflow, not a pile of disconnected tools.
          </h2>

          <p className="text-base text-[#4b5563] max-w-2xl leading-relaxed">
            Traditional meetings scatter context across calendar invites, doc links, screen shares, and neglected notes. Meeting OS treats every conversation as an unbroken timeline.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1: Plan the Room */}
          <div className="bg-[#fbf7ee] p-6 sm:p-8 rounded-2xl border border-[#ede3cf] flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="w-10 h-10 rounded-xl bg-white border border-[#ede3cf] flex items-center justify-center text-[#92400e] font-mono font-bold text-sm mb-4 shadow-sm">
                01
              </div>

              <h3 className="font-display text-xl font-bold text-[#111827] mb-2">
                Plan the Room
              </h3>

              <p className="text-xs sm:text-sm text-[#4b5563] mb-6 leading-relaxed">
                Assemble timed agendas with hard-bounded blocks, upload sync decks, and declare outcomes before invitations land.
              </p>
            </div>

            {/* Inset Component */}
            <div className="bg-white p-4 rounded-xl border border-[#ede3cf] shadow-sm">
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span className="font-bold text-[#111827]">Pre-Session Deck</span>
                <span className="text-[#d97706] font-semibold">Synced (v4.2)</span>
              </div>
              <div className="w-full bg-[#f5eedd] h-1.5 rounded-full overflow-hidden mb-2">
                <div className="bg-[#d97706] h-full w-4/5 rounded-full"></div>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-[#6b7280]">
                <Clock className="w-3.5 h-3.5 text-[#d97706]" />
                <span>4 items · 45 mins allocated</span>
              </div>
            </div>
          </div>

          {/* Step 2: Guide the Conversation (Active highlight) */}
          <div className="bg-[#fbf7ee] p-6 sm:p-8 rounded-2xl border border-[#d97706]/40 ring-1 ring-[#d97706]/20 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#d97706] text-white flex items-center justify-center font-mono font-bold text-sm mb-4 shadow-sm amber-glow">
                02
              </div>

              <h3 className="font-display text-xl font-bold text-[#111827] mb-2">
                Guide the Conversation
              </h3>

              <p className="text-xs sm:text-sm text-[#4b5563] mb-6 leading-relaxed">
                Drive meetings through an active Stage Controller. Agendas tick in real-time, nudging speakers politely to maintain focus.
              </p>
            </div>

            {/* Inset Component */}
            <div className="bg-white p-4 rounded-xl border border-[#ede3cf] shadow-sm">
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span className="font-bold text-[#111827] flex items-center gap-1.5 truncate">
                  <span className="w-2 h-2 rounded-full bg-[#d97706] animate-pulse"></span>
                  ON STAGE: Prototype Walkthrough
                </span>
                <span className="text-[#6b7280] font-mono text-[11px] shrink-0 ml-2">12:38 left</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-[#6b7280]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>1 queue request · Screen live 1080p</span>
              </div>
            </div>
          </div>

          {/* Step 3: Keep the Decisions */}
          <div className="bg-[#fbf7ee] p-6 sm:p-8 rounded-2xl border border-[#ede3cf] flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="w-10 h-10 rounded-xl bg-white border border-[#ede3cf] flex items-center justify-center text-[#92400e] font-mono font-bold text-sm mb-4 shadow-sm">
                03
              </div>

              <h3 className="font-display text-xl font-bold text-[#111827] mb-2">
                Keep the Decisions
              </h3>

              <p className="text-xs sm:text-sm text-[#4b5563] mb-6 leading-relaxed">
                Human-approved commitments extract seamlessly. Structured decisions dispatch straight to Linear, Jira, and enterprise databases.
              </p>
            </div>

            {/* Inset Component */}
            <div className="bg-white p-4 rounded-xl border border-[#ede3cf] shadow-sm">
              <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                <span className="font-bold text-[#111827]">Dispatch Vault</span>
                <span className="text-[#059669] font-semibold">3 Actions Ready</span>
              </div>
              <div className="text-[11px] text-[#6b7280] truncate font-mono">
                → Dispatched to #eng-deliverables (PG-RLS signed)
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
