import React, { useEffect, useRef } from 'react';
import { X, ExternalLink, Calendar, MapPin } from 'lucide-react';

export interface CertificateData {
  title: string;
  issuer: string;
  date: string;
  location: string;
  image?: string;
  verifyUrl?: string;
}

interface CertificateModalProps {
  certificate: CertificateData | null;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ certificate, onClose }) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (certificate) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [certificate]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  if (!certificate) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6"
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-fg/80 backdrop-blur-sm animate-fadeIn" />

      {/* Modal */}
      <div className="relative w-full max-w-3xl bg-bg border-2 border-border animate-slideUp">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b-2 border-border">
          <div className="flex items-center gap-3">
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-accent">
              Certificate
            </span>
            <span className="w-1 h-1 bg-border" />
            <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-fg-subtle">
              {certificate.issuer}
            </span>
          </div>
          <button
            onClick={onClose}
            className="hover-trigger w-8 h-8 flex items-center justify-center border-2 border-border hover:bg-accent hover:text-white hover:border-accent transition-colors duration-200"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" strokeWidth={2.5} />
          </button>
        </div>

        {/* Certificate Image */}
        {certificate.image && (
          <div className="relative bg-bg-elevated overflow-hidden">
            <img
              src={certificate.image}
              alt={certificate.title}
              className="w-full h-auto object-contain max-h-[60vh]"
              loading="lazy"
            />
          </div>
        )}

        {/* Branded verification display for Skilljar certs */}
        {!certificate.image && certificate.verifyUrl && (
          <div className="relative bg-bg-elevated flex items-center justify-center py-20 px-8 overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-[0.03]" style={{
              backgroundImage: 'repeating-linear-gradient(45deg, currentColor 0, currentColor 1px, transparent 1px, transparent 10px)',
            }} />
            <div className="text-center relative">
              {/* Anthropic logo circle */}
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#D4A27F] flex items-center justify-center shadow-lg">
                <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10" aria-label="Anthropic">
                  <path d="M13.827 3.52h3.603L24 20.48h-3.603l-6.57-16.96zm-7.258 0H10.172L16.742 20.48H13.14L11.06 15.14H5.532l-2.078 5.34H0L6.57 3.52zm4.132 8.69L8.283 6.27l-2.418 5.94h4.84z" fill="white"/>
                </svg>
              </div>
              <h3 className="font-heavy text-xl md:text-2xl uppercase tracking-tight text-fg">{certificate.title}</h3>
              <p className="mt-2 text-sm text-fg-muted font-medium">Completed & Verified by {certificate.issuer}</p>
              <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 border-2 border-border text-[10px] uppercase tracking-[0.25em] font-bold text-fg-subtle">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Verified Certificate
              </div>
            </div>
          </div>
        )}

        {/* Footer Details */}
        <div className="px-6 py-4 border-t-2 border-border">
          <h3 className="font-heavy text-lg md:text-xl uppercase leading-tight tracking-tight text-fg">
            {certificate.title}
          </h3>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-2">
            <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.25em] font-bold text-fg-subtle">
              <Calendar className="w-3 h-3" strokeWidth={2.5} />
              {certificate.date}
            </span>
            <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.25em] font-bold text-fg-subtle">
              <MapPin className="w-3 h-3" strokeWidth={2.5} />
              {certificate.location}
            </span>
            {certificate.verifyUrl && (
              <a
                href={certificate.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover-trigger inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.25em] font-bold text-accent hover:text-fg transition-colors duration-200"
              >
                <ExternalLink className="w-3 h-3" strokeWidth={2.5} />
                Verify
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
