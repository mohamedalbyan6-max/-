import React, { useState, useEffect } from 'react';
import { X, Check, Save, Gauge, DollarSign, Calendar, Sparkles, Car as CarIcon, AlertCircle } from 'lucide-react';
import { Car } from '../types/car';

interface EditCarModalProps {
  isOpen: boolean;
  car: Car | null;
  onClose: () => void;
  onSave: (updatedCar: Car) => void;
}

export function EditCarModal({ isOpen, car, onClose, onSave }: EditCarModalProps) {
  if (!isOpen || !car) return null;

  const [title, setTitle] = useState(car.title);
  const [brand, setBrand] = useState(car.brand);
  const [model, setModel] = useState(car.model);
  const [year, setYear] = useState<number>(car.year);
  const [priceEGP, setPriceEGP] = useState<number>(car.priceEGP);
  const [mileageKm, setMileageKm] = useState<number>(car.mileageKm);
  const [condition, setCondition] = useState<Car['condition']>(car.condition);
  const [category, setCategory] = useState<Car['category']>(car.category);
  const [fuel, setFuel] = useState(car.fuel);
  const [transmission, setTransmission] = useState(car.transmission);
  const [engine, setEngine] = useState(car.engine);
  const [color, setColor] = useState(car.color);
  const [interiorColor, setInteriorColor] = useState(car.interiorColor);
  const [imageUrl, setImageUrl] = useState(car.image);
  const [featuresText, setFeaturesText] = useState(car.features.join('\n'));
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (car) {
      setTitle(car.title);
      setBrand(car.brand);
      setModel(car.model);
      setYear(car.year);
      setPriceEGP(car.priceEGP);
      setMileageKm(car.mileageKm);
      setCondition(car.condition);
      setCategory(car.category);
      setFuel(car.fuel);
      setTransmission(car.transmission);
      setEngine(car.engine);
      setColor(car.color);
      setInteriorColor(car.interiorColor);
      setImageUrl(car.image);
      setFeaturesText(car.features.join('\n'));
      setSavedSuccess(false);
    }
  }, [car]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !brand.trim()) return;

    const parsedFeatures = featuresText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const updatedCar: Car = {
      ...car,
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
      color,
      interiorColor,
      image: imageUrl.trim() || car.image,
      features: parsedFeatures.length > 0 ? parsedFeatures : car.features,
      monthlyEstimateEGP: Math.round((Number(priceEGP) * 0.7 * 1.48) / 36),
    };

    onSave(updatedCar);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-2xl bg-neutral-950 border border-amber-500/40 rounded-3xl shadow-2xl text-white overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-neutral-900 border-b border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
              <CarIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-white">تعديل بيانات إعلان السيارة</h3>
              <p className="text-[11px] text-neutral-400 font-mono">
                {car.brand} {car.model} · معرف الإعلان: {car.id}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 flex-1">
          {savedSuccess && (
            <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 rounded-xl text-xs font-bold flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span>تم حفظ التعديلات بنجاح وتحديث الإعلان!</span>
            </div>
          )}

          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
              عنوان الإعلان
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-white text-xs sm:text-sm focus:outline-hidden focus:border-amber-400"
            />
          </div>

          {/* Key Metrics: Mileage, Price, Year */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800">
            
            {/* Mileage */}
            <div>
              <label className="block text-xs font-bold text-amber-300 mb-1.5 flex items-center gap-1.5">
                <Gauge className="w-3.5 h-3.5" />
                <span>العداد (كم)</span>
              </label>
              <input
                type="number"
                required
                min={0}
                value={mileageKm}
                onChange={(e) => setMileageKm(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-amber-500/40 text-amber-300 text-sm font-mono font-bold focus:outline-hidden focus:border-amber-400 text-right"
              />
              <div className="flex gap-1.5 mt-2">
                <button
                  type="button"
                  onClick={() => setMileageKm(160000)}
                  className="px-2 py-1 text-[10px] font-bold bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 rounded-lg border border-amber-500/40 cursor-pointer"
                >
                  160,000 كم
                </button>
                <button
                  type="button"
                  onClick={() => setMileageKm((prev) => Math.max(0, prev - 10000))}
                  className="px-2 py-1 text-[10px] bg-neutral-800 text-neutral-300 hover:bg-neutral-700 rounded-lg cursor-pointer"
                >
                  -10k
                </button>
                <button
                  type="button"
                  onClick={() => setMileageKm((prev) => prev + 10000)}
                  className="px-2 py-1 text-[10px] bg-neutral-800 text-neutral-300 hover:bg-neutral-700 rounded-lg cursor-pointer"
                >
                  +10k
                </button>
              </div>
            </div>

            {/* Price */}
            <div>
              <label className="block text-xs font-bold text-neutral-200 mb-1.5 flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                <span>السعر (ج.م)</span>
              </label>
              <input
                type="number"
                required
                min={10000}
                value={priceEGP}
                onChange={(e) => setPriceEGP(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-700 text-white text-sm font-mono font-bold focus:outline-hidden focus:border-amber-400 text-right"
              />
            </div>

            {/* Year */}
            <div>
              <label className="block text-xs font-bold text-neutral-200 mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-blue-400" />
                <span>سنة الصنع</span>
              </label>
              <input
                type="number"
                required
                min={1970}
                max={2030}
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-700 text-white text-sm font-mono font-bold focus:outline-hidden focus:border-amber-400 text-right"
              />
            </div>

          </div>

          {/* Brand & Model */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">الماركة (Brand)</label>
              <input
                type="text"
                required
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-neutral-900 border border-neutral-700 text-white text-xs sm:text-sm focus:outline-hidden focus:border-amber-400"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">الموديل (Model)</label>
              <input
                type="text"
                required
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-neutral-900 border border-neutral-700 text-white text-xs sm:text-sm focus:outline-hidden focus:border-amber-400"
              />
            </div>
          </div>

          {/* Condition & Transmission */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">حالة الفحص</label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value as Car['condition'])}
                className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-700 text-white text-xs focus:outline-hidden focus:border-amber-400"
              >
                <option value="كسر زيرو">كسر زيرو</option>
                <option value="فابريكا بالكامل">فابريكا بالكامل</option>
                <option value="حالة نادرة">حالة نادرة</option>
                <option value="كلاسيك ذهبي">كلاسيك ذهبي</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">ناقل الحركة</label>
              <input
                type="text"
                value={transmission}
                onChange={(e) => setTransmission(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-700 text-white text-xs focus:outline-hidden focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">اللون الخارجي</label>
              <input
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-700 text-white text-xs focus:outline-hidden focus:border-amber-400"
              />
            </div>
          </div>

          {/* Features */}
          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1">
              المواصفات والمميزات (سطر لكل ميزة)
            </label>
            <textarea
              rows={4}
              value={featuresText}
              onChange={(e) => setFeaturesText(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-white text-xs leading-relaxed focus:outline-hidden focus:border-amber-400"
            />
          </div>

          {/* Submit Buttons */}
          <div className="pt-4 border-t border-neutral-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-semibold text-neutral-400 hover:text-white bg-neutral-900 hover:bg-neutral-800 rounded-xl transition-colors cursor-pointer"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 text-xs sm:text-sm font-bold text-neutral-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>حفظ تعديلات السيارة</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
