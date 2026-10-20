import { useState, useMemo } from 'react';
import { Calculator, Check, MessageCircle, Percent, DollarSign, Calendar } from 'lucide-react';
import { Car } from '../types/car';
import { companyInfo } from '../data/companyData';

interface FinancingCalculatorProps {
  cars: Car[];
}

export function FinancingCalculator({ cars }: FinancingCalculatorProps) {
  const hasCars = cars.length > 0;
  const [selectedCarId, setSelectedCarId] = useState<string>(hasCars ? cars[0].id : 'custom');
  const [customPrice, setCustomPrice] = useState<number>(hasCars ? cars[0].priceEGP : 550000);
  const [isCustom, setIsCustom] = useState<boolean>(!hasCars);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(30); // 30%
  const [loanPeriodMonths, setLoanPeriodMonths] = useState<number>(36); // 3 years
  const annualInterestRate = 0.16; // 16% standard bank auto finance rate in Egypt

  // Handle car select change
  const handleCarChange = (carId: string) => {
    setSelectedCarId(carId);
    if (carId === 'custom' || !hasCars) {
      setIsCustom(true);
    } else {
      setIsCustom(false);
      const found = cars.find((c) => c.id === carId);
      if (found) {
        setCustomPrice(found.priceEGP);
      }
    }
  };

  const carPrice = (!hasCars || isCustom) 
    ? customPrice 
    : (cars.find((c) => c.id === selectedCarId)?.priceEGP || customPrice);

  const calculations = useMemo(() => {
    const downPaymentAmount = Math.round(carPrice * (downPaymentPercent / 100));
    const financedAmount = carPrice - downPaymentAmount;
    const years = loanPeriodMonths / 12;
    const totalInterest = Math.round(financedAmount * annualInterestRate * years);
    const totalRepayment = financedAmount + totalInterest;
    const monthlyPayment = Math.round(totalRepayment / loanPeriodMonths);

    return {
      downPaymentAmount,
      financedAmount,
      totalInterest,
      totalRepayment,
      monthlyPayment
    };
  }, [carPrice, downPaymentPercent, loanPeriodMonths]);

  const formatPrice = (num: number) => new Intl.NumberFormat('ar-EG').format(num);

  const selectedCar = cars.find((c) => c.id === selectedCarId);
  const carName = isCustom ? 'سيارة مخصصة' : selectedCar?.title || 'سيارة من المعرض';

  const waFinancingMessage = `السلام عليكم شركة الصافي لتجارة السيارات،
أرغب في الاستفسار والتقديم على نظام تقسيط:
السيارة المطلوبة: ${carName}
سعر السيارة: ${formatPrice(carPrice)} ج.م
المقدم المقترح (${downPaymentPercent}%): ${formatPrice(calculations.downPaymentAmount)} ج.م
مدة التقسيط: ${loanPeriodMonths} شهر
القسط الشهري المتوقع: ${formatPrice(calculations.monthlyPayment)} ج.م
يرجى إفادتي بالأوراق المطلوبة من بنوك وشركات التمويل المعتمدة لديكم.`;

  return (
    <section id="calculator" className="py-20 bg-neutral-900 text-white relative overflow-hidden">
      {/* Subtle metallic gold glow in background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-neutral-800 text-amber-400 text-xs font-semibold mb-3 border border-neutral-700">
            <Calculator className="w-3.5 h-3.5" />
            <span>حاسبة التمويل والتقسيط الذكية</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            احسب مقدم وقسط سيارتك بأعلى مرونة
          </h2>
          <p className="mt-3 text-neutral-400 text-xs sm:text-sm">
            نوفر في شركة الصافي بالتعاون مع كبرى البنوك والشركات الاستثمارية برامج تقسيط ميسرة بأقل فائدة بنكية وسرعة في إنهاء الإجراءات.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column */}
          <div className="lg:col-span-7 bg-neutral-950 p-6 sm:p-8 rounded-2xl border border-neutral-800 space-y-6">
            
            {/* Select Car */}
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-2">
                اختر السيارة من أسطول المعرض:
              </label>
              <select
                value={selectedCarId}
                onChange={(e) => handleCarChange(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-3 text-sm text-neutral-100 focus:outline-none focus:border-amber-400"
              >
                {cars.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title} ({c.year}) — {formatPrice(c.priceEGP)} ج.م
                  </option>
                ))}
                <option value="custom">-- سيارة أخرى / تحديد السعر يدوياً --</option>
              </select>
            </div>

            {/* Custom Price if selected */}
            {isCustom && (
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-2">
                  سعر السيارة التقديري (بالجنيه المصري):
                </label>
                <input
                  type="number"
                  min={100000}
                  step={50000}
                  value={customPrice}
                  onChange={(e) => setCustomPrice(Number(e.target.value))}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-3 text-sm text-neutral-100 focus:outline-none focus:border-amber-400 font-mono"
                />
              </div>
            )}

            {/* Down Payment Slider */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-2">
                <span className="text-neutral-300">نسبة المقدم المدفوع:</span>
                <span className="text-amber-400 font-bold font-mono text-sm">{downPaymentPercent}%</span>
              </div>
              <input
                type="range"
                min={20}
                max={70}
                step={5}
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
              <div className="flex justify-between text-[11px] text-neutral-500 mt-1">
                <span>20% (أقل مقدم)</span>
                <span>50%</span>
                <span>70% (أقل قسط شهري)</span>
              </div>
            </div>

            {/* Loan Period Tabs */}
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-2">
                فترة السداد والتقسيط:
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[12, 24, 36, 48, 60].map((months) => (
                  <button
                    key={months}
                    onClick={() => setLoanPeriodMonths(months)}
                    className={`py-2.5 px-3 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                      loanPeriodMonths === months
                        ? 'bg-amber-400 text-neutral-950 border-amber-400 shadow-md shadow-amber-500/10'
                        : 'bg-neutral-900 text-neutral-300 border-neutral-800 hover:border-neutral-700'
                    }`}
                  >
                    {months} شهر
                    <span className="block text-[10px] font-normal opacity-75">
                      ({months / 12} {months === 12 ? 'سنة' : months === 24 ? 'سنتين' : 'سنوات'})
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Features check */}
            <div className="pt-2 border-t border-neutral-800/80 text-xs text-neutral-400 space-y-1.5">
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-amber-400" />
                <span>إمكانية التقسيط للموظفين وأصحاب الأعمال والسجلات التجارية والأطباء.</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-amber-400" />
                <span>إجراءات استعلام بنكي سريعة ومساعدة كاملة في إنهاء التراخيص.</span>
              </div>
            </div>

          </div>

          {/* Results Column */}
          <div className="lg:col-span-5 bg-gradient-to-b from-neutral-950 to-neutral-900 p-6 sm:p-8 rounded-2xl border border-amber-500/30 shadow-xl space-y-6">
            
            <div className="text-center pb-6 border-b border-neutral-800">
              <div className="text-xs text-neutral-400 uppercase tracking-wider mb-1">القسط الشهري التقريبي</div>
              <div className="text-3xl sm:text-4xl font-black text-amber-400 tabular-nums">
                {formatPrice(calculations.monthlyPayment)}{' '}
                <span className="text-sm font-normal text-neutral-300">ج.م / شهر</span>
              </div>
              <div className="text-[11px] text-neutral-500 mt-1">على مدار {loanPeriodMonths} شهراً</div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-3 rounded-lg bg-neutral-900 border border-neutral-800">
                <span className="text-neutral-400">سعر السيارة الإجمالي:</span>
                <span className="font-bold text-white tabular-nums font-mono">{formatPrice(carPrice)} ج.م</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-neutral-900 border border-neutral-800">
                <span className="text-neutral-400">قيمة المقدم المطلوب ({downPaymentPercent}%):</span>
                <span className="font-bold text-amber-300 tabular-nums font-mono">{formatPrice(calculations.downPaymentAmount)} ج.م</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-neutral-900 border border-neutral-800">
                <span className="text-neutral-400">المبلغ الخاضع للتقسيط:</span>
                <span className="font-bold text-neutral-300 tabular-nums font-mono">{formatPrice(calculations.financedAmount)} ج.م</span>
              </div>
            </div>

            {/* Direct WhatsApp Action */}
            <div className="space-y-2 pt-2">
              <a
                href={`https://wa.me/${companyInfo.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(waFinancingMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-amber-500/20"
              >
                <MessageCircle className="w-4 h-4" />
                <span>إرسال تفاصيل التقسيط لواتساب المعرض</span>
              </a>

              <p className="text-[11px] text-center text-neutral-500">
                الحسابات استرشادية، وتتوقف النسبة النهائية على تصنيف البنك أو شركة التمويل وشروط التعاقد.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
