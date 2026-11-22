## [0.16.7] — 2026-11-22

- Fakt ma’lumotlari kartasida qiymatlar endi muhr bosilishi boshlanmaguncha yashiriladi. Muhrlanish vaqtida qiymat animatsiya bilan ochiladi; yorliq va muhr kutilayotgan holati saqlanadi.
- O‘zgarish faqat ma’lumot kartasining qiymatlarni ko‘rsatish tartibiga tegishli; fakt, ssenariy, 3D obyekt va animatsiya sozlamalari o‘zgartirilmadi.

## [0.16.6] — 2026-11-22

- NEX outro logotipi TA etalonidagi geometrik NEX chiziq shakliga moslashtirildi; suyuq metall fon, 5,2 soniyalik alohida outro va boshqa QF funksiyalari saqlandi.

# QF — Qiziqarli fakt o‘zgarishlar tarixi

## [0.16.5] — 2026-11-22

- WebGL ko‘rinmasligiga sabab bo‘lgan qatlam ustma-ustligi tuzatildi: alohida 2D fon, shaffof 3D WebGL va matn qatlamlari joriy etildi.
- 3D obyektlar kattalashtirildi; kamera yaqinlashtirildi, aylanish, tebranish va obyekt harakati kuchaytirildi.
- Ikki alohida katta izoh kartasi o‘rniga bitta boshlang‘ich ma’lumot kartasi qoldirildi: Tasnif, Manba, Dalil va Tekshiruv.
- Har bir qiymat tegishli sahna boshlanganda shu yagona kartaning ichida shtamp/muhr animatsiyasi bilan ochiladi.
- 3D sahna NEX outro vaqtida yashiriladi; outro suyuq metall fon va NEX brend yakuni bilan saqlanadi.
- JavaScript sintaksisi, HTML canvas ID va qatlam tartibi statik tekshirildi; haqiqiy Android/WebGL sinovi hali bajarilmagan.

## [0.16.4] — 2026-11-22

- NEX outro brend yakuni qaytarildi: 5,2 soniyalik suyuq metall oqimidan keyin NEX yozuvi, orbital halqa va brend shiori animatsion ko‘rinadi.
- Manba/tekshiruv paneli video birinchi kadridan boshlab barcha asosiy sahnalarda ixcham yuqori qatlam sifatida ko‘rsatiladi.
- Har bir sahnaning oxirgi qismida tegishli ma’lumot shtamp/muhr uslubida chiqadi: tasnif, manba, dalil, tekshiruv holati va yakuniy holat.
- Shtamp matnlari foydalanuvchi kiritgan qiymatlardan olinadi; bo‘sh maydonlar uchun uydirma manba yoki dalil yaratilmaydi.
- JavaScript sintaksisi tekshirildi; Android/WebGL vizual sinovi alohida bajarilishi kerak.

## [0.16.3] — 2026-11-22

- Video qatlamidan ssenariydan tashqari barcha yozuvlar olib tashlandi: 3D obyekt yorliqlari, sahna teglari, sahna raqamlari, manba/tekshiruv kartasi va outro brend/slogan matnlari.
- Astronomiya mavzusida fakt matniga bog‘liq bo‘lmagan «YER» kabi statik yorliq endi chiqmaydi; boshqa mavzularda ham avtomatik obyekt nomi yozilmaydi.
- Videoda faqat foydalanuvchi ssenariysi matni qoladi; outro vizual, matnsiz yakun sifatida saqlanadi.


## [0.16.2] — 2026-11-22

- Ekran yozish oynasidagi tugmalar TA etalonidagi kabi faqat foydalanuvchi tegishi yoki boshqaruv bilan ishlaganda 1,8 soniyaga ko‘rinadi; keyin yashirinadi.
- Mobil QF studiyasi ixcham vertikal maket, kichikroq 9:16 preview, qulay bosish maydonlari, 16 px forma shriftlari va kichik ekran uchun maxsus zichlik bilan moslashtirildi.
- README va rivojlantirish hujjatlari yangilandi. TA/FM manba fayllariga tegilmadi.


## [0.16.1] — 2026-11-22

- To‘liq ekran yozish rejimidagi boshqaruv paneli doim ko‘rinadigan qilindi; «Studiyaga qaytish» tugmasi endi yashirin qolmaydi. `Escape` tugmasi ham yozish oynasidan chiqadi.
- Anketa maydonlari endi `sessionStorage` orqali avtomatik saqlanmaydi va sahifa qayta ochilganda tiklanmaydi. Eski avtomatik saqlangan nusxa bir martalik tozalanadi.
- Birinchi bosqichga «Anketani tozalash» tugmasi qo‘shildi; barcha maydonlar va sozlamalar tasdiqdan keyin boshlang‘ich holatga qaytadi. «Yangi loyiha» ham tasdiqlash bilan ishlaydi.
- Har bir sahna davomiyligi 2,5–12 soniya oralig‘ida alohida sozlanadi; umumiy vaqt va 5,2 soniyalik outro avtomatik qayta hisoblanadi.
- Statik kod tekshiruvlari bajarildi; Android qurilmadagi haqiqiy ekran yozish sinovi alohida talab etiladi.


