import React from 'react';
import { X, Trash2, AlertTriangle, ShieldAlert } from 'lucide-react';
import { Car } from '../types/car';

interface DeleteCarModalProps {
  isOpen: boolean;
  car: Car | null;
  onClose: () => void;
  onConfirmDelete: (carId: string) => void;
}

export function DeleteCarModal({
  isOpen,
  car,
  onClose,
  onConfirmDelete,
}: DeleteCarModalProps) {
  if (!isOpen || !car) return null;

  const formatPrice = (num: number) => new Intl.NumberFormat('ar-EG').format(num);

  const handleDelete = () => {
    onConfirmDelete(car.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-neutral-950 border-2 border-red-500/50 rounded-3xl shadow-2xl overflow-hidden text-white my-auto">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-neutral-900 border-b border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-500/20 text-red-400 border border-red-500/30 flex items-center justify-center">
              <Trash2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-white">تأكيد مسح السيارة</h3>
              <p className="text-[11px] text-amber-400 font-bold">
                صلاحيات الإدارة الشخصية · خاص المبرمج للتطبيق (ALBYAN)
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

        {/* Content Body */}
        <div className="p-6 space-y-5">
          
          {/* Car Preview Snippet */}
          <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-neutral-900/80 border border-neutral-800">
            <img
              src={car.image}
              alt={car.title}
              className="w-20 h-16 object-cover rounded-xl border border-neutral-700 shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-black text-white truncate">{car.title}</h4>
              <div className="text-xs text-amber-400 font-mono mt-0.5">
                {car.year} · {car.mileageKm.toLocaleString()} كم
              </div>
              <div className="text-xs text-neutral-400 mt-0.5">
                {formatPrice(car.priceEGP)} ج.م
              </div>
            </div>
          </div>

          {/* Warning Message */}
          <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <div className="text-xs text-neutral-300 leading-relaxed">
              <strong className="text-red-300 block mb-1">تنبيه نهائي:</strong>
              هل أنت متأكد من رغبتك في حذف هذا الإعلان من صالة العرض والموقع؟ سيتم مسح السيارة نهائياً ولن تظهر للزوار.
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="py-3 px-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white font-bold text-xs sm:text-sm border border-neutral-700 transition-colors cursor-pointer"
            >
              إلغاء والاحتفاظ بها
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="py-3 px-4 rounded-xl bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-black text-xs sm:text-sm shadow-lg shadow-red-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              <span>نعم، مسح السيارة الآن</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
