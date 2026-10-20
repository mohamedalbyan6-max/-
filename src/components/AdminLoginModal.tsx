import React, { useState } from 'react';
import { X, Lock, ShieldCheck, KeyRound, Eye, EyeOff, Check, AlertCircle, Sparkles } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  isAdmin: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
  onLogout: () => void;
}

const PASSCODE_STORAGE_KEY = 'alsafy_admin_passcode_v1';
const DEFAULT_PASSCODE = 'safy2026';

export function getStoredPasscode(): string {
  try {
    const saved = localStorage.getItem(PASSCODE_STORAGE_KEY);
    if (saved) return saved;
  } catch {
    // LocalStorage fallback
  }
  return DEFAULT_PASSCODE;
}

export function AdminLoginModal({
  isOpen,
  isAdmin,
  onClose,
  onLoginSuccess,
  onLogout
}: AdminLoginModalProps) {
  const [passcode, setPasscode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isChangingPasscode, setIsChangingPasscode] = useState(false);
  const [newPasscode, setNewPasscode] = useState('');
  const [confirmPasscode, setConfirmPasscode] = useState('');
  const [changeSuccess, setChangeSuccess] = useState(false);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const currentPass = getStoredPasscode();
    if (passcode.trim() === currentPass) {
      onLoginSuccess();
      setPasscode('');
      onClose();
    } else {
      setErrorMsg('كلمة المرور غير صحيحة. يرجى المحاولة مرة أخرى.');
    }
  };

  const handleChangePasscode = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (newPasscode.length < 4) {
      setErrorMsg('يجب أن تتكون كلمة المرور الجديدة من 4 أحرف أو أرقام على الأقل.');
      return;
    }

    if (newPasscode !== confirmPasscode) {
      setErrorMsg('كلمتا المرور غير متطابقتين.');
      return;
    }

    try {
      localStorage.setItem(PASSCODE_STORAGE_KEY, newPasscode.trim());
      setChangeSuccess(true);
      setNewPasscode('');
      setConfirmPasscode('');
      setTimeout(() => {
        setChangeSuccess(false);
        setIsChangingPasscode(false);
      }, 1500);
    } catch {
      setErrorMsg('تعذر حفظ كلمة المرور في المتصفح.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-md bg-neutral-950 border border-amber-500/40 rounded-3xl shadow-2xl overflow-hidden text-white my-auto">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-neutral-900 border-b border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-neutral-950 shadow-md">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-white">
                {isAdmin ? 'لوحة تحكم الإدارة الشخصية' : 'بوابة الإدارة الشخصية'}
              </h3>
              <p className="text-[11px] text-amber-400 font-bold tracking-wide">
                خاص المبرمج للتطبيق (ALBYAN)
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

        {/* Modal Content */}
        <div className="p-6 space-y-5">

          {isAdmin ? (
            /* Logged in state */
            <div className="space-y-5">
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-right space-y-2">
                <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
                  <ShieldCheck className="w-5 h-5 text-amber-400" />
                  <span>نمط التحكم الشخصي مفعّل بنجاح (ALBYAN)</span>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  أنت الآن مسجل كمسؤول ومبرمج التطبيق (ALBYAN). أزرار إضافة وتعديل وحذف السيارات متاحة لك حصرياً، ومخفية تماماً عن الزوار والعملاء العاديين.
                </p>
              </div>

              {isChangingPasscode ? (
                /* Change passcode form */
                <form onSubmit={handleChangePasscode} className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold text-white flex items-center gap-2">
                    <KeyRound className="w-4 h-4 text-amber-400" />
                    <span>تعيين كلمة مرور شخصية جديدة</span>
                  </h4>

                  {errorMsg && (
                    <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  {changeSuccess && (
                    <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                      <Check className="w-4 h-4 shrink-0" />
                      <span>تم تحديث كلمة المرور الشخصية بنجاح!</span>
                    </div>
                  )}

                  <div>
                    <label className="block text-[11px] text-neutral-300 mb-1">
                      كلمة المرور الجديدة
                    </label>
                    <input
                      type="password"
                      required
                      value={newPasscode}
                      onChange={(e) => setNewPasscode(e.target.value)}
                      placeholder="اكتب كلمة المرور الجديدة"
                      className="w-full px-3 py-2 text-xs rounded-xl bg-neutral-900 border border-neutral-700 text-white focus:outline-hidden focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-neutral-300 mb-1">
                      تأكيد كلمة المرور
                    </label>
                    <input
                      type="password"
                      required
                      value={confirmPasscode}
                      onChange={(e) => setConfirmPasscode(e.target.value)}
                      placeholder="أعد كتابة كلمة المرور"
                      className="w-full px-3 py-2 text-xs rounded-xl bg-neutral-900 border border-neutral-700 text-white focus:outline-hidden focus:border-amber-400"
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <button
                      type="submit"
                      className="flex-1 py-2 text-xs font-bold bg-amber-400 hover:bg-amber-300 text-neutral-950 rounded-xl transition-colors cursor-pointer"
                    >
                      حفظ كلمة المرور
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsChangingPasscode(false)}
                      className="px-3 py-2 text-xs text-neutral-400 hover:text-white bg-neutral-900 rounded-xl cursor-pointer"
                    >
                      إلغاء
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-3">
                  <button
                    onClick={() => setIsChangingPasscode(true)}
                    className="w-full py-2.5 px-3 text-xs font-semibold text-neutral-300 hover:text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-colors"
                  >
                    <KeyRound className="w-4 h-4 text-amber-400" />
                    <span>تغيير كلمة المرور الشخصية</span>
                  </button>

                  <button
                    onClick={() => {
                      onLogout();
                      onClose();
                    }}
                    className="w-full py-3 px-4 text-xs font-bold text-red-300 hover:text-white bg-red-950/30 hover:bg-red-900/60 border border-red-500/40 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-colors"
                  >
                    <Lock className="w-4 h-4" />
                    <span>قفل الإدارة والعودة لوضع الزائر (تسجيل الخروج)</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Login Form */
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="text-right">
                <p className="text-xs text-neutral-300 leading-relaxed">
                  تم قفل أزرار التعديل والإضافة والحذف في الموقع وحصرها كـ <span className="text-amber-400 font-bold">خاص المبرمج للتطبيق (ALBYAN)</span>. أدخل كلمة المرور لتفعيل نمط الإدارة.
                </p>
              </div>

              {errorMsg && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2 text-right">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-amber-300 mb-1.5 text-right">
                  كلمة المرور الشخصية (PIN / Passcode)
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    autoFocus
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    placeholder="أدخل كلمة المرور"
                    className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-700 text-white placeholder-neutral-500 text-sm focus:outline-hidden focus:border-amber-400 font-mono tracking-widest text-center"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white p-1 cursor-pointer"
                    aria-label="إظهار أو إخفاء كلمة المرور"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <div className="text-[11px] text-neutral-500 mt-2 text-right">
                  كلمة المرور سرية ومخصصة لصاحب الصلاحية فقط.
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-neutral-950 font-black text-sm rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>دخول الإدارة وتفعيل التحكم</span>
                </button>
              </div>
            </form>
          )}

        </div>

      </div>
    </div>
  );
}
