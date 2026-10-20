import React, { useState } from 'react';
import { X, Trash2, Edit3, Plus, Search, ShieldCheck, Car as CarIcon, AlertTriangle, RotateCcw } from 'lucide-react';
import { Car } from '../types/car';

interface ManageInventoryModalProps {
  isOpen: boolean;
  cars: Car[];
  onClose: () => void;
  onOpenAddCar: () => void;
  onEditCar: (car: Car) => void;
  onRequestDeleteCar: (car: Car) => void;
  onClearAllCars: () => void;
  onRestoreSamples?: () => void;
}

export function ManageInventoryModal({
  isOpen,
  cars,
  onClose,
  onOpenAddCar,
  onEditCar,
  onRequestDeleteCar,
  onClearAllCars,
  onRestoreSamples,
}: ManageInventoryModalProps) {
  const [search, setSearch] = useState('');
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  if (!isOpen) return null;

  const formatPrice = (num: number) => new Intl.NumberFormat('ar-EG').format(num);

  const filteredCars = cars.filter((c) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      c.title.toLowerCase().includes(q) ||
      c.brand.toLowerCase().includes(q) ||
      c.model.toLowerCase().includes(q) ||
      c.year.toString().includes(q)
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-neutral-950 border border-amber-500/40 rounded-3xl shadow-2xl overflow-hidden text-white my-auto max-h-[92vh] flex flex-col">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-neutral-900 border-b border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-white">لوحة إدارة ومسح السيارات</h3>
              <p className="text-[11px] text-amber-400 font-medium">
                تحكم شخصي مباشر في مخزون المعرض · كابتن صافي ({cars.length} سيارة حالياً)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Top Control Bar */}
        <div className="p-4 sm:p-5 bg-neutral-900/60 border-b border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          
          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-neutral-400 absolute right-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="ابحث عن سيارة بالاسم أو الموديل..."
              className="w-full pr-9 pl-3 py-2 text-xs rounded-xl bg-neutral-900 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-hidden focus:border-amber-400"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={() => {
                onClose();
                onOpenAddCar();
              }}
              className="px-3.5 py-2 text-xs font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-xl flex items-center gap-1.5 transition-colors shadow-md shadow-amber-400/20 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>إضافة سيارة جديدة</span>
            </button>

            {cars.length > 0 && (
              <button
                onClick={() => setShowClearConfirm(true)}
                className="px-3 py-2 text-xs font-bold text-red-400 hover:text-red-300 bg-red-950/40 hover:bg-red-900/50 border border-red-500/30 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>مسح كل السيارات</span>
              </button>
            )}

            {cars.length === 0 && onRestoreSamples && (
              <button
                onClick={onRestoreSamples}
                className="px-3 py-2 text-xs font-bold text-neutral-300 hover:text-amber-300 bg-neutral-800 hover:bg-neutral-700 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                <span>استرجاع السيارات</span>
              </button>
            )}
          </div>

        </div>

        {/* Clear All Confirmation Banner */}
        {showClearConfirm && (
          <div className="p-4 bg-red-950/70 border-b border-red-500/50 flex flex-col sm:flex-row items-center justify-between gap-3 animate-fade-in">
            <div className="flex items-center gap-2 text-red-200 text-xs">
              <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
              <span>هل أنت متأكد من رغبتك في مسح جميع السيارات ({cars.length} سيارة) من صالة العرض دفعة واحدة؟</span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => {
                  onClearAllCars();
                  setShowClearConfirm(false);
                }}
                className="px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer"
              >
                نعم، مسح الجميع
              </button>
              <button
                onClick={() => setShowClearConfirm(false)}
                className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs rounded-lg transition-colors cursor-pointer"
              >
                إلغاء
              </button>
            </div>
          </div>
        )}

        {/* Cars List */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-3 flex-1">
          {filteredCars.length === 0 ? (
            <div className="text-center py-12 text-neutral-400 text-xs sm:text-sm">
              <CarIcon className="w-10 h-10 text-neutral-600 mx-auto mb-2" />
              <span>لا توجد سيارات مطابقة للبحث حالياً.</span>
            </div>
          ) : (
            filteredCars.map((car, index) => (
              <div
                key={car.id}
                className="p-3 sm:p-4 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-amber-500/30 transition-all flex flex-col sm:flex-row items-center justify-between gap-4"
              >
                {/* Car Thumbnail & Info */}
                <div className="flex items-center gap-3.5 w-full sm:w-auto">
                  <div className="relative w-16 h-14 sm:w-20 sm:h-16 rounded-xl overflow-hidden border border-neutral-700 shrink-0 bg-neutral-950">
                    <img
                      src={car.image}
                      alt={car.title}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-0 right-0 left-0 bg-black/70 text-[9px] text-center font-mono text-amber-300 py-0.2">
                      #{index + 1}
                    </span>
                  </div>

                  <div className="text-right flex-1 min-w-0">
                    <h4 className="text-sm font-black text-white truncate max-w-xs sm:max-w-md">
                      {car.title}
                    </h4>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-400 mt-1">
                      <span className="font-mono text-amber-300 font-bold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                        {car.mileageKm.toLocaleString()} كم
                      </span>
                      <span>·</span>
                      <span className="text-white font-semibold">{car.year}</span>
                      <span>·</span>
                      <span className="text-neutral-300">{car.condition}</span>
                      <span>·</span>
                      <span className="text-emerald-400 font-mono font-bold">{formatPrice(car.priceEGP)} ج.م</span>
                    </div>
                  </div>
                </div>

                {/* Direct Action Buttons for this specific car */}
                <div className="flex items-center gap-2 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-neutral-800">
                  <button
                    onClick={() => {
                      onClose();
                      onEditCar(car);
                    }}
                    className="px-3 py-2 text-xs font-bold text-amber-400 hover:text-neutral-950 bg-amber-500/10 hover:bg-amber-400 border border-amber-500/30 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                    title="تعديل بيانات هذه السيارة والعداد والسعر"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>تعديل</span>
                  </button>

                  <button
                    onClick={() => onRequestDeleteCar(car)}
                    className="px-3.5 py-2 text-xs font-bold text-red-400 hover:text-white bg-red-950/40 hover:bg-red-600 border border-red-500/40 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                    title="مسح هذه السيارة نهائياً من المعرض"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>مسح السيارة</span>
                  </button>
                </div>

              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-neutral-900 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
          <span>هذه اللوحة خاصة بكابتن صافي ولا يمكن للزوار الوصول إليها.</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl transition-colors cursor-pointer"
          >
            إغلاق
          </button>
        </div>

      </div>
    </div>
  );
}
