import React from 'react';
import { Video, Globe, Shield } from 'lucide-react';

interface FooterProps {
  onOpenWhiteboard: () => void;
  onOpenMeetingRoom: () => void;
  onOpenSlaModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenWhiteboard,
  onOpenMeetingRoom,
  onOpenSlaModal,
}) => {
  return (
    <footer className="w-full bg-[#fae8b8] text-[#443818] border-t border-[#ebd7a5]">
      <div className="w-full px-4 sm:px-6 lg:px-12 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {/* Logo & Bio */}
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#d97706] to-[#b45309] text-white flex items-center justify-center shadow-sm">
                <Video className="w-4 h-4 text-white" />
              </div>
              <span className="font-display font-extrabold text-lg tracking-tight text-[#111827]">
                Meeting <span className="text-[#d97706]">OS</span>
              </span>
            </div>

            <p className="text-xs text-[#504323] mb-4 max-w-sm leading-relaxed">
              A clean-room meeting operating system combining real-time collaboration, scheduled runs of show, LiveKit SFU media, interactive whiteboards, and auditable memory.
            </p>

            <div className="flex items-center gap-2 text-xs font-mono text-[#78350f]">
              <Shield className="w-3.5 h-3.5 text-[#d97706]" />
              <span>Independent clean-room architecture · India SFU Edge</span>
            </div>
          </div>

          {/* Column 1: Products */}
          <div>
            <h3 className="font-mono text-xs text-[#111827] font-bold uppercase tracking-wider mb-3">
              Products
            </h3>
            <ul className="space-y-2 text-xs text-[#504323]">
              <li>
                <button
                  onClick={onOpenMeetingRoom}
                  className="hover:text-[#92400e] text-left transition-colors"
                >
                  Meetings & Stage
                </button>
              </li>
              <li>
                <a href="#agenda-section" className="hover:text-[#92400e] transition-colors">
                  Run of Show
                </a>
              </li>
              <li>
                <span className="hover:text-[#92400e] cursor-pointer">Cloud Phone</span>
              </li>
              <li>
                <button
                  onClick={onOpenWhiteboard}
                  className="hover:text-[#92400e] text-left font-bold text-[#92400e] transition-colors"
                >
                  Interactive Whiteboard ★
                </button>
              </li>
              <li>
                <span className="hover:text-[#92400e] cursor-pointer">Rooms & Workspaces</span>
              </li>
            </ul>
          </div>

          {/* Column 2: Architecture */}
          <div>
            <h3 className="font-mono text-xs text-[#111827] font-bold uppercase tracking-wider mb-3">
              Architecture
            </h3>
            <ul className="space-y-2 text-xs text-[#504323]">
              <li>
                <a href="#architecture-section" className="hover:text-[#92400e] transition-colors">
                  Control Plane
                </a>
              </li>
              <li>
                <a href="#architecture-section" className="hover:text-[#92400e] transition-colors">
                  Realtime Plane
                </a>
              </li>
              <li>
                <a href="#architecture-section" className="hover:text-[#92400e] transition-colors">
                  Media Plane (LiveKit)
                </a>
              </li>
              <li>
                <a href="#architecture-section" className="hover:text-[#92400e] transition-colors">
                  PostgreSQL RLS
                </a>
              </li>
              <li>
                <a href="#architecture-section" className="hover:text-[#92400e] transition-colors">
                  Tenant Isolation
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Principles */}
          <div>
            <h3 className="font-mono text-xs text-[#111827] font-bold uppercase tracking-wider mb-3">
              Principles
            </h3>
            <ul className="space-y-2 text-xs text-[#504323]">
              <li>
                <a href="#principles-section" className="hover:text-[#92400e] transition-colors">
                  Consent Before Capture
                </a>
              </li>
              <li>
                <a href="#principles-section" className="hover:text-[#92400e] transition-colors">
                  Human In Control
                </a>
              </li>
              <li>
                <a href="#principles-section" className="hover:text-[#92400e] transition-colors">
                  Honest Delivery Status
                </a>
              </li>
              <li>
                <button onClick={onOpenSlaModal} className="hover:text-[#92400e] text-left">
                  Security & Trust
                </button>
              </li>
              <li>
                <span className="hover:text-[#92400e] cursor-pointer">Audit Vault</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Company */}
          <div>
            <h3 className="font-mono text-xs text-[#111827] font-bold uppercase tracking-wider mb-3">
              Company
            </h3>
            <ul className="space-y-2 text-xs text-[#504323]">
              <li>
                <span className="hover:text-[#92400e] cursor-pointer">About Us</span>
              </li>
              <li>
                <span className="hover:text-[#92400e] cursor-pointer">Careers</span>
              </li>
              <li>
                <span className="hover:text-[#92400e] cursor-pointer">Press Releases</span>
              </li>
              <li>
                <span className="hover:text-[#92400e] cursor-pointer">Partners</span>
              </li>
              <li>
                <span className="hover:text-[#92400e] cursor-pointer">Investors</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-[#ebd7a5] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#504323]">
          <div className="flex flex-wrap items-center gap-4">
            <span>© 2026 Communications, Inc. All rights reserved.</span>
            <span className="hover:text-[#92400e] cursor-pointer">Privacy</span>
            <span className="hover:text-[#92400e] cursor-pointer">Legal Policies</span>
            <button onClick={onOpenSlaModal} className="hover:text-[#92400e] text-left">
              Trust Center & SLA
            </button>
            <span className="hover:text-[#92400e] cursor-pointer">Cookie Preferences</span>
          </div>

          <div className="flex items-center gap-2 font-mono text-[11px] text-[#443818]">
            <Globe className="w-3.5 h-3.5 text-[#92400e]" />
            <span>India / Global (INR ₹ Supported)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