## [0.16.0] — 2026-11-22

- Outro endi beshta asosiy sahna davomiyligiga qo‘shilmaydi: asosiy sahnalar tugagach, qo‘shimcha 5,2 soniyalik mustaqil NEX outro ishlaydi. Timeline, umumiy davomiylik, pauza/davom ettirish va telefon ekran yozish hisoblari shu vaqtga moslashtirildi.
- Har bir asosiy sahna uchun alohida 3D kompozitsiya yaratildi: kirish/Hook, LED fakt e’loni, mazmuniy model, manba-tekshiruv vizuali va yakuniy kompozitsiya.
- To‘rtta vizual til 2D kompozitsiya va 3D dekor/joylashuvda farqlanadi: Cinematic 3D, Kinetic Typography, Editorial/Magazine, Futuristic Motion.
- Bayon uslubining sakkiz varianti shrift, satr oralig‘i, matn chiqish ritmi, siljish va urg‘u animatsiyasiga ulandi.
- Rang palitrasi 2D fon bilan birga 3D materiallar, emissiv ranglar va sahna yoritishiga tatbiq etildi.
- Kamera boshqaruvi sahna bo‘yicha alohida masofa/pozitsiya, silliq o‘tish va pointer parallax bilan boyitildi.
- `qfSceneCue` endi faktga mos vizual yorliq sifatida e’lon/mazmun sahnalarida ko‘rsatiladi. Fan sohasi va kalit iboralar uchun normalizatsiya qilingan sinonim/ibora mosligi qo‘llanadi; bu qoidaviy moslashtirish, AI fakt tekshiruvi emas.
- YAKUN asosiy sahnasida fakt tasnifi, manba nomi, dalil izohi va tekshiruv qaydi ko‘rsatiladi. Kiritilmagan manba yoki dalil yashirilmaydi, ochiq ko‘rsatiladi.
- Yangi kreativ variant endi palitra bilan birga vizual til va harakat profilini ham o‘zgartiradi.
- Statik JavaScript sintaksisi va DOM bog‘lanishlari tekshirildi. Android/desktop WebGL, haqiqiy ekran yozish va mobil FPS sinovi foydalanuvchi qurilmasida hali tasdiqlanishi kerak.

## [0.15.6] — 2026-11-22

- Chaqirilmaydigan `showNext()` va `sceneControls()` yordamchilari olib tashlandi.
- Ishlatilmaydigan `seed`, `subjectNow` va doimiy `1` qiymatli `motionSpeed` omillari tozalandi; animatsiya tezligi avvalgi holicha saqlandi.
- Hech qayerda o‘qilmaydigan eski yashirin Reel DOM maydonlari va ularga qiymat yozishlar olib tashlandi.
- Faol sahna matni, 3D obyektlar, LED e’lon displeyi, rang/harakat tanlovlari, yozuv va outro oqimiga funksional o‘zgarish kiritilmadi.
- Statik tekshiruv: JavaScript sintaksisi va DOM ID bog‘lanishlari tekshirildi. Real qurilma/WebGL sinovi hali talab etiladi.

## [0.15.4] — 2026-11-22

- Reels sahnalari uchun harakatlanuvchi suyuq metall fon yaratildi: xrom-kumush gradientlar, yorug‘lik oqimlari va chuqur vignette.
- Fakt e’loni 3D displeyi xrom-metall korpus va sovuq oq emissiv kontur bilan yangilandi.
- Yakuniy 5,2 soniyalik NEX outro qayta ishlanib, metallik logo, orbital halqalar, slogan va NEX ORIGINAL yozuvi bilan mustaqil yakuniy sahna sifatida ko‘rsatildi.
- Hook/01/05 texnik overlaylari chiqarilmaydi; sahna nomlari studiya boshqaruvida qoladi.
- QF asset cache va versiyasi 0.15.4 ga yangilandi. TA/FM fayllari o‘zgartirilmadi.
- Statik tekshiruv; qurilmadagi vizual/WebGL sinovi hali bajarilmagan.

# QF — Qiziqarli fakt o‘zgarishlar tarixi

## [0.15.3] — 2026-11-22

- Reels kadrlaridan ortiqcha HOOK/FAKT E’LONI/MAZMUN/HOLAT/YAKUN va 01/05 kabi texnik yozuvlar olib tashlandi; ssenariy matni toza kompozitsiyada qoladi.
- 3D obyektlarga jonli suzish, burilish, ritmik masshtab va individual harakat qo‘shildi; sahna harakati tanlangan animatsiya uslubiga bog‘landi.
- Fakt e’loni uchun 3D metall romli, emissiv chetli, skan-chiziqli innovatsion LED displey yaratildi; matn paneli chuqur ko‘k shisha, yorug‘lik gradienti va harakatlanuvchi skan bilan qayta ishlanadi.
- QF versiyasi va asset cache qiymatlari 0.15.3 ga yangilandi. TA va muhofazalangan FM fayllari o‘zgartirilmadi.
- Statik kod tekshiruvi talab etiladi; real qurilmadagi vizual va WebGL ishlash sinovi hali foydalanuvchi qurilmasida tasdiqlanishi kerak.

