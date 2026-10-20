import { Phone, MessageCircle, MapPin, Clock, Share2, ExternalLink, ShieldCheck, Mail, Sparkles, Building2 } from 'lucide-react';
import { companyInfo } from '../data/companyData';

interface ContactAndBranchesProps {
  onOpenPosterModal?: () => void;
}

export function ContactAndBranches({ onOpenPosterModal }: ContactAndBranchesProps) {
  const posterSrc = '/assets/images/alsafy_branch2_announcement.jpg';

  return (
    <section id="location" className="py-20 bg-neutral-900/90 text-white border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 text-amber-400 text-xs font-semibold mb-3 border border-amber-500/20">
            <Building2 className="w-3.5 h-3.5" />
            <span>فروع ومقرات شركة الصافي لتجارة السيارات بالإسكندرية</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            تفضل بزيارتنا أو تواصل مباشرة مع فريق العمل
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-neutral-400">
            نرحب بكم يومياً في صالة عرض شركة الصافي بالسيوف، ونترقب افتتاح فرعنا الثاني قريباً لنقدم لكم تجربة استثنائية أوسع وأشمل.
          </p>
        </div>

        {/* Two Branches Quick Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-14">
          
          {/* Branch 1: Main Showroom */}
          <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 hover:border-amber-500/40 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold">
                  مفتوح الآن ويستقبلكم
                </span>
                <span className="text-xs font-mono text-neutral-400">الفرع الرئيسي</span>
              </div>
              <h3 className="text-lg font-black text-white mb-1">الفرع الأول: صالة عرض السيوف</h3>
              <p className="text-xs text-neutral-300 leading-relaxed mb-3">
                السيوف - شارع مصطفى كامل - أمام فتح الله جملة ماركت مباشرة، الإسكندرية.
              </p>
              <div className="text-xs text-amber-400 flex items-center gap-1.5 font-medium mb-4">
                <Clock className="w-3.5 h-3.5" />
                <span>يومياً من 11:00 صباحاً حتى 12:00 منتصف الليل</span>
              </div>
            </div>

            <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between">
              <span className="text-xs font-mono text-neutral-400">الخط الأرضي: 03/5289660</span>
              <a
                href={companyInfo.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 underline"
              >
                <span>موقع الفرع بالخريطة</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Branch 2: Grand Opening Soon (Featuring the Uploaded Image) */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-neutral-950 via-neutral-950 to-neutral-900 border-2 border-amber-500/40 relative overflow-hidden flex flex-col justify-between group shadow-xl shadow-amber-500/5">
            <div className="absolute top-0 left-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-black flex items-center gap-1.5 animate-pulse">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>قريباً الافتتاح الرسمي</span>
                </span>
                <span className="text-xs font-mono text-amber-400 font-bold">الفرع الثاني</span>
              </div>
              
              <div className="flex items-start gap-4">
                <div 
                  onClick={onOpenPosterModal}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden border border-amber-500/50 shrink-0 cursor-pointer relative group/img shadow-md shadow-black"
                >
                  <img
                    src={posterSrc}
                    alt="إعلان افتتاح الفرع الثاني"
                    className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-neutral-950/40 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-opacity">
                    <span className="text-[10px] text-amber-300 font-bold">تكبير</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-black text-white mb-1">
                    افتتاح فرع تاني لمعرض الصافي لتجارة السيارات
                  </h3>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    خبر جديد لتجربة أفضل.. صالة عرض موسعة، تشكيلة متنوعة من كسر الزيرو، وأعلى معايير الجودة والضمان.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-3 mt-4 border-t border-neutral-800/80 flex items-center justify-between">
              {onOpenPosterModal ? (
                <button
                  onClick={onOpenPosterModal}
                  className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>استعراض البوستر الرسمي</span>
                </button>
              ) : (
                <a href="#new-branch" className="text-xs font-bold text-amber-400 hover:text-amber-300">
                  تفاصيل الفرع الثاني ←
                </a>
              )}

              <a
                href="#new-branch"
                className="px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-bold transition-colors"
              >
                سجل لحضور الافتتاح
              </a>
            </div>
          </div>

        </div>

        {/* Sales Team & Contact Numbers Directory (Cards) */}
        <div id="team" className="mb-14">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <span>أرقام المبيعات والتواصل المعتمدة</span>
            </h3>
            <span className="text-xs text-neutral-400">رد فوري طوال ساعات العمل</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {companyInfo.contacts.map((contact, idx) => (
              <div
                key={idx}
                className="bg-neutral-950 p-5 rounded-xl border border-neutral-800 hover:border-amber-500/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-medium text-amber-400">{contact.role}</span>
                    <span className="text-[10px] text-neutral-500 font-mono">{contact.badge}</span>
                  </div>
                  <h4 className="text-base font-bold text-white mb-2">{contact.title}</h4>
                  <div className="text-lg font-black text-amber-300 font-mono tracking-wider tabular-nums mb-4">
                    {contact.phone}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-neutral-800/80">
                  <a
                    href={`tel:${contact.tel}`}
                    className="py-2 px-2 text-xs font-bold text-center bg-neutral-900 hover:bg-neutral-800 text-neutral-200 hover:text-white rounded-lg border border-neutral-700/60 flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    <span>اتصال</span>
                  </a>
                  <a
                    href={`https://wa.me/${contact.tel.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`السلام عليكم، أود التواصل بخصوص سيارات شركة الصافي لتجارة السيارات`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2 px-2 text-xs font-bold text-center bg-emerald-600/90 hover:bg-emerald-600 text-white rounded-lg flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>واتساب</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Address and Interactive Location Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Address Details */}
          <div className="lg:col-span-5 bg-neutral-950 p-6 sm:p-8 rounded-2xl border border-neutral-800 flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              <div>
                <span className="text-xs font-mono text-amber-400 uppercase tracking-wider block mb-1">
                  MAIN SHOWROOM LOCATION
                </span>
                <h3 className="text-xl font-bold text-white">معرض شركة الصافي (Alsafy Motors)</h3>
              </div>

              {/* Exact Address from prompt */}
              <div className="flex items-start gap-3 p-4 rounded-xl bg-neutral-900 border border-neutral-800">
                <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs text-neutral-400">العنوان بالتفصيل:</div>
                  <div className="text-sm font-bold text-white mt-0.5 leading-relaxed">
                    {companyInfo.address}
                  </div>
                  <div className="text-xs text-amber-400/90 mt-1 font-mono">
                    الرمز البريدي: {companyInfo.postalCode}
                  </div>
                </div>
              </div>

              {/* Landline Number */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-neutral-900 border border-neutral-800">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-amber-400 shrink-0" />
                  <div>
                    <div className="text-xs text-neutral-400">الخط الأرضي للمعرض:</div>
                    <div className="text-sm font-bold text-white font-mono mt-0.5">{companyInfo.landline}</div>
                  </div>
                </div>
                <a
                  href={`tel:${companyInfo.landlineTel}`}
                  className="px-3 py-1.5 text-xs font-bold bg-neutral-800 hover:bg-neutral-700 text-amber-400 rounded-lg transition-colors"
                >
                  اتصل الآن
                </a>
              </div>

              {/* Official WhatsApp */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-neutral-900 border border-neutral-800">
                <div className="flex items-center gap-3">
                  <MessageCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <div className="text-xs text-neutral-400">رقم الواتساب الرسمي المعتمد:</div>
                    <div className="text-sm font-bold text-white font-mono mt-0.5">{companyInfo.whatsappDisplay}</div>
                  </div>
                </div>
                <a
                  href={`https://wa.me/${companyInfo.whatsappNumber.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors"
                >
                  مراسلة
                </a>
              </div>

              {/* Opening Hours */}
              <div className="flex items-center gap-3 text-xs text-neutral-400 px-1">
                <Clock className="w-4 h-4 text-neutral-500 shrink-0" />
                <span>مواعيد العمل: {companyInfo.openingHours}</span>
              </div>
            </div>

            {/* Social Media Handle */}
            <div className="pt-4 border-t border-neutral-800/80 flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs text-neutral-400">حسابات التواصل الاجتماعي:</span>
              <a
                href={companyInfo.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 bg-amber-400/10 hover:bg-amber-400/20 px-3 py-1.5 rounded-lg border border-amber-500/30 transition-all cursor-pointer"
                title="فتح صفحة فيسبوك الرسمية"
              >
                <svg className="w-3.5 h-3.5 fill-current text-blue-400 shrink-0" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span>صفحة المعرض على فيسبوك</span>
              </a>
            </div>
          </div>

          {/* Interactive Alexandria Map & Directions Card */}
          <div className="lg:col-span-7 bg-neutral-950 rounded-2xl border border-neutral-800 p-6 flex flex-col justify-between relative overflow-hidden">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-bold text-white">إرشادات الوصول إلى المعرض</h4>
                <a
                  href={companyInfo.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-amber-400 hover:underline flex items-center gap-1"
                >
                  <span>فتح في خرائط جوجل</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Visual Map Representation */}
              <div className="relative w-full h-64 sm:h-72 rounded-xl bg-neutral-900 border border-neutral-800 overflow-hidden flex flex-col justify-between p-6">
                
                {/* Stylized Alexandria street grid mockup */}
                <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#d4a34b_1px,transparent_1px)] [background-size:16px_16px]" />
                
                {/* Landmark Indicator */}
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center text-amber-400 shadow-xl shadow-amber-500/30 animate-pulse">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div className="text-sm font-bold text-white">
                    معرض الصافي للسيارات (Alsafy Motors)
                  </div>
                  <div className="text-xs text-amber-400 font-medium">
                    السيوف - شارع مصطفى كامل - أمام فتح الله ماركت مباشرة
                  </div>
                  <div className="text-[11px] text-neutral-400">
                    محافظة الإسكندرية (الرمز البريدي: 21533)
                  </div>
                </div>

                <div className="relative z-10 flex items-center justify-between text-xs text-neutral-400 bg-neutral-950/80 backdrop-blur-md px-3 py-2 rounded-lg border border-neutral-800">
                  <span>علامة مميزة: أمام فتح الله جملة ماركت</span>
                  <span className="text-emerald-400">تتوفر أماكن انتظار للسيارات</span>
                </div>
              </div>

              {/* Directions description */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-neutral-300 pt-2">
                <div className="p-3 bg-neutral-900/60 rounded-xl border border-neutral-800/80">
                  <strong className="text-amber-400 block mb-1">للقادمين من طريق الكورنيش / سيدي بشر:</strong>
                  <span>الدخول من شارع خالد بن الوليد أو شارع 45 باتجاه شارع مصطفى كامل والسيوف حتى الوصول لفتح الله ماركت.</span>
                </div>
                <div className="p-3 bg-neutral-900/60 rounded-xl border border-neutral-800/80">
                  <strong className="text-amber-400 block mb-1">للقادمين من طريق الحرية (أبو قير):</strong>
                  <span>النزول عند مزلقان السيوف ثم التوجه مباشرة لشارع مصطفى كامل الرئيسي أمام فتح الله ماركت.</span>
                </div>
              </div>

            </div>

            <div className="mt-4 pt-4 border-t border-neutral-800 flex items-center justify-between">
              <a
                href={companyInfo.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs sm:text-sm rounded-xl transition-colors text-center flex items-center justify-center gap-2"
              >
                <MapPin className="w-4 h-4" />
                <span>الاتجاهات عبر تطبيق خرائط Google Maps</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
