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

        {/* Branded verification display for external certs */}
        {!certificate.image && certificate.verifyUrl && (() => {
          const issuer = certificate.issuer;
          const isKaggle = issuer === 'Kaggle';
          const isSoloLearn = issuer === 'SoloLearn';
          const isHuawei = issuer.startsWith('Huawei');
          const bgColor = isKaggle ? '#20BEFF' : isSoloLearn ? '#149EF2' : isHuawei ? '#CF0A2C' : '#D4A27F';

          return (
            <div className="relative bg-bg-elevated flex items-center justify-center py-20 px-8 overflow-hidden">
              <div className="absolute inset-0 opacity-[0.03]" style={{
                backgroundImage: 'repeating-linear-gradient(45deg, currentColor 0, currentColor 1px, transparent 1px, transparent 10px)',
              }} />
              <div className="text-center relative">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center shadow-lg" style={{ backgroundColor: bgColor }}>
                  {isKaggle && (
                    <svg viewBox="0 0 24 24" fill="white" className="w-10 h-10" aria-label="Kaggle">
                      <path d="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.589-1.448 1.374v5.111c0 .235-.117.352-.351.352H5.505c-.236 0-.354-.117-.354-.352V.353c0-.233.118-.353.354-.353h2.431c.234 0 .351.12.351.353v14.343l6.203-6.272c.165-.165.33-.246.495-.246h3.239c.144 0 .236.06.285.18.046.149.034.255-.036.315l-6.555 6.344 6.836 8.507c.095.104.117.208.07.336z"/>
                    </svg>
                  )}
                  {isSoloLearn && (
                    <svg viewBox="0 0 24 24" fill="white" className="w-10 h-10" aria-label="SoloLearn">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 4.5a7.5 7.5 0 1 1 0 15 7.5 7.5 0 0 1 0-15zm0 2.5a5 5 0 1 0 0 10A5 5 0 0 0 12 7zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6z"/>
                    </svg>
                  )}
                  {isHuawei && (
                    <svg viewBox="0 0 24 24" fill="white" className="w-10 h-10" aria-label="Huawei">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-1.5 6h3l1.5 6-1.5 6h-3L9 12l1.5-6z"/>
                    </svg>
                  )}
                  {!isKaggle && !isSoloLearn && !isHuawei && (
                    <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10" aria-label="Anthropic">
                      <path d="M13.827 3.52h3.603L24 20.48h-3.603l-6.57-16.96zm-7.258 0H10.172L16.742 20.48H13.14L11.06 15.14H5.532l-2.078 5.34H0L6.57 3.52zm4.132 8.69L8.283 6.27l-2.418 5.94h4.84z" fill="white"/>
                    </svg>
                  )}
                </div>
                <h3 className="font-heavy text-xl md:text-2xl uppercase tracking-tight text-fg">{certificate.title}</h3>
                <p className="mt-2 text-sm text-fg-muted font-medium">Completed & Verified by {certificate.issuer}</p>
                <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 border-2 border-border text-[10px] uppercase tracking-[0.25em] font-bold text-fg-subtle">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  Verified Certificate
                </div>
              </div>
            </div>
          );
        })()}

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
