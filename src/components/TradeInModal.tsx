import { useState } from 'react';
import { X, Check, Car as CarIcon, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { companyInfo } from '../data/companyData';

interface TradeInModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TradeInModal({ isOpen, onClose }: TradeInModalProps) {
  if (!isOpen) return null;

  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [mileage, setMileage] = useState('');
  const [condition, setCondition] = useState('فابريكا بالكامل بدون أي رش');
  const [expectedPrice, setExpectedPrice] = useState('');
  const [intent, setIntent] = useState<'sell' | 'trade'>('sell');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;

    const intentText = intent === 'trade' ? 'استبدال بسيارة أخرى من المعرض' : 'بيع مباشر نقداً';
    const message = `السلام عليكم شركة الصافي لتجارة السيارات (Alsafy Motors)،
أرغب في ${intentText}:
- الماركة: ${brand || 'غير محدد'}
- الموديل: ${model || 'غير محدد'}
- سنة الصنع: ${year || 'غير محدد'}
- قراءة العداد: ${mileage || 'غير محدد'} كم
- حالة الدهان والسيارة: ${condition}
- السعر المطلوب التقديري: ${expectedPrice ? expectedPrice + ' ج.م' : 'بناءً على التثمين والتقييم'}
- رقم هاتف العميل: ${phone}
أرجو التواصل لتحديد موعد فحص السيارة بالمعرض.`;

    const waUrl = `https://wa.me/${companyInfo.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-xl bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl text-neutral-100"
      >
        
        {/* Header */}

        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-950">
          <div className="flex items-center gap-2">
            <CarIcon className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-white">استبدل أو اعرض سيارتك للبيع في الصافي</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                <Check className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white">تم تجهيز وإرسال تفاصيل سيارتك بنجاح!</h4>
              <p className="text-xs text-neutral-400 max-w-sm mx-auto leading-relaxed">
                يقوم فريق التثمين بقيادة كابتن صافي بمراجعة بيانات سيارتك والتواصل معك عبر الواتساب أو الهاتف لتحديد موعد الكشف وتقديم أعلى تقييم نقدي عادل.
              </p>
              <button
                onClick={onClose}
                className="mt-4 px-6 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-xs font-semibold"
              >
                إغلاق
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              {/* Intent Choice */}
              <div>
                <label className="block text-neutral-300 font-semibold mb-1.5">نوع الطلب:</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setIntent('sell')}
                    className={`py-2 px-3 rounded-lg border text-center font-bold transition-all cursor-pointer ${
                      intent === 'sell'
                        ? 'bg-amber-400 text-neutral-950 border-amber-400'
                        : 'bg-neutral-950 text-neutral-300 border-neutral-800 hover:border-neutral-700'
                    }`}
                  >
                    بيع سيارتي كاش
                  </button>
                  <button
                    type="button"
                    onClick={() => setIntent('trade')}
                    className={`py-2 px-3 rounded-lg border text-center font-bold transition-all cursor-pointer ${
                      intent === 'trade'
                        ? 'bg-amber-400 text-neutral-950 border-amber-400'
                        : 'bg-neutral-950 text-neutral-300 border-neutral-800 hover:border-neutral-700'
                    }`}
                  >
                    استبدال بسيارة أخرى كسر زيرو
                  </button>
                </div>
              </div>

              {/* Brand and Model */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-400 mb-1">ماركة السيارة (مثال: مرسيدس، بي إم، هيونداي)</label>
                  <input
                    type="text"
                    required
                    placeholder="الماركة"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-neutral-400 mb-1">الموديل والفئة</label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: C180 AMG"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Year and Mileage */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-400 mb-1">سنة الصنع (الموديل)</label>
                  <input
                    type="number"
                    min="1970"
                    max="2026"
                    required
                    placeholder="مثال: 2023"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-neutral-400 mb-1">قراءة العداد (بالكيلومتر)</label>
                  <input
                    type="number"
                    placeholder="مثال: 25000"
                    value={mileage}
                    onChange={(e) => setMileage(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Condition */}
              <div>
                <label className="block text-neutral-400 mb-1">حالة الطلاء والدهان</label>
                <select
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="فابريكا بالكامل بدون أي رش نهائياً">فابريكا بالكامل بدون أي رش نهائياً (حالة زيرو)</option>
                  <option value="فابريكا دواخل مع رش خارجي نظافة">فابريكا دواخل مع رش خارجي نظافة (أجزاء بسيطة)</option>
                  <option value="حالة كلاسيكية ممتازة">حالة كلاسيكية مجددة أصلي</option>
                  <option value="تحتاج فحص وتثمين">تحتاج إلى معاينة وتثمين داخل المعرض</option>
                </select>
              </div>

              {/* Price and Phone */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-400 mb-1">السعر المطلوب (اختياري)</label>
                  <input
                    type="text"
                    placeholder="مثال: 2,500,000"
                    value={expectedPrice}
                    onChange={(e) => setExpectedPrice(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-neutral-400 mb-1">رقم الهاتف للتواصل</label>
                  <input
                    type="tel"
                    required
                    placeholder="مثال: 010xxxxxxxx"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>إرسال بيانات السيارة لتقييم كابتن صافي عبر واتساب</span>
                </button>
              </div>

            </form>
          )}
        </div>

      </motion.div>
    </div>
  );
}

