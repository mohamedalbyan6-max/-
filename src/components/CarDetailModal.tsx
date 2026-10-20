import { useState, useEffect } from 'react';
import { X, ShieldCheck, Check, Calendar, Phone, MessageCircle, Sparkles, AlertCircle, ArrowLeft, Camera, Gauge, Wrench, Fuel, Award, Edit3, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Car } from '../types/car';
import { companyInfo } from '../data/companyData';

interface CarDetailModalProps {
  car: Car | null;
  isAdmin?: boolean;
  onClose: () => void;
  onOpenCalculator?: () => void;
  onEditCar?: (car: Car) => void;
  onDeleteCar?: (carId: string) => void;
}

export function CarDetailModal({ car, isAdmin = false, onClose, onOpenCalculator, onEditCar, onDeleteCar }: CarDetailModalProps) {
  if (!car) return null;

  const [activeImage, setActiveImage] = useState<string>(car.image);
  const [bookingName, setBookingName] = useState('');
  const [bookingPhone, setBookingPhone] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    setActiveImage(car.image);
    setBookingSuccess(false);
  }, [car]);

  const allImages = [car.image, ...(car.additionalImages || [])];
  const formatPrice = (num: number) => new Intl.NumberFormat('ar-EG').format(num);

  const handleBookViewing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingPhone) return;

    const message = `مرحباً كابتن صافي (شركة الصافي لتجارة السيارات)، أود حجز موعد لمعاينة السيارة التالية:
- السيارة: ${car.title} (موديل ${car.year})
- السعر: ${formatPrice(car.priceEGP)} ج.م
- الاسم: ${bookingName || 'عميل كريم'}
- رقم الهاتف: ${bookingPhone}
- الموعد المقترح: ${bookingDate || 'اليوم أو في أقرب وقت'}
- فرع المعرض: السيوف - شارع مصطفى كامل أمام فتح الله ماركت`;

    const waUrl = `https://wa.me/${companyInfo.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    const link = document.createElement('a');
    link.href = waUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.click();
    setBookingSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-4xl bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl text-neutral-100 max-h-[92vh] flex flex-col"
      >
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-950">
          <div className="flex items-center gap-3">
            <span className="text-amber-400 font-bold text-xs uppercase tracking-wider font-mono">
              ALSAFY MOTORS · بطاقة الفحص والمواصفات
            </span>
            <span className="text-neutral-500">·</span>
            <span className="text-neutral-300 text-xs font-semibold">{car.brand} {car.model}</span>
          </div>
          <div className="flex items-center gap-2">
            {isAdmin && onEditCar && (
              <button
                onClick={() => onEditCar(car)}
                className="px-2.5 py-1 text-xs font-bold text-amber-400 hover:text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors"
                title="تعديل بيانات وعداد السيارة"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>تعديل الإعلان</span>
              </button>
            )}
            {isAdmin && onDeleteCar && (
              <button
                onClick={() => {
                  if (window.confirm(`هل أنت متأكد من مسح سيارة "${car.title}" نهائياً من المعرض؟`)) {
                    onDeleteCar(car.id);
                    onClose();
                  }
                }}
                className="px-2.5 py-1 text-xs font-bold text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors"
                title="مسح هذه السيارة من المعرض"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>مسح السيارة</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
              aria-label="إغلاق النافذة"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body - Scrollable */}
        <div className="overflow-y-auto p-6 space-y-8">
          
          {/* Header & High Resolution Media Gallery */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            <div className="lg:col-span-7 space-y-3">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-800 shadow-inner">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImage}
                    src={activeImage}
                    alt={car.title}
                    referrerPolicy="no-referrer"
                    initial={{ opacity: 0.8 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0.8 }}
                    transition={{ duration: 0.2 }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>
                
                {/* Condition Badge */}
                <div className="absolute top-3 right-3">
                  <span className="px-3 py-1 bg-black/85 backdrop-blur-md text-amber-400 text-xs font-bold rounded-lg border border-amber-500/30">
                    {car.condition}
                  </span>
                </div>

                {/* Slogan Pill */}
                <div className="absolute bottom-3 left-3">
                  <span className="px-2.5 py-1 bg-neutral-950/80 backdrop-blur-md text-[10px] text-neutral-300 rounded font-mono">
                    معرض الصافي - فابريكا
                  </span>
                </div>
              </div>

              {/* Thumbnails Gallery Selector */}
              {allImages.length > 1 && (
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 overflow-x-auto pb-1">
                    {allImages.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImage(img)}
                        className={`relative w-20 h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                          activeImage === img ? 'border-amber-400 scale-105 shadow-md shadow-amber-500/20' : 'border-neutral-800 opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img src={img} alt={`صورة معاينة ${i + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                  <span className="text-[11px] text-neutral-400 flex items-center gap-1.5 pt-1">
                    <Camera className="w-3.5 h-3.5 text-amber-400" />
                    <span>صور المعاينة الفعلية من أرض المعرض بالإسكندرية (اضغط للتبديل بين الزوايا والصالون الداخلي)</span>
                  </span>
                </div>
              )}
            </div>

            {/* Quick Car Info & Pricing */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
              <div>
                <h2 className="text-2xl font-black text-white leading-tight mb-2">
                  {car.title}
                </h2>

                <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-400 mb-4">
                  <span>الموديل: <strong className="text-white">{car.year}</strong></span>
                  <span>·</span>
                  <span>العداد: <strong className="text-amber-400 font-mono">{car.mileageKm.toLocaleString()} كم</strong></span>
                  <span>·</span>
                  <span>اللون: <strong className="text-neutral-200">{car.color}</strong></span>
                </div>

                <div className="bg-neutral-950 p-5 rounded-2xl border border-neutral-800 space-y-3">
                  <div className="text-xs text-neutral-400 font-semibold">سعر الكاش التنافسي في الصافي</div>
                  <div className="text-2xl sm:text-3xl font-black text-amber-400 tabular-nums">
                    {formatPrice(car.priceEGP)}{' '}
                    <span className="text-sm font-normal text-neutral-400">جنيه مصري</span>
                  </div>

                  {car.monthlyEstimateEGP > 0 && (
                    <div className="text-xs text-neutral-300 pt-3 border-t border-neutral-800/80 flex items-center justify-between">
                      <span>إمكانية التقسيط من:</span>
                      <span className="font-bold text-amber-300 tabular-nums font-mono">{formatPrice(car.monthlyEstimateEGP)} ج.م / شهر</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Direct Instant Action Buttons */}
              <div className="space-y-2.5 pt-2">
                <a
                  href={`https://wa.me/${companyInfo.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`السلام عليكم يا كابتن صافي، أود الاستفسار عن سيارة ${car.title} (${car.year}) وسعرها ${formatPrice(car.priceEGP)} ج.م`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/15 transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>تواصل عبر الواتساب للاستفسار المباشر</span>
                </a>

                <a
                  href="tel:+201069586454"
                  className="w-full py-3 px-4 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 hover:text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>اتصال مباشر بكابتن صافي (01069586454)</span>
                </a>
              </div>
            </div>

          </div>

          {/* 5-Point Guaranteed Inspection Breakdown */}
          <div className="bg-neutral-950 p-6 rounded-2xl border border-neutral-800 space-y-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-400" />
              <h3 className="text-base sm:text-lg font-bold text-white">تقرير فحص الفابريكا الشامل (معتمد لدى الصافي)</h3>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              جميع السيارات تخضع لكشف دقيق وفحص كمبيوتر وهيكل كامل لضمان أعلى مستويات الأمانة والشفافية:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 bg-neutral-900/90 rounded-xl border border-neutral-800 flex items-start gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 mt-1 shrink-0" />
                <div>
                  <div className="font-bold text-neutral-200">حالة المحرك والأداء:</div>
                  <div className="text-neutral-400 mt-1 leading-relaxed">{car.inspectionPoints.engine}</div>
                </div>
              </div>

              <div className="p-3.5 bg-neutral-900/90 rounded-xl border border-neutral-800 flex items-start gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 mt-1 shrink-0" />
                <div>
                  <div className="font-bold text-neutral-200">الفتيس وناقل الحركة:</div>
                  <div className="text-neutral-400 mt-1 leading-relaxed">{car.inspectionPoints.gearbox}</div>
                </div>
              </div>

              <div className="p-3.5 bg-neutral-900/90 rounded-xl border border-neutral-800 flex items-start gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 mt-1 shrink-0" />
                <div>
                  <div className="font-bold text-neutral-200">الشاسيه والهيكل الإنشائي:</div>
                  <div className="text-neutral-400 mt-1 leading-relaxed">{car.inspectionPoints.chassis}</div>
                </div>
              </div>

              <div className="p-3.5 bg-neutral-900/90 rounded-xl border border-neutral-800 flex items-start gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 mt-1 shrink-0" />
                <div>
                  <div className="font-bold text-neutral-200">الدهان الخارجي وفابريكا المصنع:</div>
                  <div className="text-neutral-400 mt-1 leading-relaxed">{car.inspectionPoints.paint}</div>
                </div>
              </div>

              <div className="p-3.5 bg-neutral-900/90 rounded-xl border border-neutral-800 flex items-start gap-3 md:col-span-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 mt-1 shrink-0" />
                <div>
                  <div className="font-bold text-neutral-200">الصالون والفرش والأنظمة الكهربائية:</div>
                  <div className="text-neutral-400 mt-1 leading-relaxed">{car.inspectionPoints.interior}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Specifications Sheet */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white">بطاقة المواصفات وتجهيزات الرفاهية</h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3.5 bg-neutral-950 rounded-xl border border-neutral-800">
                <span className="text-neutral-500 block mb-1">المحرك والقوة</span>
                <span className="font-bold text-neutral-200 block">{car.engine} ({car.horsePower} حصان)</span>
              </div>
              <div className="p-3.5 bg-neutral-950 rounded-xl border border-neutral-800">
                <span className="text-neutral-500 block mb-1">نوع الفتيس</span>
                <span className="font-bold text-neutral-200 block">{car.transmission}</span>
              </div>
              <div className="p-3.5 bg-neutral-950 rounded-xl border border-neutral-800">
                <span className="text-neutral-500 block mb-1">نوع الوقود</span>
                <span className="font-bold text-neutral-200 block">{car.fuel}</span>
              </div>
              <div className="p-3.5 bg-neutral-950 rounded-xl border border-neutral-800">
                <span className="text-neutral-500 block mb-1">الفرش والداخلية</span>
                <span className="font-bold text-neutral-200 block">{car.interiorColor}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {car.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2.5 rounded-xl bg-neutral-950/60 border border-neutral-800/80">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="text-neutral-300 font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Schedule Viewing / Test Drive Form */}
          <div className="bg-neutral-950 p-6 rounded-2xl border border-neutral-800">
            <h3 className="text-base font-bold text-white mb-2">احجز موعد معاينة في المعرض (السيوف - شارع مصطفى كامل)</h3>
            <p className="text-xs text-neutral-400 mb-4 leading-relaxed">
              يسعدنا تجهيز السيارة واستقبالك بصالة العرض لمعاينتها وفحصها برفقة أي خبير فني من اختيارك.
            </p>

            {bookingSuccess ? (
              <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-700/50 text-emerald-300 text-xs flex items-center gap-3">
                <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>تم إرسال طلب المعاينة بنجاح، وسيقوم كابتن صافي أو ممثل المعرض بالتواصل معك لتأكيد الموعد فوراً.</span>
              </div>
            ) : (
              <form onSubmit={handleBookViewing} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] text-neutral-400 mb-1">الاسم الكريم</label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: أحمد محمد"
                    value={bookingName}
                    onChange={(e) => setBookingName(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-neutral-400 mb-1">رقم الهاتف (موبايل أو واتساب)</label>
                  <input
                    type="tel"
                    required
                    placeholder="مثال: 010xxxxxxxx"
                    value={bookingPhone}
                    onChange={(e) => setBookingPhone(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-neutral-400 mb-1">اليوم المفضل للمعاينة</label>
                  <input
                    type="date"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div className="sm:col-span-3 pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 px-4 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                  >
                    تأكيد حجز موعد المعاينة بالمعرض
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

      </motion.div>
    </div>
  );
}
