import { Car } from '../types/car';

/**
 * السيارات المعتمدة بصالة عرض شركة الصافي لتجارة السيارات بالإسكندرية
 */
export const initialCars: Car[] = [
  {
    id: 'chevrolet-cruze-ls',
    title: 'شيفروليه كروز Cruze LS فابريكا بالكامل',
    brand: 'Chevrolet',
    model: 'Cruze LS',
    year: 2017,
    priceEGP: 580000,
    originalPriceEGP: 610000,
    mileageKm: 68000,
    condition: 'فابريكا بالكامل',
    category: 'sedan',
    fuel: 'بنزين 92',
    transmission: 'أوتوماتيك 6 سرعات',
    engine: '1.6L Ecotec 4-Cylinder',
    horsePower: 141,
    color: 'بني موكا ميتاليك لامع (Mocha Brown)',
    interiorColor: 'فرش المصنع الفابريكا الأصلي رمادي',
    image: '/assets/aistudio/FB_IMG_1792468293325_01bc7531.jpg',
    isFeatured: true,
    features: [
      'فابريكا بالكامل من الإكصدام للإكصدام بدون أي دهانات أو ملاحظات',
      'صيانات منتظمة بالكامل وتكييف فريون ثلاجة فائق التبريد',
      'شاشة وسائط، بلوتوث، حساسات ركن خلفية أصلية TireTrac',
      'حالة ميكانيكية وفتيس وعفشة ناعمة ومثالية للسفر والاستخدام اليومي',
      'كاوتش وبطارية بحالة ممتازة وتراخيص سارية مرور الإسكندرية'
    ],
    inspectionPoints: {
      engine: 'محرك 1600 سي سي Ecotec سليم 100% بدون أي ترشيح زيوت أو أصوات غريبة',
      gearbox: 'أوتوماتيك 6 سرعات ستيبترونيك بحالة ممتازة ونقلات سلسة',
      chassis: 'شاسيه فابريكا سليم بدون أي ملاحظات على الإطلاق وفحص 100%',
      paint: 'طلاء فابريكا المصنع الأصلي مع لمعان فائق ونظافة استثنائية',
      interior: 'صالون نظيف جداً بحالة الاستلام بدون أي تمزق أو هبوط'
    },
    monthlyEstimateEGP: 12500
  },
  {
    id: 'hyundai-verna-gls-auto',
    title: 'هيونداي فيرنا GLS أوتوماتيك حالة نادرة فابريكا',
    brand: 'Hyundai',
    model: 'Verna GLS Auto',
    year: 2016,
    priceEGP: 410000,
    originalPriceEGP: 435000,
    mileageKm: 160000,
    condition: 'حالة نادرة',
    category: 'sedan',
    fuel: 'بنزين 92',
    transmission: 'أوتوماتيك',
    engine: '1.6L DOHC 16V',
    horsePower: 106,
    color: 'رمادي فيراني ميتاليك',
    interiorColor: 'فرش جلد كاستور بيج مع بني بدرجتين أصلي',
    image: '/assets/aistudio/FB_IMG_1792468283733_f0878e8b.jpg',
    additionalImages: [
      '/assets/aistudio/FB_IMG_1792468280970_2f5c0f6d.jpg',
      '/assets/aistudio/FB_IMG_1792468285234_2f5c0f6d.jpg'
    ],
    isFeatured: true,
    features: [
      'فيرنا أوتوماتيك GLS أصلية حالة نادرة جداً وعداد 160 ألف كم شرعي',
      'صالون جلد فاخر ذو لونين بحالة ممتازة ونظافة فائقة بالكامل',
      'زجاج كهرباء أمامي وخلفي، سنتر لوك، باور ستيرينج ناعم',
      'تكييف فريون ثلاجة وكاسيت أصلي وسماعات ستيريو محيطية',
      'فحص فني شامل وجاهزة للتسليم الفوري بدون أي مصاريف نهائياً'
    ],
    inspectionPoints: {
      engine: 'محرك 1600 كامة مزدوجة كبس قياسي بدون أي أعطال إطلاقاً',
      gearbox: 'أوتوماتيك ناعم وسلس جداً في النقلات والتسارع',
      chassis: 'دواخل فابريكا زيرو بالكامل بدون أدنى ملاحظة',
      paint: 'حالة خارجية ممتازة مع فابريكا دواخل تامة',
      interior: 'صالون فابريكا متناسق ونظيف جداً بفرش جلد أنيق ونادر'
    },
    monthlyEstimateEGP: 8900
  }
];

export const sampleCarsBackup: Car[] = [...initialCars];
