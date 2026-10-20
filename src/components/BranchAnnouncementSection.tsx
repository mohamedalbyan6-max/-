import React, { useState } from 'react';
import { 
  Sparkles, 
  MapPin, 
  ShieldCheck, 
  Car as CarIcon, 
  Star, 
  Maximize2, 
  Calendar, 
  CheckCircle2, 
  Send, 
  Phone, 
  MessageCircle, 
  Bell, 
  ArrowLeft,
  Share2
} from 'lucide-react';
import { companyInfo } from '../data/companyData';

interface BranchAnnouncementSectionProps {
  onOpenPosterModal: () => void;
}

export function BranchAnnouncementSection({ onOpenPosterModal }: BranchAnnouncementSectionProps) {
  const posterSrc = '/assets/images/alsafy_branch2_announcement.jpg';

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredBrand, setPreferredBrand] = useState('تويوتا');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleRegisterVIP = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    setIsSubmitted(true);
    // WhatsApp auto-opener with pre-filled VIP reservation message
    const msg = encodeURIComponent(
      `السلام عليكم يا كابتن صافي، أود التسجيل في قائمة ضيوف افتتاح الفرع الثاني لمعرض الصافي:\n- الاسم: ${name}\n- الهاتف: ${phone}\n- الماركة المفضلة: ${preferredBrand}`
    );
    window.open(`https://wa.me/${companyInfo.whatsappNumber.replace(/[^0-9]/g, '')}?text=${msg}`, '_blank');
  };

  return (
    <section id="new-branch" className="relative py-20 bg-neutral-950 text-white overflow-hidden border-b border-neutral-800">
      
      {/* Background Decorative Lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#d4a34b_0.5px,transparent_0.5px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-amber-400/20 to-amber-500/20 text-amber-300 border border-amber-500/40 text-xs sm:text-sm font-black mb-4 shadow-lg shadow-amber-500/10 animate-pulse">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>خبر جديد لتجربة أفضل</span>
            <span className="text-amber-500 font-mono">✦</span>
            <span>الصافي لتجارة السيارات</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-4">
            قريباً افتتاح فرع تاني <br />
            <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 bg-clip-text text-transparent">
              لمعرض الصافي لتجارة السيارات
            </span>
          </h2>

          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-2xl mx-auto">
            خطوة جديدة في مسيرة التميز بمحافظة الإسكندرية لتوفير تشكيلة أكبر من أندر سيارات كسر الزيرو وفابريكا بالكامل، مع تجربة استثنائية ترتقي لتطلعات عملائنا الكرام.
          </p>
        </div>

        {/* 2-Column Main Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16">
          
          {/* Column 1: The Official Announcement Poster (Interactive Card) */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="relative w-full max-w-lg group">
              
              {/* Outer Golden Aura */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-amber-500/30 via-amber-400/20 to-amber-600/30 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Poster Card Container */}
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-amber-500/50 bg-neutral-900 shadow-2xl shadow-black">
                
                {/* Image */}
                <div 
                  onClick={onOpenPosterModal}
                  className="relative cursor-pointer overflow-hidden aspect-square flex items-center justify-center bg-black"
                >
                  <img
                    src={posterSrc}
                    alt="قريبا افتتاح فرع تاني لمعرض الصافي لتجارة السيارات"
                    className="w-full h-full object-cover sm:object-contain group-hover:scale-105 transition-transform duration-700 ease-out"
                    referrerPolicy="no-referrer"
                  />

                  {/* Hover Overlay with View Icon */}
                  <div className="absolute inset-0 bg-neutral-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2 backdrop-blur-xs">
                    <div className="w-14 h-14 rounded-full bg-amber-500 text-neutral-950 flex items-center justify-center shadow-lg shadow-amber-500/50 transform group-hover:scale-110 transition-transform">
                      <Maximize2 className="w-7 h-7" />
                    </div>
                    <span className="text-sm font-bold text-white tracking-wide">
                      انقر لتكبير واستعراض الصورة بجودة فائقة
                    </span>
                  </div>

                  {/* Official Ribbon Badge */}
                  <div className="absolute top-3 right-3 z-10">
                    <span className="px-3 py-1 rounded-lg bg-neutral-950/90 text-amber-400 border border-amber-500/40 text-[11px] font-black tracking-wider flex items-center gap-1.5 shadow-lg">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>بوستر الإعلان الرسمي</span>
                    </span>
                  </div>
                </div>

                {/* Card Bottom Bar */}
                <div className="p-4 bg-neutral-900/95 border-t border-neutral-800 flex items-center justify-between">
                  <div className="text-right">
                    <div className="text-xs text-neutral-400 font-mono">ALSAFY MOTORS · EXPANSION 2026</div>
                    <div className="text-sm font-bold text-white mt-0.5">فرع الصافي الجديد - الإسكندرية</div>
                  </div>

                  <button
                    onClick={onOpenPosterModal}
                    className="px-3.5 py-2 text-xs font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-xl flex items-center gap-1.5 transition-colors shadow-md shadow-amber-500/20 cursor-pointer"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>عرض كامل (HD)</span>
                  </button>
                </div>

              </div>
            </div>
          </div>

          {/* Column 2: 4 Core Pillars from the Poster + Story */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="space-y-3">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest block">
                WHAT TO EXPECT AT THE NEW SHOWROOM
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                أربعة أركان راسخة ترسم تجربة فرعنا الجديد
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                كما عهدتمونا دائماً في شركة الصافي، صممنا الفرع الثاني ليكون واحة متكاملة لعشاق السيارات كسر الزيرو مع التزام لا يتزعزع بأعلى معايير المصداقية والجودة.
              </p>
            </div>

            {/* 4 Pillars Grid (matching the 4 icons in the bottom of the poster) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              
              {/* Pillar 1: خدمة مميزة */}
              <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800 hover:border-amber-500/40 transition-all flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-400/10 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/20">
                  <Star className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-white">خدمة مميزة</h4>
                  <p className="text-[12px] text-neutral-400 mt-1 leading-relaxed">
                    استقبال راقٍ، استشارات مبيعات مخلصة، وسرعة فائقة في إنهاء إجراءات التسجيل والتراخيص.
                  </p>
                </div>
              </div>

              {/* Pillar 2: تشكيلة متنوعة */}
              <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800 hover:border-amber-500/40 transition-all flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-400/10 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/20">
                  <CarIcon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-white">تشكيلة متنوعة</h4>
                  <p className="text-[12px] text-neutral-400 mt-1 leading-relaxed">
                    خيارات متعددة تناسب كل الأذواق (تويوتا، هيونداي، كيا، إم جي، مرسيدس) سيدان، SUV، وكوبيه.
                  </p>
                </div>
              </div>

              {/* Pillar 3: أعلى معايير الجودة */}
              <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800 hover:border-amber-500/40 transition-all flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-400/10 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/20">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-white">أعلى معايير الجودة</h4>
                  <p className="text-[12px] text-neutral-400 mt-1 leading-relaxed">
                    فحص فني شامل معتمد بالمعرض لكل جزء حيوي بالسيارة لنضمن حالة الفابريكا الصافية 100%.
                  </p>
                </div>
              </div>

              {/* Pillar 4: ضمان حقيقي */}
              <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800 hover:border-amber-500/40 transition-all flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-400/10 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/20">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-white">ضمان حقيقي</h4>
                  <p className="text-[12px] text-neutral-400 mt-1 leading-relaxed">
                    شفافية تامة بدون أي تلاعب بالعدادات، وأمانة مطلقة تجعل سيارتك استثماراً آمناً ومريحاً.
                  </p>
                </div>
              </div>

            </div>

            {/* Quick Contact Line for Branch Details */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-neutral-900 via-neutral-900/90 to-neutral-950 border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-right">
                <div className="text-xs text-neutral-400">للاستفسار عن افتتاح الفرع وتفاصيل موعد الإطلاق:</div>
                <div className="text-sm font-bold text-amber-300 font-mono mt-0.5">
                  كابتن صافي: 01069586454 / 01556899815
                </div>
              </div>
              <a
                href={`https://wa.me/${companyInfo.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('السلام عليكم يا كابتن صافي، أود الاستفسار عن موعد وتفاصيل افتتاح الفرع الثاني لمعرض الصافي.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-xs font-bold bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg flex items-center gap-1.5 border border-neutral-700 shrink-0"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>تواصل واتساب</span>
              </a>
            </div>

          </div>

        </div>

        {/* VIP Pre-Registration / Opening Invitation RSVP Banner */}
        <div className="relative rounded-2xl sm:rounded-3xl bg-gradient-to-br from-neutral-900 via-neutral-900 to-neutral-950 border border-amber-500/30 p-6 sm:p-10 shadow-2xl overflow-hidden">
          
          <div className="absolute top-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-6 space-y-3 text-right">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-bold">
                <Bell className="w-3.5 h-3.5" />
                <span>دعوة خاصة لكبار العملاء</span>
              </div>
              <h3 className="text-xl sm:text-3xl font-black text-white">
                كن أول الحاضرين في حفل الافتتاح الرسمي
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                سجل اهتمامك الآن لتصلك دعوة الافتتاح الرسمي فور تحديد الموعد النهائي، ولتستفيد من العروض الحصرية وأسعار الافتتاح التنافسية على أول دفعة من سيارات كسر الزيرو بالفرع الجديد.
              </p>
            </div>

            <div className="lg:col-span-6">
              {isSubmitted ? (
                <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/40 text-center space-y-2 animate-fade-in">
                  <div className="w-12 h-12 rounded-full bg-amber-400 text-neutral-950 flex items-center justify-center mx-auto font-black">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-white">تم تسجيل اهتمامك بنجاح!</h4>
                  <p className="text-xs text-neutral-300">
                    شكراً لك {name}. سيقوم فريق مبيعات كابتن صافي بإرسال دعوة الافتتاح وأحدث العروض فور صدورها.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-xs text-amber-400 underline pt-2 cursor-pointer"
                  >
                    تسجيل رقم آخر
                  </button>
                </div>
              ) : (
                <form onSubmit={handleRegisterVIP} className="space-y-3 bg-neutral-950/70 p-4 sm:p-5 rounded-2xl border border-neutral-800">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-300 mb-1">
                        الاسم الكريم
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="مثال: أحمد محمود"
                        className="w-full px-3 py-2 text-xs rounded-xl bg-neutral-900 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-hidden focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-300 mb-1">
                        رقم الهاتف / الواتساب
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="010XXXXXXXX"
                        className="w-full px-3 py-2 text-xs rounded-xl bg-neutral-900 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-hidden focus:border-amber-400 font-mono text-right"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-300 mb-1">
                      الماركة أو الفئة المهتم بالاستفسار عنها
                    </label>
                    <select
                      value={preferredBrand}
                      onChange={(e) => setPreferredBrand(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-neutral-900 border border-neutral-700 text-white focus:outline-hidden focus:border-amber-400"
                    >
                      <option value="تويوتا (SUV وسيدان)">تويوتا (Toyota)</option>
                      <option value="هيونداي (كسر زيرو)">هيونداي (Hyundai)</option>
                      <option value="كيا (Kia)">كيا (Kia)</option>
                      <option value="مرسيدس بنز (Mercedes-Benz)">مرسيدس بنز (Mercedes-Benz)</option>
                      <option value="إم جي (MG)">إم جي (MG)</option>
                      <option value="بي إم دبليو (BMW)">بي إم دبليو (BMW)</option>
                      <option value="جميع الفئات المتاحة">جميع فئات كسر الزيرو المتاحة</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-4 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-neutral-950 text-xs sm:text-sm font-black rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>تأكيد تسجيل الاهتمام واستلام دعوة الافتتاح</span>
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
