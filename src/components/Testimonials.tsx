import { Star, Quote, CheckCircle2 } from 'lucide-react';
import { companyInfo } from '../data/companyData';

export function Testimonials() {
  const reviews = [
    {
      name: "د. طارق المنشاوي",
      title: "استشاري جراحة - الإسكندرية",
      car: "مرسيدس بنز E-Class كسر زيرو",
      content: "شركة ممتازة تضم عدداً كبيراً من جميع أنواع السيارات كسر الزيرو وأغلب الماركات العالمية بأسعار تنافسية، وفريق عمل على أعلى قدر من الأخلاق والأمانة. كابتن صافي ساعدني في فحص وتخليص الأوراق في نفس اليوم.",
      rating: 5,
      date: "مارس 2026"
    },
    {
      name: "م. إسلام عبد العزيز",
      title: "رجل أعمال - سموحة",
      car: "بورشه ماكان GTS",
      content: "أول تجربة شراء سيارة بدون أي قلق. فحص شامل أمام عيني، وتقرير فابريكا 100% مطابق للواقع. شعار OLD IS ALWAYS GOLD يعكس شغفهم الحقيقي بالسيارات وليس مجرد تجارة.",
      rating: 5,
      date: "فبراير 2026"
    },
    {
      name: "أ. محمود القاضي",
      title: "محامي بالاستئناف - لوران",
      car: "بي إم دبليو الفئة الخامسة",
      content: "معاملة راقية جداً من موظفي المعرض، سرعة في إنهاء إجراءات التقسيط البنكي، والسيارة استلمتها بحالة الوكالة تماماً برائحة الفابريكا. أنصح بالتعامل مع شركة الصافي لكل من يبحث عن راحة البال.",
      rating: 5,
      date: "يناير 2026"
    }
  ];

  return (
    <section className="py-20 bg-neutral-950 text-white border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-neutral-900 text-amber-400 text-xs font-semibold mb-3 border border-neutral-800">
            <Quote className="w-3.5 h-3.5 text-amber-400" />
            <span>آراء وتقييمات العملاء</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            ثقة مبنية على الأمانة والسمعة الطيبة
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-neutral-400">
            شهادات عملائنا الكرام بعد تجربة الشراء والمعاينة في معرض الصافي بالسيوف.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-neutral-900/70 p-6 rounded-2xl border border-neutral-800/90 flex flex-col justify-between hover:border-amber-500/30 transition-all"
            >
              <div>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-6 font-normal">
                  "{rev.content}"
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">{rev.name}</h4>
                  <div className="text-[11px] text-neutral-400 mt-0.5">{rev.title}</div>
                  <div className="text-[10px] text-amber-400 font-medium mt-0.5">{rev.car}</div>
                </div>

                <div className="text-[10px] text-neutral-500 font-mono">
                  {rev.date}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
