import React, { useState } from 'react';
import { X, Lock, Mail, Key, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (email: string) => void;
}

export const SignInModal: React.FC<SignInModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('niknikhil.sharma22@gmail.com');
  const [password, setPassword] = useState<string>('••••••••••••');
  const [tenantDomain, setTenantDomain] = useState<string>('enterprise.internal');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => {
        onSuccess(email);
        onClose();
      }, 1000);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-[#ebd7a5] overflow-hidden p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#6b7280] hover:text-[#111827] p-1 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#fef3c7] text-[#92400e] flex items-center justify-center mb-3">
            <Lock className="w-5 h-5 text-[#d97706]" />
          </div>
          <h3 className="font-display text-xl font-bold text-[#111827]">
            {isSignUp ? 'Create Sovereign Account' : 'Sign In to Meeting OS'}
          </h3>
          <p className="text-xs text-[#6b7280] mt-1">
            Zero-trust session perimeter with cryptographic hardware token or SAML.
          </p>
        </div>

        {submitted ? (
          <div className="text-center py-6">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
            <h4 className="font-bold text-sm text-[#111827]">Authentication Verified</h4>
            <p className="text-xs text-[#6b7280]">Redirecting to your stage workspace...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="font-semibold text-[#111827] block mb-1">Work Email</label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-[#ede3cf] bg-[#fbf7ee] outline-none focus:bg-white focus:ring-1 focus:ring-[#d97706]"
                  placeholder="name@company.com"
                />
                <Mail className="w-4 h-4 text-[#9ca3af] absolute left-3 top-3" />
              </div>
            </div>

            <div>
              <label className="font-semibold text-[#111827] block mb-1">
                Password / SSO Token
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-[#ede3cf] bg-[#fbf7ee] outline-none focus:bg-white focus:ring-1 focus:ring-[#d97706]"
                  placeholder="Password or Token"
                />
                <Key className="w-4 h-4 text-[#9ca3af] absolute left-3 top-3" />
              </div>
            </div>

            {isSignUp && (
              <div>
                <label className="font-semibold text-[#111827] block mb-1">
                  Tenant Domain Identifier
                </label>
                <input
                  type="text"
                  value={tenantDomain}
                  onChange={(e) => setTenantDomain(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-[#ede3cf] bg-[#fbf7ee] outline-none focus:bg-white"
                  placeholder="e.g. acme-corp.in"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-full bg-[#d97706] hover:bg-[#b45309] text-white font-bold font-mono shadow-md amber-glow transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>
                {isSubmitting
                  ? 'Authenticating...'
                  : isSignUp
                  ? 'Register Clean Workspace'
                  : 'Sign In with SSO'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-xs text-[#92400e] hover:underline font-medium"
              >
                {isSignUp
                  ? 'Already have an enterprise account? Sign In'
                  : "Don't have an account? Start 14-day trial"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
