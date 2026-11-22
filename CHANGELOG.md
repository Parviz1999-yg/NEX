# NEX — O‘zgarishlar tarixi

## QF 0.15.1 — 2026-11-22

- QF sahifalararo progress ko‘rsatkichidagi faol 01 nuqtasi kattaroq, yorqinroq va yumshoq nurli halqa bilan ajratildi; kichik ekranlarda o‘lchami moslashtirildi.
- Faqat QF CSS/HTML va tegishli hujjatlar yangilandi. FM hamda TA manba fayllari o‘zgartirilmadi.

## QF 0.15.0 — 2026-11-22

- “Fakt e’loni” sahnasiga maxsus reveal animatsiyasi qo‘shildi: markazdan ikki tomonga kengayadigan nurli chiziqlar, o‘rtada yorqin ekran ochilishi va fakt matnining undan keyin chiqishi.
- Effekt faqat QF’ning ikkinchi sahnasiga tegishli. TA va himoyalangan FM fayllari o‘zgartirilmadi.
- Kod darajasidagi tekshiruv qayd etildi; Android/desktop brauzerda real ko‘rinish hali tekshirilishi kerak.

## QF 0.14.1 — 2026-11-22

- QF dizayni FM’ning amaldagi CSS etaloniga moslashtirildi. O‘zgarish faqat QF fayllariga tegishli; FM va TA manba fayllari o‘zgartirilmadi.
- QF sahifa mazmuni, besh sahnali matn oqimi va fanlarga mos 3D sahnalar saqlandi.

NEX umumiy platforma versiyasi va TA, FM, QF, MI studiyalarining mustaqil versiyalarini alohida yuritadi. Har bir darajaning o‘z VERSION va CHANGELOG fayli mavjud.

## Hujjat yangilanishi — 2026-11-22 (versiya oshirilmagan)

- Versiyalash modeli umumiy NEX + to‘rtta mustaqil studiya darajasiga ajratildi.
- Har bir studiya uchun `versions/{TA,FM,QF,MI}/VERSION` va `CHANGELOG.md` yaratildi.
- TA va FM’ning himoyalangan sahifa/kod fayllari hamda interfeys versiya belgilari o‘zgartirilmadi.
- Bu faqat boshqaruv hujjatlari va versiya metama’lumotlari o‘zgarishi bo‘lgani uchun global NEX versiyasi 0.10.0 bo‘lib qoldi.

## [0.10.0] — 2026-11-22

- Ildiz sahifa umumiy ish oqimidan ajratilib, to‘rtta mustaqil studiyaga yo‘naltiruvchi dashboardga aylantirildi.
- TA mavjud ichki oqimi, shakllari, CSS va render mexanizmlari saqlangan holda alohida `tavsiya-akkaunt/` moduliga ajratildi; faqat kirish va dashboardga qaytish marshruti moslashtirildi.
- FM modulining fayllari va ichki tuzilmasi o‘zgartirilmadi. FM sahifasidagi ko‘rinadigan v0.9.7 belgisi ham himoya talabi sabab o‘z holida qoldi; global VERSION 0.10.0.
- QF mustaqil modul papkasi yaratildi: to‘rtta fakt tasnifi, fan sohasi, manba/dalil/tekshiruv maydonlari va besh bosqichli hikoya formasi kiritildi.
- QF 3D vizualizatsiyasi ssenariydan mustaqil qatlam sifatida belgilandi; hozircha konseptual vizual preview, to‘liq WebGL renderer emas.
- MI mustaqil modul papkasi yaratildi: ibora, muallif/manba, mazmun, kontekst, Hook va yakun maydonlari hamda matn yig‘ish funksiyasi qo‘shildi.
- Global versiya `0.10.0` ga oshirildi. README va VERSION yangilandi.
- Tekshiruv holati: GitHub fayllari va havolalar strukturaviy tekshirildi; Android qurilmasida real brauzer/WebGL sinovi hali bajarilmadi.

## [0.9.7] — 2026-11-21

- FM’da “Yangi loyiha” bosilganda qidiruv so‘rovi, qidiruv joyi, havola, manba tafsilotlari va ssenariy maydonlari ham tozalanadi; oldingi loyiha ma’lumotlari yangi loyihaga o‘tib qolmaydi.
- FM’da manba havolasi majburiyligi olib tashlandi; uning o‘rniga majburiy “Nima deb qidirish kerak?” va “Qayerdan qidirish kerak?” maydonlari qo‘shildi. Qidiruv ma’lumotlari studiya xulosasida ham ko‘rsatiladi.

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

- Joriy versiyaning yagona manbasi — loyiha ildizidagi `VERSION` fayli.
- Har bir tasdiqlangan funksional o‘zgarish ko‘lamiga qarab umumiy versiya yangilanadi; faqat katta relizda emas.
- PATCH — xato tuzatish va kichik mos o‘zgarish; MINOR — moslikni saqlovchi yangi imkoniyat; MAJOR — moslikni buzuvchi katta o‘zgarish.
- Faqat hujjat matni o‘zgarsa va mahsulot funksiyasi o‘zgarmasa, versiya oshirilmaydi.
- Versiya oshirilganda `VERSION`, CHANGELOG, interfeys versiyasi va tegishli cache-busterlar bir xil raqamga moslanadi.
- Har bir yozuvda sana, versiya, o‘zgarish mazmuni va tekshiruv holati ko‘rsatiladi.
- NEX umumiy versiyasi va TA, FM, QF, MI studiya versiyalari mustaqil yuritiladi; o‘zgarish ta’sir qilgan darajalarigina oshiriladi.
- Format: `MAJOR.MINOR.PATCH`.
