import { Sparkles, ShieldCheck, Award, ArrowRight } from 'lucide-react';
import { companyInfo } from '../data/companyData';

interface OldIsAlwaysGoldSectionProps {
  onExploreClassics: () => void;
}

export function OldIsAlwaysGoldSection({ onExploreClassics }: OldIsAlwaysGoldSectionProps) {
  return (
    <section id="gold-philosophy" className="py-20 bg-neutral-950 text-white border-t border-neutral-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Visual Showcase with Golden Mercedes Gullwing */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-amber-500/30 shadow-2xl shadow-amber-500/10 group">
              <img
                src="/src/assets/images/car_classic_gold_1792470157147.jpg"
                alt="OLD IS ALWAYS GOLD - سيارات كلاسيكية ونادرة بشركة الصافي"
                referrerPolicy="no-referrer"
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-70" />
              
              <div className="absolute bottom-6 right-6 left-6 p-4 rounded-xl bg-neutral-950/80 backdrop-blur-md border border-amber-500/30">
                <div className="text-amber-400 font-bold text-xs uppercase tracking-widest font-mono">
                  THE HERITAGE VAULT
                </div>
                <div className="text-base font-bold text-white mt-1">
                  شعارنا الراسخ: {companyInfo.slogan}
                </div>
                <div className="text-xs text-neutral-400 mt-0.5">
                  أصالة الهندسة الميكانيكية التي تزداد قيمة وبريقاً مع مرور السنين.
                </div>
              </div>
            </div>
          </div>

          {/* Story & Philosophy Content */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>فلسفة شركة الصافي للسيارات</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              لماذا نؤمن بأن <br />
              <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 bg-clip-text text-transparent">
                "OLD IS ALWAYS GOLD"
              </span>
            </h2>

            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
              في عالم تتسارع فيه التغييرات، يظل الجوهر الأصيل هو الذهب الذي لا يصدأ. في شركة الصافي لتجارة السيارات، لا نبيع مجرد سيارات؛ بل ننتقي لك قمة الهندسة العالمية بحالات نادرة تشبه الذهب الخالص.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-neutral-900/60 border border-neutral-800">
                <div className="p-2.5 rounded-lg bg-amber-400/10 text-amber-400 shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">انتقاء السيارات كسر الزيرو بدقة متناهية</h4>
                  <p className="text-xs text-neutral-400 mt-1">
                    نختار السيارات ذات العدادات القليلة جداً وحالة الفابريكا الخالصة، لنضمن لك شراء سيارة جديدة بروح الوكالة وبسعر استثماري ذكي.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-neutral-900/60 border border-neutral-800">
                <div className="p-2.5 rounded-lg bg-amber-400/10 text-amber-400 shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">أمانة المعاملة وأخلاق فريق العمل</h4>
                  <p className="text-xs text-neutral-400 mt-1">
                    فريق مبيعات وإدارة تحت إشراف كابتن صافي يضع مصلحة العميل أولاً، بصدق تام في كشف كل تفاصيل السيارة وتاريخها.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onExploreClassics}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-amber-400 hover:text-amber-300 border border-amber-500/40 text-xs sm:text-sm font-bold transition-all cursor-pointer"
              >
                <span>استعراض السيارات التراثية والمميزة</span>
                <ArrowRight className="w-4 h-4 rotate-180" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
