import { useState } from 'react';
import { MessageCircle, Phone, Share2, Check } from 'lucide-react';
import { companyInfo } from '../data/companyData';

export function FloatingContactBar() {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareUrl = window.location.href;
    const shareData = {
      title: 'معرض الصافي للسيارات - كسر زيرو وفابريكا بالكامل',
      text: 'الموقع الرسمي لمعرض الصافي للسيارات بالإسكندرية (السيوف) - كسر زيرو وفابريكا بالكامل',
      url: shareUrl,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err) {
        // Fallback to clipboard
      }
    }

    // Fallback: Copy to clipboard
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // Ignored
    }
  };

  return (
    <div className="fixed bottom-5 left-5 z-40 flex items-center gap-2.5">
      {/* Toast Notification for Link Copied */}
      {copied && (
        <div className="absolute -top-12 left-0 bg-neutral-900 border border-emerald-500/50 text-emerald-400 text-xs font-bold px-3 py-1.5 rounded-xl shadow-xl flex items-center gap-1.5 whitespace-nowrap animate-bounce">
          <Check className="w-3.5 h-3.5 text-emerald-400" />
          <span>تم نسخ رابط الموقع بنجاح!</span>
        </div>
      )}

      {/* Share / Copy Link Button */}
      <button
        onClick={handleShare}
        aria-label="مشاركة أو نسخ رابط الموقع"
        className="w-12 h-12 rounded-full bg-neutral-900 hover:bg-neutral-800 text-amber-400 border border-amber-500/30 flex items-center justify-center shadow-lg shadow-black/60 hover:scale-105 transition-all cursor-pointer"
        title="مشاركة أو نسخ رابط الموقع لإرساله"
      >
        {copied ? <Check className="w-5 h-5 text-emerald-400" /> : <Share2 className="w-5 h-5" />}
      </button>

      {/* Facebook Direct Link */}
      <a
        href={companyInfo.socialLinks.facebook}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="صفحة الفيسبوك الرسمية"
        className="w-12 h-12 rounded-full bg-[#1877F2] hover:bg-[#166fe5] text-white flex items-center justify-center shadow-lg shadow-blue-600/30 hover:scale-105 transition-all"
        title="صفحة المعرض على فيسبوك"
      >
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      </a>

      {/* WhatsApp Direct Chat Button */}
      <a
        href={`https://wa.me/${companyInfo.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('السلام عليكم، أود الاستفسار عن سيارات شركة الصافي للسيارات')}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="محادثة واتساب"
        className="w-12 h-12 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30 hover:scale-105 transition-all"
        title="تواصل واتساب مباشر"
      >
        <MessageCircle className="w-6 h-6" />
      </a>

      {/* Quick Phone Call Button */}
      <a
        href="tel:+201069586454"
        aria-label="اتصال بكابتن صافي"
        className="w-12 h-12 rounded-full bg-amber-400 hover:bg-amber-300 text-neutral-950 flex items-center justify-center shadow-lg shadow-amber-500/30 hover:scale-105 transition-all"
        title="اتصال مباشر بكابتن صافي (01069586454)"
      >
        <Phone className="w-5 h-5" />
      </a>
    </div>
  );
}
