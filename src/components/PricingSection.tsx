import React, { useState } from 'react';
import { Check, X, ShieldCheck, Sparkles, Sliders, ArrowRight, Building, CreditCard, CheckCircle2, ChevronRight, FileText } from 'lucide-react';
import { PricingPlan, PricingCustomization } from '../types';

interface PricingSectionProps {
  onSelectPlan?: (planId: string) => void;
  onOpenCheckout?: (details: any) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectPlan }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [showCustomizer, setShowCustomizer] = useState<boolean>(false);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState<boolean>(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState<boolean>(false);

  // Customizer state
  const [customSeats, setCustomSeats] = useState<number>(15);
  const [customPlan, setCustomPlan] = useState<'pro' | 'business'>('business');
  const [recordingVault, setRecordingVault] = useState<boolean>(true);
  const [aiTranscription, setAiTranscription] = useState<boolean>(true);
  const [roomConnectors, setRoomConnectors] = useState<number>(2);
  const [sovereignCloud, setSovereignCloud] = useState<boolean>(false);
  const [prioritySupport, setPrioritySupport] = useState<boolean>(true);

  // Pricing data in Rupees (₹)
  const plans: PricingPlan[] = [
    {
      id: 'starter',
      name: 'Starter',
      monthlyPriceRupees: 0,
      annualPriceRupees: 0,
      description: 'Ideal for individuals needing instant web meetings with zero downloads.',
      features: [
        'Up to 100 participants',
        '40 min session cap',
        'Adaptive WebRTC stream',
        'Zero-download browser execution',
      ],
      omittedFeatures: ['AI Companion Memory', 'LiveKit 4K SFU Recording', 'Run of Show Stage HUD'],
      ctaText: 'Get Started Free',
    },
    {
      id: 'pro',
      name: 'Pro Team',
      monthlyPriceRupees: 1299,
      annualPriceRupees: 1039,
      description: 'Perfect for scaling engineering and product squads that need run of show.',
      features: [
        'Up to 300 participants',
        'Unlimited session duration',
        'Full Run of Show Stage HUD',
        'AI Companion & Live Transcripts',
        '90-Day Meeting Memory retention',
        'Interactive Stage Whiteboard',
      ],
      ctaText: 'Start 14-Day Free Trial',
    },
    {
      id: 'business',
      name: 'Business',
      monthlyPriceRupees: 2299,
      annualPriceRupees: 1839,
      popular: true,
      description: 'Full multi-team governance with enterprise integrations and memory sync.',
      features: [
        'Up to 1,000 participants',
        '4K Stage feeds & LiveKit SFU',
        'Memory Auto-Dispatch (Slack, Jira)',
        'SOC 2 Type II & HIPAA BAA',
        'Room hardware connector support',
        'Real-time encrypted recording downloads',
        'Priority 99.99% uptime SLA',
      ],
      ctaText: 'Upgrade to Business',
    },
    {
      id: 'sovereign',
      name: 'Sovereign',
      monthlyPriceRupees: 39999,
      annualPriceRupees: 31999,
      description: 'Air-gapped and isolated tenant boundaries with custom data residency.',
      features: [
        'Dedicated Control & Media Planes',
        'PostgreSQL RLS cryptographic vault',
        'Bring Your Own Key (BYOK) encryption',
        '24/7 dedicated technical TAM',
        '99.999% SLA uptime contract',
        'Air-gapped AWS / Azure India deployment',
      ],
      ctaText: 'Contact Enterprise Sales',
    },
  ];

  // Calculate customized total in Rupees (₹)
  const baseRatePerSeat = customPlan === 'pro'
    ? (billingCycle === 'annual' ? 1039 : 1299)
    : (billingCycle === 'annual' ? 1839 : 2299);

  const seatSubtotal = customSeats * baseRatePerSeat;
  const recordingVaultCost = recordingVault ? 499 : 0;
  const aiCost = aiTranscription ? customSeats * (billingCycle === 'annual' ? 299 : 399) : 0;
  const roomCost = roomConnectors * (billingCycle === 'annual' ? 1999 : 2499);
  const cloudCost = sovereignCloud ? (billingCycle === 'annual' ? 7999 : 9999) : 0;
  const supportCost = prioritySupport ? (billingCycle === 'annual' ? 3999 : 4999) : 0;

  const monthlySubtotal = seatSubtotal + recordingVaultCost + aiCost + roomCost + cloudCost + supportCost;
  const gstAmount = Math.round(monthlySubtotal * 0.18);
  const totalWithGst = monthlySubtotal + gstAmount;

  const formatRupees = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleOpenCheckoutWithCustom = () => {
    setCheckoutModalOpen(true);
    setCheckoutSuccess(false);
  };

  return (
    <section className="w-full px-4 sm:px-6 lg:px-12 py-16 bg-[#f5eedd]/50 border-t border-[#ede3cf]" id="pricing-plans">
      <div className="max-w-7xl mx-auto">
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fef3c7] text-[#92400e] text-xs font-mono font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#d97706]" />
            <span>TRANSPARENT ENTERPRISE PRICING (INR ₹)</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight mb-3">
            Predictable pricing for high-trust meeting infrastructure.
          </h2>

          <p className="text-base text-[#4b5563] mb-8">
            Choose the right plan for your team in Indian Rupees (₹), from lightweight instant rooms to dedicated sovereign meeting environments.
          </p>

          {/* Monthly / Annual Toggle */}
          <div className="inline-flex items-center gap-3 p-1.5 rounded-full bg-white border border-[#ede3cf] shadow-sm">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-[#111827] text-white shadow-sm'
                  : 'text-[#4b5563] hover:text-[#111827]'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                billingCycle === 'annual'
                  ? 'bg-[#d97706] text-white shadow-md amber-glow font-bold'
                  : 'text-[#4b5563] hover:text-[#111827]'
              }`}
            >
              <span>Annual Billing</span>
              <span className="px-2 py-0.5 rounded-full bg-white text-[#92400e] text-[10px] font-bold">
                SAVE 20%
              </span>
            </button>
          </div>
        </div>

        {/* 4 Tiered Pricing Cards in Rupees */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {plans.map((plan) => {
            const price = billingCycle === 'annual' ? plan.annualPriceRupees : plan.monthlyPriceRupees;

            return (
              <div
                key={plan.id}
                className={`relative bg-white p-6 rounded-2xl border transition-all flex flex-col justify-between ${
                  plan.popular
                    ? 'border-[#d97706] ring-2 ring-[#d97706]/20 shadow-xl'
                    : 'border-[#ede3cf] shadow-sm hover:shadow-md'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#d97706] text-white text-[11px] font-mono font-bold uppercase tracking-wider shadow-sm">
                    Most Popular
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono uppercase tracking-wider text-[#92400e] font-bold">
                      {plan.name}
                    </span>
                    {billingCycle === 'annual' && plan.monthlyPriceRupees > 0 && (
                      <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                        20% Off
                      </span>
                    )}
                  </div>

                  {/* Price */}
                  <div className="my-4">
                    {plan.id === 'sovereign' ? (
                      <div className="flex items-baseline gap-1">
                        <span className="font-display text-3xl font-extrabold text-[#111827]">
                          ₹39,999
                        </span>
                        <span className="text-xs text-[#6b7280]">/ cluster / mo</span>
                      </div>
                    ) : (
                      <div className="flex items-baseline gap-1">
                        <span className="font-display text-3xl font-extrabold text-[#111827]">
                          {formatRupees(price)}
                        </span>
                        <span className="text-xs text-[#6b7280]">/ user / mo</span>
                      </div>
                    )}
                    {billingCycle === 'annual' && plan.monthlyPriceRupees > 0 && (
                      <div className="text-[11px] text-[#6b7280] mt-0.5">
                        Billed annually ({formatRupees(price * 12)}/yr)
                      </div>
                    )}
                  </div>

                  <p className="text-xs text-[#4b5563] mb-6 min-h-[36px]">
                    {plan.description}
                  </p>

                  {/* Features List */}
                  <ul className="space-y-2.5 text-xs text-[#1f2937] mb-8">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#d97706] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                    {plan.omittedFeatures?.map((omit, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-[#9ca3af]">
                        <X className="w-4 h-4 text-[#d1d5db] shrink-0 mt-0.5" />
                        <span className="line-through">{omit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => {
                    if (plan.id === 'starter') {
                      onSelectPlan?.('starter');
                    } else {
                      setCustomPlan(plan.id === 'sovereign' ? 'business' : (plan.id as any));
                      setShowCustomizer(true);
                    }
                  }}
                  className={`w-full py-3 rounded-full text-xs font-bold transition-all text-center ${
                    plan.popular
                      ? 'bg-[#d97706] hover:bg-[#b45309] text-white shadow-md amber-glow'
                      : 'bg-[#f5eedd] hover:bg-[#ede3cf] text-[#111827]'
                  }`}
                >
                  {plan.ctaText}
                </button>
              </div>
            );
          })}
        </div>

        {/* Interactive Customizer & Seat Estimator Strip */}
        <div className="bg-white rounded-2xl border border-[#ede3cf] p-6 lg:p-8 shadow-sm mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#ede3cf]">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Sliders className="w-5 h-5 text-[#d97706]" />
                <h3 className="font-display text-xl font-bold text-[#111827]">
                  Interactive Pricing Customizer & ROI Estimator
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#4b5563]">
                Tailor seat counts, add-ons, and regulatory compliance to calculate your precise monthly estimate in INR (₹).
              </p>
            </div>
            <button
              onClick={() => setShowCustomizer(!showCustomizer)}
              className="px-4 py-2 rounded-lg bg-[#fef3c7] hover:bg-[#fde68a] text-[#92400e] text-xs font-bold transition-colors shrink-0"
            >
              {showCustomizer ? 'Hide Advanced Options' : 'Open Customizer & Calculator'}
            </button>
          </div>

          {showCustomizer && (
            <div className="pt-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Controls Column */}
              <div className="lg:col-span-7 space-y-6">
                {/* Seat Slider */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold text-[#111827] uppercase tracking-wider">
                      Team Seats Quota:
                    </label>
                    <span className="font-mono text-base font-bold text-[#d97706] bg-[#fef3c7] px-3 py-1 rounded-md">
                      {customSeats} Seats
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="150"
                    value={customSeats}
                    onChange={(e) => setCustomSeats(Number(e.target.value))}
                    className="w-full accent-[#d97706] cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-[#6b7280] font-mono mt-1">
                    <span>1 seat</span>
                    <span>50 seats</span>
                    <span>100 seats</span>
                    <span>150+ seats</span>
                  </div>
                </div>

                {/* Base Plan Radio */}
                <div>
                  <label className="text-xs font-bold text-[#111827] uppercase tracking-wider block mb-2">
                    Select Base Operating Tier:
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setCustomPlan('pro')}
                      className={`p-3 rounded-xl border text-left text-xs transition-all ${
                        customPlan === 'pro'
                          ? 'border-[#d97706] bg-[#fef3c7]/40 ring-1 ring-[#d97706]'
                          : 'border-[#ede3cf] hover:border-neutral-300'
                      }`}
                    >
                      <div className="font-bold text-[#111827]">Pro Team</div>
                      <div className="text-[11px] text-[#6b7280]">
                        ₹{billingCycle === 'annual' ? '1,039' : '1,299'}/seat/mo
                      </div>
                    </button>

                    <button
                      onClick={() => setCustomPlan('business')}
                      className={`p-3 rounded-xl border text-left text-xs transition-all ${
                        customPlan === 'business'
                          ? 'border-[#d97706] bg-[#fef3c7]/40 ring-1 ring-[#d97706]'
                          : 'border-[#ede3cf] hover:border-neutral-300'
                      }`}
                    >
                      <div className="font-bold text-[#111827]">Business (Recommended)</div>
                      <div className="text-[11px] text-[#6b7280]">
                        ₹{billingCycle === 'annual' ? '1,839' : '2,299'}/seat/mo
                      </div>
                    </button>
                  </div>
                </div>

                {/* Add-ons Checkboxes */}
                <div>
                  <label className="text-xs font-bold text-[#111827] uppercase tracking-wider block mb-2">
                    Enterprise Add-ons:
                  </label>
                  <div className="space-y-2.5">
                    <label className="flex items-center justify-between p-3 rounded-xl border border-[#ede3cf] hover:bg-neutral-50/50 cursor-pointer text-xs">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={recordingVault}
                          onChange={(e) => setRecordingVault(e.target.checked)}
                          className="w-4 h-4 accent-[#d97706] rounded"
                        />
                        <div>
                          <div className="font-semibold text-[#111827]">
                            LiveKit SFU 4K Cloud Recording Vault
                          </div>
                          <div className="text-[11px] text-[#6b7280]">
                            Direct WebM download & sovereign S3 storage
                          </div>
                        </div>
                      </div>
                      <span className="font-mono text-xs font-bold text-[#111827]">+₹499/mo</span>
                    </label>

                    <label className="flex items-center justify-between p-3 rounded-xl border border-[#ede3cf] hover:bg-neutral-50/50 cursor-pointer text-xs">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={aiTranscription}
                          onChange={(e) => setAiTranscription(e.target.checked)}
                          className="w-4 h-4 accent-[#d97706] rounded"
                        />
                        <div>
                          <div className="font-semibold text-[#111827]">
                            AI Companion Memory & Auto-Dispatch (Slack/Jira)
                          </div>
                          <div className="text-[11px] text-[#6b7280]">
                            Private VPC intelligence with zero training on customer data
                          </div>
                        </div>
                      </div>
                      <span className="font-mono text-xs font-bold text-[#111827]">
                        +₹{billingCycle === 'annual' ? '299' : '399'}/seat
                      </span>
                    </label>

                    <label className="flex items-center justify-between p-3 rounded-xl border border-[#ede3cf] hover:bg-neutral-50/50 cursor-pointer text-xs">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={sovereignCloud}
                          onChange={(e) => setSovereignCloud(e.target.checked)}
                          className="w-4 h-4 accent-[#d97706] rounded"
                        />
                        <div>
                          <div className="font-semibold text-[#111827]">
                            Air-Gapped Sovereign India Cloud (Mumbai Region)
                          </div>
                          <div className="text-[11px] text-[#6b7280]">
                            Dedicated isolated VPC & PostgreSQL RLS cryptographic key
                          </div>
                        </div>
                      </div>
                      <span className="font-mono text-xs font-bold text-[#111827]">
                        +₹{billingCycle === 'annual' ? '7,999' : '9,999'}/mo
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Real-Time Price Summary Column */}
              <div className="lg:col-span-5 bg-[#fbf7ee] p-6 rounded-xl border border-[#ede3cf] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-[#ede3cf] mb-4">
                    <span className="font-mono text-xs uppercase tracking-wider text-[#92400e] font-bold">
                      Order Summary
                    </span>
                    <span className="text-xs text-[#6b7280]">
                      {billingCycle === 'annual' ? 'Annual (20% Savings)' : 'Monthly'}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs mb-6">
                    <div className="flex justify-between text-[#4b5563]">
                      <span>
                        Base Plan ({customSeats} seats × ₹{baseRatePerSeat})
                      </span>
                      <span className="font-mono text-[#111827]">
                        {formatRupees(seatSubtotal)}
                      </span>
                    </div>

                    {recordingVault && (
                      <div className="flex justify-between text-[#4b5563]">
                        <span>4K Recording Vault</span>
                        <span className="font-mono text-[#111827]">
                          {formatRupees(recordingVaultCost)}
                        </span>
                      </div>
                    )}

                    {aiTranscription && (
                      <div className="flex justify-between text-[#4b5563]">
                        <span>AI Companion ({customSeats} seats)</span>
                        <span className="font-mono text-[#111827]">
                          {formatRupees(aiCost)}
                        </span>
                      </div>
                    )}

                    {sovereignCloud && (
                      <div className="flex justify-between text-[#4b5563]">
                        <span>Sovereign India Cloud</span>
                        <span className="font-mono text-[#111827]">
                          {formatRupees(cloudCost)}
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between text-[#4b5563] pt-2 border-t border-[#ede3cf]">
                      <span>Estimated Subtotal</span>
                      <span className="font-mono font-semibold text-[#111827]">
                        {formatRupees(monthlySubtotal)}
                      </span>
                    </div>

                    <div className="flex justify-between text-[#6b7280]">
                      <span>GST (18% Statutory)</span>
                      <span className="font-mono">{formatRupees(gstAmount)}</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-[#ede3cf] mb-6">
                    <div className="text-xs text-[#6b7280] mb-1">Total Payable per Month</div>
                    <div className="font-display text-2xl sm:text-3xl font-extrabold text-[#111827]">
                      {formatRupees(totalWithGst)}
                    </div>
                    {billingCycle === 'annual' && (
                      <div className="text-[11px] text-emerald-600 font-semibold mt-1">
                        Includes 20% annual prepay discount
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={handleOpenCheckoutWithCustom}
                    className="w-full py-3.5 rounded-xl bg-[#d97706] hover:bg-[#b45309] text-white font-bold text-xs shadow-md amber-glow transition-all flex items-center justify-center gap-2"
                  >
                    <span>Proceed to Instant Plan Activation</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className="text-[11px] text-center text-[#6b7280]">
                    Includes 30-day money-back guarantee · GST Tax Invoice provided
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Trust Badges Under Pricing */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 p-4 rounded-xl bg-white border border-[#ede3cf] shadow-sm">
            <div className="w-10 h-10 rounded-lg bg-[#fef3c7] text-[#92400e] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-[#d97706]" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-[#111827]">SOC 2 Type II Certified</h5>
              <p className="text-[11px] text-[#6b7280]">Audited by Schellman & Co annually.</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-xl bg-white border border-[#ede3cf] shadow-sm">
            <div className="w-10 h-10 rounded-lg bg-[#fef3c7] text-[#92400e] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-[#d97706]" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-[#111827]">Zero Data Retention</h5>
              <p className="text-[11px] text-[#6b7280]">Ephemeral media streams by default.</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-xl bg-white border border-[#ede3cf] shadow-sm">
            <div className="w-10 h-10 rounded-lg bg-[#fef3c7] text-[#92400e] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-[#d97706]" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-[#111827]">Clean Media Plane</h5>
              <p className="text-[11px] text-[#6b7280]">No cross-tenant mixing on LiveKit SFU workers.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout / Activation Modal */}
      {checkoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-[#ebd7a5] overflow-hidden p-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#ede3cf] mb-4">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[#d97706]" />
                <h3 className="font-display font-bold text-lg text-[#111827]">
                  {checkoutSuccess ? 'Plan Activated Successfully' : 'Confirm Subscription (INR ₹)'}
                </h3>
              </div>
              <button
                onClick={() => setCheckoutModalOpen(false)}
                className="text-[#6b7280] hover:text-[#111827]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {checkoutSuccess ? (
              <div className="text-center py-6">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-display text-xl font-bold text-[#111827] mb-2">
                  Welcome to Meeting OS!
                </h4>
                <p className="text-xs text-[#4b5563] mb-6 max-w-sm mx-auto">
                  Your tenant cluster has been provisioned with {customSeats} seats. GST invoice and cryptographic API tokens have been sent to your admin email.
                </p>

                <div className="p-3 bg-[#fbf7ee] rounded-xl border border-[#ede3cf] text-left text-xs font-mono space-y-1 mb-6">
                  <div className="text-[#6b7280]">Tenant ID: tn_in_902481</div>
                  <div className="text-[#6b7280]">LiveKit SFU Cluster: in-bom-01 (Mumbai)</div>
                  <div className="text-[#111827] font-bold">Status: ACTIVE · 99.999% SLA</div>
                </div>

                <button
                  onClick={() => setCheckoutModalOpen(false)}
                  className="w-full py-3 rounded-full bg-[#d97706] hover:bg-[#b45309] text-white font-bold text-xs"
                >
                  Return to Dashboard
                </button>
              </div>
            ) : (
              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-xl bg-[#fbf7ee] border border-[#ede3cf] space-y-2">
                  <div className="flex justify-between">
                    <span className="text-[#6b7280]">Plan:</span>
                    <span className="font-bold text-[#111827]">
                      {customPlan === 'pro' ? 'Pro Team' : 'Business'} ({customSeats} seats)
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6b7280]">Billing:</span>
                    <span className="font-bold text-[#111827]">
                      {billingCycle === 'annual' ? 'Annual (20% off)' : 'Monthly'}
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-[#ede3cf] pt-2 text-sm font-bold text-[#111827]">
                    <span>Total Monthly:</span>
                    <span className="font-mono text-[#d97706]">{formatRupees(totalWithGst)}</span>
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-[#111827] block mb-2">
                    Payment Method (India):
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button className="p-2.5 rounded-lg border border-[#d97706] bg-[#fef3c7]/30 text-center font-semibold text-[#92400e]">
                      UPI / QR
                    </button>
                    <button className="p-2.5 rounded-lg border border-[#ede3cf] text-center hover:bg-neutral-50 text-[#4b5563]">
                      Corporate Card
                    </button>
                    <button className="p-2.5 rounded-lg border border-[#ede3cf] text-center hover:bg-neutral-50 text-[#4b5563]">
                      NetBanking
                    </button>
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-[#111827] block mb-1">
                    GSTIN / Business Name (Optional):
                  </label>
                  <input
                    type="text"
                    placeholder="27AAAAA0000A1Z5 / Acme Corp India"
                    className="w-full px-3 py-2 rounded-lg border border-[#ede3cf] bg-white outline-none focus:ring-1 focus:ring-[#d97706]"
                  />
                </div>

                <button
                  onClick={() => setCheckoutSuccess(true)}
                  className="w-full py-3.5 rounded-full bg-[#d97706] hover:bg-[#b45309] text-white font-bold text-xs shadow-md amber-glow transition-all mt-4"
                >
                  Confirm & Activate Subscription
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
