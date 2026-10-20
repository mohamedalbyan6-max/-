import { Shield, Sparkles, CheckCircle2, Users, BadgePercent, Car, Award, HeartHandshake } from 'lucide-react';
import { companyInfo } from '../data/companyData';

interface AboutWhyUsProps {
  onOpenTradeIn?: () => void;
}

export function AboutWhyUs({ onOpenTradeIn }: AboutWhyUsProps) {
  const pillars = [
    {
      icon: Car,
      title: 'تنوع لا محدود',
      badge: 'أسطول متجدد',
      description: 'نضم أسطولاً واسعاً من مختلف الماركات العالمية لتجد دائماً ما يناسب احتياجك وميزانيتك، بدءاً من السيارات العملية وحتى أفخم فئات الليموزين والدفع الرباعي.',
      accent: 'from-amber-400 to-amber-600',
    },
    {
      icon: Shield,
      title: 'حالة الزيرو (كسر زيرو فابريكا)',
      badge: 'فحص معتمد 100%',
      description: 'نضمن لك أفضل الحالات المفحوصة بدقة فنية تامة لتعيش تجربة شراء السيارة الزيرو برائحة الفابريكا وبأفضل سعر استثماري يوفر عليك مئات الآلاف.',
      accent: 'from-emerald-400 to-emerald-600',
    },
    {
      icon: BadgePercent,
      title: 'أسعار تنافسية وشفافية تامة',
      badge: 'أفضل قيمة بالسوق',
      description: 'نقدم أفضل قيمة مقابل سعر في السوق المصري مع شفافية كاملة في التسعير وعروض تقسيط ميسرة تمنحك راحة البال دون أي أعباء مخفية.',
      accent: 'from-blue-400 to-indigo-600',
    },
    {
      icon: HeartHandshake,
      title: 'فريق عمل في خدمتك بكل أمانة',
      badge: 'خبرة وأخلاق عالية',
      description: 'يضم معرضنا نخبة من الموظفين والاستشاريين بقمة الخُلق والخبرة تحت إشراف كابتن صافي، هدفهم مساعدتك في اختيار القرار الأنسب لك بكل راحة وأمانة ومصداقية.',
      accent: 'from-rose-400 to-amber-500',
    },
  ];

  return (
    <section id="about" className="py-20 bg-neutral-950 text-white border-t border-neutral-900 relative overflow-hidden">
      {/* Decorative ambient gradient */}
      <div className="absolute top-1/4 -right-48 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-48 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 text-amber-400 text-xs font-semibold mb-3 border border-amber-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>عن شركة الصافي لتجارة السيارات</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            لماذا يختار عملاؤنا <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 bg-clip-text text-transparent">"معرض الصافي"</span>؟
          </h2>
          <p className="mt-4 text-sm sm:text-base text-neutral-300 leading-relaxed">
            منذ انطلاقنا في قلب عروس البحر الأبيض المتوسط (الإسكندرية - السيوف)، أرسينا معايير جديدة في تجارة سيارات كسر الزيرو، قائمة على الأمانة، الخبرة، وحسن معاملة العملاء.
          </p>
        </div>

        {/* 4 Pillars Grid (User's Exact Core Points) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-neutral-900/80 border border-neutral-800 hover:border-amber-500/50 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-500/5 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-neutral-800/80 border border-neutral-700/60 flex items-center justify-center text-amber-400 group-hover:scale-110 group-hover:border-amber-500/50 transition-all">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-semibold text-amber-400/90 bg-amber-400/10 px-2.5 py-1 rounded-md border border-amber-500/20">
                      {pillar.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">
                    {pillar.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-normal">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-800/80 flex items-center gap-1.5 text-xs text-neutral-400">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>معتمد ومضمون 100% في الصافي</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Story & Heritage Philosophy Banner with Captain Safy & Team Photo */}
        <div className="bg-gradient-to-r from-neutral-900 via-neutral-950 to-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* Captain Safy Photo Thumbnail Card */}
          <div className="w-full sm:w-72 lg:w-80 shrink-0 relative rounded-2xl overflow-hidden border-2 border-amber-500/30 shadow-xl group">
            <img
              src="/assets/aistudio/IMG_________________b7b69478.jpg"
              alt="كابتن صافي وفريق عمل معرض الصافي للسيارات"
              className="w-full h-auto aspect-[3/4] object-cover object-top group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-3 right-3 left-3 text-right">
              <span className="text-xs font-bold text-white block">كابتن صافي وإدارة المعرض</span>
              <span className="text-[10px] text-amber-400 font-medium">السيوف - شارع مصطفى كامل</span>
            </div>
          </div>

          <div className="space-y-4 max-w-xl text-center lg:text-right flex-1">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-amber-400 uppercase">
              <Award className="w-4 h-4" />
              <span>{companyInfo.slogan} · أصل التميز بالإسكندرية</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug">
              نؤمن بأن السيارة استثمار في الأمان والراحة والفخامة
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              تحت إشراف مباشر من كابتن صافي، كل سيارة تدخل صالة عرضنا تخضع للفحص الميكانيكي، والكهربائي، وفحص الهيكل وشاسيه المصنع، مع إتاحة الفحص الحر في أي مركز معتمد من اختيار العميل قبل دفع أي مبالغ.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <a
                href="#showroom"
                className="w-full sm:w-auto px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-lg shadow-amber-500/20 text-center"
              >
                استكشف السيارات المتاحة الآن
              </a>
              {onOpenTradeIn && (
                <button
                  onClick={onOpenTradeIn}
                  className="w-full sm:w-auto px-6 py-3.5 bg-neutral-800 hover:bg-neutral-700 text-white font-semibold text-xs sm:text-sm rounded-xl border border-neutral-700 transition-all text-center cursor-pointer"
                >
                  تقييم واستبدال سيارتك
                </button>
              )}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
