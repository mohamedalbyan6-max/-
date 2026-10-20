import React, { useState } from 'react';
import { X, ZoomIn, ZoomOut, RotateCcw, Download, Share2, MessageCircle, Sparkles, Check, MapPin, ShieldCheck } from 'lucide-react';
import { companyInfo } from '../data/companyData';

interface BranchPosterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BranchPosterModal({ isOpen, onClose }: BranchPosterModalProps) {
  const [scale, setScale] = useState(1);
  const [copied, setCopied] = useState(false);
  const posterSrc = '/assets/images/alsafy_branch2_announcement.jpg';

  if (!isOpen) return null;

  const handleZoomIn = () => setScale((s) => Math.min(s + 0.25, 2.5));
  const handleZoomOut = () => setScale((s) => Math.max(s - 0.25, 0.75));
  const handleResetZoom = () => setScale(1);

  const handleShare = async () => {
    const shareData = {
      title: 'قريباً افتتاح فرع تاني - معرض الصافي لتجارة السيارات',
      text: 'خبر جديد لتجربة أفضل: قريباً افتتاح فرع تاني لمعرض الصافي لتجارة السيارات بالإسكندرية!',
      url: window.location.href,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        // Fallback to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // Ignored
    }
  };

  const whatsappMessage = encodeURIComponent(
    'السلام عليكم يا كابتن صافي، بخصوص الإعلان عن افتتاح الفرع التاني لمعرض الصافي لتجارة السيارات.. أود الاستفسار عن موعد الافتتاح وتفاصيل الموقع والسيارات المتاحة.'
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-fade-in overflow-y-auto">
      
      {/* Outer Container */}
      <div className="relative w-full max-w-4xl bg-neutral-950 border border-amber-500/40 rounded-2xl sm:rounded-3xl shadow-2xl shadow-amber-500/10 overflow-hidden flex flex-col max-h-[94vh]">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 bg-neutral-900 border-b border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-neutral-950 font-black shadow-md">
              S
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm sm:text-base font-black text-white">
                  البوستر الرسمي: افتتاح الفرع الثاني
                </span>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[10px] font-bold">
                  قريباً
                </span>
              </div>
              <p className="text-[11px] text-neutral-400">
                شركة الصافي لتجارة السيارات · خبر جديد لتجربة أفضل
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-xl transition-colors cursor-pointer"
              aria-label="إغلاق"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Poster Viewer Area */}
        <div className="relative flex-1 overflow-auto p-4 sm:p-6 flex items-center justify-center bg-neutral-950 min-h-[380px] sm:min-h-[500px]">
          
          {/* Ambient Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none" />

          {/* Floating Zoom Controls */}
          <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 p-1.5 bg-neutral-900/90 backdrop-blur-md rounded-xl border border-neutral-800 shadow-xl">
            <button
              onClick={handleZoomIn}
              className="p-1.5 text-neutral-300 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
              title="تكبير"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={handleZoomOut}
              className="p-1.5 text-neutral-300 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
              title="تصغير"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={handleResetZoom}
              className="p-1.5 text-neutral-300 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
              title="الحجم الأصلي"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <span className="text-[11px] text-amber-400 font-mono px-1.5 font-bold">
              {Math.round(scale * 100)}%
            </span>
          </div>

          {/* Image itself */}
          <div
            className="transition-transform duration-200 ease-out flex justify-center items-center"
            style={{ transform: `scale(${scale})` }}
          >
            <img
              src={posterSrc}
              alt="إعلان افتتاح الفرع الثاني - شركة الصافي لتجارة السيارات"
              className="max-h-[65vh] w-auto object-contain rounded-xl sm:rounded-2xl border-2 border-amber-500/40 shadow-2xl shadow-black select-none pointer-events-auto"
            />
          </div>
        </div>

        {/* Footer Actions & Info Bar */}
        <div className="p-4 sm:p-5 bg-neutral-900 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-neutral-300">
            <span className="flex items-center gap-1.5 text-amber-400 font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>خدمة مميزة</span>
            </span>
            <span className="text-neutral-600">·</span>
            <span>تشكيلة متنوعة</span>
            <span className="text-neutral-600">·</span>
            <span>أعلى معايير الجودة</span>
            <span className="text-neutral-600">·</span>
            <span className="flex items-center gap-1 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>ضمان حقيقي</span>
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5 w-full sm:w-auto">
            <a
              href={posterSrc}
              download="Alsafy-Motors-Branch-2-Announcement.jpg"
              className="px-3.5 py-2 text-xs font-bold bg-neutral-800 hover:bg-neutral-700 text-neutral-200 hover:text-white rounded-xl border border-neutral-700 flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span>تحميل الصورة</span>
            </a>

            <button
              onClick={handleShare}
              className="px-3.5 py-2 text-xs font-bold bg-neutral-800 hover:bg-neutral-700 text-neutral-200 hover:text-white rounded-xl border border-neutral-700 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">تم النسخ!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>مشاركة الإعلان</span>
                </>
              )}
            </button>

            <a
              href={`https://wa.me/${companyInfo.whatsappNumber.replace(/[^0-9]/g, '')}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-xs font-bold bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-neutral-950 rounded-xl flex items-center gap-1.5 shadow-md shadow-amber-500/20 transition-all font-bold"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>استفسار واتساب</span>
            </a>
          </div>

        </div>

      </div>
    </div>
  );
}
