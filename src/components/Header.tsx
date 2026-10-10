import React, { useState } from 'react';
import {
  Search,
  Globe,
  Grid,
  PenTool,
  Video,
  User,
  Shield,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  Lock,
  ArrowRight,
  Monitor,
  Phone,
  DoorOpen,
  Calendar,
  Check,
  Activity
} from 'lucide-react';

interface HeaderProps {
  onOpenWhiteboard: () => void;
  onOpenMeetingRoom: (code?: string) => void;
  onOpenSignIn: () => void;
  onOpenSlaModal: () => void;
  onOpenHardwareTest: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenWhiteboard,
  onOpenMeetingRoom,
  onOpenSignIn,
  onOpenSlaModal,
  onOpenHardwareTest,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState<boolean>(false);
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [productDropdownOpen, setProductDropdownOpen] = useState<boolean>(false);
  const [hostDropdownOpen, setHostDropdownOpen] = useState<boolean>(false);
  const [appSwitcherOpen, setAppSwitcherOpen] = useState<boolean>(false);
  const [languageOpen, setLanguageOpen] = useState<boolean>(false);
  const [selectedLang, setSelectedLang] = useState<string>('English (India - INR ₹)');

  const logoSrc = "https://lh3.googleusercontent.com/aida/AEtjO1UoXv7wzbpnBhvQ0ENkrulRx6SCuJ6pfNSTzlor1CuXaYJp2PFi3Yx1NNy6iteGiOgIWFuYsdQWVByffv9BuKQI6nnXQ6aSLUtngW4iBn6F81f0_BeDyFHXYSUYSxJmYVmfHSIJQjb1_jpvxMWov1iA_CfvmGnPP0RZAmuhq8dyNjZFw6YMyc8lpkVLvbWFxYrWllTbjxrqLpzIu-KsPNUcwWMVEvUUMnDe7kzG3nU";
  const avatarSrc = "https://lh3.googleusercontent.com/aida-public/AB6AXuBkcH85qBH3fw_Wd7GQdYtsH4kvDDShsqyOTCtaDce9PIvXNDBzIVIRmSAaxrNFp6Mi0XdyAkRiEOwdb4JsxPb-yBRFprAZDX5G2GFH53HQtLiAOJGXjYZuKOqvbRsPsDsr0TNDay5-WYmDM7lG7XrbR9OZUe6xaq4_A_seqFbElsHrWhy6oEcEUOkFTAkX_uSG67DJHj_ntWi8vkd9irD4EPYUTrJUJB9pqoul0U4";

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-[#fae8b8]/95 backdrop-blur-xl border-b border-[#ebd7a5] shadow-[0_2px_15px_rgba(180,130,50,0.08)]">
        {/* Top Notice Banner */}
        <div className="bg-[#f5e1a4] text-[#443818] px-4 lg:px-8 py-1.5 text-center flex items-center justify-center gap-2 border-b border-[#ebd7a5]">
          <span className="font-mono text-xs text-[#3e2c04] font-medium">
            A Meeting Operating System — Clean-room product architecture.
          </span>
          <a
            href="#product-workflow"
            className="font-mono text-xs text-[#92400e] hover:text-[#78350f] underline decoration-[#ca8a04]/50 hover:decoration-[#78350f] transition-colors font-semibold"
          >
            Explore Platform
          </a>
        </div>

        {/* Main Navigation Bar */}
        <div className="h-16 w-full px-4 lg:px-8 flex items-center justify-between gap-4">
          {/* Left Brand & Navigation Menu */}
          <div className="flex items-center gap-6 xl:gap-8">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2 py-1 shrink-0">
              <img
                alt="Meeting OS Logo"
                className="h-8 w-auto object-contain filter contrast-125"
                src={logoSrc}
                onError={(e) => {
                  // Fallback if network blocked
                  e.currentTarget.style.display = 'none';
                  const fb = e.currentTarget.nextElementSibling;
                  if (fb) fb.classList.remove('hidden');
                }}
              />
              <div className="hidden flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#ca8a04] text-white flex items-center justify-center font-bold">
                  <Video className="w-4 h-4" />
                </div>
                <span className="font-display font-bold text-lg text-[#111827]">
                  Meeting OS
                </span>
              </div>
            </a>

            {/* Nav Links */}
            <nav className="hidden xl:flex items-center gap-6 text-xs font-mono font-medium">
              {/* 01 Product Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setProductDropdownOpen(!productDropdownOpen)}
                  onBlur={() => setTimeout(() => setProductDropdownOpen(false), 200)}
                  className="text-[#3f3115] hover:text-[#111827] transition-colors flex items-center gap-1 py-1 cursor-pointer"
                >
                  <span>01 Product ▾</span>
                </button>

                {productDropdownOpen && (
                  <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-xl shadow-xl border border-[#ebd7a5] p-2 text-xs z-50 animate-fadeIn">
                    <button
                      onClick={() => onOpenMeetingRoom()}
                      className="w-full text-left p-2 rounded-lg hover:bg-[#fbf7ee] flex items-center gap-2.5 text-[#111827]"
                    >
                      <Video className="w-4 h-4 text-[#d97706]" />
                      <div>
                        <div className="font-bold">Meetings & Stage</div>
                        <div className="text-[10px] text-[#6b7280]">LiveKit SFU 4K streaming</div>
                      </div>
                    </button>
                    <a
                      href="#agenda-section"
                      className="w-full text-left p-2 rounded-lg hover:bg-[#fbf7ee] flex items-center gap-2.5 text-[#111827]"
                    >
                      <Calendar className="w-4 h-4 text-[#d97706]" />
                      <div>
                        <div className="font-bold">Run of Show</div>
                        <div className="text-[10px] text-[#6b7280]">Real-time synchronized agenda</div>
                      </div>
                    </a>
                    <button
                      onClick={onOpenWhiteboard}
                      className="w-full text-left p-2 rounded-lg hover:bg-[#fef3c7] flex items-center gap-2.5 text-[#92400e] font-bold"
                    >
                      <PenTool className="w-4 h-4 text-[#d97706]" />
                      <div>
                        <div className="font-bold text-[#111827]">Interactive Whiteboard ★</div>
                        <div className="text-[10px] text-[#92400e]">Live collaborative canvas</div>
                      </div>
                    </button>
                    <button
                      onClick={onOpenHardwareTest}
                      className="w-full text-left p-2 rounded-lg hover:bg-[#fbf7ee] flex items-center gap-2.5 text-[#111827]"
                    >
                      <Activity className="w-4 h-4 text-[#d97706]" />
                      <div>
                        <div className="font-bold">Hardware Check</div>
                        <div className="text-[10px] text-[#6b7280]">Mic, camera & acoustic speakers</div>
                      </div>
                    </button>
                    <a
                      href="#architecture-section"
                      className="w-full text-left p-2 rounded-lg hover:bg-[#fbf7ee] flex items-center gap-2.5 text-[#111827]"
                    >
                      <DoorOpen className="w-4 h-4 text-[#d97706]" />
                      <div>
                        <div className="font-bold">Rooms & Workspaces</div>
                        <div className="text-[10px] text-[#6b7280]">Neat, Poly, Logitech integrations</div>
                      </div>
                    </a>
                  </div>
                )}
              </div>

              {/* 02 Agenda */}
              <a
                href="#agenda-section"
                className="text-[#92400e] font-bold hover:text-[#78350f] transition-colors"
              >
                02 Agenda
              </a>

              {/* 03 Architecture */}
              <a
                href="#architecture-section"
                className="text-[#3f3115] hover:text-[#111827] transition-colors"
              >
                03 Architecture
              </a>

              {/* 04 Principles */}
              <a
                href="#principles-section"
                className="text-[#3f3115] hover:text-[#111827] transition-colors"
              >
                04 Principles
              </a>

              {/* Quick Join */}
              <a
                href="#quick-join"
                className="text-[#3f3115] hover:text-[#111827] transition-colors"
              >
                Quick Join
              </a>

              {/* Hardware Test Link */}
              <button
                onClick={onOpenHardwareTest}
                className="text-[#3f3115] hover:text-[#111827] transition-colors cursor-pointer flex items-center gap-1"
                title="Verify Camera, Mic & Audio"
              >
                <Activity className="w-3.5 h-3.5 text-[#d97706]" />
                <span>Hardware Check</span>
              </button>

              {/* Working Whiteboard Nav Button (Requested in Turn 1) */}
              <button
                onClick={onOpenWhiteboard}
                className="px-2.5 py-1 rounded-full bg-white/80 hover:bg-white text-[#92400e] border border-[#ebd7a5] shadow-xs transition-colors flex items-center gap-1.5 font-bold cursor-pointer"
                title="Launch Collaborative Whiteboard"
              >
                <PenTool className="w-3.5 h-3.5 text-[#d97706]" />
                <span>Whiteboard</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              </button>
            </nav>
          </div>

          {/* Right Action Cluster */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Search, Language, App Switcher Icons */}
            <div className="hidden md:flex items-center gap-1 text-[#5c491b]">
              {/* Search */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                aria-label="Search"
                className="p-1.5 rounded-full hover:bg-[#edd495] hover:text-[#111827] transition-colors flex items-center justify-center cursor-pointer"
                title="Search Sessions & Docs"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Language Selector */}
              <div className="relative">
                <button
                  onClick={() => setLanguageOpen(!languageOpen)}
                  aria-label="Language Selector"
                  className="p-1.5 rounded-full hover:bg-[#edd495] hover:text-[#111827] transition-colors flex items-center justify-center cursor-pointer"
                  title="Language & Currency"
                >
                  <Globe className="w-4 h-4" />
                </button>

                {languageOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-[#ebd7a5] p-2 text-xs z-50">
                    <div className="font-bold text-[#111827] px-2 py-1 border-b border-[#ebd7a5] mb-1 font-mono text-[11px]">
                      Region & Currency
                    </div>
                    {['English (India - INR ₹)', 'English (US - USD $)', 'Hindi (भारत - ₹)'].map((l) => (
                      <button
                        key={l}
                        onClick={() => {
                          setSelectedLang(l);
                          setLanguageOpen(false);
                        }}
                        className="w-full text-left p-2 rounded hover:bg-[#fbf7ee] flex items-center justify-between text-[#111827]"
                      >
                        <span>{l}</span>
                        {selectedLang === l && <Check className="w-3.5 h-3.5 text-[#d97706]" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* App Switcher */}
              <div className="relative">
                <button
                  onClick={() => setAppSwitcherOpen(!appSwitcherOpen)}
                  aria-label="App Switcher"
                  className="p-1.5 rounded-full hover:bg-[#edd495] hover:text-[#111827] transition-colors flex items-center justify-center cursor-pointer"
                  title="Meeting OS Suite Apps"
                >
                  <Grid className="w-4 h-4" />
                </button>

                {appSwitcherOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-[#ebd7a5] p-3 text-xs z-50 grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        setAppSwitcherOpen(false);
                        onOpenMeetingRoom();
                      }}
                      className="p-2.5 rounded-lg border border-[#ebd7a5] hover:bg-[#fef3c7] text-center flex flex-col items-center gap-1.5 text-[#111827]"
                    >
                      <Video className="w-5 h-5 text-[#d97706]" />
                      <span className="font-bold text-[11px]">Meeting Stage</span>
                    </button>
                    <button
                      onClick={() => {
                        setAppSwitcherOpen(false);
                        onOpenWhiteboard();
                      }}
                      className="p-2.5 rounded-lg border border-[#ebd7a5] hover:bg-[#fef3c7] text-center flex flex-col items-center gap-1.5 text-[#92400e]"
                    >
                      <PenTool className="w-5 h-5 text-[#d97706]" />
                      <span className="font-bold text-[11px]">Whiteboard ★</span>
                    </button>
                    <button
                      onClick={() => {
                        setAppSwitcherOpen(false);
                        onOpenMeetingRoom('webinar-cast');
                      }}
                      className="p-2.5 rounded-lg border border-[#ebd7a5] hover:bg-[#fbf7ee] text-center flex flex-col items-center gap-1.5 text-[#111827]"
                    >
                      <Monitor className="w-5 h-5 text-[#d97706]" />
                      <span className="font-medium text-[11px]">Webinars Cast</span>
                    </button>
                    <button
                      onClick={() => {
                        setAppSwitcherOpen(false);
                        onOpenSlaModal();
                      }}
                      className="p-2.5 rounded-lg border border-[#ebd7a5] hover:bg-[#fbf7ee] text-center flex flex-col items-center gap-1.5 text-[#111827]"
                    >
                      <Shield className="w-5 h-5 text-emerald-600" />
                      <span className="font-medium text-[11px]">Trust Vault</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Host a Meeting ▾ Dropdown */}
            <div className="relative hidden lg:inline-block">
              <button
                onClick={() => setHostDropdownOpen(!hostDropdownOpen)}
                onBlur={() => setTimeout(() => setHostDropdownOpen(false), 200)}
                className="font-mono text-xs text-[#3f3115] hover:text-[#111827] px-2 py-1 transition-colors cursor-pointer"
              >
                Host a Meeting ▾
              </button>

              {hostDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-[#ebd7a5] p-2 text-xs z-50 animate-fadeIn">
                  <button
                    onClick={() => onOpenMeetingRoom('instant-host')}
                    className="w-full text-left p-2 rounded-lg hover:bg-[#fbf7ee] text-[#111827] font-semibold flex items-center justify-between"
                  >
                    <span>Instant Stage Room</span>
                    <Video className="w-3.5 h-3.5 text-[#d97706]" />
                  </button>
                  <button
                    onClick={() => onOpenMeetingRoom('screen-share-deck')}
                    className="w-full text-left p-2 rounded-lg hover:bg-[#fbf7ee] text-[#111827] flex items-center justify-between"
                  >
                    <span>Screen Share Session</span>
                    <Monitor className="w-3.5 h-3.5 text-[#d97706]" />
                  </button>
                  <button
                    onClick={onOpenWhiteboard}
                    className="w-full text-left p-2 rounded-lg hover:bg-[#fef3c7] text-[#92400e] font-bold flex items-center justify-between"
                  >
                    <span>Whiteboard Session</span>
                    <PenTool className="w-3.5 h-3.5 text-[#d97706]" />
                  </button>
                </div>
              )}
            </div>

            {/* Sign In */}
            <button
              onClick={onOpenSignIn}
              className="font-mono text-xs text-[#3f3115] hover:text-[#111827] px-2 py-1 transition-colors cursor-pointer"
            >
              Sign In
            </button>

            {/* Enterprise SLA */}
            <button
              onClick={onOpenSlaModal}
              className="hidden sm:inline-flex items-center justify-center px-3.5 py-1 rounded-full font-mono text-xs text-[#1c1917] bg-white/90 hover:bg-white border border-[#ebd7a5] shadow-xs transition-colors font-medium cursor-pointer"
            >
              Enterprise SLA
            </button>

            {/* Start Free */}
            <button
              onClick={() => onOpenMeetingRoom()}
              className="inline-flex items-center justify-center px-5 py-1 rounded-full font-mono text-xs text-white bg-[#ca8a04] hover:bg-[#b45309] amber-glow transition-all font-bold cursor-pointer"
            >
              Start Free
            </button>

            {/* Profile Avatar with exact ring and image */}
            <div className="relative flex items-center ml-1">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center cursor-pointer"
                title="Account Menu"
              >
                <img
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-[#d97706] shadow-sm hover:scale-105 transition-transform"
                  src={avatarSrc}
                  onError={(e) => {
                    // Fallback avatar if external domain blocked
                    e.currentTarget.style.display = 'none';
                    const fallback = e.currentTarget.nextElementSibling;
                    if (fallback) fallback.classList.remove('hidden');
                  }}
                />
                <div className="hidden w-8 h-8 rounded-full bg-gradient-to-tr from-[#d97706] to-[#fbbf24] text-white flex items-center justify-center text-xs font-bold ring-2 ring-[#d97706]">
                  YO
                </div>
              </button>

              {profileDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-[#ebd7a5] p-2 text-xs z-50 animate-fadeIn">
                  <div className="p-2 border-b border-[#ebd7a5] mb-1">
                    <div className="font-bold text-[#111827]">Elena Rostova</div>
                    <div className="text-[11px] text-[#6b7280]">elena.rostova@meeting-os.com</div>
                    <div className="text-[10px] text-[#d97706] font-mono font-bold mt-0.5">
                      Sovereign Stage Admin
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      onOpenMeetingRoom();
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-[#fbf7ee] text-[#111827] flex items-center justify-between"
                  >
                    <span>Instant Stage</span>
                    <Video className="w-3.5 h-3.5 text-[#d97706]" />
                  </button>
                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      onOpenWhiteboard();
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-[#fef3c7] text-[#92400e] font-semibold flex items-center justify-between"
                  >
                    <span>Whiteboard Studio</span>
                    <PenTool className="w-3.5 h-3.5 text-[#d97706]" />
                  </button>
                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      onOpenSlaModal();
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-[#fbf7ee] text-[#111827] flex items-center justify-between"
                  >
                    <span>Enterprise SLA Spec</span>
                    <Shield className="w-3.5 h-3.5 text-emerald-600" />
                  </button>
                  <div className="border-t border-[#ebd7a5] my-1"></div>
                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      onOpenSignIn();
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-neutral-100 text-[#6b7280]"
                  >
                    Sign Out / Switch Account
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Hamburger Menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-1.5 rounded-lg text-[#3f3115] hover:bg-[#edd495] cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Search Drawer */}
        {searchOpen && (
          <div className="bg-white px-4 lg:px-8 py-2.5 border-t border-[#ebd7a5] flex items-center gap-2">
            <Search className="w-4 h-4 text-[#6b7280]" />
            <input
              type="text"
              placeholder="Search stage sessions, live agendas, or whiteboard diagrams..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs font-mono outline-none bg-transparent"
              autoFocus
            />
            <button
              onClick={() => setSearchOpen(false)}
              className="text-xs font-mono text-[#6b7280] hover:text-black cursor-pointer"
            >
              Close
            </button>
          </div>
        )}

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-[#fae8b8] px-4 py-4 border-t border-[#ebd7a5] space-y-3 text-xs font-mono">
            {/* Whiteboard direct launcher on mobile */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenWhiteboard();
              }}
              className="w-full py-2.5 px-3 rounded-lg bg-white font-bold text-[#92400e] border border-[#ebd7a5] flex items-center justify-between shadow-xs cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <PenTool className="w-4 h-4 text-[#d97706]" />
                Interactive Whiteboard
              </span>
              <span className="text-[10px] bg-[#fef3c7] px-2 py-0.5 rounded text-[#92400e] font-bold">Open Canvas</span>
            </button>

            <a
              href="#product-workflow"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1.5 text-[#3f3115] hover:text-[#111827]"
            >
              01 Product ▾
            </a>
            <a
              href="#agenda-section"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1.5 text-[#92400e] font-bold hover:text-[#78350f]"
            >
              02 Agenda
            </a>
            <a
              href="#architecture-section"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1.5 text-[#3f3115] hover:text-[#111827]"
            >
              03 Architecture
            </a>
            <a
              href="#principles-section"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1.5 text-[#3f3115] hover:text-[#111827]"
            >
              04 Principles
            </a>
            <a
              href="#quick-join"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1.5 text-[#3f3115] hover:text-[#111827]"
            >
              Quick Join
            </a>

            <div className="pt-2 border-t border-[#ebd7a5] flex gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenMeetingRoom();
                }}
                className="flex-1 py-2 rounded-lg bg-[#ca8a04] text-white font-bold text-center cursor-pointer"
              >
                Start Free
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSignIn();
                }}
                className="flex-1 py-2 rounded-lg bg-white border border-[#ebd7a5] text-center cursor-pointer"
              >
                Sign In
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
