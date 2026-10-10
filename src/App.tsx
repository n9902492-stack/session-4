/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ProductContinuum } from './components/ProductContinuum';
import { RunOfShowSection } from './components/RunOfShowSection';
import { ArchitectureSection } from './components/ArchitectureSection';
import { PrinciplesSection } from './components/PrinciplesSection';
import { PricingSection } from './components/PricingSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { WhiteboardModal } from './components/WhiteboardModal';
import { MeetingRoomModal } from './components/MeetingRoomModal';
import { SignInModal } from './components/SignInModal';
import { EnterpriseSlaModal } from './components/EnterpriseSlaModal';
import { HardwareTestPage } from './components/HardwareTestPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'hardware-test'>('landing');
  const [isWhiteboardOpen, setIsWhiteboardOpen] = useState<boolean>(false);
  const [isMeetingRoomOpen, setIsMeetingRoomOpen] = useState<boolean>(false);
  const [activeSessionCode, setActiveSessionCode] = useState<string>('product-review-alpha');
  const [isSignInOpen, setIsSignInOpen] = useState<boolean>(false);
  const [isSlaModalOpen, setIsSlaModalOpen] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<string | null>('Sovereign Operator');

  const handleStartSession = (code?: string) => {
    if (code) {
      setActiveSessionCode(code);
    }
    setIsMeetingRoomOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf7ee] text-[#111827] selection:bg-[#f59e0b]/30 selection:text-[#111827]">
      {/* Top Fixed Header with Working Whiteboard Link */}
      <Header
        onOpenWhiteboard={() => setIsWhiteboardOpen(true)}
        onOpenMeetingRoom={handleStartSession}
        onOpenSignIn={() => setIsSignInOpen(true)}
        onOpenSlaModal={() => setIsSlaModalOpen(true)}
        onOpenHardwareTest={() => setCurrentPage('hardware-test')}
      />

      {/* Main Content Sections (with top padding for fixed header) */}
      <main className="flex-1 w-full pt-20">
        {currentPage === 'hardware-test' ? (
          /* Hardware Pre-Flight Verification Page (Matches Uploaded Screenshot) */
          <HardwareTestPage
            onBackToLanding={() => setCurrentPage('landing')}
            onJoinMeeting={() => {
              setCurrentPage('landing');
              handleStartSession('hardware-verified-stage');
            }}
          />
        ) : (
          /* Standard Landing Page */
          <>
            {/* Hero Section & Quick Join Stage */}
            <HeroSection
              onStartSession={handleStartSession}
              onOpenWhiteboard={() => setIsWhiteboardOpen(true)}
              onOpenHardwareTest={() => setCurrentPage('hardware-test')}
            />

            {/* 01 Product Continuum */}
            <ProductContinuum />

            {/* 02 Agenda & Run of Show */}
            <RunOfShowSection />

            {/* 03 System Architecture (3 Planes) */}
            <ArchitectureSection onOpenSlaModal={() => setIsSlaModalOpen(true)} />

            {/* 04 Core Principles & Unified Suite */}
            <PrinciplesSection />

            {/* Transparent Pricing in Rupees (₹) with Customizer */}
            <PricingSection onSelectPlan={(plan) => handleStartSession(`trial-${plan}`)} />

            {/* Frequently Answered Inquiries & Pre-Footer CTA */}
            <FaqSection
              onStartFree={() => handleStartSession('instant-stage')}
              onOpenSlaModal={() => setIsSlaModalOpen(true)}
            />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer
        onOpenWhiteboard={() => setIsWhiteboardOpen(true)}
        onOpenMeetingRoom={() => handleStartSession()}
        onOpenSlaModal={() => setIsSlaModalOpen(true)}
      />

      {/* Working Interactive Canvas Whiteboard Modal */}
      <WhiteboardModal
        isOpen={isWhiteboardOpen}
        onClose={() => setIsWhiteboardOpen(false)}
      />

      {/* Full Live Meeting & Webinar Stage Modal (Screen Share + Real-Time Recording) */}
      <MeetingRoomModal
        isOpen={isMeetingRoomOpen}
        onClose={() => setIsMeetingRoomOpen(false)}
        sessionCode={activeSessionCode}
        isWebinarMode={true}
      />

      {/* Sign In / Register Modal */}
      <SignInModal
        isOpen={isSignInOpen}
        onClose={() => setIsSignInOpen(false)}
        onSuccess={(email) => {
          setCurrentUser(email);
        }}
      />

      {/* Enterprise SLA Modal */}
      <EnterpriseSlaModal
        isOpen={isSlaModalOpen}
        onClose={() => setIsSlaModalOpen(false)}
      />
    </div>
  );
}
