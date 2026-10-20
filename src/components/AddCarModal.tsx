import { useState } from 'react';
import { X, Plus, Upload, Car as CarIcon, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Car } from '../types/car';

interface AddCarModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCar: (car: Car) => void;
}

export function AddCarModal({ isOpen, onClose, onAddCar }: AddCarModalProps) {
  const [title, setTitle] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [priceEGP, setPriceEGP] = useState<number>(500000);
  const [mileageKm, setMileageKm] = useState<number>(30000);
  const [condition, setCondition] = useState<Car['condition']>('فابريكا بالكامل');
  const [category, setCategory] = useState<Car['category']>('sedan');
  const [fuel, setFuel] = useState('بنزين 92');
  const [transmission, setTransmission] = useState('أوتوماتيك');
  const [engine, setEngine] = useState('1.6L 4-Cylinder');
  const [horsePower, setHorsePower] = useState<number>(130);
  const [color, setColor] = useState('أسود ميتاليك');
  const [interiorColor, setInteriorColor] = useState('جلد أسود فابريكا');
  const [imageUrl, setImageUrl] = useState('');
  const [featuresText, setFeaturesText] = useState('فابريكا بالكامل بدون أي رش أو ملاحظات\nصيانات منتظمة بالتوكيل المعتمد\nتكييف ثلاجة وبلوتوث وحساسات ركن');
  const [isFeatured, setIsFeatured] = useState(true);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setImageUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !brand.trim()) return;

    // Default image if none provided
    const finalImage = imageUrl.trim() || '/public/assets/images/car_mercedes_sclass_1792470156464.jpg';

    const parsedFeatures = featuresText
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    const monthlyEstimate = Math.round((priceEGP * 0.7 * 1.48) / 36);

    const newCar: Car = {
      id: `car-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      title: title.trim(),
      brand: brand.trim(),
      model: model.trim() || brand.trim(),
      year: Number(year),
      priceEGP: Number(priceEGP),
      mileageKm: Number(mileageKm),
      condition,
      category,
      fuel,
      transmission,
      engine,
      horsePower: Number(horsePower),
      color,
      interiorColor,
      image: finalImage,
      isFeatured,
      features: parsedFeatures.length > 0 ? parsedFeatures : ['حالة ممتازة فابريكا بالكامل', 'فحص فني شامل معتمد'],
      inspectionPoints: {
        engine: 'محرك بحالة ممتازة تم فحصه بالكامل',
        gearbox: 'ناقل حركة سلس ومستقر بدون أي ملاحظات',
        chassis: 'شاسيه ودواخل فابريكا 100%',
        paint: condition === 'فابريكا بالكامل' ? 'دهان فابريكا المصنع الأصلي بالكامل' : 'حالة ممتازة ونظيفة جداً',
        interior: 'صالون نظيف جداً بحالة الوكالة'
      },
      monthlyEstimateEGP: monthlyEstimate
    };

    onAddCar(newCar);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl text-neutral-100 max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-950">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-amber-500/10 rounded-xl border border-amber-500/30 text-amber-400">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">إضافة سيارة جديدة لصالة العرض</h3>
              <p className="text-xs text-neutral-400">شركة الصافي لتجارة السيارات - فرع السيوف</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5">
          <AnimatePresence>
            {success ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="py-12 flex flex-col items-center justify-center text-center space-y-3"
              >
                <CheckCircle2 className="w-16 h-16 text-emerald-400" />
                <h4 className="text-xl font-bold text-white">تمت إضافة السيارة بنجاح!</h4>
                <p className="text-sm text-neutral-400">السيارة معروضة الآن في صالة العرض وحاسبة التمويل.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Image Section */}
                <div className="p-4 bg-neutral-950 rounded-2xl border border-neutral-800 space-y-3">
                  <label className="block text-xs font-bold text-amber-400">
                    صورة السيارة (رفع من الجهاز أو رابط)
                  </label>
                  
                  {imageUrl && (
                    <div className="relative aspect-video rounded-xl overflow-hidden border border-neutral-800 bg-neutral-900">
                      <img src={imageUrl} alt="معاينة السيارة" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setImageUrl('')}
                        className="absolute top-2 right-2 p-1 bg-neutral-950/80 hover:bg-red-500 text-white rounded-lg text-xs"
                      >
                        إزالة الصورة
                      </button>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <label className="flex items-center justify-center gap-2 px-4 py-3 bg-neutral-900 border border-dashed border-neutral-700 hover:border-amber-400 rounded-xl cursor-pointer text-xs font-semibold text-neutral-300 hover:text-white transition-colors">
                      <Upload className="w-4 h-4 text-amber-400" />
                      <span>رفع صورة من جهازك</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>

                    <input
                      type="url"
                      placeholder="أو ضع رابط صورة مباشر..."
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      className="px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-neutral-200 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                {/* Car Title */}
                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1.5">عنوان السيارة المعروضة *</label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: مرسيدس C180 كسر زيرو فابريكا بالكامل"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-3 bg-neutral-950 border border-neutral-800 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                {/* Brand & Model & Year */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-400 mb-1">الماركة (Brand) *</label>
                    <input
                      type="text"
                      required
                      placeholder="مثال: Mercedes / BMW / Hyundai"
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                      className="w-full px-3 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-400 mb-1">الموديل (Model)</label>
                    <input
                      type="text"
                      placeholder="مثال: C180 / Elantra / Cruze"
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                      className="w-full px-3 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-400 mb-1">سنة الصنع (Year)</label>
                    <input
                      type="number"
                      min={1970}
                      max={2030}
                      value={year}
                      onChange={(e) => setYear(Number(e.target.value))}
                      className="w-full px-3 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400 font-mono"
                    />
                  </div>
                </div>

                {/* Price & Mileage */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-400 mb-1">السعر الكاش (جنيه مصري) *</label>
                    <input
                      type="number"
                      required
                      min={10000}
                      step={5000}
                      value={priceEGP}
                      onChange={(e) => setPriceEGP(Number(e.target.value))}
                      className="w-full px-3 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400 font-mono text-amber-400 font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-400 mb-1">العداد (كيلومتر)</label>
                    <input
                      type="number"
                      min={0}
                      step={1000}
                      value={mileageKm}
                      onChange={(e) => setMileageKm(Number(e.target.value))}
                      className="w-full px-3 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400 font-mono"
                    />
                  </div>
                </div>

                {/* Condition & Category */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-400 mb-1">حالة السيارة</label>
                    <select
                      value={condition}
                      onChange={(e) => setCondition(e.target.value as Car['condition'])}
                      className="w-full px-3 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="فابريكا بالكامل">فابريكا بالكامل</option>
                      <option value="كسر زيرو">كسر زيرو</option>
                      <option value="حالة نادرة">حالة نادرة</option>
                      <option value="كلاسيك ذهبي">كلاسيك ذهبي</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-400 mb-1">التصنيف</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as Car['category'])}
                      className="w-full px-3 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="sedan">سيدان (Sedan)</option>
                      <option value="suv">دفع رباعي / كروس أوفر (SUV)</option>
                      <option value="coupe">كوبيه (Coupe)</option>
                      <option value="classic">كلاسيك تراثي (Classic)</option>
                    </select>
                  </div>
                </div>

                {/* Specs: Transmission, Fuel, Colors */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-400 mb-1">الفتيس</label>
                    <input
                      type="text"
                      value={transmission}
                      onChange={(e) => setTransmission(e.target.value)}
                      className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-400 mb-1">الوقود</label>
                    <input
                      type="text"
                      value={fuel}
                      onChange={(e) => setFuel(e.target.value)}
                      className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-400 mb-1">اللون الخارجي</label>
                    <input
                      type="text"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-400 mb-1">الفرش الداخلي</label>
                    <input
                      type="text"
                      value={interiorColor}
                      onChange={(e) => setInteriorColor(e.target.value)}
                      className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white"
                    />
                  </div>
                </div>

                {/* Features textarea */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-400 mb-1">
                    أبرز المواصفات والمميزات (كل ميزة في سطر منفصل)
                  </label>
                  <textarea
                    rows={3}
                    value={featuresText}
                    onChange={(e) => setFeaturesText(e.target.value)}
                    className="w-full px-3 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400 resize-none"
                  />
                </div>

                {/* Submit Actions */}
                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2.5 rounded-xl border border-neutral-800 text-xs font-semibold text-neutral-400 hover:text-white hover:bg-neutral-800"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-400/20 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>إضافة السيارة للمعرض الآن</span>
                  </button>
                </div>

              </form>
            )}
          </AnimatePresence>
        </div>

      </motion.div>
    </div>
  );
}