## [0.15.2] — 2026-11-22

- 01 — Fakt ma’lumotlari sahifasidagi tasnif, fan sohasi, sarlavha, manba, dalil va tekshiruv maydonlari alohida forma konteyneriga joylashtirildi.
- QF’ga xos forma CSS’i select maydonlarini ham qamrab oldi; kenglik, ichki bo‘shliq, fokus holati va mobil joylashuv bir xil qilindi.
- Faqat QF HTML/CSS va QF hujjatlari yangilandi. TA va muhofazalangan FM fayllari o‘zgartirilmadi.
- Statik HTML/CSS tekshiruvi bajarildi; real qurilmadagi vizual sinov foydalanuvchi brauzerida tasdiqlanishi kerak.

## [0.15.1] — 2026-11-22

- Yuqori bosqich ko‘rsatkichidagi 01 nuqtasi aniqroq ko‘rinishi uchun faol holatdagi o‘lchami, kontrasti, yorqin gradienti va yumshoq nurli halqasi kuchaytirildi.
- Mobil ekranlar uchun alohida o‘lcham moslamasi qo‘shildi; FM va TA fayllariga tegilmadi.

## [0.15.0] — 2026-11-22

- “Fakt e’loni” sahnasiga maxsus reveal animatsiyasi qo‘shildi: markazdan ikki tomonga kengayadigan parallel nurli chiziqlar, ularning orasida paydo bo‘ladigan yorqin shaffof ekran va undan keyin namoyon bo‘ladigan fakt matni.
- Effekt faqat ikkinchi sahnada ishlaydi; qolgan to‘rt sahna, QF 3D obyektlari va FM/TA fayllari o‘zgartirilmadi.
- Statik kod tekshiruvi bajarildi; real qurilmadagi vizual sinov hali talab etiladi.

## [0.14.1] — 2026-11-22

- QF vizual interfeysi FM etalon CSS fayliga tenglashtirildi: umumiy panel, sarlavha, forma, tugma, progress, timeline, preview ramkasi, yozuv oynasi va mobil breakpointlar bir xil.
- QF’ga xos vizual override’lar olib tashlandi; 3D canvas qatlamlari FM bilan bir xil umumiy selektorlar orqali joylashtiriladi.
- Fakt formasi, besh sahnali ssenariy va QF 3D renderer funksiyalari o‘zgartirilmadi.


## [0.14.0] — 2026-11-22

- FM Reels Studio arxitekturasidagi yetti bosqich QF’ga moslashtirildi: fakt, ssenariy, bayon uslubi, vizual til, rang palitrasi, animatsiya va NEX Reels Studio.
- 9:16 jonli WebGL preview, besh sahnali timeline, har bir sahna uchun matn tahriri va alohida davomiylik qo‘shildi.
- HOOK → FAKT E’LONI → MAZMUN → HOLAT → YAKUN matnlari sahnalar bo‘yicha ketma-ket namoyish qilinadi; satrlar animatsiya bilan bosqichma-bosqich chiqadi.
- 1080×1920 yozuv oynasi, pauza/davom ettirish va qayta boshlash boshqaruvlari qo‘shildi.
- QF fan sohasi va fakt kalit so‘zlariga asoslangan 3D obyektlar saqlandi.
- Ovoz, musiqa va yakuniy audio montaj tashqi ilovalarda qoladi; ekran yozish telefonning native recorder’i orqali bajariladi.

## [0.13.0] — 2026-11-22

- QF interfeysi TA/FM uslubidagi mustaqil sahifalararo studiya oqimiga qayta tuzildi.
- To‘rtta alohida bosqich: fakt ma’lumotlari, video ssenariysi, 3D sahna va tayyor natija.
- Oldingi/Keyingi navigatsiyasi va qoralama saqlash qo‘shildi.
- HTTPS/URL maydoni, URL validatsiyasi va ssenariydagi havola qatori olib tashlandi.

## [0.12.0] — 2026-11-22

- Fakt kalit iboralariga asoslangan deterministik 3D sahna profillari.
- Kamera, animatsiya tezligi, pauza/davom ettirish va besh ssenariy bosqichi boshqaruvlari.

## [0.11.0] — 2026-11-22

- Three.js asosidagi WebGL 3D sahna dvigateli va fan yo‘nalishlari bo‘yicha kompozitsiyalar.

## [0.10.0] — 2026-11-22

- Mustaqil QF modulining boshlang‘ich versiyasi.


## 0.15.5 — FM bilan bir xil NEX outro
- QF’dagi mustaqil orbital/NEX ORIGINAL yakuni olib tashlandi.
- FM’dagi ayni `drawMercuryOutro` va `drawFMOutroBrand` animatsiyalari QF’ga ko‘chirildi: pastdan suyuq xrom to‘lqini, markaziy NEX logotipi, orbital chiziq va “Fikr va imkoniyatlar makoni”.
- FM manba fayllari o‘zgartirilmadi; QF outro oxirgi 5,2 soniyada ishlaydi.
