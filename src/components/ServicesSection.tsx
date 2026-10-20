import { useState } from 'react';
import { ShieldCheck, CreditCard, RefreshCw, FileText, CheckCircle2, MessageCircle, ArrowRight, Sparkles } from 'lucide-react';
import { companyInfo } from '../data/companyData';

interface ServicesSectionProps {
  onOpenTradeIn: () => void;
  onOpenCalculator: () => void;
}

export function ServicesSection({ onOpenTradeIn, onOpenCalculator }: ServicesSectionProps) {
  const [activeTab, setActiveTab] = useState<number>(0);

  const services = [
    {
      id: 'inspection',
      icon: ShieldCheck,
      title: 'كشف وحالة السيارة المعتمد (120 نقطة)',
      subtitle: 'تقرير فحص فابريكا شامل ودقيق',
      description: 'نضمن لك حالة الفابريكا الصافية لجميع سيارات المعرض. يتم فحص المحرك، ناقل الحركة، الشاسيه، دهان المصنع بالنانو ديجيتال، والأنظمة الإلكترونية مع أحقية فحص العميل في أي مركز متخصص.',
      benefits: [
        'فحص سمك الطلاء بجهاز ديجيتال معتمد للتأكد من الفابريكا',
        'فحص كمبيوتر شامل للأعطال والكنترول والوسائد الهوائية',
        'فحص الشاسيه وقواعد الموتور والعفشة بالكامل',
        'شهادة ضمان حالة من المعرض تطابق فحص التوكيل'
      ],
      actionText: 'استفسر عن تقرير الفحص لأي سيارة',
      actionUrl: `https://wa.me/${companyInfo.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('السلام عليكم، أود الاستفسار عن كشف وفحص سيارات المعرض وتقارير الفابريكا المعتمدة')}`
    },
    {
      id: 'financing',
      icon: CreditCard,
      title: 'تسهيلات الدفع وبرامج التقسيط البنكي',
      subtitle: 'أقل مقدم وفائدة تنافسية وإجراءات سريعة',
      description: 'نوفر باقات تمويل مرنة بالتعاون مع كبرى البنوك وشركات التمويل الاستهلاكي المعتمدة في مصر، تناسب الموظفين وأصحاب السجلات التجارية والمهن الحرة والأطباء.',
      benefits: [
        'مقدم يبدأ من 20% فقط من إجمالي ثمن السيارة',
        'فترة سداد مرنة تصل حتى 5 سنوات (60 شهراً)',
        'استعلام بنكي سريع وموافقة ائتمانية خلال 48 ساعة',
        'إمكانية استخدام حاسبة التقسيط الفورية لتحديد القسط المناسب'
      ],
      actionText: 'جرب حاسبة التقسيط الآن',
      isCalculatorAction: true
    },
    {
      id: 'trade-in',
      icon: RefreshCw,
      title: 'استبدال وبيع سيارتك القديمة (Trade-In)',
      subtitle: 'أعلى تثمين نقدي فوري واستلام سيارتك الجديدة',
      description: 'وفر وقتك ومجهودك واستبدل سيارتك الحالية بأخرى كسر زيرو من المعرض في نفس اليوم، أو اعرضها للبيع المباشر بأعلى سعر سوقي عادل وموثق.',
      benefits: [
        'تثمين فوري ومنصف للسيارة في صالة المعرض بالسيوف',
        'خصم قيمة سيارتك القديمة مباشرة من مقدم أو ثمن السيارة الجديدة',
        'دفع فوري نقدي أو تحويل بنكي لحظي في حال رغبتك بالبيع المباشر',
        'تخليص كافة الإجراءات ونقل الملكية دون أي عناء منك'
      ],
      actionText: 'ابدأ طلب استبدال أو بيع سيارتك',
      isTradeInAction: true
    },
    {
      id: 'licensing',
      icon: FileText,
      title: 'إنهاء التراخيص ونقل الملكية الرسمي',
      subtitle: 'عقود موثقة ومتابعة مرورية سريعة',
      description: 'فريق عمل الصافي يتولى كافة الإجراءات القانونية ونقل الملكية، وشهادات البيانات والمخالفات، لنسلمك سيارتك برخصة سارية وجاهزة للقيادة فوراً.',
      benefits: [
        'تسليم السيارة بعقود بيع رسمية وموثقة بالشهر العقاري',
        'مراجعة واستخراج شهادات براءة الذمة والمخالفات المرورية',
        'تسهيل استخراج التراخيص في مختلف إدارات المرور بمصر',
        'فحص أرقام الشاسيه والموتور والمطابقة الرسمية'
      ],
      actionText: 'تواصل لمعرفة تفاصيل التراخيص',
      actionUrl: `https://wa.me/${companyInfo.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('السلام عليكم، أود الاستفسار عن إجراءات نقل الملكية والتراخيص لدى الصافي للسيارات')}`
    }
  ];

  const currentService = services[activeTab];
  const CurrentIcon = currentService.icon;

  return (
    <section id="services" className="py-20 bg-neutral-900 text-white border-t border-neutral-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 text-amber-400 text-xs font-semibold mb-3 border border-amber-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>خدمات الصافي المتكاملة</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            خدمات شاملة تبدأ من الفحص وحتى مفتاح القيادة
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-neutral-400">
            نهدف في معرض الصافي لتقديم تجربة امتلاك خالية من القلق مع خدمات متكاملة تحت سقف واحد.
          </p>
        </div>

        {/* Interactive Tab Selector */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
          {services.map((srv, idx) => {
            const Icon = srv.icon;
            const isActive = activeTab === idx;
            return (
              <button
                key={srv.id}
                onClick={() => setActiveTab(idx)}
                className={`p-4 rounded-xl border text-right transition-all flex flex-col justify-between cursor-pointer ${
                  isActive
                    ? 'bg-amber-400/10 border-amber-400 text-white shadow-lg shadow-amber-500/10'
                    : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2 rounded-lg ${isActive ? 'bg-amber-400 text-neutral-950 font-bold' : 'bg-neutral-900 text-amber-400'}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono text-neutral-500 font-bold">0{idx + 1}</span>
                </div>
                <div className="text-xs sm:text-sm font-bold text-white line-clamp-1">{srv.title}</div>
              </button>
            );
          })}
        </div>

        {/* Detailed Active Service Box */}
        <div className="bg-neutral-950 border border-neutral-800 rounded-3xl p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 bg-amber-400/10 px-3 py-1 rounded-md">
                  <CurrentIcon className="w-4 h-4" />
                  <span>{currentService.subtitle}</span>
                </div>
                <h3 className="text-xl sm:text-3xl font-extrabold text-white">
                  {currentService.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed pt-2">
                  {currentService.description}
                </p>
              </div>

              {/* Benefits Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2">
                {currentService.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-neutral-900/80 border border-neutral-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-neutral-300 font-medium leading-relaxed">{benefit}</span>
                  </div>
                ))}
              </div>

              {/* Call to Action for the service */}
              <div className="pt-4 flex flex-wrap items-center gap-3">
                {currentService.isCalculatorAction ? (
                  <button
                    onClick={onOpenCalculator}
                    className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md shadow-amber-500/20 flex items-center gap-2 cursor-pointer"
                  >
                    <span>{currentService.actionText}</span>
                    <ArrowRight className="w-4 h-4 rotate-180" />
                  </button>
                ) : currentService.isTradeInAction ? (
                  <button
                    onClick={onOpenTradeIn}
                    className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md shadow-amber-500/20 flex items-center gap-2 cursor-pointer"
                  >
                    <span>{currentService.actionText}</span>
                    <ArrowRight className="w-4 h-4 rotate-180" />
                  </button>
                ) : (
                  <a
                    href={currentService.actionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md shadow-amber-500/20 flex items-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{currentService.actionText}</span>
                  </a>
                )}
                
                <a
                  href={`tel:${companyInfo.landlineTel}`}
                  className="px-4 py-3 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white font-medium text-xs rounded-xl border border-neutral-800 transition-colors"
                >
                  استفسار هاتفي: {companyInfo.landline}
                </a>
              </div>
            </div>

            {/* Quick Summary Card Column */}
            <div className="lg:col-span-5 bg-neutral-900/90 border border-neutral-800 rounded-2xl p-6 space-y-4">
              <div className="text-xs font-mono text-amber-400 uppercase tracking-wider">
                معايير الجودة في شركة الصافي
              </div>
              <div className="space-y-3 text-xs text-neutral-300">
                <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 flex items-center justify-between">
                  <span>مدة الفحص والتسليم:</span>
                  <span className="font-bold text-white">تسليم فوري بنفس اليوم</span>
                </div>
                <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 flex items-center justify-between">
                  <span>حق الفحص الخارجي للعميل:</span>
                  <span className="font-bold text-emerald-400">متاح 100% في أي مركز</span>
                </div>
                <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 flex items-center justify-between">
                  <span>برامج التقسيط:</span>
                  <span className="font-bold text-amber-400">بنوك وشركات تمويل معتمدة</span>
                </div>
                <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 flex items-center justify-between">
                  <span>الفرع:</span>
                  <span className="font-bold text-white">السيوف - شارع مصطفى كامل</span>
                </div>
              </div>

              <div className="pt-2 text-[11px] text-neutral-500 leading-relaxed text-center">
                فريقنا متاح للإجابة على جميع استفساراتك الفنية والقانونية من 11 صباحاً حتى 12 منتصف الليل.
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
