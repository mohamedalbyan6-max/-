import { useState, useEffect } from 'react';
import { initialCars, sampleCarsBackup } from './data/carsData';
import { Car } from './types/car';
import { ShieldCheck, Plus } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BranchAnnouncementSection } from './components/BranchAnnouncementSection';
import { Showroom } from './components/Showroom';
import { AboutWhyUs } from './components/AboutWhyUs';
import { ServicesSection } from './components/ServicesSection';
import { OldIsAlwaysGoldSection } from './components/OldIsAlwaysGoldSection';
import { FinancingCalculator } from './components/FinancingCalculator';
import { ContactAndBranches } from './components/ContactAndBranches';
import { Testimonials } from './components/Testimonials';
import { Footer } from './components/Footer';
import { CarDetailModal } from './components/CarDetailModal';
import { TradeInModal } from './components/TradeInModal';
import { AddCarModal } from './components/AddCarModal';
import { EditCarModal } from './components/EditCarModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { BranchPosterModal } from './components/BranchPosterModal';
import { FloatingContactBar } from './components/FloatingContactBar';

const STORAGE_KEY = 'alsafy_inventory_v2';
const ADMIN_AUTH_KEY = 'alsafy_admin_authenticated';

export default function App() {
  const [cars, setCars] = useState<Car[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved !== null) {
        const parsed: Car[] = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Automatic migration: Ensure last ad (hyundai-verna-gls-auto or last car in list) is 160,000 km
          const migrated = parsed.map((c, idx) => {
            if (c.id === 'hyundai-verna-gls-auto' || (idx === parsed.length - 1 && c.mileageKm !== 160000)) {
              return {
                ...c,
                mileageKm: 160000,
                features: c.features?.map((f: string) => f.includes('عداد') ? 'فيرنا أوتوماتيك GLS أصلية حالة نادرة جداً وعداد 160 ألف كم شرعي' : f) || c.features,
                image: c.image.includes('293325') ? '/assets/aistudio/FB_IMG_1792468283733_f0878e8b.jpg' : c.image,
                additionalImages: [
                  '/assets/aistudio/FB_IMG_1792468280970_2f5c0f6d.jpg',
                  '/assets/aistudio/FB_IMG_1792468285234_2f5c0f6d.jpg'
                ]
              };
            }
            if (c.id === 'chevrolet-cruze-ls' && c.image.includes('280970')) {
              return {
                ...c,
                image: '/assets/aistudio/FB_IMG_1792468293325_01bc7531.jpg'
              };
            }
            return c;
          });
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
          } catch {
            // Ignored
          }
          return migrated;
        }
      }
    } catch {
      // Ignore parsing errors and fallback to initialCars
    }
    return initialCars;
  });

  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [editingCar, setEditingCar] = useState<Car | null>(null);
  const [isTradeInOpen, setIsTradeInOpen] = useState(false);
  const [isAddCarOpen, setIsAddCarOpen] = useState(false);
  const [isPosterModalOpen, setIsPosterModalOpen] = useState(false);
  
  // Exclusive Owner Admin State (Only Captain Safy has access)
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      return localStorage.getItem(ADMIN_AUTH_KEY) === 'true';
    } catch {
      return false;
    }
  });
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);

  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === '#admin') {
        setIsAdminLoginOpen(true);
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        setIsAdminLoginOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('hashchange', checkHash);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleLoginSuccess = () => {
    setIsAdmin(true);
    try {
      localStorage.setItem(ADMIN_AUTH_KEY, 'true');
    } catch {
      // Ignored
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    try {
      localStorage.removeItem(ADMIN_AUTH_KEY);
    } catch {
      // Ignored
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAddCar = (newCar: Car) => {
    setCars((prev) => {
      const updated = [newCar, ...prev];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // Local storage quota handling
      }
      return updated;
    });
  };

  const handleDeleteCar = (carId: string) => {
    setCars((prev) => {
      const updated = prev.filter((c) => c.id !== carId);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // Local storage handling
      }
      return updated;
    });
    if (selectedCar?.id === carId) {
      setSelectedCar(null);
    }
  };

  const handleUpdateCar = (updatedCar: Car) => {
    setCars((prev) => {
      const updated = prev.map((c) => (c.id === updatedCar.id ? updatedCar : c));
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // Local storage handling
      }
      return updated;
    });
    if (selectedCar?.id === updatedCar.id) {
      setSelectedCar(updatedCar);
    }
  };

  const handleClearAllCars = () => {
    setCars([]);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    } catch {
      // Local storage handling
    }
    setSelectedCar(null);
  };

  const handleRestoreSamples = () => {
    setCars(sampleCarsBackup);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleCarsBackup));
    } catch {
      // Local storage handling
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-amber-500 selection:text-neutral-950">
      
      {/* Sticky Exclusive Owner Admin Ribbon (Visible Only When Captain Safy is Logged In) */}
      {isAdmin && (
        <div className="bg-gradient-to-r from-amber-950 via-neutral-900 to-amber-950 border-b-2 border-amber-500/60 text-amber-200 px-4 py-2 text-xs font-semibold sticky top-0 z-50 shadow-xl flex items-center justify-between">
          <div className="max-w-7xl mx-auto w-full flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                <strong>وضع الإدارة الشخصية مفعّل - خاص المبرمج للتطبيق (ALBYAN):</strong> أزرار إضافة وتعديل وحذف السيارات متاحة لك فقط ومخفية تماماً عن الزوار.
              </span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setIsAddCarOpen(true)}
                className="px-3 py-1 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold rounded-lg text-xs flex items-center gap-1 shadow-sm cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>إضافة سيارة</span>
              </button>
              <button
                onClick={() => setIsAdminLoginOpen(true)}
                className="px-2.5 py-1 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-700 rounded-lg text-xs cursor-pointer"
              >
                إعدادات المرور
              </button>
              <button
                onClick={handleLogout}
                className="px-2.5 py-1 bg-red-950/60 hover:bg-red-900/80 text-red-300 border border-red-500/40 rounded-lg text-xs cursor-pointer"
              >
                قفل الإدارة (خروج)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5-Section Header Navigation Bar */}
      <Navbar
        isAdmin={isAdmin}
        onOpenAdmin={() => setIsAdminLoginOpen(true)}
        onOpenTradeIn={() => setIsTradeInOpen(true)}
        onOpenContact={() => scrollToSection('location')}
        onOpenPosterModal={() => setIsPosterModalOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section with dynamic branding */}
        <Hero
          onBrowseClick={() => scrollToSection('showroom')}
          onTradeInClick={() => setIsTradeInOpen(true)}
          onOpenCalculator={() => scrollToSection('calculator')}
          onOpenPosterModal={() => setIsPosterModalOpen(true)}
        />

        {/* Grand Opening - 2nd Branch Announcement Section (Featuring the Official Image) */}
        <BranchAnnouncementSection
          onOpenPosterModal={() => setIsPosterModalOpen(true)}
        />

        {/* 2. Featured Showroom & Filterable Inventory (Cars Listing) */}
        <Showroom
          cars={cars}
          isAdmin={isAdmin}
          onSelectCar={(car) => setSelectedCar(car)}
          onOpenAddCar={() => setIsAddCarOpen(true)}
          onEditCar={(car) => setEditingCar(car)}
          onDeleteCar={handleDeleteCar}
          onClearAllCars={handleClearAllCars}
          onRestoreSamples={handleRestoreSamples}
        />

        {/* 3. About Us & Why Choose Alsafy (4 Core Pillars) */}
        <AboutWhyUs
          onOpenTradeIn={() => setIsTradeInOpen(true)}
        />

        {/* 4. Comprehensive Services Section (Inspection, Financing, Trade-In, Licensing) */}
        <ServicesSection
          onOpenTradeIn={() => setIsTradeInOpen(true)}
          onOpenCalculator={() => scrollToSection('calculator')}
        />

        {/* OLD IS ALWAYS GOLD Heritage Philosophy Section */}
        <OldIsAlwaysGoldSection
          onExploreClassics={() => scrollToSection('showroom')}
        />

        {/* 5. Interactive Auto Financing & Installment Calculator */}
        <FinancingCalculator cars={cars} />

        {/* Client Trust & Authentic Testimonials */}
        <Testimonials />

        {/* 6. Official Directory of Sales Contacts & Alexandria Branch Map */}
        <ContactAndBranches
          onOpenPosterModal={() => setIsPosterModalOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer
        isAdmin={isAdmin}
        onOpenAdmin={() => setIsAdminLoginOpen(true)}
      />

      {/* Interactive Detail & Inspection Modal */}
      <CarDetailModal
        car={selectedCar}
        isAdmin={isAdmin}
        onClose={() => setSelectedCar(null)}
        onOpenCalculator={() => {
          setSelectedCar(null);
          scrollToSection('calculator');
        }}
        onEditCar={(car) => {
          setSelectedCar(null);
          setEditingCar(car);
        }}
        onDeleteCar={handleDeleteCar}
      />

      {/* Edit Car Ad Modal */}
      <EditCarModal
        isOpen={!!editingCar}
        car={editingCar}
        onClose={() => setEditingCar(null)}
        onSave={handleUpdateCar}
      />

      {/* Add New Car to Showroom Modal */}
      <AddCarModal
        isOpen={isAddCarOpen}
        onClose={() => setIsAddCarOpen(false)}
        onAddCar={handleAddCar}
      />

      {/* Sell / Trade-in Valuation Modal */}
      <TradeInModal
        isOpen={isTradeInOpen}
        onClose={() => setIsTradeInOpen(false)}
      />

      {/* Exclusive Owner Admin Login & Settings Modal */}
      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        isAdmin={isAdmin}
        onClose={() => setIsAdminLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        onLogout={handleLogout}
      />

      {/* Official Branch 2 Grand Opening Poster Lightbox Modal */}
      <BranchPosterModal
        isOpen={isPosterModalOpen}
        onClose={() => setIsPosterModalOpen(false)}
      />

      {/* Floating Fast Access Chat & Call */}
      <FloatingContactBar />

    </div>
  );
}
