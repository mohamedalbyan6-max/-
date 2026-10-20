import { Phone, MessageCircle, MapPin, Sparkles, ArrowUp, Lock, ShieldCheck } from 'lucide-react';
import { companyInfo } from '../data/companyData';

interface FooterProps {
  isAdmin?: boolean;
  onOpenAdmin?: () => void;
}

export function Footer({ isAdmin = false, onOpenAdmin }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-neutral-950 text-neutral-400 border-t border-neutral-900 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-12">
          
          {/* Brand & Slogan Column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-neutral-950 font-black text-lg">
                S
              </div>
              <div>
                <span className="text-base font-bold text-white block">
                  {companyInfo.nameAr}
                </span>
                <span className="text-[11px] font-mono text-amber-400 uppercase tracking-wider block">
                  {companyInfo.nameEn} · {companyInfo.slogan}
                </span>
              </div>
            </div>

            <p className="text-neutral-400 leading-relaxed max-w-md">
              {companyInfo.description}
            </p>

            <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-2 text-neutral-300">
              <span className="text-xs text-neutral-400">حسابات التواصل الاجتماعي:</span>
              <a
                href={companyInfo.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-bold text-amber-400 hover:text-amber-300 bg-neutral-900 hover:bg-neutral-800 px-3 py-1.5 rounded-lg border border-neutral-800 hover:border-amber-500/40 transition-all text-xs w-fit"
                title="متابعة صفحة شركة الصافي لتجارة السيارات على فيسبوك"
              >
                <svg className="w-4 h-4 fill-current text-blue-500 shrink-0" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span>صفحتنا على فيسبوك (Facebook)</span>
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white mb-2">أقسام الموقع</h4>
            <ul className="space-y-2">
              <li>
                <a href="#showroom" className="hover:text-amber-400 transition-colors">
                  سيارات المعرض المتاحة
                </a>
              </li>
              <li>
                <a href="#gold-philosophy" className="hover:text-amber-400 transition-colors">
                  شعارنا: OLD IS ALWAYS GOLD
                </a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-amber-400 transition-colors">
                  حاسبة تمويل وتقسيط السيارات
                </a>
              </li>
              <li>
                <a href="#team" className="hover:text-amber-400 transition-colors">
                  أرقام كابتن صافي وفريق المعرض
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-amber-400 transition-colors">
                  عنوان المعرض بالإسكندرية والاتجاهات
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Contact Column */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-sm font-bold text-white mb-2">بيانات الاتصال والعنوان</h4>
            
            <div className="space-y-2 text-neutral-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{companyInfo.address} (الرمز البريدي: {companyInfo.postalCode})</span>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>الخط الأرضي: <a href={`tel:${companyInfo.landlineTel}`} className="text-white hover:text-amber-400 font-mono underline">{companyInfo.landline}</a></span>
              </div>

              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>الواتساب: <a href={`https://wa.me/${companyInfo.whatsappNumber.replace(/[^0-9]/g, '')}`} className="text-white hover:text-amber-400 font-mono">{companyInfo.whatsappDisplay}</a></span>
              </div>
            </div>

            <div className="pt-2 text-[11px] text-neutral-400 border-t border-neutral-900">
              مواعيد استقبال الزوار: {companyInfo.openingHours}
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-400">
          <div>
            © {new Date().getFullYear()} {companyInfo.nameAr} (Alsafy Motors). جميع الحقوق محفوظة.
          </div>

          <div className="flex items-center gap-6">
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="flex items-center gap-1.5 text-neutral-400 hover:text-amber-400 text-[11px] font-medium transition-colors cursor-pointer"
                title="بوابة الإدارة الشخصية - خاص المبرمج للتطبيق (ALBYAN)"
              >
                {isAdmin ? (
                  <>
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                    <span className="text-amber-400 font-bold">لوحة الإدارة الشخصية (مفعّلة - ALBYAN)</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5 text-amber-500/80" />
                    <span>بوابة الإدارة الشخصية - خاص المبرمج للتطبيق (ALBYAN)</span>
                  </>
                )}
              </button>
            )}

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-neutral-400 hover:text-amber-400 transition-colors cursor-pointer"
            >
              <span>العودة للأعلى</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
