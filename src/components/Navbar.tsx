import { useState } from 'react';
import { Phone, MessageCircle, Menu, X, Sparkles, Share2, Check, Lock, ShieldCheck } from 'lucide-react';
import { companyInfo } from '../data/companyData';

interface NavbarProps {
  onOpenTradeIn: () => void;
  onOpenContact: () => void;
  onOpenPosterModal?: () => void;
  isAdmin?: boolean;
  onOpenAdmin?: () => void;
}

export function Navbar({ 
  onOpenTradeIn, 
  onOpenContact, 
  onOpenPosterModal,
  isAdmin = false,
  onOpenAdmin
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(false);

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
      } catch {
        // Fallback to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // Ignored
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all">
      
      {/* Top Grand Opening Announcement Ribbon */}
      {!bannerDismissed && (
        <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 text-neutral-950 px-4 py-2 text-xs font-bold border-b border-amber-400/40 shadow-sm flex items-center justify-between">
          <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
              <span className="bg-neutral-950 text-amber-300 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0">
                خبر حصري
              </span>
              <span className="truncate">
                <strong>خبر جديد لتجربة أفضل:</strong> قريباً افتتاح فرع تاني لمعرض الصافي لتجارة السيارات بالإسكندرية!
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {onOpenPosterModal && (
                <button
                  onClick={onOpenPosterModal}
                  className="px-2.5 py-1 rounded-lg bg-neutral-950 hover:bg-neutral-900 text-amber-300 text-[11px] font-black transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>عرض بوستر الإعلان</span>
                </button>
              )}
              <a
                href="#new-branch"
                className="hidden sm:inline-block px-2.5 py-1 rounded-lg bg-neutral-950/20 hover:bg-neutral-950/40 text-neutral-950 text-[11px] font-black transition-colors"
              >
                التفاصيل ←
              </a>
              <button
                onClick={() => setBannerDismissed(true)}
                className="p-1 hover:bg-neutral-950/10 rounded-md text-neutral-900 cursor-pointer"
                aria-label="إغلاق الشريط"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-neutral-950/95 backdrop-blur-md border-b border-neutral-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-6">
            
            {/* Brand Wordmark & Logo */}
            <a href="#hero" className="flex items-center gap-3 shrink-0 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 flex items-center justify-center text-neutral-950 font-black text-xl shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
                S
              </div>
              <div className="flex flex-col">
                <span className="text-base sm:text-xl font-black tracking-tight text-white group-hover:text-amber-400 transition-colors whitespace-nowrap">
                  {companyInfo.nameAr}
                </span>
                <span className="text-[10px] sm:text-[11px] font-semibold tracking-wider text-amber-400 font-mono uppercase whitespace-nowrap">
                  {companyInfo.slogan} · ALSAFY MOTORS
                </span>
              </div>
            </a>

            {/* Main Nav Links */}
            <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-neutral-300">
              <a href="#hero" className="hover:text-amber-400 transition-colors whitespace-nowrap">
                الرئيسية
              </a>
              <a href="#new-branch" className="hover:text-amber-400 transition-colors whitespace-nowrap flex items-center gap-1.5 text-amber-300">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                <span>الفرع الثاني</span>
                <span className="px-1.5 py-0.5 rounded-full text-[10px] font-black bg-amber-500/20 text-amber-400 border border-amber-500/40">
                  قريباً
                </span>
              </a>
              <a href="#showroom" className="hover:text-amber-400 transition-colors whitespace-nowrap">
                السيارات المتاحة
              </a>
              <a href="#about" className="hover:text-amber-400 transition-colors whitespace-nowrap">
                عن الصافي
              </a>
              <a href="#services" className="hover:text-amber-400 transition-colors whitespace-nowrap">
                خدماتنا
              </a>
              <a href="#calculator" className="hover:text-amber-400 transition-colors whitespace-nowrap">
                حاسبة التقسيط
              </a>
              <a href="#location" className="hover:text-amber-400 transition-colors whitespace-nowrap">
                الفروع وتواصل معنا
              </a>
            </nav>

          {/* Quick Action Area */}
          <div className="hidden sm:flex items-center gap-2.5 shrink-0">
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-neutral-300 hover:text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-700/80 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
              title="مشاركة أو نسخ رابط الموقع"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">تم النسخ!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>مشاركة الرابط</span>
                </>
              )}
            </button>
            {/* Admin Exclusive Access Button */}
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  isAdmin
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30'
                    : 'bg-neutral-900/60 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-neutral-800'
                }`}
                title={isAdmin ? 'وضع الإدارة مفعّل - خاص المبرمج للتطبيق (ALBYAN)' : 'بوابة الإدارة الشخصية - خاص المبرمج للتطبيق (ALBYAN)'}
              >
                {isAdmin ? (
                  <>
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                    <span>إدارة التطبيق (ALBYAN)</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5 text-amber-400" />
                    <span>خاص المبرمج (ALBYAN)</span>
                  </>
                )}
              </button>
            )}

            <a
              href={companyInfo.socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-neutral-400 hover:text-blue-400 hover:bg-neutral-900 border border-neutral-800 rounded-lg transition-colors cursor-pointer"
              title="صفحة المعرض على فيسبوك"
              aria-label="صفحة المعرض على فيسبوك"
            >
              <svg className="w-4 h-4 fill-current text-blue-500" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>

            <button
              onClick={onOpenTradeIn}
              className="px-3 py-2 text-xs font-semibold text-neutral-300 hover:text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
            >
              استبدال سيارة
            </button>
            <a
              href={`https://wa.me/${companyInfo.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('السلام عليكم، أود الاستفسار عن سيارات كسر الزيرو المتاحة لدى شركة الصافي لتجارة السيارات.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-neutral-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-lg shadow-md shadow-amber-500/10 transition-all hover:shadow-amber-500/25 whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4" />
              <span>واتساب المعرض</span>
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-neutral-400 hover:text-white hover:bg-neutral-900 rounded-lg cursor-pointer"
            aria-label="القائمة الرئيسية"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
    </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-neutral-950 border-b border-neutral-800 px-6 py-6 space-y-4">
          <nav className="flex flex-col space-y-3 text-base font-semibold text-neutral-200">
            <a
              href="#hero"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-amber-400 border-b border-neutral-800/50"
            >
              الرئيسية
            </a>
            <a
              href="#new-branch"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-amber-300 hover:text-amber-200 border-b border-neutral-800/50 flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                <span>الفرع الثاني (قريباً)</span>
              </span>
              <span className="text-[10px] bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full border border-amber-500/30">
                خبر حصري
              </span>
            </a>
            <a
              href="#showroom"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-amber-400 border-b border-neutral-800/50"
            >
              السيارات المتاحة (المخزون)
            </a>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-amber-400 border-b border-neutral-800/50"
            >
              عن معرض الصافي ولماذا تختارنا
            </a>
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-amber-400 border-b border-neutral-800/50"
            >
              خدماتنا (فحص، تقسيط، استبدال، تراخيص)
            </a>
            <a
              href="#calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-amber-400 border-b border-neutral-800/50"
            >
              حاسبة التقسيط التفاعلية
            </a>
            <a
              href="#location"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-amber-400"
            >
              تواصل معنا وعنوان المعرض (السيوف)
            </a>
          </nav>

          <div className="pt-4 flex flex-col gap-3">
            {onOpenAdmin && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className={`w-full py-2.5 flex items-center justify-center gap-2 text-center text-sm font-bold rounded-lg cursor-pointer transition-colors ${
                  isAdmin
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-300'
                }`}
              >
                {isAdmin ? (
                  <>
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    <span>لوحة تحكم الإدارة الشخصية (مفعّلة - ALBYAN)</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4 text-amber-400" />
                    <span>بوابة الإدارة الشخصية - خاص المبرمج للتطبيق (ALBYAN)</span>
                  </>
                )}
              </button>
            )}

            <button
              onClick={handleShare}
              className="w-full py-2.5 flex items-center justify-center gap-2 text-center text-sm font-semibold bg-neutral-900 hover:bg-neutral-800 border border-amber-500/30 text-amber-300 rounded-lg cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">تم نسخ رابط الموقع بنجاح!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4 text-amber-400" />
                  <span>نسخ ومشاركة رابط الموقع</span>
                </>
              )}
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTradeIn();
              }}
              className="w-full py-2.5 text-center text-sm font-semibold bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-white rounded-lg cursor-pointer"
            >
              استبدل أو اعرض سيارتك للبيع
            </button>
            <a
              href={companyInfo.socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 flex items-center justify-center gap-2 text-center text-sm font-semibold bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 rounded-lg transition-colors"
            >
              <svg className="w-4 h-4 fill-current text-blue-400" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span>صفحتنا على فيسبوك</span>
            </a>
            <a
              href={`https://wa.me/${companyInfo.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('السلام عليكم، أرغب بالتواصل مع مبيعات شركة الصافي للسيارات')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 flex items-center justify-center gap-2 text-center text-sm font-bold bg-amber-400 hover:bg-amber-300 text-neutral-950 rounded-lg"
            >
              <MessageCircle className="w-4 h-4" />
              <span>تواصل واتساب مباشر</span>
            </a>
            <a
              href={`tel:${companyInfo.landlineTel}`}
              className="w-full py-2 flex items-center justify-center gap-2 text-xs text-neutral-400 hover:text-amber-400"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>الخط الأرضي: {companyInfo.landline}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
