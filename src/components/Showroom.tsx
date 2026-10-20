import { useState, useMemo } from 'react';
import { Search, Fuel, Sparkles, Camera, MessageCircle, ChevronLeft, RotateCcw, Plus, Trash2, Edit3 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Car, CategoryFilter } from '../types/car';
import { companyInfo } from '../data/companyData';

interface ShowroomProps {
  cars: Car[];
  isAdmin?: boolean;
  onSelectCar: (car: Car) => void;
  onOpenAddCar?: () => void;
  onEditCar?: (car: Car) => void;
  onDeleteCar?: (carId: string) => void;
  onClearAllCars?: () => void;
  onRestoreSamples?: () => void;
}

export function Showroom({
  cars,
  isAdmin = false,
  onSelectCar,
  onOpenAddCar,
  onEditCar,
  onDeleteCar,
  onClearAllCars,
  onRestoreSamples
}: ShowroomProps) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('all');
  const [selectedTransmission, setSelectedTransmission] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'year-desc'>('featured');

  const categories: { id: CategoryFilter; label: string }[] = [
    { id: 'all', label: 'جميع سيارات المعرض' },
    { id: 'sedan', label: 'سيارات سيدان' },
    { id: 'kasr-zero', label: 'فابريكا وحالات نادرة' },
    { id: 'suv', label: 'دفع رباعي / SUV' },
  ];

  // Distinct brands list
  const availableBrands = useMemo(() => {
    const brands = Array.from(new Set(cars.map((c) => c.brand)));
    return ['all', ...brands];
  }, [cars]);

  const filteredCars = useMemo(() => {
    return cars
      .filter((car) => {
        // Category filter
        if (selectedCategory === 'kasr-zero' && car.condition !== 'كسر زيرو' && car.condition !== 'فابريكا بالكامل' && car.condition !== 'حالة نادرة') return false;
        if (selectedCategory === 'sedan' && car.category !== 'sedan') return false;
        if (selectedCategory === 'suv' && car.category !== 'suv') return false;

        // Brand filter
        if (selectedBrand !== 'all' && car.brand !== selectedBrand) return false;

        // Transmission filter
        if (selectedTransmission !== 'all') {
          if (!car.transmission.toLowerCase().includes(selectedTransmission.toLowerCase())) return false;
        }

        // Price range filter
        if (selectedPriceRange === 'under-500k' && car.priceEGP >= 500000) return false;
        if (selectedPriceRange === 'above-500k' && car.priceEGP < 500000) return false;

        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = car.title.toLowerCase().includes(q);
          const matchBrand = car.brand.toLowerCase().includes(q);
          const matchModel = car.model.toLowerCase().includes(q);
          const matchColor = car.color.toLowerCase().includes(q);
          const matchYear = car.year.toString().includes(q);
          if (!matchTitle && !matchBrand && !matchModel && !matchColor && !matchYear) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.priceEGP - b.priceEGP;
        if (sortBy === 'price-desc') return b.priceEGP - a.priceEGP;
        if (sortBy === 'year-desc') return b.year - a.year;
        // default featured
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  }, [cars, selectedCategory, selectedBrand, selectedPriceRange, selectedTransmission, searchQuery, sortBy]);

  const formatPrice = (num: number) => {
    return new Intl.NumberFormat('ar-EG').format(num);
  };

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedBrand('all');
    setSelectedPriceRange('all');
    setSelectedTransmission('all');
    setSearchQuery('');
  };

  return (
    <section id="showroom" className="w-full py-20 bg-neutral-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-amber-400 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>مخزون صالة العرض بالإسكندرية (السيوف)</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              السيارات المتاحة بحالة الفابريكا وكسر الزيرو
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-neutral-400 max-w-2xl leading-relaxed">
              تصفح سيارات المعرض مع فلاتر ذكية حسب الماركة، السعر، سنة الصنع، والفتيس. جميع السيارات جاهزة للتسليم الفوري والمعاينة.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {isAdmin && onOpenAddCar && (
              <button
                onClick={onOpenAddCar}
                className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md shadow-amber-400/20 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>إضافة سيارة جديدة</span>
              </button>
            )}

            {isAdmin && cars.length > 0 && onClearAllCars && (
              <button
                onClick={() => {
                  if (window.confirm('هل تريد مسح جميع السيارات الحالية من صالة العرض؟')) {
                    onClearAllCars();
                  }
                }}
                className="px-3.5 py-2.5 rounded-xl bg-neutral-900 hover:bg-red-950/40 border border-neutral-800 hover:border-red-500/50 text-neutral-400 hover:text-red-400 font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>مسح كل السيارات</span>
              </button>
            )}

            <div className="text-xs text-neutral-300 bg-neutral-900 border border-neutral-800 px-4 py-2.5 rounded-xl flex items-center gap-2.5">
              <span className={`w-2.5 h-2.5 rounded-full ${cars.length > 0 ? 'bg-emerald-400 animate-pulse' : 'bg-neutral-600'}`} />
              <span>السيارات المتاحة:</span>
              <span className="font-bold text-amber-400 tabular-nums text-sm font-mono">
                {cars.length} سيارة
              </span>
            </div>
          </div>
        </div>

        {/* If no cars in showroom at all */}
        {cars.length === 0 ? (
          <div className="text-center py-16 px-4 bg-gradient-to-b from-neutral-900/60 to-neutral-950 border border-neutral-800 rounded-3xl max-w-3xl mx-auto shadow-2xl">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8" />
            </div>
            <span className="inline-block px-3.5 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-bold rounded-full mb-3">
              تم تفريغ الأسطول بنجاح
            </span>
            <h3 className="text-xl sm:text-3xl font-black text-white mb-3">
              تم مسح جميع السيارات الحالية من صالة العرض
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-lg mx-auto mb-8 leading-relaxed">
              صالة العرض جاهزة الآن تماماً لاستقبال سيارات جديدة. يمكنك إضافة سياراتك المتاحة مع صورها ومواصفاتها، أو التواصل المباشر مع فريق المعرض للاستعلام عن وارد السيارات الجديد في فرع السيوف.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {isAdmin && onOpenAddCar && (
                <button
                  onClick={onOpenAddCar}
                  className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-lg shadow-amber-400/20 flex items-center gap-2 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>إضافة سيارة جديدة لصالة العرض</span>
                </button>
              )}
              
              <a
                href={`https://wa.me/${companyInfo.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('السلام عليكم شركة الصافي لتجارة السيارات، أستفسر عن السيارات المتاحة والوارد الجديد بفرع السيوف')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-white font-bold text-xs sm:text-sm rounded-xl transition-all flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>استفسار واتساب فرع السيوف</span>
              </a>

              {isAdmin && onRestoreSamples && (
                <button
                  onClick={onRestoreSamples}
                  className="px-4 py-3 bg-neutral-950 hover:bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-amber-400 font-semibold text-xs rounded-xl transition-colors cursor-pointer"
                >
                  استرجاع السيارات السابقة (تجريبية)
                </button>
              )}
            </div>
          </div>
        ) : (
          <>
            {/* Category Pills Bar */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-4 scrollbar-none relative">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`relative px-4 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                      isActive ? 'text-neutral-950 font-black' : 'text-neutral-400 hover:text-white bg-neutral-900/80 border border-neutral-800'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeCategoryPill"
                        className="absolute inset-0 bg-amber-400 rounded-xl shadow-md shadow-amber-500/20"
                        transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                      />
                    )}
                    <span className="relative z-10">{cat.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Multi-Filter & Search Bar */}
            <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-4 sm:p-5 mb-10 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                
                {/* Search Input */}
                <div className="relative sm:col-span-2 lg:col-span-2">
                  <Search className="w-4 h-4 text-neutral-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="ابحث بالماركة، الموديل، اللون، أو سنة الصنع..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-700/80 rounded-xl pr-10 pl-3 py-2.5 text-xs sm:text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white text-xs"
                    >
                      مسح
                    </button>
                  )}
                </div>

                {/* Brand Filter */}
                <div>
                  <select
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-700/80 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-neutral-200 focus:outline-none focus:border-amber-400 cursor-pointer"
                  >
                    <option value="all">كل الماركات ({availableBrands.filter(b => b !== 'all').length})</option>
                    {availableBrands.filter((b) => b !== 'all').map((brand) => (
                      <option key={brand} value={brand}>
                        {brand}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Filter */}
                <div>
                  <select
                    value={selectedPriceRange}
                    onChange={(e) => setSelectedPriceRange(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-700/80 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-neutral-200 focus:outline-none focus:border-amber-400 cursor-pointer"
                  >
                    <option value="all">نطاق السعر: الكل</option>
                    <option value="under-500k">أقل من 500,000 ج.م</option>
                    <option value="above-500k">500,000 ج.م فأكثر</option>
                  </select>
                </div>

                {/* Sort Dropdown */}
                <div>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="w-full bg-neutral-950 border border-neutral-700/80 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-neutral-200 focus:outline-none focus:border-amber-400 cursor-pointer"
                  >
                    <option value="featured">المميز في الصافي</option>
                    <option value="price-asc">السعر: من الأقل للأعلى</option>
                    <option value="price-desc">السعر: من الأعلى للأقل</option>
                    <option value="year-desc">سنة الصنع: الأحدث أولاً</option>
                  </select>
                </div>

              </div>

              {/* Active Filter Tags & Reset */}
              {(selectedBrand !== 'all' || selectedPriceRange !== 'all' || searchQuery || selectedCategory !== 'all') && (
                <div className="pt-2 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
                  <span className="flex items-center gap-2">
                    <span>تصفية نشطة</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  </span>
                  <button
                    onClick={resetFilters}
                    className="inline-flex items-center gap-1 text-amber-400 hover:text-amber-300 font-semibold cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>إعادة ضبط جميع الفلاتر</span>
                  </button>
                </div>
              )}
            </div>

            {/* Animated Cars Grid */}
            <AnimatePresence mode="popLayout">
              {filteredCars.length === 0 ? (
                <motion.div
                  key="empty-filter-state"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  className="text-center py-16 bg-neutral-900/40 border border-neutral-800 rounded-2xl"
                >
                  <p className="text-neutral-300 text-base mb-2 font-bold">لا توجد سيارات مطابقة لخيارات التصفية الحالية</p>
                  <p className="text-neutral-500 text-xs mb-6">جرّب تغيير الماركة أو السعر أو إعادة ضبط الفلاتر لاستعراض كامل الأسطول</p>
                  <button
                    onClick={resetFilters}
                    className="px-5 py-2.5 text-xs font-bold text-neutral-950 bg-amber-400 rounded-xl hover:bg-amber-300 transition-colors cursor-pointer"
                  >
                    عرض كافة سيارات المعرض
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  layout
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
                >
                  {filteredCars.map((car, idx) => {
                    const totalPhotos = 1 + (car.additionalImages?.length || 0);
                    const whatsappInquiryUrl = `https://wa.me/${companyInfo.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                      `السلام عليكم يا كابتن صافي، أستفسر عن سيارة ${car.title} موديل ${car.year} المعروضة لدى شركة الصافي بسعر ${formatPrice(car.priceEGP)} ج.م`
                    )}`;

                    return (
                      <motion.div
                        key={car.id}
                        layout
                        initial={{ opacity: 0, y: 16, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{
                          duration: 0.28,
                          delay: Math.min(idx * 0.04, 0.2),
                          ease: [0.16, 1, 0.3, 1]
                        }}
                        whileHover={{ y: -5 }}
                        className="group flex flex-col bg-neutral-900/95 border border-neutral-800 hover:border-amber-500/50 rounded-2xl overflow-hidden shadow-xl shadow-black/40 hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300 relative"
                      >
                        {/* Delete Single Car Button (Admin Only) */}
                        {isAdmin && onDeleteCar && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (window.confirm(`هل أنت متأكد من مسح سيارة ${car.title}؟`)) {
                                onDeleteCar(car.id);
                              }
                            }}
                            title="مسح هذه السيارة من المعرض"
                            className="absolute top-3 left-3 z-20 p-2 rounded-xl bg-neutral-950/80 hover:bg-red-600 text-neutral-400 hover:text-white border border-neutral-700/80 transition-colors cursor-pointer shadow-lg"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}

                        {/* Edit Car Button (Admin Only) */}
                        {isAdmin && onEditCar && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onEditCar(car);
                            }}
                            title="تعديل بيانات وعداد السيارة"
                            className="absolute top-3 left-12 z-20 p-2 rounded-xl bg-neutral-950/80 hover:bg-amber-500 text-amber-400 hover:text-neutral-950 border border-neutral-700/80 transition-colors cursor-pointer shadow-lg backdrop-blur-md"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                        )}

                        {/* Image Container with 4:3 Aspect Ratio */}
                        <div
                          className="relative aspect-[4/3] bg-neutral-950 overflow-hidden cursor-pointer"
                          onClick={() => onSelectCar(car)}
                        >
                          <img
                            src={car.image}
                            alt={car.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-85" />

                          {/* Condition / Gold Edition Badge */}
                          <div className="absolute top-3 right-3">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold bg-neutral-950/85 backdrop-blur-md text-amber-300 border border-amber-500/30">
                              {car.isSpecialGold ? '★ إصدار ذهبي تراثي' : car.condition}
                            </span>
                          </div>

                          {/* Total Photos Indicator */}
                          {totalPhotos > 1 && (
                            <div className="absolute top-3 right-28">
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-neutral-950/80 backdrop-blur-md text-neutral-300 border border-neutral-700/60">
                                <Camera className="w-3 h-3 text-amber-400" />
                                <span>{totalPhotos} صور</span>
                              </span>
                            </div>
                          )}

                          {/* Quick Meta Footer inside Image */}
                          <div className="absolute bottom-3 right-3 left-3 text-xs text-neutral-300 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="font-mono tabular-nums font-bold text-amber-300">{car.mileageKm.toLocaleString()} كم</span>
                              <span>·</span>
                              <span className="font-semibold">{car.year}</span>
                            </div>
                            <span className="text-[11px] text-neutral-400 line-clamp-1">{car.color}</span>
                          </div>
                        </div>

                        {/* Card Body */}
                        <div className="p-5 flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between gap-2 mb-1.5">
                              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono">
                                {car.brand}
                              </span>
                              <span className="text-[11px] text-neutral-400 font-mono">
                                {car.model}
                              </span>
                            </div>

                            <h3
                              onClick={() => onSelectCar(car)}
                              className="text-base sm:text-lg font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-1 cursor-pointer"
                            >
                              {car.title}
                            </h3>

                            {/* Specifications Pill Strip */}
                            <div className="grid grid-cols-2 gap-2 my-3 text-[11px] text-neutral-300">
                              <div className="p-2 rounded-lg bg-neutral-950/80 border border-neutral-800/80 flex items-center justify-between">
                                <span className="text-neutral-500">الفتيس:</span>
                                <span className="font-semibold line-clamp-1">{car.transmission}</span>
                              </div>
                              <div className="p-2 rounded-lg bg-neutral-950/80 border border-neutral-800/80 flex items-center justify-between">
                                <span className="text-neutral-500">الوقود:</span>
                                <span className="font-semibold">{car.fuel}</span>
                              </div>
                            </div>

                            {/* Feature Highlight */}
                            <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                              {car.features[0]}
                            </p>
                          </div>

                          {/* Pricing and Action Strip */}
                          <div className="mt-5 pt-4 border-t border-neutral-800">
                            <div className="flex items-baseline justify-between mb-3">
                              <div>
                                <div className="text-[11px] text-neutral-400 font-semibold">سعر الكاش التنافسي</div>
                                <div className="text-xl sm:text-2xl font-black text-amber-400 tabular-nums">
                                  {formatPrice(car.priceEGP)}{' '}
                                  <span className="text-xs font-normal text-neutral-400">ج.م</span>
                                </div>
                              </div>

                              {car.monthlyEstimateEGP > 0 && (
                                <div className="text-left">
                                  <div className="text-[10px] text-neutral-400">قسط تقريبي يبدأ من</div>
                                  <div className="text-xs font-bold text-neutral-200 tabular-nums">
                                    {formatPrice(car.monthlyEstimateEGP)} ج.م/شهر
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Primary Direct Actions */}
                            <div className="grid grid-cols-2 gap-2">
                              <button
                                onClick={() => onSelectCar(car)}
                                className="w-full py-2.5 px-3 text-xs font-bold text-neutral-200 hover:text-white bg-neutral-800 hover:bg-neutral-700 rounded-xl transition-colors flex items-center justify-center gap-1 cursor-pointer"
                              >
                                <span>احجز معاينة وفحص</span>
                                <ChevronLeft className="w-3.5 h-3.5" />
                              </button>

                              <a
                                href={whatsappInquiryUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full py-2.5 px-3 text-xs font-black text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/10"
                              >
                                <MessageCircle className="w-3.5 h-3.5" />
                                <span>استفسار واتساب</span>
                              </a>
                            </div>
                          </div>

                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}

      </div>
    </section>
  );
}
