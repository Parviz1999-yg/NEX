# NEX — O‘zgarishlar tarixi

NEX butun loyiha uchun yagona versiya raqamidan foydalanadi. TA, FM, QF va MI modullarida alohida versiyalar yuritilmaydi.

## [0.9.7] — 2026-11-21

- FM 3D suyuq metall geometriyasidagi yetishmayotgan `flow` animatsiya koeffitsiyenti tiklandi; NEX logotipi TA dagi yuqori kompozitsion joylashuvga moslandi va preview o‘lchamlari umumiy studiya andozasiga yaqinlashtirildi.

- NEX ning amaldagi umumiy versiyasi `0.9.7` sifatida belgilandi.
- Bosh sahifa va FM modulidagi ko‘rinadigan versiya yozuvlari yagona raqamga moslandi.
- CSS va JavaScript fayllarining cache-buster parametrlariga ham yagona versiya qo‘llanadi.
- `VERSION` yagona manba, ushbu fayl esa butun loyiha uchun yagona o‘zgarishlar tarixidir.
- TA himoyalangan etalon bo‘lib qoladi; uning funksional kodi o‘zgartirilmaydi.
- FM moduli TA arxitekturasiga mos ravishda 7 bosqichli mustaqil oqim, 5 sahnali tahrirlash va sahna davomiyligi boshqaruvlari bilan qayta ko‘rib chiqildi.
- FM studiyasiga TA andozasidagi alohida 9:16 ekran yozish oynasi, 1080×1920 WebGL sahnasi va mustaqil 1080×1920 Canvas matn qatlami qo‘shildi; mobil brauzer qo‘llasa yozuv oynasi fullscreen rejimiga o‘tadi. Video fayl eksporti emas, telefonning ekran yozish funksiyasi ishlatiladi.
- FM WebGL sahnasiga RoomEnvironment/PMREM aks ettirishi, manba turiga mos 3D obyektlar, animatsiyalanuvchi metall to‘lqin, sahnaga mos kamera o‘tishlari, bayon uslubiga bog‘liq harakat va qurilma piksel nisbatiga mos render o‘lchami qo‘shildi.
- FM yakuniy sahnasiga animatsion 3D NEX xrom logotipi va pastdan yuqoriga ko‘tariluvchi metall wipe/outro harakati qo‘shildi.
- FM rolik ijrosi endi yakuniy sahnada to‘xtaydi; pauza/davom ettirish, vaqt hisoblagichi, davomiylikni qayta hisoblash, kreativ variant va yangi loyiha boshqaruvlari mavjud.
- FM kodida CDN import xatolari, WebGL kontekst yo‘qolishi va sahifa ko‘rinmasligi uchun alohida boshqaruvlar qo‘shildi.
- FM va TA preview/yozuv kompozitsiyasi bir xil to‘rt canvas arxitekturasiga keltirildi: preview 360×640 WebGL+Canvas, yozuv 1080×1920 WebGL+Canvas.
- FM preview’dagi HTML matn qatlami olib tashlanib, TA singari Canvas orqali chiziladigan tipografik qatlamga o‘tkazildi.
- FM metall suyuqlik geometriyasi TA’dagi 112×28 segmentli dinamik xrom lenta algoritmiga moslashtirildi; har besh sahnada alohida geometriya harakati mavjud.
- FM yoritish, kamera burchagi, piksel nisbati va xrom material parametrlari TA etaloniga yaqinlashtirildi.
- FM NEX logotipi TA’dagi Catmull-Rom/Tubular stroke draw-range animatsiyasi bilan intro va outroda chizilib ochiladi.
- FM matn qatlami barcha to‘rtta vizual til uchun alohida tipografik kompozitsiya, kirish animatsiyasi va rang palitrasiga bog‘landi.
- FM studiya qobig‘i: header ierarxiyasi, asosiy kenglik, panel, preview va mobil tartib TA o‘lchamlariga moslashtirildi.
- FM `style.css` endi TA’ning himoyalangan `assets/css/style.css` faylini umumiy vizual asos sifatida import qiladi; FM CSS faqat modulga xos bosqich va boshqaruvlarni belgilaydi.
- FM Reels studiyasining preview sarlavhasi, REAL-TIME belgisi, timeline, sahna hisoblagichi va pastki loyiha boshqaruvlari TA tartibiga moslashtirildi.
- FM sahna tanlash, davomiylikni tahrirlash va ekran yozishga o‘tishda joriy playback vaqtini saqlaydi.
- FM statik tekshiruv: JavaScript sintaksisi, HTML ID takrorlanishi, JS–DOM ID mosligi, label maqsadlari va boshqaruv tugmalari tekshirildi.
- FM haqiqiy Android/WebGL va ekran yozish sinovi hali qurilmada bajarilmagan; buni bajarilgan deb hisoblamaslik kerak.

## Versiyalash qoidalari

- Joriy versiya: `VERSION` faylida — `0.9.7`.
- Barcha modullar uchun bitta umumiy versiya ishlatiladi.
- Modul nomi o‘zgarishlar izohida ko‘rsatilishi mumkin, ammo alohida modul versiyasi berilmaydi.
- Versiya faqat umumiy loyiha relizi chiqarilganda oshiriladi.
- Format: `MAJOR.MINOR.PATCH`.
