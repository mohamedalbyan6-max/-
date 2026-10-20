import { ArrowDown, MessageCircle, Phone, Sparkles, ShieldCheck, CheckCircle2, MapPin } from 'lucide-react';
import { companyInfo } from '../data/companyData';
import { motion } from 'framer-motion';

interface HeroProps {
  onBrowseClick: () => void;
  onTradeInClick: () => void;
  onOpenCalculator?: () => void;
  onOpenPosterModal?: () => void;
}

export function Hero({ onBrowseClick, onTradeInClick, onOpenCalculator, onOpenPosterModal }: HeroProps) {
  const heroImage = '/src/assets/images/mercedes_g_class_1792476125977.jpg';

  return (
    <div id="hero" className="relative w-full bg-neutral-950 overflow-hidden border-b border-neutral-800">
      
      {/* Ambient background with darkened blur of the Mercedes G-Class */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <img
          src={heroImage}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-center opacity-20 blur-2xl scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/80 via-neutral-950/95 to-neutral-950" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Text and Actions Column (7 cols on lg) */}
          <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-right order-2 lg:order-1">
            
            {/* New Branch Announcement Pill & Slogan */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 mb-6">
              <a
                href="#new-branch"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-amber-400/20 to-amber-500/20 border border-amber-500/40 text-amber-300 text-xs sm:text-sm font-bold shadow-md shadow-amber-500/10 hover:border-amber-400 transition-all group"
              >
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                <span>قريباً: افتتاح فرع تاني لمعرض الصافي</span>
                <span className="text-amber-400 group-hover:-translate-x-1 transition-transform">←</span>
              </a>

              <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300 text-xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>{companyInfo.slogan}</span>
                <span className="text-neutral-600">·</span>
                <span className="text-neutral-400">السيوف، الإسكندرية</span>
              </div>
            </div>

            {/* Main Headline (User's Exact Specification) */}
            <h1 className="text-3xl sm:text-5xl lg:text-5xl font-black text-white tracking-tight leading-tight sm:leading-tight mb-4">
              <span className="block text-white">معرض الصافي للسيارات</span>
              <span className="block mt-2 bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 bg-clip-text text-transparent">
                وجهتك الأولى لسيارات كسر الزيرو بحالة الفابريكا
              </span>
            </h1>

            {/* Subtitle (User's Exact Specification) */}
            <p className="max-w-2xl text-base sm:text-lg text-neutral-300 leading-relaxed font-normal mb-8 mx-auto lg:mx-0">
              تنوع بيغطي كل تطلعاتك.. أسعار تنافسية.. وفريق عمل في خدمتك بكل أمانة واحترافية.
            </p>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 mb-8">
              <button
                onClick={onBrowseClick}
                className="px-6 py-3.5 text-sm sm:text-base font-bold text-neutral-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-xl shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 transition-all flex items-center gap-2 group cursor-pointer"
              >
                <span>تصفح سيارات المعرض</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </button>

              <a
                href={`https://wa.me/${companyInfo.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('السلام عليكم يا كابتن صافي، أود الاستفسار عن سيارات كسر الزيرو المتاحة بالمعرض حالياً.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 text-sm sm:text-base font-bold text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 hover:border-amber-500/50 rounded-xl transition-all flex items-center gap-2 shadow-md shadow-black/40"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>تواصل عبر الواتساب للاستفسار</span>
              </a>

              <button
                onClick={onTradeInClick}
                className="px-5 py-3.5 text-xs sm:text-sm font-semibold text-neutral-300 hover:text-white bg-neutral-900/60 hover:bg-neutral-800 border border-neutral-800 rounded-xl transition-all cursor-pointer"
              >
                استبدال سيارتك
              </button>

              {onOpenCalculator && (
                <button
                  onClick={onOpenCalculator}
                  className="px-5 py-3.5 text-xs sm:text-sm font-semibold text-amber-300 hover:text-amber-200 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-xl transition-all cursor-pointer"
                >
                  حاسبة التقسيط
                </button>
              )}
            </div>

            {/* Direct Phone Anchors */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-2 text-xs sm:text-sm text-neutral-400 pt-3 border-t border-neutral-800/80">
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>الخط الأرضي:</span>
                <a href={`tel:${companyInfo.landlineTel}`} className="font-mono text-neutral-200 hover:text-amber-400 underline">
                  {companyInfo.landline}
                </a>
              </span>
              <span className="text-neutral-600">·</span>
              <span className="flex items-center gap-1.5">
                <span>كابتن صافي:</span>
                <a href="tel:+201069586454" className="font-mono text-neutral-200 hover:text-amber-400 font-bold">
                  01069586454
                </a>
                <span className="text-neutral-600">/</span>
                <a href="tel:+201556899815" className="font-mono text-neutral-200 hover:text-amber-400 font-bold">
                  01556899815
                </a>
              </span>
            </div>

          </div>

          {/* Dedicated Mercedes G-Class Cover Photo Showcase Column (5 cols on lg) */}
          <div className="lg:col-span-5 flex justify-center order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="relative w-full max-w-sm sm:max-w-md lg:max-w-none group"
            >
              {/* Outer Glow */}
              <div className="absolute -inset-1 bg-gradient-to-b from-amber-500/30 via-amber-600/15 to-transparent rounded-3xl blur-xl opacity-80 group-hover:opacity-100 transition-opacity" />

              {/* Main Photo Card */}
              <div className="relative rounded-3xl overflow-hidden border-2 border-amber-500/40 bg-neutral-900 shadow-2xl shadow-black/80">
                <img
                  src={heroImage}
                  alt="مرسيدس بنز جي كلاس G-Class - معرض الصافي للسيارات"
                  className="w-full h-auto aspect-[16/10] sm:aspect-[16/10] object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />

                {/* Subtle gradient at bottom for text contrast */}
                <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-transparent" />

                {/* Overlaid Showroom Badge */}
                <div className="absolute top-4 right-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-950/85 backdrop-blur-md text-amber-300 border border-amber-500/30 text-xs font-bold shadow-lg">
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    <span>مرسيدس بنز G-Class AMG</span>
                  </span>
                </div>

                {/* Bottom Caption */}
                <div className="absolute bottom-4 right-4 left-4 p-3.5 rounded-2xl bg-neutral-950/85 backdrop-blur-md border border-neutral-800 text-right">
                  <div className="text-sm font-black text-white flex items-center justify-between">
                    <span>Mercedes-Benz G-Class</span>
                    <span className="text-[11px] text-amber-400 font-mono font-bold">ALSAFY MOTORS</span>
                  </div>
                  <div className="text-[11px] text-neutral-300 mt-1 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>معرض الصافي - السيوف شارع مصطفى كامل بالإسكندرية</span>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* 4-Column KPI Trust Strip */}
      <div className="border-t border-neutral-800/80 bg-neutral-900/60 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-black text-amber-400 tabular-nums">100% فابريكا</div>
              <div className="text-xs sm:text-sm text-neutral-300 font-medium">فحص فني شامل معتمد بالمعرض</div>
            </div>

            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-black text-white tabular-nums">تنوع لا محدود</div>
              <div className="text-xs sm:text-sm text-neutral-300 font-medium">مختلف الماركات بأفضل جودة</div>
            </div>

            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-black text-amber-400 tabular-nums">أسعار تنافسية</div>
              <div className="text-xs sm:text-sm text-neutral-300 font-medium">أفضل قيمة كاش مع تسهيلات تقسيط</div>
            </div>

            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-black text-white">أمانة وخبرة</div>
              <div className="text-xs sm:text-sm text-neutral-300 font-medium">فريق عمل في خدمتك بكل مصداقية</div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
