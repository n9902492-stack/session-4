import React, { useState } from 'react';
import { X, ShieldCheck, Server, FileText, CheckCircle2, Download, Copy, Check } from 'lucide-react';

interface EnterpriseSlaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EnterpriseSlaModal: React.FC<EnterpriseSlaModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const helmYaml = `helm repo add meeting-os https://charts.meeting-os.com
helm install sovereign-cluster meeting-os/mesh \\
  --set region=india-mumbai-bom01 \\
  --set rls.encryptionKey="vault://sovereign-kms-01" \\
  --set sfu.livekit.mediaPlane=dedicated \\
  --set auditVault.immutableRetention=365d`;

  const copyHelm = () => {
    navigator.clipboard.writeText(helmYaml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-[#ebd7a5] overflow-hidden p-6 relative max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between pb-4 border-b border-[#ede3cf]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#fef3c7] text-[#92400e] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-[#d97706]" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-[#111827]">
                Enterprise Sovereign SLA & Architecture Spec
              </h3>
              <p className="text-xs text-[#6b7280]">
                99.999% High-Availability Contract · Isolated Data Planes
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-[#6b7280] hover:text-[#111827]">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 space-y-5 text-xs text-[#4b5563]">
          {/* SLA Metrics */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-[#fbf7ee] border border-[#ede3cf] text-center">
              <div className="font-display text-xl font-extrabold text-[#111827] font-mono">
                99.999%
              </div>
              <div className="text-[11px] text-[#6b7280]">Uptime Guarantee</div>
            </div>
            <div className="p-3 rounded-xl bg-[#fbf7ee] border border-[#ede3cf] text-center">
              <div className="font-display text-xl font-extrabold text-[#111827] font-mono">
                &lt; 15 min
              </div>
              <div className="text-[11px] text-[#6b7280]">P1 Incident SLA</div>
            </div>
            <div className="p-3 rounded-xl bg-[#fbf7ee] border border-[#ede3cf] text-center">
              <div className="font-display text-xl font-extrabold text-[#111827] font-mono">
                Zero
              </div>
              <div className="text-[11px] text-[#6b7280]">Cross-Tenant Mixing</div>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-sm text-[#111827] mb-2">Compliance Attestations</h4>
            <ul className="space-y-1.5">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>SOC 2 Type II Certified annually by Schellman & Co.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>HIPAA BAA signed for telehealth and confidential clinical reviews.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>GDPR Article 28 data processing addendum with EU and India data boundaries.</span>
              </li>
            </ul>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-bold text-sm text-[#111827]">
                Helm Sovereign Deployment Quick-Start
              </h4>
              <button
                onClick={copyHelm}
                className="px-2.5 py-1 rounded border border-[#ede3cf] hover:bg-neutral-50 flex items-center gap-1 text-[11px]"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied' : 'Copy Spec'}</span>
              </button>
            </div>
            <pre className="p-3 rounded-xl bg-[#111827] text-amber-300 font-mono text-[11px] overflow-x-auto leading-relaxed">
              {helmYaml}
            </pre>
          </div>
        </div>

        <div className="pt-4 border-t border-[#ede3cf] flex items-center justify-between">
          <span className="text-xs text-[#6b7280]">Contract legal version: v2026.4</span>
          <button
            onClick={() => {
              alert('SLA Spec downloaded as PDF.');
              onClose();
            }}
            className="px-4 py-2 rounded-full bg-[#d97706] hover:bg-[#b45309] text-white font-bold text-xs shadow-md"
          >
            Download Executable BAA & SLA (PDF)
          </button>
        </div>
      </div>
    </div>
  );
};
